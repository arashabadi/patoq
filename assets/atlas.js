/* PATOQ geometric scroll atlas. Local, dependency-free; no tracking. */
(() => {
'use strict';
  const fields = [
    {
      id: 'genomes', name: 'Sequence, genomes & variation', label: ['Genomes', '& variation'], color: 'teal', x: 460, y: 65,
      question: 'Which sequence differences matter, and how can we distinguish them from measurement error?',
      concepts: ['Alignment, assembly and annotation', 'Genetic variation and population structure', 'Coverage, reference bias and uncertainty'],
      methods: ['stats', 'algorithms', 'integration', 'machine'],
      project: 'Reproduce a small variant-analysis example. Trace one call back to its read evidence and test how a quality threshold changes it.',
      check: 'Check coverage and mapping quality; distinguish a detected variant from evidence that it causes a phenotype.',
      link: 'omics-data.html#genomics', chapter: 'Explore genomics',
      data: 'a small, documented sequencing example with read-level evidence',
      measure: 'how reads, coverage, references and variant calls were produced',
      baseline: 'a documented quality-filtering baseline',
      mechanism: 'a simple probabilistic model of read evidence and error',
      validation: 'agreement with an independently established variant or benchmark call set'
    },
    {
      id: 'regulation', name: 'Gene regulation & functional genomics', label: ['Regulation', '& function'], color: 'violet', x: 740, y: 145,
      question: 'When does a gene act, what regulates it, and what changes when we perturb the system?',
      concepts: ['Transcription, RNA processing and chromatin', 'Controls, perturbations and confounding', 'Context-dependent regulatory effects'],
      methods: ['stats', 'machine', 'integration', 'mechanistic', 'knowledge'],
      project: 'Reproduce one expression contrast from a small public study. Check the sample design and whether the conclusion survives a reasonable alternative model.',
      check: 'Keep independent samples distinct from cells or reads. An association or enriched gene set alone does not establish a regulatory mechanism.',
      link: 'omics-data.html#transcriptomics', chapter: 'Explore transcriptomics',
      data: 'an expression or chromatin study with clear controls and sample metadata',
      measure: 'sample preparation, assay coverage and the intended biological contrast',
      baseline: 'a simple, design-aware statistical model',
      mechanism: 'a small regulatory model with explicit feedback assumptions',
      validation: 'a held-out experiment or an orthogonal perturbation readout'
    },
    {
      id: 'molecules', name: 'Proteomes, metabolites & molecular omics', label: ['Molecular', 'omics'], color: 'gold', x: 810, y: 315,
      question: 'Which molecules change, how reliably were they identified, and what does that imply about function?',
      concepts: ['Mass spectra, identification and quantification', 'Protein modification and metabolite identity', 'Abundance, enzyme activity and metabolic flux'],
      methods: ['stats', 'algorithms', 'integration', 'machine', 'knowledge'],
      project: 'Reproduce a small protein- or metabolite-abundance comparison. Examine missingness, normalization and identification confidence.',
      check: 'Separate identification from quantification. Transcript abundance, protein abundance, activity and flux are different measurements.',
      link: 'omics-data.html#proteomics', chapter: 'Explore molecular omics',
      data: 'a documented protein or metabolite dataset with sample-level measurements',
      measure: 'identification confidence, missingness and normalization choices',
      baseline: 'a transparent sample-level comparison',
      mechanism: 'a minimal enzyme or metabolic model with measured constraints',
      validation: 'a targeted measurement or independent dataset'
    },
    {
      id: 'structure', name: 'Structural biology & computational biophysics', label: ['Structure', '& biophysics'], color: 'rose', x: 690, y: 490,
      question: 'How do molecular structure, motion and energetics constrain biological function?',
      concepts: ['Structure quality and molecular interactions', 'Conformational dynamics and thermodynamics', 'Prediction, simulation and experimental validation'],
      methods: ['algorithms', 'machine', 'mechanistic', 'stats'],
      project: 'Compare a predicted structure with an experimental structure. Inspect confidence, interfaces and one alternative conformation; propose a testable functional hypothesis.',
      check: 'A plausible pose does not measure binding affinity or prove function. Match the structural state and experimental conditions.',
      link: 'modeling-simulation.html#molecular-modeling-and-dynamics', chapter: 'Explore structural modeling',
      data: 'a small experimental structure and a corresponding prediction',
      measure: 'experimental resolution, uncertainty, molecular state and model confidence',
      baseline: 'a template or experimentally determined reference',
      mechanism: 'a minimal physical model with explicit energetic and sampling assumptions',
      validation: 'structural agreement plus a separate functional or binding measurement'
    },
    {
      id: 'cells', name: 'Cells, tissues & spatial biology', label: ['Cells, tissues', '& space'], color: 'teal', x: 460, y: 555,
      question: 'Where are cells, how do their states change, and how does tissue organization constrain what they do?',
      concepts: ['Cell identity, state and measurement quality', 'Anatomy, section orientation and spatial scale', 'Time, lineage and functional evidence'],
      methods: ['stats', 'machine', 'integration', 'algorithms', 'mechanistic'],
      project: 'Reproduce a small cell-state or spatial comparison. Check sample identities, annotation evidence and anatomical context before interpreting a pattern.',
      check: 'Nearby cells need not communicate. A two-dimensional section is incomplete evidence of three-dimensional organization; cells are not independent biological replicates.',
      link: 'omics-data.html#transcriptomics', chapter: 'Start with the single-cell section',
      coverage: 'The current chapter introduces single-cell RNA analysis; dedicated spatial and anatomical material is still a gap in the book.',
      data: 'a small single-cell or spatial dataset with independent-sample metadata',
      measure: 'sample origin, assay coverage, cell assignment and anatomical context',
      baseline: 'a sample-aware comparison with simple annotation checks',
      mechanism: 'a small spatial or cell-state model with explicit transition assumptions',
      validation: 'independent tissue, protein imaging or prospective lineage measurements'
    },
    {
      id: 'systems', name: 'Systems biology & multiscale modeling', label: ['Systems', '& dynamics'], color: 'violet', x: 220, y: 490,
      question: 'How do interacting components produce feedback, stability, oscillation or change across scales?',
      concepts: ['Regulatory, signaling and metabolic networks', 'Kinetics, feedback and dynamical systems', 'Identifiability, sensitivity and model assumptions'],
      methods: ['mechanistic', 'stats', 'integration', 'algorithms'],
      project: 'Build a minimal feedback model. Reproduce one qualitative behavior, vary its parameters and identify a measurement that could distinguish competing mechanisms.',
      check: 'A model fitting observed data may have non-unique mechanisms or parameters. Test sensitivity and predictions beyond the fitted observations.',
      link: 'modeling-simulation.html#systems-biology', chapter: 'Explore systems modeling',
      data: 'a small time course or published system with explicit model assumptions',
      measure: 'time resolution, units, boundary conditions and observed variables',
      baseline: 'a simpler model with fewer assumptions',
      mechanism: 'a minimal deterministic or stochastic model before adding complexity',
      validation: 'an independent time course or perturbation not used for fitting'
    },
    {
      id: 'evolution', name: 'Evolution, populations & communities', label: ['Evolution', '& communities'], color: 'gold', x: 110, y: 315,
      question: 'How do ancestry, selection and environment shape variation within and between populations or communities?',
      concepts: ['Phylogeny, selection, drift and sampling', 'Population structure and ecological context', 'Microbial composition versus absolute abundance'],
      methods: ['stats', 'algorithms', 'mechanistic', 'integration', 'machine'],
      project: 'Reproduce a small phylogeny or community comparison. Test how sampling and an alternative analysis choice change the interpretation.',
      check: 'Respect shared ancestry and sampling structure. Relative microbial abundance can change without an absolute increase in the organism.',
      link: 'modeling-simulation.html#computational-ecology-evolution-and-phylogenetics', chapter: 'Explore evolution & ecology',
      data: 'a small aligned sequence set or community dataset with sampling metadata',
      measure: 'sampling, sequence comparability and population or environmental structure',
      baseline: 'a simple tree, population or community model',
      mechanism: 'a minimal evolutionary or ecological model with stated assumptions',
      validation: 'resampling stability and an independent population or environment'
    },
    {
      id: 'engineering', name: 'Computational design & bioengineering', label: ['Design', '& engineering'], color: 'rose', x: 180, y: 145,
      question: 'Can we design a molecule or biological system with a specified, measurable behavior?',
      concepts: ['Design objectives and biological constraints', 'Protein, enzyme and genetic-circuit design', 'Design–build–test–learn cycles'],
      methods: ['machine', 'algorithms', 'mechanistic', 'stats', 'integration'],
      project: 'Reproduce a small published design example. Compare candidates against a simple baseline and define the experimental success criterion before ranking them.',
      check: 'A high computational score is not a measured biological outcome. Check specificity, stability and feasibility in the intended setting.',
      link: 'specialized-topics.html#synthetic-biology', chapter: 'Explore biological engineering',
      data: 'a documented design task with experimental outcomes and controls',
      measure: 'the intended function, assay conditions and experimental success criterion',
      baseline: 'a known design, random candidate or simpler search method as appropriate',
      mechanism: 'a constrained model of the intended molecular or circuit behavior',
      validation: 'a prospective functional assay with appropriate controls'
    }
  ];
  const methods = {
    stats: ['Statistics & inference', 'Estimate effects, uncertainty and design-aware comparisons. Statistical thinking supports every path.'],
    algorithms: ['Algorithms & computation', 'Represent the problem and build efficient, testable computational solutions.'],
    machine: ['Machine learning & AI', 'Learn or generate patterns; check leakage, baselines and generalization. Using a coding agent and developing a biological ML model require different skills.'],
    mechanistic: ['Mechanistic models', 'Turn biological assumptions into explicit quantitative predictions.'],
    integration: ['Data integration', 'Connect measurements while checking compatibility, missingness and confounding.'],
    knowledge: ['Knowledge representation', 'Organize entities, evidence and relationships using annotations, ontologies or knowledge graphs.']
  };
  const bridges = [
    ['genomes', 'regulation', 'Link sequence variation to context-dependent regulatory effects.'],
    ['genomes', 'evolution', 'Interpret variation using ancestry and population history.'],
    ['regulation', 'molecules', 'Connect RNA regulation with protein and metabolite measurements.'],
    ['regulation', 'cells', 'Resolve regulatory effects in particular cell states and tissues.'],
    ['molecules', 'structure', 'Connect molecular measurements with structure and biochemical function.'],
    ['molecules', 'systems', 'Constrain metabolic and signaling models with measured molecules.'],
    ['structure', 'engineering', 'Use structural and physical constraints to guide molecular design.'],
    ['cells', 'systems', 'Connect tissue organization and cell behavior to dynamics.'],
    ['systems', 'evolution', 'Study how population or community interactions change over time.'],
    ['systems', 'engineering', 'Use feedback models to design biological circuits.'],
    ['engineering', 'regulation', 'Design and test gene-regulatory interventions.']
  ];
  const atlas = document.querySelector('#atlas');
  if (!atlas) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const svg = atlas.querySelector('.at-lines');
  const nodes = atlas.querySelector('#at-nodes');
  const detail = atlas.querySelector('#at-detail');
  const index = atlas.querySelector('#at-index');
  const positions = fields.map((f,i)=>{const a=(i/8)*Math.PI*2-Math.PI/2;return [500+365*Math.cos(a),360+260*Math.sin(a)]});
  const esc = s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  for (const [a,b] of bridges) {
    const i=fields.findIndex(f=>f.id===a),j=fields.findIndex(f=>f.id===b);
    const line=document.createElementNS('http://www.w3.org/2000/svg','line');
    ['x1','y1','x2','y2'].forEach((k,n)=>line.setAttribute(k,[...positions[i],...positions[j]][n]));svg.append(line);
  }
  fields.forEach((f,i)=>{
    const btn=document.createElement('button');btn.className='at-node';btn.dataset.field=f.id;
    btn.style.left=`${positions[i][0]}px`;btn.style.top=`${positions[i][1]}px`;
    btn.setAttribute('aria-label',`Explore ${f.name}`);btn.setAttribute('aria-haspopup','dialog');
    btn.innerHTML=`<small>0${i+1} / EXPLORE ↗</small>${f.label.map(esc).join('<br>')}`;
    btn.addEventListener('click',()=>openField(f));nodes.append(btn);
  });
  function openField(f){
    atlas.querySelector('#at-detail-content').innerHTML=`<p class="at-eyebrow">A QUESTION TO FOLLOW</p><h2 id="at-detail-title">${esc(f.name)}</h2><p>${esc(f.question)}</p><h3>Ideas to connect</h3><ul>${f.concepts.map(c=>`<li>${esc(c)}</li>`).join('')}</ul><h3>Try one small experiment</h3><p>${esc(f.project)}</p><div class="at-proof"><strong>Before you believe the result</strong><p>${esc(f.check)}</p></div><a class="at-enter" href="${esc(f.link)}">${esc(f.chapter)} <span>↗</span></a><h3>Follow a connection</h3><div class="at-index-links">${bridges.filter(b=>b[0]===f.id||b[1]===f.id).map(b=>{const other=fields.find(g=>g.id===(b[0]===f.id?b[1]:b[0]));return `<button class="at-related" data-related="${other.id}" style="text-align:left;background:none;border:0;border-bottom:1px solid #20272122;padding:14px 0"><b>${esc(other.name)} ↗</b><br><small>${esc(b[2])}</small></button>`}).join('')}</div><p class="at-small" style="margin-top:25px">A curated starting point, not a universal taxonomy. Chapter coverage varies.</p>`;
    atlas.querySelectorAll('[data-related]').forEach(b=>b.addEventListener('click',()=>openField(fields.find(f=>f.id===b.dataset.related))));
    const url=new URL(location.href);url.searchParams.set('field',f.id);history.replaceState(null,'',url);
    if(!detail.open)detail.showModal();detail.scrollTop=0;detail.querySelector('.at-close').focus();
  }
  const chapters=[['Start here','prerequisites.html'],['Biology','biology_fundamentals.html'],['Mathematics & statistics','mathematics_fundamentals.html'],['Computing','computer_science_fundamentals.html'],['Omics & biological data','omics-data.html'],['Modeling & simulation','modeling-simulation.html'],['Platforms & workflows','integrated-platforms.html'],['Specialized topics','specialized-topics.html'],['Research in the AI era','research-directions.html'],['More resources','additional-resources.html']];
  atlas.querySelector('.at-index-links').innerHTML=chapters.map(([title,url])=>`<a href="${url}">${title}<span>↗</span></a>`).join('');
  atlas.querySelector('.at-menu').addEventListener('click',()=>index.showModal());
  atlas.querySelectorAll('dialog').forEach(d=>{
    d.querySelector('.at-close').addEventListener('click',()=>d.close());
    d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}});
  });
  detail.addEventListener('close',()=>{const u=new URL(location.href);u.searchParams.delete('field');history.replaceState(null,'',u)});
  atlas.querySelectorAll('.at-step').forEach(b=>b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!open);b.querySelector('div').hidden=open}));
  const journey=atlas.querySelector('.at-journey'),map=atlas.querySelector('.at-map'),heading=atlas.querySelector('.at-heading'),caption=atlas.querySelector('.at-map-caption'),cue=atlas.querySelector('.at-scroll-cue');
  let queued=false;
  const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
  function draw(){
    queued=false;const mobile=innerWidth<761;const rect=journey.getBoundingClientRect();
    const t=clamp(-rect.top/Math.max(1,journey.offsetHeight-innerHeight));
    const eased=t*t*(3-2*t);const scale=mobile?Math.min(.50,(innerWidth-18)/1000):Math.min(.96,innerWidth/1400);
    const initial=mobile?0:innerWidth*.32;
    const pts=mobile?fields.map((f,i)=>[i%2?760:240,95+Math.floor(i/2)*180]):positions;
    nodes.querySelectorAll('.at-node').forEach((b,i)=>{b.style.left=pts[i][0]+'px';b.style.top=pts[i][1]+'px'});
    svg.querySelectorAll('line').forEach((line,n)=>{const [a,b]=bridges[n];const i=fields.findIndex(f=>f.id===a),j=fields.findIndex(f=>f.id===b);['x1','y1','x2','y2'].forEach((k,n)=>line.setAttribute(k,[...pts[i],...pts[j]][n]))});
    map.style.opacity=.28+.72*eased;
    map.style.transform=`translate(calc(-50% + ${initial*(1-eased)}px), calc(-50% + ${mobile?(1-eased)*180-15:-10}px)) scale(${scale*(1+.25*(1-eased))}) rotate(${reduced.matches?0:12*(1-eased)}deg)`;
    heading.style.opacity=reduced.matches?1:1-clamp(t*2.5);heading.style.transform=`translateY(${-t*90}px)`;
    heading.style.visibility=t>.5&&!reduced.matches?'hidden':'visible';
    caption.style.opacity=clamp((t-.5)*3);cue.style.opacity=1-clamp(t*4);
    atlas.querySelector('.at-progress').style.width=`${clamp(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight))*100}%`;
  }
  function schedule(){if(!queued){queued=true;requestAnimationFrame(draw)}}
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduced.addEventListener('change',schedule);draw();
  const initial=fields.find(f=>f.id===new URLSearchParams(location.search).get('field'));if(initial)openField(initial);
})();
