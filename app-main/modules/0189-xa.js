
function xa(e) {
  let t = q(e, 42);
  if (!/^queue_[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(t))
    throw Error("Choose an existing queued request.");
  return t;
}