import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

const homeEntryList = [
  {
    title: 'Quick Start',
    description: '从安装、界面到第一张 RAW 图片编辑，快速建立完整工作流。',
    to: '/docs/getting-started/installation',
    linkLabel: '进入 Quick Start',
  },
  {
    title: 'Editing Tutorials',
    description: '围绕 RAW、HDR 与色彩管理提供可迭代的教程路径。',
    to: '/docs/tutorials/basic-raw-workflow',
    linkLabel: '查看 Tutorials',
  },
  {
    title: 'Developer Docs',
    description: '面向贡献者的构建、架构与 GPU 后端文档入口。',
    to: '/docs/developer/architecture-overview',
    linkLabel: '进入 Developer Docs',
  },
];

function HomeHero() {
  return (
    <section className="puerh-home-hero">
      <div className="container puerh-home-container">
        <Heading as="h1" className="puerh-home-title">
          Pu-erh Lab
        </Heading>
        <p className="puerh-home-subtitle">
          面向摄影工作流的高性能 RAW 图像处理与编辑项目文档。
        </p>
        <div className="puerh-home-actions">
          <Link className="button button--primary" to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--outline button--secondary"
            to="/docs/tutorials/basic-raw-workflow">
            Tutorials
          </Link>
          <Link className="puerh-home-dev-link" to="/docs/developer/architecture-overview">
            Developer Docs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout title="首页" description="Pu-erh Lab 中文技术文档">
      <HomeHero />
      <main>
        <section className="puerh-home-section">
          <div className="container puerh-home-container">
            <Heading as="h2" className="puerh-home-section-title">
              文档入口
            </Heading>
            <div className="puerh-home-grid">
              {homeEntryList.map((entry) => (
                <article className="puerh-home-card" key={entry.title}>
                  <Heading as="h3" className="puerh-home-card-title">
                    {entry.title}
                  </Heading>
                  <p className="puerh-home-card-description">{entry.description}</p>
                  <Link className="puerh-home-card-link" to={entry.to}>
                    {entry.linkLabel}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="puerh-home-section puerh-home-focus">
          <div className="container puerh-home-container">
            <Heading as="h2" className="puerh-home-section-title">
              项目关注点
            </Heading>
            <p className="puerh-home-focus-text">
              当前文档版本聚焦四条主线：RAW 编辑流程、GPU 加速路径、色彩管理能力与可扩展架构。
              该结构用于支持后续章节持续细化，而不过早引入冗余页面。
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
