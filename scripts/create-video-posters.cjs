const { chromium } = require('C:/Users/orror/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const entries = [
 ['hubwell-01.mp4',2], ['hubwell-02.mp4',2], ['hubwell_3.mov',3],
 ['AALATAM V4.mp4',2], ['cortinilla-01.mp4',1], ['cortinilla-02.mp4',1],
 ['tricaster_2.mp4',5], ['kantunilkin_2.mp4',5], ['tlajtoali-video.mp4',16]
];
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
 const page=await browser.newPage();
 await page.goto('http://localhost:3001/capcut');
 const dest=path.resolve(__dirname,'../public/video-posters');
 fs.mkdirSync(dest,{recursive:true});
 for(const [file,time] of entries){
   const frame=await page.evaluate(async({file,time})=>{
     const v=document.createElement('video'); v.muted=true; v.preload='auto';
     const wait=(event)=>new Promise((resolve,reject)=>{
       const timer=setTimeout(()=>reject(new Error('Timeout '+file+' '+event)),30000);
       v.addEventListener(event,()=>{clearTimeout(timer);resolve();},{once:true});
       v.addEventListener('error',()=>{clearTimeout(timer);reject(new Error('Decode '+file));},{once:true});
     });
     const loaded=wait('loadeddata');v.src='/'+encodeURIComponent(file);v.load();await loaded;
     const seeked=wait('seeked');v.currentTime=Math.min(time,v.duration/2);await seeked;
     const canvas=document.createElement('canvas');
     const scale=Math.min(1,960/v.videoWidth,960/v.videoHeight);
     canvas.width=Math.round(v.videoWidth*scale);canvas.height=Math.round(v.videoHeight*scale);
     canvas.getContext('2d').drawImage(v,0,0,canvas.width,canvas.height);
     const data=canvas.toDataURL('image/jpeg',.84);v.removeAttribute('src');v.load();return data.split(',')[1];
   },{file,time});
   const name=file.replace(/\.[^.]+$/,'')+'.jpg';
   fs.writeFileSync(path.join(dest,name),Buffer.from(frame,'base64'));console.log(name);
 }
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
