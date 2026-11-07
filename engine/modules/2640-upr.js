
var upr = Ie(function (Aoi) {
  Object.defineProperty(Aoi, "__esModule", { value: !0 });
  Aoi.SPECIAL_PURPOSE = Aoi.RE_SUBNET_STRING = Aoi.RE_ADDRESS = Aoi.GROUPS = Aoi.BITS = void 0;
  Aoi.BITS = 32;
  Aoi.GROUPS = 4;
  Aoi.RE_ADDRESS =
    /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/g;
  Aoi.RE_SUBNET_STRING = /\/\d{1,2}$/;
  Aoi.SPECIAL_PURPOSE = [
    ["0.0.0.0/8", "This network", !1],
    ["0.0.0.0/32", "This host on this network", !1],
    ["10.0.0.0/8", "Private-Use", !1],
    ["100.64.0.0/10", "Shared Address Space", !1],
    ["127.0.0.0/8", "Loopback", !1],
    ["169.254.0.0/16", "Link Local", !1],
    ["172.16.0.0/12", "Private-Use", !1],
    ["192.0.0.0/24", "IETF Protocol Assignments", !1],
    ["192.0.0.0/29", "IPv4 Service Continuity Prefix", !1],
    ["192.0.0.8/32", "IPv4 dummy address", !1],
    ["192.0.0.9/32", "Port Control Protocol Anycast", !0],
    ["192.0.0.10/32", "Traversal Using Relays around NAT Anycast", !0],
    ["192.0.0.170/32", "NAT64/DNS64 Discovery", !1],
    ["192.0.0.171/32", "NAT64/DNS64 Discovery", !1],
    ["192.0.2.0/24", "Documentation (TEST-NET-1)", !1],
    ["192.31.196.0/24", "AS112-v4", !0],
    ["192.52.193.0/24", "AMT", !0],
    ["192.88.99.0/24", "Deprecated (6to4 Relay Anycast)", null],
    ["192.88.99.2/32", "6a44-relay anycast address", !1],
    ["192.168.0.0/16", "Private-Use", !1],
    ["192.175.48.0/24", "Direct Delegation AS112 Service", !0],
    ["198.18.0.0/15", "Benchmarking", !1],
    ["198.51.100.0/24", "Documentation (TEST-NET-2)", !1],
    ["203.0.113.0/24", "Documentation (TEST-NET-3)", !1],
    ["240.0.0.0/4", "Reserved", !1],
    ["255.255.255.255/32", "Limited Broadcast", !1],
  ];
});