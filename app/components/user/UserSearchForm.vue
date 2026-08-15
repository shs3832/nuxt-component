<template>
  <SearchForm @search="emit('search')" @reset="emit('reset')" aria-label="회원">
    <div class="user-status user-search-form__field">
      <label :for="statusId">회원 상태</label>
      <UiSelect v-model="status" :id="statusId" name="status" class="control">
        <option value="">전체</option>
        <option value="active">사용중</option>
        <option value="inactive">사용중지</option>
      </UiSelect>
    </div>
    <div class="user-keyword user-search-form__field">
      <label :for="keywordId">검색어</label>
      <UiInput
        type="search"
        name="keyword"
        :id="keywordId"
        autocomplete="off"
        placeholder="이름 또는 이메일 입력"
        v-model="keyword"
        class="control"
      />
    </div>
    <div class="user-withdrawn">
      <UiCheckbox
        name="includeWithdrawn"
        :id="includeWithdrawnId"
        v-model="includeWithdrawn"
      />
      <label :for="includeWithdrawnId">탈퇴 회원 포함</label>
    </div>
  </SearchForm>
</template>

<script lang="ts" setup>
import { useId } from "vue";
import type { MemberSearchConditions } from "../../types/members";

const statusId = useId();
const keywordId = useId();
const includeWithdrawnId = useId();
const status = defineModel<MemberSearchConditions["status"]>("status", {
  required: true,
});
const keyword = defineModel<string>("keyword", {
  required: true,
});
const includeWithdrawn = defineModel<boolean>("includeWithdrawn", {
  required: true,
});

const emit = defineEmits<{
  search: [];
  reset: [];
}>();
</script>

<style scoped>
.control {
  width: 100%;
}

.user-status {
  flex: 0 0 160px;
  @media (max-width: 720px) {
    flex-basis: auto;
  }
}

.user-keyword {
  flex: 1 1 280px;
  min-width: 0;
  @media (max-width: 720px) {
    flex-basis: auto;
  }
}

.user-withdrawn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  label {
    cursor: pointer;
  }
}

.user-search-form__field {
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #344054;
  }
}
</style>
