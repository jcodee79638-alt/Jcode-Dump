
var gTi = Ie(function (aIa) {
  aIa.toString = function (e) {
    switch (e) {
      case 1:
        return "IN";
      case 2:
        return "CS";
      case 3:
        return "CH";
      case 4:
        return "HS";
      case 255:
        return "ANY";
    }
    return "UNKNOWN_" + e;
  };
  aIa.toClass = function (e) {
    switch (e.toUpperCase()) {
      case "IN":
        return 1;
      case "CS":
        return 2;
      case "CH":
        return 3;
      case "HS":
        return 4;
      case "ANY":
        return 255;
    }
    return 0;
  };
});