import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';

function Home(): ReactNode {
  const homeEntryList = [
    {
      title: translate({id: 'homepage.entry.quickStart.title', message: 'Quick Start'}),
      description: translate({
        id: 'homepage.entry.quickStart.description',
        message: '从安装、界面到第一张 RAW 图片编辑，快速建立完整工作流。',
      }),
      to: '/docs/getting-started/installation',
      linkLabel: translate({
        id: 'homepage.entry.quickStart.link',
        message: '进入 Quick Start',
      }),
    },
    {
      title: translate({id: 'homepage.entry.ai.title', message: 'AI 功能'}),
      description: translate({
        id: 'homepage.entry.ai.description',
        message: '本地模型、API 供应商配置、内容标签、图像评分与语义 / 模糊搜索。',
      }),
      to: '/docs/ai/overview',
      linkLabel: translate({id: 'homepage.entry.ai.link', message: '查看 AI 功能'}),
    },
    {
      title: translate({id: 'homepage.entry.developer.title', message: 'Developer Docs'}),
      description: translate({
        id: 'homepage.entry.developer.description',
        message: '面向贡献者的构建、架构与 GPU 后端文档入口。',
      }),
      to: '/docs/developer/architecture-overview',
      linkLabel: translate({
        id: 'homepage.entry.developer.link',
        message: '进入 Developer Docs',
      }),
    },
  ];

  return (
    <Layout
      title={translate({id: 'homepage.title', message: '首页'})}
      description={translate({
        id: 'homepage.description',
        message: 'Alcedo Studio 中文技术文档',
      })}>
      <section className="alcedo-home-hero">
        <div className="container alcedo-home-container">
          <Heading as="h1" className="alcedo-home-title">
            Alcedo Studio
          </Heading>
          <p className="alcedo-home-subtitle">
            <Translate id="homepage.hero.subtitle">
              面向摄影工作流的高性能 RAW 图像处理、编辑与资产管理项目文档。
            </Translate>
          </p>
          <div className="alcedo-home-actions">
            <Link className="button button--primary" to="/docs/intro">
              Quick Start
            </Link>
            <Link
              className="alcedo-home-dev-link"
              to="/docs/developer/architecture-overview">
              Developer Docs
            </Link>
          </div>
        </div>
      </section>
      <main>
        <section className="alcedo-home-section">
          <div className="container alcedo-home-container">
            <Heading as="h2" className="alcedo-home-section-title">
              <Translate id="homepage.section.entries">文档入口</Translate>
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
              <Translate id="homepage.section.focus">项目关注点</Translate>
            </Heading>
            <p className="alcedo-home-focus-text">
              <Translate id="homepage.focus.text">
                当前文档版本聚焦几条主线：RAW 编辑流程、GPU 加速路径、色彩管理能力、AI
                辅助的资产管理
                与搜索，以及可扩展架构。该结构用于支持后续章节持续细化，而不过早引入冗余页面。
              </Translate>
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
