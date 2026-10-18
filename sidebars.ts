import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const releasePages = [
  '0.3.3', '0.3.2', '0.3.1', '0.3.0', '0.2.9', '0.2.8', '0.2.7',
  '0.2.6', '0.2.5', '0.2.4', '0.2.3', '0.2.2', '0.2.1', '0.2.0',
].map((version) => `releases/v${version}`);

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category', label: '快速上手',
      items: ['getting-started/installation', 'getting-started/interface-overview',
        'getting-started/first-edit'],
    },
    {
      type: 'category', label: '图库与选片',
      items: ['library/import-and-organize'],
    },
    {
      type: 'category', label: '编辑照片',
      items: ['editing/raw-and-geometry', 'editing/nodes-and-masks',
        'editing/tone-and-color', 'editing/lut-library', 'editing/display-and-effects',
        'getting-started/edit-history-and-versions', 'editing/comparison'],
    },
    {type: 'category', label: '导出', items: ['export/workflow']},
    {
      type: 'category', label: 'AI 功能',
      items: ['ai/overview', 'ai/model-management', 'ai/label-generation',
        'ai/search', 'ai/provider-configuration'],
    },
    {
      type: 'category', label: '设置与自动化',
      items: ['settings/preferences', 'automation/cli'],
    },
    {
      type: 'category', label: '版本与升级',
      items: ['releases/upgrade-guide',
        {type: 'category', label: '逐版更新记录', items: releasePages}],
    },
    {
      type: 'category', label: '开发者',
      items: ['developer/build-from-source', 'developer/architecture-overview',
        'developer/edit-history-architecture', 'developer/gpu-backend',
        'developer/tutorial-source-map'],
    },
  ],
};
export default sidebars;
