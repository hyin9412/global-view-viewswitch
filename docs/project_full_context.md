# 全球控制面详情页 — 项目全量上下文记录

本文档整理了全球控制面详情页项目从启动到最终方案收敛的全部讨论记录、方案演进过程和关键决策，供前端同学快速理解项目背景和每个交互决策的来龙去脉。

- 项目仓库：`https://github.com/hyin9412/global-view-viewswitch`
- 在线预览：`https://hyin9412.github.io/global-view-viewswitch/`
- 技术栈：React 18 + TypeScript + Vite + @tod-m/materials（源力）+ Arco Design
- 最终方案交互说明详见：[final_scheme_interactions.md](./final_scheme_interactions.md)

---

## 项目时间线总览

| 阶段 | 会话主题 | 核心产出 |
| --- | --- | --- |
| 一 | 项目初始化与方案一 | 搭建项目骨架，安装源力组件，复刻线上页面 |
| 二 | 方案一精细化 | 灌入真实站点数据，响应式 Tab，更多 Vregion 下拉 |
| 三 | 方案二 | 一级 Tab 样式，Site/Vregion/VDC 合并展示，级联下拉 |
| 四 | 方案三 | 聚合 PSM 信息，面包屑级选择器，Cascader 级联面板 |
| 五 | 方案四/五/六 | 多方案探索：Vregion 粒度 Tab、管道选择器、Site 平铺 |
| 六 | 侧边栏与全局配置 | 所有方案支持侧边栏，配置面板整合 |
| 七 | 最终方案收敛 | 从方案四演进，自定义 Tab 展示，管理 PSM，响应式规则 |
| 八 | 交互文档与发布 | 补齐交互说明，响应式宽度，回填逻辑，发布 GitHub Pages |

---

## 阶段一：项目初始化与方案一

### 1.1 安装源力组件库

项目启动时首先安装了 `@tod-m/materials` 源力组件库，配置了 BNPM registry，并按规范在入口文件中引入样式：

```ts
import '@arco-design/theme-ve-o-design/css/arco.css';
import '@tod-m/materials/ve-o/es/style/index.css';
import '@tod-m/materials/es/style/index.css';
```

同时安装了 `less` 以支持 Vite 预处理源力组件的 `.less` 样式文件。

### 1.2 创建多方案切换页面

新建 HTML 页面，顶部放置方案选择器，最初为 4 个按钮式选择器（方案一至方案四），后续扩展到 6 个方案，最终收敛为「最终方案」置顶的下拉选择器。

### 1.3 方案一：复刻线上页面

方案一的核心是复刻字节云线上全球控制面详情页：

- 参考线上地址：`https://cloud.bytedance.net/rds/detail/db/global/cp_govern/overview`
- 顶部 Header 按 Figma「字节云子组件导航」还原
- 面包屑导航
- 站点切换（Site Tab）+ Vregion Tab 两级导航
- 页面内容区为 1440 基准宽度
- Alert 组件使用源力样式
- 去掉了左侧边栏（后续阶段作为可配置项加回）

### 1.4 关键样式调整

- Header 完全按 Figma `screenshot_3569_16514.png` 还原
- 方案选择器离页面留 16px
- 从 `cp_govern` 开始一级以下所有区域背景色为白色
- 面包屑到上方 Alert 的间距为 20px

---

## 阶段二：方案一精细化

### 2.1 站点数据表建立

用户提供了真实站点数据，整理为 [site_vregion_dataset.md](./site_vregion_dataset.md)：

- **CN**（7 个 Vregion）：China-East、China-Enterprise、China-HKPay、China-North、China-North6、China-Pay、China-Pay2
- **I18N-BD**（11 个 Vregion）：Asia-CIS、Asia-SaaS、Asia-SouthEastBD、Australia-SouthEastBD、Europe-WestBD（含 VDC: be2a、bddedt）、Singapore-SaaS、US-Compliance、US-EE、US-EastBD、US-TTP3、US-TTP4
- 其他站点（I18N-TT、US-TTP、US-TTPBD、EU-TTP）为原型造数
- BOE 数据从所有方案中移除
- EU-TTP 和 US-TTP 改为只有 1 个 Vregion

### 2.2 Vregion Tab 响应式宽度计算

这是方案一中讨论最密集的交互点：

**核心规则：**
- Vregion Tab 根据右侧剩余宽度决定展示几个
- 展示不下的收进「更多 Vregion」下拉
- 必须保证可见 Vregion 文字不截断（不用 `...` 省略）
- 「更多 Vregion」Tab 距离右侧有 32px 边距
- Tab 文字长度按文字自适应，左右不留多余空白

**计算逻辑演进：**
1. 初版按固定数量裁切
2. 用户反馈「更多 Vregion」不应固定贴右，应根据实际宽度计算
3. 修正为：结合每个 Tab 的真实渲染宽度做动态计算
4. 优先保证当前选中的 Vregion 可见
5. 「更多 Vregion」入口本身始终完整展示，不被挤压

### 2.3 更多 Vregion 下拉

- 点击「更多 Vregion」弹出下拉菜单
- 展示当前选中 Site 下展示不下的 Vregion
- 下拉带有下拉箭头 icon
- 选中某个 Vregion 后，该 Vregion 回填到外层可见 Tab 区域
- 回填是展示层调整，不改写常驻配置顺序
- I18N-BD 等 Vregion 较多的站点会出现「更多 Vregion」

### 2.4 Tab 样式对齐 Figma

- Site 和 Vregion Tab 间距 16px
- Vregion Tab 之间间距参考 Figma `screenshot_3581_21950.png`（Tabs 选项卡）
- Vregion 项与右侧分割线之间留 16px
- 视图详情和下方 Tab 间距 16px
- 视图详情区域样式参考 Figma `screenshot_3581_21588.png`（Frame 1321315411），并去掉下方的视图 Tab

---

## 阶段三：方案二

### 3.1 方案二核心思路

方案二将 Site / Vregion / VDC 三级合并到一个 Tab 中展示：

- 当前选中的 Tab 展示 `Site / Vregion`，有 VDC 时展示 `Site / Vregion / VDC`
- 点击 Tab 弹出下拉菜单选择 Vregion
- 如果 Vregion 下有 VDC，则出级联下拉菜单
- 如果一个 Site 里只有 1 个 Vregion，点击后自动回填，不出下拉
- 全球视图点击后不出下拉，不切换
- 全球视图 Tab 文字不加 `/Global`

### 3.2 一级 Tab 样式还原

方案二的 Tab 样式经过多轮调整，最终对齐 Figma 一级选项卡（L1 Tab）：

- **未选中 Tab**：有底色，左上右上有圆角，整个有描边（参考 `screenshot_3585_33406.png`）
- **选中 Tab**：底色白色，左上右上圆角，下方没有描边（参考 `screenshot_3585_33416.png`）
- 不同 Tab 之间无额外分割线
- Tab 下方有一条贯通的分割线
- 第一个选项底部的线贯通到左侧空白，最后一个选项底部的线贯通到右侧空白
- 选中 Tab 底部没有线，营造选中 Tab 与内容区连通的视觉效果

### 3.3 级联下拉

- 级联面板里不需要带 Vregion 名称（因为是在当前 Vregion Tab 下展开 VDC）
- 分割线处理：方案一 Tab 到分割线 12px，方案二 Tab 到分割线 0px，方案三选择器到分割线 20px

---

## 阶段四：方案三

### 4.1 方案三核心思路

方案三整体复用方案一的布局骨架，但有三处关键不同：

1. **视图详情简化为「聚合 X 个 PSM」**：放在面包屑同行，样式参考 Figma `screenshot_3586_36168.png`（Frame 2147239878）
2. **Tab 改为选择器**：固定文字「视图：」+ 无边框选择器，展示 `site / vregion / VDC` 格式
3. **级联下拉菜单**：参考 `bytecloud-regionselection-demo` 项目方案一样式，数据使用 site_vregion_dataset.md

### 4.2 聚合 X 个 PSM

- 位置：面包屑右侧，与面包屑垂直居中对齐
- 面包屑到聚合 PSM 信息的距离为 8px
- Hover 出 Popover，展示 PSM 和对应的 Vregion 列表
- Popover 两列：PSM 列、Vregion 列
- 两列宽度各 240px，容器宽度自适应加宽
- PSM 值和 Vregion 值中间间距留宽
- 不允许文字飘出容器
- Popover 底部有「管理 PSM」入口（后续在最终方案中深化）

### 4.3 选择器样式

- 选择器文字字号 18px，字重 500（初版为 12px，后按 Figma 调整）
- 选择器回填右侧 icon 大小 16×16
- 展开下拉菜单中，表示下一级的 icon 颜色为 `@color-fill-2`
- 全球视图选项无下级
- 没有 VDC 的 Vregion 不展开 VDC 面板
- Hover 选择器时文字变蓝
- 下拉菜单选中项文字变蓝且字重 500
- icon 与右侧文字间距 6px，文字与向下 icon 间距 8px
- 「视图」字号、颜色与 Figma 对齐
- 「视图」文字到下方间距 20px

### 4.4 级联下拉面板

按 Figma `screenshot_3586_55443.png`（Cascader 级联选择）还原：

- 每列菜单宽度 258px
- 站点列 Tag 和文字间距 6px
- Tag 文案映射：
  - `I18N-TT` → `TT 国际站`
  - `US-TTP` → `TT 美国合规站`
  - `EU-TTP` → `TT 欧洲合规站`
- 标题行高度和选项间距按 Figma 还原
- 面包屑和视图区域有背景色，底部有分割线

### 4.5 间距细节

- 面包屑和聚合 PSM 信息垂直居中
- `div` 到下方分割线 20px
- `span` 和 Title 对齐（参考 `screenshot_3586_36213.png`）
- `div` 到 `section` 间距为 0
- `div` 高度自适应
- 视图到底部间距确认为 20px

---

## 阶段五：方案四、五、六

### 5.1 方案四

方案四与方案二非常像，但每个 Tab 直接展示 Vregion 粒度信息：

- 不展示 Site 文字信息
- 如果 Vregion 下有多个 VDC，点击 Tab 出下拉展示 VDC 供选择
- 最多展示 8 个 Vregion（无侧边栏 7 个，有侧边栏 6 个），其余收进「更多 Vregion」
- 选中后的展示逻辑和交互与方案一一致，但 Tab 样式保持方案四风格
- Tab 之间间距 8px

### 5.2 方案五

方案五与方案一类似，但 Site 切换改为两个管道选择器：

- 一个是「全球视图」
- 另一个把所有 Site 收在一个 Tab 里，点击出下拉菜单查看具体 Site
- Tab 宽度根据回填文字自适应，右侧不要过多留白

### 5.3 方案六

方案六结合了方案三和方案一的特点：

- 面包屑旁边加和方案三一样的「聚合 PSM」信息
- 原本视图详情位置改成 Site 切换，Site 全部平铺
- 下方是 Vregion 切换，用一级 Tab 样式（和方案四一样）
- 展示选中 Site 下的 Vregion
- Site 切换换成和方案一中 Vregion 切换一样的样式，但不需要有「更多」收起来
- 一级 Tab 下方要有贯通线（参考方案二的线处理）

### 5.4 侧边栏支持

在所有方案中增加了「是否有侧边栏」配置：

- 有侧边栏时，在页面 Header 下方左侧加一个侧边栏
- 侧边栏样式参考 Figma `screenshot_3594_59693.png`（一级导航）
- 侧边栏宽度 200px
- 侧边栏与 Header 下现有内容左右布局，中间无空隙

### 5.5 数据清理

- 全球视图不细分 Vregion/VDC
- 截图中不应出现的 Vregion（如造数中与真实数据冲突的）从所有方案中移除
- BOE 数据从数据表里去掉

---

## 阶段六：自定义 Tab 展示与配置面板

### 6.1 自定义 Tab 展示弹窗

- 弹窗标题：「自定义 Tab 展示」
- 摘要文案：`已选 X/Y 个 Vregion`
- 两列展示全部 Vregion，每项含 checkbox、site icon、Vregion 名称
- 底部按钮：「恢复默认」、「取消」、「保存」
- 勾选上限与当前屏宽下外层可见上限一致
- 内容块最大高度 474px，超出后白框内部纵向滚动

### 6.2 恢复默认按钮状态

关键交互规则：

- 弹窗刚打开、用户未做任何调整时，「恢复默认」按钮置灰
- 只有当用户调整后与默认状态不一致时，按钮才 enable
- 「一致」的判断包括勾选项一致 AND 展示顺序一致
- 只要勾选项或顺序任一发生变化，按钮恢复可点击

### 6.3 全选清空保护

- 如果用户把所有 checkbox 都取消，「保存」按钮禁用
- Hover 禁用按钮时出现黑色 Tooltip，提示「至少选择1个Vregion」

### 6.4 配置面板整合

后续将所有配置项整合到一个配置框中：

- 配置内容标题
- 方案选择改为下拉选择，默认选中「最终方案」
- 数据模式（复杂数据/简单数据）改为管道式 Tab 切换
- 有无侧边栏改为管道式 Tab 切换
- 「编辑视图 archive」改为「展示编辑视图 archive」，去掉 icon
- 增加交互说明 markdown 文件入口，点击新开浏览器 Tab 打开 GitHub 上的 markdown 文件

---

## 阶段七：最终方案收敛

最终方案从方案四演进而来，综合了各方案的优点。核心决策包括：

### 7.1 导航层级

- 「全球视图」固定在最左侧，作为全局入口和回退入口
- 常驻 Vregion Tab 平铺展示
- 超出的 Vregion 收进「更多 Vregion」
- VDC 切换前置到 Vregion Tab 内（点击已激活的有 VDC 的 Tab 直接弹出 VDC 选择）

### 7.2 管理 PSM 弹窗

- 唯一主入口在「聚合 X 个 PSM」浮层底部
- 表格列：PSM、Site、Vregion、VDC、操作
- Site/Vregion 列用线性 Tag，超出折叠为 `+N`
- VDC 列用数字徽标，hover 查看明细
- 底部按钮根据数据复杂度区分：
  - 复杂数据：取消、保存并自定义 Tab 展示、保存
  - 简单数据：取消、保存

### 7.3 响应式规则

以 1440 为设计基准，侧边栏宽度 200px：

| 整体屏宽 | 有侧边栏时右侧有效宽度 |
| --- | --- |
| 1280 | 1080 |
| 1440 | 1240 |
| 1920 | 1720 |

| 屏宽 | 无侧边栏常驻数 | 有侧边栏常驻数 |
| --- | --- | --- |
| 1280 | 6 个 | 5 个 |
| 1440 | 7 个 | 6 个 |
| 1920 | 9 个 | 8 个 |

### 7.4 屏宽变化处理

- 从小屏切到大屏：露出更多常驻项
- 从大屏切到小屏：已配置常驻项不删除，超出的自动收纳到「更多 Vregion」，并给出 Message 提示「当前屏宽下仅展示前 N 个常驻项」

### 7.5 默认进入状态

- 默认优先选中 CN
- 没有 CN 则退到第一个可用分组
- 每个分组默认选中第一个 Vregion
- 有 VDC 则默认取第一个 VDC
- 从列表页进入详情页时默认激活当前已选中的 Vregion

### 7.6 列表-详情页一致性

- 列表页继续保持按 Site 聚合逻辑
- 从列表进入详情时默认激活当前选中的 Vregion
- 当用户配置的常驻 Vregion 与当前站点不匹配时，系统自动将当前站点对应的 Vregion 调整到外层首位

---

## 阶段八：交互文档与发布

### 8.1 交互说明文档

创建了 [final_scheme_interactions.md](./final_scheme_interactions.md)，从产品视角和设计视角完整描述最终方案交互，包含：

- 设计目标与页面心智
- 聚合 PSM 信息及浮层
- 管理 PSM 弹窗
- 全球视图与 Vregion Tab 切换
- 更多 Vregion 下拉
- 自定义 Tab 展示弹窗
- 响应式规则与屏宽变化反馈

文档后续补充了：
- 有侧边栏时右侧屏幕宽度计算（不同屏宽分别减 200）
- 「恢复默认」按钮置灰规则
- 点击「更多 Vregion」回填到 Tab 的交互
- 回填内容较长时重新计算宽度，保证「更多 Vregion」Tab 完整展示

### 8.2 Bug 修复

- 修复了本地 4176 端口打开空白页的问题
- 修复了「更多 Vregion」回填交互丢失的问题
- 验证了本地与远程版本一致性

### 8.3 发布

- 代码推送到 GitHub `main` 分支
- `dist/` 目录发布到 `gh-pages` 分支
- 生产环境 `base` 配置为 `/global-view-viewswitch/` 以适配 GitHub Pages 子路径

---

## 附录：技术实现要点

### 数据结构

站点数据定义在 [siteVregionDataset.ts](../src/siteVregionDataset.ts)，包含：

```ts
interface SiteGroup {
  site: string;
  icon: string;
  vregions: Array<{
    name: string;
    vdcs?: string[];
  }>;
}
```

聚合 PSM 数据硬编码在 `App.tsx` 中，当前有 2 个 PSM：
- `cp_govern`：覆盖 CN 全部 7 个 Vregion + Asia-CIS、Asia-SaaS、Asia-SouthEastBD、Australia-SouthEastBD
- `toutiao.mysql.cp_govern_read`：覆盖 Europe-WestBD、Singapore-SaaS、US-Compliance、US-EE、US-EastBD、US-TTP3、US-TTP4、US-WestBD、Europe-CentralBD

### 关键常量

- `VREGION_TAB_GAP = 16`：最终方案 Vregion Tab 间距
- `SCHEME_FOUR_TAB_GAP = 8`：方案四 Tab 间距
- `FINAL_SCHEME_RESPONSIVE_PINNED_VREGIONS`：响应式常驻数量断点
- 侧边栏宽度固定 200px

### 组件来源

- `Alert`、`Message`、`Modal`、`Tooltip`：来自 `@tod-m/materials/ve-o`
- `Button`、`Drawer`、`Dropdown`、`Menu`、`Popover`、`Table`、`Tag`：来自 `@arco-design/web-react`
- 图标：内联 SVG，存放在 `.figma/image/` 目录
