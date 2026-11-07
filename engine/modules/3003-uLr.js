
var uLr = ne(() => {
  Iua = Eua();
  try {
    yZ = Lua(Iua, {
      bun_pty_spawn: { args: [s0.cstring, s0.cstring, s0.cstring, s0.i32, s0.i32], returns: s0.i32 },
      bun_pty_write: { args: [s0.i32, s0.pointer, s0.i32], returns: s0.i32 },
      bun_pty_read: { args: [s0.i32, s0.pointer, s0.i32], returns: s0.i32 },
      bun_pty_resize: { args: [s0.i32, s0.i32, s0.i32], returns: s0.i32 },
      bun_pty_kill: { args: [s0.i32], returns: s0.i32 },
      bun_pty_get_pid: { args: [s0.i32], returns: s0.i32 },
      bun_pty_get_exit_code: { args: [s0.i32], returns: s0.i32 },
      bun_pty_close: { args: [s0.i32], returns: s0.void },
    });
  } catch (e) {
    console.error("Failed to load lib", e);
  }
});