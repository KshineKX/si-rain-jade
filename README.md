# 祀 · 雨荷青玉

适用于 DeepSeek Harness 的非官方同人皮肤，通过宿主 DOM、CSS 与 JavaScript 接入。当前版本 **0.1.1**。七个场景、三档显示、动态壁纸、阅读雾层浓度调节与固定会话入口。

[下载完整安装包](https://github.com/KshineKX/si-rain-jade/releases/download/v0.1.1/Si-Rain-Jade-0.1.1.zip) · [发行说明与 SHA-256 校验](https://github.com/KshineKX/si-rain-jade/releases/tag/v0.1.1)

## 兼容范围

| 系统与宿主 | 验证情况 |
|---|---|
| Windows / DSH 0.2.2-rc.1 | 本轮开发方在官方隔离宿主及 Windows 桌面样式下实测；用户已安装并初步接受，不代表所有历史页面和全部插件逐项通过 |
| DSH 0.2.1-rc.5 | native.6 曾通过历史验收；0.1.1 保留旧语义选择器回退，本轮没有重新验证，不能保证等同于已兼容 |
| DSH 0.2.1-rc.4 | 本轮未实测 |
| macOS / Linux / 其他宿主版本 | 未验证 |

需要 **Node.js 22.19+ 或 24+**，双击脚本要求 `node` 在 PATH 中。本包不自带 Node，也未承诺自动调用 DSH 内置运行时。皮肤不升级 DSH 宿主；旧宿主用户可继续使用保留的 [native.6](https://github.com/KshineKX/si-rain-jade/releases/tag/v0.1.0-native.6)。

## 预览

下图为 native.6 历史界面示例，固定入口与三键布局保留；本版新增阅读浓度条。

![DSH 界面示例](https://raw.githubusercontent.com/KshineKX/si-rain-jade/main/docs/previews/interface.png)

### 窗榻听雨

![窗榻听雨](https://raw.githubusercontent.com/KshineKX/si-rain-jade/main/docs/previews/window-rain.png)

### 雪庭温泉

![雪庭温泉](https://raw.githubusercontent.com/KshineKX/si-rain-jade/main/docs/previews/snow-onsen.png)

## 安装、升级与回退

1. 下载上方完整 ZIP，解压到普通可写目录。GitHub 的 Source code ZIP 不包含完整运行媒体。
2. 确认 Node 可用，保存工作并完全退出 DSH（含托盘）。
3. 双击 `Install.cmd`；成功后自行启动 DSH。已有受控安装仅升级本皮肤依赖，保留其他插件配置与旧版本。
4. 要恢复时，退出 DSH 后运行 `Rollback.cmd`，回到此次安装前的皮肤版本。归属或配置冲突会拒绝覆盖。升级状态下卸载须先回退，再审阅旧版本的卸载。

默认数据目录为当前用户的 `.dsh`，默认 profile 为 `desktop`。自定义数据目录必须与实际 DSH 一致：可先设置 `DSH_HOME` 再运行脚本；也可在解压目录终端中运行下例（替换路径与 profile）：

```powershell
node tools/manage.mjs install --apply --dsh-home "你的DSH数据目录" --profile desktop
node tools/manage.mjs rollback --apply --dsh-home "你的DSH数据目录" --profile desktop
```

安装器不自动重启应用，也不迁移宿主自身的数据格式。皮肤回退不能代替 DSH 宿主降级及其数据恢复。

## 使用

- 深浅、书页、设置三个快捷键。书页依次为默认 → 专注 → 观赏（纯画面）→ 默认。
- 观赏保留背景位置和裁切，隐藏页面前景与玻璃；工具静止约 1.6 秒后淡出，移动鼠标或 Tab 唤回。键盘焦点在工具上时保持可见。Esc 优先关闭设置，再返回默认，草稿与滚动保留。
- 设置 → 阅读可调 0–100% 雾层浓度。默认/专注分别保存偏好，刷新保留；观赏隐藏雾层，浓度不增加书页档位。
- 左栏“祀 · 画境”打开已有同名目标会话；不创建或发送消息，不包含作者的会话 ID 和聊天记录。目标缺失、已归档或重名时停用。

## 动态与画质

温泉先播放约 5 秒抬腿开场，再接独立约 5 秒的翘腿微动态循环，保留水波、白气与慢雪。已修正足跟长水线、开场尾段骤暗及待机偏绿，两段统一 BT709。专注暂停当前阶段，恢复继续；切画质保留阶段。重播时先选静态，再选动态。

标准视频 1278×720，极清 3834×2160；极清是本地增强，**不属于原生 4K 生成**。温泉深浅共用雪日素材，没有独立夜景。荷塘、窗榻、小憩提供动态；桥行、掌柜、茶间为静态。共七场景、30 份运行媒体。

## 已知边界与来源

宿主结构和接口变化仍需复核。本轮修正 Windows centerCol 不透明背景，并优先识别新消息标记，保留旧语义后缀回退；不能据此承诺所有宿主版本、历史消息布局或其他插件全量兼容。

额度挂件属于另一个插件，不是本皮肤内置功能。角色服务、TTS 和头像自动导入不包含在本包中。开发方已有隔离宿主、色彩/媒体及安装证据；发布侧仅核验分发字节、构建和离线回归，不重复控制个人窗口、安装或发送模型消息。

代码 MIT，保留上游署名与许可；角色、美术和商标权利单独说明，见 [NOTICE](NOTICE.md) 与 [素材说明](packages/skin/docs/PROVENANCE.md)。非官方同人作品，不宣称官方授权或背书。

开发者从完整包取得运行媒体后，可用 `npm test` 和 `npm run build` 构建。内部审阅编号只用于本机来源追溯，不作为正式版本名称。
