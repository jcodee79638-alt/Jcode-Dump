
function DRi(e) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>${lPe(e.title)} \xB7 OpenCode</title>
    <style>${$Fa}</style>
  </head>
  <body>
    ${e.body}${
      e.script
        ? `
    <script>${e.script}</script>`
        : ""
    }
  </body>
</html>`;
}