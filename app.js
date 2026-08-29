
function rand(n){ return Math.floor(Math.random()*n); }
let score=0,total=0,currentAnswer=null;

function newMath(){
  const mode=document.querySelector('[data-math-mode]')?.dataset.mathMode || 'add';
  let a,b,op;
  if(mode==='times'){a=rand(12)+1;b=rand(12)+1;op='×';currentAnswer=a*b;}
  else if(mode==='bonds'){a=rand(11);b=10-a;op='+';currentAnswer=10;}
  else {a=rand(40)+1;b=rand(30)+1;op='+';currentAnswer=a+b;}
  document.getElementById('question').textContent=`${a} ${op} ${b} = ?`;
  let opts=new Set([currentAnswer]);
  while(opts.size<4){opts.add(Math.max(0,currentAnswer + rand(13)-6));}
  [...opts].sort(()=>Math.random()-.5).forEach((v,i)=>{
    const el=document.getElementById('a'+i); el.textContent=v; el.onclick=()=>checkMath(v);
  });
  document.getElementById('feedback').textContent='';
}
function checkMath(v){
  total++; if(v===currentAnswer){score++;document.getElementById('feedback').textContent='⭐ Brilliant!';}
  else document.getElementById('feedback').textContent=`Nearly! The answer is ${currentAnswer}.`;
  document.getElementById('score').textContent=`Score: ${score} / ${total}`;
  setTimeout(newMath,850);
}
const spellWords=['because','friend','school','people','different','beautiful','important','children','thought','through'];
function newSpell(){
  const w=spellWords[rand(spellWords.length)];
  window.spellCurrent=w;
  document.getElementById('spellClue').textContent=`Type this word: ${w}`;
  document.getElementById('spellInput').value='';
  document.getElementById('spellFeedback').textContent='';
}
function checkSpell(){
  const got=document.getElementById('spellInput').value.trim().toLowerCase();
  document.getElementById('spellFeedback').textContent=got===window.spellCurrent?'⭐ Correct!':'Try again — look carefully at the word.';
}
window.addEventListener('DOMContentLoaded',()=>{ if(document.getElementById('question')) newMath(); if(document.getElementById('spellInput')) newSpell(); });
