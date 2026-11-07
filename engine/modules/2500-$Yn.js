
var $Yn = Ie(function (Iuc, LYn) {
  var Qi = uYn(),
    sEt = mYn(),
    hYn = cr("querystring"),
    { join: lur } = cr("path"),
    { readFileSync: aOo } = cr("fs"),
    HOo = (e) => {
      try {
        return aOo(e, "utf8");
      } catch (t) {
        if (t.code !== "ENOENT") throw t;
        return null;
      }
    },
    cOo = (e) => {
      let t = e.include || [],
        r = e.omit || [],
        s = e.only;
      if (/^prod(uction)?$/.test(s) || e.production) r.push("dev");
      else if (e.production === !1) t.push("dev");
      if (/^dev/.test(e.also)) t.push("dev");
      if (e.dev) t.push("dev");
      if (e.optional === !1) r.push("optional");
      else if (e.optional === !0) t.push("optional");
      if (
        ((e.omit = [...new Set(r)].filter((a) => !t.includes(a))),
        (e.include = [...new Set(t)]),
        e.omit.includes("dev"))
      )
        process.env.NODE_ENV = "production";
      return e.omit;
    },
    AOo = process.env.EDITOR || process.env.VISUAL || `${process.env.SYSTEMROOT}\\notepad.exe`,
    uOo = process.env.ComSpec || "cmd",
    { networkInterfaces: lOo } = cr("os"),
    fOo = () => {
      try {
        return Object.values(lOo())
          .map((e) => e.map(({ address: t }) => t))
          .reduce((e, t) => e.concat(t), [null]);
      } catch (e) {
        return [null];
      }
    },
    pOo = /UTF-?8$/i.test(process.env.LC_ALL || process.env.LC_CTYPE || process.env.LANG),
    dOo = process.env.LOCALAPPDATA || "~",
    mOo = `${dOo}/npm-cache`,
    {
      semver: { type: _Yn },
      Umask: { type: _Oo },
      url: { type: k7e },
      path: { type: g5 },
    } = $Se(),
    Na = (e, t, r) => {
      let s = e.replace(/-([a-z])/g, (a, H) => H.toUpperCase());
      r[s] = t[e];
    },
    NV = {
      _auth: new Qi("_auth", {
        default: null,
        type: [null, String],
        description: `
    A basic-auth string to use when authenticating against the npm registry.
    This will ONLY be used to authenticate against the npm registry.  For other
    registries you will need to scope it like "//other-registry.tld/:_auth"

    Warning: This should generally not be set via a command-line option.  It
    is safer to use a registry-provided authentication bearer token stored in
    the ~/.npmrc file by running \`npm login\`.
  `,
        flatten: Na,
      }),
      access: new Qi("access", {
        default: null,
        defaultDescription: `
    'public' for new packages, existing packages it will not change the current level
  `,
        type: [null, "restricted", "public"],
        description:
          "\n    If you do not want your scoped package to be publicly viewable (and\n    installable) set `--access=restricted`.\n\n    Unscoped packages cannot be set to `restricted`.\n\n    Note: This defaults to not changing the current access level for existing\n    packages.  Specifying a value of `restricted` or `public` during\n    publish will change the access for an existing package the same way that\n    `npm access set status` would.\n  ",
        flatten: Na,
      }),
      all: new Qi("all", {
        default: !1,
        type: Boolean,
        short: "a",
        description:
          "\n    When running `npm outdated` and `npm ls`, setting `--all` will show\n    all outdated or installed packages, rather than only those directly\n    depended upon by the current project.\n  ",
        flatten: Na,
      }),
      "allow-same-version": new Qi("allow-same-version", {
        default: !1,
        type: Boolean,
        description: `
    Prevents throwing an error when \`npm version\` is used to set the new
    version to the same value as the current version.
  `,
        flatten: Na,
      }),
      "allow-git": new Qi("allow-git", {
        default: "all",
        type: ["all", "none", "root"],
        description:
          "\n      Limits the ability for npm to fetch dependencies from git references.\n      That is, dependencies that point to a git repo instead of a version or semver range.\n      Please note that this could leave your tree incomplete and some packages may not function as intended or designed.\n\n      `all` allows any git dependencies to be fetched and installed.\n      `none` prevents any git dependencies from being fetched and installed.\n      `root` only allows git dependencies defined in your project's package.json to be fetched installed.  Also allows git dependencies to be fetched for other commands like `npm view`\n  ",
        flatten: Na,
      }),
      also: new Qi("also", {
        default: null,
        type: [null, "dev", "development"],
        description:
          "\n      When set to `dev` or `development`, this is an alias for\n      `--include=dev`.\n    ",
        deprecated: "Please use --include=dev instead.",
        flatten(e, t, r) {
          NV.omit.flatten("omit", t, r);
        },
      }),
      audit: new Qi("audit", {
        default: !0,
        type: Boolean,
        description: `
      When "true" submit audit reports alongside the current npm command to the
      default registry and all registries configured for scopes.  See the
      documentation for [\`npm audit\`](/commands/npm-audit) for details on what
      is submitted.
    `,
        flatten: Na,
      }),
      "audit-level": new Qi("audit-level", {
        default: null,
        type: [null, "info", "low", "moderate", "high", "critical", "none"],
        description: `
    The minimum level of vulnerability for \`npm audit\` to exit with
    a non-zero exit code.
    `,
        flatten: Na,
      }),
      "auth-type": new Qi("auth-type", {
        default: "web",
        type: ["legacy", "web"],
        description:
          "\n      What authentication strategy to use with `login`.\n      Note that if an `otp` config is given, this value will always be set to `legacy`.\n    ",
        flatten: Na,
      }),
      before: new Qi("before", {
        default: null,
        hint: "<date>",
        type: [null, Date],
        exclusive: ["min-release-age"],
        description:
          "\n      If passed to `npm install`, will rebuild the npm tree such that only\n      versions that were available **on or before** the given date are\n      installed.  If there are no versions available for the current set of\n      dependencies, the command will error.\n\n      If the requested version is a `dist-tag` and the given tag does not\n      pass the `--before` filter, the most recent version less than or equal\n      to that tag will be used. For example, `foo@latest` might install\n      `foo@1.2` even though `latest` is `2.0`.\n    ",
        flatten: Na,
      }),
      "bin-links": new Qi("bin-links", {
        default: !0,
        type: Boolean,
        description: `
      Tells npm to create symlinks (or \`.cmd\` shims on Windows) for package
      executables.

      Set to false to have it not do this.  This can be used to work around the
      fact that some file systems don't support symlinks, even on ostensibly
      Unix systems.
    `,
        flatten: Na,
      }),
      browser: new Qi("browser", {
        default: null,
        defaultDescription: '\n    macOS: `"open"`, Windows: `"start"`, Others: `"xdg-open"`\n    ',
        type: [null, Boolean, String],
        description: `
    The browser that is called by npm commands to open websites.

    Set to \`false\` to suppress browser behavior and instead print urls to
    terminal.

    Set to \`true\` to use default system URL opener.
    `,
        flatten: Na,
      }),
      "bypass-2fa": new Qi("bypass-2fa", {
        default: !1,
        type: Boolean,
        description: `
      When creating a Granular Access Token with \`npm token create\`,
      setting this to true will allow the token to bypass two-factor
      authentication. This is useful for automation and CI/CD workflows.
    `,
        flatten: Na,
      }),
      ca: new Qi("ca", {
        default: null,
        type: [null, String, Array],
        description: `
    The Certificate Authority signing certificate that is trusted for SSL
    connections to the registry. Values should be in PEM format (Windows
      calls it "Base-64 encoded X.509 (.CER)") with newlines replaced by the
    string "\\n". For example:

    \`\`\`ini
    ca="-----BEGIN CERTIFICATE-----\\nXXXX\\nXXXX\\n-----END CERTIFICATE-----"
    \`\`\`

    Set to \`null\` to only allow "known" registrars, or to a specific CA
    cert to trust only that specific signing authority.

    Multiple CAs can be trusted by specifying an array of certificates:

    \`\`\`ini
    ca[]="..."
    ca[]="..."
    \`\`\`

    See also the \`strict-ssl\` config.
  `,
        flatten: Na,
      }),
      cache: new Qi("cache", {
        default: mOo,
        defaultDescription: "\n      Windows: `%LocalAppData%\\npm-cache`, Posix: `~/.npm`\n    ",
        type: g5,
        description: `
      The location of npm's cache directory.
    `,
        flatten(e, t, r) {
          ((r.cache = lur(t.cache, "_cacache")),
            (r.npxCache = lur(t.cache, "_npx")),
            (r.tufCache = lur(t.cache, "_tuf")));
        },
      }),
      "cache-max": new Qi("cache-max", {
        default: 1 / 0,
        type: Number,
        description: "\n      `--cache-max=0` is an alias for `--prefer-online`\n    ",
        deprecated: "\n      This option has been deprecated in favor of `--prefer-online`\n    ",
        flatten(e, t, r) {
          if (t[e] <= 0) r.preferOnline = !0;
        },
      }),
      "cache-min": new Qi("cache-min", {
        default: 0,
        type: Number,
        description: "\n      `--cache-min=9999 (or bigger)` is an alias for `--prefer-offline`.\n    ",
        deprecated: "\n      This option has been deprecated in favor of `--prefer-offline`.\n    ",
        flatten(e, t, r) {
          if (t[e] >= 9999) r.preferOffline = !0;
        },
      }),
      cafile: new Qi("cafile", {
        default: null,
        type: g5,
        description: `
      A path to a file containing one or multiple Certificate Authority signing
      certificates. Similar to the \`ca\` setting, but allows for multiple
      CA's, as well as for the CA information to be stored in a file on disk.
    `,
        flatten(e, t, r) {
          if (!t.cafile) return;
          let s = HOo(t.cafile);
          if (!s) return;
          let a = "-----END CERTIFICATE-----";
          r.ca = s
            .replace(
              /\r\n/g,
              `
`,
            )
            .split(a)
            .filter((H) => H.trim())
            .map((H) => H.trimLeft() + a);
        },
      }),
      call: new Qi("call", {
        default: "",
        type: String,
        short: "c",
        description:
          '\n      Optional companion option for `npm exec`, `npx` that allows for\n      specifying a custom command to be run along with the installed packages.\n\n      ```bash\n      npm exec --package yo --package generator-node --call "yo node"\n      ```\n    ',
        flatten: Na,
      }),
      cert: new Qi("cert", {
        default: null,
        type: [null, String],
        description: `
      A client certificate to pass when accessing the registry.  Values should
      be in PEM format (Windows calls it "Base-64 encoded X.509 (.CER)") with
      newlines replaced by the string "\\n". For example:

      \`\`\`ini
      cert="-----BEGIN CERTIFICATE-----\\nXXXX\\nXXXX\\n-----END CERTIFICATE-----"
      \`\`\`

      It is _not_ the path to a certificate file, though you can set a registry-scoped
      "certfile" path like "//other-registry.tld/:certfile=/path/to/cert.pem".
    `,
        deprecated:
          "\n      `key` and `cert` are no longer used for most registry operations.\n      Use registry scoped `keyfile` and `certfile` instead.\n      Example:\n      //other-registry.tld/:keyfile=/path/to/key.pem\n      //other-registry.tld/:certfile=/path/to/cert.crt\n    ",
        flatten: Na,
      }),
      cidr: new Qi("cidr", {
        default: null,
        type: [null, String, Array],
        description: `
      This is a list of CIDR address to be used when configuring limited access
      tokens with the \`npm token create\` command.
    `,
        flatten: Na,
      }),
      color: new Qi("color", {
        default: !process.env.NO_COLOR || process.env.NO_COLOR === "0",
        usage: "--color|--no-color|--color always",
        defaultDescription: `
      true unless the NO_COLOR environ is set to something other than '0'
    `,
        type: ["always", Boolean],
        description: `
      If false, never shows colors.  If \`"always"\` then always shows colors.
      If true, then only prints color codes for tty file descriptors.
    `,
        flatten(e, t, r) {
          ((r.color = !t.color ? !1 : t.color === "always" ? !0 : !!process.stdout.isTTY),
            (r.logColor = !t.color ? !1 : t.color === "always" ? !0 : !!process.stderr.isTTY));
        },
      }),
      "commit-hooks": new Qi("commit-hooks", {
        default: !0,
        type: Boolean,
        description: "\n      Run git commit hooks when using the `npm version` command.\n    ",
        flatten: Na,
      }),
      cpu: new Qi("cpu", {
        default: null,
        type: [null, String],
        description:
          "\n      Override CPU architecture of native modules to install.\n      Acceptable values are same as `cpu` field of package.json,\n      which comes from `process.arch`.\n    ",
        flatten: Na,
      }),
      depth: new Qi("depth", {
        default: null,
        defaultDescription: "\n      `Infinity` if `--all` is set; otherwise, `0`\n    ",
        type: [null, Number],
        description:
          "\n      The depth to go when recursing packages for `npm ls`.\n\n      If not set, `npm ls` will show only the immediate dependencies of the\n      root project.  If `--all` is set, then npm will show all dependencies\n      by default.\n    ",
        flatten: Na,
      }),
      description: new Qi("description", {
        default: !0,
        type: Boolean,
        usage: "--no-description",
        description: "\n      Show the description in `npm search`\n    ",
        flatten(e, t, r) {
          ((r.search = r.search || { limit: 20 }), (r.search[e] = t[e]));
        },
      }),
      dev: new Qi("dev", {
        default: !1,
        type: Boolean,
        description: "\n      Alias for `--include=dev`.\n    ",
        deprecated: "Please use --include=dev instead.",
        flatten(e, t, r) {
          NV.omit.flatten("omit", t, r);
        },
      }),
      diff: new Qi("diff", {
        default: [],
        hint: "<package-spec>",
        type: [String, Array],
        description: "\n      Define arguments to compare in `npm diff`.\n    ",
        flatten: Na,
      }),
      "diff-ignore-all-space": new Qi("diff-ignore-all-space", {
        default: !1,
        type: Boolean,
        description: "\n      Ignore whitespace when comparing lines in `npm diff`.\n    ",
        flatten: Na,
      }),
      "diff-name-only": new Qi("diff-name-only", {
        default: !1,
        type: Boolean,
        description: "\n      Prints only filenames when using `npm diff`.\n    ",
        flatten: Na,
      }),
      "diff-no-prefix": new Qi("diff-no-prefix", {
        default: !1,
        type: Boolean,
        description:
          "\n      Do not show any source or destination prefix in `npm diff` output.\n\n      Note: this causes `npm diff` to ignore the `--diff-src-prefix` and\n      `--diff-dst-prefix` configs.\n    ",
        flatten: Na,
      }),
      "diff-dst-prefix": new Qi("diff-dst-prefix", {
        default: "b/",
        hint: "<path>",
        type: String,
        description: "\n      Destination prefix to be used in `npm diff` output.\n    ",
        flatten: Na,
      }),
      "diff-src-prefix": new Qi("diff-src-prefix", {
        default: "a/",
        hint: "<path>",
        type: String,
        description: "\n      Source prefix to be used in `npm diff` output.\n    ",
        flatten: Na,
      }),
      "diff-text": new Qi("diff-text", {
        default: !1,
        type: Boolean,
        description: "\n      Treat all files as text in `npm diff`.\n    ",
        flatten: Na,
      }),
      "diff-unified": new Qi("diff-unified", {
        default: 3,
        type: Number,
        description: "\n      The number of lines of context to print in `npm diff`.\n    ",
        flatten: Na,
      }),
      "dry-run": new Qi("dry-run", {
        default: !1,
        type: Boolean,
        description:
          "\n      Indicates that you don't want npm to make any changes and that it should\n      only report what it would have done.  This can be passed into any of the\n      commands that modify your local installation, eg, `install`,\n      `update`, `dedupe`, `uninstall`, as well as `pack` and\n      `publish`.\n\n      Note: This is NOT honored by other network related commands, eg\n      `dist-tags`, `owner`, etc.\n    ",
        flatten: Na,
      }),
      editor: new Qi("editor", {
        default: AOo,
        defaultDescription: `
      The EDITOR or VISUAL environment variables, or '%SYSTEMROOT%\\notepad.exe' on Windows,
      or 'vi' on Unix systems
    `,
        type: String,
        description: "\n      The command to run for `npm edit` and `npm config edit`.\n    ",
        flatten: Na,
      }),
      "engine-strict": new Qi("engine-strict", {
        default: !1,
        type: Boolean,
        description: `
      If set to true, then npm will stubbornly refuse to install (or even
      consider installing) any package that claims to not be compatible with
      the current Node.js version.

      This can be overridden by setting the \`--force\` flag.
    `,
        flatten: Na,
      }),
      "expect-result-count": new Qi("expect-result-count", {
        default: null,
        type: [null, Number],
        hint: "<count>",
        exclusive: ["expect-results"],
        description: `
      Tells to expect a specific number of results from the command.
    `,
      }),
      "expect-results": new Qi("expect-results", {
        default: null,
        type: [null, Boolean],
        exclusive: ["expect-result-count"],
        description: `
      Tells npm whether or not to expect results from the command.
      Can be either true (expect some results) or false (expect no results).
    `,
      }),
      expires: new Qi("expires", {
        default: null,
        type: [null, Number],
        description: `
      When creating a Granular Access Token with \`npm token create\`,
      this sets the expiration in days. If not specified, the server
      will determine the default expiration.
    `,
        flatten: Na,
      }),
      "fetch-retries": new Qi("fetch-retries", {
        default: 2,
        type: Number,
        description: `
      The "retries" config for the \`retry\` module to use when fetching
      packages from the registry.

      npm will retry idempotent read requests to the registry in the case
      of network failures or 5xx HTTP errors.
    `,
        flatten(e, t, r) {
          ((r.retry = r.retry || {}), (r.retry.retries = t[e]));
        },
      }),
      "fetch-retry-factor": new Qi("fetch-retry-factor", {
        default: 10,
        type: Number,
        description: `
      The "factor" config for the \`retry\` module to use when fetching
      packages.
    `,
        flatten(e, t, r) {
          ((r.retry = r.retry || {}), (r.retry.factor = t[e]));
        },
      }),
      "fetch-retry-maxtimeout": new Qi("fetch-retry-maxtimeout", {
        default: 60000,
        defaultDescription: "60000 (1 minute)",
        type: Number,
        description: `
      The "maxTimeout" config for the \`retry\` module to use when fetching
      packages.
    `,
        flatten(e, t, r) {
          ((r.retry = r.retry || {}), (r.retry.maxTimeout = t[e]));
        },
      }),
      "fetch-retry-mintimeout": new Qi("fetch-retry-mintimeout", {
        default: 1e4,
        defaultDescription: "10000 (10 seconds)",
        type: Number,
        description: `
      The "minTimeout" config for the \`retry\` module to use when fetching
      packages.
    `,
        flatten(e, t, r) {
          ((r.retry = r.retry || {}), (r.retry.minTimeout = t[e]));
        },
      }),
      "fetch-timeout": new Qi("fetch-timeout", {
        default: 300000,
        defaultDescription: "300000 (5 minutes)",
        type: Number,
        description: `
      The maximum amount of time to wait for HTTP requests to complete.
    `,
        flatten(e, t, r) {
          r.timeout = t[e];
        },
      }),
      force: new Qi("force", {
        default: !1,
        type: Boolean,
        short: "f",
        description:
          "\n      Removes various protections against unfortunate side effects, common\n      mistakes, unnecessary performance degradation, and malicious input.\n\n      * Allow clobbering non-npm files in global installs.\n      * Allow the `npm version` command to work on an unclean git repository.\n      * Allow deleting the cache folder with `npm cache clean`.\n      * Allow installing packages that have an `engines` declaration\n        requiring a different version of npm.\n      * Allow installing packages that have an `engines` declaration\n        requiring a different version of `node`, even if `--engine-strict`\n        is enabled.\n      * Allow `npm audit fix` to install modules outside your stated\n        dependency range (including SemVer-major changes).\n      * Allow unpublishing all versions of a published package.\n      * Allow conflicting peerDependencies to be installed in the root project.\n      * Implicitly set `--yes` during `npm init`.\n      * Allow clobbering existing values in `npm pkg`\n      * Allow unpublishing of entire packages (not just a single version).\n\n      If you don't have a clear idea of what you want to do, it is strongly\n      recommended that you do not use this option!\n    ",
        flatten: Na,
      }),
      "foreground-scripts": new Qi("foreground-scripts", {
        default: !1,
        defaultDescription:
          "`false` unless when using `npm pack` or `npm publish` where it\n    defaults to `true`",
        type: Boolean,
        description: `
      Run all build scripts (ie, \`preinstall\`, \`install\`, and
      \`postinstall\`) scripts for installed packages in the foreground
      process, sharing standard input, output, and error with the main npm
      process.

      Note that this will generally make installs run slower, and be much
      noisier, but can be useful for debugging.
    `,
        flatten: Na,
      }),
      "format-package-lock": new Qi("format-package-lock", {
        default: !0,
        type: Boolean,
        description:
          "\n      Format `package-lock.json` or `npm-shrinkwrap.json` as a human\n      readable file.\n    ",
        flatten: Na,
      }),
      fund: new Qi("fund", {
        default: !0,
        type: Boolean,
        description:
          '\n      When "true" displays the message at the end of each `npm install`\n      acknowledging the number of dependencies looking for funding.\n      See [`npm fund`](/commands/npm-fund) for details.\n    ',
        flatten: Na,
      }),
      git: new Qi("git", {
        default: "git",
        type: String,
        description: `
      The command to use for git commands.  If git is installed on the
      computer, but is not in the \`PATH\`, then set this to the full path to
      the git binary.
    `,
        flatten: Na,
      }),
      "git-tag-version": new Qi("git-tag-version", {
        default: !0,
        type: Boolean,
        description: `
      Tag the commit when using the \`npm version\` command.  Setting this to
      false results in no commit being made at all.
    `,
        flatten: Na,
      }),
      global: new Qi("global", {
        default: !1,
        type: Boolean,
        short: "g",
        description: `
      Operates in "global" mode, so that packages are installed into the
      \`prefix\` folder instead of the current working directory.  See
      [folders](/configuring-npm/folders) for more on the differences in
      behavior.

      * packages are installed into the \`{prefix}/lib/node_modules\` folder,
        instead of the current working directory.
      * bin files are linked to \`{prefix}/bin\`
      * man pages are linked to \`{prefix}/share/man\`
    `,
        flatten: (e, t, r) => {
          if ((Na(e, t, r), r.global)) r.location = "global";
        },
      }),
      globalconfig: new Qi("globalconfig", {
        type: g5,
        default: "",
        defaultDescription: `
      The global --prefix setting plus 'etc/npmrc'. For example,
      '/usr/local/etc/npmrc'
    `,
        description: `
      The config file to read for global config options.
    `,
        flatten: Na,
      }),
      "global-style": new Qi("global-style", {
        default: !1,
        type: Boolean,
        description:
          "\n      Only install direct dependencies in the top level `node_modules`,\n      but hoist on deeper dependencies.\n      Sets `--install-strategy=shallow`.\n    ",
        deprecated: "\n      This option has been deprecated in favor of `--install-strategy=shallow`\n    ",
        flatten(e, t, r) {
          if (t[e]) ((t["install-strategy"] = "shallow"), (r.installStrategy = "shallow"));
        },
      }),
      heading: new Qi("heading", {
        default: "npm",
        type: String,
        description: `
      The string that starts all the debugging log output.
    `,
        flatten: Na,
      }),
      "https-proxy": new Qi("https-proxy", {
        default: null,
        type: [null, k7e],
        description:
          "\n      A proxy to use for outgoing https requests. If the `HTTPS_PROXY` or\n      `https_proxy` or `HTTP_PROXY` or `http_proxy` environment variables\n      are set, proxy settings will be honored by the underlying\n      `make-fetch-happen` library.\n    ",
        flatten: Na,
      }),
      "if-present": new Qi("if-present", {
        default: !1,
        type: Boolean,
        envExport: !1,
        description: `
      If true, npm will not exit with an error code when \`run\` is
      invoked for a script that isn't defined in the \`scripts\` section of
      \`package.json\`. This option can be used when it's desirable to
      optionally run a script when it's present and fail if the script fails.
      This is useful, for example, when running scripts that may only apply for
      some builds in an otherwise generic CI setup.
    `,
        flatten: Na,
      }),
      "ignore-scripts": new Qi("ignore-scripts", {
        default: !1,
        type: Boolean,
        description:
          "\n      If true, npm does not run scripts specified in package.json files.\n\n      Note that commands explicitly intended to run a particular script, such\n      as `npm start`, `npm stop`, `npm restart`, `npm test`, and `npm\n      run` will still run their intended script if `ignore-scripts` is\n      set, but they will *not* run any pre- or post-scripts.\n    ",
        flatten: Na,
      }),
      include: new Qi("include", {
        default: [],
        type: [Array, "prod", "dev", "optional", "peer"],
        description: `
      Option that allows for defining which types of dependencies to install.

      This is the inverse of \`--omit=<type>\`.

      Dependency types specified in \`--include\` will not be omitted,
      regardless of the order in which omit/include are specified on the
      command-line.
    `,
        flatten(e, t, r) {
          NV.omit.flatten("omit", t, r);
        },
      }),
      "include-staged": new Qi("include-staged", {
        default: !1,
        type: Boolean,
        description: `
      Allow installing "staged" published packages, as defined by [npm RFC PR
      #92](https://github.com/npm/rfcs/pull/92).

      This is experimental, and not implemented by the npm public registry.
    `,
        flatten: Na,
      }),
      "include-workspace-root": new Qi("include-workspace-root", {
        default: !1,
        type: Boolean,
        envExport: !1,
        description: `
      Include the workspace root when workspaces are enabled for a command.

      When false, specifying individual workspaces via the \`workspace\` config,
      or all workspaces via the \`workspaces\` flag, will cause npm to operate only
      on the specified workspaces, and not on the root project.
    `,
        flatten: Na,
      }),
      "include-attestations": new Qi("include-attestations", {
        default: !1,
        type: Boolean,
        description: `
      When used with \`npm audit signatures --json\`, includes the full
      sigstore attestation bundles in the JSON output for each verified
      package. The bundles contain DSSE envelopes, verification material,
      and transparency log entries.
    `,
        flatten: Na,
      }),
      "init-author-email": new Qi("init-author-email", {
        default: "",
        hint: "<email>",
        type: String,
        description: `
      The value \`npm init\` should use by default for the package author's
      email.
    `,
      }),
      "init-author-name": new Qi("init-author-name", {
        default: "",
        hint: "<name>",
        type: String,
        description:
          "\n      The value `npm init` should use by default for the package author's name.\n    ",
      }),
      "init-author-url": new Qi("init-author-url", {
        default: "",
        type: ["", k7e],
        hint: "<url>",
        description:
          "\n      The value `npm init` should use by default for the package author's homepage.\n    ",
      }),
      "init-license": new Qi("init-license", {
        default: "ISC",
        hint: "<license>",
        type: String,
        description: "\n      The value `npm init` should use by default for the package license.\n    ",
      }),
      "init-module": new Qi("init-module", {
        default: "~/.npm-init.js",
        type: g5,
        hint: "<module>",
        description: `
      A module that will be loaded by the \`npm init\` command.  See the
      documentation for the
      [init-package-json](https://github.com/npm/init-package-json) module for
      more information, or [npm init](/commands/npm-init).
    `,
      }),
      "init-type": new Qi("init-type", {
        default: "commonjs",
        type: String,
        hint: "<type>",
        description:
          "\n      The value that `npm init` should use by default for the package.json type field.\n    ",
      }),
      "init-version": new Qi("init-version", {
        default: "1.0.0",
        type: _Yn,
        hint: "<version>",
        description: `
      The value that \`npm init\` should use by default for the package
      version number, if not already set in package.json.
    `,
      }),
      "init-private": new Qi("init-private", {
        default: !1,
        type: Boolean,
        description:
          "\n      The value `npm init` should use by default for the package's private flag.\n    ",
        flatten: Na,
      }),
      "init.author.email": new Qi("init.author.email", {
        default: "",
        type: String,
        deprecated: "\n      Use `--init-author-email` instead.",
        description: "\n      Alias for `--init-author-email`\n    ",
      }),
      "init.author.name": new Qi("init.author.name", {
        default: "",
        type: String,
        deprecated: "\n      Use `--init-author-name` instead.\n    ",
        description: "\n      Alias for `--init-author-name`\n    ",
      }),
      "init.author.url": new Qi("init.author.url", {
        default: "",
        type: ["", k7e],
        deprecated: "\n      Use `--init-author-url` instead.\n    ",
        description: "\n      Alias for `--init-author-url`\n    ",
      }),
      "init.license": new Qi("init.license", {
        default: "ISC",
        type: String,
        deprecated: "\n      Use `--init-license` instead.\n    ",
        description: "\n      Alias for `--init-license`\n    ",
      }),
      "init.module": new Qi("init.module", {
        default: "~/.npm-init.js",
        type: g5,
        deprecated: "\n      Use `--init-module` instead.\n    ",
        description: "\n      Alias for `--init-module`\n    ",
      }),
      "init.version": new Qi("init.version", {
        default: "1.0.0",
        type: _Yn,
        deprecated: "\n      Use `--init-version` instead.\n    ",
        description: "\n      Alias for `--init-version`\n    ",
      }),
      "install-links": new Qi("install-links", {
        default: !1,
        type: Boolean,
        description: `
      When set file: protocol dependencies will be packed and installed as
      regular dependencies instead of creating a symlink. This option has
      no effect on workspaces.
    `,
        flatten: Na,
      }),
      "install-strategy": new Qi("install-strategy", {
        default: "hoisted",
        type: ["hoisted", "nested", "shallow", "linked"],
        description: `
      Sets the strategy for installing packages in node_modules.
      hoisted (default): Install non-duplicated in top-level, and duplicated as
        necessary within directory structure.
      nested: (formerly --legacy-bundling) install in place, no hoisting.
      shallow (formerly --global-style) only install direct deps at top-level.
      linked: (experimental) install in node_modules/.store, link in place,
        unhoisted.
    `,
        flatten: Na,
      }),
      json: new Qi("json", {
        default: !1,
        type: Boolean,
        description: `
      Whether or not to output JSON data, rather than the normal output.

      * In \`npm pkg set\` it enables parsing set values with JSON.parse()
      before saving them to your \`package.json\`.

      Not supported by all npm commands.
    `,
        flatten: Na,
      }),
      key: new Qi("key", {
        default: null,
        type: [null, String],
        description: `
      A client key to pass when accessing the registry.  Values should be in
      PEM format with newlines replaced by the string "\\n". For example:

      \`\`\`ini
      key="-----BEGIN PRIVATE KEY-----\\nXXXX\\nXXXX\\n-----END PRIVATE KEY-----"
      \`\`\`

      It is _not_ the path to a key file, though you can set a registry-scoped
      "keyfile" path like "//other-registry.tld/:keyfile=/path/to/key.pem".
    `,
        deprecated:
          "\n      `key` and `cert` are no longer used for most registry operations.\n      Use registry scoped `keyfile` and `certfile` instead.\n      Example:\n      //other-registry.tld/:keyfile=/path/to/key.pem\n      //other-registry.tld/:certfile=/path/to/cert.crt\n    ",
        flatten: Na,
      }),
      "legacy-bundling": new Qi("legacy-bundling", {
        default: !1,
        type: Boolean,
        description: `
      Instead of hoisting package installs in \`node_modules\`, install packages
      in the same manner that they are depended on. This may cause very deep
      directory structures and duplicate package installs as there is no
      de-duplicating.
      Sets \`--install-strategy=nested\`.
    `,
        deprecated: "\n      This option has been deprecated in favor of `--install-strategy=nested`\n    ",
        flatten(e, t, r) {
          if (t[e]) ((t["install-strategy"] = "nested"), (r.installStrategy = "nested"));
        },
      }),
      "legacy-peer-deps": new Qi("legacy-peer-deps", {
        default: !1,
        type: Boolean,
        description:
          "\n      Causes npm to completely ignore `peerDependencies` when building a\n      package tree, as in npm versions 3 through 6.\n\n      If a package cannot be installed because of overly strict\n      `peerDependencies` that collide, it provides a way to move forward\n      resolving the situation.\n\n      This differs from `--omit=peer`, in that `--omit=peer` will avoid\n      unpacking `peerDependencies` on disk, but will still design a tree such\n      that `peerDependencies` _could_ be unpacked in a correct place.\n\n      Use of `legacy-peer-deps` is not recommended, as it will not enforce\n      the `peerDependencies` contract that meta-dependencies may rely on.\n    ",
        flatten: Na,
      }),
      libc: new Qi("libc", {
        default: null,
        type: [null, String],
        description: `
      Override libc of native modules to install.
      Acceptable values are same as \`libc\` field of package.json
    `,
        flatten: Na,
      }),
      link: new Qi("link", {
        default: !1,
        type: Boolean,
        description: `
      Used with \`npm ls\`, limiting output to only those packages that are
      linked.
    `,
      }),
      "local-address": new Qi("local-address", {
        default: null,
        type: fOo(),
        typeDescription: "IP Address",
        description: `
      The IP address of the local interface to use when making connections to
      the npm registry.  Must be IPv4 in versions of Node prior to 0.12.
    `,
        flatten: Na,
      }),
      location: new Qi("location", {
        default: "user",
        short: "L",
        type: ["global", "user", "project"],
        defaultDescription:
          '\n      "user" unless `--global` is passed, which will also set this value to "global"\n    ',
        description: `
      When passed to \`npm config\` this refers to which config file to use.

      When set to "global" mode, packages are installed into the \`prefix\` folder
      instead of the current working directory. See
      [folders](/configuring-npm/folders) for more on the differences in behavior.

      * packages are installed into the \`{prefix}/lib/node_modules\` folder,
        instead of the current working directory.
      * bin files are linked to \`{prefix}/bin\`
      * man pages are linked to \`{prefix}/share/man\`
    `,
        flatten: (e, t, r) => {
          if ((Na(e, t, r), r.global)) r.location = "global";
          if (t.location === "global") r.global = !0;
        },
      }),
      "lockfile-version": new Qi("lockfile-version", {
        default: null,
        type: [null, 1, 2, 3, "1", "2", "3"],
        defaultDescription: `
      Version 3 if no lockfile, auto-converting v1 lockfiles to v3; otherwise,
      maintain current lockfile version.`,
        description: `
      Set the lockfile format version to be used in package-lock.json and
      npm-shrinkwrap-json files.  Possible options are:

      1: The lockfile version used by npm versions 5 and 6.  Lacks some data that
      is used during the install, resulting in slower and possibly less
      deterministic installs.  Prevents lockfile churn when interoperating with
      older npm versions.

      2: The default lockfile version used by npm version 7 and 8.  Includes both
      the version 1 lockfile data and version 3 lockfile data, for maximum
      determinism and interoperability, at the expense of more bytes on disk.

      3: Only the new lockfile information introduced in npm version 7.  Smaller
      on disk than lockfile version 2, but not interoperable with older npm
      versions.  Ideal if all users are on npm version 7 and higher.
    `,
        flatten: (e, t, r) => {
          r.lockfileVersion = t[e] && parseInt(t[e], 10);
        },
      }),
      loglevel: new Qi("loglevel", {
        default: "notice",
        type: ["silent", "error", "warn", "notice", "http", "info", "verbose", "silly"],
        description: `
      What level of logs to report.  All logs are written to a debug log,
      with the path to that file printed if the execution of a command fails.

      Any logs of a higher level than the setting are shown. The default is
      "notice".

      See also the \`foreground-scripts\` config.
    `,
        flatten(e, t, r) {
          r.silent = t[e] === "silent";
        },
      }),
      "logs-dir": new Qi("logs-dir", {
        default: null,
        type: [null, g5],
        defaultDescription: "\n      A directory named `_logs` inside the cache\n  ",
        description: `
      The location of npm's log directory.  See [\`npm
      logging\`](/using-npm/logging) for more information.
    `,
      }),
      "logs-max": new Qi("logs-max", {
        default: 10,
        type: Number,
        description: `
      The maximum number of log files to store.

      If set to 0, no log files will be written for the current run.
    `,
      }),
      long: new Qi("long", {
        default: !1,
        type: Boolean,
        short: "l",
        description: "\n      Show extended information in `ls`, `search`, and `help-search`.\n    ",
      }),
      name: new Qi("name", {
        default: null,
        type: [null, String],
        hint: "<name>",
        description: `
      When creating a Granular Access Token with \`npm token create\`,
      this sets the name/description for the token.
    `,
        flatten: Na,
      }),
      maxsockets: new Qi("maxsockets", {
        default: 15,
        type: Number,
        description: `
      The maximum number of connections to use per origin (protocol/host/port
      combination).
    `,
        flatten(e, t, r) {
          r.maxSockets = t[e];
        },
      }),
      message: new Qi("message", {
        default: "%s",
        type: String,
        short: "m",
        description: `
      Commit message which is used by \`npm version\` when creating version commit.

      Any "%s" in the message will be replaced with the version number.
    `,
        flatten: Na,
      }),
      "min-release-age": new Qi("min-release-age", {
        default: null,
        hint: "<days>",
        type: [null, Number],
        exclusive: ["before"],
        envExport: !1,
        description: `
       If set, npm will build the npm tree such that only versions that were
       available more than the given number of days ago will be installed.  If
       there are no versions available for the current set of dependencies, the
       command will error.

       This flag is a complement to \`before\`, which accepts an exact date
       instead of a relative number of days.
    `,
        flatten: (e, t, r) => {
          if (t["min-release-age"] !== null)
            ((r.before = new Date(Date.now() - 86400000 * t["min-release-age"])),
              (t.before = r.before),
              delete t["min-release-age"]);
        },
      }),
      "node-gyp": new Qi("node-gyp", {
        default: (() => {
          try {
            return cr.resolve("node-gyp/bin/node-gyp.js");
          } catch {
            return "";
          }
        })(),
        defaultDescription: `
      The path to the node-gyp bin that ships with npm
    `,
        type: g5,
        description: `
      This is the location of the "node-gyp" bin.  By default it uses one that ships with npm itself.

      You can use this config to specify your own "node-gyp" to run when it is required to build a package.
    `,
        flatten: Na,
      }),
      "node-options": new Qi("node-options", {
        default: null,
        type: [null, String],
        description: `
      Options to pass through to Node.js via the \`NODE_OPTIONS\` environment
      variable.  This does not impact how npm itself is executed but it does
      impact how lifecycle scripts are called.
    `,
      }),
      noproxy: new Qi("noproxy", {
        default: "",
        defaultDescription: `
      The value of the NO_PROXY environment variable
    `,
        type: [String, Array],
        description: `
      Domain extensions that should bypass any proxies.

      Also accepts a comma-delimited string.
    `,
        flatten(e, t, r) {
          if (Array.isArray(t[e])) r.noProxy = t[e].join(",");
          else r.noProxy = t[e];
        },
      }),
      offline: new Qi("offline", {
        default: !1,
        type: Boolean,
        description: `
      Force offline mode: no network requests will be done during install. To allow
      the CLI to fill in missing cache data, see \`--prefer-offline\`.
    `,
        flatten: Na,
      }),
      omit: new Qi("omit", {
        default: [],
        defaultDescription: `
      'dev' if the \`NODE_ENV\` environment variable is set to 'production';
      otherwise, empty.
    `,
        type: [Array, "dev", "optional", "peer"],
        description:
          "\n      Dependency types to omit from the installation tree on disk.\n\n      Note that these dependencies _are_ still resolved and added to the\n      `package-lock.json` or `npm-shrinkwrap.json` file.  They are just\n      not physically installed on disk.\n\n      If a package type appears in both the `--include` and `--omit`\n      lists, then it will be included.\n\n      If the resulting omit list includes `'dev'`, then the `NODE_ENV`\n      environment variable will be set to `'production'` for all lifecycle\n      scripts.\n    ",
        flatten(e, t, r) {
          r.omit = cOo(t);
        },
      }),
      "omit-lockfile-registry-resolved": new Qi("omit-lockfile-registry-resolved", {
        default: !1,
        type: Boolean,
        description: `
      This option causes npm to create lock files without a \`resolved\` key for
      registry dependencies. Subsequent installs will need to resolve tarball
      endpoints with the configured registry, likely resulting in a longer install
      time.
    `,
        flatten: Na,
      }),
      only: new Qi("only", {
        default: null,
        type: [null, "prod", "production"],
        deprecated: "\n      Use `--omit=dev` to omit dev dependencies from the install.\n    ",
        description:
          "\n      When set to `prod` or `production`, this is an alias for\n      `--omit=dev`.\n    ",
        flatten(e, t, r) {
          NV.omit.flatten("omit", t, r);
        },
      }),
      orgs: new Qi("orgs", {
        default: null,
        type: [null, String, Array],
        description: `
      When creating a Granular Access Token with \`npm token create\`,
      this limits the token access to specific organizations.
    `,
        flatten: Na,
      }),
      optional: new Qi("optional", {
        default: null,
        type: [null, Boolean],
        deprecated: `
      Use \`--omit=optional\` to exclude optional dependencies, or
      \`--include=optional\` to include them.

      Default value does install optional deps unless otherwise omitted.
    `,
        description: `
      Alias for --include=optional or --omit=optional
    `,
        flatten(e, t, r) {
          NV.omit.flatten("omit", t, r);
        },
      }),
      os: new Qi("os", {
        default: null,
        type: [null, String],
        description:
          "\n      Override OS of native modules to install.\n      Acceptable values are same as `os` field of package.json,\n      which comes from `process.platform`.\n    ",
        flatten: Na,
      }),
      otp: new Qi("otp", {
        default: null,
        type: [null, String],
        description: `
      This is a one-time password from a two-factor authenticator.  It's needed
      when publishing or changing package permissions with \`npm access\`.

      If not set, and a registry response fails with a challenge for a one-time
      password, npm will prompt on the command line for one.
    `,
        flatten(e, t, r) {
          if ((Na(e, t, r), t.otp)) ((t["auth-type"] = "legacy"), Na("auth-type", t, r));
        },
      }),
      package: new Qi("package", {
        default: [],
        hint: "<package-spec>",
        type: [String, Array],
        description: "\n      The package or packages to install for [`npm exec`](/commands/npm-exec)\n    ",
        flatten: Na,
      }),
      "package-lock": new Qi("package-lock", {
        default: !0,
        type: Boolean,
        description:
          "\n      If set to false, then ignore `package-lock.json` files when installing.\n      This will also prevent _writing_ `package-lock.json` if `save` is\n      true.\n    ",
        flatten: (e, t, r) => {
          if ((Na(e, t, r), r.packageLockOnly)) r.packageLock = !0;
        },
      }),
      "package-lock-only": new Qi("package-lock-only", {
        default: !1,
        type: Boolean,
        description:
          "\n      If set to true, the current operation will only use the `package-lock.json`,\n      ignoring `node_modules`.\n\n      For `update` this means only the `package-lock.json` will be updated,\n      instead of checking `node_modules` and downloading dependencies.\n\n      For `list` this means the output will be based on the tree described by the\n      `package-lock.json`, rather than the contents of `node_modules`.\n    ",
        flatten: (e, t, r) => {
          if ((Na(e, t, r), r.packageLockOnly)) r.packageLock = !0;
        },
      }),
      "pack-destination": new Qi("pack-destination", {
        default: ".",
        type: String,
        description: "\n      Directory in which `npm pack` will save tarballs.\n    ",
        flatten: Na,
      }),
      packages: new Qi("packages", {
        default: [],
        type: [null, String, Array],
        description: `
      When creating a Granular Access Token with \`npm token create\`,
      this limits the token access to specific packages.
    `,
        flatten: Na,
      }),
      parseable: new Qi("parseable", {
        default: !1,
        type: Boolean,
        short: "p",
        description: `
      Output parseable results from commands that write to standard output. For
      \`npm search\`, this will be tab-separated table format.
    `,
        flatten: Na,
      }),
      "prefer-dedupe": new Qi("prefer-dedupe", {
        default: !1,
        type: Boolean,
        description: `
      Prefer to deduplicate packages if possible, rather than
      choosing a newer version of a dependency.
    `,
        flatten: Na,
      }),
      "prefer-offline": new Qi("prefer-offline", {
        default: !1,
        type: Boolean,
        description: `
      If true, staleness checks for cached data will be bypassed, but missing
      data will be requested from the server. To force full offline mode, use
      \`--offline\`.
    `,
        flatten: Na,
      }),
      "prefer-online": new Qi("prefer-online", {
        default: !1,
        type: Boolean,
        description: `
      If true, staleness checks for cached data will be forced, making the CLI
      look for updates immediately even for fresh package data.
    `,
        flatten: Na,
      }),
      prefix: new Qi("prefix", {
        type: g5,
        short: "C",
        default: "",
        defaultDescription: `
      In global mode, the folder where the node executable is installed.
      Otherwise, the nearest parent folder containing either a package.json
      file or a node_modules folder.
    `,
        description: `
      The location to install global items.  If set on the command line, then
      it forces non-global commands to run in the specified folder.
    `,
      }),
      preid: new Qi("preid", {
        default: "",
        hint: "prerelease-id",
        type: String,
        description:
          '\n      The "prerelease identifier" to use as a prefix for the "prerelease" part\n      of a semver. Like the `rc` in `1.2.0-rc.8`.\n    ',
        flatten: Na,
      }),
      production: new Qi("production", {
        default: null,
        type: [null, Boolean],
        deprecated: "Use `--omit=dev` instead.",
        description: "Alias for `--omit=dev`",
        flatten(e, t, r) {
          NV.omit.flatten("omit", t, r);
        },
      }),
      progress: new Qi("progress", {
        default: !(sEt.isCI || !process.stderr.isTTY || !process.stdout.isTTY || process.env.TERM === "dumb"),
        defaultDescription:
          "\n      `true` when not in CI and both stderr and stdout are TTYs and not in a dumb terminal\n    ",
        type: Boolean,
        description:
          "\n      When set to `true`, npm will display a progress bar during time\n      intensive operations, if `process.stderr` and `process.stdout` are a TTY.\n\n      Set to `false` to suppress the progress bar.\n    ",
        flatten(e, t, r) {
          r.progress =
            !!t.progress && !!process.stderr.isTTY && !!process.stdout.isTTY && process.env.TERM !== "dumb";
        },
      }),
      provenance: new Qi("provenance", {
        default: !1,
        type: Boolean,
        exclusive: ["provenance-file"],
        description: `
      When publishing from a supported cloud CI/CD system, the package will be
      publicly linked to where it was built and published from.
    `,
        flatten: Na,
      }),
      "provenance-file": new Qi("provenance-file", {
        default: null,
        type: g5,
        hint: "<file>",
        exclusive: ["provenance"],
        description: `
      When publishing, the provenance bundle at the given path will be used.
    `,
        flatten: Na,
      }),
      proxy: new Qi("proxy", {
        default: null,
        type: [null, !1, k7e],
        description:
          "\n      A proxy to use for outgoing http requests. If the `HTTP_PROXY` or\n      `http_proxy` environment variables are set, proxy settings will be\n      honored by the underlying `request` library.\n    ",
        flatten: Na,
      }),
      "read-only": new Qi("read-only", {
        default: !1,
        type: Boolean,
        description: `
      This is used to mark a token as unable to publish when configuring
      limited access tokens with the \`npm token create\` command.
    `,
        flatten: Na,
      }),
      "rebuild-bundle": new Qi("rebuild-bundle", {
        default: !0,
        type: Boolean,
        description: `
      Rebuild bundled dependencies after installation.
    `,
        flatten: Na,
      }),
      registry: new Qi("registry", {
        default: "https://registry.npmjs.org/",
        type: k7e,
        description: `
      The base URL of the npm registry.
    `,
        flatten: Na,
      }),
      "replace-registry-host": new Qi("replace-registry-host", {
        default: "npmjs",
        hint: "<npmjs|never|always> | hostname",
        type: ["npmjs", "never", "always", String],
        description: `
      Defines behavior for replacing the registry host in a lockfile with the
      configured registry.

      The default behavior is to replace package dist URLs from the default
      registry (https://registry.npmjs.org) to the configured registry. If set to
      "never", then use the registry value. If set to "always", then replace the
      registry host with the configured host every time.

      You may also specify a bare hostname (e.g., "registry.npmjs.org").
    `,
        flatten: Na,
      }),
      save: new Qi("save", {
        default: !0,
        defaultDescription: "`true` unless when using `npm update` where it\n    defaults to `false`",
        usage: "-S|--save|--no-save|--save-prod|--save-dev|--save-optional|--save-peer|--save-bundle",
        type: Boolean,
        short: "S",
        description:
          "\n      Save installed packages to a `package.json` file as dependencies.\n\n      When used with the `npm rm` command, removes the dependency from\n      `package.json`.\n\n      Will also prevent writing to `package-lock.json` if set to `false`.\n    ",
        flatten: Na,
      }),
      "save-bundle": new Qi("save-bundle", {
        default: !1,
        type: Boolean,
        short: "B",
        description:
          "\n      If a package would be saved at install time by the use of `--save`,\n      `--save-dev`, or `--save-optional`, then also put it in the\n      `bundleDependencies` list.\n\n      Ignored if `--save-peer` is set, since peerDependencies cannot be bundled.\n    ",
        flatten(e, t, r) {
          r.saveBundle = t["save-bundle"] && !t["save-peer"];
        },
      }),
      "save-dev": new Qi("save-dev", {
        default: !1,
        type: Boolean,
        short: "D",
        exclusive: ["save-optional", "save-peer", "save-prod"],
        description: "\n      Save installed packages to a package.json file as `devDependencies`.\n    ",
        flatten(e, t, r) {
          if (!t[e]) {
            if (r.saveType === "dev") delete r.saveType;
            return;
          }
          r.saveType = "dev";
        },
      }),
      "save-exact": new Qi("save-exact", {
        default: !1,
        type: Boolean,
        short: "E",
        description: `
      Dependencies saved to package.json will be configured with an exact
      version rather than using npm's default semver range operator.
    `,
        flatten(e, t, r) {
          NV["save-prefix"].flatten("save-prefix", t, r);
        },
      }),
      "save-optional": new Qi("save-optional", {
        default: !1,
        type: Boolean,
        short: "O",
        exclusive: ["save-dev", "save-peer", "save-prod"],
        description: `
      Save installed packages to a package.json file as
      \`optionalDependencies\`.
    `,
        flatten(e, t, r) {
          if (!t[e]) {
            if (r.saveType === "optional") delete r.saveType;
            else if (r.saveType === "peerOptional") r.saveType = "peer";
            return;
          }
          if (r.saveType === "peerOptional") return;
          if (r.saveType === "peer") r.saveType = "peerOptional";
          else r.saveType = "optional";
        },
      }),
      "save-peer": new Qi("save-peer", {
        default: !1,
        type: Boolean,
        exclusive: ["save-dev", "save-optional", "save-prod"],
        description: "\n      Save installed packages to a package.json file as `peerDependencies`\n    ",
        flatten(e, t, r) {
          if (!t[e]) {
            if (r.saveType === "peer") delete r.saveType;
            else if (r.saveType === "peerOptional") r.saveType = "optional";
            return;
          }
          if (r.saveType === "peerOptional") return;
          if (r.saveType === "optional") r.saveType = "peerOptional";
          else r.saveType = "peer";
        },
      }),
      "save-prefix": new Qi("save-prefix", {
        default: "^",
        type: String,
        description:
          "\n      Configure how versions of packages installed to a package.json file via\n      `--save` or `--save-dev` get prefixed.\n\n      For example if a package has version `1.2.3`, by default its version is\n      set to `^1.2.3` which allows minor upgrades for that package, but after\n      `npm config set save-prefix='~'` it would be set to `~1.2.3` which\n      only allows patch upgrades.\n    ",
        flatten(e, t, r) {
          ((r.savePrefix = t["save-exact"] ? "" : t["save-prefix"]), (t["save-prefix"] = r.savePrefix));
        },
      }),
      "save-prod": new Qi("save-prod", {
        default: !1,
        type: Boolean,
        short: "P",
        exclusive: ["save-dev", "save-optional", "save-peer"],
        description:
          "\n      Save installed packages into `dependencies` specifically. This is\n      useful if a package already exists in `devDependencies` or\n      `optionalDependencies`, but you want to move it to be a non-optional\n      production dependency.\n\n      This is the default behavior if `--save` is true, and neither\n      `--save-dev` or `--save-optional` are true.\n    ",
        flatten(e, t, r) {
          if (!t[e]) {
            if (r.saveType === "prod") delete r.saveType;
            return;
          }
          r.saveType = "prod";
        },
      }),
      "sbom-format": new Qi("sbom-format", {
        default: null,
        type: ["cyclonedx", "spdx"],
        description: `
      SBOM format to use when generating SBOMs.
    `,
        flatten: Na,
      }),
      "sbom-type": new Qi("sbom-type", {
        default: "library",
        type: ["library", "application", "framework"],
        description:
          "\n      The type of package described by the generated SBOM. For SPDX, this is the\n      value for the `primaryPackagePurpose` field. For CycloneDX, this is the\n      value for the `type` field.\n    ",
        flatten: Na,
      }),
      scope: new Qi("scope", {
        default: "",
        defaultDescription: `
      the scope of the current project, if any, or ""
    `,
        type: String,
        hint: "<@scope>",
        description: `
      Associate an operation with a scope for a scoped registry.

      Useful when logging in to or out of a private registry:

      \`\`\`
      # log in, linking the scope to the custom registry
      npm login --scope=@mycorp --registry=https://registry.mycorp.com

      # log out, removing the link and the auth token
      npm logout --scope=@mycorp
      \`\`\`

      This will cause \`@mycorp\` to be mapped to the registry for future
      installation of packages specified according to the pattern
      \`@mycorp/package\`.

      This will also cause \`npm init\` to create a scoped package.

      \`\`\`
      # accept all defaults, and create a package named "@foo/whatever",
      # instead of just named "whatever"
      npm init --scope=@foo --yes
      \`\`\`
    `,
        flatten(e, t, r) {
          let s = t[e],
            a = s && !/^@/.test(s) ? `@${s}` : s;
          ((r.scope = a), (r.projectScope = a));
        },
      }),
      scopes: new Qi("scopes", {
        default: null,
        type: [null, String, Array],
        description: `
      When creating a Granular Access Token with \`npm token create\`,
      this limits the token access to specific scopes. Provide
      a scope name (with or without @ prefix).
    `,
        flatten: Na,
      }),
      "packages-all": new Qi("packages-all", {
        default: !1,
        type: Boolean,
        description: `
      When creating a Granular Access Token with \`npm token create\`,
      grants the token access to all packages instead of limiting to
      specific packages.
    `,
        flatten: Na,
      }),
      "packages-and-scopes-permission": new Qi("packages-and-scopes-permission", {
        default: null,
        type: [null, "read-only", "read-write", "no-access"],
        description: `
      When creating a Granular Access Token with \`npm token create\`,
      sets the permission level for packages and scopes. Options are
      "read-only", "read-write", or "no-access".
    `,
        flatten: Na,
      }),
      "orgs-permission": new Qi("orgs-permission", {
        default: null,
        type: [null, "read-only", "read-write", "no-access"],
        description: `
      When creating a Granular Access Token with \`npm token create\`,
      sets the permission level for organizations. Options are
      "read-only", "read-write", or "no-access".
    `,
        flatten: Na,
      }),
      password: new Qi("password", {
        default: null,
        type: [null, String],
        description: `
      Password for authentication. Can be provided via command line when
      creating tokens, though it's generally safer to be prompted for it.
    `,
        flatten: Na,
      }),
      "token-description": new Qi("token-description", {
        default: null,
        type: [null, String],
        description: "\n      Description text for the token when using `npm token create`.\n    ",
        flatten: Na,
      }),
      "script-shell": new Qi("script-shell", {
        default: null,
        defaultDescription: `
      '/bin/sh' on POSIX systems, 'cmd.exe' on Windows
    `,
        type: [null, String],
        description:
          "\n      The shell to use for scripts run with the `npm exec`,\n      `npm run` and `npm init <package-spec>` commands.\n    ",
        flatten(e, t, r) {
          r.scriptShell = t[e] || void 0;
        },
      }),
      searchexclude: new Qi("searchexclude", {
        default: "",
        type: String,
        description: `
      Space-separated options that limit the results from search.
    `,
        flatten(e, t, r) {
          ((r.search = r.search || { limit: 20 }), (r.search.exclude = t[e].toLowerCase()));
        },
      }),
      searchlimit: new Qi("searchlimit", {
        default: 20,
        type: Number,
        description: `
      Number of items to limit search results to. Will not apply at all to
      legacy searches.
    `,
        flatten(e, t, r) {
          ((r.search = r.search || {}), (r.search.limit = t[e]));
        },
      }),
      searchopts: new Qi("searchopts", {
        default: "",
        type: String,
        description: `
      Space-separated options that are always passed to search.
    `,
        flatten(e, t, r) {
          ((r.search = r.search || { limit: 20 }), (r.search.opts = hYn.parse(t[e])));
        },
      }),
      searchstaleness: new Qi("searchstaleness", {
        default: 900,
        type: Number,
        description: `
      The age of the cache, in seconds, before another registry request is made
      if using legacy search endpoint.
    `,
        flatten(e, t, r) {
          ((r.search = r.search || { limit: 20 }), (r.search.staleness = t[e]));
        },
      }),
      shell: new Qi("shell", {
        default: uOo,
        defaultDescription: `
      SHELL environment variable, or "bash" on Posix, or "cmd.exe" on Windows
    `,
        type: String,
        description: "\n      The shell to run for the `npm explore` command.\n    ",
        flatten: Na,
      }),
      shrinkwrap: new Qi("shrinkwrap", {
        default: !0,
        type: Boolean,
        deprecated: `
      Use the --package-lock setting instead.
    `,
        description: `
      Alias for --package-lock
    `,
        flatten(e, t, r) {
          ((t["package-lock"] = t.shrinkwrap), NV["package-lock"].flatten("package-lock", t, r));
        },
      }),
      "sign-git-commit": new Qi("sign-git-commit", {
        default: !1,
        type: Boolean,
        description: `
      If set to true, then the \`npm version\` command will commit the new
      package version using \`-S\` to add a signature.

      Note that git requires you to have set up GPG keys in your git configs
      for this to work properly.
    `,
        flatten: Na,
      }),
      "sign-git-tag": new Qi("sign-git-tag", {
        default: !1,
        type: Boolean,
        description: `
      If set to true, then the \`npm version\` command will tag the version
      using \`-s\` to add a signature.

      Note that git requires you to have set up GPG keys in your git configs
      for this to work properly.
    `,
        flatten: Na,
      }),
      "strict-peer-deps": new Qi("strict-peer-deps", {
        default: !1,
        type: Boolean,
        description: `
      If set to \`true\`, and \`--legacy-peer-deps\` is not set, then _any_
      conflicting \`peerDependencies\` will be treated as an install failure,
      even if npm could reasonably guess the appropriate resolution based on
      non-peer dependency relationships.

      By default, conflicting \`peerDependencies\` deep in the dependency graph
      will be resolved using the nearest non-peer dependency specification,
      even if doing so will result in some packages receiving a peer dependency
      outside the range set in their package's \`peerDependencies\` object.

      When such an override is performed, a warning is printed, explaining the
      conflict and the packages involved.  If \`--strict-peer-deps\` is set,
      then this warning is treated as a failure.
    `,
        flatten: Na,
      }),
      "strict-ssl": new Qi("strict-ssl", {
        default: !0,
        type: Boolean,
        description: `
      Whether or not to do SSL key validation when making requests to the
      registry via https.

      See also the \`ca\` config.
    `,
        flatten(e, t, r) {
          r.strictSSL = t[e];
        },
      }),
      tag: new Qi("tag", {
        default: "latest",
        type: String,
        description: `
      If you ask npm to install a package and don't tell it a specific version,
      then it will install the specified tag.

      It is the tag added to the package@version specified in the 
      \`npm dist-tag add\` command, if no explicit tag is given.

      When used by the \`npm diff\` command, this is the tag used to fetch the
      tarball that will be compared with the local files by default.
      
      If used in the \`npm publish\` command, this is the tag that will be 
      added to the package submitted to the registry.
    `,
        flatten(e, t, r) {
          r.defaultTag = t[e];
        },
      }),
      "tag-version-prefix": new Qi("tag-version-prefix", {
        default: "v",
        type: String,
        description: `
      If set, alters the prefix used when tagging a new version when performing
      a version increment using  \`npm version\`. To remove the prefix
      altogether, set it to the empty string: \`""\`.

      Because other tools may rely on the convention that npm version tags look
      like \`v1.0.0\`, _only use this property if it is absolutely necessary_.
      In particular, use care when overriding this setting for public packages.
    `,
        flatten: Na,
      }),
      timing: new Qi("timing", {
        default: !1,
        type: Boolean,
        description: `
      If true, writes timing information to a process specific json file in
      the cache or \`logs-dir\`. The file name ends with \`-timing.json\`.

      You can quickly view it with this [json](https://npm.im/json) command
      line: \`cat ~/.npm/_logs/*-timing.json | npm exec -- json -g\`.

      Timing information will also be reported in the terminal. To suppress this
      while still writing the timing file, use \`--silent\`.
    `,
      }),
      umask: new Qi("umask", {
        default: 0,
        type: _Oo,
        description: `
      The "umask" value to use when setting the file creation mode on files and
      folders.

      Folders and executables are given a mode which is \`0o777\` masked
      against this value.  Other files are given a mode which is \`0o666\`
      masked against this value.

      Note that the underlying system will _also_ apply its own umask value to
      files and folders that are created, and npm does not circumvent this, but
      rather adds the \`--umask\` config to it.

      Thus, the effective default umask value on most POSIX systems is 0o22,
      meaning that folders and executables are created with a mode of 0o755 and
      other files are created with a mode of 0o644.
    `,
        flatten: Na,
      }),
      unicode: new Qi("unicode", {
        default: pOo,
        defaultDescription:
          "\n      false on windows, true on mac/unix systems with a unicode locale, as\n      defined by the `LC_ALL`, `LC_CTYPE`, or `LANG` environment variables.\n    ",
        type: Boolean,
        description: `
      When set to true, npm uses unicode characters in the tree output.  When
      false, it uses ascii characters instead of unicode glyphs.
    `,
        flatten: Na,
      }),
      "update-notifier": new Qi("update-notifier", {
        default: !0,
        type: Boolean,
        description: `
      Set to false to suppress the update notification when using an older
      version of npm than the latest.
    `,
      }),
      usage: new Qi("usage", {
        default: !1,
        type: Boolean,
        short: ["?", "H", "h"],
        description: `
      Show short usage output about the command specified.
    `,
      }),
      "user-agent": new Qi("user-agent", {
        default: "npm/{npm-version} node/{node-version} {platform} {arch} workspaces/{workspaces} {ci}",
        type: String,
        description:
          "\n      Sets the User-Agent request header.  The following fields are replaced\n      with their actual counterparts:\n\n      * `{npm-version}` - The npm version in use\n      * `{node-version}` - The Node.js version in use\n      * `{platform}` - The value of `process.platform`\n      * `{arch}` - The value of `process.arch`\n      * `{workspaces}` - Set to `true` if the `workspaces` or `workspace`\n        options are set.\n      * `{ci}` - The value of the `ci-name` config, if set, prefixed with\n        `ci/`, or an empty string if `ci-name` is empty.\n    ",
        flatten(e, t, r) {
          let s = t[e],
            a = sEt.name?.toLowerCase().split(" ").join("-") || null,
            H = !1;
          if (t.workspaces || (t.workspace && t.workspace.length)) H = !0;
          ((r.userAgent = s
            .replace(/\{node-version\}/gi, process.version)
            .replace(/\{npm-version\}/gi, t["npm-version"])
            .replace(/\{platform\}/gi, "win32")
            .replace(/\{arch\}/gi, "x64")
            .replace(/\{workspaces\}/gi, H)
            .replace(/\{ci\}/gi, a ? `ci/${a}` : "")
            .trim()),
            (process.env.npm_config_user_agent = r.userAgent));
        },
      }),
      userconfig: new Qi("userconfig", {
        default: "~/.npmrc",
        type: g5,
        description:
          "\n      The location of user-level configuration settings.\n\n      This may be overridden by the `npm_config_userconfig` environment\n      variable or the `--userconfig` command line option, but may _not_\n      be overridden by settings in the `globalconfig` file.\n    ",
      }),
      version: new Qi("version", {
        default: !1,
        type: Boolean,
        short: "v",
        description: `
      If true, output the npm version and exit successfully.

      Only relevant when specified explicitly on the command line.
    `,
      }),
      versions: new Qi("versions", {
        default: !1,
        type: Boolean,
        description: `
      If true, output the npm version as well as node's \`process.versions\`
      map and the version in the current working directory's \`package.json\`
      file if one exists, and exit successfully.

      Only relevant when specified explicitly on the command line.
    `,
      }),
      viewer: new Qi("viewer", {
        default: "browser",
        defaultDescription: `
      "man" on Posix, "browser" on Windows
    `,
        type: String,
        description: `
      The program to use to view help content.

      Set to \`"browser"\` to view html help content in the default web browser.
    `,
      }),
      which: new Qi("which", {
        default: null,
        hint: "<fundingSourceNumber>",
        type: [null, Number],
        description: `
      If there are multiple funding sources, which 1-indexed source URL to open.
    `,
      }),
      workspace: new Qi("workspace", {
        default: [],
        type: [String, Array],
        hint: "<workspace-name>",
        short: "w",
        envExport: !1,
        description: `
      Enable running a command in the context of the configured workspaces of the
      current project while filtering by running only the workspaces defined by
      this configuration option.

      Valid values for the \`workspace\` config are either:

      * Workspace names
      * Path to a workspace directory
      * Path to a parent workspace directory (will result in selecting all
        workspaces within that folder)

      When set for the \`npm init\` command, this may be set to the folder of
      a workspace which does not yet exist, to create the folder and set it
      up as a brand new workspace within the project.
    `,
        flatten: (e, t, r) => {
          NV["user-agent"].flatten("user-agent", t, r);
        },
      }),
      workspaces: new Qi("workspaces", {
        default: null,
        type: [null, Boolean],
        envExport: !1,
        description: `
      Set to true to run the command in the context of **all** configured
      workspaces.

      Explicitly setting this to false will cause commands like \`install\` to
      ignore workspaces altogether.
      When not set explicitly:

      - Commands that operate on the \`node_modules\` tree (install, update,
        etc.) will link workspaces into the \`node_modules\` folder.
      - Commands that do other things (test, exec, publish, etc.) will operate
        on the root project, _unless_ one or more workspaces are specified in
        the \`workspace\` config.
    `,
        flatten: (e, t, r) => {
          (NV["user-agent"].flatten("user-agent", t, r), (r.workspacesEnabled = t[e] !== !1));
        },
      }),
      "workspaces-update": new Qi("workspaces-update", {
        default: !0,
        type: Boolean,
        description: `
      If set to true, the npm cli will run an update after operations that may
      possibly change the workspaces installed to the \`node_modules\` folder.
    `,
        flatten: Na,
      }),
      yes: new Qi("yes", {
        default: null,
        type: [null, Boolean],
        short: "y",
        description: `
      Automatically answer "yes" to any prompts that npm might print on
      the command line.
    `,
      }),
    };
  LYn.exports = NV;
});