export default {
  staticDirs: ['../components/GlobalStyle'],
  stories: ['../stories/all.stories.tsx', '../stories/(?!all)*.stories.tsx'],
  logLevel: 'debug',
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        controls: false,
      },
    },
    '@storybook/addon-storysource',
    // Incompatible with Storybook 7.0
    // implementation in progress
    // see https://github.com/storybookjs/addon-designs/pull/192
    // 'storybook-addon-designs',
    './src/theme-changer/register',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
