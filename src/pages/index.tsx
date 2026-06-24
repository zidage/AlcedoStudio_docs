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
    title: 'AI 功能',
    description: '模型下载与激活、内容标签生成，以及语义 / 模糊搜索的完整说明。',
    to: '/docs/ai/overview',
    linkLabel: '查看 AI 功能',
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
    <section className="alcedo-home-hero">
      <div className="container alcedo-home-container">
        <Heading as="h1" className="alcedo-home-title">
          Alcedo Studio
        </Heading>
        <p className="alcedo-home-subtitle">
          面向摄影工作流的高性能 RAW 图像处理、编辑与资产管理项目文档。
        </p>
        <div className="alcedo-home-actions">
          <Link className="button button--primary" to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--outline button--secondary"
            to="/docs/tutorials/basic-raw-workflow">
            Tutorials
          </Link>
          <Link className="alcedo-home-dev-link" to="/docs/developer/architecture-overview">
            Developer Docs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout title="首页" description="Alcedo Studio 中文技术文档">
      <HomeHero />
      <main>
        <section className="alcedo-home-section">
          <div className="container alcedo-home-container">
            <Heading as="h2" className="alcedo-home-section-title">
              文档入口
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
              项目关注点
            </Heading>
            <p className="alcedo-home-focus-text">
              当前文档版本聚焦几条主线：RAW 编辑流程、GPU 加速路径、色彩管理能力、AI 辅助的资产管理与搜索，以及可扩展架构。
              该结构用于支持后续章节持续细化，而不过早引入冗余页面。
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}