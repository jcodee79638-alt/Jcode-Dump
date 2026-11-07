
class Ce {
  static textContent(t) {
    const e = [],
      s = { items: e, styles: Object.create(null) };
    function i(n) {
      if (!n) return;
      let r = null;
      const a = n.name;
      if (a === "#text") r = n.value;
      else if (Ce.shouldBuildText(a))
        n?.attributes?.textContent ? (r = n.attributes.textContent) : n.value && (r = n.value);
      else return;
      if ((r !== null && e.push({ str: r }), !!n.children)) for (const o of n.children) i(o);
    }
    return (i(t), s);
  }
  static shouldBuildText(t) {
    return !(t === "textarea" || t === "input" || t === "option" || t === "select");
  }
}