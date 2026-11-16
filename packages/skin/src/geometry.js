export function siScale(element){const value=Number(element?.currentCSSZoom)||Number.parseFloat(getComputedStyle(document.documentElement).zoom)||1;return Number.isFinite(value)&&value>0?value:1;}
export function siViewport(){const v=window.visualViewport;return{left:v?.offsetLeft||0,top:v?.offsetTop||0,right:(v?.offsetLeft||0)+(v?.width||innerWidth),bottom:(v?.offsetTop||0)+(v?.height||innerHeight)};}
export function siPanelBounds(anchor,size,viewport,{gap=8,margin=12}={}){
 const left=Math.max(viewport.left+margin,Math.min(anchor.right-size.width,viewport.right-size.width-margin));
 const below=anchor.bottom+gap,above=anchor.top-gap-size.height;
 const top=below+Math.min(size.height,160)<=viewport.bottom-margin?below:Math.max(viewport.top+margin,above);
 return{left,top,maxHeight:Math.max(40,viewport.bottom-top-margin)};
}
