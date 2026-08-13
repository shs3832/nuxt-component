<template>
  <div class="admin-layout">
    <a href="#admin-main" class="to-contents">본문 바로가기</a>
    <header class="admin-header">
      <nav aria-label="주요 메뉴">
        <ul>
          <li><NuxtLink to="/">UI 컴포넌트 스터디</NuxtLink></li>
          <li><NuxtLink to="/members">회원 관리</NuxtLink></li>
          <li><NuxtLink to="/products">제품 관리</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <main class="admin-main" id="admin-main" tabindex="-1">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.router-link-active {
  color: #dc2626;
  font-weight: 700;
}

.admin-layout {
  display: flex;
  @media screen and (max-width: 720px) {
    flex-direction: column;
  }
}

.to-contents {
  position: absolute;
  left: -999px;
  &:focus-visible {
    left: 0;
  }
}

.admin-main {
  flex: 1;
  min-width: 0;
}

a {
  &:focus-visible {
    outline-offset: 2px;
    outline: 2px solid deeppink;
  }
}
</style>
