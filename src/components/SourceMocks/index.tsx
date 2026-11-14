import {useId, useState, type ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

type Text = readonly [string, string];
function useLabels() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  return (text: Text) => text[currentLocale.startsWith('en') ? 1 : 0];
}

// Paths follow the application's config/panel_icons. Sort and group glyphs:
// Tabler Icons, MIT — https://github.com/tabler/tabler-icons/blob/main/LICENSE.
function Icon({name}: {name: 'ascending'|'descending'|'group'|'invert'|'lock'|'unlock'|'trash'}) {
  const paths: Record<typeof name, string[]> = {
    ascending: ['M4 6h7M4 12h7M4 18h9', 'M15 9l3-3 3 3M18 6v12'],
    descending: ['M4 6h9M4 12h7M4 18h7', 'M15 15l3 3 3-3M18 6v12'],
    group: ['M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 17h6m-3-3v6'],
    invert: ['M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0', 'M12 17a5 5 0 0 0 0-10v10'],
    lock: ['M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z', 'M8 11V7a4 4 0 1 1 8 0v4'],
    unlock: ['M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z', 'M8 11V6a4 4 0 0 1 8 0'],
    trash: ['M4 7h16M10 11v6M14 11v6', 'M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3'],
  };
  return <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name].map((d,i)=><path d={d} key={i} />)}</svg>;
}

function Frame({title, children}: {title: Text; children: ReactNode}) {
  const t = useLabels();
  return <figure className={styles.frame} aria-label={t(title)}>
    <header className={styles.title}><b>Alcedo Studio</b><span>{t(title)}</span></header>
    {children}
    <figcaption>{t(['界面示意 · 示例数据，控件位置参考 QML', 'Interface schematic · Example data; control layout follows QML'])}</figcaption>
  </figure>;
}

// LutSettingsPanel.qml: PackageCard, not one package per film stock.
export function LutPackagesMock() {
  const t = useLabels();
  return <Frame title={['设置 · LUT', 'Settings · LUTs']}>
    <div className={styles.sectionTitle}><h3>{t(['官方 LUT 包', 'Official LUT Packages'])}</h3><span title={t(['重新检查', 'Check again'])}>⟳</span></div>
    <div className={styles.packages}>
      {[
        {name: 'Spectral Film LUT', upstream: 'JanLohse/spectral_film_lut', installed: true},
        {name: 'Spektrafilm LUT', upstream: 'andreavolpato/spektrafilm', installed: false},
      ].map(pack => <article className={styles.package} key={pack.name}>
        <div className={styles.packageHeading}><div><h4>{pack.name}</h4><p>{t(['基于', 'Based on'])} {pack.upstream}</p></div><span className={styles.iconAction} title={t(['在 GitHub 查看原始项目', 'View the original project on GitHub'])} aria-hidden="true">↗</span></div>
        <div className={styles.pills}>{([['LUT 数量', 'LUT count'], ['包版本', 'Revision'], ['下载大小', 'Archive size']] as Text[]).map(label=><span key={label[1]}>{t(label)}</span>)}</div>
        <div className={styles.packageAction}><span className={styles.packageStatus}><i aria-hidden="true" />{t(pack.installed ? ['已安装且为最新版本', 'Installed and current'] : ['未安装', 'Not installed'])}</span>
          {pack.installed?<span className={styles.iconAction} title={t(['移除包', 'Remove package'])} aria-label={t(['移除包', 'Remove package'])}><Icon name="trash" /></span>:<span className={styles.action}>{t(['下载', 'Download'])}</span>}
        </div>
      </article>)}
    </div>
  </Frame>;
}

export function ColorWheelsMock() {
  const t = useLabels();
  return <Frame title={['外观 · 色轮', 'Look · Color Wheels']}>
    <div className={styles.wheels}>
      {([
        ['阴影（Lift）', 'Shadows (Lift)'], ['中间调（Gamma）', 'Midtones (Gamma)'],
        ['高光（Gain）', 'Highlights (Gain)'], ['偏移（Offset）', 'Offset'],
      ] as Text[]).map(wheel=><div className={styles.wheelColumn} key={wheel[1]}>
        <strong>{t(wheel)}</strong><div className={styles.wheel} aria-hidden="true"><i /></div>
        <small>ΔR 0.00 · ΔG 0.00 · ΔB 0.00</small>
        <div className={styles.master}>{t(['主控', 'Master'])}<span>0.00 EV</span></div>
      </div>)}
    </div>
    <div className={styles.footer}>{t(['重置色轮', 'Reset wheels'])}</div>
  </Frame>;
}

export function LutControlsMock() {
  const t = useLabels();
  return <Frame title={['LUT', 'LUT']}>
    <div className={styles.lutControls}>
      <strong>Portra 400</strong>
      <div className={styles.master}><span>{t(['强度', 'Strength'])}</span><span>70%</span></div>
      <div className={styles.lutEncoding}><span>{t(['输入', 'Input'])}</span><span>ACEScc <span aria-hidden="true">⌄</span></span></div>
      <div className={styles.lutEncoding}><span>{t(['输出', 'Output'])}</span><span>ACEScc <span aria-hidden="true">⌄</span></span></div>
      <div className={styles.remember}><span aria-hidden="true">☑</span>{t(['为此 LUT 记住设置', 'Remember for this LUT'])}</div>
    </div>
    <div className={styles.footer}><span className={styles.action}>{t(['浏览 LUT', 'Browse LUTs'])}</span><span>{t(['移除', 'Remove'])}</span></div>
  </Frame>;
}

export function LutBakeFlow() {
  const t = useLabels();
  return <Frame title={['LUT 编码与烘焙', 'LUT Encoding & Baking']}>
    <div className={styles.bake}>
      <strong>{t(['准备 LUT（更换 LUT 或编码时）', 'Prepare LUT (when the LUT or encodings change)'])}</strong>
      <ol>{([
        ['生成 ACEScc / AP1 采样网格', 'Generate an ACEScc / AP1 sample grid'],
        ['将网格点转换到所选输入编码', 'Convert grid points to the selected input encoding'],
        ['用网格点采样原始 LUT', 'Sample the original LUT at those grid points'],
        ['将采样结果从所选输出编码转换回 ACEScc / AP1', 'Convert samples from the selected output encoding back to ACEScc / AP1'],
        ['烘焙并缓存合成 LUT', 'Bake and cache the composite LUT'],
      ] as Text[]).map(step=><li key={step[1]}>{t(step)}</li>)}</ol>
      <strong>{t(['处理照片', 'Process the photograph'])}</strong>
      <p>{t(['调色管线中的图像 → 采样合成 LUT → 按强度混合 → 后续调色', 'Image in the grading pipeline → sample the composite LUT → mix by strength → subsequent grading'])}</p>
    </div>
  </Frame>;
}

const transferNodes: {name: Text; sections: {name: Text; items: Text[]}[]}[] = [
  {name: ['RAW 与几何', 'RAW & Geometry'], sections: [{name: ['RAW', 'RAW'], items: [['去马赛克方法', 'Demosaic method'], ['相机白平衡', 'Camera white balance']]}, {name: ['几何', 'Geometry'], items: [['裁剪与旋转', 'Crop & rotation']]}]},
  {name: ['基础显影', 'Develop'], sections: [{name: ['色调', 'Tone'], items: [['曝光', 'Exposure'], ['对比度', 'Contrast'], ['高光', 'Highlights']]}, {name: ['外观', 'Look'], items: [['白平衡', 'White balance'], ['饱和度', 'Saturation']]}]},
  {name: ['主体提亮', 'Subject Lift'], sections: [{name: ['色调', 'Tone'], items: [['曝光', 'Exposure'], ['阴影', 'Shadows']]}, {name: ['蒙版', 'Masks'], items: [['此节点的全部蒙版', 'All masks in this node']]}]},
  {name: ['显示变换', 'Display Transform'], sections: [{name: ['显示变换', 'Display Transform'], items: [['显示变换设置', 'Display transform settings']]}]},
];

// AdjustmentTransferDialog.qml: Copy = 3 panes; Paste = read-only 2 panes.
export function TransferDemo() {
  const t = useLabels();
  const [mode, setMode] = useState<'copy'|'paste'>('copy');
  const [version, setVersion] = useState(0);
  const [node, setNode] = useState(1);
  const [checked, setChecked] = useState<string[]>(['1-0-0', '2-0-0', '2-1-0']);
  const keysFor = (n: number) => transferNodes[n].sections.flatMap((s, i) => s.items.map((_, j)=>`${n}-${i}-${j}`));
  const allKeys = transferNodes.flatMap((_, n)=>keysFor(n));
  const setKeys = (keys: string[], on: boolean) => setChecked(prev=>on ? [...new Set([...prev,...keys])] : prev.filter(k=>!keys.includes(k)));
  const includedNodes = transferNodes.map((_, i)=>i).filter(i=>mode==='copy'||keysFor(i).some(k=>checked.includes(k)));
  const changeMode = (next: 'copy'|'paste') => {setMode(next); if(next==='paste' && !includedNodes.includes(node))setNode(1);};
  return <Frame title={['选择性复制与粘贴', 'Selective Copy & Paste']}>
    <div className={styles.demoTabs} aria-label={t(['示例模式', 'Example mode'])}>
      <button type="button" aria-pressed={mode==='copy'} onClick={()=>changeMode('copy')}>{t(['复制界面', 'Copy view'])}</button>
      <button type="button" aria-pressed={mode==='paste'} disabled={!checked.length} onClick={()=>{setMode('paste');setNode(transferNodes.findIndex((_,i)=>keysFor(i).some(k=>checked.includes(k))));}}>{t(['粘贴界面', 'Paste view'])}</button>
    </div>
    <div className={styles.dialogHeading}><strong>{t(mode==='copy'?['复制调整', 'Copy Adjustments']:['粘贴调整', 'Paste Adjustments'])}</strong><span>DSC_0001.NEF <span aria-hidden="true">×</span></span></div>
    <div className={`${styles.transfer} ${mode==='paste'?styles.twoPanes:''}`}>
      {mode==='copy'&&<section><h4>{t(['来源版本', 'Source Versions'])}</h4>{([['暖调胶片', 'Warm Film'], ['黑白', 'Black & White']] as Text[]).map((label,i)=><button type="button" className={styles.listButton} aria-pressed={version===i} key={i} onClick={()=>setVersion(i)}>{t(label)}{i===0&&<small>{t(['当前', 'Active'])}</small>}</button>)}</section>}
      <section><h4>{t(['节点', 'Nodes'])}</h4>
        {mode==='copy'&&<div className={styles.bulk}><label><input type="checkbox" checked={allKeys.every(k=>checked.includes(k))} onChange={e=>setKeys(allKeys,e.target.checked)} />{t(['全选', 'Select All'])}</label><button type="button" onClick={()=>setChecked([])}>{t(['清除', 'Clear'])}</button></div>}
        {includedNodes.map(i=><div className={styles.nodeRow} key={i}>
          {mode==='copy'&&<input type="checkbox" aria-label={`${t(['选择节点全部参数：', 'Select all items in '])}${t(transferNodes[i].name)}`} checked={keysFor(i).every(k=>checked.includes(k))} ref={el=>{if(el)el.indeterminate=keysFor(i).some(k=>checked.includes(k))&&!keysFor(i).every(k=>checked.includes(k));}} onChange={e=>setKeys(keysFor(i),e.target.checked)} />}
          <button type="button" className={styles.listButton} aria-pressed={node===i} onClick={()=>setNode(i)}>{t(transferNodes[i].name)}</button>
        </div>)}
      </section>
      <section><h4>{t(transferNodes[node].name)}</h4>
        {mode==='copy'&&<div className={styles.bulk}><label><input type="checkbox" checked={keysFor(node).every(k=>checked.includes(k))} onChange={e=>setKeys(keysFor(node),e.target.checked)} />{t(['全选', 'Select All'])}</label><button type="button" onClick={()=>setKeys(keysFor(node),false)}>{t(['清除', 'Clear'])}</button></div>}
        {transferNodes[node].sections.map((section,i)=><div key={i} className={styles.itemSection}><strong>{t(section.name)}</strong>{section.items.map((label,j)=>{
          const key=`${node}-${i}-${j}`;
          return mode==='paste'&&!checked.includes(key)?null:<label key={key}>{mode==='copy'&&<input type="checkbox" checked={checked.includes(key)} onChange={e=>setKeys([key],e.target.checked)} />}{t(label)}</label>;
        })}</div>)}
      </section>
    </div>
    <div className={styles.footer}><span>{t(['取消', 'Cancel'])}</span><span className={styles.action}>{t(mode==='copy'?['复制调整', 'Copy Adjustments']:['粘贴调整', 'Paste Adjustments'])}</span></div>
    <p className={styles.explanation} aria-live="polite">{t(mode==='copy'
      ? ['先选来源版本，再选节点；点节点名称查看参数，勾选框决定复制范围。蒙版按节点整体选择。', 'Choose a source version, then a node. Clicking a node name shows its items; checkboxes set what to copy. Masks are selected as one set per node.']
      : ['粘贴页只读展示已复制的节点和参数；更改范围需要回到复制页。此示例不会修改项目。', 'Paste shows the copied nodes and items read-only. Return to Copy to change the selection. This example does not modify a project.'])}</p>
  </Frame>;
}

type Field = 'date'|'camera'|'rating'|'lens';
const fields: {key: Field; title: Text}[] = [
  {key:'date',title:['按拍摄日期', 'By Capture Date']}, {key:'camera',title:['按相机型号', 'By Camera Model']},
  {key:'rating',title:['按星级', 'By Rating']}, {key:'lens',title:['按镜头', 'By Lens']},
];
const photos = [
  {id:'DSC_0001.NEF',date:'2026-06-07',camera:'Nikon Z8',rating:5,lens:'35 mm'},
  {id:'DSC_0002.NEF',date:'2026-06-07',camera:'Nikon Z8',rating:4,lens:'50 mm'},
  {id:'DSC_0003.ARW',date:'2026-06-08',camera:'Sony A1',rating:5,lens:'35 mm'},
  {id:'DSC_0004.ARW',date:'2026-06-08',camera:'Sony A1',rating:3,lens:'50 mm'},
];

// AlbumInspectorPanel + InspectorFieldActions + StarRatingFilter.
export function LibraryInspectorDemo({compact=false}: {compact?: boolean}) {
  const t = useLabels();
  const [filters, setFilters] = useState<Partial<Record<Field,string>>>({});
  const [sort, setSort] = useState<{field:Field; descending:boolean}|null>(null);
  const [group, setGroup] = useState<Field|null>(null);
  const [folded, setFolded] = useState<Field[]>([]);
  const [yearOpen, setYearOpen] = useState(true);
  const [search, setSearch] = useState<Partial<Record<Field,string>>>({});
  const toggleFilter = (key:Field,value:string) => setFilters(prev=>({...prev,[key]:prev[key]===value?undefined:value}));
  const toggleSort = (field:Field,descending:boolean) => setSort(prev=>prev?.field===field&&prev.descending===descending?null:{field,descending});
  const result = photos.filter(photo=>fields.every(({key})=>!filters[key]||String(photo[key])===filters[key]));
  result.sort((a,b)=>{
    if(group&&a[group]!==b[group])return a[group]<b[group]?-1:1;
    if(sort&&a[sort.field]!==b[sort.field])return (a[sort.field]<b[sort.field]?-1:1)*(sort.descending?-1:1);
    return a.id.localeCompare(b.id);
  });
  const inspector = <div className={`${styles.inspector} ${compact?styles.compact:''}`}>
    <div className={styles.overview}><small>{t(['图库概览', 'Library Overview'])}</small><span>{t(['照片总数', 'Total Photos'])}<b>4</b></span></div>
    {fields.map(({key,title})=><section className={styles.filterSection} key={key}>
      <div className={styles.fieldHeader}><button type="button" className={styles.fieldTitle} aria-expanded={!folded.includes(key)} onClick={()=>setFolded(prev=>prev.includes(key)?prev.filter(v=>v!==key):[...prev,key])}><span aria-hidden="true">{folded.includes(key)?'›':'⌄'}</span> {t(title)}</button><div className={styles.fieldActions}>
        <button type="button" title={t(['升序；再次点击取消排序', 'Ascending; click again to clear sorting'])} aria-label={`${t(title)} ${t(['升序', 'ascending'])}`} aria-pressed={sort?.field===key&&!sort.descending} onClick={()=>toggleSort(key,false)}><Icon name="ascending" /></button>
        <button type="button" title={t(['降序；再次点击取消排序', 'Descending; click again to clear sorting'])} aria-label={`${t(title)} ${t(['降序', 'descending'])}`} aria-pressed={sort?.field===key&&sort.descending} onClick={()=>toggleSort(key,true)}><Icon name="descending" /></button>
        <button type="button" title={t(['按此字段分组', 'Group by this field'])} aria-label={`${t(title)} ${t(['分组', 'group'])}`} aria-pressed={group===key} onClick={()=>setGroup(prev=>prev===key?null:key)}><Icon name="group" /></button>
      </div></div>
      {!folded.includes(key)&&<div className={`${styles.filterValues} ${key==='lens'?styles.lensValues:''}`}>
        {key==='date'?<div className={styles.dateTree}>
          <button type="button" className={styles.year} aria-expanded={yearOpen} onClick={()=>setYearOpen(v=>!v)}>{yearOpen?'⌄':'›'} 2026 <small>4</small></button>
          {yearOpen&&<><strong>{t(['六月', 'JUNE'])}</strong><div className={styles.dayTiles}>{['07','08'].map(day=><button type="button" key={day} aria-label={`2026-06-${day}`} aria-pressed={filters.date===`2026-06-${day}`} onClick={()=>toggleFilter('date',`2026-06-${day}`)}><b>{day}</b><small>2</small></button>)}</div></>}
        </div>:key==='rating'?Array.from({length:5},(_,i)=><button type="button" key={i} aria-label={`${i+1} ${t(['星', 'stars'])}`} aria-pressed={filters.rating===String(i+1)} onClick={()=>toggleFilter('rating',String(i+1))}>{Number(filters.rating)>=i+1?'★':'☆'}</button>):<>
          <input type="search" className={styles.searchValues} aria-label={`${t(['搜索 ', 'Search '])}${t(title)}`} placeholder={t(['搜索', 'Search'])} value={search[key]||''} onChange={e=>setSearch(prev=>({...prev,[key]:e.target.value}))} />
          {[...new Set(photos.map(photo=>String(photo[key])))].filter(value=>value.toLowerCase().includes((search[key]||'').toLowerCase())).map(value=><button type="button" key={value} aria-pressed={filters[key]===value} onClick={()=>toggleFilter(key,value)}>{key==='lens'&&<span className={styles.lensDot} aria-hidden="true" />}{value}<small>{photos.filter(p=>String(p[key])===value).length}</small></button>)}
        </>}
      </div>}
    </section>)}
  </div>;
  if(compact)return inspector;
  return <Frame title={['图库 · 相册检查器', 'Library · Album Inspector']}>
    <div className={styles.libraryDemo}>{inspector}<aside className={styles.libraryResults}>
        <strong>{t(['试用字段标题旁的排序与分组按钮', 'Try the sort and group buttons beside each field heading'])}</strong>
      <p>{t(['点击日期、设备或星级筛选；↑ / ↓ 排序；⊞ 按该字段分组。再次点击选中项可取消。', 'Click a date, device, or star to filter. ↑ / ↓ sort; ⊞ groups by that field. Click an active control again to clear it.'])}</p>
      <div aria-live="polite"><p>{t(['当前结果：', 'Results: '])}{result.length} / 4</p>
        {result.map((photo,i)=><div key={photo.id}>{group&&(i===0||result[i-1][group]!==photo[group])&&<h4 className={styles.resultGroup}>{photo[group]}</h4>}<div className={styles.photoResult}><b>{photo.id}</b><small>{photo.date} · {photo.camera} · {photo.rating} ★ · {photo.lens}</small></div></div>)}
        {!result.length&&<p>{t(['没有符合条件的示例照片。', 'No example photos match these filters.'])}</p>}
      </div>
    </aside></div>
  </Frame>;
}

// EditorMaskGroupsPanel + EditorMaskGroupDelegate + EditorMaskGroupMaskRow.
// Only exposure is simulated. Coverage uses the documented empty/all-disabled
// semantics in GradeMaskCoverage; output mixing follows the grade mix.
export function MaskGroupsDemo() {
  const t = useLabels();
  const id = useId();
  const [selected, setSelected] = useState(1);
  const [expanded, setExpanded] = useState([true,true,true]);
  const [locked, setLocked] = useState([true,false,false]);
  const [ev, setEv] = useState([0.2,0.7,-0.1]);
  const [hasMask, setHasMask] = useState(true);
  const [maskEnabled, setMaskEnabled] = useState(true);
  const [inverted, setInverted] = useState(false);
  const [opacity, setOpacity] = useState(80);
  const names: Text[] = [['基础显影', 'Develop'], ['主体提亮', 'Subject Lift'], ['整体收尾', 'Final Grade']];
  const coverage = (base:number) => !hasMask?1:!maskEnabled?0:Math.round((inverted?1-base:base)*opacity/100*255)/255;
  const global = ev[0]+ev[2];
  // cuda_primary_grade_pass.cu: Exposure adds EV / CE_ACESCC_B;
  // MixGradePixel blends in the same ACEScc domain with an R8 coverage weight.
  const effective = (base:number) => global+coverage(base)*ev[1];
  const signed = (value:number) => `${value>=0?'+':''}${value.toFixed(2)} EV`;
  return <Frame title={['图层与蒙版组 · 交互示例', 'Layers & Mask Groups · Interactive Example']}>
    <div className={styles.maskDemo}>
      <div className={styles.groups}><div className={styles.sectionTitle}><strong>{t(['蒙版组', 'Mask Groups'])}</strong><span aria-hidden="true">＋</span></div>
        {names.map((name,i)=><section key={i} className={`${styles.group} ${selected===i?styles.selectedGroup:''}`}>
          <div className={styles.groupHeader}>
            <button type="button" aria-label={`${t(expanded[i]?['折叠 ', 'Collapse ']:['展开 ', 'Expand '])}${t(name)}`} aria-expanded={expanded[i]} onClick={()=>setExpanded(prev=>prev.map((v,j)=>j===i?!v:v))}>{expanded[i]?'⌄':'›'}</button>
            <span className={styles.thumbSlot}>{i===1&&hasMask&&<span className={`${styles.maskThumb} ${inverted?styles.invertedThumb:''}`} />}</span>
            <button type="button" className={styles.groupName} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{t(name)}</button>
            <button type="button" aria-pressed={locked[i]} aria-label={`${t(['锁定删除：', 'Lock against deletion: '])}${t(name)}`} onClick={()=>setLocked(prev=>prev.map((v,j)=>j===i?!v:v))}><Icon name={locked[i]?'lock':'unlock'} /></button>
            <span className={styles.disabledIcon} title={t(['示例固定保留三个图层', 'The example keeps three layers'])} aria-hidden="true"><Icon name="trash" /></span>
          </div>
          {expanded[i]&&(i===1&&hasMask?<div className={styles.maskRow}>
            <span className={`${styles.maskThumb} ${inverted?styles.invertedThumb:''}`} />
            <button type="button" className={styles.groupName} onClick={()=>setSelected(1)}>{t(['径向', 'Radial'])}<small>{!maskEnabled?t(['关闭 · ', 'Off · ']):''}{opacity}% {t(['不透明度', 'opacity'])}{inverted?` · ${t(['已反相', 'Inverted'])}`:''}</small></button>
            <button type="button" aria-label={t(['反相径向蒙版', 'Invert radial mask'])} aria-pressed={inverted} onClick={()=>setInverted(v=>!v)}><Icon name="invert" /></button>
            <button type="button" aria-label={t(['删除径向蒙版', 'Delete radial mask'])} onClick={()=>setHasMask(false)}><Icon name="trash" /></button>
          </div>:<p className={styles.noMasks}>{t(['无蒙版', 'No masks'])}</p>)}
        </section>)}
      </div>
      <div className={styles.maskContext}>
        <strong>{t(names[selected])} · {t(['色调', 'Tone'])}</strong>
        <label className={styles.rangeLabel} htmlFor={`${id}-ev`}>{t(['曝光', 'Exposure'])}<output>{signed(ev[selected])}</output></label>
        <input id={`${id}-ev`} type="range" min="-1" max="1" step="0.1" value={ev[selected]} onChange={e=>setEv(prev=>prev.map((v,i)=>i===selected?Number(e.target.value):v))} />
        {selected===1&&(hasMask?<fieldset><legend>{t(['蒙版 · 径向', 'Mask · Radial'])}</legend>
          <label><input type="checkbox" checked={maskEnabled} onChange={e=>setMaskEnabled(e.target.checked)} />{t(['启用', 'Enabled'])}</label>
          <label><input type="checkbox" checked={inverted} onChange={e=>setInverted(e.target.checked)} />{t(['反相', 'Invert'])}</label>
          <label className={styles.rangeLabel} htmlFor={`${id}-opacity`}>{t(['不透明度', 'Opacity'])}<output>{opacity}%</output></label>
          <input id={`${id}-opacity`} type="range" min="0" max="100" value={opacity} onChange={e=>setOpacity(Number(e.target.value))} />
        </fieldset>:<button type="button" className={styles.restore} onClick={()=>setHasMask(true)}>{t(['恢复示例径向蒙版', 'Restore the example radial mask'])}</button>)}
        <p className={styles.hint}>{t(['锁定只防止删除图层，不锁定曝光调整。', 'The lock prevents deleting the layer; it does not lock exposure edits.'])}</p>
    <aside className={styles.effect} aria-live="polite">
      <strong>{t(['当前组合会发生什么', 'What this combination does'])}</strong>
      <p>{t(['基础显影与整体收尾作用于全图，合计 ', 'Develop and Final Grade affect the whole image, totaling '])}{signed(global)}{t(['。中间图层在 ACEScc 域按蒙版权重混合曝光偏移；本例的局部曝光增量为该图层 EV × 权重。', '. The middle layer mixes its exposure offset in ACEScc using the mask weight. In this example, the local EV contribution is the layer EV × coverage.'])}</p>
      <div className={styles.probes}>{([['中心', 'Center'], ['羽化中点', 'Feather midpoint'], ['外部', 'Outside']] as Text[]).map((label,i)=><div key={i}><span>{t(label)}</span><strong>{signed(effective([1,0.5,0][i]))}</strong><small>{t(['蒙版权重 ', 'Mask weight '])}{Math.round(coverage([1,0.5,0][i])*100)}%</small></div>)}</div>
      <p>{t(!hasMask?['删除唯一蒙版后，蒙版列表为空，中间图层恢复全图作用。', 'Deleting the only mask leaves an empty mask list, so the middle layer affects the whole image.']:!maskEnabled?['蒙版仍在但已关闭，当前唯一蒙版不贡献覆盖，中间图层不影响画面。', 'The mask still exists but is disabled. With no enabled mask, the middle layer contributes no effect.']:inverted?['反相后，原选区外受到调整，中心不受此蒙版影响。', 'After inversion, the area outside the original selection is adjusted; its center is unaffected by this mask.']:['中间图层只影响径向蒙版覆盖范围，羽化区域逐渐减弱。', 'The middle layer affects the radial coverage, with a gradual transition through the feathered area.'])}</p>
      <small>{t(['此示例只计算曝光与蒙版混合；三个取样点不模拟完整照片渲染或显示变换。图层按列表顺序处理，蒙版不限制其他图层。', 'This example calculates exposure and mask mixing only. The three probes do not simulate a full photo render or display transform. Layers process in list order; the mask does not restrict the other layers.'])}</small>
    </aside>
      </div>
    </div>
  </Frame>;
}
