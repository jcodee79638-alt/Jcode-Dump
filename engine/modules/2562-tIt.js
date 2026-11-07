
var tIt = Ie(function (_fc, nri) {
  var rri = fN(),
    tri = Yti(),
    iBo = eri(),
    sBo = wlr(),
    oBo = async (e) => {
      if ((iBo(e), e.pkg)) return tri(e);
      let { content: t } = await rri.normalize(e.path);
      return tri({ ...e, pkg: t });
    };
  nri.exports = Object.assign(oBo, { isServerPackage: sBo });
});