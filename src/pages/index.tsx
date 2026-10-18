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
        message: '按 v0.3.3 的实际界面，从创建项目到完成第一张照片。',
      }),
      to: '/docs/getting-started/installation',
      linkLabel: translate({
        id: 'homepage.entry.quickStart.link',
        message: '进入 Quick Start',
      }),
    },
    {
      title: translate({id: 'homepage.entry.editing.title', message: '编辑与导出'}),
      description: translate({
        id: 'homepage.entry.editing.description',
        message: 'RAW 与位图输入、节点与蒙版、LUT 编码、版本对比和导出预设。',
      }),
      to: '/docs/editing/raw-and-geometry',
      linkLabel: translate({id: 'homepage.entry.editing.link', message: '查看编辑教程'}),
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
      title: translate({id: 'homepage.entry.versions.title', message: '版本与升级'}),
      description: translate({
        id: 'homepage.entry.versions.description',
        message: 'v0.2.0 至 v0.3.3 完整更新记录、项目兼容性与旧工作流变化。',
      }),
      to: '/docs/releases/upgrade-guide',
      linkLabel: translate({id: 'homepage.entry.versions.link', message: '查看升级指南'}),
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
              v0.3.3 使用教程：导入、选片、节点调色、LUT、版本对比与导出。
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
                教程按生产 QML 入口自顶向下整理，并配有 Windows Release v0.3.3 的实机截图。
                逐版记录保留 v0.2.x 至 v0.3.3 的功能、性能与修复说明，升级指南解释项目格式和操作变化。
              </Translate>
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
