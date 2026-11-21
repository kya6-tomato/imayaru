import{Ft as e,G as t,Kt as n,Mt as r,Nt as i,St as a,Tt as o,U as s,W as c,jt as l,kt as u,lt as d,q as f,qt as p}from"./db-jNGriWkV.js";import{i as m,m as h}from"./timetable-DC_TcVC2.js";var g=12e3,_=`https://claude.ai/new`,v=`claude-sonnet-5-5`,y=300,b=(e,t)=>{let n=e.replace(/\s+/g,` `).trim();return n.length>t?`${n.slice(0,t)}…`:n},x=t=>`${n(t)}（${p(e(t).weekday)}曜日）${i(t)} 現在`,S=`\`\`\`json
{
  "steps": [
    { "title": "手順のタイトル", "estimateMin": 30, "plannedDate": "YYYY-MM-DD" }
  ],
  "advice": "進め方の一言アドバイス（省略可）"
}
\`\`\``,C=`\`\`\`json
{
  "plan": [
    { "taskId": "上の一覧の id（一覧にある作業のときだけ）", "title": "作業のタイトル", "start": "HH:mm", "minutes": 45, "why": "この順にする理由（省略可）" }
  ],
  "advice": "今日の進め方の一言アドバイス（省略可）"
}
\`\`\``,w="返答は、上の形式の JSON を ```json コードブロック 1 つだけで返してください（前後の文章は不要です）。キー名は変えず、JSON として正しい形（ダブルクォート、末尾にカンマなし）にしてください。",T={decompose:S,plan:C},E=(e,t)=>[`- 手順は 3〜8 個。それぞれ 15〜90 分で終わる大きさにし、最初の一歩はすぐ始められるくらい小さくしてください。`,`- 実行する順番に並べてください。「完成」だけで終わる大きな手順は避けます。`,`- estimateMin は分の整数です。`,`- plannedDate は ${e} 以降${t?`（${t} まで）`:``}で、無理のないペースになるよう日付を分けてください。日付が決められないときは省略して構いません。`,`- 既存のサブタスク・紐づくタスクと重なる手順は入れないでください。`].join(`
`);function D({task:e,course:i,now:a=Date.now()}){let s=o(e),d=[`- タイトル：${e.title}`,`- 種類：${f[e.kind]}`];if(i&&d.push(`- 授業：${i.name}`),s===null?d.push(`- 締切：なし`):d.push(`- 締切：${u(e,a)}（${r(s,a)}）`),e.estimateMin&&d.push(`- 所要時間の見積もり：約${l(e.estimateMin)}`),e.priority>0&&d.push(`- 優先度：${c[e.priority]}`),e.submission){let n=e.submission;d.push(`- 提出方法：${t[n.method]}${n.place?`（${n.place}）`:``}`)}if(e.note.trim()&&d.push(`- メモ：${b(e.note,y)}`),e.subtasks.length>0){d.push(`- 既存のサブタスク：`);for(let t of e.subtasks)d.push(`  - [${t.done?`x`:` `}] ${t.title}`)}let p=n(a),m=s===null?null:O(s,p);return[`あなたは大学生の課題管理を手伝うアシスタントです。次の課題を、今日から着手できる小さな手順に分解してください。`,``,`## 今日\n${x(a)}`,``,`## 課題\n${d.join(`
`)}`,``,`## 分解のルール\n${E(p,m)}`,``,`## 返答の形式\n${S}\n\n${w}`].join(`
`)}function O(e,t){let r=n(e),i=a(r,-1);return i>=t?i:t}function k({goal:e,milestones:t=[],tasks:r=[],now:i=Date.now()}){let a=n(i),o=[`- 目標：${e.title}`,`- 期間：${s[e.horizon]}`];o.push(`- 開始日：${e.startDate}${e.targetDate?`、目標日：${e.targetDate}`:``}`),e.why.trim()&&o.push(`- なぜやるか：${b(e.why,y)}`),e.backcast.trim()&&o.push(`- 逆算メモ：${b(e.backcast,y)}`);let c=t.filter(e=>e.deletedAt==null);if(c.length>0){o.push(`- マイルストーン：`);for(let e of c)o.push(`  - [${e.done?`x`:` `}] ${e.title}${e.targetDate?`（${e.targetDate}）`:``}`)}let u=r.filter(e=>e.deletedAt==null),d=u.filter(e=>e.status!==`done`);if(d.length>0){o.push(`- すでにあるタスク（未完了）：`);for(let e of d.slice(0,15))o.push(`  - ${e.title}${e.estimateMin?`（${l(e.estimateMin)}）`:``}`)}let f=u.length-d.length;f>0&&o.push(`- 完了したタスク：${f} 件`);let p=e.targetDate&&e.targetDate>=a?e.targetDate:null;return[`あなたは大学生の目標達成を手伝うアシスタントです。次の目標に向けて、今週から動ける具体的なタスクに分解してください。`,``,`## 今日\n${x(i)}`,``,`## 目標\n${o.join(`
`)}`,``,`## 分解のルール\n${E(a,p)}\n- 「勉強する」のような曖昧な手順ではなく、何をどれだけやるか分かる文にしてください。`,``,`## 返答の形式\n${S}\n\n${w}`].join(`
`)}function A(e,t=Date.now(),n=30){let r=typeof t==`number`?t:Date.parse(String(t));return e.filter(e=>e.deletedAt==null&&e.status!==`done`).sort((e,t)=>d(e,t,r)).slice(0,n)}function j(e,t,n=Date.now(),r={}){let a=h(t,e,n,r),o=new Set(a.classes.map(e=>e.period)),s=i(n).padStart(5,`0`);return[...e].filter(e=>!o.has(e.period)&&e.end>s).sort((e,t)=>e.period-t.period)}function M(e,t,i){let a=[`id=${e.id}`,e.title,f[e.kind]];i&&a.push(`授業:${i}`);let s=o(e);a.push(s===null?`締切なし`:`締切:${u(e,t)}（${r(s,t)}）`),e.estimateMin&&a.push(`見積:${e.estimateMin}分`),e.priority>0&&a.push(`優先度:${c[e.priority]}`),e.todayDate===n(t)&&a.push(`今日やる予定`),e.status===`doing`&&a.push(`着手済み`);let l=e.subtasks.filter(e=>!e.done).length;return e.subtasks.length>0&&a.push(`サブタスク残り${l}/${e.subtasks.length}`),`- ${a.join(` | `)}`}function N({now:e=Date.now(),courses:t,periods:n,tasks:r,holidayClasses:i}){let a=h(t,n,e,{holidayClasses:i}),o=j(n,t,e,{holidayClasses:i}),s=A(r,e),c=new Map(t.map(e=>[e.id,m(e)])),l=a.classes.length>0?a.classes.map(e=>`- ${e.period}限 ${e.start??`?`}–${e.end??`?`} ${m(e.course)}${e.status===`current`?`（授業中）`:e.status===`past`?`（終了）`:``}`):[a.holiday?`- 今日は祝日（${a.holiday}）で授業がありません`:`- 今日は授業がありません`],u=o.length>0?o.map(e=>`- ${e.period}限 ${e.start}–${e.end}`):[`- 授業のない時限はもう残っていません`],d=n.reduce((e,t)=>t.end>e?t.end:e,`00:00`),f=s.length>0?s.map(t=>M(t,e,t.courseId?c.get(t.courseId):void 0)):[`- 未完了のタスクはありません（新しく提案して構いません）`];return[`あなたは大学生の毎日の計画を手伝うアシスタントです。今日この後、何をどの順番でやるかの計画を立ててください。`,``,`## 今日\n${x(e)}`,``,`## 今日の授業\n${l.join(`
`)}`,``,`## 空きコマ（授業がない時間）\n${u.join(`
`)}\n- ${d} 以降の夕方・夜も使えます。`,``,`## 未完了のタスク（id は返答の taskId にそのまま使う）\n${f.join(`
`)}`,``,`## 計画のルール
- 今日（今から寝るまで）に現実的にできる量だけ選んでください。詰め込みすぎないこと。
- 締切が近いもの・期限切れのものを優先し、重い作業は空きコマや授業のあとにまとめてください。
- start は "HH:mm"（24 時間表記）で、授業の時間と重ならず、今より後にしてください。minutes は分の整数です。
- 上の一覧にあるタスクは taskId にその id を書き、title は一覧のタイトルのままにしてください。一覧にない作業（休憩・準備など）を入れるときは taskId を省略してください。`,``,`## 返答の形式\n${C}\n\n${w}`].join(`
`)}function P(e,t){return[`先ほどの返答を、アプリが読み取れませんでした。次の点を直して、形式に合う JSON だけをもう一度返してください。`,``,`## 読み取れなかった点\n${t.length>0?t.map(e=>`- ${e}`).join(`
`):`- JSON として読み取れませんでした`}`,``,`## 返答の形式\n${T[e]}`,``,w].join(`
`)}function F(e,t=g){let n=`${_}?q=${encodeURIComponent(e)}`;return n.length<=t?{url:n,fits:!0}:{url:_,fits:!1}}function I(e){let t=e.trim();return t?t.length<=12?`••••••••`:`${t.slice(0,7)}…${t.slice(-4)}`:``}function L(e){let t=e.trim();return t?/\s/.test(t)?`キーに空白や改行が含まれています。コピーし直してみてください。`:t.startsWith(`sk-ant-`)?t.length<20?`キーが短すぎます。途中で切れていないか確認してください。`:null:`Anthropic のキーは「sk-ant-」で始まります。別のキーではないか確認してください。`:`キーを入力してください。`}export{N as a,I as c,D as i,F as n,P as o,k as r,L as s,v as t};