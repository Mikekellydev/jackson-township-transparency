document.addEventListener('DOMContentLoaded', () => {
  const host = document.getElementById('compChart');
  if (!host) return;
  const years = Array.from({length: 14}, (_, i) => 2012 + i);
  const series = [
    {name:'Trustee', color:'#175a9e', values:[4400,4840,5000,5000,10333,10333,10333,9000,9000,9000,9000,9000,9000,9000]},
    {name:'Advisory board total', color:'#178b77', values:[1500,1650,1800,1800,1800,1750,1800,1800,2100,2100,2100,2100,2100,2100]},
    {name:'Deputy/clerk reported', color:'#9a5a23', values:[3500,3850,4000,null,null,null,null,null,null,null,null,null,null,null]}
  ];
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS,'svg');
  svg.setAttribute('viewBox','0 0 940 410');
  svg.setAttribute('aria-hidden','true');
  const add=(tag,attrs,text)=>{const el=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));if(text!==undefined)el.textContent=text;svg.appendChild(el);return el};
  const L=78,R=915,T=22,B=330,max=12000;
  const x=i=>L+i*(R-L)/(years.length-1);
  const y=v=>B-v*(B-T)/max;
  [0,3000,6000,9000,12000].forEach(v=>{
    add('line',{x1:L,y1:y(v),x2:R,y2:y(v),stroke:'#dce5ef','stroke-width':1});
    add('text',{x:L-12,y:y(v)+4,'text-anchor':'end',fill:'#52657a','font-size':13},'$'+v.toLocaleString());
  });
  years.forEach((yr,i)=>add('text',{x:x(i),y:B+23,'text-anchor':'middle',fill:'#52657a','font-size':12},String(yr)));
  series.forEach((s,idx)=>{
    const pts=s.values.map((v,i)=>v===null?null:`${x(i)},${y(v)}`);
    let run=[];
    const flush=()=>{if(run.length>1)add('polyline',{points:run.join(' '),fill:'none',stroke:s.color,'stroke-width':3,'stroke-linecap':'round','stroke-linejoin':'round',...(idx===2?{'stroke-dasharray':'6 4'}:{})});run=[]};
    pts.forEach(pt=>{if(pt===null)flush();else run.push(pt)});flush();
    s.values.forEach((v,i)=>{if(v!==null){const c=add('circle',{cx:x(i),cy:y(v),r:3.2,fill:s.color});const title=document.createElementNS(NS,'title');title.textContent=`${years[i]} ${s.name}: $${v.toLocaleString()}`;c.appendChild(title)}});
    const legendX=115+idx*265;
    add('line',{x1:legendX,y1:390,x2:legendX+24,y2:390,stroke:s.color,'stroke-width':4});
    add('text',{x:legendX+31,y:394,fill:'#263b52','font-size':13},s.name);
  });
  host.replaceChildren(svg);
});
