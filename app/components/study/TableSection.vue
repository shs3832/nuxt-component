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
        <tr v-else-if="members.length === 0">
          <td colspan="4" class="table-demo__state">검색 결과가 없습니다</td>
        </tr>
        <template v-else>
          <tr v-for="member in currentMembers" :key="member.id">
            <th scope="row">{{ member.name }}</th>
            <td>{{ member.email }}</td>
            <td>{{ member.statusLabel }}</td>
            <td>
              <UiButton>수정</UiButton>
              <UiButton>삭제</UiButton>
            </td>
          </tr>
        </template>
      </tbody>
    </UiTable>

    <UiPagination
      v-if="!isLoading && totalPages > 0"
      v-model:page="currentPage"
      :total-pages="totalPages"
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
  statusLabel: string;
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
]);

const pageSize = 1;
const currentPage = ref(1);
const totalPages = computed(() => {
  return Math.ceil(members.value.length / pageSize);
});

const isLoading = ref(false);
const currentMembers = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;

  return members.value.slice(startIndex, startIndex + pageSize);
});
</script>
<style scoped>
.table-demo__state {
  padding-block: 48px;
  color: #667085;
  text-align: center;
}
</style>
