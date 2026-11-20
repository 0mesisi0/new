# 원캘크 (WonCalc)

한국 급여·노동 계산기 사이트입니다. 한국어와 영어 두 언어로 생성되는 정적 사이트이며, 검색 유입과 광고(애드센스)로 수익을 내는 것을 목표로 합니다.

## 구성

| 종류 | 페이지 |
| --- | --- |
| 계산기 | 연봉 실수령액, 퇴직금, 주휴수당·시급, 실업급여, 전월세 전환, 만 나이 |
| 가이드 | 연봉 실수령액 표, 2027년 최저임금, 2027년 4대보험 요율 |
| 기타 | 소개, 개인정보처리방침 |

각 페이지는 `/ko/…`와 `/en/…`에 같은 주소로 만들어지고, hreflang·canonical·구조화 데이터(FAQ, Breadcrumb, WebApplication)·sitemap.xml·robots.txt가 자동 생성됩니다.

## 명령

```bash
npm test         # 계산 로직 테스트
npm run build    # dist/ 에 사이트 생성
npm run serve    # dist/ 미리보기
```

의존성은 없습니다. Node 22 이상만 있으면 됩니다.

## 설정 (환경 변수)

| 변수 | 설명 | 기본값 |
| --- | --- | --- |
| `SITE_URL` | 사이트 주소. 도메인을 연결하면 이 값을 바꿉니다. | `https://calc.mesisi.net` |
| `ADSENSE_CLIENT` | 애드센스 게시자 ID (`ca-pub-…`). 설정하면 광고 코드와 `ads.txt`가 추가됩니다. | 없음 |

GitHub에서는 저장소 Settings → Secrets and variables → Actions → Variables 에 등록합니다.

## 배포와 수익화 순서

1. 이 브랜치를 `main`으로 병합합니다.
2. Settings → Pages → Source를 **GitHub Actions**로 설정합니다. `main`에 푸시될 때마다 자동 배포됩니다.
3. 하위 도메인 `calc.mesisi.net`을 연결합니다. Cloudflare DNS에 CNAME 레코드(이름 `calc`, 대상 `0mesisi0.github.io`, 프록시 상태 **DNS only**)를 추가하고, Settings → Pages → Custom domain에 `calc.mesisi.net`을 입력한 뒤 Enforce HTTPS를 켭니다.
4. Google Search Console과 네이버 서치어드바이저에 사이트를 등록하고 `sitemap.xml`을 제출합니다.
5. 애드센스를 신청하고, 승인되면 `ADSENSE_CLIENT` 변수를 등록합니다.

## 요율 갱신

요율은 `src/calc.mjs`의 `RATES`, `UB`, `BASE_RATE`에 모여 있습니다. 값을 바꾼 뒤 `src/content.mjs`의 본문 숫자와 `site.updated` 날짜를 함께 고칩니다.

매년 확인할 항목: 최저임금(8월 고시), 건강보험·장기요양 요율(9~10월), 국민연금 기준소득월액(7월), 실업급여 상한액(연말), 한국은행 기준금리(수시).

소득세는 국세청 간이세액표 산식을 따른 추정치이며 자녀세액공제는 반영하지 않습니다.

## 매일 자동 글 추가

예약 작업이 매일 `content/topics.md`에서 다음 주제를 골라 `content/guides/`에 가이드 1편(한국어·영어)을 추가하고 PR을 병합합니다. 병합되면 사이트가 자동 배포됩니다. 글 형식과 작성 규칙은 `content/guides/README.md`에 있습니다. 주제를 바꾸고 싶으면 `content/topics.md`를 고치면 됩니다.
