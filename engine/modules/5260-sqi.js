
function sqi() {
  return nt({
    command: re.annotate({ description: "The command to execute" }),
    timeout: be(qc).annotate({ description: "Optional timeout in milliseconds" }),
    workdir: be(re).annotate({
      description:
        "The working directory to run the command in. Defaults to the current directory. Use this instead of 'cd' commands.",
    }),
  });
}