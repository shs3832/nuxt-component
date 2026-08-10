<template>
  <div class="ui-table-wrapper">
    <table v-bind="$attrs">
      <slot></slot>
    </table>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>

<style scoped>
.ui-table-wrapper {
  overflow-x: auto;
  width: 100%;
  table {
    width: 100%;
    min-width: 720px;
    border-collapse: collapse;

    :slotted(thead) > tr > th,
    :slotted(tbody) > tr > th,
    :slotted(tbody) > tr > td {
      padding: 12px 16px;
      border-bottom: 1px solid #e4e9f1;
      text-align: left;
      vertical-align: middle;
      line-height: 1.5;
    }

    :slotted(thead) > tr > th {
      background-color: #f8fafc;
      color: #475467;
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;
    }

    :slotted(tbody) > tr > th {
      color: #253047;
      font-size: 14px;
      font-weight: 600;
    }

    :slotted(tbody) > tr > td {
      color: #475467;
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>
