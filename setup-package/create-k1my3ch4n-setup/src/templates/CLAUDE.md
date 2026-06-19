## 코딩 표준

### 변수명

- 콜백 파라미터는 축약하지 않고 의미있는 이름을 사용한다
  - `(r) => r.data` ❌ → `(response) => response.data` ✅
  - `arr.map((i) => i.name)` ❌ → `arr.map((item) => item.name)` ✅
- 단, 관용적으로 허용되는 단일 문자 (`e` for event, `_` for ignored) 는 예외

### 제어 흐름

- if 문은 항상 중괄호를 사용한다 (한 줄이어도 예외 없음)
  - `if (a) return b` ❌
  - `if (a) { return b }` ✅
- 삼항 연산자는 허용하지만, 중첩은 금지

### 시멘틱 태그

- `<div>`, `<p>` 등을 그냥 사용하는게 아닌, 시멘틱 태그를 적극적으로 사용한다
- 예시: `<article>`, `<aside>`, `<details>`, `<header>`, `<footer>`, `<main>`, `<nav>`, `<section>` 등
