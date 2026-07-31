import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/interface-overview',
        'getting-started/first-edit',
      ],
    },
    {
      type: 'category',
      label: 'AI 功能',
      items: [
        'ai/overview',
        'ai/provider-configuration',
        'ai/model-management',
        'ai/label-generation',
        'ai/search',
      ],
    },
    {
      type: 'category',
      label: 'Developer',
      items: [
        'developer/build-from-source',
        'developer/architecture-overview',
        'developer/gpu-backend',
      ],
    },
  ],
};

export default sidebars;
