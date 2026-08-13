<template>
  <main class="study-page">
    <header class="study-hero">
      <p class="study-hero__eyebrow">NUXT 4 · PRESENTATION TIER</p>
      <h1>UI Component Study</h1>
      <p class="study-hero__description">
        공통 UI의 책임과 상태를 직접 구현하고 검증하는 컴포넌트 실습실입니다.
      </p>
    </header>

    <div class="study-grid">
      <StudyButtonSection />
      <StudyFormControlsSection />
      <StudySearchFormSection />
      <StudyTableSection />
      <StudyModalSection />
    </div>
  </main>
</template>

<style src="../assets/css/study.css"></style>
