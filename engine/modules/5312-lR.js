
async function lR(e, t = {}) {
  let r = zCe(e, {
    cwd: t.cwd,
    env: t.env,
    stdin: t.stdin,
    shell: t.shell,
    abort: t.abort,
    kill: t.kill,
    timeout: t.timeout,
    stdout: "pipe",
    stderr: "pipe",
  });
  if (!r.stdout || !r.stderr) throw Error("Process output not available");
  let s = await Promise.all([r.exited, l5i(r.stdout), l5i(r.stderr)])
    .then(([a, H, u]) => ({ code: a, stdout: H, stderr: u }))
    .catch((a) => {
      if (!t.nothrow) throw a;
      return { code: 1, stdout: Buffer.alloc(0), stderr: Buffer.from(fx(a)) };
    });
  if (s.code === 0 || t.nothrow) return s;
  throw new p5i(e, s.code, s.stdout, s.stderr);
}