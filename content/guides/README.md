# Guides

Each file in this folder is one guide page, published in Korean and English at
`/ko/<slug>/` and `/en/<slug>/`. The build picks up every `*.json` file here, and
`npm test` checks them.

Name files `YYYY-MM-DD-<slug>.json`.

## Fields

```json
{
  "id": "unique-id",
  "slug": "url-slug-lowercase-with-hyphens",
  "date": "YYYY-MM-DD",
  "sources": [["Source name", "https://..."]],
  "ko": {
    "nav": "짧은 제목 (카드·빵부스러기용)",
    "title": "검색 결과 제목 (60자 이내)",
    "desc": "메타 설명 (80~160자)",
    "h1": "페이지 제목",
    "lead": "첫 문단 요약",
    "body": "<h2>…</h2><p>…</p> HTML",
    "faq": [["질문", "답변"]]
  },
  "en": { "...same fields in English..." }
}
```

`body` is trusted HTML. Allowed tags: `h2 h3 p ul ol li strong em a table thead tbody tr th td div`.
Use `<div class="table-scroll"><table>…</table></div>` for tables. Link to calculators
with placeholders: `{{salary}}`, `{{severance}}`, `{{weekly}}`, `{{unemployment}}`,
`{{jeonse}}`, `{{age}}`, `{{table}}`, `{{minwage}}`, `{{insurance}}`.

## Rules

- Every figure must be checked against at least one current source, listed in `sources`.
  Prefer government pages (moel.go.kr, nts.go.kr, mohw.go.kr, nps.or.kr, nhis.or.kr,
  law.go.kr) over blogs.
- Write for a reader with a real question; answer it in the first paragraph.
- No filler, no keyword stuffing, no claims you could not verify.
- The English version is written for foreigners working in Korea, not a word-for-word
  translation.
