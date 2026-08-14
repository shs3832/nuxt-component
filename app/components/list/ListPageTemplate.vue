<template>
  <section class="list-page">
    <header class="list-page__header">
      <h1 class="list-page__title">
        <slot name="title"></slot>
      </h1>
      <div class="list-page__description" v-if="$slots.description">
        <slot name="description"></slot>
      </div>
    </header>
    <div class="list-page__search" v-if="$slots.search">
      <slot name="search"></slot>
    </div>
    <div class="list-page__table">
      <slot name="table"></slot>
    </div>
    <div class="list-page__pagination" v-if="$slots.pagination">
      <slot name="pagination"></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
defineSlots<{
  title(): any;
  description?(): any;
  search?(): any;
  table(): any;
  pagination?(): any;
}>();
</script>
<style scoped>
.list-page {
  display: grid;
  gap: 24px;
  min-width: 0;
}

.list-page__header {
  display: grid;
  gap: 8px;
}

.list-page__title {
  margin: 0;
}

.list-page__search,
.list-page__table,
.list-page__pagination {
  min-width: 0;
}
</style>
