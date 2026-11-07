
var Jbr = ne(() => {
  ((q7a = Object.defineProperty),
    (Rbr = 4 * lu),
    (Z8 = 5 * lu),
    (pJ = 2 * lu),
    (zze = 2 * lu + 2 * pJ),
    (Uce = { row: 0, column: 0 }),
    (Nce = Symbol("INTERNAL")));
  gs(OCe, "assertInternal");
  gs(Kze, "isPoint");
  gs(B4i, "setModule");
  G7a = class {
    static {
      gs(this, "LookaheadIterator");
    }
    [0] = 0;
    language;
    constructor(e, t, r) {
      (OCe(e), (this[0] = t), (this.language = r));
    }
    get currentTypeId() {
      return $n._ts_lookahead_iterator_current_symbol(this[0]);
    }
    get currentType() {
      return this.language.types[this.currentTypeId] || "ERROR";
    }
    delete() {
      ($n._ts_lookahead_iterator_delete(this[0]), (this[0] = 0));
    }
    reset(e, t) {
      if ($n._ts_lookahead_iterator_reset(this[0], e[0], t)) return ((this.language = e), !0);
      return !1;
    }
    resetState(e) {
      return Boolean($n._ts_lookahead_iterator_reset_state(this[0], e));
    }
    [Symbol.iterator]() {
      return {
        next: gs(() => {
          if ($n._ts_lookahead_iterator_next(this[0])) return { done: !1, value: this.currentType };
          return { done: !0, value: "" };
        }, "next"),
      };
    }
  };
  gs(Gbr, "getText");
  ((X7a = class e {
    static {
      gs(this, "Tree");
    }
    [0] = 0;
    textCallback;
    language;
    constructor(t, r, s, a) {
      (OCe(t), (this[0] = r), (this.language = s), (this.textCallback = a));
    }
    copy() {
      let t = $n._ts_tree_copy(this[0]);
      return new e(Nce, t, this.language, this.textCallback);
    }
    delete() {
      ($n._ts_tree_delete(this[0]), (this[0] = 0));
    }
    get rootNode() {
      return ($n._ts_tree_root_node_wasm(this[0]), WE(this));
    }
    rootNodeWithOffset(t, r) {
      let s = CA + Z8;
      return (
        $n.setValue(s, t, "i32"),
        AR(s + lu, r),
        $n._ts_tree_root_node_with_offset_wasm(this[0]),
        WE(this)
      );
    }
    edit(t) {
      (W4i(t), $n._ts_tree_edit_wasm(this[0]));
    }
    walk() {
      return this.rootNode.walk();
    }
    getChangedRanges(t) {
      if (!(t instanceof e)) throw TypeError("Argument must be a Tree");
      $n._ts_tree_get_changed_ranges_wasm(this[0], t[0]);
      let r = $n.getValue(CA, "i32"),
        s = $n.getValue(CA + lu, "i32"),
        a = Array(r);
      if (r > 0) {
        let H = s;
        for (let u = 0; u < r; u++) ((a[u] = ZPt(H)), (H += zze));
        $n._free(s);
      }
      return a;
    }
    getIncludedRanges() {
      $n._ts_tree_included_ranges_wasm(this[0]);
      let t = $n.getValue(CA, "i32"),
        r = $n.getValue(CA + lu, "i32"),
        s = Array(t);
      if (t > 0) {
        let a = r;
        for (let H = 0; H < t; H++) ((s[H] = ZPt(a)), (a += zze));
        $n._free(r);
      }
      return s;
    }
  }),
    (J7a = class e {
      static {
        gs(this, "TreeCursor");
      }
      [0] = 0;
      [1] = 0;
      [2] = 0;
      [3] = 0;
      tree;
      constructor(t, r) {
        (OCe(t), (this.tree = r), a9(this));
      }
      copy() {
        let t = new e(Nce, this.tree);
        return ($n._ts_tree_cursor_copy_wasm(this.tree[0]), a9(t), t);
      }
      delete() {
        (xg(this), $n._ts_tree_cursor_delete_wasm(this.tree[0]), (this[0] = this[1] = this[2] = 0));
      }
      get currentNode() {
        return (xg(this), $n._ts_tree_cursor_current_node_wasm(this.tree[0]), WE(this.tree));
      }
      get currentFieldId() {
        return (xg(this), $n._ts_tree_cursor_current_field_id_wasm(this.tree[0]));
      }
      get currentFieldName() {
        return this.tree.language.fields[this.currentFieldId];
      }
      get currentDepth() {
        return (xg(this), $n._ts_tree_cursor_current_depth_wasm(this.tree[0]));
      }
      get currentDescendantIndex() {
        return (xg(this), $n._ts_tree_cursor_current_descendant_index_wasm(this.tree[0]));
      }
      get nodeType() {
        return this.tree.language.types[this.nodeTypeId] || "ERROR";
      }
      get nodeTypeId() {
        return (xg(this), $n._ts_tree_cursor_current_node_type_id_wasm(this.tree[0]));
      }
      get nodeStateId() {
        return (xg(this), $n._ts_tree_cursor_current_node_state_id_wasm(this.tree[0]));
      }
      get nodeId() {
        return (xg(this), $n._ts_tree_cursor_current_node_id_wasm(this.tree[0]));
      }
      get nodeIsNamed() {
        return (xg(this), $n._ts_tree_cursor_current_node_is_named_wasm(this.tree[0]) === 1);
      }
      get nodeIsMissing() {
        return (xg(this), $n._ts_tree_cursor_current_node_is_missing_wasm(this.tree[0]) === 1);
      }
      get nodeText() {
        xg(this);
        let t = $n._ts_tree_cursor_start_index_wasm(this.tree[0]),
          r = $n._ts_tree_cursor_end_index_wasm(this.tree[0]);
        $n._ts_tree_cursor_start_position_wasm(this.tree[0]);
        let s = KLe(CA);
        return Gbr(this.tree, t, r, s);
      }
      get startPosition() {
        return (xg(this), $n._ts_tree_cursor_start_position_wasm(this.tree[0]), KLe(CA));
      }
      get endPosition() {
        return (xg(this), $n._ts_tree_cursor_end_position_wasm(this.tree[0]), KLe(CA));
      }
      get startIndex() {
        return (xg(this), $n._ts_tree_cursor_start_index_wasm(this.tree[0]));
      }
      get endIndex() {
        return (xg(this), $n._ts_tree_cursor_end_index_wasm(this.tree[0]));
      }
      gotoFirstChild() {
        xg(this);
        let t = $n._ts_tree_cursor_goto_first_child_wasm(this.tree[0]);
        return (a9(this), t === 1);
      }
      gotoLastChild() {
        xg(this);
        let t = $n._ts_tree_cursor_goto_last_child_wasm(this.tree[0]);
        return (a9(this), t === 1);
      }
      gotoParent() {
        xg(this);
        let t = $n._ts_tree_cursor_goto_parent_wasm(this.tree[0]);
        return (a9(this), t === 1);
      }
      gotoNextSibling() {
        xg(this);
        let t = $n._ts_tree_cursor_goto_next_sibling_wasm(this.tree[0]);
        return (a9(this), t === 1);
      }
      gotoPreviousSibling() {
        xg(this);
        let t = $n._ts_tree_cursor_goto_previous_sibling_wasm(this.tree[0]);
        return (a9(this), t === 1);
      }
      gotoDescendant(t) {
        (xg(this), $n._ts_tree_cursor_goto_descendant_wasm(this.tree[0], t), a9(this));
      }
      gotoFirstChildForIndex(t) {
        (xg(this), $n.setValue(CA + Rbr, t, "i32"));
        let r = $n._ts_tree_cursor_goto_first_child_for_index_wasm(this.tree[0]);
        return (a9(this), r === 1);
      }
      gotoFirstChildForPosition(t) {
        (xg(this), AR(CA + Rbr, t));
        let r = $n._ts_tree_cursor_goto_first_child_for_position_wasm(this.tree[0]);
        return (a9(this), r === 1);
      }
      reset(t) {
        (Dp(t), xg(this, CA + Z8), $n._ts_tree_cursor_reset_wasm(this.tree[0]), a9(this));
      }
      resetTo(t) {
        (xg(this, CA), xg(t, CA + Rbr), $n._ts_tree_cursor_reset_to_wasm(this.tree[0], t.tree[0]), a9(this));
      }
    }),
    (K7a = class {
      static {
        gs(this, "Node");
      }
      [0] = 0;
      _children;
      _namedChildren;
      constructor(e, { id: t, tree: r, startIndex: s, startPosition: a, other: H }) {
        (OCe(e),
          (this[0] = H),
          (this.id = t),
          (this.tree = r),
          (this.startIndex = s),
          (this.startPosition = a));
      }
      id;
      startIndex;
      startPosition;
      tree;
      get typeId() {
        return (Dp(this), $n._ts_node_symbol_wasm(this.tree[0]));
      }
      get grammarId() {
        return (Dp(this), $n._ts_node_grammar_symbol_wasm(this.tree[0]));
      }
      get type() {
        return this.tree.language.types[this.typeId] || "ERROR";
      }
      get grammarType() {
        return this.tree.language.types[this.grammarId] || "ERROR";
      }
      get isNamed() {
        return (Dp(this), $n._ts_node_is_named_wasm(this.tree[0]) === 1);
      }
      get isExtra() {
        return (Dp(this), $n._ts_node_is_extra_wasm(this.tree[0]) === 1);
      }
      get isError() {
        return (Dp(this), $n._ts_node_is_error_wasm(this.tree[0]) === 1);
      }
      get isMissing() {
        return (Dp(this), $n._ts_node_is_missing_wasm(this.tree[0]) === 1);
      }
      get hasChanges() {
        return (Dp(this), $n._ts_node_has_changes_wasm(this.tree[0]) === 1);
      }
      get hasError() {
        return (Dp(this), $n._ts_node_has_error_wasm(this.tree[0]) === 1);
      }
      get endIndex() {
        return (Dp(this), $n._ts_node_end_index_wasm(this.tree[0]));
      }
      get endPosition() {
        return (Dp(this), $n._ts_node_end_point_wasm(this.tree[0]), KLe(CA));
      }
      get text() {
        return Gbr(this.tree, this.startIndex, this.endIndex, this.startPosition);
      }
      get parseState() {
        return (Dp(this), $n._ts_node_parse_state_wasm(this.tree[0]));
      }
      get nextParseState() {
        return (Dp(this), $n._ts_node_next_parse_state_wasm(this.tree[0]));
      }
      equals(e) {
        return this.tree === e.tree && this.id === e.id;
      }
      child(e) {
        return (Dp(this), $n._ts_node_child_wasm(this.tree[0], e), WE(this.tree));
      }
      namedChild(e) {
        return (Dp(this), $n._ts_node_named_child_wasm(this.tree[0], e), WE(this.tree));
      }
      childForFieldId(e) {
        return (Dp(this), $n._ts_node_child_by_field_id_wasm(this.tree[0], e), WE(this.tree));
      }
      childForFieldName(e) {
        let t = this.tree.language.fields.indexOf(e);
        if (t !== -1) return this.childForFieldId(t);
        return null;
      }
      fieldNameForChild(e) {
        Dp(this);
        let t = $n._ts_node_field_name_for_child_wasm(this.tree[0], e);
        if (!t) return null;
        return $n.AsciiToString(t);
      }
      fieldNameForNamedChild(e) {
        Dp(this);
        let t = $n._ts_node_field_name_for_named_child_wasm(this.tree[0], e);
        if (!t) return null;
        return $n.AsciiToString(t);
      }
      childrenForFieldName(e) {
        let t = this.tree.language.fields.indexOf(e);
        if (t !== -1 && t !== 0) return this.childrenForFieldId(t);
        return [];
      }
      childrenForFieldId(e) {
        (Dp(this), $n._ts_node_children_by_field_id_wasm(this.tree[0], e));
        let t = $n.getValue(CA, "i32"),
          r = $n.getValue(CA + lu, "i32"),
          s = Array(t);
        if (t > 0) {
          let a = r;
          for (let H = 0; H < t; H++) ((s[H] = WE(this.tree, a)), (a += Z8));
          $n._free(r);
        }
        return s;
      }
      firstChildForIndex(e) {
        Dp(this);
        let t = CA + Z8;
        return ($n.setValue(t, e, "i32"), $n._ts_node_first_child_for_byte_wasm(this.tree[0]), WE(this.tree));
      }
      firstNamedChildForIndex(e) {
        Dp(this);
        let t = CA + Z8;
        return (
          $n.setValue(t, e, "i32"),
          $n._ts_node_first_named_child_for_byte_wasm(this.tree[0]),
          WE(this.tree)
        );
      }
      get childCount() {
        return (Dp(this), $n._ts_node_child_count_wasm(this.tree[0]));
      }
      get namedChildCount() {
        return (Dp(this), $n._ts_node_named_child_count_wasm(this.tree[0]));
      }
      get firstChild() {
        return this.child(0);
      }
      get firstNamedChild() {
        return this.namedChild(0);
      }
      get lastChild() {
        return this.child(this.childCount - 1);
      }
      get lastNamedChild() {
        return this.namedChild(this.namedChildCount - 1);
      }
      get children() {
        if (!this._children) {
          (Dp(this), $n._ts_node_children_wasm(this.tree[0]));
          let e = $n.getValue(CA, "i32"),
            t = $n.getValue(CA + lu, "i32");
          if (((this._children = Array(e)), e > 0)) {
            let r = t;
            for (let s = 0; s < e; s++) ((this._children[s] = WE(this.tree, r)), (r += Z8));
            $n._free(t);
          }
        }
        return this._children;
      }
      get namedChildren() {
        if (!this._namedChildren) {
          (Dp(this), $n._ts_node_named_children_wasm(this.tree[0]));
          let e = $n.getValue(CA, "i32"),
            t = $n.getValue(CA + lu, "i32");
          if (((this._namedChildren = Array(e)), e > 0)) {
            let r = t;
            for (let s = 0; s < e; s++) ((this._namedChildren[s] = WE(this.tree, r)), (r += Z8));
            $n._free(t);
          }
        }
        return this._namedChildren;
      }
      descendantsOfType(e, t = Uce, r = Uce) {
        if (!Array.isArray(e)) e = [e];
        let s = [],
          a = this.tree.language.types;
        for (let _ of e) if (_ == "ERROR") s.push(65535);
        for (let _ = 0, L = a.length; _ < L; _++) if (e.includes(a[_])) s.push(_);
        let H = $n._malloc(lu * s.length);
        for (let _ = 0, L = s.length; _ < L; _++) $n.setValue(H + _ * lu, s[_], "i32");
        (Dp(this),
          $n._ts_node_descendants_of_type_wasm(this.tree[0], H, s.length, t.row, t.column, r.row, r.column));
        let u = $n.getValue(CA, "i32"),
          f = $n.getValue(CA + lu, "i32"),
          d = Array(u);
        if (u > 0) {
          let _ = f;
          for (let L = 0; L < u; L++) ((d[L] = WE(this.tree, _)), (_ += Z8));
        }
        return ($n._free(f), $n._free(H), d);
      }
      get nextSibling() {
        return (Dp(this), $n._ts_node_next_sibling_wasm(this.tree[0]), WE(this.tree));
      }
      get previousSibling() {
        return (Dp(this), $n._ts_node_prev_sibling_wasm(this.tree[0]), WE(this.tree));
      }
      get nextNamedSibling() {
        return (Dp(this), $n._ts_node_next_named_sibling_wasm(this.tree[0]), WE(this.tree));
      }
      get previousNamedSibling() {
        return (Dp(this), $n._ts_node_prev_named_sibling_wasm(this.tree[0]), WE(this.tree));
      }
      get descendantCount() {
        return (Dp(this), $n._ts_node_descendant_count_wasm(this.tree[0]));
      }
      get parent() {
        return (Dp(this), $n._ts_node_parent_wasm(this.tree[0]), WE(this.tree));
      }
      childWithDescendant(e) {
        return (Dp(this), Dp(e, 1), $n._ts_node_child_with_descendant_wasm(this.tree[0]), WE(this.tree));
      }
      descendantForIndex(e, t = e) {
        if (typeof e !== "number" || typeof t !== "number") throw Error("Arguments must be numbers");
        Dp(this);
        let r = CA + Z8;
        return (
          $n.setValue(r, e, "i32"),
          $n.setValue(r + lu, t, "i32"),
          $n._ts_node_descendant_for_index_wasm(this.tree[0]),
          WE(this.tree)
        );
      }
      namedDescendantForIndex(e, t = e) {
        if (typeof e !== "number" || typeof t !== "number") throw Error("Arguments must be numbers");
        Dp(this);
        let r = CA + Z8;
        return (
          $n.setValue(r, e, "i32"),
          $n.setValue(r + lu, t, "i32"),
          $n._ts_node_named_descendant_for_index_wasm(this.tree[0]),
          WE(this.tree)
        );
      }
      descendantForPosition(e, t = e) {
        if (!Kze(e) || !Kze(t)) throw Error("Arguments must be {row, column} objects");
        Dp(this);
        let r = CA + Z8;
        return (
          AR(r, e),
          AR(r + pJ, t),
          $n._ts_node_descendant_for_position_wasm(this.tree[0]),
          WE(this.tree)
        );
      }
      namedDescendantForPosition(e, t = e) {
        if (!Kze(e) || !Kze(t)) throw Error("Arguments must be {row, column} objects");
        Dp(this);
        let r = CA + Z8;
        return (
          AR(r, e),
          AR(r + pJ, t),
          $n._ts_node_named_descendant_for_position_wasm(this.tree[0]),
          WE(this.tree)
        );
      }
      walk() {
        return (Dp(this), $n._ts_tree_cursor_new_wasm(this.tree[0]), new J7a(Nce, this.tree));
      }
      edit(e) {
        if (this.startIndex >= e.oldEndIndex) {
          this.startIndex = e.newEndIndex + (this.startIndex - e.oldEndIndex);
          let t, r;
          if (this.startPosition.row > e.oldEndPosition.row)
            ((t = this.startPosition.row - e.oldEndPosition.row), (r = this.startPosition.column));
          else if (
            ((t = 0), (r = this.startPosition.column), this.startPosition.column >= e.oldEndPosition.column)
          )
            r = this.startPosition.column - e.oldEndPosition.column;
          if (t > 0) ((this.startPosition.row += t), (this.startPosition.column = r));
          else this.startPosition.column += r;
        } else if (this.startIndex > e.startIndex)
          ((this.startIndex = e.newEndIndex),
            (this.startPosition.row = e.newEndPosition.row),
            (this.startPosition.column = e.newEndPosition.column));
      }
      toString() {
        Dp(this);
        let e = $n._ts_node_to_string_wasm(this.tree[0]),
          t = $n.AsciiToString(e);
        return ($n._free(e), t);
      }
    }));
  gs(qbr, "unmarshalCaptures");
  gs(Dp, "marshalNode");
  gs(WE, "unmarshalNode");
  gs(xg, "marshalTreeCursor");
  gs(a9, "unmarshalTreeCursor");
  gs(AR, "marshalPoint");
  gs(KLe, "unmarshalPoint");
  gs(R4i, "marshalRange");
  gs(ZPt, "unmarshalRange");
  gs(W4i, "marshalEdit");
  gs(V4i, "unmarshalLanguageMetadata");
  ((Y7a = /[\w-]+/g),
    (U$A = { Zero: 0, ZeroOrOne: 1, ZeroOrMore: 2, One: 3, OneOrMore: 4 }),
    (F4i = gs((e) => e.type === "capture", "isCaptureStep")),
    (Xbr = gs((e) => e.type === "string", "isStringStep")),
    (b7 = { Syntax: 1, NodeName: 2, FieldName: 3, CaptureName: 4, PatternStructure: 5 }),
    (Jze = class e extends Error {
      constructor(t, r, s, a) {
        super(e.formatMessage(t, r));
        ((this.kind = t), (this.info = r), (this.index = s), (this.length = a), (this.name = "QueryError"));
      }
      static {
        gs(this, "QueryError");
      }
      static formatMessage(t, r) {
        switch (t) {
          case b7.NodeName:
            return `Bad node name '${r.word}'`;
          case b7.FieldName:
            return `Bad field name '${r.word}'`;
          case b7.CaptureName:
            return `Bad capture name @${r.word}`;
          case b7.PatternStructure:
            return `Bad pattern structure at offset ${r.suffix}`;
          case b7.Syntax:
            return `Bad syntax at offset ${r.suffix}`;
        }
      }
    }));
  gs(q4i, "parseAnyPredicate");
  gs(G4i, "parseMatchPredicate");
  gs(X4i, "parseAnyOfPredicate");
  gs(J4i, "parseIsPredicate");
  gs(K4i, "parseSetDirective");
  gs(z4i, "parsePattern");
  ((Z7a = class {
    static {
      gs(this, "Query");
    }
    [0] = 0;
    exceededMatchLimit;
    textPredicates;
    captureNames;
    captureQuantifiers;
    predicates;
    setProperties;
    assertedProperties;
    refutedProperties;
    matchLimit;
    constructor(e, t) {
      let r = $n.lengthBytesUTF8(t),
        s = $n._malloc(r + 1);
      $n.stringToUTF8(t, s, r + 1);
      let a = $n._ts_query_new(e[0], s, r, CA, CA + lu);
      if (!a) {
        let O = $n.getValue(CA + lu, "i32"),
          B = $n.getValue(CA, "i32"),
          V = $n.UTF8ToString(s, B).length,
          q = t.slice(V, V + 100).split(`
`)[0],
          Z = q.match(Y7a)?.[0] ?? "";
        switch (($n._free(s), O)) {
          case b7.Syntax:
            throw new Jze(b7.Syntax, { suffix: `${V}: '${q}'...` }, V, 0);
          case b7.NodeName:
            throw new Jze(O, { word: Z }, V, Z.length);
          case b7.FieldName:
            throw new Jze(O, { word: Z }, V, Z.length);
          case b7.CaptureName:
            throw new Jze(O, { word: Z }, V, Z.length);
          case b7.PatternStructure:
            throw new Jze(O, { suffix: `${V}: '${q}'...` }, V, 0);
        }
      }
      let H = $n._ts_query_string_count(a),
        u = $n._ts_query_capture_count(a),
        f = $n._ts_query_pattern_count(a),
        d = Array(u),
        _ = Array(f),
        L = Array(H);
      for (let O = 0; O < u; O++) {
        let B = $n._ts_query_capture_name_for_id(a, O, CA),
          V = $n.getValue(CA, "i32");
        d[O] = $n.UTF8ToString(B, V);
      }
      for (let O = 0; O < f; O++) {
        let B = Array(u);
        for (let V = 0; V < u; V++) {
          let q = $n._ts_query_capture_quantifier_for_id(a, O, V);
          B[V] = q;
        }
        _[O] = B;
      }
      for (let O = 0; O < H; O++) {
        let B = $n._ts_query_string_value_for_id(a, O, CA),
          V = $n.getValue(CA, "i32");
        L[O] = $n.UTF8ToString(B, V);
      }
      let I = Array(f),
        D = Array(f),
        S = Array(f),
        T = Array(f),
        C = Array(f);
      for (let O = 0; O < f; O++) {
        let B = $n._ts_query_predicates_for_pattern(a, O, CA),
          V = $n.getValue(CA, "i32");
        ((T[O] = []), (C[O] = []));
        let q = [],
          Z = B;
        for (let se = 0; se < V; se++) {
          let ae = $n.getValue(Z, "i32");
          Z += lu;
          let z = $n.getValue(Z, "i32");
          ((Z += lu), z4i(O, ae, z, d, L, q, C, T, I, D, S));
        }
        (Object.freeze(C[O]),
          Object.freeze(T[O]),
          Object.freeze(I[O]),
          Object.freeze(D[O]),
          Object.freeze(S[O]));
      }
      ($n._free(s),
        (this[0] = a),
        (this.captureNames = d),
        (this.captureQuantifiers = _),
        (this.textPredicates = C),
        (this.predicates = T),
        (this.setProperties = I),
        (this.assertedProperties = D),
        (this.refutedProperties = S),
        (this.exceededMatchLimit = !1));
    }
    delete() {
      ($n._ts_query_delete(this[0]), (this[0] = 0));
    }
    matches(e, t = {}) {
      let r = t.startPosition ?? Uce,
        s = t.endPosition ?? Uce,
        a = t.startIndex ?? 0,
        H = t.endIndex ?? 0,
        u = t.matchLimit ?? 4294967295,
        f = t.maxStartDepth ?? 4294967295,
        d = t.timeoutMicros ?? 0,
        _ = t.progressCallback;
      if (typeof u !== "number") throw Error("Arguments must be numbers");
      if (((this.matchLimit = u), H !== 0 && a > H))
        throw Error("`startIndex` cannot be greater than `endIndex`");
      if (s !== Uce && (r.row > s.row || (r.row === s.row && r.column > s.column)))
        throw Error("`startPosition` cannot be greater than `endPosition`");
      if (_) $n.currentQueryProgressCallback = _;
      (Dp(e), $n._ts_query_matches_wasm(this[0], e.tree[0], r.row, r.column, s.row, s.column, a, H, u, f, d));
      let L = $n.getValue(CA, "i32"),
        I = $n.getValue(CA + lu, "i32"),
        D = $n.getValue(CA + 2 * lu, "i32"),
        S = Array(L);
      this.exceededMatchLimit = Boolean(D);
      let T = 0,
        C = I;
      for (let O = 0; O < L; O++) {
        let B = $n.getValue(C, "i32");
        C += lu;
        let V = $n.getValue(C, "i32");
        C += lu;
        let q = Array(V);
        if (((C = qbr(this, e.tree, C, B, q)), this.textPredicates[B].every((Z) => Z(q)))) {
          S[T] = { pattern: B, patternIndex: B, captures: q };
          let Z = this.setProperties[B];
          S[T].setProperties = Z;
          let se = this.assertedProperties[B];
          S[T].assertedProperties = se;
          let ae = this.refutedProperties[B];
          ((S[T].refutedProperties = ae), T++);
        }
      }
      return ((S.length = T), $n._free(I), ($n.currentQueryProgressCallback = null), S);
    }
    captures(e, t = {}) {
      let r = t.startPosition ?? Uce,
        s = t.endPosition ?? Uce,
        a = t.startIndex ?? 0,
        H = t.endIndex ?? 0,
        u = t.matchLimit ?? 4294967295,
        f = t.maxStartDepth ?? 4294967295,
        d = t.timeoutMicros ?? 0,
        _ = t.progressCallback;
      if (typeof u !== "number") throw Error("Arguments must be numbers");
      if (((this.matchLimit = u), H !== 0 && a > H))
        throw Error("`startIndex` cannot be greater than `endIndex`");
      if (s !== Uce && (r.row > s.row || (r.row === s.row && r.column > s.column)))
        throw Error("`startPosition` cannot be greater than `endPosition`");
      if (_) $n.currentQueryProgressCallback = _;
      (Dp(e),
        $n._ts_query_captures_wasm(this[0], e.tree[0], r.row, r.column, s.row, s.column, a, H, u, f, d));
      let L = $n.getValue(CA, "i32"),
        I = $n.getValue(CA + lu, "i32"),
        D = $n.getValue(CA + 2 * lu, "i32"),
        S = [];
      this.exceededMatchLimit = Boolean(D);
      let T = [],
        C = I;
      for (let O = 0; O < L; O++) {
        let B = $n.getValue(C, "i32");
        C += lu;
        let V = $n.getValue(C, "i32");
        C += lu;
        let q = $n.getValue(C, "i32");
        if (
          ((C += lu),
          (T.length = V),
          (C = qbr(this, e.tree, C, B, T)),
          this.textPredicates[B].every((Z) => Z(T)))
        ) {
          let Z = T[q],
            se = this.setProperties[B];
          Z.setProperties = se;
          let ae = this.assertedProperties[B];
          Z.assertedProperties = ae;
          let z = this.refutedProperties[B];
          ((Z.refutedProperties = z), S.push(Z));
        }
      }
      return ($n._free(I), ($n.currentQueryProgressCallback = null), S);
    }
    predicatesForPattern(e) {
      return this.predicates[e];
    }
    disableCapture(e) {
      let t = $n.lengthBytesUTF8(e),
        r = $n._malloc(t + 1);
      ($n.stringToUTF8(e, r, t + 1), $n._ts_query_disable_capture(this[0], r, t), $n._free(r));
    }
    disablePattern(e) {
      if (e >= this.predicates.length)
        throw Error(`Pattern index is ${e} but the pattern count is ${this.predicates.length}`);
      $n._ts_query_disable_pattern(this[0], e);
    }
    didExceedMatchLimit() {
      return this.exceededMatchLimit;
    }
    startIndexForPattern(e) {
      if (e >= this.predicates.length)
        throw Error(`Pattern index is ${e} but the pattern count is ${this.predicates.length}`);
      return $n._ts_query_start_byte_for_pattern(this[0], e);
    }
    endIndexForPattern(e) {
      if (e >= this.predicates.length)
        throw Error(`Pattern index is ${e} but the pattern count is ${this.predicates.length}`);
      return $n._ts_query_end_byte_for_pattern(this[0], e);
    }
    patternCount() {
      return $n._ts_query_pattern_count(this[0]);
    }
    captureIndexForName(e) {
      return this.captureNames.indexOf(e);
    }
    isPatternRooted(e) {
      return $n._ts_query_is_pattern_rooted(this[0], e) === 1;
    }
    isPatternNonLocal(e) {
      return $n._ts_query_is_pattern_non_local(this[0], e) === 1;
    }
    isPatternGuaranteedAtStep(e) {
      return $n._ts_query_is_pattern_guaranteed_at_step(this[0], e) === 1;
    }
  }),
    (e4a = /^tree_sitter_\w+$/),
    (Qze = class e {
      static {
        gs(this, "Language");
      }
      [0] = 0;
      types;
      fields;
      constructor(t, r) {
        (OCe(t), (this[0] = r), (this.types = Array($n._ts_language_symbol_count(this[0]))));
        for (let s = 0, a = this.types.length; s < a; s++)
          if ($n._ts_language_symbol_type(this[0], s) < 2)
            this.types[s] = $n.UTF8ToString($n._ts_language_symbol_name(this[0], s));
        this.fields = Array($n._ts_language_field_count(this[0]) + 1);
        for (let s = 0, a = this.fields.length; s < a; s++) {
          let H = $n._ts_language_field_name_for_id(this[0], s);
          if (H !== 0) this.fields[s] = $n.UTF8ToString(H);
          else this.fields[s] = null;
        }
      }
      get name() {
        let t = $n._ts_language_name(this[0]);
        if (t === 0) return null;
        return $n.UTF8ToString(t);
      }
      get version() {
        return $n._ts_language_version(this[0]);
      }
      get abiVersion() {
        return $n._ts_language_abi_version(this[0]);
      }
      get metadata() {
        $n._ts_language_metadata(this[0]);
        let t = $n.getValue(CA, "i32"),
          r = $n.getValue(CA + lu, "i32");
        if (t === 0) return null;
        return V4i(r);
      }
      get fieldCount() {
        return this.fields.length - 1;
      }
      get stateCount() {
        return $n._ts_language_state_count(this[0]);
      }
      fieldIdForName(t) {
        let r = this.fields.indexOf(t);
        return r !== -1 ? r : null;
      }
      fieldNameForId(t) {
        return this.fields[t] ?? null;
      }
      idForNodeType(t, r) {
        let s = $n.lengthBytesUTF8(t),
          a = $n._malloc(s + 1);
        $n.stringToUTF8(t, a, s + 1);
        let H = $n._ts_language_symbol_for_name(this[0], a, s, r ? 1 : 0);
        return ($n._free(a), H || null);
      }
      get nodeTypeCount() {
        return $n._ts_language_symbol_count(this[0]);
      }
      nodeTypeForId(t) {
        let r = $n._ts_language_symbol_name(this[0], t);
        return r ? $n.UTF8ToString(r) : null;
      }
      nodeTypeIsNamed(t) {
        return $n._ts_language_type_is_named_wasm(this[0], t) ? !0 : !1;
      }
      nodeTypeIsVisible(t) {
        return $n._ts_language_type_is_visible_wasm(this[0], t) ? !0 : !1;
      }
      get supertypes() {
        $n._ts_language_supertypes_wasm(this[0]);
        let t = $n.getValue(CA, "i32"),
          r = $n.getValue(CA + lu, "i32"),
          s = Array(t);
        if (t > 0) {
          let a = r;
          for (let H = 0; H < t; H++) ((s[H] = $n.getValue(a, "i16")), (a += N4i));
        }
        return s;
      }
      subtypes(t) {
        $n._ts_language_subtypes_wasm(this[0], t);
        let r = $n.getValue(CA, "i32"),
          s = $n.getValue(CA + lu, "i32"),
          a = Array(r);
        if (r > 0) {
          let H = s;
          for (let u = 0; u < r; u++) ((a[u] = $n.getValue(H, "i16")), (H += N4i));
        }
        return a;
      }
      nextState(t, r) {
        return $n._ts_language_next_state(this[0], t, r);
      }
      lookaheadIterator(t) {
        let r = $n._ts_lookahead_iterator_new(this[0], t);
        if (r) return new G7a(Nce, r, this);
        return null;
      }
      query(t) {
        return (
          console.warn("Language.query is deprecated. Use new Query(language, source) instead."),
          new Z7a(this, t)
        );
      }
      static async load(t) {
        let r;
        if (t instanceof Uint8Array) r = Promise.resolve(t);
        else if (globalThis.process?.versions.node) {
          let f = await import("fs/promises");
          r = f.readFile(t);
        } else
          r = fetch(t).then((f) =>
            f.arrayBuffer().then((d) => {
              if (f.ok) return new Uint8Array(d);
              else {
                let _ = new TextDecoder("utf-8").decode(d);
                throw Error(`Language.load failed with status ${f.status}.

${_}`);
              }
            }),
          );
        let s = await $n.loadWebAssemblyModule(await r, { loadAsync: !0 }),
          a = Object.keys(s),
          H = a.find((f) => e4a.test(f) && !f.includes("external_scanner_"));
        if (!H)
          throw (
            console.log(`Couldn't find language function in WASM file. Symbols:
${JSON.stringify(a, null, 2)}`),
            Error("Language.load failed: no language function found in WASM file")
          );
        let u = s[H]();
        return new e(Nce, u);
      }
    }),
    (t4a = (() => {
      var _scriptName = import.meta.url;
      return async function (moduleArg = {}) {
        var moduleRtn,
          Module = moduleArg,
          readyPromiseResolve,
          readyPromiseReject,
          readyPromise = new Promise((e, t) => {
            ((readyPromiseResolve = e), (readyPromiseReject = t));
          }),
          ENVIRONMENT_IS_WEB = typeof window == "object",
          ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope < "u",
          ENVIRONMENT_IS_NODE =
            typeof process == "object" &&
            typeof process.versions == "object" &&
            typeof process.versions.node == "string" &&
            process.type != "renderer",
          ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
        if (ENVIRONMENT_IS_NODE) {
          let { createRequire: e } = await import("module");
          var require = e(import.meta.url);
        }
        ((Module.currentQueryProgressCallback = null),
          (Module.currentProgressCallback = null),
          (Module.currentLogCallback = null),
          (Module.currentParseCallback = null));
        var moduleOverrides = Object.assign({}, Module),
          arguments_ = [],
          thisProgram = "./this.program",
          quit_ = gs((e, t) => {
            throw t;
          }, "quit_"),
          scriptDirectory = "";
        function locateFile(e) {
          if (Module.locateFile) return Module.locateFile(e, scriptDirectory);
          return scriptDirectory + e;
        }
        gs(locateFile, "locateFile");
        var readAsync, readBinary;
        if (ENVIRONMENT_IS_NODE) {
          var fs = require("fs"),
            nodePath = require("path");
          if (!import.meta.url.startsWith("data:"))
            scriptDirectory = nodePath.dirname(require("url").fileURLToPath(import.meta.url)) + "/";
          if (
            ((readBinary = gs((e) => {
              e = isFileURI(e) ? new URL(e) : e;
              var t = fs.readFileSync(e);
              return t;
            }, "readBinary")),
            (readAsync = gs(async (e, t = !0) => {
              e = isFileURI(e) ? new URL(e) : e;
              var r = fs.readFileSync(e, t ? void 0 : "utf8");
              return r;
            }, "readAsync")),
            !Module.thisProgram && process.argv.length > 1)
          )
            thisProgram = process.argv[1].replace(/\\/g, "/");
          ((arguments_ = process.argv.slice(2)),
            (quit_ = gs((e, t) => {
              throw ((process.exitCode = e), t);
            }, "quit_")));
        } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
          if (ENVIRONMENT_IS_WORKER) scriptDirectory = self.location.href;
          else if (typeof document < "u" && document.currentScript)
            scriptDirectory = document.currentScript.src;
          if (_scriptName) scriptDirectory = _scriptName;
          if (scriptDirectory.startsWith("blob:")) scriptDirectory = "";
          else
            scriptDirectory = scriptDirectory.slice(
              0,
              scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1,
            );
          {
            if (ENVIRONMENT_IS_WORKER)
              readBinary = gs((e) => {
                var t = new XMLHttpRequest();
                return (
                  t.open("GET", e, !1),
                  (t.responseType = "arraybuffer"),
                  t.send(null),
                  new Uint8Array(t.response)
                );
              }, "readBinary");
            readAsync = gs(async (e) => {
              if (isFileURI(e))
                return new Promise((r, s) => {
                  var a = new XMLHttpRequest();
                  (a.open("GET", e, !0),
                    (a.responseType = "arraybuffer"),
                    (a.onload = () => {
                      if (a.status == 200 || (a.status == 0 && a.response)) {
                        r(a.response);
                        return;
                      }
                      s(a.status);
                    }),
                    (a.onerror = s),
                    a.send(null));
                });
              var t = await fetch(e, { credentials: "same-origin" });
              if (t.ok) return t.arrayBuffer();
              throw Error(t.status + " : " + t.url);
            }, "readAsync");
          }
        }
        var out = Module.print || console.log.bind(console),
          err = Module.printErr || console.error.bind(console);
        if ((Object.assign(Module, moduleOverrides), (moduleOverrides = null), Module.arguments))
          arguments_ = Module.arguments;
        if (Module.thisProgram) thisProgram = Module.thisProgram;
        var dynamicLibraries = Module.dynamicLibraries || [],
          wasmBinary = Module.wasmBinary,
          wasmMemory,
          ABORT = !1,
          EXITSTATUS;
        function assert(e, t) {
          if (!e) abort(t);
        }
        gs(assert, "assert");
        var HEAP,
          HEAP8,
          HEAPU8,
          HEAP16,
          HEAPU16,
          HEAP32,
          HEAPU32,
          HEAPF32,
          HEAP64,
          HEAPU64,
          HEAPF64,
          HEAP_DATA_VIEW,
          runtimeInitialized = !1,
          isFileURI = gs((e) => e.startsWith("file://"), "isFileURI");
        function updateMemoryViews() {
          var e = wasmMemory.buffer;
          ((Module.HEAP_DATA_VIEW = HEAP_DATA_VIEW = new DataView(e)),
            (Module.HEAP8 = HEAP8 = new Int8Array(e)),
            (Module.HEAP16 = HEAP16 = new Int16Array(e)),
            (Module.HEAPU8 = HEAPU8 = new Uint8Array(e)),
            (Module.HEAPU16 = HEAPU16 = new Uint16Array(e)),
            (Module.HEAP32 = HEAP32 = new Int32Array(e)),
            (Module.HEAPU32 = HEAPU32 = new Uint32Array(e)),
            (Module.HEAPF32 = HEAPF32 = new Float32Array(e)),
            (Module.HEAPF64 = HEAPF64 = new Float64Array(e)),
            (Module.HEAP64 = HEAP64 = new BigInt64Array(e)),
            (Module.HEAPU64 = HEAPU64 = new BigUint64Array(e)));
        }
        if ((gs(updateMemoryViews, "updateMemoryViews"), Module.wasmMemory)) wasmMemory = Module.wasmMemory;
        else {
          var INITIAL_MEMORY = Module.INITIAL_MEMORY || 33554432;
          wasmMemory = new WebAssembly.Memory({ initial: INITIAL_MEMORY / 65536, maximum: 32768 });
        }
        updateMemoryViews();
        var __RELOC_FUNCS__ = [];
        function preRun() {
          if (Module.preRun) {
            if (typeof Module.preRun == "function") Module.preRun = [Module.preRun];
            while (Module.preRun.length) addOnPreRun(Module.preRun.shift());
          }
          callRuntimeCallbacks(onPreRuns);
        }
        gs(preRun, "preRun");
        function initRuntime() {
          ((runtimeInitialized = !0),
            callRuntimeCallbacks(__RELOC_FUNCS__),
            wasmExports.__wasm_call_ctors(),
            callRuntimeCallbacks(onPostCtors));
        }
        gs(initRuntime, "initRuntime");
        function preMain() {}
        gs(preMain, "preMain");
        function postRun() {
          if (Module.postRun) {
            if (typeof Module.postRun == "function") Module.postRun = [Module.postRun];
            while (Module.postRun.length) addOnPostRun(Module.postRun.shift());
          }
          callRuntimeCallbacks(onPostRuns);
        }
        gs(postRun, "postRun");
        var runDependencies = 0,
          dependenciesFulfilled = null;
        function getUniqueRunDependency(e) {
          return e;
        }
        gs(getUniqueRunDependency, "getUniqueRunDependency");
        function addRunDependency(e) {
          (runDependencies++, Module.monitorRunDependencies?.(runDependencies));
        }
        gs(addRunDependency, "addRunDependency");
        function removeRunDependency(e) {
          if ((runDependencies--, Module.monitorRunDependencies?.(runDependencies), runDependencies == 0)) {
            if (dependenciesFulfilled) {
              var t = dependenciesFulfilled;
              ((dependenciesFulfilled = null), t());
            }
          }
        }
        gs(removeRunDependency, "removeRunDependency");
        function abort(e) {
          (Module.onAbort?.(e),
            (e = "Aborted(" + e + ")"),
            err(e),
            (ABORT = !0),
            (e += ". Build with -sASSERTIONS for more info."));
          var t = new WebAssembly.RuntimeError(e);
          throw (readyPromiseReject(t), t);
        }
        gs(abort, "abort");
        var wasmBinaryFile;
        function findWasmBinary() {
          if (Module.locateFile) return locateFile("tree-sitter.wasm");
          return new URL("tree-sitter.wasm", import.meta.url).href;
        }
        gs(findWasmBinary, "findWasmBinary");
        function getBinarySync(e) {
          if (e == wasmBinaryFile && wasmBinary) return new Uint8Array(wasmBinary);
          if (readBinary) return readBinary(e);
          throw "both async and sync fetching of the wasm failed";
        }
        gs(getBinarySync, "getBinarySync");
        async function getWasmBinary(e) {
          if (!wasmBinary)
            try {
              var t = await readAsync(e);
              return new Uint8Array(t);
            } catch {}
          return getBinarySync(e);
        }
        gs(getWasmBinary, "getWasmBinary");
        async function instantiateArrayBuffer(e, t) {
          try {
            var r = await getWasmBinary(e),
              s = await WebAssembly.instantiate(r, t);
            return s;
          } catch (a) {
            (err(`failed to asynchronously prepare wasm: ${a}`), abort(a));
          }
        }
        gs(instantiateArrayBuffer, "instantiateArrayBuffer");
        async function instantiateAsync(e, t, r) {
          if (
            !e &&
            typeof WebAssembly.instantiateStreaming == "function" &&
            !isFileURI(t) &&
            !ENVIRONMENT_IS_NODE
          )
            try {
              var s = fetch(t, { credentials: "same-origin" }),
                a = await WebAssembly.instantiateStreaming(s, r);
              return a;
            } catch (H) {
              (err(`wasm streaming compile failed: ${H}`), err("falling back to ArrayBuffer instantiation"));
            }
          return instantiateArrayBuffer(t, r);
        }
        gs(instantiateAsync, "instantiateAsync");
        function getWasmImports() {
          return {
            env: wasmImports,
            wasi_snapshot_preview1: wasmImports,
            "GOT.mem": new Proxy(wasmImports, GOTHandler),
            "GOT.func": new Proxy(wasmImports, GOTHandler),
          };
        }
        gs(getWasmImports, "getWasmImports");
        async function createWasm() {
          function e(H, u) {
            ((wasmExports = H.exports), (wasmExports = relocateExports(wasmExports, 1024)));
            var f = getDylinkMetadata(u);
            if (f.neededDynlibs) dynamicLibraries = f.neededDynlibs.concat(dynamicLibraries);
            return (
              mergeLibSymbols(wasmExports, "main"),
              LDSO.init(),
              loadDylibs(),
              __RELOC_FUNCS__.push(wasmExports.__wasm_apply_data_relocs),
              removeRunDependency("wasm-instantiate"),
              wasmExports
            );
          }
          (gs(e, "receiveInstance"), addRunDependency("wasm-instantiate"));
          function t(H) {
            return e(H.instance, H.module);
          }
          gs(t, "receiveInstantiationResult");
          var r = getWasmImports();
          if (Module.instantiateWasm)
            return new Promise((H, u) => {
              Module.instantiateWasm(r, (f, d) => {
                (e(f, d), H(f.exports));
              });
            });
          wasmBinaryFile ??= findWasmBinary();
          try {
            var s = await instantiateAsync(wasmBinary, wasmBinaryFile, r),
              a = t(s);
            return a;
          } catch (H) {
            return (readyPromiseReject(H), Promise.reject(H));
          }
        }
        gs(createWasm, "createWasm");
        var ASM_CONSTS = {};
        class ExitStatus {
          static {
            gs(this, "ExitStatus");
          }
          name = "ExitStatus";
          constructor(e) {
            ((this.message = `Program terminated with exit(${e})`), (this.status = e));
          }
        }
        var GOT = {},
          currentModuleWeakSymbols = new Set([]),
          GOTHandler = {
            get(e, t) {
              var r = GOT[t];
              if (!r) r = GOT[t] = new WebAssembly.Global({ value: "i32", mutable: !0 });
              if (!currentModuleWeakSymbols.has(t)) r.required = !0;
              return r;
            },
          },
          LE_HEAP_LOAD_F32 = gs((e) => HEAP_DATA_VIEW.getFloat32(e, !0), "LE_HEAP_LOAD_F32"),
          LE_HEAP_LOAD_F64 = gs((e) => HEAP_DATA_VIEW.getFloat64(e, !0), "LE_HEAP_LOAD_F64"),
          LE_HEAP_LOAD_I16 = gs((e) => HEAP_DATA_VIEW.getInt16(e, !0), "LE_HEAP_LOAD_I16"),
          LE_HEAP_LOAD_I32 = gs((e) => HEAP_DATA_VIEW.getInt32(e, !0), "LE_HEAP_LOAD_I32"),
          LE_HEAP_LOAD_U16 = gs((e) => HEAP_DATA_VIEW.getUint16(e, !0), "LE_HEAP_LOAD_U16"),
          LE_HEAP_LOAD_U32 = gs((e) => HEAP_DATA_VIEW.getUint32(e, !0), "LE_HEAP_LOAD_U32"),
          LE_HEAP_STORE_F32 = gs((e, t) => HEAP_DATA_VIEW.setFloat32(e, t, !0), "LE_HEAP_STORE_F32"),
          LE_HEAP_STORE_F64 = gs((e, t) => HEAP_DATA_VIEW.setFloat64(e, t, !0), "LE_HEAP_STORE_F64"),
          LE_HEAP_STORE_I16 = gs((e, t) => HEAP_DATA_VIEW.setInt16(e, t, !0), "LE_HEAP_STORE_I16"),
          LE_HEAP_STORE_I32 = gs((e, t) => HEAP_DATA_VIEW.setInt32(e, t, !0), "LE_HEAP_STORE_I32"),
          LE_HEAP_STORE_U16 = gs((e, t) => HEAP_DATA_VIEW.setUint16(e, t, !0), "LE_HEAP_STORE_U16"),
          LE_HEAP_STORE_U32 = gs((e, t) => HEAP_DATA_VIEW.setUint32(e, t, !0), "LE_HEAP_STORE_U32"),
          callRuntimeCallbacks = gs((e) => {
            while (e.length > 0) e.shift()(Module);
          }, "callRuntimeCallbacks"),
          onPostRuns = [],
          addOnPostRun = gs((e) => onPostRuns.unshift(e), "addOnPostRun"),
          onPreRuns = [],
          addOnPreRun = gs((e) => onPreRuns.unshift(e), "addOnPreRun"),
          UTF8Decoder = typeof TextDecoder < "u" ? new TextDecoder() : void 0,
          UTF8ArrayToString = gs((e, t = 0, r = NaN) => {
            var s = t + r,
              a = t;
            while (e[a] && !(a >= s)) ++a;
            if (a - t > 16 && e.buffer && UTF8Decoder) return UTF8Decoder.decode(e.subarray(t, a));
            var H = "";
            while (t < a) {
              var u = e[t++];
              if (!(u & 128)) {
                H += String.fromCharCode(u);
                continue;
              }
              var f = e[t++] & 63;
              if ((u & 224) == 192) {
                H += String.fromCharCode(((u & 31) << 6) | f);
                continue;
              }
              var d = e[t++] & 63;
              if ((u & 240) == 224) u = ((u & 15) << 12) | (f << 6) | d;
              else u = ((u & 7) << 18) | (f << 12) | (d << 6) | (e[t++] & 63);
              if (u < 65536) H += String.fromCharCode(u);
              else {
                var _ = u - 65536;
                H += String.fromCharCode(55296 | (_ >> 10), 56320 | (_ & 1023));
              }
            }
            return H;
          }, "UTF8ArrayToString"),
          getDylinkMetadata = gs((e) => {
            var t = 0,
              r = 0;
            function s() {
              return e[t++];
            }
            gs(s, "getU8");
            function a() {
              var Ht = 0,
                Se = 1;
              while (!0) {
                var _e = e[t++];
                if (((Ht += (_e & 127) * Se), (Se *= 128), !(_e & 128))) break;
              }
              return Ht;
            }
            gs(a, "getLEB");
            function H() {
              var Ht = a();
              return ((t += Ht), UTF8ArrayToString(e, t - Ht, Ht));
            }
            gs(H, "getString");
            function u(Ht, Se) {
              if (Ht) throw Error(Se);
            }
            gs(u, "failIf");
            var f = "dylink.0";
            if (e instanceof WebAssembly.Module) {
              var d = WebAssembly.Module.customSections(e, f);
              if (d.length === 0) ((f = "dylink"), (d = WebAssembly.Module.customSections(e, f)));
              (u(d.length === 0, "need dylink section"), (e = new Uint8Array(d[0])), (r = e.length));
            } else {
              var _ = new Uint32Array(new Uint8Array(e.subarray(0, 24)).buffer),
                L = _[0] == 1836278016 || _[0] == 6386541;
              (u(!L, "need to see wasm magic number"),
                u(e[8] !== 0, "need the dylink section to be first"),
                (t = 9));
              var I = a();
              ((r = t + I), (f = H()));
            }
            var D = { neededDynlibs: [], tlsExports: new Set(), weakImports: new Set() };
            if (f == "dylink") {
              ((D.memorySize = a()), (D.memoryAlign = a()), (D.tableSize = a()), (D.tableAlign = a()));
              var S = a();
              for (var T = 0; T < S; ++T) {
                var C = H();
                D.neededDynlibs.push(C);
              }
            } else {
              u(f !== "dylink.0");
              var O = 1,
                B = 2,
                V = 3,
                q = 4,
                Z = 256,
                se = 3,
                ae = 1;
              while (t < r) {
                var z = s(),
                  Ae = a();
                if (z === O)
                  ((D.memorySize = a()), (D.memoryAlign = a()), (D.tableSize = a()), (D.tableAlign = a()));
                else if (z === B) {
                  var S = a();
                  for (var T = 0; T < S; ++T) ((C = H()), D.neededDynlibs.push(C));
                } else if (z === V) {
                  var le = a();
                  while (le--) {
                    var Be = H(),
                      Te = a();
                    if (Te & Z) D.tlsExports.add(Be);
                  }
                } else if (z === q) {
                  var le = a();
                  while (le--) {
                    var Lt = H(),
                      Be = H(),
                      Te = a();
                    if ((Te & se) == ae) D.weakImports.add(Be);
                  }
                } else t += Ae;
              }
            }
            return D;
          }, "getDylinkMetadata");
        function getValue(e, t = "i8") {
          if (t.endsWith("*")) t = "*";
          switch (t) {
            case "i1":
              return HEAP8[e];
            case "i8":
              return HEAP8[e];
            case "i16":
              return LE_HEAP_LOAD_I16((e >> 1) * 2);
            case "i32":
              return LE_HEAP_LOAD_I32((e >> 2) * 4);
            case "i64":
              return HEAP64[e >> 3];
            case "float":
              return LE_HEAP_LOAD_F32((e >> 2) * 4);
            case "double":
              return LE_HEAP_LOAD_F64((e >> 3) * 8);
            case "*":
              return LE_HEAP_LOAD_U32((e >> 2) * 4);
            default:
              abort(`invalid type for getValue: ${t}`);
          }
        }
        gs(getValue, "getValue");
        var newDSO = gs((e, t, r) => {
            var s = { refcount: 1 / 0, name: e, exports: r, global: !0 };
            if (((LDSO.loadedLibsByName[e] = s), t != null)) LDSO.loadedLibsByHandle[t] = s;
            return s;
          }, "newDSO"),
          LDSO = {
            loadedLibsByName: {},
            loadedLibsByHandle: {},
            init() {
              newDSO("__main__", 0, wasmImports);
            },
          },
          ___heap_base = 78224,
          alignMemory = gs((e, t) => Math.ceil(e / t) * t, "alignMemory"),
          getMemory = gs((e) => {
            if (runtimeInitialized) return _calloc(e, 1);
            var t = ___heap_base,
              r = t + alignMemory(e, 16);
            return ((___heap_base = r), (GOT.__heap_base.value = r), t);
          }, "getMemory"),
          isInternalSym = gs(
            (e) =>
              [
                "__cpp_exception",
                "__c_longjmp",
                "__wasm_apply_data_relocs",
                "__dso_handle",
                "__tls_size",
                "__tls_align",
                "__set_stack_limits",
                "_emscripten_tls_init",
                "__wasm_init_tls",
                "__wasm_call_ctors",
                "__start_em_asm",
                "__stop_em_asm",
                "__start_em_js",
                "__stop_em_js",
              ].includes(e) || e.startsWith("__em_js__"),
            "isInternalSym",
          ),
          uleb128Encode = gs((e, t) => {
            if (e < 128) t.push(e);
            else t.push((e % 128) | 128, e >> 7);
          }, "uleb128Encode"),
          sigToWasmTypes = gs((e) => {
            var t = { i: "i32", j: "i64", f: "f32", d: "f64", e: "externref", p: "i32" },
              r = { parameters: [], results: e[0] == "v" ? [] : [t[e[0]]] };
            for (var s = 1; s < e.length; ++s) r.parameters.push(t[e[s]]);
            return r;
          }, "sigToWasmTypes"),
          generateFuncType = gs((e, t) => {
            var r = e.slice(0, 1),
              s = e.slice(1),
              a = { i: 127, p: 127, j: 126, f: 125, d: 124, e: 111 };
            (t.push(96), uleb128Encode(s.length, t));
            for (var H = 0; H < s.length; ++H) t.push(a[s[H]]);
            if (r == "v") t.push(0);
            else t.push(1, a[r]);
          }, "generateFuncType"),
          convertJsFunctionToWasm = gs((e, t) => {
            if (typeof WebAssembly.Function == "function")
              return new WebAssembly.Function(sigToWasmTypes(t), e);
            var r = [1];
            generateFuncType(t, r);
            var s = [0, 97, 115, 109, 1, 0, 0, 0, 1];
            (uleb128Encode(r.length, s),
              s.push(...r),
              s.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0));
            var a = new WebAssembly.Module(new Uint8Array(s)),
              H = new WebAssembly.Instance(a, { e: { f: e } }),
              u = H.exports.f;
            return u;
          }, "convertJsFunctionToWasm"),
          wasmTableMirror = [],
          wasmTable = new WebAssembly.Table({ initial: 31, element: "anyfunc" }),
          getWasmTableEntry = gs((e) => {
            var t = wasmTableMirror[e];
            if (!t) {
              if (e >= wasmTableMirror.length) wasmTableMirror.length = e + 1;
              wasmTableMirror[e] = t = wasmTable.get(e);
            }
            return t;
          }, "getWasmTableEntry"),
          updateTableMap = gs((e, t) => {
            if (functionsInTableMap)
              for (var r = e; r < e + t; r++) {
                var s = getWasmTableEntry(r);
                if (s) functionsInTableMap.set(s, r);
              }
          }, "updateTableMap"),
          functionsInTableMap,
          getFunctionAddress = gs((e) => {
            if (!functionsInTableMap)
              ((functionsInTableMap = new WeakMap()), updateTableMap(0, wasmTable.length));
            return functionsInTableMap.get(e) || 0;
          }, "getFunctionAddress"),
          freeTableIndexes = [],
          getEmptyTableSlot = gs(() => {
            if (freeTableIndexes.length) return freeTableIndexes.pop();
            try {
              wasmTable.grow(1);
            } catch (e) {
              if (!(e instanceof RangeError)) throw e;
              throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
            }
            return wasmTable.length - 1;
          }, "getEmptyTableSlot"),
          setWasmTableEntry = gs((e, t) => {
            (wasmTable.set(e, t), (wasmTableMirror[e] = wasmTable.get(e)));
          }, "setWasmTableEntry"),
          addFunction = gs((e, t) => {
            var r = getFunctionAddress(e);
            if (r) return r;
            var s = getEmptyTableSlot();
            try {
              setWasmTableEntry(s, e);
            } catch (H) {
              if (!(H instanceof TypeError)) throw H;
              var a = convertJsFunctionToWasm(e, t);
              setWasmTableEntry(s, a);
            }
            return (functionsInTableMap.set(e, s), s);
          }, "addFunction"),
          updateGOT = gs((e, t) => {
            for (var r in e) {
              if (isInternalSym(r)) continue;
              var s = e[r];
              if (
                ((GOT[r] ||= new WebAssembly.Global({ value: "i32", mutable: !0 })), t || GOT[r].value == 0)
              )
                if (typeof s == "function") GOT[r].value = addFunction(s);
                else if (typeof s == "number") GOT[r].value = s;
                else err(`unhandled export type for '${r}': ${typeof s}`);
            }
          }, "updateGOT"),
          relocateExports = gs((e, t, r) => {
            var s = {};
            for (var a in e) {
              var H = e[a];
              if (typeof H == "object") H = H.value;
              if (typeof H == "number") H += t;
              s[a] = H;
            }
            return (updateGOT(s, r), s);
          }, "relocateExports"),
          isSymbolDefined = gs((e) => {
            var t = wasmImports[e];
            if (!t || t.stub) return !1;
            return !0;
          }, "isSymbolDefined"),
          dynCall = gs((e, t, r = []) => {
            var s = getWasmTableEntry(t)(...r);
            return s;
          }, "dynCall"),
          stackSave = gs(() => _emscripten_stack_get_current(), "stackSave"),
          stackRestore = gs((e) => __emscripten_stack_restore(e), "stackRestore"),
          createInvokeFunction = gs(
            (e) =>
              (t, ...r) => {
                var s = stackSave();
                try {
                  return dynCall(e, t, r);
                } catch (a) {
                  if ((stackRestore(s), a !== a + 0)) throw a;
                  if ((_setThrew(1, 0), e[0] == "j")) return 0n;
                }
              },
            "createInvokeFunction",
          ),
          resolveGlobalSymbol = gs((e, t = !1) => {
            var r;
            if (isSymbolDefined(e)) r = wasmImports[e];
            else if (e.startsWith("invoke_")) r = wasmImports[e] = createInvokeFunction(e.split("_")[1]);
            return { sym: r, name: e };
          }, "resolveGlobalSymbol"),
          onPostCtors = [],
          addOnPostCtor = gs((e) => onPostCtors.unshift(e), "addOnPostCtor"),
          UTF8ToString = gs((e, t) => (e ? UTF8ArrayToString(HEAPU8, e, t) : ""), "UTF8ToString"),
          loadWebAssemblyModule = gs((binary, flags, libName, localScope, handle) => {
            var metadata = getDylinkMetadata(binary);
            currentModuleWeakSymbols = metadata.weakImports;
            function loadModule() {
              var memAlign = Math.pow(2, metadata.memoryAlign),
                memoryBase = metadata.memorySize
                  ? alignMemory(getMemory(metadata.memorySize + memAlign), memAlign)
                  : 0,
                tableBase = metadata.tableSize ? wasmTable.length : 0;
              if (handle)
                ((HEAP8[handle + 8] = 1),
                  LE_HEAP_STORE_U32(((handle + 12) >> 2) * 4, memoryBase),
                  LE_HEAP_STORE_I32(((handle + 16) >> 2) * 4, metadata.memorySize),
                  LE_HEAP_STORE_U32(((handle + 20) >> 2) * 4, tableBase),
                  LE_HEAP_STORE_I32(((handle + 24) >> 2) * 4, metadata.tableSize));
              if (metadata.tableSize) wasmTable.grow(metadata.tableSize);
              var moduleExports;
              function resolveSymbol(e) {
                var t = resolveGlobalSymbol(e).sym;
                if (!t && localScope) t = localScope[e];
                if (!t) t = moduleExports[e];
                return t;
              }
              gs(resolveSymbol, "resolveSymbol");
              var proxyHandler = {
                  get(e, t) {
                    switch (t) {
                      case "__memory_base":
                        return memoryBase;
                      case "__table_base":
                        return tableBase;
                    }
                    if (t in wasmImports && !wasmImports[t].stub) {
                      var r = wasmImports[t];
                      return r;
                    }
                    if (!(t in e)) {
                      var s;
                      e[t] = (...a) => ((s ||= resolveSymbol(t)), s(...a));
                    }
                    return e[t];
                  },
                },
                proxy = new Proxy({}, proxyHandler),
                info = {
                  "GOT.mem": new Proxy({}, GOTHandler),
                  "GOT.func": new Proxy({}, GOTHandler),
                  env: proxy,
                  wasi_snapshot_preview1: proxy,
                };
              function postInstantiation(module, instance) {
                if (
                  (updateTableMap(tableBase, metadata.tableSize),
                  (moduleExports = relocateExports(instance.exports, memoryBase)),
                  !flags.allowUndefined)
                )
                  reportUndefinedSymbols();
                function addEmAsm(addr, body) {
                  var args = [],
                    arity = 0;
                  for (; arity < 16; arity++)
                    if (body.indexOf("$" + arity) != -1) args.push("$" + arity);
                    else break;
                  args = args.join(",");
                  var func = `(${args}) => { ${body} };`;
                  ASM_CONSTS[start] = eval(func);
                }
                if ((gs(addEmAsm, "addEmAsm"), "__start_em_asm" in moduleExports)) {
                  var start = moduleExports.__start_em_asm,
                    stop = moduleExports.__stop_em_asm;
                  while (start < stop) {
                    var jsString = UTF8ToString(start);
                    (addEmAsm(start, jsString), (start = HEAPU8.indexOf(0, start) + 1));
                  }
                }
                function addEmJs(name, cSig, body) {
                  var jsArgs = [];
                  if (((cSig = cSig.slice(1, -1)), cSig != "void")) {
                    cSig = cSig.split(",");
                    for (var i in cSig) {
                      var jsArg = cSig[i].split(" ").pop();
                      jsArgs.push(jsArg.replace("*", ""));
                    }
                  }
                  var func = `(${jsArgs}) => ${body};`;
                  moduleExports[name] = eval(func);
                }
                gs(addEmJs, "addEmJs");
                for (var name in moduleExports)
                  if (name.startsWith("__em_js__")) {
                    var start = moduleExports[name],
                      jsString = UTF8ToString(start),
                      parts = jsString.split("<::>");
                    (addEmJs(name.replace("__em_js__", ""), parts[0], parts[1]), delete moduleExports[name]);
                  }
                var applyRelocs = moduleExports.__wasm_apply_data_relocs;
                if (applyRelocs)
                  if (runtimeInitialized) applyRelocs();
                  else __RELOC_FUNCS__.push(applyRelocs);
                var init = moduleExports.__wasm_call_ctors;
                if (init)
                  if (runtimeInitialized) init();
                  else addOnPostCtor(init);
                return moduleExports;
              }
              if ((gs(postInstantiation, "postInstantiation"), flags.loadAsync)) {
                if (binary instanceof WebAssembly.Module) {
                  var instance = new WebAssembly.Instance(binary, info);
                  return Promise.resolve(postInstantiation(binary, instance));
                }
                return WebAssembly.instantiate(binary, info).then((e) =>
                  postInstantiation(e.module, e.instance),
                );
              }
              var module = binary instanceof WebAssembly.Module ? binary : new WebAssembly.Module(binary),
                instance = new WebAssembly.Instance(module, info);
              return postInstantiation(module, instance);
            }
            if ((gs(loadModule, "loadModule"), flags.loadAsync))
              return metadata.neededDynlibs
                .reduce((e, t) => e.then(() => loadDynamicLibrary(t, flags, localScope)), Promise.resolve())
                .then(loadModule);
            return (
              metadata.neededDynlibs.forEach((e) => loadDynamicLibrary(e, flags, localScope)),
              loadModule()
            );
          }, "loadWebAssemblyModule"),
          mergeLibSymbols = gs((e, t) => {
            for (var [r, s] of Object.entries(e)) {
              let a = gs((u) => {
                if (!isSymbolDefined(u)) wasmImports[u] = s;
              }, "setImport");
              a(r);
              let H = "__main_argc_argv";
              if (r == "main") a(H);
              if (r == H) a("main");
            }
          }, "mergeLibSymbols"),
          asyncLoad = gs(async (e) => {
            var t = await readAsync(e);
            return new Uint8Array(t);
          }, "asyncLoad");
        function loadDynamicLibrary(e, t = { global: !0, nodelete: !0 }, r, s) {
          var a = LDSO.loadedLibsByName[e];
          if (a) {
            if (!t.global) {
              if (r) Object.assign(r, a.exports);
            } else if (!a.global) ((a.global = !0), mergeLibSymbols(a.exports, e));
            if (t.nodelete && a.refcount !== 1 / 0) a.refcount = 1 / 0;
            if ((a.refcount++, s)) LDSO.loadedLibsByHandle[s] = a;
            return t.loadAsync ? Promise.resolve(!0) : !0;
          }
          ((a = newDSO(e, s, "loading")), (a.refcount = t.nodelete ? 1 / 0 : 1), (a.global = t.global));
          function H() {
            if (s) {
              var d = LE_HEAP_LOAD_U32(((s + 28) >> 2) * 4),
                _ = LE_HEAP_LOAD_U32(((s + 32) >> 2) * 4);
              if (d && _) {
                var L = HEAP8.slice(d, d + _);
                return t.loadAsync ? Promise.resolve(L) : L;
              }
            }
            var I = locateFile(e);
            if (t.loadAsync) return asyncLoad(I);
            if (!readBinary)
              throw Error(`${I}: file not found, and synchronous loading of external files is not available`);
            return readBinary(I);
          }
          gs(H, "loadLibData");
          function u() {
            if (t.loadAsync) return H().then((d) => loadWebAssemblyModule(d, t, e, r, s));
            return loadWebAssemblyModule(H(), t, e, r, s);
          }
          gs(u, "getExports");
          function f(d) {
            if (a.global) mergeLibSymbols(d, e);
            else if (r) Object.assign(r, d);
            a.exports = d;
          }
          if ((gs(f, "moduleLoaded"), t.loadAsync)) return u().then((d) => (f(d), !0));
          return (f(u()), !0);
        }
        gs(loadDynamicLibrary, "loadDynamicLibrary");
        var reportUndefinedSymbols = gs(() => {
            for (var [e, t] of Object.entries(GOT))
              if (t.value == 0) {
                var r = resolveGlobalSymbol(e, !0).sym;
                if (!r && !t.required) continue;
                if (typeof r == "function") t.value = addFunction(r, r.sig);
                else if (typeof r == "number") t.value = r;
                else throw Error(`bad export type for '${e}': ${typeof r}`);
              }
          }, "reportUndefinedSymbols"),
          loadDylibs = gs(() => {
            if (!dynamicLibraries.length) {
              reportUndefinedSymbols();
              return;
            }
            (addRunDependency("loadDylibs"),
              dynamicLibraries
                .reduce(
                  (e, t) =>
                    e.then(() =>
                      loadDynamicLibrary(t, { loadAsync: !0, global: !0, nodelete: !0, allowUndefined: !0 }),
                    ),
                  Promise.resolve(),
                )
                .then(() => {
                  (reportUndefinedSymbols(), removeRunDependency("loadDylibs"));
                }));
          }, "loadDylibs"),
          noExitRuntime = Module.noExitRuntime || !0;
        function setValue(e, t, r = "i8") {
          if (r.endsWith("*")) r = "*";
          switch (r) {
            case "i1":
              HEAP8[e] = t;
              break;
            case "i8":
              HEAP8[e] = t;
              break;
            case "i16":
              LE_HEAP_STORE_I16((e >> 1) * 2, t);
              break;
            case "i32":
              LE_HEAP_STORE_I32((e >> 2) * 4, t);
              break;
            case "i64":
              HEAP64[e >> 3] = BigInt(t);
              break;
            case "float":
              LE_HEAP_STORE_F32((e >> 2) * 4, t);
              break;
            case "double":
              LE_HEAP_STORE_F64((e >> 3) * 8, t);
              break;
            case "*":
              LE_HEAP_STORE_U32((e >> 2) * 4, t);
              break;
            default:
              abort(`invalid type for setValue: ${r}`);
          }
        }
        gs(setValue, "setValue");
        var ___memory_base = new WebAssembly.Global({ value: "i32", mutable: !1 }, 1024),
          ___stack_pointer = new WebAssembly.Global({ value: "i32", mutable: !0 }, 78224),
          ___table_base = new WebAssembly.Global({ value: "i32", mutable: !1 }, 1),
          __abort_js = gs(() => abort(""), "__abort_js");
        __abort_js.sig = "v";
        var _emscripten_get_now = gs(() => performance.now(), "_emscripten_get_now");
        _emscripten_get_now.sig = "d";
        var _emscripten_date_now = gs(() => Date.now(), "_emscripten_date_now");
        _emscripten_date_now.sig = "d";
        var nowIsMonotonic = 1,
          checkWasiClock = gs((e) => e >= 0 && e <= 3, "checkWasiClock"),
          INT53_MAX = 9007199254740992,
          INT53_MIN = -9007199254740992,
          bigintToI53Checked = gs(
            (e) => (e < INT53_MIN || e > INT53_MAX ? NaN : Number(e)),
            "bigintToI53Checked",
          );
        function _clock_time_get(e, t, r) {
          if (((t = bigintToI53Checked(t)), !checkWasiClock(e))) return 28;
          var s;
          if (e === 0) s = _emscripten_date_now();
          else if (nowIsMonotonic) s = _emscripten_get_now();
          else return 52;
          var a = Math.round(s * 1000 * 1000);
          return ((HEAP64[r >> 3] = BigInt(a)), 0);
        }
        (gs(_clock_time_get, "_clock_time_get"), (_clock_time_get.sig = "iijp"));
        var getHeapMax = gs(() => 2147483648, "getHeapMax"),
          growMemory = gs((e) => {
            var t = wasmMemory.buffer,
              r = ((e - t.byteLength + 65535) / 65536) | 0;
            try {
              return (wasmMemory.grow(r), updateMemoryViews(), 1);
            } catch (s) {}
          }, "growMemory"),
          _emscripten_resize_heap = gs((e) => {
            var t = HEAPU8.length;
            e >>>= 0;
            var r = getHeapMax();
            if (e > r) return !1;
            for (var s = 1; s <= 4; s *= 2) {
              var a = t * (1 + 0.2 / s);
              a = Math.min(a, e + 100663296);
              var H = Math.min(r, alignMemory(Math.max(e, a), 65536)),
                u = growMemory(H);
              if (u) return !0;
            }
            return !1;
          }, "_emscripten_resize_heap");
        _emscripten_resize_heap.sig = "ip";
        var _fd_close = gs((e) => 52, "_fd_close");
        _fd_close.sig = "ii";
        function _fd_seek(e, t, r, s) {
          return ((t = bigintToI53Checked(t)), 70);
        }
        (gs(_fd_seek, "_fd_seek"), (_fd_seek.sig = "iijip"));
        var printCharBuffers = [null, [], []],
          printChar = gs((e, t) => {
            var r = printCharBuffers[e];
            if (t === 0 || t === 10) ((e === 1 ? out : err)(UTF8ArrayToString(r)), (r.length = 0));
            else r.push(t);
          }, "printChar"),
          flush_NO_FILESYSTEM = gs(() => {
            if (printCharBuffers[1].length) printChar(1, 10);
            if (printCharBuffers[2].length) printChar(2, 10);
          }, "flush_NO_FILESYSTEM"),
          SYSCALLS = {
            varargs: void 0,
            getStr(e) {
              var t = UTF8ToString(e);
              return t;
            },
          },
          _fd_write = gs((e, t, r, s) => {
            var a = 0;
            for (var H = 0; H < r; H++) {
              var u = LE_HEAP_LOAD_U32((t >> 2) * 4),
                f = LE_HEAP_LOAD_U32(((t + 4) >> 2) * 4);
              t += 8;
              for (var d = 0; d < f; d++) printChar(e, HEAPU8[u + d]);
              a += f;
            }
            return (LE_HEAP_STORE_U32((s >> 2) * 4, a), 0);
          }, "_fd_write");
        _fd_write.sig = "iippp";
        function _tree_sitter_log_callback(e, t) {
          if (Module.currentLogCallback) {
            let r = UTF8ToString(t);
            Module.currentLogCallback(r, e !== 0);
          }
        }
        gs(_tree_sitter_log_callback, "_tree_sitter_log_callback");
        function _tree_sitter_parse_callback(e, t, r, s, a) {
          let u = Module.currentParseCallback(t, { row: r, column: s });
          if (typeof u === "string") (setValue(a, u.length, "i32"), stringToUTF16(u, e, 10240));
          else setValue(a, 0, "i32");
        }
        gs(_tree_sitter_parse_callback, "_tree_sitter_parse_callback");
        function _tree_sitter_progress_callback(e, t) {
          if (Module.currentProgressCallback)
            return Module.currentProgressCallback({ currentOffset: e, hasError: t });
          return !1;
        }
        gs(_tree_sitter_progress_callback, "_tree_sitter_progress_callback");
        function _tree_sitter_query_progress_callback(e) {
          if (Module.currentQueryProgressCallback)
            return Module.currentQueryProgressCallback({ currentOffset: e });
          return !1;
        }
        gs(_tree_sitter_query_progress_callback, "_tree_sitter_query_progress_callback");
        var runtimeKeepaliveCounter = 0,
          keepRuntimeAlive = gs(() => noExitRuntime || runtimeKeepaliveCounter > 0, "keepRuntimeAlive"),
          _proc_exit = gs((e) => {
            if (((EXITSTATUS = e), !keepRuntimeAlive())) (Module.onExit?.(e), (ABORT = !0));
            quit_(e, new ExitStatus(e));
          }, "_proc_exit");
        _proc_exit.sig = "vi";
        var exitJS = gs((e, t) => {
            ((EXITSTATUS = e), _proc_exit(e));
          }, "exitJS"),
          handleException = gs((e) => {
            if (e instanceof ExitStatus || e == "unwind") return EXITSTATUS;
            quit_(1, e);
          }, "handleException"),
          lengthBytesUTF8 = gs((e) => {
            var t = 0;
            for (var r = 0; r < e.length; ++r) {
              var s = e.charCodeAt(r);
              if (s <= 127) t++;
              else if (s <= 2047) t += 2;
              else if (s >= 55296 && s <= 57343) ((t += 4), ++r);
              else t += 3;
            }
            return t;
          }, "lengthBytesUTF8"),
          stringToUTF8Array = gs((e, t, r, s) => {
            if (!(s > 0)) return 0;
            var a = r,
              H = r + s - 1;
            for (var u = 0; u < e.length; ++u) {
              var f = e.charCodeAt(u);
              if (f >= 55296 && f <= 57343) {
                var d = e.charCodeAt(++u);
                f = (65536 + ((f & 1023) << 10)) | (d & 1023);
              }
              if (f <= 127) {
                if (r >= H) break;
                t[r++] = f;
              } else if (f <= 2047) {
                if (r + 1 >= H) break;
                ((t[r++] = 192 | (f >> 6)), (t[r++] = 128 | (f & 63)));
              } else if (f <= 65535) {
                if (r + 2 >= H) break;
                ((t[r++] = 224 | (f >> 12)), (t[r++] = 128 | ((f >> 6) & 63)), (t[r++] = 128 | (f & 63)));
              } else {
                if (r + 3 >= H) break;
                ((t[r++] = 240 | (f >> 18)),
                  (t[r++] = 128 | ((f >> 12) & 63)),
                  (t[r++] = 128 | ((f >> 6) & 63)),
                  (t[r++] = 128 | (f & 63)));
              }
            }
            return ((t[r] = 0), r - a);
          }, "stringToUTF8Array"),
          stringToUTF8 = gs((e, t, r) => stringToUTF8Array(e, HEAPU8, t, r), "stringToUTF8"),
          stackAlloc = gs((e) => __emscripten_stack_alloc(e), "stackAlloc"),
          stringToUTF8OnStack = gs((e) => {
            var t = lengthBytesUTF8(e) + 1,
              r = stackAlloc(t);
            return (stringToUTF8(e, r, t), r);
          }, "stringToUTF8OnStack"),
          AsciiToString = gs((e) => {
            var t = "";
            while (!0) {
              var r = HEAPU8[e++];
              if (!r) return t;
              t += String.fromCharCode(r);
            }
          }, "AsciiToString"),
          stringToUTF16 = gs((e, t, r) => {
            if (((r ??= 2147483647), r < 2)) return 0;
            r -= 2;
            var s = t,
              a = r < e.length * 2 ? r / 2 : e.length;
            for (var H = 0; H < a; ++H) {
              var u = e.charCodeAt(H);
              (LE_HEAP_STORE_I16((t >> 1) * 2, u), (t += 2));
            }
            return (LE_HEAP_STORE_I16((t >> 1) * 2, 0), t - s);
          }, "stringToUTF16"),
          wasmImports = {
            __heap_base: ___heap_base,
            __indirect_function_table: wasmTable,
            __memory_base: ___memory_base,
            __stack_pointer: ___stack_pointer,
            __table_base: ___table_base,
            _abort_js: __abort_js,
            clock_time_get: _clock_time_get,
            emscripten_resize_heap: _emscripten_resize_heap,
            fd_close: _fd_close,
            fd_seek: _fd_seek,
            fd_write: _fd_write,
            memory: wasmMemory,
            tree_sitter_log_callback: _tree_sitter_log_callback,
            tree_sitter_parse_callback: _tree_sitter_parse_callback,
            tree_sitter_progress_callback: _tree_sitter_progress_callback,
            tree_sitter_query_progress_callback: _tree_sitter_query_progress_callback,
          },
          wasmExports = await createWasm(),
          ___wasm_call_ctors = wasmExports.__wasm_call_ctors,
          _malloc = (Module._malloc = wasmExports.malloc),
          _calloc = (Module._calloc = wasmExports.calloc),
          _realloc = (Module._realloc = wasmExports.realloc),
          _free = (Module._free = wasmExports.free),
          _memcmp = (Module._memcmp = wasmExports.memcmp),
          _ts_language_symbol_count = (Module._ts_language_symbol_count =
            wasmExports.ts_language_symbol_count),
          _ts_language_state_count = (Module._ts_language_state_count = wasmExports.ts_language_state_count),
          _ts_language_version = (Module._ts_language_version = wasmExports.ts_language_version),
          _ts_language_abi_version = (Module._ts_language_abi_version = wasmExports.ts_language_abi_version),
          _ts_language_metadata = (Module._ts_language_metadata = wasmExports.ts_language_metadata),
          _ts_language_name = (Module._ts_language_name = wasmExports.ts_language_name),
          _ts_language_field_count = (Module._ts_language_field_count = wasmExports.ts_language_field_count),
          _ts_language_next_state = (Module._ts_language_next_state = wasmExports.ts_language_next_state),
          _ts_language_symbol_name = (Module._ts_language_symbol_name = wasmExports.ts_language_symbol_name),
          _ts_language_symbol_for_name = (Module._ts_language_symbol_for_name =
            wasmExports.ts_language_symbol_for_name),
          _strncmp = (Module._strncmp = wasmExports.strncmp),
          _ts_language_symbol_type = (Module._ts_language_symbol_type = wasmExports.ts_language_symbol_type),
          _ts_language_field_name_for_id = (Module._ts_language_field_name_for_id =
            wasmExports.ts_language_field_name_for_id),
          _ts_lookahead_iterator_new = (Module._ts_lookahead_iterator_new =
            wasmExports.ts_lookahead_iterator_new),
          _ts_lookahead_iterator_delete = (Module._ts_lookahead_iterator_delete =
            wasmExports.ts_lookahead_iterator_delete),
          _ts_lookahead_iterator_reset_state = (Module._ts_lookahead_iterator_reset_state =
            wasmExports.ts_lookahead_iterator_reset_state),
          _ts_lookahead_iterator_reset = (Module._ts_lookahead_iterator_reset =
            wasmExports.ts_lookahead_iterator_reset),
          _ts_lookahead_iterator_next = (Module._ts_lookahead_iterator_next =
            wasmExports.ts_lookahead_iterator_next),
          _ts_lookahead_iterator_current_symbol = (Module._ts_lookahead_iterator_current_symbol =
            wasmExports.ts_lookahead_iterator_current_symbol),
          _ts_parser_delete = (Module._ts_parser_delete = wasmExports.ts_parser_delete),
          _ts_parser_reset = (Module._ts_parser_reset = wasmExports.ts_parser_reset),
          _ts_parser_set_language = (Module._ts_parser_set_language = wasmExports.ts_parser_set_language),
          _ts_parser_timeout_micros = (Module._ts_parser_timeout_micros =
            wasmExports.ts_parser_timeout_micros),
          _ts_parser_set_timeout_micros = (Module._ts_parser_set_timeout_micros =
            wasmExports.ts_parser_set_timeout_micros),
          _ts_parser_set_included_ranges = (Module._ts_parser_set_included_ranges =
            wasmExports.ts_parser_set_included_ranges),
          _ts_query_new = (Module._ts_query_new = wasmExports.ts_query_new),
          _ts_query_delete = (Module._ts_query_delete = wasmExports.ts_query_delete),
          _iswspace = (Module._iswspace = wasmExports.iswspace),
          _iswalnum = (Module._iswalnum = wasmExports.iswalnum),
          _ts_query_pattern_count = (Module._ts_query_pattern_count = wasmExports.ts_query_pattern_count),
          _ts_query_capture_count = (Module._ts_query_capture_count = wasmExports.ts_query_capture_count),
          _ts_query_string_count = (Module._ts_query_string_count = wasmExports.ts_query_string_count),
          _ts_query_capture_name_for_id = (Module._ts_query_capture_name_for_id =
            wasmExports.ts_query_capture_name_for_id),
          _ts_query_capture_quantifier_for_id = (Module._ts_query_capture_quantifier_for_id =
            wasmExports.ts_query_capture_quantifier_for_id),
          _ts_query_string_value_for_id = (Module._ts_query_string_value_for_id =
            wasmExports.ts_query_string_value_for_id),
          _ts_query_predicates_for_pattern = (Module._ts_query_predicates_for_pattern =
            wasmExports.ts_query_predicates_for_pattern),
          _ts_query_start_byte_for_pattern = (Module._ts_query_start_byte_for_pattern =
            wasmExports.ts_query_start_byte_for_pattern),
          _ts_query_end_byte_for_pattern = (Module._ts_query_end_byte_for_pattern =
            wasmExports.ts_query_end_byte_for_pattern),
          _ts_query_is_pattern_rooted = (Module._ts_query_is_pattern_rooted =
            wasmExports.ts_query_is_pattern_rooted),
          _ts_query_is_pattern_non_local = (Module._ts_query_is_pattern_non_local =
            wasmExports.ts_query_is_pattern_non_local),
          _ts_query_is_pattern_guaranteed_at_step = (Module._ts_query_is_pattern_guaranteed_at_step =
            wasmExports.ts_query_is_pattern_guaranteed_at_step),
          _ts_query_disable_capture = (Module._ts_query_disable_capture =
            wasmExports.ts_query_disable_capture),
          _ts_query_disable_pattern = (Module._ts_query_disable_pattern =
            wasmExports.ts_query_disable_pattern),
          _ts_tree_copy = (Module._ts_tree_copy = wasmExports.ts_tree_copy),
          _ts_tree_delete = (Module._ts_tree_delete = wasmExports.ts_tree_delete),
          _ts_init = (Module._ts_init = wasmExports.ts_init),
          _ts_parser_new_wasm = (Module._ts_parser_new_wasm = wasmExports.ts_parser_new_wasm),
          _ts_parser_enable_logger_wasm = (Module._ts_parser_enable_logger_wasm =
            wasmExports.ts_parser_enable_logger_wasm),
          _ts_parser_parse_wasm = (Module._ts_parser_parse_wasm = wasmExports.ts_parser_parse_wasm),
          _ts_parser_included_ranges_wasm = (Module._ts_parser_included_ranges_wasm =
            wasmExports.ts_parser_included_ranges_wasm),
          _ts_language_type_is_named_wasm = (Module._ts_language_type_is_named_wasm =
            wasmExports.ts_language_type_is_named_wasm),
          _ts_language_type_is_visible_wasm = (Module._ts_language_type_is_visible_wasm =
            wasmExports.ts_language_type_is_visible_wasm),
          _ts_language_supertypes_wasm = (Module._ts_language_supertypes_wasm =
            wasmExports.ts_language_supertypes_wasm),
          _ts_language_subtypes_wasm = (Module._ts_language_subtypes_wasm =
            wasmExports.ts_language_subtypes_wasm),
          _ts_tree_root_node_wasm = (Module._ts_tree_root_node_wasm = wasmExports.ts_tree_root_node_wasm),
          _ts_tree_root_node_with_offset_wasm = (Module._ts_tree_root_node_with_offset_wasm =
            wasmExports.ts_tree_root_node_with_offset_wasm),
          _ts_tree_edit_wasm = (Module._ts_tree_edit_wasm = wasmExports.ts_tree_edit_wasm),
          _ts_tree_included_ranges_wasm = (Module._ts_tree_included_ranges_wasm =
            wasmExports.ts_tree_included_ranges_wasm),
          _ts_tree_get_changed_ranges_wasm = (Module._ts_tree_get_changed_ranges_wasm =
            wasmExports.ts_tree_get_changed_ranges_wasm),
          _ts_tree_cursor_new_wasm = (Module._ts_tree_cursor_new_wasm = wasmExports.ts_tree_cursor_new_wasm),
          _ts_tree_cursor_copy_wasm = (Module._ts_tree_cursor_copy_wasm =
            wasmExports.ts_tree_cursor_copy_wasm),
          _ts_tree_cursor_delete_wasm = (Module._ts_tree_cursor_delete_wasm =
            wasmExports.ts_tree_cursor_delete_wasm),
          _ts_tree_cursor_reset_wasm = (Module._ts_tree_cursor_reset_wasm =
            wasmExports.ts_tree_cursor_reset_wasm),
          _ts_tree_cursor_reset_to_wasm = (Module._ts_tree_cursor_reset_to_wasm =
            wasmExports.ts_tree_cursor_reset_to_wasm),
          _ts_tree_cursor_goto_first_child_wasm = (Module._ts_tree_cursor_goto_first_child_wasm =
            wasmExports.ts_tree_cursor_goto_first_child_wasm),
          _ts_tree_cursor_goto_last_child_wasm = (Module._ts_tree_cursor_goto_last_child_wasm =
            wasmExports.ts_tree_cursor_goto_last_child_wasm),
          _ts_tree_cursor_goto_first_child_for_index_wasm =
            (Module._ts_tree_cursor_goto_first_child_for_index_wasm =
              wasmExports.ts_tree_cursor_goto_first_child_for_index_wasm),
          _ts_tree_cursor_goto_first_child_for_position_wasm =
            (Module._ts_tree_cursor_goto_first_child_for_position_wasm =
              wasmExports.ts_tree_cursor_goto_first_child_for_position_wasm),
          _ts_tree_cursor_goto_next_sibling_wasm = (Module._ts_tree_cursor_goto_next_sibling_wasm =
            wasmExports.ts_tree_cursor_goto_next_sibling_wasm),
          _ts_tree_cursor_goto_previous_sibling_wasm = (Module._ts_tree_cursor_goto_previous_sibling_wasm =
            wasmExports.ts_tree_cursor_goto_previous_sibling_wasm),
          _ts_tree_cursor_goto_descendant_wasm = (Module._ts_tree_cursor_goto_descendant_wasm =
            wasmExports.ts_tree_cursor_goto_descendant_wasm),
          _ts_tree_cursor_goto_parent_wasm = (Module._ts_tree_cursor_goto_parent_wasm =
            wasmExports.ts_tree_cursor_goto_parent_wasm),
          _ts_tree_cursor_current_node_type_id_wasm = (Module._ts_tree_cursor_current_node_type_id_wasm =
            wasmExports.ts_tree_cursor_current_node_type_id_wasm),
          _ts_tree_cursor_current_node_state_id_wasm = (Module._ts_tree_cursor_current_node_state_id_wasm =
            wasmExports.ts_tree_cursor_current_node_state_id_wasm),
          _ts_tree_cursor_current_node_is_named_wasm = (Module._ts_tree_cursor_current_node_is_named_wasm =
            wasmExports.ts_tree_cursor_current_node_is_named_wasm),
          _ts_tree_cursor_current_node_is_missing_wasm =
            (Module._ts_tree_cursor_current_node_is_missing_wasm =
              wasmExports.ts_tree_cursor_current_node_is_missing_wasm),
          _ts_tree_cursor_current_node_id_wasm = (Module._ts_tree_cursor_current_node_id_wasm =
            wasmExports.ts_tree_cursor_current_node_id_wasm),
          _ts_tree_cursor_start_position_wasm = (Module._ts_tree_cursor_start_position_wasm =
            wasmExports.ts_tree_cursor_start_position_wasm),
          _ts_tree_cursor_end_position_wasm = (Module._ts_tree_cursor_end_position_wasm =
            wasmExports.ts_tree_cursor_end_position_wasm),
          _ts_tree_cursor_start_index_wasm = (Module._ts_tree_cursor_start_index_wasm =
            wasmExports.ts_tree_cursor_start_index_wasm),
          _ts_tree_cursor_end_index_wasm = (Module._ts_tree_cursor_end_index_wasm =
            wasmExports.ts_tree_cursor_end_index_wasm),
          _ts_tree_cursor_current_field_id_wasm = (Module._ts_tree_cursor_current_field_id_wasm =
            wasmExports.ts_tree_cursor_current_field_id_wasm),
          _ts_tree_cursor_current_depth_wasm = (Module._ts_tree_cursor_current_depth_wasm =
            wasmExports.ts_tree_cursor_current_depth_wasm),
          _ts_tree_cursor_current_descendant_index_wasm =
            (Module._ts_tree_cursor_current_descendant_index_wasm =
              wasmExports.ts_tree_cursor_current_descendant_index_wasm),
          _ts_tree_cursor_current_node_wasm = (Module._ts_tree_cursor_current_node_wasm =
            wasmExports.ts_tree_cursor_current_node_wasm),
          _ts_node_symbol_wasm = (Module._ts_node_symbol_wasm = wasmExports.ts_node_symbol_wasm),
          _ts_node_field_name_for_child_wasm = (Module._ts_node_field_name_for_child_wasm =
            wasmExports.ts_node_field_name_for_child_wasm),
          _ts_node_field_name_for_named_child_wasm = (Module._ts_node_field_name_for_named_child_wasm =
            wasmExports.ts_node_field_name_for_named_child_wasm),
          _ts_node_children_by_field_id_wasm = (Module._ts_node_children_by_field_id_wasm =
            wasmExports.ts_node_children_by_field_id_wasm),
          _ts_node_first_child_for_byte_wasm = (Module._ts_node_first_child_for_byte_wasm =
            wasmExports.ts_node_first_child_for_byte_wasm),
          _ts_node_first_named_child_for_byte_wasm = (Module._ts_node_first_named_child_for_byte_wasm =
            wasmExports.ts_node_first_named_child_for_byte_wasm),
          _ts_node_grammar_symbol_wasm = (Module._ts_node_grammar_symbol_wasm =
            wasmExports.ts_node_grammar_symbol_wasm),
          _ts_node_child_count_wasm = (Module._ts_node_child_count_wasm =
            wasmExports.ts_node_child_count_wasm),
          _ts_node_named_child_count_wasm = (Module._ts_node_named_child_count_wasm =
            wasmExports.ts_node_named_child_count_wasm),
          _ts_node_child_wasm = (Module._ts_node_child_wasm = wasmExports.ts_node_child_wasm),
          _ts_node_named_child_wasm = (Module._ts_node_named_child_wasm =
            wasmExports.ts_node_named_child_wasm),
          _ts_node_child_by_field_id_wasm = (Module._ts_node_child_by_field_id_wasm =
            wasmExports.ts_node_child_by_field_id_wasm),
          _ts_node_next_sibling_wasm = (Module._ts_node_next_sibling_wasm =
            wasmExports.ts_node_next_sibling_wasm),
          _ts_node_prev_sibling_wasm = (Module._ts_node_prev_sibling_wasm =
            wasmExports.ts_node_prev_sibling_wasm),
          _ts_node_next_named_sibling_wasm = (Module._ts_node_next_named_sibling_wasm =
            wasmExports.ts_node_next_named_sibling_wasm),
          _ts_node_prev_named_sibling_wasm = (Module._ts_node_prev_named_sibling_wasm =
            wasmExports.ts_node_prev_named_sibling_wasm),
          _ts_node_descendant_count_wasm = (Module._ts_node_descendant_count_wasm =
            wasmExports.ts_node_descendant_count_wasm),
          _ts_node_parent_wasm = (Module._ts_node_parent_wasm = wasmExports.ts_node_parent_wasm),
          _ts_node_child_with_descendant_wasm = (Module._ts_node_child_with_descendant_wasm =
            wasmExports.ts_node_child_with_descendant_wasm),
          _ts_node_descendant_for_index_wasm = (Module._ts_node_descendant_for_index_wasm =
            wasmExports.ts_node_descendant_for_index_wasm),
          _ts_node_named_descendant_for_index_wasm = (Module._ts_node_named_descendant_for_index_wasm =
            wasmExports.ts_node_named_descendant_for_index_wasm),
          _ts_node_descendant_for_position_wasm = (Module._ts_node_descendant_for_position_wasm =
            wasmExports.ts_node_descendant_for_position_wasm),
          _ts_node_named_descendant_for_position_wasm = (Module._ts_node_named_descendant_for_position_wasm =
            wasmExports.ts_node_named_descendant_for_position_wasm),
          _ts_node_start_point_wasm = (Module._ts_node_start_point_wasm =
            wasmExports.ts_node_start_point_wasm),
          _ts_node_end_point_wasm = (Module._ts_node_end_point_wasm = wasmExports.ts_node_end_point_wasm),
          _ts_node_start_index_wasm = (Module._ts_node_start_index_wasm =
            wasmExports.ts_node_start_index_wasm),
          _ts_node_end_index_wasm = (Module._ts_node_end_index_wasm = wasmExports.ts_node_end_index_wasm),
          _ts_node_to_string_wasm = (Module._ts_node_to_string_wasm = wasmExports.ts_node_to_string_wasm),
          _ts_node_children_wasm = (Module._ts_node_children_wasm = wasmExports.ts_node_children_wasm),
          _ts_node_named_children_wasm = (Module._ts_node_named_children_wasm =
            wasmExports.ts_node_named_children_wasm),
          _ts_node_descendants_of_type_wasm = (Module._ts_node_descendants_of_type_wasm =
            wasmExports.ts_node_descendants_of_type_wasm),
          _ts_node_is_named_wasm = (Module._ts_node_is_named_wasm = wasmExports.ts_node_is_named_wasm),
          _ts_node_has_changes_wasm = (Module._ts_node_has_changes_wasm =
            wasmExports.ts_node_has_changes_wasm),
          _ts_node_has_error_wasm = (Module._ts_node_has_error_wasm = wasmExports.ts_node_has_error_wasm),
          _ts_node_is_error_wasm = (Module._ts_node_is_error_wasm = wasmExports.ts_node_is_error_wasm),
          _ts_node_is_missing_wasm = (Module._ts_node_is_missing_wasm = wasmExports.ts_node_is_missing_wasm),
          _ts_node_is_extra_wasm = (Module._ts_node_is_extra_wasm = wasmExports.ts_node_is_extra_wasm),
          _ts_node_parse_state_wasm = (Module._ts_node_parse_state_wasm =
            wasmExports.ts_node_parse_state_wasm),
          _ts_node_next_parse_state_wasm = (Module._ts_node_next_parse_state_wasm =
            wasmExports.ts_node_next_parse_state_wasm),
          _ts_query_matches_wasm = (Module._ts_query_matches_wasm = wasmExports.ts_query_matches_wasm),
          _ts_query_captures_wasm = (Module._ts_query_captures_wasm = wasmExports.ts_query_captures_wasm),
          _memset = (Module._memset = wasmExports.memset),
          _memcpy = (Module._memcpy = wasmExports.memcpy),
          _memmove = (Module._memmove = wasmExports.memmove),
          _iswalpha = (Module._iswalpha = wasmExports.iswalpha),
          _iswblank = (Module._iswblank = wasmExports.iswblank),
          _iswdigit = (Module._iswdigit = wasmExports.iswdigit),
          _iswlower = (Module._iswlower = wasmExports.iswlower),
          _iswupper = (Module._iswupper = wasmExports.iswupper),
          _iswxdigit = (Module._iswxdigit = wasmExports.iswxdigit),
          _memchr = (Module._memchr = wasmExports.memchr),
          _strlen = (Module._strlen = wasmExports.strlen),
          _strcmp = (Module._strcmp = wasmExports.strcmp),
          _strncat = (Module._strncat = wasmExports.strncat),
          _strncpy = (Module._strncpy = wasmExports.strncpy),
          _towlower = (Module._towlower = wasmExports.towlower),
          _towupper = (Module._towupper = wasmExports.towupper),
          _setThrew = wasmExports.setThrew,
          __emscripten_stack_restore = wasmExports._emscripten_stack_restore,
          __emscripten_stack_alloc = wasmExports._emscripten_stack_alloc,
          _emscripten_stack_get_current = wasmExports.emscripten_stack_get_current,
          ___wasm_apply_data_relocs = wasmExports.__wasm_apply_data_relocs;
        ((Module.setValue = setValue),
          (Module.getValue = getValue),
          (Module.UTF8ToString = UTF8ToString),
          (Module.stringToUTF8 = stringToUTF8),
          (Module.lengthBytesUTF8 = lengthBytesUTF8),
          (Module.AsciiToString = AsciiToString),
          (Module.stringToUTF16 = stringToUTF16),
          (Module.loadWebAssemblyModule = loadWebAssemblyModule));
        function callMain(e = []) {
          var t = resolveGlobalSymbol("main").sym;
          if (!t) return;
          e.unshift(thisProgram);
          var r = e.length,
            s = stackAlloc((r + 1) * 4),
            a = s;
          (e.forEach((u) => {
            (LE_HEAP_STORE_U32((a >> 2) * 4, stringToUTF8OnStack(u)), (a += 4));
          }),
            LE_HEAP_STORE_U32((a >> 2) * 4, 0));
          try {
            var H = t(r, s);
            return (exitJS(H, !0), H);
          } catch (u) {
            return handleException(u);
          }
        }
        gs(callMain, "callMain");
        function run(e = arguments_) {
          if (runDependencies > 0) {
            dependenciesFulfilled = run;
            return;
          }
          if ((preRun(), runDependencies > 0)) {
            dependenciesFulfilled = run;
            return;
          }
          function t() {
            if (((Module.calledRun = !0), ABORT)) return;
            (initRuntime(), preMain(), readyPromiseResolve(Module), Module.onRuntimeInitialized?.());
            var r = Module.noInitialRun;
            if (!r) callMain(e);
            postRun();
          }
          if ((gs(t, "doRun"), Module.setStatus))
            (Module.setStatus("Running..."),
              setTimeout(() => {
                (setTimeout(() => Module.setStatus(""), 1), t());
              }, 1));
          else t();
        }
        if ((gs(run, "run"), Module.preInit)) {
          if (typeof Module.preInit == "function") Module.preInit = [Module.preInit];
          while (Module.preInit.length > 0) Module.preInit.pop()();
        }
        return (run(), (moduleRtn = readyPromise), moduleRtn);
      };
    })()),
    (r4a = t4a));
  gs(Q4i, "initializeBinding");
  gs(Y4i, "checkModule");
  n4a = class {
    static {
      gs(this, "Parser");
    }
    [0] = 0;
    [1] = 0;
    logCallback = null;
    language = null;
    static async init(e) {
      (B4i(await Q4i(e)),
        (CA = $n._ts_init()),
        (Wbr = $n.getValue(CA, "i32")),
        (Vbr = $n.getValue(CA + lu, "i32")));
    }
    constructor() {
      this.initialize();
    }
    initialize() {
      if (!Y4i()) throw Error("cannot construct a Parser before calling `init()`");
      ($n._ts_parser_new_wasm(), (this[0] = $n.getValue(CA, "i32")), (this[1] = $n.getValue(CA + lu, "i32")));
    }
    delete() {
      ($n._ts_parser_delete(this[0]), $n._free(this[1]), (this[0] = 0), (this[1] = 0));
    }
    setLanguage(e) {
      let t;
      if (!e) ((t = 0), (this.language = null));
      else if (e.constructor === Qze) {
        t = e[0];
        let r = $n._ts_language_version(t);
        if (r < Vbr || Wbr < r)
          throw Error(`Incompatible language version ${r}. Compatibility range ${Vbr} through ${Wbr}.`);
        this.language = e;
      } else throw Error("Argument must be a Language");
      return ($n._ts_parser_set_language(this[0], t), this);
    }
    parse(e, t, r) {
      if (typeof e === "string") $n.currentParseCallback = (f) => e.slice(f);
      else if (typeof e === "function") $n.currentParseCallback = e;
      else throw Error("Argument must be a string or a function");
      if (r?.progressCallback) $n.currentProgressCallback = r.progressCallback;
      else $n.currentProgressCallback = null;
      if (this.logCallback)
        (($n.currentLogCallback = this.logCallback), $n._ts_parser_enable_logger_wasm(this[0], 1));
      else (($n.currentLogCallback = null), $n._ts_parser_enable_logger_wasm(this[0], 0));
      let s = 0,
        a = 0;
      if (r?.includedRanges) {
        ((s = r.includedRanges.length), (a = $n._calloc(s, zze)));
        let f = a;
        for (let d = 0; d < s; d++) (R4i(f, r.includedRanges[d]), (f += zze));
      }
      let H = $n._ts_parser_parse_wasm(this[0], this[1], t ? t[0] : 0, a, s);
      if (!H)
        return (
          ($n.currentParseCallback = null),
          ($n.currentLogCallback = null),
          ($n.currentProgressCallback = null),
          null
        );
      if (!this.language) throw Error("Parser must have a language to parse");
      let u = new X7a(Nce, H, this.language, $n.currentParseCallback);
      return (
        ($n.currentParseCallback = null),
        ($n.currentLogCallback = null),
        ($n.currentProgressCallback = null),
        u
      );
    }
    reset() {
      $n._ts_parser_reset(this[0]);
    }
    getIncludedRanges() {
      $n._ts_parser_included_ranges_wasm(this[0]);
      let e = $n.getValue(CA, "i32"),
        t = $n.getValue(CA + lu, "i32"),
        r = Array(e);
      if (e > 0) {
        let s = t;
        for (let a = 0; a < e; a++) ((r[a] = ZPt(s)), (s += zze));
        $n._free(t);
      }
      return r;
    }
    getTimeoutMicros() {
      return $n._ts_parser_timeout_micros(this[0]);
    }
    setTimeoutMicros(e) {
      $n._ts_parser_set_timeout_micros(this[0], 0, e);
    }
    setLogger(e) {
      if (!e) this.logCallback = null;
      else if (typeof e !== "function") throw Error("Logger callback must be a function");
      else this.logCallback = e;
      return this;
    }
    getLogger() {
      return this.logCallback;
    }
  };
});