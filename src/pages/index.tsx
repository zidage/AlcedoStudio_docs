import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';

function Home(): ReactNode {
  const homeEntryList = [
    {
      title: translate({id: 'homepage.entry.quickStart.title', message: '快速上手 (Quick Start)'}),
      description: translate({
        id: 'homepage.entry.quickStart.description',
        message: '创建项目、导入照片、调整影调和色彩，然后导出。',
      }),
      to: '/docs/getting-started/installation',
      linkLabel: translate({
        id: 'homepage.entry.quickStart.link',
        message: '开始快速上手 →',
      }),
    },
    {
      title: translate({id: 'homepage.entry.editing.title', message: '图像编辑与色彩分级'}),
      description: translate({
        id: 'homepage.entry.editing.description',
        message: 'RAW 解码、局部蒙版节点、CAT02 创意白平衡、3D LUT 编码与 ACES/OpenDRT 显示变换。',
      }),
      to: '/docs/editing/raw-and-geometry',
      linkLabel: translate({id: 'homepage.entry.editing.link', message: '查看编辑文档 →'}),
    },
    {
      title: translate({id: 'homepage.entry.library.title', message: '图库与资产管理'}),
      description: translate({
        id: 'homepage.entry.library.description',
        message: '使用图库管理虚拟集合、星级评分、筛选和批量调整复用。',
      }),
      to: '/docs/library/import-and-organize',
      linkLabel: translate({id: 'homepage.entry.library.link', message: '管理图库照片 →'}),
    },
    {
      title: translate({id: 'homepage.entry.ai.title', message: '本地 AI 与自动化'}),
      description: translate({
        id: 'homepage.entry.ai.description',
        message: '使用本地 CLIP 模型生成内容标签、进行语义搜索，以及通过 alcedo-cli 自动化编辑。',
      }),
      to: '/docs/ai/overview',
      linkLabel: translate({id: 'homepage.entry.ai.link', message: '了解 AI 能力 →'}),
    },
    {
      title: translate({id: 'homepage.entry.developer.title', message: '架构与开发者文档'}),
      description: translate({
        id: 'homepage.entry.developer.description',
        message: 'DAG 提交历史、GPU 加速管线（CUDA/Metal/OpenCL）与 alcedo-cli 自动化。',
      }),
      to: '/docs/developer/architecture-overview',
      linkLabel: translate({
        id: 'homepage.entry.developer.link',
        message: '查看架构文档 →',
      }),
    },
  ];

  return (
    <Layout
      title={translate({id: 'homepage.title', message: '首页'})}
      description={translate({
        id: 'homepage.description',
        message: 'Alcedo Studio 官方技术文档与操作指南',
      })}>
      <section className="alcedo-home-hero">
        <div className="container alcedo-home-container">
          <Heading as="h1" className="alcedo-home-title">
            Alcedo Studio
          </Heading>
          <p className="alcedo-home-subtitle">
            <Translate id="homepage.hero.subtitle">
              非破坏性 RAW 照片编辑与图库管理软件，提供 GPU 加速、调色节点和本地 AI 功能。
            </Translate>
          </p>
          <div className="alcedo-home-actions">
            <Link className="button button--primary" to="/docs/intro">
              <Translate id="homepage.hero.quickStart">快速上手教程</Translate>
            </Link>
            <Link
              className="alcedo-home-dev-link"
              to="/docs/developer/architecture-overview">
              <Translate id="homepage.hero.developer">开发者与架构说明</Translate>
            </Link>
          </div>
        </div>
      </section>
      <main>
        <section className="alcedo-home-section">
          <div className="container alcedo-home-container">
            <Heading as="h2" className="alcedo-home-section-title">
              <Translate id="homepage.section.entries">文档导航</Translate>
            </Heading>
            <div className="alcedo-home-grid">
              {homeEntryList.map((entry) => (
                <article className="alcedo-home-card" key={entry.title}>
                  <Heading as="h3" className="alcedo-home-card-title">
                    {entry.title}
                  </Heading>
                  <p className="alcedo-home-card-description">{entry.description}</p>
                  <Link className="alcedo-home-card-link" to={entry.to}>
                    {entry.linkLabel}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="alcedo-home-section alcedo-home-focus">
          <div className="container alcedo-home-container">
            <Heading as="h2" className="alcedo-home-section-title">
              <Translate id="homepage.section.focus">工作方式</Translate>
            </Heading>
            <p className="alcedo-home-focus-text">
              <Translate id="homepage.focus.text">
                Alcedo Studio 在 DuckDB 项目数据库中保存照片引用、调整参数和版本记录。图像处理管线使用场景线性色彩空间，并提供 ACES 和 OpenDRT 显示变换、分支版本管理与 GPU 加速。
              </Translate>
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
