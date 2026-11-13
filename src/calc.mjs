// Pure calculation logic. Shared by the browser UI, the build (salary table) and tests.

export const RATES = {
  2026: {
    minWage: 10320,
    pension: 0.0475, pensionFloor: 410000, pensionCap: 6590000,
    health: 0.03595, ltcOfHealth: 0.9448 / 7.19,
    employment: 0.009,
  },
  2027: {
    minWage: 10700,
    pension: 0.05, pensionFloor: 410000, pensionCap: 6590000,
    health: 0.03595, ltcOfHealth: 0.9994 / 7.19,
    employment: 0.009,
  },
};

// Unemployment benefit daily limits (separations on/after 2026-01-01).
export const UB = { upper: 68100, lowerHourly: 10320 * 0.8 };

// Statutory jeonse-wolse conversion cap: min(10%, BOK base rate + 2%p).
export const BASE_RATE = 3.0;
export const CONVERSION_CAP = Math.min(10, BASE_RATE + 2);

const floor10 = (v) => Math.floor(v / 10) * 10;
const M = 10000; // 만원

function earnedIncomeDeduction(total) {
  let d;
  if (total <= 500 * M) d = total * 0.7;
  else if (total <= 1500 * M) d = 350 * M + (total - 500 * M) * 0.4;
  else if (total <= 4500 * M) d = 750 * M + (total - 1500 * M) * 0.15;
  else if (total <= 10000 * M) d = 1200 * M + (total - 4500 * M) * 0.05;
  else d = 1475 * M + (total - 10000 * M) * 0.02;
  return Math.min(d, 2000 * M);
}

// "특별소득공제 등" from the NTS simplified withholding table formula.
function specialDeduction(total, n) {
  let d;
  if (n >= 3) {
    const base = 500 * M;
    if (total <= 3000 * M) d = base + total * 0.07;
    else if (total <= 4500 * M) d = base + total * 0.07 - (total - 3000 * M) * 0.05;
    else if (total <= 7000 * M) d = base + total * 0.05;
    else d = base + total * 0.03;
    if (total > 4000 * M) d += (total - 4000 * M) * 0.04;
  } else {
    const base = (n <= 1 ? 310 : 360) * M;
    if (total <= 3000 * M) d = base + total * 0.04;
    else if (total <= 4500 * M) d = base + total * 0.04 - (total - 3000 * M) * 0.05;
    else if (total <= 7000 * M) d = base + total * 0.015;
    else d = base + total * 0.005;
  }
  return d;
}

const BRACKETS = [
  [1400 * M, 0.06, 0],
  [5000 * M, 0.15, 84 * M],
  [8800 * M, 0.24, 624 * M],
  [15000 * M, 0.35, 1536 * M],
  [30000 * M, 0.38, 3706 * M],
  [50000 * M, 0.40, 9406 * M],
  [100000 * M, 0.42, 17406 * M],
  [Infinity, 0.45, 38406 * M],
];

function progressiveTax(base) {
  let prev = 0;
  for (const [limit, rate, acc] of BRACKETS) {
    if (base <= limit) return acc + (base - prev) * rate;
    prev = limit;
  }
  return 0;
}

function earnedIncomeCredit(tax, total) {
  const credit = tax <= 130 * M ? tax * 0.55 : 71.5 * M + (tax - 130 * M) * 0.3;
  let cap;
  if (total <= 3300 * M) cap = 74 * M;
  else if (total <= 7000 * M) cap = Math.max(74 * M - (total - 3300 * M) * 0.008, 66 * M);
  else if (total <= 12000 * M) cap = Math.max(66 * M - (total - 7000 * M) * 0.5, 50 * M);
  else cap = Math.max(50 * M - (total - 12000 * M) * 0.5, 20 * M);
  return Math.min(credit, cap);
}

/** Estimated monthly withholding income tax (national) on a monthly taxable wage. */
export function monthlyIncomeTax(taxableMonthly, dependents, annualPension) {
  const total = taxableMonthly * 12;
  const n = Math.max(1, dependents);
  const base = total - earnedIncomeDeduction(total) - 150 * M * n - annualPension - specialDeduction(total, n);
  if (base <= 0) return 0;
  const tax = progressiveTax(base);
  return floor10(Math.max(0, tax - earnedIncomeCredit(tax, total)) / 12);
}

/** Monthly take-home pay from an annual salary. */
export function salary({ annual, nontax = 200000, dependents = 1, year = 2026 }) {
  const r = RATES[year] || RATES[2026];
  const gross = Math.round(annual / 12);
  const taxable = Math.max(0, gross - nontax);
  const pensionBase = Math.floor(Math.min(Math.max(taxable, r.pensionFloor), r.pensionCap) / 1000) * 1000;
  const pension = taxable > 0 ? floor10(pensionBase * r.pension) : 0;
  const health = floor10(taxable * r.health);
  const ltc = floor10(health * r.ltcOfHealth);
  const employment = floor10(taxable * r.employment);
  const incomeTax = monthlyIncomeTax(taxable, dependents, pension * 12);
  const localTax = floor10(incomeTax * 0.1);
  const deductions = pension + health + ltc + employment + incomeTax + localTax;
  const net = Math.round(gross - deductions);
  return { gross, taxable, pension, health, ltc, employment, incomeTax, localTax, deductions, net, netAnnual: net * 12 };
}

const DAY = 86400000;
const parseDate = (s) => {
  const [y, m, d] = String(s).split('-').map(Number);
  return Date.UTC(y, m - 1, d);
};

/**
 * Statutory severance pay.
 * start = first day of work, end = last day of work (inclusive).
 * monthlyWage = average monthly wage over the final 3 months (pre-tax).
 */
export function severance({ start, end, monthlyWage, annualBonus = 0, annualLeavePay = 0 }) {
  const s = parseDate(start);
  const e = parseDate(end);
  if (!(e >= s)) return { error: 'range' };
  const serviceDays = Math.round((e - s) / DAY) + 1;
  // Days in the 3 calendar months ending on the last working day.
  const ed = new Date(e + DAY);
  const threeMonthsBack = Date.UTC(ed.getUTCFullYear(), ed.getUTCMonth() - 3, ed.getUTCDate());
  const periodDays = Math.round((e + DAY - threeMonthsBack) / DAY);
  const wages3m = monthlyWage * 3 + (annualBonus + annualLeavePay) * 3 / 12;
  const dailyAvg = wages3m / periodDays;
  const amount = Math.floor(dailyAvg * 30 * serviceDays / 365);
  return { serviceDays, periodDays, dailyAvg, amount, eligible: serviceDays >= 365 };
}

/** Weekly holiday allowance and monthly pay from an hourly wage. */
export function weeklyPay({ hourly, hoursPerWeek, year = 2026 }) {
  const r = RATES[year] || RATES[2026];
  const eligible = hoursPerWeek >= 15;
  const holidayHours = eligible ? Math.min(hoursPerWeek, 40) / 40 * 8 : 0;
  const weeklyBase = hourly * hoursPerWeek;
  const holidayPay = hourly * holidayHours;
  const weeksPerMonth = 365 / 7 / 12;
  // Rounded up, following the convention behind the official 209-hour month.
  const monthlyHours = Math.ceil((hoursPerWeek + holidayHours) * weeksPerMonth - 1e-9);
  return {
    eligible, holidayHours, weeklyBase, holidayPay,
    weeklyTotal: weeklyBase + holidayPay,
    monthlyHours,
    monthly: Math.round(hourly * monthlyHours),
    effectiveHourly: hoursPerWeek > 0 ? (weeklyBase + holidayPay) / hoursPerWeek : 0,
    belowMin: hourly < r.minWage,
    minWage: r.minWage,
  };
}

const UB_DAYS = [
  // [min insured years, under 50, 50+ or disabled]
  [10, 240, 270], [5, 210, 240], [3, 180, 210], [1, 150, 180], [0, 120, 120],
];

/** Job-seeking (unemployment) benefit estimate. */
export function unemployment({ monthlyWage, insuredYears, older = false, dailyHours = 8 }) {
  const dailyWage = monthlyWage * 3 / 91;
  const upper = UB.upper;
  const lower = Math.round(UB.lowerHourly * Math.min(Math.max(dailyHours, 4), 8));
  const raw = dailyWage * 0.6;
  const daily = Math.round(Math.max(Math.min(raw, upper), lower));
  const row = UB_DAYS.find(([y]) => insuredYears >= y);
  const days = older ? row[2] : row[1];
  return { dailyWage, daily, days, total: daily * days, monthly: daily * 30, capped: raw > upper, floored: raw < lower };
}

/** Jeonse (lump-sum deposit) <-> wolse (monthly rent) conversion. */
export function depositToRent({ amount, rate }) {
  return { monthly: Math.round(amount * rate / 100 / 12) };
}
export function rentToDeposit({ monthly, rate }) {
  return { amount: rate > 0 ? Math.round(monthly * 12 / (rate / 100)) : 0 };
}

/** International age, Korean (counting) age and year age. */
export function koreanAge({ birth, ref }) {
  const [by, bm, bd] = birth.split('-').map(Number);
  const [ry, rm, rd] = ref.split('-').map(Number);
  if (parseDate(ref) < parseDate(birth)) return { error: 'range' };
  const hadBirthday = rm > bm || (rm === bm && rd >= bd);
  const international = ry - by - (hadBirthday ? 0 : 1);
  let next = Date.UTC(ry, bm - 1, bd);
  if (next < Date.UTC(ry, rm - 1, rd)) next = Date.UTC(ry + 1, bm - 1, bd);
  const daysToBirthday = Math.round((next - Date.UTC(ry, rm - 1, rd)) / DAY);
  return { international, counting: ry - by + 1, yearAge: ry - by, daysToBirthday };
}
