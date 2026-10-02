const COMBINING=/[\u0300-\u036f]/g;const TRANSLIT={ñ:'n',Ñ:'n'};
export function foldWithMap(source){let text='';const map=[];let index=0;for(const char of source){text+=TRANSLIT[char]??char.normalize('NFD').replace(COMBINING,'').toLowerCase();map.push(index);index+=char.length}return{text,map}}
export function fold(s){return foldWithMap(s).text}
function squash(t){return t.replace(/[^\p{L}\p{N}]+/gu,' ').trim()}
function packWithMap(source){const{text:f,map}=foldWithMap(source);let p='';const pm=[];for(let i=0;i<f.length;i++){if(!/[\p{L}\p{N}]/u.test(f[i]))continue;p+=f[i];pm.push(map[i])}return{text:p,map:pm}}
export function parseQuery(raw){return squash(fold(raw??'')).split(' ').filter(Boolean)}
function toRange(map,start,len){const a=map[start],l=map[start+len-1];if(a===undefined||l===undefined)return null;return[a,l+1]}
function merge(r){if(r.length<2)return r;const s=[...r].sort((a,b)=>a[0]-b[0]||a[1]-b[1]);const o=[s[0]];for(let i=1;i<s.length;i++){const l=o[o.length-1];if(s[i][0]<=l[1])l[1]=Math.max(l[1],s[i][1]);else o.push(s[i])}return o}
export function findRanges(text,tokens){if(!text||!tokens.length)return[];const views=[foldWithMap(text),packWithMap(text)];const out=[];for(const t of tokens){if(!t)continue;for(const v of views){let from=0;while(from<=v.text.length-t.length){const at=v.text.indexOf(t,from);if(at===-1)break;const r=toRange(v.map,at,t.length);if(r)out.push(r);from=at+t.length}}}return merge(out)}
export function makeIndexable(raw){const{text}=foldWithMap(squash(raw));return{folded:text,compact:text.replace(/ /g,'')}}
export function matchItem(item,tokens,cache){if(!tokens.length)return{ranges:{name:[],desc:[],options:[]},score:0};let ix=cache?.get(item.key);if(!ix){ix=makeIndexable(item.haystack);cache?.set(item.key,ix)}
for(const t of tokens){const n=t.replace(/ /g,'');if(!ix.folded.includes(t)&&!(n.length>1&&ix.compact.includes(n)))return null}
const nr=findRanges(item.name,tokens),dr=findRanges(item.desc??'',tokens),or=findRanges(item.options??'',tokens);const fn=fold(item.name);let score=nr.length*12+dr.length*3+or.length;if(nr.length){score+=tokens.some(t=>fn===t)?60:tokens.some(t=>fn.startsWith(t))?26:10}if(item.favorite)score+=4;return{ranges:{name:nr,desc:dr,options:or},score}}
export function sliceByRanges(text,ranges){if(!text)return[];if(!ranges||!ranges.length)return[{text,hit:false}];const p=[];let c=0;for(const[a,b]of ranges){if(a>c)p.push({text:text.slice(c,a),hit:false});p.push({text:text.slice(a,b),hit:true});c=b}if(c<text.length)p.push({text:text.slice(c),hit:false});return p}
