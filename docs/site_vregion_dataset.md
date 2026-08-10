# Site / Vregion / VDC 数据表

这份数据表用于后续给不同方案灌入统一的站点数据。

约定：

- `CN`、`I18N-BD` 按用户本轮提供的数据整理。
- 其他站点沿用当前原型中的造数。
- `vdc_list` 为空时记为 `-`。
- 当前只有 `I18N-BD / Europe-WestBD` 明确给出了 VDC：`be2a`、`bddedt`。

## 站点汇总

| site | 数据来源 | vregion_count | 备注 |
| --- | --- | ---: | --- |
| 全球视图 | 现有原型造数 | 4 | 全局聚合视图 |
| CN | 用户提供 | 7 | 与图1一致 |
| BOE | 现有原型造数 | 3 | 临时造数 |
| I18N-BD | 用户提供 | 11 | 与图2一致，且 `Europe-WestBD` 下有 VDC |
| I18N-TT | 现有原型造数 | 3 | 临时造数 |
| US-TTP | 现有原型造数 | 1 | 临时造数 |
| US-TTPBD | 现有原型造数 | 3 | 临时造数 |
| EU-TTP | 现有原型造数 | 1 | 临时造数 |

## 明细数据表

| site | vregion | vdc_list | 数据来源 | 备注 |
| --- | --- | --- | --- | --- |
| 全球视图 | Global | - | 现有原型造数 | 全局入口 |
| 全球视图 | China-East | - | 现有原型造数 |  |
| 全球视图 | US-EastBD | - | 现有原型造数 |  |
| 全球视图 | Europe-WestBD | - | 现有原型造数 |  |
| CN | China-East | - | 用户提供 | 图1 |
| CN | China-Enterprise | - | 用户提供 | 图1 |
| CN | China-HKPay | - | 用户提供 | 图1 |
| CN | China-North | - | 用户提供 | 图1 |
| CN | China-North6 | - | 用户提供 | 图1 |
| CN | China-Pay | - | 用户提供 | 图1 |
| CN | China-Pay2 | - | 用户提供 | 图1 |
| BOE | Boe-North | - | 现有原型造数 | 临时造数 |
| BOE | Boe-East | - | 现有原型造数 | 临时造数 |
| BOE | Boe-South | - | 现有原型造数 | 临时造数 |
| I18N-BD | Asia-CIS | - | 用户提供 | 图2 |
| I18N-BD | Asia-SaaS | - | 用户提供 | 图2 |
| I18N-BD | Asia-SouthEastBD | - | 用户提供 | 图2 |
| I18N-BD | Australia-SouthEastBD | - | 用户提供 | 图2 |
| I18N-BD | Europe-WestBD | be2a, bddedt | 用户提供 | 图2，且该 vregion 下有 VDC |
| I18N-BD | Singapore-SaaS | - | 用户提供 | 图2 |
| I18N-BD | US-Compliance | - | 用户提供 | 图2 |
| I18N-BD | US-EE | - | 用户提供 | 图2 |
| I18N-BD | US-EastBD | - | 用户提供 | 图2 |
| I18N-BD | US-TTP3 | - | 用户提供 | 图2 |
| I18N-BD | US-TTP4 | - | 用户提供 | 图2 |
| I18N-TT | Asia-SouthEastBD | - | 现有原型造数 | 临时造数 |
| I18N-TT | Australia-SouthEastBD | - | 现有原型造数 | 临时造数 |
| I18N-TT | Singapore-SaaS | - | 现有原型造数 | 临时造数 |
| US-TTP | US-TTP3 | - | 现有原型造数 | 临时造数 |
| US-TTPBD | US-EastBD | - | 现有原型造数 | 临时造数 |
| US-TTPBD | US-EE | - | 现有原型造数 | 临时造数 |
| US-TTPBD | US-WestBD | - | 现有原型造数 | 临时造数 |
| EU-TTP | Europe-WestBD | - | 现有原型造数 | 临时造数 |

## 后续灌数建议

如果后面要直接灌到页面方案里，推荐优先按下面这个层级使用：

1. `site`
2. `vregion`
3. `vdc_list`

也就是说：

- site Tab 用 `site`
- vregion Tab / 下拉用 `vregion`
- 二级下钻或附加标签用 `vdc_list`
