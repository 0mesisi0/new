import * as C from './calc.mjs';

const root = document.getElementById('calc');
if (root) init(root);

function init(root) {
  const lang = document.documentElement.lang === 'ko' ? 0 : 1;
  const t = (pair) => pair[lang];
  const nf = new Intl.NumberFormat(lang === 0 ? 'ko-KR' : 'en-US');
  const won = (v) => (lang === 0 ? `${nf.format(Math.round(v))}원` : `₩${nf.format(Math.round(v))}`);
  const today = new Date();
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const thisYear = today.getFullYear() >= 2027 ? 2027 : 2026;
  const yearField = { k: 'year', label: ['적용 연도', 'Year'], type: 'select', def: thisYear, options: [[2026, ['2026년', '2026']], [2027, ['2027년', '2027']]] };
  const yearAgo = new Date(today.getFullYear() - 3, today.getMonth(), today.getDate() + 1);

  const defs = {
    salary: {
      fields: [
        { k: 'annual', label: ['연봉 (세전)', 'Annual salary (before tax)'], type: 'money', def: 50000000 },
        { k: 'nontax', label: ['월 비과세액 (식대 등)', 'Monthly non-taxable pay (e.g. meal allowance)'], type: 'money', def: 200000 },
        { k: 'dependents', label: ['부양가족 수 (본인 포함)', 'Dependents (including yourself)'], type: 'int', def: 1, min: 1, max: 11 },
        yearField,
      ],
      run(v) {
        const r = C.salary(v);
        return [
          [['월 실수령액', 'Monthly take-home pay'], won(r.net), 'total'],
          [['연 실수령액', 'Annual take-home pay'], won(r.netAnnual)],
          [['월 세전 급여', 'Monthly gross pay'], won(r.gross)],
          [['국민연금', 'National Pension'], '−' + won(r.pension)],
          [['건강보험', 'Health Insurance'], '−' + won(r.health)],
          [['장기요양보험', 'Long-term Care Insurance'], '−' + won(r.ltc)],
          [['고용보험', 'Employment Insurance'], '−' + won(r.employment)],
          [['소득세', 'Income tax'], '−' + won(r.incomeTax)],
          [['지방소득세', 'Local income tax'], '−' + won(r.localTax)],
          [['공제액 합계', 'Total deductions'], '−' + won(r.deductions), 'sub'],
        ];
      },
    },
    severance: {
      fields: [
        { k: 'start', label: ['입사일', 'First day of work'], type: 'date', def: iso(yearAgo) },
        { k: 'end', label: ['퇴사일 (마지막 근무일)', 'Last day of work'], type: 'date', def: iso(today) },
        { k: 'monthlyWage', label: ['최근 3개월 월평균 급여 (세전)', 'Average monthly pay, last 3 months (before tax)'], type: 'money', def: 3000000 },
        { k: 'annualBonus', label: ['연간 상여금', 'Annual bonus'], type: 'money', def: 0 },
        { k: 'annualLeavePay', label: ['연차수당 (전년도 발생분)', 'Unused annual leave pay'], type: 'money', def: 0 },
      ],
      run(v) {
        const r = C.severance(v);
        if (r.error) return { note: t(['퇴사일이 입사일보다 빠릅니다.', 'The last day must be after the first day.']) };
        const rows = [
          [['예상 퇴직금 (세전)', 'Estimated severance pay (before tax)'], won(r.amount), 'total'],
          [['재직일수', 'Days of service'], nf.format(r.serviceDays) + t(['일', ' days'])],
          [['1일 평균임금', 'Average daily wage'], won(r.dailyAvg)],
          [['평균임금 산정 기간', 'Averaging period'], r.periodDays + t(['일', ' days'])],
        ];
        return r.eligible ? rows : { rows, note: t(['재직 기간이 1년 미만이면 법정 퇴직금이 발생하지 않습니다.', 'You need at least one year of continuous service to be legally entitled to severance pay.']) };
      },
    },
    weekly: {
      fields: [
        { k: 'hourly', label: ['시급', 'Hourly wage'], type: 'money', def: C.RATES[thisYear].minWage },
        { k: 'hoursPerWeek', label: ['주 근무시간', 'Hours worked per week'], type: 'num', def: 40, min: 0, max: 52 },
        yearField,
      ],
      run(v) {
        const r = C.weeklyPay(v);
        const rows = [
          [['월 예상 급여 (주휴수당 포함)', 'Estimated monthly pay (incl. weekly holiday pay)'], won(r.monthly), 'total'],
          [['주휴수당 (1주)', 'Weekly holiday pay (per week)'], won(r.holidayPay)],
          [['주급 (주휴수당 포함)', 'Weekly pay (incl. holiday pay)'], won(r.weeklyTotal)],
          [['주휴 포함 실질 시급', 'Effective hourly rate'], won(r.effectiveHourly)],
          [['월 환산 시간', 'Paid hours per month'], r.monthlyHours + t(['시간', ' h'])],
        ];
        const notes = [];
        if (!r.eligible) notes.push(t(['주 15시간 미만 근무는 주휴수당이 발생하지 않습니다.', 'Weekly holiday pay only applies if you work 15 or more hours a week.']));
        if (r.belowMin) notes.push(t([`입력한 시급이 ${v.year}년 최저임금(${won(r.minWage)})보다 낮습니다.`, `This hourly wage is below the ${v.year} minimum wage (${won(r.minWage)}).`]));
        return { rows, note: notes.join(' ') };
      },
    },
    unemployment: {
      fields: [
        { k: 'monthlyWage', label: ['퇴직 전 3개월 월평균 급여 (세전)', 'Average monthly pay, last 3 months (before tax)'], type: 'money', def: 3000000 },
        { k: 'insuredYears', label: ['고용보험 가입 기간', 'Years insured'], type: 'select', def: 1, options: [[0, ['1년 미만', 'Under 1 year']], [1, ['1년 이상 3년 미만', '1 to under 3 years']], [3, ['3년 이상 5년 미만', '3 to under 5 years']], [5, ['5년 이상 10년 미만', '5 to under 10 years']], [10, ['10년 이상', '10 years or more']]] },
        { k: 'older', label: ['퇴사 당시 나이', 'Age when you left'], type: 'select', def: 0, options: [[0, ['50세 미만', 'Under 50']], [1, ['50세 이상 또는 장애인', '50 or older, or disabled']]] },
        { k: 'dailyHours', label: ['1일 소정근로시간', 'Contracted hours per day'], type: 'num', def: 8, min: 1, max: 8 },
      ],
      run(v) {
        const r = C.unemployment({ ...v, older: !!v.older });
        const note = r.capped ? t(['1일 상한액(68,100원)이 적용되었습니다.', 'The daily cap (₩68,100) applies.']) : r.floored ? t(['1일 하한액이 적용되었습니다.', 'The daily minimum applies.']) : '';
        return {
          rows: [
            [['예상 총 수급액', 'Estimated total benefit'], won(r.total), 'total'],
            [['1일 구직급여', 'Daily benefit'], won(r.daily)],
            [['소정급여일수', 'Benefit duration'], r.days + t(['일', ' days'])],
            [['30일 기준 수급액', 'Per 30 days'], won(r.monthly)],
          ],
          note,
        };
      },
    },
    jeonse: {
      fields: [
        { k: 'mode', label: ['계산 방식', 'Direction'], type: 'select', def: 0, options: [[0, ['보증금 → 월세', 'Deposit → monthly rent']], [1, ['월세 → 보증금', 'Monthly rent → deposit']]] },
        { k: 'amount', label: ['전환할 금액 (줄이는 보증금 또는 월세)', 'Amount to convert (deposit reduction, or monthly rent)'], type: 'money', def: 100000000 },
        { k: 'rate', label: ['전월세전환율 (연 %)', 'Conversion rate (% per year)'], type: 'num', def: C.CONVERSION_CAP, min: 0.1, max: 20, step: 0.1 },
      ],
      run(v) {
        const cap = t([`법정 상한은 연 ${C.CONVERSION_CAP}%입니다 (기준금리 ${C.BASE_RATE.toFixed(2)}% + 2%p).`, `The legal cap is ${C.CONVERSION_CAP}% a year (base rate ${C.BASE_RATE.toFixed(2)}% + 2 points).`]);
        const over = v.rate > C.CONVERSION_CAP ? t([' 입력한 전환율이 상한을 넘습니다.', ' Your rate is above the cap.']) : '';
        if (v.mode) {
          const r = C.rentToDeposit({ monthly: v.amount, rate: v.rate });
          return { rows: [[['월세에 해당하는 보증금', 'Equivalent deposit'], won(r.amount), 'total']], note: cap + over };
        }
        const r = C.depositToRent(v);
        return { rows: [[['월세', 'Monthly rent'], won(r.monthly), 'total'], [['연간 월세 합계', 'Rent per year'], won(r.monthly * 12)]], note: cap + over };
      },
    },
    age: {
      fields: [
        { k: 'birth', label: ['생년월일', 'Date of birth'], type: 'date', def: '1995-01-01' },
        { k: 'ref', label: ['기준일', 'As of'], type: 'date', def: iso(today) },
      ],
      run(v) {
        const r = C.koreanAge(v);
        if (r.error) return { note: t(['기준일이 생년월일보다 빠릅니다.', 'The reference date is before the date of birth.']) };
        const y = t(['세', '']);
        return [
          [['만 나이 (법적 나이)', 'International age (legal age in Korea)'], r.international + y, 'total'],
          [['세는 나이 (한국식 나이)', 'Korean age (counting age)'], r.counting + y],
          [['연 나이', 'Year age'], r.yearAge + y],
          [['다음 생일까지', 'Days until next birthday'], r.daysToBirthday + t(['일', ' days'])],
        ];
      },
    },
  };

  const def = defs[root.dataset.calc];
  if (!def) return;
  const form = document.createElement('form');
  form.className = 'calc-form';
  form.noValidate = true;
  const out = document.createElement('div');
  out.className = 'calc-result';
  out.setAttribute('aria-live', 'polite');
  const inputs = {};

  for (const f of def.fields) {
    const wrap = document.createElement('label');
    wrap.className = 'field';
    const span = document.createElement('span');
    span.textContent = t(f.label);
    let el;
    if (f.type === 'select') {
      el = document.createElement('select');
      for (const [val, lab] of f.options) {
        const o = document.createElement('option');
        o.value = val;
        o.textContent = t(lab);
        el.append(o);
      }
      el.value = f.def;
    } else {
      el = document.createElement('input');
      if (f.type === 'date') el.type = 'date';
      else if (f.type === 'money') { el.type = 'text'; el.inputMode = 'numeric'; el.autocomplete = 'off'; }
      else { el.type = 'number'; el.step = f.step || (f.type === 'int' ? 1 : 'any'); if (f.min != null) el.min = f.min; if (f.max != null) el.max = f.max; }
      el.value = f.type === 'money' ? nf.format(f.def) : f.def;
    }
    if (f.type === 'money') {
      el.addEventListener('input', () => {
        const digits = el.value.replace(/\D/g, '').slice(0, 13);
        el.value = digits ? nf.format(Number(digits)) : '';
      });
    }
    inputs[f.k] = el;
    wrap.append(span, el);
    form.append(wrap);
  }

  const read = () => {
    const v = {};
    for (const f of def.fields) {
      const raw = inputs[f.k].value;
      if (f.type === 'date') v[f.k] = raw;
      else if (f.type === 'money') v[f.k] = Number(raw.replace(/\D/g, '')) || 0;
      else {
        let n = Number(raw) || 0;
        if (f.min != null) n = Math.max(f.min, n);
        if (f.max != null) n = Math.min(f.max, n);
        v[f.k] = f.type === 'int' ? Math.round(n) : n;
      }
    }
    return v;
  };

  const render = () => {
    const v = read();
    out.textContent = '';
    if (def.fields.some((f) => f.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(v[f.k]))) return;
    const res = def.run(v);
    const rows = Array.isArray(res) ? res : res.rows || [];
    const dl = document.createElement('dl');
    for (const [label, value, cls] of rows) {
      const row = document.createElement('div');
      if (cls) row.className = cls;
      const dt = document.createElement('dt');
      dt.textContent = t(label);
      const dd = document.createElement('dd');
      dd.textContent = value;
      row.append(dt, dd);
      dl.append(row);
    }
    if (rows.length) out.append(dl);
    if (res.note) {
      const p = document.createElement('p');
      p.className = 'note';
      p.textContent = res.note;
      out.append(p);
    }
  };

  form.addEventListener('input', render);
  form.addEventListener('submit', (e) => e.preventDefault());
  root.textContent = '';
  root.append(form, out);
  render();
}
