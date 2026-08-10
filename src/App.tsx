import type { ReactElement } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert } from '@tod-m/materials/ve-o';
import { Dropdown, Menu, Popover } from '@arco-design/web-react';
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
import { siteGroups } from './siteVregionDataset';

const schemes = ['方案一', '方案二', '方案三', '方案四'];
const VREGION_TAB_GAP = 16;
const AGGREGATED_PSMS = [
  {
    name: 'toutiao.mysql.cp_govern_write',
    vregions: ['China-East', 'China-Enterprise', 'China-HKPay', 'China-North', 'China-North6', 'China-Pay'],
  },
  {
    name: 'toutiao.mysql.cp_govern_read',
    vregions: ['US-TTP3', 'US-TTP4'],
  },
] as const;
const AGGREGATED_PSM_COUNT = AGGREGATED_PSMS.length;

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

const globalGroups = siteGroups.map((group) => ({
  ...group,
  icon: siteIconMap[group.label as keyof typeof siteIconMap] ?? globalViewIcon,
}));

const siteTagMap: Partial<Record<(typeof globalGroups)[number]['label'], string>> = {
  CN: '中国站',
  BOE: 'BOE',
  'I18N-BD': '国际站',
  'I18N-TT': 'TT 国际站',
  'US-TTP': 'TT 美国合规站',
  'EU-TTP': 'TT 欧洲合规站',
};

export default function App() {
  const [activeScheme, setActiveScheme] = useState(schemes[0]);

  return (
    <main className="page">
      <section className="panel">
        <div className="scheme-selector" aria-label="方案选择器">
          {schemes.map((scheme) => (
            <button
              className={`scheme-button ${activeScheme === scheme ? 'active' : ''}`}
              key={scheme}
              type="button"
              onClick={() => setActiveScheme(scheme)}
            >
              {scheme}
            </button>
          ))}
        </div>

        {activeScheme === '方案一' ? <SchemeOne /> : null}
        {activeScheme === '方案二' ? <SchemeTwo /> : null}
        {activeScheme === '方案三' ? <SchemeThree /> : null}
        {activeScheme === '方案四' ? <Placeholder scheme={activeScheme} /> : null}
      </section>
    </main>
  );
}

function SchemeOne() {
  return <RdsPage viewFrame={<SchemeOneGlobalViewFrame />} />;
}

function SchemeTwo() {
  return <RdsPage viewFrame={<SchemeTwoGlobalViewFrame />} />;
}

function SchemeThree() {
  return <RdsPage viewFrame={<SchemeThreeGlobalViewFrame />} />;
}

function RdsPage({ viewFrame }: { viewFrame: ReactElement }) {
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
              <div className="resource-name">cp_govern</div>
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

function SchemeOneGlobalViewFrame() {
  const [activeGroup, setActiveGroup] = useState('CN');
  const [groupSelections, setGroupSelections] = useState<Record<string, GroupSelection>>(() => buildDefaultGroupSelections());
  const activeGroupData = globalGroups.find((group) => group.label === activeGroup) ?? globalGroups[1];
  const activeSelection = groupSelections[activeGroup] ?? getDefaultGroupSelection(activeGroupData);

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
              {globalGroups.map((group) => (
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

type GroupSelection = {
  vregion: string;
  vdc?: string;
};

function getDefaultVregionSelection(vregion?: (typeof globalGroups)[number]['vregions'][number]): GroupSelection {
  return {
    vregion: vregion?.name ?? '',
    vdc: vregion?.vdcs[0],
  };
}

function getDefaultGroupSelection(group: (typeof globalGroups)[number]): GroupSelection {
  return getDefaultVregionSelection(group.vregions[0]);
}

function getGroupByLabel(label: string) {
  return globalGroups.find((group) => group.label === label) ?? globalGroups[0];
}

function buildDefaultGroupSelections() {
  return globalGroups.reduce<Record<string, GroupSelection>>((result, group) => {
    result[group.label] = getDefaultGroupSelection(group);
    return result;
  }, {});
}

function formatGroupPath(group: (typeof globalGroups)[number], selection: GroupSelection) {
  if (group.label === '全球视图') {
    return group.label;
  }

  const segments = [group.label, selection.vregion];

  if (selection.vdc) {
    segments.push(selection.vdc);
  }

  return segments.filter(Boolean).join(' / ');
}

function getGroupCount(group: (typeof globalGroups)[number]) {
  return group.count ?? String(group.vregions.length);
}

function getSelectionMenuKey(selection: GroupSelection) {
  return selection.vdc ? `vdc:${selection.vregion}:${selection.vdc}` : `vregion:${selection.vregion}`;
}

function formatSelectionPath(group: (typeof globalGroups)[number], selection: GroupSelection) {
  if (group.label === '全球视图') {
    return group.label;
  }

  const segments = [group.label, selection.vregion];

  if (selection.vdc) {
    segments.push(selection.vdc);
  }

  return segments.filter(Boolean).join(' / ');
}

function formatVregionTabLabel(
  item: (typeof globalGroups)[number]['vregions'][number],
  selection: GroupSelection,
) {
  if (selection.vregion === item.name && selection.vdc) {
    return `${item.name} / ${selection.vdc}`;
  }

  return item.name;
}

function CompactBreadcrumb() {
  return (
    <div className="breadcrumb-compact-row">
      <div className="breadcrumb-line">
        <span>关系型数据库RDS列表</span>
        <i />
        <span className="muted">cp_govern 全球视图</span>
      </div>
      <span className="breadcrumb-aggregate-dash">-</span>
      <Popover
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

function SchemeTwoGlobalViewFrame() {
  const [activeGroup, setActiveGroup] = useState('CN');
  const [groupSelections, setGroupSelections] = useState<Record<string, GroupSelection>>(() => buildDefaultGroupSelections());
  const [openMenuGroup, setOpenMenuGroup] = useState<string | null>(null);

  const activeGroupData = globalGroups.find((group) => group.label === activeGroup) ?? globalGroups[1];
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
              {globalGroups.map((group) => {
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

function SchemeThreeGlobalViewFrame() {
  const [activeGroup, setActiveGroup] = useState('CN');
  const [groupSelections, setGroupSelections] = useState<Record<string, GroupSelection>>(() => buildDefaultGroupSelections());
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [panelGroupLabel, setPanelGroupLabel] = useState('CN');
  const [panelVregionName, setPanelVregionName] = useState(() => {
    const defaultGroup = getGroupByLabel('CN');
    return getDefaultGroupSelection(defaultGroup).vregion;
  });

  const activeGroupData = getGroupByLabel(activeGroup);
  const activeSelection = groupSelections[activeGroup] ?? getDefaultGroupSelection(activeGroupData);
  const triggerLabel = formatSelectionPath(activeGroupData, activeSelection);

  const panelGroupData = getGroupByLabel(panelGroupLabel);
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
                        {globalGroups.map((group) => {
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
  vregions: (typeof globalGroups)[number]['vregions'];
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
            position="bl"
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

function Placeholder({ scheme }: { scheme: string }) {
  return (
    <section className="content-card">
      <p className="eyebrow">当前选择</p>
      <h1>{scheme}</h1>
      <p className="description">这里可以继续放置 {scheme} 的页面内容。</p>
    </section>
  );
}
