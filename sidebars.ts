import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
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
        'ai/model-management',
        'ai/label-generation',
        'ai/search',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'tutorials/basic-raw-workflow',
        'tutorials/hdr-workflow',
        'tutorials/color-workflow',
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