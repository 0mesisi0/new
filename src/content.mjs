// All page copy, in Korean and English. `body` is trusted HTML written here.

export const site = {
  name: { ko: '원캘크', en: 'WonCalc' },
  tagline: { ko: '한국 급여·노동 계산기', en: 'Korea pay & work calculators' },
  updated: '2026-11-13',
};

export const ui = {
  ko: {
    home: '홈', calculators: '계산기', guides: '가이드', faq: '자주 묻는 질문', related: '다른 계산기',
    updated: '최종 업데이트', about: '소개', privacy: '개인정보처리방침', other: 'English',
    noscript: '계산기를 사용하려면 자바스크립트를 켜 주세요.',
    disclaimer: '이 계산기는 참고용 추정치를 제공합니다. 실제 금액은 회사의 급여 규정과 개인 상황에 따라 달라질 수 있으며, 법률·세무 자문이 아닙니다.',
    notFound: '페이지를 찾을 수 없습니다.',
  },
  en: {
    home: 'Home', calculators: 'Calculators', guides: 'Guides', faq: 'Frequently asked questions', related: 'More calculators',
    updated: 'Last updated', about: 'About', privacy: 'Privacy', other: '한국어',
    noscript: 'Please enable JavaScript to use the calculator.',
    disclaimer: 'These calculators give estimates for reference only. Actual amounts depend on your employer\'s payroll rules and your circumstances. This is not legal or tax advice.',
    notFound: 'Page not found.',
  },
};

export const home = {
  ko: {
    title: '원캘크 – 연봉 실수령액·퇴직금·주휴수당 계산기 (2026·2027)',
    desc: '2026년·2027년 요율을 반영한 연봉 실수령액, 퇴직금, 주휴수당, 실업급여, 전월세 전환, 만 나이 계산기. 가입 없이 무료로 바로 계산하세요.',
    h1: '한국 급여·노동 계산기',
    lead: '2026년과 2027년 최저임금·4대보험 요율을 반영했습니다. 입력한 값은 브라우저 안에서만 계산되며 어디에도 전송되지 않습니다.',
  },
  en: {
    title: 'WonCalc – Korea Salary, Severance & Work Calculators (2026–2027)',
    desc: 'Free calculators for working in South Korea: net salary after tax, severance pay, weekly holiday pay, unemployment benefits, jeonse conversion and Korean age. Updated for 2026 and 2027.',
    h1: 'Korea pay & work calculators',
    lead: 'Built for people working in South Korea, in plain English. Updated with 2026 and 2027 minimum wage and social insurance rates. Everything is calculated in your browser; nothing you type is sent anywhere.',
  },
};

export const pages = [
  {
    id: 'salary', slug: 'salary-calculator', type: 'calc',
    ko: {
      nav: '연봉 실수령액', card: '연봉에서 4대보험과 세금을 뺀 월 실수령액',
      title: '연봉 실수령액 계산기 2026·2027 – 4대보험·소득세 공제 후 월급',
      desc: '연봉을 입력하면 국민연금, 건강보험, 장기요양보험, 고용보험, 소득세, 지방소득세를 뺀 월 실수령액을 계산합니다. 2026년·2027년 요율 반영.',
      h1: '연봉 실수령액 계산기',
      lead: '세전 연봉을 입력하면 4대보험과 소득세를 공제한 월 실수령액을 바로 확인할 수 있습니다.',
      body: `
<h2>실수령액은 어떻게 계산되나요?</h2>
<p>월 세전 급여(연봉 ÷ 12)에서 비과세액을 뺀 금액이 보험료와 세금의 기준이 됩니다. 여기에 아래 요율을 적용해 공제액을 구합니다.</p>
<div class="table-scroll"><table>
<thead><tr><th>항목 (근로자 부담)</th><th>2026년</th><th>2027년</th></tr></thead>
<tbody>
<tr><td>국민연금</td><td>4.75%</td><td>5.0%</td></tr>
<tr><td>건강보험</td><td>3.595%</td><td>3.595%</td></tr>
<tr><td>장기요양보험 (건강보험료 대비)</td><td>13.14%</td><td>13.90%</td></tr>
<tr><td>고용보험</td><td>0.9%</td><td>0.9%</td></tr>
</tbody></table></div>
<p>국민연금은 기준소득월액 상한(2026년 7월~2027년 6월 659만 원)까지만 부과되므로, 월급이 그보다 많아도 연금 보험료는 더 늘지 않습니다.</p>
<h2>소득세는 어떻게 추정하나요?</h2>
<p>소득세는 국세청 근로소득 간이세액표의 산식을 따라 추정합니다. 근로소득공제, 부양가족 1인당 150만 원의 인적공제, 연금보험료 공제 등을 적용한 뒤 6~45%의 누진세율과 근로소득세액공제를 반영합니다. 지방소득세는 소득세의 10%입니다.</p>
<p>실제 급여명세서와는 몇 천 원 정도 차이가 날 수 있고, 최종 세금은 다음 해 연말정산에서 확정됩니다.</p>
<h2>비과세액이란?</h2>
<p>월 20만 원 이하의 식대, 자가운전보조금(월 20만 원 이하), 출산·보육수당 등은 세금과 4대보험료가 부과되지 않습니다. 대부분의 회사가 식대 20만 원을 비과세로 처리하므로 기본값을 20만 원으로 두었습니다.</p>`,
      faq: [
        ['연봉 5,000만 원의 실수령액은 얼마인가요?', '2026년 기준, 부양가족 1명(본인)·비과세 식대 20만 원일 때 월 약 357만 원입니다. 2027년에는 국민연금과 장기요양보험 요율이 올라 월 1만 원가량 줄어듭니다.'],
        ['퇴직금이 연봉에 포함된 경우는 어떻게 하나요?', '퇴직금 포함 연봉이라면 연봉을 13으로 나눈 뒤 12를 곱한 금액을 입력하세요. 계산기는 연봉 전체를 12개월 급여로 봅니다.'],
        ['2027년에 실수령액이 줄어드는 이유는 무엇인가요?', '국민연금 보험료율이 9.5%에서 10.0%로(근로자 부담 4.75% → 5.0%), 장기요양보험료율이 0.9448%에서 0.9994%로 오르기 때문입니다. 건강보험료율은 7.19%로 동결되었습니다.'],
      ],
    },
    en: {
      nav: 'Net salary', card: 'Monthly take-home pay after Korean tax and insurance',
      title: 'Korea Salary Calculator 2026–2027: Net Pay After Tax',
      desc: 'Enter your annual salary in KRW to see your monthly take-home pay in South Korea after national pension, health insurance, employment insurance and income tax. Updated for 2026 and 2027.',
      h1: 'Korea net salary calculator',
      lead: 'Enter your gross annual salary in won to see what actually lands in your bank account each month.',
      body: `
<h2>What gets deducted from a Korean paycheck?</h2>
<p>Employers in South Korea withhold four social insurance premiums and two taxes from your pay every month. They are calculated on your monthly gross pay minus any non-taxable allowances.</p>
<div class="table-scroll"><table>
<thead><tr><th>Deduction (employee share)</th><th>2026</th><th>2027</th></tr></thead>
<tbody>
<tr><td>National Pension (국민연금)</td><td>4.75%</td><td>5.0%</td></tr>
<tr><td>Health Insurance (건강보험)</td><td>3.595%</td><td>3.595%</td></tr>
<tr><td>Long-term Care (장기요양), % of health premium</td><td>13.14%</td><td>13.90%</td></tr>
<tr><td>Employment Insurance (고용보험)</td><td>0.9%</td><td>0.9%</td></tr>
</tbody></table></div>
<p>The pension premium is only charged on the first ₩6,590,000 of monthly income (July 2026 to June 2027), so it stops growing above that level.</p>
<h2>How income tax is estimated</h2>
<p>Monthly income tax follows the formula behind the National Tax Service's simplified withholding table. It applies the earned income deduction, a ₩1.5 million personal deduction per dependent, your pension contributions, progressive rates from 6% to 45%, and the earned income tax credit. Local income tax is a further 10% of your income tax.</p>
<p>Expect your real payslip to differ by a few thousand won. Your final tax bill is settled in the year-end tax settlement (연말정산) each January or February.</p>
<h2>Notes for foreign workers</h2>
<ul>
<li><strong>Flat tax option.</strong> Foreign employees can choose a flat 19% income tax rate instead of the progressive rates for a limited number of years after they first start working in Korea. It usually only pays off at high salaries. This calculator uses the standard progressive rates.</li>
<li><strong>Pension refunds.</strong> Depending on your nationality and visa, you may be able to claim your National Pension contributions back as a lump sum when you leave Korea. Check with the National Pension Service.</li>
<li><strong>Non-taxable pay.</strong> A meal allowance of up to ₩200,000 a month is tax free, and most companies structure pay this way, so it is the default here.</li>
</ul>`,
      faq: [
        ['What is the take-home pay on a ₩50 million salary in Korea?', 'About ₩3.57 million a month in 2026, for a single person with a ₩200,000 tax-free meal allowance. In 2027 it drops by roughly ₩10,000 a month because pension and long-term care rates rise.'],
        ['Is severance pay included in my annual salary?', 'Usually not. Severance is paid separately when you leave. If your contract says the salary includes severance (a "13th month" contract), multiply your annual figure by 12/13 before entering it.'],
        ['Do foreigners pay the same deductions as Koreans?', 'Mostly yes. Health insurance and income tax apply to everyone. National Pension depends on whether your home country has a reciprocal arrangement, and Employment Insurance depends on your visa type.'],
      ],
    },
  },
  {
    id: 'severance', slug: 'severance-pay-calculator', type: 'calc',
    ko: {
      nav: '퇴직금', card: '입사일·퇴사일·급여로 예상 퇴직금 계산',
      title: '퇴직금 계산기 – 평균임금 기준 예상 퇴직금 자동 계산',
      desc: '입사일, 퇴사일, 최근 3개월 급여를 입력하면 1일 평균임금과 예상 퇴직금을 계산합니다. 상여금과 연차수당도 반영됩니다.',
      h1: '퇴직금 계산기',
      lead: '입사일과 퇴사일, 최근 3개월 급여만 입력하면 법정 퇴직금을 바로 계산합니다.',
      body: `
<h2>퇴직금 계산 공식</h2>
<p><strong>퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365)</strong></p>
<p>1일 평균임금은 퇴직 전 3개월 동안 받은 임금 총액을 그 기간의 총 일수(89~92일)로 나눈 금액입니다. 연간 상여금과 연차수당은 3/12만큼 포함합니다.</p>
<h2>퇴직금을 받을 수 있는 조건</h2>
<ul>
<li>같은 사업장에서 <strong>1년 이상</strong> 계속 근무</li>
<li>4주 평균 주 <strong>15시간 이상</strong> 근무</li>
</ul>
<p>정규직, 계약직, 아르바이트 모두 조건을 채우면 받을 수 있습니다. 회사는 퇴직일로부터 14일 이내에 지급해야 합니다.</p>
<h2>평균임금이 통상임금보다 적다면</h2>
<p>퇴직 직전에 휴직이나 결근으로 급여가 줄었다면 평균임금이 통상임금보다 낮아질 수 있습니다. 이 경우 통상임금을 평균임금으로 보고 계산합니다.</p>`,
      faq: [
        ['퇴직금에도 세금이 붙나요?', '네. 퇴직소득세가 부과되지만 근속연수공제가 커서 일반 근로소득보다 세율이 훨씬 낮습니다. 이 계산기는 세전 금액을 보여줍니다.'],
        ['1년에서 하루 모자라면 받을 수 없나요?', '법정 퇴직금은 계속근로기간 1년 이상일 때만 발생합니다. 365일을 채우지 못하면 회사에 지급 의무가 없습니다.'],
        ['수습 기간도 재직 기간에 포함되나요?', '네. 수습·인턴 기간도 같은 회사에서 이어서 근무했다면 계속근로기간에 포함됩니다.'],
      ],
    },
    en: {
      nav: 'Severance pay', card: 'Estimate your Korean severance (퇴직금) from your dates and pay',
      title: 'Korea Severance Pay Calculator (퇴직금) – For Foreigners & Teachers',
      desc: 'Calculate your South Korean severance pay from your start date, end date and last three months of wages. Explains who qualifies, when it must be paid and how it is taxed.',
      h1: 'Korea severance pay calculator',
      lead: 'Anyone who works in Korea for a year or more is owed severance pay (퇴직금), whatever their nationality. Enter your dates and pay to estimate it.',
      body: `
<h2>The formula</h2>
<p><strong>Severance = average daily wage × 30 × (days of service ÷ 365)</strong></p>
<p>Your average daily wage is everything you were paid in the three months before leaving, divided by the number of calendar days in those months (89 to 92). Annual bonuses and unused leave pay count at 3/12 of their yearly amount. In practice it comes to roughly one month of pay for each year worked.</p>
<h2>Who qualifies?</h2>
<ul>
<li>You worked for the same employer for <strong>at least one continuous year</strong>.</li>
<li>You averaged <strong>15 or more hours a week</strong>.</li>
</ul>
<p>This applies equally to foreign workers, including English teachers on E-2 visas. It does not matter whether you resign, are dismissed, or your contract simply ends. Your employer must pay within 14 days of your last day.</p>
<h2>Common questions from teachers</h2>
<p>If you renew with the same school, your service keeps accumulating and severance is paid when you finally leave. Housing provided by the school is generally not counted as wages, but a cash housing allowance paid every month usually is.</p>`,
      faq: [
        ['Is severance pay taxed in Korea?', 'Yes, but lightly. Retirement income tax has generous deductions based on years of service, so the effective rate is far lower than normal income tax. This calculator shows the pre-tax amount.'],
        ['What if I leave after 11 months?', 'There is no legal entitlement before one full year of continuous service. Some contracts pay a pro-rated amount anyway, but employers are not required to.'],
        ['My employer says severance is included in my monthly salary. Is that allowed?', 'Generally no. Korean courts have held that paying severance in monthly instalments is not valid severance, apart from narrow interim-payment cases. Contact the Ministry of Employment and Labor (call 1350) if you are refused payment.'],
      ],
    },
  },
  {
    id: 'weekly', slug: 'weekly-holiday-pay-calculator', type: 'calc',
    ko: {
      nav: '주휴수당·시급', card: '시급과 근무시간으로 주휴수당·월급 계산',
      title: '주휴수당 계산기 2026·2027 – 시급으로 월급 계산',
      desc: '시급과 주 근무시간을 입력하면 주휴수당과 주휴수당 포함 월급을 계산합니다. 2026년 최저시급 10,320원, 2027년 10,700원 반영.',
      h1: '주휴수당·시급 계산기',
      lead: '시급과 주 근무시간을 입력하면 주휴수당과 한 달 예상 급여를 계산합니다.',
      body: `
<h2>주휴수당이란?</h2>
<p>1주일에 15시간 이상 일하고 정해진 근무일을 모두 출근하면, 하루치 임금을 추가로 받는 유급휴일 수당입니다. 아르바이트와 단시간 근로자에게도 똑같이 적용됩니다.</p>
<h2>계산 방법</h2>
<p><strong>주휴수당 = (주 근무시간 ÷ 40) × 8 × 시급</strong></p>
<p>주 40시간 이상 일하면 8시간분이 상한입니다. 예를 들어 2026년 최저시급 10,320원으로 주 20시간 일하면 주휴수당은 4시간분인 41,280원입니다.</p>
<h2>최저임금 월 환산액</h2>
<div class="table-scroll"><table>
<thead><tr><th>연도</th><th>시급</th><th>월 환산액 (209시간)</th></tr></thead>
<tbody>
<tr><td>2026년</td><td>10,320원</td><td>2,156,880원</td></tr>
<tr><td>2027년</td><td>10,700원</td><td>2,236,300원</td></tr>
</tbody></table></div>
<p>209시간은 주 40시간 근무에 주휴 8시간을 더한 48시간을 월 단위로 환산한 값입니다.</p>`,
      faq: [
        ['주 15시간 미만으로 일하면 주휴수당을 못 받나요?', '네. 4주 평균 주 15시간 미만인 초단시간 근로자는 주휴수당과 연차, 퇴직금 대상에서 제외됩니다.'],
        ['하루 결근하면 그 주 주휴수당은 어떻게 되나요?', '정해진 근무일을 모두 출근해야 발생하므로 결근한 주에는 주휴수당이 나오지 않습니다. 지각과 조퇴는 결근이 아닙니다.'],
        ['5인 미만 사업장에서도 주휴수당을 받을 수 있나요?', '네. 주휴수당은 사업장 규모와 관계없이 적용됩니다.'],
      ],
    },
    en: {
      nav: 'Hourly & holiday pay', card: 'Turn an hourly wage into monthly pay, with weekly holiday pay',
      title: 'Korea Weekly Holiday Pay Calculator (주휴수당) – Hourly to Monthly',
      desc: 'Convert a Korean hourly wage into weekly and monthly pay, including the weekly holiday allowance (주휴수당). Includes the 2026 (₩10,320) and 2027 (₩10,700) minimum wage.',
      h1: 'Korea weekly holiday pay calculator',
      lead: 'Part-timers in Korea are owed an extra paid day each week. Enter your hourly wage and weekly hours to see what you should be getting.',
      body: `
<h2>What is weekly holiday pay?</h2>
<p>Weekly holiday pay (주휴수당, <em>juhyu sudang</em>) is one extra day of wages for each week in which you work 15 hours or more and show up for all of your scheduled days. It applies to part-time jobs and to foreign workers exactly as it does to full-time Korean staff.</p>
<h2>The formula</h2>
<p><strong>Weekly holiday pay = (weekly hours ÷ 40) × 8 × hourly wage</strong></p>
<p>It is capped at 8 hours of pay. Someone working 20 hours a week at the 2026 minimum wage of ₩10,320 gets 4 extra hours, or ₩41,280, every week.</p>
<h2>Minimum wage in Korea</h2>
<div class="table-scroll"><table>
<thead><tr><th>Year</th><th>Hourly</th><th>Monthly (209 hours)</th></tr></thead>
<tbody>
<tr><td>2026</td><td>₩10,320</td><td>₩2,156,880</td></tr>
<tr><td>2027</td><td>₩10,700</td><td>₩2,236,300</td></tr>
</tbody></table></div>
<p>The 209-hour monthly figure is a 40-hour week plus the 8 paid holiday hours, averaged over a month.</p>`,
      faq: [
        ['Do international students with part-time jobs get weekly holiday pay?', 'Yes. If you work 15 or more hours in a week and attend every scheduled shift, you are entitled to it regardless of your visa.'],
        ['What if I miss one shift?', 'You lose the holiday pay for that week only. Being late or leaving early does not count as an absence.'],
        ['My boss says small shops do not have to pay it. Is that right?', 'No. Weekly holiday pay applies to workplaces of every size, including those with fewer than five employees.'],
      ],
    },
  },
  {
    id: 'unemployment', slug: 'unemployment-benefit-calculator', type: 'calc',
    ko: {
      nav: '실업급여', card: '예상 구직급여 일액과 수급 기간',
      title: '실업급여 계산기 2026 – 구직급여 수급액·수급 기간',
      desc: '퇴직 전 급여와 고용보험 가입 기간을 입력하면 1일 구직급여액, 소정급여일수, 총 예상 수급액을 계산합니다. 2026년 상한액 68,100원 반영.',
      h1: '실업급여 계산기',
      lead: '퇴직 전 급여와 고용보험 가입 기간으로 예상 구직급여를 계산합니다. 2026년 1월 1일 이후 퇴사자 기준입니다.',
      body: `
<h2>구직급여 계산 방법</h2>
<p><strong>1일 구직급여 = 퇴직 전 3개월 1일 평균임금 × 60%</strong></p>
<p>단, 상한액과 하한액이 있습니다.</p>
<ul>
<li>상한액: 1일 <strong>68,100원</strong></li>
<li>하한액: 최저임금의 80% × 1일 소정근로시간 (8시간 기준 <strong>66,048원</strong>)</li>
</ul>
<p>상한과 하한의 차이가 작아서 대부분의 수급자는 하루 66,048원~68,100원, 30일 기준 약 198만~204만 원을 받습니다.</p>
<h2>소정급여일수</h2>
<div class="table-scroll"><table>
<thead><tr><th>가입 기간</th><th>50세 미만</th><th>50세 이상·장애인</th></tr></thead>
<tbody>
<tr><td>1년 미만</td><td>120일</td><td>120일</td></tr>
<tr><td>1년 이상 3년 미만</td><td>150일</td><td>180일</td></tr>
<tr><td>3년 이상 5년 미만</td><td>180일</td><td>210일</td></tr>
<tr><td>5년 이상 10년 미만</td><td>210일</td><td>240일</td></tr>
<tr><td>10년 이상</td><td>240일</td><td>270일</td></tr>
</tbody></table></div>
<h2>수급 조건</h2>
<p>퇴직 전 18개월 동안 고용보험 피보험 단위기간이 180일 이상이어야 하고, 권고사직·계약만료·해고 등 비자발적 사유로 퇴사해야 합니다. 2027년 상한액은 아직 확정되지 않아 2026년 기준만 제공합니다.</p>`,
      faq: [
        ['자진 퇴사해도 실업급여를 받을 수 있나요?', '원칙적으로는 받을 수 없습니다. 다만 임금 체불, 통근 곤란(왕복 3시간 이상), 직장 내 괴롭힘 등 정당한 사유가 인정되면 받을 수 있습니다.'],
        ['실업급여는 언제까지 신청해야 하나요?', '퇴직 다음 날부터 12개월 안에 수급을 마쳐야 합니다. 늦게 신청하면 남은 급여일수를 다 받지 못할 수 있으니 퇴사 후 바로 신청하세요.'],
        ['2025년에 퇴사했는데 2026년에 신청하면 어떤 기준이 적용되나요?', '퇴직일 기준이 적용됩니다. 2025년 퇴사자는 2025년 상한액(66,000원)이 적용됩니다.'],
      ],
    },
    en: {
      nav: 'Unemployment benefit', card: 'Estimate your daily benefit and how long it lasts',
      title: 'Korea Unemployment Benefit Calculator 2026 (실업급여)',
      desc: 'Estimate your South Korean unemployment (job-seeking) benefit: daily amount, number of days and total payout. Uses the 2026 daily cap of ₩68,100 and explains eligibility for foreigners.',
      h1: 'Korea unemployment benefit calculator',
      lead: 'Estimate the job-seeking benefit (구직급여) paid by Korean Employment Insurance. Figures apply if you left your job on or after 1 January 2026.',
      body: `
<h2>How the benefit is calculated</h2>
<p><strong>Daily benefit = 60% of your average daily wage over your last three months</strong></p>
<p>That figure is then limited on both sides:</p>
<ul>
<li>Maximum: <strong>₩68,100</strong> a day</li>
<li>Minimum: 80% of the minimum wage × your contracted daily hours (<strong>₩66,048</strong> for an 8-hour day)</li>
</ul>
<p>Because the two limits are so close, almost every full-time worker receives between ₩66,048 and ₩68,100 a day, or roughly ₩1.98 to ₩2.04 million per 30 days.</p>
<h2>How long it lasts</h2>
<div class="table-scroll"><table>
<thead><tr><th>Years insured</th><th>Under 50</th><th>50+ or disabled</th></tr></thead>
<tbody>
<tr><td>Under 1</td><td>120 days</td><td>120 days</td></tr>
<tr><td>1 to under 3</td><td>150 days</td><td>180 days</td></tr>
<tr><td>3 to under 5</td><td>180 days</td><td>210 days</td></tr>
<tr><td>5 to under 10</td><td>210 days</td><td>240 days</td></tr>
<tr><td>10 or more</td><td>240 days</td><td>270 days</td></tr>
</tbody></table></div>
<h2>Who can claim?</h2>
<p>You need at least 180 insured days in the 18 months before leaving, and you must have lost the job involuntarily: dismissal, contract expiry, or a recommended resignation. You also have to be able to work and be actively looking.</p>
<p><strong>Foreign workers:</strong> F-2, F-5 and F-6 visa holders are covered the same way as Korean nationals. For other visas, coverage depends on the visa type and on whether you were enrolled in the unemployment benefit part of Employment Insurance. Check your payslip for the 고용보험 deduction and confirm with your local Employment Center (call 1350).</p>`,
      faq: [
        ['Can I get unemployment benefits if I quit?', 'Usually not. There are exceptions for justified reasons such as unpaid wages, workplace harassment, or a commute that became longer than three hours a day.'],
        ['How soon do I need to apply?', 'Benefits must be fully paid out within 12 months of the day after you leave, so apply straight away. Late applications can lose part of the entitlement.'],
        ['Can I leave Korea while receiving benefits?', 'You must attend periodic recognition appointments and show you are looking for work in Korea. Extended stays abroad generally stop payments.'],
      ],
    },
  },
  {
    id: 'jeonse', slug: 'jeonse-wolse-calculator', type: 'calc',
    ko: {
      nav: '전월세 전환', card: '보증금과 월세를 법정 전환율로 환산',
      title: '전월세 전환율 계산기 – 보증금↔월세 전환 (법정 상한 5.0%)',
      desc: '전세 보증금을 월세로, 월세를 보증금으로 환산합니다. 법정 전월세전환율 상한(기준금리 3.00% + 2%p = 연 5.0%)을 기본값으로 적용합니다.',
      h1: '전월세 전환 계산기',
      lead: '보증금을 줄이고 월세로 돌릴 때, 또는 그 반대일 때 적정 금액을 계산합니다.',
      body: `
<h2>전월세전환율이란?</h2>
<p>보증금의 일부 또는 전부를 월세로 바꿀 때 적용하는 연 환산 비율입니다.</p>
<p><strong>월세 = 전환할 보증금 × 전환율 ÷ 12</strong></p>
<p>예를 들어 보증금 1억 원을 연 5.0%로 전환하면 월세는 약 416,667원입니다.</p>
<h2>법정 상한</h2>
<p>주택임대차보호법은 전환율이 <strong>연 10%</strong>와 <strong>한국은행 기준금리 + 2%p</strong> 중 낮은 값을 넘지 못하도록 정하고 있습니다. 기준금리가 3.00%인 현재(2026년 10월 금융통화위원회 기준) 상한은 <strong>연 5.0%</strong>입니다.</p>
<h2>상한이 적용되는 경우</h2>
<p>법정 상한은 <strong>계약 기간 중이나 계약 갱신 시</strong> 보증금을 월세로 전환할 때 적용됩니다. 새로운 세입자와 맺는 신규 계약이나, 월세를 보증금으로 돌리는 경우에는 강제 적용되지 않고 시장 전환율을 참고해 협의합니다.</p>`,
      faq: [
        ['집주인이 상한보다 높은 전환율을 요구하면 어떻게 하나요?', '상한을 넘는 부분은 무효이며, 이미 낸 초과 월세는 반환을 청구할 수 있습니다. 주택임대차분쟁조정위원회에 조정을 신청할 수 있습니다.'],
        ['기준금리가 바뀌면 이미 정한 월세도 바뀌나요?', '아니요. 전환 시점의 기준금리가 적용되고, 이후 금리가 바뀌어도 약정한 월세는 그대로입니다.'],
        ['시장 전환율은 어디서 확인하나요?', '한국부동산원이 지역별·주택유형별 전월세전환율을 매월 공표합니다.'],
      ],
    },
    en: {
      nav: 'Jeonse ↔ rent', card: 'Convert a key-money deposit into monthly rent and back',
      title: 'Jeonse to Wolse Calculator – Convert Korean Deposit to Monthly Rent',
      desc: 'Convert a Korean jeonse (key money) deposit into monthly rent, or monthly rent into an equivalent deposit. Uses the current legal conversion cap of 5.0% a year.',
      h1: 'Jeonse to wolse calculator',
      lead: 'Korean landlords will often trade a bigger deposit for lower rent. This shows what a fair swap looks like.',
      body: `
<h2>Jeonse, wolse and the conversion rate</h2>
<p><strong>Jeonse (전세)</strong> is a rental with one large deposit and no monthly rent. <strong>Wolse (월세)</strong> is a smaller deposit plus monthly rent. Most real leases sit somewhere in between, and the <em>conversion rate</em> (전월세전환율) is the yearly percentage used to trade deposit for rent.</p>
<p><strong>Monthly rent = deposit converted × rate ÷ 12</strong></p>
<p>Lowering your deposit by ₩100 million at 5.0% adds about ₩416,667 to your monthly rent.</p>
<h2>The legal cap</h2>
<p>Under the Housing Lease Protection Act the rate cannot exceed the lower of <strong>10%</strong> and the <strong>Bank of Korea base rate plus 2 percentage points</strong>. With the base rate at 3.00% (as of the October 2026 rate decision), the cap is <strong>5.0% a year</strong>.</p>
<p>The cap applies when deposit is converted to rent <strong>during a lease or at renewal</strong>. For a brand-new lease the split is negotiable, and market rates are often higher than the cap.</p>
<h2>Tips for negotiating</h2>
<p>A higher deposit means lower rent but more money at risk. Before paying a large deposit, check the building's registry (등기부등본) for existing mortgages and consider deposit return guarantee insurance (전세보증보험).</p>`,
      faq: [
        ['What happens if my landlord charges more than the cap at renewal?', 'The excess is void and you can claim it back. You can apply to a Housing Lease Dispute Mediation Committee for help.'],
        ['Does my rent change if the base rate changes?', 'No. The rate at the time you agreed the conversion applies. Later base rate changes do not alter an agreed rent.'],
        ['Is it better to pay a bigger deposit or more rent?', 'Compare the conversion rate with what your money could earn, or what a deposit loan would cost you. If you can borrow below the conversion rate, a larger deposit is usually cheaper.'],
      ],
    },
  },
  {
    id: 'age', slug: 'korean-age-calculator', type: 'calc',
    ko: {
      nav: '만 나이', card: '만 나이·세는 나이·연 나이 한 번에 계산',
      title: '만 나이 계산기 – 생년월일로 만 나이·한국 나이 계산',
      desc: '생년월일을 입력하면 만 나이, 세는 나이(한국 나이), 연 나이를 한 번에 계산합니다. 2023년 6월부터 시행된 만 나이 통일법 설명 포함.',
      h1: '만 나이 계산기',
      lead: '생년월일만 입력하면 만 나이, 세는 나이, 연 나이를 바로 확인할 수 있습니다.',
      body: `
<h2>세 가지 나이 계산법</h2>
<ul>
<li><strong>만 나이</strong>: 태어난 날 0세로 시작해 생일마다 한 살씩 늘어납니다. 2023년 6월 28일부터 법적·행정적 나이의 기준입니다.</li>
<li><strong>세는 나이</strong>: 태어나자마자 1세, 매년 1월 1일에 한 살씩 늘어납니다. 현재 연도 − 출생 연도 + 1.</li>
<li><strong>연 나이</strong>: 현재 연도 − 출생 연도. 병역법과 청소년보호법 등 일부 법령에서 사용합니다.</li>
</ul>
<h2>만 나이를 쉽게 계산하는 법</h2>
<p>올해 생일이 지났다면 <strong>올해 연도 − 출생 연도</strong>, 아직 지나지 않았다면 거기서 <strong>1을 더 뺍니다</strong>.</p>
<h2>만 나이가 적용되지 않는 경우</h2>
<p>초등학교 입학(만 6세가 된 다음 해 3월), 술·담배 구매(연 나이 19세), 병역 의무(연 나이), 공무원 시험 응시 연령 등은 기존 기준을 그대로 유지합니다.</p>`,
      faq: [
        ['만 나이 통일법은 언제부터 시행되었나요?', '2023년 6월 28일부터 시행되었습니다. 법령, 계약서, 공문서에서 별도 표기가 없으면 나이는 만 나이를 뜻합니다.'],
        ['2월 29일생은 만 나이를 어떻게 계산하나요?', '평년에는 3월 1일에 한 살이 늘어난 것으로 봅니다.'],
        ['술과 담배는 만 몇 세부터 살 수 있나요?', '청소년보호법은 연 나이를 사용합니다. 만 19세가 되는 해의 1월 1일부터 구매할 수 있습니다.'],
      ],
    },
    en: {
      nav: 'Korean age', card: 'Your international age, Korean age and year age',
      title: 'Korean Age Calculator – What Is My Korean Age?',
      desc: 'Enter your birthday to find your Korean age, international age and "year age". Explains how Korean age works and what changed with the 2023 law.',
      h1: 'Korean age calculator',
      lead: 'Find out how old you are in Korea, using all three systems Koreans actually use.',
      body: `
<h2>Three ways to count age in Korea</h2>
<ul>
<li><strong>International age (만 나이, <em>man nai</em>)</strong>: you start at 0 and gain a year on each birthday. Since 28 June 2023 this is the official standard for laws, contracts and government documents.</li>
<li><strong>Korean age (세는 나이, <em>seneun nai</em>)</strong>: you are 1 on the day you are born and everyone gains a year on 1 January. It is the current year minus your birth year, plus one. People still use it in everyday conversation.</li>
<li><strong>Year age (연 나이, <em>yeon nai</em>)</strong>: the current year minus your birth year. A few laws still use it, including those for military service and buying alcohol.</li>
</ul>
<h2>Quick formula</h2>
<p><strong>Korean age = current year − birth year + 1.</strong> A baby born on 31 December is 2 in Korean age the very next day.</p>
<h2>Which one should I say?</h2>
<p>If a Korean asks your age, the safest answer is your birth year ("I was born in '95"). It tells them everything they need to work out how to address you, whichever system they have in mind.</p>`,
      faq: [
        ['Did Korea abolish Korean age?', 'Officially, yes. A law that took effect on 28 June 2023 made international age the standard for legal and administrative purposes. The traditional system is still common in casual conversation.'],
        ['What is the legal drinking age in Korea?', 'You can buy alcohol from 1 January of the year you turn 19 in international age. The Youth Protection Act uses year age, not your birthday.'],
        ['How does age affect how Koreans speak to me?', 'Korean has speech levels tied to relative age. People born in the same year typically treat each other as equals, which is why birth year matters more than exact age.'],
      ],
    },
  },
  {
    id: 'table', slug: 'salary-table', type: 'guide', table: true,
    ko: {
      nav: '연봉 실수령액 표',
      title: '2027년 연봉 실수령액 표 – 연봉 2,400만~2억 원 월급 한눈에',
      desc: '연봉 2,400만 원부터 2억 원까지 2026년·2027년 월 실수령액과 공제액을 표로 정리했습니다. 부양가족 1인, 비과세 20만 원 기준.',
      h1: '연봉 실수령액 표 (2026·2027)',
      lead: '연봉별 월 실수령액을 2026년과 2027년 요율로 계산한 표입니다. 부양가족 1인(본인), 월 비과세 식대 20만 원 기준입니다.',
      body: `<p>부양가족 수나 비과세액이 다르다면 <a href="{{salary}}">연봉 실수령액 계산기</a>에서 직접 계산해 보세요.</p>`,
      after: `<h2>표 읽는 법</h2><p>공제액은 국민연금, 건강보험, 장기요양보험, 고용보험, 소득세, 지방소득세를 모두 더한 금액입니다. 2027년에는 국민연금 요율이 4.75%에서 5.0%로, 장기요양보험 요율이 오르기 때문에 같은 연봉이라도 실수령액이 조금 줄어듭니다.</p>`,
      cols: ['연봉', '2026 월 실수령액', '2027 월 실수령액', '2027 월 공제액'],
    },
    en: {
      nav: 'Salary table',
      title: 'Korea Salary After Tax Table 2026–2027 (₩24M to ₩200M)',
      desc: 'Monthly take-home pay in South Korea for annual salaries from ₩24 million to ₩200 million, at 2026 and 2027 rates. Single filer, ₩200,000 tax-free allowance.',
      h1: 'Korea take-home pay table (2026–2027)',
      lead: 'Monthly net pay for common Korean salary levels, at 2026 and 2027 rates. Assumes a single person with a ₩200,000 tax-free meal allowance.',
      body: `<p>Different family size or allowances? Use the <a href="{{salary}}">net salary calculator</a> for your exact figures.</p>`,
      after: `<h2>Reading the table</h2><p>Deductions are the sum of National Pension, Health Insurance, Long-term Care Insurance, Employment Insurance, income tax and local income tax. Take-home pay is slightly lower in 2027 because the pension rate rises from 4.75% to 5.0% and the long-term care rate also goes up.</p>`,
      cols: ['Annual salary', '2026 monthly net', '2027 monthly net', '2027 monthly deductions'],
    },
  },
  {
    id: 'minwage', slug: 'minimum-wage-2027', type: 'guide',
    ko: {
      nav: '2027년 최저임금',
      title: '2027년 최저임금 10,700원 – 월급·일급·실수령액 정리',
      desc: '2027년 최저임금은 시급 10,700원(3.7% 인상)입니다. 월 환산액 2,236,300원, 일급, 주휴수당, 실수령액까지 정리했습니다.',
      h1: '2027년 최저임금: 시급 10,700원',
      lead: '2027년 1월 1일부터 적용되는 최저임금은 시급 10,700원입니다. 2026년(10,320원)보다 380원, 3.7% 올랐습니다.',
      body: `
<h2>한눈에 보기</h2>
<div class="table-scroll"><table>
<thead><tr><th>구분</th><th>2026년</th><th>2027년</th></tr></thead>
<tbody>
<tr><td>시급</td><td>10,320원</td><td>10,700원</td></tr>
<tr><td>일급 (8시간)</td><td>82,560원</td><td>85,600원</td></tr>
<tr><td>주급 (주 40시간, 주휴 포함)</td><td>495,360원</td><td>513,600원</td></tr>
<tr><td>월급 (209시간)</td><td>2,156,880원</td><td>2,236,300원</td></tr>
<tr><td>연봉 환산</td><td>25,882,560원</td><td>26,835,600원</td></tr>
</tbody></table></div>
<h2>최저임금 월급의 실수령액</h2>
<p>2027년 최저임금 월급 2,236,300원에서 4대보험과 소득세를 빼면 실수령액은 월 약 {{minNet2027}}원입니다(부양가족 1인, 비과세 없음 기준). 정확한 금액은 <a href="{{salary}}">연봉 실수령액 계산기</a>에 연봉 26,835,600원을 넣어 확인할 수 있습니다.</p>
<h2>누구에게 적용되나요?</h2>
<p>근로자를 1명이라도 고용한 모든 사업장에 적용되며, 정규직·계약직·아르바이트·외국인 근로자 모두 대상입니다. 수습 기간(1년 이상 계약, 3개월 이내)에는 10%를 감액할 수 있지만 단순노무직은 감액할 수 없습니다.</p>
<h2>최저임금에 포함되는 임금</h2>
<p>매월 정기적으로 지급되는 기본급, 상여금, 식대 등 복리후생비는 최저임금에 산입됩니다. 연장·야간·휴일근로수당은 포함되지 않습니다.</p>
<p>단시간 근로자는 <a href="{{weekly}}">주휴수당 계산기</a>로 근무시간에 맞는 월급을 계산해 보세요.</p>`,
      faq: [
        ['2027년 최저임금은 언제부터 적용되나요?', '2027년 1월 1일부터 12월 31일까지 적용됩니다. 2026년 12월 31일까지는 10,320원이 적용됩니다.'],
        ['최저임금보다 적게 받으면 어떻게 하나요?', '고용노동부 고객상담센터(1350)나 관할 지방고용노동청에 신고할 수 있습니다. 위반 사업주는 3년 이하의 징역 또는 2천만 원 이하의 벌금에 처해질 수 있습니다.'],
      ],
    },
    en: {
      nav: 'Minimum wage 2027',
      title: 'South Korea Minimum Wage 2027: ₩10,700 an Hour',
      desc: 'South Korea\'s minimum wage for 2027 is ₩10,700 an hour, up 3.7% from 2026. See the daily, weekly and monthly equivalents and estimated take-home pay.',
      h1: 'South Korea minimum wage 2027: ₩10,700 an hour',
      lead: 'From 1 January 2027 the minimum wage in South Korea is ₩10,700 an hour, up ₩380 (3.7%) from ₩10,320 in 2026.',
      body: `
<h2>At a glance</h2>
<div class="table-scroll"><table>
<thead><tr><th></th><th>2026</th><th>2027</th></tr></thead>
<tbody>
<tr><td>Hourly</td><td>₩10,320</td><td>₩10,700</td></tr>
<tr><td>Daily (8 hours)</td><td>₩82,560</td><td>₩85,600</td></tr>
<tr><td>Weekly (40 hours, incl. holiday pay)</td><td>₩495,360</td><td>₩513,600</td></tr>
<tr><td>Monthly (209 hours)</td><td>₩2,156,880</td><td>₩2,236,300</td></tr>
<tr><td>Annual equivalent</td><td>₩25,882,560</td><td>₩26,835,600</td></tr>
</tbody></table></div>
<h2>Take-home pay on minimum wage</h2>
<p>After social insurance and income tax, a full-time minimum wage worker takes home roughly ₩{{minNet2027}} a month in 2027 (single, no tax-free allowances). Try your own numbers in the <a href="{{salary}}">net salary calculator</a>.</p>
<h2>Who is covered?</h2>
<p>Every workplace with at least one employee, and every worker regardless of nationality, visa or contract type. That includes part-timers and foreign workers on E-9 and other visas. During a probation period of up to three months (on a contract of one year or more) employers may pay 90%, except for simple manual jobs.</p>
<h2>Why the monthly figure uses 209 hours</h2>
<p>A 40-hour week earns 8 hours of paid weekly holiday, making 48 paid hours a week, or about 209 a month. If you work fewer hours, use the <a href="{{weekly}}">weekly holiday pay calculator</a>.</p>`,
      faq: [
        ['Does the Korean minimum wage apply to foreigners?', 'Yes. It applies to all workers in Korea regardless of nationality or visa status.'],
        ['What can I do if I am paid less than minimum wage?', 'Report it to the Ministry of Employment and Labor by calling 1350 (foreign-language support is available) or visiting a local labor office. Employers face up to three years in prison or a fine of up to ₩20 million.'],
      ],
    },
  },
  {
    id: 'insurance', slug: 'social-insurance-rates-2027', type: 'guide',
    ko: {
      nav: '2027년 4대보험 요율',
      title: '2027년 4대보험 요율 – 국민연금 10%, 건강보험 7.19% 동결',
      desc: '2027년 국민연금 10.0%, 건강보험 7.19%(동결), 장기요양보험 0.9994%, 고용보험 요율과 근로자 부담액을 2026년과 비교해 정리했습니다.',
      h1: '2027년 4대보험 요율 정리',
      lead: '2027년에는 국민연금과 장기요양보험 요율이 오르고 건강보험료율은 동결됩니다. 2026년과 비교해 월급에서 얼마가 더 빠지는지 정리했습니다.',
      body: `
<h2>2026년 vs 2027년 요율</h2>
<div class="table-scroll"><table>
<thead><tr><th>보험</th><th>2026년 (전체 / 근로자)</th><th>2027년 (전체 / 근로자)</th></tr></thead>
<tbody>
<tr><td>국민연금</td><td>9.5% / 4.75%</td><td>10.0% / 5.0%</td></tr>
<tr><td>건강보험</td><td>7.19% / 3.595%</td><td>7.19% / 3.595%</td></tr>
<tr><td>장기요양보험 (소득 대비)</td><td>0.9448% / 0.4724%</td><td>0.9994% / 0.4997%</td></tr>
<tr><td>고용보험 (실업급여)</td><td>1.8% / 0.9%</td><td>1.8% / 0.9%</td></tr>
</tbody></table></div>
<p>산재보험은 업종별 요율로 사업주가 전액 부담합니다.</p>
<h2>국민연금: 매년 0.5%p씩 인상</h2>
<p>연금개혁에 따라 국민연금 보험료율은 2026년부터 매년 0.5%p씩 올라 2033년 13%에 도달합니다. 기준소득월액 상한은 2026년 7월부터 2027년 6월까지 659만 원, 하한은 41만 원입니다.</p>
<h2>건강보험: 7.19% 동결</h2>
<p>2027년 건강보험료율은 7.19%로 동결되었습니다. 장기요양보험료율은 소득 대비 0.9994%(건강보험료의 13.90%)로 인상됩니다.</p>
<h2>월급별 추가 부담액</h2>
<p>월 과세 급여 300만 원이라면 2027년 근로자 공제액은 2026년보다 약 8,300원 늘어납니다(국민연금 +7,500원, 장기요양 약 +800원). 내 연봉 기준 금액은 <a href="{{salary}}">연봉 실수령액 계산기</a>에서 연도를 바꿔 비교해 보세요.</p>`,
      faq: [
        ['2027년 고용보험 요율은 얼마인가요?', '실업급여 보험료율은 1.8%(근로자 0.9%, 사업주 0.9%)로 2026년과 같습니다. 사업주는 규모에 따라 고용안정·직업능력개발 보험료를 추가로 부담합니다.'],
        ['요율은 언제부터 바뀌나요?', '국민연금·건강보험·장기요양보험 요율은 1월 급여분부터 적용됩니다. 국민연금 기준소득월액 상·하한은 매년 7월에 조정됩니다.'],
      ],
    },
    en: {
      nav: 'Insurance rates 2027',
      title: 'Korea Social Insurance Rates 2027: Pension, Health, Employment',
      desc: 'South Korea\'s four social insurance rates for 2027 compared with 2026: National Pension 10.0%, Health Insurance 7.19% (frozen), Long-term Care 0.9994% and Employment Insurance.',
      h1: 'Korea social insurance rates for 2027',
      lead: 'In 2027 the National Pension and Long-term Care rates go up while the Health Insurance rate is frozen. Here is what changes on your payslip.',
      body: `
<h2>2026 vs 2027 rates</h2>
<div class="table-scroll"><table>
<thead><tr><th>Insurance</th><th>2026 (total / employee)</th><th>2027 (total / employee)</th></tr></thead>
<tbody>
<tr><td>National Pension (국민연금)</td><td>9.5% / 4.75%</td><td>10.0% / 5.0%</td></tr>
<tr><td>Health Insurance (건강보험)</td><td>7.19% / 3.595%</td><td>7.19% / 3.595%</td></tr>
<tr><td>Long-term Care (장기요양), % of income</td><td>0.9448% / 0.4724%</td><td>0.9994% / 0.4997%</td></tr>
<tr><td>Employment Insurance (고용보험)</td><td>1.8% / 0.9%</td><td>1.8% / 0.9%</td></tr>
</tbody></table></div>
<p>Employers and employees split each premium equally. Industrial accident insurance (산재보험) is paid entirely by the employer.</p>
<h2>National Pension: rising 0.5 points a year</h2>
<p>Under the pension reform, the contribution rate rises by 0.5 percentage points every year from 2026 until it reaches 13% in 2033. Contributions are charged on monthly income between ₩410,000 and ₩6,590,000 (July 2026 to June 2027).</p>
<h2>Health Insurance: frozen at 7.19%</h2>
<p>The 2027 health insurance rate stays at 7.19%. The long-term care premium, which is collected together with health insurance, rises to 0.9994% of income (13.90% of your health premium).</p>
<h2>What it costs you</h2>
<p>On ₩3,000,000 of taxable monthly pay, employee deductions rise by about ₩8,300 a month in 2027: ₩7,500 more for pension and roughly ₩800 more for long-term care. Compare both years for your own salary in the <a href="{{salary}}">net salary calculator</a>.</p>`,
      faq: [
        ['Do foreign employees have to pay all four insurances?', 'Health insurance and industrial accident insurance always apply. National Pension depends on reciprocity with your home country, and Employment Insurance depends on your visa type.'],
        ['When do the new rates start?', 'Pension, health and long-term care rates change with January pay. The pension income ceiling and floor are adjusted every July.'],
      ],
    },
  },
  {
    id: 'about', slug: 'about', type: 'info',
    ko: {
      nav: '소개', title: '원캘크 소개', desc: '원캘크는 한국의 급여와 노동 관련 계산을 쉽고 정확하게 도와주는 무료 계산기 사이트입니다.',
      h1: '원캘크 소개',
      lead: '원캘크는 급여, 퇴직금, 실업급여처럼 일하는 사람이라면 누구나 한 번쯤 궁금해하는 숫자를 빠르게 계산해 주는 무료 사이트입니다.',
      body: `
<h2>계산 기준</h2>
<p>모든 계산기는 근로기준법, 고용보험법, 주택임대차보호법과 국세청·보건복지부·고용노동부가 고시한 요율을 기준으로 만들었습니다. 요율이 바뀌면 계산기를 갱신하고 각 페이지에 업데이트 날짜를 표시합니다.</p>
<h2>개인정보</h2>
<p>입력한 값은 브라우저 안에서만 계산되며 서버로 전송하거나 저장하지 않습니다.</p>
<h2>한계</h2>
<p>계산 결과는 참고용 추정치입니다. 중요한 결정을 내리기 전에는 급여 담당자, 세무사, 노무사 또는 관계 기관에 확인하세요.</p>`,
    },
    en: {
      nav: 'About', title: 'About WonCalc', desc: 'WonCalc is a free set of calculators for pay and work in South Korea, written in plain English and Korean.',
      h1: 'About WonCalc',
      lead: 'WonCalc is a free set of calculators for the numbers everyone working in Korea eventually needs: take-home pay, severance, unemployment benefits and more.',
      body: `
<h2>How the numbers are worked out</h2>
<p>Each calculator follows the relevant Korean law (the Labor Standards Act, Employment Insurance Act, Housing Lease Protection Act) and the rates announced by the National Tax Service, the Ministry of Health and Welfare and the Ministry of Employment and Labor. When rates change, the calculators are updated and each page shows the date it was last revised.</p>
<h2>Your data</h2>
<p>Everything is calculated in your browser. The figures you enter are never sent to a server or stored.</p>
<h2>Limits</h2>
<p>Results are estimates for reference. Before making an important decision, confirm with your payroll team, a tax accountant, a labor attorney or the relevant government office.</p>`,
    },
  },
  {
    id: 'privacy', slug: 'privacy', type: 'info',
    ko: {
      nav: '개인정보처리방침', title: '개인정보처리방침 – 원캘크', desc: '원캘크의 개인정보처리방침입니다.',
      h1: '개인정보처리방침',
      lead: '원캘크는 계산기에 입력한 정보를 수집하거나 저장하지 않습니다.',
      body: `
<h2>입력 정보</h2>
<p>계산기에 입력한 급여, 날짜 등의 값은 사용자의 브라우저 안에서만 처리되며 서버로 전송되지 않습니다. 회원가입이나 로그인 기능이 없습니다.</p>
<h2>광고와 쿠키</h2>
<p>이 사이트는 운영비 충당을 위해 Google 애드센스 등 제3자 광고를 게재할 수 있습니다. Google을 포함한 광고 사업자는 쿠키를 사용해 사용자의 이 사이트 및 다른 사이트 방문 기록을 바탕으로 광고를 표시할 수 있습니다. <a href="https://www.google.com/settings/ads" rel="nofollow noopener">Google 광고 설정</a>에서 맞춤 광고를 해제할 수 있습니다.</p>
<h2>접속 기록</h2>
<p>호스팅 사업자가 IP 주소, 브라우저 종류 등 기본적인 접속 기록을 보안과 운영 목적으로 수집할 수 있습니다.</p>
<h2>변경</h2>
<p>이 방침이 바뀌면 이 페이지에 게시합니다.</p>`,
    },
    en: {
      nav: 'Privacy', title: 'Privacy Policy – WonCalc', desc: 'The WonCalc privacy policy.',
      h1: 'Privacy policy',
      lead: 'WonCalc does not collect or store anything you type into the calculators.',
      body: `
<h2>What you enter</h2>
<p>Salaries, dates and other values you type are processed only in your browser and are never sent to a server. There are no accounts and no sign-in.</p>
<h2>Advertising and cookies</h2>
<p>This site may show third-party advertising, such as Google AdSense, to cover running costs. Advertising vendors including Google may use cookies to serve ads based on your visits to this and other websites. You can opt out of personalised advertising in <a href="https://www.google.com/settings/ads" rel="nofollow noopener">Google Ads Settings</a>.</p>
<h2>Access logs</h2>
<p>The hosting provider may record basic access information such as IP address and browser type for security and operations.</p>
<h2>Changes</h2>
<p>Any changes to this policy will be posted on this page.</p>`,
    },
  },
];
