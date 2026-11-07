
function Dqs(e) {
  return Error(
    `While upgrading your database migrations table we found ${e.length} (${e.map((t) => `[id: ${t.id}, created_at: ${t.created_at}]`).join(", ")}) migrations in the database that do not match any local migration. This means that some migrations were applied to the database but are missing from the local environment`,
  );
}