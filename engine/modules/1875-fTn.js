
var fTn = Ie(function (Xio, js) {
  var __dirname =
      "C:\\Users\\Jac\\Desktop\\Jac Code\\node_modules\\.bun\\@silvia-odwyer+photon-node@0.3.4\\node_modules\\@silvia-odwyer\\photon-node",
    uTn = {},
    Cp = {};
  uTn.__wbindgen_placeholder__ = Cp;
  var Bn,
    { TextEncoder: Oio, TextDecoder: Uio } = cr("util");
  function por(e) {
    let t = typeof e;
    if (t == "number" || t == "boolean" || e == null) return `${e}`;
    if (t == "string") return `"${e}"`;
    if (t == "symbol") {
      let a = e.description;
      if (a == null) return "Symbol";
      else return `Symbol(${a})`;
    }
    if (t == "function") {
      let a = e.name;
      if (typeof a == "string" && a.length > 0) return `Function(${a})`;
      else return "Function";
    }
    if (Array.isArray(e)) {
      let a = e.length,
        H = "[";
      if (a > 0) H += por(e[0]);
      for (let u = 1; u < a; u++) H += ", " + por(e[u]);
      return ((H += "]"), H);
    }
    let r = /\[object ([^\]]+)\]/.exec(toString.call(e)),
      s;
    if (r.length > 1) s = r[1];
    else return toString.call(e);
    if (s == "Object")
      try {
        return "Object(" + JSON.stringify(e) + ")";
      } catch (a) {
        return "Object";
      }
    if (e instanceof Error)
      return `${e.name}: ${e.message}
${e.stack}`;
    return s;
  }
  var ex = 0,
    pLt = null;
  function gxe() {
    if (pLt === null || pLt.byteLength === 0) pLt = new Uint8Array(Bn.memory.buffer);
    return pLt;
  }
  var mLt = new Oio("utf-8"),
    Nio =
      typeof mLt.encodeInto === "function"
        ? function (e, t) {
            return mLt.encodeInto(e, t);
          }
        : function (e, t) {
            let r = mLt.encode(e);
            return (t.set(r), { read: e.length, written: r.length });
          };
  function rN(e, t, r) {
    if (r === void 0) {
      let f = mLt.encode(e),
        d = t(f.length, 1) >>> 0;
      return (
        gxe()
          .subarray(d, d + f.length)
          .set(f),
        (ex = f.length),
        d
      );
    }
    let s = e.length,
      a = t(s, 1) >>> 0,
      H = gxe(),
      u = 0;
    for (; u < s; u++) {
      let f = e.charCodeAt(u);
      if (f > 127) break;
      H[a + u] = f;
    }
    if (u !== s) {
      if (u !== 0) e = e.slice(u);
      a = r(a, s, (s = u + e.length * 3), 1) >>> 0;
      let f = gxe().subarray(a + u, a + s),
        d = Nio(e, f);
      ((u += d.written), (a = r(a, s, u, 1) >>> 0));
    }
    return ((ex = u), a);
  }
  var Lxe = null;
  function Exe() {
    if (
      Lxe === null ||
      Lxe.buffer.detached === !0 ||
      (Lxe.buffer.detached === void 0 && Lxe.buffer !== Bn.memory.buffer)
    )
      Lxe = new DataView(Bn.memory.buffer);
    return Lxe;
  }
  var lTn = new Uio("utf-8", { ignoreBOM: !0, fatal: !0 });
  lTn.decode();
  function sme(e, t) {
    return ((e = e >>> 0), lTn.decode(gxe().subarray(e, e + t)));
  }
  function _s(e, t) {
    if (!(e instanceof t)) throw Error(`expected instance of ${t.name}`);
    return e.ptr;
  }
  Xio.alter_channel = function (e, t, r) {
    (_s(e, As), Bn.alter_channel(e.__wbg_ptr, t, r));
  };
  Xio.alter_red_channel = function (e, t) {
    (_s(e, As), Bn.alter_red_channel(e.__wbg_ptr, t));
  };
  Xio.alter_green_channel = function (e, t) {
    (_s(e, As), Bn.alter_green_channel(e.__wbg_ptr, t));
  };
  Xio.alter_blue_channel = function (e, t) {
    (_s(e, As), Bn.alter_blue_channel(e.__wbg_ptr, t));
  };
  Xio.alter_two_channels = function (e, t, r, s, a) {
    (_s(e, As), Bn.alter_two_channels(e.__wbg_ptr, t, r, s, a));
  };
  Xio.alter_channels = function (e, t, r, s) {
    (_s(e, As), Bn.alter_channels(e.__wbg_ptr, t, r, s));
  };
  Xio.remove_channel = function (e, t, r) {
    (_s(e, As), Bn.remove_channel(e.__wbg_ptr, t, r));
  };
  Xio.remove_red_channel = function (e, t) {
    (_s(e, As), Bn.remove_red_channel(e.__wbg_ptr, t));
  };
  Xio.remove_green_channel = function (e, t) {
    (_s(e, As), Bn.remove_green_channel(e.__wbg_ptr, t));
  };
  Xio.remove_blue_channel = function (e, t) {
    (_s(e, As), Bn.remove_blue_channel(e.__wbg_ptr, t));
  };
  Xio.swap_channels = function (e, t, r) {
    (_s(e, As), Bn.swap_channels(e.__wbg_ptr, t, r));
  };
  Xio.invert = function (e) {
    (_s(e, As), Bn.invert(e.__wbg_ptr));
  };
  Xio.selective_hue_rotate = function (e, t, r) {
    (_s(e, As), _s(t, Gj));
    var s = t.__destroy_into_raw();
    Bn.selective_hue_rotate(e.__wbg_ptr, s, r);
  };
  Xio.selective_color_convert = function (e, t, r, s) {
    (_s(e, As), _s(t, Gj));
    var a = t.__destroy_into_raw();
    _s(r, Gj);
    var H = r.__destroy_into_raw();
    Bn.selective_color_convert(e.__wbg_ptr, a, H, s);
  };
  Xio.selective_lighten = function (e, t, r) {
    (_s(e, As), _s(t, Gj));
    var s = t.__destroy_into_raw();
    Bn.selective_lighten(e.__wbg_ptr, s, r);
  };
  Xio.selective_desaturate = function (e, t, r) {
    (_s(e, As), _s(t, Gj));
    var s = t.__destroy_into_raw();
    Bn.selective_desaturate(e.__wbg_ptr, s, r);
  };
  Xio.selective_saturate = function (e, t, r) {
    (_s(e, As), _s(t, Gj));
    var s = t.__destroy_into_raw();
    Bn.selective_saturate(e.__wbg_ptr, s, r);
  };
  Xio.selective_greyscale = function (e, t) {
    _s(e, As);
    var r = e.__destroy_into_raw();
    _s(t, Gj);
    var s = t.__destroy_into_raw();
    Bn.selective_greyscale(r, s);
  };
  Xio.monochrome = function (e, t, r, s) {
    (_s(e, As), Bn.monochrome(e.__wbg_ptr, t, r, s));
  };
  Xio.sepia = function (e) {
    (_s(e, As), Bn.sepia(e.__wbg_ptr));
  };
  Xio.grayscale = function (e) {
    (_s(e, As), Bn.grayscale(e.__wbg_ptr));
  };
  Xio.grayscale_human_corrected = function (e) {
    (_s(e, As), Bn.grayscale_human_corrected(e.__wbg_ptr));
  };
  Xio.desaturate = function (e) {
    (_s(e, As), Bn.desaturate(e.__wbg_ptr));
  };
  Xio.decompose_min = function (e) {
    (_s(e, As), Bn.decompose_min(e.__wbg_ptr));
  };
  Xio.decompose_max = function (e) {
    (_s(e, As), Bn.decompose_max(e.__wbg_ptr));
  };
  Xio.grayscale_shades = function (e, t) {
    (_s(e, As), Bn.grayscale_shades(e.__wbg_ptr, t));
  };
  Xio.r_grayscale = function (e) {
    (_s(e, As), Bn.r_grayscale(e.__wbg_ptr));
  };
  Xio.g_grayscale = function (e) {
    (_s(e, As), Bn.g_grayscale(e.__wbg_ptr));
  };
  Xio.b_grayscale = function (e) {
    (_s(e, As), Bn.b_grayscale(e.__wbg_ptr));
  };
  Xio.single_channel_grayscale = function (e, t) {
    (_s(e, As), Bn.single_channel_grayscale(e.__wbg_ptr, t));
  };
  Xio.threshold = function (e, t) {
    (_s(e, As), Bn.threshold(e.__wbg_ptr, t));
  };
  Xio.gamma_correction = function (e, t, r, s) {
    (_s(e, As), Bn.gamma_correction(e.__wbg_ptr, t, r, s));
  };
  Xio.hsluv = function (e, t, r) {
    _s(e, As);
    let s = rN(t, Bn.__wbindgen_malloc, Bn.__wbindgen_realloc),
      a = ex;
    Bn.hsluv(e.__wbg_ptr, s, a, r);
  };
  Xio.lch = function (e, t, r) {
    _s(e, As);
    let s = rN(t, Bn.__wbindgen_malloc, Bn.__wbindgen_realloc),
      a = ex;
    Bn.lch(e.__wbg_ptr, s, a, r);
  };
  Xio.hsl = function (e, t, r) {
    _s(e, As);
    let s = rN(t, Bn.__wbindgen_malloc, Bn.__wbindgen_realloc),
      a = ex;
    Bn.hsl(e.__wbg_ptr, s, a, r);
  };
  Xio.hsv = function (e, t, r) {
    _s(e, As);
    let s = rN(t, Bn.__wbindgen_malloc, Bn.__wbindgen_realloc),
      a = ex;
    Bn.hsv(e.__wbg_ptr, s, a, r);
  };
  Xio.hue_rotate_hsl = function (e, t) {
    (_s(e, As), Bn.hue_rotate_hsl(e.__wbg_ptr, t));
  };
  Xio.hue_rotate_hsv = function (e, t) {
    (_s(e, As), Bn.hue_rotate_hsv(e.__wbg_ptr, t));
  };
  Xio.hue_rotate_lch = function (e, t) {
    (_s(e, As), Bn.hue_rotate_lch(e.__wbg_ptr, t));
  };
  Xio.hue_rotate_hsluv = function (e, t) {
    (_s(e, As), Bn.hue_rotate_hsluv(e.__wbg_ptr, t));
  };
  Xio.saturate_hsl = function (e, t) {
    (_s(e, As), Bn.saturate_hsl(e.__wbg_ptr, t));
  };
  Xio.saturate_lch = function (e, t) {
    (_s(e, As), Bn.saturate_lch(e.__wbg_ptr, t));
  };
  Xio.saturate_hsluv = function (e, t) {
    (_s(e, As), Bn.saturate_hsluv(e.__wbg_ptr, t));
  };
  Xio.saturate_hsv = function (e, t) {
    (_s(e, As), Bn.saturate_hsv(e.__wbg_ptr, t));
  };
  Xio.lighten_lch = function (e, t) {
    (_s(e, As), Bn.lighten_lch(e.__wbg_ptr, t));
  };
  Xio.lighten_hsluv = function (e, t) {
    (_s(e, As), Bn.lighten_hsluv(e.__wbg_ptr, t));
  };
  Xio.lighten_hsl = function (e, t) {
    (_s(e, As), Bn.lighten_hsl(e.__wbg_ptr, t));
  };
  Xio.lighten_hsv = function (e, t) {
    (_s(e, As), Bn.lighten_hsv(e.__wbg_ptr, t));
  };
  Xio.darken_lch = function (e, t) {
    (_s(e, As), Bn.darken_lch(e.__wbg_ptr, t));
  };
  Xio.darken_hsluv = function (e, t) {
    (_s(e, As), Bn.darken_hsluv(e.__wbg_ptr, t));
  };
  Xio.darken_hsl = function (e, t) {
    (_s(e, As), Bn.darken_hsl(e.__wbg_ptr, t));
  };
  Xio.darken_hsv = function (e, t) {
    (_s(e, As), Bn.darken_hsv(e.__wbg_ptr, t));
  };
  Xio.desaturate_hsv = function (e, t) {
    (_s(e, As), Bn.desaturate_hsv(e.__wbg_ptr, t));
  };
  Xio.desaturate_hsl = function (e, t) {
    (_s(e, As), Bn.desaturate_hsl(e.__wbg_ptr, t));
  };
  Xio.desaturate_lch = function (e, t) {
    (_s(e, As), Bn.desaturate_lch(e.__wbg_ptr, t));
  };
  Xio.desaturate_hsluv = function (e, t) {
    (_s(e, As), Bn.desaturate_hsluv(e.__wbg_ptr, t));
  };
  Xio.mix_with_colour = function (e, t, r) {
    (_s(e, As), _s(t, Gj));
    var s = t.__destroy_into_raw();
    Bn.mix_with_colour(e.__wbg_ptr, s, r);
  };
  Xio.noise_reduction = function (e) {
    (_s(e, As), Bn.noise_reduction(e.__wbg_ptr));
  };
  Xio.sharpen = function (e) {
    (_s(e, As), Bn.sharpen(e.__wbg_ptr));
  };
  Xio.edge_detection = function (e) {
    (_s(e, As), Bn.edge_detection(e.__wbg_ptr));
  };
  Xio.identity = function (e) {
    (_s(e, As), Bn.identity(e.__wbg_ptr));
  };
  Xio.box_blur = function (e) {
    (_s(e, As), Bn.box_blur(e.__wbg_ptr));
  };
  Xio.gaussian_blur = function (e, t) {
    (_s(e, As), Bn.gaussian_blur(e.__wbg_ptr, t));
  };
  Xio.detect_horizontal_lines = function (e) {
    (_s(e, As), Bn.detect_horizontal_lines(e.__wbg_ptr));
  };
  Xio.detect_vertical_lines = function (e) {
    (_s(e, As), Bn.detect_vertical_lines(e.__wbg_ptr));
  };
  Xio.detect_45_deg_lines = function (e) {
    (_s(e, As), Bn.detect_45_deg_lines(e.__wbg_ptr));
  };
  Xio.detect_135_deg_lines = function (e) {
    (_s(e, As), Bn.detect_135_deg_lines(e.__wbg_ptr));
  };
  Xio.laplace = function (e) {
    (_s(e, As), Bn.laplace(e.__wbg_ptr));
  };
  Xio.edge_one = function (e) {
    (_s(e, As), Bn.edge_one(e.__wbg_ptr));
  };
  Xio.emboss = function (e) {
    (_s(e, As), Bn.emboss(e.__wbg_ptr));
  };
  Xio.sobel_horizontal = function (e) {
    (_s(e, As), Bn.sobel_horizontal(e.__wbg_ptr));
  };
  Xio.prewitt_horizontal = function (e) {
    (_s(e, As), Bn.prewitt_horizontal(e.__wbg_ptr));
  };
  Xio.sobel_vertical = function (e) {
    (_s(e, As), Bn.sobel_vertical(e.__wbg_ptr));
  };
  Xio.sobel_global = function (e) {
    (_s(e, As), Bn.sobel_global(e.__wbg_ptr));
  };
  Xio.add_noise_rand = function (e) {
    (_s(e, As), Bn.add_noise_rand(e.__wbg_ptr));
  };
  Xio.pink_noise = function (e) {
    (_s(e, As), Bn.pink_noise(e.__wbg_ptr));
  };
  Xio.watermark = function (e, t, r, s) {
    (_s(e, As), _s(t, As), Bn.watermark(e.__wbg_ptr, t.__wbg_ptr, r, s));
  };
  Xio.blend = function (e, t, r) {
    (_s(e, As), _s(t, As));
    let s = rN(r, Bn.__wbindgen_malloc, Bn.__wbindgen_realloc),
      a = ex;
    Bn.blend(e.__wbg_ptr, t.__wbg_ptr, s, a);
  };
  Xio.create_gradient = function (e, t) {
    let r = Bn.create_gradient(e, t);
    return As.__wrap(r);
  };
  Xio.apply_gradient = function (e) {
    (_s(e, As), Bn.apply_gradient(e.__wbg_ptr));
  };
  Xio.neue = function (e) {
    (_s(e, As), Bn.neue(e.__wbg_ptr));
  };
  Xio.lix = function (e) {
    (_s(e, As), Bn.lix(e.__wbg_ptr));
  };
  Xio.ryo = function (e) {
    (_s(e, As), Bn.ryo(e.__wbg_ptr));
  };
  Xio.filter = function (e, t) {
    _s(e, As);
    let r = rN(t, Bn.__wbindgen_malloc, Bn.__wbindgen_realloc),
      s = ex;
    Bn.filter(e.__wbg_ptr, r, s);
  };
  Xio.lofi = function (e) {
    (_s(e, As), Bn.lofi(e.__wbg_ptr));
  };
  Xio.pastel_pink = function (e) {
    (_s(e, As), Bn.pastel_pink(e.__wbg_ptr));
  };
  Xio.golden = function (e) {
    (_s(e, As), Bn.golden(e.__wbg_ptr));
  };
  Xio.cali = function (e) {
    (_s(e, As), Bn.cali(e.__wbg_ptr));
  };
  Xio.dramatic = function (e) {
    (_s(e, As), Bn.dramatic(e.__wbg_ptr));
  };
  Xio.monochrome_tint = function (e, t) {
    (_s(e, As), _s(t, Gj));
    var r = t.__destroy_into_raw();
    Bn.monochrome_tint(e.__wbg_ptr, r);
  };
  Xio.duotone_violette = function (e) {
    (_s(e, As), Bn.duotone_violette(e.__wbg_ptr));
  };
  Xio.duotone_horizon = function (e) {
    (_s(e, As), Bn.duotone_horizon(e.__wbg_ptr));
  };
  Xio.duotone_tint = function (e, t) {
    (_s(e, As), _s(t, Gj));
    var r = t.__destroy_into_raw();
    Bn.duotone_tint(e.__wbg_ptr, r);
  };
  Xio.duotone_lilac = function (e) {
    (_s(e, As), Bn.duotone_lilac(e.__wbg_ptr));
  };
  Xio.duotone_ochre = function (e) {
    (_s(e, As), Bn.duotone_ochre(e.__wbg_ptr));
  };
  Xio.firenze = function (e) {
    (_s(e, As), Bn.firenze(e.__wbg_ptr));
  };
  Xio.obsidian = function (e) {
    (_s(e, As), Bn.obsidian(e.__wbg_ptr));
  };
  Xio.crop = function (e, t, r, s, a) {
    _s(e, As);
    let H = Bn.crop(e.__wbg_ptr, t, r, s, a);
    return As.__wrap(H);
  };
  Xio.crop_img_browser = function (e, t, r, s, a) {
    return Bn.crop_img_browser(e, t, r, s, a);
  };
  Xio.fliph = function (e) {
    (_s(e, As), Bn.fliph(e.__wbg_ptr));
  };
  Xio.flipv = function (e) {
    (_s(e, As), Bn.flipv(e.__wbg_ptr));
  };
  Xio.resize_img_browser = function (e, t, r, s) {
    return (_s(e, As), Bn.resize_img_browser(e.__wbg_ptr, t, r, s));
  };
  Xio.resize = function (e, t, r, s) {
    _s(e, As);
    let a = Bn.resize(e.__wbg_ptr, t, r, s);
    return As.__wrap(a);
  };
  Xio.seam_carve = function (e, t, r) {
    _s(e, As);
    let s = Bn.seam_carve(e.__wbg_ptr, t, r);
    return As.__wrap(s);
  };
  Xio.shearx = function (e, t) {
    _s(e, As);
    let r = Bn.shearx(e.__wbg_ptr, t);
    return As.__wrap(r);
  };
  Xio.sheary = function (e, t) {
    _s(e, As);
    let r = Bn.sheary(e.__wbg_ptr, t);
    return As.__wrap(r);
  };
  Xio.padding_uniform = function (e, t, r) {
    (_s(e, As), _s(r, ome));
    var s = r.__destroy_into_raw();
    let a = Bn.padding_uniform(e.__wbg_ptr, t, s);
    return As.__wrap(a);
  };
  Xio.padding_left = function (e, t, r) {
    (_s(e, As), _s(r, ome));
    var s = r.__destroy_into_raw();
    let a = Bn.padding_left(e.__wbg_ptr, t, s);
    return As.__wrap(a);
  };
  Xio.padding_right = function (e, t, r) {
    (_s(e, As), _s(r, ome));
    var s = r.__destroy_into_raw();
    let a = Bn.padding_right(e.__wbg_ptr, t, s);
    return As.__wrap(a);
  };
  Xio.padding_top = function (e, t, r) {
    (_s(e, As), _s(r, ome));
    var s = r.__destroy_into_raw();
    let a = Bn.padding_top(e.__wbg_ptr, t, s);
    return As.__wrap(a);
  };
  Xio.padding_bottom = function (e, t, r) {
    (_s(e, As), _s(r, ome));
    var s = r.__destroy_into_raw();
    let a = Bn.padding_bottom(e.__wbg_ptr, t, s);
    return As.__wrap(a);
  };
  Xio.rotate = function (e, t) {
    _s(e, As);
    let r = Bn.rotate(e.__wbg_ptr, t);
    return As.__wrap(r);
  };
  Xio.resample = function (e, t, r) {
    _s(e, As);
    let s = Bn.resample(e.__wbg_ptr, t, r);
    return As.__wrap(s);
  };
  Xio.offset = function (e, t, r) {
    (_s(e, As), Bn.offset(e.__wbg_ptr, t, r));
  };
  Xio.offset_red = function (e, t) {
    (_s(e, As), Bn.offset_red(e.__wbg_ptr, t));
  };
  Xio.offset_green = function (e, t) {
    (_s(e, As), Bn.offset_green(e.__wbg_ptr, t));
  };
  Xio.offset_blue = function (e, t) {
    (_s(e, As), Bn.offset_blue(e.__wbg_ptr, t));
  };
  Xio.multiple_offsets = function (e, t, r, s) {
    (_s(e, As), Bn.multiple_offsets(e.__wbg_ptr, t, r, s));
  };
  Xio.halftone = function (e) {
    (_s(e, As), Bn.halftone(e.__wbg_ptr));
  };
  Xio.primary = function (e) {
    (_s(e, As), Bn.primary(e.__wbg_ptr));
  };
  Xio.colorize = function (e) {
    (_s(e, As), Bn.colorize(e.__wbg_ptr));
  };
  Xio.solarize = function (e) {
    (_s(e, As), Bn.solarize(e.__wbg_ptr));
  };
  Xio.solarize_retimg = function (e) {
    _s(e, As);
    let t = Bn.solarize_retimg(e.__wbg_ptr);
    return As.__wrap(t);
  };
  Xio.adjust_brightness = function (e, t) {
    (_s(e, As), Bn.adjust_brightness(e.__wbg_ptr, t));
  };
  Xio.inc_brightness = function (e, t) {
    (_s(e, As), Bn.inc_brightness(e.__wbg_ptr, t));
  };
  Xio.dec_brightness = function (e, t) {
    (_s(e, As), Bn.dec_brightness(e.__wbg_ptr, t));
  };
  Xio.adjust_contrast = function (e, t) {
    (_s(e, As), Bn.adjust_contrast(e.__wbg_ptr, t));
  };
  Xio.tint = function (e, t, r, s) {
    (_s(e, As), Bn.tint(e.__wbg_ptr, t, r, s));
  };
  Xio.horizontal_strips = function (e, t) {
    (_s(e, As), Bn.horizontal_strips(e.__wbg_ptr, t));
  };
  Xio.color_horizontal_strips = function (e, t, r) {
    (_s(e, As), _s(r, Gj));
    var s = r.__destroy_into_raw();
    Bn.color_horizontal_strips(e.__wbg_ptr, t, s);
  };
  Xio.vertical_strips = function (e, t) {
    (_s(e, As), Bn.vertical_strips(e.__wbg_ptr, t));
  };
  Xio.color_vertical_strips = function (e, t, r) {
    (_s(e, As), _s(r, Gj));
    var s = r.__destroy_into_raw();
    Bn.color_vertical_strips(e.__wbg_ptr, t, s);
  };
  Xio.oil = function (e, t, r) {
    (_s(e, As), Bn.oil(e.__wbg_ptr, t, r));
  };
  Xio.frosted_glass = function (e) {
    (_s(e, As), Bn.frosted_glass(e.__wbg_ptr));
  };
  Xio.pixelize = function (e, t) {
    (_s(e, As), Bn.pixelize(e.__wbg_ptr, t));
  };
  Xio.normalize = function (e) {
    (_s(e, As), Bn.normalize(e.__wbg_ptr));
  };
  Xio.dither = function (e, t) {
    (_s(e, As), Bn.dither(e.__wbg_ptr, t));
  };
  Xio.duotone = function (e, t, r) {
    (_s(e, As), _s(t, Gj));
    var s = t.__destroy_into_raw();
    _s(r, Gj);
    var a = r.__destroy_into_raw();
    Bn.duotone(e.__wbg_ptr, s, a);
  };
  Xio.draw_text_with_border = function (e, t, r, s, a) {
    _s(e, As);
    let H = rN(t, Bn.__wbindgen_malloc, Bn.__wbindgen_realloc),
      u = ex;
    Bn.draw_text_with_border(e.__wbg_ptr, H, u, r, s, a);
  };
  Xio.draw_text = function (e, t, r, s, a) {
    _s(e, As);
    let H = rN(t, Bn.__wbindgen_malloc, Bn.__wbindgen_realloc),
      u = ex;
    Bn.draw_text(e.__wbg_ptr, H, u, r, s, a);
  };
  function dor(e, t) {
    let r = t(e.length * 1, 1) >>> 0;
    return (gxe().set(e, r / 1), (ex = e.length), r);
  }
  function $xe(e, t) {
    return ((e = e >>> 0), gxe().subarray(e / 1, e / 1 + t));
  }
  function Fio(e) {
    let t = Bn.__wbindgen_export_2.get(e);
    return (Bn.__externref_table_dealloc(e), t);
  }
  Xio.run = function () {
    let e = Bn.run();
    if (e[1]) throw Fio(e[0]);
  };
  Xio.get_image_data = function (e, t) {
    return Bn.get_image_data(e, t);
  };
  Xio.putImageData = function (e, t, r) {
    _s(r, As);
    var s = r.__destroy_into_raw();
    Bn.putImageData(e, t, s);
  };
  Xio.open_image = function (e, t) {
    let r = Bn.open_image(e, t);
    return As.__wrap(r);
  };
  Xio.to_raw_pixels = function (e) {
    let t = Bn.to_raw_pixels(e);
    var r = $xe(t[0], t[1]).slice();
    return (Bn.__wbindgen_free(t[0], t[1] * 1, 1), r);
  };
  Xio.base64_to_image = function (e) {
    let t = rN(e, Bn.__wbindgen_malloc, Bn.__wbindgen_realloc),
      r = ex,
      s = Bn.base64_to_image(t, r);
    return As.__wrap(s);
  };
  Xio.base64_to_vec = function (e) {
    let t = rN(e, Bn.__wbindgen_malloc, Bn.__wbindgen_realloc),
      r = ex,
      s = Bn.base64_to_vec(t, r);
    var a = $xe(s[0], s[1]).slice();
    return (Bn.__wbindgen_free(s[0], s[1] * 1, 1), a);
  };
  Xio.to_image_data = function (e) {
    _s(e, As);
    var t = e.__destroy_into_raw();
    return Bn.to_image_data(t);
  };
  function mor(e) {
    return e === void 0 || e === null;
  }
  function _Lt(e) {
    let t = Bn.__externref_table_alloc();
    return (Bn.__wbindgen_export_2.set(t, e), t);
  }
  function nN(e, t) {
    try {
      return e.apply(this, t);
    } catch (r) {
      let s = _Lt(r);
      Bn.__wbindgen_exn_store(s);
    }
  }
  var dLt = null;
  function Bio() {
    if (dLt === null || dLt.byteLength === 0) dLt = new Uint8ClampedArray(Bn.memory.buffer);
    return dLt;
  }
  function Rio(e, t) {
    return ((e = e >>> 0), Bio().subarray(e / 1, e / 1 + t));
  }
  Xio.SamplingFilter = Object.freeze({
    Nearest: 1,
    1: "Nearest",
    Triangle: 2,
    2: "Triangle",
    CatmullRom: 3,
    3: "CatmullRom",
    Gaussian: 4,
    4: "Gaussian",
    Lanczos3: 5,
    5: "Lanczos3",
  });
  var lor =
    typeof FinalizationRegistry > "u"
      ? { register: () => {}, unregister: () => {} }
      : new FinalizationRegistry((e) => Bn.__wbg_photonimage_free(e >>> 0, 1));
  class As {
    static __wrap(e) {
      e = e >>> 0;
      let t = Object.create(As.prototype);
      return ((t.__wbg_ptr = e), lor.register(t, t.__wbg_ptr, t), t);
    }
    __destroy_into_raw() {
      let e = this.__wbg_ptr;
      return ((this.__wbg_ptr = 0), lor.unregister(this), e);
    }
    free() {
      let e = this.__destroy_into_raw();
      Bn.__wbg_photonimage_free(e, 0);
    }
    constructor(e, t, r) {
      let s = dor(e, Bn.__wbindgen_malloc),
        a = ex,
        H = Bn.photonimage_new(s, a, t, r);
      return ((this.__wbg_ptr = H >>> 0), lor.register(this, this.__wbg_ptr, this), this);
    }
    static new_from_base64(e) {
      let t = rN(e, Bn.__wbindgen_malloc, Bn.__wbindgen_realloc),
        r = ex,
        s = Bn.base64_to_image(t, r);
      return As.__wrap(s);
    }
    static new_from_byteslice(e) {
      let t = dor(e, Bn.__wbindgen_malloc),
        r = ex,
        s = Bn.photonimage_new_from_byteslice(t, r);
      return As.__wrap(s);
    }
    static new_from_blob(e) {
      let t = Bn.photonimage_new_from_blob(e);
      return As.__wrap(t);
    }
    static new_from_image(e) {
      let t = Bn.photonimage_new_from_image(e);
      return As.__wrap(t);
    }
    get_width() {
      return Bn.photonimage_get_width(this.__wbg_ptr) >>> 0;
    }
    get_raw_pixels() {
      let e = Bn.photonimage_get_raw_pixels(this.__wbg_ptr);
      var t = $xe(e[0], e[1]).slice();
      return (Bn.__wbindgen_free(e[0], e[1] * 1, 1), t);
    }
    get_height() {
      return Bn.photonimage_get_height(this.__wbg_ptr) >>> 0;
    }
    get_base64() {
      let e, t;
      try {
        let r = Bn.photonimage_get_base64(this.__wbg_ptr);
        return ((e = r[0]), (t = r[1]), sme(r[0], r[1]));
      } finally {
        Bn.__wbindgen_free(e, t, 1);
      }
    }
    get_bytes() {
      let e = Bn.photonimage_get_bytes(this.__wbg_ptr);
      var t = $xe(e[0], e[1]).slice();
      return (Bn.__wbindgen_free(e[0], e[1] * 1, 1), t);
    }
    get_bytes_jpeg(e) {
      let t = Bn.photonimage_get_bytes_jpeg(this.__wbg_ptr, e);
      var r = $xe(t[0], t[1]).slice();
      return (Bn.__wbindgen_free(t[0], t[1] * 1, 1), r);
    }
    get_bytes_webp() {
      let e = Bn.photonimage_get_bytes_webp(this.__wbg_ptr);
      var t = $xe(e[0], e[1]).slice();
      return (Bn.__wbindgen_free(e[0], e[1] * 1, 1), t);
    }
    get_image_data() {
      return Bn.photonimage_get_image_data(this.__wbg_ptr);
    }
    set_imgdata(e) {
      Bn.photonimage_set_imgdata(this.__wbg_ptr, e);
    }
    get_estimated_filesize() {
      let e = Bn.photonimage_get_estimated_filesize(this.__wbg_ptr);
      return BigInt.asUintN(64, e);
    }
  }
  Xio.PhotonImage = As;
  var cTn =
    typeof FinalizationRegistry > "u"
      ? { register: () => {}, unregister: () => {} }
      : new FinalizationRegistry((e) => Bn.__wbg_rgb_free(e >>> 0, 1));
  class Gj {
    __destroy_into_raw() {
      let e = this.__wbg_ptr;
      return ((this.__wbg_ptr = 0), cTn.unregister(this), e);
    }
    free() {
      let e = this.__destroy_into_raw();
      Bn.__wbg_rgb_free(e, 0);
    }
    constructor(e, t, r) {
      let s = Bn.rgb_new(e, t, r);
      return ((this.__wbg_ptr = s >>> 0), cTn.register(this, this.__wbg_ptr, this), this);
    }
    set_red(e) {
      Bn.rgb_set_red(this.__wbg_ptr, e);
    }
    set_green(e) {
      Bn.rgb_set_green(this.__wbg_ptr, e);
    }
    set_blue(e) {
      Bn.rgb_set_blue(this.__wbg_ptr, e);
    }
    get_red() {
      return Bn.rgb_get_red(this.__wbg_ptr);
    }
    get_green() {
      return Bn.rgb_get_green(this.__wbg_ptr);
    }
    get_blue() {
      return Bn.rgb_get_blue(this.__wbg_ptr);
    }
  }
  Xio.Rgb = Gj;
  var ATn =
    typeof FinalizationRegistry > "u"
      ? { register: () => {}, unregister: () => {} }
      : new FinalizationRegistry((e) => Bn.__wbg_rgba_free(e >>> 0, 1));
  class ome {
    __destroy_into_raw() {
      let e = this.__wbg_ptr;
      return ((this.__wbg_ptr = 0), ATn.unregister(this), e);
    }
    free() {
      let e = this.__destroy_into_raw();
      Bn.__wbg_rgba_free(e, 0);
    }
    constructor(e, t, r, s) {
      let a = Bn.rgba_new(e, t, r, s);
      return ((this.__wbg_ptr = a >>> 0), ATn.register(this, this.__wbg_ptr, this), this);
    }
    set_red(e) {
      Bn.rgb_set_red(this.__wbg_ptr, e);
    }
    set_green(e) {
      Bn.rgb_set_green(this.__wbg_ptr, e);
    }
    set_blue(e) {
      Bn.rgb_set_blue(this.__wbg_ptr, e);
    }
    set_alpha(e) {
      Bn.rgba_set_alpha(this.__wbg_ptr, e);
    }
    get_red() {
      return Bn.rgb_get_red(this.__wbg_ptr);
    }
    get_green() {
      return Bn.rgb_get_green(this.__wbg_ptr);
    }
    get_blue() {
      return Bn.rgb_get_blue(this.__wbg_ptr);
    }
    get_alpha() {
      return Bn.rgba_get_alpha(this.__wbg_ptr);
    }
  }
  Xio.Rgba = ome;
  Cp.__wbg_new_abda76e883ba8a5f = function () {
    return Error();
  };
  Cp.__wbg_stack_658279fe44541cf6 = function (e, t) {
    let r = t.stack,
      s = rN(r, Bn.__wbindgen_malloc, Bn.__wbindgen_realloc),
      a = ex;
    (Exe().setInt32(e + 4, a, !0), Exe().setInt32(e + 0, s, !0));
  };
  Cp.__wbg_error_f851667af71bcfc6 = function (e, t) {
    let r, s;
    try {
      ((r = e), (s = t), console.error(sme(e, t)));
    } finally {
      Bn.__wbindgen_free(r, s, 1);
    }
  };
  Cp.__wbg_instanceof_Window_c4b70662a0d2c5ec = function (e) {
    let t;
    try {
      t = e instanceof Window;
    } catch (s) {
      t = !1;
    }
    return t;
  };
  Cp.__wbg_document_e5c1786dea6542e4 = function (e) {
    let t = e.document;
    return mor(t) ? 0 : _Lt(t);
  };
  Cp.__wbg_body_e70ae6abd01ae584 = function (e) {
    let t = e.body;
    return mor(t) ? 0 : _Lt(t);
  };
  Cp.__wbg_createElement_5d4c76f218b78145 = function () {
    return nN(function (e, t, r) {
      return e.createElement(sme(t, r));
    }, arguments);
  };
  Cp.__wbg_width_4c6f0048d64cf86b = function (e) {
    return e.width;
  };
  Cp.__wbg_height_21f0d3fd8f753394 = function (e) {
    return e.height;
  };
  Cp.__wbg_width_79e0847ed5883b03 = function (e) {
    return e.width;
  };
  Cp.__wbg_height_e4e4e4779f8feac0 = function (e) {
    return e.height;
  };
  Cp.__wbg_data_fda507064d127f5b = function (e, t) {
    let r = t.data,
      s = dor(r, Bn.__wbindgen_malloc),
      a = ex;
    (Exe().setInt32(e + 4, a, !0), Exe().setInt32(e + 0, s, !0));
  };
  Cp.__wbg_newwithu8clampedarrayandsh_1fddccb3a94a5e05 = function () {
    return nN(function (e, t, r, s) {
      return new ImageData(Rio(e, t), r >>> 0, s >>> 0);
    }, arguments);
  };
  Cp.__wbg_instanceof_CanvasRenderingContext2d_3abbe7ec7af32cae = function (e) {
    let t;
    try {
      t = e instanceof CanvasRenderingContext2D;
    } catch (s) {
      t = !1;
    }
    return t;
  };
  Cp.__wbg_drawImage_fede06db74e39a60 = function () {
    return nN(function (e, t, r, s) {
      e.drawImage(t, r, s);
    }, arguments);
  };
  Cp.__wbg_drawImage_f395c8e43c79a909 = function () {
    return nN(function (e, t, r, s, a, H, u, f, d, _) {
      e.drawImage(t, r, s, a, H, u, f, d, _);
    }, arguments);
  };
  Cp.__wbg_getImageData_5e1c242046e6b59e = function () {
    return nN(function (e, t, r, s, a) {
      return e.getImageData(t, r, s, a);
    }, arguments);
  };
  Cp.__wbg_putImageData_a8b3e177ee06d521 = function () {
    return nN(function (e, t, r, s) {
      e.putImageData(t, r, s);
    }, arguments);
  };
  Cp.__wbg_instanceof_HtmlCanvasElement_25d964a0dde6717e = function (e) {
    let t;
    try {
      t = e instanceof HTMLCanvasElement;
    } catch (s) {
      t = !1;
    }
    return t;
  };
  Cp.__wbg_width_dc225e55343b745e = function (e) {
    return e.width;
  };
  Cp.__wbg_setwidth_488780db69b08846 = function (e, t) {
    e.width = t >>> 0;
  };
  Cp.__wbg_height_3a8bec2f3fe71b26 = function (e) {
    return e.height;
  };
  Cp.__wbg_setheight_1761808c18403921 = function (e, t) {
    e.height = t >>> 0;
  };
  Cp.__wbg_getContext_fc99dbd3a9a7e318 = function () {
    return nN(function (e, t, r) {
      let s = e.getContext(sme(t, r));
      return mor(s) ? 0 : _Lt(s);
    }, arguments);
  };
  Cp.__wbg_settextContent_f82a86a8df347e1c = function (e, t, r) {
    e.textContent = t === 0 ? void 0 : sme(t, r);
  };
  Cp.__wbg_appendChild_fa3b00dade9fc4cf = function () {
    return nN(function (e, t) {
      return e.appendChild(t);
    }, arguments);
  };
  Cp.__wbg_newnoargs_e643855c6572a4a8 = function (e, t) {
    return Function(sme(e, t));
  };
  Cp.__wbg_call_f96b398515635514 = function () {
    return nN(function (e, t) {
      return e.call(t);
    }, arguments);
  };
  Cp.__wbg_self_b9aad7f1c618bfaf = function () {
    return nN(function () {
      return self.self;
    }, arguments);
  };
  Cp.__wbg_window_55e469842c98b086 = function () {
    return nN(function () {
      return window.window;
    }, arguments);
  };
  Cp.__wbg_globalThis_d0957e302752547e = function () {
    return nN(function () {
      return globalThis.globalThis;
    }, arguments);
  };
  Cp.__wbg_global_ae2f87312b8987fb = function () {
    return nN(function () {
      return global.global;
    }, arguments);
  };
  Cp.__wbindgen_is_undefined = function (e) {
    return e === void 0;
  };
  Cp.__wbg_buffer_fcbfb6d88b2732e9 = function (e) {
    return e.buffer;
  };
  Cp.__wbg_new_bc5d9aad3f9ac80e = function (e) {
    return new Uint8Array(e);
  };
  Cp.__wbg_set_4b3aa8445ac1e91c = function (e, t, r) {
    e.set(t, r >>> 0);
  };
  Cp.__wbg_length_d9c4ded7e708c6a1 = function (e) {
    return e.length;
  };
  Cp.__wbindgen_debug_string = function (e, t) {
    let r = por(t),
      s = rN(r, Bn.__wbindgen_malloc, Bn.__wbindgen_realloc),
      a = ex;
    (Exe().setInt32(e + 4, a, !0), Exe().setInt32(e + 0, s, !0));
  };
  Cp.__wbindgen_throw = function (e, t) {
    throw Error(sme(e, t));
  };
  Cp.__wbindgen_memory = function () {
    return Bn.memory;
  };
  Cp.__wbindgen_init_externref_table = function () {
    let e = Bn.__wbindgen_export_2,
      t = e.grow(4);
    (e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, !0), e.set(t + 3, !1));
  };
  var Wio = globalThis.__OPENCODE_PHOTON_WASM_PATH || cr("path").join(__dirname, "photon_rs_bg.wasm"),
    Vio = cr("fs").readFileSync(Wio),
    qio = new WebAssembly.Module(Vio),
    Gio = new WebAssembly.Instance(qio, uTn);
  Bn = Gio.exports;
  Xio.__wasm = Bn;
  Bn.__wbindgen_start();
});