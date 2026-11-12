// Pair-valued token layers are registered through the official Theme service.
export function createThemeBridge(ctx,read,onExternalTone){
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
