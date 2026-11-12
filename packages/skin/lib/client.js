window.__ModuleLoader__.load({id:'dsh-si-rain-jade',factory:function(require){const exports={};
const SI_REACT=require('react'),SI_REACT_DOM=require('react-dom');
const SI_CSS="/* Palette is independent of material and day/night. Art is never recolored. */\n:root{\n --ritual-hue:151;--ritual-saturation:31%;--ritual-accent-light:#236c53;--ritual-accent-dark:#9de3b9;\n --ritual-sidebar-width:200px;--ritual-round:16px;\n}\n:root[data-ritual-palette=\"jade\"]{--ritual-hue:151;--ritual-saturation:37%;--ritual-accent-light:#236c53;--ritual-accent-dark:#9de3b9}\n:root[data-ritual-palette=\"celadon\"]{--ritual-hue:164;--ritual-saturation:19%;--ritual-accent-light:#3c7063;--ritual-accent-dark:#b5d8cd}\n:root[data-ritual-palette=\"pine\"]{--ritual-hue:138;--ritual-saturation:22%;--ritual-accent-light:#416c50;--ritual-accent-dark:#accdb5}\n:root[data-ritual-palette=\"teal\"]{--ritual-hue:179;--ritual-saturation:40%;--ritual-accent-light:#226f70;--ritual-accent-dark:#91d8d7}\n:root[data-ritual-palette=\"mist\"]{--ritual-hue:194;--ritual-saturation:25%;--ritual-accent-light:#3a697a;--ritual-accent-dark:#accfda}\n:root[data-ritual-palette=\"frost\"]{--ritual-hue:185;--ritual-saturation:10%;--ritual-accent-light:#526e70;--ritual-accent-dark:#c1d2d3}\n:root[data-ritual-tone=\"light\"]{\n color-scheme:light;--ink:hsl(var(--ritual-hue) 27% 20%);--muted:hsl(var(--ritual-hue) 15% 38%);\n --accent:var(--ritual-accent-light);--gold:hsl(var(--ritual-hue) 33% 33%);\n --surface-rgb:255 255 252;--canvas:hsl(var(--ritual-hue) 27% 96%);--native-surface:hsl(var(--ritual-hue) var(--ritual-saturation) 91%);\n --tinted-surface:hsl(var(--ritual-hue) var(--ritual-saturation) 79% / .73);--solid-surface:hsl(var(--ritual-hue) var(--ritual-saturation) 88% / .97);\n --surface-soft:hsl(var(--ritual-hue) var(--ritual-saturation) 84% / .36);--surface-deep:hsl(var(--ritual-hue) var(--ritual-saturation) 73% / .48);\n --paper:hsl(var(--ritual-hue) 27% 96% / .72);--paper-focus:hsl(var(--ritual-hue) 27% 97% / .97);\n --code:hsl(var(--ritual-hue) 30% 92% / .95);--rim:hsl(var(--ritual-hue) 50% 99% / .73);--rim-top:#ffffffd9;\n --line:hsl(var(--ritual-hue) 24% 40% / .26);--shadow:rgb(10 38 28 / .18);--active-fill:hsl(var(--ritual-hue) var(--ritual-saturation) 66% / .53);\n --glass:var(--surface-soft);--glass-strong:var(--tinted-surface);--gold-edge:var(--line);--glass-shadow:var(--shadow);--glow:#e6f7e9;\n}\n:root[data-ritual-tone=\"dark\"]{\n color-scheme:dark;--ink:hsl(var(--ritual-hue) 29% 94%);--muted:hsl(var(--ritual-hue) 17% 74%);\n --accent:var(--ritual-accent-dark);--gold:hsl(var(--ritual-hue) 30% 76%);\n --surface-rgb:18 28 25;--canvas:hsl(var(--ritual-hue) 22% 10%);--native-surface:hsl(var(--ritual-hue) var(--ritual-saturation) 15%);\n --tinted-surface:hsl(var(--ritual-hue) var(--ritual-saturation) 20% / .79);--solid-surface:hsl(var(--ritual-hue) var(--ritual-saturation) 15% / .97);\n --surface-soft:hsl(var(--ritual-hue) var(--ritual-saturation) 19% / .40);--surface-deep:hsl(var(--ritual-hue) var(--ritual-saturation) 22% / .72);\n --paper:hsl(var(--ritual-hue) 25% 10% / .74);--paper-focus:hsl(var(--ritual-hue) 25% 10% / .97);\n --code:hsl(var(--ritual-hue) 28% 13% / .96);--rim:hsl(var(--ritual-hue) 38% 83% / .37);--rim-top:#f2fff16b;\n --line:hsl(var(--ritual-hue) 25% 78% / .25);--shadow:rgb(0 13 12 / .35);--active-fill:hsl(var(--ritual-hue) var(--ritual-saturation) 41% / .58);\n --glass:var(--surface-soft);--glass-strong:var(--tinted-surface);--gold-edge:var(--line);--glass-shadow:var(--shadow);--glow:#72a38a;\n}\n@media(max-width:1050px){:root{--ritual-sidebar-width:170px}}\n@media(max-width:800px){:root{--ritual-sidebar-width:0px}}\n\n/* Neutral color family, still using each material's optics and texture. */\n:root[data-ritual-palette=\"mono\"]{--ritual-hue:210;--ritual-saturation:0%;--ritual-accent-light:#49515b;--ritual-accent-dark:#d9dde2}\n:root[data-ritual-palette=\"mono\"][data-ritual-tone=\"light\"]{\n --ink:#25292f;--muted:#555d66;--gold:#535d68;--surface-rgb:247 249 250;\n --canvas:#f7f8f9;--native-surface:#f0f2f4;--tinted-surface:rgb(225 229 233 / .70);--solid-surface:rgb(235 238 241 / .97);\n --surface-soft:rgb(239 242 245 / .40);--surface-deep:rgb(181 189 198 / .34);--paper:rgb(250 251 252 / .78);--paper-focus:rgb(250 251 252 / .97);\n --code:rgb(237 240 243 / .96);--rim:rgb(255 255 255 / .76);--rim-top:#ffffffe0;--line:rgb(91 101 113 / .28);--shadow:rgb(25 32 41 / .18);--active-fill:rgb(128 139 151 / .27);--glow:#eef1f5;\n}\n:root[data-ritual-palette=\"mono\"][data-ritual-tone=\"dark\"]{\n --ink:#e8ebef;--muted:#b8bfc8;--gold:#c5cbd3;--surface-rgb:24 27 30;\n --canvas:#14171b;--native-surface:#20242a;--tinted-surface:rgb(34 39 45 / .79);--solid-surface:rgb(30 34 40 / .97);\n --surface-soft:rgb(39 44 51 / .43);--surface-deep:rgb(28 33 40 / .73);--paper:rgb(20 24 29 / .80);--paper-focus:rgb(20 24 29 / .97);\n --code:rgb(28 32 39 / .96);--rim:rgb(217 225 235 / .37);--rim-top:#f1f5fa70;--line:rgb(190 201 214 / .27);--shadow:rgb(6 9 14 / .42);--active-fill:rgb(147 159 175 / .27);--glow:#9da8b7;\n}\n/* Native material keeps its plain reading surfaces. */\n:root[data-ritual-palette=\"mono\"][data-ritual-material=\"native\"]{--paper:transparent;--paper-focus:transparent;--code:var(--native-surface)}\n\n:root[data-ritual-palette=\"forest\"]{--ritual-hue:142;--ritual-saturation:30%;--ritual-accent-light:#2d6644;--ritual-accent-dark:#a4d5b4}\n:root[data-ritual-palette=\"ink\"]{--ritual-hue:158;--ritual-saturation:31%;--ritual-accent-light:#245c4a;--ritual-accent-dark:#9ccdb9}\n:root[data-ritual-palette=\"moss\"]{--ritual-hue:139;--ritual-saturation:17%;--ritual-accent-light:#4b6f56;--ritual-accent-dark:#b8d1bd}\n:root[data-ritual-palette=\"ink\"][data-ritual-tone=\"dark\"]{--tinted-surface:hsl(158 31% 14% / .82);--solid-surface:hsl(158 28% 11% / .97);--surface-deep:hsl(158 31% 13% / .76);--native-surface:hsl(158 25% 12%)}\n:root[data-ritual-palette=\"forest\"][data-ritual-tone=\"dark\"]{--tinted-surface:hsl(142 30% 17% / .80);--solid-surface:hsl(142 25% 13% / .97)}\r\n\n/* All four materials share dimensions; only color, opacity, texture and optics vary. */\n:root[data-ritual-material=\"liquid\"]{--surface-fill:linear-gradient(145deg,rgb(255 255 248 / .19),transparent 38%,rgb(236 255 244 / .09)),var(--tinted-surface);--surface-filter:blur(4px) saturate(1.42);--surface-shadow:inset 0 1px 2px var(--rim-top),inset 0 -1px 9px var(--rim),0 12px 30px -16px var(--shadow);--surface-sheen:linear-gradient(115deg,transparent 15%,rgb(255 255 247 / .10) 34%,rgb(255 255 240 / .2) 50%,transparent 70%);--sidebar-fill:linear-gradient(90deg,var(--tinted-surface),var(--surface-deep));--sidebar-filter:blur(12px) saturate(1.3)}\n[data-ritual-material=\"liquid\"] .shell-header{position:relative;isolation:isolate;z-index:2;background:none;backdrop-filter:none}\n[data-ritual-material=\"liquid\"] .shell-header::before{content:\"\";position:absolute;inset:0 0 -22px;z-index:-1;pointer-events:none;background:var(--surface-deep);backdrop-filter:blur(12px) saturate(1.2);mask-image:linear-gradient(180deg,#000 0%,#000 38%,transparent 100%)}\n:root[data-ritual-material=\"frost\"]{--surface-fill:var(--tinted-surface);--surface-filter:blur(24px) saturate(.92);--surface-shadow:inset 0 1px 0 var(--rim),0 10px 28px -15px var(--shadow);--surface-sheen:linear-gradient(180deg,rgb(255 255 247 / .08),transparent 45%);--sidebar-fill:var(--solid-surface);--sidebar-filter:blur(30px) saturate(.9)}\n:root[data-ritual-material=\"jade\"]{--surface-fill:repeating-linear-gradient(45deg,transparent 0 10px,color-mix(in srgb,var(--accent) 6%,transparent) 10px 11px,transparent 11px 22px),repeating-linear-gradient(-45deg,transparent 0 10px,color-mix(in srgb,var(--accent) 5%,transparent) 10px 11px,transparent 11px 22px),var(--solid-surface);--surface-filter:blur(5px);--surface-shadow:inset 0 1px 0 var(--rim-top),inset 0 0 18px color-mix(in srgb,var(--accent) 9%,transparent),0 12px 34px -18px var(--shadow);--surface-sheen:linear-gradient(115deg,transparent 20%,rgb(255 255 240 / .09) 42%,transparent 64%);--sidebar-fill:repeating-linear-gradient(45deg,transparent 0 14px,color-mix(in srgb,var(--accent) 8%,transparent) 14px 15px,transparent 15px 30px),var(--solid-surface);--sidebar-filter:blur(7px)}\n[data-ritual-material=\"jade\"] :is(.composer,.toolbar,.skin-settings){border-color:color-mix(in srgb,var(--accent) 46%,var(--rim))}\n[data-ritual-material=\"jade\"] .ritual-edge-glass{background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 35%,transparent),transparent 30%,transparent 70%,var(--surface-deep));backdrop-filter:blur(8px);opacity:.8}\n/* Native means recolored native surfaces, not a translucent wallpaper skin. */\n:root[data-ritual-material=\"native\"]{--surface-fill:var(--native-surface);--surface-filter:none;--surface-shadow:none;--surface-sheen:none;--sidebar-fill:var(--native-surface);--sidebar-filter:none;--paper:transparent;--paper-focus:transparent;--code:var(--native-surface)}\n[data-ritual-material=\"native\"] #endfield-ritual-skin{background:var(--canvas)}\n[data-ritual-material=\"native\"] #endfield-ritual-skin::before,[data-ritual-material=\"native\"] #endfield-ritual-skin>*{display:none}\n[data-ritual-material=\"native\"] .sidebar::before{inset:0;mask-image:none}\n[data-ritual-material=\"native\"] .shell-header{background:var(--native-surface);backdrop-filter:none}\n[data-ritual-material=\"native\"] :is(.composer,.toolbar,.skin-settings,.user-message,.new-chat){backdrop-filter:none;box-shadow:none}\n[data-ritual-material=\"native\"] :is(.composer,.toolbar,.skin-settings)::before{content:none}\n[data-ritual-material=\"native\"] .scroll-area{mask-image:none}\n[data-ritual-material=\"native\"] .composer{border-radius:18px}\n\n/* Style real rendered children, never a display:contents slot or every ancestor. */\nhtml[data-si-native]{background:var(--canvas);color:var(--ink)}\nhtml[data-si-native] body{background:transparent!important;isolation:isolate}\n[data-si-native] [data-si-surface=\"canvas\"],[data-si-native] [data-si-surface=\"conversation\"],[data-si-native] [data-si-surface=\"content\"],[data-si-native] [data-si-surface=\"scroll\"]{background:transparent!important;color:var(--ink)}\n#endfield-ritual-skin{position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none;background:var(--canvas)}\n#endfield-ritual-skin .ritual-art{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}\n#endfield-ritual-skin .ritual-motion{opacity:0;transition:opacity .18s}#endfield-ritual-skin .ritual-motion[data-playing=\"true\"]{opacity:1}\n.ritual-edge-glass{position:absolute;inset:0;pointer-events:none;background:linear-gradient(130deg,var(--surface-soft),transparent 25%,transparent 75%,var(--surface-soft));backdrop-filter:blur(14px) saturate(1.2);mask-image:linear-gradient(90deg,#000,transparent 6%,transparent 94%,#000),linear-gradient(180deg,#000,transparent 8%,transparent 94%,#000);mask-composite:add}\n.ritual-reading-light{position:absolute;pointer-events:none;background:var(--paper);backdrop-filter:blur(3px);mask-image:linear-gradient(90deg,transparent,#000 var(--si-veil-feather-left,48px),#000 calc(100% - var(--si-veil-feather-right,48px)),transparent),linear-gradient(180deg,transparent,#000 24px,#000 calc(100% - 28px),transparent);mask-composite:intersect}\n[data-ritual-reading=\"focus\"] .ritual-reading-light{background:var(--paper-focus);backdrop-filter:blur(16px)}\nhtml[data-si-native]:has([data-content-phase=\"hero\"]) .ritual-reading-light{opacity:0}\n[data-si-native] [data-si-surface=\"sidebar-column\"]{position:relative;isolation:isolate;background:transparent!important;border-color:transparent!important;overflow:visible}\n[data-si-native] [data-si-surface=\"sidebar-column\"]::before{content:\"\";position:absolute;inset:0 -42px 0 0;z-index:-1;pointer-events:none;background:var(--sidebar-fill,var(--surface-deep));backdrop-filter:var(--sidebar-filter);mask-image:linear-gradient(90deg,#000 0%,#000 73%,#000b 85%,transparent 100%)}\n[data-si-native] [data-si-surface=\"sidebar\"]{background:transparent!important;color:var(--ink)!important;border-right-color:transparent!important;box-shadow:none!important}\n[data-si-native] [data-si-surface=\"sidebar\"] :is(button,a,[role=\"treeitem\"]){color:var(--ink)!important}\n[data-si-native] [data-si-surface=\"sidebar\"] [aria-selected=\"true\"]{background:var(--active-fill)!important;border-radius:10px}\n[data-si-native] [data-si-surface=\"sidebar\"] button[class$=\"_newSession\"]{background:var(--surface-fill)!important;border-color:var(--line)!important;box-shadow:var(--surface-shadow);backdrop-filter:var(--surface-filter)}\n[data-si-native] [data-slot=\"sidebar.workspaces\"] [class$=\"_fade\"]{background:linear-gradient(transparent,var(--surface-deep))!important}\n[data-si-native] [data-si-surface=\"header\"]{position:relative;isolation:isolate;background:transparent!important;color:var(--ink)!important;backdrop-filter:none!important;border-color:transparent!important;box-shadow:none}\n[data-si-native] [data-si-surface=\"header\"] :is(button,a){color:var(--ink)!important}\n[data-si-native] [data-si-surface=\"composer\"]{position:relative;isolation:isolate;background:var(--surface-fill)!important;color:var(--ink)!important;border:1px solid var(--line)!important;border-radius:22px!important;box-shadow:var(--surface-shadow)!important;backdrop-filter:var(--surface-filter)}\n[data-si-native] [data-si-surface=\"composer\"]::before{content:\"\";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:var(--surface-sheen);z-index:-1}\n[data-si-native] [data-si-surface=\"composer\"] :is(button,[data-composer-input]){color:var(--ink)!important}\n[data-si-native] [data-composer-input]{background:transparent!important;outline:none!important;box-shadow:none!important}\n[data-si-native] [data-composer-placeholder]{color:var(--muted)!important}\n[data-si-native] [data-slot^=\"conversation.hero.\"]{color:var(--ink)!important}\n[data-si-native] [data-slot^=\"conversation.hero.\"] button,[data-si-native] [data-content-phase=\"hero\"] [class$=\"_titleGroup\"]{color:var(--ink)!important;text-shadow:0 1px 9px var(--shadow)}\n[data-si-native] [data-si-surface=\"composer\"] button[aria-label=\"添加文件或调用指令\"]{background:var(--surface-soft)!important}\n[data-si-native] [data-si-surface=\"composer\"] button[aria-label=\"发送消息\"]{color:var(--canvas)!important;background:var(--accent)!important}\n[data-si-native] [data-conversation-scroll] :is(pre,code){color:var(--ink);background:var(--code)}\n[data-si-native] [data-conversation-scroll] :is(table,th,td){border-color:var(--line)}\n[data-si-native] [data-conversation-scroll] table{background:var(--code)}\n#si-native-dock{position:fixed;display:inline-flex;align-items:center;flex:none;gap:2px;padding:3px;margin:0 5px;z-index:900;color:var(--ink);border:1px solid var(--line);border-radius:13px;background:var(--surface-fill);backdrop-filter:var(--surface-filter);box-shadow:var(--surface-shadow);-webkit-app-region:no-drag}\n#si-native-dock[data-anchored=\"false\"]{position:fixed;top:72px;right:20px;z-index:100}\n#si-native-dock button{display:grid;place-items:center;width:30px;height:30px;flex:none;border:0;border-radius:9px;padding:6px;background:transparent;color:var(--ink);cursor:pointer;-webkit-app-region:no-drag}\n#si-native-dock button:hover,#si-native-dock button[aria-pressed=\"true\"]{background:var(--active-fill)}\n#si-native-dock button:focus-visible,#si-native-panel button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}\n#si-native-dock svg{width:18px;height:18px;display:block}\n#si-native-panel{position:fixed;z-index:1400;width:min(346px,calc(100vw - 24px));max-height:calc(100vh - 100px);overflow:auto;padding:13px;color:var(--ink);background:var(--surface-fill);border:1px solid var(--line);border-radius:19px;box-shadow:var(--surface-shadow),0 18px 60px -18px #0009;backdrop-filter:blur(26px) saturate(1.15);font:13px/1.55 var(--dsh-font-family-text-default,system-ui);-webkit-app-region:no-drag}\n#si-native-panel[hidden]{display:none!important}.si-panel-title{font-size:15px;font-weight:600;padding:2px 5px 10px}\n#si-native-panel details+details{margin-top:3px}#si-native-panel summary{display:flex;align-items:center;gap:9px;padding:10px 8px;cursor:pointer;border-radius:11px;list-style:none}#si-native-panel summary::-webkit-details-marker{display:none}#si-native-panel summary:hover{background:var(--surface-soft)}\n.si-setting-icon{width:21px;height:21px;flex:none}.si-setting-icon svg{width:20px;height:20px}.si-chevron{margin-left:3px;font-size:22px;color:var(--muted)}#si-native-panel details[open] .si-chevron{transform:rotate(90deg)}#si-native-panel summary small{margin-left:auto;font-size:11px;color:var(--muted);max-width:135px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.si-setting-content{padding:4px 6px 9px}.si-choice-row+.si-choice-row{margin-top:12px}.si-choice-label{display:block;color:var(--muted);font-size:11px;margin-bottom:5px}.si-choice-buttons{display:flex;flex-wrap:wrap;gap:5px}\n#si-native-panel .si-choice-buttons button{font:inherit;padding:6px 10px;border:1px solid var(--line);border-radius:10px;background:var(--surface-soft);color:var(--ink);cursor:pointer}#si-native-panel button[aria-pressed=\"true\"]{background:var(--active-fill);box-shadow:inset 0 0 0 1px var(--accent)}#si-native-panel button:disabled{opacity:.4;cursor:default}\n.si-scene-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.si-scene-grid button{position:relative;padding:0;overflow:hidden;border:1px solid var(--line);border-radius:12px;background:var(--native-surface);color:var(--ink);cursor:pointer;text-align:left;font:inherit}.si-scene-grid img{display:block;width:100%;height:69px;object-fit:cover}.si-scene-grid span{display:block;padding:5px 7px;font-size:11px}\nhtml[data-si-native][data-ritual-material=\"native\"] [data-si-surface=\"sidebar-column\"]::before{inset:0;mask-image:none;background:var(--native-surface);backdrop-filter:none}\nhtml[data-si-native][data-ritual-material=\"native\"] [data-si-surface=\"header\"]{background:var(--native-surface)!important;backdrop-filter:none}\nhtml[data-si-native][data-ritual-material=\"native\"] :is(#si-native-dock,#si-native-panel,[data-si-surface=\"composer\"]){background:var(--native-surface)!important;backdrop-filter:none;box-shadow:none!important}\n@media(max-width:700px){#si-native-dock{margin:0 2px}#si-native-dock button{width:28px;height:28px}#si-native-panel{max-height:calc(100vh - 80px)}}\n@media(prefers-reduced-motion:reduce){#endfield-ritual-skin *{transition:none!important}}\n\n/* Windows preload observes these supported palette tokens to update caption/native buttons. */\nhtml[data-si-native][data-windows-titlebar] body{--dsw-specific-sidebar-fill:var(--native-surface);--dsw-alias-label-primary:var(--ink);--dsw-alias-label-secondary:var(--muted);--dsw-alias-interactive-bg-hover:var(--active-fill);--dsw-alias-state-business-primary:var(--accent)}\n[data-si-native] [data-si-surface=\"header\"]::before{content:\"\";position:absolute;inset:0 0 -28px;z-index:-1;pointer-events:none;background:var(--surface-deep);backdrop-filter:blur(14px) saturate(1.15);mask-image:linear-gradient(180deg,#000 0%,#000 38%,#0009 72%,transparent 100%)}\nhtml[data-si-native][data-ritual-material=\"native\"] [data-si-surface=\"header\"]::before{inset:0;background:var(--native-surface);backdrop-filter:none;mask-image:none}\n#si-native-dock{margin:0;z-index:900}\n\n#si-native-panel{box-sizing:border-box}\n\n#si-native-panel .si-scene-note{font-size:12px;line-height:1.6;color:var(--muted);margin:10px 0 0;padding:8px;border:1px solid var(--line);border-radius:8px}#si-native-panel .si-scene-note[hidden]{display:none}\n\n/* Three view modes. Keep the native conversation mounted to preserve drafts and scroll. */\nhtml[data-si-native] [data-si-view-hidden],html[data-si-native] [data-si-view-hidden] *{visibility:hidden!important;pointer-events:none!important}\n/* Gallery keeps the same full-window artwork geometry as normal mode. */\nhtml[data-si-native][data-ritual-reading=\"admire\"] #endfield-ritual-skin .ritual-art{display:block!important}\nhtml[data-si-native][data-ritual-reading=\"admire\"] .ritual-reading-light{display:none!important}\n/* The third reading mode directly shows the clean artwork. */\nhtml[data-si-native][data-ritual-reading=\"admire\"][data-si-gallery-style=\"clean\"] .ritual-edge-glass{display:none!important}\n#si-native-dock button[data-si-view-mode]{position:relative;padding-bottom:8px}\n.si-view-steps{position:absolute;bottom:2px;display:flex;gap:3px;pointer-events:none}\n.si-view-steps i{width:3px;height:3px;border-radius:50%;background:currentColor;opacity:.28}\n[data-si-view-mode=\"normal\"] i:nth-child(1),[data-si-view-mode=\"focus\"] i:nth-child(2),[data-si-view-mode=\"admire\"] i:nth-child(3){opacity:1;background:var(--accent)}\n.si-visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}\n/* rc.5 CSS Modules suffixes: tag only descendants of the real conversation. */\nhtml[data-si-native] [data-si-surface=\"composer-seat\"]{background:transparent!important;background-image:none!important}\nhtml[data-si-native] [data-si-surface=\"message-bubble\"]{background:var(--surface-fill)!important;color:var(--ink)!important;border:1px solid var(--line)!important;backdrop-filter:var(--surface-filter);box-shadow:0 12px 30px -16px var(--shadow)}\nhtml[data-si-native] :is([data-si-surface=\"composer-seat\"],[data-composer-card]) [data-si-surface=\"message-bubble\"]{background:transparent!important;border-color:transparent!important;backdrop-filter:none;box-shadow:none!important}\n\n/* Pure artwork: keep a reversible control, quietly fading it while the pointer rests. */\n#si-native-dock button[hidden]{display:none!important}\n#si-native-dock{transition:opacity .18s ease,visibility 0s}\nhtml[data-si-gallery-tools=\"hidden\"] #si-native-dock{opacity:0;visibility:hidden;pointer-events:none;transition:opacity .18s ease,visibility 0s .18s}\n@media(prefers-reduced-motion:reduce){#si-native-dock{transition:none}}\n\n/* Reading controls inherit the active material and palette; no system dropdown. */\n.si-fog-control{padding:2px 3px 6px}.si-fog-control label{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:12px}.si-fog-control output{font-variant-numeric:tabular-nums;color:var(--ink)}\n#si-reading-fog{appearance:none;-webkit-appearance:none;width:100%;height:28px;margin:8px 0 3px;background:transparent;cursor:pointer;accent-color:var(--accent)}\n#si-reading-fog::-webkit-slider-runnable-track{height:6px;border-radius:10px;border:1px solid var(--line);background:linear-gradient(90deg,var(--accent) var(--si-fog-position,0%),var(--surface-soft) var(--si-fog-position,0%))}\n#si-reading-fog::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:17px;height:17px;margin-top:-6px;border-radius:50%;border:1px solid var(--accent);background:var(--native-surface);box-shadow:0 1px 5px var(--shadow)}\n#si-reading-fog:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:10px}#si-reading-fog:disabled{opacity:.4;cursor:default}\n.si-fog-ticks{display:flex;justify-content:space-between;gap:5px;font-size:10px;color:var(--muted)}.si-fog-control p{font-size:11px;line-height:1.6;margin:8px 0 0;color:var(--muted)}\n\n/* Opening visuals crop independently; attribution and controls stay in the viewport. */\n#si-opening-overlay{--si-opening-caption-safe:0px;--si-opening-handoff-ms:650ms;position:fixed;inset:0;z-index:2147483000;isolation:isolate;overflow:hidden;background:var(--canvas,#e3e9e6);opacity:1;transition:opacity var(--si-opening-handoff-ms) ease;pointer-events:auto;-webkit-app-region:no-drag}\n[data-windows-titlebar] #si-opening-overlay{--si-opening-caption-safe:48px}\n#si-opening-overlay[data-state=\"loading\"]{visibility:hidden;pointer-events:none}\n#si-opening-overlay[data-state=\"leaving\"]{opacity:0}\n#si-opening-overlay .si-opening-video,#si-opening-overlay .si-opening-target{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;object-position:center;pointer-events:none}\n#si-opening-overlay .si-opening-video{z-index:1;opacity:1;filter:none;transform:none;transition:opacity 560ms ease,filter 560ms ease,transform 620ms ease}\n#si-opening-overlay .si-opening-target{z-index:0;opacity:0;filter:blur(16px);transform:scale(1.015);transition:opacity 700ms ease 160ms,filter 760ms ease 160ms,transform 900ms ease 160ms}\n#si-opening-overlay .si-opening-target[hidden]{display:none}\n#si-opening-overlay[data-handoff=\"neutral\"][data-state=\"ink-dissolve\"] .si-opening-video,#si-opening-overlay[data-handoff=\"neutral\"][data-state=\"leaving\"] .si-opening-video{opacity:0;filter:grayscale(.9) contrast(1.25) blur(20px);transform:translateY(-5px) scale(1.025)}\n#si-opening-overlay[data-handoff=\"neutral\"][data-state=\"ink-dissolve\"] .si-opening-target,#si-opening-overlay[data-handoff=\"neutral\"][data-state=\"leaving\"] .si-opening-target{opacity:1;filter:blur(0);transform:scale(1)}\n.si-opening-skip{position:absolute;z-index:3;top:calc(var(--si-opening-caption-safe,0px) + max(16px,env(safe-area-inset-top)));right:max(18px,env(safe-area-inset-right));min-width:60px;min-height:36px;max-width:calc(100% - 36px);padding:7px 15px;box-sizing:border-box;border:1px solid #ffffff80;border-radius:999px;background:#102b22b8;backdrop-filter:blur(14px);color:#fff;font:13px/1.4 system-ui;cursor:pointer;-webkit-app-region:no-drag}\n.si-opening-skip:focus-visible{outline:2px solid #fff;outline-offset:3px}\n.si-opening-credit{position:absolute;z-index:3;left:max(16px,env(safe-area-inset-left));bottom:max(16px,env(safe-area-inset-bottom));box-sizing:border-box;width:max-content;max-width:min(920px,calc(100% - 32px));padding:7px 10px;border:1px solid #ffffff32;border-radius:7px;background:#10271ec9;backdrop-filter:blur(10px);color:#fff;font:clamp(10px,.8vw,12px)/1.55 system-ui;white-space:pre-line;overflow-wrap:anywhere;word-break:break-word;text-shadow:0 1px 3px #0008;pointer-events:none}\n.si-opening-replay{border:1px solid var(--line);border-radius:9px;background:var(--surface-fill);padding:7px 12px;color:var(--ink);font:inherit;cursor:pointer}.si-opening-replay:disabled{opacity:.5;cursor:default}\n@media(prefers-reduced-motion:reduce){#si-opening-overlay,#si-opening-overlay .si-opening-video,#si-opening-overlay .si-opening-target{transition:none!important}}\n";
// Scene title, descriptions and day/night media are kept together.
const SCENES={
lotus:{id:"lotus",title:"雨声里的片刻",description:{"light":"雨落荷塘","dark":"月色荷塘"},images:{light:new URL("/si-rain-jade/rain-lotus-day-five-toes-v2.png",location.origin).href,dark:new URL("/si-rain-jade/rain-lotus-night-five-toes-v2.png",location.origin).href},motion:{light:new URL("/si-rain-jade/scene-lotus-light-motion-standard-detail-v4.mp4",location.origin).href,dark:new URL("/si-rain-jade/scene-lotus-dark-motion-standard-brow-v6.mp4",location.origin).href}},
window:{id:"window",title:"窗榻听雨",description:{"light":"窗边听雨","dark":"窗畔月色"},images:{light:new URL("/si-rain-jade/scene-window-day-v1.png",location.origin).href,dark:new URL("/si-rain-jade/scene-window-night-v1.png",location.origin).href},motion:{light:new URL("/si-rain-jade/scene-window-light-motion-standard-detail-v4.mp4",location.origin).href,dark:new URL("/si-rain-jade/scene-window-dark-motion-standard-detail-v4.mp4",location.origin).href}},
repose:{id:"repose",title:"铺卷小憩",description:{"light":"铺卷小憩","dark":"灯下小憩"},images:{light:new URL("/si-rain-jade/scene-repose-day-v1.png",location.origin).href,dark:new URL("/si-rain-jade/scene-repose-night-v1.png",location.origin).href},motion:{light:new URL("/si-rain-jade/scene-repose-light-motion-standard-feedback-v5.mp4",location.origin).href,dark:new URL("/si-rain-jade/scene-repose-dark-motion-standard-feedback-v5.mp4",location.origin).href}},
bridge:{id:"bridge",title:"墨境桥行",description:{"light":"墨境桥行","dark":"月下桥行"},images:{light:new URL("/si-rain-jade/scene-bridge-day-v1.png",location.origin).href,dark:new URL("/si-rain-jade/scene-bridge-night-v1.png",location.origin).href},motion:null},
ledger:{id:"ledger",title:"掌柜闲时",description:{"light":"掌柜闲时","dark":"灯下掌柜"},images:{light:new URL("/si-rain-jade/scene-ledger-day-v1.png",location.origin).href,dark:new URL("/si-rain-jade/scene-ledger-night-v1.png",location.origin).href},motion:null},
tea:{id:"tea",title:"祀的鬼画符",description:{"light":"淡绿茶间 · 笔墨随心","dark":"月下茶间 · 一纸鬼画符"},images:{light:new URL("/si-rain-jade/tea-calligraphy-day-v1.png",location.origin).href,dark:new URL("/si-rain-jade/tea-calligraphy-night-v1.png",location.origin).href},motion:null}
};
function resolveScene(id='lotus'){return SCENES[id]||SCENES.lotus}
function describeScene(id,tone){const scene=resolveScene(id);return {title:scene.title,description:scene.description[tone]||scene.description.light}}

const MOTION_ULTRA={lotus:{light:new URL("/si-rain-jade/scene-lotus-light-motion-ultra-detail-v4.mp4",location.origin).href,dark:new URL("/si-rain-jade/scene-lotus-dark-motion-ultra-brow-v6.mp4",location.origin).href},window:{light:new URL("/si-rain-jade/scene-window-light-motion-ultra-detail-v4.mp4",location.origin).href,dark:new URL("/si-rain-jade/scene-window-dark-motion-ultra-detail-v4.mp4",location.origin).href},repose:{light:new URL("/si-rain-jade/scene-repose-light-motion-ultra-feedback-v5.mp4",location.origin).href,dark:new URL("/si-rain-jade/scene-repose-dark-motion-ultra-feedback-v5.mp4",location.origin).href}};

SCENES.onsen={"id":"onsen","title":"雪庭温泉","description":{"light":"雪庭温泉 · 雪日汤泉","dark":"雪庭温泉 · 雪日汤泉"},"images":{"light":new URL("/si-rain-jade/scene-onsen-snow-day-right-foot-v4.png",location.origin).href,"dark":new URL("/si-rain-jade/scene-onsen-snow-day-right-foot-v4.png",location.origin).href},"motion":{"light":new URL("/si-rain-jade/onsen-intro-standard-color-v6.mp4",location.origin).href,"dark":new URL("/si-rain-jade/onsen-intro-standard-color-v6.mp4",location.origin).href},"singleLighting":true,"availabilityNote":"当前为雪日单景，深浅仅切界面配色；尚无夜景素材。"};
MOTION_ULTRA.onsen={"light":new URL("/si-rain-jade/onsen-intro-ultra-color-v6.mp4",location.origin).href,"dark":new URL("/si-rain-jade/onsen-intro-ultra-color-v6.mp4",location.origin).href};

SCENES.onsen.motionBehavior="intro-idle";
SCENES.onsen.endImages={light:new URL("/si-rain-jade/scene-onsen-right-cross-end-color-v6.png",location.origin).href,dark:new URL("/si-rain-jade/scene-onsen-right-cross-end-color-v6.png",location.origin).href};

SCENES.onsen.idleMotion={light:new URL("/si-rain-jade/onsen-idle-standard-color-v6.mp4",location.origin).href,dark:new URL("/si-rain-jade/onsen-idle-standard-color-v6.mp4",location.origin).href};
SCENES.onsen.idleMotionUltra={light:new URL("/si-rain-jade/onsen-idle-ultra-color-v6.mp4",location.origin).href,dark:new URL("/si-rain-jade/onsen-idle-ultra-color-v6.mp4",location.origin).href};

// Bind only after the completed local media and its rights record have been checked.
const OPENING={id:'si-opening-20261109-v3',ready:true,fullSrc:new URL("/si-rain-jade/si-opening-full-v3.mp4",location.origin).href,neutralSrc:new URL("/si-rain-jade/si-opening-neutral-v3.mp4",location.origin).href,fullPoster:null,neutralPoster:null,maxDurationSeconds:30,loadTimeoutMs:7000,handoffMs:650,neutralRevealMs:950,credit:'开屏参考：见习饼饼 · BV15eJD6DEec｜非商用·保留署名',sourceUrl:'https://www.bilibili.com/video/BV15eJD6DEec/',rightsRecord:'docs/OPENING.md'};

// A scene may play an introduction once, then keep its final pose gently animated.
function createMotion(layer,read){
 const video=document.createElement('video');video.className='ritual-art ritual-motion';video.muted=true;video.defaultMuted=true;video.loop=true;video.playsInline=true;video.preload='none';video.setAttribute('muted','');video.setAttribute('playsinline','');video.setAttribute('aria-hidden','true');video.tabIndex=-1;layer.querySelector('.ritual-art').after(video);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let disposed=false,activeUrl='',activeScene='',activePhase='',completedIntro='',failedUrl='',finished=false,restoreAt=0,restoreEnd=false,seeking=false,posterHeld=false;
 function desired(){const {settings,scene,artworkUrl}=read(),sequence=scene.motionBehavior==='intro-idle',phase=sequence?(completedIntro===scene.id?'idle':'intro'):scene.motionBehavior==='once-hold'?'once':'loop',once=phase==='intro'||phase==='once',holdFrame=sequence||once;
  const first=settings.quality==='ultra'?(MOTION_ULTRA[scene.id]?.[settings.tone]||scene.motion?.[settings.tone]):scene.motion?.[settings.tone],idle=settings.quality==='ultra'?(scene.idleMotionUltra?.[settings.tone]||scene.idleMotion?.[settings.tone]):scene.idleMotion?.[settings.tone],url=settings.motion==='dynamic'&&(settings.material!=='native'||settings.reading==='admire')?(phase==='idle'?(idle||first):first):null;
  return{url,scene,phase,sequence,once,holdFrame,eligible:Boolean(url&&artworkUrl===scene.images[settings.tone]&&settings.reading!=='focus'&&!document.hidden&&!reduced.matches&&!document.documentElement.hasAttribute('data-si-opening-active'))};
 }
 function pause(show=false){video.pause();video.dataset.playing=String(show);}
 function hold(){pause(true);layer.dataset.motionState=finished?'held':'paused';}
 function pausedFrame(){const w=desired();if(w.holdFrame&&(posterHeld||video.readyState>=2&&video.currentTime>0))hold();else{pause();layer.dataset.motionState='paused';}}
 async function play(){const w=desired();if(disposed||seeking||w.url!==activeUrl)return;if(!w.eligible){pausedFrame();return;}if(w.once&&finished){hold();return;}if(video.readyState<2)return;try{await video.play();const current=desired();if(!disposed&&current.eligible&&current.url===activeUrl){video.dataset.playing='true';layer.dataset.motionState=current.phase==='idle'?'idle':'playing';}else pausedFrame();}catch{pausedFrame();}}
 function sync(){if(disposed)return;const w=desired();layer.dataset.motionPhase=w.phase;if(!w.url){if(!activeUrl&&!video.hasAttribute('src')){layer.dataset.motionState='static';layer.dataset.motionPhase='static';return;}pause();activeUrl='';activeScene='';activePhase='';completedIntro='';failedUrl='';finished=false;restoreAt=0;restoreEnd=false;seeking=false;posterHeld=false;video.removeAttribute('src');video.removeAttribute('poster');video.load();layer.dataset.motionState='static';layer.dataset.motionPhase='static';return;}
  if(activeUrl!==w.url&&!w.eligible){if(activeScene===w.scene.id&&w.holdFrame)pausedFrame();else pause();layer.dataset.motionState='paused';return;}
  if(activeUrl!==w.url){const sameScene=w.holdFrame&&activeScene===w.scene.id,samePhase=sameScene&&activePhase===w.phase,oldTime=video.currentTime;let poster='';if(sameScene&&video.readyState>=2){try{const c=document.createElement('canvas');c.width=video.videoWidth;c.height=video.videoHeight;c.getContext('2d').drawImage(video,0,0);poster=c.toDataURL('image/png');}catch{poster=w.scene.endImages?.[read().settings.tone]||'';}}
   restoreAt=samePhase?oldTime:0;restoreEnd=samePhase&&finished;if(!samePhase)finished=false;if(!sameScene)completedIntro='';pause(Boolean(poster));posterHeld=Boolean(poster);video.poster=poster;activeUrl=w.url;activeScene=w.scene.id;activePhase=w.phase;failedUrl='';video.loop=!w.once;seeking=false;video.src=activeUrl;video.preload='auto';video.load();
  }
  if(!w.eligible){pausedFrame();return;}if(failedUrl===activeUrl){pause();layer.dataset.motionState='fallback';return;}layer.dataset.motionState=finished?'held':video.readyState>=2?'ready':'loading';void play();
 }
 const loaded=()=>{if(disposed)return;if(restoreEnd||restoreAt>0){const target=restoreEnd?Math.max(0,video.duration-.001):Math.min(restoreAt,Math.max(0,video.duration-.001));finished=restoreEnd;restoreAt=0;restoreEnd=false;seeking=true;video.currentTime=target;}else void play();};
 const seeked=()=>{seeking=false;posterHeld=false;void play();},ended=()=>{const w=desired();if(w.sequence&&w.phase==='intro'){completedIntro=w.scene.id;finished=false;sync();}else if(w.once){finished=true;posterHeld=false;hold();}},error=()=>{failedUrl=activeUrl;pause();layer.dataset.motionState='fallback';};
 video.addEventListener('loadeddata',loaded);video.addEventListener('seeked',seeked);video.addEventListener('ended',ended);video.addEventListener('error',error);document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
 return{sync,destroy(){disposed=true;pause();document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',sync);video.removeEventListener('loadeddata',loaded);video.removeEventListener('seeked',seeked);video.removeEventListener('ended',ended);video.removeEventListener('error',error);video.removeAttribute('src');video.removeAttribute('poster');video.load();video.remove();}};
}


function selectOpeningVariant(settings){return settings.scene==='lotus'&&settings.tone==='light'&&settings.material!=='native'?'full':'neutral';}

// Both streams are owned local assets. Credits live outside object-fit cropping.
function createOpening(layer,read,{config=OPENING,session=sessionStorage,onActive=()=>{}}={}){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),root=document.documentElement;
 let disposed=false,attempted=false,overlay=null,video=null,target=null,skip=null,active=false,closing=false,focusBefore=null,loadTimer=0,playTimer=0,exitTimer=0,revealTimer=0,token=0,handoffToken=0,state='idle',variant='',handoff='',selectionKey='',stopLoadingInteraction=null;
 const inertBefore=new Map(),seenKey='si-rain-jade:opening:'+config.id;
 const fingerprint=s=>JSON.stringify(['scene','tone','material','reading','palette','motion','quality','normalFog','focusFog'].map(k=>s[k]));
 const spec=()=>{const v=selectOpeningVariant(read().settings);return{variant:v,src:config[v+'Src']||'',poster:config[v+'Poster']||''};};
 const available=()=>Boolean(config.ready&&spec().src&&!reduced.matches);
 function report(next,reason=''){state=next;layer.dataset.openingState=next;layer.dataset.openingReason=reason;layer.dataset.openingVariant=variant;layer.dataset.openingHandoff=handoff;document.dispatchEvent(new CustomEvent('ritual:opening',{detail:{state:next,reason,variant,handoff}}));}
 function seen(){try{return session.getItem(seenKey)==='seen'}catch{return attempted}}
 function markSeen(){try{session.setItem(seenKey,'seen')}catch{}}
 function clearTimers(){clearTimeout(loadTimer);clearTimeout(playTimer);clearTimeout(exitTimer);clearTimeout(revealTimer);}
 function release(){
  token++;handoffToken++;clearTimers();stopLoadingInteraction?.();stopLoadingInteraction=null;
  const previous=overlay;video?.pause();if(video){video.removeAttribute('src');video.load();}overlay?.remove();overlay=null;video=null;target=null;skip=null;closing=false;
  for(const[e,value]of inertBefore)if(e.isConnected)value===null?e.removeAttribute('inert'):e.setAttribute('inert',value);inertBefore.clear();
  if(active){active=false;root.removeAttribute('data-si-opening-active');onActive(false);}
  if(focusBefore?.isConnected&&!focusBefore.closest('[inert]')&&document.hasFocus()&&(!document.activeElement||document.activeElement===document.body||previous?.contains(document.activeElement)))focusBefore.focus({preventScroll:true});focusBefore=null;
 }
 async function prepareTarget(revision){
  if(!target)return;const info=read(),s=info.settings,url=s.material==='native'&&s.reading!=='admire'?'':info.scene?.images?.[s.tone]||info.artworkUrl||'';
  target.hidden=!url;layer.dataset.openingTarget=url?'selected-wallpaper':'native-canvas';if(!url){target.removeAttribute('src');return;}
  target.src=url;try{await Promise.race([target.decode(),new Promise((_,reject)=>setTimeout(()=>reject(Error('target-timeout')),1200))]);}catch{if(revision===handoffToken&&target){target.hidden=true;layer.dataset.openingTarget='canvas-fallback';}}
 }
 async function finish(reason,{immediate=false,neutral=false}={}){
  if(!overlay)return;if(closing&&!immediate&&!neutral)return;
  closing=true;const revision=++handoffToken;clearTimers();stopLoadingInteraction?.();stopLoadingInteraction=null;
  if(!active||immediate||reduced.matches){release();report('finished',reason);return;}
  handoff=neutral||variant==='neutral'||fingerprint(read().settings)!==selectionKey?'neutral':'matched';overlay.dataset.handoff=handoff;video?.pause();report('handoff',reason);
  await prepareTarget(revision);if(!overlay||disposed||revision!==handoffToken)return;
  const fade=Math.max(100,Math.min(1200,Number(config.handoffMs)||650));overlay.style.setProperty('--si-opening-handoff-ms',fade+'ms');
  const leave=()=>{if(!overlay||disposed||revision!==handoffToken)return;overlay.dataset.state='leaving';exitTimer=setTimeout(()=>{release();report('finished',reason);},fade);};
  if(handoff==='neutral'){
   // Destroy the silhouette's readable pose first. The new scene clears from soft mist afterwards.
   overlay.dataset.state='ink-dissolve';revealTimer=setTimeout(leave,Math.max(650,Math.min(1600,Number(config.neutralRevealMs)||950)));
  }else leave();
 }
 function lock(){
  focusBefore=document.activeElement instanceof HTMLElement?document.activeElement:null;
  for(const e of document.body.children)if(e!==overlay&&!['SCRIPT','STYLE','LINK','META','TEMPLATE'].includes(e.tagName)){inertBefore.set(e,e.getAttribute('inert'));e.inert=true;}
  active=true;root.setAttribute('data-si-opening-active','');onActive(true);overlay.dataset.state='playing';skip.focus({preventScroll:true});report('playing');
 }
 async function play(manual=false){
  if(disposed)return{started:false,reason:'disposed'};if(overlay)return{started:false,reason:'already-active'};
  if(!available()){report('unavailable',reduced.matches?'reduced-motion':'media-not-bound');return{started:false,reason:reduced.matches?'reduced-motion':'media-not-bound'};}
  const s=read().settings;if(!manual&&(attempted||seen()||s.opening==='off'))return{started:false,reason:s.opening==='off'?'disabled':'seen'};
  attempted=true;markSeen();const media=spec(),revision=++token;variant=media.variant;handoff='';selectionKey=fingerprint(s);report('loading');
  overlay=document.createElement('section');overlay.id='si-opening-overlay';overlay.dataset.state='loading';overlay.dataset.variant=variant;overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','祀 · 雨荷青玉开屏动画');
  target=document.createElement('img');target.className='si-opening-target';target.alt='';target.hidden=true;target.setAttribute('aria-hidden','true');
  video=document.createElement('video');video.className='si-opening-video';video.muted=true;video.defaultMuted=true;video.playsInline=true;video.preload='auto';video.setAttribute('muted','');video.setAttribute('playsinline','');video.setAttribute('aria-hidden','true');video.tabIndex=-1;if(media.poster)video.poster=media.poster;
  skip=document.createElement('button');skip.type='button';skip.className='si-opening-skip';skip.textContent='跳过';skip.setAttribute('aria-label','跳过开屏动画（Esc）');skip.addEventListener('click',()=>void finish('skip',{immediate:true}));
  const credit=document.createElement('small');credit.className='si-opening-credit';credit.setAttribute('role','note');credit.textContent=(String(config.credit||'开屏参考：见习饼饼 · BV15eJD6DEec｜非商用·保留署名').trim())+(config.sourceUrl?'\n'+config.sourceUrl:'');overlay.append(target,video,skip,credit);document.body.append(overlay);
  const cancelPending=()=>{if(!active&&!manual)void finish('interaction-before-ready',{immediate:true});};document.addEventListener('pointerdown',cancelPending,true);document.addEventListener('keydown',cancelPending,true);stopLoadingInteraction=()=>{document.removeEventListener('pointerdown',cancelPending,true);document.removeEventListener('keydown',cancelPending,true);};
  loadTimer=setTimeout(()=>void finish('load-timeout',{immediate:true}),Math.max(500,Math.min(12000,Number(config.loadTimeoutMs)||7000)));
  video.addEventListener('error',()=>void finish('decode-error',{immediate:true}),{once:true});video.addEventListener('ended',()=>void finish('ended'),{once:true});
  video.addEventListener('loadeddata',async()=>{
   if(disposed||revision!==token||closing||!video)return;
   if(!Number.isFinite(video.duration)||video.duration<.1||video.duration>(Number(config.maxDurationSeconds)||30)){void finish('invalid-duration',{immediate:true});return;}
   clearTimeout(loadTimer);stopLoadingInteraction?.();stopLoadingInteraction=null;playTimer=setTimeout(()=>void finish('autoplay-timeout',{immediate:true}),7000);
   try{await video.play();if(disposed||revision!==token||closing||!overlay)return;clearTimeout(playTimer);lock();playTimer=setTimeout(()=>void finish('playback-timeout',{immediate:true}),Math.min(65000,video.duration*1000+5000));}catch{void finish('autoplay-blocked',{immediate:true});}
  },{once:true});video.src=media.src;video.load();return{started:true,reason:'loading',variant};
 }
 const key=e=>{if(!active)return;if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();void finish('escape',{immediate:true});}else if(e.key==='Tab'){e.preventDefault();e.stopImmediatePropagation();skip?.focus({preventScroll:true});}};
 const reducedChange=()=>{if(reduced.matches)void finish('reduced-motion',{immediate:true});else if(!overlay)report('ready');};
 const visibility=()=>{if(!video||!active||closing)return;if(document.hidden)video.pause();else video.play().catch(()=>void finish('autoplay-blocked',{immediate:true}));};
 document.addEventListener('keydown',key,true);document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',reducedChange);report(available()?'ready':'unavailable',config.ready?'':'media-not-bound');
 return{play,sync(){if(!overlay)return;const s=read().settings;if(s.opening==='off'){void finish('disabled',{immediate:true});return;}const next=fingerprint(s);if(next!==selectionKey){selectionKey=next;if(closing&&overlay.dataset.state==='leaving'){handoff='neutral';void finish('settings-changed',{immediate:true});}else void finish('settings-changed',{neutral:true});}},get available(){return available()},get state(){return state},get variant(){return variant},get handoff(){return handoff},destroy(){disposed=true;release();document.removeEventListener('keydown',key,true);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',reducedChange);for(const key of['openingState','openingReason','openingVariant','openingHandoff','openingTarget'])delete layer.dataset[key];}};
}

// Independent visual prototype. Native installation/profile changes are separate.
const ID='endfield-ritual-skin';
const KEY='si-rain-jade:native:v1';
const ENUMS={opening:['on','off'],tone:['light','dark'],reading:['normal','focus','admire'],palette:["jade","celadon","pine","teal","mist","frost","mono","forest","ink","moss"],material:['native','liquid','frost','jade'],motion:['static','dynamic'],quality:['standard','ultra'],scene:Object.keys(SCENES)};
const DEFAULTS={opening:'on',tone:'dark',reading:'normal',palette:'jade',material:'liquid',motion:'dynamic',quality:'ultra',scene:'lotus',normalFog:0,focusFog:100};
function sanitize(value={}){const safe={...DEFAULTS};for(const key of Object.keys(ENUMS))if(ENUMS[key].includes(value?.[key]))safe[key]=value[key];for(const key of ['normalFog','focusFog'])if(typeof value?.[key]==='number'&&Number.isFinite(value[key]))safe[key]=Math.round(Math.max(0,Math.min(100,value[key])));return safe}
function readingFog(percent){const p=Math.max(0,Math.min(100,Number(percent)||0));return p===0?{fill:'transparent',filter:'none'}:p<=50?{fill:'color-mix(in srgb, transparent '+(100-p*2)+'%, var(--paper) '+p*2+'%)',filter:'blur('+(3*p/50)+'px)'}:{fill:'color-mix(in srgb, var(--paper) '+(200-p*2)+'%, var(--paper-focus) '+(p*2-100)+'%)',filter:'blur('+(3+13*(p-50)/50)+'px)'};}
function mount(root=document.documentElement,{storage=localStorage,layerParent=document.body,native=false}={}){
 const current=document.getElementById(ID);if(current)return current.controller;
 const ownAttrs=['data-ritual-tone','data-ritual-reading','data-ritual-palette','data-ritual-material','data-ritual-fog'];
 const before=ownAttrs.map(name=>[name,root.getAttribute(name)]);
 let stored={};try{stored=JSON.parse(storage.getItem(KEY)||'{}')||{}}catch{}
 const query=new URLSearchParams(location.search),settings=sanitize(stored);
 // Old admire meant normal. Gallery is temporary: a fresh mount always restores the conversation.
 if(settings.reading==='admire')settings.reading='normal';
 if(stored.motionSchema!==1)settings.motion='dynamic';if(!(stored.schema>=2))settings.tone='dark';settings.schema=2;
 if(['blue','slate'].includes(stored.palette))settings.palette='mist';
 for(const key of Object.keys(ENUMS))if(ENUMS[key].includes(query.get(key)))settings[key]=query.get(key);
 if(['blue','slate'].includes(query.get('palette')))settings.palette='mist';
 const layer=document.createElement('div');layer.id=ID;layer.setAttribute('aria-hidden','true');
 layer.innerHTML='<img class="ritual-art" alt="" draggable="false"><div class="ritual-edge-glass"></div><div class="ritual-reading-light"></div>';
 const artwork=layer.querySelector('.ritual-art');
 let ticket=0,disposed=false,opening=null;
 const motion=createMotion(layer,()=>({settings,scene:resolveScene(settings.scene),artworkUrl:artwork.src}));
 function syncCaption(tone){const info=describeScene(settings.scene,tone);document.querySelectorAll('[data-scene-title]').forEach(el=>el.textContent=info.title);document.querySelectorAll('[data-scene-description]').forEach(el=>el.textContent='虚构对话 · '+info.description)}
 function commitScene(tone,url){syncCaption(tone);artwork.src=url;layer.style.setProperty('--ritual-scene-image',`url("${url}")`);layer.dataset.sceneTone=tone;delete layer.dataset.scenePending;motion.sync()}
 function syncScene(){
  const revision=++ticket;
  motion.sync();
  if(settings.material==='native'&&settings.reading!=='admire'){syncCaption(settings.tone);artwork.removeAttribute('src');layer.style.removeProperty('--ritual-scene-image');layer.dataset.sceneTone='native';delete layer.dataset.scenePending;return}
  const tone=settings.tone,url=resolveScene(settings.scene).images[tone];
  if(artwork.src===url){syncCaption(tone);delete layer.dataset.scenePending;return}
  if(!artwork.getAttribute('src')){commitScene(tone,url);return}
  layer.dataset.scenePending=tone;const candidate=new Image();candidate.src=url;
  candidate.decode().then(()=>{if(disposed||revision!==ticket)return;commitScene(tone,url)}).catch(()=>{if(revision===ticket){delete layer.dataset.scenePending;console.warn('场景图未能加载，保留当前画面。')}});
 }
 const veil=layer.querySelector('.ritual-reading-light'),flow=document.querySelector('.message-column'),scroll=document.querySelector('[data-conversation-scroll]');
 function syncVeil(){if(!flow||!scroll)return;const box=flow.getBoundingClientRect(),area=scroll.getBoundingClientRect(),bleed=innerWidth<800?24:72;Object.assign(veil.style,{left:`${box.left-bleed}px`,width:`${box.width+bleed*2}px`,top:`${area.top-26}px`,height:`${area.height+95}px`})}
 const observer=native?null:new ResizeObserver(syncVeil);if(flow)observer?.observe(flow);if(scroll)observer?.observe(scroll);
 function update(next={}){
  for(const key of Object.keys(ENUMS))if(ENUMS[key].includes(next[key]))settings[key]=next[key];
  for(const key of ['normalFog','focusFog'])if(typeof next[key]==='number'&&Number.isFinite(next[key]))settings[key]=Math.round(Math.max(0,Math.min(100,next[key])));
  root.dataset.ritualTone=settings.tone;root.dataset.ritualReading=settings.reading;root.dataset.ritualPalette=settings.palette;root.dataset.ritualMaterial=settings.material;

  const percent=settings.reading==='focus'?settings.focusFog:settings.normalFog,fog=readingFog(percent);root.dataset.ritualFog=String(percent);veil.style.background=fog.fill;veil.style.backdropFilter=fog.filter;
  syncScene();try{storage.setItem(KEY,JSON.stringify({...settings,motionSchema:1,schema:2,readingSchema:1,fogSchema:1}))}catch{}
  opening?.sync();document.dispatchEvent(new CustomEvent('ritual:change',{detail:{...settings}}));
 }
 const controller={update,replayOpening(){return opening.play(true)},get opening(){return {available:opening?.available||false,state:opening?.state||'idle',variant:opening?.variant||'',handoff:opening?.handoff||''}},get settings(){return {...settings}},destroy(){disposed=true;ticket++;opening?.destroy();motion.destroy();observer?.disconnect();layer.remove();for(const[name,value]of before)value===null?root.removeAttribute(name):root.setAttribute(name,value)}};
 layer.controller=controller;update();layerParent.prepend(layer);opening=createOpening(layer,()=>({settings,scene:resolveScene(settings.scene),artworkUrl:artwork.src}),{onActive:()=>motion.sync()});queueMicrotask(()=>{if(!disposed)void opening.play(false)});syncVeil();return controller;
}

// DSH DOM compatibility is confined here. Slots/theme services own registration.
const SI_OWN='#si-plugin-host,#si-native-dock,#si-native-panel,#endfield-ritual-skin,#si-opening-overlay,#si-pinned-entry';
function createHostAdapter(doc=document){
 const rendered=e=>e?(getComputedStyle(e).display==='contents'?e.firstElementChild:e):null;
 const listeners=new Set(),pending=new Set();let frame=0,disposed=false,structural=true,snapshot=null;
 const stats={structuralScans:0,incrementalScans:0,ignoredMessageMutations:0,notifications:0};
 function read(){
  stats.structuralScans++;
  const slot=name=>doc.querySelector('[data-slot="'+name+'"]');
  const root=slot('root'),main=slot('main'),sidebarSlot=slot('sidebar'),sidebar=rendered(sidebarSlot),conversation=rendered(slot('main.conversation'));
  const scroll=conversation?.querySelector('[data-conversation-scroll]'),content=conversation?.querySelector('[data-conversation-content]');
  const compatible=Boolean(root&&main&&root.contains(main)&&sidebar&&(!conversation||scroll&&content));
  return{compatible,root:rendered(root),rootParent:root?.parentElement,main:main?.parentElement,sidebar,sidebarColumn:sidebarSlot?.parentElement,conversation,header:rendered(slot('conversation.header')),scroll,content,flow:scroll?.querySelector('[data-chat-flow],.message-column'),workspace:sidebar?.querySelector('[data-slot="sidebar.workspaces"]'),composers:conversation?[...conversation.querySelectorAll('[data-composer-card]')]:[],seats:conversation?[...conversation.querySelectorAll('[data-composer-seat]')]:[]};
 }
 function bubbleNodes(node){
  const found=[];if(node?.nodeType!==1)return found;
  // Only the bubble fallback needs a module suffix on the supported host.
  const match=e=>e.hasAttribute('data-message-bubble')||[...e.classList].some(c=>c.endsWith('_bubble'));
  if(match(node))found.push(node);
  for(const e of node.querySelectorAll('[data-message-bubble],[class$="_bubble"]'))if(match(e))found.push(e);
  return found;
 }
 function flush(){frame=0;if(disposed)return;const bubbles=[];
  if(structural){snapshot=read();if(snapshot.conversation)bubbles.push(...bubbleNodes(snapshot.conversation));}
  else for(const e of pending){stats.incrementalScans++;bubbles.push(...bubbleNodes(e));}
  pending.clear();structural=false;stats.notifications++;
  for(const fn of listeners)fn(snapshot,{bubbles:[...new Set(bubbles)]});
 }
 function schedule(){if(!disposed&&!frame)frame=requestAnimationFrame(flush);}
 const observer=new MutationObserver(records=>{
  for(const r of records){const target=r.target.nodeType===1?r.target:r.target.parentElement;
   if(target?.closest(SI_OWN))continue;
   if(r.type==='attributes'){structural=true;continue;}
   const insideMessage=target?.closest('[data-chat-flow]'),insideComposer=target?.closest('[data-composer-card]');
   if(insideMessage||insideComposer){let changed=false;for(const e of r.addedNodes)if(e.nodeType===1&&bubbleNodes(e).length){pending.add(e);changed=true;}if(!changed)stats.ignoredMessageMutations++;continue;}
   // Ignore text-only streaming updates and inspect only actual structural nodes.
   if([...r.addedNodes,...r.removedNodes].some(e=>e.nodeType===1&&!e.matches?.(SI_OWN)))structural=true;
  }
  if(structural||pending.size)schedule();
 });
 observer.observe(doc.body,{childList:true,subtree:true,attributes:true,attributeFilter:['data-content-phase','data-global-panel','data-sidebar-collapsed']});
 snapshot=read();structural=false;
 return{get snapshot(){return snapshot},get stats(){return {...stats}},subscribe(fn){listeners.add(fn);fn(snapshot,{bubbles:snapshot.conversation?bubbleNodes(snapshot.conversation):[]});return()=>listeners.delete(fn)},refresh(){structural=true;schedule()},dispose(){disposed=true;observer.disconnect();if(frame)cancelAnimationFrame(frame);listeners.clear();pending.clear()}};
}

// Pair-valued token layers are registered through the official Theme service.
function createThemeBridge(ctx,read,onExternalTone){
 const theme=ctx.get('theme');if(!theme||typeof theme.overrideTokens!=='function'||typeof theme.getTheme!=='function'||typeof theme.setTheme!=='function')return null;
 const prior=theme.getTheme().preference;let lastOwned=null,syncing=false,disposed=false;
 const token=value=>({light:value,dark:value});
 const tokens={
  '--dsw-alias-bg-base':token('transparent'),
  '--dsw-specific-sidebar-fill':token('var(--native-surface)'),
  '--dsw-alias-label-primary':token('var(--ink)'),
  '--dsw-alias-label-secondary':token('var(--muted)'),
  '--dsw-alias-interactive-bg-hover':token('var(--active-fill)'),
  '--dsw-alias-state-business-primary':token('var(--accent)')
 };
 const release=theme.overrideTokens('dsh-si-rain-jade',tokens);
 const off=ctx.on('theme/change',snapshot=>{if(disposed||syncing)return;const tone=snapshot.active.colorScheme;if(['light','dark'].includes(tone)&&tone!==read().tone)onExternalTone(tone);});
 return{sync(){if(disposed)return;const tone=read().tone;if(theme.getTheme().active.colorScheme===tone)return;syncing=true;try{theme.setTheme(tone);lastOwned=tone;}finally{syncing=false;}},dispose(){if(disposed)return;disposed=true;off();release();if(lastOwned&&theme.getTheme().preference===lastOwned)theme.setTheme(prior);}};
}

// Grounded in official DSH rc.5 UiWorkspaceService.openSession(), not a guessed route.
const SI_PINNED_ENTRY_CSS = `
#si-pinned-entry{box-sizing:border-box;display:flex;align-items:center;gap:10px;flex:none;width:calc(100% - 4px);min-height:48px;margin:0 2px 10px;padding:7px 10px;border:1px solid var(--line);border-radius:13px;background:var(--surface-fill,var(--surface-deep));color:var(--ink);box-shadow:var(--surface-shadow);backdrop-filter:var(--surface-filter);cursor:pointer;font:inherit;text-align:left;-webkit-app-region:no-drag}
#si-pinned-entry:hover,#si-pinned-entry[aria-pressed="true"]{background:var(--active-fill)}
#si-pinned-entry:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
#si-pinned-entry:disabled{opacity:.65;cursor:default}
#si-pinned-entry .si-pin-portrait{display:grid;place-items:center;flex:none;width:32px;height:34px;overflow:hidden;color:var(--accent);font-size:17px}
#si-pinned-entry img{width:100%;height:100%;object-fit:contain}
#si-pinned-entry .si-pin-copy{min-width:0;display:flex;flex-direction:column;gap:1px}
#si-pinned-entry .si-pin-title{font-size:13px;line-height:19px;font-weight:500}
#si-pinned-entry .si-pin-subtitle{font-size:11px;line-height:16px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#si-pinned-entry[data-collapsed="true"]{width:36px;min-height:36px;padding:2px;margin:0 0 12px}
#si-pinned-entry[data-collapsed="true"] .si-pin-copy{display:none}
`;

const compact=s=>String(s||'').replace(/\s+/g,'').replace(/·|・|•/g,'·');

// Reads metadata only. Ambiguity never creates, archives, moves, or selects a random chat.
function resolveSiPinnedTarget(sessionSnapshot,workspaceSnapshot,options={}){
 const byId=sessionSnapshot?.byId||{},items=workspaceSnapshot?.items||[],archived=new Set(workspaceSnapshot?.archivedSessionIds||[]);
 const known=options.sessionId||'';
 if(known){if(byId[known]&&!archived.has(known))return{id:known,reason:'existing-id'};return{id:null,reason:'explicit-target-unavailable'};}
 const expected=compact(options.sessionTitle||'祀 · 管理员的画境会话');
 const exact=Object.values(byId).filter(s=>s&&compact(s.title)===expected&&!archived.has(s.id));
 if(exact.length===1)return{id:exact[0].id,reason:'unique-title'};
 if(exact.length>1)return{id:null,reason:'ambiguous-title'};
 const workspaces=items.filter(w=>compact(w.title)===compact(options.workspaceTitle||'祀 · 画境'));
 if(workspaces.length!==1)return{id:null,reason:workspaces.length?'ambiguous-workspace':'not-found'};
 if(!Array.isArray(workspaces[0].sessionIds))return{id:null,reason:'members-unavailable'};
 const candidates=workspaces[0].sessionIds.filter(id=>byId[id]&&!byId[id].blank&&!archived.has(id));
 return candidates.length===1?{id:candidates[0],reason:'unique-workspace-member'}:{id:null,reason:candidates.length?'ambiguous-members':'not-found'};
}

function mountSiPinnedEntry(ctx,options={}){
 if(document.getElementById('si-pinned-entry'))return()=>{};
 const ui=ctx.get('uiWorkspace'),sessions=ctx.get('sessions'),workspaces=ctx.get('workspaces');
 const entry=document.createElement('button');entry.type='button';entry.id='si-pinned-entry';entry.setAttribute('aria-label','祀 · 画境，专属会话');
 const portrait=document.createElement('span');portrait.className='si-pin-portrait';portrait.textContent='祀';entry.append(portrait);
 if(options.imageUrl){const img=document.createElement('img');img.alt='';img.src=options.imageUrl;img.addEventListener('error',()=>{img.remove();portrait.textContent='祀';},{once:true});portrait.textContent='';portrait.append(img);}
 const copy=document.createElement('span');copy.className='si-pin-copy';const title=document.createElement('span');title.className='si-pin-title';title.textContent='祀 · 画境';const subtitle=document.createElement('span');subtitle.className='si-pin-subtitle';subtitle.textContent='专属会话';copy.append(title,subtitle);entry.append(copy);
 const style=document.createElement('style');style.id='si-pinned-entry-style';style.textContent=options.cssText||SI_PINNED_ENTRY_CSS;document.head.append(style);
 let frame=0,disposed=false,observedSidebar=null;
 const resolve=()=>resolveSiPinnedTarget(sessions.list.getSnapshot(),workspaces.list.getSnapshot(),options);
 const schedule=()=>{if(!disposed&&!frame)frame=requestAnimationFrame(()=>{frame=0;refresh();});};
 const resize=new ResizeObserver(schedule);
 function refresh(){
  const sidebar=options.adapter?.snapshot.sidebar||document.querySelector('[data-slot="sidebar"]')?.firstElementChild;
  // _newSession is the current official module suffix; brand carries the same aria-label.
  let region=sidebar?.querySelector('[data-slot="sidebar.workspaces"]');
  if(region){while(region.parentElement&&region.parentElement!==sidebar)region=region.parentElement;if(region.parentElement===sidebar&&entry.nextElementSibling!==region)sidebar.insertBefore(entry,region);}
  if(sidebar&&sidebar!==observedSidebar){resize.disconnect();resize.observe(sidebar);observedSidebar=sidebar;}
  entry.dataset.collapsed=String(Boolean(sidebar&&sidebar.getBoundingClientRect().width<120));
  const target=resolve();entry.disabled=!target.id;entry.dataset.siTarget=target.id||'';
  subtitle.textContent=target.id?'专属会话':target.reason.startsWith('ambiguous')?'请确认祀会话':'祀会话尚未就绪';
  entry.title=target.id?'打开已有的祀专属会话':'未找到唯一的既有祀会话，未创建新聊天';
  entry.setAttribute('aria-pressed',String(Boolean(target.id&&ui.selection?.getSnapshot?.().sessionId===target.id)));
 }
 entry.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();const target=resolve();if(!target.id){refresh();return;}try{ui.openSession(target.id);refresh();}catch(error){subtitle.textContent='暂时未能打开';options.onError?.(error);}});
 const stops=[sessions.list.subscribe(schedule),workspaces.list.subscribe(schedule)];if(ui.selection?.subscribe)stops.push(ui.selection.subscribe(schedule));
 const observer=options.adapter?null:new MutationObserver(records=>{if(records.every(r=>r.target.closest?.('#si-pinned-entry')))return;schedule();});observer?.observe(document.body,{childList:true,subtree:true});const stopHost=options.adapter?.subscribe(schedule);refresh();
 return()=>{disposed=true;if(frame)cancelAnimationFrame(frame);observer?.disconnect();stopHost?.();resize.disconnect();for(const stop of stops)stop();entry.remove();style.remove();};
}

// Context injection waits for the official navigation service instead of assuming load order.
function installSiPinnedEntry(ctx,options={}){
 return ctx.inject(['uiWorkspace','sessions','workspaces'],ready=>{ready.effect(()=>mountSiPinnedEntry(ready,options),'si-rain-jade:pinned-existing-session');});
}

// DSH rc.5 slots use display:contents; style the rendered children, not the slots.
function mountNative(ctx,{parent=document.body,adapter}){
 if(document.getElementById('si-native-dock')||document.querySelector('[data-herta-atelier]'))return()=>{};
 const root=document.documentElement,prior=root.getAttribute('data-si-native'),priorDark=root.getAttribute('data-ds-dark-theme'),priorScheme=root.style.getPropertyValue('color-scheme'),priorBodyDark=document.body.getAttribute('data-ds-dark-theme'),priorCaptionToken=document.body.style.getPropertyValue('--si-native-palette');root.setAttribute('data-si-native','slots');
 const style=document.createElement('style');style.id='si-native-style';style.textContent=SI_CSS;document.head.append(style);
 const controller=mount(root,{layerParent:parent,native:true}),tagged=new Map(),viewHidden=new Map();let frame=0,disposed=false,hiddenFocus=null,viewingActive=false,galleryTimer=0;
 Object.defineProperty(controller,'hostStatus',{get:()=>({mount:'official-slot',theme:'official-token-layer',...adapter.stats})});
 const readingBoxes=new Set(),readingResize=new ResizeObserver(()=>{if(!disposed){positionDock();positionPanel();positionVeil();}});
 const themeBridge=createThemeBridge(ctx,()=>controller.settings,tone=>controller.update({tone}));
 const stopPinned=mountSiPinnedEntry(ctx,{adapter});
 const galleryAttrs=['data-si-gallery-style','data-si-gallery-tools'].map(name=>[name,root.getAttribute(name)]);
 const viewModes=['normal','focus','admire'],viewLabels={normal:'默认',focus:'专注',admire:'观赏'};
 const svg=p=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>';
 const icons={moon:svg('<path d="M20.7 13.1A8.8 8.8 0 0 1 10.9 3.3 8.8 8.8 0 1 0 20.7 13.1Z"/>'),sun:svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>'),focus:svg('<path d="M12 5v15M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1Z"/>'),settings:svg('<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="9" cy="18" r="2"/>'),wallpaper:svg('<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8" cy="9" r="1.5"/><path d="m4 17 5-5 4 4 3-3 5 5"/>'),material:svg('<path d="m12 3 9 5-9 5-9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>'),palette:svg('<circle cx="9" cy="9" r="6"/><circle cx="15" cy="9" r="6"/><circle cx="12" cy="15" r="6"/>')};
 const dock=document.createElement('div');dock.id='si-native-dock';dock.setAttribute('role','toolbar');dock.setAttribute('aria-label','祀皮肤快捷工具');
 const panel=document.createElement('section');panel.id='si-native-panel';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-label','皮肤设置');panel.innerHTML='<div class="si-panel-title">皮肤设置</div>';parent.append(panel);
 function button(label,icon,click){const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',label);b.title=label;b.innerHTML=icon;b.addEventListener('click',click);return b;}
 const tone=button('切换深浅外观',icons.sun,()=>controller.update({tone:controller.settings.tone==='dark'?'light':'dark'}));
 const focus=button('展示模式：默认；点击切换专注',icons.focus+'<span class="si-view-steps" aria-hidden="true"><i></i><i></i><i></i></span>',()=>controller.update({reading:viewModes[(viewModes.indexOf(controller.settings.reading)+1)%viewModes.length]}));
 const viewStatus=document.createElement('span');viewStatus.className='si-visually-hidden';viewStatus.setAttribute('role','status');viewStatus.setAttribute('aria-live','polite');dock.append(viewStatus);
 const settings=button('皮肤设置',icons.settings,()=>{panel.hidden=!panel.hidden;settings.setAttribute('aria-expanded',String(!panel.hidden));positionPanel();});settings.setAttribute('aria-controls',panel.id);settings.setAttribute('aria-expanded','false');
 dock.append(tone,focus,settings);
 parent.append(dock);
 const choices=[],summaries=[],labels={on:'开启',off:'关闭',light:'浅色',dark:'深色',normal:'默认',admire:'观赏',focus:'专注',native:'默认',liquid:'液态玻璃',frost:'雾面玻璃',jade:'雨荷',mono:'默认黑白',celadon:'冷瓷',mist:'青岚',pine:'雾松',teal:'碧汀',forest:'深林',ink:'墨绿',moss:'苔影',static:'静态',dynamic:'动态',standard:'标准',ultra:'极清'};
 function group(parent,title,key,values){const row=document.createElement('div');row.className='si-choice-row';const label=document.createElement('span');label.className='si-choice-label';label.textContent=title;row.append(label);const cells=document.createElement('div');cells.className=key==='scene'?'si-scene-grid':'si-choice-buttons';row.append(cells);
  for(const value of values){const b=document.createElement('button');b.type='button';b.dataset.siChoice=key;b.dataset.siValue=value;if(key==='scene'){const img=document.createElement('img');img.alt='';img.loading='lazy';img.src=SCENES[value].images[controller.settings.tone];const text=document.createElement('span');text.textContent=SCENES[value].title;b.append(img,text);}else b.textContent=key==='material'&&value==='jade'?'青玉织纹':labels[value]||value;b.addEventListener('click',()=>controller.update({[key]:value}));cells.append(b);choices.push({b,key,value});}parent.append(row);}
 function category(title,icon,current){const d=document.createElement('details');d.name='si-skin-category';const s=document.createElement('summary');s.innerHTML='<span class="si-setting-icon">'+icon+'</span><span>'+title+'</span><small></small><span class="si-chevron">›</span>';d.append(s);const body=document.createElement('div');body.className='si-setting-content';d.append(body);panel.append(d);summaries.push({el:s.querySelector('small'),current});return body;}
 const wallpaper=category('壁纸',icons.wallpaper,()=>SCENES[controller.settings.scene].title);group(wallpaper,'深浅','tone',['light','dark']);group(wallpaper,'场景','scene',Object.keys(SCENES));group(wallpaper,'播放','motion',['static','dynamic']);group(wallpaper,'画质','quality',['standard','ultra']);
 group(category('材质',icons.material,()=>controller.settings.material==='jade'?'青玉织纹':labels[controller.settings.material]),'材质','material',['native','liquid','frost','jade']);group(category('配色',icons.palette,()=>labels[controller.settings.palette]),'配色','palette',['mono','jade','celadon','pine','teal','mist','frost','forest','ink','moss']);
 const openingSettings=category('开屏',icons.wallpaper,()=>controller.settings.opening==='off'?'关闭':controller.opening.available?'开启':'素材待加入');group(openingSettings,'启动时播放','opening',['on','off']);const openingReplay=document.createElement('button');openingReplay.type='button';openingReplay.className='si-opening-replay';openingReplay.textContent='重播开屏';openingReplay.addEventListener('click',()=>void controller.replayOpening());openingSettings.append(openingReplay);const openingHelp=document.createElement('p');openingHelp.className='si-scene-note';openingHelp.textContent='可用 Esc 跳过。遵循系统减弱动态设置；素材失败时直接进入界面，不改壁纸偏好。';openingSettings.append(openingHelp);
 const reading=category('阅读',icons.focus,()=>controller.settings.reading==='admire'?'观赏':(controller.settings.reading==='focus'?'专注':'默认')+' · '+(controller.settings.reading==='focus'?controller.settings.focusFog:controller.settings.normalFog)+'%');
 const fogRow=document.createElement('div');fogRow.className='si-fog-control';fogRow.innerHTML='<label for="si-reading-fog">雾层浓度 <output id="si-reading-fog-value"></output></label><input id="si-reading-fog" type="range" min="0" max="100" step="1" aria-describedby="si-reading-fog-help"><div class="si-fog-ticks"><span>0% 清晰</span><span>50% 旧默认</span><span>100% 专注</span></div><p id="si-reading-fog-help">默认预设0%，专注预设100%，分别记住调整。观赏时隐藏雾层。</p>';reading.append(fogRow);
 const fogRange=fogRow.querySelector('input'),fogOutput=fogRow.querySelector('output');fogRange.addEventListener('input',()=>controller.update({[controller.settings.reading==='focus'?'focusFog':'normalFog']:Number(fogRange.value)}));
 function tag(e,role){if(!e)return;if(!tagged.has(e))tagged.set(e,e.getAttribute('data-si-surface'));if(e.getAttribute('data-si-surface')!==role)e.setAttribute('data-si-surface',role);}
 function rendered(e){return e?(getComputedStyle(e).display==='contents'?e.firstElementChild:e):null;}
 function positionDock(){const state=adapter.snapshot,header=state.header,content=state.content,area=state.conversation?.getBoundingClientRect();const edge=Math.max(header?.getBoundingClientRect().bottom||0,content?.getBoundingClientRect().top||0);dock.style.left='auto';dock.style.right=Math.max(16,innerWidth-(area?.right||innerWidth)+16)+'px';dock.style.top=Math.min(innerHeight-64,edge+12)+'px';}
 function positionPanel(){if(panel.hidden||!dock.isConnected)return;const r=dock.getBoundingClientRect();const top=Math.min(innerHeight-100,r.bottom+8);panel.style.top=top+'px';panel.style.maxHeight=Math.max(80,innerHeight-top-14)+'px';panel.style.right=Math.max(10,innerWidth-r.right)+'px';}
 function positionVeil(){
  const veil=document.querySelector('#endfield-ritual-skin .ritual-reading-light'),scroll=adapter.snapshot.scroll;
  const flow=adapter.snapshot.flow;
  const targets=new Set([scroll,flow].filter(Boolean));
  for(const e of readingBoxes)if(!targets.has(e)){readingResize.unobserve(e);readingBoxes.delete(e);}
  for(const e of targets)if(!readingBoxes.has(e)){readingBoxes.add(e);readingResize.observe(e);}
  if(!veil)return;veil.hidden=!scroll;if(!scroll)return;
  const area=scroll.getBoundingClientRect(),box=flow?.getBoundingClientRect();
  // Match the host's actual message column, including its user-selected width.
  const content=box?.width>0?box:area,bleed=56;
  const start=Math.max(area.left,content.left-bleed),end=Math.min(area.right,content.right+bleed);
  Object.assign(veil.style,{left:start+'px',top:area.top+'px',width:Math.max(0,end-start)+'px',height:area.height+'px'});
  veil.style.setProperty('--si-veil-feather-left',Math.max(0,Math.min(48,content.left-start))+'px');
  veil.style.setProperty('--si-veil-feather-right',Math.max(0,Math.min(48,end-content.right))+'px');
 }
 function restoreViewElement(e,values){for(const[name,value]of values)value===null?e.removeAttribute(name):e.setAttribute(name,value);viewHidden.delete(e);}
 function wakeGalleryTools(){
  clearTimeout(galleryTimer);root.removeAttribute('data-si-gallery-tools');
  if(controller.settings.reading!=='admire')return;
  galleryTimer=setTimeout(()=>{
   if(!panel.hidden||dock.matches(':hover')||dock.querySelector(':focus-visible')){wakeGalleryTools();return;}
   root.setAttribute('data-si-gallery-tools','hidden');
  },1600);
 }
 function wakeGalleryKeyboard(e){if(e.key==='Tab'){const restore=controller.settings.reading==='admire'&&(root.getAttribute('data-si-gallery-tools')==='hidden'||!dock.contains(document.activeElement));wakeGalleryTools();if(restore){e.preventDefault();const target=e.shiftKey?settings:tone;requestAnimationFrame(()=>{if(!disposed&&controller.settings.reading==='admire')target.focus({preventScroll:true});});}}}
 function syncView(){
  const viewing=controller.settings.reading==='admire',entering=viewing&&!viewingActive;viewingActive=viewing;
  // Hide every page UI root, including third-party body portals, without changing layout.
  const targets=new Set([...document.body.children].filter(e=>!['SCRIPT','STYLE','LINK','META','TEMPLATE'].includes(e.tagName)&&!['si-plugin-host','endfield-ritual-skin','si-native-dock','si-native-panel','si-opening-overlay'].includes(e.id)));
  for(const[e,values]of viewHidden)if(!viewing||!targets.has(e))restoreViewElement(e,values);
  if(viewing){
   if([...targets].some(e=>e.contains(document.activeElement))){hiddenFocus=document.activeElement;focus.focus({preventScroll:true});}
   for(const e of targets){if(!viewHidden.has(e))viewHidden.set(e,['inert','aria-hidden','data-si-view-hidden'].map(name=>[name,e.getAttribute(name)]));e.inert=true;e.setAttribute('aria-hidden','true');e.setAttribute('data-si-view-hidden','');}
   root.setAttribute('data-si-gallery-style','clean');
  }else{
   clearTimeout(galleryTimer);root.removeAttribute('data-si-gallery-style');root.removeAttribute('data-si-gallery-tools');
   if(hiddenFocus){const target=hiddenFocus;hiddenFocus=null;if(target.isConnected&&!target.closest('[inert]'))target.focus({preventScroll:true});}
  }
  if(entering)wakeGalleryTools();
 }
 function tagNative(state=adapter.snapshot,changes={bubbles:[]}){
  for(const[e,value]of tagged)if(!e.isConnected){value===null?e.removeAttribute('data-si-surface'):e.setAttribute('data-si-surface',value);tagged.delete(e);}
  for(const[e,role]of [[state.rootParent,'canvas'],[state.root,'canvas'],[state.main,'canvas'],[state.sidebarColumn,'sidebar-column'],[state.sidebar,'sidebar'],[state.conversation,'conversation'],[state.header,'header'],[state.content,'content'],[state.scroll,'scroll']])tag(e,role);
  for(const e of state.composers)tag(e,'composer');for(const e of state.seats)tag(e,'composer-seat');for(const e of changes.bubbles)tag(e,'message-bubble');
  positionDock();positionPanel();positionVeil();syncView();
 }
 const sceneNote=document.createElement('p');sceneNote.className='si-scene-note';sceneNote.setAttribute('role','note');wallpaper.append(sceneNote);
 function sync(){const s=controller.settings;openingReplay.disabled=!controller.opening.available;openingReplay.title=controller.opening.available?'重播开屏（Esc可跳过）':'开屏素材尚未加入，或系统已减弱动态';const fog=s.reading==='focus'?s.focusFog:s.normalFog;fogRange.value=String(fog);fogRange.disabled=s.reading==='admire';fogRange.setAttribute('aria-valuetext',fog+'%');fogOutput.value=fog+'%';fogRange.style.setProperty('--si-fog-position',fog+'%');sceneNote.textContent=SCENES[s.scene].availabilityNote||'';sceneNote.hidden=!SCENES[s.scene].singleLighting;themeBridge.sync();document.body.style.setProperty('--si-native-palette',s.tone+'-'+s.palette);tone.innerHTML=s.tone==='dark'?icons.sun:icons.moon;tone.setAttribute('aria-label',s.tone==='dark'?'切换为浅色外观':'切换为深色外观');focus.dataset.siViewMode=s.reading;const next=viewModes[(viewModes.indexOf(s.reading)+1)%viewModes.length],hint='展示模式：'+viewLabels[s.reading]+'；点击切换'+viewLabels[next]+(s.reading==='admire'?'；Esc返回默认':'');focus.title=hint;focus.setAttribute('aria-label',hint);viewStatus.textContent=viewLabels[s.reading]+'模式';syncView();for(const{b,key,value}of choices){b.setAttribute('aria-pressed',String(s[key]===value));if(key==='scene')b.querySelector('img').src=SCENES[value].images[s.tone];if(key==='motion'&&value==='dynamic'||key==='quality')b.disabled=!SCENES[s.scene].motion;}for(const s of summaries)s.el.textContent=s.current();positionVeil();}
 const unsubscribeHost=adapter.subscribe(tagNative);
 const resize=()=>{positionDock();positionPanel();positionVeil();syncView();},outside=e=>{if(!panel.hidden&&!panel.contains(e.target)&&!dock.contains(e.target)){panel.hidden=true;settings.setAttribute('aria-expanded','false');}wakeGalleryTools();},escape=e=>{if(e.key!=='Escape')return;if(!panel.hidden){panel.hidden=true;settings.setAttribute('aria-expanded','false');settings.focus();e.preventDefault();}else if(controller.settings.reading==='admire'){controller.update({reading:'normal'});focus.focus({preventScroll:true});e.preventDefault();}};
 document.addEventListener('ritual:change',sync);document.addEventListener('ritual:opening',sync);document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);window.addEventListener('resize',resize);document.addEventListener('pointermove',wakeGalleryTools,{passive:true});document.addEventListener('focusin',wakeGalleryTools);document.addEventListener('keydown',wakeGalleryKeyboard,true);tagNative();sync();
 return()=>{disposed=true;clearTimeout(galleryTimer);for(const[name,value]of galleryAttrs)value===null?root.removeAttribute(name):root.setAttribute(name,value);document.removeEventListener('pointermove',wakeGalleryTools);document.removeEventListener('focusin',wakeGalleryTools);document.removeEventListener('keydown',wakeGalleryKeyboard,true);unsubscribeHost();stopPinned();themeBridge.dispose();readingResize.disconnect();for(const[e,values]of viewHidden)restoreViewElement(e,values);if(frame)cancelAnimationFrame(frame);for(const[e,value]of tagged)if(value===null)e.removeAttribute('data-si-surface');else e.setAttribute('data-si-surface',value);document.removeEventListener('ritual:change',sync);document.removeEventListener('ritual:opening',sync);document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);window.removeEventListener('resize',resize);dock.remove();panel.remove();controller.destroy();style.remove();if(prior===null)root.removeAttribute('data-si-native');else root.setAttribute('data-si-native',prior);if(priorCaptionToken)document.body.style.setProperty('--si-native-palette',priorCaptionToken);else document.body.style.removeProperty('--si-native-palette');};
}


// Official Slot registration owns the portal and all mounted skin effects.
const inject=['slots','theme','uiWorkspace','sessions','workspaces'];
function apply(ctx){
 ctx.inject(inject,ready=>{
 const theme=ready.get('theme');
 if(typeof theme?.overrideTokens!=='function'||typeof theme?.getTheme!=='function'||typeof theme?.setTheme!=='function'||typeof ready.slots?.inject!=='function'||typeof ready.slots?.register!=='function')return;
 return ready.slots.inject('shell.overlay',()=>ready.slots.register({name:'shell.overlay',id:'si-rain-jade.visual',order:10},function SiSkinHost(){
  const host=SI_REACT.useRef(null);
  SI_REACT.useLayoutEffect(()=>{
   const adapter=createHostAdapter();let stop=null;
   const unsubscribe=adapter.subscribe(state=>{
    if(state.compatible){if(!stop)stop=mountNative(ready,{parent:host.current,adapter});}
    else if(stop){stop();stop=null;}
   });
   return()=>{unsubscribe();if(stop)stop();adapter.dispose();};
  },[]);
  return SI_REACT_DOM.createPortal(SI_REACT.createElement('div',{id:'si-plugin-host',ref:host,style:{display:'contents'}}),document.body);
 }));
 });
}

Object.assign(exports,{apply,inject});return exports;}});
