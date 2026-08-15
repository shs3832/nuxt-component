export type MemberStatus = "active" | "inactive" | "withdrawn";

export type MemberSearchStatus = "" | "active" | "inactive";

export type Member = {
  id: number;
  name: string;
  email: string;
  status: MemberStatus;
};

export type MemberSearchConditions = {
  status: MemberSearchStatus;
  keyword: string;
  includeWithdrawn: boolean;
};
