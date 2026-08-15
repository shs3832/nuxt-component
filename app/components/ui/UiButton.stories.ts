import type { Meta, StoryObj } from "@storybook/vue3-vite";

import UiButton from "./UiButton.vue";

const meta = {
  title: "UI/UiButton",
  component: UiButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
  args: {
    variant: "primary",
    size: "medium",
    disabled: false,
    loading: false,
    iconOnly: false,
  },
  render: (args) => ({
    components: { UiButton },
    setup() {
      return { args };
    },
    template: '<UiButton v-bind="args">저장</UiButton>',
  }),
} satisfies Meta<typeof UiButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
  },
  render: (args) => ({
    components: { UiButton },
    setup() {
      return { args };
    },
    template: `
      <UiButton v-bind="args" aria-label="닫기">
        <template #leading>×</template>
      </UiButton>
    `,
  }),
};
