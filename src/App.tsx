import type { ReactElement } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Message, Modal, Tooltip } from '@tod-m/materials/ve-o';
import { Button, Drawer, Dropdown, Menu, Popover, Table, Tag } from '@arco-design/web-react';
import cloudLogo from '../.figma/image/msmz526r-0ev01jt.svg';
import searchCloseIcon from '../.figma/image/msmz526r-5jix9xc.svg';
import notificationIcon from '../.figma/image/msmz526r-8ymj99i.svg';
import menuIcon from '../.figma/image/msmz526r-ddh0xsv.svg';
import searchIcon from '../.figma/image/msmz526r-r8faxcm.svg';
import downIcon from '../.figma/image/msmz526r-xrbkcj9.svg';
import avatarImage from '../.figma/image/msmz526t-gcuwnyd.png';
import changeDownIcon from '../.figma/image/msmz8zhy-0r7781g.svg';
import usTtpIcon from '../.figma/image/msmz8zhy-1ivzxqp.svg';
import cnRegionIcon from '../.figma/image/msmz8zhy-42eo4mw.svg';
import boeIcon from '../.figma/image/msmz8zhy-v8kna4d.svg';
import i18nBdIcon from '../.figma/image/msmz8zhy-49qc6o9.svg';
import i18nTtIcon from '../.figma/image/msmz8zhy-4n9ebzi.svg';
import usTtpBdIcon from '../.figma/image/msmz8zhy-a6w55mo.svg';
import euTtpIcon from '../.figma/image/msmz8zhy-v266vvy.svg';
import moreIcon from '../.figma/image/msmz8zhy-i2fnupy.svg';
import starIcon from '../.figma/image/msmz8zhy-wpdv6pf.svg';
import globalViewIcon from '../.figma/image/msmz8zi2-q6rbk5z.png';
import refreshIcon from '../.figma/image/msmzf1lg-wsgpjpo.svg';
import configDeployIcon from '../.figma/image/msn0hwx8-1nuqtc7.svg';
import availabilityIcon from '../.figma/image/msn0hwx8-6njanzc.svg';
import infoIcon from '../.figma/image/msn0hwx8-7dj880f.svg';
import editIcon from '../.figma/image/msn0hwx8-ufnp18x.svg';
import databaseTypeIcon from '../.figma/image/msn0hwx8-w6aho7f.svg';
import sidebarDividerIcon from '../.figma/image/msn809g5-1f8iip1.svg';
import sidebarFoldIcon from '../.figma/image/msn809g5-edg0sv1.svg';
import { simpleSiteGroups, siteGroups, type SiteGroup } from './siteVregionDataset';

const schemes = ['最终方案', '方案一', '方案二', '方案三', '方案四', '方案五', '方案六'];
const dataModes = ['复杂数据', '简单数据'] as const;
const sidebarModes = ['无侧边栏', '有侧边栏'] as const;
const FINAL_SCHEME_INTERACTIONS_DOC_URL =
  'https://github.com/hyin9412/global-view-viewswitch/blob/main/docs/final_scheme_interactions.md';
const VREGION_TAB_GAP = 16;
const SCHEME_FOUR_MAX_VISIBLE_VREGIONS_WITH_SIDEBAR = 6;
const SCHEME_FOUR_MAX_VISIBLE_VREGIONS_WITHOUT_SIDEBAR = 7;
const SCHEME_FOUR_TAB_GAP = 8;
const FINAL_SCHEME_RESPONSIVE_PINNED_VREGIONS = [
  { minWidth: 1920, withSidebar: 8, withoutSidebar: 9 },
  { minWidth: 1440, withSidebar: 6, withoutSidebar: 7 },
  { minWidth: 0, withSidebar: 5, withoutSidebar: 6 },
] as const;
const DEFAULT_PSM_NAME = 'cp_govern';
const AGGREGATED_PSMS = [
  {
    name: DEFAULT_PSM_NAME,
    vregions: [
      'China-East',
      'China-Enterprise',
      'China-HKPay',
      'China-North',
      'China-North6',
      'China-Pay',
      'China-Pay2',
      'Asia-CIS',
      'Asia-SaaS',
      'Asia-SouthEastBD',
      'Australia-SouthEastBD',
    ],
  },
  {
    name: 'toutiao.mysql.cp_govern_read',
    vregions: ['Europe-WestBD', 'Singapore-SaaS', 'US-Compliance', 'US-EE', 'US-EastBD', 'US-TTP3', 'US-TTP4', 'US-WestBD', 'Europe-CentralBD'],
  },
] as const;
const AGGREGATED_PSM_COUNT = AGGREGATED_PSMS.length;
const VREGION_TO_PSM = new Map<string, string>(
  AGGREGATED_PSMS.flatMap((item) => item.vregions.map((vregion) => [vregion, item.name] as const)),
);
const primaryNavItems = ['首页', '集群列表', 'Topic', 'Consumer group', 'Mirror', 'Databus', 'GlobalBMQ', '个人工单'] as const;

const featureTabs = [
  '总览',
  '连接管理',
  '监控与报警',
  'SQL 查询器',
  '慢日志分析',
  '一键诊断',
  '实时分析',
  '数据归档',
  '备份管理',
  '参数管理',
  '授权管理',
  '指纹平台',
];

const nodeRows = [
  ['10.225.45.18', '3306', '0.35', '1238.32', '10.33', '-', '-', '-'],
  ['10.225.46.91', '3306 / 3307', '0.33', '0.57', '1322.74', '1.67', 'Yes', 'Yes'],
  ['10.225.48.26', '3306 / 3307', '0.33', '0.58', '1328.53', '1.33', 'Yes', 'Yes'],
  ['10.225.49.12', '3306 / 3307', '0.33', '0.35', '846.48', '1', 'Yes', 'Yes'],
  ['10.225.51.40', '3306 / 3307', '0.33', '0.42', '849.35', '1.56', 'Yes', 'Yes'],
  ['10.225.52.17', '3306 / 3307', '0.33', '0.36', '333.13', '1.11', 'Yes', 'Yes'],
  ['10.225.54.88', '3306 / 3307', '0.33', '0.37', '334.94', '1', 'Yes', 'Yes'],
  ['10.225.57.63', '3306 / 3307', '0.33', '0.48', '988.86', '1.67', 'Yes', 'Yes'],
  ['10.225.59.24', '3306 / 3307', '0.33', '0.51', '975.14', '1.33', 'Yes', 'Yes'],
];

const siteIconMap = {
  全球视图: globalViewIcon,
  CN: cnRegionIcon,
  BOE: boeIcon,
  'I18N-BD': i18nBdIcon,
  'I18N-TT': i18nTtIcon,
  'US-TTP': usTtpIcon,
  'US-TTPBD': usTtpBdIcon,
  'EU-TTP': euTtpIcon,
} as const;

type GlobalGroup = SiteGroup & {
  icon: string;
};

type VregionItem = GlobalGroup['vregions'][number];
type FlatVregionTab = {
  group: GlobalGroup;
  item: VregionItem;
  key: string;
};
type EditViewPsmRow = {
  key: string;
  psm: string;
  siteLabels: string[];
  vregions: string[];
  vdcCount: number;
  vdcDetails: Array<{
    vregion: string;
    vdcs: string[];
  }>;
};

function buildGlobalGroups(groups: SiteGroup[]): GlobalGroup[] {
  return groups.map((group) => ({
    ...group,
    icon: siteIconMap[group.label as keyof typeof siteIconMap] ?? globalViewIcon,
  }));
}

const siteTagMap: Partial<Record<string, string>> = {
  CN: '中国站',
  BOE: 'BOE',
  'I18N-BD': '国际站',
  'I18N-TT': 'TT 国际站',
  'US-TTP': 'TT 美国合规站',
  'EU-TTP': 'TT 欧洲合规站',
};

export default function App() {
  const [activeScheme, setActiveScheme] = useState(schemes[0]);
  const [activeDataMode, setActiveDataMode] = useState<(typeof dataModes)[number]>(dataModes[0]);
  const [activeSidebarMode, setActiveSidebarMode] = useState<(typeof sidebarModes)[number]>(sidebarModes[0]);
  const [isFinalArchiveVisible, setFinalArchiveVisible] = useState(false);
  const [previewWidth, setPreviewWidth] = useState(1440);
  const handleSchemeChange = (scheme: string) => {
    setActiveScheme(scheme);

    if (scheme !== '最终方案') {
      setFinalArchiveVisible(false);
    }
  };
  const globalGroups = useMemo(
    () => buildGlobalGroups(activeDataMode === '复杂数据' ? siteGroups : simpleSiteGroups),
    [activeDataMode],
  );

  return (
    <main className="page">
      <section className="panel">
        <div className="top-selectors">
          <div className="settings-panel" aria-label="配置内容">
            <div className="settings-panel-title">配置内容</div>

            <div className="settings-panel-body">
              <div className="settings-field">
                <span className="settings-field-label">方案</span>
                <label className="scheme-select-field">
                  <select value={activeScheme} onChange={(event) => handleSchemeChange(event.target.value)}>
                    {schemes.map((scheme) => (
                      <option key={scheme} value={scheme}>
                        {scheme}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="settings-field">
                <span className="settings-field-label">数据</span>
                <div className="pipe-tabs" aria-label="数据选择器">
                  {dataModes.map((mode, index) => (
                    <div className="pipe-tab-item" key={mode}>
                      <button
                        className={`pipe-tab-button ${activeDataMode === mode ? 'active' : ''}`}
                        type="button"
                        onClick={() => setActiveDataMode(mode)}
                      >
                        {mode}
                      </button>
                      {index < dataModes.length - 1 ? <span className="pipe-tab-divider">|</span> : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="settings-field">
                <span className="settings-field-label">侧边栏</span>
                <div className="pipe-tabs" aria-label="侧边栏选择器">
                  {sidebarModes.map((mode, index) => (
                    <div className="pipe-tab-item" key={mode}>
                      <button
                        className={`pipe-tab-button ${activeSidebarMode === mode ? 'active' : ''}`}
                        type="button"
                        onClick={() => setActiveSidebarMode(mode)}
                      >
                        {mode}
                      </button>
                      {index < sidebarModes.length - 1 ? <span className="pipe-tab-divider">|</span> : null}
                    </div>
                  ))}
                </div>
              </div>

              {activeScheme === '最终方案' ? (
                <div className="settings-field">
                  <span className="settings-field-label">视图</span>
                  <button className="final-scheme-archive-entry" type="button" onClick={() => setFinalArchiveVisible(true)}>
                    展示编辑视图archive
                  </button>
                </div>
              ) : null}

              <div className="settings-field">
                <span className="settings-field-label">交互说明</span>
                <a
                  className="final-scheme-archive-entry"
                  href={FINAL_SCHEME_INTERACTIONS_DOC_URL}
                  rel="noreferrer"
                  target="_blank"
                >
                  查看 markdown 文件
                </a>
              </div>

              <div className="settings-field settings-field-width">
                <label className="preview-width-selector" aria-label="屏幕宽度设置">
                  <span className="preview-width-label">屏幕宽度</span>
                  <div className="preview-width-slider-wrap">
                    <span className="preview-width-boundary">1280</span>
                    <input
                      max={1920}
                      min={1280}
                      step={1}
                      type="range"
                      value={previewWidth}
                      onChange={(event) => setPreviewWidth(Number(event.target.value))}
                    />
                    <span className="preview-width-boundary">1920</span>
                  </div>
                  <div className="preview-width-value">{previewWidth}px</div>
                  <div className="preview-width-value-mobile">{previewWidth}px</div>
                  <div className="preview-width-slider-mobile">
                    <input
                      max={1920}
                      min={1280}
                      step={1}
                      type="range"
                      value={previewWidth}
                      onChange={(event) => setPreviewWidth(Number(event.target.value))}
                    />
                  </div>
                </label>
              </div>
            </div>
        </div>
        </div>

        <div className="scheme-preview-stage">
          <div className="scheme-preview-frame" style={{ width: previewWidth }}>
            {activeScheme === '最终方案' ? (
              <SchemeFinal
                archiveVisible={isFinalArchiveVisible}
                groups={globalGroups}
                hasSidebar={activeSidebarMode === '有侧边栏'}
                isSimpleDataMode={activeDataMode === '简单数据'}
                previewWidth={previewWidth}
                onCloseArchive={() => setFinalArchiveVisible(false)}
              />
            ) : null}
            {activeScheme === '方案一' ? <SchemeOne groups={globalGroups} hasSidebar={activeSidebarMode === '有侧边栏'} /> : null}
            {activeScheme === '方案二' ? <SchemeTwo groups={globalGroups} hasSidebar={activeSidebarMode === '有侧边栏'} /> : null}
            {activeScheme === '方案三' ? <SchemeThree groups={globalGroups} hasSidebar={activeSidebarMode === '有侧边栏'} /> : null}
            {activeScheme === '方案四' ? <SchemeFour groups={globalGroups} hasSidebar={activeSidebarMode === '有侧边栏'} /> : null}
            {activeScheme === '方案五' ? <SchemeFive groups={globalGroups} hasSidebar={activeSidebarMode === '有侧边栏'} /> : null}
            {activeScheme === '方案六' ? <SchemeSix groups={globalGroups} hasSidebar={activeSidebarMode === '有侧边栏'} /> : null}
          </div>
        </div>
      </section>
    </main>
  );
}

function SchemeFinal({
  groups,
  hasSidebar,
  archiveVisible,
  isSimpleDataMode,
  previewWidth,
  onCloseArchive,
}: {
  groups: GlobalGroup[];
  hasSidebar: boolean;
  archiveVisible: boolean;
  isSimpleDataMode: boolean;
  previewWidth: number;
  onCloseArchive: () => void;
}) {
  const defaultActiveGroupLabel = groups.find((group) => group.label === 'CN')?.label ?? groups[0]?.label ?? '';
  const defaultActiveSelection = getDefaultGroupSelection(getGroupByLabel(groups, defaultActiveGroupLabel));
  const [resourceName, setResourceName] = useState(() =>
    getPsmNameBySelection(defaultActiveGroupLabel, defaultActiveSelection),
  );
  const [messageApi, messageHolder] = Message.useMessage();

  useEffect(() => {
    setResourceName(getPsmNameBySelection(defaultActiveGroupLabel, defaultActiveSelection));
  }, [defaultActiveGroupLabel, defaultActiveSelection.vdc, defaultActiveSelection.vregion, groups]);

  const handleResourceNameChange = useCallback((nextResourceName: string) => {
    setResourceName(nextResourceName);
  }, []);

  const handleResponsivePinnedMessage = useCallback(
    (maxPinnedVregions: number) => {
      messageApi.info?.({
        content: `当前屏宽下仅展示前 ${maxPinnedVregions} 个常驻项`,
        duration: 3000,
        position: 'top',
        showIcon: true,
      });
    },
    [messageApi],
  );

  return (
    <RdsPage
      hasSidebar={hasSidebar}
      overlayHolder={messageHolder}
      resourceName={resourceName}
      viewFrame={
        <FinalSchemeGlobalViewFrame
          archiveVisible={archiveVisible}
          groups={groups}
          hasSidebar={hasSidebar}
          isSimpleDataMode={isSimpleDataMode}
          onResponsivePinnedMessage={handleResponsivePinnedMessage}
          previewWidth={previewWidth}
          onCloseArchive={onCloseArchive}
          onResourceNameChange={handleResourceNameChange}
        />
      }
    />
  );
}

function SchemeOne({ groups, hasSidebar }: { groups: GlobalGroup[]; hasSidebar: boolean }) {
  return <RdsPage hasSidebar={hasSidebar} viewFrame={<SchemeOneGlobalViewFrame groups={groups} />} />;
}

function SchemeTwo({ groups, hasSidebar }: { groups: GlobalGroup[]; hasSidebar: boolean }) {
  return <RdsPage hasSidebar={hasSidebar} viewFrame={<SchemeTwoGlobalViewFrame groups={groups} />} />;
}

function SchemeThree({ groups, hasSidebar }: { groups: GlobalGroup[]; hasSidebar: boolean }) {
  return <RdsPage hasSidebar={hasSidebar} viewFrame={<SchemeThreeGlobalViewFrame groups={groups} />} />;
}

function SchemeFour({ groups, hasSidebar }: { groups: GlobalGroup[]; hasSidebar: boolean }) {
  return <RdsPage hasSidebar={hasSidebar} viewFrame={<SchemeFourGlobalViewFrame groups={groups} hasSidebar={hasSidebar} />} />;
}

function SchemeFive({ groups, hasSidebar }: { groups: GlobalGroup[]; hasSidebar: boolean }) {
  return <RdsPage hasSidebar={hasSidebar} viewFrame={<SchemeFiveGlobalViewFrame groups={groups} />} />;
}

function SchemeSix({ groups, hasSidebar }: { groups: GlobalGroup[]; hasSidebar: boolean }) {
  return <RdsPage hasSidebar={hasSidebar} viewFrame={<SchemeSixGlobalViewFrame groups={groups} />} />;
}

function PrimarySidebar() {
  return (
    <aside className="primary-sidebar" aria-label="一级导航">
      <div className="primary-sidebar-nav">
        {primaryNavItems.map((item) => (
          <button className={`primary-sidebar-item ${item === 'Topic' ? 'selected' : ''}`} key={item} type="button">
            {item}
          </button>
        ))}
      </div>
      <div className="primary-sidebar-footer">
        <img className="primary-sidebar-divider" src={sidebarDividerIcon} alt="" />
        <button className="primary-sidebar-fold" type="button" aria-label="收起导航">
          <img src={sidebarFoldIcon} alt="" />
        </button>
      </div>
    </aside>
  );
}

function RdsPage({
  viewFrame,
  hasSidebar,
  overlayHolder,
  resourceName = DEFAULT_PSM_NAME,
}: {
  viewFrame: ReactElement;
  hasSidebar: boolean;
  overlayHolder?: ReactElement;
  resourceName?: string;
}) {
  return (
    <section className="bytecloud-page">
      <header className="cloud-topbar">
        <div className="nav-left">
          <img src={menuIcon} className="nav-menu" alt="" />
          <div className="nav-product">
            <img src={cloudLogo} className="cloud-logo" alt="" />
            <div className="product-block">
              <span className="product-divider" />
              <span className="product-title">关系型数据库RDS</span>
              <span className="online-badge">Online</span>
            </div>
          </div>
        </div>

        <div className="nav-right">
          <div className="cloud-search">
            <div className="search-copy">
              <img src={searchIcon} alt="" />
              <span>⌘ + K搜索平台/PSM/文档等</span>
            </div>
            <img src={searchCloseIcon} alt="" />
          </div>
          <div className="nav-links">
            <span className="nav-select">
              CN
              <img src={downIcon} alt="" />
            </span>
            <span className="nav-link">开放平台</span>
            <span className="nav-select help">
              帮助中心
              <img src={downIcon} alt="" />
            </span>
            <span className="notification-wrap">
              <img src={notificationIcon} alt="" />
            </span>
            <img src={avatarImage} className="avatar" alt="" />
          </div>
        </div>
      </header>

      <div className={`bytecloud-body ${hasSidebar ? 'with-sidebar' : ''}`}>
        {hasSidebar ? <PrimarySidebar /> : null}

        <div className="bytecloud-main">
          {overlayHolder ? <div className="page-inline-message">{overlayHolder}</div> : null}
          <Alert
            action={<a className="notice-link">搬迁计划</a>}
            banner
            className="notice-alert"
            content={
              <span>
                <strong>华北1</strong>
                 2026年无资源交付（全年quota为零），建议不要申请相关资源，可考虑加入华北6搬迁计划。
                华北6 现处于建站迁移阶段，仅向华北6搬迁项目组提供资源，搬迁结束后恢复正常申请。
              </span>
            }
            showIcon
            type="warning"
          />

          {viewFrame}

          <div className="rds-shell">
            <div className="rds-workspace">
              <div className="resource-header">
                <div className="resource-left">
                  <div className="resource-name">{resourceName}</div>
                  <div className="resource-cloud-tag">字节云</div>
                  <div className="resource-level-tag">L3</div>
                </div>
                <button className="resource-refresh" type="button" aria-label="刷新">
                  <img src={refreshIcon} alt="" />
                </button>
              </div>

              <div className="resource-body-container">
                <div className="feature-tabs">
                  {featureTabs.map((tab) => (
                    <button className={tab === '总览' ? 'selected' : ''} key={tab} type="button">
                      {tab}
                    </button>
                  ))}
                </div>

                <OverviewConfigCard />

                <main className="rds-content">
                  <section className="content-main">
                    <div className="link-card">
                      <div className="card-title">
                        <span>同步链路</span>
                        <a>链接</a>
                      </div>
                      <div className="empty-link-state">
                        <div className="chain-dot" />
                        <div className="chain-line" />
                        <div className="chain-dot muted" />
                      </div>
                    </div>

                    <div className="link-card compact">
                      <div className="card-title">
                        <span>订阅链路</span>
                        <button>错误明细</button>
                      </div>
                      <div className="error-tabs">
                        <span className="selected">error</span>
                        <span>request</span>
                        <span>response</span>
                      </div>
                    </div>

                    <div className="topology-card-real">
                      <div className="card-title">
                        <span>拓扑结构 <em>(点击端口可以查看对应的监控)</em></span>
                      </div>
                      <div className="topology-toolbar">
                        <button>拓扑图</button>
                        <button className="selected">节点列表</button>
                        <input value="输入 IP 过滤" readOnly />
                      </div>
                      <div className="topology-stage">
                        <div className="db-node primary">
                          <b>主</b>
                          <span>10.225.45.18</span>
                          <a>: 3306</a>
                        </div>
                        <div className="replica-stack">
                          {nodeRows.slice(1, 5).map((row) => (
                            <div className="db-node" key={row[0]}>
                              <b>从</b>
                              <span>{row[0]}</span>
                              <a>: {row[1].split(' / ')[0]}</a>
                            </div>
                          ))}
                        </div>
                        <div className="connection-line horizontal" />
                        <div className="connection-line vertical" />
                      </div>
                      <table className="node-table">
                        <thead>
                          <tr>
                            <th>节点</th>
                            <th>端口</th>
                            <th>Load</th>
                            <th>QPS</th>
                            <th>Thread Running</th>
                            <th>Delay</th>
                            <th>IO_Thread</th>
                            <th>SQL_Thread</th>
                          </tr>
                        </thead>
                        <tbody>
                          {nodeRows.map((row) => (
                            <tr key={row[0]}>
                              {row.map((cell, index) => (
                                <td key={`${row[0]}-${index}`}>
                                  {index === 1 ? <a>{cell}</a> : cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <aside className="operation-panel">
                    <button>设置可维护时间段</button>
                    <button>修改数据库级别</button>
                    <button disabled>设置容灾等级</button>
                    <a>查看功能说明</a>
                    <div className="operation-card">
                      <div>数据迁移</div>
                      <p>通过 DTS 创建任务，完成数据同步和迁移链路配置。</p>
                      <a>创建任务</a>
                      <a>去DTS查看</a>
                    </div>
                    <div className="operation-card warning">
                      <div>访问生产环境数据库</div>
                      <p>生产环境数据库不支持 IP:PORT 直连，请通过 SDK 进行连接。</p>
                      <button>申请权限</button>
                    </div>
                  </aside>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewConfigCard() {
  return (
    <section className="overview-config-card">
      <InfoSection
        icon={configDeployIcon}
        title="配置和部署"
        rows={[
          [
            { label: '机房', value: '' },
            { label: '规格', value: '-' },
            { label: '磁盘总空间', value: '暂无数据', suffixIcon: infoIcon },
            { label: '部署类型', value: '-' },
            { label: '部署架构', value: '-' },
            { label: '创建时间', value: '-' },
          ],
          [{ label: '可维护时间段', value: '未设置', edit: true }],
        ]}
      />
      <InfoSection
        icon={databaseTypeIcon}
        title="数据库类型"
        rows={[
          [
            { label: '数据库类型', value: '-' },
            { label: '代理版本', value: '1.5.0.3' },
            { label: '共享类型', value: '-' },
            { label: '分片类型', value: '-' },
            { label: '字符集', value: '-' },
          ],
        ]}
      />
      <InfoSection
        icon={availabilityIcon}
        title="可用性"
        rows={[
          [
            { label: '数据库级别', value: 'P0', tag: true, edit: true },
            { label: '容灾等级', value: '-', edit: true },
            { label: '同步方案', value: '-' },
            { label: 'SLA', value: '暂无数据（天）/ 暂无数据（周）', wide: true },
          ],
        ]}
      />
    </section>
  );
}

type InfoItem = {
  label: string;
  value: string;
  suffixIcon?: string;
  edit?: boolean;
  tag?: boolean;
  wide?: boolean;
};

function InfoSection({
  icon,
  title,
  rows,
}: {
  icon: string;
  title: string;
  rows: InfoItem[][];
}) {
  return (
    <div className="overview-info-section">
      <div className="overview-section-title">
        <img src={icon} alt="" />
        <span>{title}</span>
      </div>
      <div className="overview-section-rows">
        {rows.map((row, index) => (
          <div className="overview-info-row" key={`${title}-${index}`}>
            {row.map((item) => (
              <div className={`overview-info-item ${item.wide ? 'wide' : ''}`} key={item.label}>
                <div className="overview-info-label">{item.label}</div>
                <div className="overview-info-value">
                  {item.tag ? <span className="p0-tag">{item.value}</span> : <span>{item.value}</span>}
                  {item.suffixIcon ? <img src={item.suffixIcon} alt="" /> : null}
                  {item.edit ? (
                    <button className="inline-edit" type="button" aria-label={`编辑${item.label}`}>
                      <img src={editIcon} alt="" />
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SchemeOneGlobalViewFrame({ groups }: { groups: GlobalGroup[] }) {
  const defaultActiveGroupLabel = groups.find((group) => group.label === 'CN')?.label ?? groups[0]?.label ?? '';
  const [activeGroup, setActiveGroup] = useState(defaultActiveGroupLabel);
  const [groupSelections, setGroupSelections] = useState<Record<string, GroupSelection>>(() => buildDefaultGroupSelections(groups));

  useEffect(() => {
    setActiveGroup(defaultActiveGroupLabel);
    setGroupSelections(buildDefaultGroupSelections(groups));
  }, [defaultActiveGroupLabel, groups]);

  const activeGroupData = groups.find((group) => group.label === activeGroup) ?? groups[0];
  const activeSelection = groupSelections[activeGroup] ?? getDefaultGroupSelection(activeGroupData);

  return (
    <section className="global-view-frame scheme-one scheme-five">
      <div className="global-view-content">
        <div className="global-view-main">
          <div className="breadcrumb-line">
            <span>关系型数据库RDS列表</span>
            <i />
            <span className="muted">cp_govern 全球视图</span>
          </div>

          <div className="view-detail-row">
            <span className="detail-label">视图详情：</span>
            <div className="detail-token">toutiao.mysql.cp_govern_write</div>
            <div className="detail-value">
              China-East | China-Enterprise | China-HKPay | China-North | China-North6 | China-Pay | US-TTP3 | US-TTP4
            </div>
          </div>

          <div className="global-group-row">
            <div className="global-group-tabs">
              {groups.map((group) => (
                <button
                  className={`global-group-tab ${activeGroup === group.label ? 'selected' : ''}`}
                  key={group.label}
                  type="button"
                  onClick={() => {
                    setActiveGroup(group.label);
                  }}
                >
                  <img src={group.icon} alt="" />
                  <span>{group.label}</span>
                  {group.count ? <em>({group.count})</em> : null}
                </button>
              ))}
            </div>
            <VregionTabs
              selection={activeSelection}
              vregions={activeGroupData.vregions}
              onChange={(nextSelection) => {
                setGroupSelections((currentSelections) => ({
                  ...currentSelections,
                  [activeGroup]: nextSelection,
                }));
              }}
            />
          </div>
        </div>

        <div className="global-frame-actions">
          <button className="square-action" type="button">
            <img src={starIcon} alt="" />
          </button>
          <button className="gray-action" type="button">
            一致性治理
          </button>
          <button className="blue-action" type="button">
            多区域变更
            <img src={changeDownIcon} alt="" />
          </button>
          <button className="square-action" type="button">
            <img src={moreIcon} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
}

function SchemeFiveGlobalViewFrame({ groups }: { groups: GlobalGroup[] }) {
  const globalGroup =
    groups.find((group) => group.label === '全球视图')
    ?? {
      label: '全球视图',
      source: '',
      note: '',
      vregions: [],
      icon: globalViewIcon,
    };
  const siteGroupsOnly = groups.filter((group) => group.label !== '全球视图');
  const defaultActiveGroupLabel = siteGroupsOnly.find((group) => group.label === 'CN')?.label ?? globalGroup.label;
  const [activeGroup, setActiveGroup] = useState(defaultActiveGroupLabel);
  const [groupSelections, setGroupSelections] = useState<Record<string, GroupSelection>>(() => buildDefaultGroupSelections(groups));
  const [isSiteMenuOpen, setIsSiteMenuOpen] = useState(false);

  useEffect(() => {
    setActiveGroup(defaultActiveGroupLabel);
    setGroupSelections(buildDefaultGroupSelections(groups));
    setIsSiteMenuOpen(false);
  }, [defaultActiveGroupLabel, groups]);

  const activeGroupData = getGroupByLabel([globalGroup, ...siteGroupsOnly], activeGroup);
  const activeSelection = groupSelections[activeGroup] ?? getDefaultGroupSelection(activeGroupData);
  const selectedSiteGroup = activeGroup === globalGroup.label ? undefined : activeGroupData;
  const siteTriggerLabel = selectedSiteGroup?.label ?? '所有 Site';
  const siteTriggerIcon = selectedSiteGroup?.icon ?? siteGroupsOnly[0]?.icon ?? globalViewIcon;

  return (
    <section className="global-view-frame scheme-one">
      <div className="global-view-content">
        <div className="global-view-main">
          <div className="breadcrumb-line">
            <span>关系型数据库RDS列表</span>
            <i />
            <span className="muted">cp_govern 全球视图</span>
          </div>

          <div className="view-detail-row">
            <span className="detail-label">视图详情：</span>
            <div className="detail-token">toutiao.mysql.cp_govern_write</div>
            <div className="detail-value">
              China-East | China-Enterprise | China-HKPay | China-North | China-North6 | China-Pay | US-TTP3 | US-TTP4
            </div>
          </div>

          <div className="global-group-row">
            <div className="global-group-tabs">
              <button
                className={`global-group-tab ${activeGroup === globalGroup.label ? 'selected' : ''}`}
                type="button"
                onClick={() => {
                  setActiveGroup(globalGroup.label);
                  setIsSiteMenuOpen(false);
                }}
              >
                <img src={globalGroup.icon} alt="" />
                <span>{globalGroup.label}</span>
              </button>

              <Dropdown
                droplist={
                  <Menu
                    className="global-group-dropdown-menu"
                    selectedKeys={selectedSiteGroup ? [selectedSiteGroup.label] : []}
                    onClickMenuItem={(key) => {
                      setActiveGroup(String(key));
                      setIsSiteMenuOpen(false);
                    }}
                  >
                    {siteGroupsOnly.map((group) => (
                      <Menu.Item key={group.label}>
                        <span className="global-group-dropdown-item">
                          <img src={group.icon} alt="" />
                          <span>{group.label}</span>
                          {group.count ? <em>({group.count})</em> : null}
                        </span>
                      </Menu.Item>
                    ))}
                  </Menu>
                }
                onVisibleChange={(visible) => setIsSiteMenuOpen(visible)}
                popupVisible={isSiteMenuOpen}
                position="bl"
                trigger="click"
              >
                <button
                  className={`global-group-tab global-group-dropdown-trigger ${selectedSiteGroup ? 'selected' : ''}`}
                  type="button"
                >
                  <img src={siteTriggerIcon} alt="" />
                  <span>{siteTriggerLabel}</span>
                  <img className={`global-group-tab-caret ${isSiteMenuOpen ? 'open' : ''}`} src={downIcon} alt="" />
                </button>
              </Dropdown>
            </div>
            <VregionTabs
              selection={activeSelection}
              vregions={activeGroupData.vregions}
              onChange={(nextSelection) => {
                setGroupSelections((currentSelections) => ({
                  ...currentSelections,
                  [activeGroup]: nextSelection,
                }));
              }}
            />
          </div>
        </div>

        <div className="global-frame-actions">
          <button className="square-action" type="button">
            <img src={starIcon} alt="" />
          </button>
          <button className="gray-action" type="button">
            一致性治理
          </button>
          <button className="blue-action" type="button">
            多区域变更
            <img src={changeDownIcon} alt="" />
          </button>
          <button className="square-action" type="button">
            <img src={moreIcon} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
}

function SchemeSixGlobalViewFrame({ groups }: { groups: GlobalGroup[] }) {
  const defaultActiveGroupLabel = groups.find((group) => group.label === 'CN')?.label ?? groups[0]?.label ?? '';
  const [activeGroup, setActiveGroup] = useState(defaultActiveGroupLabel);
  const [groupSelections, setGroupSelections] = useState<Record<string, GroupSelection>>(() => buildDefaultGroupSelections(groups));

  useEffect(() => {
    setActiveGroup(defaultActiveGroupLabel);
    setGroupSelections(buildDefaultGroupSelections(groups));
  }, [defaultActiveGroupLabel, groups]);

  const activeGroupData = getGroupByLabel(groups, activeGroup);
  const activeSelection = groupSelections[activeGroup] ?? getDefaultGroupSelection(activeGroupData);

  return (
    <section className="global-view-frame scheme-six">
      <div className="global-view-content">
        <div className="global-view-main">
          <CompactBreadcrumb />

          <div className="scheme-six-site-row">
            <div className="scheme-six-site-strip">
              {groups.map((group, index) => (
                <button
                  className={`vregion-tab-button ${activeGroup === group.label ? 'selected' : ''} ${index > 0 ? 'with-divider' : ''}`}
                  key={group.label}
                  type="button"
                  onClick={() => setActiveGroup(group.label)}
                >
                  <img src={group.icon} alt="" />
                  <span>{group.label}</span>
                  {group.count ? <em>({group.count})</em> : null}
                </button>
              ))}
            </div>
          </div>

          <div className="global-group-row scheme-six">
            <SchemeSixVregionTabs
              selection={activeSelection}
              vregions={activeGroupData.vregions}
              onChange={(nextSelection) => {
                setGroupSelections((currentSelections) => ({
                  ...currentSelections,
                  [activeGroup]: nextSelection,
                }));
              }}
            />
          </div>
        </div>

        <div className="global-frame-actions">
          <button className="square-action" type="button">
            <img src={starIcon} alt="" />
          </button>
          <button className="gray-action" type="button">
            一致性治理
          </button>
          <button className="blue-action" type="button">
            多区域变更
            <img src={changeDownIcon} alt="" />
          </button>
          <button className="square-action" type="button">
            <img src={moreIcon} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
}

function GlobalFrameActions({ inline = false }: { inline?: boolean }) {
  return (
    <div className={`global-frame-actions ${inline ? 'inline' : ''}`}>
      <button className="square-action" type="button">
        <img src={starIcon} alt="" />
      </button>
      <button className="gray-action" type="button">
        一致性治理
      </button>
      <button className="blue-action" type="button">
        多区域变更
        <img src={changeDownIcon} alt="" />
      </button>
      <button className="square-action" type="button">
        <img src={moreIcon} alt="" />
      </button>
    </div>
  );
}

function MoreVregionDropdown({
  selectedKeys,
  onClickMenuItem,
  onEdit,
  editLabel = '编辑视图',
  children,
}: {
  selectedKeys: string[];
  onClickMenuItem: (key: string) => void;
  onEdit?: () => void;
  editLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="scheme-four-overflow-dropdown">
      <div className="scheme-four-overflow-scroll">
        <Menu className="site-cascade-menu scheme-four-overflow-menu" selectedKeys={selectedKeys} onClickMenuItem={onClickMenuItem}>
          {children}
        </Menu>
      </div>
      {onEdit ? (
        <button className="scheme-four-overflow-edit" type="button" onClick={onEdit}>
          <SettingsEntryContent label={editLabel} />
        </button>
      ) : null}
    </div>
  );
}

function SettingsEntryContent({ label }: { label: string }) {
  return (
    <span className="edit-entry-content">
      <svg
        aria-hidden="true"
        className="edit-entry-icon"
        fill="none"
        viewBox="0 0 12 12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M4.21744 1.54927C4.30762 1.22465 4.60318 1 4.94008 1H7.06004C7.39695 1 7.69251 1.22465 7.78268 1.54927L8.03834 2.46964L8.9633 2.23084C9.28951 2.14663 9.63185 2.29026 9.8003 2.58203L10.8603 4.41797C11.0287 4.70974 10.982 5.07803 10.7459 5.31843L10.0767 6L10.7459 6.68158C10.982 6.92197 11.0287 7.29026 10.8603 7.58203L9.8003 9.41797C9.63185 9.70974 9.28951 9.85338 8.9633 9.76916L8.03834 9.53036L7.78268 10.4507C7.69251 10.7753 7.39695 11 7.06004 11H4.94008C4.60318 11 4.30762 10.7753 4.21744 10.4507L3.9618 9.53041L3.03702 9.76916C2.71081 9.85338 2.36848 9.70974 2.20003 9.41797L1.14005 7.58203C0.971595 7.29026 1.01837 6.92197 1.25441 6.68158L1.92363 6L1.25441 5.31843C1.01837 5.07803 0.971595 4.70974 1.14005 4.41797L2.20003 2.58203C2.36848 2.29026 2.71082 2.14663 3.03703 2.23084L3.9618 2.46959L4.21744 1.54927ZM3.8961 9.2939L3.89619 9.29423L3.8961 9.2939ZM5.1301 2L4.85962 2.97375C4.75019 3.3677 4.34539 3.60141 3.9495 3.4992L2.97104 3.2466L2.10108 4.75341L2.80915 5.47454C3.0956 5.76629 3.0956 6.23371 2.80915 6.52546L2.10108 7.2466L2.97104 8.75341L3.9495 8.5008C4.34539 8.39859 4.75019 8.63231 4.85962 9.02625L5.1301 10H6.87002L7.14052 9.0262C7.24995 8.63225 7.65475 8.39854 8.05064 8.50075L9.02929 8.75341L9.89924 7.2466L9.19118 6.52546C8.90473 6.23371 8.90473 5.76629 9.19118 5.47454L9.89924 4.75341L9.02929 3.2466L8.05064 3.49925C7.65475 3.60146 7.24995 3.36774 7.14052 2.9738L6.87002 2H5.1301ZM6.00006 5C5.44778 5 5.00006 5.44771 5.00006 6C5.00006 6.55228 5.44778 7 6.00006 7C6.55235 7 7.00006 6.55228 7.00006 6C7.00006 5.44771 6.55235 5 6.00006 5ZM4.00006 6C4.00006 4.89543 4.89549 4 6.00006 4C7.10463 4 8.00006 4.89543 8.00006 6C8.00006 7.10457 7.10463 8 6.00006 8C4.89549 8 4.00006 7.10457 4.00006 6Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
      <span>{label}</span>
    </span>
  );
}

type GroupSelection = {
  vregion: string;
  vdc?: string;
};

function getDefaultVregionSelection(vregion?: VregionItem): GroupSelection {
  return {
    vregion: vregion?.name ?? '',
    vdc: vregion?.vdcs[0],
  };
}

function getDefaultGroupSelection(group?: GlobalGroup): GroupSelection {
  return getDefaultVregionSelection(group?.vregions[0]);
}

function getGroupByLabel(groups: GlobalGroup[], label: string) {
  return groups.find((group) => group.label === label) ?? groups[0];
}

function buildDefaultGroupSelections(groups: GlobalGroup[]) {
  return groups.reduce<Record<string, GroupSelection>>((result, group) => {
    result[group.label] = getDefaultGroupSelection(group);
    return result;
  }, {});
}

function buildFlatVregionTabs(groups: GlobalGroup[]): FlatVregionTab[] {
  return groups
    .filter((group) => group.label !== '全球视图')
    .flatMap((group) => group.vregions.map((item) => ({ group, item, key: getVregionTabKey(group.label, item.name) })));
}

function formatGroupPath(group: GlobalGroup, selection: GroupSelection) {
  if (group.label === '全球视图') {
    return group.label;
  }

  const segments = [group.label, selection.vregion];

  if (selection.vdc) {
    segments.push(selection.vdc);
  }

  return segments.filter(Boolean).join(' / ');
}

function getGroupCount(group: GlobalGroup) {
  return group.count ?? String(group.vregions.length);
}

function getVregionTabKey(groupLabel: string, vregion: string) {
  return `${groupLabel}:${vregion}`;
}

function getFinalSchemeMaxPinnedVregions(viewportWidth: number, hasSidebar: boolean) {
  const matchedRule =
    FINAL_SCHEME_RESPONSIVE_PINNED_VREGIONS.find((rule) => viewportWidth >= rule.minWidth) ??
    FINAL_SCHEME_RESPONSIVE_PINNED_VREGIONS[FINAL_SCHEME_RESPONSIVE_PINNED_VREGIONS.length - 1];
  return hasSidebar ? matchedRule.withSidebar : matchedRule.withoutSidebar;
}

function getPsmNameByVregion(vregion?: string) {
  if (!vregion) {
    return DEFAULT_PSM_NAME;
  }

  return VREGION_TO_PSM.get(vregion) ?? DEFAULT_PSM_NAME;
}

function getPsmNameBySelection(groupLabel: string, selection: GroupSelection) {
  if (groupLabel === '全球视图') {
    return DEFAULT_PSM_NAME;
  }

  return getPsmNameByVregion(selection.vregion);
}

function getSelectionMenuKey(selection: GroupSelection) {
  return selection.vdc ? `vdc:${selection.vregion}:${selection.vdc}` : `vregion:${selection.vregion}`;
}

function formatSelectionPath(group: GlobalGroup, selection: GroupSelection) {
  if (group.label === '全球视图') {
    return group.label;
  }

  const segments = [group.label, selection.vregion];

  if (selection.vdc) {
    segments.push(selection.vdc);
  }

  return segments.filter(Boolean).join(' / ');
}

function formatVregionTabLabel(item: VregionItem, selection: GroupSelection) {
  if (selection.vregion === item.name && selection.vdc) {
    return `${item.name} / ${selection.vdc}`;
  }

  return item.name;
}

function SchemeFourGlobalViewFrame({ groups, hasSidebar }: { groups: GlobalGroup[]; hasSidebar: boolean }) {
  const defaultActiveGroupLabel = groups.find((group) => group.label === 'CN')?.label ?? groups[0]?.label ?? '';
  const [activeGroup, setActiveGroup] = useState(defaultActiveGroupLabel);
  const [groupSelections, setGroupSelections] = useState<Record<string, GroupSelection>>(() => buildDefaultGroupSelections(groups));
  const [openMenuTab, setOpenMenuTab] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = useState(0);
  const [tabWidths, setTabWidths] = useState<Record<string, number>>({});
  const [moreWidth, setMoreWidth] = useState(0);
  const [globalTabWidth, setGlobalTabWidth] = useState(0);

  useEffect(() => {
    setActiveGroup(defaultActiveGroupLabel);
    setGroupSelections(buildDefaultGroupSelections(groups));
    setOpenMenuTab(null);
  }, [defaultActiveGroupLabel, groups]);

  const globalGroup = groups.find((group) => group.label === '全球视图');
  const flatVregionTabs = useMemo(
    () =>
      groups
        .filter((group) => group.label !== '全球视图')
        .flatMap((group) => group.vregions.map((item) => ({ group, item, key: getVregionTabKey(group.label, item.name) }))),
    [groups],
  );
  const maxVisibleVregions = hasSidebar
    ? SCHEME_FOUR_MAX_VISIBLE_VREGIONS_WITH_SIDEBAR
    : SCHEME_FOUR_MAX_VISIBLE_VREGIONS_WITHOUT_SIDEBAR;

  const activeSelection = groupSelections[activeGroup] ?? getDefaultGroupSelection(getGroupByLabel(groups, activeGroup));
  const activeTabKey = getVregionTabKey(activeGroup, activeSelection.vregion);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const updateWidth = () => {
      setAvailableWidth(Math.floor(stripRef.current?.getBoundingClientRect().width ?? 0));
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!measureRef.current) {
      return;
    }

    const nextTabWidths: Record<string, number> = {};
    measureRef.current.querySelectorAll<HTMLElement>('[data-scheme-four-tab-key]').forEach((element) => {
      const tabKey = element.dataset.schemeFourTabKey;
      if (tabKey) {
        nextTabWidths[tabKey] = Math.ceil(element.getBoundingClientRect().width);
      }
    });

    const moreTrigger = measureRef.current.querySelector<HTMLElement>('[data-scheme-four-more-trigger]');
    const globalTrigger = measureRef.current.querySelector<HTMLElement>('[data-scheme-four-global-trigger]');
    setTabWidths(nextTabWidths);
    setMoreWidth(Math.ceil(moreTrigger?.getBoundingClientRect().width ?? 0));
    setGlobalTabWidth(Math.ceil(globalTrigger?.getBoundingClientRect().width ?? 0));
  }, [activeTabKey, activeSelection, flatVregionTabs]);

  const updateActiveSelection = (groupLabel: string, nextSelection: GroupSelection) => {
    setActiveGroup(groupLabel);
    setGroupSelections((currentSelections) => ({
      ...currentSelections,
      [groupLabel]: nextSelection,
    }));
    setOpenMenuTab(null);
  };

  const vregionAvailableWidth =
    availableWidth > 0 && globalGroup
      ? Math.max(availableWidth - globalTabWidth - (flatVregionTabs.length > 0 ? SCHEME_FOUR_TAB_GAP : 0), 0)
      : availableWidth;

  const { visibleTabs, hiddenTabs } = useMemo(
    () => getVisibleSchemeFourTabs(flatVregionTabs, activeTabKey, vregionAvailableWidth, tabWidths, moreWidth, maxVisibleVregions),
    [activeTabKey, flatVregionTabs, maxVisibleVregions, moreWidth, tabWidths, vregionAvailableWidth],
  );
  const moreVregionLabel = `更多 vregion（${hiddenTabs.length}）`;

  return (
    <section className="global-view-frame scheme-two">
      <div className="global-view-content">
        <div className="global-view-main">
          <div className="breadcrumb-line">
            <span>关系型数据库RDS列表</span>
            <i />
            <span className="muted">cp_govern 全球视图</span>
          </div>

          <div className="view-detail-row">
            <span className="detail-label">视图详情：</span>
            <div className="detail-token">toutiao.mysql.cp_govern_write</div>
            <div className="detail-value">
              China-East | China-Enterprise | China-HKPay | China-North | China-North6 | China-Pay | US-TTP3 | US-TTP4
            </div>
          </div>

          <div className="global-group-row scheme-four">
            <div className="global-group-tabs-area scheme-four" ref={containerRef}>
              <div className="global-group-tabs scheme-four" ref={stripRef}>
                {globalGroup ? (
                  <button
                    className={`site-cascade-tab ${activeGroup === globalGroup.label ? 'selected' : ''}`}
                    type="button"
                    onClick={() => {
                      setActiveGroup(globalGroup.label);
                      setOpenMenuTab(null);
                    }}
                  >
                    <img src={globalGroup.icon} alt="" />
                    <span className="site-cascade-tab-text">{globalGroup.label}</span>
                  </button>
                ) : null}

                {visibleTabs.map(({ group, item, key: tabKey }) => {
                  const selection = groupSelections[group.label] ?? getDefaultGroupSelection(group);
                  const isActive = activeGroup === group.label && selection.vregion === item.name;
                  const hasVdcs = item.vdcs.length > 0;
                  const tabLabel = isActive ? formatVregionTabLabel(item, selection) : item.name;
                  const tabButton = (
                    <button
                      className={`site-cascade-tab ${isActive ? 'selected' : ''}`}
                      key={tabKey}
                      type="button"
                      onClick={
                        !isActive || item.vdcs.length === 0
                          ? () => updateActiveSelection(group.label, getDefaultVregionSelection(item))
                          : undefined
                      }
                    >
                      <img src={group.icon} alt="" />
                      <span className="site-cascade-tab-text">{tabLabel}</span>
                      {isActive && hasVdcs ? <img className="site-cascade-tab-caret" src={downIcon} alt="" /> : null}
                    </button>
                  );

                  if (!isActive || item.vdcs.length === 0) {
                    return tabButton;
                  }

                  return (
                    <Dropdown
                      droplist={
                        <Menu
                          className="site-cascade-menu"
                          selectedKeys={[selection.vdc ?? item.vdcs[0]]}
                          onClickMenuItem={(key) => {
                            updateActiveSelection(group.label, { vregion: item.name, vdc: String(key) });
                          }}
                        >
                          {item.vdcs.map((vdc) => (
                            <Menu.Item key={vdc}>{vdc}</Menu.Item>
                          ))}
                        </Menu>
                      }
                      key={tabKey}
                      onVisibleChange={(visible) => setOpenMenuTab(visible ? tabKey : null)}
                      popupVisible={openMenuTab === tabKey}
                      position="bl"
                      trigger="click"
                    >
                      {tabButton}
                    </Dropdown>
                  );
                })}

                {hiddenTabs.length > 0 ? (
                  <Dropdown
                    droplist={
                      <MoreVregionDropdown
                        selectedKeys={activeGroup === '全球视图' ? [] : [activeTabKey]}
                        onClickMenuItem={(key) => {
                          const nextTab = flatVregionTabs.find((tab) => tab.key === String(key));

                          if (!nextTab) {
                            return;
                          }

                          updateActiveSelection(nextTab.group.label, getDefaultVregionSelection(nextTab.item));
                        }}
                      >
                        {hiddenTabs.map((tab) => (
                          <Menu.Item key={tab.key}>
                            <span className="scheme-four-overflow-item">
                              <img src={tab.group.icon} alt="" />
                              <span>{tab.item.name}</span>
                            </span>
                          </Menu.Item>
                        ))}
                      </MoreVregionDropdown>
                    }
                    onVisibleChange={(visible) => setOpenMenuTab(visible ? 'scheme-four-more' : null)}
                    popupVisible={openMenuTab === 'scheme-four-more'}
                    position="br"
                    trigger="click"
                  >
                    <button className="site-cascade-tab scheme-four-more-tab" type="button">
                      <span className="site-cascade-tab-text">{moreVregionLabel}</span>
                      <img className="site-cascade-tab-caret" src={downIcon} alt="" />
                    </button>
                  </Dropdown>
                ) : null}
              </div>

              <div className="vregion-tabs-measure" ref={measureRef} aria-hidden="true">
                {globalGroup ? (
                  <span className="site-cascade-tab" data-scheme-four-global-trigger>
                    <img src={globalGroup.icon} alt="" />
                    <span className="site-cascade-tab-text">{globalGroup.label}</span>
                  </span>
                ) : null}
                {flatVregionTabs.map(({ group, item, key: tabKey }) => {
                  const selection = groupSelections[group.label] ?? getDefaultGroupSelection(group);
                  const isActive = tabKey === activeTabKey;
                  const tabLabel = isActive ? formatVregionTabLabel(item, selection) : item.name;

                  return (
                    <span
                      className={`site-cascade-tab ${isActive ? 'selected' : ''}`}
                      data-scheme-four-tab-key={tabKey}
                      key={tabKey}
                    >
                      <img src={group.icon} alt="" />
                      <span className="site-cascade-tab-text">{tabLabel}</span>
                      {isActive && item.vdcs.length > 0 ? <img className="site-cascade-tab-caret" src={downIcon} alt="" /> : null}
                    </span>
                  );
                })}
                <span className="site-cascade-tab scheme-four-more-tab" data-scheme-four-more-trigger>
                  <span className="site-cascade-tab-text">更多 vregion</span>
                  <img className="site-cascade-tab-caret" src={downIcon} alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <GlobalFrameActions />
      </div>
    </section>
  );
}

function FinalSchemeGlobalViewFrame({
  archiveVisible,
  groups,
  hasSidebar,
  isSimpleDataMode,
  onResponsivePinnedMessage,
  previewWidth,
  onCloseArchive,
  onResourceNameChange,
}: {
  archiveVisible: boolean;
  groups: GlobalGroup[];
  hasSidebar: boolean;
  isSimpleDataMode: boolean;
  onResponsivePinnedMessage: (maxPinnedVregions: number) => void;
  previewWidth: number;
  onCloseArchive: () => void;
  onResourceNameChange: (resourceName: string) => void;
}) {
  const defaultActiveGroupLabel = groups.find((group) => group.label === 'CN')?.label ?? groups[0]?.label ?? '';
  const [activeGroup, setActiveGroup] = useState(defaultActiveGroupLabel);
  const [groupSelections, setGroupSelections] = useState<Record<string, GroupSelection>>(() => buildDefaultGroupSelections(groups));
  const [openMenuTab, setOpenMenuTab] = useState<string | null>(null);
  const [isManagePsmVisible, setManagePsmVisible] = useState(false);
  const [isCustomTabsVisible, setCustomTabsVisible] = useState(false);

  useEffect(() => {
    setActiveGroup(defaultActiveGroupLabel);
    setGroupSelections(buildDefaultGroupSelections(groups));
    setOpenMenuTab(null);
  }, [defaultActiveGroupLabel, groups]);

  const globalGroup = groups.find((group) => group.label === '全球视图');
  const flatVregionTabs = useMemo(() => buildFlatVregionTabs(groups), [groups]);
  const maxPinnedVregions = useMemo(
    () => getFinalSchemeMaxPinnedVregions(previewWidth, hasSidebar),
    [hasSidebar, previewWidth],
  );
  const defaultPinnedTabKeys = useMemo(
    () => flatVregionTabs.slice(0, Math.min(maxPinnedVregions, flatVregionTabs.length)).map((tab) => tab.key),
    [flatVregionTabs, maxPinnedVregions],
  );
  const [pinnedTabKeys, setPinnedTabKeys] = useState<string[]>(defaultPinnedTabKeys);
  const previousMaxPinnedVregionsRef = useRef(maxPinnedVregions);

  const activeSelection = groupSelections[activeGroup] ?? getDefaultGroupSelection(getGroupByLabel(groups, activeGroup));
  const activeTabKey = getVregionTabKey(activeGroup, activeSelection.vregion);
  const activeResourceName = getPsmNameBySelection(activeGroup, activeSelection);

  useEffect(() => {
    onResourceNameChange(activeResourceName);
  }, [activeResourceName, onResourceNameChange]);

  useEffect(() => {
    setPinnedTabKeys((currentPinnedTabKeys) => {
      const availableKeySet = new Set(flatVregionTabs.map((tab) => tab.key));
      const keptPinnedKeys = currentPinnedTabKeys.filter((key) => availableKeySet.has(key));
      const fallbackPinnedKeys = defaultPinnedTabKeys.filter((key) => !keptPinnedKeys.includes(key));
      const nextPinnedKeys = [...keptPinnedKeys, ...fallbackPinnedKeys];
      return nextPinnedKeys.length > 0 ? nextPinnedKeys : defaultPinnedTabKeys;
    });
  }, [defaultPinnedTabKeys, flatVregionTabs]);

  useEffect(() => {
    const previousMaxPinnedVregions = previousMaxPinnedVregionsRef.current;

    if (maxPinnedVregions < previousMaxPinnedVregions && pinnedTabKeys.length > maxPinnedVregions) {
      onResponsivePinnedMessage(maxPinnedVregions);
    }

    previousMaxPinnedVregionsRef.current = maxPinnedVregions;
  }, [maxPinnedVregions, onResponsivePinnedMessage, pinnedTabKeys.length]);

  const updateActiveSelection = (groupLabel: string, nextSelection: GroupSelection) => {
    setActiveGroup(groupLabel);
    setGroupSelections((currentSelections) => ({
      ...currentSelections,
      [groupLabel]: nextSelection,
    }));
    setOpenMenuTab(null);
  };

  const flatVregionTabMap = useMemo(() => new Map(flatVregionTabs.map((tab) => [tab.key, tab] as const)), [flatVregionTabs]);
  const visibleTabs = useMemo(
    () => pinnedTabKeys.slice(0, maxPinnedVregions).map((key) => flatVregionTabMap.get(key)).filter(Boolean) as FlatVregionTab[],
    [flatVregionTabMap, maxPinnedVregions, pinnedTabKeys],
  );
  const hiddenTabs = useMemo(() => {
    const visibleKeySet = new Set(visibleTabs.map((tab) => tab.key));
    return flatVregionTabs.filter((tab) => !visibleKeySet.has(tab.key));
  }, [flatVregionTabs, visibleTabs]);
  const moreVregionLabel = `更多 vregion（${hiddenTabs.length}）`;
  const openCustomTabsModal = () => {
    setOpenMenuTab(null);
    setCustomTabsVisible(true);
  };
  const openManagePsmModal = () => {
    setOpenMenuTab(null);
    setManagePsmVisible(true);
  };
  const applyPinnedTabs = (nextPinnedTabKeys: string[]) => {
    const nextPinnedKeys = nextPinnedTabKeys.filter((key) => flatVregionTabMap.has(key));
    setPinnedTabKeys(nextPinnedKeys);

    if (!flatVregionTabMap.has(activeTabKey) && globalGroup) {
      setActiveGroup(globalGroup.label);
    }
  };
  const handleSavePinnedTabs = (nextPinnedTabKeys: string[]) => {
    applyPinnedTabs(nextPinnedTabKeys);
    onCloseArchive();
  };
  const handleSaveCustomTabs = (nextPinnedTabKeys: string[]) => {
    applyPinnedTabs(nextPinnedTabKeys);
    setCustomTabsVisible(false);
  };

  return (
    <section className="global-view-frame scheme-two scheme-final">
      <div className="global-view-content">
        <div className="global-view-main">
          <div className="global-frame-topbar">
            <CompactBreadcrumb onManagePsm={openManagePsmModal} />
            <GlobalFrameActions inline />
          </div>

          <div className="global-group-row scheme-four">
            <div className="global-group-tabs-area scheme-four">
              <div className="global-group-tabs scheme-four">
                {globalGroup ? (
                  <button
                    className={`site-cascade-tab ${activeGroup === globalGroup.label ? 'selected' : ''}`}
                    type="button"
                    onClick={() => {
                      setActiveGroup(globalGroup.label);
                      setOpenMenuTab(null);
                    }}
                  >
                    <img src={globalGroup.icon} alt="" />
                    <span className="site-cascade-tab-text">{globalGroup.label}</span>
                  </button>
                ) : null}

                {visibleTabs.map(({ group, item, key: tabKey }) => {
                  const selection = groupSelections[group.label] ?? getDefaultGroupSelection(group);
                  const isActive = activeGroup === group.label && selection.vregion === item.name;
                  const hasVdcs = item.vdcs.length > 0;
                  const tabLabel = isActive ? formatVregionTabLabel(item, selection) : item.name;
                  const tabButton = (
                    <button
                      className={`site-cascade-tab ${isActive ? 'selected' : ''}`}
                      key={tabKey}
                      type="button"
                      onClick={
                        !isActive || item.vdcs.length === 0
                          ? () => updateActiveSelection(group.label, getDefaultVregionSelection(item))
                          : undefined
                      }
                    >
                      <img src={group.icon} alt="" />
                      <span className="site-cascade-tab-text">{tabLabel}</span>
                      {isActive && hasVdcs ? <img className="site-cascade-tab-caret" src={downIcon} alt="" /> : null}
                    </button>
                  );

                  if (!isActive || item.vdcs.length === 0) {
                    return tabButton;
                  }

                  return (
                    <Dropdown
                      droplist={
                        <Menu
                          className="site-cascade-menu"
                          selectedKeys={[selection.vdc ?? item.vdcs[0]]}
                          onClickMenuItem={(key) => {
                            updateActiveSelection(group.label, { vregion: item.name, vdc: String(key) });
                          }}
                        >
                          {item.vdcs.map((vdc) => (
                            <Menu.Item key={vdc}>{vdc}</Menu.Item>
                          ))}
                        </Menu>
                      }
                      key={tabKey}
                      onVisibleChange={(visible) => setOpenMenuTab(visible ? tabKey : null)}
                      popupVisible={openMenuTab === tabKey}
                      position="bl"
                      trigger="click"
                    >
                      {tabButton}
                    </Dropdown>
                  );
                })}

                {hiddenTabs.length > 0 ? (
                  <Dropdown
                    droplist={
                      <MoreVregionDropdown
                        editLabel="自定义 Tab 展示"
                        selectedKeys={activeGroup === '全球视图' ? [] : [activeTabKey]}
                        onEdit={openCustomTabsModal}
                        onClickMenuItem={(key) => {
                          const nextTab = flatVregionTabs.find((tab) => tab.key === String(key));

                          if (!nextTab) {
                            return;
                          }

                          updateActiveSelection(nextTab.group.label, getDefaultVregionSelection(nextTab.item));
                        }}
                      >
                        {hiddenTabs.map((tab) => (
                          <Menu.Item key={tab.key}>
                            <span className="scheme-four-overflow-item">
                              <img src={tab.group.icon} alt="" />
                              <span>{tab.item.name}</span>
                            </span>
                          </Menu.Item>
                        ))}
                      </MoreVregionDropdown>
                    }
                    onVisibleChange={(visible) => setOpenMenuTab(visible ? 'final-scheme-more' : null)}
                    popupVisible={openMenuTab === 'final-scheme-more'}
                    position="br"
                    trigger="click"
                  >
                    <button className="site-cascade-tab scheme-four-more-tab" type="button">
                      <span className="site-cascade-tab-text">{moreVregionLabel}</span>
                      <img className="site-cascade-tab-caret" src={downIcon} alt="" />
                    </button>
                  </Dropdown>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FinalSchemeEditDrawer
        flatVregionTabs={flatVregionTabs}
        groups={groups}
        maxPinnedVregions={maxPinnedVregions}
        pinnedTabKeys={pinnedTabKeys}
        visible={archiveVisible}
        onCancel={onCloseArchive}
        onSave={handleSavePinnedTabs}
      />
      <ManagePsmModal
        groups={groups}
        isSimpleDataMode={isSimpleDataMode}
        visible={isManagePsmVisible}
        onCancel={() => setManagePsmVisible(false)}
        onSave={() => setManagePsmVisible(false)}
        onSaveAndCustomize={() => {
          setManagePsmVisible(false);
          setCustomTabsVisible(true);
        }}
      />
      <FinalSchemeCustomTabsModal
        defaultPinnedTabKeys={defaultPinnedTabKeys}
        flatVregionTabs={flatVregionTabs}
        maxPinnedVregions={maxPinnedVregions}
        pinnedTabKeys={pinnedTabKeys}
        visible={isCustomTabsVisible}
        onCancel={() => setCustomTabsVisible(false)}
        onSave={handleSaveCustomTabs}
      />
    </section>
  );
}

function buildEditViewPsmRows(groups: GlobalGroup[]): EditViewPsmRow[] {
  return AGGREGATED_PSMS.map((item) => {
    const siteLabels = groups
      .filter(
        (group) =>
          group.label !== '全球视图' &&
          group.vregions.some((vregion) => item.vregions.some((psmVregion) => psmVregion === vregion.name)),
      )
      .map((group) => group.label);
    const vdcDetails = groups
      .flatMap((group) =>
        group.vregions
          .filter((vregion) => item.vregions.some((psmVregion) => psmVregion === vregion.name) && vregion.vdcs.length > 0)
          .map((vregion) => ({
            vregion: vregion.name,
            vdcs: vregion.vdcs,
          })),
      )
      .filter((detail, index, currentDetails) => currentDetails.findIndex((itemDetail) => itemDetail.vregion === detail.vregion) === index);
    const vdcCount = vdcDetails.reduce((sum, detail) => sum + detail.vdcs.length, 0);

    return {
      key: item.name,
      psm: item.name,
      siteLabels,
      vregions: [...item.vregions],
      vdcCount,
      vdcDetails,
    };
  });
}

function getVisibleTagItems(items: string[], maxUnits: number) {
  let usedUnits = 0;
  const visibleItems: string[] = [];

  items.forEach((item) => {
    const nextUnits = Math.max(item.length, 4) + 2;

    if (visibleItems.length > 0 && usedUnits + nextUnits > maxUnits) {
      return;
    }

    if (visibleItems.length === 0 || usedUnits + nextUnits <= maxUnits) {
      visibleItems.push(item);
      usedUnits += nextUnits;
    }
  });

  return {
    visibleItems,
    hiddenCount: Math.max(items.length - visibleItems.length, 0),
  };
}

function LinearTagsSummary({
  items,
  maxUnits,
  label,
}: {
  items: string[];
  maxUnits: number;
  label: 'site' | 'vregion';
}) {
  const { visibleItems, hiddenCount } = getVisibleTagItems(items, maxUnits);
  const summaryText = label === 'site' ? `共 ${items.length} 个 site` : `共 ${items.length} 个 Vregion`;

  return (
    <span className="edit-view-linear-tags">
      {visibleItems.map((item) => (
        <Tag className="edit-view-linear-tag" key={item}>
          {item}
        </Tag>
      ))}
      {hiddenCount > 0 ? (
        <Popover
          className="edit-view-linear-tags-popover-wrapper"
          content={
            <div className="edit-view-linear-tags-popover">
              <div className="edit-view-linear-tags-popover-title">{summaryText}</div>
              {items.map((item) => (
                <div className="edit-view-linear-tags-popover-item" key={`popover:${item}`}>
                  {item}
                </div>
              ))}
            </div>
          }
          getPopupContainer={() => document.body}
          position="top"
          trigger="hover"
        >
          <Tag className="edit-view-linear-tag edit-view-linear-tag-action">+{hiddenCount}</Tag>
        </Popover>
      ) : null}
    </span>
  );
}

function VdcCountSummary({ record }: { record: EditViewPsmRow }) {
  if (record.vdcCount <= 0) {
    return '-';
  }

  return (
    <Popover
      content={
        <div className="edit-view-vdc-popover">
          {record.vdcDetails.map((detail) => (
            <div className="edit-view-vdc-popover-row" key={`${record.key}:${detail.vregion}`}>
              <span className="edit-view-vdc-popover-vregion">{detail.vregion}</span>
              <span className="edit-view-vdc-popover-vdcs">{detail.vdcs.join(', ')}</span>
            </div>
          ))}
        </div>
      }
      position="top"
      trigger="hover"
    >
      <span className="edit-view-vdc-tag" role="button" tabIndex={0}>
        <span className="edit-view-vdc-tag-count">{record.vdcCount}</span>
        <span className="edit-view-vdc-tag-line" />
      </span>
    </Popover>
  );
}

function EditViewPsmSection({ groups }: { groups: GlobalGroup[] }) {
  const editViewPsmRows = useMemo<EditViewPsmRow[]>(() => buildEditViewPsmRows(groups), [groups]);

  const editViewPsmColumns = [
    {
      title: 'PSM',
      dataIndex: 'psm',
      width: 200,
    },
    {
      title: 'Site',
      dataIndex: 'siteLabels',
      width: 220,
      render: (_: string, record: EditViewPsmRow) => <LinearTagsSummary items={record.siteLabels} label="site" maxUnits={18} />,
    },
    {
      title: 'Vregion',
      dataIndex: 'vregions',
      width: 300,
      render: (_: string, record: EditViewPsmRow) => <LinearTagsSummary items={record.vregions} label="vregion" maxUnits={30} />,
    },
    {
      title: 'VDC',
      dataIndex: 'vdcCount',
      width: 120,
      render: (_: number, record: EditViewPsmRow) => <VdcCountSummary record={record} />,
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right' as const,
      width: 72,
      render: () => <button className="edit-view-remove-button" type="button">移除</button>,
    },
  ];

  return (
    <section className="edit-view-psm-section">
      <div className="edit-view-psm-header">
        <p className="edit-view-psm-count">已添加 PSM：{editViewPsmRows.length}条</p>
        <button className="edit-view-add-psm" type="button">
          <span className="edit-view-add-psm-icon">+</span>
          <span>添加 PSM</span>
        </button>
      </div>

      <Table
        borderCell
        className="edit-view-psm-table"
        columns={editViewPsmColumns}
        data={editViewPsmRows}
        pagination={false}
        rowKey="key"
        scroll={{ x: 980 }}
      />
    </section>
  );
}

function ManagePsmModal({
  visible,
  groups,
  isSimpleDataMode,
  onCancel,
  onSave,
  onSaveAndCustomize,
}: {
  visible: boolean;
  groups: GlobalGroup[];
  isSimpleDataMode: boolean;
  onCancel: () => void;
  onSave: () => void;
  onSaveAndCustomize: () => void;
}) {
  return (
    <Modal
      className="manage-psm-modal"
      footer={
        <div className="manage-psm-modal-footer">
          <Button onClick={onCancel}>取消</Button>
          {isSimpleDataMode ? null : (
            <Button onClick={onSaveAndCustomize}>
              保存并自定义 Tab 展示
            </Button>
          )}
          <Button type="primary" onClick={onSave}>
            保存
          </Button>
        </div>
      }
      maskClosable
      onCancel={onCancel}
      title="管理 PSM"
      visible={visible}
      style={{ width: 'min(600px, calc(100vw - 32px))', maxWidth: 600 }}
      unmountOnExit
    >
      <div className="manage-psm-modal-body">
        <EditViewPsmSection groups={groups} />
      </div>
    </Modal>
  );
}

function FinalSchemeCustomTabsModal({
  visible,
  flatVregionTabs,
  pinnedTabKeys,
  defaultPinnedTabKeys,
  maxPinnedVregions,
  onCancel,
  onSave,
}: {
  visible: boolean;
  flatVregionTabs: FlatVregionTab[];
  pinnedTabKeys: string[];
  defaultPinnedTabKeys: string[];
  maxPinnedVregions: number;
  onCancel: () => void;
  onSave: (nextPinnedTabKeys: string[]) => void;
}) {
  const [draftPinnedTabKeys, setDraftPinnedTabKeys] = useState<string[]>(pinnedTabKeys);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setDraftPinnedTabKeys(pinnedTabKeys);
  }, [pinnedTabKeys, visible]);

  const draftPinnedKeySet = useMemo(() => new Set(draftPinnedTabKeys), [draftPinnedTabKeys]);
  const isRestoreDefaultDisabled = useMemo(
    () =>
      draftPinnedTabKeys.length === defaultPinnedTabKeys.length &&
      draftPinnedTabKeys.every((key, index) => key === defaultPinnedTabKeys[index]),
    [defaultPinnedTabKeys, draftPinnedTabKeys],
  );
  const isSaveDisabled = draftPinnedTabKeys.length === 0;

  const togglePinnedTab = (tabKey: string, checked: boolean) => {
    setDraftPinnedTabKeys((currentPinnedTabKeys) => {
      if (checked) {
        if (currentPinnedTabKeys.includes(tabKey) || currentPinnedTabKeys.length >= maxPinnedVregions) {
          return currentPinnedTabKeys;
        }

        return flatVregionTabs.filter((tab) => currentPinnedTabKeys.includes(tab.key) || tab.key === tabKey).map((tab) => tab.key);
      }

      return currentPinnedTabKeys.filter((key) => key !== tabKey);
    });
  };

  return (
    <Modal
      className="custom-tabs-modal"
      footer={
        <div className="custom-tabs-modal-footer">
          <Button disabled={isRestoreDefaultDisabled} onClick={() => setDraftPinnedTabKeys(defaultPinnedTabKeys)}>
            恢复默认
          </Button>
          <div className="custom-tabs-modal-footer-actions">
            <Button onClick={onCancel}>取消</Button>
            <Tooltip content="至少选择1个Vregion" disabled={!isSaveDisabled} position="top" trigger="hover">
              <span className="final-scheme-save-trigger">
                <Button disabled={isSaveDisabled} type="primary" onClick={() => onSave(draftPinnedTabKeys)}>
                  保存
                </Button>
              </span>
            </Tooltip>
          </div>
        </div>
      }
      maskClosable
      onCancel={onCancel}
      title="自定义 Tab 展示"
      visible={visible}
      style={{ width: 'min(600px, calc(100vw - 32px))', maxWidth: 600, maxHeight: 612 }}
      unmountOnExit
    >
      <div className="custom-tabs-modal-body">
        <div className="custom-tabs-modal-summary">已选 {draftPinnedTabKeys.length}/{maxPinnedVregions} 个 Vregion</div>
        <div className="custom-tabs-modal-grid">
          {flatVregionTabs.map((tab) => {
            const checked = draftPinnedKeySet.has(tab.key);
            const disabled = !checked && draftPinnedTabKeys.length >= maxPinnedVregions;

            return (
              <label className={`custom-tabs-modal-item ${disabled ? 'disabled' : ''}`} key={tab.key}>
                <input
                  checked={checked}
                  disabled={disabled}
                  type="checkbox"
                  onChange={(event) => togglePinnedTab(tab.key, event.target.checked)}
                />
                <img src={tab.group.icon} alt="" />
                <span>{tab.item.name}</span>
              </label>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

function FinalSchemeEditDrawer({
  visible,
  groups,
  flatVregionTabs,
  pinnedTabKeys,
  maxPinnedVregions,
  onCancel,
  onSave,
}: {
  visible: boolean;
  groups: GlobalGroup[];
  flatVregionTabs: FlatVregionTab[];
  pinnedTabKeys: string[];
  maxPinnedVregions: number;
  onCancel: () => void;
  onSave: (nextPinnedTabKeys: string[]) => void;
}) {
  const [draftPinnedTabKeys, setDraftPinnedTabKeys] = useState<string[]>(pinnedTabKeys);
  const [leftKeyword, setLeftKeyword] = useState('');
  const [rightKeyword, setRightKeyword] = useState('');
  const [draggingKey, setDraggingKey] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setDraftPinnedTabKeys(pinnedTabKeys);
    setLeftKeyword('');
    setRightKeyword('');
    setDraggingKey(null);
  }, [pinnedTabKeys, visible]);

  const flatVregionTabMap = useMemo(() => new Map(flatVregionTabs.map((tab) => [tab.key, tab] as const)), [flatVregionTabs]);
  const draftPinnedKeySet = useMemo(() => new Set(draftPinnedTabKeys), [draftPinnedTabKeys]);
  const filteredGroups = useMemo(() => {
    const keyword = leftKeyword.trim().toLowerCase();

    return groups
      .filter((group) => group.label !== '全球视图')
      .map((group) => ({
        ...group,
        vregions: group.vregions.filter((item) => item.name.toLowerCase().includes(keyword)),
      }))
      .filter((group) => group.vregions.length > 0);
  }, [groups, leftKeyword]);
  const selectedTabs = useMemo(
    () => draftPinnedTabKeys.map((key) => flatVregionTabMap.get(key)).filter(Boolean) as FlatVregionTab[],
    [draftPinnedTabKeys, flatVregionTabMap],
  );
  const filteredSelectedTabs = useMemo(() => {
    const keyword = rightKeyword.trim().toLowerCase();

    if (!keyword) {
      return selectedTabs;
    }

    return selectedTabs.filter((tab) => tab.item.name.toLowerCase().includes(keyword));
  }, [rightKeyword, selectedTabs]);

  const updateDraftPinnedTabs = (nextPinnedTabKeys: string[]) => {
    setDraftPinnedTabKeys(nextPinnedTabKeys.slice(0, maxPinnedVregions));
  };

  const togglePinnedTab = (tabKey: string, checked: boolean) => {
    setDraftPinnedTabKeys((currentPinnedTabKeys) => {
      if (checked) {
        if (currentPinnedTabKeys.includes(tabKey) || currentPinnedTabKeys.length >= maxPinnedVregions) {
          return currentPinnedTabKeys;
        }

        return [...currentPinnedTabKeys, tabKey];
      }

      return currentPinnedTabKeys.filter((key) => key !== tabKey);
    });
  };

  const handleDropPinnedTab = (targetKey: string) => {
    if (!draggingKey || draggingKey === targetKey) {
      return;
    }

    setDraftPinnedTabKeys((currentPinnedTabKeys) => {
      const fromIndex = currentPinnedTabKeys.indexOf(draggingKey);
      const targetIndex = currentPinnedTabKeys.indexOf(targetKey);

      if (fromIndex === -1 || targetIndex === -1) {
        return currentPinnedTabKeys;
      }

      const nextPinnedTabKeys = [...currentPinnedTabKeys];
      const [draggingTabKey] = nextPinnedTabKeys.splice(fromIndex, 1);
      nextPinnedTabKeys.splice(targetIndex, 0, draggingTabKey);
      return nextPinnedTabKeys;
    });
    setDraggingKey(null);
  };

  const isSaveDisabled = draftPinnedTabKeys.length === 0;

  return (
    <Drawer
      className="final-scheme-edit-drawer"
      footer={
        <div className="final-scheme-edit-footer">
          <Button onClick={onCancel}>取消</Button>
          <Popover
            content="未选择任何常驻Tab 栏的Vregion"
            disabled={!isSaveDisabled}
            position="top"
            trigger="hover"
          >
            <span className="final-scheme-save-trigger">
              <Button disabled={isSaveDisabled} type="primary" onClick={() => onSave(draftPinnedTabKeys)}>
                保存
              </Button>
            </span>
          </Popover>
        </div>
      }
      maskClosable
      onCancel={onCancel}
      title="展示编辑视图archive"
      visible={visible}
      width={1120}
    >
      <div className="final-scheme-edit-body">
        <EditViewPsmSection groups={groups} />

        <section className="edit-view-transfer-section">
          <div className="edit-view-transfer-title">
            <span className="edit-view-transfer-title-bar" />
            <span>配置常驻 Tab 栏的 Vregion</span>
          </div>

          <div className="edit-view-transfer-shell">
            <div className="edit-view-transfer-panel">
              <div className="edit-view-transfer-panel-header">
                <span className="edit-view-transfer-panel-title">全部 Vregion</span>
                <button
                  className="edit-view-transfer-icon-button"
                  type="button"
                  onClick={() => {
                    setLeftKeyword('');
                    setRightKeyword('');
                    updateDraftPinnedTabs(pinnedTabKeys);
                  }}
                >
                  ↻
                </button>
              </div>

              <label className="edit-view-search">
                <img src={searchIcon} alt="" />
                <input
                  placeholder="请输入"
                  type="text"
                  value={leftKeyword}
                  onChange={(event) => setLeftKeyword(event.target.value)}
                />
              </label>

              <div className="edit-view-transfer-list">
                {filteredGroups.map((group) => (
                  <div className="edit-view-transfer-group" key={group.label}>
                    <div className="edit-view-transfer-group-header">
                      <img src={group.icon} alt="" />
                      <span>{group.label}</span>
                      <span>({group.vregions.length})</span>
                    </div>

                    <div className="edit-view-transfer-group-items">
                      {group.vregions.map((item) => {
                        const tabKey = getVregionTabKey(group.label, item.name);
                        const checked = draftPinnedKeySet.has(tabKey);
                        const disabled = !checked && draftPinnedTabKeys.length >= maxPinnedVregions;

                        return (
                          <label className={`edit-view-transfer-option ${disabled ? 'disabled' : ''}`} key={tabKey}>
                            <input
                              checked={checked}
                              disabled={disabled}
                              type="checkbox"
                              onChange={(event) => togglePinnedTab(tabKey, event.target.checked)}
                            />
                            <span>{item.name}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="edit-view-transfer-panel right">
              <div className="edit-view-transfer-panel-header">
                <span className="edit-view-transfer-panel-title">
                  已选 Vregion：{draftPinnedTabKeys.length}/{maxPinnedVregions} 项
                </span>
                <button className="edit-view-transfer-icon-button" type="button" onClick={() => updateDraftPinnedTabs([])}>
                  🗑
                </button>
              </div>

              <label className="edit-view-search">
                <img src={searchIcon} alt="" />
                <input
                  placeholder="请输入"
                  type="text"
                  value={rightKeyword}
                  onChange={(event) => setRightKeyword(event.target.value)}
                />
              </label>

              <div className="edit-view-selected-list">
                {filteredSelectedTabs.map((tab) => (
                  <div
                    className="edit-view-selected-item"
                    draggable
                    key={tab.key}
                    onDragEnd={() => setDraggingKey(null)}
                    onDragOver={(event) => event.preventDefault()}
                    onDragStart={() => setDraggingKey(tab.key)}
                    onDrop={() => handleDropPinnedTab(tab.key)}
                  >
                    <div className="edit-view-selected-item-main">
                      <span className="edit-view-drag-handle">⋮⋮</span>
                      <span>{tab.item.name}</span>
                    </div>
                    <button className="edit-view-selected-remove" type="button" onClick={() => togglePinnedTab(tab.key, false)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Drawer>
  );
}

function getSchemeFourStripWidth(
  visibleTabs: Array<{ key: string }>,
  widths: Record<string, number>,
  moreWidth = 0,
  showMore = false,
) {
  const tabWidth = visibleTabs.reduce((sum, tab) => sum + (widths[tab.key] ?? 0), 0);
  const tabGapWidth = visibleTabs.length > 1 ? SCHEME_FOUR_TAB_GAP * (visibleTabs.length - 1) : 0;
  const moreGapWidth = showMore && visibleTabs.length > 0 ? SCHEME_FOUR_TAB_GAP : 0;
  return tabWidth + tabGapWidth + (showMore ? moreWidth + moreGapWidth : 0);
}

function getVisibleSchemeFourTabs(
  flatVregionTabs: Array<{ group: GlobalGroup; item: VregionItem; key: string }>,
  activeTabKey: string,
  availableWidth: number,
  widths: Record<string, number>,
  moreWidth: number,
  maxVisibleVregions: number,
) {
  const fallbackVisibleTabs = flatVregionTabs.slice(0, Math.min(maxVisibleVregions, flatVregionTabs.length));

  if (flatVregionTabs.length === 0) {
    return { visibleTabs: [] as typeof flatVregionTabs, hiddenTabs: [] as typeof flatVregionTabs };
  }

  if (availableWidth <= 0) {
    return {
      visibleTabs: fallbackVisibleTabs,
      hiddenTabs: flatVregionTabs.slice(fallbackVisibleTabs.length),
    };
  }

  let candidateTabs = flatVregionTabs.slice(0, Math.min(maxVisibleVregions, flatVregionTabs.length));
  const activeTab = flatVregionTabs.find((tab) => tab.key === activeTabKey);

  if (activeTab && !candidateTabs.some((tab) => tab.key === activeTabKey)) {
    candidateTabs = [...candidateTabs.slice(0, Math.max(candidateTabs.length - 1, 0)), activeTab];
  }

  const visibleKeySet = new Set<string>();
  candidateTabs = candidateTabs.filter((tab) => {
    if (visibleKeySet.has(tab.key)) {
      return false;
    }
    visibleKeySet.add(tab.key);
    return true;
  });

  while (candidateTabs.length > 0) {
    const nextVisibleKeySet = new Set(candidateTabs.map((tab) => tab.key));
    const hiddenTabs = flatVregionTabs.filter((tab) => !nextVisibleKeySet.has(tab.key));
    const nextWidth = getSchemeFourStripWidth(candidateTabs, widths, moreWidth, hiddenTabs.length > 0);

    if (nextWidth <= availableWidth) {
      return { visibleTabs: candidateTabs, hiddenTabs };
    }

    let removableIndex = -1;
    for (let index = candidateTabs.length - 1; index >= 0; index -= 1) {
      if (candidateTabs[index].key !== activeTabKey) {
        removableIndex = index;
        break;
      }
    }

    if (removableIndex === -1) {
      if (moreWidth > 0 && moreWidth <= availableWidth) {
        return { visibleTabs: [] as typeof flatVregionTabs, hiddenTabs: flatVregionTabs };
      }

      return {
        visibleTabs: candidateTabs,
        hiddenTabs: flatVregionTabs.filter((tab) => tab.key !== candidateTabs[0]?.key),
      };
    }

    candidateTabs = candidateTabs.filter((_, index) => index !== removableIndex);
  }

  return { visibleTabs: [] as typeof flatVregionTabs, hiddenTabs: flatVregionTabs };
}

function CompactBreadcrumb({ onManagePsm }: { onManagePsm?: () => void }) {
  return (
    <div className="breadcrumb-compact-row">
      <div className="breadcrumb-line">
        <span>关系型数据库RDS列表</span>
        <i />
        <span className="muted">cp_govern 全球视图</span>
      </div>
      <span className="breadcrumb-aggregate-dash">-</span>
      <Popover
        className="aggregate-psm-popover-wrapper"
        content={
          <div className="aggregate-psm-popover">
            <div className="aggregate-psm-popover-header">
              <span>PSM</span>
              <span>Vregion</span>
            </div>
            <div className="aggregate-psm-popover-body">
              {AGGREGATED_PSMS.map((item) => (
                <div className="aggregate-psm-popover-row" key={item.name}>
                  <div className="aggregate-psm-name">{item.name}</div>
                  <div className="aggregate-psm-vregions">{item.vregions.join(', ')}</div>
                </div>
              ))}
            </div>
            <button className="aggregate-psm-popover-edit" type="button" onClick={onManagePsm}>
              <SettingsEntryContent label="管理 PSM" />
            </button>
          </div>
        }
        position="bottom"
        trigger="hover"
      >
        <p className="breadcrumb-aggregate">
          <span>聚合&nbsp;</span>
          <strong>{AGGREGATED_PSM_COUNT}</strong>
          <span>&nbsp;个PSM</span>
        </p>
      </Popover>
    </div>
  );
}

function SchemeTwoGlobalViewFrame({ groups }: { groups: GlobalGroup[] }) {
  const defaultActiveGroupLabel = groups.find((group) => group.label === 'CN')?.label ?? groups[0]?.label ?? '';
  const [activeGroup, setActiveGroup] = useState(defaultActiveGroupLabel);
  const [groupSelections, setGroupSelections] = useState<Record<string, GroupSelection>>(() => buildDefaultGroupSelections(groups));
  const [openMenuGroup, setOpenMenuGroup] = useState<string | null>(null);

  useEffect(() => {
    setActiveGroup(defaultActiveGroupLabel);
    setGroupSelections(buildDefaultGroupSelections(groups));
    setOpenMenuGroup(null);
  }, [defaultActiveGroupLabel, groups]);

  const activeGroupData = groups.find((group) => group.label === activeGroup) ?? groups[0];
  const activeSelection = groupSelections[activeGroup] ?? getDefaultGroupSelection(activeGroupData);

  const updateGroupSelection = (groupLabel: string, nextSelection: GroupSelection) => {
    setActiveGroup(groupLabel);
    setGroupSelections((currentSelections) => ({
      ...currentSelections,
      [groupLabel]: nextSelection,
    }));
    setOpenMenuGroup(null);
  };

  return (
    <section className="global-view-frame scheme-two">
      <div className="global-view-content">
        <div className="global-view-main">
          <div className="breadcrumb-line">
            <span>关系型数据库RDS列表</span>
            <i />
            <span className="muted">cp_govern 全球视图</span>
          </div>

          <div className="view-detail-row">
            <span className="detail-label">视图详情：</span>
            <div className="detail-token">toutiao.mysql.cp_govern_write</div>
            <div className="detail-value">
              China-East | China-Enterprise | China-HKPay | China-North | China-North6 | China-Pay | US-TTP3 | US-TTP4
            </div>
          </div>

          <div className="global-group-row scheme-two">
            <div className="global-group-tabs scheme-two">
              {groups.map((group) => {
                const isActive = activeGroup === group.label;
                const hasMultipleVregions = group.label !== '全球视图' && group.vregions.length > 1;
                const selection = groupSelections[group.label] ?? getDefaultGroupSelection(group);
                const tabLabel = isActive ? formatGroupPath(group, selection) : group.label;
                const tabButton = (
                  <button
                    className={`site-cascade-tab ${isActive ? 'selected' : ''}`}
                    key={group.label}
                    type="button"
                    onClick={() => {
                      setActiveGroup(group.label);
                      if (!hasMultipleVregions) {
                        updateGroupSelection(group.label, getDefaultGroupSelection(group));
                      }
                    }}
                  >
                    <img src={group.icon} alt="" />
                    <span className="site-cascade-tab-text">{tabLabel}</span>
                    {!isActive && group.count ? <em>({getGroupCount(group)})</em> : null}
                    {hasMultipleVregions ? <img className="site-cascade-tab-caret" src={downIcon} alt="" /> : null}
                  </button>
                );

                if (!hasMultipleVregions) {
                  return tabButton;
                }

                return (
                  <Dropdown
                    droplist={
                      <Menu
                        className="site-cascade-menu"
                        selectedKeys={[getSelectionMenuKey(selection)]}
                        onClickMenuItem={(key) => {
                          const nextKey = String(key);

                          if (nextKey.startsWith('vregion:')) {
                            const [, vregion] = nextKey.split(':');
                            updateGroupSelection(group.label, { vregion });
                            return;
                          }

                          const [, vregion, vdc] = nextKey.split(':');
                          updateGroupSelection(group.label, { vregion, vdc });
                        }}
                      >
                        {group.vregions.map((item) =>
                          item.vdcs.length > 0 ? (
                            <Menu.SubMenu key={`submenu:${group.label}:${item.name}`} title={item.name}>
                              {item.vdcs.map((vdc) => (
                                <Menu.Item key={`vdc:${item.name}:${vdc}`}>{vdc}</Menu.Item>
                              ))}
                            </Menu.SubMenu>
                          ) : (
                            <Menu.Item key={`vregion:${item.name}`}>{item.name}</Menu.Item>
                          ),
                        )}
                      </Menu>
                    }
                    key={group.label}
                    onVisibleChange={(visible) => setOpenMenuGroup(visible ? group.label : null)}
                    popupVisible={openMenuGroup === group.label}
                    position="bl"
                    trigger="click"
                  >
                    {tabButton}
                  </Dropdown>
                );
              })}
            </div>
          </div>
        </div>

        <div className="global-frame-actions">
          <button className="square-action" type="button">
            <img src={starIcon} alt="" />
          </button>
          <button className="gray-action" type="button">
            一致性治理
          </button>
          <button className="blue-action" type="button">
            多区域变更
            <img src={changeDownIcon} alt="" />
          </button>
          <button className="square-action" type="button">
            <img src={moreIcon} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
}

function SchemeThreeGlobalViewFrame({ groups }: { groups: GlobalGroup[] }) {
  const defaultActiveGroupLabel = groups.find((group) => group.label === 'CN')?.label ?? groups[0]?.label ?? '';
  const defaultActiveGroup = getGroupByLabel(groups, defaultActiveGroupLabel);
  const [activeGroup, setActiveGroup] = useState(defaultActiveGroupLabel);
  const [groupSelections, setGroupSelections] = useState<Record<string, GroupSelection>>(() => buildDefaultGroupSelections(groups));
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [panelGroupLabel, setPanelGroupLabel] = useState(defaultActiveGroupLabel);
  const [panelVregionName, setPanelVregionName] = useState(() => getDefaultGroupSelection(defaultActiveGroup).vregion);

  useEffect(() => {
    const nextDefaultGroup = getGroupByLabel(groups, defaultActiveGroupLabel);
    const nextDefaultSelection = getDefaultGroupSelection(nextDefaultGroup);
    setActiveGroup(defaultActiveGroupLabel);
    setGroupSelections(buildDefaultGroupSelections(groups));
    setIsSelectorOpen(false);
    setPanelGroupLabel(defaultActiveGroupLabel);
    setPanelVregionName(nextDefaultSelection.vregion);
  }, [defaultActiveGroupLabel, groups]);

  const activeGroupData = getGroupByLabel(groups, activeGroup);
  const activeSelection = groupSelections[activeGroup] ?? getDefaultGroupSelection(activeGroupData);
  const triggerLabel = formatSelectionPath(activeGroupData, activeSelection);

  const panelGroupData = getGroupByLabel(groups, panelGroupLabel);
  const showVregionPanel = panelGroupLabel !== '全球视图';
  const panelSelection = groupSelections[panelGroupLabel] ?? getDefaultGroupSelection(panelGroupData);
  const panelVregion =
    panelGroupData.vregions.find((item) => item.name === panelVregionName)
    ?? panelGroupData.vregions.find((item) => item.name === panelSelection.vregion)
    ?? panelGroupData.vregions[0];

  const commitSelection = (groupLabel: string, nextSelection: GroupSelection) => {
    setActiveGroup(groupLabel);
    setGroupSelections((currentSelections) => ({
      ...currentSelections,
      [groupLabel]: nextSelection,
    }));
    setPanelGroupLabel(groupLabel);
    setPanelVregionName(nextSelection.vregion);
    setIsSelectorOpen(false);
  };

  return (
    <section className="global-view-frame scheme-three">
      <div className="global-view-content">
        <div className="global-view-main">
          <CompactBreadcrumb />

          <div className="site-selector-row">
            <span className="site-selector-label">视图：</span>
            <Dropdown
              droplist={
                <div
                  className="site-selector-panel"
                  onClick={(event) => event.stopPropagation()}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  <div className="site-selector-panel-body">
                    <div className="site-selector-col site-selector-col-site">
                      <div className="site-selector-panel-header">站点</div>
                      <div className="site-selector-list">
                        {groups.map((group) => {
                          const isSelected = group.label === panelGroupLabel;
                          const siteTag = siteTagMap[group.label];
                          const hasSiteChildren = group.label !== '全球视图';
                          return (
                            <button
                              className={`site-selector-item ${isSelected ? 'selected' : ''}`}
                              key={group.label}
                              type="button"
                              onClick={() => {
                                if (!hasSiteChildren) {
                                  commitSelection(group.label, getDefaultGroupSelection(group));
                                  return;
                                }

                                const nextSelection = groupSelections[group.label] ?? getDefaultGroupSelection(group);
                                setPanelGroupLabel(group.label);
                                setPanelVregionName(nextSelection.vregion);
                              }}
                            >
                              <span className="site-selector-item-main">
                                <img src={group.icon} alt="" />
                                <span>{group.label}</span>
                                {siteTag ? <span className="site-selector-item-tag">{siteTag}</span> : null}
                              </span>
                              <span className="site-selector-item-trailing">
                                {hasSiteChildren ? <span className="site-selector-item-caret">›</span> : null}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {showVregionPanel ? (
                      <div className="site-selector-col site-selector-col-vregion">
                        <div className="site-selector-panel-header">区域</div>
                        <div className="site-selector-list">
                          {panelGroupData.vregions.map((item) => {
                            const isSelected = item.name === panelVregion?.name;
                            return (
                              <button
                                className={`site-selector-item ${isSelected ? 'selected' : ''}`}
                                key={`${panelGroupLabel}-${item.name}`}
                                type="button"
                                onClick={() => {
                                  setPanelVregionName(item.name);

                                  if (item.vdcs.length === 0) {
                                    commitSelection(panelGroupLabel, { vregion: item.name });
                                  }
                                }}
                              >
                                <span className="site-selector-item-main">
                                  <span>{item.name}</span>
                                </span>
                                {item.vdcs.length > 0 ? <span className="site-selector-item-caret">›</span> : null}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}

                    {showVregionPanel && panelVregion && panelVregion.vdcs.length > 0 ? (
                      <div className="site-selector-col site-selector-col-vdc">
                        <div className="site-selector-panel-header">机房</div>
                        <div className="site-selector-list">
                          {panelVregion.vdcs.map((vdc) => (
                            <button
                              className="site-selector-item"
                              key={`${panelGroupLabel}-${panelVregion.name}-${vdc}`}
                              type="button"
                              onClick={() => {
                                commitSelection(panelGroupLabel, {
                                  vregion: panelVregion.name,
                                  vdc,
                                });
                              }}
                            >
                              <span className="site-selector-item-main">
                                <span>{vdc}</span>
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              }
              onVisibleChange={(visible) => {
                setIsSelectorOpen(visible);

                if (visible) {
                  setPanelGroupLabel(activeGroup);
                  setPanelVregionName(activeSelection.vregion);
                }
              }}
              popupVisible={isSelectorOpen}
              position="bl"
              trigger="click"
            >
              <button className={`site-selector-trigger ${isSelectorOpen ? 'open' : ''}`} type="button">
                <img src={activeGroupData.icon} alt="" />
                <span className="site-selector-trigger-text">{triggerLabel}</span>
                <img className="site-selector-trigger-caret" src={downIcon} alt="" />
              </button>
            </Dropdown>
          </div>
        </div>

        <div className="global-frame-actions">
          <button className="square-action" type="button">
            <img src={starIcon} alt="" />
          </button>
          <button className="gray-action" type="button">
            一致性治理
          </button>
          <button className="blue-action" type="button">
            多区域变更
            <img src={changeDownIcon} alt="" />
          </button>
          <button className="square-action" type="button">
            <img src={moreIcon} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
}

function getStripWidth(vregions: string[], widths: Record<string, number>, moreWidth = 0, showMore = false) {
  const tabWidth = vregions.reduce((sum, tab) => sum + (widths[tab] ?? 0), 0);
  const tabGapWidth = vregions.length > 1 ? VREGION_TAB_GAP * (vregions.length - 1) : 0;
  const moreGapWidth = showMore && vregions.length > 0 ? VREGION_TAB_GAP : 0;
  return tabWidth + tabGapWidth + (showMore ? moreWidth + moreGapWidth : 0);
}

function getLeadingVisibleVregions(
  vregions: string[],
  availableWidth: number,
  widths: Record<string, number>,
  moreWidth: number,
) {
  const visibleVregions: string[] = [];

  for (let index = 0; index < vregions.length; index += 1) {
    const tab = vregions[index];
    const willHaveHiddenTabs = index < vregions.length - 1;
    const nextVisibleVregions = [...visibleVregions, tab];
    const nextWidth = getStripWidth(nextVisibleVregions, widths, moreWidth, willHaveHiddenTabs);

    if (nextWidth <= availableWidth || visibleVregions.length === 0) {
      visibleVregions.push(tab);
      continue;
    }

    break;
  }

  return visibleVregions;
}

function getVisibleVregions(
  vregions: string[],
  activeVregion: string,
  availableWidth: number,
  widths: Record<string, number>,
  moreWidth: number,
) {
  if (availableWidth <= 0 || vregions.length === 0) {
    return { visibleVregions: vregions, hiddenVregions: [] as string[] };
  }

  if (getStripWidth(vregions, widths) <= availableWidth) {
    return { visibleVregions: vregions, hiddenVregions: [] as string[] };
  }

  const leadingVisibleVregions = getLeadingVisibleVregions(vregions, availableWidth, widths, moreWidth);

  if (leadingVisibleVregions.includes(activeVregion)) {
    return {
      visibleVregions: leadingVisibleVregions,
      hiddenVregions: vregions.filter((tab) => !leadingVisibleVregions.includes(tab)),
    };
  }

  const activeIndex = vregions.indexOf(activeVregion);
  let nextVisibleVregions = [...leadingVisibleVregions.slice(0, -1), activeVregion];

  while (getStripWidth(nextVisibleVregions, widths, moreWidth, true) > availableWidth && nextVisibleVregions.length > 1) {
    nextVisibleVregions.splice(nextVisibleVregions.length - 2, 1);
  }

  const nextTabAfterActive = activeIndex >= 0 ? vregions[activeIndex + 1] : undefined;

  if (nextTabAfterActive && !nextVisibleVregions.includes(nextTabAfterActive)) {
    const expandedVisibleVregions = [...nextVisibleVregions, nextTabAfterActive];
    if (getStripWidth(expandedVisibleVregions, widths, moreWidth, true) <= availableWidth) {
      nextVisibleVregions = expandedVisibleVregions;
    }
  }

  const hiddenVregions = vregions.filter((tab) => !nextVisibleVregions.includes(tab));

  return {
    visibleVregions: nextVisibleVregions,
    hiddenVregions,
  };
}

function VregionTabs({
  vregions,
  selection,
  onChange,
}: {
  vregions: VregionItem[];
  selection: GroupSelection;
  onChange: (selection: GroupSelection) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = useState(0);
  const [tabWidths, setTabWidths] = useState<Record<string, number>>({});
  const [moreWidth, setMoreWidth] = useState(0);
  const activeVregion = selection.vregion;
  const vregionNames = vregions.map((item) => item.name);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const updateWidth = () => {
      setAvailableWidth(Math.floor(stripRef.current?.getBoundingClientRect().width ?? 0));
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!measureRef.current) {
      return;
    }

    const nextTabWidths: Record<string, number> = {};
    measureRef.current.querySelectorAll<HTMLElement>('[data-vregion-name]').forEach((element) => {
      const tabName = element.dataset.vregionName;
      if (tabName) {
        nextTabWidths[tabName] = Math.ceil(element.getBoundingClientRect().width);
      }
    });

    const moreTrigger = measureRef.current.querySelector<HTMLElement>('[data-more-trigger]');
    setTabWidths(nextTabWidths);
    setMoreWidth(Math.ceil(moreTrigger?.getBoundingClientRect().width ?? 0));
  }, [selection, vregions]);

  const { visibleVregions, hiddenVregions } = useMemo(
    () => getVisibleVregions(vregionNames, activeVregion, availableWidth, tabWidths, moreWidth),
    [activeVregion, availableWidth, moreWidth, tabWidths, vregionNames],
  );

  return (
    <div className="vregion-tabs-area" ref={containerRef}>
      <div className="vregion-tab-strip" ref={stripRef}>
        {visibleVregions.map((tab, index) => {
          const item = vregions.find((vregion) => vregion.name === tab);

          if (!item) {
            return null;
          }

          const isSelected = tab === activeVregion;
          const tabContent = (
            <button
              className={`vregion-tab-button ${isSelected ? 'selected' : ''} ${index > 0 ? 'with-divider' : ''}`}
              key={tab}
              type="button"
              onClick={
                !isSelected || item.vdcs.length === 0
                  ? () => onChange(getDefaultVregionSelection(item))
                  : undefined
              }
            >
              <span>{formatVregionTabLabel(item, selection)}</span>
              {isSelected && item.vdcs.length > 0 ? <img className="vregion-tab-caret" src={downIcon} alt="" /> : null}
            </button>
          );

          if (!isSelected || item.vdcs.length === 0) {
            return tabContent;
          }

          return (
            <Dropdown
              droplist={
                <Menu
                  className="vregion-vdc-menu"
                  selectedKeys={[selection.vdc ?? item.vdcs[0]]}
                  onClickMenuItem={(key) => onChange({ vregion: item.name, vdc: String(key) })}
                >
                  {item.vdcs.map((vdc) => (
                    <Menu.Item key={vdc}>{`${item.name} / ${vdc}`}</Menu.Item>
                  ))}
                </Menu>
              }
              key={tab}
              position="bl"
              trigger="click"
            >
              {tabContent}
            </Dropdown>
          );
        })}
        {hiddenVregions.length > 0 ? (
          <Dropdown
            droplist={
              <Menu
                className="vregion-overflow-menu"
                selectedKeys={[activeVregion]}
                onClickMenuItem={(key) => {
                  const item = vregions.find((vregion) => vregion.name === String(key));
                  onChange(getDefaultVregionSelection(item));
                }}
              >
                {hiddenVregions.map((tab) => (
                  <Menu.Item key={tab}>{tab}</Menu.Item>
                ))}
              </Menu>
            }
            position="br"
            trigger="click"
          >
            <button className={`more-vregion ${visibleVregions.length > 0 ? 'with-divider' : ''}`} type="button">
              更多 vregion
              <img src={downIcon} alt="" />
            </button>
          </Dropdown>
        ) : null}
      </div>

      <div className="vregion-tabs-measure" ref={measureRef} aria-hidden="true">
        {vregions.map((item, index) => (
          <span
            className={`vregion-tab-button ${item.name === activeVregion ? 'selected' : ''} ${index > 0 ? 'with-divider' : ''}`}
            data-vregion-name={item.name}
            key={item.name}
          >
            <span>{formatVregionTabLabel(item, selection)}</span>
            {item.name === activeVregion && item.vdcs.length > 0 ? <img className="vregion-tab-caret" src={downIcon} alt="" /> : null}
          </span>
        ))}
        <span className="more-vregion with-divider" data-more-trigger>
          更多 vregion
          <img src={downIcon} alt="" />
        </span>
      </div>
    </div>
  );
}

function SchemeSixVregionTabs({
  vregions,
  selection,
  onChange,
}: {
  vregions: VregionItem[];
  selection: GroupSelection;
  onChange: (selection: GroupSelection) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = useState(0);
  const [tabWidths, setTabWidths] = useState<Record<string, number>>({});
  const [moreWidth, setMoreWidth] = useState(0);
  const [openMenuTab, setOpenMenuTab] = useState<string | null>(null);
  const activeVregion = selection.vregion;
  const vregionNames = vregions.map((item) => item.name);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const updateWidth = () => {
      setAvailableWidth(Math.floor(stripRef.current?.getBoundingClientRect().width ?? 0));
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!measureRef.current) {
      return;
    }

    const nextTabWidths: Record<string, number> = {};
    measureRef.current.querySelectorAll<HTMLElement>('[data-scheme-six-vregion-name]').forEach((element) => {
      const tabName = element.dataset.schemeSixVregionName;
      if (tabName) {
        nextTabWidths[tabName] = Math.ceil(element.getBoundingClientRect().width);
      }
    });

    const moreTrigger = measureRef.current.querySelector<HTMLElement>('[data-scheme-six-more-trigger]');
    setTabWidths(nextTabWidths);
    setMoreWidth(Math.ceil(moreTrigger?.getBoundingClientRect().width ?? 0));
  }, [selection, vregions]);

  const { visibleVregions, hiddenVregions } = useMemo(
    () => getVisibleVregions(vregionNames, activeVregion, availableWidth, tabWidths, moreWidth),
    [activeVregion, availableWidth, moreWidth, tabWidths, vregionNames],
  );

  return (
    <div className="scheme-six-vregion-tabs-area" ref={containerRef}>
      <div className="global-group-tabs scheme-four scheme-six-vregion-strip" ref={stripRef}>
        {visibleVregions.map((tab) => {
          const item = vregions.find((vregion) => vregion.name === tab);

          if (!item) {
            return null;
          }

          const isSelected = tab === activeVregion;
          const tabContent = (
            <button
              className={`site-cascade-tab scheme-six-vregion-tab ${isSelected ? 'selected' : ''}`}
              key={tab}
              type="button"
              onClick={
                !isSelected || item.vdcs.length === 0
                  ? () => onChange(getDefaultVregionSelection(item))
                  : undefined
              }
            >
              <span className="site-cascade-tab-text">{formatVregionTabLabel(item, selection)}</span>
              {isSelected && item.vdcs.length > 0 ? <img className="site-cascade-tab-caret" src={downIcon} alt="" /> : null}
            </button>
          );

          if (!isSelected || item.vdcs.length === 0) {
            return tabContent;
          }

          return (
            <Dropdown
              droplist={
                <Menu
                  className="site-cascade-menu"
                  selectedKeys={[selection.vdc ?? item.vdcs[0]]}
                  onClickMenuItem={(key) => onChange({ vregion: item.name, vdc: String(key) })}
                >
                  {item.vdcs.map((vdc) => (
                    <Menu.Item key={vdc}>{`${item.name} / ${vdc}`}</Menu.Item>
                  ))}
                </Menu>
              }
              key={tab}
              onVisibleChange={(visible) => setOpenMenuTab(visible ? tab : null)}
              popupVisible={openMenuTab === tab}
              position="bl"
              trigger="click"
            >
              {tabContent}
            </Dropdown>
          );
        })}

        {hiddenVregions.length > 0 ? (
          <Dropdown
            droplist={
              <MoreVregionDropdown
                selectedKeys={[activeVregion]}
                onClickMenuItem={(key) => {
                  const item = vregions.find((vregion) => vregion.name === String(key));
                  onChange(getDefaultVregionSelection(item));
                }}
              >
                {hiddenVregions.map((tab) => (
                  <Menu.Item key={tab}>{tab}</Menu.Item>
                ))}
              </MoreVregionDropdown>
            }
            onVisibleChange={(visible) => setOpenMenuTab(visible ? 'scheme-six-more' : null)}
            popupVisible={openMenuTab === 'scheme-six-more'}
            position="bl"
            trigger="click"
          >
            <button className="site-cascade-tab scheme-four-more-tab scheme-six-vregion-tab" type="button">
              <span className="site-cascade-tab-text">更多 vregion</span>
              <img className="site-cascade-tab-caret" src={downIcon} alt="" />
            </button>
          </Dropdown>
        ) : null}
      </div>

      <div className="vregion-tabs-measure" ref={measureRef} aria-hidden="true">
        {vregions.map((item) => (
          <span
            className={`site-cascade-tab scheme-six-vregion-tab ${item.name === activeVregion ? 'selected' : ''}`}
            data-scheme-six-vregion-name={item.name}
            key={item.name}
          >
            <span className="site-cascade-tab-text">{formatVregionTabLabel(item, selection)}</span>
            {item.name === activeVregion && item.vdcs.length > 0 ? <img className="site-cascade-tab-caret" src={downIcon} alt="" /> : null}
          </span>
        ))}
        <span className="site-cascade-tab scheme-four-more-tab scheme-six-vregion-tab" data-scheme-six-more-trigger>
          <span className="site-cascade-tab-text">更多 vregion</span>
          <img className="site-cascade-tab-caret" src={downIcon} alt="" />
        </span>
      </div>
    </div>
  );
}
