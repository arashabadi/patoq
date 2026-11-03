/* Curated learning content and a dependency-free map. No network requests. */
(() => {
  'use strict';
  const root = document.getElementById('learning-map');
  if (!root) return;
  const byId = id => root.querySelector(`#${id}`);
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
  const backgrounds = {
    exploring: { label: 'an exploratory starting point', title: 'Choose a small biological question', text: 'Sketch the system and identify one unknown. Read one introductory explanation, then choose a manageable example.', link: 'prerequisites.html', anchor: 'Find your foundations' },
    biology: { label: 'a biology background', title: 'Add statistics and practical code', text: 'Keep your biological question in view. Learn sample-aware comparisons and enough R or Python to inspect a small dataset.', link: 'mathematics_fundamentals.html#statistics-fundamentals-and-resources', anchor: 'Build the statistical bridge' },
    computing: { label: 'a computing background', title: 'Follow the data back to biology', text: 'Learn the relevant biology and assay. Follow one measurement from sample preparation to a value in the data table.', link: 'biology_fundamentals.html', anchor: 'Build the biological bridge' },
    math: { label: 'a mathematics or physics background', title: 'Ground the model in an assay', text: 'Learn the biological system, units and measurement process. Identify which assumptions can be tested and which variables are unobserved.', link: 'biology_fundamentals.html', anchor: 'Connect models to biology' }
  };
  const roles = {
    analyse: { label: 'analyse data', title: 'Reproduce, then challenge a result', text: f => `${f.project} Compare against ${f.baseline}.`, link: 'integrated-platforms.html#version-control-git-github', anchor: 'Keep the analysis reproducible' },
    model: { label: 'model a system', title: 'Build the smallest useful model', text: f => `Start with ${f.mechanism}. State units, assumptions and one prediction that could fail.`, link: 'modeling-simulation.html#mathematical-modeling-of-biological-systems', anchor: 'Explore quantitative models' },
    build: { label: 'develop methods or tools', title: 'Build and benchmark one small tool', text: f => `Implement one narrow task and compare it with ${f.baseline}. Check edge cases, runtime and accuracy on held-out examples.`, link: 'integrated-platforms.html#workflow-management-systems', anchor: 'Build a reusable workflow' },
    experiment: { label: 'connect experiments and computation', title: 'Design a discriminating observation', text: f => `Compare two explanations using ${f.validation}. Define controls, biological replication and what result would change your mind.`, link: 'mathematics_fundamentals.html#statistics-fundamentals-and-resources', anchor: 'Revisit inference & study design' }
  };
  const defaults = { field: 'genomes', from: 'exploring', role: 'analyse', approach: '' };
  const params = new URLSearchParams(location.search);
  const state = {
    field: fields.some(f => f.id === params.get('field')) ? params.get('field') : defaults.field,
    from: Object.hasOwn(backgrounds, params.get('from')) ? params.get('from') : defaults.from,
    role: Object.hasOwn(roles, params.get('role')) ? params.get('role') : defaults.role,
    approach: Object.hasOwn(methods, params.get('approach')) ? params.get('approach') : ''
  };
  const escape = value => String(value).replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
  const getField = id => fields.find(f => f.id === id);
  const color = f => `var(--lm-${f.color})`;

  function createGraph() {
    const lines = bridges.map(([a, b]) => {
      const from = getField(a), to = getField(b);
      return `<path class="lm-bridge" data-a="${a}" data-b="${b}" d="M${from.x},${from.y} Q460,310 ${to.x},${to.y}"/>`;
    }).join('');
    byId('lm-graph').innerHTML = `<svg viewBox="0 0 920 620" role="group" aria-label="Eight connected scientific fields. Select a field to explore it.">
      <ellipse class="lm-ring" cx="460" cy="310" rx="350" ry="245"/>
      ${fields.map(f => `<line class="lm-spoke" data-field="${f.id}" x1="460" y1="310" x2="${f.x}" y2="${f.y}"/>`).join('')}
      ${lines}
      <g class="lm-hub"><circle cx="460" cy="310" r="88"/><text x="460" y="295">A biological</text><text x="460" y="323">question</text><text class="lm-hub-small" x="460" y="350">Learn · test · revise</text></g>
      ${fields.map((f, i) => `<g class="lm-node" data-field="${f.id}" role="button" tabindex="0" aria-label="${escape(f.name)}" aria-controls="lm-detail" aria-pressed="false" transform="translate(${f.x},${f.y})" style="--field-color:${color(f)};cursor:pointer"><rect x="-90" y="-43" width="180" height="86" rx="13"/><circle cx="-68" cy="-23" r="4"/><text class="lm-node-id" x="-56" y="-19">0${i + 1}</text><text x="-68" y="4">${escape(f.label[0])}</text><text x="-68" y="26">${escape(f.label[1])}</text></g>`).join('')}
    </svg>`;
    byId('lm-field-list').innerHTML = fields.map(f => `<button type="button" data-field="${f.id}" aria-controls="lm-detail" aria-pressed="false" style="--field-color:${color(f)}">${escape(f.name)}</button>`).join('');
    byId('lm-methods').innerHTML = `<button type="button" data-method="" aria-pressed="true">All fields</button>${Object.entries(methods).map(([id, [label]]) => `<button type="button" data-method="${id}" aria-pressed="false">${escape(label)}</button>`).join('')}`;
  }

  function syncURL() {
    const url = new URL(location.href);
    for (const [key, value] of Object.entries(state)) {
      if (value && value !== defaults[key]) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    try { history.replaceState(null, '', url); } catch { /* Still usable when history is unavailable. */ }
  }

  function render() {
    const f = getField(state.field);
    const connected = bridges.filter(([a, b]) => a === f.id || b === f.id);
    byId('lm-background').value = state.from;
    byId('lm-role').value = state.role;
    root.querySelectorAll('[data-field]').forEach(node => {
      const match = !state.approach || getField(node.dataset.field).methods.includes(state.approach);
      node.classList.toggle('is-dimmed', !match && node.dataset.field !== state.field);
      node.classList.toggle('is-selected', node.dataset.field === state.field);
      if (node.hasAttribute('aria-pressed')) node.setAttribute('aria-pressed', String(node.dataset.field === state.field));
      if (node.classList.contains('lm-spoke')) node.classList.toggle('is-active', node.dataset.field === state.field);
    });
    root.querySelectorAll('.lm-bridge').forEach(node => node.classList.toggle('is-active', node.dataset.a === f.id || node.dataset.b === f.id));
    root.querySelectorAll('[data-method]').forEach(node => node.setAttribute('aria-pressed', String(node.dataset.method === state.approach)));
    byId('lm-method-note').textContent = state.approach
      ? `${methods[state.approach][1]} Highlighted fields are selected examples, not an exhaustive boundary.`
      : 'Approaches cross field boundaries. Select one to see examples of where it is particularly useful; every field remains selectable.';
    byId('lm-detail').style.setProperty('--field-color', color(f));
    byId('lm-detail').innerHTML = `<p class="lm-eyebrow">A QUESTION TO EXPLORE</p><p class="lm-field-number">0${fields.indexOf(f) + 1}</p><h3 id="lm-field-title">${escape(f.name)}</h3><p class="lm-question">${escape(f.question)}</p>
      <h4>Concepts to understand</h4><ul>${f.concepts.map(c => `<li>${escape(c)}</li>`).join('')}</ul>
      <h4>One small project</h4><p class="lm-project">${escape(f.project)}</p>
      <h4>A scientific check</h4><p>${escape(f.check)}</p>
      <h4>Follow a connection</h4>${connected.map(([a,b,why]) => { const other = getField(a === f.id ? b : a); return `<button class="lm-bridge-button" type="button" data-field="${other.id}">${escape(other.name)} →<small>${escape(why)}</small></button>`; }).join('')}
      <a class="lm-chapter" href="${f.link}">${escape(f.chapter)} →</a>${f.coverage ? `<p class="lm-small">${escape(f.coverage)}</p>` : ''}`;
    const background = backgrounds[state.from], role = roles[state.role];
    byId('lm-route-intro').textContent = `For ${background.label}, exploring ${f.name.toLowerCase()}, with an interest in learning to ${role.label}. This is a suggested first loop; adjust it to your experience and available data.`;
    const steps = [
      [background.title, background.text, background.link, background.anchor],
      ['Understand one measurement', `Choose ${f.data}. Document ${f.measure}. Identify controls, independent samples and what the assay cannot tell you.`, f.link, f.chapter],
      [role.title, role.text(f), role.link, role.anchor],
      ['Check the claim', `Look for ${f.validation}. Try a reasonable alternative analysis and state which conclusions remain supported. ${f.check}`, 'mathematics_fundamentals.html#statistics-fundamentals-and-resources', 'Return to inference'],
      ['Keep the evidence; ask the next question', 'Save inputs, software versions, code and decisions. Link the result to its source and a competing explanation. AI can help you inspect and iterate; record what you actually verified.', '#lm-knowledge', 'Build a small knowledge practice']
    ];
    byId('lm-route-steps').innerHTML = steps.map(([title, text, link, anchor]) => `<li><h4>${escape(title)}</h4><p>${escape(text)}</p><a href="${link}">${escape(anchor)} →</a></li>`).join('');
    byId('lm-status').textContent = '';
    const fallback = byId('lm-share-fallback');
    if (fallback) fallback.remove();
    syncURL();
  }

  root.addEventListener('click', event => {
    const field = event.target.closest('[data-field]');
    if (field && field.tagName.toLowerCase() !== 'line') {
      state.field = field.dataset.field;
      render();
      byId('lm-field-title').tabIndex=-1;byId('lm-field-title').focus({preventScroll:true});byId('lm-detail').scrollIntoView({behavior:'instant',block:'start'});
      return;
    }
    const method = event.target.closest('[data-method]');
    if (method) { state.approach = method.dataset.method; render(); }
  });
  byId('lm-graph').addEventListener('keydown', event => {
    const node = event.target.closest('.lm-node');
    if (!node) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); state.field = node.dataset.field; render();byId('lm-field-title').tabIndex=-1;byId('lm-field-title').focus({preventScroll:true});byId('lm-detail').scrollIntoView({behavior:'instant',block:'start'});
    } else if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      const index = fields.findIndex(f => f.id === node.dataset.field);
      const next = (index + (['ArrowRight','ArrowDown'].includes(event.key) ? 1 : -1) + fields.length) % fields.length;
      byId('lm-graph').querySelector(`[data-field="${fields[next].id}"].lm-node`).focus();
    }
  });
  byId('lm-background').addEventListener('change', event => { state.from = event.target.value; render(); });
  byId('lm-role').addEventListener('change', event => { state.role = event.target.value; render(); });
  byId('lm-reset').addEventListener('click', () => { Object.assign(state, defaults); render(); });
  byId('lm-print').addEventListener('click', () => window.print());
  byId('lm-share').addEventListener('click', async () => {
    const url = new URL(location.href); url.hash = '';
    try {
      await navigator.clipboard.writeText(url.href);
      byId('lm-status').textContent = 'Path link copied. It includes your field, starting point, role and approach.';
    } catch {
      let input = byId('lm-share-fallback');
      if (!input) { input = document.createElement('input'); input.id = 'lm-share-fallback'; input.readOnly = true; input.setAttribute('aria-label', 'Path link to copy'); input.style.width = '100%'; byId('lm-status').after(input); }
      input.value = url.href; input.focus(); input.select();
      byId('lm-status').textContent = 'Copy the selected link below to share this path.';
    }
  });
  createGraph();
  render();
})();
