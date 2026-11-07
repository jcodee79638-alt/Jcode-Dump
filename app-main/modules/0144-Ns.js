
function Ns(e) {
  return (
    !e.workspaceMutation && !e.changingAccess && !e.running && !e.admissions && !e.installing && !e.closing
  );
}