
var tgr = Ie(function (Fvc, k1i) {
  var w1i = ob(),
    CLa = {
      nextElementSibling: {
        get: function () {
          if (this.parentNode) {
            for (var e = this.nextSibling; e !== null; e = e.nextSibling)
              if (e.nodeType === w1i.ELEMENT_NODE) return e;
          }
          return null;
        },
      },
      previousElementSibling: {
        get: function () {
          if (this.parentNode) {
            for (var e = this.previousSibling; e !== null; e = e.previousSibling)
              if (e.nodeType === w1i.ELEMENT_NODE) return e;
          }
          return null;
        },
      },
    };
  k1i.exports = CLa;
});