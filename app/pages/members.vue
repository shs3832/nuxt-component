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
              <td>{{ member.statusLabel }}</td>
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
definePageMeta({
  layout: "admin",
});

type MemberStatus = "active" | "inactive" | "withdrawn";

type Member = {
  id: number;
  name: string;
  email: string;
  status: MemberStatus;
  statusLabel: string;
};

type MemberSearchConditions = {
  status: string;
  keyword: string;
  includeWithdrawn: boolean;
};

const members = ref<Member[]>([
  {
    id: 1,
    name: "김민준",
    email: "minjun.kim@example.com",
    status: "active",
    statusLabel: "사용중",
  },
  {
    id: 2,
    name: "이서연",
    email: "seoyeon.lee@example.com",
    status: "inactive",
    statusLabel: "사용중지",
  },
  {
    id: 3,
    name: "박지훈",
    email: "jihoon.park@example.com",
    status: "active",
    statusLabel: "사용중",
  },
  {
    id: 4,
    name: "최유진",
    email: "yujin.choi@example.com",
    status: "withdrawn",
    statusLabel: "탈퇴",
  },
]);

const createInitialSearchConditions = (): MemberSearchConditions => {
  return {
    status: "",
    keyword: "",
    includeWithdrawn: false,
  };
};

const draftSearchConditions = ref(createInitialSearchConditions());
const appliedSearchConditions = ref(createInitialSearchConditions());

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
  appliedSearchConditions.value = {
    ...draftSearchConditions.value,
  };
  page.value = 1;
};

const handleReset = () => {
  draftSearchConditions.value = createInitialSearchConditions();
  appliedSearchConditions.value = {
    ...draftSearchConditions.value,
  };
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
