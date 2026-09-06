import { useEffect, useState } from 'react';
import { motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { LESSONS, TABS, nextLesson } from './data';
import { loadProgress, recordQuiz, recordVisit, setTheme } from './progress';
import type { CommandLesson, VisualState } from './types';
import './App.css';

function Scene({ visual: v, kind }: { visual: VisualState; kind: string }) {
  const cards: NonNullable<VisualState['items']> = v.items ?? [...(v.rooms ?? []).map(name => ({ name, folder: 'folder' })), ...(v.files ?? []).map(name => ({ name }))];
  return <div className={`scene scene-${kind}`}>
    <div className="scene-path">{v.cwd ?? 'Your Linux playground'} <span>VISUAL EXPLANATION</span></div>
    <div className="scene-cards">
      {cards.map((item, i) => <motion.div className={`visual-card ${'match' in item && item.match ? 'match' : ''}`} key={item.name + i} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 'gone' in item && item.gone ? .25 : 1, y: 0 }} transition={{ delay: i * .16 }}><span className="visual-symbol">{'folder' in item && item.folder ? '▰' : '▤'}</span><strong>{item.name}</strong>{item.folder && item.folder !== "folder" && <small>in {item.folder}</small>}{'gone' in item && item.gone && <small>removed</small>}{'match' in item && item.match && <small>match found</small>}</motion.div>)}
      {v.boxes?.map((box, i) => <motion.div className="visual-card" key={i} initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .5 }}><strong>{box.label} →</strong>{box.items.map((item, j) => <code key={j}>{item}</code>)}</motion.div>)}
      {v.workers?.map((worker, i) => <motion.div className="visual-card" key={i} initial={{ scale: .8 }} animate={{ scale: 1, opacity: worker.alive ? 1 : .35 }}><span className="visual-symbol">{worker.alive ? '⚙' : '○'}</span>{worker.name}<small>{worker.alive ? 'running' : 'stopped'}</small></motion.div>)}
      {kind === 'network' && <div className="network"><strong>▣ {v.from ?? 'Your computer'}</strong><motion.span initial={{ x: -35, opacity: 0 }} animate={{ x: 35, opacity: 1 }} transition={{ duration: 1.5, repeat: 2 }}>● → ●</motion.span><strong>▣ {v.to ?? 'Remote computer'}</strong><small>{v.status}</small></div>}
      {(v.file || v.mode) && <motion.div className="visual-card" initial={{ rotate: -5 }} animate={{ rotate: 0 }}><span className="visual-symbol" aria-label="File permissions">🔐</span><strong>{v.file}</strong><code>{v.mode}</code></motion.div>}
      {v.message && <motion.p className="visual-message" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>{v.message}</motion.p>}
      {!cards.length && !v.boxes?.length && !v.workers?.length && !v.file && !v.mode && !v.message && kind !== 'network' && <div className="visual-message">⌘ Command → Linux → Result</div>}
    </div>
  </div>;
}

function TypedCommand({ text, paused }: { text: string; paused: boolean }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (reduced || paused || count >= text.length) return;
    const timer = setTimeout(() => setCount(count + 1), 35);
    return () => clearTimeout(timer);
  }, [count, text, paused, reduced]);
  return <span aria-label={text}><span aria-hidden="true">{reduced ? text : text.slice(0, count)}<span className="prompt">▎</span></span></span>;
}

function Demo({ lesson }: { lesson: CommandLesson }) {
  const [step, setStep] = useState(0);
  const [replay, setReplay] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      if (step < lesson.animationScript.length - 1) setStep(step + 1);
      else setPlaying(false);
    }, Math.max(3500, lesson.animationScript[step].command.length * 35 + 1500));
    return () => clearTimeout(timer);
  }, [playing, step, lesson]);
  const current = lesson.animationScript[step];
  return <section className="demo panel"><div className="section-heading"><h2><span className="section-number">01</span> See it in action</h2><span className="tag">Safe simulation</span></div><Scene key={`${step}-${replay}`} visual={current.visual} kind={lesson.animationKind}/><div className="terminal"><div className="terminal-title"><span>● ● ●</span> playground — bash</div><motion.pre key={`${step}-${replay}`} initial={{ opacity: .2 }} animate={{ opacity: 1 }} transition={{ duration: .7 }}><span className="prompt">you@playground:~$ </span><TypedCommand key={`${step}-${replay}`} text={current.command} paused={!playing}/><br/><span className="terminal-output">{current.output || '(completed without output)'}</span></motion.pre></div><p className="caption">{current.caption}</p><div className="demo-controls"><button onClick={() => { setStep(0); setReplay(replay + 1); setPlaying(true); }}>↻ Replay demo</button><button onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play'}</button><span>Step {step + 1} of {lesson.animationScript.length}</span><button disabled={step === 0} onClick={() => { setPlaying(true); setStep(step - 1); }}>←</button><button aria-label="Next demo step" disabled={step === lesson.animationScript.length - 1} onClick={() => { setPlaying(true); setStep(step + 1); }}>→</button></div></section>;
}

function Quiz({ lesson, onComplete, onNext }: { lesson: CommandLesson; onComplete: (score: number) => void; onNext?: () => void }) {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  // A stable rotation avoids teaching learners that one answer position is always correct.
  const offset = (lesson.id.length + index) % 4;
  const question = lesson.quiz[index];
  const correct = chosen === question.answer;
  function advance() {
    const total = score + (correct ? 1 : 0);
    setScore(total);
    if (index === 4) { setFinished(true); onComplete(total); }
    else { setIndex(index + 1); setChosen(null); }
  }
  return <section className="panel quiz" id="quiz"><div className="section-heading"><h2><span className="section-number">03</span> Put it to the test</h2><span className="tag">5 quick challenges</span></div>{finished ? <div className="quiz-result"><span className="result-icon">{score >= 4 ? '✦' : '↻'}</span><h3>{score >= 4 ? 'Command mastered!' : 'Practice makes progress.'}</h3><p>You scored {score} / 5. {score >= 4 ? 'Your progress has been recorded.' : 'Get 4 correct to master this command. Review the examples and try again.'}</p><button onClick={() => { setIndex(0); setChosen(null); setScore(0); setFinished(false); }}>Try again</button>{onNext && <button className="primary" onClick={onNext}>Next lesson →</button>}</div> : <><div className="question-progress">{lesson.quiz.map((_, i) => <span key={i} className={i <= index ? 'filled' : ''}/>)}</div><p className="eyebrow">CHALLENGE {index + 1} / 5 · {['Understand it', 'Think it through', 'Apply it', 'Spot the detail', 'Make it stick'][index]}</p><h3>{question.prompt}</h3><div className="answers">{question.options.map((_, i) => { const original = (i + offset) % 4; return <button key={i} disabled={chosen !== null} className={chosen === null ? '' : original === question.answer ? 'correct' : original === chosen ? 'incorrect' : ''} onClick={() => setChosen(original)}><span>{String.fromCharCode(65 + i)}</span>{question.options[original]}</button>; })}</div>{chosen !== null && <div className="feedback" role="status"><strong>{correct ? 'That’s right.' : 'Not quite — here’s why.'}</strong><p>{question.explain}</p><button className="primary" onClick={advance}>{index === 4 ? 'See my results' : 'Next challenge →'}</button></div>}</>}</section>;
}

function Example({ command, meaning, output }: CommandLesson['examples'][number]) {
  const [status, setStatus] = useState('Copy');
  return <div className="example"><p>{meaning}</p><div className="code-line"><code>{command}</code><button onClick={async () => { try { await navigator.clipboard.writeText(command); setStatus('Copied'); } catch { setStatus('Select text to copy'); } }}>{status}</button></div><pre>{output || '(no output)'}</pre></div>;
}

export default function App() {
  const [progress, setProgress] = useState(loadProgress);
  const [selected, setSelected] = useState(() => LESSONS.find(l => l.id === progress.lastCommandId) ?? LESSONS[0]);
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState('all');
  const [view, setView] = useState<'learn' | 'progress'>('learn');
  useEffect(() => { document.documentElement.dataset.theme = progress.theme; }, [progress.theme]);
  const mastered = LESSONS.filter(l => progress.mastered.includes(l.id)).length;
  const percent = Math.round(mastered / LESSONS.length * 100);
  const tab = TABS.find(t => t.id === selected.tab)!;
  const list = LESSONS.filter(l => (query ? `${l.name} ${l.explanation}`.toLowerCase().includes(query.toLowerCase()) : l.tab === selected.tab) && (difficulty === 'all' || l.difficulty === difficulty));
  function visit(lesson: CommandLesson) { setSelected(lesson); setView('learn'); setProgress(p => recordVisit(p, lesson.tab, lesson.id)); }
  const next = nextLesson(selected.id, selected.tab);
  return <MotionConfig reducedMotion="user"><div className="app"><aside className="sidebar"><a className="brand" href="#" onClick={() => setView('learn')}><span className="brand-mark">&gt;_</span><span>linux<span className="brand-light">playground</span><small>SMALL COMMANDS. BIG POSSIBILITIES.</small></span></a><div className="nav-label">YOUR WORKSPACE</div><button className={`nav-item ${view === 'learn' ? 'active' : ''}`} onClick={() => setView('learn')}>▦ <span>Learn Linux</span><span>↗</span></button><button className={`nav-item ${view === 'progress' ? 'active' : ''}`} onClick={() => setView('progress')}>◷ <span>My progress</span><span>{percent}%</span></button><div className="nav-label">THE LEARNING PATH <span>{TABS.length}</span></div><nav aria-label="Lesson categories">{TABS.map((category, i) => { const lessons = LESSONS.filter(l => l.tab === category.id); const done = lessons.filter(l => progress.mastered.includes(l.id)).length; return <button key={category.id} className={`category ${selected.tab === category.id ? 'selected' : ''}`} onClick={() => { setQuery(''); setDifficulty('all'); visit(lessons[0]); }}><span className="category-index">{String(i + 1).padStart(2, '0')}</span><span>{category.label}<small>{category.level}</small></span><span className="category-count" title={`${Math.round(done / lessons.length * 100)}% mastered`}><svg className="ring" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle className="ring-value" cx="12" cy="12" r="9" strokeDasharray={`${done / lessons.length * 56.55} 56.55`}/></svg>{done}/{lessons.length}</span></button>; })}</nav><div className="sidebar-tip"><span>✧ A little every day</span><p>One command today. A little more confidence tomorrow.</p><div className="progress-track"><i style={{ width: `${percent}%` }}/></div><small>{mastered} of {LESSONS.length} lessons mastered</small></div></aside><main><header><div className="top-progress" role="progressbar" aria-label="Overall mastery" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${percent}%` }}/></div><div className="breadcrumb">Your learning path <span>/</span> <strong>{view === 'learn' ? tab.label : 'My progress'}</strong></div><button onClick={() => setProgress(p => setTheme(p, p.theme === 'dark' ? 'light' : 'dark'))}>{progress.theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}</button></header><div className="content"><section className="welcome"><div><p className="eyebrow">YOUR NEXT SKILL STARTS HERE</p><h1>Make yourself at <em>~home.</em></h1><p>Learn Linux one command at a time. See it. Try it. Make it stick.</p></div><div className="hero-badge"><span>✦</span><strong>{mastered}</strong><small>lessons mastered</small></div></section><div className="stats"><span><strong>{LESSONS.length}</strong> bite-sized lessons</span><span><strong>{TABS.length}</strong> learning paths</span><span><strong>{LESSONS.length * 5}</strong> quiz questions</span><span className="safe-dot">No experience needed</span></div>{view === 'progress' ? <section className="panel"><h2>Your progress</h2><p>{percent}% mastered · Earn mastery with a score of 4 / 5 or better.</p><div className="progress-grid">{TABS.map(category => <div className="progress-category" key={category.id}><h3>{category.label}</h3>{LESSONS.filter(l => l.tab === category.id).map(l => <button key={l.id} onClick={() => visit(l)}><code>{l.name}</code><span>{progress.mastered.includes(l.id) ? '✓ Mastered' : progress.scores[l.id] !== undefined ? `${progress.scores[l.id]} / 5` : 'Start →'}</span></button>)}</div>)}</div></section> : <><div className="course-toolbar"><div><p className="eyebrow">EXPLORE THE COMMANDS</p><h2>{tab.label}</h2></div><div className="filters"><input aria-label="Search all commands" placeholder="⌕  Search all commands…" value={query} onChange={e => setQuery(e.target.value)}/><select aria-label="Filter difficulty" value={difficulty} onChange={e => setDifficulty(e.target.value)}><option value="all">All levels</option>{['intro', 'beginner', 'intermediate', 'advanced'].map(level => <option key={level}>{level}</option>)}</select></div></div><div className="command-tabs" aria-label="Commands">{list.map(l => <button aria-pressed={l.id === selected.id} className={l.id === selected.id ? 'current' : ''} key={l.id} onClick={() => visit(l)}>{progress.mastered.includes(l.id) && '✓ '}{l.name}</button>)}{!list.length && <p>No matching commands. Try another search or level.</p>}</div><article key={selected.id}><div className="lesson-heading"><div><span className="tag">{selected.difficulty}</span><span className="lesson-number"> LESSON {LESSONS.indexOf(selected) + 1} / {LESSONS.length}</span><h2>{selected.name}<span className="command-cursor">_</span></h2></div><a className="quiz-link" href="#quiz">Test your knowledge ↗</a></div><div className="metaphor"><span>✧</span><p>{selected.metaphor}</p></div><p className="explanation">{selected.explanation}</p>{selected.danger && <p className="danger">⚠ This command can change or remove real data. These demos are simulations; review paths and options before using it on your computer.</p>}<Demo lesson={selected}/><div className="details-grid"><section className="panel"><h2><span className="section-number">02</span> Try these examples</h2>{selected.examples.map((example, i) => <Example key={i} {...example}/>)}</section><section className="panel notes"><h2>Good to know</h2>{selected.flags.length > 0 && <><h3>Useful options</h3>{selected.flags.map((flag, i) => <p key={i}><code>{flag.flag}</code><br/>{flag.meaning}</p>)}</>}<h3>Common mistakes</h3>{selected.pitfalls.map((pitfall, i) => <p key={i}>↳ {pitfall}</p>)}</section></div><Quiz lesson={selected} onComplete={score => setProgress(p => recordQuiz(p, selected.id, score))} onNext={next ? () => { visit(next); window.scrollTo({ top: 0, behavior: 'smooth' }); } : undefined}/></article></>}<footer>Made for curious minds. <span>All terminal examples are simulated.</span></footer></div></main></div></MotionConfig>;
}


