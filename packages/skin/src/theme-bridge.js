// Official token layers and document-only appearance; never persist host preference.
export function createThemeBridge(ctx,read,onExternalTone,{document:doc=globalThis.document}={}){
 const theme=ctx.get('theme');if(!theme||typeof theme.overrideTokens!=='function'||typeof theme.getTheme!=='function')return null;
 let disposed=false,observed=theme.getTheme();
 const applyRuntime=tone=>{if(!doc)return;if(tone==='dark')doc.body.setAttribute('data-ds-dark-theme','');else doc.body.removeAttribute('data-ds-dark-theme');doc.documentElement.style.setProperty('color-scheme',tone);};
 const token=value=>({light:value,dark:value});
 const release=theme.overrideTokens('dsh-si-rain-jade',{'--dsw-alias-bg-base':token('transparent'),'--dsw-specific-sidebar-fill':token('var(--native-surface)'),'--dsw-alias-label-primary':token('var(--ink)'),'--dsw-alias-label-secondary':token('var(--muted)'),'--dsw-alias-interactive-bg-hover':token('var(--active-fill)'),'--dsw-alias-state-business-primary':token('var(--accent)')});
 const off=ctx.on('theme/change',snapshot=>{if(disposed)return;const changed=snapshot.preference!==observed.preference||snapshot.active.colorScheme!==observed.active.colorScheme;observed=snapshot;if(changed&&snapshot.active.colorScheme!==read().tone)onExternalTone(snapshot.active.colorScheme);applyRuntime(read().tone);});
 return{sync(){if(!disposed)applyRuntime(read().tone)},dispose(){if(disposed)return;disposed=true;off();release();applyRuntime(theme.getTheme().active.colorScheme)}};
}
