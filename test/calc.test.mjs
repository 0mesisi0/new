import test from 'node:test';
import assert from 'node:assert/strict';
import { salary, severance, weeklyPay, unemployment, depositToRent, rentToDeposit, koreanAge } from '../src/calc.mjs';

test('salary: 50M KRW, 2026, single', () => {
  const r = salary({ annual: 50000000, nontax: 200000, dependents: 1, year: 2026 });
  assert.equal(r.gross, 4166667);
  assert.equal(r.pension, 188380); // floor10(3,966,000 * 4.75%)
  assert.equal(r.health, 142600);
  assert.equal(r.employment, 35700);
  assert.ok(r.incomeTax > 170000 && r.incomeTax < 210000, `tax ${r.incomeTax}`);
  assert.ok(r.net > 3500000 && r.net < 3650000, `net ${r.net}`);
});

test('salary: pension is capped and 2027 rate is higher', () => {
  const a = salary({ annual: 200000000, year: 2026 });
  assert.equal(a.pension, 313020); // floor10(6,590,000 * 4.75%)
  const b = salary({ annual: 200000000, year: 2027 });
  assert.equal(b.pension, 6590000 * 0.05);
  assert.ok(b.net < a.net);
});

test('salary: more dependents means less tax; low pay has no tax', () => {
  const one = salary({ annual: 60000000, dependents: 1 });
  const four = salary({ annual: 60000000, dependents: 4 });
  assert.ok(four.incomeTax < one.incomeTax);
  assert.equal(salary({ annual: 12000000 }).incomeTax, 0);
});

test('severance: exactly 1 year at 3M/month is about one month of pay', () => {
  const r = severance({ start: '2025-11-01', end: '2026-10-31', monthlyWage: 3000000 });
  assert.equal(r.serviceDays, 365);
  assert.equal(r.periodDays, 92); // Aug + Sep + Oct
  assert.equal(r.amount, Math.floor(9000000 / 92 * 30));
  assert.ok(r.eligible);
});

test('severance: under one year is not eligible; bad range errors', () => {
  assert.equal(severance({ start: '2026-01-01', end: '2026-06-30', monthlyWage: 3000000 }).eligible, false);
  assert.equal(severance({ start: '2026-02-01', end: '2026-01-01', monthlyWage: 1 }).error, 'range');
});

test('weekly holiday pay', () => {
  const full = weeklyPay({ hourly: 10320, hoursPerWeek: 40, year: 2026 });
  assert.equal(full.holidayHours, 8);
  assert.equal(full.holidayPay, 82560);
  assert.equal(full.monthlyHours, 209);
  assert.equal(full.monthly, 2156880);
  const part = weeklyPay({ hourly: 10320, hoursPerWeek: 20 });
  assert.equal(part.holidayHours, 4);
  assert.equal(weeklyPay({ hourly: 10320, hoursPerWeek: 14 }).holidayPay, 0);
  assert.ok(weeklyPay({ hourly: 10320, hoursPerWeek: 40, year: 2027 }).belowMin);
});

test('unemployment: limits and duration', () => {
  const high = unemployment({ monthlyWage: 5000000, insuredYears: 6, older: false });
  assert.equal(high.daily, 68100);
  assert.equal(high.days, 210);
  const low = unemployment({ monthlyWage: 2156880, insuredYears: 0.8, older: true });
  assert.equal(low.daily, 66048);
  assert.equal(low.days, 120);
  assert.equal(unemployment({ monthlyWage: 9e6, insuredYears: 12, older: true }).days, 270);
});

test('jeonse <-> wolse', () => {
  assert.equal(depositToRent({ amount: 100000000, rate: 5 }).monthly, 416667);
  assert.equal(rentToDeposit({ monthly: 500000, rate: 5 }).amount, 120000000);
});

test('korean age', () => {
  const a = koreanAge({ birth: '1990-12-25', ref: '2026-11-13' });
  assert.deepEqual([a.international, a.counting, a.yearAge], [35, 37, 36]);
  assert.equal(a.daysToBirthday, 42);
  assert.equal(koreanAge({ birth: '1990-11-13', ref: '2026-11-13' }).international, 36);
  assert.equal(koreanAge({ birth: '2030-01-01', ref: '2026-01-01' }).error, 'range');
});
