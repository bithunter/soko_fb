!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Popper = t()
}(this, function() {
    "use strict";
    function e(e) {
        return e && "[object Function]" === {}.toString.call(e)
    }
    function t(e, t) {
        if (1 !== e.nodeType)
            return [];
        var n = window.getComputedStyle(e, null);
        return t ? n[t] : n
    }
    function n(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host
    }
    function r(e) {
        if (!e || -1 !== ["HTML", "BODY", "#document"].indexOf(e.nodeName))
            return window.document.body;
        var o = t(e),
            i = o.overflow,
            f = o.overflowX,
            s = o.overflowY;
        return /(auto|scroll)/.test(i + s + f) ? e : r(n(e))
    }
    function o(e) {
        var n = e && e.offsetParent,
            r = n && n.nodeName;
        return r && "BODY" !== r && "HTML" !== r ? -1 !== ["TD", "TABLE"].indexOf(n.nodeName) && "static" === t(n, "position") ? o(n) : n : window.document.documentElement
    }
    function i(e) {
        var t = e.nodeName;
        return "BODY" !== t && ("HTML" === t || o(e.firstElementChild) === e)
    }
    function f(e) {
        return null === e.parentNode ? e : f(e.parentNode)
    }
    function s(e, t) {
        if (!(e && e.nodeType && t && t.nodeType))
            return window.document.documentElement;
        var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            r = n ? e : t,
            a = n ? t : e,
            p = document.createRange();
        p.setStart(r, 0), p.setEnd(a, 0);
        var u = p.commonAncestorContainer;
        if (e !== u && t !== u || r.contains(a))
            return i(u) ? u : o(u);
        var d = f(e);
        return d.host ? s(d.host, t) : s(e, f(t).host)
    }
    function a(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
            n = "top" === t ? "scrollTop" : "scrollLeft",
            r = e.nodeName;
        if ("BODY" === r || "HTML" === r) {
            var o = window.document.documentElement,
                i = window.document.scrollingElement || o;
            return i[n]
        }
        return e[n]
    }
    function p(e, t) {
        var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            r = a(t, "top"),
            o = a(t, "left"),
            i = n ? -1 : 1;
        return e.top += r * i, e.bottom += r * i, e.left += o * i, e.right += o * i, e
    }
    function u(e, t) {
        var n = "x" === t ? "Left" : "Top",
            r = "Left" == n ? "Right" : "Bottom";
        return +e["border" + n + "Width"].split("px")[0] + +e["border" + r + "Width"].split("px")[0]
    }
    function d(e, t, n, r) {
        return V(t["offset" + e], n["client" + e], n["offset" + e], re() ? n["offset" + e] + r["margin" + ("Height" === e ? "Top" : "Left")] + r["margin" + ("Height" === e ? "Bottom" : "Right")] : 0)
    }
    function l() {
        var e = window.document.body,
            t = window.document.documentElement,
            n = re() && window.getComputedStyle(t);
        return {
            height: d("Height", e, t, n),
            width: d("Width", e, t, n)
        }
    }
    function c(e) {
        return se({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }
    function h(e) {
        var n = {};
        if (re())
            try {
                n = e.getBoundingClientRect();
                var r = a(e, "top"),
                    o = a(e, "left");
                n.top += r, n.left += o, n.bottom += r, n.right += o
            } catch (e) {}
        else
            n = e.getBoundingClientRect();
        var i = {
                left: n.left,
                top: n.top,
                width: n.right - n.left,
                height: n.bottom - n.top
            },
            f = "HTML" === e.nodeName ? l() : {},
            s = f.width || e.clientWidth || i.right - i.left,
            p = f.height || e.clientHeight || i.bottom - i.top,
            d = e.offsetWidth - s,
            h = e.offsetHeight - p;
        if (d || h) {
            var m = t(e);
            d -= u(m, "x"), h -= u(m, "y"), i.width -= d, i.height -= h
        }
        return c(i)
    }
    function m(e, n) {
        var o = re(),
            i = "HTML" === n.nodeName,
            f = h(e),
            s = h(n),
            a = r(e),
            u = t(n),
            d = +u.borderTopWidth.split("px")[0],
            l = +u.borderLeftWidth.split("px")[0],
            m = c({
                top: f.top - s.top - d,
                left: f.left - s.left - l,
                width: f.width,
                height: f.height
            });
        if (m.marginTop = 0, m.marginLeft = 0, !o && i) {
            var g = +u.marginTop.split("px")[0],
                v = +u.marginLeft.split("px")[0];
            m.top -= d - g, m.bottom -= d - g, m.left -= l - v, m.right -= l - v, m.marginTop = g, m.marginLeft = v
        }
        return (o ? n.contains(a) : n === a && "BODY" !== a.nodeName) && (m = p(m, n)), m
    }
    function g(e) {
        var t = window.document.documentElement,
            n = m(e, t),
            r = V(t.clientWidth, window.innerWidth || 0),
            o = V(t.clientHeight, window.innerHeight || 0),
            i = a(t),
            f = a(t, "left"),
            s = {
                top: i - n.top + n.marginTop,
                left: f - n.left + n.marginLeft,
                width: r,
                height: o
            };
        return c(s)
    }
    function v(e) {
        var r = e.nodeName;
        return "BODY" !== r && "HTML" !== r && ("fixed" === t(e, "position") || v(n(e)))
    }
    function b(e, t, o, i) {
        var f = {
                top: 0,
                left: 0
            },
            a = s(e, t);
        if ("viewport" === i)
            f = g(a);
        else {
            var p;
            "scrollParent" === i ? (p = r(n(e)), "BODY" === p.nodeName && (p = window.document.documentElement)) : p = "window" === i ? window.document.documentElement : i;
            var u = m(p, a);
            if ("HTML" !== p.nodeName || v(a))
                f = u;
            else {
                var d = l(),
                    c = d.height,
                    h = d.width;
                f.top += u.top - u.marginTop, f.bottom = c + u.top, f.left += u.left - u.marginLeft, f.right = h + u.left
            }
        }
        return f.left += o, f.top += o, f.right -= o, f.bottom -= o, f
    }
    function w(e) {
        var t = e.width,
            n = e.height;
        return t * n
    }
    function y(e, t, n, r, o) {
        var i = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf("auto"))
            return e;
        var f = b(n, r, i, o),
            s = {
                top: {
                    width: f.width,
                    height: t.top - f.top
                },
                right: {
                    width: f.right - t.right,
                    height: f.height
                },
                bottom: {
                    width: f.width,
                    height: f.bottom - t.bottom
                },
                left: {
                    width: t.left - f.left,
                    height: f.height
                }
            },
            a = Object.keys(s).map(function(e) {
                return se({
                    key: e
                }, s[e], {
                    area: w(s[e])
                })
            }).sort(function(e, t) {
                return t.area - e.area
            }),
            p = a.filter(function(e) {
                var t = e.width,
                    r = e.height;
                return t >= n.clientWidth && r >= n.clientHeight
            }),
            u = 0 < p.length ? p[0].key : a[0].key,
            d = e.split("-")[1];
        return u + (d ? "-" + d : "")
    }
    function O(e, t, n) {
        var r = s(t, n);
        return m(n, r)
    }
    function E(e) {
        var t = window.getComputedStyle(e),
            n = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
            r = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
            o = {
                width: e.offsetWidth + r,
                height: e.offsetHeight + n
            };
        return o
    }
    function x(e) {
        var t = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e]
        })
    }
    function L(e, t, n) {
        n = n.split("-")[0];
        var r = E(e),
            o = {
                width: r.width,
                height: r.height
            },
            i = -1 !== ["right", "left"].indexOf(n),
            f = i ? "top" : "left",
            s = i ? "left" : "top",
            a = i ? "height" : "width",
            p = i ? "width" : "height";
        return o[f] = t[f] + t[a] / 2 - r[a] / 2, o[s] = n === s ? t[s] - r[p] : t[x(s)], o
    }
    function T(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }
    function N(e, t, n) {
        if (Array.prototype.findIndex)
            return e.findIndex(function(e) {
                return e[t] === n
            });
        var r = T(e, function(e) {
            return e[t] === n
        });
        return e.indexOf(r)
    }
    function C(t, n, r) {
        var o = void 0 === r ? t : t.slice(0, N(t, "name", r));
        return o.forEach(function(t) {
            t["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var r = t["function"] || t.fn;
            t.enabled && e(r) && (n.offsets.popper = c(n.offsets.popper), n.offsets.reference = c(n.offsets.reference), n = r(n, t))
        }), n
    }
    function k() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            e.offsets.reference = O(this.state, this.popper, this.reference), e.placement = y(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = L(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = "absolute", e = C(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
        }
    }
    function W(e, t) {
        return e.some(function(e) {
            var n = e.name,
                r = e.enabled;
            return r && n === t
        })
    }
    function A(e) {
        for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < t.length - 1; r++) {
            var o = t[r],
                i = o ? "" + o + n : e;
            if ("undefined" != typeof window.document.body.style[i])
                return i
        }
        return null
    }
    function B() {
        return this.state.isDestroyed = !0, W(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[A("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }
    function D(e, t, n, o) {
        var i = "BODY" === e.nodeName,
            f = i ? window : e;
        f.addEventListener(t, n, {
            passive: !0
        }), i || D(r(f.parentNode), t, n, o), o.push(f)
    }
    function H(e, t, n, o) {
        n.updateBound = o, window.addEventListener("resize", n.updateBound, {
            passive: !0
        });
        var i = r(e);
        return D(i, "scroll", n.updateBound, n.scrollParents), n.scrollElement = i, n.eventsEnabled = !0, n
    }
    function M() {
        this.state.eventsEnabled || (this.state = H(this.reference, this.options, this.state, this.scheduleUpdate))
    }
    function P(e, t) {
        return window.removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener("scroll", t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
    }
    function S() {
        this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = P(this.reference, this.state))
    }
    function j(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }
    function I(e, t) {
        Object.keys(t).forEach(function(n) {
            var r = "";
            -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && j(t[n]) && (r = "px"), e.style[n] = t[n] + r
        })
    }
    function F(e, t) {
        Object.keys(t).forEach(function(n) {
            var r = t[n];
            !1 === r ? e.removeAttribute(n) : e.setAttribute(n, t[n])
        })
    }
    function R(e, t, n) {
        var r = T(e, function(e) {
                var n = e.name;
                return n === t
            }),
            o = !!r && e.some(function(e) {
                return e.name === n && e.enabled && e.order < r.order
            });
        if (!o) {
            var i = "`" + t + "`";
            console.warn("`" + n + "` modifier is required by " + i + " modifier in order to work, be sure to include it before " + i + "!")
        }
        return o
    }
    function U(e) {
        return "end" === e ? "start" : "start" === e ? "end" : e
    }
    function Y(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            n = pe.indexOf(e),
            r = pe.slice(n + 1).concat(pe.slice(0, n));
        return t ? r.reverse() : r
    }
    function q(e, t, n, r) {
        var o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            i = +o[1],
            f = o[2];
        if (!i)
            return e;
        if (0 === f.indexOf("%")) {
            var s;
            switch (f) {
            case "%p":
                s = n;
                break;
            case "%":
            case "%r":
            default:
                s = r
            }
            var a = c(s);
            return a[t] / 100 * i
        }
        if ("vh" === f || "vw" === f) {
            var p;
            return p = "vh" === f ? V(document.documentElement.clientHeight, window.innerHeight || 0) : V(document.documentElement.clientWidth, window.innerWidth || 0), p / 100 * i
        }
        return i
    }
    function K(e, t, n, r) {
        var o = [0, 0],
            i = -1 !== ["right", "left"].indexOf(r),
            f = e.split(/(\+|\-)/).map(function(e) {
                return e.trim()
            }),
            s = f.indexOf(T(f, function(e) {
                return -1 !== e.search(/,|\s/)
            }));
        f[s] && -1 === f[s].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var a = /\s*,\s*|\s+/,
            p = -1 === s ? [f] : [f.slice(0, s).concat([f[s].split(a)[0]]), [f[s].split(a)[1]].concat(f.slice(s + 1))];
        return p = p.map(function(e, r) {
            var o = (1 === r ? !i : i) ? "height" : "width",
                f = !1;
            return e.reduce(function(e, t) {
                return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, f = !0, e) : f ? (e[e.length - 1] += t, f = !1, e) : e.concat(t)
            }, []).map(function(e) {
                return q(e, o, t, n)
            })
        }), p.forEach(function(e, t) {
            e.forEach(function(n, r) {
                j(n) && (o[t] += n * ("-" === e[r - 1] ? -1 : 1))
            })
        }), o
    }
    for (var z = Math.min, G = Math.floor, V = Math.max, _ = ["native code", "[object MutationObserverConstructor]"], X = function(e) {
            return _.some(function(t) {
                return -1 < (e || "").toString().indexOf(t)
            })
        }, J = "undefined" != typeof window, Q = ["Edge", "Trident", "Firefox"], Z = 0, $ = 0; $ < Q.length; $ += 1)
        if (J && 0 <= navigator.userAgent.indexOf(Q[$])) {
            Z = 1;
            break
        }
    var ee,
        te = J && X(window.MutationObserver),
        ne = te ? function(e) {
            var t = !1,
                n = 0,
                r = document.createElement("span"),
                o = new MutationObserver(function() {
                    e(), t = !1
                });
            return o.observe(r, {
                attributes: !0
            }), function() {
                t || (t = !0, r.setAttribute("x-index", n), ++n)
            }
        } : function(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1, e()
                }, Z))
            }
        },
        re = function() {
            return void 0 == ee && (ee = -1 !== navigator.appVersion.indexOf("MSIE 10")), ee
        },
        oe = function(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        },
        ie = function() {
            function e(e, t) {
                for (var n, r = 0; r < t.length; r++)
                    n = t[r], n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        fe = function(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        },
        se = Object.assign || function(e) {
            for (var t, n = 1; n < arguments.length; n++)
                for (var r in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e
        },
        ae = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        pe = ae.slice(3),
        ue = {
            FLIP: "flip",
            CLOCKWISE: "clockwise",
            COUNTERCLOCKWISE: "counterclockwise"
        },
        de = function() {
            function t(n, r) {
                var o = this,
                    i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                oe(this, t), this.scheduleUpdate = function() {
                    return requestAnimationFrame(o.update)
                }, this.update = ne(this.update.bind(this)), this.options = se({}, t.Defaults, i), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = n.jquery ? n[0] : n, this.popper = r.jquery ? r[0] : r, this.options.modifiers = {}, Object.keys(se({}, t.Defaults.modifiers, i.modifiers)).forEach(function(e) {
                    o.options.modifiers[e] = se({}, t.Defaults.modifiers[e] || {}, i.modifiers ? i.modifiers[e] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                    return se({
                        name: e
                    }, o.options.modifiers[e])
                }).sort(function(e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function(t) {
                    t.enabled && e(t.onLoad) && t.onLoad(o.reference, o.popper, o.options, t, o.state)
                }), this.update();
                var f = this.options.eventsEnabled;
                f && this.enableEventListeners(), this.state.eventsEnabled = f
            }
            return ie(t, [{
                key: "update",
                value: function() {
                    return k.call(this)
                }
            }, {
                key: "destroy",
                value: function() {
                    return B.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function() {
                    return M.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function() {
                    return S.call(this)
                }
            }]), t
        }();
    return de.Utils = ("undefined" == typeof window ? global : window).PopperUtils, de.placements = ae, de.Defaults = {
        placement: "bottom",
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(e) {
                    var t = e.placement,
                        n = t.split("-")[0],
                        r = t.split("-")[1];
                    if (r) {
                        var o = e.offsets,
                            i = o.reference,
                            f = o.popper,
                            s = -1 !== ["bottom", "top"].indexOf(n),
                            a = s ? "left" : "top",
                            p = s ? "width" : "height",
                            u = {
                                start: fe({}, a, i[a]),
                                end: fe({}, a, i[a] + i[p] - f[p])
                            };
                        e.offsets.popper = se({}, f, u[r])
                    }
                    return e
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: function(e, t) {
                    var n,
                        r = t.offset,
                        o = e.placement,
                        i = e.offsets,
                        f = i.popper,
                        s = i.reference,
                        a = o.split("-")[0];
                    return n = j(+r) ? [+r, 0] : K(r, f, s, a), "left" === a ? (f.top += n[0], f.left -= n[1]) : "right" === a ? (f.top += n[0], f.left += n[1]) : "top" === a ? (f.left += n[0], f.top -= n[1]) : "bottom" === a && (f.left += n[0], f.top += n[1]), e.popper = f, e
                },
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(e, t) {
                    var n = t.boundariesElement || o(e.instance.popper);
                    e.instance.reference === n && (n = o(n));
                    var r = b(e.instance.popper, e.instance.reference, t.padding, n);
                    t.boundaries = r;
                    var i = t.priority,
                        f = e.offsets.popper,
                        s = {
                            primary: function(e) {
                                var n = f[e];
                                return f[e] < r[e] && !t.escapeWithReference && (n = V(f[e], r[e])), fe({}, e, n)
                            },
                            secondary: function(e) {
                                var n = "right" === e ? "left" : "top",
                                    o = f[n];
                                return f[e] > r[e] && !t.escapeWithReference && (o = z(f[n], r[e] - ("right" === e ? f.width : f.height))), fe({}, n, o)
                            }
                        };
                    return i.forEach(function(e) {
                        var t = -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
                        f = se({}, f, s[t](e))
                    }), e.offsets.popper = f, e
                },
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(e) {
                    var t = e.offsets,
                        n = t.popper,
                        r = t.reference,
                        o = e.placement.split("-")[0],
                        i = G,
                        f = -1 !== ["top", "bottom"].indexOf(o),
                        s = f ? "right" : "bottom",
                        a = f ? "left" : "top",
                        p = f ? "width" : "height";
                    return n[s] < i(r[a]) && (e.offsets.popper[a] = i(r[a]) - n[p]), n[a] > i(r[s]) && (e.offsets.popper[a] = i(r[s])), e
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(e, t) {
                    if (!R(e.instance.modifiers, "arrow", "keepTogether"))
                        return e;
                    var n = t.element;
                    if ("string" == typeof n) {
                        if (n = e.instance.popper.querySelector(n), !n)
                            return e
                    } else if (!e.instance.popper.contains(n))
                        return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
                    var r = e.placement.split("-")[0],
                        o = e.offsets,
                        i = o.popper,
                        f = o.reference,
                        s = -1 !== ["left", "right"].indexOf(r),
                        a = s ? "height" : "width",
                        p = s ? "top" : "left",
                        u = s ? "left" : "top",
                        d = s ? "bottom" : "right",
                        l = E(n)[a];
                    f[d] - l < i[p] && (e.offsets.popper[p] -= i[p] - (f[d] - l)), f[p] + l > i[d] && (e.offsets.popper[p] += f[p] + l - i[d]);
                    var h = f[p] + f[a] / 2 - l / 2,
                        m = h - c(e.offsets.popper)[p];
                    return m = V(z(i[a] - l, m), 0), e.arrowElement = n, e.offsets.arrow = {}, e.offsets.arrow[p] = Math.round(m), e.offsets.arrow[u] = "", e
                },
                element: "[x-arrow]"
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(e, t) {
                    if (W(e.instance.modifiers, "inner"))
                        return e;
                    if (e.flipped && e.placement === e.originalPlacement)
                        return e;
                    var n = b(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
                        r = e.placement.split("-")[0],
                        o = x(r),
                        i = e.placement.split("-")[1] || "",
                        f = [];
                    switch (t.behavior) {
                    case ue.FLIP:
                        f = [r, o];
                        break;
                    case ue.CLOCKWISE:
                        f = Y(r);
                        break;
                    case ue.COUNTERCLOCKWISE:
                        f = Y(r, !0);
                        break;
                    default:
                        f = t.behavior
                    }
                    return f.forEach(function(s, a) {
                        if (r !== s || f.length === a + 1)
                            return e;
                        r = e.placement.split("-")[0], o = x(r);
                        var p = e.offsets.popper,
                            u = e.offsets.reference,
                            d = G,
                            l = "left" === r && d(p.right) > d(u.left) || "right" === r && d(p.left) < d(u.right) || "top" === r && d(p.bottom) > d(u.top) || "bottom" === r && d(p.top) < d(u.bottom),
                            c = d(p.left) < d(n.left),
                            h = d(p.right) > d(n.right),
                            m = d(p.top) < d(n.top),
                            g = d(p.bottom) > d(n.bottom),
                            v = "left" === r && c || "right" === r && h || "top" === r && m || "bottom" === r && g,
                            b = -1 !== ["top", "bottom"].indexOf(r),
                            w = !!t.flipVariations && (b && "start" === i && c || b && "end" === i && h || !b && "start" === i && m || !b && "end" === i && g);
                        (l || v || w) && (e.flipped = !0, (l || v) && (r = f[a + 1]), w && (i = U(i)), e.placement = r + (i ? "-" + i : ""), e.offsets.popper = se({}, e.offsets.popper, L(e.instance.popper, e.offsets.reference, e.placement)), e = C(e.instance.modifiers, e, "flip"))
                    }), e
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport"
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(e) {
                    var t = e.placement,
                        n = t.split("-")[0],
                        r = e.offsets,
                        o = r.popper,
                        i = r.reference,
                        f = -1 !== ["left", "right"].indexOf(n),
                        s = -1 === ["top", "left"].indexOf(n);
                    return o[f ? "left" : "top"] = i[t] - (s ? o[f ? "width" : "height"] : 0), e.placement = x(t), e.offsets.popper = c(o), e
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(e) {
                    if (!R(e.instance.modifiers, "hide", "preventOverflow"))
                        return e;
                    var t = e.offsets.reference,
                        n = T(e.instance.modifiers, function(e) {
                            return "preventOverflow" === e.name
                        }).boundaries;
                    if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
                        if (!0 === e.hide)
                            return e;
                        e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === e.hide)
                            return e;
                        e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
                    }
                    return e
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(e, t) {
                    var n = t.x,
                        r = t.y,
                        i = e.offsets.popper,
                        f = T(e.instance.modifiers, function(e) {
                            return "applyStyle" === e.name
                        }).gpuAcceleration;
                    void 0 !== f && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    var s,
                        a,
                        p = void 0 === f ? t.gpuAcceleration : f,
                        u = o(e.instance.popper),
                        d = h(u),
                        l = {
                            position: i.position
                        },
                        c = {
                            left: G(i.left),
                            top: G(i.top),
                            bottom: G(i.bottom),
                            right: G(i.right)
                        },
                        m = "bottom" === n ? "top" : "bottom",
                        g = "right" === r ? "left" : "right",
                        v = A("transform");
                    if (a = "bottom" == m ? -d.height + c.bottom : c.top, s = "right" == g ? -d.width + c.right : c.left, p && v)
                        l[v] = "translate3d(" + s + "px, " + a + "px, 0)", l[m] = 0, l[g] = 0, l.willChange = "transform";
                    else {
                        var b = "bottom" == m ? -1 : 1,
                            w = "right" == g ? -1 : 1;
                        l[m] = a * b, l[g] = s * w, l.willChange = m + ", " + g
                    }
                    var y = {
                        "x-placement": e.placement
                    };
                    return e.attributes = se({}, y, e.attributes), e.styles = se({}, l, e.styles), e
                },
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(e) {
                    return I(e.instance.popper, e.styles), F(e.instance.popper, e.attributes), e.offsets.arrow && I(e.arrowElement, e.offsets.arrow), e
                },
                onLoad: function(e, t, n, r, o) {
                    var i = O(o, t, e),
                        f = y(n.placement, i, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                    return t.setAttribute("x-placement", f), I(t, {
                        position: "absolute"
                    }), n
                },
                gpuAcceleration: void 0
            }
        }
    }, de
});

