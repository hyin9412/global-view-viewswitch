# 最终方案交互说明

本文档从产品视角和设计视角描述“最终方案”页面的核心交互，目标是让产品、设计、研发在不额外查代码的前提下，对页面行为达成一致理解。

## 总结

本次最终方案的主要优化点如下：

- 优化 `Vregion Tab` 数量过多时的展示方式：
  - 外层保留高频常驻项，低频项收纳进 `更多 Vregion`
  - 在保证操作效率的同时，避免外部导航信息过载
- 去除原“视图详情”中与面包屑、Tab 大量重复的信息：
  - 页面主视图只保留高价值信息
  - 信息层级更清晰，用户能更快理解当前资源聚合了哪些 `PSM`
- 优化 `管理 PSM` 的核心交互语义：
  - 原本“移除一条 PSM + Vregion + VDC 粒度数据”实际对应的是“移除整个 PSM”，交互理解成本较高
  - 现统一按 `PSM` 维度管理，并提升了 `Site / Vregion / VDC` 信息密度
- 将高频查看链路和低频配置链路拆开：
  - 页面主路径聚焦在 `全球视图`、常驻 `Vregion Tab` 和 `更多 Vregion`
  - 配置相关能力收敛到 `管理 PSM` 和 `自定义 Tab 展示`
- 将 `VDC` 切换前置到 `Vregion Tab` 内：
  - 如果当前 `Vregion` 下存在 `VDC`，用户可直接在当前 Tab 上展开并切换
  - 减少先切 `Vregion`、再进二级区域选择的层级跳转成本
- `自定义 Tab 展示` 的配置结果按 `PSM` 生效：
  - 当前全球控制面不存储个人维度配置
  - 因此该能力表达的是按聚合 `PSM` 维度定义外层常驻展示方式
- 常驻数量与屏宽和布局模式联动：
  - 不同屏宽、是否有侧边栏，会影响当前外层可露出的常驻数量
  - 从大屏切到小屏时，超出的常驻项自动收纳到 `更多 Vregion`，并给出明确提示

本文档覆盖以下交互模块：

- 顶部 `聚合 X 个 PSM` 信息及其浮层
- `管理 PSM` 弹窗
- 页面 `全球视图` 与 `Vregion Tab` 的切换逻辑
- `更多 Vregion` 下拉交互
- `自定义 Tab 展示` 弹窗交互

## 一、设计目标

最终方案希望解决两个问题：

1. 让用户在主视图中快速切换最常用的 `Vregion`
2. 让用户随时理解当前页面背后关联了哪些聚合 `PSM`，并能继续做配置调整

因此页面把交互拆成两层：

- 第一层是高频导航：`全球视图`、常驻 `Vregion Tab`、`更多 Vregion`
- 第二层是配置管理：`管理 PSM`、`自定义 Tab 展示`

页面默认优先服务“查看和切换”，把“配置”收在轻量浮层和弹窗里，避免主路径过重。

## 二、页面整体交互心智

用户进入最终方案页面后，会先看到两类信息：

- 顶部的聚合信息：当前是“聚合了多少个 PSM”
- 下方的导航信息：当前可直接切换哪些 `Vregion`

对应的操作路径是：

1. 先通过顶部聚合信息理解当前资源的抽象归属
2. 再通过下方 Tab 切换到具体 `Vregion`
3. 如果外部 Tab 不够用，可从 `更多 Vregion` 中补充查看
4. 如果希望调整外部常驻 Tab，则进入 `自定义 Tab 展示`
5. 如果希望查看或维护聚合 PSM 与 Vregion 的关系，则进入 `管理 PSM`

## 三、聚合 X 个 PSM

### 3.1 展示方式

- 展示位置：页面顶部面包屑右侧
- 文案格式：`聚合 X 个 PSM`
- `X` 表示当前聚合 PSM 的数量
- 无论当前聚合的是 `1` 个还是多个 `PSM`，外部统一显示为 `聚合 X 个 PSM`
- 用户通过 hover 查看聚合明细，不在外部直接展开具体 `PSM` 名称

这个信息的作用不是做页面主导航，而是做“关系说明”和“配置入口”。

### 3.2 触发方式

- 鼠标 hover 在 `聚合 X 个 PSM` 上时，出现浮层

之所以使用 hover，是为了保持顶部区域信息轻量，不增加额外点击成本。

### 3.3 浮层内容

浮层分为三部分：

1. 表头
   - `PSM`
   - `Vregion`
2. 内容区
   - 每一行展示一个聚合 PSM
   - 左侧是 PSM 名称
   - 右侧是该 PSM 关联的全部 Vregion
3. 底部操作入口
   - `管理 PSM`

### 3.4 用户价值

这个浮层回答两个问题：

- 当前页面到底聚合了哪些 PSM
- 每个 PSM 负责哪些 Vregion

用户无需跳转页面，就能快速理解聚合关系。

### 3.5 后续动作

- 点击浮层底部 `管理 PSM`
- 打开 `管理 PSM` 弹窗

## 四、管理 PSM

### 4.1 打开入口

`管理 PSM` 的唯一主入口在 `聚合 X 个 PSM` 的浮层底部。

这符合产品路径：先看聚合关系，再进入管理。

### 4.2 弹窗目标

这个弹窗的核心目标不是做复杂编辑器，而是让用户：

- 快速看清当前已添加了哪些 PSM
- 看清这些 PSM 覆盖了哪些 Site / Vregion / VDC
- 在一个统一的表格里做后续配置动作

其中 `添加 PSM`、`移除`、`保存` 的行为语义与线上保持一致，本方案不额外改动这部分产品逻辑，重点在于统一信息组织方式和配置入口。

### 4.3 弹窗结构

弹窗标题：`管理 PSM`

弹窗内容由两部分组成：

1. 顶部摘要区
   - 左侧：`已添加 PSM：N条`
   - 右侧：`添加 PSM`
2. 表格区
   - `PSM`
   - `Site`
   - `Vregion`
   - `VDC`
   - `操作`

弹窗底部按钮：

- 复杂数据：
  - `取消`
  - `保存并自定义 Tab 展示`
  - `保存`
- 简单数据：
  - `取消`
  - `保存`

### 4.4 表格说明

#### 4.4.1 PSM 列

- 直接展示 PSM 名称
- 作为当前行的主识别信息

#### 4.4.2 Site / Vregion 列

- 默认使用线性 Tag 方式展示
- 如果内容较多，超出后折叠为 `+N`
- `+N` hover 后，浮层展示完整内容

设计上，这里的目标不是铺满全部信息，而是“先看概览，再按需展开”。

其中 `+N` 使用 action 风格的小 Tag：

- 白底
- 细描边
- 圆角
- hover 时描边和数字变为 `@primary-6`

#### 4.4.3 VDC 列

- 如果没有 VDC，显示 `-`
- 如果存在 VDC，则显示数字徽标
- hover 后弹出明细浮层，查看每个 Vregion 对应的 VDC 列表

这个数字徽标承担的是“提示有多少个 VDC”而不是直接展示全部名称，因此视觉保持紧凑。

#### 4.4.4 操作列

- 当前展示为 `移除`
- 操作列固定在右侧，便于横向滚动时仍然可操作

### 4.5 按钮行为

#### 不同数据模式下的按钮规则

| 数据模式 | 底部按钮 |
| --- | --- |
| 复杂数据 | `取消`、`保存并自定义 Tab 展示`、`保存` |
| 简单数据 | `取消`、`保存` |

设计意图是：

- 复杂数据下，用户更可能需要继续进入 `自定义 Tab 展示` 做外层导航配置，因此保留串联入口
- 简单数据下，配置链路更轻，`管理 PSM` 完成后只保留确认关闭动作，避免多余分支

#### 取消

- 关闭弹窗
- 不修改当前页面展示

#### 保存

- 关闭弹窗
- 当前作为确认动作存在

#### 保存并自定义 Tab 展示

- 仅在复杂数据下出现
- 先关闭 `管理 PSM`
- 再打开 `自定义 Tab 展示`

这个路径的产品意图是：
用户完成 PSM 管理后，通常下一步就是同步调整外部常驻的 `Vregion Tab`，因此提供直达入口。

## 五、全球视图与 Vregion Tab

### 5.1 页面导航层级

页面导航分成两层理解：

1. `全球视图`
   - 代表聚合态视角
2. `Vregion Tab`
   - 代表具体区域视角

`全球视图` 固定在最左侧，承担全局入口角色；其他 `Vregion Tab` 承担具体查看和切换角色。

### 5.2 外层 Tab 展示规则（响应式）

最终方案下，外层 `Vregion Tab` 的展示遵循“当前屏宽下优先平铺，放不下再收纳”的规则。

#### 展示原则

- 当 `Vregion` 总数 `<=` 当前屏宽下的外层可见上限时：
  - 页面直接平铺展示
  - 不出现 `更多 Vregion`
- 当 `Vregion` 总数 `>` 当前屏宽下的外层可见上限时：
  - 页面展示 `全球视图 + 常驻 Vregion Tab + 更多 Vregion`
  - 超出的 `Vregion` 收纳到 `更多 Vregion` 中

同时，最终展示并不只按“数量上限”裁切，还会结合每个 Tab 的真实渲染宽度做二次计算：

- `全球视图` 会占用固定一段展示宽度
- 当前激活项如果文案更长，例如展示为 `Vregion / VDC`，会按实际宽度参与计算
- `更多 Vregion` 入口本身也会预留完整展示空间

因此在同一档屏宽下，如果当前回填或激活的 `Vregion` 文案更长，外层可直接露出的其他 Tab 数量可能进一步减少，但 `更多 Vregion` 入口本身不会被挤压或截断。

#### 1440 设计基准下的响应式规则

有侧边栏场景下，右侧主内容区的有效宽度按“当前屏宽 - 200”计算，也就是默认预留 `200px` 给左侧边栏。

对应到本方案里的几个关键屏宽，右侧有效宽度分别为：

| 整体屏宽 | 有侧边栏时右侧有效宽度 |
| --- | --- |
| `1280` | `1080` |
| `1440` | `1240` |
| `1920` | `1720` |

下表中的“有侧边栏”常驻数量判断，均基于上述右侧有效宽度。

| 屏宽 | 无侧边栏 | 有侧边栏 |
| --- | --- | --- |
| `1280` | `全球视图 + 6 个常驻 Vregion Tab + 更多 Vregion` | `全球视图 + 5 个常驻 Vregion Tab + 更多 Vregion` |
| `1440` | `全球视图 + 7 个常驻 Vregion Tab + 更多 Vregion` | `全球视图 + 6 个常驻 Vregion Tab + 更多 Vregion` |
| `1920` | `全球视图 + 9 个常驻 Vregion Tab + 更多 Vregion` | `全球视图 + 8 个常驻 Vregion Tab + 更多 Vregion` |

对应的当前屏宽下“用户可新增/调整到的最大常驻数量”也与上表保持一致：

| 屏宽 | 无侧边栏 | 有侧边栏 |
| --- | --- | --- |
| `1280` | `1-6` 个 | `1-5` 个 |
| `1440` | `1-7` 个 | `1-6` 个 |
| `1920` | `1-9` 个 | `1-8` 个 |

#### 屏宽变化时的处理策略

- 当前屏宽下，用户能新增到的最大常驻数量，等于当前外层可见上限
- 从小屏切到大屏：
  - 外层可见数量上限变大
  - 页面会露出更多已配置的常驻项
  - 用户也可以继续补充新的常驻项
- 从大屏切到小屏：
  - 已配置的常驻列表不被静默删除
  - 页面仅展示前 `N` 个常驻项
  - 其余已配置的常驻项自动收纳到 `更多 Vregion`
  - 页面直接给出 Message 提示：`当前屏宽下仅展示前 N 个常驻项`

这种处理方式保证：

- 配置本身不丢失
- 页面当前展示仍与当前屏宽能力匹配
- 用户能明确感知“哪些常驻项是因为空间不足被收纳”，而不是误以为配置消失

#### 默认常驻 Vregion 的排序逻辑

默认常驻 `Vregion` 不要求用户手动调整，而是按照区域全局用量排序：

- 大区域优先前置，例如：华北、华东
- 小区域后置
- 默认排序的目标是覆盖多数用户的高频访问场景

因此在默认状态下，外层常驻 Tab 更像是一组“系统推荐的高频区域”，用户如有个性化需求，再通过 `自定义 Tab 展示` 调整。

### 5.3 默认进入状态

页面初始化后：

- 默认优先选中 `CN`
- 如果没有 `CN`，则退到第一个可用分组
- 每个分组默认选中自己的第一个 `Vregion`
- 若该 `Vregion` 带有 `VDC`，则默认取第一个 `VDC`
- 从列表页进入详情页时，默认激活当前已选中的 `Vregion`，与现有列表-详情页链路保持一致

这样可以保证页面初始状态稳定，不会出现“进入页面但无明确选中项”的情况。

### 5.4 列表-详情页一致性

为保证用户从列表进入详情页时的认知连续性，本方案延续现有列表页逻辑，不额外为了详情页交互改造列表侧的数据组织方式：

- 列表页继续保持现有按 `Site` 聚合的逻辑，不因详情页方案调整而改动
- 从列表进入详情页时，默认激活当前已选中的 `Vregion`，与现有逻辑一致
- 当用户当前按 `PSM` 配置的外层常驻 `Vregion` 与当前站点不匹配时：
  - 系统会自动将当前站点对应的 `Vregion` 调整到外层首位
  - 以保证用户落到详情页后，第一眼仍能看到与当前上下文一致的区域入口

### 5.5 全球视图交互

- `全球视图` Tab 固定展示
- 点击后，页面回到聚合视角
- 不再细分到某个具体 `Vregion`

从产品视角看，`全球视图` 是一个“总入口”和“回退入口”。

### 5.6 常驻 Vregion Tab 交互

外部直接展示的 `Vregion Tab` 是“常驻 Tab”。

点击规则：

- 如果该 Tab 当前未激活：
  - 点击后切换到该 `Vregion`
- 如果该 Tab 当前已激活，且该 `Vregion` 没有 `VDC`：
  - 不出现二级选择
- 如果该 Tab 当前已激活，且该 `Vregion` 有 `VDC`：
  - Tab 右侧展示下拉箭头
  - 点击后直接在当前 Tab 上弹出 `VDC` 选择菜单
  - 选择后更新当前视图

这里的设计目标，是把 `VDC` 切换尽量收敛在当前 Tab 这一层完成：

- 用户不需要再进入额外的二级面板或更深层级做切换
- 当前在哪个 `Vregion` 下切换 `VDC`，上下文更明确
- 对高频查看场景来说，交互路径更短，认知负担更低

### 5.7 页面标题联动

页面资源标题会随当前选中的 `Vregion` 联动变化。

设计意图是：
用户切换到哪个 `Vregion`，页面就同步告诉用户它当前归属哪个聚合 `PSM`，从而保证“Tab 导航”和“资源归属”认知一致。

## 六、更多 Vregion

### 6.1 出现逻辑

当可展示的外部 Tab 数量有限时，其余 `Vregion` 收纳进 `更多 Vregion（N）`。

其中：

- `N` 表示当前被收纳的 `Vregion` 数量

### 6.2 下拉内容

下拉中展示被收纳的全部 `Vregion`：

- 展示站点 icon
- 展示 `Vregion` 名称

### 6.3 选择行为

点击某个 `Vregion` 后：

- 下拉关闭
- 页面切换到该 `Vregion`
- 当前上下文同步更新
- 当前选中的 `Vregion` 会优先回填到外层可见 Tab 区域，方便用户继续在主导航中往返切换
- 这个“回填”是展示层调整，不等于改写 `自定义 Tab 展示` 中保存的常驻配置顺序

如果回填后的目标项文案较长，页面会重新按真实宽度计算外层可见项：

- 优先保证当前选中的 `Vregion` 可见
- 同时保证 `更多 Vregion` 入口完整展示
- 放不下的其他项继续收纳在 `更多 Vregion` 中

设计上，这里更像“补充导航”而不是“编辑入口”。

### 6.4 固定底部入口

下拉底部固定一个入口：`自定义 Tab 展示`

这个入口和普通 `Vregion` 项目的语义不同：

- 上方列表用于“切换查看”
- 底部入口用于“配置展示”

这样用户不会把“切换”与“配置”混淆在同一层级里。

## 七、自定义 Tab 展示

### 7.1 产品目标

这个弹窗的目标是让用户配置：

- 哪些 `Vregion` 需要常驻展示在外部 Tab 栏

它解决的是“外部 Tab 位不够，但用户希望保留自己的高频项”这个问题。

### 7.2 打开方式

有两个入口：

1. `更多 Vregion` 下拉底部的 `自定义 Tab 展示`
2. `管理 PSM` 弹窗底部的 `保存并自定义 Tab 展示`

### 7.3 弹窗结构

弹窗标题：`自定义 Tab 展示`

内容区包含两部分：

1. 摘要文案
   - `已选 X/Y 个 Vregion`
2. 白框内容区
   - 两列展示全部 `Vregion`
   - 每项包含 checkbox、site icon、`Vregion` 名称

底部按钮：

- `恢复默认`
- `取消`
- `保存`

### 7.4 勾选规则

#### 默认勾选

- 当前已经展示在外部 Tab 栏的 `Vregion`，默认勾选

#### 选择上限

- 当前屏宽下，最多可勾选到“当前外层可见上限”
- 具体上限与第五章中的响应式规则保持一致

这与外层常驻 Tab 的展示上限保持一致，避免出现“用户设置为常驻，但当前页面外层无法展示”的理解偏差。

#### 超过上限

- 当已达到上限时，未勾选项变为不可选状态
- 如果用户是在更大屏宽下已经配置了更多常驻项，后续在更小屏宽下打开弹窗：
  - 已有的超上限勾选不会被自动取消
  - 但当前屏宽下不再允许继续新增超过上限的勾选项

### 7.5 保存规则

#### 恢复默认

- 恢复到系统默认推荐的常驻 `Vregion` 列表
- 当当前勾选结果已经与系统默认推荐列表完全一致时，`恢复默认` 按钮置灰
- 这里的“一致”不仅包括勾选项一致，也包括展示顺序一致
- 只要当前勾选项或顺序任一发生变化，`恢复默认` 按钮恢复可点击

#### 取消

- 关闭弹窗
- 不修改当前外部 Tab 栏

#### 保存

- 将当前勾选结果回填到外部 Tab 栏
- 外部 Tab 栏展示顺序同步更新
- 若当前已配置数量超过当前屏宽上限，则页面只展示前 `N` 个，剩余部分进入 `更多 Vregion`

### 7.6 异常与禁用反馈

如果用户把所有 checkbox 都取消：

- `保存` 按钮禁用
- hover 到禁用按钮上时，出现黑色 Tooltip
- 提示文案：`至少选择1个Vregion`

这条规则的产品目的是保证页面至少保留一个具体 `Vregion` 入口，避免用户把外部导航全部清空。

### 7.7 屏宽变化反馈

当用户从大屏切到小屏，且当前已配置的常驻数量超过当前屏宽上限时：

- 页面直接出现源力 Message
- 提示文案为：`当前屏宽下仅展示前 N 个常驻项`
- 其余常驻项不丢失，而是自动收纳到 `更多 Vregion`

这条反馈的目的是告诉用户：

- 配置仍然存在
- 只是当前屏宽下外层展示位不足
- 如需调整，可进入 `自定义 Tab 展示` 重新收敛常驻项

### 7.8 滚动与可视范围

摘要文案 `已选 X/Y 个 Vregion` 与下方白框视为一个整体内容块。

该内容块：

- 最大高度为 `474px`
- 超出后，白框内部纵向滚动

这样可以保证：

- 摘要信息始终可见
- 白框内部内容可滚动
- 底部按钮区不会被内容挤出弹窗外

## 八、前端实现要点

本节为前端研发补充实现层面的关键信息，与上述产品规则一一对应。

### 8.1 技术栈

- React 18 + TypeScript + Vite
- UI 组件库：`@tod-m/materials`（源力）+ `@arco-design/web-react`
- 样式引入顺序：
  ```ts
  import '@arco-design/theme-ve-o-design/css/arco.css';
  import '@tod-m/materials/ve-o/es/style/index.css';
  import '@tod-m/materials/es/style/index.css';
  ```

### 8.2 数据结构

站点数据结构定义在 `src/siteVregionDataset.ts`：

```ts
interface VregionItem {
  name: string;
  vdcs?: string[];
}

interface SiteGroup {
  site: string;
  icon: string;
  vregions: VregionItem[];
}
```

数据区分两种模式：
- `simpleSiteGroups`：简单数据模式
- `siteGroups`：复杂数据模式

完整站点明细见 [site_vregion_dataset.md](./site_vregion_dataset.md)。

### 8.3 聚合 PSM 数据

当前原型中聚合 PSM 数据为硬编码，实际由后端接口返回：

```ts
const AGGREGATED_PSMS = [
  {
    name: 'cp_govern',
    vregions: [
      'China-East', 'China-Enterprise', 'China-HKPay',
      'China-North', 'China-North6', 'China-Pay', 'China-Pay2',
      'Asia-CIS', 'Asia-SaaS', 'Asia-SouthEastBD', 'Australia-SouthEastBD',
    ],
  },
  {
    name: 'toutiao.mysql.cp_govern_read',
    vregions: [
      'Europe-WestBD', 'Singapore-SaaS', 'US-Compliance', 'US-EE',
      'US-EastBD', 'US-TTP3', 'US-TTP4', 'US-WestBD', 'Europe-CentralBD',
    ],
  },
];
```

`VREGION_TO_PSM` 是一个 `Map<string, string>`，用于根据当前 Vregion 反查所属 PSM，实现页面标题联动。

### 8.4 响应式关键常量

```ts
const VREGION_TAB_GAP = 16;

const FINAL_SCHEME_RESPONSIVE_PINNED_VREGIONS = [
  { minWidth: 1920, withSidebar: 8, withoutSidebar: 9 },
  { minWidth: 1440, withSidebar: 6, withoutSidebar: 7 },
  { minWidth: 0,    withSidebar: 5, withoutSidebar: 6 },
];
```

- 侧边栏宽度固定为 `200px`
- 右侧有效宽度 = `window.innerWidth - 200`（有侧边栏时）
- Tab 宽度计算使用 `useRef` + `getBoundingClientRect()` 获取真实渲染宽度，不能仅按字符数估算
- 当前激活项如果文案为 `Vregion / VDC` 格式，需按实际宽度参与计算
- `更多 Vregion` 入口本身预留完整展示空间，不参与截断

### 8.5 宽度计算流程

1. 获取容器可用宽度
2. 依次减去「全球视图」Tab 宽度、「更多 Vregion」入口宽度
3. 遍历常驻 Vregion 列表，累加每个 Tab 的真实宽度 + 间距
4. 当累加宽度超过剩余空间时停止，后续 Tab 收纳进「更多 Vregion」
5. 如果当前激活项不在可见区域内，优先保证激活项可见（可能替换掉最后一个可见常驻项）

### 8.6 更多 Vregion 回填逻辑

- 从下拉中选中一个被收纳的 Vregion 后，该 Vregion 在外层可见
- 回填是展示层调整，不修改 `自定义 Tab 展示` 中保存的常驻配置顺序
- 如果回填后文案较长导致空间不足，重新执行宽度计算
- 放不下的其他项继续收纳，「更多 Vregion」入口始终完整展示

### 8.7 屏宽变化监听

使用 `window.addEventListener('resize', ...)` 监听：

- 重新计算可见常驻数量
- 如果从大屏切到小屏导致已配置常驻项超出上限：
  - 不删除配置
  - 超出部分自动收纳
  - 调用源力 `Message.info('当前屏宽下仅展示前 N 个常驻项')`

### 8.8 管理 PSM 弹窗按钮规则

- 弹窗根据当前数据模式（简单/复杂）决定底部按钮
- 复杂数据：`取消` + `保存并自定义 Tab 展示` + `保存`
- 简单数据：`取消` + `保存`
- 「保存并自定义 Tab 展示」：先关闭管理 PSM 弹窗，再打开自定义 Tab 展示弹窗

### 8.9 自定义 Tab 展示勾选规则

- 勾选上限 = 当前屏宽下外层可见上限（与响应式常量一致）
- 达到上限后，未勾选项 `disabled`
- 如果用户在更大屏宽下配置了超上限项，切到小屏打开弹窗时：
  - 已有超上限勾选不自动取消
  - 但当前屏宽下不允许继续新增
- 全部取消勾选时，「保存」按钮 `disabled`，hover 出 Tooltip 提示「至少选择1个Vregion」

### 8.10 恢复默认按钮状态

- 判断「当前状态是否与默认一致」需要同时比较：
  1. 勾选项集合是否一致
  2. 展示顺序是否一致
- 弹窗刚打开时，缓存默认状态作为比较基准
- 任意勾选项或顺序变化后，按钮恢复可点击
- 点击「恢复默认」后，状态回到默认，按钮重新置灰

### 8.11 默认选中逻辑

- 页面初始化默认选中 `CN` 站点
- 无 `CN` 时取第一个可用 Site
- 每个 Site 默认选中第一个 Vregion
- Vregion 有 VDC 时默认取第一个 VDC
- 从列表页跳转过来时，读取 URL 参数中的 `x-global-vregion` 和 `x-global-vdc` 作为初始选中值

### 8.12 VDC 内联切换

- 点击未激活的 Vregion Tab：正常切换 Vregion
- 点击已激活的、无 VDC 的 Vregion Tab：无反应
- 点击已激活的、有 VDC 的 Vregion Tab：弹出 VDC 选择菜单
- 菜单位置锚定在当前 Tab 正下方
- 选中 VDC 后更新视图，Tab 文案变为 `Vregion / VDC`

### 8.13 组件映射

| 交互元素 | 组件来源 |
| --- | --- |
| Alert（顶部提示） | `@tod-m/materials/ve-o` |
| Message（屏宽提示） | `@tod-m/materials/ve-o` |
| Modal（管理 PSM、自定义 Tab 展示） | `@tod-m/materials/ve-o` |
| Tooltip（禁用按钮提示） | `@tod-m/materials/ve-o` |
| Button | `@arco-design/web-react` |
| Dropdown（更多 Vregion、VDC 选择） | `@arco-design/web-react` |
| Popover（聚合 PSM 浮层） | `@arco-design/web-react` |
| Table（管理 PSM 表格） | `@arco-design/web-react` |
| Tag（Site/Vregion 标签） | `@arco-design/web-react` |

### 8.14 已知边界与注意事项

- 全球控制面当前不存储个人维度配置，`自定义 Tab 展示` 的结果按聚合 PSM 维度生效
- `+N` 折叠 Tag 使用白底细描边圆角样式，hover 时描边和数字变为 `@primary-6`
- VDC 数字徽标只展示数量，不直接展示名称
- 管理 PSM 表格操作列固定在右侧，横向滚动时仍可操作
- 图标全部使用内联 SVG，不引用第三方图标库

## 九、视觉样式规范

本章从源码中提取最终方案各模块的精确样式值，供前端还原参考。所有颜色优先使用 CSS 变量（源力 Token），括号内为降级 Hex 值。

### 9.1 全局设计 Token

#### 字体

```
font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif;
```

#### 颜色 Token 对照

| Token 名称 | Hex 值 | 用途 |
| --- | --- | --- |
| `--Primary-Color-primary-6` | `#1664FF` | 主色、选中态文字、链接、按钮 |
| `--Primary-Color-primary-5` | `#4080FF` | 主色 hover 态 |
| `--Text-color-text-1` | `#0C0D0E` | 一级文字、标题 |
| `--Text-color-text-2` | `#42464E` | 二级文字、正文 |
| `--color-text-2` | `#4E5969` | 三级文字、辅助说明 |
| `--color-text-3` | `#86909C` | 占位符、禁用文字 |
| `--color-fill-2` | `#C9CDD4` | 图标次级色、分割线 |
| `--Line-color-border-2` | `#EAEDF1` | 边框、分割线 |
| `--color-border-2` | `#EAEDF1` | 边框、分割线 |
| `--Background-color-bg-4` | `#F6F8FA` | 表头背景、Tag 背景、Tab 未选中背景 |
| `--color-bg-4` | `#F6F8FA` | 表头背景、Tag 背景 |
| `--color-bg-white` | `#FFFFFF` | 白色背景 |
| `--danger-6` | `#F53F3F` | 移除按钮、错误色 |
| `--color-fill-4` | `#737A87` | 面包屑次级文字 |
| `--color-fill-3` | `#80858C` | 表头标签文字 |

#### 字号与字重

| 层级 | 字号 | 字重 | 行高 | 用途 |
| --- | --- | --- | --- | --- |
| 页面标题 | 16px | 500 | 24px | 资源名称 |
| 区块标题 | 14px | 500/600 | 22px | 配置区标题、Card 标题 |
| 正文 | 13px | 400 | 22px | Tab 文字、表格内容、菜单项 |
| 正文强调 | 13px | 500 | 22px | 选中 Tab、按钮文字 |
| 辅助文字 | 12px | 400 | 20px | 面包屑、Popover 内容、Tag |
| 辅助强调 | 12px | 500 | 20px | Popover 表头、数字徽标 |

---

### 9.2 聚合 X 个 PSM（面包屑区域）

#### 容器

- 类名：`.breadcrumb-compact-row`
- 布局：`inline-flex`，垂直居中
- 子元素间距：4px（`column-gap: 4px`）

#### 面包屑文字

- 类名：`.breadcrumb-line`
- 字号：12px
- 字重：500
- 颜色：`#42464E`
- 行高：20px
- 字间距：0.04px

面包屑中分隔符使用 `<i>` 元素：
- 宽 1px，高 12px
- 背景色 `#42464E`
- 左右 margin 12px
- 旋转 30°（模拟斜线）

面包屑中次级文字（`.muted`）：
- 颜色：`#737A87`
- 字重：400

#### 分隔横线

- 类名：`.breadcrumb-aggregate-dash`
- 颜色：`#737A87`
- 字号：12px

#### 「聚合 X 个 PSM」触发文字

- 类名：`.breadcrumb-aggregate`
- 字体：PingFang SC 字体栈
- 字号：12px
- 字重：400
- 颜色：`#737A87`
- 行高：20px
- cursor：`pointer`

其中数字部分（`<strong>`）：
- 颜色：`#737A87`
- 字号：12px
- 字重：500
- 文字装饰：underline（下划线）

#### 使用组件

- **Popover**：来自 `@arco-design/web-react`
- 触发方式：`trigger="hover"`
- 弹出位置：`position="bottom"`
- 外层包裹类名：`.aggregate-psm-popover-wrapper`

---

### 9.3 聚合 PSM 浮层（Popover）

#### 浮层容器

- 类名：`.aggregate-psm-popover-wrapper .arco-popover-content`
- 宽度：532px（最大 `calc(100vw - 32px)`）
- 内边距：12px 16px
- box-sizing：border-box

#### 两列网格

- 类名：`.aggregate-psm-popover-header` / `.aggregate-psm-popover-row`
- 布局：CSS Grid
- 列定义：`grid-template-columns: minmax(0, 240px) minmax(0, 240px)`
- 列间距：20px（`column-gap: 20px`）
- 两列各占 240px

#### 表头

- 类名：`.aggregate-psm-popover-header`
- 下边框：1px solid `#EAEDF1`
- 下内边距：8px
- 颜色：`#80858C`
- 字号：12px
- 行高：20px
- 字间距：0.04px

#### 内容区

- 类名：`.aggregate-psm-popover-body`
- 布局：flex column
- 行间距：8px（`row-gap: 8px`）
- 上内边距：8px

#### 数据行

- 类名：`.aggregate-psm-popover-row`
- 布局：grid（与表头同列定义）
- 对齐：`align-items: flex-start`

PSM 名称 / Vregion 列表文字：
- 类名：`.aggregate-psm-name` / `.aggregate-psm-vregions`
- 颜色：`#42464E`
- 字号：12px
- 行高：20px
- 字间距：0.04px
- 换行：`white-space: normal; overflow-wrap: anywhere; word-break: break-word`

#### 底部「管理 PSM」按钮

- 类名：`.aggregate-psm-popover-edit`
- 上外边距：12px
- 边框：0
- 背景：transparent
- 内边距：0
- 颜色：`var(--Primary-Color-primary-6, #1664FF)`
- 字号：12px
- 行高：20px
- cursor：pointer
- Hover 颜色：`var(--Primary-Color-primary-5, #4080FF)`

按钮内部：
- 类名：`.edit-entry-content`
- 布局：inline-flex，居中
- 间距：6px（icon 与文字之间）

设置图标：
- 类名：`.edit-entry-icon`
- 尺寸：16×16px

---

### 9.4 Vregion Tab 切换

#### Tab 栏容器

- 类名：`.global-group-tabs.scheme-four`（最终方案复用此样式）
- 布局：flex
- 子元素间距：8px（`column-gap: 8px`）
- 宽度：100%
- 溢出：`overflow-x: auto`（最终方案实际由 JS 控制可见性，不出现滚动条）
- 背景：transparent
- 内边距：0
- 圆角：0

#### 单个 Tab（未选中）

- 类名：`.global-view-frame.scheme-final .site-cascade-tab`
- 布局：inline-flex，垂直居中
- 内边距：7px 16px
- 边框：none
- 圆角：4px 4px 0 0
- 背景：`var(--color-bg-4, #F6F8FA)`
- 颜色：`var(--color-text-2, #4E5969)`
- 字号：13px
- 字重：400
- 行高：22px
- 字间距：0.04px
- cursor：pointer
- 边框效果通过 `box-shadow inset` 实现：
  ```
  box-shadow:
    inset 0 1px 0 var(--color-border-2, #EAEDF1),
    inset -1px 0 0 var(--color-border-2, #EAEDF1),
    inset 1px 0 0 var(--color-border-2, #EAEDF1);
  ```

#### 单个 Tab（Hover）

- 背景：保持 `var(--color-bg-4, #F6F8FA)`
- 颜色：`var(--Primary-Color-primary-6, #1664FF)`

#### 单个 Tab（选中）

- 类名追加：`.selected`
- 内边距：7px 16px
- 背景：transparent
- 颜色：`var(--Primary-Color-primary-6, #1664FF)`
- 字重：500
- 顶部蓝色指示条：`inset 0 2px 0 #006EFF`
- 底部白色遮罩线（覆盖容器分割线）：
  ```
  ::after {
    position: absolute;
    left: 1px;
    bottom: 0;
    width: calc(100% - 2px);
    height: 1px;
    background: var(--color-bg-white, #fff);
  }
  ```

#### 全球视图 Tab

与普通 Tab 样式一致，但永远是可点击的切换入口，不显示下拉箭头。

#### Tab 内站点图标

- 尺寸：16×16px
- 圆角：100px（圆形）
- 选中时尺寸仍为 16×16px

#### Tab 文字

- 类名：`.site-cascade-tab-text`
- 溢出：`text-overflow: ellipsis; white-space: nowrap`

选中态时文字颜色和字重继承父级（蓝色，500）。

#### VDC 下拉箭头

- 类名：`.site-cascade-tab-caret`
- 尺寸：12×12px
- 左边距：6px
- 仅在 Tab 已选中且该 Vregion 有 VDC 时显示

#### Tab 下方分割线

最终方案 Tab 栏下方有一条贯通分割线：
- 通过 `.global-view-content` 的 `::after` 伪元素或容器 border 实现
- 颜色：`#EAEDF1`
- 高度：1px
- 选中 Tab 通过底部白色 `::after` 遮罩断开该线，营造连通效果

---

### 9.5 更多 Vregion 下拉菜单

#### 触发按钮

- 类名：`.site-cascade-tab.scheme-four-more-tab`
- 与普通 Tab 样式一致
- 右内边距：12px（比普通 Tab 少 4px）
- 文字格式：`更多 Vregion（N）`
- 始终显示下拉箭头（12×12px，左边距 4px）

#### 使用组件

- **Dropdown**：来自 `@arco-design/web-react`
- 触发方式：`trigger="click"`
- 弹出位置：`position="br"`（底部右对齐）
- 下拉菜单使用 Arco `Menu` 组件

#### 下拉面板

- 类名：`.scheme-four-overflow-dropdown`
- 最小宽度：220px
- 背景：`#FFFFFF`
- 圆角：4px
- 溢出：hidden

#### 可滚动区域

- 类名：`.scheme-four-overflow-scroll`
- 最大高度：`calc(36px * 5.5)`（约 5.5 个菜单项高度）
- 溢出：`overflow-y: auto`

#### 菜单项

- 类名：`.scheme-four-overflow-item`
- 布局：flex，垂直居中
- 子元素间距：6px
- 宽度：100%

站点图标：
- 尺寸：16×16px
- 圆角：100px

Vregion 名称：
- 字号：13px
- 溢出省略：`text-overflow: ellipsis; white-space: nowrap`
- 颜色继承 Arco Menu 默认样式

选中项：
- 由 Arco Menu `selectedKeys` 控制
- 文字变蓝，字重 500

#### 底部「自定义 Tab 展示」入口

- 类名：`.scheme-four-overflow-edit`
- 宽度：100%
- 内边距：9px 12px
- 边框：0
- 上边框：1px solid `#EAEDF1`
- 背景：`#FFFFFF`
- 颜色：`var(--Primary-Color-primary-6, #1664FF)`
- 字号：13px
- 字重：500
- 行高：22px
- 字间距：0.04px
- 文本对齐：left
- cursor：pointer
- Hover：背景保持白色，颜色变为 `var(--Primary-Color-primary-5, #4080FF)`

---

### 9.6 VDC 内联选择菜单

- **Dropdown** 组件，`position="bl"`（底部左对齐）
- 菜单类名：`.site-cascade-menu`
- 最小宽度：220px
- 使用 Arco `Menu`，`selectedKeys` 绑定当前选中的 VDC
- 菜单项为纯文字（VDC 名称），字号 13px

---

### 9.7 管理 PSM 弹窗

#### 弹窗容器

- **Modal** 组件：来自 `@tod-m/materials/ve-o`
- 类名：`.manage-psm-modal`
- 宽度：`min(600px, calc(100vw - 32px))`，maxWidth 600px
- 最大高度：612px
- 布局：flex column（使内容区可滚动）
- 标题：「管理 PSM」（使用 Modal 默认 title 样式）
- 遮罩点击关闭：`maskClosable`

#### 内容区

- 类名：`.manage-psm-modal .arco-modal-content`
- 内边距：0 24px 24px
- 背景：`#FFFFFF`
- 溢出：`overflow-y: auto`
- flex：1（占满剩余高度）

#### 顶部摘要栏

- 类名：`.edit-view-psm-header`
- 布局：flex，两端对齐
- 垂直居中

左侧「已添加 PSM：N条」：
- 类名：`.edit-view-psm-count`
- 颜色：`#42464E`
- 字号：13px
- 字重：500
- 行高：22px
- margin：0

右侧「添加 PSM」按钮：
- 类名：`.edit-view-add-psm`
- 布局：inline-flex，居中
- 间距：8px（icon 与文字）
- 边框：0
- 背景：transparent
- 内边距：0
- 颜色：`var(--Primary-Color-primary-6, #1664FF)`
- 字号：13px
- 字重：500
- 行高：22px
- cursor：pointer

加号图标：
- 类名：`.edit-view-add-psm-icon`
- 尺寸：18×18px
- 圆角：50%
- 背景：`rgba(22, 100, 255, 0.12)`
- 字号：14px
- 行高：18px
- 文字居中

#### 数据表格

- **Table** 组件：来自 `@arco-design/web-react`
- 类名：`.edit-view-psm-table`
- 属性：`borderCell`（带单元格边框）、`pagination={false}`、`scroll={{ x: 980 }}`
- 圆角：4px
- 背景：白色

表头：
- 背景：`var(--Background-color-bg-4, #F6F8FA)`
- 表头/单元格字号：13px

列宽定义：

| 列 | 宽度 | 说明 |
| --- | --- | --- |
| PSM | 200px | 纯文字 |
| Site | 220px | 线性 Tag 组 |
| Vregion | 300px | 线性 Tag 组 |
| VDC | 120px | 数字徽标 |
| 操作 | 72px | `fixed: 'right'` |

#### 线性 Tag（Site / Vregion 列）

- 类名：`.edit-view-linear-tag-action`
- 展示：inline-flex，居中
- 最小宽度：28px
- 高度：22px
- 内边距：0 5px
- 边框：1px solid `var(--Line-color-border-2, #EAEDF1)`
- 圆角：20px
- 背景：`#FFFFFF`
- 颜色：`var(--Text-color-text-2, #42464E)`
- 字号：13px
- 字重：500
- 行高：20px
- Hover：边框色和文字色变为 `var(--Primary-Color-primary-6, #1664FF)`
- 过渡动画：border-color 0.2s, color 0.2s

Tag 容器：
- 类名：`.edit-view-linear-tags`
- 布局：inline-flex，nowrap
- 间距：8px
- 溢出：hidden

`+N` 折叠 Popover：
- 类名：`.edit-view-linear-tags-popover`
- 最小宽度：160px，最大宽度 320px
- 布局：flex column
- 间距：4px
- 标题：12px，字重 500，颜色 `#0C0D0E`
- 条目：12px，颜色 `#42464E`，行高 20px
- z-index：4000

#### VDC 数字徽标

- 类名：`.edit-view-vdc-tag`
- 展示：inline-flex，column 方向，居中
- 最小宽度：20px
- 高度：20px
- 内边距：4px 6px
- 圆角：4px
- 背景：`var(--Background-color-bg-4, #F6F8FA)`
- cursor：pointer
- box-sizing：border-box

数字：
- 类名：`.edit-view-vdc-tag-count`
- 颜色：`var(--Fill7-1D2129-, #1D2129)`
- 字号：12px
- 字重：400
- 行高：12px

虚线装饰：
- 类名：`.edit-view-vdc-tag-line`
- 宽度：8px
- 高度：1px
- 上边框：1px dashed `#737A87`

无 VDC 时显示 `-`。

VDC 明细 Popover：
- 类名：`.edit-view-vdc-popover`
- 最小宽度：220px
- 布局：flex column
- 间距：8px
- 每行：Vregion 名称（12px，字重 500，颜色 `#0C0D0E`）+ VDC 列表（12px，颜色 `#42464E`）
- 行间距：2px

#### 移除按钮

- 类名：`.edit-view-remove-button`
- 边框：0
- 背景：transparent
- 内边距：0
- 颜色：`#F53F3F`
- 字号：13px
- 行高：22px
- cursor：pointer
- white-space：nowrap

#### 底部按钮栏

- 类名：`.manage-psm-modal-footer`
- 布局：flex，右对齐
- 间距：12px（`gap: 12px`）

按钮使用 Arco `Button`：
- 「取消」：默认样式（secondary）
- 「保存并自定义 Tab 展示」：默认样式（secondary），仅复杂数据模式显示
- 「保存」：`type="primary"`（蓝色主按钮）

---

### 9.8 自定义 Tab 展示弹窗

#### 弹窗容器

- **Modal** 组件：来自 `@tod-m/materials/ve-o`
- 类名：`.custom-tabs-modal`
- 宽度：`min(600px, calc(100vw - 32px))`，maxWidth 600px
- 最大高度：`min(612px, calc(100vh - 32px))`
- 圆角：12px
- 背景：`#FFFFFF`
- 溢出：hidden
- 标题：「自定义 Tab 展示」
- 遮罩点击关闭：`maskClosable`

#### 内容区

- 类名：`.custom-tabs-modal .arco-modal-content`
- 内边距：0 24px 24px
- 布局：flex column
- 溢出：hidden
- flex：1 1 auto

#### Body 容器

- 类名：`.custom-tabs-modal-body`
- 布局：grid
- 行定义：`grid-template-rows: auto minmax(0, 1fr)`
- 最大高度：474px
- 行间距：12px
- 溢出：hidden

#### 摘要文字

- 类名：`.custom-tabs-modal-summary`
- 文案：`已选 X/Y 个 Vregion`
- 颜色：`#42464E`
- 字号：13px
- 字重：500
- 行高：22px

#### 白框内容区

- 类名：`.custom-tabs-modal-grid`
- 布局：CSS Grid，两列
- 列定义：`grid-template-columns: repeat(2, minmax(0, 1fr))`
- 间距：12px 16px（行间距 12px，列间距 16px）
- 内边距：16px 20px
- 边框：1px solid `#EAEDF1`
- 圆角：8px
- 背景：`#FFFFFF`
- 溢出：`overflow-y: auto`
- box-sizing：border-box

#### 单个选项

- 类名：`.custom-tabs-modal-item`
- 布局：flex，垂直居中
- 高度：22px
- 内边距：0
- 颜色：`#0C0D0E`
- 字号：13px
- 行高：22px
- cursor：pointer

Checkbox：
- 原生 `<input type="checkbox">`
- 右边距：8px
- accent-color：`#1664FF`（选中色）
- 尺寸：浏览器默认

站点图标：
- 尺寸：16×16px
- 右边距：4px

禁用态：
- 类名追加：`.disabled`
- 透明度：0.48
- cursor：not-allowed

#### 底部按钮栏

- 类名：`.custom-tabs-modal-footer`
- 布局：flex，两端对齐
- 间距：12px

左侧：
- 「恢复默认」按钮：Arco Button 默认样式
- 禁用条件：勾选项和顺序与默认完全一致时 `disabled`

右侧：
- 类名：`.custom-tabs-modal-footer-actions`
- 布局：inline-flex
- 间距：12px
- 「取消」：Arco Button 默认样式
- 「保存」：Arco Button `type="primary"`
  - 禁用条件：未勾选任何 Vregion 时 `disabled`
  - 禁用时 hover 出黑色 Tooltip，提示「至少选择1个Vregion」
  - Tooltip 组件来自 `@tod-m/materials/ve-o`

---

### 9.9 页面内容区间距

最终方案页面框架的间距值：

| 位置 | 值 |
| --- | --- |
| 内容区左右内边距 | 32px |
| 内容区上内边距 | 20px |
| 内容区下内边距 | 0（Tab 栏贴底） |
| 面包屑行最小高度 | 32px |
| 面包屑与聚合 PSM 间距 | 4px |
| 面包屑行到 Tab 栏间距 | 4px（`row-gap`） |
| 全球视图/页面背景色 | `#FCFDFE` |
| 底部边框 | 1px solid `#EAEDF1` |

### 9.10 屏宽变化 Message 提示

- **Message** 组件：来自 `@tod-m/materials/ve-o`
- 类型：`Message.info`
- 文案：`当前屏宽下仅展示前 N 个常驻项`
- 位置：页面顶部，absolute 定位
- 类名：`.page-inline-message`
- z-index：1004
- 距顶部：20px
- 左右内边距：16px

### 9.11 侧边栏（可选）

- 宽度：200px（`flex: 0 0 200px`）
- 背景：`#F6F8FA`
- 右边框：1px solid `#EAEDF1`
- 导航区内边距：12px
- 菜单项高度：36px
- 菜单项内边距：7px 12px
- 菜单项字号：13px
- 菜单项颜色：`#0C0D0E`
- 选中态背景：`#1664FF14`（主色 8% 透明度）
- 选中态文字：`#1664FF`，字重 500
- 菜单项圆角：4px
- 菜单项之间间距：4px（`row-gap: 4px`）
