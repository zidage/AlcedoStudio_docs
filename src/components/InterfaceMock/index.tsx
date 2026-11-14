import type {CSSProperties, ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import {LibraryInspectorDemo, LutControlsMock, LutPackagesMock, TransferDemo} from '../SourceMocks';

type Text = readonly [zh: string, en: string];
type Row = {
  label: Text;
  value?: Text;
  kind?: 'range' | 'toggle' | 'selected' | 'status';
  amount?: number;
};
type Mock = {title: Text; rows: Row[]};

// Text stays beside its translation so every instance follows the page locale.
// These are static teaching examples, not executable application controls.
const mocks = {
  'new-project': {
    title: ['新建项目', 'New Project'],
    rows: [
      {label: ['项目名称', 'Project name'], value: ['旅行照片', 'Travel Photos']},
      {label: ['存储位置', 'Location'], value: ['D:/Photos/Projects', 'D:/Photos/Projects']},
      {label: ['项目文件', 'Project file'], value: ['旅行照片.alcd', 'Travel Photos.alcd']},
    ],
  },
  library: {
    title: ['图库', 'Library'],
    rows: [],
  },
  'editor-tone': {
    title: ['编辑器', 'Editor'],
    rows: [
      {label: ['色调', 'Tone'], kind: 'selected'},
      {label: ['曝光', 'Exposure'], value: ['+0.30 EV', '+0.30 EV'], kind: 'range', amount: 55},
      {label: ['对比度', 'Contrast'], value: ['1.00', '1.00'], kind: 'range', amount: 50},
      {label: ['高光', 'Highlights'], value: ['−20', '−20'], kind: 'range', amount: 40},
    ],
  },
  tone: {
    title: ['色调', 'Tone'],
    rows: [
      {label: ['曝光', 'Exposure'], value: ['+0.30 EV', '+0.30 EV'], kind: 'range', amount: 55},
      {label: ['对比度', 'Contrast'], value: ['1.00', '1.00'], kind: 'range', amount: 50},
      {label: ['高光', 'Highlights'], value: ['−20', '−20'], kind: 'range', amount: 40},
      {label: ['阴影', 'Shadows'], value: ['+15', '+15'], kind: 'range', amount: 58},
      {label: ['白色色阶 / 黑色色阶', 'Whites / Blacks'], value: ['0 / 0', '0 / 0']},
    ],
  },
  look: {
    title: ['外观', 'Look'],
    rows: [
      {label: ['外观白平衡 · CAT02', 'Look White Balance · CAT02'], kind: 'selected'},
      {label: ['色温', 'Temperature'], value: ['6000 K', '6000 K'], kind: 'range', amount: 50},
      {label: ['色调', 'Tint'], value: ['0', '0'], kind: 'range', amount: 50},
      {label: ['自然饱和度', 'Vibrance'], value: ['0', '0'], kind: 'range', amount: 50},
      {label: ['饱和度', 'Saturation'], value: ['1.00', '1.00'], kind: 'range', amount: 50},
    ],
  },
  'raw-white-balance': {
    title: ['RAW 解码 · 相机白平衡', 'RAW Decode · Camera White Balance'],
    rows: [
      {label: ['相机白平衡', 'Camera White Balance'], value: ['拍摄时白平衡', 'As Shot']},
      {label: ['色温', 'Temperature'], value: ['5200 K', '5200 K'], kind: 'range', amount: 45},
      {label: ['色调', 'Tint'], value: ['0', '0'], kind: 'range', amount: 50},
      {label: ['方法', 'Method'], value: ['Legacy', 'Legacy']},
      {label: ['镜头校正', 'Lens calibration'], kind: 'toggle', amount: 1},
    ],
  },
  'raw-decode': {
    title: ['位图输入色彩', 'Raster Input Color'],
    rows: [
      {label: ['输入色彩', 'Input color'], value: ['自动元数据检测', 'Auto metadata']},
      {label: ['输入配置文件', 'Input profile'], value: ['sRGB', 'sRGB']},
    ],
  },
  geometry: {
    title: ['裁剪与旋转', 'Crop & Rotation'],
    rows: [
      {label: ['宽高比', 'Aspect ratio'], value: ['3:2', '3:2']},
      {label: ['锁定比例', 'Lock aspect ratio'], kind: 'toggle', amount: 1},
      {label: ['旋转', 'Rotation'], value: ['0.0°', '0.0°'], kind: 'range', amount: 50},
    ],
  },
  nodes: {title: ['节点', 'Nodes'], rows: []},
  masks: {
    title: ['图层与径向蒙版', 'Layers & Radial Mask'],
    rows: [
      {label: ['主体提亮', 'Subject lift'], kind: 'selected'},
      {label: ['径向蒙版', 'Radial mask'], kind: 'toggle', amount: 1},
      {label: ['不透明度', 'Opacity'], value: ['80%', '80%'], kind: 'range', amount: 80},
    ],
  },
  'mask-controls': {
    title: ['径向蒙版', 'Radial Mask'],
    rows: [
      {label: ['启用', 'Enabled'], kind: 'toggle', amount: 1},
      {label: ['反相', 'Invert'], kind: 'toggle', amount: 0},
      {label: ['不透明度', 'Opacity'], value: ['80%', '80%'], kind: 'range', amount: 80},
      {label: ['水平半径', 'Radius X'], value: ['0.25', '0.25'], kind: 'range', amount: 25},
      {label: ['垂直半径', 'Radius Y'], value: ['0.35', '0.35'], kind: 'range', amount: 35},
    ],
  },
  history: {
    title: ['历史', 'History'],
    rows: [
      {label: ['03 · 曝光 +0.30 EV', '03 · Exposure +0.30 EV'], value: ['智能体 · 提亮主体', 'Agent · Lift subject'], kind: 'selected'},
      {label: ['02 · 调整裁剪', '02 · Adjust crop']},
      {label: ['01 · 初始状态', '01 · Initial state']},
    ],
  },
  versions: {
    title: ['版本', 'Versions'],
    rows: [
      {label: ['暖调胶片', 'Warm Film'], value: ['当前版本', 'Current version'], kind: 'selected'},
      {label: ['高反差黑白', 'High-Contrast B&W'], value: ['独立分支', 'Separate branch']},
    ],
  },
  transfer: {
    title: ['复制调整', 'Copy Adjustments'],
    rows: [],
  },
  comparison: {
    title: ['A/B 对比', 'A/B Comparison'],
    rows: [
      {label: ['A', 'A'], value: ['未调整', 'Unadjusted']},
      {label: ['B', 'B'], value: ['当前版本', 'Current version']},
    ],
  },
  'comparison-controls': {
    title: ['对比控制', 'Comparison Controls'],
    rows: [
      {label: ['A', 'A'], value: ['未调整', 'Unadjusted']},
      {label: ['B', 'B'], value: ['当前版本', 'Current version']},
      {label: ['布局', 'Layout'], value: ['分割线', 'Divider']},
      {label: ['交换 A 和 B', 'Swap A and B'], kind: 'selected'},
      {label: ['关闭对比', 'Close comparison']},
    ],
  },
  'display-transform': {
    title: ['显示变换', 'Display Transform'],
    rows: [
      {label: ['方法', 'Method'], value: ['OpenDRT', 'OpenDRT']},
      {label: ['编码色域', 'Encoding gamut'], value: ['Rec.709', 'Rec.709']},
      {label: ['传递函数', 'EOTF'], value: ['sRGB', 'sRGB']},
      {label: ['创意白点', 'Creative white'], value: ['D65', 'D65']},
    ],
  },
  post: {
    title: ['后期处理', 'Post Processing'],
    rows: [
      {label: ['柔光', 'Diffusion'], value: ['10%', '10%'], kind: 'range', amount: 10},
      {label: ['清晰度', 'Clarity'], value: ['0', '0'], kind: 'range', amount: 50},
      {label: ['锐化', 'Sharpening'], value: ['20%', '20%'], kind: 'range', amount: 20},
      {label: ['胶片颗粒', 'Film grain'], kind: 'toggle', amount: 0},
    ],
  },
  'lut-packages': {
    title: ['官方 LUT 包', 'Official LUT Packages'],
    rows: [],
  },
  'lut-controls': {
    title: ['LUT 参数', 'LUT Controls'],
    rows: [
      {label: ['LUT', 'LUT'], value: ['Portra 400', 'Portra 400']},
      {label: ['输入编码', 'Input encoding'], value: ['ACEScc', 'ACEScc']},
      {label: ['输出编码', 'Output encoding'], value: ['ACEScc', 'ACEScc']},
      {label: ['为此 LUT 记住设置', 'Remember for this LUT'], kind: 'toggle', amount: 1},
      {label: ['强度', 'Strength'], value: ['70%', '70%'], kind: 'range', amount: 70},
    ],
  },
  'lut-browser': {
    title: ['LUT 浏览器', 'LUT Browser'],
    rows: [
      {label: ['搜索', 'Search'], value: ['Portra', 'Portra']},
      {label: ['类别', 'Category'], value: ['彩色负片', 'Color negative']},
      {label: ['来源', 'Source'], value: ['官方', 'Official']},
      {label: ['品牌', 'Brand'], value: ['Kodak', 'Kodak']},
      {label: ['★ Portra 400', '★ Portra 400'], kind: 'selected'},
    ],
  },
  'export-presets': {
    title: ['导出预设', 'Export Presets'],
    rows: [
      {label: ['网页', 'Web'], value: ['JPEG · sRGB · 2048 px', 'JPEG · sRGB · 2048 px'], kind: 'selected'},
      {label: ['社交媒体', 'Social Media'], value: ['1080 × 1350 px', '1080 × 1350 px']},
      {label: ['电子邮件', 'Email'], value: ['JPEG · 1280 px', 'JPEG · 1280 px']},
      {label: ['最高质量 JPEG', 'Maximum Quality JPEG'], value: ['100%', '100%']},
      {label: ['16 位 TIFF', '16-bit TIFF'], value: ['ZIP', 'ZIP']},
      {label: ['EXR 存档', 'EXR Archive'], value: ['16-bit float', '16-bit float']},
    ],
  },
  'export-sizing': {
    title: ['导出格式与尺寸', 'Export Format & Size'],
    rows: [
      {label: ['格式', 'Format'], value: ['JPEG', 'JPEG']},
      {label: ['质量', 'Quality'], value: ['80', '80'], kind: 'range', amount: 80},
      {label: ['色彩空间', 'Color space'], value: ['sRGB', 'sRGB']},
      {label: ['尺寸模式', 'Sizing mode'], value: ['最长边', 'Long Edge']},
      {label: ['最长边', 'Long edge'], value: ['2048 px', '2048 px']},
    ],
  },
  'export-hdr-queue': {
    title: ['Ultra HDR 与导出队列', 'Ultra HDR & Export Queue'],
    rows: [
      {label: ['Ultra HDR JPEG', 'Ultra HDR JPEG'], kind: 'toggle', amount: 1},
      {label: ['HDR 质量', 'HDR quality'], value: ['90', '90'], kind: 'range', amount: 90},
      {label: ['HDR 最长边', 'HDR long edge'], value: ['4096 px', '4096 px']},
      {label: ['DSC_0001.NEF', 'DSC_0001.NEF'], value: ['已完成', 'Done'], kind: 'status'},
      {label: ['DSC_0002.NEF', 'DSC_0002.NEF'], value: ['已排队', 'Queued']},
    ],
  },
  'export-metadata': {
    title: ['元数据', 'Metadata'],
    rows: [
      {label: ['EXIF 元数据', 'EXIF metadata'], kind: 'toggle', amount: 1},
      {label: ['ICC 配置文件', 'ICC profile'], kind: 'toggle', amount: 1},
      {label: ['EXIF 中的 GPS 位置', 'GPS location in EXIF'], kind: 'toggle', amount: 0},
    ],
  },
  settings: {
    title: ['设置 · 常规', 'Settings · General'],
    rows: [
      {label: ['语言', 'Language'], value: ['简体中文', 'English']},
      {label: ['主题', 'Theme'], value: ['Alcedo', 'Alcedo']},
      {label: ['添加蒙版时', 'When adding a mask'], value: ['新建图层后绘制', 'Create a new layer first']},
    ],
  },
  keyboard: {
    title: ['键盘快捷键', 'Keyboard Shortcuts'],
    rows: [
      {label: ['撤销', 'Undo'], value: ['Ctrl+Z', 'Ctrl+Z']},
      {label: ['重做', 'Redo'], value: ['Ctrl+Shift+Z', 'Ctrl+Shift+Z']},
      {label: ['搜索', 'Search'], value: ['Ctrl+F', 'Ctrl+F']},
      {label: ['评分 5 星', 'Rate 5 stars'], value: ['5', '5']},
    ],
  },
  'local-ai': {
    title: ['本地内容识别', 'Local Content Recognition'],
    rows: [
      {label: ['模型', 'Model'], value: ['CLIP', 'CLIP']},
      {label: ['下载目录', 'Download directory'], value: ['D:/Models', 'D:/Models']},
      {label: ['下载源', 'Source'], value: ['Hugging Face', 'Hugging Face']},
      {label: ['状态', 'Status'], value: ['已激活', 'Active'], kind: 'status'},
      {label: ['导入时生成标签', 'Generate tags on import'], value: ['总是询问', 'Always Ask']},
    ],
  },
  'search-results': {
    title: ['搜索结果', 'Search Results'],
    rows: [
      {label: ['搜索', 'Search'], value: ['iso800 f/2.8 35mm', 'iso800 f/2.8 35mm']},
      {label: ['DSC_0001.NEF', 'DSC_0001.NEF'], value: ['ISO 800 · f/2.8 · 35 mm', 'ISO 800 · f/2.8 · 35 mm'], kind: 'selected'},
      {label: ['DSC_0002.NEF', 'DSC_0002.NEF'], value: ['ISO 800 · f/2.8 · 35 mm', 'ISO 800 · f/2.8 · 35 mm']},
    ],
  },
  'search-conditions': {
    title: ['搜索设置', 'Search Settings'],
    rows: [
      {label: ['文件名', 'Filename'], kind: 'toggle', amount: 1},
      {label: ['EXIF 信息', 'EXIF info'], kind: 'toggle', amount: 1},
      {label: ['AI 描述文本', 'AI description'], kind: 'toggle', amount: 1},
      {label: ['AI 标签', 'AI tags'], kind: 'toggle', amount: 1},
      {label: ['自然语言搜索', 'Natural language search'], kind: 'toggle', amount: 1},
    ],
  },
} satisfies Record<string, Mock>;

export type InterfaceMockKind = keyof typeof mocks;

export default function InterfaceMock({kind}: {kind: InterfaceMockKind}): ReactNode {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const t = (text: Text) => text[currentLocale.startsWith('en') ? 1 : 0];
  const mock: Mock = mocks[kind];
  if (kind === 'lut-packages') return <LutPackagesMock />;
  if (kind === 'lut-controls') return <LutControlsMock />;
  if (kind === 'transfer') return <TransferDemo />;
  const isLibrary = kind === 'library';
  const isEditor = kind === 'editor-tone';
  const isCanvas = kind === 'geometry' || kind === 'masks' || kind === 'comparison';
  const navigation: Text[] = isLibrary
    ? [['所有照片', 'All Photos'], ['旅行精选', 'Travel Picks'], ['导入图像', 'Import Images']]
    : [['历史', 'History'], ['版本', 'Versions'], ['节点', 'Nodes'], ['LUT', 'LUT']];

  const rows = (
    <dl className={styles.fields}>
      {mock.rows.map((row, index) => (
        <div className={`${styles.row} ${row.kind === 'selected' ? styles.selected : ''}`} key={index}>
          <dt>{t(row.label)}</dt>
          <dd>
            {row.kind === 'toggle' ? (
              <span className={styles.toggleValue}>
                <span className={`${styles.toggle} ${row.amount ? styles.on : ''}`} aria-hidden="true" />
                {t(row.amount ? ['开启', 'On'] : ['关闭', 'Off'])}
              </span>
            ) : row.value ? (
              <span className={row.kind === 'status' ? styles.status : styles.value}>{t(row.value)}</span>
            ) : null}
          </dd>
          {row.kind === 'range' && (
            <div className={styles.track} style={{'--fill': `${row.amount}%`} as CSSProperties} aria-hidden="true">
              <span />
            </div>
          )}
        </div>
      ))}
    </dl>
  );

  return (
    <figure className={styles.mock} aria-label={t(mock.title)}>
      <div className={styles.titlebar}>
        <span className={styles.brand}>Alcedo Studio</span>
        <span>{t(mock.title)}</span>
      </div>
      {kind === 'nodes' ? (
        <ol className={styles.nodes}>
          {([
            ['输入解码与相机白平衡', 'Input Decoding & Camera WB'],
            ['基础显影', 'Develop'],
            ['主体提亮 · 径向蒙版', 'Subject Lift · Radial Mask'],
            ['天空压暗 · 线性渐变蒙版', 'Sky Burn · Linear Gradient'],
            ['显示变换', 'Display Transform'],
            ['后期处理', 'Post Processing'],
          ] as Text[]).map((label, index) => (
            <li key={index}><span>{String(index + 1).padStart(2, '0')}</span>{t(label)}</li>
          ))}
        </ol>
      ) : isLibrary || isEditor || isCanvas ? (
        <div className={`${styles.workspace} ${isLibrary || isEditor ? styles.threeColumns : ''}`}>
          {(isLibrary || isEditor) && (
            <aside className={styles.sidebar}>
              <strong>{t(isLibrary ? ['集合', 'Collections'] : ['工具', 'Tools'])}</strong>
              {navigation.map((label, index) => <span key={index}>{t(label)}</span>)}
            </aside>
          )}
          <div className={styles.canvas}>
            {isLibrary ? (
              <div className={styles.photoGrid}>
                {Array.from({length: 6}, (_, index) => (
                  <div key={index}><span>RAW</span><small>DSC_000{index + 1}</small></div>
                ))}
              </div>
            ) : kind === 'comparison' ? (
              <div className={styles.split}>
                <div><b>A</b><span>{t(['未调整', 'Unadjusted'])}</span></div>
                <div><b>B</b><span>{t(['当前版本', 'Current version'])}</span></div>
                <span className={styles.divider} aria-hidden="true">↔</span>
              </div>
            ) : kind === 'geometry' ? (
              <div className={styles.crop}>
                <span>{t(['裁剪区域', 'Crop area'])}</span>
                <i /><i /><i /><i />
              </div>
            ) : kind === 'masks' ? (
              <div className={styles.ellipse}><span>{t(['作用区域', 'Masked area'])}</span></div>
            ) : (
              <div className={styles.viewportLabel}>{t(['图像视口', 'Image viewport'])}<small>DSC_0001.NEF</small></div>
            )}
            <span className={styles.canvasLabel}>{t(['画布示意', 'Canvas schematic'])}</span>
          </div>
          <div className={styles.inspector}>{isLibrary ? <LibraryInspectorDemo compact /> : rows}</div>
        </div>
      ) : rows}
      {kind === 'raw-white-balance' && (
        <ol className={styles.flow}>
          {([
            ['RAW 处理完成', 'RAW processing complete'],
            ['相机 RGB 图像', 'Camera RGB image'],
            ['相机白平衡', 'Camera white balance'],
          ] as Text[]).map((step, index) => <li key={index}>{t(step)}</li>)}
        </ol>
      )}
      <figcaption>{t(['界面示意 · 仅展示相关控件，数值为示例', 'Interface schematic · Relevant controls only; values are examples'])}</figcaption>
    </figure>
  );
}
