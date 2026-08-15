<template>
  <section class="study-card" aria-labelledby="table-study-title">
    <div class="study-card__header">
      <div>
        <p class="study-card__step">STEP 5</p>
        <h2 id="table-study-title">UiTable</h2>
      </div>
      <span class="study-card__status">완료</span>
    </div>

    <p class="study-card__description">
      공통 테이블 골격에 사용처가 열과 셀 마크업을 조립합니다.
    </p>

    <h3 id="member-table-title" class="table-demo__title">회원 목록</h3>

    <UiTable aria-labelledby="member-table-title" :aria-busy="isLoading">
      <thead>
        <tr>
          <th scope="col">이름</th>
          <th scope="col">이메일</th>
          <th scope="col">상태</th>
          <th scope="col">관리</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoading">
          <tr>
            <td colspan="4" class="table-demo__state">
              <span role="status">회원 정보를 불러오는 중입니다.</span>
            </td>
          </tr>
        </template>
        <template v-else-if="errorMessage">
          <tr>
            <td colspan="4" class="table-demo__state">
              <span role="alert">{{ errorMessage }}</span>
            </td>
          </tr>
        </template>
        <tr v-else-if="members.length === 0">
          <td colspan="4" class="table-demo__state">
            <span role="status">검색 결과가 없습니다.</span>
          </td>
        </tr>
        <template v-else>
          <tr v-for="member in currentMembers" :key="member.id">
            <th scope="row">{{ member.name }}</th>
            <td>{{ member.email }}</td>
            <td>{{ memberStatusLabels[member.status] }}</td>
            <td>
              <UiButton>수정</UiButton>
              <UiButton>삭제</UiButton>
            </td>
          </tr>
        </template>
      </tbody>
    </UiTable>

    <UiPagination
      v-if="showPagination"
      v-model:page="currentPage"
      :total-pages="totalPages"
      class="table-demo__pagination"
    />
  </section>
</template>

<script setup lang="ts">
type MemberStatus = "active" | "inactive";

type Member = {
  id: number;
  name: string;
  email: string;
  status: MemberStatus;
};

const memberStatusLabels: Record<MemberStatus, string> = {
  active: "사용중",
  inactive: "사용중지",
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
]);

const pageSize = 1;
const currentPage = ref(1);
const totalPages = computed(() => {
  return Math.ceil(members.value.length / pageSize);
});

const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const currentMembers = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  return members.value.slice(startIndex, startIndex + pageSize);
});

const showPagination = computed(() => {
  return !isLoading.value && !errorMessage.value && totalPages.value > 0;
});
</script>
<style scoped>
.table-demo__state {
  padding-block: 48px;
  color: #667085;
  text-align: center;
}
.table-demo__pagination {
  margin-top: 20px;
}
</style>
