<template>
  <ListPageTemplate>
    <template #title>회원 관리</template>
    <template #description>
      <p class="members-page__description">회원 관리 페이지용</p>
    </template>
    <template #search>
      <UserSearchForm
        v-model:status="draftSearchConditions.status"
        v-model:keyword="draftSearchConditions.keyword"
        v-model:include-withdrawn="draftSearchConditions.includeWithdrawn"
        @search="handleSearch"
        @reset="handleReset"
      />
    </template>
    <template #table>
      <UiTable aria-label="회원 목록">
        <thead>
          <tr>
            <th scope="col">이름</th>
            <th scope="col">이메일</th>
            <th scope="col">상태</th>
            <th scope="col">관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredMembers.length === 0">
            <td colspan="4">
              <span role="status">등록된 회원이 없습니다.</span>
            </td>
          </tr>

          <template v-else>
            <tr v-for="member in paginatedMembers" :key="member.id">
              <th scope="row">{{ member.name }}</th>
              <td>{{ member.email }}</td>
              <td>{{ memberStatusLabels[member.status] }}</td>
              <td>—</td>
            </tr>
          </template>
        </tbody>
      </UiTable>
    </template>
    <template v-if="filteredMembers.length > 0" #pagination>
      <UiPagination v-model:page="page" :total-pages="totalPages" />
    </template>
  </ListPageTemplate>
</template>

<script setup lang="ts">
import type {
  Member,
  MemberSearchConditions,
  MemberStatus,
} from "../types/members";

definePageMeta({
  layout: "admin",
});

const memberStatusLabels: Record<MemberStatus, string> = {
  active: "사용중",
  inactive: "사용중지",
  withdrawn: "탈퇴",
};

const members = ref<Member[]>([
  {
    id: 1,
    name: "김민준",
    email: "minjun.kim@example.com",
    status: "active",
  },
  {
    id: 2,
    name: "이서연",
    email: "seoyeon.lee@example.com",
    status: "inactive",
  },
  {
    id: 3,
    name: "박지훈",
    email: "jihoon.park@example.com",
    status: "active",
  },
  {
    id: 4,
    name: "최유진",
    email: "yujin.choi@example.com",
    status: "withdrawn",
  },
]);

const createInitialSearchConditions = (): MemberSearchConditions => {
  return {
    status: "",
    keyword: "",
    includeWithdrawn: false,
  };
};

const {
  draftSearchConditions,
  appliedSearchConditions,
  applySearchConditions,
  resetSearchConditions,
} = useSearchConditions(createInitialSearchConditions);

const filteredMembers = computed(() => {
  const keyword = appliedSearchConditions.value.keyword.trim().toLowerCase();
  return members.value.filter((member) => {
    if (
      !appliedSearchConditions.value.includeWithdrawn &&
      member.status === "withdrawn"
    ) {
      return false;
    }

    if (
      appliedSearchConditions.value.status !== "" &&
      appliedSearchConditions.value.status !== member.status
    ) {
      return false;
    }
    if (keyword === "") {
      return true;
    }

    return (
      member.name.toLowerCase().includes(keyword) ||
      member.email.toLowerCase().includes(keyword)
    );
  });
});

const handleSearch = () => {
  applySearchConditions();
  page.value = 1;
};

const handleReset = () => {
  resetSearchConditions();
  page.value = 1;
};

const pageSize = 2;
const page = ref(1);

const totalPages = computed(() => {
  return Math.ceil(filteredMembers.value.length / pageSize);
});

const paginatedMembers = computed(() => {
  const start = (page.value - 1) * pageSize;
  const end = start + pageSize;

  return filteredMembers.value.slice(start, end);
});
</script>

<style scoped>
.members-page__description {
  margin: 0;
}
</style>
