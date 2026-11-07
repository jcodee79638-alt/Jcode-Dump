
var ysr = ne(() => {
  ysr();
  Gt();
  BA();
  TZs = nt({
    port: be(qc).annotate({ description: "Port to listen on" }),
    hostname: be(re).annotate({ description: "Hostname to listen on" }),
    mdns: be(Vi).annotate({ description: "Enable mDNS service discovery" }),
    mdnsDomain: be(re).annotate({
      description: "Custom domain name for mDNS service (default: opencode.local)",
    }),
    cors: be(J0(On(re))).annotate({ description: "Additional domains to allow for CORS" }),
  }).annotate({ identifier: "ServerConfig" });
});