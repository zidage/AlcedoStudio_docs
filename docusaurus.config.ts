import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Alcedo Studio',
  tagline: 'v0.3.3 使用教程与 v0.2.x–v0.3.3 更新记录',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://zidage.github.io',
  baseUrl: '/AlcedoStudio_docs/',

  // GitHub Pages config is now set via deployment workflow, but we keep
  // organizationName/projectName for the trailing-slash behavior of the
  // classic preset. The docs site lives in its own repo (AlcedoStudio_docs),
  // while the software source is at github.com/zidage/AlcedoStudio.
  organizationName: 'zidage',
  projectName: 'AlcedoStudio_docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {
        label: '简体中文',
      },
      en: {
        label: 'English',
      },
    },
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
      title: 'Alcedo Studio 文档',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/automation/cli',
          label: 'CLI 与自动化',
          position: 'left',
        },
        {
          to: '/docs/releases/upgrade-guide',
          label: '版本与升级',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/zidage/AlcedoStudio',
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
          title: 'Project',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/zidage/AlcedoStudio',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Alcedo Studio`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
