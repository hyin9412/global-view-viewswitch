import datasetMarkdown from '../docs/site_vregion_dataset.md?raw';

export type SiteVregionItem = {
  name: string;
  vdcs: string[];
};

export type SiteGroup = {
  label: string;
  count?: string;
  source: string;
  note: string;
  vregions: SiteVregionItem[];
};

type SummaryRow = {
  site: string;
  数据来源: string;
  vregion_count: string;
  备注: string;
};

type DetailRow = {
  site: string;
  vregion: string;
  vdc_list: string;
  数据来源: string;
  备注: string;
};

const FALLBACK_SITE_GROUPS: SiteGroup[] = [
  {
    label: '全球视图',
    source: '现有原型造数',
    note: '全局聚合视图',
    vregions: [
      { name: 'Global', vdcs: [] },
      { name: 'China-East', vdcs: [] },
      { name: 'US-EastBD', vdcs: [] },
      { name: 'Europe-WestBD', vdcs: [] },
    ],
  },
  {
    label: 'CN',
    count: '7',
    source: '用户提供',
    note: '与图1一致',
    vregions: [
      { name: 'China-East', vdcs: [] },
      { name: 'China-Enterprise', vdcs: [] },
      { name: 'China-HKPay', vdcs: [] },
      { name: 'China-North', vdcs: [] },
      { name: 'China-North6', vdcs: [] },
      { name: 'China-Pay', vdcs: [] },
      { name: 'China-Pay2', vdcs: [] },
    ],
  },
  {
    label: 'BOE',
    count: '3',
    source: '现有原型造数',
    note: '临时造数',
    vregions: [
      { name: 'Boe-North', vdcs: [] },
      { name: 'Boe-East', vdcs: [] },
      { name: 'Boe-South', vdcs: [] },
    ],
  },
  {
    label: 'I18N-BD',
    count: '11',
    source: '用户提供',
    note: '与图2一致，且 Europe-WestBD 下有 VDC',
    vregions: [
      { name: 'Asia-CIS', vdcs: [] },
      { name: 'Asia-SaaS', vdcs: [] },
      { name: 'Asia-SouthEastBD', vdcs: [] },
      { name: 'Australia-SouthEastBD', vdcs: [] },
      { name: 'Europe-WestBD', vdcs: ['be2a', 'bddedt'] },
      { name: 'Singapore-SaaS', vdcs: [] },
      { name: 'US-Compliance', vdcs: [] },
      { name: 'US-EE', vdcs: [] },
      { name: 'US-EastBD', vdcs: [] },
      { name: 'US-TTP3', vdcs: [] },
      { name: 'US-TTP4', vdcs: [] },
    ],
  },
  {
    label: 'I18N-TT',
    count: '3',
    source: '现有原型造数',
    note: '临时造数',
    vregions: [
      { name: 'Asia-SouthEastBD', vdcs: [] },
      { name: 'Australia-SouthEastBD', vdcs: [] },
      { name: 'Singapore-SaaS', vdcs: [] },
    ],
  },
  {
    label: 'US-TTP',
    count: '3',
    source: '现有原型造数',
    note: '临时造数',
    vregions: [
      { name: 'US-TTP3', vdcs: [] },
      { name: 'US-TTP4', vdcs: [] },
      { name: 'US-Compliance', vdcs: [] },
    ],
  },
  {
    label: 'US-TTPBD',
    count: '3',
    source: '现有原型造数',
    note: '临时造数',
    vregions: [
      { name: 'US-EastBD', vdcs: [] },
      { name: 'US-EE', vdcs: [] },
      { name: 'US-WestBD', vdcs: [] },
    ],
  },
  {
    label: 'EU-TTP',
    count: '2',
    source: '现有原型造数',
    note: '临时造数',
    vregions: [
      { name: 'Europe-WestBD', vdcs: [] },
      { name: 'Europe-CentralBD', vdcs: [] },
    ],
  },
];

function extractSection(markdown: string, heading: string) {
  const startIndex = markdown.indexOf(heading);
  if (startIndex === -1) {
    return '';
  }

  const nextHeadingIndex = markdown.indexOf('\n## ', startIndex + heading.length);
  return markdown
    .slice(startIndex + heading.length, nextHeadingIndex === -1 ? undefined : nextHeadingIndex)
    .trim();
}

function parseMarkdownTable<T extends Record<string, string>>(section: string) {
  const tableLines = section
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|'));

  if (tableLines.length < 3) {
    return [] as T[];
  }

  const headers = tableLines[0]
    .split('|')
    .map((cell) => cell.trim())
    .filter(Boolean);

  return tableLines.slice(2).map((line) => {
    const values = line
      .split('|')
      .map((cell) => cell.trim())
      .filter(Boolean);

    return headers.reduce((row, header, index) => {
      row[header] = values[index] ?? '';
      return row;
    }, {} as Record<string, string>) as T;
  });
}

function parseVdcList(vdcList: string) {
  if (!vdcList || vdcList === '-') {
    return [];
  }

  return vdcList
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildSiteGroups(markdown: string) {
  const summaryRows = parseMarkdownTable<SummaryRow>(extractSection(markdown, '## 站点汇总'));
  const detailRows = parseMarkdownTable<DetailRow>(extractSection(markdown, '## 明细数据表'));

  if (summaryRows.length === 0 || detailRows.length === 0) {
    return FALLBACK_SITE_GROUPS;
  }

  const detailMap = new Map<string, SiteVregionItem[]>();
  detailRows.forEach((row) => {
    const currentRows = detailMap.get(row.site) ?? [];
    currentRows.push({
      name: row.vregion,
      vdcs: parseVdcList(row.vdc_list),
    });
    detailMap.set(row.site, currentRows);
  });

  const siteGroups = summaryRows
    .map((row) => ({
      label: row.site,
      count: row.site === '全球视图' ? undefined : row.vregion_count,
      source: row.数据来源,
      note: row.备注,
      vregions: detailMap.get(row.site) ?? [],
    }))
    .filter((group) => group.vregions.length > 0);

  return siteGroups.length > 0 ? siteGroups : FALLBACK_SITE_GROUPS;
}

export const siteGroups = buildSiteGroups(datasetMarkdown);
