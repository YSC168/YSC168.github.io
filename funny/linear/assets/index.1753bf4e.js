(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
        s(i);
    new MutationObserver(i=>{
        for (const o of i)
            if (o.type === "childList")
                for (const r of o.addedNodes)
                    r.tagName === "LINK" && r.rel === "modulepreload" && s(r)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(i) {
        const o = {};
        return i.integrity && (o.integrity = i.integrity),
        i.referrerpolicy && (o.referrerPolicy = i.referrerpolicy),
        i.crossorigin === "use-credentials" ? o.credentials = "include" : i.crossorigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin",
        o
    }
    function s(i) {
        if (i.ep)
            return;
        i.ep = !0;
        const o = n(i);
        fetch(i.href, o)
    }
}
)();
function Sn(e, t) {
    const n = Object.create(null)
      , s = e.split(",");
    for (let i = 0; i < s.length; i++)
        n[s[i]] = !0;
    return t ? i=>!!n[i.toLowerCase()] : i=>!!n[i]
}
function st(e) {
    if (z(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const s = e[n]
              , i = ee(s) ? Oi(s) : st(s);
            if (i)
                for (const o in i)
                    t[o] = i[o]
        }
        return t
    } else {
        if (ee(e))
            return e;
        if (K(e))
            return e
    }
}
const Ni = /;(?![^(]*\))/g
  , Si = /:([^]+)/
  , ki = /\/\*.*?\*\//gs;
function Oi(e) {
    const t = {};
    return e.replace(ki, "").split(Ni).forEach(n=>{
        if (n) {
            const s = n.split(Si);
            s.length > 1 && (t[s[0].trim()] = s[1].trim())
        }
    }
    ),
    t
}
function Be(e) {
    let t = "";
    if (ee(e))
        t = e;
    else if (z(e))
        for (let n = 0; n < e.length; n++) {
            const s = Be(e[n]);
            s && (t += s + " ")
        }
    else if (K(e))
        for (const n in e)
            e[n] && (t += n + " ");
    return t.trim()
}
const zi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
  , Pi = Sn(zi);
function Ts(e) {
    return !!e || e === ""
}
const $e = e=>ee(e) ? e : e == null ? "" : z(e) || K(e) && (e.toString === Ss || !P(e.toString)) ? JSON.stringify(e, Es, 2) : String(e)
  , Es = (e,t)=>t && t.__v_isRef ? Es(e, t.value) : ct(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce((n,[s,i])=>(n[`${s} =>`] = i,
    n), {})
} : Ds(t) ? {
    [`Set(${t.size})`]: [...t.values()]
} : K(t) && !z(t) && !ks(t) ? String(t) : t
  , W = {}
  , lt = []
  , xe = ()=>{}
  , Ri = ()=>!1
  , $i = /^on[^a-z]/
  , en = e=>$i.test(e)
  , kn = e=>e.startsWith("onUpdate:")
  , ae = Object.assign
  , On = (e,t)=>{
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}
  , Fi = Object.prototype.hasOwnProperty
  , $ = (e,t)=>Fi.call(e, t)
  , z = Array.isArray
  , ct = e=>tn(e) === "[object Map]"
  , Ds = e=>tn(e) === "[object Set]"
  , P = e=>typeof e == "function"
  , ee = e=>typeof e == "string"
  , zn = e=>typeof e == "symbol"
  , K = e=>e !== null && typeof e == "object"
  , Ns = e=>K(e) && P(e.then) && P(e.catch)
  , Ss = Object.prototype.toString
  , tn = e=>Ss.call(e)
  , Hi = e=>tn(e).slice(8, -1)
  , ks = e=>tn(e) === "[object Object]"
  , Pn = e=>ee(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e
  , Wt = Sn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
  , nn = e=>{
    const t = Object.create(null);
    return n=>t[n] || (t[n] = e(n))
}
  , Bi = /-(\w)/g
  , ht = nn(e=>e.replace(Bi, (t,n)=>n ? n.toUpperCase() : ""))
  , Ui = /\B([A-Z])/g
  , _t = nn(e=>e.replace(Ui, "-$1").toLowerCase())
  , Os = nn(e=>e.charAt(0).toUpperCase() + e.slice(1))
  , gn = nn(e=>e ? `on${Os(e)}` : "")
  , Et = (e,t)=>!Object.is(e, t)
  , mn = (e,t)=>{
    for (let n = 0; n < e.length; n++)
        e[n](t)
}
  , Zt = (e,t,n)=>{
    Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value: n
    })
}
  , zs = e=>{
    const t = parseFloat(e);
    return isNaN(t) ? e : t
}
;
let ns;
const Yi = ()=>ns || (ns = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let Ie;
class Wi {
    constructor(t=!1) {
        this.detached = t,
        this.active = !0,
        this.effects = [],
        this.cleanups = [],
        this.parent = Ie,
        !t && Ie && (this.index = (Ie.scopes || (Ie.scopes = [])).push(this) - 1)
    }
    run(t) {
        if (this.active) {
            const n = Ie;
            try {
                return Ie = this,
                t()
            } finally {
                Ie = n
            }
        }
    }
    on() {
        Ie = this
    }
    off() {
        Ie = this.parent
    }
    stop(t) {
        if (this.active) {
            let n, s;
            for (n = 0,
            s = this.effects.length; n < s; n++)
                this.effects[n].stop();
            for (n = 0,
            s = this.cleanups.length; n < s; n++)
                this.cleanups[n]();
            if (this.scopes)
                for (n = 0,
                s = this.scopes.length; n < s; n++)
                    this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const i = this.parent.scopes.pop();
                i && i !== this && (this.parent.scopes[this.index] = i,
                i.index = this.index)
            }
            this.parent = void 0,
            this.active = !1
        }
    }
}
function Vi(e, t=Ie) {
    t && t.active && t.effects.push(e)
}
const Rn = e=>{
    const t = new Set(e);
    return t.w = 0,
    t.n = 0,
    t
}
  , Ps = e=>(e.w & Ue) > 0
  , Rs = e=>(e.n & Ue) > 0
  , Ki = ({deps: e})=>{
    if (e.length)
        for (let t = 0; t < e.length; t++)
            e[t].w |= Ue
}
  , Qi = e=>{
    const {deps: t} = e;
    if (t.length) {
        let n = 0;
        for (let s = 0; s < t.length; s++) {
            const i = t[s];
            Ps(i) && !Rs(i) ? i.delete(e) : t[n++] = i,
            i.w &= ~Ue,
            i.n &= ~Ue
        }
        t.length = n
    }
}
  , bn = new WeakMap;
let jt = 0
  , Ue = 1;
const wn = 30;
let _e;
const tt = Symbol("")
  , vn = Symbol("");
class $n {
    constructor(t, n=null, s) {
        this.fn = t,
        this.scheduler = n,
        this.active = !0,
        this.deps = [],
        this.parent = void 0,
        Vi(this, s)
    }
    run() {
        if (!this.active)
            return this.fn();
        let t = _e
          , n = Fe;
        for (; t; ) {
            if (t === this)
                return;
            t = t.parent
        }
        try {
            return this.parent = _e,
            _e = this,
            Fe = !0,
            Ue = 1 << ++jt,
            jt <= wn ? Ki(this) : ss(this),
            this.fn()
        } finally {
            jt <= wn && Qi(this),
            Ue = 1 << --jt,
            _e = this.parent,
            Fe = n,
            this.parent = void 0,
            this.deferStop && this.stop()
        }
    }
    stop() {
        _e === this ? this.deferStop = !0 : this.active && (ss(this),
        this.onStop && this.onStop(),
        this.active = !1)
    }
}
function ss(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++)
            t[n].delete(e);
        t.length = 0
    }
}
let Fe = !0;
const $s = [];
function yt() {
    $s.push(Fe),
    Fe = !1
}
function xt() {
    const e = $s.pop();
    Fe = e === void 0 ? !0 : e
}
function de(e, t, n) {
    if (Fe && _e) {
        let s = bn.get(e);
        s || bn.set(e, s = new Map);
        let i = s.get(n);
        i || s.set(n, i = Rn()),
        Fs(i)
    }
}
function Fs(e, t) {
    let n = !1;
    jt <= wn ? Rs(e) || (e.n |= Ue,
    n = !Ps(e)) : n = !e.has(_e),
    n && (e.add(_e),
    _e.deps.push(e))
}
function ke(e, t, n, s, i, o) {
    const r = bn.get(e);
    if (!r)
        return;
    let l = [];
    if (t === "clear")
        l = [...r.values()];
    else if (n === "length" && z(e)) {
        const a = zs(s);
        r.forEach((h,f)=>{
            (f === "length" || f >= a) && l.push(h)
        }
        )
    } else
        switch (n !== void 0 && l.push(r.get(n)),
        t) {
        case "add":
            z(e) ? Pn(n) && l.push(r.get("length")) : (l.push(r.get(tt)),
            ct(e) && l.push(r.get(vn)));
            break;
        case "delete":
            z(e) || (l.push(r.get(tt)),
            ct(e) && l.push(r.get(vn)));
            break;
        case "set":
            ct(e) && l.push(r.get(tt));
            break
        }
    if (l.length === 1)
        l[0] && Ln(l[0]);
    else {
        const a = [];
        for (const h of l)
            h && a.push(...h);
        Ln(Rn(a))
    }
}
function Ln(e, t) {
    const n = z(e) ? e : [...e];
    for (const s of n)
        s.computed && is(s);
    for (const s of n)
        s.computed || is(s)
}
function is(e, t) {
    (e !== _e || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const Zi = Sn("__proto__,__v_isRef,__isVue")
  , Hs = new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e !== "arguments" && e !== "caller").map(e=>Symbol[e]).filter(zn))
  , qi = Fn()
  , Gi = Fn(!1, !0)
  , Ji = Fn(!0)
  , os = Xi();
function Xi() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t=>{
        e[t] = function(...n) {
            const s = F(this);
            for (let o = 0, r = this.length; o < r; o++)
                de(s, "get", o + "");
            const i = s[t](...n);
            return i === -1 || i === !1 ? s[t](...n.map(F)) : i
        }
    }
    ),
    ["push", "pop", "shift", "unshift", "splice"].forEach(t=>{
        e[t] = function(...n) {
            yt();
            const s = F(this)[t].apply(this, n);
            return xt(),
            s
        }
    }
    ),
    e
}
function Fn(e=!1, t=!1) {
    return function(s, i, o) {
        if (i === "__v_isReactive")
            return !e;
        if (i === "__v_isReadonly")
            return e;
        if (i === "__v_isShallow")
            return t;
        if (i === "__v_raw" && o === (e ? t ? mo : Vs : t ? Ws : Ys).get(s))
            return s;
        const r = z(s);
        if (!e && r && $(os, i))
            return Reflect.get(os, i, o);
        const l = Reflect.get(s, i, o);
        return (zn(i) ? Hs.has(i) : Zi(i)) || (e || de(s, "get", i),
        t) ? l : X(l) ? r && Pn(i) ? l : l.value : K(l) ? e ? Ks(l) : Mt(l) : l
    }
}
const eo = Bs()
  , to = Bs(!0);
function Bs(e=!1) {
    return function(n, s, i, o) {
        let r = n[s];
        if (pt(r) && X(r) && !X(i))
            return !1;
        if (!e && (!qt(i) && !pt(i) && (r = F(r),
        i = F(i)),
        !z(n) && X(r) && !X(i)))
            return r.value = i,
            !0;
        const l = z(n) && Pn(s) ? Number(s) < n.length : $(n, s)
          , a = Reflect.set(n, s, i, o);
        return n === F(o) && (l ? Et(i, r) && ke(n, "set", s, i) : ke(n, "add", s, i)),
        a
    }
}
function no(e, t) {
    const n = $(e, t);
    e[t];
    const s = Reflect.deleteProperty(e, t);
    return s && n && ke(e, "delete", t, void 0),
    s
}
function so(e, t) {
    const n = Reflect.has(e, t);
    return (!zn(t) || !Hs.has(t)) && de(e, "has", t),
    n
}
function io(e) {
    return de(e, "iterate", z(e) ? "length" : tt),
    Reflect.ownKeys(e)
}
const Us = {
    get: qi,
    set: eo,
    deleteProperty: no,
    has: so,
    ownKeys: io
}
  , oo = {
    get: Ji,
    set(e, t) {
        return !0
    },
    deleteProperty(e, t) {
        return !0
    }
}
  , ro = ae({}, Us, {
    get: Gi,
    set: to
})
  , Hn = e=>e
  , sn = e=>Reflect.getPrototypeOf(e);
function $t(e, t, n=!1, s=!1) {
    e = e.__v_raw;
    const i = F(e)
      , o = F(t);
    n || (t !== o && de(i, "get", t),
    de(i, "get", o));
    const {has: r} = sn(i)
      , l = s ? Hn : n ? Yn : Dt;
    if (r.call(i, t))
        return l(e.get(t));
    if (r.call(i, o))
        return l(e.get(o));
    e !== i && e.get(t)
}
function Ft(e, t=!1) {
    const n = this.__v_raw
      , s = F(n)
      , i = F(e);
    return t || (e !== i && de(s, "has", e),
    de(s, "has", i)),
    e === i ? n.has(e) : n.has(e) || n.has(i)
}
function Ht(e, t=!1) {
    return e = e.__v_raw,
    !t && de(F(e), "iterate", tt),
    Reflect.get(e, "size", e)
}
function rs(e) {
    e = F(e);
    const t = F(this);
    return sn(t).has.call(t, e) || (t.add(e),
    ke(t, "add", e, e)),
    this
}
function ls(e, t) {
    t = F(t);
    const n = F(this)
      , {has: s, get: i} = sn(n);
    let o = s.call(n, e);
    o || (e = F(e),
    o = s.call(n, e));
    const r = i.call(n, e);
    return n.set(e, t),
    o ? Et(t, r) && ke(n, "set", e, t) : ke(n, "add", e, t),
    this
}
function cs(e) {
    const t = F(this)
      , {has: n, get: s} = sn(t);
    let i = n.call(t, e);
    i || (e = F(e),
    i = n.call(t, e)),
    s && s.call(t, e);
    const o = t.delete(e);
    return i && ke(t, "delete", e, void 0),
    o
}
function as() {
    const e = F(this)
      , t = e.size !== 0
      , n = e.clear();
    return t && ke(e, "clear", void 0, void 0),
    n
}
function Bt(e, t) {
    return function(s, i) {
        const o = this
          , r = o.__v_raw
          , l = F(r)
          , a = t ? Hn : e ? Yn : Dt;
        return !e && de(l, "iterate", tt),
        r.forEach((h,f)=>s.call(i, a(h), a(f), o))
    }
}
function Ut(e, t, n) {
    return function(...s) {
        const i = this.__v_raw
          , o = F(i)
          , r = ct(o)
          , l = e === "entries" || e === Symbol.iterator && r
          , a = e === "keys" && r
          , h = i[e](...s)
          , f = n ? Hn : t ? Yn : Dt;
        return !t && de(o, "iterate", a ? vn : tt),
        {
            next() {
                const {value: g, done: v} = h.next();
                return v ? {
                    value: g,
                    done: v
                } : {
                    value: l ? [f(g[0]), f(g[1])] : f(g),
                    done: v
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}
function Pe(e) {
    return function(...t) {
        return e === "delete" ? !1 : this
    }
}
function lo() {
    const e = {
        get(o) {
            return $t(this, o)
        },
        get size() {
            return Ht(this)
        },
        has: Ft,
        add: rs,
        set: ls,
        delete: cs,
        clear: as,
        forEach: Bt(!1, !1)
    }
      , t = {
        get(o) {
            return $t(this, o, !1, !0)
        },
        get size() {
            return Ht(this)
        },
        has: Ft,
        add: rs,
        set: ls,
        delete: cs,
        clear: as,
        forEach: Bt(!1, !0)
    }
      , n = {
        get(o) {
            return $t(this, o, !0)
        },
        get size() {
            return Ht(this, !0)
        },
        has(o) {
            return Ft.call(this, o, !0)
        },
        add: Pe("add"),
        set: Pe("set"),
        delete: Pe("delete"),
        clear: Pe("clear"),
        forEach: Bt(!0, !1)
    }
      , s = {
        get(o) {
            return $t(this, o, !0, !0)
        },
        get size() {
            return Ht(this, !0)
        },
        has(o) {
            return Ft.call(this, o, !0)
        },
        add: Pe("add"),
        set: Pe("set"),
        delete: Pe("delete"),
        clear: Pe("clear"),
        forEach: Bt(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach(o=>{
        e[o] = Ut(o, !1, !1),
        n[o] = Ut(o, !0, !1),
        t[o] = Ut(o, !1, !0),
        s[o] = Ut(o, !0, !0)
    }
    ),
    [e, n, t, s]
}
const [co,ao,uo,fo] = lo();
function Bn(e, t) {
    const n = t ? e ? fo : uo : e ? ao : co;
    return (s,i,o)=>i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? s : Reflect.get($(n, i) && i in s ? n : s, i, o)
}
const ho = {
    get: Bn(!1, !1)
}
  , po = {
    get: Bn(!1, !0)
}
  , go = {
    get: Bn(!0, !1)
}
  , Ys = new WeakMap
  , Ws = new WeakMap
  , Vs = new WeakMap
  , mo = new WeakMap;
function _o(e) {
    switch (e) {
    case "Object":
    case "Array":
        return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
        return 2;
    default:
        return 0
    }
}
function yo(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : _o(Hi(e))
}
function Mt(e) {
    return pt(e) ? e : Un(e, !1, Us, ho, Ys)
}
function xo(e) {
    return Un(e, !1, ro, po, Ws)
}
function Ks(e) {
    return Un(e, !0, oo, go, Vs)
}
function Un(e, t, n, s, i) {
    if (!K(e) || e.__v_raw && !(t && e.__v_isReactive))
        return e;
    const o = i.get(e);
    if (o)
        return o;
    const r = yo(e);
    if (r === 0)
        return e;
    const l = new Proxy(e,r === 2 ? s : n);
    return i.set(e, l),
    l
}
function at(e) {
    return pt(e) ? at(e.__v_raw) : !!(e && e.__v_isReactive)
}
function pt(e) {
    return !!(e && e.__v_isReadonly)
}
function qt(e) {
    return !!(e && e.__v_isShallow)
}
function Qs(e) {
    return at(e) || pt(e)
}
function F(e) {
    const t = e && e.__v_raw;
    return t ? F(t) : e
}
function Zs(e) {
    return Zt(e, "__v_skip", !0),
    e
}
const Dt = e=>K(e) ? Mt(e) : e
  , Yn = e=>K(e) ? Ks(e) : e;
function qs(e) {
    Fe && _e && (e = F(e),
    Fs(e.dep || (e.dep = Rn())))
}
function Gs(e, t) {
    e = F(e),
    e.dep && Ln(e.dep)
}
function X(e) {
    return !!(e && e.__v_isRef === !0)
}
function Ce(e) {
    return Mo(e, !1)
}
function Mo(e, t) {
    return X(e) ? e : new bo(e,t)
}
class bo {
    constructor(t, n) {
        this.__v_isShallow = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this._rawValue = n ? t : F(t),
        this._value = n ? t : Dt(t)
    }
    get value() {
        return qs(this),
        this._value
    }
    set value(t) {
        const n = this.__v_isShallow || qt(t) || pt(t);
        t = n ? t : F(t),
        Et(t, this._rawValue) && (this._rawValue = t,
        this._value = n ? t : Dt(t),
        Gs(this))
    }
}
function se(e) {
    return X(e) ? e.value : e
}
const wo = {
    get: (e,t,n)=>se(Reflect.get(e, t, n)),
    set: (e,t,n,s)=>{
        const i = e[t];
        return X(i) && !X(n) ? (i.value = n,
        !0) : Reflect.set(e, t, n, s)
    }
};
function Js(e) {
    return at(e) ? e : new Proxy(e,wo)
}
var Xs;
class vo {
    constructor(t, n, s, i) {
        this._setter = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this[Xs] = !1,
        this._dirty = !0,
        this.effect = new $n(t,()=>{
            this._dirty || (this._dirty = !0,
            Gs(this))
        }
        ),
        this.effect.computed = this,
        this.effect.active = this._cacheable = !i,
        this.__v_isReadonly = s
    }
    get value() {
        const t = F(this);
        return qs(t),
        (t._dirty || !t._cacheable) && (t._dirty = !1,
        t._value = t.effect.run()),
        t._value
    }
    set value(t) {
        this._setter(t)
    }
}
Xs = "__v_isReadonly";
function Lo(e, t, n=!1) {
    let s, i;
    const o = P(e);
    return o ? (s = e,
    i = xe) : (s = e.get,
    i = e.set),
    new vo(s,i,o || !i,n)
}
function He(e, t, n, s) {
    let i;
    try {
        i = s ? e(...s) : e()
    } catch (o) {
        on(o, t, n)
    }
    return i
}
function Me(e, t, n, s) {
    if (P(e)) {
        const o = He(e, t, n, s);
        return o && Ns(o) && o.catch(r=>{
            on(r, t, n)
        }
        ),
        o
    }
    const i = [];
    for (let o = 0; o < e.length; o++)
        i.push(Me(e[o], t, n, s));
    return i
}
function on(e, t, n, s=!0) {
    const i = t ? t.vnode : null;
    if (t) {
        let o = t.parent;
        const r = t.proxy
          , l = n;
        for (; o; ) {
            const h = o.ec;
            if (h) {
                for (let f = 0; f < h.length; f++)
                    if (h[f](e, r, l) === !1)
                        return
            }
            o = o.parent
        }
        const a = t.appContext.config.errorHandler;
        if (a) {
            He(a, null, 10, [e, r, l]);
            return
        }
    }
    Io(e, n, i, s)
}
function Io(e, t, n, s=!0) {
    console.error(e)
}
let Nt = !1
  , In = !1;
const ie = [];
let Ae = 0;
const ut = [];
let Se = null
  , Je = 0;
const ei = Promise.resolve();
let Wn = null;
function jo(e) {
    const t = Wn || ei;
    return e ? t.then(this ? e.bind(this) : e) : t
}
function Ao(e) {
    let t = Ae + 1
      , n = ie.length;
    for (; t < n; ) {
        const s = t + n >>> 1;
        St(ie[s]) < e ? t = s + 1 : n = s
    }
    return t
}
function Vn(e) {
    (!ie.length || !ie.includes(e, Nt && e.allowRecurse ? Ae + 1 : Ae)) && (e.id == null ? ie.push(e) : ie.splice(Ao(e.id), 0, e),
    ti())
}
function ti() {
    !Nt && !In && (In = !0,
    Wn = ei.then(si))
}
function Co(e) {
    const t = ie.indexOf(e);
    t > Ae && ie.splice(t, 1)
}
function To(e) {
    z(e) ? ut.push(...e) : (!Se || !Se.includes(e, e.allowRecurse ? Je + 1 : Je)) && ut.push(e),
    ti()
}
function us(e, t=Nt ? Ae + 1 : 0) {
    for (; t < ie.length; t++) {
        const n = ie[t];
        n && n.pre && (ie.splice(t, 1),
        t--,
        n())
    }
}
function ni(e) {
    if (ut.length) {
        const t = [...new Set(ut)];
        if (ut.length = 0,
        Se) {
            Se.push(...t);
            return
        }
        for (Se = t,
        Se.sort((n,s)=>St(n) - St(s)),
        Je = 0; Je < Se.length; Je++)
            Se[Je]();
        Se = null,
        Je = 0
    }
}
const St = e=>e.id == null ? 1 / 0 : e.id
  , Eo = (e,t)=>{
    const n = St(e) - St(t);
    if (n === 0) {
        if (e.pre && !t.pre)
            return -1;
        if (t.pre && !e.pre)
            return 1
    }
    return n
}
;
function si(e) {
    In = !1,
    Nt = !0,
    ie.sort(Eo);
    const t = xe;
    try {
        for (Ae = 0; Ae < ie.length; Ae++) {
            const n = ie[Ae];
            n && n.active !== !1 && He(n, null, 14)
        }
    } finally {
        Ae = 0,
        ie.length = 0,
        ni(),
        Nt = !1,
        Wn = null,
        (ie.length || ut.length) && si()
    }
}
function Do(e, t, ...n) {
    if (e.isUnmounted)
        return;
    const s = e.vnode.props || W;
    let i = n;
    const o = t.startsWith("update:")
      , r = o && t.slice(7);
    if (r && r in s) {
        const f = `${r === "modelValue" ? "model" : r}Modifiers`
          , {number: g, trim: v} = s[f] || W;
        v && (i = n.map(C=>ee(C) ? C.trim() : C)),
        g && (i = n.map(zs))
    }
    let l, a = s[l = gn(t)] || s[l = gn(ht(t))];
    !a && o && (a = s[l = gn(_t(t))]),
    a && Me(a, e, 6, i);
    const h = s[l + "Once"];
    if (h) {
        if (!e.emitted)
            e.emitted = {};
        else if (e.emitted[l])
            return;
        e.emitted[l] = !0,
        Me(h, e, 6, i)
    }
}
function ii(e, t, n=!1) {
    const s = t.emitsCache
      , i = s.get(e);
    if (i !== void 0)
        return i;
    const o = e.emits;
    let r = {}
      , l = !1;
    if (!P(e)) {
        const a = h=>{
            const f = ii(h, t, !0);
            f && (l = !0,
            ae(r, f))
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(a),
        e.extends && a(e.extends),
        e.mixins && e.mixins.forEach(a)
    }
    return !o && !l ? (K(e) && s.set(e, null),
    null) : (z(o) ? o.forEach(a=>r[a] = null) : ae(r, o),
    K(e) && s.set(e, r),
    r)
}
function rn(e, t) {
    return !e || !en(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""),
    $(e, t[0].toLowerCase() + t.slice(1)) || $(e, _t(t)) || $(e, t))
}
let ce = null
  , ln = null;
function Gt(e) {
    const t = ce;
    return ce = e,
    ln = e && e.type.__scopeId || null,
    t
}
function We(e) {
    ln = e
}
function Ve() {
    ln = null
}
function oi(e, t=ce, n) {
    if (!t || e._n)
        return e;
    const s = (...i)=>{
        s._d && ys(-1);
        const o = Gt(t);
        let r;
        try {
            r = e(...i)
        } finally {
            Gt(o),
            s._d && ys(1)
        }
        return r
    }
    ;
    return s._n = !0,
    s._c = !0,
    s._d = !0,
    s
}
function _n(e) {
    const {type: t, vnode: n, proxy: s, withProxy: i, props: o, propsOptions: [r], slots: l, attrs: a, emit: h, render: f, renderCache: g, data: v, setupState: C, ctx: T, inheritAttrs: O} = e;
    let x, M;
    const N = Gt(e);
    try {
        if (n.shapeFlag & 4) {
            const Q = i || s;
            x = je(f.call(Q, Q, g, o, C, v, T)),
            M = a
        } else {
            const Q = t;
            x = je(Q.length > 1 ? Q(o, {
                attrs: a,
                slots: l,
                emit: h
            }) : Q(o, null)),
            M = t.props ? a : No(a)
        }
    } catch (Q) {
        Tt.length = 0,
        on(Q, e, 1),
        x = te(Ye)
    }
    let S = x;
    if (M && O !== !1) {
        const Q = Object.keys(M)
          , {shapeFlag: he} = S;
        Q.length && he & 7 && (r && Q.some(kn) && (M = So(M, r)),
        S = gt(S, M))
    }
    return n.dirs && (S = gt(S),
    S.dirs = S.dirs ? S.dirs.concat(n.dirs) : n.dirs),
    n.transition && (S.transition = n.transition),
    x = S,
    Gt(N),
    x
}
const No = e=>{
    let t;
    for (const n in e)
        (n === "class" || n === "style" || en(n)) && ((t || (t = {}))[n] = e[n]);
    return t
}
  , So = (e,t)=>{
    const n = {};
    for (const s in e)
        (!kn(s) || !(s.slice(9)in t)) && (n[s] = e[s]);
    return n
}
;
function ko(e, t, n) {
    const {props: s, children: i, component: o} = e
      , {props: r, children: l, patchFlag: a} = t
      , h = o.emitsOptions;
    if (t.dirs || t.transition)
        return !0;
    if (n && a >= 0) {
        if (a & 1024)
            return !0;
        if (a & 16)
            return s ? fs(s, r, h) : !!r;
        if (a & 8) {
            const f = t.dynamicProps;
            for (let g = 0; g < f.length; g++) {
                const v = f[g];
                if (r[v] !== s[v] && !rn(h, v))
                    return !0
            }
        }
    } else
        return (i || l) && (!l || !l.$stable) ? !0 : s === r ? !1 : s ? r ? fs(s, r, h) : !0 : !!r;
    return !1
}
function fs(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length)
        return !0;
    for (let i = 0; i < s.length; i++) {
        const o = s[i];
        if (t[o] !== e[o] && !rn(n, o))
            return !0
    }
    return !1
}
function Oo({vnode: e, parent: t}, n) {
    for (; t && t.subTree === e; )
        (e = t.vnode).el = n,
        t = t.parent
}
const zo = e=>e.__isSuspense;
function Po(e, t) {
    t && t.pendingBranch ? z(e) ? t.effects.push(...e) : t.effects.push(e) : To(e)
}
function Ro(e, t) {
    if (oe) {
        let n = oe.provides;
        const s = oe.parent && oe.parent.provides;
        s === n && (n = oe.provides = Object.create(s)),
        n[e] = t
    }
}
function Vt(e, t, n=!1) {
    const s = oe || ce;
    if (s) {
        const i = s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides;
        if (i && e in i)
            return i[e];
        if (arguments.length > 1)
            return n && P(t) ? t.call(s.proxy) : t
    }
}
const Yt = {};
function ft(e, t, n) {
    return ri(e, t, n)
}
function ri(e, t, {immediate: n, deep: s, flush: i, onTrack: o, onTrigger: r}=W) {
    const l = oe;
    let a, h = !1, f = !1;
    if (X(e) ? (a = ()=>e.value,
    h = qt(e)) : at(e) ? (a = ()=>e,
    s = !0) : z(e) ? (f = !0,
    h = e.some(S=>at(S) || qt(S)),
    a = ()=>e.map(S=>{
        if (X(S))
            return S.value;
        if (at(S))
            return et(S);
        if (P(S))
            return He(S, l, 2)
    }
    )) : P(e) ? t ? a = ()=>He(e, l, 2) : a = ()=>{
        if (!(l && l.isUnmounted))
            return g && g(),
            Me(e, l, 3, [v])
    }
    : a = xe,
    t && s) {
        const S = a;
        a = ()=>et(S())
    }
    let g, v = S=>{
        g = M.onStop = ()=>{
            He(S, l, 4)
        }
    }
    , C;
    if (zt)
        if (v = xe,
        t ? n && Me(t, l, 3, [a(), f ? [] : void 0, v]) : a(),
        i === "sync") {
            const S = Tr();
            C = S.__watcherHandles || (S.__watcherHandles = [])
        } else
            return xe;
    let T = f ? new Array(e.length).fill(Yt) : Yt;
    const O = ()=>{
        if (!!M.active)
            if (t) {
                const S = M.run();
                (s || h || (f ? S.some((Q,he)=>Et(Q, T[he])) : Et(S, T))) && (g && g(),
                Me(t, l, 3, [S, T === Yt ? void 0 : f && T[0] === Yt ? [] : T, v]),
                T = S)
            } else
                M.run()
    }
    ;
    O.allowRecurse = !!t;
    let x;
    i === "sync" ? x = O : i === "post" ? x = ()=>ue(O, l && l.suspense) : (O.pre = !0,
    l && (O.id = l.uid),
    x = ()=>Vn(O));
    const M = new $n(a,x);
    t ? n ? O() : T = M.run() : i === "post" ? ue(M.run.bind(M), l && l.suspense) : M.run();
    const N = ()=>{
        M.stop(),
        l && l.scope && On(l.scope.effects, M)
    }
    ;
    return C && C.push(N),
    N
}
function $o(e, t, n) {
    const s = this.proxy
      , i = ee(e) ? e.includes(".") ? li(s, e) : ()=>s[e] : e.bind(s, s);
    let o;
    P(t) ? o = t : (o = t.handler,
    n = t);
    const r = oe;
    mt(this);
    const l = ri(i, o.bind(s), n);
    return r ? mt(r) : nt(),
    l
}
function li(e, t) {
    const n = t.split(".");
    return ()=>{
        let s = e;
        for (let i = 0; i < n.length && s; i++)
            s = s[n[i]];
        return s
    }
}
function et(e, t) {
    if (!K(e) || e.__v_skip || (t = t || new Set,
    t.has(e)))
        return e;
    if (t.add(e),
    X(e))
        et(e.value, t);
    else if (z(e))
        for (let n = 0; n < e.length; n++)
            et(e[n], t);
    else if (Ds(e) || ct(e))
        e.forEach(n=>{
            et(n, t)
        }
        );
    else if (ks(e))
        for (const n in e)
            et(e[n], t);
    return e
}
function Fo(e) {
    return P(e) ? {
        setup: e,
        name: e.name
    } : e
}
const At = e=>!!e.type.__asyncLoader
  , ci = e=>e.type.__isKeepAlive;
function Ho(e, t) {
    ai(e, "a", t)
}
function Bo(e, t) {
    ai(e, "da", t)
}
function ai(e, t, n=oe) {
    const s = e.__wdc || (e.__wdc = ()=>{
        let i = n;
        for (; i; ) {
            if (i.isDeactivated)
                return;
            i = i.parent
        }
        return e()
    }
    );
    if (cn(t, s, n),
    n) {
        let i = n.parent;
        for (; i && i.parent; )
            ci(i.parent.vnode) && Uo(s, t, n, i),
            i = i.parent
    }
}
function Uo(e, t, n, s) {
    const i = cn(t, e, s, !0);
    fi(()=>{
        On(s[t], i)
    }
    , n)
}
function cn(e, t, n=oe, s=!1) {
    if (n) {
        const i = n[e] || (n[e] = [])
          , o = t.__weh || (t.__weh = (...r)=>{
            if (n.isUnmounted)
                return;
            yt(),
            mt(n);
            const l = Me(t, n, e, r);
            return nt(),
            xt(),
            l
        }
        );
        return s ? i.unshift(o) : i.push(o),
        o
    }
}
const Oe = e=>(t,n=oe)=>(!zt || e === "sp") && cn(e, (...s)=>t(...s), n)
  , Kn = Oe("bm")
  , bt = Oe("m")
  , Yo = Oe("bu")
  , Wo = Oe("u")
  , ui = Oe("bum")
  , fi = Oe("um")
  , Vo = Oe("sp")
  , Ko = Oe("rtg")
  , Qo = Oe("rtc");
function Zo(e, t=oe) {
    cn("ec", e, t)
}
function di(e, t) {
    const n = ce;
    if (n === null)
        return e;
    const s = fn(n) || n.proxy
      , i = e.dirs || (e.dirs = []);
    for (let o = 0; o < t.length; o++) {
        let[r,l,a,h=W] = t[o];
        r && (P(r) && (r = {
            mounted: r,
            updated: r
        }),
        r.deep && et(l),
        i.push({
            dir: r,
            instance: s,
            value: l,
            oldValue: void 0,
            arg: a,
            modifiers: h
        }))
    }
    return e
}
function Ze(e, t, n, s) {
    const i = e.dirs
      , o = t && t.dirs;
    for (let r = 0; r < i.length; r++) {
        const l = i[r];
        o && (l.oldValue = o[r].value);
        let a = l.dir[s];
        a && (yt(),
        Me(a, n, 8, [e.el, l, e, t]),
        xt())
    }
}
const qo = Symbol();
function kt(e, t, n, s) {
    let i;
    const o = n && n[s];
    if (z(e) || ee(e)) {
        i = new Array(e.length);
        for (let r = 0, l = e.length; r < l; r++)
            i[r] = t(e[r], r, void 0, o && o[r])
    } else if (typeof e == "number") {
        i = new Array(e);
        for (let r = 0; r < e; r++)
            i[r] = t(r + 1, r, void 0, o && o[r])
    } else if (K(e))
        if (e[Symbol.iterator])
            i = Array.from(e, (r,l)=>t(r, l, void 0, o && o[l]));
        else {
            const r = Object.keys(e);
            i = new Array(r.length);
            for (let l = 0, a = r.length; l < a; l++) {
                const h = r[l];
                i[l] = t(e[h], h, l, o && o[l])
            }
        }
    else
        i = [];
    return n && (n[s] = i),
    i
}
function Go(e, t, n={}, s, i) {
    if (ce.isCE || ce.parent && At(ce.parent) && ce.parent.isCE)
        return t !== "default" && (n.name = t),
        te("slot", n, s && s());
    let o = e[t];
    o && o._c && (o._d = !1),
    B();
    const r = o && hi(o(n))
      , l = Xt(G, {
        key: n.key || r && r.key || `_${t}`
    }, r || (s ? s() : []), r && e._ === 1 ? 64 : -2);
    return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    o && o._c && (o._d = !0),
    l
}
function hi(e) {
    return e.some(t=>vi(t) ? !(t.type === Ye || t.type === G && !hi(t.children)) : !0) ? e : null
}
const jn = e=>e ? ji(e) ? fn(e) || e.proxy : jn(e.parent) : null
  , Ct = ae(Object.create(null), {
    $: e=>e,
    $el: e=>e.vnode.el,
    $data: e=>e.data,
    $props: e=>e.props,
    $attrs: e=>e.attrs,
    $slots: e=>e.slots,
    $refs: e=>e.refs,
    $parent: e=>jn(e.parent),
    $root: e=>jn(e.root),
    $emit: e=>e.emit,
    $options: e=>Qn(e),
    $forceUpdate: e=>e.f || (e.f = ()=>Vn(e.update)),
    $nextTick: e=>e.n || (e.n = jo.bind(e.proxy)),
    $watch: e=>$o.bind(e)
})
  , yn = (e,t)=>e !== W && !e.__isScriptSetup && $(e, t)
  , Jo = {
    get({_: e}, t) {
        const {ctx: n, setupState: s, data: i, props: o, accessCache: r, type: l, appContext: a} = e;
        let h;
        if (t[0] !== "$") {
            const C = r[t];
            if (C !== void 0)
                switch (C) {
                case 1:
                    return s[t];
                case 2:
                    return i[t];
                case 4:
                    return n[t];
                case 3:
                    return o[t]
                }
            else {
                if (yn(s, t))
                    return r[t] = 1,
                    s[t];
                if (i !== W && $(i, t))
                    return r[t] = 2,
                    i[t];
                if ((h = e.propsOptions[0]) && $(h, t))
                    return r[t] = 3,
                    o[t];
                if (n !== W && $(n, t))
                    return r[t] = 4,
                    n[t];
                An && (r[t] = 0)
            }
        }
        const f = Ct[t];
        let g, v;
        if (f)
            return t === "$attrs" && de(e, "get", t),
            f(e);
        if ((g = l.__cssModules) && (g = g[t]))
            return g;
        if (n !== W && $(n, t))
            return r[t] = 4,
            n[t];
        if (v = a.config.globalProperties,
        $(v, t))
            return v[t]
    },
    set({_: e}, t, n) {
        const {data: s, setupState: i, ctx: o} = e;
        return yn(i, t) ? (i[t] = n,
        !0) : s !== W && $(s, t) ? (s[t] = n,
        !0) : $(e.props, t) || t[0] === "$" && t.slice(1)in e ? !1 : (o[t] = n,
        !0)
    },
    has({_: {data: e, setupState: t, accessCache: n, ctx: s, appContext: i, propsOptions: o}}, r) {
        let l;
        return !!n[r] || e !== W && $(e, r) || yn(t, r) || (l = o[0]) && $(l, r) || $(s, r) || $(Ct, r) || $(i.config.globalProperties, r)
    },
    defineProperty(e, t, n) {
        return n.get != null ? e._.accessCache[t] = 0 : $(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
    }
};
let An = !0;
function Xo(e) {
    const t = Qn(e)
      , n = e.proxy
      , s = e.ctx;
    An = !1,
    t.beforeCreate && ds(t.beforeCreate, e, "bc");
    const {data: i, computed: o, methods: r, watch: l, provide: a, inject: h, created: f, beforeMount: g, mounted: v, beforeUpdate: C, updated: T, activated: O, deactivated: x, beforeDestroy: M, beforeUnmount: N, destroyed: S, unmounted: Q, render: he, renderTracked: Ee, renderTriggered: pe, errorCaptured: De, serverPrefetch: wt, expose: be, inheritAttrs: A, components: J, directives: ne, filters: ge} = t;
    if (h && er(h, s, null, e.appContext.config.unwrapInjectedRef),
    r)
        for (const Z in r) {
            const U = r[Z];
            P(U) && (s[Z] = U.bind(n))
        }
    if (i) {
        const Z = i.call(n, n);
        K(Z) && (e.data = Mt(Z))
    }
    if (An = !0,
    o)
        for (const Z in o) {
            const U = o[Z]
              , Ke = P(U) ? U.bind(n, n) : P(U.get) ? U.get.bind(n, n) : xe
              , Pt = !P(U) && P(U.set) ? U.set.bind(n) : xe
              , Qe = Ar({
                get: Ke,
                set: Pt
            });
            Object.defineProperty(s, Z, {
                enumerable: !0,
                configurable: !0,
                get: ()=>Qe.value,
                set: we=>Qe.value = we
            })
        }
    if (l)
        for (const Z in l)
            pi(l[Z], s, n, Z);
    if (a) {
        const Z = P(a) ? a.call(n) : a;
        Reflect.ownKeys(Z).forEach(U=>{
            Ro(U, Z[U])
        }
        )
    }
    f && ds(f, e, "c");
    function re(Z, U) {
        z(U) ? U.forEach(Ke=>Z(Ke.bind(n))) : U && Z(U.bind(n))
    }
    if (re(Kn, g),
    re(bt, v),
    re(Yo, C),
    re(Wo, T),
    re(Ho, O),
    re(Bo, x),
    re(Zo, De),
    re(Qo, Ee),
    re(Ko, pe),
    re(ui, N),
    re(fi, Q),
    re(Vo, wt),
    z(be))
        if (be.length) {
            const Z = e.exposed || (e.exposed = {});
            be.forEach(U=>{
                Object.defineProperty(Z, U, {
                    get: ()=>n[U],
                    set: Ke=>n[U] = Ke
                })
            }
            )
        } else
            e.exposed || (e.exposed = {});
    he && e.render === xe && (e.render = he),
    A != null && (e.inheritAttrs = A),
    J && (e.components = J),
    ne && (e.directives = ne)
}
function er(e, t, n=xe, s=!1) {
    z(e) && (e = Cn(e));
    for (const i in e) {
        const o = e[i];
        let r;
        K(o) ? "default"in o ? r = Vt(o.from || i, o.default, !0) : r = Vt(o.from || i) : r = Vt(o),
        X(r) && s ? Object.defineProperty(t, i, {
            enumerable: !0,
            configurable: !0,
            get: ()=>r.value,
            set: l=>r.value = l
        }) : t[i] = r
    }
}
function ds(e, t, n) {
    Me(z(e) ? e.map(s=>s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function pi(e, t, n, s) {
    const i = s.includes(".") ? li(n, s) : ()=>n[s];
    if (ee(e)) {
        const o = t[e];
        P(o) && ft(i, o)
    } else if (P(e))
        ft(i, e.bind(n));
    else if (K(e))
        if (z(e))
            e.forEach(o=>pi(o, t, n, s));
        else {
            const o = P(e.handler) ? e.handler.bind(n) : t[e.handler];
            P(o) && ft(i, o, e)
        }
}
function Qn(e) {
    const t = e.type
      , {mixins: n, extends: s} = t
      , {mixins: i, optionsCache: o, config: {optionMergeStrategies: r}} = e.appContext
      , l = o.get(t);
    let a;
    return l ? a = l : !i.length && !n && !s ? a = t : (a = {},
    i.length && i.forEach(h=>Jt(a, h, r, !0)),
    Jt(a, t, r)),
    K(t) && o.set(t, a),
    a
}
function Jt(e, t, n, s=!1) {
    const {mixins: i, extends: o} = t;
    o && Jt(e, o, n, !0),
    i && i.forEach(r=>Jt(e, r, n, !0));
    for (const r in t)
        if (!(s && r === "expose")) {
            const l = tr[r] || n && n[r];
            e[r] = l ? l(e[r], t[r]) : t[r]
        }
    return e
}
const tr = {
    data: hs,
    props: Ge,
    emits: Ge,
    methods: Ge,
    computed: Ge,
    beforeCreate: le,
    created: le,
    beforeMount: le,
    mounted: le,
    beforeUpdate: le,
    updated: le,
    beforeDestroy: le,
    beforeUnmount: le,
    destroyed: le,
    unmounted: le,
    activated: le,
    deactivated: le,
    errorCaptured: le,
    serverPrefetch: le,
    components: Ge,
    directives: Ge,
    watch: sr,
    provide: hs,
    inject: nr
};
function hs(e, t) {
    return t ? e ? function() {
        return ae(P(e) ? e.call(this, this) : e, P(t) ? t.call(this, this) : t)
    }
    : t : e
}
function nr(e, t) {
    return Ge(Cn(e), Cn(t))
}
function Cn(e) {
    if (z(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++)
            t[e[n]] = e[n];
        return t
    }
    return e
}
function le(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}
function Ge(e, t) {
    return e ? ae(ae(Object.create(null), e), t) : t
}
function sr(e, t) {
    if (!e)
        return t;
    if (!t)
        return e;
    const n = ae(Object.create(null), e);
    for (const s in t)
        n[s] = le(e[s], t[s]);
    return n
}
function ir(e, t, n, s=!1) {
    const i = {}
      , o = {};
    Zt(o, un, 1),
    e.propsDefaults = Object.create(null),
    gi(e, t, i, o);
    for (const r in e.propsOptions[0])
        r in i || (i[r] = void 0);
    n ? e.props = s ? i : xo(i) : e.type.props ? e.props = i : e.props = o,
    e.attrs = o
}
function or(e, t, n, s) {
    const {props: i, attrs: o, vnode: {patchFlag: r}} = e
      , l = F(i)
      , [a] = e.propsOptions;
    let h = !1;
    if ((s || r > 0) && !(r & 16)) {
        if (r & 8) {
            const f = e.vnode.dynamicProps;
            for (let g = 0; g < f.length; g++) {
                let v = f[g];
                if (rn(e.emitsOptions, v))
                    continue;
                const C = t[v];
                if (a)
                    if ($(o, v))
                        C !== o[v] && (o[v] = C,
                        h = !0);
                    else {
                        const T = ht(v);
                        i[T] = Tn(a, l, T, C, e, !1)
                    }
                else
                    C !== o[v] && (o[v] = C,
                    h = !0)
            }
        }
    } else {
        gi(e, t, i, o) && (h = !0);
        let f;
        for (const g in l)
            (!t || !$(t, g) && ((f = _t(g)) === g || !$(t, f))) && (a ? n && (n[g] !== void 0 || n[f] !== void 0) && (i[g] = Tn(a, l, g, void 0, e, !0)) : delete i[g]);
        if (o !== l)
            for (const g in o)
                (!t || !$(t, g) && !0) && (delete o[g],
                h = !0)
    }
    h && ke(e, "set", "$attrs")
}
function gi(e, t, n, s) {
    const [i,o] = e.propsOptions;
    let r = !1, l;
    if (t)
        for (let a in t) {
            if (Wt(a))
                continue;
            const h = t[a];
            let f;
            i && $(i, f = ht(a)) ? !o || !o.includes(f) ? n[f] = h : (l || (l = {}))[f] = h : rn(e.emitsOptions, a) || (!(a in s) || h !== s[a]) && (s[a] = h,
            r = !0)
        }
    if (o) {
        const a = F(n)
          , h = l || W;
        for (let f = 0; f < o.length; f++) {
            const g = o[f];
            n[g] = Tn(i, a, g, h[g], e, !$(h, g))
        }
    }
    return r
}
function Tn(e, t, n, s, i, o) {
    const r = e[n];
    if (r != null) {
        const l = $(r, "default");
        if (l && s === void 0) {
            const a = r.default;
            if (r.type !== Function && P(a)) {
                const {propsDefaults: h} = i;
                n in h ? s = h[n] : (mt(i),
                s = h[n] = a.call(null, t),
                nt())
            } else
                s = a
        }
        r[0] && (o && !l ? s = !1 : r[1] && (s === "" || s === _t(n)) && (s = !0))
    }
    return s
}
function mi(e, t, n=!1) {
    const s = t.propsCache
      , i = s.get(e);
    if (i)
        return i;
    const o = e.props
      , r = {}
      , l = [];
    let a = !1;
    if (!P(e)) {
        const f = g=>{
            a = !0;
            const [v,C] = mi(g, t, !0);
            ae(r, v),
            C && l.push(...C)
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(f),
        e.extends && f(e.extends),
        e.mixins && e.mixins.forEach(f)
    }
    if (!o && !a)
        return K(e) && s.set(e, lt),
        lt;
    if (z(o))
        for (let f = 0; f < o.length; f++) {
            const g = ht(o[f]);
            ps(g) && (r[g] = W)
        }
    else if (o)
        for (const f in o) {
            const g = ht(f);
            if (ps(g)) {
                const v = o[f]
                  , C = r[g] = z(v) || P(v) ? {
                    type: v
                } : Object.assign({}, v);
                if (C) {
                    const T = _s(Boolean, C.type)
                      , O = _s(String, C.type);
                    C[0] = T > -1,
                    C[1] = O < 0 || T < O,
                    (T > -1 || $(C, "default")) && l.push(g)
                }
            }
        }
    const h = [r, l];
    return K(e) && s.set(e, h),
    h
}
function ps(e) {
    return e[0] !== "$"
}
function gs(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/);
    return t ? t[1] : e === null ? "null" : ""
}
function ms(e, t) {
    return gs(e) === gs(t)
}
function _s(e, t) {
    return z(t) ? t.findIndex(n=>ms(n, e)) : P(t) && ms(t, e) ? 0 : -1
}
const _i = e=>e[0] === "_" || e === "$stable"
  , Zn = e=>z(e) ? e.map(je) : [je(e)]
  , rr = (e,t,n)=>{
    if (t._n)
        return t;
    const s = oi((...i)=>Zn(t(...i)), n);
    return s._c = !1,
    s
}
  , yi = (e,t,n)=>{
    const s = e._ctx;
    for (const i in e) {
        if (_i(i))
            continue;
        const o = e[i];
        if (P(o))
            t[i] = rr(i, o, s);
        else if (o != null) {
            const r = Zn(o);
            t[i] = ()=>r
        }
    }
}
  , xi = (e,t)=>{
    const n = Zn(t);
    e.slots.default = ()=>n
}
  , lr = (e,t)=>{
    if (e.vnode.shapeFlag & 32) {
        const n = t._;
        n ? (e.slots = F(t),
        Zt(t, "_", n)) : yi(t, e.slots = {})
    } else
        e.slots = {},
        t && xi(e, t);
    Zt(e.slots, un, 1)
}
  , cr = (e,t,n)=>{
    const {vnode: s, slots: i} = e;
    let o = !0
      , r = W;
    if (s.shapeFlag & 32) {
        const l = t._;
        l ? n && l === 1 ? o = !1 : (ae(i, t),
        !n && l === 1 && delete i._) : (o = !t.$stable,
        yi(t, i)),
        r = t
    } else
        t && (xi(e, t),
        r = {
            default: 1
        });
    if (o)
        for (const l in i)
            !_i(l) && !(l in r) && delete i[l]
}
;
function Mi() {
    return {
        app: null,
        config: {
            isNativeTag: Ri,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let ar = 0;
function ur(e, t) {
    return function(s, i=null) {
        P(s) || (s = Object.assign({}, s)),
        i != null && !K(i) && (i = null);
        const o = Mi()
          , r = new Set;
        let l = !1;
        const a = o.app = {
            _uid: ar++,
            _component: s,
            _props: i,
            _container: null,
            _context: o,
            _instance: null,
            version: Er,
            get config() {
                return o.config
            },
            set config(h) {},
            use(h, ...f) {
                return r.has(h) || (h && P(h.install) ? (r.add(h),
                h.install(a, ...f)) : P(h) && (r.add(h),
                h(a, ...f))),
                a
            },
            mixin(h) {
                return o.mixins.includes(h) || o.mixins.push(h),
                a
            },
            component(h, f) {
                return f ? (o.components[h] = f,
                a) : o.components[h]
            },
            directive(h, f) {
                return f ? (o.directives[h] = f,
                a) : o.directives[h]
            },
            mount(h, f, g) {
                if (!l) {
                    const v = te(s, i);
                    return v.appContext = o,
                    f && t ? t(v, h) : e(v, h, g),
                    l = !0,
                    a._container = h,
                    h.__vue_app__ = a,
                    fn(v.component) || v.component.proxy
                }
            },
            unmount() {
                l && (e(null, a._container),
                delete a._container.__vue_app__)
            },
            provide(h, f) {
                return o.provides[h] = f,
                a
            }
        };
        return a
    }
}
function En(e, t, n, s, i=!1) {
    if (z(e)) {
        e.forEach((v,C)=>En(v, t && (z(t) ? t[C] : t), n, s, i));
        return
    }
    if (At(s) && !i)
        return;
    const o = s.shapeFlag & 4 ? fn(s.component) || s.component.proxy : s.el
      , r = i ? null : o
      , {i: l, r: a} = e
      , h = t && t.r
      , f = l.refs === W ? l.refs = {} : l.refs
      , g = l.setupState;
    if (h != null && h !== a && (ee(h) ? (f[h] = null,
    $(g, h) && (g[h] = null)) : X(h) && (h.value = null)),
    P(a))
        He(a, l, 12, [r, f]);
    else {
        const v = ee(a)
          , C = X(a);
        if (v || C) {
            const T = ()=>{
                if (e.f) {
                    const O = v ? $(g, a) ? g[a] : f[a] : a.value;
                    i ? z(O) && On(O, o) : z(O) ? O.includes(o) || O.push(o) : v ? (f[a] = [o],
                    $(g, a) && (g[a] = f[a])) : (a.value = [o],
                    e.k && (f[e.k] = a.value))
                } else
                    v ? (f[a] = r,
                    $(g, a) && (g[a] = r)) : C && (a.value = r,
                    e.k && (f[e.k] = r))
            }
            ;
            r ? (T.id = -1,
            ue(T, n)) : T()
        }
    }
}
const ue = Po;
function fr(e) {
    return dr(e)
}
function dr(e, t) {
    const n = Yi();
    n.__VUE__ = !0;
    const {insert: s, remove: i, patchProp: o, createElement: r, createText: l, createComment: a, setText: h, setElementText: f, parentNode: g, nextSibling: v, setScopeId: C=xe, insertStaticContent: T} = e
      , O = (c,u,p,_=null,m=null,w=null,I=!1,b=null,L=!!u.dynamicChildren)=>{
        if (c === u)
            return;
        c && !Lt(c, u) && (_ = Rt(c),
        we(c, m, w, !0),
        c = null),
        u.patchFlag === -2 && (L = !1,
        u.dynamicChildren = null);
        const {type: y, ref: E, shapeFlag: j} = u;
        switch (y) {
        case an:
            x(c, u, p, _);
            break;
        case Ye:
            M(c, u, p, _);
            break;
        case Kt:
            c == null && N(u, p, _, I);
            break;
        case G:
            J(c, u, p, _, m, w, I, b, L);
            break;
        default:
            j & 1 ? he(c, u, p, _, m, w, I, b, L) : j & 6 ? ne(c, u, p, _, m, w, I, b, L) : (j & 64 || j & 128) && y.process(c, u, p, _, m, w, I, b, L, ot)
        }
        E != null && m && En(E, c && c.ref, w, u || c, !u)
    }
      , x = (c,u,p,_)=>{
        if (c == null)
            s(u.el = l(u.children), p, _);
        else {
            const m = u.el = c.el;
            u.children !== c.children && h(m, u.children)
        }
    }
      , M = (c,u,p,_)=>{
        c == null ? s(u.el = a(u.children || ""), p, _) : u.el = c.el
    }
      , N = (c,u,p,_)=>{
        [c.el,c.anchor] = T(c.children, u, p, _, c.el, c.anchor)
    }
      , S = ({el: c, anchor: u},p,_)=>{
        let m;
        for (; c && c !== u; )
            m = v(c),
            s(c, p, _),
            c = m;
        s(u, p, _)
    }
      , Q = ({el: c, anchor: u})=>{
        let p;
        for (; c && c !== u; )
            p = v(c),
            i(c),
            c = p;
        i(u)
    }
      , he = (c,u,p,_,m,w,I,b,L)=>{
        I = I || u.type === "svg",
        c == null ? Ee(u, p, _, m, w, I, b, L) : wt(c, u, m, w, I, b, L)
    }
      , Ee = (c,u,p,_,m,w,I,b)=>{
        let L, y;
        const {type: E, props: j, shapeFlag: D, transition: k, dirs: R} = c;
        if (L = c.el = r(c.type, w, j && j.is, j),
        D & 8 ? f(L, c.children) : D & 16 && De(c.children, L, null, _, m, w && E !== "foreignObject", I, b),
        R && Ze(c, null, _, "created"),
        j) {
            for (const H in j)
                H !== "value" && !Wt(H) && o(L, H, null, j[H], w, c.children, _, m, Ne);
            "value"in j && o(L, "value", null, j.value),
            (y = j.onVnodeBeforeMount) && Le(y, _, c)
        }
        pe(L, c, c.scopeId, I, _),
        R && Ze(c, null, _, "beforeMount");
        const Y = (!m || m && !m.pendingBranch) && k && !k.persisted;
        Y && k.beforeEnter(L),
        s(L, u, p),
        ((y = j && j.onVnodeMounted) || Y || R) && ue(()=>{
            y && Le(y, _, c),
            Y && k.enter(L),
            R && Ze(c, null, _, "mounted")
        }
        , m)
    }
      , pe = (c,u,p,_,m)=>{
        if (p && C(c, p),
        _)
            for (let w = 0; w < _.length; w++)
                C(c, _[w]);
        if (m) {
            let w = m.subTree;
            if (u === w) {
                const I = m.vnode;
                pe(c, I, I.scopeId, I.slotScopeIds, m.parent)
            }
        }
    }
      , De = (c,u,p,_,m,w,I,b,L=0)=>{
        for (let y = L; y < c.length; y++) {
            const E = c[y] = b ? Re(c[y]) : je(c[y]);
            O(null, E, u, p, _, m, w, I, b)
        }
    }
      , wt = (c,u,p,_,m,w,I)=>{
        const b = u.el = c.el;
        let {patchFlag: L, dynamicChildren: y, dirs: E} = u;
        L |= c.patchFlag & 16;
        const j = c.props || W
          , D = u.props || W;
        let k;
        p && qe(p, !1),
        (k = D.onVnodeBeforeUpdate) && Le(k, p, u, c),
        E && Ze(u, c, p, "beforeUpdate"),
        p && qe(p, !0);
        const R = m && u.type !== "foreignObject";
        if (y ? be(c.dynamicChildren, y, b, p, _, R, w) : I || U(c, u, b, null, p, _, R, w, !1),
        L > 0) {
            if (L & 16)
                A(b, u, j, D, p, _, m);
            else if (L & 2 && j.class !== D.class && o(b, "class", null, D.class, m),
            L & 4 && o(b, "style", j.style, D.style, m),
            L & 8) {
                const Y = u.dynamicProps;
                for (let H = 0; H < Y.length; H++) {
                    const q = Y[H]
                      , me = j[q]
                      , rt = D[q];
                    (rt !== me || q === "value") && o(b, q, me, rt, m, c.children, p, _, Ne)
                }
            }
            L & 1 && c.children !== u.children && f(b, u.children)
        } else
            !I && y == null && A(b, u, j, D, p, _, m);
        ((k = D.onVnodeUpdated) || E) && ue(()=>{
            k && Le(k, p, u, c),
            E && Ze(u, c, p, "updated")
        }
        , _)
    }
      , be = (c,u,p,_,m,w,I)=>{
        for (let b = 0; b < u.length; b++) {
            const L = c[b]
              , y = u[b]
              , E = L.el && (L.type === G || !Lt(L, y) || L.shapeFlag & 70) ? g(L.el) : p;
            O(L, y, E, null, _, m, w, I, !0)
        }
    }
      , A = (c,u,p,_,m,w,I)=>{
        if (p !== _) {
            if (p !== W)
                for (const b in p)
                    !Wt(b) && !(b in _) && o(c, b, p[b], null, I, u.children, m, w, Ne);
            for (const b in _) {
                if (Wt(b))
                    continue;
                const L = _[b]
                  , y = p[b];
                L !== y && b !== "value" && o(c, b, y, L, I, u.children, m, w, Ne)
            }
            "value"in _ && o(c, "value", p.value, _.value)
        }
    }
      , J = (c,u,p,_,m,w,I,b,L)=>{
        const y = u.el = c ? c.el : l("")
          , E = u.anchor = c ? c.anchor : l("");
        let {patchFlag: j, dynamicChildren: D, slotScopeIds: k} = u;
        k && (b = b ? b.concat(k) : k),
        c == null ? (s(y, p, _),
        s(E, p, _),
        De(u.children, p, E, m, w, I, b, L)) : j > 0 && j & 64 && D && c.dynamicChildren ? (be(c.dynamicChildren, D, p, m, w, I, b),
        (u.key != null || m && u === m.subTree) && bi(c, u, !0)) : U(c, u, p, E, m, w, I, b, L)
    }
      , ne = (c,u,p,_,m,w,I,b,L)=>{
        u.slotScopeIds = b,
        c == null ? u.shapeFlag & 512 ? m.ctx.activate(u, p, _, I, L) : ge(u, p, _, m, w, I, L) : it(c, u, L)
    }
      , ge = (c,u,p,_,m,w,I)=>{
        const b = c.component = br(c, _, m);
        if (ci(c) && (b.ctx.renderer = ot),
        wr(b),
        b.asyncDep) {
            if (m && m.registerDep(b, re),
            !c.el) {
                const L = b.subTree = te(Ye);
                M(null, L, u, p)
            }
            return
        }
        re(b, c, u, p, m, w, I)
    }
      , it = (c,u,p)=>{
        const _ = u.component = c.component;
        if (ko(c, u, p))
            if (_.asyncDep && !_.asyncResolved) {
                Z(_, u, p);
                return
            } else
                _.next = u,
                Co(_.update),
                _.update();
        else
            u.el = c.el,
            _.vnode = u
    }
      , re = (c,u,p,_,m,w,I)=>{
        const b = ()=>{
            if (c.isMounted) {
                let {next: E, bu: j, u: D, parent: k, vnode: R} = c, Y = E, H;
                qe(c, !1),
                E ? (E.el = R.el,
                Z(c, E, I)) : E = R,
                j && mn(j),
                (H = E.props && E.props.onVnodeBeforeUpdate) && Le(H, k, E, R),
                qe(c, !0);
                const q = _n(c)
                  , me = c.subTree;
                c.subTree = q,
                O(me, q, g(me.el), Rt(me), c, m, w),
                E.el = q.el,
                Y === null && Oo(c, q.el),
                D && ue(D, m),
                (H = E.props && E.props.onVnodeUpdated) && ue(()=>Le(H, k, E, R), m)
            } else {
                let E;
                const {el: j, props: D} = u
                  , {bm: k, m: R, parent: Y} = c
                  , H = At(u);
                if (qe(c, !1),
                k && mn(k),
                !H && (E = D && D.onVnodeBeforeMount) && Le(E, Y, u),
                qe(c, !0),
                j && pn) {
                    const q = ()=>{
                        c.subTree = _n(c),
                        pn(j, c.subTree, c, m, null)
                    }
                    ;
                    H ? u.type.__asyncLoader().then(()=>!c.isUnmounted && q()) : q()
                } else {
                    const q = c.subTree = _n(c);
                    O(null, q, p, _, c, m, w),
                    u.el = q.el
                }
                if (R && ue(R, m),
                !H && (E = D && D.onVnodeMounted)) {
                    const q = u;
                    ue(()=>Le(E, Y, q), m)
                }
                (u.shapeFlag & 256 || Y && At(Y.vnode) && Y.vnode.shapeFlag & 256) && c.a && ue(c.a, m),
                c.isMounted = !0,
                u = p = _ = null
            }
        }
          , L = c.effect = new $n(b,()=>Vn(y),c.scope)
          , y = c.update = ()=>L.run();
        y.id = c.uid,
        qe(c, !0),
        y()
    }
      , Z = (c,u,p)=>{
        u.component = c;
        const _ = c.vnode.props;
        c.vnode = u,
        c.next = null,
        or(c, u.props, _, p),
        cr(c, u.children, p),
        yt(),
        us(),
        xt()
    }
      , U = (c,u,p,_,m,w,I,b,L=!1)=>{
        const y = c && c.children
          , E = c ? c.shapeFlag : 0
          , j = u.children
          , {patchFlag: D, shapeFlag: k} = u;
        if (D > 0) {
            if (D & 128) {
                Pt(y, j, p, _, m, w, I, b, L);
                return
            } else if (D & 256) {
                Ke(y, j, p, _, m, w, I, b, L);
                return
            }
        }
        k & 8 ? (E & 16 && Ne(y, m, w),
        j !== y && f(p, j)) : E & 16 ? k & 16 ? Pt(y, j, p, _, m, w, I, b, L) : Ne(y, m, w, !0) : (E & 8 && f(p, ""),
        k & 16 && De(j, p, _, m, w, I, b, L))
    }
      , Ke = (c,u,p,_,m,w,I,b,L)=>{
        c = c || lt,
        u = u || lt;
        const y = c.length
          , E = u.length
          , j = Math.min(y, E);
        let D;
        for (D = 0; D < j; D++) {
            const k = u[D] = L ? Re(u[D]) : je(u[D]);
            O(c[D], k, p, null, m, w, I, b, L)
        }
        y > E ? Ne(c, m, w, !0, !1, j) : De(u, p, _, m, w, I, b, L, j)
    }
      , Pt = (c,u,p,_,m,w,I,b,L)=>{
        let y = 0;
        const E = u.length;
        let j = c.length - 1
          , D = E - 1;
        for (; y <= j && y <= D; ) {
            const k = c[y]
              , R = u[y] = L ? Re(u[y]) : je(u[y]);
            if (Lt(k, R))
                O(k, R, p, null, m, w, I, b, L);
            else
                break;
            y++
        }
        for (; y <= j && y <= D; ) {
            const k = c[j]
              , R = u[D] = L ? Re(u[D]) : je(u[D]);
            if (Lt(k, R))
                O(k, R, p, null, m, w, I, b, L);
            else
                break;
            j--,
            D--
        }
        if (y > j) {
            if (y <= D) {
                const k = D + 1
                  , R = k < E ? u[k].el : _;
                for (; y <= D; )
                    O(null, u[y] = L ? Re(u[y]) : je(u[y]), p, R, m, w, I, b, L),
                    y++
            }
        } else if (y > D)
            for (; y <= j; )
                we(c[y], m, w, !0),
                y++;
        else {
            const k = y
              , R = y
              , Y = new Map;
            for (y = R; y <= D; y++) {
                const fe = u[y] = L ? Re(u[y]) : je(u[y]);
                fe.key != null && Y.set(fe.key, y)
            }
            let H, q = 0;
            const me = D - R + 1;
            let rt = !1
              , Xn = 0;
            const vt = new Array(me);
            for (y = 0; y < me; y++)
                vt[y] = 0;
            for (y = k; y <= j; y++) {
                const fe = c[y];
                if (q >= me) {
                    we(fe, m, w, !0);
                    continue
                }
                let ve;
                if (fe.key != null)
                    ve = Y.get(fe.key);
                else
                    for (H = R; H <= D; H++)
                        if (vt[H - R] === 0 && Lt(fe, u[H])) {
                            ve = H;
                            break
                        }
                ve === void 0 ? we(fe, m, w, !0) : (vt[ve - R] = y + 1,
                ve >= Xn ? Xn = ve : rt = !0,
                O(fe, u[ve], p, null, m, w, I, b, L),
                q++)
            }
            const es = rt ? hr(vt) : lt;
            for (H = es.length - 1,
            y = me - 1; y >= 0; y--) {
                const fe = R + y
                  , ve = u[fe]
                  , ts = fe + 1 < E ? u[fe + 1].el : _;
                vt[y] === 0 ? O(null, ve, p, ts, m, w, I, b, L) : rt && (H < 0 || y !== es[H] ? Qe(ve, p, ts, 2) : H--)
            }
        }
    }
      , Qe = (c,u,p,_,m=null)=>{
        const {el: w, type: I, transition: b, children: L, shapeFlag: y} = c;
        if (y & 6) {
            Qe(c.component.subTree, u, p, _);
            return
        }
        if (y & 128) {
            c.suspense.move(u, p, _);
            return
        }
        if (y & 64) {
            I.move(c, u, p, ot);
            return
        }
        if (I === G) {
            s(w, u, p);
            for (let j = 0; j < L.length; j++)
                Qe(L[j], u, p, _);
            s(c.anchor, u, p);
            return
        }
        if (I === Kt) {
            S(c, u, p);
            return
        }
        if (_ !== 2 && y & 1 && b)
            if (_ === 0)
                b.beforeEnter(w),
                s(w, u, p),
                ue(()=>b.enter(w), m);
            else {
                const {leave: j, delayLeave: D, afterLeave: k} = b
                  , R = ()=>s(w, u, p)
                  , Y = ()=>{
                    j(w, ()=>{
                        R(),
                        k && k()
                    }
                    )
                }
                ;
                D ? D(w, R, Y) : Y()
            }
        else
            s(w, u, p)
    }
      , we = (c,u,p,_=!1,m=!1)=>{
        const {type: w, props: I, ref: b, children: L, dynamicChildren: y, shapeFlag: E, patchFlag: j, dirs: D} = c;
        if (b != null && En(b, null, p, c, !0),
        E & 256) {
            u.ctx.deactivate(c);
            return
        }
        const k = E & 1 && D
          , R = !At(c);
        let Y;
        if (R && (Y = I && I.onVnodeBeforeUnmount) && Le(Y, u, c),
        E & 6)
            Di(c.component, p, _);
        else {
            if (E & 128) {
                c.suspense.unmount(p, _);
                return
            }
            k && Ze(c, null, u, "beforeUnmount"),
            E & 64 ? c.type.remove(c, u, p, m, ot, _) : y && (w !== G || j > 0 && j & 64) ? Ne(y, u, p, !1, !0) : (w === G && j & 384 || !m && E & 16) && Ne(L, u, p),
            _ && Gn(c)
        }
        (R && (Y = I && I.onVnodeUnmounted) || k) && ue(()=>{
            Y && Le(Y, u, c),
            k && Ze(c, null, u, "unmounted")
        }
        , p)
    }
      , Gn = c=>{
        const {type: u, el: p, anchor: _, transition: m} = c;
        if (u === G) {
            Ei(p, _);
            return
        }
        if (u === Kt) {
            Q(c);
            return
        }
        const w = ()=>{
            i(p),
            m && !m.persisted && m.afterLeave && m.afterLeave()
        }
        ;
        if (c.shapeFlag & 1 && m && !m.persisted) {
            const {leave: I, delayLeave: b} = m
              , L = ()=>I(p, w);
            b ? b(c.el, w, L) : L()
        } else
            w()
    }
      , Ei = (c,u)=>{
        let p;
        for (; c !== u; )
            p = v(c),
            i(c),
            c = p;
        i(u)
    }
      , Di = (c,u,p)=>{
        const {bum: _, scope: m, update: w, subTree: I, um: b} = c;
        _ && mn(_),
        m.stop(),
        w && (w.active = !1,
        we(I, c, u, p)),
        b && ue(b, u),
        ue(()=>{
            c.isUnmounted = !0
        }
        , u),
        u && u.pendingBranch && !u.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === u.pendingId && (u.deps--,
        u.deps === 0 && u.resolve())
    }
      , Ne = (c,u,p,_=!1,m=!1,w=0)=>{
        for (let I = w; I < c.length; I++)
            we(c[I], u, p, _, m)
    }
      , Rt = c=>c.shapeFlag & 6 ? Rt(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : v(c.anchor || c.el)
      , Jn = (c,u,p)=>{
        c == null ? u._vnode && we(u._vnode, null, null, !0) : O(u._vnode || null, c, u, null, null, null, p),
        us(),
        ni(),
        u._vnode = c
    }
      , ot = {
        p: O,
        um: we,
        m: Qe,
        r: Gn,
        mt: ge,
        mc: De,
        pc: U,
        pbc: be,
        n: Rt,
        o: e
    };
    let hn, pn;
    return t && ([hn,pn] = t(ot)),
    {
        render: Jn,
        hydrate: hn,
        createApp: ur(Jn, hn)
    }
}
function qe({effect: e, update: t}, n) {
    e.allowRecurse = t.allowRecurse = n
}
function bi(e, t, n=!1) {
    const s = e.children
      , i = t.children;
    if (z(s) && z(i))
        for (let o = 0; o < s.length; o++) {
            const r = s[o];
            let l = i[o];
            l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[o] = Re(i[o]),
            l.el = r.el),
            n || bi(r, l)),
            l.type === an && (l.el = r.el)
        }
}
function hr(e) {
    const t = e.slice()
      , n = [0];
    let s, i, o, r, l;
    const a = e.length;
    for (s = 0; s < a; s++) {
        const h = e[s];
        if (h !== 0) {
            if (i = n[n.length - 1],
            e[i] < h) {
                t[s] = i,
                n.push(s);
                continue
            }
            for (o = 0,
            r = n.length - 1; o < r; )
                l = o + r >> 1,
                e[n[l]] < h ? o = l + 1 : r = l;
            h < e[n[o]] && (o > 0 && (t[s] = n[o - 1]),
            n[o] = s)
        }
    }
    for (o = n.length,
    r = n[o - 1]; o-- > 0; )
        n[o] = r,
        r = t[r];
    return n
}
const pr = e=>e.__isTeleport
  , G = Symbol(void 0)
  , an = Symbol(void 0)
  , Ye = Symbol(void 0)
  , Kt = Symbol(void 0)
  , Tt = [];
let ye = null;
function B(e=!1) {
    Tt.push(ye = e ? null : [])
}
function gr() {
    Tt.pop(),
    ye = Tt[Tt.length - 1] || null
}
let Ot = 1;
function ys(e) {
    Ot += e
}
function wi(e) {
    return e.dynamicChildren = Ot > 0 ? ye || lt : null,
    gr(),
    Ot > 0 && ye && ye.push(e),
    e
}
function V(e, t, n, s, i, o) {
    return wi(d(e, t, n, s, i, o, !0))
}
function Xt(e, t, n, s, i) {
    return wi(te(e, t, n, s, i, !0))
}
function vi(e) {
    return e ? e.__v_isVNode === !0 : !1
}
function Lt(e, t) {
    return e.type === t.type && e.key === t.key
}
const un = "__vInternal"
  , Li = ({key: e})=>e != null ? e : null
  , Qt = ({ref: e, ref_key: t, ref_for: n})=>e != null ? ee(e) || X(e) || P(e) ? {
    i: ce,
    r: e,
    k: t,
    f: !!n
} : e : null;
function d(e, t=null, n=null, s=0, i=null, o=e === G ? 0 : 1, r=!1, l=!1) {
    const a = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Li(t),
        ref: t && Qt(t),
        scopeId: ln,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: o,
        patchFlag: s,
        dynamicProps: i,
        dynamicChildren: null,
        appContext: null,
        ctx: ce
    };
    return l ? (qn(a, n),
    o & 128 && e.normalize(a)) : n && (a.shapeFlag |= ee(n) ? 8 : 16),
    Ot > 0 && !r && ye && (a.patchFlag > 0 || o & 6) && a.patchFlag !== 32 && ye.push(a),
    a
}
const te = mr;
function mr(e, t=null, n=null, s=0, i=null, o=!1) {
    if ((!e || e === qo) && (e = Ye),
    vi(e)) {
        const l = gt(e, t, !0);
        return n && qn(l, n),
        Ot > 0 && !o && ye && (l.shapeFlag & 6 ? ye[ye.indexOf(e)] = l : ye.push(l)),
        l.patchFlag |= -2,
        l
    }
    if (jr(e) && (e = e.__vccOpts),
    t) {
        t = _r(t);
        let {class: l, style: a} = t;
        l && !ee(l) && (t.class = Be(l)),
        K(a) && (Qs(a) && !z(a) && (a = ae({}, a)),
        t.style = st(a))
    }
    const r = ee(e) ? 1 : zo(e) ? 128 : pr(e) ? 64 : K(e) ? 4 : P(e) ? 2 : 0;
    return d(e, t, n, s, i, r, o, !0)
}
function _r(e) {
    return e ? Qs(e) || un in e ? ae({}, e) : e : null
}
function gt(e, t, n=!1) {
    const {props: s, ref: i, patchFlag: o, children: r} = e
      , l = t ? yr(s || {}, t) : s;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: l,
        key: l && Li(l),
        ref: t && t.ref ? n && i ? z(i) ? i.concat(Qt(t)) : [i, Qt(t)] : Qt(t) : i,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: r,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== G ? o === -1 ? 16 : o | 16 : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && gt(e.ssContent),
        ssFallback: e.ssFallback && gt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx
    }
}
function dt(e=" ", t=0) {
    return te(an, null, e, t)
}
function Ii(e, t) {
    const n = te(Kt, null, e);
    return n.staticCount = t,
    n
}
function Dn(e="", t=!1) {
    return t ? (B(),
    Xt(Ye, null, e)) : te(Ye, null, e)
}
function je(e) {
    return e == null || typeof e == "boolean" ? te(Ye) : z(e) ? te(G, null, e.slice()) : typeof e == "object" ? Re(e) : te(an, null, String(e))
}
function Re(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : gt(e)
}
function qn(e, t) {
    let n = 0;
    const {shapeFlag: s} = e;
    if (t == null)
        t = null;
    else if (z(t))
        n = 16;
    else if (typeof t == "object")
        if (s & 65) {
            const i = t.default;
            i && (i._c && (i._d = !1),
            qn(e, i()),
            i._c && (i._d = !0));
            return
        } else {
            n = 32;
            const i = t._;
            !i && !(un in t) ? t._ctx = ce : i === 3 && ce && (ce.slots._ === 1 ? t._ = 1 : (t._ = 2,
            e.patchFlag |= 1024))
        }
    else
        P(t) ? (t = {
            default: t,
            _ctx: ce
        },
        n = 32) : (t = String(t),
        s & 64 ? (n = 16,
        t = [dt(t)]) : n = 8);
    e.children = t,
    e.shapeFlag |= n
}
function yr(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const s = e[n];
        for (const i in s)
            if (i === "class")
                t.class !== s.class && (t.class = Be([t.class, s.class]));
            else if (i === "style")
                t.style = st([t.style, s.style]);
            else if (en(i)) {
                const o = t[i]
                  , r = s[i];
                r && o !== r && !(z(o) && o.includes(r)) && (t[i] = o ? [].concat(o, r) : r)
            } else
                i !== "" && (t[i] = s[i])
    }
    return t
}
function Le(e, t, n, s=null) {
    Me(e, t, 7, [n, s])
}
const xr = Mi();
let Mr = 0;
function br(e, t, n) {
    const s = e.type
      , i = (t ? t.appContext : e.appContext) || xr
      , o = {
        uid: Mr++,
        vnode: e,
        type: s,
        parent: t,
        appContext: i,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new Wi(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(i.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: mi(s, i),
        emitsOptions: ii(s, i),
        emit: null,
        emitted: null,
        propsDefaults: W,
        inheritAttrs: s.inheritAttrs,
        ctx: W,
        data: W,
        props: W,
        attrs: W,
        slots: W,
        refs: W,
        setupState: W,
        setupContext: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return o.ctx = {
        _: o
    },
    o.root = t ? t.root : o,
    o.emit = Do.bind(null, o),
    e.ce && e.ce(o),
    o
}
let oe = null;
const mt = e=>{
    oe = e,
    e.scope.on()
}
  , nt = ()=>{
    oe && oe.scope.off(),
    oe = null
}
;
function ji(e) {
    return e.vnode.shapeFlag & 4
}
let zt = !1;
function wr(e, t=!1) {
    zt = t;
    const {props: n, children: s} = e.vnode
      , i = ji(e);
    ir(e, n, i, t),
    lr(e, s);
    const o = i ? vr(e, t) : void 0;
    return zt = !1,
    o
}
function vr(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null),
    e.proxy = Zs(new Proxy(e.ctx,Jo));
    const {setup: s} = n;
    if (s) {
        const i = e.setupContext = s.length > 1 ? Ir(e) : null;
        mt(e),
        yt();
        const o = He(s, e, 0, [e.props, i]);
        if (xt(),
        nt(),
        Ns(o)) {
            if (o.then(nt, nt),
            t)
                return o.then(r=>{
                    xs(e, r, t)
                }
                ).catch(r=>{
                    on(r, e, 0)
                }
                );
            e.asyncDep = o
        } else
            xs(e, o, t)
    } else
        Ai(e, t)
}
function xs(e, t, n) {
    P(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : K(t) && (e.setupState = Js(t)),
    Ai(e, n)
}
let Ms;
function Ai(e, t, n) {
    const s = e.type;
    if (!e.render) {
        if (!t && Ms && !s.render) {
            const i = s.template || Qn(e).template;
            if (i) {
                const {isCustomElement: o, compilerOptions: r} = e.appContext.config
                  , {delimiters: l, compilerOptions: a} = s
                  , h = ae(ae({
                    isCustomElement: o,
                    delimiters: l
                }, r), a);
                s.render = Ms(i, h)
            }
        }
        e.render = s.render || xe
    }
    mt(e),
    yt(),
    Xo(e),
    xt(),
    nt()
}
function Lr(e) {
    return new Proxy(e.attrs,{
        get(t, n) {
            return de(e, "get", "$attrs"),
            t[n]
        }
    })
}
function Ir(e) {
    const t = s=>{
        e.exposed = s || {}
    }
    ;
    let n;
    return {
        get attrs() {
            return n || (n = Lr(e))
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}
function fn(e) {
    if (e.exposed)
        return e.exposeProxy || (e.exposeProxy = new Proxy(Js(Zs(e.exposed)),{
            get(t, n) {
                if (n in t)
                    return t[n];
                if (n in Ct)
                    return Ct[n](e)
            },
            has(t, n) {
                return n in t || n in Ct
            }
        }))
}
function jr(e) {
    return P(e) && "__vccOpts"in e
}
const Ar = (e,t)=>Lo(e, t, zt)
  , Cr = Symbol("")
  , Tr = ()=>Vt(Cr)
  , Er = "3.2.45"
  , Dr = "http://www.w3.org/2000/svg"
  , Xe = typeof document < "u" ? document : null
  , bs = Xe && Xe.createElement("template")
  , Nr = {
    insert: (e,t,n)=>{
        t.insertBefore(e, n || null)
    }
    ,
    remove: e=>{
        const t = e.parentNode;
        t && t.removeChild(e)
    }
    ,
    createElement: (e,t,n,s)=>{
        const i = t ? Xe.createElementNS(Dr, e) : Xe.createElement(e, n ? {
            is: n
        } : void 0);
        return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple),
        i
    }
    ,
    createText: e=>Xe.createTextNode(e),
    createComment: e=>Xe.createComment(e),
    setText: (e,t)=>{
        e.nodeValue = t
    }
    ,
    setElementText: (e,t)=>{
        e.textContent = t
    }
    ,
    parentNode: e=>e.parentNode,
    nextSibling: e=>e.nextSibling,
    querySelector: e=>Xe.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, s, i, o) {
        const r = n ? n.previousSibling : t.lastChild;
        if (i && (i === o || i.nextSibling))
            for (; t.insertBefore(i.cloneNode(!0), n),
            !(i === o || !(i = i.nextSibling)); )
                ;
        else {
            bs.innerHTML = s ? `<svg>${e}</svg>` : e;
            const l = bs.content;
            if (s) {
                const a = l.firstChild;
                for (; a.firstChild; )
                    l.appendChild(a.firstChild);
                l.removeChild(a)
            }
            t.insertBefore(l, n)
        }
        return [r ? r.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
};
function Sr(e, t, n) {
    const s = e._vtc;
    s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
function kr(e, t, n) {
    const s = e.style
      , i = ee(n);
    if (n && !i) {
        for (const o in n)
            Nn(s, o, n[o]);
        if (t && !ee(t))
            for (const o in t)
                n[o] == null && Nn(s, o, "")
    } else {
        const o = s.display;
        i ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
        "_vod"in e && (s.display = o)
    }
}
const ws = /\s*!important$/;
function Nn(e, t, n) {
    if (z(n))
        n.forEach(s=>Nn(e, t, s));
    else if (n == null && (n = ""),
    t.startsWith("--"))
        e.setProperty(t, n);
    else {
        const s = Or(e, t);
        ws.test(n) ? e.setProperty(_t(s), n.replace(ws, ""), "important") : e[s] = n
    }
}
const vs = ["Webkit", "Moz", "ms"]
  , xn = {};
function Or(e, t) {
    const n = xn[t];
    if (n)
        return n;
    let s = ht(t);
    if (s !== "filter" && s in e)
        return xn[t] = s;
    s = Os(s);
    for (let i = 0; i < vs.length; i++) {
        const o = vs[i] + s;
        if (o in e)
            return xn[t] = o
    }
    return t
}
const Ls = "http://www.w3.org/1999/xlink";
function zr(e, t, n, s, i) {
    if (s && t.startsWith("xlink:"))
        n == null ? e.removeAttributeNS(Ls, t.slice(6, t.length)) : e.setAttributeNS(Ls, t, n);
    else {
        const o = Pi(t);
        n == null || o && !Ts(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
    }
}
function Pr(e, t, n, s, i, o, r) {
    if (t === "innerHTML" || t === "textContent") {
        s && r(s, i, o),
        e[t] = n == null ? "" : n;
        return
    }
    if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
        e._value = n;
        const a = n == null ? "" : n;
        (e.value !== a || e.tagName === "OPTION") && (e.value = a),
        n == null && e.removeAttribute(t);
        return
    }
    let l = !1;
    if (n === "" || n == null) {
        const a = typeof e[t];
        a === "boolean" ? n = Ts(n) : n == null && a === "string" ? (n = "",
        l = !0) : a === "number" && (n = 0,
        l = !0)
    }
    try {
        e[t] = n
    } catch {}
    l && e.removeAttribute(t)
}
function Rr(e, t, n, s) {
    e.addEventListener(t, n, s)
}
function $r(e, t, n, s) {
    e.removeEventListener(t, n, s)
}
function Fr(e, t, n, s, i=null) {
    const o = e._vei || (e._vei = {})
      , r = o[t];
    if (s && r)
        r.value = s;
    else {
        const [l,a] = Hr(t);
        if (s) {
            const h = o[t] = Yr(s, i);
            Rr(e, l, h, a)
        } else
            r && ($r(e, l, r, a),
            o[t] = void 0)
    }
}
const Is = /(?:Once|Passive|Capture)$/;
function Hr(e) {
    let t;
    if (Is.test(e)) {
        t = {};
        let s;
        for (; s = e.match(Is); )
            e = e.slice(0, e.length - s[0].length),
            t[s[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : _t(e.slice(2)), t]
}
let Mn = 0;
const Br = Promise.resolve()
  , Ur = ()=>Mn || (Br.then(()=>Mn = 0),
Mn = Date.now());
function Yr(e, t) {
    const n = s=>{
        if (!s._vts)
            s._vts = Date.now();
        else if (s._vts <= n.attached)
            return;
        Me(Wr(s, n.value), t, 5, [s])
    }
    ;
    return n.value = e,
    n.attached = Ur(),
    n
}
function Wr(e, t) {
    if (z(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = ()=>{
            n.call(e),
            e._stopped = !0
        }
        ,
        t.map(s=>i=>!i._stopped && s && s(i))
    } else
        return t
}
const js = /^on[a-z]/
  , Vr = (e,t,n,s,i=!1,o,r,l,a)=>{
    t === "class" ? Sr(e, s, i) : t === "style" ? kr(e, n, s) : en(t) ? kn(t) || Fr(e, t, n, s, r) : (t[0] === "." ? (t = t.slice(1),
    !0) : t[0] === "^" ? (t = t.slice(1),
    !1) : Kr(e, t, s, i)) ? Pr(e, t, s, o, r, l, a) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s),
    zr(e, t, s, i))
}
;
function Kr(e, t, n, s) {
    return s ? !!(t === "innerHTML" || t === "textContent" || t in e && js.test(t) && P(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || js.test(t) && ee(n) ? !1 : t in e
}
const Qr = ["ctrl", "shift", "alt", "meta"]
  , Zr = {
    stop: e=>e.stopPropagation(),
    prevent: e=>e.preventDefault(),
    self: e=>e.target !== e.currentTarget,
    ctrl: e=>!e.ctrlKey,
    shift: e=>!e.shiftKey,
    alt: e=>!e.altKey,
    meta: e=>!e.metaKey,
    left: e=>"button"in e && e.button !== 0,
    middle: e=>"button"in e && e.button !== 1,
    right: e=>"button"in e && e.button !== 2,
    exact: (e,t)=>Qr.some(n=>e[`${n}Key`] && !t.includes(n))
}
  , qr = (e,t)=>(n,...s)=>{
    for (let i = 0; i < t.length; i++) {
        const o = Zr[t[i]];
        if (o && o(n, t))
            return
    }
    return e(n, ...s)
}
  , Ci = {
    beforeMount(e, {value: t}, {transition: n}) {
        e._vod = e.style.display === "none" ? "" : e.style.display,
        n && t ? n.beforeEnter(e) : It(e, t)
    },
    mounted(e, {value: t}, {transition: n}) {
        n && t && n.enter(e)
    },
    updated(e, {value: t, oldValue: n}, {transition: s}) {
        !t != !n && (s ? t ? (s.beforeEnter(e),
        It(e, !0),
        s.enter(e)) : s.leave(e, ()=>{
            It(e, !1)
        }
        ) : It(e, t))
    },
    beforeUnmount(e, {value: t}) {
        It(e, t)
    }
};
function It(e, t) {
    e.style.display = t ? e._vod : "none"
}
const Gr = ae({
    patchProp: Vr
}, Nr);
let As;
function Jr() {
    return As || (As = fr(Gr))
}
const Xr = (...e)=>{
    const t = Jr().createApp(...e)
      , {mount: n} = t;
    return t.mount = s=>{
        const i = el(s);
        if (!i)
            return;
        const o = t._component;
        !P(o) && !o.render && !o.template && (o.template = i.innerHTML),
        i.innerHTML = "";
        const r = n(i, !1, i instanceof SVGElement);
        return i instanceof Element && (i.removeAttribute("v-cloak"),
        i.setAttribute("data-v-app", "")),
        r
    }
    ,
    t
}
;
function el(e) {
    return ee(e) ? document.querySelector(e) : e
}
const Te = (e,t)=>{
    const n = e.__vccOpts || e;
    for (const [s,i] of t)
        n[s] = i;
    return n
}
  , tl = e=>(We("data-v-d8262657"),
e = e(),
Ve(),
e)
  , nl = {
    class: "container"
}
  , sl = ["src", "alt"]
  , il = Ii('', 2)
  , ol = [il]
  , rl = ["data-jump"]
  , ll = tl(()=>d("span", null, null, -1))
  , cl = [ll]
  , al = {
    class: "navigation"
}
  , ul = ["data-jump"]
  , fl = ["onClick", "data-jump"]
  , dl = {
    class: "icon"
}
  , hl = ["innerHTML"]
  , pl = {
    class: "text"
}
  , gl = {
    __name: "index",
    setup(e) {
        let t = Ce(!0)
          , n = Mt({
            img: {
                src: "/favicon.svg",
                alt: "logo"
            },
    
        });
        function s() {
            let l = document.createElement("script");
            l.type = "text/javascript",
            document.body.appendChild(l),
            l.src = "/lib/asteroids.min.js"
        }
        function i(l) {
            if (l.currentTarget.dataset.jump === "index")
                window.scrollTo(0, 0);
            else
                try {
                    document.getElementById(l.currentTarget.dataset.jump).scrollIntoView({
                        behavior: "smooth"
                    })
                } catch (a) {
                    console.warn(a)
                }
        }
        function o() {
            document.querySelector("body").insertAdjacentHTML("beforeend", '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>'),
            setTimeout(function() {
                document.querySelector("body").classList.contains("DarkMode") ? document.querySelector("body").classList.remove("DarkMode") : document.querySelector("body").classList.add("DarkMode"),
                setTimeout(function() {
                    document.getElementsByClassName("Cuteen_DarkSky")[0].style.transition = "opacity 3s",
                    document.getElementsByClassName("Cuteen_DarkSky")[0].style.opacity = "0",
                    setTimeout(function() {
                        document.getElementsByClassName("Cuteen_DarkSky")[0].remove()
                    }, 1e3)
                }, 2e3)
            }),
            (document.querySelector("html").className === "dark" ? "dark" : "light") === "light" ? document.querySelector("html").className = "dark" : document.querySelector("html").className = "light",
            typeof utterancesTheme == "function" && utterancesTheme(),
            typeof FB == "object" && window.loadFBComment(),
            window.DISQUS && document.getElementById("disqus_thread").children.length && setTimeout(()=>window.disqusReset(), 200)
        }
        function r(l, a) {
            i(l),
            n.menu[a].class = "active",
            setTimeout(()=>{
                n.menu[a].class = ""
            }
            , 1e3)
        }
        return bt(()=>{
            class l {
                constructor(x=0, M=0, N=0) {
                    this.x = x,
                    this.y = M,
                    this.z = N
                }
                static add(x, M) {
                    return x.copy().add(M.copy())
                }
                static rem(x, M) {
                    return x.copy().rem(M.copy())
                }
                static sub(x, M) {
                    return x.copy().sub(M.copy())
                }
                static mult(x, M) {
                    return x.copy().mult(M.copy())
                }
                static div(x, M) {
                    return x.copy().div(M.copy())
                }
                static dot(x, M) {
                    return x.copy().dot(M.copy())
                }
                static dist(x, M) {
                    return x.copy().dist(M.copy())
                }
                static lerp(x, M, N) {
                    return x.copy().lerp(M.copy().x, M.copy().y, N)
                }
                static rotate(x, M) {
                    return x.copy().rotate(M)
                }
                static angle(x, M) {
                    return Math.atan2(M.copy().y - x.copy().y, M.copy().x - x.copy().x)
                }
                set(x, M) {
                    const N = this._formatArgs(x, M);
                    return this.x = N.x,
                    this.y = N.y,
                    this
                }
                copy() {
                    return new l(this.x,this.y)
                }
                toArray() {
                    return [this.x, this.y]
                }
                toObject() {
                    return {
                        x: this.x,
                        y: this.y
                    }
                }
                add(x, M) {
                    const N = this._formatArgs(x, M);
                    return this.x += N.x,
                    this.y += N.y,
                    this
                }
                rem(x, M) {
                    const N = this._formatArgs(x, M);
                    return this.x = this.x % N.x,
                    this.y = this.y % N.y,
                    this
                }
                sub(x, M) {
                    const N = this._formatArgs(x, M);
                    return this.x -= N.x,
                    this.y -= N.y,
                    this
                }
                mult(x, M) {
                    const N = this._formatArgs(x, M);
                    return this.x *= N.x,
                    this.y *= N.y,
                    this
                }
                div(x, M) {
                    const N = this._formatArgs(x, M);
                    return this.x /= N.x,
                    this.y /= N.y,
                    this
                }
                mag() {
                    return Math.sqrt(this.magSq())
                }
                magSq() {
                    const x = this.x
                      , M = this.y;
                    return x * x + M * M
                }
                dot(x, M) {
                    const N = this._formatArgs(x, M);
                    return this.x * N.x + this.y * N.y
                }
                dist(x) {
                    return x.copy().sub(this).mag()
                }
                normalize() {
                    const x = this.mag();
                    return x !== 0 && this.mult(1 / x),
                    this
                }
                limit(x) {
                    const M = this.magSq();
                    return M > x * x && this.div(Math.sqrt(M)).mult(x),
                    this
                }
                setMag(x) {
                    return this.normalize().mult(x)
                }
                heading() {
                    return Math.atan2(this.y, this.x)
                }
                rotate(x) {
                    let M = this.heading() + x;
                    const N = this.mag();
                    return this.x = Math.cos(M) * N,
                    this.y = Math.sin(M) * N,
                    this
                }
                lerp(x, M, N) {
                    return this.x += (x - this.x) * N,
                    this.y += (M - this.y) * N,
                    this
                }
                cross(x) {
                    const M = this.y * x.z - this.z * x.y
                      , N = this.z * x.x - this.x * x.z
                      , S = this.x * x.y - this.y * x.x;
                    return new l(M,N,S)
                }
                _formatArgs(x, M) {
                    return x.constructor.name === "Vector2D" ? {
                        x: x.x,
                        y: x.y
                    } : (M || (M = x),
                    {
                        x,
                        y: M
                    })
                }
            }
            const a = document.querySelector(".nav__eyes")
              , h = a.querySelector("#eyeLeft")
              , f = a.querySelector("#eyeRight");
            let g = a.getBoundingClientRect();
            const v = g.x
              , C = g.y + window.pageYOffset
              , T = window.matchMedia("(prefers-reduced-motion: reduce)");
            !T || T.matches ? (h.style.transformOrigin = "50% 50%",
            h.style.transformBox = "fill-box",
            f.style.transformOrigin = "50% 50%",
            f.style.transformBox = "fill-box",
            f.style.transform = "rotate(140deg)",
            h.style.transform = "rotate(140deg)") : (gsap.to([h, f], {
                rotate: 140,
                transformOrigin: "50% 50%",
                delay: .25,
                duration: 1.25,
                ease: "elastic.out(1, 0.4)",
                stagger: .05
            }),
            window.innerWidth >= 768 && window.addEventListener("mousemove", O=>{
                const {clientX: x, clientY: M} = O;
                let N = 57.2958 * new l(x - v,M - C).heading();
                gsap.to([h, f], {
                    rotate: N + 90,
                    transformOrigin: "50% 50%",
                    ease: "elastic.out(1, 0.4)",
                    duration: 1.5,
                    stagger: .025
                })
            }
            ))
        }
        ),
        (l,a)=>(B(),
        V(G, null, [d("div", {
            class: Be([{
                stickiness: se(t)
            }, "banner"])
        }, [d("div", nl, [d("div", {
            title: "\u6D45\u8272\u548C\u6DF1\u8272\u6A21\u5F0F\u8F6C\u6362",
            onClick: o,
            class: "mask"
        }), di(d("img", {
            src: se(n).img.src,
            alt: se(n).img.alt,
            draggable: "false"
        }, null, 8, sl), [[Ci, !1]]), (B(),
        V("svg", ol)), d("ul", null, [(B(!0),
        V(G, null, kt(se(n).menu, (h,f)=>(B(),
        V("li", {
            onClick: a[0] || (a[0] = g=>i(g)),
            "data-jump": h.id,
            key: f
        }, $e(h.name), 9, rl))), 128)), d("li", {
            title: "\u6D45\u8272\u548C\u6DF1\u8272\u6A21\u5F0F\u8F6C\u6362",
            onClick: o
        }, cl)])])], 2), d("div", al, [d("ul", null, [(B(!0),
        V(G, null, kt(se(n).menu, (h,f)=>(B(),
        V("li", {
            "data-jump": h.id,
            key: f,
            class: Be([h.class, "list"])
        }, [d("a", {
            onClick: g=>r(g, f),
            "data-jump": h.id,
            href: "javascript:void(0);",
            nofollow: ""
        }, [d("span", dl, [d("div", {
            innerHTML: h.html,
            class: "icon_svg"
        }, null, 8, hl)]), d("span", pl, $e(h.name), 1)], 8, fl)], 10, ul))), 128))])])], 64))
    }
}
  , ml = Te(gl, [["__scopeId", "data-v-d8262657"]]);
const _l = e=>(We("data-v-b6b5c551"),
e = e(),
Ve(),
e)
  , yl = ["src"]
  , xl = _l(()=>d("div", {
    id: "msg"
}, null, -1))
  , Ml = {
    __name: "index",
    setup(e) {
        let t = "https://image.bugjava.cn/m/2023/07/28/64c3a2138081e.jpg"
          , n = Ce(!1);
        function s() {
            n.value = !0
        }
        let i = Ce({});
        Kn(()=>{
            window.bugjava = function(a) {
                i.value = a
            }
        }
        ),
        ft(i, (l,a)=>{
            o(l)
        }
        );
   
        function r(l, a, h, f) {
            const {sin: v, cos: C, asin: T, PI: O, hypot: x} = Math;
            let M = (Ee,pe)=>(Ee *= O / 180,
            pe *= O / 180,
            {
                x: C(pe) * C(Ee),
                y: C(pe) * v(Ee),
                z: v(pe)
            })
              , N = M(l, a)
              , S = M(h, f)
              , Q = x(N.x - S.x, N.y - S.y, N.z - S.z)
              , he = T(Q / 2) * 2 * 6371;
            return Math.round(he)
        }
        return bt(()=>{
            let l = document.createElement("script");
            l.setAttribute("type", "text/javascript"),
            l.src = "https://apis.map.qq.com/ws/location/v1/ip?callback=bugjava&key=T3EBZ-TJ7LI-YRBG2-5ZLUR-KD3OS-U6BJO&output=jsonp",
            document.head.appendChild(l)
        }
        ),
        (l,a)=>(B(),
        V(G, null, [se(n) ? Dn("", !0) : di((B(),
        V("img", {
            key: 0,
            src: se(t),
            onLoad: s,
            alt: ""
        }, null, 40, yl)), [[Ci, !1]]), d("div", {
            id: "index",
            style: st({
                backgroundImage: `url(${se(t)})`
            }),
            class: Be({
                imgLoad: se(n)
            })
        }, null, 6), xl], 64))
    }
}
  , bl = Te(Ml, [["__scopeId", "data-v-b6b5c551"]]);
const wl = e=>(We("data-v-f1d6d26d"),
e = e(),
Ve(),
e)
  , vl = wl(()=>d("div", {
    id: "index",
    style: {
        "background-image": "linear-gradient(-225deg, #231557 0%,#43107a 29%, #FF1361 100%)"
    }
}, null, -1))
  , Ll = {
    ref: "canvas"
}
  , Il = {
    __name: "xk",
    setup(e) {
        return bt(()=>{
            const t = "#fff"
              , o = (window.innerWidth + window.innerHeight) / 8
              , r = document.querySelector("canvas")
              , l = r.getContext("2d");
            let a = 1, h, f, g = [], v, C, T = {
                x: 0,
                y: 0,
                tx: 0,
                ty: 0,
                z: 9e-4
            }, O = !1;
            x(),
            S(),
            Q(),
            window.onresize = S,
            r.onmousemove = De,
            r.ontouchmove = wt,
            r.ontouchend = be,
            document.onmouseleave = be;
            function x() {
                for (let A = 0; A < o; A++)
                    g.push({
                        x: 0,
                        y: 0,
                        z: .2 + Math.random() * (1 - .2)
                    })
            }
            function M(A) {
                A.x = Math.random() * h,
                A.y = Math.random() * f
            }
            function N(A) {
                let J = "z"
                  , ne = Math.abs(T.x)
                  , ge = Math.abs(T.y);
                if (ne > 1 || ge > 1) {
                    let it;
                    ne > ge ? it = Math.random() < ne / (ne + ge) ? "h" : "v" : it = Math.random() < ge / (ne + ge) ? "v" : "h",
                    it === "h" ? J = T.x > 0 ? "l" : "r" : J = T.y > 0 ? "t" : "b"
                }
                A.z = .2 + Math.random() * (1 - .2),
                J === "z" ? (A.z = .1,
                A.x = Math.random() * h,
                A.y = Math.random() * f) : J === "l" ? (A.x = -50,
                A.y = f * Math.random()) : J === "r" ? (A.x = h + 50,
                A.y = f * Math.random()) : J === "t" ? (A.x = h * Math.random(),
                A.y = -50) : J === "b" && (A.x = h * Math.random(),
                A.y = f + 50)
            }
            function S() {
                a = window.devicePixelRatio || 1,
                h = window.innerWidth * a,
                f = window.innerHeight * a,
                r.width = h,
                r.height = f,
                g.forEach(M)
            }
            function Q() {
                l.clearRect(0, 0, h, f),
                he(),
                Ee(),
                requestAnimationFrame(Q)
            }
            function he() {
                T.tx *= .96,
                T.ty *= .96,
                T.x += (T.tx - T.x) * .8,
                T.y += (T.ty - T.y) * .8,
                g.forEach(A=>{
                    A.x += T.x * A.z,
                    A.y += T.y * A.z,
                    A.x += (A.x - h / 2) * T.z * A.z,
                    A.y += (A.y - f / 2) * T.z * A.z,
                    A.z += T.z,
                    (A.x < -50 || A.x > h + 50 || A.y < -50 || A.y > f + 50) && N(A)
                }
                )
            }
            function Ee() {
                g.forEach(A=>{
                    l.beginPath(),
                    l.lineCap = "round",
                    l.lineWidth = 3 * A.z * a,
                    l.globalAlpha = .5 + .5 * Math.random(),
                    l.strokeStyle = t,
                    l.beginPath(),
                    l.moveTo(A.x, A.y);
                    let J = T.x * 2
                      , ne = T.y * 2;
                    Math.abs(J) < .1 && (J = .5),
                    Math.abs(ne) < .1 && (ne = .5),
                    l.lineTo(A.x + J, A.y + ne),
                    l.stroke()
                }
                )
            }
            function pe(A, J) {
                if (typeof v == "number" && typeof C == "number") {
                    let ne = A - v
                      , ge = J - C;
                    T.tx = T.tx + ne / 8 * a * (O ? 1 : -1),
                    T.ty = T.ty + ge / 8 * a * (O ? 1 : -1)
                }
                v = A,
                C = J
            }
            function De(A) {
                O = !1,
                pe(A.clientX, A.clientY)
            }
            function wt(A) {
                O = !0,
                pe(A.touches[0].clientX, A.touches[0].clientY),
                A.preventDefault()
            }
            function be() {
                v = null,
                C = null
            }
        }
        ),
        (t,n)=>(B(),
        V(G, null, [vl, d("canvas", Ll, null, 512)], 64))
    }
}
  , jl = Te(Il, [["__scopeId", "data-v-f1d6d26d"]]);
const Al = Fo({
    props: {
        modelValue: Boolean
    },
    emits: ["update:modelValue"],
    setup(e, t) {
        const n = Ce(e.modelValue)
          , s = Ce(!0);
        let i = 0;
        const o = ()=>{
            clearTimeout(i),
            n.value = !1,
            i = setTimeout(()=>{
                s.value = !1,
                clearTimeout(i)
            }
            , 300)
        }
        ;
        return ft(()=>e.modelValue, r=>{
            r ? (clearTimeout(i),
            s.value = !1,
            i = setTimeout(()=>{
                n.value = r,
                clearTimeout(i)
            }
            , 20)) : o()
        }
        ),
        ft(()=>n.value, r=>{
            r || t.emit("update:modelValue", r)
        }
        ),
        ui(()=>{
            clearTimeout(i)
        }
        ),
        {
            visible: n,
            display: s,
            closeDialog: o
        }
    }
})
  , Cl = {
    class: "dialog-main"
}
  , Tl = {
    class: "dialog-head"
}
  , El = {
    class: "dialog-body"
};
function Dl(e, t, n, s, i, o) {
    return B(),
    V("div", {
        class: Be(["dialog", {
            "is-show": e.visible
        }]),
        style: st(e.display ? "display: none" : "")
    }, [d("div", {
        class: "dialog-modal",
        onClick: t[0] || (t[0] = qr((...r)=>e.closeDialog && e.closeDialog(...r), ["self"]))
    }), d("div", Cl, [d("div", Tl, [d("button", {
        class: "button icon-botton",
        onClick: t[1] || (t[1] = (...r)=>e.closeDialog && e.closeDialog(...r))
    }, "x")]), d("div", El, [Go(e.$slots, "default", {}, void 0, !0)])])], 6)
}
const Nl = Te(Al, [["render", Dl], ["__scopeId", "data-v-9e519b82"]])
  , Sl = "/assets/aiyo.76053469.mp3"
  , kl = "/assets/chang.402610b0.mp3"
  , Ol = "/assets/tiao.184eb64f.mp3"
  , zl = "/assets/rap.ce043f2e.mp3"
  , Pl = "/assets/lan.549ebb91.mp3"
  , Rl = "/assets/music.8bb6ee96.mp3";
const $l = e=>(We("data-v-3ac9d506"),
e = e(),
Ve(),
e)
  , Fl = {
    id: "about"
}
  , Hl = {
    class: "main"
}
  , Bl = $l(()=>d("h1", null, "\u5173\u4E8E\u6211", -1))
  , Ul = Ii('<div class="hello-about" data-v-3ac9d506><div class="cursor" style="translate:none;rotate:none;scale:none;transform:translate(184px, 315px);" data-v-3ac9d506></div><div class="shapes" data-v-3ac9d506><div class="shape shape-1" style="translate:none;rotate:none;scale:none;transform:translate(184px, 315px);" data-v-3ac9d506></div><div class="shape shape-2" style="translate:none;rotate:none;scale:none;transform:translate(184px, 315px);" data-v-3ac9d506></div><div class="shape shape-3" style="translate:none;rotate:none;scale:none;transform:translate(184px, 315px);" data-v-3ac9d506></div></div><div class="content" data-v-3ac9d506><h1 data-v-3ac9d506>Hello there!</h1></div></div>', 1)
  , Yl = {
    __name: "index",
 
}
  , Wl = Te(Yl, [["__scopeId", "data-v-3ac9d506"]]);
const Vl = {}
  , Kl = {
    "aria-hidden": "true",
    style: {
        position: "absolute",
        overflow: "hidden",
        width: "0",
        height: "0"
    }
}
  , Ql = d("symbol", {
    id: "icon-sun",
    viewBox: "0 0 1024 1024"
}, [d("path", {
    d: "M960 512l-128 128v192h-192l-128 128-128-128H192v-192l-128-128 128-128V192h192l128-128 128 128h192v192z",
    fill: "#FFD878",
    "p-id": "8420"
}), d("path", {
    d: "M512 109.248L626.752 224H800v173.248L914.752 512 800 626.752V800h-173.248L512 914.752 397.248 800H224v-173.248L109.248 512 224 397.248V224h173.248L512 109.248M512 64l-128 128H192v192l-128 128 128 128v192h192l128 128 128-128h192v-192l128-128-128-128V192h-192l-128-128z",
    fill: "#4D5152",
    "p-id": "8422"
}), d("path", {
    d: "M512 320c105.888 0 192 86.112 192 192s-86.112 192-192 192-192-86.112-192-192 86.112-192 192-192m0-32a224 224 0 1 0 0 448 224 224 0 0 0 0-448z",
    fill: "#4D5152",
    "p-id": "8423"
})], -1)
  , Zl = d("symbol", {
    id: "icon-moon",
    viewBox: "0 0 1024 1024"
}, [d("path", {
    d: "M611.370667 167.082667a445.013333 445.013333 0 0 1-38.4 161.834666 477.824 477.824 0 0 1-244.736 244.394667 445.141333 445.141333 0 0 1-161.109334 38.058667 85.077333 85.077333 0 0 0-65.066666 135.722666A462.08 462.08 0 1 0 747.093333 102.058667a85.077333 85.077333 0 0 0-135.722666 65.024z",
    fill: "#FFB531",
    "p-id": "11345"
}), d("path", {
    d: "M329.728 274.133333l35.157333-35.157333a21.333333 21.333333 0 1 0-30.165333-30.165333l-35.157333 35.157333-35.114667-35.157333a21.333333 21.333333 0 0 0-30.165333 30.165333l35.114666 35.157333-35.114666 35.157334a21.333333 21.333333 0 1 0 30.165333 30.165333l35.114667-35.157333 35.157333 35.157333a21.333333 21.333333 0 1 0 30.165333-30.165333z",
    fill: "#030835",
    "p-id": "11346"
})], -1)
  , ql = [Ql, Zl];
function Gl(e, t) {
    return B(),
    V("svg", Kl, ql)
}
const Jl = Te(Vl, [["render", Gl]])
  , Xl = "/assets/bilibili.86e4ab7d.jpg"
  , ec = "/assets/startpage.9304f66c.jpg"
  , tc = "/assets/blog.0f3fe406.png";
const nc = e=>(We("data-v-ca1f3846"),
e = e(),
Ve(),
e)
  , sc = {
    id: "creation"
}
  , ic = {
    class: "main"
}
  , oc = nc(()=>d("h1", null, "\u4F5C\u54C1\u96C6", -1))
  , rc = {
    class: "creationList"
}
  , lc = ["href"]
  , cc = {
    class: "creationLinkText"
}
  , ac = {
    class: "creationLinkTitle"
}
  , uc = {
    class: "creationLinkIntro"
}
  , fc = {
    class: "creationLinkPlatform"
}
  , dc = {
    __name: "index",

}
  , hc = Te(dc, [["__scopeId", "data-v-ca1f3846"]]);
const dn = e=>(We("data-v-4496d5bb"),
e = e(),
Ve(),
e)
  , pc = {
    id: "timeline"
}
  , gc = {
    class: "main"
}
  , mc = dn(()=>d("h1", null, "\u65F6\u95F4\u8F74", -1))
  , _c = {
    class: "outerBox"
}
  , yc = {
    id: "box"
}
  , xc = {
    class: "boxText1"
}
  , Mc = {
    class: "boxText2"
}
  , bc = dn(()=>d("div", null, [d("p", {
    class: "boxText3"
}, "Waiting to"), d("p", {
    class: "boxText3"
}, "Continue...")], -1))
  , wc = dn(()=>d("span", {
    class: "boxMaskL"
}, null, -1))
  , vc = dn(()=>d("span", {
    class: "boxMaskR"
}, null, -1))
  , Lc = {
    __name: "index",

}
  , Ic = Te(Lc, [["__scopeId", "data-v-4496d5bb"]]);
const ze = e=>(We("data-v-6be94728"),
e = e(),
Ve(),
e)
  , jc = {
    id: "footer"
}
  , Ac = {
    class: "footer"
}
  , Cc = {
    class: "bubbles"
}
  , Tc = {
    class: "content"
}
  , Ec = {
    style: {
        display: "flex",
        "justify-content": "center"
    }
}
  , Dc = ze(()=>d("a", {
    href: "https://blog.bugjava.cn",
    target: "_blank"
}, "\u5305\u5B50", -1))
  , Nc = {
    class: "footer_svg_mail",
    style: {
        display: "flex",
        "align-items": "center"
    },
    href: "mailto:admin@bugjava.cn"
}
  , Sc = {
    style: {
        display: "none"
    },
    t: "1669006947197",
    class: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": "3447",
    width: "18",
    height: "18"
}
  , kc = ze(()=>d("path", {
    d: "M789.333333 128a170.666667 170.666667 0 0 1 170.666667 170.666667v426.666666a170.666667 170.666667 0 0 1-170.666667 170.666667H234.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V298.666667a170.666667 170.666667 0 0 1 170.666667-170.666667h554.666666z m106.666667 243.797333l-310.613333 147.925334a170.666667 170.666667 0 0 1-146.773334 0L128 371.797333V725.333333a106.666667 106.666667 0 0 0 102.037333 106.56L234.666667 832h554.666666a106.666667 106.666667 0 0 0 106.56-102.037333L896 725.333333V371.797333zM789.333333 192H234.666667a106.666667 106.666667 0 0 0-106.56 102.037333L128 300.928l338.133333 161.024a106.666667 106.666667 0 0 0 86.549334 2.282667l5.184-2.282667L896 300.906667V298.666667a106.666667 106.666667 0 0 0-102.037333-106.56L789.333333 192z",
    "p-id": "3448"
}, null, -1))
  , Oc = [kc]
  , zc = ze(()=>d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    width: "120",
    height: "20",
    role: "img",
    "aria-label": "\u5305\u5B50: \u4E0A\u73ED\u6478\u9C7C\u4E2D"
}, [d("title", null, "\u5305\u5B50: \u4E0A\u73ED\u6478\u9C7C\u4E2D"), d("linearGradient", {
    id: "a",
    x2: "0",
    y2: "100%"
}, [d("stop", {
    offset: "0",
    "stop-color": "#fcfcfc",
    "stop-opacity": "0"
}), d("stop", {
    offset: "1",
    "stop-opacity": ".1"
})]), d("linearGradient", {
    id: "b",
    x2: "0",
    y2: "100%"
}, [d("stop", {
    offset: "0",
    "stop-color": "#ccc",
    "stop-opacity": ".1"
}), d("stop", {
    offset: "1",
    "stop-opacity": ".1"
})]), d("g", {
    stroke: "#d5d5d5"
}, [d("rect", {
    stroke: "none",
    fill: "#fcfcfc",
    x: "0.5",
    y: "0.5",
    width: "50",
    height: "19",
    rx: "2"
}), d("rect", {
    x: "56.5",
    y: "0.5",
    width: "63",
    height: "19",
    rx: "2",
    fill: "#fafafa"
}), d("rect", {
    x: "56",
    y: "7.5",
    width: "0.5",
    height: "5",
    stroke: "#fafafa"
}), d("path", {
    d: "M56.5 6.5 l-3 3v1 l3 3",
    stroke: "d5d5d5",
    fill: "#fafafa"
})]), d("image", {
    x: "5",
    y: "3",
    width: "14",
    height: "14",
    "xlink:href": "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRDMzQzQzIiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+Q2FrZVBIUDwvdGl0bGU+PHBhdGggZD0iTTAgMTMuODc1djMuNzQ1YzAgMi4wNjcgNS4zNyAzLjc0MyAxMiAzLjc0M1YxNy42MmMtNi42MyAwLTEyLTEuNjgtMTItMy43NDN2LS4wMDJ6bTIxLjM4NCAyLjMzM0wxMiAxMy44NzV2My43NDVsOS4zODQgMi4zMzNDMjMuMDIgMTkuMzEzIDI0IDE4LjUwMyAyNCAxNy42MnYtMy43NDVjMCAuODgyLS45OCAxLjY5Mi0yLjYxNiAyLjMzM3pNMTIgMTAuMTMzdjMuNzQyYy02LjYyNyAwLTEyLTEuNjc3LTEyLTMuNzQ0VjYuMzhjMC0yLjA2NCA1LjM3LTMuNzQzIDEyLTMuNzQzIDYuNjI1IDAgMTIgMS42OCAxMiAzLjc0NHYzLjc1YzAgLjg4My0uOTggMS42OS0yLjYxNiAyLjMzNEwxMiAxMC4xM3YuMDAzeiIvPjwvc3ZnPg=="
}), d("g", {
    "aria-hidden": "true",
    fill: "#333",
    "text-anchor": "middle",
    "font-family": "Helvetica Neue,Helvetica,Arial,sans-serif",
    "text-rendering": "geometricPrecision",
    "font-weight": "700",
    "font-size": "110px",
    "line-height": "14px"
}, [d("rect", {
    id: "llink",
    stroke: "#d5d5d5",
    fill: "url(#a)",
    x: ".5",
    y: ".5",
    width: "50",
    height: "19",
    rx: "2"
}), d("text", {
    "aria-hidden": "true",
    x: "335",
    y: "150",
    fill: "#fff",
    transform: "scale(.1)",
    textLength: "230"
}, "\u5305\u5B50 "), d("text", {
    x: "335",
    y: "140",
    transform: "scale(.1)",
    textLength: "230"
}, "\u5305\u5B50"), d("text", {
    "aria-hidden": "true",
    x: "875",
    y: "150",
    fill: "#fff",
    transform: "scale(.1)",
    textLength: "550"
}, " \u4E0A\u73ED\u6478\u9C7C\u4E2D "), d("text", {
    id: "rlink",
    x: "875",
    y: "140",
    transform: "scale(.1)",
    textLength: "550"
}, "\u4E0A\u73ED\u6478\u9C7C\u4E2D")])], -1))
  , Pc = [zc]
  , Rc = ze(()=>d("div", {
    id: "busuanzi_container_site_pv"
}, [d("b", null, [dt("\u672C\u7AD9\u603B\u8BBF\u95EE\u91CF"), d("span", {
    id: "busuanzi_value_site_pv"
}), dt("\u6B21 | \u672C\u7AD9\u603B\u8BBF\u5BA2\u6570 "), d("span", {
    id: "busuanzi_value_site_uv"
}), dt(" \u4EBA")])], -1))
  , $c = ze(()=>d("div", null, [d("a", {
    target: "_blank",
    href: "https://policy.bugjava.cn/"
}, [d("svg", {
    width: "51.6",
    height: "20",
    viewBox: "0 0 516 200",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    role: "img",
    "aria-label": "vite"
}, [d("title", null, "vite"), d("linearGradient", {
    id: "a",
    x2: "0",
    y2: "100%"
}, [d("stop", {
    offset: "0",
    "stop-opacity": ".1",
    "stop-color": "#EEE"
}), d("stop", {
    offset: "1",
    "stop-opacity": ".1"
})]), d("mask", {
    id: "m"
}, [d("rect", {
    width: "516",
    height: "200",
    rx: "30",
    fill: "#FFF"
})]), d("g", {
    mask: "url(#m)"
}, [d("rect", {
    width: "212",
    height: "200",
    fill: "#555"
}), d("rect", {
    width: "304",
    height: "200",
    fill: "#a751fe",
    x: "212"
}), d("rect", {
    width: "516",
    height: "200",
    fill: "url(#a)"
})]), d("g", {
    "aria-hidden": "true",
    fill: "#fff",
    "text-anchor": "start",
    "font-family": "Verdana,DejaVu Sans,sans-serif",
    "font-size": "110"
}, [d("text", {
    x: "172",
    y: "148",
    textLength: "0",
    fill: "#000",
    opacity: "0.25"
}), d("text", {
    x: "162",
    y: "138",
    textLength: "0"
}), d("text", {
    x: "267",
    y: "148",
    textLength: "204",
    fill: "#000",
    opacity: "0.25"
}, "vite"), d("text", {
    x: "257",
    y: "138",
    textLength: "204"
}, "vite")]), d("image", {
    x: "40",
    y: "35",
    width: "130",
    height: "130",
    "xlink:href": "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNjQ2Q0ZGIiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+Vml0ZTwvdGl0bGU+PHBhdGggZD0ibTguMjg2IDEwLjU3OC41MTItOC42NTdhLjMwNi4zMDYgMCAwIDEgLjI0Ny0uMjgyTDE3LjM3Ny4wMDZhLjMwNi4zMDYgMCAwIDEgLjM1My4zODVsLTEuNTU4IDUuNDAzYS4zMDYuMzA2IDAgMCAwIC4zNTIuMzg1bDIuMzg4LS40NmEuMzA2LjMwNiAwIDAgMSAuMzMyLjQzOGwtNi43OSAxMy41NS0uMTIzLjE5YS4yOTQuMjk0IDAgMCAxLS4yNTIuMTRjLS4xNzcgMC0uMzUtLjE1Mi0uMzA1LS4zNjlsMS4wOTUtNS4zMDFhLjMwNi4zMDYgMCAwIDAtLjM4OC0uMzU1bC0xLjQzMy40MzVhLjMwNi4zMDYgMCAwIDEtLjM4OS0uMzU0bC42OS0zLjM3NWEuMzA2LjMwNiAwIDAgMC0uMzctLjM2bC0yLjMyLjUzNmEuMzA2LjMwNiAwIDAgMS0uMzc0LS4zMTZ6bTE0Ljk3Ni03LjkyNkwxNy4yODQgMy43NGwtLjU0NCAxLjg4NyAyLjA3Ny0uNGEuOC44IDAgMCAxIC44NC4zNjkuOC44IDAgMCAxIC4wMzQuNzgzTDEyLjkgMTkuOTNsLS4wMTMuMDI1LS4wMTUuMDIzLS4xMjIuMTlhLjgwMS44MDEgMCAwIDEtLjY3Mi4zNy44MjYuODI2IDAgMCAxLS42MzQtLjMwMi44LjggMCAwIDEtLjE2LS42N2wxLjAyOS00Ljk4MS0xLjEyLjM0YS44MS44MSAwIDAgMS0uODYtLjI2Mi44MDIuODAyIDAgMCAxLS4xNjUtLjY3bC42My0zLjA4LTIuMDI3LjQ2OGEuODA4LjgwOCAwIDAgMS0uNzY4LS4yMzMuODEuODEgMCAwIDEtLjIxNy0uNmwuMzg5LTYuNTctNy40NC0xLjMzYS42MTIuNjEyIDAgMCAwLS42NC45MDZMMTEuNTggMjMuNjkxYS42MTIuNjEyIDAgMCAwIDEuMDY2LS4wMDRsMTEuMjYtMjAuMTM1YS42MTIuNjEyIDAgMCAwLS42NDQtLjl6Ii8+PC9zdmc+"
})])]), d("a", {
    target: "_blank",
    rel: "nofollow",
    href: "https://cn.vuejs.org/"
}, [d("svg", {
    width: "51.6",
    height: "20",
    viewBox: "0 0 516 200",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    role: "img",
    "aria-label": "Vue"
}, [d("title", null, "Vue"), d("linearGradient", {
    id: "a",
    x2: "0",
    y2: "100%"
}, [d("stop", {
    offset: "0",
    "stop-opacity": ".1",
    "stop-color": "#EEE"
}), d("stop", {
    offset: "1",
    "stop-opacity": ".1"
})]), d("mask", {
    id: "m"
}, [d("rect", {
    width: "516",
    height: "200",
    rx: "30",
    fill: "#FFF"
})]), d("g", {
    mask: "url(#m)"
}, [d("rect", {
    width: "212",
    height: "200",
    fill: "#555"
}), d("rect", {
    width: "304",
    height: "200",
    fill: "#0e73ae",
    x: "212"
}), d("rect", {
    width: "516",
    height: "200",
    fill: "url(#a)"
})]), d("g", {
    "aria-hidden": "true",
    fill: "#fff",
    "text-anchor": "start",
    "font-family": "Verdana,DejaVu Sans,sans-serif",
    "font-size": "110"
}, [d("text", {
    x: "172",
    y: "148",
    textLength: "0",
    fill: "#000",
    opacity: "0.25"
}), d("text", {
    x: "162",
    y: "138",
    textLength: "0"
}), d("text", {
    x: "267",
    y: "148",
    textLength: "204",
    fill: "#000",
    opacity: "0.25"
}, "Vue"), d("text", {
    x: "257",
    y: "138",
    textLength: "204"
}, "Vue")]), d("image", {
    x: "40",
    y: "35",
    width: "130",
    height: "130",
    "xlink:href": "data:image/svg+xml;base64,PHN2ZyB0PSIxNjY5MDEzNDU4MTkxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI2ODEiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNjE1LjYgMTIzLjZoMTY1LjVMNTEyIDU4OS43IDI0Mi45IDEyMy42SDYzLjVMNTEyIDkwMC40bDQ0OC41LTc3Ni45eiIgZmlsbD0iIzQxQjg4MyIgcC1pZD0iMjY4MiI+PC9wYXRoPjxwYXRoIGQ9Ik03ODEuMSAxMjMuNkg2MTUuNkw1MTIgMzAzIDQwOC40IDEyMy42SDI0Mi45TDUxMiA1ODkuN3oiIGZpbGw9IiMzNDQ5NUUiIHAtaWQ9IjI2ODMiPjwvcGF0aD48L3N2Zz4="
})])]), d("a", {
    target: "_blank",
    rel: "nofollow",
    href: "https://github.com"
}, [d("svg", [d("title", null, "Source: Github"), d("linearGradient", {
    id: "s",
    x2: "0",
    y2: "100%"
}, [d("stop", {
    offset: "0",
    "stop-color": "#bbb",
    "stop-opacity": ".1"
}), d("stop", {
    offset: "1",
    "stop-opacity": ".1"
})]), d("clipPath", {
    id: "r"
}, [d("rect", {
    width: "113",
    height: "20",
    rx: "3",
    fill: "#fff"
})]), d("g", {
    "clip-path": "url(#r)"
}, [d("rect", {
    width: "66",
    height: "20",
    fill: "#555"
}), d("rect", {
    x: "66",
    width: "47",
    height: "20",
    fill: "#d021d6"
}), d("rect", {
    width: "113",
    height: "20",
    fill: "url(#s)"
})]), d("g", {
    fill: "#fff",
    "text-anchor": "middle",
    "font-family": "Verdana,Geneva,DejaVu Sans,sans-serif",
    "text-rendering": "geometricPrecision",
    "font-size": "110"
}, [d("image", {
    x: "5",
    y: "3",
    width: "14",
    height: "14",
    "xlink:href": "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJ3aGl0ZXNtb2tlIiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+R2l0SHViPC90aXRsZT48cGF0aCBkPSJNMTIgLjI5N2MtNi42MyAwLTEyIDUuMzczLTEyIDEyIDAgNS4zMDMgMy40MzggOS44IDguMjA1IDExLjM4NS42LjExMy44Mi0uMjU4LjgyLS41NzcgMC0uMjg1LS4wMS0xLjA0LS4wMTUtMi4wNC0zLjMzOC43MjQtNC4wNDItMS42MS00LjA0Mi0xLjYxQzQuNDIyIDE4LjA3IDMuNjMzIDE3LjcgMy42MzMgMTcuN2MtMS4wODctLjc0NC4wODQtLjcyOS4wODQtLjcyOSAxLjIwNS4wODQgMS44MzggMS4yMzYgMS44MzggMS4yMzYgMS4wNyAxLjgzNSAyLjgwOSAxLjMwNSAzLjQ5NS45OTguMTA4LS43NzYuNDE3LTEuMzA1Ljc2LTEuNjA1LTIuNjY1LS4zLTUuNDY2LTEuMzMyLTUuNDY2LTUuOTMgMC0xLjMxLjQ2NS0yLjM4IDEuMjM1LTMuMjItLjEzNS0uMzAzLS41NC0xLjUyMy4xMDUtMy4xNzYgMCAwIDEuMDA1LS4zMjIgMy4zIDEuMjMuOTYtLjI2NyAxLjk4LS4zOTkgMy0uNDA1IDEuMDIuMDA2IDIuMDQuMTM4IDMgLjQwNSAyLjI4LTEuNTUyIDMuMjg1LTEuMjMgMy4yODUtMS4yMy42NDUgMS42NTMuMjQgMi44NzMuMTIgMy4xNzYuNzY1Ljg0IDEuMjMgMS45MSAxLjIzIDMuMjIgMCA0LjYxLTIuODA1IDUuNjI1LTUuNDc1IDUuOTIuNDIuMzYuODEgMS4wOTYuODEgMi4yMiAwIDEuNjA2LS4wMTUgMi44OTYtLjAxNSAzLjI4NiAwIC4zMTUuMjEuNjkuODI1LjU3QzIwLjU2NSAyMi4wOTIgMjQgMTcuNTkyIDI0IDEyLjI5N2MwLTYuNjI3LTUuMzczLTEyLTEyLTEyIi8+PC9zdmc+"
}), d("text", {
    "aria-hidden": "true",
    x: "425",
    y: "150",
    fill: "#010101",
    "fill-opacity": ".3",
    transform: "scale(.1)",
    textLength: "390"
}, "Source "), d("text", {
    x: "425",
    y: "140",
    transform: "scale(.1)",
    fill: "#fff",
    textLength: "390"
}, "Source"), d("text", {
    "aria-hidden": "true",
    x: "885",
    y: "150",
    fill: "#010101",
    "fill-opacity": ".3",
    transform: "scale(.1)",
    textLength: "370"
}, "Github "), d("text", {
    x: "885",
    y: "140",
    transform: "scale(.1)",
    fill: "#fff",
    textLength: "370"
}, "Github")])])])], -1))
  , Hc = {
    class: "sendmail",
    style: {
        width: "12rem"
    }
}
  , Bc = ze(()=>d("span", null, "DROP ME A MAIL", -1))
  , Uc = ze(()=>d("path", {
    d: "M768 1024L429.184 769.856 896 128 294.784 669.12 0 448 1024 0 768 1024z m-512 0V768l192 128-192 128z",
    "p-id": "3204"
}, null, -1))
  , Yc = [Uc]
  , Wc = {
    style: {
        display: "none"
    }
}
  , Vc = ze(()=>d("defs", null, [d("filter", {
    id: "blob"
}, [d("feGaussianBlur", {
    in: "SourceGraphic",
    stdDeviation: "10",
    result: "blur"
}), d("feColorMatrix", {
    in: "blur",
    mode: "matrix",
    values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9",
    result: "blob"
})])], -1))
  , Kc = [Vc]
  , Qc = {
    __name: "index",

}
  , Zc = Te(Qc, [["__scopeId", "data-v-6be94728"]])
  , qc = "/assets/ji.735fab24.mp3"
  , Gc = "/assets/ni.b6abffdf.mp3"
  , Jc = "/assets/tai.4995190f.mp3"
  , Xc = "/assets/mei.dffe8133.mp3"
  , ea = "/assets/jntm.f638690e.mp3";
const Ti = e=>(We("data-v-59a1f95d"),
e = e(),
Ve(),
e)
  , ta = Ti(()=>d("div", {
    class: "maintext"
},  -1))
  , na = Ti(()=>d("span", {
    id: "scrollDownIcon"
}, null, -1))
  , sa = [na]
  , ia = {
    __name: "App",
    setup(e) {
        let t = Ce(1);
        Kn(async()=>{
            Math.random() > .5 ? t = 1 : t = 0
        }
        );
        function n() {
            document.getElementById("about").scrollIntoView(!0)
        }
        let s = []
          , i = null;
        return bt(()=>{
            window.addEventListener("keypress", function(o) {
                let r = o.key.toLowerCase();
                r === "j" ? new Audio(qc).play() : r === "n" ? new Audio(Gc).play() : r === "t" ? new Audio(Jc).play() : r === "m" && new Audio(Xc).play(),
                s.push(r),
                clearTimeout(i),
                i = setTimeout(()=>{
                    s.toString() === ["j", "n", "t", "m"].toString() && new Audio(ea).play(),
                    s = []
                }
                , 1e3)
            })
        }
        ),
        (o,r)=>(B(),
        V(G, null, [te(Jl), se(t) === 1 ? (B(),
        Xt(bl, {
            key: 0
        })) : Dn("", !0), se(t) === 0 ? (B(),
        Xt(jl, {
            key: 1
        })) : Dn("", !0), te(ml), ta, d("div", {
            onClick: n,
            id: "scrollDown"
        }, sa), te(Wl, {
            class: "more"
        }), te(hc, {
            class: "more"
        }), te(Ic, {
            class: "more"
        }), te(Zc, {
            class: "more"
        })], 64))
    }
}
  , oa = Te(ia, [["__scopeId", "data-v-59a1f95d"]]);
const ra = "modulepreload"
  , la = function(e) {
    return "/" + e
}
  , Cs = {}
  , ca = function(t, n, s) {
    if (!n || n.length === 0)
        return t();
    const i = document.getElementsByTagName("link");
    return Promise.all(n.map(o=>{
        if (o = la(o),
        o in Cs)
            return;
        Cs[o] = !0;
        const r = o.endsWith(".css")
          , l = r ? '[rel="stylesheet"]' : "";
        if (!!s)
            for (let f = i.length - 1; f >= 0; f--) {
                const g = i[f];
                if (g.href === o && (!r || g.rel === "stylesheet"))
                    return
            }
        else if (document.querySelector(`link[href="${o}"]${l}`))
            return;
        const h = document.createElement("link");
        if (h.rel = r ? "stylesheet" : ra,
        r || (h.as = "script",
        h.crossOrigin = ""),
        h.href = o,
        document.head.appendChild(h),
        r)
            return new Promise((f,g)=>{
                h.addEventListener("load", f),
                h.addEventListener("error", ()=>g(new Error(`Unable to preload CSS for ${o}`)))
            }
            )
    }
    )).then(()=>t())
};
function aa(e={}) {
    const {immediate: t=!1, onNeedRefresh: n, onOfflineReady: s, onRegistered: i, onRegisteredSW: o, onRegisterError: r} = e;
    let l, a;
    const h = async(g=!0)=>{
        await a
    }
    ;
    async function f() {
        if ("serviceWorker"in navigator) {
            const {Workbox: g, messageSW: v} = await ca(()=>import("./workbox-window.prod.es5.d2780aeb.js"), []);
            l = new g("/sw.js",{
                scope: "/",
                type: "classic"
            }),
            l.addEventListener("activated", C=>{
                C.isUpdate ? window.location.reload() : s == null || s()
            }
            ),
            l.register({
                immediate: t
            }).then(C=>{
                o ? o("/sw.js", C) : i == null || i(C)
            }
            ).catch(C=>{
                r == null || r(C)
            }
            )
        }
    }
    return a = f(),
    h
}
function ua(e={}) {
    const {immediate: t=!0, onNeedRefresh: n, onOfflineReady: s, onRegistered: i, onRegisteredSW: o, onRegisterError: r} = e
      , l = Ce(!1)
      , a = Ce(!1);
    return {
        updateServiceWorker: aa({
            immediate: t,
            onNeedRefresh() {
                l.value = !0,
                n == null || n()
            },
            onOfflineReady() {
                a.value = !0,
                s == null || s()
            },
            onRegistered: i,
            onRegisteredSW: o,
            onRegisterError: r
        }),
        offlineReady: a,
        needRefresh: l
    }
}
const fa = "my-vue-app"
  , da = "1.1.2"
  , ha = "module"
  , pa = {
    dev: "vite --host 0.0.0.0",
    build: "vite build",
    preview: "vite preview",
    push: "git add . && git commit -m'\u5305\u5B50' && git push"
}
  , ga = {
    "less-loader": "^11.1.0",
    "vite-plugin-pwa": "^0.13.3",
    vue: "^3.2.41"
}
  , ma = {
    "@vitejs/plugin-vue": "^3.2.0",
    vite: "3.2.7",
    "vite-plugin-html": "^3.2.0"
}
  , _a = {
    name: fa,
    private: !0,
    version: da,
    type: ha,
    scripts: pa,
    dependencies: ga,
    devDependencies: ma
};
ua();
Xr(oa).mount("#app");
try {
    let e = console.log
      , t = new Date;
    queueMicrotask(function() {
        function n() {
            e.apply(console, arguments)
        }
        let s = new Date("01/15/2021 00:00:00");
        s = (t.setTime(t.getTime() + 250),
        (t - s) / 1e3 / 60 / 60 / 24),
        s = ["\u6B22\u8FCE\u6765\u5230\u5305\u5B50\u4E3B\u9875!", "", `
    \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557     \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2557
    \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557    \u255A\u2550\u2550\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2551
    \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551      \u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2551
    \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551     \u2588\u2588\u2588\u2554\u255D  \u2588\u2588\u2551
    \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2551  \u2588\u2588\u2551\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D    \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2551
    \u255A\u2550\u2550\u2550\u2550\u2550\u255D \u255A\u2550\u255D  \u255A\u2550\u255D \u255A\u2550\u2550\u2550\u2550\u2550\u255D     \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D                                                  
      `, "\u5DF2\u4E0A\u7EBF", Math.floor(s), "\u5929", `\xA92020 By \u5305\u5B50  Version\uFF1A${_a.version}`],
        setTimeout(n.bind(console, `
%c`.concat(s[0], " %c ").concat(s[1], " %c ").concat(s[2], " %c").concat(s[3], "%c ").concat(s[4], "%c ").concat(s[5], `

%c `).concat(s[6], `
`), "color:#425aef", "", "color:#425aef", "color:#425aef", "", "color:#425aef", "")),
        setTimeout(console.warn.bind(console, "%c S013-782 %c \u6B64\u7F51\u7AD9\u8BDE\u751F\u79BB\u4E0D\u5F00\u5176\u4ED6\u597D\u770B\u7684\u7F51\u7AD9", "color:white; background-color:#d9534f", ""))
    })
} catch (e) {
    console.warn(e)
}
