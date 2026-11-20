// Site-wide copy and the category list. Item copy lives in items/<slug>/meta.json.

export const site = {
  name: { ko: '하루한판', en: 'Daily Toybox' },
  tagline: { ko: '매일 하나씩 올라오는 게임, 별난 사이트, 쓸모 있는 도구', en: 'A new game, weird site or handy tool every day' },
  desc: {
    ko: '게임, 멋진 페이지, 별난 사이트, 교육, 기술, 생활 정보, 유틸, 라디오, 운세까지. 설치 없이 브라우저에서 바로 즐기는 작품이 매일 하나씩 올라옵니다.',
    en: 'Games, cool pages, weird sites, learning toys, tech explainers, tools, radio and fortunes. A new free browser creation every day, no install, no sign-up.',
  },
};

export const categories = [
  { id: 'games', ko: '게임', en: 'Games', desc: { ko: '설치 없이 바로 하는 짧고 재미있는 게임', en: 'Quick, fun games that run right in your browser' } },
  { id: 'cool', ko: '멋진 페이지', en: 'Cool pages', desc: { ko: '보고 만지기만 해도 즐거운 인터랙티브 페이지', en: 'Interactive pages that are fun just to look at and play with' } },
  { id: 'weird', ko: '별난 사이트', en: 'Weird web', desc: { ko: '쓸데없지만 자꾸 들어오게 되는 이상한 사이트', en: 'Pointless, strange, oddly addictive little sites' } },
  { id: 'learn', ko: '교육', en: 'Learn', desc: { ko: '직접 만져 보며 배우는 인터랙티브 학습', en: 'Learn by playing with it' } },
  { id: 'tech', ko: '기술', en: 'Tech', desc: { ko: '개발·IT 개념을 눈으로 이해하는 도구와 설명', en: 'Tech and IT concepts you can see and try' } },
  { id: 'info', ko: '생활 정보', en: 'Info', desc: { ko: '알아두면 쓸모 있는 생활 정보를 한눈에', en: 'Handy everyday information at a glance' } },
  { id: 'tools', ko: '유틸', en: 'Tools', desc: { ko: '소소하게 쓸모 있는 도구', en: 'Small tools that come in handy' } },
  { id: 'random', ko: '랜덤·생성기', en: 'Random', desc: { ko: '사다리타기, 뽑기, 이름 짓기 같은 생성기', en: 'Pickers, ladders and generators' } },
  { id: 'radio', ko: '라디오', en: 'Radio', desc: { ko: '틀어 두기 좋은 소리와 음악 (모두 브라우저에서 직접 만들어 재생)', en: 'Sounds and music to leave on, generated live in your browser' } },
  { id: 'fortune', ko: '운세', en: 'Fortune', desc: { ko: '재미로 보는 오늘의 운세와 점', en: 'Fortunes and readings, just for fun' } },
];

export const ui = {
  ko: {
    home: '홈', newest: '오늘의 신작', popular: '좋아요 많은 작품', like: '좋아요', dislike: '별로예요', voteThanks: '투표했어요', voteFail: '투표를 저장하지 못했어요', all: '전체', more: '더 보기', play: '하는 법', related: '같은 카테고리',
    fullscreen: '전체화면', share: '공유하기', copied: '링크를 복사했어요', items: '개', other: 'English',
    about: '소개', privacy: '개인정보처리방침', categories: '카테고리', added: '올린 날',
    noscript: '이 게임을 하려면 자바스크립트를 켜 주세요.', notFound: '페이지를 찾을 수 없습니다.',
  },
  en: {
    home: 'Home', newest: "Today's pick", popular: 'Most liked', like: 'Like', dislike: 'Dislike', voteThanks: 'Thanks for voting', voteFail: 'Could not save your vote', all: 'All', more: 'More', play: 'How to play', related: 'More like this',
    fullscreen: 'Full screen', share: 'Share', copied: 'Link copied', items: '', other: '한국어',
    about: 'About', privacy: 'Privacy', categories: 'Categories', added: 'Added',
    noscript: 'Please enable JavaScript to play.', notFound: 'Page not found.',
  },
};

export const pages = {
  about: {
    ko: {
      title: '하루한판 소개',
      body: '<p>하루한판은 매일 새로운 웹게임이나 도구를 하나씩 올리는 사이트입니다. 모든 게임과 도구는 이 사이트를 위해 새로 만들었으며, 설치나 회원가입 없이 브라우저에서 바로 실행됩니다.</p><p>게임, 멋진 페이지, 별난 사이트, 교육, 기술, 생활 정보, 유틸, 생성기, 라디오, 운세까지 무엇이든 하나씩 만들어 올리고, 여러분의 좋아요·별로예요 투표를 보고 다음 작품을 정합니다.</p><p>입력한 내용과 점수는 사용자의 브라우저에만 저장되고 서버로 전송되지 않습니다.</p>',
    },
    en: {
      title: 'About Daily Toybox',
      body: '<p>Daily Toybox publishes one new browser game or tool every day. Everything here is made for this site and runs right in your browser, with no install and no account.</p><p>Games, cool pages, weird sites, learning toys, tech explainers, handy info, tools, generators, radio and fortunes: we make one a day and use your likes and dislikes to decide what to make next.</p><p>Anything you type and your best scores are stored only in your own browser and never sent to a server.</p>',
    },
  },
  privacy: {
    ko: {
      title: '개인정보처리방침',
      body: '<p>게임 점수와 입력값은 사용자의 브라우저(localStorage)에만 저장되며 서버로 전송되지 않습니다. 회원가입 기능이 없습니다.</p><h2>좋아요·별로예요 투표</h2><p>중복 투표를 막기 위해 투표할 때 IP 주소를 복원할 수 없는 해시값으로 바꿔 작품별 투표 기록과 함께 저장합니다. IP 주소 원문은 저장하지 않습니다.</p><h2>광고와 쿠키</h2><p>이 사이트는 운영비 충당을 위해 Google 애드센스 등 제3자 광고를 게재할 수 있습니다. Google을 포함한 광고 사업자는 쿠키를 사용해 사용자의 이 사이트 및 다른 사이트 방문 기록을 바탕으로 광고를 표시할 수 있습니다. <a href="https://www.google.com/settings/ads" rel="nofollow noopener">Google 광고 설정</a>에서 맞춤 광고를 해제할 수 있습니다.</p><h2>접속 기록</h2><p>호스팅 사업자가 IP 주소, 브라우저 종류 등 기본적인 접속 기록을 보안과 운영 목적으로 수집할 수 있습니다.</p>',
    },
    en: {
      title: 'Privacy policy',
      body: '<p>Scores and anything you type are stored only in your browser (localStorage) and are never sent to a server. There are no accounts.</p><h2>Like and dislike votes</h2><p>To prevent repeat voting, when you vote we store a one-way hash of your IP address with your vote for that item. The IP address itself is never stored.</p><h2>Advertising and cookies</h2><p>This site may show third-party advertising, such as Google AdSense, to cover running costs. Advertising vendors including Google may use cookies to serve ads based on your visits to this and other websites. You can opt out of personalised advertising in <a href="https://www.google.com/settings/ads" rel="nofollow noopener">Google Ads Settings</a>.</p><h2>Access logs</h2><p>The hosting provider may record basic access information such as IP address and browser type for security and operations.</p>',
    },
  },
};
