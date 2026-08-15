import type { StorybookConfig } from "@storybook/vue3-vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

const config: StorybookConfig = {
  stories: ["../app/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/vue3-vite",
  viteFinal: async (config) => {
    config.plugins ??= [];
    config.plugins.unshift(vue());
    config.plugins.push(
      AutoImport({ imports: ["vue"], dts: false }),
      Components({ dirs: ["app/components"], dts: false }),
    );

    return config;
  },
};

export default config;
