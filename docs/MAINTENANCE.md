# 宿主升级与兼容检查

当前目标为 Windows / DSH 0.2.2-rc.3。运行时和升级检查共用 `src/host-contract.js` 的服务、扩展位与布局标记；旧版的验收不能自动继承为新版通过。

## 日常检查

设置 → 兼容性可检查当前接口和布局，复制不含聊天正文、账户或密钥的诊断。不会自动上传或升级。

解压目录的 `Check-Compatibility.cmd` 只读取宿主代码，不执行被检查的代码。通过表示静态契约满足，不等于所有界面行为已通过。安装脚本在写入 profile 前也会检查必要接口；缺失时停止并保留现有安装。

自定义安装位置：

```powershell
node tools/check-compat.mjs --desktop "<DSH目录>/DeepSeek Harness.exe"
```

## 维护者隔离验收

测试依赖不进入皮肤运行时，普通安装无需安装它们。维护者使用 Node.js 22.19+ 或24+：

```powershell
npm ci --ignore-scripts
npm test
node tools/probe-host.mjs --desktop "<DSH目录>/DeepSeek Harness.exe" --output "<结果目录>"
```

也可先单独安装目标版本的官方CLI，再检查：

```powershell
node tools/probe-host.mjs --dsh-cli "<目标node_modules>/@deepseek-ai/dsh/lib/bin.js" --output "<结果目录>"
```

Windows 默认用已安装的 Edge，可用 `--browser chrome` 选择已有Chrome；无需额外下载浏览器。可加 `--dpr 2` 或 `--soak-seconds 300`。

脚本生成全新临时 DSH_HOME 和虚构会话，不复制个人历史或凭据，不发送模型请求。它检查原生入口、新会话、正文实际拖动、缩放、草稿与视图恢复、全局面板及诊断。结束后关闭自己启动的浏览器和宿主；临时资料和报告保留用于排查，路径写在报告中。有界观察不等于24小时或物理双屏验证。

## 维护位置

- `host-contract.js`：共享兼容契约。
- `plugin-entry.js`：官方Slot注册与生命周期。
- `pinned-entry.js`：官方侧栏HOC，保留原生新会话；收起侧栏时使用图标，不搬动宿主DOM。
- `host-adapter.js`：剩余布局识别与增量观察。
- `geometry.js`：缩放、视口与浮层计算。
- `theme-bridge.js`：官方主题覆盖与撤销。

未知核心布局撤下皮肤效果，保留原生界面。玻璃与阅读层仍有受控DOM/CSS；不能承诺任意未来宿主版本永久兼容。
