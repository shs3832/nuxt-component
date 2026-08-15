import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent } from "storybook/test";
import { ref, watch } from "vue";

import UiButton from "./UiButton.vue";
import UiModal from "./UiModal.vue";

const meta = {
  title: "UI/UiModal",
  component: UiModal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "부모가 open 상태와 닫기 승인 여부를 소유하고, UiModal은 닫기 의도만 requestClose 이벤트로 전달합니다.",
      },
    },
  },
  argTypes: {
    open: {
      description: "부모가 반드시 제공하고 소유하는 모달 열림 상태입니다.",
      type: { name: "boolean", required: true },
      table: {
        category: "Props",
        type: { summary: "boolean · required" },
      },
    },
    closeOnBackdrop: {
      description:
        "true이면 배경 클릭 시 requestClose를 전달합니다. 기본값은 false입니다.",
      table: {
        category: "Props",
        defaultValue: { summary: "false" },
      },
    },
    requestClose: {
      control: false,
      description:
        "닫기 버튼, Escape 또는 허용된 배경 클릭으로 닫기를 요청합니다. open 상태를 직접 변경하지 않습니다.",
      table: {
        category: "Events",
        type: { summary: "() => void" },
      },
    },
  },
  args: {
    open: false,
    closeOnBackdrop: false,
  },
} satisfies Meta<typeof UiModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const createRender = (approveClose: boolean): Story["render"] => (args) => ({
  components: { UiButton, UiModal },
  setup() {
    const open = ref(args.open);
    const requestCount = ref(0);

    watch(
      () => args.open,
      (nextOpen) => {
        open.value = nextOpen;
      },
    );

    const handleRequestClose = () => {
      requestCount.value += 1;

      if (approveClose) {
        open.value = false;
      }
    };

    return { args, open, requestCount, handleRequestClose };
  },
  template: `
    <UiButton v-if="!open" @click="open = true">모달 열기</UiButton>
    <UiModal
      :open="open"
      :close-on-backdrop="args.closeOnBackdrop"
      @request-close="handleRequestClose"
    >
      <template #title>기본 모달</template>

      <p>UiModal은 닫기를 요청하고, 부모가 최종 상태를 결정합니다.</p>

      <template #actions>
        <UiButton autofocus @click="handleRequestClose">확인</UiButton>
      </template>
    </UiModal>
    <p role="status">닫기 요청 {{ requestCount }}회</p>
  `,
});

export const Default: Story = {
  render: createRender(true),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "모달 열기" }));

    const dialog = canvas.getByRole("dialog", { name: "기본 모달" });
    await expect(dialog).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "닫기" }));

    await expect(dialog).not.toBeVisible();
    await expect(canvas.getByRole("status")).toHaveTextContent("닫기 요청 1회");
  },
};

export const CloseRejected: Story = {
  render: createRender(false),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "모달 열기" }));

    const dialog = canvas.getByRole("dialog", { name: "기본 모달" });

    await userEvent.click(canvas.getByRole("button", { name: "닫기" }));

    await expect(dialog).toBeVisible();
    await expect(canvas.getByRole("status")).toHaveTextContent("닫기 요청 1회");
  },
};

export const BackdropClosable: Story = {
  args: {
    closeOnBackdrop: true,
  },
  render: createRender(true),
};
