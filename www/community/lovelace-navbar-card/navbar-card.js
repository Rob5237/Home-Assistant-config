var __legacyDecorateClassTS = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1;i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __esm = (fn, res, err) => () => {
  if (fn)
    try {
      res = fn(fn = 0);
    } catch (e) {
      err = [e];
    }
  if (err)
    throw err[0];
  return res;
};

// node_modules/@lit/reactive-element/css-tag.js
class n {
  constructor(t, e, o) {
    if (this._$cssResult$ = true, o !== s)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (e && t === undefined) {
      const e = s !== undefined && s.length === 1;
      e && (t = o.get(s)), t === undefined && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), e && o.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
var t, e, s, o, r = (t) => new n(typeof t == "string" ? t : t + "", undefined, s), i = (t, ...e) => {
  const o = t.length === 1 ? t[0] : e.reduce((e, s, o) => e + ((t) => {
    if (t._$cssResult$ === true)
      return t.cssText;
    if (typeof t == "number")
      return t;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[o + 1], t[0]);
  return new n(o, t, s);
}, S = (s, o) => {
  if (e)
    s.adoptedStyleSheets = o.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else
    for (const e of o) {
      const o = document.createElement("style"), n = t.litNonce;
      n !== undefined && o.setAttribute("nonce", n), o.textContent = e.cssText, s.appendChild(o);
    }
}, c;
var init_css_tag = __esm(() => {
  t = globalThis;
  e = t.ShadowRoot && (t.ShadyCSS === undefined || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  s = Symbol();
  o = new WeakMap;
  c = e ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((t) => {
    let e = "";
    for (const s of t.cssRules)
      e += s.cssText;
    return r(e);
  })(t) : t;
});

// node_modules/@lit/reactive-element/reactive-element.js
var i2, e2, h, r2, o2, n2, a, c2, l, p, d = (t, s) => t, u, f = (t, s) => !i2(t, s), b, y;
var init_reactive_element = __esm(() => {
  init_css_tag();
  init_css_tag();
  ({ is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object);
  a = globalThis;
  c2 = a.trustedTypes;
  l = c2 ? c2.emptyScript : "";
  p = a.reactiveElementPolyfillSupport;
  u = { toAttribute(t, s) {
    switch (s) {
      case Boolean:
        t = t ? l : null;
        break;
      case Object:
      case Array:
        t = t == null ? t : JSON.stringify(t);
    }
    return t;
  }, fromAttribute(t, s) {
    let i = t;
    switch (s) {
      case Boolean:
        i = t !== null;
        break;
      case Number:
        i = t === null ? null : Number(t);
        break;
      case Object:
      case Array:
        try {
          i = JSON.parse(t);
        } catch (t) {
          i = null;
        }
    }
    return i;
  } };
  b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
  Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= new WeakMap;
  y = class y extends HTMLElement {
    static addInitializer(t) {
      this._$Ei(), (this.l ??= []).push(t);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t, s = b) {
      if (s.state && (s.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = true), this.elementProperties.set(t, s), !s.noAccessor) {
        const i = Symbol(), h = this.getPropertyDescriptor(t, i, s);
        h !== undefined && e2(this.prototype, t, h);
      }
    }
    static getPropertyDescriptor(t, s, i) {
      const { get: e, set: r } = h(this.prototype, t) ?? { get() {
        return this[s];
      }, set(t) {
        this[s] = t;
      } };
      return { get: e, set(s) {
        const h = e?.call(this);
        r?.call(this, s), this.requestUpdate(t, h, i);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t) {
      return this.elementProperties.get(t) ?? b;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties")))
        return;
      const t = n2(this);
      t.finalize(), t.l !== undefined && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized")))
        return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t = this.properties, s = [...r2(t), ...o2(t)];
        for (const i of s)
          this.createProperty(i, t[i]);
      }
      const t = this[Symbol.metadata];
      if (t !== null) {
        const s = litPropertyMetadata.get(t);
        if (s !== undefined)
          for (const [t, i] of s)
            this.elementProperties.set(t, i);
      }
      this._$Eh = new Map;
      for (const [t, s] of this.elementProperties) {
        const i = this._$Eu(t, s);
        i !== undefined && this._$Eh.set(i, t);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s) {
      const i = [];
      if (Array.isArray(s)) {
        const e = new Set(s.flat(1 / 0).reverse());
        for (const s of e)
          i.unshift(c(s));
      } else
        s !== undefined && i.push(c(s));
      return i;
    }
    static _$Eu(t, s) {
      const i = s.attribute;
      return i === false ? undefined : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : undefined;
    }
    constructor() {
      super(), this._$Ep = undefined, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = new Map, this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
    }
    addController(t) {
      (this._$EO ??= new Set).add(t), this.renderRoot !== undefined && this.isConnected && t.hostConnected?.();
    }
    removeController(t) {
      this._$EO?.delete(t);
    }
    _$E_() {
      const t = new Map, s = this.constructor.elementProperties;
      for (const i of s.keys())
        this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
      t.size > 0 && (this._$Ep = t);
    }
    createRenderRoot() {
      const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t, this.constructor.elementStyles), t;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t) => t.hostConnected?.());
    }
    enableUpdating(t) {}
    disconnectedCallback() {
      this._$EO?.forEach((t) => t.hostDisconnected?.());
    }
    attributeChangedCallback(t, s, i) {
      this._$AK(t, i);
    }
    _$ET(t, s) {
      const i = this.constructor.elementProperties.get(t), e = this.constructor._$Eu(t, i);
      if (e !== undefined && i.reflect === true) {
        const h = (i.converter?.toAttribute !== undefined ? i.converter : u).toAttribute(s, i.type);
        this._$Em = t, h == null ? this.removeAttribute(e) : this.setAttribute(e, h), this._$Em = null;
      }
    }
    _$AK(t, s) {
      const i = this.constructor, e = i._$Eh.get(t);
      if (e !== undefined && this._$Em !== e) {
        const t = i.getPropertyOptions(e), h = typeof t.converter == "function" ? { fromAttribute: t.converter } : t.converter?.fromAttribute !== undefined ? t.converter : u;
        this._$Em = e;
        const r = h.fromAttribute(s, t.type);
        this[e] = r ?? this._$Ej?.get(e) ?? r, this._$Em = null;
      }
    }
    requestUpdate(t, s, i) {
      if (t !== undefined) {
        const e = this.constructor, h = this[t];
        if (i ??= e.getPropertyOptions(t), !((i.hasChanged ?? f)(h, s) || i.useDefault && i.reflect && h === this._$Ej?.get(t) && !this.hasAttribute(e._$Eu(t, i))))
          return;
        this.C(t, s, i);
      }
      this.isUpdatePending === false && (this._$ES = this._$EP());
    }
    C(t, s, { useDefault: i, reflect: e, wrapped: h }, r) {
      i && !(this._$Ej ??= new Map).has(t) && (this._$Ej.set(t, r ?? s ?? this[t]), h !== true || r !== undefined) || (this._$AL.has(t) || (this.hasUpdated || i || (s = undefined), this._$AL.set(t, s)), e === true && this._$Em !== t && (this._$Eq ??= new Set).add(t));
    }
    async _$EP() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t) {
        Promise.reject(t);
      }
      const t = this.scheduleUpdate();
      return t != null && await t, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending)
        return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t, s] of this._$Ep)
            this[t] = s;
          this._$Ep = undefined;
        }
        const t = this.constructor.elementProperties;
        if (t.size > 0)
          for (const [s, i] of t) {
            const { wrapped: t } = i, e = this[s];
            t !== true || this._$AL.has(s) || e === undefined || this.C(s, undefined, i, e);
          }
      }
      let t = false;
      const s = this._$AL;
      try {
        t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach((t) => t.hostUpdate?.()), this.update(s)) : this._$EM();
      } catch (s) {
        throw t = false, this._$EM(), s;
      }
      t && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
      this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t)), this.updated(t);
    }
    _$EM() {
      this._$AL = new Map, this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t) {
      return true;
    }
    update(t) {
      this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
    }
    updated(t) {}
    firstUpdated(t) {}
  };
  y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = new Map, y[d("finalized")] = new Map, p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.1");
});

// node_modules/lit-html/lit-html.js
function P(t, i) {
  if (!a2(t) || !t.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return s2 !== undefined ? s2.createHTML(i) : i;
}

class N {
  constructor({ strings: t, _$litType$: s }, n) {
    let r;
    this.parts = [];
    let c = 0, a = 0;
    const u = t.length - 1, d = this.parts, [f, v] = V(t, s);
    if (this.el = N.createElement(f, n), C.currentNode = this.el.content, s === 2 || s === 3) {
      const t = this.el.content.firstChild;
      t.replaceWith(...t.childNodes);
    }
    for (;(r = C.nextNode()) !== null && d.length < u; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes())
          for (const t of r.getAttributeNames())
            if (t.endsWith(e3)) {
              const i = v[a++], s = r.getAttribute(t).split(h2), e = /([.?@])?(.*)/.exec(i);
              d.push({ type: 1, index: c, name: e[2], strings: s, ctor: e[1] === "." ? H : e[1] === "?" ? I : e[1] === "@" ? L : k }), r.removeAttribute(t);
            } else
              t.startsWith(h2) && (d.push({ type: 6, index: c }), r.removeAttribute(t));
        if ($.test(r.tagName)) {
          const t = r.textContent.split(h2), s = t.length - 1;
          if (s > 0) {
            r.textContent = i3 ? i3.emptyScript : "";
            for (let i = 0;i < s; i++)
              r.append(t[i], l2()), C.nextNode(), d.push({ type: 2, index: ++c });
            r.append(t[s], l2());
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === o3)
          d.push({ type: 2, index: c });
        else {
          let t = -1;
          for (;(t = r.data.indexOf(h2, t + 1)) !== -1; )
            d.push({ type: 7, index: c }), t += h2.length - 1;
        }
      c++;
    }
  }
  static createElement(t, i) {
    const s = r3.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S2(t, i, s = t, e) {
  if (i === T)
    return i;
  let h = e !== undefined ? s._$Co?.[e] : s._$Cl;
  const o = c3(i) ? undefined : i._$litDirective$;
  return h?.constructor !== o && (h?._$AO?.(false), o === undefined ? h = undefined : (h = new o(t), h._$AT(t, s, e)), e !== undefined ? (s._$Co ??= [])[e] = h : s._$Cl = h), h !== undefined && (i = S2(t, h._$AS(t, i.values), h, e)), i;
}

class M {
  constructor(t, i) {
    this._$AV = [], this._$AN = undefined, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: s } = this._$AD, e = (t?.creationScope ?? r3).importNode(i, true);
    C.currentNode = e;
    let h = C.nextNode(), o = 0, n = 0, l = s[0];
    for (;l !== undefined; ) {
      if (o === l.index) {
        let i;
        l.type === 2 ? i = new R(h, h.nextSibling, this, t) : l.type === 1 ? i = new l.ctor(h, l.name, l.strings, this, t) : l.type === 6 && (i = new z(h, this, t)), this._$AV.push(i), l = s[++n];
      }
      o !== l?.index && (h = C.nextNode(), o++);
    }
    return C.currentNode = r3, e;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV)
      s !== undefined && (s.strings !== undefined ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}

class R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, e) {
    this.type = 2, this._$AH = E, this._$AN = undefined, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cv = e?.isConnected ?? true;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== undefined && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = S2(this, t, i), c3(t) ? t === E || t == null || t === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : t !== this._$AH && t !== T && this._(t) : t._$litType$ !== undefined ? this.$(t) : t.nodeType !== undefined ? this.T(t) : u2(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== E && c3(this._$AH) ? this._$AA.nextSibling.data = t : this.T(r3.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, e = typeof s == "number" ? this._$AC(t) : (s.el === undefined && (s.el = N.createElement(P(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === e)
      this._$AH.p(i);
    else {
      const t = new M(e, this), s = t.u(this.options);
      t.p(i), this.T(s), this._$AH = t;
    }
  }
  _$AC(t) {
    let i = A.get(t.strings);
    return i === undefined && A.set(t.strings, i = new N(t)), i;
  }
  k(t) {
    a2(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, e = 0;
    for (const h of t)
      e === i.length ? i.push(s = new R(this.O(l2()), this.O(l2()), this, this.options)) : s = i[e], s._$AI(h), e++;
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(false, true, i);t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === undefined && (this._$Cv = t, this._$AP?.(t));
  }
}

class k {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, e, h) {
    this.type = 1, this._$AH = E, this._$AN = undefined, this.element = t, this.name = i, this._$AM = e, this.options = h, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String), this.strings = s) : this._$AH = E;
  }
  _$AI(t, i = this, s, e) {
    const h = this.strings;
    let o = false;
    if (h === undefined)
      t = S2(this, t, i, 0), o = !c3(t) || t !== this._$AH && t !== T, o && (this._$AH = t);
    else {
      const e = t;
      let n, r;
      for (t = h[0], n = 0;n < h.length - 1; n++)
        r = S2(this, e[s + n], i, n), r === T && (r = this._$AH[n]), o ||= !c3(r) || r !== this._$AH[n], r === E ? t = E : t !== E && (t += (r ?? "") + h[n + 1]), this._$AH[n] = r;
    }
    o && !e && this.j(t);
  }
  j(t) {
    t === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}

class z {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = undefined, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S2(this, t);
  }
}
var t2, i3, s2, e3 = "$lit$", h2, o3, n3, r3, l2 = () => r3.createComment(""), c3 = (t) => t === null || typeof t != "object" && typeof t != "function", a2, u2 = (t) => a2(t) || typeof t?.[Symbol.iterator] == "function", d2 = `[ 	
\f\r]`, f2, v, _, m, p2, g, $, y2 = (t) => (i, ...s) => ({ _$litType$: t, strings: i, values: s }), x, b2, w, T, E, A, C, V = (t, i) => {
  const s = t.length - 1, o = [];
  let r, l = i === 2 ? "<svg>" : i === 3 ? "<math>" : "", c = f2;
  for (let i = 0;i < s; i++) {
    const s = t[i];
    let a, u, d = -1, y = 0;
    for (;y < s.length && (c.lastIndex = y, u = c.exec(s), u !== null); )
      y = c.lastIndex, c === f2 ? u[1] === "!--" ? c = v : u[1] !== undefined ? c = _ : u[2] !== undefined ? ($.test(u[2]) && (r = RegExp("</" + u[2], "g")), c = m) : u[3] !== undefined && (c = m) : c === m ? u[0] === ">" ? (c = r ?? f2, d = -1) : u[1] === undefined ? d = -2 : (d = c.lastIndex - u[2].length, a = u[1], c = u[3] === undefined ? m : u[3] === '"' ? g : p2) : c === g || c === p2 ? c = m : c === v || c === _ ? c = f2 : (c = m, r = undefined);
    const x = c === m && t[i + 1].startsWith("/>") ? " " : "";
    l += c === f2 ? s + n3 : d >= 0 ? (o.push(a), s.slice(0, d) + e3 + s.slice(d) + h2 + x) : s + h2 + (d === -2 ? i : x);
  }
  return [P(t, l + (t[s] || "<?>") + (i === 2 ? "</svg>" : i === 3 ? "</math>" : "")), o];
}, H, I, L, Z, j, B = (t, i, s) => {
  const e = s?.renderBefore ?? i;
  let h = e._$litPart$;
  if (h === undefined) {
    const t = s?.renderBefore ?? null;
    e._$litPart$ = h = new R(i.insertBefore(l2(), t), t, undefined, s ?? {});
  }
  return h._$AI(t), h;
};
var init_lit_html = __esm(() => {
  t2 = globalThis;
  i3 = t2.trustedTypes;
  s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t) => t }) : undefined;
  h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  o3 = "?" + h2;
  n3 = `<${o3}>`;
  r3 = document;
  a2 = Array.isArray;
  f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  v = /-->/g;
  _ = />/g;
  m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  p2 = /'/g;
  g = /"/g;
  $ = /^(?:script|style|textarea|title)$/i;
  x = y2(1);
  b2 = y2(2);
  w = y2(3);
  T = Symbol.for("lit-noChange");
  E = Symbol.for("lit-nothing");
  A = new WeakMap;
  C = r3.createTreeWalker(r3, 129);
  H = class H extends k {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t) {
      this.element[this.name] = t === E ? undefined : t;
    }
  };
  I = class I extends k {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t) {
      this.element.toggleAttribute(this.name, !!t && t !== E);
    }
  };
  L = class L extends k {
    constructor(t, i, s, e, h) {
      super(t, i, s, e, h), this.type = 5;
    }
    _$AI(t, i = this) {
      if ((t = S2(this, t, i, 0) ?? E) === T)
        return;
      const s = this._$AH, e = t === E && s !== E || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, h = t !== E && (s === E || e);
      e && this.element.removeEventListener(this.name, this, s), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
      typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
    }
  };
  Z = { M: e3, P: h2, A: o3, C: 1, L: V, R: M, D: u2, V: S2, I: R, H: k, N: I, U: L, B: H, F: z };
  j = t2.litHtmlPolyfillSupport;
  j?.(N, R), (t2.litHtmlVersions ??= []).push("3.3.1");
});

// node_modules/lit-element/lit-element.js
var s3, i4, o4;
var init_lit_element = __esm(() => {
  init_reactive_element();
  init_lit_html();
  init_reactive_element();
  init_lit_html();
  s3 = globalThis;
  i4 = class i4 extends y {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = undefined;
    }
    createRenderRoot() {
      const t = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t.firstChild, t;
    }
    update(t) {
      const r = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = B(r, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return T;
    }
  };
  i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
  o4 = s3.litElementPolyfillSupport;
  o4?.({ LitElement: i4 });
  (s3.litElementVersions ??= []).push("4.2.1");
});

// node_modules/lit-html/is-server.js
var init_is_server = () => {};

// node_modules/lit/index.js
var init_lit = __esm(() => {
  init_reactive_element();
  init_lit_html();
  init_lit_element();
  init_is_server();
});

// node_modules/@lit/reactive-element/decorators/custom-element.js
var t3 = (t) => (e, o) => {
  o !== undefined ? o.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
var init_custom_element = () => {};

// node_modules/@lit/reactive-element/decorators/property.js
function n4(t) {
  return (e, o) => typeof o == "object" ? r4(t, e, o) : ((t, e, o) => {
    const r = e.hasOwnProperty(o);
    return e.constructor.createProperty(o, t), r ? Object.getOwnPropertyDescriptor(e, o) : undefined;
  })(t, e, o);
}
var o5, r4 = (t = o5, e, r) => {
  const { kind: n, metadata: i } = r;
  let s = globalThis.litPropertyMetadata.get(i);
  if (s === undefined && globalThis.litPropertyMetadata.set(i, s = new Map), n === "setter" && ((t = Object.create(t)).wrapped = true), s.set(r.name, t), n === "accessor") {
    const { name: o } = r;
    return { set(r) {
      const n = e.get.call(this);
      e.set.call(this, r), this.requestUpdate(o, n, t);
    }, init(e) {
      return e !== undefined && this.C(o, undefined, t, e), e;
    } };
  }
  if (n === "setter") {
    const { name: o } = r;
    return function(r) {
      const n = this[o];
      e.call(this, r), this.requestUpdate(o, n, t);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
var init_property = __esm(() => {
  init_reactive_element();
  o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
});

// node_modules/@lit/reactive-element/decorators/state.js
function r5(r) {
  return n4({ ...r, state: true, attribute: false });
}
var init_state = __esm(() => {
  init_property();
});

// node_modules/@lit/reactive-element/decorators/event-options.js
var init_event_options = () => {};

// node_modules/@lit/reactive-element/decorators/base.js
var init_base = () => {};

// node_modules/@lit/reactive-element/decorators/query.js
var init_query = __esm(() => {
  init_base();
});

// node_modules/@lit/reactive-element/decorators/query-all.js
var init_query_all = __esm(() => {
  init_base();
});

// node_modules/@lit/reactive-element/decorators/query-async.js
var init_query_async = __esm(() => {
  init_base();
});

// node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var init_query_assigned_elements = __esm(() => {
  init_base();
});

// node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
var init_query_assigned_nodes = __esm(() => {
  init_base();
});

// node_modules/lit/decorators.js
var init_decorators = __esm(() => {
  init_custom_element();
  init_property();
  init_state();
  init_event_options();
  init_query();
  init_query_all();
  init_query_async();
  init_query_assigned_elements();
  init_query_assigned_nodes();
});

// node_modules/custom-card-helpers/dist/index.m.js
var NumberFormat, TimeFormat, DOMAINS_TOGGLE, fireEvent = (node, type, detail, options) => {
  options = options || {};
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
}, SPECIAL_TYPES, navigate = (_node, path, replace = false) => {
  if (replace) {
    history.replaceState(null, "", path);
  } else {
    history.pushState(null, "", path);
  }
  fireEvent(window, "location-changed", {
    replace
  });
};
var init_index_m = __esm(() => {
  (function(NumberFormat) {
    NumberFormat["language"] = "language";
    NumberFormat["system"] = "system";
    NumberFormat["comma_decimal"] = "comma_decimal";
    NumberFormat["decimal_comma"] = "decimal_comma";
    NumberFormat["space_comma"] = "space_comma";
    NumberFormat["none"] = "none";
  })(NumberFormat || (NumberFormat = {}));
  (function(TimeFormat) {
    TimeFormat["language"] = "language";
    TimeFormat["system"] = "system";
    TimeFormat["am_pm"] = "12";
    TimeFormat["twenty_four"] = "24";
  })(TimeFormat || (TimeFormat = {}));
  DOMAINS_TOGGLE = new Set([
    "fan",
    "input_boolean",
    "light",
    "switch",
    "group",
    "automation"
  ]);
  SPECIAL_TYPES = new Set([
    "call-service",
    "divider",
    "section",
    "weblink",
    "cast",
    "select"
  ]);
});

// src/types/config.ts
var DesktopPosition, NavbarCustomActions, DEFAULT_NAVBAR_CONFIG, STUB_CONFIG;
var init_config = __esm(() => {
  ((DesktopPosition) => {
    DesktopPosition["top"] = "top";
    DesktopPosition["left"] = "left";
    DesktopPosition["bottom"] = "bottom";
    DesktopPosition["right"] = "right";
  })(DesktopPosition ||= {});
  ((NavbarCustomActions) => {
    NavbarCustomActions["openPopup"] = "open-popup";
    NavbarCustomActions["navigateBack"] = "navigate-back";
    NavbarCustomActions["showNotifications"] = "show-notifications";
    NavbarCustomActions["quickbar"] = "quickbar";
    NavbarCustomActions["openEditMode"] = "open-edit-mode";
    NavbarCustomActions["toggleMenu"] = "toggle-menu";
    NavbarCustomActions["logout"] = "logout";
    NavbarCustomActions["customJSAction"] = "custom-js-action";
  })(NavbarCustomActions ||= {});
  DEFAULT_NAVBAR_CONFIG = {
    desktop: {
      min_width: 768,
      mode: "floating",
      position: "bottom" /* bottom */,
      show_labels: false,
      show_popup_label_backgrounds: false
    },
    haptic: {
      double_tap_action: true,
      hold_action: true,
      tap_action: false,
      url: false
    },
    layout: {
      auto_padding: {
        desktop_px: 100,
        enabled: true,
        media_player_px: 100,
        mobile_px: 80
      },
      reflect_child_state: false
    },
    media_player: {
      album_cover_background: false,
      desktop_position: "bottom-center" /* bottomCenter */
    },
    mobile: {
      mode: "docked",
      safe_area: false,
      show_labels: false,
      show_popup_label_backgrounds: false
    },
    routes: [],
    template: undefined
  };
  STUB_CONFIG = {
    routes: [
      { icon: "mdi:home", label: "Home", url: window.location.pathname },
      {
        hold_action: {
          action: "navigate",
          navigation_path: "/config/devices/dashboard"
        },
        icon: "mdi:devices",
        label: "Devices",
        url: `${window.location.pathname}/devices`
      },
      {
        icon: "mdi:creation",
        label: "Automations",
        url: "/config/automation/dashboard"
      },
      { icon: "mdi:cog", label: "Settings", url: "/config/dashboard" },
      {
        icon: "mdi:dots-horizontal",
        label: "More",
        popup: [
          { icon: "mdi:cog", url: "/config/dashboard" },
          {
            icon: "mdi:hammer",
            url: "/developer-tools/yaml"
          },
          {
            icon: "mdi:power",
            tap_action: {
              action: "call-service",
              confirmation: {
                text: "Are you sure you want to restart Home Assistant?"
              },
              service: "homeassistant.restart",
              service_data: {}
            }
          }
        ],
        tap_action: {
          action: "open-popup" /* openPopup */
        }
      }
    ]
  };
});

// src/types/types.ts
function genericGetProperty(obj, key) {
  return key.split(".").reduce((o, k) => o?.[k], obj);
}
function genericSetProperty(obj, key, value, options = { allowDeletion: false }) {
  const paths = key.split(".");
  const finalKey = paths.pop();
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  let currentObj = copy;
  let originalObj = obj;
  for (let i = 0;i < paths.length; i++) {
    const p = paths[i];
    if (typeof originalObj[p] !== "object" || originalObj[p] === undefined || originalObj[p] === null) {
      const nextKey = paths[i + 1];
      const isArrayIndex = nextKey !== undefined && !Number.isNaN(Number(nextKey));
      currentObj[p] = isArrayIndex ? [] : {};
    } else {
      currentObj[p] = Array.isArray(originalObj[p]) ? [...originalObj[p]] : { ...originalObj[p] };
    }
    currentObj = currentObj[p];
    originalObj = originalObj[p] ?? {};
  }
  if ((value === null || value === undefined) && options.allowDeletion) {
    delete currentObj[finalKey];
  } else {
    currentObj[finalKey] = value;
  }
  return copy;
}

// src/types/index.ts
var init_types = __esm(() => {
  init_config();
});

// src/utils/base-types/object.ts
function deepMergeKeepArrays(item, newData) {
  if (Array.isArray(newData)) {
    return newData;
  } else if (newData !== null && typeof newData === "object" && item !== null && typeof item === "object") {
    const result = { ...item };
    for (const key in newData) {
      if (newData[key] === null) {
        delete result[key];
      } else if (newData[key] !== undefined) {
        result[key] = deepMergeKeepArrays(item[key], newData[key]);
      }
    }
    return result;
  } else if (newData !== undefined) {
    return newData;
  }
  return item;
}

// src/utils/base-types/string.ts
var mapStringToEnum = (enumType, value) => {
  if (Object.values(enumType).includes(value)) {
    return value;
  }
  return;
}, generateHash = (str) => {
  let hash = 0;
  for (let i = 0;i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
  }
  return hash.toString();
};

// src/utils/dom.ts
function fireDOMEvent(node, type, data, EventConstructor) {
  const { options, detailOverride } = data ?? {};
  const eventConstructor = EventConstructor || Event;
  const event = new eventConstructor(type, options);
  if (detailOverride !== undefined) {
    event.detail = detailOverride;
  }
  node.dispatchEvent(event);
  return event;
}
var DEFAULT_STYLES_ID = "navbar-card-default-styles", USER_STYLES_ID = "navbar-card-user-styles", getNavbarTemplates = () => {
  const lovelace = getLovelace();
  return lovelace?.config["navbar-templates"] ?? null;
}, getLovelace = () => {
  const lovelacePanel = document?.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-drawer partial-panel-resolver ha-panel-lovelace");
  return lovelacePanel?.lovelace;
}, forceResetRipple = (target) => {
  const rippleElements = target?.querySelectorAll("ha-ripple");
  rippleElements?.forEach((ripple) => {
    setTimeout(() => {
      ripple.hovered = false;
      ripple.pressed = false;
    }, 10);
  });
}, findHuiRoot = () => {
  return window.document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-panel-lovelace")?.shadowRoot?.querySelector("hui-root");
}, forceOpenEditMode = () => {
  const huiRoot = findHuiRoot();
  if (!huiRoot?.shadowRoot)
    return;
  huiRoot.lovelace.setEditMode(true);
}, createStyleElement = (root, id, styles) => {
  const rootEl = root.shadowRoot;
  const styleEl = document.createElement("style");
  styleEl.id = id;
  styleEl.textContent = styles.cssText;
  const existing = rootEl?.querySelector(`#${id}`);
  if (existing)
    existing.replaceWith(styleEl);
  else
    rootEl?.appendChild(styleEl);
}, injectStyles = (root, defaultStyles, userStyles) => {
  createStyleElement(root, DEFAULT_STYLES_ID, defaultStyles);
  createStyleElement(root, USER_STYLES_ID, userStyles);
}, preventEventDefault = (e) => {
  e.preventDefault();
  e.stopPropagation();
}, scrollToTop = () => {
  window.scrollTo({
    behavior: "smooth",
    left: 0,
    top: 0
  });
}, matchesCurrentNavigationPath = (url) => {
  const pathname = window.location.pathname;
  if (!url)
    return false;
  if (url.startsWith("/")) {
    return pathname === url;
  }
  const normalizedPathname = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const normalizedUrl = url.endsWith("/") ? url.slice(0, -1) : url;
  return normalizedPathname.endsWith(`/${normalizedUrl}`);
}, conditionallyRender = (condition, renderContent) => {
  if (condition) {
    return renderContent();
  }
  return x`<div class="loader-container">
    <span class="loader"></span>
  </div>`;
}, supportsHAComponent = (component) => {
  return customElements?.get(component) != null;
};
var init_dom = __esm(() => {
  init_lit();
});

// src/utils/dashboard-padding.ts
var DASHBOARD_PADDING_STYLE_ID = "navbar-card-forced-padding-styles", sharedCardPaddings, setDashboardPadding = (card, config, mediaPlayerPosition) => {
  const padding = getCardPadding(config, mediaPlayerPosition);
  if (JSON.stringify(padding) === JSON.stringify(sharedCardPaddings.get(card))) {
    return;
  }
  if (padding) {
    sharedCardPaddings.set(card, padding);
  } else {
    sharedCardPaddings.delete(card);
  }
  if (!updateStyles()) {
    console.warn("[navbar-card] Could not find <hui-root>. Custom padding styles will not be applied.");
  }
}, removeDashboardPadding = (card) => {
  if (sharedCardPaddings.delete(card))
    updateStyles();
}, getCardPadding = (config, mediaPlayerPosition) => {
  const autoPadding = {
    ...DEFAULT_NAVBAR_CONFIG.layout?.auto_padding,
    ...config?.layout?.auto_padding
  };
  if (!autoPadding.enabled)
    return;
  const { desktop_px = 0, mobile_px = 0, media_player_px = 0 } = autoPadding;
  const padding = {
    bottom: 0,
    left: 0,
    minWidth: config?.desktop?.min_width ?? 768,
    mobile: mobile_px,
    right: 0,
    top: 0
  };
  padding[config?.desktop?.position ?? DEFAULT_NAVBAR_CONFIG.desktop.position] += desktop_px;
  if (mediaPlayerPosition) {
    padding[mediaPlayerPosition.startsWith("top") ? "top" : "bottom"] += media_player_px;
    padding.mobile += media_player_px;
  }
  return padding;
}, updateStyles = () => {
  const root = findHuiRoot()?.shadowRoot;
  if (!root)
    return false;
  const paddings = [...sharedCardPaddings.values()];
  const largest = (side) => Math.max(0, ...paddings.map((padding) => padding[side]));
  const minWidth = paddings[0]?.minWidth ?? 768;
  const desktop = `(min-width: ${minWidth}px)`;
  const mobile = `(max-width: ${minWidth - 1}px)`;
  writeStyle(root, [
    spacerCss(desktop, "before", largest("top")),
    spacerCss(desktop, "after", largest("bottom")),
    sidePaddingCss(desktop, "left", largest("left")),
    sidePaddingCss(desktop, "right", largest("right")),
    spacerCss(mobile, "after", largest("mobile"))
  ].join(""));
  const sectionsView = root.querySelector("hui-sections-view")?.shadowRoot;
  if (sectionsView) {
    writeStyle(sectionsView, [
      stickyFooterCss(desktop, largest("bottom"), true),
      stickyFooterCss(mobile, largest("mobile"))
    ].join(""));
  }
  return true;
}, writeStyle = (root, cssText) => {
  let styleEl = root.querySelector(`#${DASHBOARD_PADDING_STYLE_ID}`);
  if (!cssText) {
    styleEl?.remove();
    return;
  }
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = DASHBOARD_PADDING_STYLE_ID;
    root.appendChild(styleEl);
  }
  if (styleEl.textContent !== cssText) {
    styleEl.textContent = cssText;
  }
}, spacerCss = (media, pseudo, px) => px > 0 ? `@media ${media} {
  :not(.edit-mode) > hui-view:${pseudo} {
    content: "";
    display: block;
    height: ${px}px;
    width: 100%;
  }
}
` : "", stickyFooterCss = (media, px, keepGap = false) => px > 0 ? `@media ${media} {
  hui-view-footer[sticky] {
    bottom: ${keepGap ? `calc(var(--row-gap) + ${px}px)` : `${px}px`};
  }
}
` : "", sidePaddingCss = (media, side, px) => px > 0 ? `@media ${media} {
  :not(.edit-mode) > #view {
    padding-${side}: ${px}px !important;
    --navbar-view-padding-${side}: ${px}px;
  }
}
` : "";
var init_dashboard_padding = __esm(() => {
  init_config();
  init_dom();
  sharedCardPaddings = new Map;
});

// src/utils/docs-links.ts
var BASE_URL = "https://joseluis9595.github.io/lovelace-navbar-card/docs", DOCS_LINKS, PAGES, getOptionDocsLink = (configKey) => {
  if (configKey === "styles")
    return DOCS_LINKS.styles;
  if (configKey === "template")
    return DOCS_LINKS.template;
  const key = configKey.replace(/\.\d+/g, "").replace("routes.popup.badge.", "routes.badge.");
  const [page, ...path] = key.split(".");
  if (!(PAGES[page] && path.length) || key.includes("_action.")) {
    return;
  }
  const option = path.pop();
  const sections = path.map((section) => `${section.replace(/_/g, "-")}-`);
  return `${BASE_URL}/${PAGES[page]}#${sections.join("")}${option}`;
};
var init_docs_links = __esm(() => {
  DOCS_LINKS = {
    jsTemplate: `${BASE_URL}/advanced/js-templates`,
    styles: `${BASE_URL}/configuration/styles`,
    template: `${BASE_URL}/advanced/navbar-templates`
  };
  PAGES = {
    desktop: "configuration/desktop",
    haptic: "configuration/haptic",
    layout: "configuration/layout",
    media_player: "configuration/media-player",
    mobile: "configuration/mobile",
    routes: "configuration/routes"
  };
});

// src/utils/haptic.ts
var shouldTriggerHaptic = (context, actionType, isNavigation = false) => {
  const hapticConfig = context.config?.haptic ?? DEFAULT_NAVBAR_CONFIG.haptic;
  if (typeof hapticConfig === "boolean") {
    return hapticConfig;
  }
  if (isNavigation) {
    return hapticConfig.url ?? DEFAULT_NAVBAR_CONFIG.haptic.url;
  }
  switch (actionType) {
    case "tap":
      return hapticConfig.tap_action ?? DEFAULT_NAVBAR_CONFIG.haptic.tap_action;
    case "hold":
      return hapticConfig.hold_action ?? DEFAULT_NAVBAR_CONFIG.haptic.hold_action;
    case "double_tap":
      return hapticConfig.double_tap_action ?? DEFAULT_NAVBAR_CONFIG.haptic.double_tap_action;
    default:
      return false;
  }
}, triggerHaptic = (context, actionType, isNavigation = false) => {
  if (shouldTriggerHaptic(context, actionType, isNavigation)) {
    fireDOMEvent(window, "haptic", { detailOverride: "selection" });
  }
};
var init_haptic = __esm(() => {
  init_types();
  init_utils();
});

// src/utils/shared-templates.ts
var SHARED_TEMPLATES_DASHBOARD = "navbar-card-templates", sharedTemplates = null, loading = null, listeners, getSharedTemplates = () => sharedTemplates, getAvailableTemplates = () => ({
  ...sharedTemplates,
  ...getNavbarTemplates()
}), onSharedTemplatesChange = (listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}, setSharedTemplates = (templates) => {
  sharedTemplates = templates;
  for (const listener of listeners)
    listener();
}, fetchDashboardConfig = async (hass) => {
  try {
    return await hass.callWS({
      type: "lovelace/config",
      url_path: SHARED_TEMPLATES_DASHBOARD
    });
  } catch (error) {
    if (error.code === "config_not_found")
      return null;
    throw error;
  }
}, reload = async (hass) => {
  try {
    const config = await fetchDashboardConfig(hass);
    setSharedTemplates(config?.["navbar-templates"] ?? {});
  } catch {
    setSharedTemplates(sharedTemplates ?? {});
  }
  return sharedTemplates ?? {};
}, loadSharedTemplates = (hass) => {
  if (!loading) {
    loading = reload(hass);
    hass.connection.subscribeEvents((event) => {
      if (event.data?.url_path === SHARED_TEMPLATES_DASHBOARD)
        reload(hass);
    }, "lovelace_updated").catch(() => {});
  }
  return loading;
}, createDashboard = async (hass) => {
  const dashboards = await hass.callWS({
    type: "lovelace/dashboards/list"
  });
  if (!dashboards.some((d) => d.url_path === SHARED_TEMPLATES_DASHBOARD)) {
    await hass.callWS({
      icon: "mdi:dock-bottom",
      require_admin: false,
      show_in_sidebar: false,
      title: "Navbar Card templates [don't delete]",
      type: "lovelace/dashboards/create",
      url_path: SHARED_TEMPLATES_DASHBOARD
    });
  }
  return {
    views: [
      {
        cards: [
          {
            content: "This dashboard stores the **Navbar Card** templates shared by all your dashboards. Edit them from the Navbar Card visual editor, and don't delete this dashboard.",
            type: "markdown"
          }
        ],
        title: "Navbar Card templates"
      }
    ]
  };
}, saveSharedTemplate = async (hass, name, config) => {
  const dashboard = await fetchDashboardConfig(hass) ?? await createDashboard(hass);
  const templates = { ...dashboard["navbar-templates"] };
  if (config) {
    templates[name] = config;
  } else {
    delete templates[name];
  }
  await hass.callWS({
    config: { ...dashboard, "navbar-templates": templates },
    type: "lovelace/config/save",
    url_path: SHARED_TEMPLATES_DASHBOARD
  });
  setSharedTemplates(templates);
}, moveDashboardTemplateToShared = async (hass, name) => {
  const lovelace = getLovelace();
  const dashboardTemplates = lovelace?.config["navbar-templates"];
  const template = dashboardTemplates?.[name];
  if (!(lovelace && template)) {
    throw new Error(`Template "${name}" not found in this dashboard`);
  }
  if (sharedTemplates?.[name]) {
    throw new Error(`A shared template named "${name}" already exists`);
  }
  await saveSharedTemplate(hass, name, template);
  const { [name]: _moved, ...remaining } = dashboardTemplates;
  const { "navbar-templates": _templates, ...dashboard } = lovelace.config;
  await lovelace.saveConfig(Object.keys(remaining).length > 0 ? { ...dashboard, "navbar-templates": remaining } : dashboard);
};
var init_shared_templates = __esm(() => {
  init_dom();
  listeners = new Set;
});

// src/utils/template.ts
var templateFunctionCache, isTemplate = (value) => {
  if (typeof value !== "string")
    return false;
  const trimmed = value.trim();
  return trimmed.startsWith("[[[") && trimmed.endsWith("]]]");
}, cleanTemplate = (value) => {
  if (!isTemplate(value))
    return null;
  return value.trim().slice(3, -3).trim();
}, wrapTemplate = (value) => {
  return isTemplate(value) ? value : `[[[${value}]]]`;
}, processTemplate = (hass, navbar, template, options) => {
  if (template == null || !isTemplate(template)) {
    return template;
  }
  try {
    const clean = cleanTemplate(template);
    if (clean === null) {
      console.error(`[navbar-card] Invalid template format: ${template}`);
      if (options?.returnNullIfInvalid)
        return null;
      return template;
    }
    const hashed = generateHash(clean);
    let func = templateFunctionCache.get(hashed);
    if (!func) {
      func = new Function("states", "user", "hass", "navbar", clean);
      templateFunctionCache.set(hashed, func);
    }
    const result = func(hass.states, hass.user, hass, {
      isDesktop: navbar?.isDesktop ?? false
    });
    if (result === undefined) {
      if (!options?.disableEmptyReturnCheck) {
        console.error(`[navbar-card] Template did not return a value: ${template}`);
      }
      if (options?.returnNullIfInvalid)
        return null;
      return template;
    }
    return result;
  } catch (err) {
    console.error(`[navbar-card] Error evaluating template: ${err}`);
    if (options?.returnNullIfInvalid)
      return null;
    return template;
  }
}, processBadgeTemplate = (hass, template) => {
  if (!(hass && template))
    return false;
  try {
    const func = new Function("states", `return ${template}`);
    return Boolean(func(hass.states));
  } catch (err) {
    console.error("[navbar-card] Error evaluating badge template:", err);
    return false;
  }
};
var init_template = __esm(() => {
  init_utils();
  templateFunctionCache = new Map;
});

// src/utils/index.ts
var init_utils = __esm(() => {
  init_dashboard_padding();
  init_docs_links();
  init_dom();
  init_haptic();
  init_shared_templates();
  init_template();
});

// src/lib/action-handler.ts
var ACTIONS_WITH_CUSTOM_ENTITY, QUICKBAR_MODES, openQuickbarViaKeyboard = (action) => {
  const isMac = navigator.platform.toUpperCase().includes("MAC");
  let key;
  if (action.mode) {
    switch (action.mode) {
      case "devices":
        key = "d";
        break;
      case "entities":
        key = "e";
        break;
      case "commands":
      default:
        key = "c";
        break;
    }
  } else {
    key = "k";
  }
  document.dispatchEvent(new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    key,
    ...action.mode ? {} : isMac ? { metaKey: true } : { ctrlKey: true }
  }));
}, openQuickbar = (action) => {
  const haRoot = document.querySelector("home-assistant");
  if (typeof haRoot?._showQuickBar !== "function") {
    openQuickbarViaKeyboard(action);
    return;
  }
  const syntheticEvent = {
    composedPath: () => [document.body],
    defaultPrevented: false,
    preventDefault: () => {
      return;
    }
  };
  haRoot._showQuickBar(syntheticEvent, action.mode ? QUICKBAR_MODES[action.mode] : undefined);
}, executeAction = (params) => {
  const { context, target, action, actionType, data } = params;
  const { route, popupItem } = data;
  forceResetRipple(target);
  if (action?.action !== "open-popup" /* openPopup */) {
    if (route != null) {
      route.popup.close();
    } else if (popupItem != null) {
      popupItem.closeParentPopup();
    }
  }
  switch (action?.action) {
    case "open-popup" /* openPopup */: {
      if (!route)
        return;
      const popupItems = route.popup.items;
      if (!popupItems) {
        console.error(`[navbar-card] No popup items found for route: ${route.label}`);
      } else {
        triggerHaptic(context, actionType);
        route.popup.open(target);
      }
      break;
    }
    case "toggle-menu" /* toggleMenu */:
      triggerHaptic(context, actionType);
      fireDOMEvent(context, "hass-toggle-menu", {
        options: {
          bubbles: true,
          composed: true
        }
      });
      break;
    case "quickbar" /* quickbar */:
      triggerHaptic(context, actionType);
      openQuickbar(action);
      break;
    case "show-notifications" /* showNotifications */:
      triggerHaptic(context, actionType);
      fireDOMEvent(context, "hass-show-notifications", {
        options: {
          bubbles: true,
          composed: true
        }
      });
      break;
    case "navigate-back" /* navigateBack */:
      triggerHaptic(context, actionType, true);
      window.history.back();
      break;
    case "open-edit-mode" /* openEditMode */:
      triggerHaptic(context, actionType);
      forceOpenEditMode();
      break;
    case "custom-js-action" /* customJSAction */:
      triggerHaptic(context, actionType);
      processTemplate(context._hass, context, action.code, {
        disableEmptyReturnCheck: true
      });
      break;
    case "logout" /* logout */:
      triggerHaptic(context, actionType);
      context._hass.auth.revoke();
      break;
    default:
      if (action != null) {
        triggerHaptic(context, actionType);
        if (action.action === "navigate" && matchesCurrentNavigationPath(action.navigation_path)) {
          scrollToTop();
          return;
        }
        const extractedEntity = ACTIONS_WITH_CUSTOM_ENTITY.includes(action.action) ? action.entity ?? action.entity_id : undefined;
        setTimeout(() => {
          fireDOMEvent(context, "hass-action", {
            detailOverride: {
              action: actionType,
              config: {
                [`${actionType}_action`]: action,
                entity: extractedEntity
              }
            },
            options: { bubbles: true, composed: true }
          });
        }, 10);
      } else if (actionType === "tap" && (route?.url || popupItem?.url)) {
        triggerHaptic(context, actionType, true);
        const destinationUrl = route?.url ?? popupItem?.url ?? "";
        if (matchesCurrentNavigationPath(destinationUrl)) {
          scrollToTop();
          return;
        }
        navigate(context, destinationUrl);
      }
      break;
  }
};
var init_action_handler = __esm(() => {
  init_index_m();
  init_types();
  init_utils();
  ACTIONS_WITH_CUSTOM_ENTITY = ["more-info", "toggle"];
  QUICKBAR_MODES = {
    commands: "command",
    devices: "device",
    entities: "entity"
  };
});

// src/styles/editor.ts
var EDITOR_STYLES, DRAGGABLE_ITEM_STYLES;
var init_editor = __esm(() => {
  init_lit();
  EDITOR_STYLES = i`
  .navbar-editor {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .navbar-editor ha-input {
    width: 100%;
  }

  .navbar-editor ha-button {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .navbar-editor .navbar-template-toggle-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
    padding: 0px !important;
    border-radius: 99px;
    font-size: 0.85em;
    font-weight: 600;
    border: 0px;
    padding: 4px 8px !important;
    cursor: pointer;
  }

  .reset-overrides-button {
    white-space: nowrap;
  }

  .template-editing-actions {
    display: flex;
    gap: 8px;
    margin-bottom: 1em;
  }

  .editor-section {
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 12px;
  }

  .editor-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }

  .editor-row-item {
    min-width: 0;
  }

  .editor-label {
    font-weight: 500;
  }

  .routes-container {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
  }

  ha-expansion-panel h4[slot='header'],
  ha-expansion-panel h5[slot='header'],
  ha-expansion-panel h6[slot='header'] {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.7em;
    padding: 0.2em 0.5em 0.2em 0;
    min-height: 40px;
    margin: 0px !important;
    margin-left: 1em;
  }

  ha-expansion-panel h4[slot='header'] .expansion-panel-title,
  ha-expansion-panel h5[slot='header'] .expansion-panel-title,
  ha-expansion-panel h6[slot='header'] .expansion-panel-title {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    line-height: 1.25;
  }

  .expansion-panel-subtitle,
  .expansion-panel-summary {
    font-size: 0.8em;
    font-weight: 400;
    color: var(--secondary-text-color);
  }

  .expansion-panel-summary {
    white-space: nowrap;
  }

  .draggable-item-header {
    display: flex;
    align-items: center;
    gap: 0.7em;
    padding: 0.2em 0.5em 0.2em 0;
  }

  .draggable-item-header-icon {
    display: flex;
    color: var(--secondary-text-color);
  }

  .draggable-item-header-text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    line-height: 1.3;
  }

  .draggable-item-header-title,
  .draggable-item-header-subtitle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .draggable-item-header-title {
    font-weight: 500;
  }

  .draggable-item-header-subtitle {
    font-size: 0.85em;
    color: var(--secondary-text-color);
  }

  .draggable-item-header-image {
    height: 24px;
    width: 24px;
    object-fit: cover;
    border-radius: 50%;
  }

  /* Dialog to edit a shared template, above the card editor */

  .template-dialog {
    width: min(600px, 95vw);
    max-height: 90vh;
    padding: 0;
    border: none;
    border-radius: var(--ha-dialog-border-radius, 24px);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .template-dialog[open] {
    display: flex;
    flex-direction: column;
  }

  .template-dialog::backdrop {
    background: rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 600px) {
    .template-dialog {
      inset: 0;
      margin: 0;
      width: 100%;
      max-width: none;
      height: 100%;
      max-height: none;
      border-radius: 0;
    }
  }

  .template-dialog-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 12px 12px 24px;
    border-bottom: 1px solid var(--divider-color);
  }

  .template-dialog-title {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    font-size: 1.25em;
    font-weight: 500;
  }

  .template-dialog-subtitle {
    font-size: 0.65em;
    font-weight: 400;
    color: var(--secondary-text-color);
  }

  .template-dialog-body {
    flex: 1;
    overflow: auto;
    padding: 16px 24px;
  }

  .template-dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px 24px 16px;
    border-top: 1px solid var(--divider-color);
  }

  .template-dialog-mode {
    margin-right: auto;
  }

  @media (max-width: 600px) {
    .template-dialog-header {
      padding-top: calc(16px + env(safe-area-inset-top));
    }

    .template-dialog-actions {
      padding-bottom: calc(16px + env(safe-area-inset-bottom));
    }
  }

  /* Template section */

  .template-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .template-save-as {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .template-save-as-actions {
    display: flex;
    gap: 8px;
  }

  /* Field shell: marks values that override the template, and ends with an
     options menu (reset, JavaScript template, documentation) */

  .field {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .field-row {
    display: flex;
    align-items: center;
    gap: 2px;
    min-width: 0;
  }

  .field-content {
    flex: 1;
    min-width: 0;
  }

  .field-content > ha-selector {
    display: block;
    width: 100%;
  }

  .field-overridden {
    padding-left: 10px;
    border-left: 3px solid var(--primary-color);
  }

  .field-menu-button,
  .field-menu-spacer {
    flex: none;
    width: 32px;
  }

  .field-menu-button {
    position: relative;
    color: var(--secondary-text-color);
    --mdc-icon-button-size: 32px;
    --ha-icon-button-size: 32px;
    --mdc-icon-size: 20px;
  }

  /* A dot on the menu button when a reset or template option is in use */
  .field-menu-button.highlighted {
    color: var(--primary-color);
  }

  .field-menu-button.highlighted::after {
    content: '';
    position: absolute;
    top: 4px;
    right: 4px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--primary-color);
    pointer-events: none;
  }

  /* Popover in the top layer, placed next to its button by the editor */
  .field-menu {
    position: fixed;
    inset: auto;
    margin: 0;
    min-width: 220px;
    padding: 4px;
    border: 1px solid var(--divider-color);
    border-radius: 10px;
    background: var(--card-background-color, #fff);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    color: var(--primary-text-color);
  }

  /* Only while open, to keep the browser hiding it when closed */
  .field-menu:popover-open {
    display: flex;
    flex-direction: column;
  }

  .field-menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border: none;
    border-radius: 6px;
    background: none;
    color: var(--primary-text-color);
    font: inherit;
    font-size: 0.9em;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    --mdc-icon-size: 18px;
  }

  .field-menu-item:hover,
  .field-menu-item:focus-visible {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    outline: none;
  }

  .field-menu-item > ha-icon {
    color: var(--secondary-text-color);
  }

  .field-menu-item > span {
    flex: 1;
  }

  .field-menu-external {
    --mdc-icon-size: 14px;
  }

  .templatable-field-toggle {
    color: var(--secondary-text-color);
  }

  .templatable-field-toggle.active {
    color: var(--primary-color);
  }

  .override-chip {
    font-size: 0.75em;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 999px;
    color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    white-space: nowrap;
  }

  /* Groups of fields, with a caption */

  .group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .group + .group {
    padding-top: 4px;
  }

  .group-caption {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .group-title {
    font-size: 0.8em;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }

  .group-helper {
    font-size: 0.85em;
    color: var(--secondary-text-color);
  }

  .group-fields {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Compact switches, in a bordered list */

  .switch-list {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--divider-color);
    border-radius: var(--ha-card-border-radius, 12px);
  }

  .switch-list > .field + .field {
    border-top: 1px solid var(--divider-color);
  }

  .switch-list > .field-overridden {
    padding-left: 0;
    border-left: none;
    box-shadow: inset 3px 0 0 var(--primary-color);
  }

  .switch-list .field-row {
    padding-right: 4px;
  }

  /* A switch turned into a JavaScript template */
  .switch-list .template-editor-container {
    padding: 10px 0 10px 12px;
  }

  .switch-row {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-height: 44px;
    padding: 6px 8px 6px 12px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .switch-row.disabled {
    opacity: 0.5;
    cursor: default;
  }

  .switch-row-text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .switch-row-helper {
    font-size: 0.85em;
    color: var(--secondary-text-color);
  }

  .switch-row ha-switch {
    flex: none;
  }

  /* Lists inherited from the template */

  .inherited-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .inherited-list-hint,
  .editor-subsection-helper {
    font-size: 0.9em;
    color: var(--secondary-text-color);
  }

  .inherited-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 4px;
    color: var(--secondary-text-color);
    border-bottom: 1px solid var(--divider-color);
  }

  .inherited-item-title {
    color: var(--primary-text-color);
  }

  .inherited-item-subtitle {
    flex: 1;
    text-align: right;
    font-size: 0.85em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .inherited-list ha-button {
    margin-top: 8px;
  }

  .inherited-list-notice {
    display: block;
  }

  .editor-subsection {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 8px;
  }

  /* Route and player actions */

  .add-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
  }

  .add-actions-label {
    font-size: 0.9em;
    color: var(--secondary-text-color);
    margin-right: 4px;
  }

  .draggable-item-editor {
    display: flex;
    flex-direction: column;
    gap: 1em;
    background: var(--primary-background-color);
    border-radius: 8px;
    padding: 1em 1.2em 1.2em 1.2em;
    margin: 1em 0em;
  }

  .popup-controls {
    display: flex;
    gap: 0.5em;
    margin-bottom: 1em;
  }

  .editor-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }

  .editor-divider {
    margin: 0;
    border: none;
    border-top: 1px solid var(--divider-color);
    height: 1px;
    background: none;
  }

  .add-popup-btn {
    margin-top: 1em;
  }

  .template-editor-container {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    margin-bottom: 0.7em;
  }

  .template-editor-helper {
    font-size: 0.93em;
    color: var(--secondary-text-color, #888);
  }

  /* Segmented control */

  .segmented {
    display: flex;
    padding: 3px;
    gap: 3px;
    border-radius: 10px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .segmented-option {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 36px;
    padding: 4px 8px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--secondary-text-color);
    font: inherit;
    font-size: 0.9em;
    cursor: pointer;
    --mdc-icon-size: 18px;
  }

  .segmented-option.active {
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-weight: 500;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
  }

  .segmented-option:focus-visible {
    outline: 2px solid var(--primary-color);
  }

  .segmented-badge {
    min-width: 18px;
    padding: 0 5px;
    border-radius: 999px;
    font-size: 0.75em;
    line-height: 18px;
    color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 14%, transparent);
  }

  /* Route and popup item rows */

  .item-list {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--divider-color);
    border-radius: var(--ha-card-border-radius, 12px);
    overflow: hidden;
  }

  .item-list:empty {
    display: none;
  }

  .item-row {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 52px;
    padding: 0 8px 0 4px;
    cursor: pointer;
    outline: none;
  }

  .item-row + .item-row {
    border-top: 1px solid var(--divider-color);
  }

  .item-row:hover,
  .item-row:focus-visible {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }

  .item-row.drop-before {
    box-shadow: inset 0 2px 0 var(--primary-color);
  }

  .item-row.drop-after {
    box-shadow: inset 0 -2px 0 var(--primary-color);
  }

  .item-row .drag-handle {
    margin-right: 0;
    padding: 8px 2px;
  }

  .item-row-icon {
    display: flex;
  }

  .item-row-text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    line-height: 1.3;
  }

  .item-row-title,
  .item-row-subtitle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-row-subtitle {
    font-size: 0.85em;
    color: var(--secondary-text-color);
  }

  .item-row-chevron {
    color: var(--secondary-text-color);
  }

  /* Route and popup item view */

  .item-view-header {
    display: flex;
    align-items: center;
    gap: 4px;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--divider-color);
  }

  .item-view-title {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    font-size: 1.1em;
    font-weight: 500;
  }

  .item-view-subtitle {
    font-size: 0.8em;
    font-weight: 400;
    color: var(--secondary-text-color);
  }

  .action-inline,
  .popup-items {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .popup-items-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Custom Editor inputs */

  .editor-select-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .editor-select {
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    min-height: 48px;
    padding: 10px 12px;
    padding-right: 32px;
    border-radius: var(--ha-border-radius-sm, 4px); /* TODO JLAQ: review this variable */
    border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.14));
    background: var(--input-fill-color, var(--card-background-color, #fff));
    color: var(--primary-text-color, #000);
    outline: none;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    /* Remove default dropdown arrow */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    /* Add our own dropdown icon */
    background-image: linear-gradient(
      135deg,
      transparent 50%,
      var(--secondary-text-color, #666) 50%
    );
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 8px 6px;
  }

  .editor-select:hover:not(:disabled) {
    border-color: color-mix(
      in srgb,
      var(--primary-color, #03a9f4) 40%,
      var(--divider-color, rgba(0, 0, 0, 0.14))
    );
    background-color: color-mix(
      in srgb,
      var(--primary-color, #03a9f4) 4%,
      var(--input-fill-color, var(--card-background-color, #fff))
    );
  }

  .editor-select:focus {
    border-color: var(--primary-color, #03a9f4);
    box-shadow: 0 0 0 1px
      color-mix(in srgb, var(--primary-color, #03a9f4) 30%, transparent);
  }

  .editor-select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .editor-select-helper {
    font-size: 0.9em;
    color: var(--secondary-text-color, #666);
  }

  /* Custom Tabs Styles */

  .editor-tab-nav {
    margin-bottom: 0.25em;
    display: flex;
    background: var(--card-background-color, #fff);
    border-radius: 8px;
    border: 1px solid var(--divider-color, #e0e0e0);
  }

  .editor-tab-button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 6px 8px;
    border: none;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 12px;
    font-weight: 600;
    color: var(--secondary-text-color, #666);
    position: relative;
    overflow: hidden;
  }

  .editor-tab-button:hover {
    background: color-mix(
      in srgb,
      var(--primary-color, #03a9f4) 10%,
      transparent
    );
  }

  .editor-tab-button.active {
    background: var(--primary-color, #03a9f4);
    color: white;
  }

  .editor-tab-button ha-icon {
    --mdc-icon-size: 18px;
  }

  .loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
  }

  .loader {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-block;
    border: 2px solid transparent;
    border-top: 4px solid var(--primary-color, #03a9f4);
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
  DRAGGABLE_ITEM_STYLES = i`
  .draggable-item {
    border: 1.5px dashed transparent;
    border-radius: 8px;
    transition:
      border-color 0.2s,
      background 0.2s;
    background: none;
    position: relative;
  }

  .draggable-item.drag-over {
    border-color: var(--primary-color, #03a9f4);
    background: rgba(3, 169, 244, 0.08);
  }

  .draggable-item.dragging {
    opacity: 0.6;
    background: #eee;
    z-index: 2;
  }

  .drag-handle {
    cursor: grab;
    margin-right: 8px;
    color: var(--secondary-text-color);
    vertical-align: middle;
    display: inline-flex;
    align-items: center;
  }

  .delete-btn {
    color: var(--secondary-text-color);
  }

  .delete-btn:hover {
    color: var(--error-color, #db4437);
  }
`;
});

// src/styles/index.ts
var HOST_STYLES, NAVBAR_CONTAINER_STYLES, MEDIA_PLAYER_STYLES, ROUTE_STYLES, POPUP_STYLES, COMPONENTS_STYLES, getDefaultStyles = () => {
  return i`
    ${HOST_STYLES}
    ${NAVBAR_CONTAINER_STYLES}
    ${MEDIA_PLAYER_STYLES}
    ${ROUTE_STYLES}
    ${POPUP_STYLES}
    ${COMPONENTS_STYLES}
  `;
}, getEditorStyles = () => {
  return i`
    ${EDITOR_STYLES}
    ${DRAGGABLE_ITEM_STYLES}
  `;
};
var init_styles = __esm(() => {
  init_lit();
  init_editor();
  HOST_STYLES = i`
  :host {
    /* Sizes */
    --navbar-border-radius: var(--ha-card-border-radius, var(--ha-border-radius-lg, 12px));
    --navbar-badge-icon-size: 12px;
    --navbar-badge-size: 16px;
    --navbar-route-icon-size: 24px;
    --navbar-route-image-size: 32px;

    /* Colors */
    --navbar-background-color: var(--card-background-color);
    --navbar-primary-color: var(--primary-color);

    /* Box shadow configuration */
    --navbar-box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.14);
    --navbar-box-shadow-desktop: var(--ha-box-shadow-s, var(--material-shadow-elevation-2dp));
    --navbar-box-shadow-mobile-floating: var(--ha-box-shadow-s, var(--material-shadow-elevation-2dp));
    
    /* Controls the left margin of the navbar when in desktop mode (the width of HA sidebar) */
    --navbar-left-margin: var(--ha-sidebar-width, var(--mdc-drawer-width, 0px));

    /* Horizontal center of the dashboard view, after the sidebar and auto padding */
    --navbar-view-center: calc(
      50% +
        (
          var(--navbar-left-margin, 0px) +
            var(--navbar-view-padding-left, 0px) -
            var(--navbar-view-padding-right, 0px)
        ) / 2
    );

    /* Controls the edge inset of the navbar when in desktop mode (the width of HA sidebar) */
    --navbar-edge-inset: 16px;

    /* Z index configuration */
    --navbar-z-index: 3;
    --navbar-media-player-z-index: 4;
    --navbar-popup-backdrop-z-index: 900;
    --navbar-popup-z-index: 901;
  }
`;
  NAVBAR_CONTAINER_STYLES = i`
  .navbar {
    display: flex;
    flex-direction: column;
    width: 100vw;
    position: fixed;
    gap: 10px;
    left: 0;
    right: 0;
    bottom: 0;
    top: unset;
    z-index: var(--navbar-z-index);
  }

  ha-card {
    background: var(--navbar-background-color);
    border-radius: 0px;
    box-shadow: var(--navbar-box-shadow);
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px;
    gap: 10px;
  }

  .navbar-card {
    justify-content: space-between;
    width: 100%;
    gap: 2px;
  }

  /* Edit mode styles */
  .navbar.edit-mode {
    position: relative !important;
    flex-direction: column !important;
    left: unset !important;
    right: unset !important;
    bottom: unset !important;
    width: auto !important;
    top: unset !important;
    transform: none !important;
  }

  .navbar.edit-mode ha-card {
    width: 100% !important;
    flex-direction: row !important;
  }

  /* Mobile floating style */
  .navbar-card.mobile.floating {
    border: none !important;
    box-shadow: var(--navbar-box-shadow-mobile-floating) !important;
    border-radius: var(--navbar-border-radius) !important;
    margin-bottom: 10px;
    width: 90%;
  }

  /* Safe area: padding for "docked", margin for "floating" */
  .navbar.mobile.safe-area:not(.floating) .navbar-card {
    padding-bottom: calc(12px + var(--safe-area-inset-bottom, 0px));
  }

  .navbar.mobile.safe-area.floating .navbar-card {
    margin-bottom: calc(10px + var(--safe-area-inset-bottom, 0px));
  }

  /* Desktop mode styles */
  .navbar.desktop {
    width: auto;
    justify-content: space-evenly;
    --navbar-route-icon-size: 28px;
  }

  .navbar-card.desktop {
    border-radius: var(--navbar-border-radius);
    box-shadow: var(--navbar-box-shadow-desktop);
    padding: 12px 8px;
    justify-content: center;
    gap: 10px;
  }

  .navbar.desktop.bottom {
    flex-direction: column;
    top: unset;
    right: unset;
    bottom: var(--navbar-edge-inset);
    left: var(--navbar-view-center);
    transform: translate(-50%, 0);
  }

  .navbar-card.desktop.bottom {
    flex-direction: row;
  }

  .navbar.desktop.top {
    flex-direction: column;
    bottom: unset;
    right: unset;
    top: var(--navbar-edge-inset);
    left: var(--navbar-view-center);
    transform: translate(-50%, 0);
  }

  .navbar-card.desktop.top {
    flex-direction: row;
  }

  .navbar.desktop.left {
    flex-direction: row-reverse;
    left: calc(var(--navbar-left-margin, 0px) + var(--navbar-edge-inset));
    right: unset;
    bottom: unset;
    top: 50%;
    transform: translate(0, -50%);
  }

  .navbar-card.desktop.left {
    flex-direction: column;
    align-items: center;
  }

  .navbar.desktop.right {
    flex-direction: row;
    right: var(--navbar-edge-inset);
    left: unset;
    bottom: unset;
    top: 50%;
    transform: translate(0, -50%);
  }

  .navbar-card.desktop.right {
    flex-direction: column;
    align-items: center;
  }

  /* Desktop docked mode styles */
  .navbar-card.desktop.docked {
    border-radius: 0px;
  }

  .navbar.desktop.docked.bottom {
    bottom: 0px;
    left: var(--navbar-left-margin, 0px);
    right: 0px;
    width: auto;
    transform: none;
  }

  .navbar-card.desktop.docked.bottom {
    width: 100%;
    border-radius: 0px;
  }

  .navbar.desktop.docked.top {
    top: 0px;
    left: var(--navbar-left-margin, 0px);
    right: 0px;
    width: auto;
    transform: none;
  }

  .navbar-card.desktop.docked.top {
    width: 100%;
    border-radius: 0px;
  }

  .navbar.desktop.docked.left {
    left: var(--navbar-left-margin, 0px);
    top: 0px;
    bottom: 0px;
    height: 100%;
    width: auto;
    transform: none;
  }

  .navbar-card.desktop.docked.left {
    height: 100%;
    border-radius: 0px;
  }

  .navbar.desktop.docked.right {
    right: 0px;
    top: 0px;
    bottom: 0px;
    height: 100%;
    width: auto;
    transform: none;
  }

  .navbar-card.desktop.docked.right {
    height: 100%;
    border-radius: 0px;
  }
`;
  MEDIA_PLAYER_STYLES = i`
  .media-player.error {
    padding: 0px !important;
  }

  .media-player.error ha-alert {
    width: 100%;
  }

  .media-player {
    cursor: pointer;
    width: 90%;
    overflow: hidden;
    position: relative;
    box-shadow: var(--navbar-box-shadow-mobile-floating);
    border-radius: var(--navbar-border-radius);
    display: flex;
    flex-direction: row;
  }

  :is(.media-player, .media-player-carousel).mobile {
    border: none;
    align-self: center;
  }

  .media-player.desktop {
    width: 100%;
    max-width: 400px;
  }

  /* Center media player when inside navbar (wider than max-width) */
  :is(.media-player, .media-player-carousel).desktop:not(.position-absolute) {
    align-self: center;
  }

  :is(.media-player, .media-player-carousel).desktop.position-absolute {
    position: fixed;
    width: 400px;
    z-index: var(--navbar-media-player-z-index);
  }

  :is(.media-player, .media-player-carousel).desktop.position-absolute.top-left {
    left: var(--navbar-edge-inset);
    top: calc(var(--header-height) + var(--navbar-edge-inset));
  }
  :is(.media-player, .media-player-carousel).desktop.position-absolute.top-center {
    left: var(--navbar-view-center);
    top: calc(var(--header-height) + var(--navbar-edge-inset));
    transform: translateX(-50%);
  }
  :is(.media-player, .media-player-carousel).desktop.position-absolute.top-right {
    right: var(--navbar-edge-inset);
    top: calc(var(--header-height) + var(--navbar-edge-inset));
  }
  :is(.media-player, .media-player-carousel).desktop.position-absolute.bottom-left {
    left: calc(var(--navbar-left-margin, 0px) + var(--navbar-edge-inset));
    bottom: var(--navbar-edge-inset);
  }
  :is(.media-player, .media-player-carousel).desktop.position-absolute.bottom-center {
    left: var(--navbar-view-center);
    bottom: var(--navbar-edge-inset);
    transform: translateX(-50%);
  }
  :is(.media-player, .media-player-carousel).desktop.position-absolute.bottom-right {
    right: var(--navbar-edge-inset);
    bottom: var(--navbar-edge-inset);
  }

  .media-player .media-player-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: blur(20px);
    opacity: 0.3;
    z-index: 0;
  }

  .media-player .media-player-image {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    object-fit: cover;
    margin-right: 6px;
  }

  .media-player .media-player-icon-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--disabled-color);
  }

  .media-player .media-player-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  .media-player .media-player-title {
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  .media-player .media-player-artist {
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .media-player .media-player-button {
  }

  .media-player .media-player-button.media-player-button-play-pause {
  }

  .media-player .media-player-progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
  }

  .media-player .media-player-progress-bar-fill {
    background-color: var(--navbar-primary-color);
    height: 100%;
    transform: scaleX(var(--progress));
    transform-origin: left;
  }

  .media-player .media-player-progress-bar-fill.playing {
    animation: navbar-media-player-progress linear forwards;
  }

  @keyframes navbar-media-player-progress {
    to {
      transform: scaleX(1);
    }
  }

  /* Media player carousel */

  .media-player-carousel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    border: none;
  }

  .media-player-carousel.desktop {
    width: 100%;
    max-width: 400px;
  }

  .media-player-viewport {
    width: 100%;
    overflow: hidden;
    touch-action: pan-y;
    user-select: none;
  }

  .media-player-track {
    display: flex;
    gap: 12px;
    will-change: transform;
  }

  .media-player-carousel .media-player {
    flex: 0 0 100%;
    min-width: 0;
    width: 100%;
    border: none;
  }

  .media-player-dots {
    display: flex;
    justify-content: center;
    gap: 6px;
    padding-top: 6px;
  }

  .media-player-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--disabled-color);
    transition: background 0.2s, transform 0.2s;
  }

  .media-player-dot.active {
    background: var(--navbar-primary-color);
    transform: scale(1.1);
  }
`;
  ROUTE_STYLES = i`
  .route {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100%;
    position: relative;
    text-decoration: none;
    color: var(--primary-text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    --icon-primary-color: var(--state-inactive-color);
    overflow: hidden;
  }

  /* Button styling */
  .button {
    max-width: 60px;
    position: relative;
    height: 36px;
    width: 100%;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .button.active {
    background: color-mix(
      in srgb,
      var(--navbar-primary-color) 30%,
      transparent
    );
    --icon-primary-color: var(--navbar-primary-color);
  }

  /* Icon and Image styling */
  .icon {
    --mdc-icon-size: var(--navbar-route-icon-size);
  }

  .image {
    width: var(--navbar-route-image-size);
    height: var(--navbar-route-image-size);
    object-fit: contain;
  }

  .image.active {
  }

  /* Label styling */
  .label {
    flex: 1;
    width: 100%;
    text-align: center;
    font-size: var(--ha-font-size-s, var(--paper-font-caption_-_font-size, 12px));
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .label.active {
    color: var(--navbar-primary-color);
  }

  /* Badge styling */
  .badge {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 999px;
    width: 12px;
    height: 12px;
  }
  .badge.with-counter {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--navbar-badge-size);
    width: auto !important;
    min-width: var(--navbar-badge-size);
    padding: 0px 2px;
    font-weight: bold;
    font-size: 11px;
    line-height: 11px;
  }
  .badge.with-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--navbar-badge-size);
    height: var(--navbar-badge-size);
    line-height: 0;
  }
  .badge-icon {
    --icon-primary-color: currentColor;
    --mdc-icon-size: var(--navbar-badge-icon-size);
  }

  /* Desktop mode styles */
  .desktop .route .label {
    flex: unset;
  }
  .desktop .route {
    height: 60px;
    width: 70px;
  }
  .desktop .button {
    flex: unset;
    height: 100%;
  }

  .desktop .route:has(.label) .button {
    height: 40px;
  }
`;
  POPUP_STYLES = i`
  /****************************************/
  /* Backdrop */
  /****************************************/
  .navbar-popup-backdrop {
    position: fixed;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: var(--navbar-popup-backdrop-z-index);
    transition: opacity 0.2s ease;
  }

  .navbar-popup-backdrop.visible {
    opacity: 1;
  }

  /****************************************/
  /* Main popup container */
  /****************************************/
  .navbar-popup {
    pointer-events: none;
    position: fixed;
    opacity: 0;
    padding: 6px;
    gap: 10px;
    z-index: var(--navbar-popup-z-index);

    display: flex;
    justify-content: center;

    transition: all 0.2s ease;
    transform-origin: bottom left;
  }

  .navbar-popup.open-up {
    flex-direction: column-reverse;
    margin-bottom: 32px;
    transform: translate(0, -100%);
  }

  .navbar-popup.open-bottom {
    flex-direction: column;
    margin-top: 32px;
  }

  .navbar-popup.open-right {
    flex-direction: row;
    margin-left: 32px;
  }

  .navbar-popup.open-right.popuplabelbackground {
    gap: 24px;
  }

  .navbar-popup.open-left {
    flex-direction: row-reverse;
    margin-right: 32px;
  }

  .navbar-popup.open-left.popuplabelbackground {
    gap: 24px;
  }

  .navbar-popup.label-right {
    align-items: flex-start;
  }

  .navbar-popup.label-left {
    align-items: flex-end;
  }

  .navbar-popup.visible {
    opacity: 1;
  }

  .navbar-popup.popuplabelbackground {
    padding-left: 0px;
  }

  /****************************************/
  /* Popup item styles */
  /****************************************/

  .popup-item {
    pointer-events: auto;
    cursor: pointer;
    color: var(--primary-text-color);
    display: flex;
    flex-direction: column;
    --icon-primary-color: var(--primary-text-color);
    display: flex;
    flex-direction: row-reverse;
    width: fit-content;
    height: fit-content;
    gap: 6px;
    align-items: center;

    opacity: 0;
    transform: translateY(10px);
    transition: filter 0.2s ease;
    transition: all 0.2s ease;
  }

  .navbar-popup.visible .popup-item {
    opacity: 1;
    transform: translateY(0);
    transition-delay: calc(var(--index) * var(--popup-item-stagger-step, 0.05s));
  }

  .popup-item.label-bottom {
    flex-direction: column;
    max-width: 80px;
  }

  .popup-item.label-left {
    flex-direction: row-reverse;
  }

  .popup-item.label-right {
    flex-direction: row;
  }

  .popup-item.label-left .label {
    text-align: end;
  }

  .popup-item.label-right .label {
    text-align: start;
  }

  .popup-item .button {
    width: 50px;
    height: 50px;
    background: var(--navbar-background-color);
    box-shadow: var(--navbar-box-shadow-desktop);
  }

  .popup-item .button.popuplabelbackground {
    width: 100%;
    max-width: unset;
    padding-left: 8px;
    padding-right: 8px;
    flex-direction: row;
    gap: 4px;
  }

  .popup-item.active {
    --icon-primary-color: var(--navbar-primary-color);
  }

  .popup-item.popuplabelbackground {
    max-width: unset;
  }

  .popup-item.active .button {
    color: var(--navbar-primary-color);
    background: color-mix(in srgb, var(--navbar-primary-color) 30%, white);
  }
`;
  COMPONENTS_STYLES = i`
  .navbar-icon-button {
    position: relative;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: var(--primary-text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    outline: none;
  }

  .navbar-icon-button.primary {
    background-color: var(--navbar-primary-color);
    color: var(--text-primary-color, #fff);
  }
`;
});

// node_modules/@kipk/load-ha-components/dist/load-ha-components.js
function copyResult(result) {
  return {
    requested: [...result.requested],
    alreadyDefined: [...result.alreadyDefined],
    loaded: [...result.loaded],
    missing: [...result.missing],
    attemptedStrategies: [...result.attemptedStrategies]
  };
}
function normalizeComponents(components) {
  const requested = components ?? DEFAULT_HA_COMPONENTS;
  const uniqueComponents = new Set;
  for (const component of requested) {
    const normalized = component.trim();
    if (normalized) {
      uniqueComponents.add(normalized);
    }
  }
  return [...uniqueComponents];
}
function getTimeoutMs(timeoutMs) {
  return typeof timeoutMs === "number" && Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : DEFAULT_TIMEOUT_MS;
}
function getDiscoveryMode(discovery) {
  return discovery === "card" ? "card" : "targeted";
}
function createError(message, cause) {
  const error = new Error(message);
  if (cause !== undefined) {
    error.cause = cause;
  }
  return error;
}
function withTimeout(promise, timeoutMs, description) {
  let timeoutId;
  const source = Promise.resolve(promise).catch((error) => {
    throw createError(`Failed while ${description}`, error);
  });
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(createError(`Timed out while ${description}`));
    }, timeoutMs);
  });
  return Promise.race([source, timeout]).finally(() => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  });
}
function hasDom() {
  return typeof window !== "undefined" && typeof document !== "undefined" && hasCustomElementsRegistry();
}
function hasCustomElementsRegistry() {
  return typeof customElements !== "undefined" && customElements !== null && typeof customElements.get === "function" && typeof customElements.whenDefined === "function";
}
function isDefined(component) {
  return customElements.get(component) !== undefined;
}
function getStrategiesForComponent(component) {
  return COMPONENT_STRATEGIES[component] ?? ["config-automation"];
}
function getRequiredStrategies(components) {
  const strategies = new Set;
  for (const component of components) {
    for (const strategy of getStrategiesForComponent(component)) {
      strategies.add(strategy);
    }
  }
  return [...strategies];
}
function getRouteLoad(routerOptions, urlPath, owner) {
  const load = routerOptions?.routes?.[urlPath]?.load;
  if (typeof load !== "function") {
    throw createError(`No load() route for ${urlPath} in ${owner}`);
  }
  return load;
}
async function loadRootPanel(componentName, urlPath, timeoutMs) {
  if (!hasDom()) {
    throw createError("A DOM environment is required to load Home Assistant components");
  }
  await withTimeout(customElements.whenDefined("partial-panel-resolver"), timeoutMs, "waiting for partial-panel-resolver");
  const resolver = document.createElement("partial-panel-resolver");
  if (!resolver) {
    throw createError("Failed to create partial-panel-resolver");
  }
  const panels = {
    [urlPath]: {
      url_path: urlPath,
      component_name: componentName
    }
  };
  let routerOptions;
  if (typeof resolver._getRoutes === "function") {
    routerOptions = resolver._getRoutes(panels);
  } else if (typeof resolver._updateRoutes === "function") {
    resolver.hass = { panels };
    const updateResult = resolver._updateRoutes();
    if (updateResult !== null && typeof updateResult === "object" && "then" in updateResult && typeof updateResult.then === "function") {
      Promise.resolve(updateResult).catch(() => {
        return;
      });
    }
    routerOptions = resolver.routerOptions;
  } else {
    throw createError("partial-panel-resolver exposes neither _getRoutes() nor _updateRoutes()");
  }
  const load = getRouteLoad(routerOptions, urlPath, "partial-panel-resolver");
  await withTimeout(load.call(routerOptions?.routes?.[urlPath]), timeoutMs, `loading ${componentName} panel`);
}
function getConfigRoutes(timeoutMs) {
  if (configRoutesPromise) {
    return configRoutesPromise;
  }
  let sharedPromise;
  sharedPromise = (async () => {
    await loadRootPanel("config", "tmp", timeoutMs);
    await withTimeout(customElements.whenDefined("ha-panel-config"), timeoutMs, "waiting for ha-panel-config");
    const configPanel = document.createElement("ha-panel-config");
    if (!configPanel) {
      throw createError("Failed to create ha-panel-config");
    }
    if (!configPanel.routerOptions?.routes) {
      throw createError("ha-panel-config exposes no routes");
    }
    return configPanel.routerOptions;
  })().catch((error) => {
    if (configRoutesPromise === sharedPromise) {
      configRoutesPromise = undefined;
    }
    throw error;
  });
  configRoutesPromise = sharedPromise;
  return sharedPromise;
}
async function loadConfigRoute(routeName, timeoutMs) {
  const routerOptions = await getConfigRoutes(timeoutMs);
  const load = getRouteLoad(routerOptions, routeName, "ha-panel-config");
  await withTimeout(load.call(routerOptions.routes?.[routeName]), timeoutMs, `loading ${routeName} route`);
}
function loadHistory(timeoutMs) {
  return loadRootPanel("history", "history", timeoutMs);
}
function loadMediaBrowser(timeoutMs) {
  return loadRootPanel("media-browser", "media-browser", timeoutMs);
}
function loadStrategy(strategy, timeoutMs) {
  const existing = strategyPromises.get(strategy);
  if (existing) {
    return existing;
  }
  let sharedPromise;
  sharedPromise = strategyLoaders[strategy](timeoutMs).catch((error) => {
    if (strategyPromises.get(strategy) === sharedPromise) {
      strategyPromises.delete(strategy);
    }
    throw error;
  });
  strategyPromises.set(strategy, sharedPromise);
  return sharedPromise;
}
function createResult(requested, alreadyDefined, attemptedStrategies) {
  const missing = requested.filter((component) => !isDefined(component));
  const alreadyDefinedSet = new Set(alreadyDefined);
  return {
    requested: [...requested],
    alreadyDefined: [...alreadyDefined],
    loaded: requested.filter((component) => !alreadyDefinedSet.has(component) && !missing.includes(component)),
    missing,
    attemptedStrategies: [...attemptedStrategies]
  };
}
function invalidateUnverifiedStrategies(missing, attemptedPromises, discovery) {
  for (const [strategy, promise] of attemptedPromises) {
    if (discovery === "card" || missing.some((component) => getStrategiesForComponent(component).includes(strategy))) {
      if (strategyPromises.get(strategy) === promise) {
        strategyPromises.delete(strategy);
      }
    }
  }
}
async function loadHaComponents(components, options) {
  const requested = normalizeComponents(components);
  const attemptedStrategies = [];
  const alreadyDefined = hasCustomElementsRegistry() ? requested.filter(isDefined) : [];
  if (alreadyDefined.length === requested.length) {
    return createResult(requested, alreadyDefined, attemptedStrategies);
  }
  if (!hasDom()) {
    const alreadyDefinedSet = new Set(alreadyDefined);
    const result = {
      requested: [...requested],
      alreadyDefined: [...alreadyDefined],
      loaded: [],
      missing: requested.filter((component) => !alreadyDefinedSet.has(component)),
      attemptedStrategies
    };
    throw new HaComponentsLoadError(result, createError("A DOM environment is required to load Home Assistant components"));
  }
  const timeoutMs = getTimeoutMs(options?.timeoutMs);
  const discovery = getDiscoveryMode(options?.discovery);
  const attemptedPromises = new Map;
  let failure;
  try {
    for (const strategy of getRequiredStrategies(requested.filter((component) => !alreadyDefined.includes(component)))) {
      const currentlyMissing = requested.filter((component) => !isDefined(component));
      if (!currentlyMissing.some((component) => getStrategiesForComponent(component).includes(strategy))) {
        continue;
      }
      attemptedStrategies.push(strategy);
      const promise = loadStrategy(strategy, timeoutMs);
      attemptedPromises.set(strategy, promise);
      await promise;
    }
    if (discovery === "card") {
      for (const strategy of CARD_DISCOVERY_STRATEGIES) {
        if (attemptedPromises.has(strategy)) {
          continue;
        }
        if (requested.every(isDefined)) {
          break;
        }
        attemptedStrategies.push(strategy);
        const promise = loadStrategy(strategy, timeoutMs);
        attemptedPromises.set(strategy, promise);
        await promise;
      }
    }
  } catch (error) {
    failure = error;
  }
  const result = createResult(requested, alreadyDefined, attemptedStrategies);
  if (failure !== undefined || result.missing.length > 0) {
    invalidateUnverifiedStrategies(result.missing, attemptedPromises, discovery);
    throw new HaComponentsLoadError(result, failure);
  }
  return result;
}
var DEFAULT_TIMEOUT_MS = 1e4, HaComponentsLoadError, DEFAULT_HA_COMPONENTS, COMPONENT_STRATEGIES, CARD_DISCOVERY_STRATEGIES, strategyPromises, configRoutesPromise, strategyLoaders;
var init_load_ha_components = __esm(() => {
  HaComponentsLoadError = class HaComponentsLoadError extends Error {
    result;
    cause;
    constructor(result, cause) {
      super(result.missing.length > 0 ? `Unable to load Home Assistant components: ${result.missing.join(", ")}` : "Unable to load Home Assistant components");
      this.name = "HaComponentsLoadError";
      this.result = copyResult(result);
      this.cause = cause;
    }
  };
  DEFAULT_HA_COMPONENTS = [
    "ha-form",
    "ha-icon",
    "ha-icon-button",
    "ha-selector",
    "ha-input",
    "ha-entity-picker",
    "ha-select",
    "ha-dialog",
    "ha-sortable",
    "ha-svg-icon",
    "ha-alert",
    "ha-button"
  ];
  COMPONENT_STRATEGIES = {
    "ha-target-picker": ["history"],
    "ha-date-range-picker": ["history"],
    "ha-time-input": ["history"],
    "ha-textarea": ["history"],
    "ha-country-picker": ["config-general"],
    "ha-currency-picker": ["config-general"],
    "ha-language-picker": ["config-general"],
    "ha-timezone-picker": ["config-general"],
    "ha-map": ["config-general"],
    "ha-entity-marker": ["config-general"],
    "ha-select-box": ["config-general"],
    "ha-label-picker": ["config-labels"],
    "ha-media-player-picker": ["media-browser"],
    "ha-tts-voice-picker": ["media-browser"],
    "ha-media-player-browse": ["media-browser"],
    "ha-media-browser-thumbnail": ["media-browser"],
    "ha-media-manage-button": ["media-browser"],
    "ha-browse-media-manual": ["media-browser"],
    "ha-browse-media-tts": ["media-browser"]
  };
  CARD_DISCOVERY_STRATEGIES = [
    "config-automation",
    "history",
    "config-general",
    "config-labels",
    "media-browser"
  ];
  strategyPromises = new Map;
  strategyLoaders = {
    "config-automation": (timeoutMs) => loadConfigRoute("automation", timeoutMs),
    history: loadHistory,
    "config-general": (timeoutMs) => loadConfigRoute("general", timeoutMs),
    "config-labels": (timeoutMs) => loadConfigRoute("labels", timeoutMs),
    "media-browser": loadMediaBrowser
  };
});

// node_modules/@kipk/load-ha-components/dist/index.js
var init_dist = __esm(() => {
  init_load_ha_components();
});

// src/editor/ui/renderDropdown.ts
var renderHAComboBox = (value, onChange, options) => {
  return x`
      <ha-combo-box
        helper=${options.helper}
        helperPersistent=${options.helperPersistent}
        label=${options.label}
        .items=${options.items}
        .value=${value ?? options.defaultValue ?? null}
        .disabled=${options.disabled}
        .hideClearIcon=${!options.allowEmptyValue}
        @value-changed="${(e) => {
    onChange(e.detail.value ?? null);
  }}" />
    `;
}, renderHTMLSelect = (value, onChange, options) => {
  const currentValue = value ?? options.defaultValue ?? null;
  const currentValueStr = currentValue !== null && currentValue !== undefined ? String(currentValue) : "";
  return x`
      <div class="editor-select-field">
        <label class="editor-label">${options.label}</label>
        <select
          class="editor-select"
          .value=${currentValueStr}
          ?disabled=${options.disabled}
          @change=${(e) => {
    const value = e.target.value;
    if (value === "") {
      onChange(null);
      return;
    }
    const selectedItem = options.items.find((item) => String(item.value) === value);
    onChange(selectedItem?.value ?? null);
  }}>
          ${options.allowEmptyValue ? x`<option value="">
            &ndash;
            </option>` : x``}
          ${options.items.map((item) => x`<option
              value=${String(item.value)}
              ?selected=${String(item.value) === currentValueStr}>
              ${item.label}
            </option>`)}
        </select>
        ${options.helper ? x`<div class="editor-select-helper">
                ${options.helper}
              </div>` : x``}
      </div>
    `;
}, renderDropdown = (value, onChange, options) => {
  if (supportsHAComponent("ha-combo-box")) {
    return renderHAComboBox(value, onChange, options);
  }
  return renderHTMLSelect(value, onChange, options);
};
var init_renderDropdown = __esm(() => {
  init_lit();
  init_utils();
});

// src/navbar-card-editor.ts
var HAActions, GENERIC_JS_TEMPLATE_HELPER, BOOLEAN_JS_TEMPLATE_HELPER, STRING_JS_TEMPLATE_HELPER, ACTION_INFO, QUICKBAR_MODES2, plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`, errorMessage = (error) => error?.message ?? String(error), dropIndex = (e, rowIndex) => {
  const rect = e.currentTarget.getBoundingClientRect();
  return e.clientY > rect.top + rect.height / 2 ? rowIndex + 1 : rowIndex;
}, NavbarCardEditor;
var init_navbar_card_editor = __esm(() => {
  init_dist();
  init_lit();
  init_decorators();
  init_renderDropdown();
  init_action_handler();
  init_types();
  init_utils();
  init_docs_links();
  init_styles();
  ((HAActions) => {
    HAActions["tap_action"] = "tap_action";
    HAActions["hold_action"] = "hold_action";
    HAActions["double_tap_action"] = "double_tap_action";
  })(HAActions ||= {});
  GENERIC_JS_TEMPLATE_HELPER = x`Insert valid Javascript code without [[[
  ]]].
  <a
    href="${DOCS_LINKS.jsTemplate}"
    target="_blank"
    rel="noopener"
    >See documentation</a
  >
  for more info.`;
  BOOLEAN_JS_TEMPLATE_HELPER = x`${GENERIC_JS_TEMPLATE_HELPER}<br />Must
  return a <strong>boolean</strong> value`;
  STRING_JS_TEMPLATE_HELPER = x`${GENERIC_JS_TEMPLATE_HELPER}<br />Must
  return a <strong>string</strong> value`;
  ACTION_INFO = {
    ["tap_action" /* tap_action */]: { icon: "mdi:gesture-tap", label: "Tap action" },
    ["hold_action" /* hold_action */]: {
      icon: "mdi:gesture-tap-hold",
      label: "Hold action"
    },
    ["double_tap_action" /* double_tap_action */]: {
      icon: "mdi:gesture-double-tap",
      label: "Double tap action"
    }
  };
  QUICKBAR_MODES2 = [
    { label: "Search", value: "search" },
    { label: "Entities", value: "entities" },
    { label: "Devices", value: "devices" },
    { label: "Commands", value: "commands" }
  ];
  NavbarCardEditor = class NavbarCardEditor extends i4 {
    constructor() {
      super(...arguments);
      this._config = { routes: [] };
      this._loadingComponents = false;
      this._templateModeByField = {};
      this.isTemplateEditor = false;
      this._templateDialog = null;
      this._newTemplateName = "";
      this._showSaveAsTemplate = false;
      this._openItem = null;
      this._appearanceDevice = "desktop";
      this._dropTarget = null;
      this._fieldMenu = null;
      this._savingTemplate = false;
      this.addMediaPlayer = () => {
        const players = this._config.media_player?.players ?? [];
        const newPlayer = { entity: "" };
        this._expandedItemKey = `media_player.players.${players.length}`;
        this.updateConfig({
          media_player: {
            ...this._config.media_player,
            players: [...players, newPlayer]
          }
        });
      };
      this.removeMediaPlayer = (playerIndex) => {
        const players = [...this._config.media_player?.players ?? []];
        players.splice(playerIndex, 1);
        this.updateConfigByKey("media_player.players", players.length === 0 ? null : players);
      };
      this.addRouteOrPopup = (routeIndex) => {
        let routes = [...this._config.routes ?? []];
        const newItemData = {
          icon: "mdi:alert-circle-outline",
          label: "",
          url: ""
        };
        if (routeIndex == null) {
          routes = [...routes, newItemData];
          this._expandedItemKey = `routes.${routes.length - 1}`;
        } else {
          const popup = [...routes[routeIndex].popup || [], newItemData];
          routes[routeIndex] = { ...routes[routeIndex], popup };
          this._expandedItemKey = `routes.${routeIndex}.popup.${popup.length - 1}`;
        }
        this.updateConfig({ routes });
      };
      this.removeRouteOrPopup = (routeIndex, popupIndex) => {
        if (!this._config.routes || this._config.routes.length == 0)
          return;
        const routes = [...this._config.routes];
        if (popupIndex == null) {
          routes.splice(routeIndex, 1);
          if (routes.length === 0) {
            this.updateConfigByKey("routes", null);
            return;
          }
          this.updateConfig({ routes });
          return;
        }
        const popup = [...routes[routeIndex].popup || []];
        popup.splice(popupIndex, 1);
        if (popup.length === 0) {
          this.updateConfigByKey(`routes.${routeIndex}.popup`, null);
          return;
        }
        routes[routeIndex] = { ...routes[routeIndex], popup };
        this.updateConfig({ routes });
      };
      this._resetToTemplateOnly = () => {
        const type = this._config.type;
        this._config = {
          ...type != null ? { type } : {},
          template: this._config.template
        };
        this._dispatchConfigChangedEvent();
      };
      this._resetToTemplate = (key) => {
        let config = genericSetProperty(this._config, key, null, {
          allowDeletion: true
        });
        const paths = key.split(".");
        for (let i = paths.length - 1;i > 0; i--) {
          const parentKey = paths.slice(0, i).join(".");
          const parent = genericGetProperty(config, parentKey);
          if (parent && typeof parent === "object" && Object.keys(parent).length === 0) {
            config = genericSetProperty(config, parentKey, null, {
              allowDeletion: true
            });
          }
        }
        this._config = config;
        this._dispatchConfigChangedEvent();
      };
      this._closeFieldMenu = () => {
        this._unwatchScroll();
        const menu = this._fieldMenuElement;
        if (menu?.matches?.(":popover-open"))
          menu.hidePopover();
        if (this._fieldMenu) {
          this._lastClosedFieldMenu = {
            key: this._fieldMenu.key,
            time: Date.now()
          };
        }
        this._fieldMenu = null;
      };
      this._onScroll = () => {
        if (this._fieldMenu)
          this._closeFieldMenu();
      };
      this._scrollContainers = [];
      this._startEditingTemplate = () => {
        const name = this._config.template;
        const template = name ? getSharedTemplates()?.[name] : undefined;
        if (!(name && template))
          return;
        this._templateError = undefined;
        this._templateDialog = {
          dirty: false,
          draft: structuredClone(template),
          name
        };
      };
      this._closeTemplateDialog = (force = false) => {
        if (!force && this._templateDialog?.dirty && !window.confirm("Discard your changes to this template?")) {
          return;
        }
        this._templateDialog = null;
        this._templateError = undefined;
      };
      this._saveTemplateDialog = async () => {
        const dialog = this._templateDialog;
        if (!dialog)
          return;
        if (await this._saveTemplate(dialog.name, dialog.draft)) {
          this._closeTemplateDialog(true);
        }
      };
      this._moveTemplateToShared = async () => {
        const name = this._config.template;
        if (!name)
          return;
        this._savingTemplate = true;
        this._templateError = undefined;
        try {
          await moveDashboardTemplateToShared(this.hass, name);
          this.requestUpdate();
        } catch (error) {
          this._templateError = `Could not move the template: ${errorMessage(error)}`;
        } finally {
          this._savingTemplate = false;
        }
      };
      this._saveAsTemplate = async () => {
        const name = this._newTemplateName.trim();
        if (!name)
          return;
        if (getAvailableTemplates()[name]) {
          this._templateError = `A template named "${name}" already exists.`;
          return;
        }
        const { type, template, ...cardConfig } = this._config;
        const templateConfig = template ? getAvailableTemplates()[template] : undefined;
        const config = deepMergeKeepArrays(templateConfig ?? { routes: [] }, cardConfig);
        if (await this._saveTemplate(name, config)) {
          this._newTemplateName = "";
          this._showSaveAsTemplate = false;
          this._config = { ...type != null ? { type } : {}, template: name };
          this._dispatchConfigChangedEvent();
        }
      };
    }
    connectedCallback() {
      super.connectedCallback();
      this._unsubscribeSharedTemplates = onSharedTemplatesChange(() => this.requestUpdate());
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this._unsubscribeSharedTemplates?.();
      this._unwatchScroll();
    }
    willUpdate(changedProperties) {
      super.willUpdate(changedProperties);
      if (changedProperties.has("hass") && this.hass) {
        loadSharedTemplates(this.hass);
      }
      if (this._openItem) {
        const { routeIndex, popupIndex } = this._openItem;
        const route = this._config.routes?.[routeIndex];
        const exists = popupIndex == null ? !!route : Array.isArray(route?.popup) && !!route.popup[popupIndex];
        if (!exists)
          this._openItem = null;
      }
    }
    firstUpdated(_changedProperties) {
      super.firstUpdated(_changedProperties);
      this._templateModeByField = {};
      this._loadingComponents = true;
      loadHaComponents([
        "ha-form",
        "ha-icon",
        "ha-button",
        "ha-input",
        "ha-switch",
        "ha-expansion-panel",
        "ha-code-editor",
        "ha-alert",
        "ha-selector",
        "ha-icon-button"
      ]).catch((error) => {
        console.warn("[navbar-card] Failed to load some HA editor components", error);
      }).finally(() => {
        this._loadingComponents = false;
      });
    }
    _dispatchConfigChangedEvent() {
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: {
          config: this._config
        }
      }));
    }
    setConfig(config) {
      this._config = config;
    }
    updateConfig(newConfig) {
      this._config = deepMergeKeepArrays(this._config, newConfig);
      this._dispatchConfigChangedEvent();
    }
    updateConfigByKey(key, value) {
      this._config = genericSetProperty(this._config, key, value, {
        allowDeletion: true
      });
      this._dispatchConfigChangedEvent();
    }
    get _templateConfig() {
      if (this.isTemplateEditor || !this._config.template)
        return;
      return getAvailableTemplates()[this._config.template];
    }
    _getValue(key) {
      const own = genericGetProperty(this._config, key);
      if (own !== undefined)
        return own;
      const template = this._templateConfig;
      return template ? genericGetProperty(template, key) : undefined;
    }
    _isOverridden(key) {
      return !!this._templateConfig && key !== "template" && !/^(routes|media_player\.players)\./.test(key) && genericGetProperty(this._config, key) !== undefined;
    }
    _countOverrides(key) {
      if (!this._templateConfig)
        return 0;
      const count = (value) => value != null && typeof value === "object" && !Array.isArray(value) ? Object.values(value).reduce((sum, v) => sum + count(v), 0) : value === undefined ? 0 : 1;
      return count(genericGetProperty(this._config, key));
    }
    _countAllOverrides() {
      return Object.keys(this._config).filter((key) => key !== "type" && key !== "template").reduce((sum, key) => sum + this._countOverrides(key), 0);
    }
    _renderField(key, content, options = {}) {
      const overridden = !!key && this._isOverridden(key);
      const docs = key ? getOptionDocsLink(key) : undefined;
      const actions = [
        ...overridden && key ? [
          {
            icon: "mdi:undo-variant",
            label: "Reset to template value",
            onClick: () => this._resetToTemplate(key)
          }
        ] : [],
        ...options.actions ?? [],
        ...docs ? [
          {
            href: docs,
            icon: "mdi:book-open-variant",
            label: "Documentation"
          }
        ] : []
      ];
      const menuOpen = !!key && this._fieldMenu?.key === key;
      const highlighted = overridden || (options.actions ?? []).some((action) => action.active);
      return x`<div class="field ${overridden ? "field-overridden" : ""}">
      <div class="field-row">
        <div class="field-content">${content}</div>
        ${actions.length > 0 ? x`<ha-icon-button
                class="field-menu-button ${highlighted ? "highlighted" : ""}"
                .label=${"Field options"}
                title="Field options"
                aria-expanded=${menuOpen}
                @click=${(e) => {
        e.stopPropagation();
        if (key) {
          this._toggleFieldMenu(key, actions, e.currentTarget);
        }
      }}>
                <ha-icon icon="mdi:dots-vertical"></ha-icon>
              </ha-icon-button>` : x`<span class="field-menu-spacer"></span>`}
      </div>
    </div>`;
    }
    async _toggleFieldMenu(key, actions, anchor) {
      const closed = this._lastClosedFieldMenu;
      if (this._fieldMenu?.key === key || closed?.key === key && Date.now() - closed.time < 300) {
        this._closeFieldMenu();
        return;
      }
      this._fieldMenu = { actions, key };
      await this.updateComplete;
      const menu = this._fieldMenuElement;
      if (!menu)
        return;
      menu.showPopover?.();
      this._positionFieldMenu(menu, anchor);
      this._watchScroll(anchor);
    }
    get _fieldMenuElement() {
      return this.shadowRoot?.querySelector(".field-menu") ?? null;
    }
    _positionFieldMenu(menu, anchor) {
      const rect = anchor.getBoundingClientRect();
      const { offsetHeight: height, offsetWidth: width } = menu;
      const left = Math.max(8, Math.min(rect.right - width, window.innerWidth - width - 8));
      const below = rect.bottom + 4;
      const top = below + height > window.innerHeight - 8 ? Math.max(8, rect.top - height - 4) : below;
      menu.style.left = `${left}px`;
      menu.style.top = `${top}px`;
    }
    _watchScroll(anchor) {
      this._unwatchScroll();
      let node = anchor;
      while (node) {
        if (node instanceof Element && /auto|scroll|overlay/.test(getComputedStyle(node).overflowY)) {
          this._scrollContainers.push(node);
        }
        node = node.assignedSlot ?? node.parentNode ?? node.host ?? null;
      }
      this._scrollContainers.push(window);
      for (const container of this._scrollContainers) {
        container.addEventListener("scroll", this._onScroll, { passive: true });
      }
    }
    _unwatchScroll() {
      for (const container of this._scrollContainers) {
        container.removeEventListener("scroll", this._onScroll);
      }
      this._scrollContainers = [];
    }
    _renderFieldMenu() {
      return x`<div
      popover="auto"
      class="field-menu"
      role="menu"
      @toggle=${(e) => {
        if (e.newState === "closed" && this._fieldMenu) {
          this._closeFieldMenu();
        }
      }}>
      ${(this._fieldMenu?.actions ?? []).map((action) => action.href ? x`<a
              role="menuitem"
              class="field-menu-item"
              href=${action.href}
              target="_blank"
              rel="noopener"
              @click=${this._closeFieldMenu}>
              <ha-icon icon=${action.icon}></ha-icon>
              <span>${action.label}</span>
              <ha-icon
                class="field-menu-external"
                icon="mdi:open-in-new"></ha-icon>
            </a>` : x`<button
              type="button"
              role="menuitem"
              class="field-menu-item"
              @click=${() => {
        this._closeFieldMenu();
        action.onClick?.();
      }}>
              <ha-icon icon=${action.icon}></ha-icon>
              <span>${action.label}</span>
            </button>`)}
    </div>`;
    }
    _renderInheritableList(options) {
      const key = options.configKey;
      const templateItems = this._templateConfig ? genericGetProperty(this._templateConfig, key) : undefined;
      if (!templateItems?.length)
        return options.editor();
      if (genericGetProperty(this._config, key) === undefined) {
        return x`<div class="inherited-list">
        <span class="inherited-list-hint">From the template</span>
        ${templateItems.map((item) => {
          const { icon, title, subtitle } = options.renderItem(item);
          return x`<div class="inherited-item">
            <ha-icon icon=${icon}></ha-icon>
            <span class="inherited-item-title">${title}</span>
            ${subtitle ? x`<span class="inherited-item-subtitle">${subtitle}</span>` : x``}
          </div>`;
        })}
        ${this.makeButton({
          icon: "mdi:pencil",
          onClick: () => this.updateConfigByKey(key, structuredClone(templateItems)),
          text: options.customizeLabel
        })}
      </div>`;
      }
      return x`<ha-alert alert-type="info" class="inherited-list-notice">
        This card uses its own list instead of the template's.
        <ha-button
          slot="action"
          size="s"
          appearance="plain"
          @click=${() => this._resetToTemplate(options.configKey)}>
          ${options.resetLabel}
        </ha-button>
      </ha-alert>
      ${options.editor()}`;
    }
    _renderSectionHeader(options) {
      const overrides = (options.configKeys ?? []).reduce((sum, key) => sum + this._countOverrides(key), 0);
      return x`<h4 slot="header">
      <ha-icon icon=${options.icon}></ha-icon>
      <span class="expansion-panel-title">
        ${options.title}
        ${options.subtitle ? x`<span class="expansion-panel-subtitle"
                >${options.subtitle}</span
              >` : x``}
      </span>
      ${overrides > 0 ? x`<span class="override-chip">${plural(overrides, "override")}</span>` : x``}
    </h4>`;
    }
    _usesSharedTemplate() {
      const name = this._config.template;
      return !!name && !!getSharedTemplates()?.[name] && !getNavbarTemplates()?.[name];
    }
    async _saveTemplate(name, config) {
      this._savingTemplate = true;
      this._templateError = undefined;
      try {
        await saveSharedTemplate(this.hass, name, config);
        return true;
      } catch (error) {
        this._templateError = `Could not save the template: ${errorMessage(error)}`;
        return false;
      } finally {
        this._savingTemplate = false;
      }
    }
    _isTemplateMode(configKey) {
      const modeByField = this._templateModeByField[String(configKey)];
      if (modeByField !== undefined)
        return modeByField;
      return isTemplate(this._getValue(configKey));
    }
    _setTemplateMode(configKey, isTemplate) {
      this._templateModeByField = {
        ...this._templateModeByField,
        [String(configKey)]: isTemplate
      };
    }
    makeComboBox(options) {
      return this._renderField(options.configKey, renderDropdown(this._getValue(options.configKey) ?? options.defaultValue ?? null, (value) => {
        this.updateConfigByKey(options.configKey, value);
      }, options), { actions: options.actions });
    }
    makeNavigationPicker(options) {
      return this.makeSelector({
        configKey: options.configKey,
        disabled: options.disabled,
        helper: options.helper,
        label: options.label,
        selector: { navigation: {} }
      });
    }
    makeSelector(options) {
      const value = options.value !== undefined ? options.value : this._getValue(options.configKey) ?? "";
      return this._renderField(options.configKey, x`<ha-selector
        .hass=${this.hass}
        .label=${options.label}
        .helper=${options.helper}
        .selector=${options.selector}
        .value=${value}
        .required=${false}
        .disabled=${options.disabled ?? false}
        @value-changed=${(e) => {
        let next = e.detail.value;
        if (options.mapValue) {
          next = options.mapValue(next);
        }
        this.updateConfigByKey(options.configKey, next === "" || next == null ? null : next);
      }}></ha-selector>`, { actions: options.actions });
    }
    makeTextInput(options) {
      return this.makeSelector({
        actions: options.actions,
        configKey: options.configKey,
        disabled: options.disabled,
        helper: options.helper,
        label: options.label,
        mapValue: options.type === "number" ? (value) => {
          if (value === "" || value == null)
            return null;
          const parsed = parseInt(String(value), 10);
          return Number.isNaN(parsed) ? null : parsed;
        } : undefined,
        selector: {
          text: {
            placeholder: options.placeholder,
            suffix: options.suffix,
            type: options.type ?? "text"
          }
        }
      });
    }
    makeEntityPicker(options) {
      return this.makeSelector({
        actions: options.actions,
        configKey: options.configKey,
        disabled: options.disabled,
        label: options.label,
        selector: {
          entity: {
            filter: options.includeDomains?.length ? { domain: options.includeDomains } : undefined
          }
        }
      });
    }
    makeIconPicker(options) {
      return this.makeSelector({
        actions: options.actions,
        configKey: options.configKey,
        disabled: options.disabled,
        label: options.label,
        selector: { icon: {} }
      });
    }
    makeColorPicker(options) {
      const value = this._getValue(options.configKey);
      const themeColor = typeof value === "string" ? value.match(/^var\(--(.+)-color\)$/) : null;
      return this.makeSelector({
        actions: options.actions,
        configKey: options.configKey,
        disabled: options.disabled,
        label: options.label,
        mapValue: (color) => typeof color === "string" && getComputedStyle(this).getPropertyValue(`--${color}-color`) ? `var(--${color}-color)` : color,
        selector: { ui_color: {} },
        value: themeColor?.[1] ?? value ?? ""
      });
    }
    makeTemplatable(options) {
      const value = this._getValue(options.configKey);
      const isTemplate = this._isTemplateMode(options.configKey);
      const toggleMode = () => {
        const source = typeof value === "string" ? (cleanTemplate(value) ?? "").trim() : "";
        this._setTemplateMode(options.configKey, !isTemplate);
        this.updateConfigByKey(options.configKey, source === "" ? null : isTemplate ? source : wrapTemplate(source));
      };
      const templateAction = {
        active: isTemplate,
        icon: isTemplate ? "mdi:form-textbox" : "mdi:code-braces",
        label: isTemplate ? "Use the visual input" : "Use a JavaScript template",
        onClick: toggleMode
      };
      const common = {
        actions: [templateAction],
        configKey: options.configKey,
        disabled: options.disabled,
        label: options.label
      };
      if (isTemplate) {
        return this.makeTemplateEditor({
          ...common,
          helper: options.templateHelper
        });
      }
      switch (options.inputType) {
        case "string":
          return this.makeTextInput({
            ...common,
            helper: "textHelper" in options ? options.textHelper : undefined,
            placeholder: "placeholder" in options ? options.placeholder : undefined
          });
        case "icon":
          return this.makeIconPicker(common);
        case "switch":
          return this.makeSwitch({
            ...common,
            defaultValue: "defaultValue" in options ? options.defaultValue : undefined,
            helper: "helper" in options ? options.helper : undefined
          });
        case "entity":
          return this.makeEntityPicker({
            ...common,
            includeDomains: "includeDomains" in options ? options.includeDomains : undefined
          });
        case "color":
          return this.makeColorPicker(common);
        default:
          return x``;
      }
    }
    makeTemplateEditor(options) {
      return this._renderField(options.configKey, x`
      <div class="template-editor-container">
        <label class="editor-label">${options.label}</label>
        <ha-code-editor
          autocomplete-entities
          autocomplete-icons
          .hass=${this.hass}
          .value=${cleanTemplate(this._getValue(options.configKey) ?? "")}
          @value-changed=${(e) => {
        this._setTemplateMode(options.configKey, true);
        const templateValue = e.target.value?.trim() === "" ? null : wrapTemplate(e.target.value);
        this.updateConfigByKey(options.configKey, templateValue);
      }}></ha-code-editor>
        ${options.helper ? x`<div class="template-editor-helper">${options.helper}</div>` : x``}
      </div>
    `, { actions: options.actions });
    }
    makeSwitch(options) {
      const checked = Boolean(this._getValue(options.configKey) ?? options.defaultValue ?? false);
      const set = (value) => {
        if (options.disabled)
          return;
        this.updateConfigByKey(options.configKey, value);
      };
      return this._renderField(options.configKey, x`<div
        class="switch-row ${options.disabled ? "disabled" : ""}"
        @click=${(e) => {
        if (e.composedPath().some((el) => el.localName === "ha-switch")) {
          return;
        }
        set(!checked);
      }}>
        <span class="switch-row-text">
          <span class="switch-row-label">${options.label}</span>
          ${options.helper ? x`<span class="switch-row-helper">${options.helper}</span>` : x``}
        </span>
        <ha-switch
          .checked=${checked}
          .disabled=${options.disabled ?? false}
          aria-label=${options.label}
          @change=${(e) => set(e.target.checked)}></ha-switch>
      </div>`, { actions: options.actions });
    }
    makeButton(options) {
      return x`<ha-button
      @click=${options.onClick}
      appearance="outlined"
      variant="brand">
      <ha-icon slot="start" icon=${options.icon}></ha-icon>
      <span>${options.text}</span>
    </ha-button>`;
    }
    _createListDragHandlers(dragData) {
      return {
        onDragEnd: (e) => {
          e.currentTarget.classList.remove("dragging");
        },
        onDragLeave: (e) => {
          e.currentTarget.classList.remove("drag-over");
        },
        onDragOver: (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          e.currentTarget.classList.add("drag-over");
        },
        onDragStart: (e) => {
          e.dataTransfer?.setData("application/json", JSON.stringify(dragData));
          e.dataTransfer.effectAllowed = "move";
          e.currentTarget.classList.add("dragging");
        }
      };
    }
    _renderDraggableItem(options) {
      const handlers = this._createListDragHandlers(options.dragData);
      return x`
      <div
        class="draggable-item"
        @dragover=${handlers.onDragOver}
        @dragleave=${handlers.onDragLeave}
        @drop=${options.onDrop}>
        <ha-expansion-panel
          outlined
          .expanded=${this._expandedItemKey === options.expandKey}>
          <div
            slot="header"
            class="draggable-item-header"
            draggable="true"
            @dragstart=${handlers.onDragStart}
            @dragend=${handlers.onDragEnd}>
            <span class="drag-handle" title="Drag to reorder">
              <ha-icon icon="mdi:drag"></ha-icon>
            </span>
            <span class="draggable-item-header-icon">${options.headerIcon}</span>
            <div class="draggable-item-header-text">
              <span class="draggable-item-header-title"
                >${options.headerTitle}</span
              >
              ${options.headerSubtitle ? x`<span class="draggable-item-header-subtitle"
                      >${options.headerSubtitle}</span
                    >` : x``}
            </div>
            <ha-icon-button
              @click=${(e) => {
        e.preventDefault();
        e.stopPropagation();
        options.onDelete();
      }}
              class="delete-btn"
              label=${options.deleteLabel}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
          <div class="draggable-item-editor">${options.body}</div>
        </ha-expansion-panel>
      </div>
    `;
    }
    _renderItemIcon(item) {
      if (item.image != null && !isTemplate(item.image)) {
        return x`<img src="${item.image}" class="draggable-item-header-image" />`;
      }
      const icon = isTemplate(item.icon) ? processTemplate(this.hass, undefined, item.icon) : item.icon;
      return x`<ha-icon icon=${icon || "mdi:help-circle-outline"}></ha-icon>`;
    }
    _itemLabel(item, fallback) {
      const label = item.label ? processTemplate(this.hass, undefined, item.label) : "";
      return label ? String(label) : fallback;
    }
    _renderActions(baseConfigKey, types = Object.values(HAActions)) {
      const keyFor = (type) => `${baseConfigKey}.${type}`;
      const missing = types.filter((type) => this._getValue(keyFor(type)) == null);
      return x`
      ${types.filter((type) => !missing.includes(type)).map((type) => this.makeActionSelector({
        actionType: type,
        configKey: keyFor(type)
      }))}
      ${missing.length > 0 ? x`<div class="add-actions">
              <span class="add-actions-label">Add action</span>
              ${missing.map((type) => x`<ha-button
                  size="s"
                  appearance="plain"
                  @click=${() => {
        this._expandedItemKey = keyFor(type);
        this.updateConfigByKey(keyFor(type), {
          action: "none"
        });
      }}>
                  <ha-icon
                    slot="start"
                    icon=${ACTION_INFO[type].icon}></ha-icon>
                  ${ACTION_INFO[type].label}
                </ha-button>`)}
            </div>` : x``}
    `;
    }
    isCustomAction(value) {
      if (value === "none")
        return false;
      return Object.values(NavbarCustomActions).includes(value);
    }
    renderTemplateEditor() {
      const dashboardTemplates = getNavbarTemplates() ?? {};
      const name = this._config.template?.trim() || undefined;
      const overrides = this._countAllOverrides();
      const missing = !!name && !this._templateConfig && getSharedTemplates() !== null;
      const kind = name ? dashboardTemplates[name] ? "From this dashboard" : "Shared" : undefined;
      return x`
      <ha-expansion-panel outlined class="template-section">
        <h4 slot="header">
          <ha-icon icon="mdi:bookmark-outline"></ha-icon>
          <span class="expansion-panel-title">
            Template
            <span class="expansion-panel-subtitle">
              ${name ? x`<strong>${name}</strong> · ${missing ? "not found" : kind}${overrides > 0 && this._templateConfig ? ` · ${plural(overrides, "override")} on this card` : ""}` : "None, this card has its own configuration"}
            </span>
          </span>
        </h4>
        <div class="editor-section">
          ${renderDropdown(name ?? null, (value) => this.updateConfigByKey("template", value), {
        allowEmptyValue: true,
        configKey: "template",
        helper: x`Reuse the same navbar in several cards. Shared
                templates work on every dashboard.
                <a href="${DOCS_LINKS.template}" target="_blank" rel="noopener"
                  >Learn more</a
                >`,
        items: Object.keys(getAvailableTemplates()).map((key) => ({
          label: dashboardTemplates[key] ? `${key} (this dashboard)` : `${key} (shared)`,
          value: key
        })),
        label: "Template"
      })}
          ${missing ? x`<ha-alert alert-type="warning">
                  Template "${name}" not found.
                </ha-alert>` : x``}
          ${name && this._templateConfig ? x`<span class="editor-subsection-helper">
                  ${overrides > 0 ? `This card overrides ${plural(overrides, "template option")}. Overridden options are marked, and can be reset one by one from their ⋮ menu.` : "This card uses the template as is. Options you change here override it for this card only."}
                </span>` : x``}
          ${this._showSaveAsTemplate ? x`<div class="template-save-as">
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{ text: {} }}
                    .label=${"Template name"}
                    .required=${false}
                    .helper=${"Saves this navbar as a shared template, used by this card from now on."}
                    .value=${this._newTemplateName}
                    @value-changed=${(e) => {
        this._newTemplateName = e.detail.value ?? "";
        this._templateError = undefined;
      }}></ha-selector>
                  <div class="template-save-as-actions">
                    <ha-button
                      .disabled=${!this._newTemplateName.trim() || this._savingTemplate}
                      @click=${this._saveAsTemplate}>
                      Save template
                    </ha-button>
                    <ha-button
                      appearance="plain"
                      @click=${() => {
        this._showSaveAsTemplate = false;
        this._templateError = undefined;
      }}>
                      Cancel
                    </ha-button>
                  </div>
                </div>` : x`<div class="template-actions">
                  ${this._usesSharedTemplate() ? x`<ha-button
                          size="s"
                          appearance="outlined"
                          @click=${this._startEditingTemplate}>
                          <ha-icon slot="start" icon="mdi:pencil"></ha-icon>
                          Edit template
                        </ha-button>` : x``}
                  ${name && dashboardTemplates[name] ? x`<ha-button
                          size="s"
                          appearance="outlined"
                          .disabled=${this._savingTemplate}
                          @click=${this._moveTemplateToShared}>
                          <ha-icon
                            slot="start"
                            icon="mdi:share-variant-outline"></ha-icon>
                          Move to shared templates
                        </ha-button>` : x``}
                  ${overrides > 0 && this._templateConfig ? x`<ha-button
                          size="s"
                          appearance="outlined"
                          @click=${this._resetToTemplateOnly}>
                          <ha-icon slot="start" icon="mdi:undo-variant"></ha-icon>
                          Reset changes
                        </ha-button>` : x``}
                  <ha-button
                    size="s"
                    appearance="outlined"
                    @click=${() => {
        this._showSaveAsTemplate = true;
      }}>
                    <ha-icon
                      slot="start"
                      icon="mdi:bookmark-plus-outline"></ha-icon>
                    Save as new shared template
                  </ha-button>
                </div>`}
          ${this._renderTemplateError()}
        </div>
      </ha-expansion-panel>
    `;
    }
    _renderTemplateError() {
      return this._templateError ? x`<ha-alert alert-type="error">${this._templateError}</ha-alert>` : x``;
    }
    _renderTemplateDialog() {
      const dialog = this._templateDialog;
      return x`<dialog
      class="template-dialog"
      @cancel=${(e) => {
        e.preventDefault();
        this._closeTemplateDialog();
      }}
      @keydown=${(e) => {
        if (e.key === "Escape")
          e.stopPropagation();
      }}>
      ${dialog ? x`
            <div class="template-dialog-header">
              <span class="template-dialog-title">
                Edit template "${dialog.name}"
                <span class="template-dialog-subtitle">
                  Changes apply to every navbar using it, on all dashboards.
                </span>
              </span>
              <ha-icon-button
                .label=${"Close"}
                @click=${() => this._closeTemplateDialog()}>
                <ha-icon icon="mdi:close"></ha-icon>
              </ha-icon-button>
            </div>
            <div class="template-dialog-body">
              ${dialog.yaml ? x`<ha-yaml-editor
                      .hass=${this.hass}
                      .defaultValue=${dialog.draft}
                      @value-changed=${(e) => {
        e.stopPropagation();
        const { value, isValid } = e.detail;
        const valid = isValid && !!value && typeof value === "object";
        this._templateDialog = {
          ...dialog,
          dirty: true,
          draft: valid ? value : dialog.draft,
          invalidYaml: !valid
        };
      }}></ha-yaml-editor>` : x`<navbar-card-editor
                      .hass=${this.hass}
                      .isTemplateEditor=${true}
                      @config-changed=${(e) => {
        e.stopPropagation();
        this._templateDialog = {
          ...dialog,
          dirty: true,
          draft: e.detail.config
        };
      }}></navbar-card-editor>`}
            </div>
            ${this._renderTemplateError()}
            <div class="template-dialog-actions">
              <ha-button
                class="template-dialog-mode"
                appearance="plain"
                .disabled=${!!dialog.invalidYaml}
                @click=${() => {
        this._templateDialog = { ...dialog, yaml: !dialog.yaml };
      }}>
                ${dialog.yaml ? "Show visual editor" : "Show code editor"}
              </ha-button>
              <ha-button
                appearance="plain"
                .disabled=${this._savingTemplate}
                @click=${() => this._closeTemplateDialog()}>
                Cancel
              </ha-button>
              <ha-button
                .disabled=${this._savingTemplate || !!dialog.invalidYaml}
                @click=${this._saveTemplateDialog}>
                Save template
              </ha-button>
            </div>
          ` : x``}
    </dialog>`;
    }
    updated(changedProperties) {
      super.updated(changedProperties);
      if (!changedProperties.has("_templateDialog"))
        return;
      const dialog = this.shadowRoot?.querySelector(".template-dialog");
      if (!dialog)
        return;
      const previous = changedProperties.get("_templateDialog");
      const current = this._templateDialog;
      if (current && !current.yaml && (!previous || previous.yaml)) {
        dialog.querySelector("navbar-card-editor")?.setConfig(current.draft);
      }
      if (current && !dialog.open)
        dialog.showModal?.();
      if (!current && dialog.open)
        dialog.close();
    }
    _renderGroup(caption, content, options = {}) {
      return x`<div class="group">
      ${caption ? x`<div class="group-caption">
              <span class="group-title">${caption}</span>
              ${options.helper ? x`<span class="group-helper">${options.helper}</span>` : x``}
            </div>` : x``}
      <div class=${options.switches ? "switch-list" : "group-fields"}>
        ${content}
      </div>
    </div>`;
    }
    renderAdvancedSection() {
      const autoPaddingEnabled = this._getValue("layout.auto_padding.enabled") ?? DEFAULT_NAVBAR_CONFIG.layout?.auto_padding?.enabled;
      const hapticRawValue = this._getValue("haptic");
      const hapticValue = typeof hapticRawValue === "boolean" ? hapticRawValue : undefined;
      const hapticDefaults = DEFAULT_NAVBAR_CONFIG.haptic;
      return x`
      <ha-expansion-panel outlined>
        ${this._renderSectionHeader({
        configKeys: ["layout.auto_padding", "haptic", "styles"],
        icon: "mdi:tune-variant",
        subtitle: "Padding, haptic feedback and CSS",
        title: "Advanced"
      })}
        <div class="editor-section">
          ${this._renderGroup("Auto padding", x`
              <div class="switch-list">
                ${this.makeSwitch({
        configKey: "layout.auto_padding.enabled",
        defaultValue: DEFAULT_NAVBAR_CONFIG.layout?.auto_padding?.enabled,
        label: "Reserve space for the navbar"
      })}
              </div>
              <div class="editor-row">
                ${[
        ["desktop_px", "Desktop"],
        ["mobile_px", "Mobile"],
        ["media_player_px", "Media player"]
      ].map(([option, label]) => x`<div class="editor-row-item">
                    ${this.makeTextInput({
        configKey: `layout.auto_padding.${option}`,
        disabled: !autoPaddingEnabled,
        label,
        placeholder: DEFAULT_NAVBAR_CONFIG.layout?.auto_padding?.[option]?.toString(),
        suffix: "px",
        type: "number"
      })}
                  </div>`)}
              </div>
            `, {
        helper: "Space added to the dashboard so the navbar doesn't cover it."
      })}
          ${this._renderGroup("Haptic feedback", x`${[
        ["url", "Navigates to its URL"],
        ["tap_action", "Runs its tap action"],
        ["hold_action", "Runs its hold action"],
        ["double_tap_action", "Runs its double tap action"]
      ].map(([option, label]) => this.makeSwitch({
        configKey: `haptic.${option}`,
        defaultValue: hapticValue ?? hapticDefaults[option],
        label
      }))}`, {
        helper: "Vibrate the device (where supported) when a route…",
        switches: true
      })}
          ${this._renderGroup("Custom CSS", this._renderField("styles", x`<ha-code-editor
                mode="yaml"
                autocomplete-entities
                autocomplete-icons
                .hass=${this.hass}
                .value=${this._getValue("styles") ?? ""}
                @value-changed=${(e) => {
        const trimmedStyles = e.target.value?.trim() === "" ? null : e.target.value;
        this.updateConfig({ styles: trimmedStyles });
      }}></ha-code-editor>`), {
        helper: x`Change the look of the navbar, without the
                <code>styles: |</code> prefix.`
      })}
        </div>
      </ha-expansion-panel>
    `;
    }
    renderMediaPlayerEditor() {
      const players = this._config.media_player?.players ?? [];
      return x`
      <ha-expansion-panel outlined>
        ${this._renderSectionHeader({
        configKeys: ["media_player"],
        icon: "mdi:music",
        subtitle: "Players shown while media plays",
        title: "Media player"
      })}
        <div class="editor-section">
          ${this._renderGroup("Players", this._renderInheritableList({
        configKey: "media_player.players",
        customizeLabel: "Customize players for this card",
        editor: () => x`
                <div class="routes-container">
                  ${players.map((player, i) => this.makeDraggablePlayerEditor(player, i))}
                </div>
                ${this.makeButton({
          icon: "mdi:plus",
          onClick: () => this.addMediaPlayer(),
          text: "Add player"
        })}
              `,
        renderItem: (player) => {
          const entity = processTemplate(this.hass, undefined, player.entity);
          return {
            icon: "mdi:speaker",
            subtitle: entity,
            title: this.hass?.states?.[entity]?.attributes?.friendly_name ?? entity
          };
        },
        resetLabel: "Use template"
      }), {
        helper: "Shown while one of them is playing or paused. With several players, swipe between them."
      })}
          ${this._renderGroup("Settings", x`
              ${this.makeComboBox({
        configKey: "media_player.desktop_position",
        defaultValue: DEFAULT_NAVBAR_CONFIG.media_player?.desktop_position,
        helper: "Where the player appears on desktop.",
        items: [
          { label: "Top left", value: "top-left" /* topLeft */ },
          { label: "Top center", value: "top-center" /* topCenter */ },
          { label: "Top right", value: "top-right" /* topRight */ },
          { label: "Bottom left", value: "bottom-left" /* bottomLeft */ },
          {
            label: "Bottom center",
            value: "bottom-center" /* bottomCenter */
          },
          { label: "Bottom right", value: "bottom-right" /* bottomRight */ }
        ],
        label: "Desktop position"
      })}
              <div class="switch-list">
                ${this.makeTemplatable({
        configKey: "media_player.show",
        defaultValue: true,
        helper: "Turn off to never show it, or use a template to choose when.",
        inputType: "switch",
        label: "Show the media player",
        templateHelper: BOOLEAN_JS_TEMPLATE_HELPER
      })}
                ${this.makeSwitch({
        configKey: "media_player.album_cover_background",
        defaultValue: DEFAULT_NAVBAR_CONFIG.media_player?.album_cover_background,
        helper: "Shows the cover of what is playing behind the player.",
        label: "Album art as background"
      })}
              </div>
            `)}
        </div>
      </ha-expansion-panel>
    `;
    }
    makeDraggablePlayerEditor(player, playerIndex) {
      const baseConfigKey = `media_player.players.${playerIndex}`;
      const entity = processTemplate(this.hass, undefined, player.entity);
      const onDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("drag-over");
        const dragData = JSON.parse(e.dataTransfer?.getData("application/json") || "{}");
        const fromIndex = dragData.playerIndex;
        if (typeof fromIndex !== "number" || fromIndex === playerIndex)
          return;
        const players = [...this._config.media_player?.players ?? []];
        const [moved] = players.splice(fromIndex, 1);
        players.splice(playerIndex, 0, moved);
        this.updateConfig({
          media_player: {
            ...this._config.media_player,
            players
          }
        });
      };
      return this._renderDraggableItem({
        body: x`
          ${this.makeTemplatable({
          configKey: `${baseConfigKey}.entity`,
          includeDomains: ["media_player"],
          inputType: "entity",
          label: "Media player entity"
        })}
          ${this.makeTemplateEditor({
          configKey: `${baseConfigKey}.show`,
          helper: BOOLEAN_JS_TEMPLATE_HELPER,
          label: "Show"
        })}
          ${this.makeTemplatable({
          configKey: `${baseConfigKey}.icon`,
          inputType: "icon",
          label: "Icon",
          templateHelper: STRING_JS_TEMPLATE_HELPER
        })}
          ${this.makeTemplatable({
          configKey: `${baseConfigKey}.title`,
          inputType: "string",
          label: "Title",
          templateHelper: STRING_JS_TEMPLATE_HELPER
        })}
          ${this.makeTemplatable({
          configKey: `${baseConfigKey}.subtitle`,
          inputType: "string",
          label: "Subtitle",
          templateHelper: STRING_JS_TEMPLATE_HELPER
        })}
          ${this._renderActions(baseConfigKey)}
      `,
        deleteLabel: "Delete player",
        dragData: { playerIndex },
        expandKey: baseConfigKey,
        headerIcon: x`<ha-icon
        icon=${(player.icon && !isTemplate(player.icon) ? player.icon : null) ?? "mdi:speaker"}></ha-icon>`,
        headerSubtitle: entity || undefined,
        headerTitle: entity && this.hass?.states?.[entity]?.attributes?.friendly_name || entity || "No entity selected",
        onDelete: () => this.removeMediaPlayer(playerIndex),
        onDrop
      });
    }
    renderAppearanceSection() {
      const device = this._appearanceDevice;
      const labelVisibility = this._getValue(`${device}.show_labels`) ?? DEFAULT_NAVBAR_CONFIG[device]?.show_labels;
      return x`
      <ha-expansion-panel outlined>
        ${this._renderSectionHeader({
        configKeys: ["desktop", "mobile"],
        icon: "mdi:palette-outline",
        subtitle: "Position, labels and visibility",
        title: "Appearance"
      })}
        <div class="editor-section">
          ${this._renderSegmented({
        onChange: (value) => {
          this._appearanceDevice = value;
        },
        options: [
          {
            badge: this._countOverrides("desktop"),
            icon: "mdi:laptop",
            label: "Desktop",
            value: "desktop"
          },
          {
            badge: this._countOverrides("mobile"),
            icon: "mdi:cellphone",
            label: "Mobile",
            value: "mobile"
          }
        ],
        value: device
      })}
          ${this._renderGroup("Layout", x`
              ${this.makeComboBox({
        configKey: `${device}.mode`,
        defaultValue: DEFAULT_NAVBAR_CONFIG[device]?.mode,
        items: [
          { label: "Floating", value: "floating" },
          { label: "Docked", value: "docked" }
        ],
        label: "Style"
      })}
              ${device === "desktop" ? x`<div class="editor-row">
                      <div class="editor-row-item">
                        ${this.makeComboBox({
        configKey: "desktop.position",
        defaultValue: DEFAULT_NAVBAR_CONFIG.desktop?.position,
        items: [
          { label: "Top", value: "top" /* top */ },
          { label: "Bottom", value: "bottom" /* bottom */ },
          { label: "Left", value: "left" /* left */ },
          { label: "Right", value: "right" /* right */ }
        ],
        label: "Position"
      })}
                      </div>
                      <div class="editor-row-item">
                        ${this.makeTextInput({
        configKey: "desktop.min_width",
        helper: "Desktop layout from this screen width.",
        label: "Min width",
        placeholder: DEFAULT_NAVBAR_CONFIG.desktop?.min_width?.toString(),
        suffix: "px",
        type: "number"
      })}
                      </div>
                    </div>` : x`<div class="switch-list">
                      ${this.makeSwitch({
        configKey: "mobile.safe_area",
        defaultValue: DEFAULT_NAVBAR_CONFIG.mobile?.safe_area,
        helper: "Keeps the navbar clear of the notch and home bar.",
        label: "Respect the safe area"
      })}
                    </div>`}
            `)}
          ${this._renderGroup("Labels", x`
              ${this.makeComboBox({
        configKey: `${device}.show_labels`,
        defaultValue: DEFAULT_NAVBAR_CONFIG[device]?.show_labels,
        items: [
          { label: "Always", value: true },
          { label: "Never", value: false },
          { label: "In popups only", value: "popup_only" },
          { label: "In routes only", value: "routes_only" }
        ],
        label: "Show labels"
      })}
              ${[true, "popup_only"].includes(labelVisibility) ? x`<div class="switch-list">
                      ${this.makeSwitch({
        configKey: `${device}.show_popup_label_backgrounds`,
        defaultValue: DEFAULT_NAVBAR_CONFIG[device]?.show_popup_label_backgrounds,
        label: "Background behind popup labels"
      })}
                    </div>` : x``}
            `)}
          ${this._renderGroup("Visibility", this.makeTemplatable({
        configKey: `${device}.hidden`,
        inputType: "switch",
        label: device === "desktop" ? "Hide on desktop" : "Hide on mobile",
        templateHelper: BOOLEAN_JS_TEMPLATE_HELPER
      }), { switches: true })}
        </div>
      </ha-expansion-panel>
    `;
    }
    _renderSegmented(options) {
      return x`<div class="segmented" role="radiogroup">
      ${options.options.map((option) => x`<button
          type="button"
          role="radio"
          aria-checked=${option.value === options.value}
          class="segmented-option ${option.value === options.value ? "active" : ""}"
          @click=${() => options.onChange(option.value)}>
          ${option.icon ? x`<ha-icon icon=${option.icon}></ha-icon>` : x``}
          ${option.label}
          ${option.badge ? x`<span class="segmented-badge">${option.badge}</span>` : x``}
        </button>`)}
    </div>`;
    }
    renderRoutesSection() {
      return x`
      <ha-expansion-panel outlined expanded>
        ${this._renderSectionHeader({
        configKeys: ["routes", "layout.reflect_child_state"],
        icon: "mdi:routes",
        title: "Routes"
      })}
        <div class="editor-section">
          ${this._renderInheritableList({
        configKey: "routes",
        customizeLabel: "Customize routes for this card",
        editor: () => x`
              <div class="item-list">
                ${(this._config.routes ?? []).map((route, i) => this._renderItemRow(route, i))}
              </div>
              ${this.makeButton({
          icon: "mdi:plus",
          onClick: () => {
            this.addRouteOrPopup();
            this._openItem = {
              routeIndex: this._config.routes.length - 1
            };
          },
          text: "Add route"
        })}
            `,
        renderItem: (route) => ({
          icon: route.image != null ? "mdi:image" : processTemplate(this.hass, undefined, route.icon) ?? "mdi:help-circle-outline",
          subtitle: this._itemSummary(route),
          title: this._itemLabel(route, "Route")
        }),
        resetLabel: "Use template"
      })}
          <div class="switch-list">
            ${this.makeSwitch({
        configKey: "layout.reflect_child_state",
        defaultValue: DEFAULT_NAVBAR_CONFIG.layout?.reflect_child_state,
        helper: "When one of its popup items is selected.",
        label: "Show routes as selected"
      })}
          </div>
        </div>
      </ha-expansion-panel>
    `;
    }
    _itemSummary(item) {
      switch (this._tapMode(item)) {
        case "popup": {
          const popup = item.popup;
          if (isTemplate(popup))
            return "Popup from a template";
          const count = Array.isArray(popup) ? popup.length : 0;
          return `Popup · ${plural(count, "item")}`;
        }
        case "action": {
          const action = item.tap_action?.action;
          return action ? `Action · ${action.replace(/[-_]/g, " ")}` : "Action";
        }
        default:
          return typeof item.url === "string" ? item.url : undefined;
      }
    }
    _renderItemRow(item, routeIndex, popupIndex) {
      const popupOf = popupIndex == null ? undefined : routeIndex;
      const index = popupIndex ?? routeIndex;
      const listLength = popupOf == null ? this._config.routes.length : this._config.routes[popupOf].popup.length;
      const drop = this._dropTarget;
      const target = drop && drop.popupOf === popupOf ? drop.index : null;
      const open = () => {
        this._openItem = { popupIndex, routeIndex };
      };
      return x`<div
      class="item-row ${target === index ? "drop-before" : ""} ${target === listLength && index === listLength - 1 ? "drop-after" : ""}"
      role="button"
      tabindex="0"
      @click=${open}
      @keydown=${(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      @dragover=${(e) => {
        if (!this._draggedItem || this._draggedItem.popupOf !== popupOf) {
          return;
        }
        e.preventDefault();
        const next = dropIndex(e, index);
        if (this._dropTarget?.index !== next) {
          this._dropTarget = { index: next, popupOf };
        }
      }}
      @drop=${(e) => {
        e.preventDefault();
        this._moveDraggedItem();
      }}>
      <span
        class="drag-handle"
        title="Drag to reorder"
        draggable="true"
        @click=${(e) => e.stopPropagation()}
        @dragstart=${(e) => {
        if (e.dataTransfer) {
          e.dataTransfer.setData("text/plain", "");
          e.dataTransfer.effectAllowed = "move";
        }
        this._draggedItem = { index, popupOf };
      }}
        @dragend=${() => {
        this._draggedItem = undefined;
        this._dropTarget = null;
      }}>
        <ha-icon icon="mdi:drag"></ha-icon>
      </span>
      <span class="item-row-icon">${this._renderItemIcon(item)}</span>
      <span class="item-row-text">
        <span class="item-row-title"
          >${this._itemLabel(item, popupIndex == null ? "Route" : "Popup item")}</span
        >
        <span class="item-row-subtitle">${this._itemSummary(item) ?? ""}</span>
      </span>
      <ha-icon class="item-row-chevron" icon="mdi:chevron-right"></ha-icon>
    </div>`;
    }
    _moveDraggedItem() {
      const from = this._draggedItem;
      const target = this._dropTarget;
      this._draggedItem = undefined;
      this._dropTarget = null;
      if (!(from && target) || from.popupOf !== target.popupOf)
        return;
      const move = (list) => {
        const to = from.index < target.index ? target.index - 1 : target.index;
        const [moved] = list.splice(from.index, 1);
        list.splice(to, 0, moved);
        return list;
      };
      const routes = [...this._config.routes];
      if (target.popupOf == null) {
        this.updateConfig({ routes: move(routes) });
      } else {
        const route = routes[target.popupOf];
        routes[target.popupOf] = {
          ...route,
          popup: move([...route.popup])
        };
        this.updateConfig({ routes });
      }
    }
    _tapMode(item) {
      const action = item.tap_action?.action;
      if (action === "open-popup" /* openPopup */)
        return "popup";
      return action ? "action" : "navigate";
    }
    _setTapMode(baseConfigKey, item, mode) {
      const tapKey = `${baseConfigKey}.tap_action`;
      if (mode === "navigate") {
        this.updateConfigByKey(tapKey, null);
      } else if (mode === "popup") {
        this._config = genericSetProperty(this._config, `${baseConfigKey}.popup`, item.popup ?? []);
        this.updateConfigByKey(tapKey, {
          action: "open-popup" /* openPopup */
        });
      } else {
        this.updateConfigByKey(tapKey, { action: "none" });
      }
    }
    renderItemView() {
      const { routeIndex, popupIndex } = this._openItem ?? {};
      const route = routeIndex != null ? this._config.routes?.[routeIndex] : null;
      const item = popupIndex != null ? route?.popup?.[popupIndex] ?? null : route;
      if (routeIndex == null || !item)
        return x``;
      const isPopup = popupIndex != null;
      const baseConfigKey = isPopup ? `routes.${routeIndex}.popup.${popupIndex}` : `routes.${routeIndex}`;
      const key = (field) => `${baseConfigKey}.${field}`;
      const mode = this._tapMode(item);
      const goBack = () => {
        this._openItem = isPopup ? { routeIndex } : null;
      };
      return x`
      <div class="item-view">
        <div class="item-view-header">
          <ha-icon-button .label=${"Back"} @click=${goBack}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </ha-icon-button>
          <span class="item-view-title">
            ${this._itemLabel(item, isPopup ? "Popup item" : "Route")}
            <span class="item-view-subtitle">
              ${isPopup ? `Popup item of ${this._itemLabel(route, "route")}` : `Route ${routeIndex + 1}`}
            </span>
          </span>
          <ha-icon-button
            class="delete-btn"
            .label=${isPopup ? "Delete popup item" : "Delete route"}
            title=${isPopup ? "Delete popup item" : "Delete route"}
            @click=${() => {
        goBack();
        this.removeRouteOrPopup(routeIndex, popupIndex);
      }}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </ha-icon-button>
        </div>

        <div class="editor-section">
          <div class="editor-row">
            <div class="editor-row-item">
              ${this.makeTemplatable({
        configKey: key("icon"),
        inputType: "icon",
        label: "Icon",
        templateHelper: STRING_JS_TEMPLATE_HELPER
      })}
            </div>
            <div class="editor-row-item">
              ${this.makeTemplatable({
        configKey: key("label"),
        inputType: "string",
        label: "Label",
        templateHelper: STRING_JS_TEMPLATE_HELPER
      })}
            </div>
          </div>

          ${this._renderGroup("When tapped", x`
              ${this._renderSegmented({
        onChange: (value) => this._setTapMode(baseConfigKey, item, value),
        options: [
          {
            icon: "mdi:link-variant",
            label: "Navigate",
            value: "navigate"
          },
          ...isPopup ? [] : [
            {
              icon: "mdi:menu",
              label: "Open popup",
              value: "popup"
            }
          ],
          { icon: "mdi:gesture-tap", label: "Action", value: "action" }
        ],
        value: mode
      })}
              ${mode === "navigate" ? this.makeNavigationPicker({
        configKey: key("url"),
        label: "Page"
      }) : mode === "popup" ? this._renderPopupItems(route, routeIndex) : this.makeActionSelector({
        actionType: "tap_action" /* tap_action */,
        configKey: key("tap_action"),
        disabledActions: ["open-popup" /* openPopup */],
        inline: true
      })}
            `)}

          <ha-expansion-panel outlined>
            ${this._renderSubsectionHeader("mdi:star-circle-outline", "Badge", item.badge ? "On" : "Off")}
            <div class="editor-section">
              ${this._renderGroup(null, this.makeTemplatable({
        configKey: key("badge.show"),
        helper: "A small dot, count or icon on the route.",
        inputType: "switch",
        label: "Show a badge",
        templateHelper: BOOLEAN_JS_TEMPLATE_HELPER
      }), { switches: true })}
              ${this._renderGroup("Content", x`<div class="editor-row">
                  <div class="editor-row-item">
                    ${this.makeTemplatable({
        configKey: key("badge.count"),
        inputType: "string",
        label: "Count or text",
        templateHelper: STRING_JS_TEMPLATE_HELPER
      })}
                  </div>
                  <div class="editor-row-item">
                    ${this.makeTemplatable({
        configKey: key("badge.icon"),
        inputType: "icon",
        label: "Icon",
        templateHelper: STRING_JS_TEMPLATE_HELPER
      })}
                  </div>
                </div>`, { helper: "Leave both empty for a plain dot." })}
              ${this._renderGroup("Colors", x`
                  ${this.makeTemplatable({
        configKey: key("badge.color"),
        inputType: "color",
        label: "Background",
        templateHelper: STRING_JS_TEMPLATE_HELPER
      })}
                  ${this.makeTemplatable({
        configKey: key("badge.text_color"),
        inputType: "color",
        label: "Count or text",
        templateHelper: STRING_JS_TEMPLATE_HELPER
      })}
                  ${this.makeTemplatable({
        configKey: key("badge.icon_color"),
        inputType: "color",
        label: "Icon",
        templateHelper: STRING_JS_TEMPLATE_HELPER
      })}
                `, {
        helper: "Optional. The badge is red by default, and its count, text and icon turn black or white to stay readable on any background."
      })}
            </div>
          </ha-expansion-panel>

          <ha-expansion-panel outlined>
            ${this._renderSubsectionHeader("mdi:dots-horizontal", "More options", "Look, selected state, hold")}
            <div class="editor-section">
              ${this._renderGroup("Look", x`
                  ${this.makeTemplatable({
        configKey: key("icon_color"),
        inputType: "color",
        label: "Icon color",
        templateHelper: STRING_JS_TEMPLATE_HELPER
      })}
                  ${this.makeTemplatable({
        configKey: key("image"),
        inputType: "string",
        label: "Image",
        placeholder: "/local/image.png",
        templateHelper: STRING_JS_TEMPLATE_HELPER,
        textHelper: "Shown instead of the icon."
      })}
                `)}
              ${this._renderGroup("When selected", x`
                  ${mode === "navigate" ? x`` : this.makeNavigationPicker({
        configKey: key("url"),
        helper: "Selected while on this page.",
        label: "Page"
      })}
                  <div class="editor-row">
                    <div class="editor-row-item">
                      ${this.makeTemplatable({
        configKey: key("icon_selected"),
        inputType: "icon",
        label: "Icon",
        templateHelper: STRING_JS_TEMPLATE_HELPER
      })}
                    </div>
                    <div class="editor-row-item">
                      ${this.makeTemplatable({
        configKey: key("image_selected"),
        inputType: "string",
        label: "Image",
        placeholder: "/local/image.png",
        templateHelper: STRING_JS_TEMPLATE_HELPER
      })}
                    </div>
                  </div>
                  ${this.makeTemplatable({
        configKey: key("selected_color"),
        inputType: "color",
        label: "Color",
        templateHelper: STRING_JS_TEMPLATE_HELPER
      })}
                  ${isPopup ? x`` : x`<div class="switch-list">
                          ${this.makeTemplatable({
        configKey: key("selected"),
        helper: "Instead of following the current page.",
        inputType: "switch",
        label: "Always selected",
        templateHelper: BOOLEAN_JS_TEMPLATE_HELPER
      })}
                        </div>`}
                `, { helper: "While on its page, or when always selected." })}
              ${this._renderGroup("Visibility", this.makeTemplatable({
        configKey: key("hidden"),
        inputType: "switch",
        label: "Hide",
        templateHelper: BOOLEAN_JS_TEMPLATE_HELPER
      }), { switches: true })}
              ${this._renderGroup("Other gestures", this._renderActions(baseConfigKey, [
        "hold_action" /* hold_action */,
        "double_tap_action" /* double_tap_action */
      ]))}
            </div>
          </ha-expansion-panel>
        </div>
      </div>
    `;
    }
    _renderPopupItems(route, routeIndex) {
      const popupKey = `routes.${routeIndex}.popup`;
      const usesTemplate = isTemplate(route.popup);
      const toggleLabel = usesTemplate ? "Use the visual editor" : "Use a JavaScript template";
      return x`<div class="popup-items">
      <div class="popup-items-header">
        <span class="editor-label">Popup items</span>
        <ha-icon-button
          class="templatable-field-toggle ${usesTemplate ? "active" : ""}"
          .label=${toggleLabel}
          title=${toggleLabel}
          @click=${() => {
        if (usesTemplate) {
          let parsed = [];
          try {
            parsed = JSON.parse(cleanTemplate(route.popup?.toString()) ?? "[]");
          } catch (_e) {
            parsed = [];
          }
          this.updateConfigByKey(popupKey, parsed);
        } else {
          this.updateConfigByKey(popupKey, wrapTemplate(JSON.stringify(route.popup ?? [], null, 2)));
        }
      }}>
          <ha-icon
            icon=${usesTemplate ? "mdi:form-textbox" : "mdi:code-braces"}></ha-icon>
        </ha-icon-button>
      </div>
      ${usesTemplate ? this.makeTemplateEditor({
        configKey: popupKey,
        helper: GENERIC_JS_TEMPLATE_HELPER,
        label: "Popup"
      }) : x`<div class="item-list">
                ${(route.popup ?? []).map((popupItem, index) => this._renderItemRow(popupItem, routeIndex, index))}
              </div>
              ${this.makeButton({
        icon: "mdi:plus",
        onClick: () => {
          this.addRouteOrPopup(routeIndex);
          const popup = this._config.routes[routeIndex].popup;
          this._openItem = {
            popupIndex: popup.length - 1,
            routeIndex
          };
        },
        text: "Add popup item"
      })}`}
    </div>`;
    }
    _renderSubsectionHeader(icon, title, summary) {
      return x`<h5 slot="header">
      <ha-icon icon=${icon}></ha-icon>
      <span class="expansion-panel-title">${title}</span>
      <span class="expansion-panel-summary">${summary}</span>
    </h5>`;
    }
    makeActionSelector(options) {
      const ACTIONS = [
        { label: "Home Assistant action", value: "hass_action" },
        { label: "Open popup", value: "open-popup" /* openPopup */ },
        { label: "Navigate back", value: "navigate-back" /* navigateBack */ },
        { label: "Toggle sidebar", value: "toggle-menu" /* toggleMenu */ },
        { label: "Open quick bar", value: "quickbar" /* quickbar */ },
        {
          label: "Edit dashboard",
          value: "open-edit-mode" /* openEditMode */
        },
        { label: "Log out", value: "logout" /* logout */ },
        {
          label: "Run JavaScript",
          value: "custom-js-action" /* customJSAction */
        },
        {
          label: "Show notifications",
          value: "show-notifications" /* showNotifications */
        }
      ].filter((action) => !options.disabledActions?.includes(action.value));
      const raw = this._getValue(options.configKey);
      const selected = this.isCustomAction(raw?.action) ? raw?.action : "hass_action";
      const body = x`
          ${renderDropdown(selected, (newSel) => {
        if (!newSel || newSel === selected)
          return;
        this.updateConfigByKey(options.configKey, {
          action: newSel === "hass_action" ? "none" : newSel
        });
      }, {
        configKey: options.configKey,
        disabled: options.disabled,
        items: ACTIONS,
        label: "Action type"
      })}

          ${selected === "quickbar" /* quickbar */ ? x`
                ${this._renderSegmented({
        onChange: (mode) => {
          this.updateConfigByKey(options.configKey, {
            action: "quickbar" /* quickbar */,
            ...mode === "search" ? {} : { mode }
          });
        },
        options: QUICKBAR_MODES2,
        value: raw?.mode ?? "search"
      })}
              ` : x``}
          ${selected === "custom-js-action" /* customJSAction */ ? this.makeTemplateEditor({
        configKey: `${options.configKey}.code`,
        helper: GENERIC_JS_TEMPLATE_HELPER,
        label: "Code"
      }) : x``}
          ${selected === "hass_action" ? x`
                <ha-form
                  .hass=${this.hass}
                  .data=${typeof raw === "object" ? { action: raw } : {}}
                  .schema=${[
        {
          label: ACTION_INFO[options.actionType].label,
          name: "action",
          required: true,
          selector: {
            ui_action: {
              default_action: "none"
            }
          }
        }
      ]}
                  @value-changed=${(ev) => {
        const formValue = ev.detail.value;
        const flatValue = formValue.action && typeof formValue.action === "object" ? formValue.action : formValue;
        this.updateConfigByKey(options.configKey, flatValue.action != null ? flatValue : { action: "none" });
      }}></ha-form>
              ` : x``}
          ${selected === "hass_action" && ACTIONS_WITH_CUSTOM_ENTITY.includes(raw?.action) ? this.makeEntityPicker({
        configKey: `${options.configKey}.entity`,
        disabled: options.disabled,
        label: ""
      }) : x``}
`;
      if (options.inline)
        return x`<div class="action-inline">${body}</div>`;
      return x`
      <ha-expansion-panel
        outlined
        .expanded=${this._expandedItemKey === options.configKey}>
        <h5 slot="header" style="display: flex; flex-direction: row">
          <div class="expansion-panel-title">
            <ha-icon
              icon=${ACTION_INFO[options.actionType].icon}></ha-icon>
            ${ACTION_INFO[options.actionType].label}
          </div>
          <ha-icon-button
            .label=${`Remove ${options.actionType}`}
            class="delete-btn"
            @click=${(e) => {
        e.stopPropagation();
        this.updateConfigByKey(options.configKey, null);
      }}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </ha-icon-button>
        </h5>
        <div class="editor-section">${body}</div>
      </ha-expansion-panel>
    `;
    }
    render() {
      return x`
    ${conditionallyRender(!this._loadingComponents, () => x`
      <div class="navbar-editor">
        ${this._openItem ? this.renderItemView() : x`
              ${this.isTemplateEditor ? x`` : this.renderTemplateEditor()}
              ${this.renderRoutesSection()}
              ${this.renderAppearanceSection()}
              ${this.renderMediaPlayerEditor()}
              ${this.renderAdvancedSection()}
            `}
      </div>
      ${this._renderFieldMenu()} ${this._renderTemplateDialog()}
    `)}`;
    }
    static styles = getEditorStyles();
  };
  __legacyDecorateClassTS([
    n4({ attribute: false })
  ], NavbarCardEditor.prototype, "hass", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_config", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_loadingComponents", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_templateModeByField", undefined);
  __legacyDecorateClassTS([
    n4({ attribute: false })
  ], NavbarCardEditor.prototype, "isTemplateEditor", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_templateDialog", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_newTemplateName", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_showSaveAsTemplate", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_openItem", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_appearanceDevice", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_dropTarget", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_fieldMenu", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_templateError", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_savingTemplate", undefined);
  NavbarCardEditor = __legacyDecorateClassTS([
    t3("navbar-card-editor")
  ], NavbarCardEditor);
});

// src/navbar-card.ts
init_lit();
init_decorators();

// src/components/media-player.ts
init_lit();

// node_modules/lit-html/directives/class-map.js
init_lit_html();

// node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e5 = (t) => (...e) => ({ _$litDirective$: t, values: e });

class i5 {
  constructor(t) {}
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}

// node_modules/lit-html/directives/class-map.js
var e6 = e5(class extends i5 {
  constructor(t) {
    if (super(t), t.type !== t4.ATTRIBUTE || t.name !== "class" || t.strings?.length > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((s) => t[s]).join(" ") + " ";
  }
  update(s, [i]) {
    if (this.st === undefined) {
      this.st = new Set, s.strings !== undefined && (this.nt = new Set(s.strings.join(" ").split(/\s/).filter((t) => t !== "")));
      for (const t in i)
        i[t] && !this.nt?.has(t) && this.st.add(t);
      return this.render(i);
    }
    const r = s.element.classList;
    for (const t of this.st)
      t in i || (r.remove(t), this.st.delete(t));
    for (const t in i) {
      const s = !!i[t];
      s === this.st.has(t) || this.nt?.has(t) || (s ? (r.add(t), this.st.add(t)) : (r.remove(t), this.st.delete(t)));
    }
    return T;
  }
});
// node_modules/lit-html/directives/keyed.js
init_lit_html();

// node_modules/lit-html/directive-helpers.js
init_lit_html();
var { I: t5 } = Z;
var u3 = {};
var m2 = (o, t = u3) => o._$AH = t;

// node_modules/lit-html/directives/keyed.js
var i6 = e5(class extends i5 {
  constructor() {
    super(...arguments), this.key = E;
  }
  render(r, t) {
    return this.key = r, t;
  }
  update(r, [t, e]) {
    return t !== this.key && (m2(r), this.key = t), e;
  }
});
// src/lib/event-detection.ts
init_action_handler();
var LONG_PRESS_DELAY = 500;
var DOUBLE_TAP_DELAY = 250;

class EventDetectionDirective extends i5 {
  constructor(partInfo) {
    super(partInfo);
    this.lastTapTime = 0;
    this.holdTriggered = false;
    this.boundHandlers = {};
    if (partInfo.type !== t4.ELEMENT) {
      throw new Error("The `eventDetection` directive can only be used on elements.");
    }
  }
  render(_config) {
    return;
  }
  update(part, [config]) {
    const element = part.element;
    this.abortController?.abort();
    this.abortController = new AbortController;
    const { signal } = this.abortController;
    if (!(config.tap || config.hold || config.doubleTap))
      return;
    this.boundHandlers.tap = config.tap ? (ev, target) => executeAction({
      action: config.tap,
      actionType: "tap",
      context: config.context,
      data: { popupItem: config.popupItem, route: config.route },
      target: target ?? ev.currentTarget
    }) : undefined;
    this.boundHandlers.hold = config.hold ? (ev, target) => executeAction({
      action: config.hold,
      actionType: "hold",
      context: config.context,
      data: { popupItem: config.popupItem, route: config.route },
      target: target ?? ev.currentTarget
    }) : undefined;
    this.boundHandlers.doubleTap = config.doubleTap ? (ev, target) => executeAction({
      action: config.doubleTap,
      actionType: "double_tap",
      context: config.context,
      data: { popupItem: config.popupItem, route: config.route },
      target: target ?? ev.currentTarget
    }) : undefined;
    if (this.boundHandlers.hold) {
      const startHold = (ev) => {
        const targetElement = ev.currentTarget;
        this.holdTriggered = false;
        clearTimeout(this.holdTimeout);
        this.holdTimeout = window.setTimeout(() => {
          this.holdTriggered = true;
          this.boundHandlers.hold?.(ev, targetElement);
        }, LONG_PRESS_DELAY);
      };
      const cancelHold = () => {
        if (this.holdTimeout) {
          clearTimeout(this.holdTimeout);
          this.holdTimeout = undefined;
        }
      };
      element.addEventListener("pointerdown", startHold, { signal });
      element.addEventListener("pointerup", cancelHold, { signal });
      element.addEventListener("pointercancel", cancelHold, { signal });
      element.addEventListener("pointerleave", cancelHold, { signal });
    }
    if (this.boundHandlers.tap || this.boundHandlers.doubleTap) {
      element.addEventListener("click", (ev) => this.handleClick(ev, DOUBLE_TAP_DELAY), { signal });
    }
  }
  handleClick(ev, doubleTapDelay) {
    if (this.holdTriggered)
      return;
    const targetElement = ev.currentTarget;
    const now = Date.now();
    const delta = now - this.lastTapTime;
    this.lastTapTime = now;
    const hasDoubleTap = !!this.boundHandlers.doubleTap;
    const hasTap = !!this.boundHandlers.tap;
    if (hasDoubleTap && delta < doubleTapDelay) {
      clearTimeout(this.clickTimeout);
      this.lastTapTime = 0;
      this.boundHandlers.doubleTap?.(ev, targetElement);
      return;
    }
    if (hasTap) {
      if (hasDoubleTap) {
        clearTimeout(this.clickTimeout);
        this.clickTimeout = window.setTimeout(() => {
          this.boundHandlers.tap?.(ev, targetElement);
        }, doubleTapDelay);
      } else {
        this.boundHandlers.tap?.(ev, targetElement);
      }
    }
  }
  disconnected() {
    this.abortController?.abort();
  }
}
var eventDetection = e5(EventDetectionDirective);

// src/components/media-player.ts
init_types();
init_utils();
var CAROUSEL_GAP = 12;

class MediaPlayer {
  constructor(_navbarCard) {
    this._navbarCard = _navbarCard;
    this._activeIndex = 0;
    this._trackPointerId = null;
    this._dragStartX = 0;
    this._dragOffset = 0;
    this._isDragging = false;
    this._progressAnchors = new Map;
    this.isVisible = () => {
      const config = this._navbarCard.config?.media_player;
      const players = config?.players ?? [];
      if (players.length === 0)
        return { visible: false };
      if (config?.show != null) {
        const widgetVisible = processTemplate(this._navbarCard._hass, this._navbarCard, config.show);
        if (!widgetVisible)
          return { visible: false };
      }
      for (const player of players) {
        const result = this._isPlayerVisible(player);
        if (result.visible || result.error)
          return result;
      }
      return { visible: false };
    };
    this.render = (options) => {
      const { visible } = this.isVisible();
      if (!visible)
        return x``;
      const allPlayers = this._navbarCard.config?.media_player?.players ?? [];
      const visiblePlayers = allPlayers.filter((p) => this._isPlayerVisible(p).visible);
      this._activeIndex = Math.max(0, Math.min(this._activeIndex, visiblePlayers.length - 1));
      if (visiblePlayers.length <= 1) {
        return this._renderSingle(visiblePlayers[0], options);
      }
      return this._renderCarousel(visiblePlayers, options);
    };
    this._handlePlayPause = (e, entity) => {
      e.preventDefault();
      e.stopPropagation();
      const state = this._navbarCard._hass.states[entity];
      if (!state)
        return;
      const action = state.state === "playing" ? "media_pause" : "media_play";
      this._navbarCard._hass.callService("media_player", action, {
        entity_id: entity
      });
    };
    this._handleSkipNext = (e, entity) => {
      e.preventDefault();
      e.stopPropagation();
      this._navbarCard._hass.callService("media_player", "media_next_track", {
        entity_id: entity
      });
    };
    this._onPointerDown = (e) => {
      if (e.button !== 0)
        return;
      this._trackPointerId = e.pointerId;
      this._dragStartX = e.clientX;
      this._dragOffset = 0;
      this._isDragging = false;
    };
    this._onPointerMove = (e) => {
      if (e.pointerId !== this._trackPointerId)
        return;
      const dx = e.clientX - this._dragStartX;
      if (!this._isDragging) {
        if (Math.abs(dx) < 10)
          return;
        this._isDragging = true;
        e.currentTarget.setPointerCapture(e.pointerId);
      }
      e.preventDefault();
      const count = this._navbarCard.config?.media_player?.players?.length ?? 0;
      const atEdge = this._activeIndex === 0 && dx > 0 || this._activeIndex === count - 1 && dx < 0;
      this._dragOffset = atEdge ? dx * 0.2 : dx;
      this._navbarCard.requestUpdate();
    };
    this._onPointerUp = (e) => {
      if (e.pointerId !== this._trackPointerId)
        return;
      this._trackPointerId = null;
      if (!this._isDragging)
        return;
      const el = e.currentTarget;
      el.releasePointerCapture(e.pointerId);
      const threshold = el.offsetWidth * 0.3;
      const count = this._navbarCard.config?.media_player?.players?.length ?? 0;
      if (this._dragOffset < -threshold && this._activeIndex < count - 1) {
        this._activeIndex++;
      } else if (this._dragOffset > threshold && this._activeIndex > 0) {
        this._activeIndex--;
      }
      this._dragOffset = 0;
      this._isDragging = false;
      this._navbarCard.requestUpdate();
    };
    this._onPointerCancel = (e) => {
      if (e.pointerId !== this._trackPointerId)
        return;
      this._trackPointerId = null;
      this._isDragging = false;
      this._dragOffset = 0;
      this._navbarCard.requestUpdate();
    };
    this._onProgressAnimationStart = (e, state, anchorPosition) => {
      const elapsed = this._getPosition(state) - anchorPosition;
      for (const animation of e.target.getAnimations?.() ?? []) {
        animation.currentTime = elapsed * 1000;
      }
    };
  }
  get desktop_position() {
    return this._navbarCard.config?.media_player?.desktop_position ?? DEFAULT_NAVBAR_CONFIG.media_player.desktop_position;
  }
  _isPlayerVisible(player) {
    const entity = this._resolveEntity(player);
    const state = this._navbarCard._hass.states[entity ?? ""];
    if (!(state && entity)) {
      return { error: `Entity not found "${entity}"`, visible: true };
    }
    if (player.show != null) {
      return {
        visible: processTemplate(this._navbarCard._hass, this._navbarCard, player.show)
      };
    }
    return { visible: ["playing", "paused"].includes(state.state) };
  }
  _resolveEntity(player) {
    return processTemplate(this._navbarCard._hass, this._navbarCard, player.entity);
  }
  _resolveIcon(player) {
    return player.icon ? processTemplate(this._navbarCard._hass, this._navbarCard, player.icon) : null;
  }
  _resolveTitle(player, state) {
    return player.title ? processTemplate(this._navbarCard._hass, this._navbarCard, player.title) : state.attributes.media_title ?? "";
  }
  _resolveSubtitle(player, state) {
    return player.subtitle ? processTemplate(this._navbarCard._hass, this._navbarCard, player.subtitle) : state.attributes.media_artist ?? "";
  }
  _renderSingle(player, options) {
    const entity = this._resolveEntity(player);
    const state = this._navbarCard._hass.states[entity ?? ""];
    if (!(state && entity)) {
      return x`<ha-card class="media-player error">
        <ha-alert alert-type="error">Entity not found "${entity}"</ha-alert>
      </ha-card>`;
    }
    const deviceClass = this._navbarCard.isDesktop ? "desktop" : "mobile";
    return x`
      <ha-card
        class="${e6({
      "media-player": true,
      "position-absolute": !options.isInsideNavbar,
      [(this.desktop_position ?? DEFAULT_NAVBAR_CONFIG.media_player.desktop_position).toString()]: true,
      [deviceClass]: true
    })}"
        ${eventDetection({
      context: this._navbarCard,
      doubleTap: player.double_tap_action,
      hold: player.hold_action,
      tap: player.tap_action ?? { action: "more-info", entity }
    })}>
        ${this._renderCardContent(player, entity, state)}
      </ha-card>
    `;
  }
  _renderCarousel(players, options) {
    const deviceClass = this._navbarCard.isDesktop ? "desktop" : "mobile";
    const pct = -(this._activeIndex * 100);
    const gapPx = -(this._activeIndex * CAROUSEL_GAP) + this._dragOffset;
    const transition = this._isDragging ? "none" : "transform 0.3s ease-out";
    const transform = `translateX(calc(${pct}% + ${gapPx}px))`;
    return x`
      <div
        class="${e6({
      "media-player-carousel": true,
      "position-absolute": !options.isInsideNavbar,
      [(this.desktop_position ?? DEFAULT_NAVBAR_CONFIG.media_player.desktop_position).toString()]: true,
      [deviceClass]: true
    })}">
        <div
          class="media-player-viewport"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerCancel}>
          <div
            class="media-player-track"
            style="transform: ${transform}; transition: ${transition}">
            ${players.map((p) => this._renderSlide(p))}
          </div>
        </div>
        <div class="media-player-dots">
          ${players.map((_, i) => x`<span
                class="${e6({
      active: i === this._activeIndex,
      "media-player-dot": true
    })}"></span>`)}
        </div>
      </div>
    `;
  }
  _renderSlide(player) {
    const entity = this._resolveEntity(player);
    const state = this._navbarCard._hass.states[entity ?? ""];
    if (!(state && entity)) {
      return x`<ha-card class="media-player error">
        <ha-alert alert-type="error">Entity not found "${entity}"</ha-alert>
      </ha-card>`;
    }
    return x`
      <ha-card
        class="media-player"
        ${eventDetection({
      context: this._navbarCard,
      doubleTap: player.double_tap_action,
      hold: player.hold_action,
      tap: player.tap_action ?? { action: "more-info", entity }
    })}>
        ${this._renderCardContent(player, entity, state)}
      </ha-card>
    `;
  }
  _getProgress(entity, state) {
    const {
      media_position: reported,
      media_duration: duration,
      media_position_updated_at: updatedAt
    } = state.attributes;
    if (reported == null || !(duration > 0))
      return null;
    const playing = state.state === "playing";
    const key = `${reported}|${duration}|${updatedAt}|${state.state}`;
    let anchor = this._progressAnchors.get(entity);
    if (anchor?.key !== key) {
      anchor = { key, position: this._getPosition(state) };
      this._progressAnchors.set(entity, anchor);
    }
    return { duration, key, playing, position: anchor.position };
  }
  _getPosition(state) {
    const {
      media_position: reported,
      media_duration: duration,
      media_position_updated_at: updatedAt
    } = state.attributes;
    const elapsed = state.state === "playing" && updatedAt ? (Date.now() - new Date(updatedAt).getTime()) / 1000 : 0;
    return Math.min(reported + Math.max(0, elapsed), duration);
  }
  _renderCardContent(player, entity, state) {
    const image = state.attributes.entity_picture_local ?? state.attributes.entity_picture;
    const progress = this._getProgress(entity, state);
    const icon = this._resolveIcon(player);
    const title = this._resolveTitle(player, state);
    const subtitle = this._resolveSubtitle(player, state);
    const albumBg = this._navbarCard.config?.media_player?.album_cover_background ?? DEFAULT_NAVBAR_CONFIG.media_player.album_cover_background;
    return x`
      <div
        class="media-player-bg"
        style=${albumBg ? `background-image: url(${image});` : ""}></div>
      ${progress != null ? x`<div class="media-player-progress-bar">
              ${i6(progress.key, x`<div
                  class=${e6({
      "media-player-progress-bar-fill": true,
      playing: progress.playing
    })}
                  style="--progress: ${progress.position / progress.duration}; animation-duration: ${progress.duration - progress.position}s"
                  @animationstart=${(e) => this._onProgressAnimationStart(e, state, progress.position)}></div>`)}
            </div>` : x``}
      ${image && !icon ? x`<img
              class="media-player-image"
              src=${image}
              alt=${title || ""} />` : x`<ha-icon
              class="media-player-image media-player-icon-fallback"
              icon=${icon ?? "mdi:music"}></ha-icon>`}
      <div class="media-player-info">
        <span class="media-player-title">${title || ""}</span>
        <span class="media-player-artist">${subtitle || ""}</span>
      </div>
      <button
        class="navbar-icon-button media-player-button media-player-button-play-pause primary"
        appearance="accent"
        variant="brand"
        @click=${(e) => this._handlePlayPause(e, entity)}
        @pointerdown=${preventEventDefault}
        @pointerup=${preventEventDefault}>
        <ha-icon
          icon=${state.state === "playing" ? "mdi:pause" : "mdi:play"}></ha-icon>
      </button>
      <button
        class="navbar-icon-button media-player-button media-player-button-skip"
        appearance="plain"
        variant="neutral"
        @click=${(e) => this._handleSkipNext(e, entity)}
        @pointerdown=${preventEventDefault}
        @pointerup=${preventEventDefault}>
        <ha-icon icon="mdi:skip-next"></ha-icon>
      </button>
    `;
  }
}

// src/components/navbar/badge/badge.ts
init_lit();

// node_modules/lit-html/directives/style-map.js
init_lit_html();
var n5 = "important";
var i7 = " !" + n5;
var o6 = e5(class extends i5 {
  constructor(t) {
    if (super(t), t.type !== t4.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce((e, r) => {
      const s = t[r];
      return s == null ? e : e + `${r = r.includes("-") ? r : r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(e, [r]) {
    const { style: s } = e.element;
    if (this.ft === undefined)
      return this.ft = new Set(Object.keys(r)), this.render(r);
    for (const t of this.ft)
      r[t] == null && (this.ft.delete(t), t.includes("-") ? s.removeProperty(t) : s[t] = null);
    for (const t in r) {
      const e = r[t];
      if (e != null) {
        this.ft.add(t);
        const r = typeof e == "string" && e.endsWith(i7);
        t.includes("-") || r ? s.setProperty(t, r ? e.slice(0, -11) : e, r ? n5 : "") : s[t] = e;
      }
    }
    return T;
  }
});
// src/components/color.ts
var hexToDecimal = (hex) => parseInt(hex, 16);
var decimalToHex = (decimal) => decimal.toString(16).padStart(2, "0");
var isValidInt = (value) => {
  try {
    const parsedValue = parseInt(value, 10);
    if (Number.isNaN(parsedValue))
      return false;
  } catch {
    return false;
  }
  return true;
};
var hue2rgb = (p, q, t) => {
  let adjustedT = t;
  if (adjustedT < 0)
    adjustedT += 1;
  if (adjustedT > 1)
    adjustedT -= 1;
  if (adjustedT < 1 / 6)
    return p + (q - p) * 6 * adjustedT;
  if (adjustedT < 1 / 2)
    return q;
  if (adjustedT < 2 / 3)
    return p + (q - p) * (2 / 3 - adjustedT) * 6;
  return p;
};
var complementaryRGBColor = (r, g, b) => {
  if (Math.max(r, g, b) === Math.min(r, g, b)) {
    return { b: 255 - b, g: 255 - g, r: 255 - r };
  }
  let rNorm = r / 255;
  let gNorm = g / 255;
  let bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const d = max - min;
  const l = (max + min) / 2;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  switch (max) {
    case rNorm:
      h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
      break;
    case gNorm:
      h = (bNorm - rNorm) / d + 2;
      break;
    case bNorm:
      h = (rNorm - gNorm) / d + 4;
      break;
  }
  h = Math.round(h * 60 + 180) % 360 / 360;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  rNorm = hue2rgb(p, q, h + 1 / 3);
  gNorm = hue2rgb(p, q, h);
  bNorm = hue2rgb(p, q, h - 1 / 3);
  return {
    b: Math.round(bNorm * 255),
    g: Math.round(gNorm * 255),
    r: Math.round(rNorm * 255)
  };
};

class Color {
  static colorCache = new Map;
  constructor(data) {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 255;
    if (data instanceof Color) {
      this.r = data.r;
      this.g = data.g;
      this.b = data.b;
      this.a = data.a;
    } else if (typeof data == "string") {
      if (data.startsWith("#")) {
        this._parseHexString(data);
      } else if (data.startsWith("rgb(")) {
        this._parseRGBString(data);
      } else if (data.startsWith("rgba(")) {
        this._parseRGBAString(data);
      } else if (isValidInt(data)) {
        this._parseHexString(`#${data}`);
      } else {
        try {
          this._readColorFromDOM(data);
        } catch {
          throw Error(`Format not supported for color string: "${data}"`);
        }
      }
    } else if (Array.isArray(data)) {
      this._parseColorArray(data);
    } else {
      throw Error(`Format not supported for color: "${typeof data}"`);
    }
  }
  static from(color) {
    const normalizedColor = color.toLowerCase().trim();
    const cached = Color.colorCache.get(normalizedColor);
    if (cached) {
      return cached;
    }
    const newColor = new Color(normalizedColor);
    Color.colorCache.set(normalizedColor, newColor);
    return newColor;
  }
  _readColorFromDOM(color) {
    const d = document.createElement("div");
    d.style.color = color;
    document.body.appendChild(d);
    const parsedColor = window.getComputedStyle(d).color;
    this._parseRGBString(parsedColor);
  }
  _parseColorArray(data) {
    const colorArray = data.map((x) => parseInt(x, 10));
    if (colorArray.length < 3) {
      throw Error(`Invalid array format color string: "${data}"
Supported formats: [r,g,b] | [r,g,b,a]`);
    }
    this.r = colorArray[0];
    this.g = colorArray[1];
    this.b = colorArray[2];
    this.a = colorArray.length > 3 ? colorArray[3] : this.a;
  }
  _parseRGBString(data) {
    const colorString = data.replace("rgb(", "").replace(")", "");
    const colorComponents = colorString.split(",");
    if (data.indexOf("rgb(") == -1 || colorComponents.length != 3) {
      throw Error(`Invalid 'rgb(r,g,b)' format for color string: "${data}"`);
    }
    this.r = parseInt(colorComponents[0], 10);
    this.g = parseInt(colorComponents[1], 10);
    this.b = parseInt(colorComponents[2], 10);
  }
  _parseRGBAString(data) {
    const colorString = data.replace("rgba(", "").replace(")", "");
    const colorComponents = colorString.split(",");
    if (data.indexOf("rgba(") == -1 || colorComponents.length != 4) {
      throw Error(`Invalid 'rgba(r,g,b,a)' format for color string: "${data}"`);
    }
    this.r = parseInt(colorComponents[0], 10);
    this.g = parseInt(colorComponents[1], 10);
    this.b = parseInt(colorComponents[2], 10);
    this.a = parseInt(colorComponents[3], 10);
  }
  _parseHexString(data) {
    const colorString = data.replace("#", "");
    switch (colorString.length) {
      case 3:
        this.r = hexToDecimal(colorString.slice(0, 1) + colorString.slice(0, 1));
        this.g = hexToDecimal(colorString.slice(1, 2) + colorString.slice(1, 2));
        this.b = hexToDecimal(colorString.slice(2, 3) + colorString.slice(2, 3));
        break;
      case 6:
        this.r = hexToDecimal(colorString.slice(0, 2));
        this.g = hexToDecimal(colorString.slice(2, 4));
        this.b = hexToDecimal(colorString.slice(4, 6));
        break;
      case 8:
        this.r = hexToDecimal(colorString.slice(0, 2));
        this.g = hexToDecimal(colorString.slice(2, 4));
        this.b = hexToDecimal(colorString.slice(4, 6));
        this.a = hexToDecimal(colorString.slice(6, 8));
        break;
      default:
        throw Error(`Invalid hex format for color string: "${data}"`);
    }
  }
  opacity(opacity) {
    this.a = Math.max(0, Math.min(opacity * 255, 255));
    return this;
  }
  complementary() {
    const { r, g, b } = complementaryRGBColor(this.r, this.g, this.b);
    return new Color([r, g, b, this.a]);
  }
  shade(percent) {
    let R = this.r * (100 + percent) / 100;
    let G = this.g * (100 + percent) / 100;
    let B = this.b * (100 + percent) / 100;
    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;
    R = Math.round(R);
    G = Math.round(G);
    B = Math.round(B);
    const brightness = Math.round((R * 299 + G * 587 + B * 114) / 1000);
    if (brightness == 0)
      return this.complementary();
    if (brightness < 80 && percent < 100)
      return this.shade(percent + 50);
    return new Color([R, G, B]);
  }
  contrastingColor() {
    return new Color(this.luma() >= 165 ? "#000" : "#fff");
  }
  luma() {
    return 0.2126 * this.r + 0.7152 * this.g + 0.0722 * this.b;
  }
  rgb() {
    return { b: this.b, g: this.g, r: this.r };
  }
  rgba() {
    return { a: this.a, b: this.b, g: this.g, r: this.r };
  }
  rgbaString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
  hex() {
    return `#${decimalToHex(this.r)}${decimalToHex(this.g)}${decimalToHex(this.b)}`;
  }
  hexa() {
    return `#${decimalToHex(this.a)}${decimalToHex(this.r)}${decimalToHex(this.g)}${decimalToHex(this.b)}`;
  }
  array() {
    return [this.r, this.g, this.b, this.a];
  }
}
var option = new Option;
var isColor = (value) => {
  if (typeof value !== "string")
    return false;
  option.style.color = value;
  return option.style.color !== "";
};
// src/components/navbar/badge/badge.ts
init_utils();

class Badge {
  constructor(_navbarCard, _route) {
    this._navbarCard = _navbarCard;
    this._route = _route;
  }
  get show() {
    const badge = this._route.data.badge;
    if (!badge)
      return false;
    if (badge.show) {
      return processTemplate(this._navbarCard._hass, this._navbarCard, badge.show) ?? false;
    }
    if (badge.template) {
      return processBadgeTemplate(this._navbarCard._hass, badge.template);
    }
    return false;
  }
  get count() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.badge?.count) ?? null;
  }
  get icon() {
    const icon = processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.badge?.icon);
    return typeof icon === "string" && icon.trim() !== "" ? icon.trim() : null;
  }
  get backgroundColor() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.badge?.color) ?? "red";
  }
  get textColor() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.badge?.text_color) ?? null;
  }
  get iconColor() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.badge?.icon_color) ?? null;
  }
  render() {
    if (!this.show)
      return E;
    const icon = this.icon;
    const count = this.count;
    const backgroundColor = this.backgroundColor;
    const hasIcon = icon != null;
    const hasCounter = !hasIcon && count != null;
    const configuredForegroundColor = hasIcon ? this.iconColor ?? this.textColor : this.textColor;
    const foregroundColor = configuredForegroundColor ?? Color.from(backgroundColor).contrastingColor().hex();
    return x`
      <div
        class=${e6({
      active: this._route.selected,
      badge: true,
      "with-counter": hasCounter,
      "with-icon": hasIcon
    })}
        style=${o6({
      backgroundColor,
      color: foregroundColor
    })}>
        ${hasIcon ? x`<ha-icon class="badge-icon" .icon=${icon}></ha-icon>` : count ?? E}
      </div>
    `;
  }
}
// src/components/navbar/icon/icon.ts
init_lit();
init_utils();

class Icon {
  constructor(_navbarCard, _route) {
    this._navbarCard = _navbarCard;
    this._route = _route;
  }
  get icon() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.icon);
  }
  get image() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.image);
  }
  get iconSelected() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.icon_selected);
  }
  get imageSelected() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.image_selected);
  }
  get iconColor() {
    try {
      const rawValue = processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.icon_color);
      if (!isColor(rawValue))
        return null;
      return rawValue;
    } catch (_err) {
      return null;
    }
  }
  render() {
    const isSelected = this._route.selected;
    const resolvedImage = this.image;
    const resolvedImageSelected = this.imageSelected;
    const resolvedIcon = this.icon;
    const resolvedIconSelected = this.iconSelected;
    const resolvedIconColor = this.iconColor;
    if (!(resolvedImage || resolvedIcon)) {
      return x``;
    }
    return resolvedImage ? x` <img
          class=${e6({
      active: isSelected,
      image: true
    })}
          src="${isSelected && resolvedImageSelected ? resolvedImageSelected : resolvedImage}"
          alt="${this._route.label || ""}" />` : x` <ha-icon
          class=${e6({
      active: isSelected,
      icon: true
    })}
          style="--icon-primary-color: ${resolvedIconColor ?? "inherit"}"
          icon="${isSelected && resolvedIconSelected ? resolvedIconSelected : resolvedIcon}"></ha-icon>`;
  }
}
// src/components/navbar/route/base-route.ts
init_utils();

class BaseRoute {
  constructor(_navbarCard, data) {
    this._navbarCard = _navbarCard;
    this.data = data;
    this._shouldShowLabels = () => {
      const config = this._navbarCard.isDesktop ? this._navbarCard.config?.desktop?.show_labels : this._navbarCard.config?.mobile?.show_labels;
      if (typeof config === "boolean")
        return config;
      return config === "popup_only" && this instanceof PopupItem || config === "routes_only" && !(this instanceof PopupItem);
    };
    this._shouldShowLabelBackground = () => {
      const enabled = this._navbarCard.isDesktop ? this._navbarCard.config?.desktop?.show_popup_label_backgrounds : this._navbarCard.config?.mobile?.show_popup_label_backgrounds;
      return !!enabled;
    };
  }
  get url() {
    return this.data.url;
  }
  get icon() {
    return this._iconInstance ??= new Icon(this._navbarCard, this);
  }
  get badge() {
    return this._badgeInstance ??= new Badge(this._navbarCard, this);
  }
  get selected_color() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this.data.selected_color, { returnNullIfInvalid: true });
  }
  get label() {
    if (!this._shouldShowLabels())
      return null;
    return processTemplate(this._navbarCard._hass, this._navbarCard, this.data.label) ?? " ";
  }
  get hidden() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this.data.hidden);
  }
  get selected() {
    return this.data.selected != null ? processTemplate(this._navbarCard._hass, this._navbarCard, this.data.selected) : matchesCurrentNavigationPath(this.url);
  }
  get tap_action() {
    return this.data.tap_action;
  }
  get hold_action() {
    return this.data.hold_action;
  }
  get double_tap_action() {
    return this.data.double_tap_action;
  }
}
// src/components/navbar/route/popup/popup.ts
init_lit();
init_types();

class Popup {
  constructor(_navbarCard, _popupItemData) {
    this._navbarCard = _navbarCard;
    this._popupItems = [];
    this._shouldShowLabelBackground = () => {
      const enabled = this._navbarCard.isDesktop ? this._navbarCard.config?.desktop?.show_popup_label_backgrounds : this._navbarCard.config?.mobile?.show_popup_label_backgrounds;
      return !!enabled;
    };
    this._onPopupKeyDownListener = (e) => {
      if (e.key === "Escape" && this._navbarCard.focusedPopup) {
        e.preventDefault();
        this.close();
      }
    };
    _popupItemData.forEach((_itemData, _index) => {
      this._popupItems.push(new PopupItem(this._navbarCard, this, _itemData, _index));
    });
  }
  get items() {
    return this._popupItems;
  }
  get backdrop() {
    return this._navbarCard.shadowRoot?.querySelector(".navbar-popup-backdrop") ?? null;
  }
  open(target) {
    const anchorRect = target.getBoundingClientRect();
    const { style, labelPositionClassName, popupDirectionClassName } = this._getPopupStyles(anchorRect, !this._navbarCard.isDesktop ? "mobile" : this._navbarCard.config?.desktop?.position ?? "bottom" /* bottom */);
    const popupStaggerStep = this._getPopupStaggerStepSeconds(this.items.length);
    this._navbarCard.focusedPopup = x`
      <div class="navbar-popup-backdrop"></div>
      <div
        class=${e6({
      "navbar-popup": true,
      [popupDirectionClassName]: true,
      [labelPositionClassName]: true,
      desktop: this._navbarCard.isDesktop ?? false,
      mobile: !this._navbarCard.isDesktop,
      popuplabelbackground: this._shouldShowLabelBackground()
    })}
        style="${style}; --popup-item-stagger-step: ${popupStaggerStep}s;">
        ${this.items.map((popupItem) => popupItem.render(popupDirectionClassName, labelPositionClassName)).filter((x) => x != null)}
      </div>
    `;
    requestAnimationFrame(() => {
      const popup = this._navbarCard.shadowRoot?.querySelector(".navbar-popup");
      const backdrop = this._navbarCard.shadowRoot?.querySelector(".navbar-popup-backdrop");
      if (popup && backdrop) {
        popup.classList.add("visible");
        backdrop.classList.add("visible");
      }
    });
    window.addEventListener("keydown", this._onPopupKeyDownListener);
    setTimeout(() => {
      if (this.backdrop) {
        this._backdropClickListener = (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.close();
        };
        this.backdrop.addEventListener("click", this._backdropClickListener);
      }
    }, 400);
  }
  close() {
    const popup = this._navbarCard.shadowRoot?.querySelector(".navbar-popup");
    if (this._backdropClickListener && this.backdrop) {
      this.backdrop.removeEventListener("click", this._backdropClickListener);
      this._backdropClickListener = undefined;
    }
    if (popup && this.backdrop) {
      popup.classList.remove("visible");
      this.backdrop.classList.remove("visible");
      setTimeout(() => {
        this._navbarCard.focusedPopup = null;
      }, 200);
    } else {
      this._navbarCard.focusedPopup = null;
    }
    window.removeEventListener("keydown", this._onPopupKeyDownListener);
  }
  _getPopupStaggerStepSeconds(itemsCount) {
    const maxTotalStaggerDelaySeconds = 0.25;
    const minStepSeconds = 0.01;
    const maxStepSeconds = 0.05;
    const staggeredTransitions = Math.max(itemsCount - 1, 1);
    const dynamicStep = maxTotalStaggerDelaySeconds / staggeredTransitions;
    return Math.max(minStepSeconds, Math.min(maxStepSeconds, dynamicStep));
  }
  _getPopupStyles(anchorRect, position) {
    const { top, left, x, width, height } = anchorRect;
    const windowWidth = window.innerWidth;
    const positions = {
      bottom: null,
      left: {
        dir: "open-right",
        label: "label-bottom",
        style: i`
          top: ${top}px;
          left: ${x + width}px;
        `
      },
      mobile: null,
      right: {
        dir: "open-left",
        label: "label-bottom",
        style: i`
          top: ${top}px;
          right: ${windowWidth - x}px;
        `
      },
      top: {
        dir: "open-bottom",
        label: "label-right",
        style: i`
          top: ${top + height}px;
          left: ${x}px;
        `
      }
    };
    if (positions[position]) {
      return {
        labelPositionClassName: positions[position].label,
        popupDirectionClassName: positions[position].dir,
        style: positions[position].style
      };
    }
    const isRightSide = x > windowWidth / 2;
    return isRightSide ? {
      labelPositionClassName: "label-left",
      popupDirectionClassName: "open-up",
      style: i`
            top: ${top}px;
            right: ${windowWidth - x - width}px;
          `
    } : {
      labelPositionClassName: "label-right",
      popupDirectionClassName: "open-up",
      style: i`
            top: ${top}px;
            left: ${left}px;
          `
    };
  }
}
// src/components/navbar/route/popup/popup-item.ts
init_lit();
class PopupItem extends BaseRoute {
  constructor(_navbarCard, _parentPopup, _data, _index) {
    super(_navbarCard, _data);
    this._parentPopup = _parentPopup;
    this._index = _index;
  }
  closeParentPopup() {
    this._parentPopup.close();
  }
  render(popupDirectionClassName, labelPositionClassName) {
    if (this.hidden)
      return null;
    const showLabelBackground = this._shouldShowLabelBackground();
    return x`<div
      class=${e6({
      "popup-item": true,
      [popupDirectionClassName]: true,
      [labelPositionClassName]: true,
      active: this.selected,
      popuplabelbackground: showLabelBackground
    })}
      style=${o6({
      "--index": this._index
    })}
      ${eventDetection({
      context: this._navbarCard,
      doubleTap: this.double_tap_action,
      hold: this.hold_action,
      popupItem: this,
      tap: this.tap_action ?? {
        action: "navigate",
        navigation_path: this.url ?? ""
      }
    })}>
      <div
        class=${e6({
      button: true,
      popuplabelbackground: showLabelBackground
    })}>
        ${this.icon.render()}
        <md-ripple></md-ripple>
        ${this.badge.render()}
        ${showLabelBackground && this.label ? x`<div class="label">${this.label}</div>` : x``}
      </div>
      ${!showLabelBackground && this.label ? x`<div class="label">${this.label}</div>` : x``}
    </div>`;
  }
}
// src/components/navbar/route/route.ts
init_lit();
init_utils();

class Route extends BaseRoute {
  constructor(_navbarCard, _routeData) {
    super(_navbarCard, _routeData);
    this._routeData = _routeData;
    this._validateRoute();
  }
  get popup() {
    return this._popupInstance ??= new Popup(this._navbarCard, processTemplate(this._navbarCard._hass, this._navbarCard, this._routeData.popup) ?? this._routeData.popup ?? this._routeData.submenu ?? []);
  }
  get isSelfOrChildActive() {
    if (this._navbarCard.config?.layout?.reflect_child_state && !this.selected) {
      return this.popup.items.some((item) => item.selected);
    }
    return this.selected;
  }
  render() {
    if (this.hidden)
      return null;
    const isActive = this.isSelfOrChildActive;
    return x`
      <div
        class=${e6({
      active: isActive,
      route: true
    })}
        style=${o6({
      "--navbar-primary-color": this.selected_color ?? null
    })}
        ${eventDetection({
      context: this._navbarCard,
      doubleTap: this.double_tap_action,
      hold: this.hold_action,
      route: this,
      tap: this.tap_action ?? {
        action: "navigate",
        navigation_path: this.url ?? ""
      }
    })}>
        <div
          class=${e6({
      active: isActive,
      button: true
    })}
          style=${o6({
      "--navbar-primary-color": this.selected_color ?? null
    })}>
          ${this.icon.render()}
          <ha-ripple></ha-ripple>
          ${this.badge.render()}
        </div>
        ${this.label ? x`<div
              class=${e6({
      active: isActive,
      label: true
    })}>
              ${this.label}
            </div>` : x``}
      </div>
    `;
  }
  _validateRoute() {
    if (!(this.data.icon || this.data.image)) {
      throw new Error('Each route must have either an "icon" or "image" property configured');
    }
    if (!(this._routeData.popup || this.tap_action || this.hold_action || this.url || this.double_tap_action)) {
      throw new Error("Each route must have at least one actionable property (url, popup, tap_action, hold_action, double_tap_action)");
    }
    if (this.tap_action && !this.tap_action.action) {
      throw new Error('"tap_action" must have an "action" property');
    }
    if (this.hold_action && !this.hold_action.action) {
      throw new Error('"hold_action" must have an "action" property');
    }
    if (this.double_tap_action && !this.double_tap_action.action) {
      throw new Error('"double_tap_action" must have an "action" property');
    }
  }
}
// src/navbar-card.ts
init_styles();
init_types();
init_utils();
init_docs_links();
// package.json
var version = "1.8.0";

// src/navbar-card.ts
window.customCards = window.customCards || [];
window.customCards.push({
  description: "Full-width bottom nav on mobile and flexible desktop nav that can be placed on any side.",
  name: "Navbar card",
  preview: true,
  type: "navbar-card"
});

class NavbarCard extends i4 {
  constructor() {
    super(...arguments);
    this._mediaPlayer = new MediaPlayer(this);
    this._routes = [];
    this.focusedPopup = null;
    this._mediaPlayerPosition = null;
    this._isHidden = false;
    this._applyTemplate = () => {
      if (!this._rawConfig?.template)
        return;
      try {
        this.setConfig(this._rawConfig);
      } catch (error) {
        console.error("[navbar-card]", error);
      }
    };
    this._onDesktopChange = (event) => {
      this.isDesktop = event.matches;
    };
  }
  set hass(hass) {
    this._hass = hass;
    if (this._rawConfig?.template)
      loadSharedTemplates(hass);
    const { visible } = this._mediaPlayer.isVisible();
    this._mediaPlayerPosition = visible ? this._mediaPlayer.desktop_position : null;
  }
  get isInEditMode() {
    return !!this._inEditDashboardMode || !!this._inEditCardMode || !!this._inPreviewMode;
  }
  get desktopPosition() {
    return mapStringToEnum(DesktopPosition, this.config?.desktop?.position) ?? "bottom" /* bottom */;
  }
  static getStubConfig() {
    return STUB_CONFIG;
  }
  static async getConfigElement() {
    await Promise.resolve().then(() => (init_navbar_card_editor(), {}));
    return document.createElement("navbar-card-editor");
  }
  connectedCallback() {
    super.connectedCallback();
    forceResetRipple(this);
    this._detectModes();
    this._watchDesktop();
    this._injectStyles();
    this._applyDashboardPadding();
    this._unsubscribeSharedTemplates = onSharedTemplatesChange(this._applyTemplate);
    this._applyTemplate();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribeSharedTemplates?.();
    this._unwatchDesktop();
    removeDashboardPadding(this);
    this.focusedPopup = null;
  }
  setConfig(config) {
    this._rawConfig = config;
    let mergedConfig = config;
    if (config?.template) {
      const templateConfig = getAvailableTemplates()[config.template];
      if (templateConfig) {
        mergedConfig = deepMergeKeepArrays(templateConfig, config);
      } else if (getSharedTemplates() === null) {
        return;
      } else {
        console.warn(`[navbar-card] Template "${config.template}" not found. Please refer to "templates" documentation for more information.

${DOCS_LINKS.template}
`);
      }
    }
    if (!mergedConfig.routes) {
      throw new Error('"routes" param is required for navbar card');
    }
    if (JSON.stringify(mergedConfig) === JSON.stringify(this.config))
      return;
    this._routes = mergedConfig.routes.map((route) => new Route(this, route));
    this.config = mergedConfig;
    if (this.isConnected) {
      this._watchDesktop();
      this._injectStyles();
    }
  }
  _injectStyles() {
    injectStyles(this, getDefaultStyles(), this.config?.styles ? r(this.config.styles) : i``);
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    this._isHidden = this._shouldHide();
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    this._applyDashboardPadding();
  }
  render() {
    if (!this.config || this._isHidden)
      return x``;
    const deviceClass = this.isDesktop ? "desktop" : "mobile";
    const editClass = this.isInEditMode ? "edit-mode" : "";
    const mobileModeClass = this.config.mobile?.mode === "floating" ? "floating" : "";
    const desktopModeClass = this.isDesktop && this.config.desktop?.mode === "docked" ? "docked" : "";
    const safeAreaClass = !this.isDesktop && this.config.mobile?.safe_area ? "safe-area" : "";
    const shouldRenderMediaPlayerInsideNavbar = this._shouldRenderMediaPlayerInsideNavbar();
    return x`
      ${!shouldRenderMediaPlayerInsideNavbar ? this._mediaPlayer.render({
      isInsideNavbar: false
    }) : x``}
      <div
        class="navbar ${editClass} ${deviceClass} ${this.desktopPosition} ${mobileModeClass} ${desktopModeClass} ${safeAreaClass}">
        ${shouldRenderMediaPlayerInsideNavbar ? this._mediaPlayer.render({
      isInsideNavbar: true
    }) : x``}
        <ha-card
          class="navbar-card ${deviceClass} ${this.desktopPosition} ${mobileModeClass} ${desktopModeClass}">
          ${this._routes.map((route) => route.render()).filter(Boolean)}
        </ha-card>
      </div>
      ${this.focusedPopup ?? x``}
    `;
  }
  _shouldRenderMediaPlayerInsideNavbar() {
    if (!this.isDesktop)
      return true;
    if (this.isInEditMode)
      return true;
    if (this.hidden)
      return false;
    const mediaPlayerDesktopPosition = this._mediaPlayer.desktop_position;
    const navbarPosition = this.desktopPosition;
    return navbarPosition === "bottom" /* bottom */ && mediaPlayerDesktopPosition === "bottom-center" /* bottomCenter */ || navbarPosition === "top" /* top */ && mediaPlayerDesktopPosition === "top-center" /* topCenter */;
  }
  _watchDesktop() {
    const media = `(min-width: ${this.config?.desktop?.min_width ?? 768}px)`;
    if (this._desktopQuery?.media === media) {
      this.isDesktop = this._desktopQuery.matches;
      return;
    }
    this._unwatchDesktop();
    this._desktopQuery = window.matchMedia(media);
    this._desktopQuery.addEventListener("change", this._onDesktopChange);
    this.isDesktop = this._desktopQuery.matches;
  }
  _unwatchDesktop() {
    this._desktopQuery?.removeEventListener("change", this._onDesktopChange);
    this._desktopQuery = undefined;
  }
  _applyDashboardPadding() {
    if (!this.isConnected)
      return;
    if (this._isHidden || this.isInEditMode) {
      removeDashboardPadding(this);
    } else {
      setDashboardPadding(this, this.config, this._mediaPlayerPosition);
    }
  }
  _shouldHide() {
    if (this.isInEditMode)
      return false;
    const desktopHidden = processTemplate(this._hass, this, this.config?.desktop?.hidden);
    const mobileHidden = processTemplate(this._hass, this, this.config?.mobile?.hidden);
    return !this.isInEditMode && (this.isDesktop && desktopHidden || !this.isDesktop && mobileHidden);
  }
  _detectModes() {
    const homeAssistantRoot = document.querySelector("body > home-assistant");
    this._inEditDashboardMode = this.parentElement?.closest("hui-card-edit-mode") != null;
    this._inEditCardMode = !!homeAssistantRoot?.shadowRoot?.querySelector("hui-dialog-edit-card")?.shadowRoot?.querySelector("ha-dialog");
    this._inPreviewMode = this.parentElement?.closest(".card > .preview") != null;
  }
}
__legacyDecorateClassTS([
  n4({ attribute: false })
], NavbarCard.prototype, "_hass", undefined);
__legacyDecorateClassTS([
  r5()
], NavbarCard.prototype, "_inEditDashboardMode", undefined);
__legacyDecorateClassTS([
  r5()
], NavbarCard.prototype, "_inEditCardMode", undefined);
__legacyDecorateClassTS([
  r5()
], NavbarCard.prototype, "_inPreviewMode", undefined);
__legacyDecorateClassTS([
  r5()
], NavbarCard.prototype, "config", undefined);
__legacyDecorateClassTS([
  r5()
], NavbarCard.prototype, "_routes", undefined);
__legacyDecorateClassTS([
  r5()
], NavbarCard.prototype, "focusedPopup", undefined);
__legacyDecorateClassTS([
  r5()
], NavbarCard.prototype, "isDesktop", undefined);
NavbarCard = __legacyDecorateClassTS([
  t3("navbar-card")
], NavbarCard);
console.info(`%c navbar-card%cv${version} `, `background-color: #555;
      padding: 6px 8px;
      padding-right: 6px;
      color: #fff;
      font-weight: 800;
      font-family: 'Segoe UI', Roboto, system-ui, sans-serif;
      text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3);
      border-radius: 16px 0 0 16px;`, `background-color:rgb(0, 135, 197);
      padding: 6px 8px;
      padding-left: 6px;
      color: #fff;
      font-weight: 800;
      font-family: 'Segoe UI', Roboto, system-ui, sans-serif;
      text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3);
      border-radius: 0 16px 16px 0;`);
export {
  NavbarCard
};
