
async function $Ta({ stopConditions: e, steps: t }) {
  return (await Promise.all(e.map((r) => r({ steps: t })))).some((r) => r);
}