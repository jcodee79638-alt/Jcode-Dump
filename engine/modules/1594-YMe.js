
var YMe = ne(() => {
  cV();
  Lw = {
    time_created: Wd()
      .notNull()
      .$default(() => Date.now()),
    time_updated: Wd()
      .notNull()
      .$onUpdate(() => Date.now()),
  };
});