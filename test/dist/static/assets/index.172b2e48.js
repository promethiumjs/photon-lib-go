(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&e(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function e(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();function l(){const c=new WebSocket("ws://127.0.0.1:53174/ipc");c.addEventListener("open",()=>{c.addEventListener("message",o=>{var t,n;const e=JSON.parse(o.data);(t=r.onEvents.get(e.event))==null||t.forEach(s=>{s(e.payload,e.event)}),(n=r.onceEvents.get(e.event))==null||n.forEach(s=>{s(e.payload,e.event),r.onceEvents.delete(e.event)})})}),c.addEventListener("close",()=>{console.error("IPC connection terminated. Attempting to re-establish connection..."),setTimeout(()=>{l().on("open",()=>location.reload())},1e3)});const r={on:(o,e)=>{switch(o){case"open":case"close":case"error":return c.addEventListener(o,e);default:return r.registerEvent(o,e,"on")}},once:(o,e)=>r.registerEvent(o,e,"once"),registerEvent:(o,e,t)=>{const n=r[`${t}Events`];n.has(o)||n.set(o,[]);const s=n.get(o);return s.push(e),()=>{const d=s.indexOf(e);d>-1&&s.splice(d,1),s.length===0&&n.delete(o)}},emit:(o,e)=>{c.send(JSON.stringify({event:o,payload:e}))},onEvents:new Map,onceEvents:new Map};return r}const p=l();var a=p,u=document.getElementById("input"),i=document.getElementById("output"),f=document.querySelector("button");const v=()=>{a.emit("message",{message:u.value}),u.value=""};f.addEventListener("click",v);a.on("open",()=>{i.innerHTML+=`Status: Connected
`});a.on("message",(c,r)=>{i.innerHTML+="Server: "+c.message+`
`,i.innerHTML+="Server: "+c.id+`
`,i.innerHTML+="Event: "+r+`
`});
