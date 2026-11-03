# 祀 · 雨荷青玉：原生接入测试候选

版本0.1.0-native.1，素材冻结自preview.25。**私有、供本人原生DSH试装验收；不是Stable，也不是原生观感已经通过。**

此包注册独立DSH插件dsh-si-rain-jade和媒体路由，保留真实DSH消息、模型选择、输入框与流式更新，不加载预览虚构聊天。六场景昼夜静态，荷塘/窗榻/铺卷六段动态各标准/极清；其余场景回退静态。设置入口位于右下“祀·外观”。当前原生布局由宿主决定，不能承诺与隔离HTML预览逐像素一致。

## 安装与回退

需要Node22.19或24+和DSH desktop0.2.1-rc.5格式的desktop profile。先保存任务并完全退出DSH（含托盘）。解压到保留不动的目录，双击Install.cmd；成功后自己启动DSH。

安装前可运行`node tools/manage.mjs install`只读查看计划。安装备份profile的package.json/cordis.patch.yml，将插件副本复制到用户DSH目录下独立si-rain-jade目录，不覆盖其他皮肤文件。会追加禁用其他ui-skin条目以避免叠加。

需要回退时完全退出DSH，双击Rollback.cmd或Uninstall.cmd。只有profile及插件链接仍符合安装后的记录时，才恢复安装前两个文件的原始字节；发现后续编辑会拒绝覆盖，显示备份位置供处理。此保守保护可能拒绝宿主自动归一化后发生变化的文件，遇到此情况先保留备份，不手工删除其他皮肤。

跨目录/指定测试profile：`node tools/manage.mjs install --dsh-home "测试DSH目录" --profile isolated --apply`；此目录必须已有支持格式的profile。不要指向别人的配置，不在运行中的DSH下应用。

## 实测与待验收

输入53项哈希核对，原图/视频未修改；本轮测试覆盖媒体Range/HEAD与隔离profile安装、重复安装、冲突保护和精确回退。浏览器原生DOM契约夹具仅是模拟回归，不能代替真实DSH加载、模型切换、原生发送/停止和流式验收。官方DSH0.2.1-rc.5独立Web宿主已加载，12个昼夜/质量动态组合实际播放、专注暂停与刷新恢复通过；当前桌面profile的最终外观待用户试装；没有发真实模型消息，也未更改用户在用profile。

请先核对SHA256，再试装。验证昼夜、三组动态与质量切换、其他三组静态回退、专注/后台暂停、设置重启保留；再确认原生侧栏、输入及选择器没有遮挡。异常可先退出后回退，提供宿主版本、操作与错误信息，不发送凭据或私人聊天截图。

专属角色会话、TTS与额外动态不随本候选启用，不启动任何18745服务。媒体只用于此私有个人验收，角色素材公开再分发权利未核实；代码/上游MIT不覆盖角色美术。上游玻璃参考与许可在packages/skin/docs/THIRD-PARTY.md和licenses中保留。

请下载Release完整ZIP，GitHub Source code ZIP不含大体积媒体。源码构建需先从完整ZIP取得packages/skin/assets。
