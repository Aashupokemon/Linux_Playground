import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
 const { LESSONS, TABS, nextLesson } = await server.ssrLoadModule('/src/data/index.ts');
 assert.ok(LESSONS.length >= 90);
 assert.equal(new Set(LESSONS.map(l => l.id)).size, LESSONS.length);
 for (const lesson of LESSONS) {
  assert.ok(TABS.some(t => t.id === lesson.tab));
  assert.equal(lesson.quiz.length, 5, lesson.id);
  assert.ok(lesson.examples.length && lesson.animationScript.length && lesson.pitfalls.length, lesson.id);
  for (const q of lesson.quiz) { assert.equal(q.options.length, 4); assert.ok(q.answer >= 0 && q.answer <= 3); assert.ok(q.explain); }
 }
 let raw = null;
 globalThis.localStorage = { getItem: () => raw, setItem: (_, value) => { raw = value; } };
 const progress = await server.ssrLoadModule('/src/progress.ts');
 let p = progress.loadProgress();
 p = progress.recordQuiz(p, LESSONS[0].id, 4);
 assert.ok(p.mastered.includes(LESSONS[0].id));
 p = progress.recordQuiz(p, LESSONS[0].id, 1);
 assert.equal(p.scores[LESSONS[0].id], 4);
 assert.equal(progress.loadProgress().scores[LESSONS[0].id], 4);
 raw = '{broken'; assert.deepEqual(progress.loadProgress().mastered, []);
 raw = '{"mastered":7,"scores":{"x":"bad"}}'; assert.deepEqual(progress.loadProgress().scores, {});
 globalThis.localStorage.setItem = () => { throw new Error('blocked storage'); };
 assert.doesNotThrow(() => progress.recordQuiz(p, 'test', 5));
 assert.equal(nextLesson(LESSONS.at(-1).id, LESSONS.at(-1).tab), undefined);
 console.log(`Validated ${LESSONS.length} lessons, ${LESSONS.length * 5} questions, ${TABS.length} categories; persistence, mastery, corrupt storage and final navigation passed.`);

} finally { await server.close(); }

