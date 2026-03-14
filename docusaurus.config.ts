import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Pu-erh Lab',
  tagline: '高性能 RAW 图像处理与编辑文档',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://zidage.github.io',
  baseUrl: '/PuerhLab/zh/',
  organizationName: 'zidage',
  projectName: 'PuerhLab',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Pu-erh Lab 文档',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/tutorials/basic-raw-workflow',
          label: 'Tutorials',
          position: 'left',
        },
        {
          href: 'https://github.com/zidage/PuerhLab',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: '介绍',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Tutorials',
          items: [
            {
              label: '基础 RAW 工作流',
              to: '/docs/tutorials/basic-raw-workflow',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/zidage/PuerhLab',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Pu-erh Lab`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
