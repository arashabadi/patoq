(()=>{
  if(document.querySelector('#atlas'))return;
  const main=document.querySelector('main');if(!main)return;
  const bar=document.createElement('nav');bar.className='pq-reader';bar.setAttribute('aria-label','Reading tools');
  bar.innerHTML='<a href="atlas.html">↖ Atlas</a><span>READ · QUESTION · CONNECT</span><button aria-pressed="false">Focus</button><div class="pq-read-progress"></div>';document.body.append(bar);
  const button=bar.querySelector('button');button.addEventListener('click',()=>{const on=document.body.classList.toggle('pq-focus');button.setAttribute('aria-pressed',on);button.textContent=on?'Exit focus':'Focus'});
  const progress=bar.querySelector('.pq-read-progress');let queued=false;
  const update=()=>{queued=false;progress.style.width=`${Math.max(0,Math.min(100,scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100))}%`};
  addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update)}},{passive:true});update();
})();
