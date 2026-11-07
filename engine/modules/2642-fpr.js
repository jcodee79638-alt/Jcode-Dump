
var fpr = Ie(function (foi) {
  Object.defineProperty(foi, "__esModule", { value: !0 });
  foi.SPECIAL_PURPOSE =
    foi.RE_URL_WITH_PORT =
    foi.RE_URL =
    foi.RE_ZONE_STRING =
    foi.RE_SUBNET_STRING =
    foi.RE_BAD_ADDRESS =
    foi.RE_BAD_CHARACTERS =
    foi.TYPES =
    foi.SCOPES =
    foi.GROUPS =
    foi.BITS =
      void 0;
  foi.BITS = 128;
  foi.GROUPS = 8;
  foi.SCOPES = {
    0: "Reserved",
    1: "Interface local",
    2: "Link local",
    4: "Admin local",
    5: "Site local",
    8: "Organization local",
    14: "Global",
    15: "Reserved",
  };
  foi.TYPES = {
    "ff01::1/128": "Multicast (All nodes on this interface)",
    "ff01::2/128": "Multicast (All routers on this interface)",
    "ff02::1/128": "Multicast (All nodes on this link)",
    "ff02::2/128": "Multicast (All routers on this link)",
    "ff05::2/128": "Multicast (All routers in this site)",
    "ff02::5/128": "Multicast (OSPFv3 AllSPF routers)",
    "ff02::6/128": "Multicast (OSPFv3 AllDR routers)",
    "ff02::9/128": "Multicast (RIP routers)",
    "ff02::a/128": "Multicast (EIGRP routers)",
    "ff02::d/128": "Multicast (PIM routers)",
    "ff02::16/128": "Multicast (MLDv2 reports)",
    "ff01::fb/128": "Multicast (mDNSv6)",
    "ff02::fb/128": "Multicast (mDNSv6)",
    "ff05::fb/128": "Multicast (mDNSv6)",
    "ff02::1:2/128": "Multicast (All DHCP servers and relay agents on this link)",
    "ff05::1:2/128": "Multicast (All DHCP servers and relay agents in this site)",
    "ff02::1:3/128": "Multicast (All DHCP servers on this link)",
    "ff05::1:3/128": "Multicast (All DHCP servers in this site)",
    "::/128": "Unspecified",
    "::1/128": "Loopback",
    "::ffff:0:0/96": "IPv4-mapped",
    "ff00::/8": "Multicast",
    "fe80::/10": "Link-local unicast",
    "fc00::/7": "Unique local",
    "2001::/32": "Teredo",
    "2001:2::/48": "Benchmarking",
    "2002::/16": "6to4",
    "2001:db8::/32": "Documentation",
    "3fff::/20": "Documentation",
    "100::/64": "Discard-only",
    "fec0::/10": "Site-local unicast (deprecated)",
    "::/96": "IPv4-compatible (deprecated)",
    "64:ff9b::/96": "NAT64 (well-known)",
    "64:ff9b:1::/48": "NAT64 (local-use)",
  };
  foi.RE_BAD_CHARACTERS = /([^0-9a-f:/%])/gi;
  foi.RE_BAD_ADDRESS = /([0-9a-f]{5,}|:{3,}|[^:]:$|^:[^:]|\/$)/gi;
  foi.RE_SUBNET_STRING = /\/\d{1,3}(?=%|$)/;
  foi.RE_ZONE_STRING = /%.*$/;
  foi.RE_URL = /^(?:\[([0-9a-f:.]+)\]|([0-9a-f:.]+))(?:[/?#].*)?$/i;
  foi.RE_URL_WITH_PORT = /^\[([0-9a-f:.]+)\]:([0-9]{1,5})(?:[/?#].*)?$/i;
  foi.SPECIAL_PURPOSE = [
    ["::1/128", "Loopback Address", !1],
    ["::/128", "Unspecified Address", !1],
    ["::ffff:0:0/96", "IPv4-mapped Address", !1],
    ["64:ff9b::/96", "IPv4-IPv6 Translat.", !0],
    ["64:ff9b:1::/48", "IPv4-IPv6 Translat.", !1],
    ["100::/64", "Discard-Only Address Block", !1],
    ["100:0:0:1::/64", "Dummy IPv6 Prefix", !1],
    ["2001::/23", "IETF Protocol Assignments", !1],
    ["2001::/32", "TEREDO", !1],
    ["2001:1::1/128", "Port Control Protocol Anycast", !0],
    ["2001:1::2/128", "Traversal Using Relays around NAT Anycast", !0],
    ["2001:1::3/128", "DNS-SD Service Registration Protocol Anycast", !0],
    ["2001:2::/48", "Benchmarking", !1],
    ["2001:3::/32", "AMT", !0],
    ["2001:4:112::/48", "AS112-v6", !0],
    ["2001:10::/28", "Deprecated (previously ORCHID)", null],
    ["2001:20::/28", "ORCHIDv2", !0],
    ["2001:30::/28", "Drone Remote ID Protocol Entity Tags (DETs) Prefix", !0],
    ["2001:db8::/32", "Documentation", !1],
    ["2002::/16", "6to4", !1],
    ["2620:4f:8000::/48", "Direct Delegation AS112 Service", !0],
    ["3fff::/20", "Documentation", !1],
    ["5f00::/16", "Segment Routing (SRv6) SIDs", !1],
    ["fc00::/7", "Unique-Local", !1],
    ["fe80::/10", "Link-Local Unicast", !1],
  ];
});