export function validReadingGeometry(s,tolerance=2){
 if(!s)return false;
 const {flow,veil,scroll,viewport,featherLeft,featherRight}=s;
 if(![flow,veil,scroll,viewport].every(r=>r&&['left','right','top','bottom'].every(k=>Number.isFinite(r[k]))))return false;
 if(!Number.isFinite(featherLeft)||!Number.isFinite(featherRight))return false;
 const clip={left:Math.max(scroll.left,viewport.left),right:Math.min(scroll.right,viewport.right),top:Math.max(scroll.top,viewport.top),bottom:Math.min(scroll.bottom,viewport.bottom)};
 return veil.right>veil.left&&veil.bottom>veil.top&&veil.left+featherLeft<=flow.left+tolerance&&veil.right-featherRight>=flow.right-tolerance&&veil.left>=clip.left-tolerance&&veil.right<=clip.right+tolerance&&veil.top>=clip.top-tolerance&&veil.bottom<=clip.bottom+tolerance;
}
