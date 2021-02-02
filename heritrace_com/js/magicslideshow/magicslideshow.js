window.MagicSlideshow = (function() {
    var k, c;
    k = c = (function() {
        var z = {
            version: "v3.3-b3-10-g8c8a487",
            UUID: 0,
            storage: {},
            $uuid: function(D) {
                return (D.$J_UUID || (D.$J_UUID = ++s.UUID))
            },
            getStorage: function(D) {
                return (s.storage[D] || (s.storage[D] = {}))
            },
            $F: function() {},
            $false: function() {
                return false
            },
            $true: function() {
                return true
            },
            stylesId: "mjs-" + Math.floor(Math.random() * new Date().getTime()),
            defined: function(D) {
                return (undefined != D)
            },
            ifndef: function(E, D) {
                return (undefined != E) ? E : D
            },
            exists: function(D) {
                return !!(D)
            },
            jTypeOf: function(D) {
                if (!s.defined(D)) {
                    return false
                }
                if (D.$J_TYPE) {
                    return D.$J_TYPE
                }
                if (!!D.nodeType) {
                    if (1 == D.nodeType) {
                        return "element"
                    }
                    if (3 == D.nodeType) {
                        return "textnode"
                    }
                }
                if (D.length && D.item) {
                    return "collection"
                }
                if (D.length && D.callee) {
                    return "arguments"
                }
                if ((D instanceof window.Object || D instanceof window.Function) && D.constructor === s.Class) {
                    return "class"
                }
                if (D instanceof window.Array) {
                    return "array"
                }
                if (D instanceof window.Function) {
                    return "function"
                }
                if (D instanceof window.String) {
                    return "string"
                }
                if (s.browser.trident) {
                    if (s.defined(D.cancelBubble)) {
                        return "event"
                    }
                } else {
                    if (D === window.event || D.constructor == window.Event || D.constructor == window.MouseEvent || D.constructor == window.UIEvent || D.constructor == window.KeyboardEvent || D.constructor == window.KeyEvent) {
                        return "event"
                    }
                }
                if (D instanceof window.Date) {
                    return "date"
                }
                if (D instanceof window.RegExp) {
                    return "regexp"
                }
                if (D === window) {
                    return "window"
                }
                if (D === document) {
                    return "document"
                }
                return typeof(D)
            },
            extend: function(I, H) {
                if (!(I instanceof window.Array)) {
                    I = [I]
                }
                if (!H) {
                    return I[0]
                }
                for (var G = 0, E = I.length; G < E; G++) {
                    if (!s.defined(I)) {
                        continue
                    }
                    for (var F in H) {
                        if (!Object.prototype.hasOwnProperty.call(H, F)) {
                            continue
                        }
                        try {
                            I[G][F] = H[F]
                        } catch (D) {}
                    }
                }
                return I[0]
            },
            implement: function(H, G) {
                if (!(H instanceof window.Array)) {
                    H = [H]
                }
                for (var F = 0, D = H.length; F < D; F++) {
                    if (!s.defined(H[F])) {
                        continue
                    }
                    if (!H[F].prototype) {
                        continue
                    }
                    for (var E in (G || {})) {
                        if (!H[F].prototype[E]) {
                            H[F].prototype[E] = G[E]
                        }
                    }
                }
                return H[0]
            },
            nativize: function(F, E) {
                if (!s.defined(F)) {
                    return F
                }
                for (var D in (E || {})) {
                    if (!F[D]) {
                        F[D] = E[D]
                    }
                }
                return F
            },
            $try: function() {
                for (var E = 0, D = arguments.length; E < D; E++) {
                    try {
                        return arguments[E]()
                    } catch (F) {}
                }
                return null
            },
            $A: function(F) {
                if (!s.defined(F)) {
                    return s.$([])
                }
                if (F.toArray) {
                    return s.$(F.toArray())
                }
                if (F.item) {
                    var E = F.length || 0,
                        D = new Array(E);
                    while (E--) {
                        D[E] = F[E]
                    }
                    return s.$(D)
                }
                return s.$(Array.prototype.slice.call(F))
            },
            now: function() {
                return new Date().getTime()
            },
            detach: function(H) {
                var F;
                switch (s.jTypeOf(H)) {
                    case "object":
                        F = {};
                        for (var G in H) {
                            F[G] = s.detach(H[G])
                        }
                        break;
                    case "array":
                        F = [];
                        for (var E = 0, D = H.length; E < D; E++) {
                            F[E] = s.detach(H[E])
                        }
                        break;
                    default:
                        return H
                }
                return s.$(F)
            },
            $: function(F) {
                var D = true;
                if (!s.defined(F)) {
                    return null
                }
                if (F.$J_EXT) {
                    return F
                }
                switch (s.jTypeOf(F)) {
                    case "array":
                        F = s.nativize(F, s.extend(s.Array, {
                            $J_EXT: s.$F
                        }));
                        F.jEach = F.forEach;
                        return F;
                        break;
                    case "string":
                        var E = document.getElementById(F);
                        if (s.defined(E)) {
                            return s.$(E)
                        }
                        return null;
                        break;
                    case "window":
                    case "document":
                        s.$uuid(F);
                        F = s.extend(F, s.Doc);
                        break;
                    case "element":
                        s.$uuid(F);
                        F = s.extend(F, s.Element);
                        break;
                    case "event":
                        F = s.extend(F, s.Event);
                        break;
                    case "textnode":
                    case "function":
                    case "array":
                    case "date":
                    default:
                        D = false;
                        break
                }
                if (D) {
                    return s.extend(F, {
                        $J_EXT: s.$F
                    })
                } else {
                    return F
                }
            },
            $new: function(D, F, E) {
                return s.$(s.doc.createElement(D)).setProps(F || {}).jSetCss(E || {})
            },
            addCSS: function(E, G, K) {
                var H, F, I, J = [],
                    D = -1;
                K || (K = s.stylesId);
                H = s.$(K) || s.$new("style", {
                    id: K,
                    type: "text/css"
                }).jAppendTo((document.head || document.body), "top");
                F = H.sheet || H.styleSheet;
                if ("string" != s.jTypeOf(G)) {
                    for (var I in G) {
                        J.push(I + ":" + G[I])
                    }
                    G = J.join(";")
                }
                if (F.insertRule) {
                    D = F.insertRule(E + " {" + G + "}", F.cssRules.length)
                } else {
                    D = F.addRule(E, G)
                }
                return D
            },
            removeCSS: function(G, D) {
                var F, E;
                F = s.$(G);
                if ("element" !== s.jTypeOf(F)) {
                    return
                }
                E = F.sheet || F.styleSheet;
                if (E.deleteRule) {
                    E.deleteRule(D)
                } else {
                    if (E.removeRule) {
                        E.removeRule(D)
                    }
                }
            },
            generateUUID: function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(F) {
                    var E = Math.random() * 16 | 0,
                        D = F == "x" ? E : (E & 3 | 8);
                    return D.toString(16)
                }).toUpperCase()
            },
            getAbsoluteURL: (function() {
                var D;
                return function(E) {
                    if (!D) {
                        D = document.createElement("a")
                    }
                    D.setAttribute("href", E);
                    return ("!!" + D.href).replace("!!", "")
                }
            })(),
            getHashCode: function(F) {
                var G = 0,
                    D = F.length;
                for (var E = 0; E < D; ++E) {
                    G = 31 * G + F.charCodeAt(E);
                    G %= 4294967296
                }
                return G
            }
        };
        var s = z;
        var u = z.$;
        if (!window.magicJS) {
            window.magicJS = z;
            window.$mjs = z.$
        }
        s.Array = {
            $J_TYPE: "array",
            indexOf: function(G, H) {
                var D = this.length;
                for (var E = this.length, F = (H < 0) ? Math.max(0, E + H) : H || 0; F < E; F++) {
                    if (this[F] === G) {
                        return F
                    }
                }
                return -1
            },
            contains: function(D, E) {
                return this.indexOf(D, E) != -1
            },
            forEach: function(D, G) {
                for (var F = 0, E = this.length; F < E; F++) {
                    if (F in this) {
                        D.call(G, this[F], F, this)
                    }
                }
            },
            filter: function(D, I) {
                var H = [];
                for (var G = 0, E = this.length; G < E; G++) {
                    if (G in this) {
                        var F = this[G];
                        if (D.call(I, this[G], G, this)) {
                            H.push(F)
                        }
                    }
                }
                return H
            },
            map: function(D, H) {
                var G = [];
                for (var F = 0, E = this.length; F < E; F++) {
                    if (F in this) {
                        G[F] = D.call(H, this[F], F, this)
                    }
                }
                return G
            }
        };
        s.implement(String, {
            $J_TYPE: "string",
            jTrim: function() {
                return this.replace(/^\s+|\s+$/g, "")
            },
            eq: function(D, E) {
                return (E || false) ? (this.toString() === D.toString()) : (this.toLowerCase().toString() === D.toLowerCase().toString())
            },
            jCamelize: function() {
                return this.replace(/-\D/g, function(D) {
                    return D.charAt(1).toUpperCase()
                })
            },
            dashize: function() {
                return this.replace(/[A-Z]/g, function(D) {
                    return ("-" + D.charAt(0).toLowerCase())
                })
            },
            jToInt: function(D) {
                return parseInt(this, D || 10)
            },
            toFloat: function() {
                return parseFloat(this)
            },
            jToBool: function() {
                return !this.replace(/true/i, "").jTrim()
            },
            has: function(E, D) {
                D = D || "";
                return (D + this + D).indexOf(D + E + D) > -1
            }
        });
        z.implement(Function, {
            $J_TYPE: "function",
            jBind: function() {
                var E = s.$A(arguments),
                    D = this,
                    F = E.shift();
                return function() {
                    return D.apply(F || null, E.concat(s.$A(arguments)))
                }
            },
            jBindAsEvent: function() {
                var E = s.$A(arguments),
                    D = this,
                    F = E.shift();
                return function(G) {
                    return D.apply(F || null, s.$([G || (s.browser.ieMode ? window.event : null)]).concat(E))
                }
            },
            jDelay: function() {
                var E = s.$A(arguments),
                    D = this,
                    F = E.shift();
                return window.setTimeout(function() {
                    return D.apply(D, E)
                }, F || 0)
            },
            jDefer: function() {
                var E = s.$A(arguments),
                    D = this;
                return function() {
                    return D.jDelay.apply(D, E)
                }
            },
            interval: function() {
                var E = s.$A(arguments),
                    D = this,
                    F = E.shift();
                return window.setInterval(function() {
                    return D.apply(D, E)
                }, F || 0)
            }
        });
        var A = {},
            r = navigator.userAgent.toLowerCase(),
            q = r.match(/(webkit|gecko|trident|presto)\/(\d+\.?\d*)/i),
            w = r.match(/(edge|opr)\/(\d+\.?\d*)/i) || r.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i),
            y = r.match(/version\/(\d+\.?\d*)/i),
            m = document.documentElement.style;

        function n(E) {
            var D = E.charAt(0).toUpperCase() + E.slice(1);
            return E in m || ("Webkit" + D) in m || ("Moz" + D) in m || ("ms" + D) in m || ("O" + D) in m
        }
        s.browser = {
            features: {
                xpath: !!(document.evaluate),
                air: !!(window.runtime),
                query: !!(document.querySelector),
                fullScreen: !!(document.fullscreenEnabled || document.msFullscreenEnabled || document.exitFullscreen || document.cancelFullScreen || document.webkitexitFullscreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.oCancelFullScreen || document.msCancelFullScreen),
                xhr2: !!(window.ProgressEvent) && !!(window.FormData) && (window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
                transition: n("transition"),
                transform: n("transform"),
                perspective: n("perspective"),
                animation: n("animation"),
                requestAnimationFrame: false,
                multibackground: false,
                cssFilters: false,
                svg: (function() {
                    return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
                })()
            },
            touchScreen: function() {
                return "ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch)
            }(),
            mobile: r.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/) ? true : false,
            engine: (q && q[1]) ? q[1].toLowerCase() : (window.opera) ? "presto" : !!(window.ActiveXObject) ? "trident" : (undefined !== document.getBoxObjectFor || null != window.mozInnerScreenY) ? "gecko" : (null !== window.WebKitPoint || !navigator.taintEnabled) ? "webkit" : "unknown",
            version: (q && q[2]) ? parseFloat(q[2]) : 0,
            uaName: (w && w[1]) ? w[1].toLowerCase() : "",
            uaVersion: (w && w[2]) ? parseFloat(w[2]) : 0,
            cssPrefix: "",
            cssDomPrefix: "",
            domPrefix: "",
            ieMode: 0,
            platform: r.match(/ip(?:ad|od|hone)/) ? "ios" : (r.match(/(?:webos|android)/) || navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
            backCompat: document.compatMode && "backcompat" == document.compatMode.toLowerCase(),
            scrollbarsWidth: 0,
            getDoc: function() {
                return (document.compatMode && "backcompat" == document.compatMode.toLowerCase()) ? document.body : document.documentElement
            },
            requestAnimationFrame: window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || undefined,
            cancelAnimationFrame: window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || undefined,
            ready: false,
            onready: function() {
                if (s.browser.ready) {
                    return
                }
                var G, F;
                s.browser.ready = true;
                s.body = s.$(document.body);
                s.win = s.$(window);
                try {
                    var E = s.$new("div").jSetCss({
                        width: 100,
                        height: 100,
                        overflow: "scroll",
                        position: "absolute",
                        top: -9999
                    }).jAppendTo(document.body);
                    s.browser.scrollbarsWidth = E.offsetWidth - E.clientWidth;
                    E.jRemove()
                } catch (D) {}
                try {
                    G = s.$new("div");
                    F = G.style;
                    F.cssText = "background:url(https://),url(https://),red url(https://)";
                    s.browser.features.multibackground = (/(url\s*\(.*?){3}/).test(F.background);
                    F = null;
                    G = null
                } catch (D) {}
                if (!s.browser.cssTransformProp) {
                    s.browser.cssTransformProp = s.normalizeCSS("transform").dashize()
                }
                try {
                    G = s.$new("div");
                    G.style.cssText = s.normalizeCSS("filter").dashize() + ":blur(2px);";
                    s.browser.features.cssFilters = !!G.style.length && (!s.browser.ieMode || s.browser.ieMode > 9);
                    G = null
                } catch (D) {}
                if (!s.browser.features.cssFilters) {
                    s.$(document.documentElement).jAddClass("no-cssfilters-magic")
                }
                if (undefined === window.TransitionEvent && undefined !== window.WebKitTransitionEvent) {
                    A.transitionend = "webkitTransitionEnd"
                }
                s.Doc.jCallEvent.call(s.$(document), "domready")
            }
        };
        (function() {
            var H = [],
                G, F, E;

            function D() {
                return !!(arguments.callee.caller)
            }
            switch (s.browser.engine) {
                case "trident":
                    if (!s.browser.version) {
                        s.browser.version = !!(window.XMLHttpRequest) ? 3 : 2
                    }
                    break;
                case "gecko":
                    s.browser.version = (w && w[2]) ? parseFloat(w[2]) : 0;
                    break
            }
            s.browser[s.browser.engine] = true;
            if (w && "crios" === w[1]) {
                s.browser.uaName = "chrome"
            }
            if (!!window.chrome) {
                s.browser.chrome = true
            }
            if (w && "opr" === w[1]) {
                s.browser.uaName = "opera";
                s.browser.opera = true
            }
            if ("safari" === s.browser.uaName && (y && y[1])) {
                s.browser.uaVersion = parseFloat(y[1])
            }
            if ("android" == s.browser.platform && s.browser.webkit && (y && y[1])) {
                s.browser.androidBrowser = true
            }
            G = ({
                gecko: ["-moz-", "Moz", "moz"],
                webkit: ["-webkit-", "Webkit", "webkit"],
                trident: ["-ms-", "ms", "ms"],
                presto: ["-o-", "O", "o"]
            })[s.browser.engine] || ["", "", ""];
            s.browser.cssPrefix = G[0];
            s.browser.cssDomPrefix = G[1];
            s.browser.domPrefix = G[2];
            s.browser.ieMode = (!s.browser.trident) ? undefined : (document.documentMode) ? document.documentMode : function() {
                var I = 0;
                if (s.browser.backCompat) {
                    return 5
                }
                switch (s.browser.version) {
                    case 2:
                        I = 6;
                        break;
                    case 3:
                        I = 7;
                        break
                }
                return I
            }();
            H.push(s.browser.platform + "-magic");
            if (s.browser.mobile) {
                H.push("mobile-magic")
            }
            if (s.browser.androidBrowser) {
                H.push("android-browser-magic")
            }
            if (s.browser.ieMode) {
                s.browser.uaName = "ie";
                s.browser.uaVersion = s.browser.ieMode;
                H.push("ie" + s.browser.ieMode + "-magic");
                for (F = 11; F > s.browser.ieMode; F--) {
                    H.push("lt-ie" + F + "-magic")
                }
            }
            if (s.browser.webkit && s.browser.version < 536) {
                s.browser.features.fullScreen = false
            }
            if (s.browser.requestAnimationFrame) {
                s.browser.requestAnimationFrame.call(window, function() {
                    s.browser.features.requestAnimationFrame = true
                })
            }
            if (s.browser.features.svg) {
                H.push("svg-magic")
            } else {
                H.push("no-svg-magic")
            }
            E = (document.documentElement.className || "").match(/\S+/g) || [];
            document.documentElement.className = s.$(E).concat(H).join(" ");
            if (s.browser.ieMode && s.browser.ieMode < 9) {
                document.createElement("figure");
                document.createElement("figcaption")
            }
        })();
        (function() {
            s.browser.fullScreen = {
                capable: s.browser.features.fullScreen,
                enabled: function() {
                    return !!(document.fullscreenElement || document[s.browser.domPrefix + "FullscreenElement"] || document.fullScreen || document.webkitIsFullScreen || document[s.browser.domPrefix + "FullScreen"])
                },
                request: function(D, E) {
                    E || (E = {});
                    if (this.capable) {
                        s.$(document).jAddEvent(this.changeEventName, this.onchange = function(F) {
                            if (this.enabled()) {
                                E.onEnter && E.onEnter()
                            } else {
                                s.$(document).jRemoveEvent(this.changeEventName, this.onchange);
                                E.onExit && E.onExit()
                            }
                        }.jBindAsEvent(this));
                        s.$(document).jAddEvent(this.errorEventName, this.onerror = function(F) {
                            E.fallback && E.fallback();
                            s.$(document).jRemoveEvent(this.errorEventName, this.onerror)
                        }.jBindAsEvent(this));
                        (D[s.browser.domPrefix + "RequestFullscreen"] || D[s.browser.domPrefix + "RequestFullScreen"] || D.requestFullscreen || function() {}).call(D)
                    } else {
                        if (E.fallback) {
                            E.fallback()
                        }
                    }
                },
                cancel: (document.exitFullscreen || document.cancelFullScreen || document[s.browser.domPrefix + "ExitFullscreen"] || document[s.browser.domPrefix + "CancelFullScreen"] || function() {}).jBind(document),
                changeEventName: document.msExitFullscreen ? "MSFullscreenChange" : (document.exitFullscreen ? "" : s.browser.domPrefix) + "fullscreenchange",
                errorEventName: document.msExitFullscreen ? "MSFullscreenError" : (document.exitFullscreen ? "" : s.browser.domPrefix) + "fullscreenerror",
                prefix: s.browser.domPrefix,
                activeElement: null
            }
        })();
        var C = /\S+/g,
            p = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/,
            v = {
                "float": ("undefined" === typeof(m.styleFloat)) ? "cssFloat" : "styleFloat"
            },
            x = {
                fontWeight: true,
                lineHeight: true,
                opacity: true,
                zIndex: true,
                zoom: true
            },
            o = (window.getComputedStyle) ? function(F, D) {
                var E = window.getComputedStyle(F, null);
                return E ? E.getPropertyValue(D) || E[D] : null
            } : function(G, E) {
                var F = G.currentStyle,
                    D = null;
                D = F ? F[E] : null;
                if (null == D && G.style && G.style[E]) {
                    D = G.style[E]
                }
                return D
            };

        function B(F) {
            var D, E;
            E = (s.browser.webkit && "filter" == F) ? false : (F in m);
            if (!E) {
                D = s.browser.cssDomPrefix + F.charAt(0).toUpperCase() + F.slice(1);
                if (D in m) {
                    return D
                }
            }
            return F
        }
        s.normalizeCSS = B;
        s.Element = {
            jHasClass: function(D) {
                return !(D || "").has(" ") && (this.className || "").has(D, " ")
            },
            jAddClass: function(H) {
                var E = (this.className || "").match(C) || [],
                    G = (H || "").match(C) || [],
                    D = G.length,
                    F = 0;
                for (; F < D; F++) {
                    if (!s.$(E).contains(G[F])) {
                        E.push(G[F])
                    }
                }
                this.className = E.join(" ");
                return this
            },
            jRemoveClass: function(I) {
                var E = (this.className || "").match(C) || [],
                    H = (I || "").match(C) || [],
                    D = H.length,
                    G = 0,
                    F;
                for (; G < D; G++) {
                    if ((F = s.$(E).indexOf(H[G])) > -1) {
                        E.splice(F, 1)
                    }
                }
                this.className = I ? E.join(" ") : "";
                return this
            },
            jToggleClass: function(D) {
                return this.jHasClass(D) ? this.jRemoveClass(D) : this.jAddClass(D)
            },
            jGetCss: function(E) {
                var F = E.jCamelize(),
                    D = null;
                E = v[F] || (v[F] = B(F));
                D = o(this, E);
                if ("auto" === D) {
                    D = null
                }
                if (null !== D) {
                    if ("opacity" == E) {
                        return s.defined(D) ? parseFloat(D) : 1
                    }
                    if (p.test(E)) {
                        D = parseInt(D, 10) ? D : "0px"
                    }
                }
                return D
            },
            jSetCssProp: function(E, D) {
                var G = E.jCamelize();
                try {
                    if ("opacity" == E) {
                        this.jSetOpacity(D);
                        return this
                    }
                    E = v[G] || (v[G] = B(G));
                    this.style[E] = D + (("number" == s.jTypeOf(D) && !x[G]) ? "px" : "")
                } catch (F) {}
                return this
            },
            jSetCss: function(E) {
                for (var D in E) {
                    this.jSetCssProp(D, E[D])
                }
                return this
            },
            jGetStyles: function() {
                var D = {};
                s.$A(arguments).jEach(function(E) {
                    D[E] = this.jGetCss(E)
                }, this);
                return D
            },
            jSetOpacity: function(F, D) {
                var E;
                D = D || false;
                this.style.opacity = F;
                F = parseInt(parseFloat(F) * 100);
                if (D) {
                    if (0 === F) {
                        if ("hidden" != this.style.visibility) {
                            this.style.visibility = "hidden"
                        }
                    } else {
                        if ("visible" != this.style.visibility) {
                            this.style.visibility = "visible"
                        }
                    }
                }
                if (s.browser.ieMode && s.browser.ieMode < 9) {
                    if (!isNaN(F)) {
                        if (!~this.style.filter.indexOf("Alpha")) {
                            this.style.filter += " progid:DXImageTransform.Microsoft.Alpha(Opacity=" + F + ")"
                        } else {
                            this.style.filter = this.style.filter.replace(/Opacity=\d*/i, "Opacity=" + F)
                        }
                    } else {
                        this.style.filter = this.style.filter.replace(/progid:DXImageTransform.Microsoft.Alpha\(Opacity=\d*\)/i, "").jTrim();
                        if ("" === this.style.filter) {
                            this.style.removeAttribute("filter")
                        }
                    }
                }
                return this
            },
            setProps: function(D) {
                for (var E in D) {
                    if ("class" === E) {
                        this.jAddClass("" + D[E])
                    } else {
                        this.setAttribute(E, "" + D[E])
                    }
                }
                return this
            },
            jGetTransitionDuration: function() {
                var E = 0,
                    D = 0;
                E = this.jGetCss("transition-duration");
                D = this.jGetCss("transition-delay");
                E = E.indexOf("ms") > -1 ? parseFloat(E) : E.indexOf("s") > -1 ? parseFloat(E) * 1000 : 0;
                D = D.indexOf("ms") > -1 ? parseFloat(D) : D.indexOf("s") > -1 ? parseFloat(D) * 1000 : 0;
                return E + D
            },
            hide: function() {
                return this.jSetCss({
                    display: "none",
                    visibility: "hidden"
                })
            },
            show: function() {
                return this.jSetCss({
                    display: "",
                    visibility: "visible"
                })
            },
            jGetSize: function() {
                return {
                    width: this.offsetWidth,
                    height: this.offsetHeight
                }
            },
            getInnerSize: function(E) {
                var D = this.jGetSize();
                D.width -= (parseFloat(this.jGetCss("border-left-width") || 0) + parseFloat(this.jGetCss("border-right-width") || 0));
                D.height -= (parseFloat(this.jGetCss("border-top-width") || 0) + parseFloat(this.jGetCss("border-bottom-width") || 0));
                if (!E) {
                    D.width -= (parseFloat(this.jGetCss("padding-left") || 0) + parseFloat(this.jGetCss("padding-right") || 0));
                    D.height -= (parseFloat(this.jGetCss("padding-top") || 0) + parseFloat(this.jGetCss("padding-bottom") || 0))
                }
                return D
            },
            jGetScroll: function() {
                return {
                    top: this.scrollTop,
                    left: this.scrollLeft
                }
            },
            jGetFullScroll: function() {
                var D = this,
                    E = {
                        top: 0,
                        left: 0
                    };
                do {
                    E.left += D.scrollLeft || 0;
                    E.top += D.scrollTop || 0;
                    D = D.parentNode
                } while (D);
                return E
            },
            jGetPosition: function() {
                var H = this,
                    E = 0,
                    G = 0;
                if (s.defined(document.documentElement.getBoundingClientRect)) {
                    var D = this.getBoundingClientRect(),
                        F = s.$(document).jGetScroll(),
                        I = s.browser.getDoc();
                    return {
                        top: D.top + F.y - I.clientTop,
                        left: D.left + F.x - I.clientLeft
                    }
                }
                do {
                    E += H.offsetLeft || 0;
                    G += H.offsetTop || 0;
                    H = H.offsetParent
                } while (H && !(/^(?:body|html)$/i).test(H.tagName));
                return {
                    top: G,
                    left: E
                }
            },
            jGetRect: function() {
                var E = this.jGetPosition();
                var D = this.jGetSize();
                return {
                    top: E.top,
                    bottom: E.top + D.height,
                    left: E.left,
                    right: E.left + D.width
                }
            },
            changeContent: function(E) {
                try {
                    this.innerHTML = E
                } catch (D) {
                    this.innerText = E
                }
                return this
            },
            jRemove: function() {
                return (this.parentNode) ? this.parentNode.removeChild(this) : this
            },
            kill: function() {
                s.$A(this.childNodes).jEach(function(D) {
                    if (3 == D.nodeType || 8 == D.nodeType) {
                        return
                    }
                    s.$(D).kill()
                });
                this.jRemove();
                this.jClearEvents();
                if (this.$J_UUID) {
                    s.storage[this.$J_UUID] = null;
                    delete s.storage[this.$J_UUID]
                }
                return null
            },
            append: function(F, E) {
                E = E || "bottom";
                var D = this.firstChild;
                ("top" == E && D) ? this.insertBefore(F, D): this.appendChild(F);
                return this
            },
            jAppendTo: function(F, E) {
                var D = s.$(F).append(this, E);
                return this
            },
            enclose: function(D) {
                this.append(D.parentNode.replaceChild(this, D));
                return this
            },
            hasChild: function(D) {
                if ("element" !== s.jTypeOf("string" == s.jTypeOf(D) ? D = document.getElementById(D) : D)) {
                    return false
                }
                return (this == D) ? false : (this.contains && !(s.browser.webkit419)) ? (this.contains(D)) : (this.compareDocumentPosition) ? !!(this.compareDocumentPosition(D) & 16) : s.$A(this.byTag(D.tagName)).contains(D)
            }
        };
        s.Element.jGetStyle = s.Element.jGetCss;
        s.Element.jSetStyle = s.Element.jSetCss;
        if (!window.Element) {
            window.Element = s.$F;
            if (s.browser.engine.webkit) {
                window.document.createElement("iframe")
            }
            window.Element.prototype = (s.browser.engine.webkit) ? window["[[DOMElement.prototype]]"] : {}
        }
        s.implement(window.Element, {
            $J_TYPE: "element"
        });
        s.Doc = {
            jGetSize: function() {
                if (s.browser.touchScreen || s.browser.presto925 || s.browser.webkit419) {
                    return {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }
                }
                return {
                    width: s.browser.getDoc().clientWidth,
                    height: s.browser.getDoc().clientHeight
                }
            },
            jGetScroll: function() {
                return {
                    x: window.pageXOffset || s.browser.getDoc().scrollLeft,
                    y: window.pageYOffset || s.browser.getDoc().scrollTop
                }
            },
            jGetFullSize: function() {
                var D = this.jGetSize();
                return {
                    width: Math.max(s.browser.getDoc().scrollWidth, D.width),
                    height: Math.max(s.browser.getDoc().scrollHeight, D.height)
                }
            }
        };
        s.extend(document, {
            $J_TYPE: "document"
        });
        s.extend(window, {
            $J_TYPE: "window"
        });
        s.extend([s.Element, s.Doc], {
            jFetch: function(G, E) {
                var D = s.getStorage(this.$J_UUID),
                    F = D[G];
                if (undefined !== E && undefined === F) {
                    F = D[G] = E
                }
                return (s.defined(F) ? F : null)
            },
            jStore: function(F, E) {
                var D = s.getStorage(this.$J_UUID);
                D[F] = E;
                return this
            },
            jDel: function(E) {
                var D = s.getStorage(this.$J_UUID);
                delete D[E];
                return this
            }
        });
        if (!(window.HTMLElement && window.HTMLElement.prototype && window.HTMLElement.prototype.getElementsByClassName)) {
            s.extend([s.Element, s.Doc], {
                getElementsByClassName: function(D) {
                    return s.$A(this.getElementsByTagName("*")).filter(function(F) {
                        try {
                            return (1 == F.nodeType && F.className.has(D, " "))
                        } catch (E) {}
                    })
                }
            })
        }
        s.extend([s.Element, s.Doc], {
            byClass: function() {
                return this.getElementsByClassName(arguments[0])
            },
            byTag: function() {
                return this.getElementsByTagName(arguments[0])
            }
        });
        if (s.browser.fullScreen.capable && !document.requestFullScreen) {
            s.Element.requestFullScreen = function() {
                s.browser.fullScreen.request(this)
            }
        }
        s.Event = {
            $J_TYPE: "event",
            isQueueStopped: s.$false,
            stop: function() {
                return this.stopDistribution().stopDefaults()
            },
            stopDistribution: function() {
                if (this.stopPropagation) {
                    this.stopPropagation()
                } else {
                    this.cancelBubble = true
                }
                return this
            },
            stopDefaults: function() {
                if (this.preventDefault) {
                    this.preventDefault()
                } else {
                    this.returnValue = false
                }
                return this
            },
            stopQueue: function() {
                this.isQueueStopped = s.$true;
                return this
            },
            getClientXY: function() {
                var E, D;
                E = ((/touch/i).test(this.type)) ? this.changedTouches[0] : this;
                return (!s.defined(E)) ? {
                    x: 0,
                    y: 0
                } : {
                    x: E.clientX,
                    y: E.clientY
                }
            },
            jGetPageXY: function() {
                var E, D;
                E = ((/touch/i).test(this.type)) ? this.changedTouches[0] : this;
                return (!s.defined(E)) ? {
                    x: 0,
                    y: 0
                } : {
                    x: E.pageX || E.clientX + s.browser.getDoc().scrollLeft,
                    y: E.pageY || E.clientY + s.browser.getDoc().scrollTop
                }
            },
            getTarget: function() {
                var D = this.target || this.srcElement;
                while (D && 3 == D.nodeType) {
                    D = D.parentNode
                }
                return D
            },
            getRelated: function() {
                var E = null;
                switch (this.type) {
                    case "mouseover":
                    case "pointerover":
                    case "MSPointerOver":
                        E = this.relatedTarget || this.fromElement;
                        break;
                    case "mouseout":
                    case "pointerout":
                    case "MSPointerOut":
                        E = this.relatedTarget || this.toElement;
                        break;
                    default:
                        return E
                }
                try {
                    while (E && 3 == E.nodeType) {
                        E = E.parentNode
                    }
                } catch (D) {
                    E = null
                }
                return E
            },
            getButton: function() {
                if (!this.which && this.button !== undefined) {
                    return (this.button & 1 ? 1 : (this.button & 2 ? 3 : (this.button & 4 ? 2 : 0)))
                }
                return this.which
            },
            isTouchEvent: function() {
                return (this.pointerType && ("touch" === this.pointerType || this.pointerType === this.MSPOINTER_TYPE_TOUCH)) || (/touch/i).test(this.type)
            },
            isPrimaryTouch: function() {
                return this.pointerType ? (("touch" === this.pointerType || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary) : 1 === this.changedTouches.length && (this.targetTouches.length ? this.targetTouches[0].identifier == this.changedTouches[0].identifier : true)
            }
        };
        s._event_add_ = "addEventListener";
        s._event_del_ = "removeEventListener";
        s._event_prefix_ = "";
        if (!document.addEventListener) {
            s._event_add_ = "attachEvent";
            s._event_del_ = "detachEvent";
            s._event_prefix_ = "on"
        }
        s.Event.Custom = {
            type: "",
            x: null,
            y: null,
            timeStamp: null,
            button: null,
            target: null,
            relatedTarget: null,
            $J_TYPE: "event.custom",
            isQueueStopped: s.$false,
            events: s.$([]),
            pushToEvents: function(D) {
                var E = D;
                this.events.push(E)
            },
            stop: function() {
                return this.stopDistribution().stopDefaults()
            },
            stopDistribution: function() {
                this.events.jEach(function(E) {
                    try {
                        E.stopDistribution()
                    } catch (D) {}
                });
                return this
            },
            stopDefaults: function() {
                this.events.jEach(function(E) {
                    try {
                        E.stopDefaults()
                    } catch (D) {}
                });
                return this
            },
            stopQueue: function() {
                this.isQueueStopped = s.$true;
                return this
            },
            getClientXY: function() {
                return {
                    x: this.clientX,
                    y: this.clientY
                }
            },
            jGetPageXY: function() {
                return {
                    x: this.x,
                    y: this.y
                }
            },
            getTarget: function() {
                return this.target
            },
            getRelated: function() {
                return this.relatedTarget
            },
            getButton: function() {
                return this.button
            },
            getOriginalTarget: function() {
                return this.events.length > 0 ? this.events[0].getTarget() : undefined
            }
        };
        s.extend([s.Element, s.Doc], {
            jAddEvent: function(F, H, I, L) {
                var K, D, G, J, E;
                if ("string" == s.jTypeOf(F)) {
                    E = F.split(" ");
                    if (E.length > 1) {
                        F = E
                    }
                }
                if (s.jTypeOf(F) == "array") {
                    s.$(F).jEach(this.jAddEvent.jBindAsEvent(this, H, I, L));
                    return this
                }
                if (!F || !H || s.jTypeOf(F) != "string" || s.jTypeOf(H) != "function") {
                    return this
                }
                if (F == "domready" && s.browser.ready) {
                    H.call(this);
                    return this
                }
                F = A[F] || F;
                I = parseInt(I || 50);
                if (!H.$J_EUID) {
                    H.$J_EUID = Math.floor(Math.random() * s.now())
                }
                K = s.Doc.jFetch.call(this, "_EVENTS_", {});
                D = K[F];
                if (!D) {
                    K[F] = D = s.$([]);
                    G = this;
                    if (s.Event.Custom[F]) {
                        s.Event.Custom[F].handler.add.call(this, L)
                    } else {
                        D.handle = function(M) {
                            M = s.extend(M || window.e, {
                                $J_TYPE: "event"
                            });
                            s.Doc.jCallEvent.call(G, F, s.$(M))
                        };
                        this[s._event_add_](s._event_prefix_ + F, D.handle, false)
                    }
                }
                J = {
                    type: F,
                    fn: H,
                    priority: I,
                    euid: H.$J_EUID
                };
                D.push(J);
                D.sort(function(N, M) {
                    return N.priority - M.priority
                });
                return this
            },
            jRemoveEvent: function(J) {
                var H = s.Doc.jFetch.call(this, "_EVENTS_", {}),
                    F, D, E, K, I, G;
                I = arguments.length > 1 ? arguments[1] : -100;
                if ("string" == s.jTypeOf(J)) {
                    G = J.split(" ");
                    if (G.length > 1) {
                        J = G
                    }
                }
                if (s.jTypeOf(J) == "array") {
                    s.$(J).jEach(this.jRemoveEvent.jBindAsEvent(this, I));
                    return this
                }
                J = A[J] || J;
                if (!J || s.jTypeOf(J) != "string" || !H || !H[J]) {
                    return this
                }
                F = H[J] || [];
                for (E = 0; E < F.length; E++) {
                    D = F[E];
                    if (-100 == I || !!I && I.$J_EUID === D.euid) {
                        K = F.splice(E--, 1)
                    }
                }
                if (0 === F.length) {
                    if (s.Event.Custom[J]) {
                        s.Event.Custom[J].handler.jRemove.call(this)
                    } else {
                        this[s._event_del_](s._event_prefix_ + J, F.handle, false)
                    }
                    delete H[J]
                }
                return this
            },
            jCallEvent: function(H, J) {
                var G = s.Doc.jFetch.call(this, "_EVENTS_", {}),
                    F, D, E;
                H = A[H] || H;
                if (!H || s.jTypeOf(H) != "string" || !G || !G[H]) {
                    return this
                }
                try {
                    J = s.extend(J || {}, {
                        type: H
                    })
                } catch (I) {}
                if (undefined === J.timeStamp) {
                    J.timeStamp = s.now()
                }
                F = G[H] || [];
                for (E = 0; E < F.length && !(J.isQueueStopped && J.isQueueStopped()); E++) {
                    F[E].fn.call(this, J)
                }
            },
            jRaiseEvent: function(E, D) {
                var H = ("domready" == E) ? false : true,
                    G = this,
                    F;
                E = A[E] || E;
                if (!H) {
                    s.Doc.jCallEvent.call(this, E);
                    return this
                }
                if (G === document && document.createEvent && !G.dispatchEvent) {
                    G = document.documentElement
                }
                if (document.createEvent) {
                    F = document.createEvent(E);
                    F.initEvent(D, true, true)
                } else {
                    F = document.createEventObject();
                    F.eventType = E
                }
                if (document.createEvent) {
                    G.dispatchEvent(F)
                } else {
                    G.fireEvent("on" + D, F)
                }
                return F
            },
            jClearEvents: function() {
                var E = s.Doc.jFetch.call(this, "_EVENTS_");
                if (!E) {
                    return this
                }
                for (var D in E) {
                    s.Doc.jRemoveEvent.call(this, D)
                }
                s.Doc.jDel.call(this, "_EVENTS_");
                return this
            }
        });
        (function(D) {
            if ("complete" === document.readyState) {
                return D.browser.onready.jDelay(1)
            }
            if (D.browser.webkit && D.browser.version < 420) {
                (function() {
                    (D.$(["loaded", "complete"]).contains(document.readyState)) ? D.browser.onready(): arguments.callee.jDelay(50)
                })()
            } else {
                if (D.browser.trident && D.browser.ieMode < 9 && window == top) {
                    (function() {
                        (D.$try(function() {
                            D.browser.getDoc().doScroll("left");
                            return true
                        })) ? D.browser.onready(): arguments.callee.jDelay(50)
                    })()
                } else {
                    D.Doc.jAddEvent.call(D.$(document), "DOMContentLoaded", D.browser.onready);
                    D.Doc.jAddEvent.call(D.$(window), "load", D.browser.onready)
                }
            }
        })(z);
        s.Class = function() {
            var H = null,
                E = s.$A(arguments);
            if ("class" == s.jTypeOf(E[0])) {
                H = E.shift()
            }
            var D = function() {
                for (var K in this) {
                    this[K] = s.detach(this[K])
                }
                if (this.constructor.$parent) {
                    this.$parent = {};
                    var M = this.constructor.$parent;
                    for (var L in M) {
                        var J = M[L];
                        switch (s.jTypeOf(J)) {
                            case "function":
                                this.$parent[L] = s.Class.wrap(this, J);
                                break;
                            case "object":
                                this.$parent[L] = s.detach(J);
                                break;
                            case "array":
                                this.$parent[L] = s.detach(J);
                                break
                        }
                    }
                }
                var I = (this.init) ? this.init.apply(this, arguments) : this;
                delete this.caller;
                return I
            };
            if (!D.prototype.init) {
                D.prototype.init = s.$F
            }
            if (H) {
                var G = function() {};
                G.prototype = H.prototype;
                D.prototype = new G;
                D.$parent = {};
                for (var F in H.prototype) {
                    D.$parent[F] = H.prototype[F]
                }
            } else {
                D.$parent = null
            }
            D.constructor = s.Class;
            D.prototype.constructor = D;
            s.extend(D.prototype, E[0]);
            s.extend(D, {
                $J_TYPE: "class"
            });
            return D
        };
        z.Class.wrap = function(D, E) {
            return function() {
                var G = this.caller;
                var F = E.apply(D, arguments);
                return F
            }
        };
        (function(G) {
            var F = G.$;
            var D = 5,
                E = 300;
            G.Event.Custom.btnclick = new G.Class(G.extend(G.Event.Custom, {
                type: "btnclick",
                init: function(J, I) {
                    var H = I.jGetPageXY();
                    this.x = H.x;
                    this.y = H.y;
                    this.clientX = I.clientX;
                    this.clientY = I.clientY;
                    this.timeStamp = I.timeStamp;
                    this.button = I.getButton();
                    this.target = J;
                    this.pushToEvents(I)
                }
            }));
            G.Event.Custom.btnclick.handler = {
                options: {
                    threshold: E,
                    button: 1
                },
                add: function(H) {
                    this.jStore("event:btnclick:options", G.extend(G.detach(G.Event.Custom.btnclick.handler.options), H || {}));
                    this.jAddEvent("mousedown", G.Event.Custom.btnclick.handler.handle, 1);
                    this.jAddEvent("mouseup", G.Event.Custom.btnclick.handler.handle, 1);
                    this.jAddEvent("click", G.Event.Custom.btnclick.handler.onclick, 1);
                    if (G.browser.trident && G.browser.ieMode < 9) {
                        this.jAddEvent("dblclick", G.Event.Custom.btnclick.handler.handle, 1)
                    }
                },
                jRemove: function() {
                    this.jRemoveEvent("mousedown", G.Event.Custom.btnclick.handler.handle);
                    this.jRemoveEvent("mouseup", G.Event.Custom.btnclick.handler.handle);
                    this.jRemoveEvent("click", G.Event.Custom.btnclick.handler.onclick);
                    if (G.browser.trident && G.browser.ieMode < 9) {
                        this.jRemoveEvent("dblclick", G.Event.Custom.btnclick.handler.handle)
                    }
                },
                onclick: function(H) {
                    H.stopDefaults()
                },
                handle: function(K) {
                    var J, H, I;
                    H = this.jFetch("event:btnclick:options");
                    if (K.type != "dblclick" && K.getButton() != H.button) {
                        return
                    }
                    if (this.jFetch("event:btnclick:ignore")) {
                        this.jDel("event:btnclick:ignore");
                        return
                    }
                    if ("mousedown" == K.type) {
                        J = new G.Event.Custom.btnclick(this, K);
                        this.jStore("event:btnclick:btnclickEvent", J)
                    } else {
                        if ("mouseup" == K.type) {
                            J = this.jFetch("event:btnclick:btnclickEvent");
                            if (!J) {
                                return
                            }
                            I = K.jGetPageXY();
                            this.jDel("event:btnclick:btnclickEvent");
                            J.pushToEvents(K);
                            if (K.timeStamp - J.timeStamp <= H.threshold && Math.sqrt(Math.pow(I.x - J.x, 2) + Math.pow(I.y - J.y, 2)) <= D) {
                                this.jCallEvent("btnclick", J)
                            }
                            document.jCallEvent("mouseup", K)
                        } else {
                            if (K.type == "dblclick") {
                                J = new G.Event.Custom.btnclick(this, K);
                                this.jCallEvent("btnclick", J)
                            }
                        }
                    }
                }
            }
        })(z);
        (function(E) {
            var D = E.$;
            E.Event.Custom.mousedrag = new E.Class(E.extend(E.Event.Custom, {
                type: "mousedrag",
                state: "dragstart",
                dragged: false,
                init: function(I, H, G) {
                    var F = H.jGetPageXY();
                    this.x = F.x;
                    this.y = F.y;
                    this.clientX = H.clientX;
                    this.clientY = H.clientY;
                    this.timeStamp = H.timeStamp;
                    this.button = H.getButton();
                    this.target = I;
                    this.pushToEvents(H);
                    this.state = G
                }
            }));
            E.Event.Custom.mousedrag.handler = {
                add: function() {
                    var G = E.Event.Custom.mousedrag.handler.handleMouseMove.jBindAsEvent(this),
                        F = E.Event.Custom.mousedrag.handler.handleMouseUp.jBindAsEvent(this);
                    this.jAddEvent("mousedown", E.Event.Custom.mousedrag.handler.handleMouseDown, 1);
                    this.jAddEvent("mouseup", E.Event.Custom.mousedrag.handler.handleMouseUp, 1);
                    document.jAddEvent("mousemove", G, 1);
                    document.jAddEvent("mouseup", F, 1);
                    this.jStore("event:mousedrag:listeners:document:move", G);
                    this.jStore("event:mousedrag:listeners:document:end", F)
                },
                jRemove: function() {
                    this.jRemoveEvent("mousedown", E.Event.Custom.mousedrag.handler.handleMouseDown);
                    this.jRemoveEvent("mouseup", E.Event.Custom.mousedrag.handler.handleMouseUp);
                    D(document).jRemoveEvent("mousemove", this.jFetch("event:mousedrag:listeners:document:move") || E.$F);
                    D(document).jRemoveEvent("mouseup", this.jFetch("event:mousedrag:listeners:document:end") || E.$F);
                    this.jDel("event:mousedrag:listeners:document:move");
                    this.jDel("event:mousedrag:listeners:document:end")
                },
                handleMouseDown: function(G) {
                    var F;
                    if (1 != G.getButton()) {
                        return
                    }
                    G.stopDefaults();
                    F = new E.Event.Custom.mousedrag(this, G, "dragstart");
                    this.jStore("event:mousedrag:dragstart", F)
                },
                handleMouseUp: function(G) {
                    var F;
                    F = this.jFetch("event:mousedrag:dragstart");
                    if (!F) {
                        return
                    }
                    G.stopDefaults();
                    F = new E.Event.Custom.mousedrag(this, G, "dragend");
                    this.jDel("event:mousedrag:dragstart");
                    this.jCallEvent("mousedrag", F)
                },
                handleMouseMove: function(G) {
                    var F;
                    F = this.jFetch("event:mousedrag:dragstart");
                    if (!F) {
                        return
                    }
                    G.stopDefaults();
                    if (!F.dragged) {
                        F.dragged = true;
                        this.jCallEvent("mousedrag", F)
                    }
                    F = new E.Event.Custom.mousedrag(this, G, "dragmove");
                    this.jCallEvent("mousedrag", F)
                }
            }
        })(z);
        (function(E) {
            var D = E.$;
            E.Event.Custom.dblbtnclick = new E.Class(E.extend(E.Event.Custom, {
                type: "dblbtnclick",
                timedout: false,
                tm: null,
                init: function(H, G) {
                    var F = G.jGetPageXY();
                    this.x = F.x;
                    this.y = F.y;
                    this.clientX = G.clientX;
                    this.clientY = G.clientY;
                    this.timeStamp = G.timeStamp;
                    this.button = G.getButton();
                    this.target = H;
                    this.pushToEvents(G)
                }
            }));
            E.Event.Custom.dblbtnclick.handler = {
                options: {
                    threshold: 200
                },
                add: function(F) {
                    this.jStore("event:dblbtnclick:options", E.extend(E.detach(E.Event.Custom.dblbtnclick.handler.options), F || {}));
                    this.jAddEvent("btnclick", E.Event.Custom.dblbtnclick.handler.handle, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent("btnclick", E.Event.Custom.dblbtnclick.handler.handle)
                },
                handle: function(H) {
                    var G, F;
                    G = this.jFetch("event:dblbtnclick:event");
                    F = this.jFetch("event:dblbtnclick:options");
                    if (!G) {
                        G = new E.Event.Custom.dblbtnclick(this, H);
                        G.tm = setTimeout(function() {
                            G.timedout = true;
                            H.isQueueStopped = E.$false;
                            this.jCallEvent("btnclick", H);
                            this.jDel("event:dblbtnclick:event")
                        }.jBind(this), F.threshold + 10);
                        this.jStore("event:dblbtnclick:event", G);
                        H.stopQueue()
                    } else {
                        clearTimeout(G.tm);
                        this.jDel("event:dblbtnclick:event");
                        if (!G.timedout) {
                            G.pushToEvents(H);
                            H.stopQueue().stop();
                            this.jCallEvent("dblbtnclick", G)
                        } else {}
                    }
                }
            }
        })(z);
        (function(J) {
            var I = J.$;

            function D(K) {
                return K.pointerType ? (("touch" === K.pointerType || K.MSPOINTER_TYPE_TOUCH === K.pointerType) && K.isPrimary) : 1 === K.changedTouches.length && (K.targetTouches.length ? K.targetTouches[0].identifier == K.changedTouches[0].identifier : true)
            }

            function F(K) {
                if (K.pointerType) {
                    return ("touch" === K.pointerType || K.MSPOINTER_TYPE_TOUCH === K.pointerType) ? K.pointerId : null
                } else {
                    return K.changedTouches[0].identifier
                }
            }

            function G(K) {
                if (K.pointerType) {
                    return ("touch" === K.pointerType || K.MSPOINTER_TYPE_TOUCH === K.pointerType) ? K : null
                } else {
                    return K.changedTouches[0]
                }
            }
            J.Event.Custom.tap = new J.Class(J.extend(J.Event.Custom, {
                type: "tap",
                id: null,
                init: function(L, K) {
                    var M = G(K);
                    this.id = M.pointerId || M.identifier;
                    this.x = M.pageX;
                    this.y = M.pageY;
                    this.pageX = M.pageX;
                    this.pageY = M.pageY;
                    this.clientX = M.clientX;
                    this.clientY = M.clientY;
                    this.timeStamp = K.timeStamp;
                    this.button = 0;
                    this.target = L;
                    this.pushToEvents(K)
                }
            }));
            var E = 10,
                H = 200;
            J.Event.Custom.tap.handler = {
                add: function(K) {
                    this.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], J.Event.Custom.tap.handler.onTouchStart, 1);
                    this.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], J.Event.Custom.tap.handler.onTouchEnd, 1);
                    this.jAddEvent("click", J.Event.Custom.tap.handler.onClick, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], J.Event.Custom.tap.handler.onTouchStart);
                    this.jRemoveEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], J.Event.Custom.tap.handler.onTouchEnd);
                    this.jRemoveEvent("click", J.Event.Custom.tap.handler.onClick)
                },
                onClick: function(K) {
                    K.stopDefaults()
                },
                onTouchStart: function(K) {
                    if (!D(K)) {
                        this.jDel("event:tap:event");
                        return
                    }
                    this.jStore("event:tap:event", new J.Event.Custom.tap(this, K));
                    this.jStore("event:btnclick:ignore", true)
                },
                onTouchEnd: function(N) {
                    var L = J.now(),
                        M = this.jFetch("event:tap:event"),
                        K = this.jFetch("event:tap:options");
                    if (!M || !D(N)) {
                        return
                    }
                    this.jDel("event:tap:event");
                    if (M.id == F(N) && N.timeStamp - M.timeStamp <= H && Math.sqrt(Math.pow(G(N).pageX - M.x, 2) + Math.pow(G(N).pageY - M.y, 2)) <= E) {
                        this.jDel("event:btnclick:btnclickEvent");
                        N.stop();
                        M.pushToEvents(N);
                        this.jCallEvent("tap", M)
                    }
                }
            }
        })(z);
        s.Event.Custom.dbltap = new s.Class(s.extend(s.Event.Custom, {
            type: "dbltap",
            timedout: false,
            tm: null,
            init: function(E, D) {
                this.x = D.x;
                this.y = D.y;
                this.clientX = D.clientX;
                this.clientY = D.clientY;
                this.timeStamp = D.timeStamp;
                this.button = 0;
                this.target = E;
                this.pushToEvents(D)
            }
        }));
        s.Event.Custom.dbltap.handler = {
            options: {
                threshold: 300
            },
            add: function(D) {
                this.jStore("event:dbltap:options", s.extend(s.detach(s.Event.Custom.dbltap.handler.options), D || {}));
                this.jAddEvent("tap", s.Event.Custom.dbltap.handler.handle, 1)
            },
            jRemove: function() {
                this.jRemoveEvent("tap", s.Event.Custom.dbltap.handler.handle)
            },
            handle: function(F) {
                var E, D;
                E = this.jFetch("event:dbltap:event");
                D = this.jFetch("event:dbltap:options");
                if (!E) {
                    E = new s.Event.Custom.dbltap(this, F);
                    E.tm = setTimeout(function() {
                        E.timedout = true;
                        F.isQueueStopped = s.$false;
                        this.jCallEvent("tap", F)
                    }.jBind(this), D.threshold + 10);
                    this.jStore("event:dbltap:event", E);
                    F.stopQueue()
                } else {
                    clearTimeout(E.tm);
                    this.jDel("event:dbltap:event");
                    if (!E.timedout) {
                        E.pushToEvents(F);
                        F.stopQueue().stop();
                        this.jCallEvent("dbltap", E)
                    } else {}
                }
            }
        };
        (function(I) {
            var H = I.$;

            function D(J) {
                return J.pointerType ? (("touch" === J.pointerType || J.MSPOINTER_TYPE_TOUCH === J.pointerType) && J.isPrimary) : 1 === J.changedTouches.length && (J.targetTouches.length ? J.targetTouches[0].identifier == J.changedTouches[0].identifier : true)
            }

            function F(J) {
                if (J.pointerType) {
                    return ("touch" === J.pointerType || J.MSPOINTER_TYPE_TOUCH === J.pointerType) ? J.pointerId : null
                } else {
                    return J.changedTouches[0].identifier
                }
            }

            function G(J) {
                if (J.pointerType) {
                    return ("touch" === J.pointerType || J.MSPOINTER_TYPE_TOUCH === J.pointerType) ? J : null
                } else {
                    return J.changedTouches[0]
                }
            }
            var E = 10;
            I.Event.Custom.touchdrag = new I.Class(I.extend(I.Event.Custom, {
                type: "touchdrag",
                state: "dragstart",
                id: null,
                dragged: false,
                init: function(L, K, J) {
                    var M = G(K);
                    this.id = M.pointerId || M.identifier;
                    this.clientX = M.clientX;
                    this.clientY = M.clientY;
                    this.pageX = M.pageX;
                    this.pageY = M.pageY;
                    this.x = M.pageX;
                    this.y = M.pageY;
                    this.timeStamp = K.timeStamp;
                    this.button = 0;
                    this.target = L;
                    this.pushToEvents(K);
                    this.state = J
                }
            }));
            I.Event.Custom.touchdrag.handler = {
                add: function() {
                    var K = I.Event.Custom.touchdrag.handler.onTouchMove.jBind(this),
                        J = I.Event.Custom.touchdrag.handler.onTouchEnd.jBind(this);
                    this.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], I.Event.Custom.touchdrag.handler.onTouchStart, 1);
                    this.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], I.Event.Custom.touchdrag.handler.onTouchEnd, 1);
                    this.jAddEvent(["touchmove", window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove"], I.Event.Custom.touchdrag.handler.onTouchMove, 1);
                    this.jStore("event:touchdrag:listeners:document:move", K);
                    this.jStore("event:touchdrag:listeners:document:end", J);
                    H(document).jAddEvent(window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove", K, 1);
                    H(document).jAddEvent(window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp", J, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], I.Event.Custom.touchdrag.handler.onTouchStart);
                    this.jRemoveEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], I.Event.Custom.touchdrag.handler.onTouchEnd);
                    this.jRemoveEvent(["touchmove", window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove"], I.Event.Custom.touchdrag.handler.onTouchMove);
                    H(document).jRemoveEvent(window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove", this.jFetch("event:touchdrag:listeners:document:move") || I.$F, 1);
                    H(document).jRemoveEvent(window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp", this.jFetch("event:touchdrag:listeners:document:end") || I.$F, 1);
                    this.jDel("event:touchdrag:listeners:document:move");
                    this.jDel("event:touchdrag:listeners:document:end")
                },
                onTouchStart: function(K) {
                    var J;
                    if (!D(K)) {
                        return
                    }
                    J = new I.Event.Custom.touchdrag(this, K, "dragstart");
                    this.jStore("event:touchdrag:dragstart", J)
                },
                onTouchEnd: function(K) {
                    var J;
                    J = this.jFetch("event:touchdrag:dragstart");
                    if (!J || !J.dragged || J.id != F(K)) {
                        return
                    }
                    J = new I.Event.Custom.touchdrag(this, K, "dragend");
                    this.jDel("event:touchdrag:dragstart");
                    this.jCallEvent("touchdrag", J)
                },
                onTouchMove: function(K) {
                    var J;
                    J = this.jFetch("event:touchdrag:dragstart");
                    if (!J || !D(K)) {
                        return
                    }
                    if (J.id != F(K)) {
                        this.jDel("event:touchdrag:dragstart");
                        return
                    }
                    if (!J.dragged && Math.sqrt(Math.pow(G(K).pageX - J.x, 2) + Math.pow(G(K).pageY - J.y, 2)) > E) {
                        J.dragged = true;
                        this.jCallEvent("touchdrag", J)
                    }
                    if (!J.dragged) {
                        return
                    }
                    J = new I.Event.Custom.touchdrag(this, K, "dragmove");
                    this.jCallEvent("touchdrag", J)
                }
            }
        })(z);
        s.Event.Custom.touchpinch = new s.Class(s.extend(s.Event.Custom, {
            type: "touchpinch",
            scale: 1,
            previousScale: 1,
            curScale: 1,
            state: "pinchstart",
            init: function(E, D) {
                this.timeStamp = D.timeStamp;
                this.button = 0;
                this.target = E;
                this.x = D.touches[0].clientX + (D.touches[1].clientX - D.touches[0].clientX) / 2;
                this.y = D.touches[0].clientY + (D.touches[1].clientY - D.touches[0].clientY) / 2;
                this._initialDistance = Math.sqrt(Math.pow(D.touches[0].clientX - D.touches[1].clientX, 2) + Math.pow(D.touches[0].clientY - D.touches[1].clientY, 2));
                this.pushToEvents(D)
            },
            update: function(D) {
                var E;
                this.state = "pinchupdate";
                if (D.changedTouches[0].identifier != this.events[0].touches[0].identifier || D.changedTouches[1].identifier != this.events[0].touches[1].identifier) {
                    return
                }
                E = Math.sqrt(Math.pow(D.changedTouches[0].clientX - D.changedTouches[1].clientX, 2) + Math.pow(D.changedTouches[0].clientY - D.changedTouches[1].clientY, 2));
                this.previousScale = this.scale;
                this.scale = E / this._initialDistance;
                this.curScale = this.scale / this.previousScale;
                this.x = D.changedTouches[0].clientX + (D.changedTouches[1].clientX - D.changedTouches[0].clientX) / 2;
                this.y = D.changedTouches[0].clientY + (D.changedTouches[1].clientY - D.changedTouches[0].clientY) / 2;
                this.pushToEvents(D)
            }
        }));
        s.Event.Custom.touchpinch.handler = {
            add: function() {
                this.jAddEvent("touchstart", s.Event.Custom.touchpinch.handler.handleTouchStart, 1);
                this.jAddEvent("touchend", s.Event.Custom.touchpinch.handler.handleTouchEnd, 1);
                this.jAddEvent("touchmove", s.Event.Custom.touchpinch.handler.handleTouchMove, 1)
            },
            jRemove: function() {
                this.jRemoveEvent("touchstart", s.Event.Custom.touchpinch.handler.handleTouchStart);
                this.jRemoveEvent("touchend", s.Event.Custom.touchpinch.handler.handleTouchEnd);
                this.jRemoveEvent("touchmove", s.Event.Custom.touchpinch.handler.handleTouchMove)
            },
            handleTouchStart: function(E) {
                var D;
                if (E.touches.length != 2) {
                    return
                }
                E.stopDefaults();
                D = new s.Event.Custom.touchpinch(this, E);
                this.jStore("event:touchpinch:event", D)
            },
            handleTouchEnd: function(E) {
                var D;
                D = this.jFetch("event:touchpinch:event");
                if (!D) {
                    return
                }
                E.stopDefaults();
                this.jDel("event:touchpinch:event")
            },
            handleTouchMove: function(E) {
                var D;
                D = this.jFetch("event:touchpinch:event");
                if (!D) {
                    return
                }
                E.stopDefaults();
                D.update(E);
                this.jCallEvent("touchpinch", D)
            }
        };
        (function(I) {
            var G = I.$;
            I.Event.Custom.mousescroll = new I.Class(I.extend(I.Event.Custom, {
                type: "mousescroll",
                init: function(O, N, Q, K, J, P, L) {
                    var M = N.jGetPageXY();
                    this.x = M.x;
                    this.y = M.y;
                    this.timeStamp = N.timeStamp;
                    this.target = O;
                    this.delta = Q || 0;
                    this.deltaX = K || 0;
                    this.deltaY = J || 0;
                    this.deltaZ = P || 0;
                    this.deltaFactor = L || 0;
                    this.deltaMode = N.deltaMode || 0;
                    this.isMouse = false;
                    this.pushToEvents(N)
                }
            }));
            var H, E;

            function D() {
                H = null
            }

            function F(J, K) {
                return (J > 50) || (1 === K && !("win" == I.browser.platform && J < 1)) || (0 === J % 12) || (0 == J % 4.000244140625)
            }
            I.Event.Custom.mousescroll.handler = {
                eventType: "onwheel" in document || I.browser.ieMode > 8 ? "wheel" : "mousewheel",
                add: function() {
                    this.jAddEvent(I.Event.Custom.mousescroll.handler.eventType, I.Event.Custom.mousescroll.handler.handle, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(I.Event.Custom.mousescroll.handler.eventType, I.Event.Custom.mousescroll.handler.handle, 1)
                },
                handle: function(O) {
                    var P = 0,
                        M = 0,
                        K = 0,
                        J = 0,
                        N, L;
                    if (O.detail) {
                        K = O.detail * -1
                    }
                    if (O.wheelDelta !== undefined) {
                        K = O.wheelDelta
                    }
                    if (O.wheelDeltaY !== undefined) {
                        K = O.wheelDeltaY
                    }
                    if (O.wheelDeltaX !== undefined) {
                        M = O.wheelDeltaX * -1
                    }
                    if (O.deltaY) {
                        K = -1 * O.deltaY
                    }
                    if (O.deltaX) {
                        M = O.deltaX
                    }
                    if (0 === K && 0 === M) {
                        return
                    }
                    P = 0 === K ? M : K;
                    J = Math.max(Math.abs(K), Math.abs(M));
                    if (!H || J < H) {
                        H = J
                    }
                    N = P > 0 ? "floor" : "ceil";
                    P = Math[N](P / H);
                    M = Math[N](M / H);
                    K = Math[N](K / H);
                    if (E) {
                        clearTimeout(E)
                    }
                    E = setTimeout(D, 200);
                    L = new I.Event.Custom.mousescroll(this, O, P, M, K, 0, H);
                    L.isMouse = F(H, O.deltaMode || 0);
                    this.jCallEvent("mousescroll", L)
                }
            }
        })(z);
        s.win = s.$(window);
        s.doc = s.$(document);
        return z
    })();
    (function(o) {
        if (!o) {
            throw "MagicJS not found"
        }
        var n = o.$;
        var m = window.URL || window.webkitURL || null;
        k.ImageLoader = new o.Class({
            img: null,
            ready: false,
            options: {
                onprogress: o.$F,
                onload: o.$F,
                onabort: o.$F,
                onerror: o.$F,
                oncomplete: o.$F,
                onxhrerror: o.$F,
                xhr: false,
                progressiveLoad: true
            },
            size: null,
            _timer: null,
            loadedBytes: 0,
            _handlers: {
                onprogress: function(p) {
                    if (p.target && (200 === p.target.status || 304 === p.target.status) && p.lengthComputable) {
                        this.options.onprogress.jBind(null, (p.loaded - (this.options.progressiveLoad ? this.loadedBytes : 0)) / p.total).jDelay(1);
                        this.loadedBytes = p.loaded
                    }
                },
                onload: function(p) {
                    if (p) {
                        n(p).stop()
                    }
                    this._unbind();
                    if (this.ready) {
                        return
                    }
                    this.ready = true;
                    this._cleanup();
                    !this.options.xhr && this.options.onprogress.jBind(null, 1).jDelay(1);
                    this.options.onload.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onabort: function(p) {
                    if (p) {
                        n(p).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onabort.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onerror: function(p) {
                    if (p) {
                        n(p).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onerror.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                }
            },
            _bind: function() {
                n(["load", "abort", "error"]).jEach(function(p) {
                    this.img.jAddEvent(p, this._handlers["on" + p].jBindAsEvent(this).jDefer(1))
                }, this)
            },
            _unbind: function() {
                if (this._timer) {
                    try {
                        clearTimeout(this._timer)
                    } catch (p) {}
                    this._timer = null
                }
                n(["load", "abort", "error"]).jEach(function(q) {
                    this.img.jRemoveEvent(q)
                }, this)
            },
            _cleanup: function() {
                this.jGetSize();
                if (this.img.jFetch("new")) {
                    var q = this.img.parentNode;
                    this.img.jRemove().jDel("new").jSetCss({
                        position: "static",
                        top: "auto"
                    });
                    q.kill()
                }
            },
            loadBlob: function(q) {
                var r = new XMLHttpRequest(),
                    p;
                n(["abort", "progress"]).jEach(function(s) {
                    r["on" + s] = n(function(u) {
                        this._handlers["on" + s].call(this, u)
                    }).jBind(this)
                }, this);
                r.onerror = n(function() {
                    this.options.onxhrerror.jBind(null, this).jDelay(1);
                    this.options.xhr = false;
                    this._bind();
                    this.img.src = q
                }).jBind(this);
                r.onload = n(function() {
                    if (200 !== r.status && 304 !== r.status) {
                        this._handlers.onerror.call(this);
                        return
                    }
                    p = r.response;
                    this._bind();
                    if (m && !o.browser.trident && !("ios" === o.browser.platform && o.browser.version < 537)) {
                        this.img.setAttribute("src", m.createObjectURL(p))
                    } else {
                        this.img.src = q
                    }
                }).jBind(this);
                r.open("GET", q);
                r.responseType = "blob";
                r.send()
            },
            init: function(q, p) {
                this.options = o.extend(this.options, p);
                this.img = n(q) || o.$new("img", {}, {
                    "max-width": "none",
                    "max-height": "none"
                }).jAppendTo(o.$new("div").jAddClass("magic-temporary-img").jSetCss({
                    position: "absolute",
                    top: -10000,
                    width: 10,
                    height: 10,
                    overflow: "hidden"
                }).jAppendTo(document.body)).jStore("new", true);
                if (o.browser.features.xhr2 && this.options.xhr && "string" == o.jTypeOf(q)) {
                    this.loadBlob(q);
                    return
                }
                var r = function() {
                    if (this.isReady()) {
                        this._handlers.onload.call(this)
                    } else {
                        this._handlers.onerror.call(this)
                    }
                    r = null
                }.jBind(this);
                this._bind();
                if ("string" == o.jTypeOf(q)) {
                    this.img.src = q
                } else {
                    if (o.browser.trident && 5 == o.browser.version && o.browser.ieMode < 9) {
                        this.img.onreadystatechange = function() {
                            if (/loaded|complete/.test(this.img.readyState)) {
                                this.img.onreadystatechange = null;
                                r && r()
                            }
                        }.jBind(this)
                    }
                    this.img.src = q.getAttribute("src")
                }
                this.img && this.img.complete && r && (this._timer = r.jDelay(100))
            },
            destroy: function() {
                this._unbind();
                this._cleanup();
                this.ready = false;
                return this
            },
            isReady: function() {
                var p = this.img;
                return (p.naturalWidth) ? (p.naturalWidth > 0) : (p.readyState) ? ("complete" == p.readyState) : p.width > 0
            },
            jGetSize: function() {
                return this.size || (this.size = {
                    width: this.img.naturalWidth || this.img.width,
                    height: this.img.naturalHeight || this.img.height
                })
            }
        })
    })(k);
    (function(n) {
        if (!n) {
            throw "MagicJS not found"
        }
        if (n.FX) {
            return
        }
        var m = n.$;
        n.FX = new n.Class({
            init: function(p, o) {
                var q;
                this.el = n.$(p);
                this.options = n.extend(this.options, o);
                this.timer = false;
                this.easeFn = this.cubicBezierAtTime;
                q = n.FX.Transition[this.options.transition] || this.options.transition;
                if ("function" === n.jTypeOf(q)) {
                    this.easeFn = q
                } else {
                    this.cubicBezier = this.parseCubicBezier(q) || this.parseCubicBezier("ease")
                }
                if ("string" == n.jTypeOf(this.options.cycles)) {
                    this.options.cycles = "infinite" === this.options.cycles ? Infinity : parseInt(this.options.cycles) || 1
                }
            },
            options: {
                fps: 60,
                duration: 600,
                transition: "ease",
                cycles: 1,
                direction: "normal",
                onStart: n.$F,
                onComplete: n.$F,
                onBeforeRender: n.$F,
                onAfterRender: n.$F,
                forceAnimation: false,
                roundCss: false
            },
            styles: null,
            cubicBezier: null,
            easeFn: null,
            setTransition: function(o) {
                this.options.transition = o;
                o = n.FX.Transition[this.options.transition] || this.options.transition;
                if ("function" === n.jTypeOf(o)) {
                    this.easeFn = o
                } else {
                    this.easeFn = this.cubicBezierAtTime;
                    this.cubicBezier = this.parseCubicBezier(o) || this.parseCubicBezier("ease")
                }
            },
            start: function(q) {
                var o = /\%$/,
                    p;
                this.styles = q;
                this.cycle = 0;
                this.state = 0;
                this.curFrame = 0;
                this.pStyles = {};
                this.alternate = "alternate" === this.options.direction || "alternate-reverse" === this.options.direction;
                this.continuous = "continuous" === this.options.direction || "continuous-reverse" === this.options.direction;
                for (p in this.styles) {
                    o.test(this.styles[p][0]) && (this.pStyles[p] = true);
                    if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                        this.styles[p].reverse()
                    }
                }
                this.startTime = n.now();
                this.finishTime = this.startTime + this.options.duration;
                this.options.onStart.call();
                if (0 === this.options.duration) {
                    this.render(1);
                    this.options.onComplete.call()
                } else {
                    this.loopBind = this.loop.jBind(this);
                    if (!this.options.forceAnimation && n.browser.features.requestAnimationFrame) {
                        this.timer = n.browser.requestAnimationFrame.call(window, this.loopBind)
                    } else {
                        this.timer = this.loopBind.interval(Math.round(1000 / this.options.fps))
                    }
                }
                return this
            },
            stopAnimation: function() {
                if (this.timer) {
                    if (!this.options.forceAnimation && n.browser.features.requestAnimationFrame && n.browser.cancelAnimationFrame) {
                        n.browser.cancelAnimationFrame.call(window, this.timer)
                    } else {
                        clearInterval(this.timer)
                    }
                    this.timer = false
                }
            },
            stop: function(o) {
                o = n.defined(o) ? o : false;
                this.stopAnimation();
                if (o) {
                    this.render(1);
                    this.options.onComplete.jDelay(10)
                }
                return this
            },
            calc: function(q, p, o) {
                q = parseFloat(q);
                p = parseFloat(p);
                return (p - q) * o + q
            },
            loop: function() {
                var p = n.now(),
                    o = (p - this.startTime) / this.options.duration,
                    q = Math.floor(o);
                if (p >= this.finishTime && q >= this.options.cycles) {
                    this.stopAnimation();
                    this.render(1);
                    this.options.onComplete.jDelay(10);
                    return this
                }
                if (this.alternate && this.cycle < q) {
                    for (var r in this.styles) {
                        this.styles[r].reverse()
                    }
                }
                this.cycle = q;
                if (!this.options.forceAnimation && n.browser.features.requestAnimationFrame) {
                    this.timer = n.browser.requestAnimationFrame.call(window, this.loopBind)
                }
                this.render((this.continuous ? q : 0) + this.easeFn(o % 1))
            },
            render: function(o) {
                var p = {},
                    r = o;
                for (var q in this.styles) {
                    if ("opacity" === q) {
                        p[q] = Math.round(this.calc(this.styles[q][0], this.styles[q][1], o) * 100) / 100
                    } else {
                        p[q] = this.calc(this.styles[q][0], this.styles[q][1], o);
                        this.pStyles[q] && (p[q] += "%")
                    }
                }
                this.options.onBeforeRender(p, this.el);
                this.set(p);
                this.options.onAfterRender(p, this.el)
            },
            set: function(o) {
                return this.el.jSetCss(o)
            },
            parseCubicBezier: function(o) {
                var p, q = null;
                if ("string" !== n.jTypeOf(o)) {
                    return null
                }
                switch (o) {
                    case "linear":
                        q = m([0, 0, 1, 1]);
                        break;
                    case "ease":
                        q = m([0.25, 0.1, 0.25, 1]);
                        break;
                    case "ease-in":
                        q = m([0.42, 0, 1, 1]);
                        break;
                    case "ease-out":
                        q = m([0, 0, 0.58, 1]);
                        break;
                    case "ease-in-out":
                        q = m([0.42, 0, 0.58, 1]);
                        break;
                    case "easeInSine":
                        q = m([0.47, 0, 0.745, 0.715]);
                        break;
                    case "easeOutSine":
                        q = m([0.39, 0.575, 0.565, 1]);
                        break;
                    case "easeInOutSine":
                        q = m([0.445, 0.05, 0.55, 0.95]);
                        break;
                    case "easeInQuad":
                        q = m([0.55, 0.085, 0.68, 0.53]);
                        break;
                    case "easeOutQuad":
                        q = m([0.25, 0.46, 0.45, 0.94]);
                        break;
                    case "easeInOutQuad":
                        q = m([0.455, 0.03, 0.515, 0.955]);
                        break;
                    case "easeInCubic":
                        q = m([0.55, 0.055, 0.675, 0.19]);
                        break;
                    case "easeOutCubic":
                        q = m([0.215, 0.61, 0.355, 1]);
                        break;
                    case "easeInOutCubic":
                        q = m([0.645, 0.045, 0.355, 1]);
                        break;
                    case "easeInQuart":
                        q = m([0.895, 0.03, 0.685, 0.22]);
                        break;
                    case "easeOutQuart":
                        q = m([0.165, 0.84, 0.44, 1]);
                        break;
                    case "easeInOutQuart":
                        q = m([0.77, 0, 0.175, 1]);
                        break;
                    case "easeInQuint":
                        q = m([0.755, 0.05, 0.855, 0.06]);
                        break;
                    case "easeOutQuint":
                        q = m([0.23, 1, 0.32, 1]);
                        break;
                    case "easeInOutQuint":
                        q = m([0.86, 0, 0.07, 1]);
                        break;
                    case "easeInExpo":
                        q = m([0.95, 0.05, 0.795, 0.035]);
                        break;
                    case "easeOutExpo":
                        q = m([0.19, 1, 0.22, 1]);
                        break;
                    case "easeInOutExpo":
                        q = m([1, 0, 0, 1]);
                        break;
                    case "easeInCirc":
                        q = m([0.6, 0.04, 0.98, 0.335]);
                        break;
                    case "easeOutCirc":
                        q = m([0.075, 0.82, 0.165, 1]);
                        break;
                    case "easeInOutCirc":
                        q = m([0.785, 0.135, 0.15, 0.86]);
                        break;
                    case "easeInBack":
                        q = m([0.6, -0.28, 0.735, 0.045]);
                        break;
                    case "easeOutBack":
                        q = m([0.175, 0.885, 0.32, 1.275]);
                        break;
                    case "easeInOutBack":
                        q = m([0.68, -0.55, 0.265, 1.55]);
                        break;
                    default:
                        o = o.replace(/\s/g, "");
                        if (o.match(/^cubic-bezier\((?:-?[0-9\.]{0,}[0-9]{1,},){3}(?:-?[0-9\.]{0,}[0-9]{1,})\)$/)) {
                            q = o.replace(/^cubic-bezier\s*\(|\)$/g, "").split(",");
                            for (p = q.length - 1; p >= 0; p--) {
                                q[p] = parseFloat(q[p])
                            }
                        }
                }
                return m(q)
            },
            cubicBezierAtTime: function(B) {
                var o = 0,
                    A = 0,
                    x = 0,
                    C = 0,
                    z = 0,
                    v = 0,
                    w = this.options.duration;

                function u(D) {
                    return ((o * D + A) * D + x) * D
                }

                function s(D) {
                    return ((C * D + z) * D + v) * D
                }

                function q(D) {
                    return (3 * o * D + 2 * A) * D + x
                }

                function y(D) {
                    return 1 / (200 * D)
                }

                function p(D, E) {
                    return s(r(D, E))
                }

                function r(K, L) {
                    var J, I, H, E, D, G;

                    function F(M) {
                        if (M >= 0) {
                            return M
                        } else {
                            return 0 - M
                        }
                    }
                    for (H = K, G = 0; G < 8; G++) {
                        E = u(H) - K;
                        if (F(E) < L) {
                            return H
                        }
                        D = q(H);
                        if (F(D) < 0.000001) {
                            break
                        }
                        H = H - E / D
                    }
                    J = 0;
                    I = 1;
                    H = K;
                    if (H < J) {
                        return J
                    }
                    if (H > I) {
                        return I
                    }
                    while (J < I) {
                        E = u(H);
                        if (F(E - K) < L) {
                            return H
                        }
                        if (K > E) {
                            J = H
                        } else {
                            I = H
                        }
                        H = (I - J) * 0.5 + J
                    }
                    return H
                }
                x = 3 * this.cubicBezier[0];
                A = 3 * (this.cubicBezier[2] - this.cubicBezier[0]) - x;
                o = 1 - x - A;
                v = 3 * this.cubicBezier[1];
                z = 3 * (this.cubicBezier[3] - this.cubicBezier[1]) - v;
                C = 1 - v - z;
                return p(B, y(w))
            }
        });
        n.FX.Transition = {
            linear: "linear",
            sineIn: "easeInSine",
            sineOut: "easeOutSine",
            expoIn: "easeInExpo",
            expoOut: "easeOutExpo",
            quadIn: "easeInQuad",
            quadOut: "easeOutQuad",
            cubicIn: "easeInCubic",
            cubicOut: "easeOutCubic",
            backIn: "easeInBack",
            backOut: "easeOutBack",
            elasticIn: function(q, o) {
                o = o || [];
                return Math.pow(2, 10 * --q) * Math.cos(20 * q * Math.PI * (o[0] || 1) / 3)
            },
            elasticOut: function(q, o) {
                return 1 - n.FX.Transition.elasticIn(1 - q, o)
            },
            bounceIn: function(r) {
                for (var q = 0, o = 1; 1; q += o, o /= 2) {
                    if (r >= (7 - 4 * q) / 11) {
                        return o * o - Math.pow((11 - 6 * q - 11 * r) / 4, 2)
                    }
                }
            },
            bounceOut: function(o) {
                return 1 - n.FX.Transition.bounceIn(1 - o)
            },
            none: function(o) {
                return 0
            }
        }
    })(k);
    (function(n) {
        if (!n) {
            throw "MagicJS not found"
        }
        if (n.PFX) {
            return
        }
        var m = n.$;
        n.PFX = new n.Class(n.FX, {
            init: function(o, p) {
                this.el_arr = o;
                this.options = n.extend(this.options, p);
                this.timer = false;
                this.$parent.init()
            },
            start: function(u) {
                var o = /\%$/,
                    r, q, p = u.length;
                this.styles_arr = u;
                this.pStyles_arr = new Array(p);
                for (q = 0; q < p; q++) {
                    this.pStyles_arr[q] = {};
                    for (r in u[q]) {
                        o.test(u[q][r][0]) && (this.pStyles_arr[q][r] = true);
                        if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                            this.styles_arr[q][r].reverse()
                        }
                    }
                }
                this.$parent.start([]);
                return this
            },
            render: function(o) {
                for (var p = 0; p < this.el_arr.length; p++) {
                    this.el = n.$(this.el_arr[p]);
                    this.styles = this.styles_arr[p];
                    this.pStyles = this.pStyles_arr[p];
                    this.$parent.render(o)
                }
            }
        })
    })(k);
    (function(n) {
        if (!n) {
            throw "MagicJS not found";
            return
        }
        if (n.Tooltip) {
            return
        }
        var m = n.$;
        n.Tooltip = function(p, q) {
            var o = this.tooltip = n.$new("div", null, {
                position: "absolute",
                "z-index": 999
            }).jAddClass("MagicToolboxTooltip");
            n.$(p).jAddEvent("mouseover", function() {
                o.jAppendTo(document.body)
            });
            n.$(p).jAddEvent("mouseout", function() {
                o.jRemove()
            });
            n.$(p).jAddEvent("mousemove", function(x) {
                var z = 20,
                    w = n.$(x).jGetPageXY(),
                    v = o.jGetSize(),
                    u = n.$(window).jGetSize(),
                    y = n.$(window).jGetScroll();

                function r(C, A, B) {
                    return (B < (C - A) / 2) ? B : ((B > (C + A) / 2) ? (B - A) : (C - A) / 2)
                }
                o.jSetCss({
                    left: y.x + r(u.width, v.width + 2 * z, w.x - y.x) + z,
                    top: y.y + r(u.height, v.height + 2 * z, w.y - y.y) + z
                })
            });
            this.text(q)
        };
        n.Tooltip.prototype.text = function(o) {
            this.tooltip.firstChild && this.tooltip.removeChild(this.tooltip.firstChild);
            this.tooltip.append(document.createTextNode(o))
        }
    })(k);
    (function(n) {
        if (!n) {
            throw "MagicJS not found";
            return
        }
        if (n.MessageBox) {
            return
        }
        var m = n.$;
        n.Message = function(r, q, p, o) {
            this.hideTimer = null;
            this.messageBox = n.$new("span", null, {
                position: "absolute",
                "z-index": 999,
                visibility: "hidden",
                opacity: 0.8
            }).jAddClass(o || "").jAppendTo(p || document.body);
            this.setMessage(r);
            this.show(q)
        };
        n.Message.prototype.show = function(o) {
            this.messageBox.show();
            this.hideTimer = this.hide.jBind(this).jDelay(n.ifndef(o, 5000))
        };
        n.Message.prototype.hide = function(o) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
            if (this.messageBox && !this.hideFX) {
                this.hideFX = new k.FX(this.messageBox, {
                    duration: n.ifndef(o, 500),
                    onComplete: function() {
                        this.messageBox.kill();
                        delete this.messageBox;
                        this.hideFX = null
                    }.jBind(this)
                }).start({
                    opacity: [this.messageBox.jGetCss("opacity"), 0]
                })
            }
        };
        n.Message.prototype.setMessage = function(o) {
            this.messageBox.firstChild && this.tooltip.removeChild(this.messageBox.firstChild);
            this.messageBox.append(document.createTextNode(o))
        }
    })(k);
    (function(n) {
        if (!n) {
            throw "MagicJS not found"
        }
        if (n.Options) {
            return
        }
        var q = n.$,
            m = null,
            v = {
                "boolean": 1,
                array: 2,
                number: 3,
                "function": 4,
                string: 100
            },
            o = {
                "boolean": function(y, x, w) {
                    if ("boolean" != n.jTypeOf(x)) {
                        if (w || "string" != n.jTypeOf(x)) {
                            return false
                        } else {
                            if (!/^(true|false)$/.test(x)) {
                                return false
                            } else {
                                x = x.jToBool()
                            }
                        }
                    }
                    if (y.hasOwnProperty("enum") && !q(y["enum"]).contains(x)) {
                        return false
                    }
                    m = x;
                    return true
                },
                string: function(y, x, w) {
                    if ("string" !== n.jTypeOf(x)) {
                        return false
                    } else {
                        if (y.hasOwnProperty("enum") && !q(y["enum"]).contains(x)) {
                            return false
                        } else {
                            m = "" + x;
                            return true
                        }
                    }
                },
                number: function(z, y, x) {
                    var w = false,
                        B = /%$/,
                        A = (n.jTypeOf(y) == "string" && B.test(y));
                    if (x && !"number" == typeof y) {
                        return false
                    }
                    y = parseFloat(y);
                    if (isNaN(y)) {
                        return false
                    }
                    if (isNaN(z.minimum)) {
                        z.minimum = Number.NEGATIVE_INFINITY
                    }
                    if (isNaN(z.maximum)) {
                        z.maximum = Number.POSITIVE_INFINITY
                    }
                    if (z.hasOwnProperty("enum") && !q(z["enum"]).contains(y)) {
                        return false
                    }
                    if (z.minimum > y || y > z.maximum) {
                        return false
                    }
                    m = A ? (y + "%") : y;
                    return true
                },
                array: function(z, x, w) {
                    if ("string" === n.jTypeOf(x)) {
                        try {
                            x = window.JSON.parse(x)
                        } catch (y) {
                            return false
                        }
                    }
                    if (n.jTypeOf(x) === "array") {
                        m = x;
                        return true
                    } else {
                        return false
                    }
                },
                "function": function(y, x, w) {
                    if (n.jTypeOf(x) === "function") {
                        m = x;
                        return true
                    } else {
                        return false
                    }
                }
            },
            p = function(B, A, x) {
                var z;
                z = B.hasOwnProperty("oneOf") ? B.oneOf : [B];
                if ("array" != n.jTypeOf(z)) {
                    return false
                }
                for (var y = 0, w = z.length - 1; y <= w; y++) {
                    if (o[z[y].type](z[y], A, x)) {
                        return true
                    }
                }
                return false
            },
            s = function(B) {
                var z, y, A, w, x;
                if (B.hasOwnProperty("oneOf")) {
                    w = B.oneOf.length;
                    for (z = 0; z < w; z++) {
                        for (y = z + 1; y < w; y++) {
                            if (v[B.oneOf[z]["type"]] > v[B.oneOf[y].type]) {
                                x = B.oneOf[z];
                                B.oneOf[z] = B.oneOf[y];
                                B.oneOf[y] = x
                            }
                        }
                    }
                }
                return B
            },
            u = function(z) {
                var y;
                y = z.hasOwnProperty("oneOf") ? z.oneOf : [z];
                if ("array" != n.jTypeOf(y)) {
                    return false
                }
                for (var x = y.length - 1; x >= 0; x--) {
                    if (!y[x].type || !v.hasOwnProperty(y[x].type)) {
                        return false
                    }
                    if (n.defined(y[x]["enum"])) {
                        if ("array" !== n.jTypeOf(y[x]["enum"])) {
                            return false
                        }
                        for (var w = y[x]["enum"].length - 1; w >= 0; w--) {
                            if (!o[y[x].type]({
                                    type: y[x].type
                                }, y[x]["enum"][w], true)) {
                                return false
                            }
                        }
                    }
                }
                if (z.hasOwnProperty("default") && !p(z, z["default"], true)) {
                    return false
                }
                return true
            },
            r = function(w) {
                this.schema = {};
                this.options = {};
                this.parseSchema(w)
            };
        n.extend(r.prototype, {
            parseSchema: function(y) {
                var x, w, z;
                for (x in y) {
                    if (!y.hasOwnProperty(x)) {
                        continue
                    }
                    w = (x + "").jTrim().jCamelize();
                    if (!this.schema.hasOwnProperty(w)) {
                        this.schema[w] = s(y[x]);
                        if (!u(this.schema[w])) {
                            throw "Incorrect definition of the '" + x + "' parameter in " + y
                        }
                        this.options[w] = undefined
                    }
                }
            },
            set: function(x, w) {
                x = (x + "").jTrim().jCamelize();
                if (n.jTypeOf(w) == "string") {
                    w = w.jTrim()
                }
                if (this.schema.hasOwnProperty(x)) {
                    m = w;
                    if (p(this.schema[x], w)) {
                        this.options[x] = m
                    }
                    m = null
                }
            },
            get: function(w) {
                w = (w + "").jTrim().jCamelize();
                if (this.schema.hasOwnProperty(w)) {
                    return n.defined(this.options[w]) ? this.options[w] : this.schema[w]["default"]
                }
            },
            fromJSON: function(x) {
                for (var w in x) {
                    this.set(w, x[w])
                }
            },
            getJSON: function() {
                var x = n.extend({}, this.options);
                for (var w in x) {
                    if (undefined === x[w] && undefined !== this.schema[w]["default"]) {
                        x[w] = this.schema[w]["default"]
                    }
                }
                return x
            },
            fromString: function(w) {
                q(w.split(";")).jEach(q(function(x) {
                    x = x.split(":");
                    this.set(x.shift().jTrim(), x.join(":"))
                }).jBind(this))
            },
            exists: function(w) {
                w = (w + "").jTrim().jCamelize();
                return this.schema.hasOwnProperty(w)
            },
            isset: function(w) {
                w = (w + "").jTrim().jCamelize();
                return this.exists(w) && n.defined(this.options[w])
            },
            jRemove: function(w) {
                w = (w + "").jTrim().jCamelize();
                if (this.exists(w)) {
                    delete this.options[w];
                    delete this.schema[w]
                }
            }
        });
        n.Options = r
    }(k));
    (function(n) {
        if (!n) {
            throw "MagicJS not found";
            return
        }
        var m = n.$;
        n.$AA = function(o) {
            var q = [],
                p;
            for (p in o) {
                if (!o.hasOwnProperty(p) || (p + "").substring(0, 2) == "$J") {
                    continue
                }
                q.push(o[p])
            }
            return n.$A(q)
        };
        n.nativeEvents = {
            click: 2,
            dblclick: 2,
            mouseup: 2,
            mousedown: 2,
            contextmenu: 2,
            mousewheel: 2,
            DOMMouseScroll: 2,
            mouseover: 2,
            mouseout: 2,
            mousemove: 2,
            selectstart: 2,
            selectend: 2,
            keydown: 2,
            keypress: 2,
            keyup: 2,
            focus: 2,
            blur: 2,
            change: 2,
            reset: 2,
            select: 2,
            submit: 2,
            load: 1,
            unload: 1,
            beforeunload: 2,
            resize: 1,
            move: 1,
            DOMContentLoaded: 1,
            readystatechange: 1,
            error: 1,
            abort: 1
        };
        n.customEventsAllowed = {
            document: true,
            element: true,
            "class": true,
            object: true
        };
        n.customEvents = {
            bindEvent: function(s, r, p) {
                if (n.jTypeOf(s) == "array") {
                    m(s).jEach(this.bindEvent.jBindAsEvent(this, r, p));
                    return this
                }
                if (!s || !r || n.jTypeOf(s) != "string" || n.jTypeOf(r) != "function") {
                    return this
                }
                if (s == "domready" && n.browser.ready) {
                    r.call(this);
                    return this
                }
                p = parseInt(p || 10);
                if (!r.$J_EUID) {
                    r.$J_EUID = Math.floor(Math.random() * n.now())
                }
                var q = this.jFetch("_events", {});
                q[s] || (q[s] = {});
                q[s][p] || (q[s][p] = {});
                q[s]["orders"] || (q[s]["orders"] = {});
                if (q[s][p][r.$J_EUID]) {
                    return this
                }
                if (q[s]["orders"][r.$J_EUID]) {
                    this.unbindEvent(s, r)
                }
                var o = this,
                    u = function(v) {
                        return r.call(o, m(v))
                    };
                if (n.nativeEvents[s] && !q[s]["function"]) {
                    if (n.nativeEvents[s] == 2) {
                        u = function(v) {
                            v = n.extend(v || window.e, {
                                $J_TYPE: "event"
                            });
                            return r.call(o, m(v))
                        }
                    }
                    q[s]["function"] = function(v) {
                        o.jCallEvent(s, v)
                    };
                    this[n._event_add_](n._event_prefix_ + s, q[s]["function"], false)
                }
                q[s][p][r.$J_EUID] = u;
                q[s]["orders"][r.$J_EUID] = p;
                return this
            },
            jCallEvent: function(p, r) {
                try {
                    r = n.extend(r || {}, {
                        type: p
                    })
                } catch (q) {}
                if (!p || n.jTypeOf(p) != "string") {
                    return this
                }
                var o = this.jFetch("_events", {});
                o[p] || (o[p] = {});
                o[p]["orders"] || (o[p]["orders"] = {});
                n.$AA(o[p]).jEach(function(s) {
                    if (s != o[p]["orders"] && s != o[p]["function"]) {
                        n.$AA(s).jEach(function(u) {
                            u(this)
                        }, this)
                    }
                }, r);
                return this
            },
            unbindEvent: function(r, q) {
                if (!r || !q || n.jTypeOf(r) != "string" || n.jTypeOf(q) != "function") {
                    return this
                }
                if (!q.$J_EUID) {
                    q.$J_EUID = Math.floor(Math.random() * n.now())
                }
                var p = this.jFetch("_events", {});
                p[r] || (p[r] = {});
                p[r]["orders"] || (p[r]["orders"] = {});
                order = p[r]["orders"][q.$J_EUID];
                p[r][order] || (p[r][order] = {});
                if (order >= 0 && p[r][order][q.$J_EUID]) {
                    delete p[r][order][q.$J_EUID];
                    delete p[r]["orders"][q.$J_EUID];
                    if (n.$AA(p[r][order]).length == 0) {
                        delete p[r][order];
                        if (n.nativeEvents[r] && n.$AA(p[r]).length == 0) {
                            var o = this;
                            this[n._event_del_](n._event_prefix_ + r, p[r]["function"], false)
                        }
                    }
                }
                return this
            },
            destroyEvent: function(q) {
                if (!q || n.jTypeOf(q) != "string") {
                    return this
                }
                var p = this.jFetch("_events", {});
                if (n.nativeEvents[q]) {
                    var o = this;
                    this[n._event_del_](n._event_prefix_ + q, p[q]["function"], false)
                }
                p[q] = {};
                return this
            },
            cloneEvents: function(q, p) {
                var o = this.jFetch("_events", {});
                for (t in o) {
                    if (p && t != p) {
                        continue
                    }
                    for (order in o[t]) {
                        if (order == "orders" || order == "function") {
                            continue
                        }
                        for (f in o[t][order]) {
                            m(q).bindEvent(t, o[t][order][f], order)
                        }
                    }
                }
                return this
            },
            jCopyEvents: function(r, q) {
                if (1 !== r.nodeType) {
                    return this
                }
                var p = this.jFetch("events");
                if (!p) {
                    return this
                }
                for (var o in p) {
                    if (q && o != q) {
                        continue
                    }
                    for (var s in p[o]) {
                        m(r).bindEvent(o, p[o][s])
                    }
                }
                return this
            },
            jFetch: n.Element.jFetch,
            jStore: n.Element.jStore
        }
    })(k);
    (function(n) {
        if (!n) {
            throw "MagicJS not found";
            return
        }
        var m = n.$;
        Math.rand = function(p, o) {
            return Math.floor(Math.random() * (o - p + 1)) + p
        };
        Math.range = function(p, o, q) {
            return Math.min(o, Math.max(p, q))
        };
        n.extend = function(z, y) {
            if (!(z instanceof window.Array)) {
                z = [z]
            }
            if (!(y instanceof window.Array)) {
                y = [y]
            }
            for (var v = 0, r = z.length; v < r; v++) {
                if (!n.defined(z[v])) {
                    continue
                }
                for (var u = 0, w = y.length; u < w; u++) {
                    if (!n.defined(y[u])) {
                        continue
                    }
                    for (var s in (y[u] || {})) {
                        try {
                            z[v][s] = y[u][s]
                        } catch (q) {}
                    }
                }
            }
            return z[0]
        };
        n.inherit = function(r, q) {
            function o() {}
            o.prototype = q.prototype;
            r.$parent = q.prototype;
            r.prototype = new o();
            r.prototype.constructor = r
        };
        n.extend(n.Array, {
            rand: function() {
                return this[Math.rand(0, this.length - 1)]
            }
        });
        n.extend(n.Element, {
            indoc: function() {
                var o = this;
                while (o.parentNode) {
                    if (o.tagName == "BODY" || o.tagName == "HTML") {
                        return true
                    }
                    o = o.parentNode
                }
                return false
            },
            clone: function(s, r) {
                s == undefined && (s = true);
                r == undefined && (r = true);
                var u = m(this.cloneNode(s));
                if (u.$J_UUID == this.$J_UUID) {
                    u.$J_UUID = false;
                    n.$uuid(u)
                }
                var p = n.$A(u.getElementsByTagName("*"));
                p.push(u);
                var q = n.$A(this.getElementsByTagName("*"));
                q.push(this);
                p.jEach(function(v, o) {
                    v.id = "";
                    if (!n.browser.trident || n.doc.documentMode && n.doc.documentMode >= 9) {
                        m(q[o]).cloneEvents && m(q[o]).cloneEvents(v);
                        m(q[o]).jCopyEvents && m(q[o]).jCopyEvents(v)
                    }
                    if (r) {
                        m(v).jStore("master", q[o]);
                        m(v).jStore("isclone", true);
                        var w = m(q[o]).jFetch("clones", []);
                        w.push(v)
                    }
                });
                return u
            },
            jSetOpacity_: n.Element.jSetOpacity,
            jSetOpacity: function(p, o) {
                if (this.jFetch("isclone")) {
                    if (m(this.jFetch("master")).indoc()) {
                        return this
                    }
                }
                this.jSetOpacity_(p, o);
                m(this.jFetch("clones", [])).jEach(function(q) {
                    q.jSetOpacity_(p, o)
                });
                return this
            },
            addEvent_: n.Element.jAddEvent,
            jAddEvent: function(p, o) {
                if (this.jFetch("isclone")) {
                    if (m(this.jFetch("master")).indoc()) {
                        return this
                    }
                }
                this.addEvent_(p, o);
                m(this.jFetch("clones", [])).jEach(function(q) {
                    q.addEvent_(p, o)
                });
                return this
            }
        })
    })(k);
    c.Modules || (c.Modules = {});
    c.Modules.ArrowsPair = (function() {
        var m = ["next", "prev"];

        function p(q) {
            return c.$new("button").jAddClass(this.$o("class")).jAddClass(this.$o("class") + "-arrow").jAddClass(this.$o("class") + "-arrow-" + q).append(c.$new("span")).jAppendTo(this.$o("container"))
        }

        function n(q, r) {
            r.stopDistribution();
            this.jCallEvent(q)
        }
        var o = function(q) {
            c.$uuid(this);
            this.options = new c.Options({
                container: null,
                "class": "",
                "class-hidden": "",
                "class-disabled": "",
                position: "inside",
                orientation: "horizontal",
                form: "button"
            });
            this.options.fromJSON(q);
            this.$o = this.options.get.jBind(this.options);
            this.prev = p.call(this, "prev");
            this.next = p.call(this, "next");
            this.next.jAddEvent("click", function(r) {
                r.stop()
            }).jAddEvent("btnclick tap", n.jBind(this, "forward"));
            this.prev.jAddEvent("click", function(r) {
                r.stop()
            }).jAddEvent("btnclick tap", n.jBind(this, "backward"));
            c.$uuid(this)
        };
        o.prototype = {
            disable: function(q) {
                h(q && [q] || m).jEach(function(r) {
                    this[r].jAddClass(this.$o("class-disabled"))
                }, this)
            },
            enable: function(q) {
                h(q && [q] || m).jEach(function(r) {
                    this[r].jRemoveClass(this.$o("class-disabled"))
                }, this)
            },
            hide: function(q) {
                h(q && [q] || m).jEach(function(r) {
                    this[r].jAddClass(this.$o("class-hidden"))
                }, this)
            },
            show: function(q) {
                h(q && [q] || m).jEach(function(r) {
                    this[r].jRemoveClass(this.$o("class-hidden"))
                }, this)
            }
        };
        c.extend(o.prototype, c.customEvents);
        return o
    })();
    c.Effects = {};
    c.Effects.Blank = (function() {
        var m = function(o, n) {
            this.els = [h(o[0]) ? o[0].node : null, h(o[1]) ? o[1].node : null];
            this.container = $mjs((this.els[1] || this.els[0]).parentNode);
            this.options = new c.Options(this.defaults);
            this.options.fromJSON(n);
            this.o = this.options.get.jBind(this.options);
            this.set = this.options.set.jBind(this.options);
            this.name = "blank";
            this.flag = false;
            this.stylesBefore = {};
            this.stylesAfter = {};
            this.stylesReset = {}
        };
        m.prototype = {
            defaults: {
                duration: 500,
                direction: "right",
                "cubic-bezier": "cubic-bezier(0.7, 0, 1, 1)",
                startPoint: 0
            },
            something_: function() {
                h(this.container).offsetHeight;
                this.els[0] && this.els[0].offsetHeight;
                this.els[1] && this.els[1].offsetHeight
            },
            onBeforeRender_: c.$F,
            onAfterRender_: c.$F,
            onComplete_: c.$F,
            onStart_: c.$F,
            transition_: c.FX.Transition.linear,
            prepare_: function() {
                if (this.name == "blank") {
                    return
                }
                if (c.browser.ieMode && c.browser.ieMode < 10 && this.name != "blank") {
                    var n = [];
                    this.els[0] && n.push(this.els[0]);
                    this.els[1] && n.push(this.els[1]);
                    this.ieEff = new c.PFX(n, {
                        duration: this.o("duration"),
                        onComplete: this.onComplete_.jBind(this),
                        onBeforeRender: this.onBeforeRender_.jBind(this),
                        onStart: this.onStart_.jBind(this),
                        onAfterRender: this.onAfterRender_.jBind(this),
                        transition: this.transition_
                    })
                } else {
                    this.els[0] && this.els[0].jSetCss(this.stylesBefore.el1).show();
                    this.els[1] && this.els[1].jSetCss(this.stylesBefore.el2).show();
                    this.something_()
                }
            },
            jRemoveClasses_: function(n) {
                for (var n = 0; n < 2; n++) {
                    this.els[n] && this.defTrans_(this.els[n]);
                    ((n == 0) && this.els[n]) && this.els[n].hide();
                    this.els[n] && this.els[n].jSetCss(this.stylesReset)
                }
                if (!this.flag) {
                    setTimeout(h(function() {
                        this.ken && this.ken();
                        this.inSide && this.inSide(this)
                    }).jBind(this), 1)
                }
                this.flag = false
            },
            defTrans_: function(n) {
                n.jSetCss({
                    transition: "none"
                })
            },
            stop: function(n) {
                var o;
                if (this.flag) {
                    this.ieEff && this.ieEff.stop(true);
                    if (!this.ieEff) {
                        for (o = 0; o < 2; o++) {
                            this.els[o] && this.els[o].jRemoveEvent("transitionend");
                            this.jRemoveClasses_(o)
                        }
                    }
                }
            },
            start: function(p) {
                var o = 0,
                    n = {
                        transition: "all " + this.o("duration") + "ms " + this.o("cubic-bezier")
                    },
                    q = function(r, s) {
                        this.els[r].jRemoveEvent(s.type);
                        this.flag = false;
                        this.jRemoveClasses_(r)
                    };
                p.end && (this.inSide = p.end);
                this.kenFlag = !p.kenburns ? false : true;
                p.kenburns && (this.ken = p.kenburns);
                this.prepare_();
                if (this.name != "blank") {
                    this.flag = true;
                    if (p.start) {
                        p.start.jDelay(1)
                    }
                    for (; o < 2; o++) {
                        if (!this.els[o]) {
                            if (1 === o && !!this.els[0]) {
                                this.els[0].jAddEvent("transitionend", q.jBind(this, 0))
                            }
                            continue
                        }
                        if (1 === o) {
                            this.els[o].jAddEvent("transitionend", q.jBind(this, o))
                        }
                        this.els[o].jSetCss(n).jSetCss(this.stylesAfter["el" + (o + 1)])
                    }
                } else {
                    this.els[0] && this.els[0].hide();
                    this.els[1].show();
                    this.ken && this.ken()
                }
            },
            pause: function() {}
        };
        return m
    })();
    c.Effects.Fade = (function() {
        var m = function(o, n) {
            c.Effects.Blank.apply(this, arguments);
            this.name = "fade";
            if (!c.browser.trident || c.browser.trident && c.browser.ieMode > 9) {
                this.stylesBefore = {
                    el1: {
                        "z-index": 30
                    },
                    el2: {
                        "z-index": 50,
                        opacity: 0
                    }
                };
                this.stylesAfter = {
                    el1: {
                        "z-index": 35
                    },
                    el2: {
                        "z-index": 50,
                        opacity: 1
                    }
                };
                this.stylesReset = {
                    "z-index": "",
                    opacity: 1
                }
            }
        };
        c.inherit(m, c.Effects.Blank);
        (c.browser.trident && c.browser.ieMode < 10) && c.extend(m.prototype, {
            onComplete_: function() {
                this.flag = false;
                this.els[0] && this.els[0].hide();
                this.ken && this.ken();
                this.inSide && this.inSide(this);
                this.outSide && this.outSide()
            },
            onStart_: function() {
                this.flag = true;
                this.els[0] && this.els[0].jSetCssProp("z-index", 30);
                this.els[1] && this.els[1].jSetCssProp("z-index", 50).jSetOpacity(0).show()
            },
            stop: function() {
                this.flag && this.ieEff.stop(true)
            },
            start: function(o) {
                var n = [];
                o.start && o.start();
                o.end && (this.inSide = o.end);
                this.kenFlag = !o.kenburns ? false : true;
                o.kenburns && (this.ken = o.kenburns);
                this.prepare_();
                this.els[0] && n.push({
                    opacity: [1, 1]
                });
                this.els[1] && n.push({
                    opacity: [0, 1]
                });
                this.ieEff.start(n)
            }
        });
        return m
    })();
    c.Effects.Dissolve = (function() {
        var m = function(o, n) {
            c.Effects.Blank.apply(this, arguments);
            this.name = "dissolve";
            if (!c.browser.trident || c.browser.trident && c.browser.ieMode > 9) {
                this.stylesBefore = {
                    el1: {
                        "z-index": 30,
                        opacity: 1
                    },
                    el2: {
                        "z-index": 50,
                        opacity: 0
                    }
                };
                this.stylesAfter = {
                    el1: {
                        opacity: 0
                    },
                    el2: {
                        opacity: 1
                    }
                };
                this.stylesReset = {
                    "z-index": "",
                    opacity: 1
                }
            }
        };
        c.inherit(m, c.Effects.Blank);
        (c.browser.trident && c.browser.ieMode < 10) && c.extend(m.prototype, {
            onComplete_: function() {
                this.flag = false;
                this.els[0] && this.els[0].hide();
                this.ken && this.ken();
                this.inSide && this.inSide(this);
                this.outSide && this.outSide()
            },
            onStart_: function() {
                this.flag = true;
                this.els[0] && this.els[0].jSetCssProp("z-index", 30);
                this.els[1] && this.els[1].jSetCssProp("z-index", 50).jSetOpacity(0).show()
            },
            stop: function() {
                this.flag && this.ieEff.stop(true)
            },
            start: function(o) {
                var n = [];
                o.start && o.start();
                o.end && (this.inSide = o.end);
                this.kenFlag = !o.kenburns ? false : true;
                o.kenburns && (this.ken = o.kenburns);
                this.prepare_();
                this.els[0] && n.push({
                    opacity: [1, 0]
                });
                this.els[1] && n.push({
                    opacity: [0, 1]
                });
                this.ieEff.start(n)
            }
        });
        return m
    })();
    c.Effects.Slide = (function() {
        var m = function(s, q) {
            c.Effects.Blank.apply(this, arguments);
            this.name = "slide";
            var p = 0,
                v = 0,
                u = 0,
                o = 0,
                r = 100,
                n = 100;
            if (h(["left", "right"]).contains(this.o("direction"))) {
                n = 0;
                p = this.o("startPoint") || 0;
                if (this.o("direction") == "right") {
                    r *= (-1);
                    u = 100 + p
                } else {
                    u = -100 + p
                }
            } else {
                r = 0;
                v = this.o("startPoint") || 0;
                if (this.o("direction") == "bottom") {
                    n *= (-1);
                    o = 100 + v
                } else {
                    o = -100 + v
                }
            }
            this.stylesBefore = {
                el1: {
                    transform: "translate(" + p + "%, " + v + "%)"
                },
                el2: {
                    transform: "translate(" + u + "%, " + o + "%)"
                }
            };
            this.stylesAfter = {
                el1: {
                    transform: "translate(" + r + "%, " + n + "%)"
                },
                el2: {
                    transform: "translate(0%, 0%)"
                }
            };
            this.stylesReset = {
                transform: ""
            }
        };
        c.inherit(m, c.Effects.Blank);
        if (c.browser.trident && c.browser.ieMode < 10) {
            c.extend(m.prototype, {
                calcDirect_: function() {
                    var p, o, n, q = this.o("direction");
                    n = (this.o("direction") == "left" || this.o("direction") == "right") ? "left" : "top";
                    switch (q) {
                        case "left":
                        case "top":
                            p = ["0%", "100%"];
                            o = ["-100%", "0%"];
                            break;
                        case "right":
                        case "bottom":
                            p = ["0%", "-100%"];
                            o = ["100%", "0%"];
                            break
                    }
                    this.effMove_ = {
                        el0: p,
                        el1: o,
                        style: n
                    }
                },
                onComplete_: function() {
                    var o = "0%",
                        n;
                    this.els[0].hide();
                    this.els[1].show();
                    for (n = 0; n < 2; ++n) {
                        this.els[n].jSetCssProp(this.effMove_.style, o)
                    }
                    this.flag = false;
                    this.ken && this.ken();
                    this.inSide && this.inSide(this);
                    this.outSide && this.outSide()
                },
                onStart_: function() {
                    this.els[0].jSetCssProp("z-index", 50).show();
                    this.els[1].jSetCssProp("z-index", 30).jSetCssProp(this.effMove_.style, this.effMove_.el1[0]).show();
                    this.flag = true
                },
                transition_: c.FX.Transition.expoOut,
                stop: function() {
                    if (this.flag) {
                        this.ieEff.stop(false);
                        this.onComplete_()
                    }
                },
                start: function(r) {
                    r.start && r.start();
                    r.end && (this.inSide = r.end);
                    this.kenFlag = !r.kenburns ? false : true;
                    r.kenburns && (this.ken = r.kenburns);
                    this.calcDirect_();
                    var q = this.effMove_.style,
                        p = this.effMove_.el0,
                        o = this.effMove_.el1,
                        n = [{}, {}];
                    this.prepare_();
                    n[0][q] = p;
                    n[1][q] = o;
                    this.ieEff.start(n)
                }
            })
        }
        return m
    })();
    c.Effects.Kenburns = (function() {
        var m = function(q, o, p, n) {
            this.item = q;
            this.previous = p;
            this.container = q;
            this.itemIndex = o;
            this.options = new c.Options(this._defaults);
            this.options.fromJSON(n);
            this.o = this.options.get.jBind(this.options);
            this.eff = ["c", "tl", "tr", "br", "bl"][Math.rand(0, 4)];
            this.name = "kenburns";
            this._flag = false;
            if (c.browser.trident && c.browser.ieMode < 10) {
                this.effMove = this.calcSizeIe_()
            }
            this.prepareItem()
        };
        m.prototype = {
            _defaults: {
                "cubic-bezier": "cubic-bezier(0.0, 0.0, 1.0, 1.0)",
                duration: 3000,
                jDel: 50
            },
            _render: function() {
                this.item.offsetHeight
            },
            recoverySize: function(o) {
                if (!this.previous && !o) {
                    return
                }
                var n = o ? this : this.previous;
                n._stopTransition();
                n.item.jSetCssProp("transform", "");
                if (c.browser.ieMode && c.browser.ieMode < 10 && n.iePFX) {
                    n.item.jSetCss({
                        top: "0%",
                        left: "0%",
                        "max-width": "",
                        "max-height": ""
                    });
                    if (c.browser.ieMode == 9) {
                        n.item.style["-ms-transform"] = ""
                    } else {
                        if (c.browser.ieMode == 8) {
                            n.item.jSetCss({
                                width: "",
                                height: ""
                            })
                        } else {
                            n.item.jSetCss({
                                width: n.normalSize.width,
                                height: n.normalSize.height
                            })
                        }
                    }
                }
            },
            prepareItem: function() {
                if (c.browser.ieMode && c.browser.ieMode < 10) {
                    if (c.browser.ieMode == 9) {
                        this.item.style["-ms-transform"] = "scale(" + (this.effMove.before.scale / 1000) + ")";
                        this.item.jSetCss({
                            top: this.effMove.before.translateY / 1000 + "%",
                            left: this.effMove.before.translateX / 1000 + "%"
                        })
                    } else {
                        this.item.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + (this.effMove.before.scale / 1000) + ",M12=0,M21=0,M22=" + (this.effMove.before.scale / 1000) + ",SizingMethod='auto expand')";
                        this.item.jSetCss({
                            top: this.effMove.before.translateY / 1000 + "%",
                            left: this.effMove.before.translateX / 1000 + "%",
                            "max-width": "none",
                            "max-height": "none"
                        })
                    }
                    this.iePFX = new c.PFX([this.item], {
                        fps: (c.browser.ieMode == 9) ? 50 : 20,
                        duration: this.o("duration") - 100,
                        transition_: c.FX.Transition.linear,
                        onComplete: h(function() {
                            this.flag = false;
                            this.cb && this.cb(this)
                        }).jBind(this),
                        onBeforeRender: h(function(n, o) {
                            if (c.browser.ieMode == 9) {
                                this.item.style["-ms-transform"] = "scale(" + (n.scale / 1000) + ")";
                                this.item.jSetCss({
                                    top: n.translateY / 1000 + "%",
                                    left: n.translateX / 1000 + "%"
                                })
                            } else {
                                this.item.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + (n.scale / 1000) + ",M12=0,M21=0,M22=" + (n.scale / 1000) + ",SizingMethod='auto expand')";
                                this.item.jSetCss({
                                    top: n.translateY / 1000 + "%",
                                    left: n.translateX / 1000 + "%"
                                })
                            }
                        }).jBind(this),
                        onStart: h(function() {
                            this.flag = true
                        }).jBind(this)
                    })
                } else {
                    this.effMove = this.calcScaleAndPosition();
                    this.item.jSetCssProp("transition", "").jSetCss({
                        transform: "scale(" + this.effMove.before.scale + ")",
                        "transform-origin": this.effMove.before.origin
                    });
                    this._render()
                }
            },
            calcScaleAndPosition: function() {
                var n = "",
                    o = Math.rand(0, 1);
                switch (this.eff) {
                    case "c":
                        n = "50%";
                        break;
                    case "tl":
                        n = "top left";
                        break;
                    case "tr":
                        n = "top right";
                        break;
                    case "br":
                        n = "bottom right";
                        break;
                    case "bl":
                        n = "bottom left";
                        break
                }
                return {
                    before: {
                        scale: o ? 1 : 1.1,
                        origin: n
                    },
                    after: {
                        scale: o ? 1.1 : 1,
                        origin: n
                    }
                }
            },
            calcSizeIe_: function() {
                this.item.parentNode.show();
                this.normalSize = this.item.jGetSize();
                var C = this.normalSize,
                    r = this.container.parentNode.jGetSize(),
                    s = Math.rand(0, 1),
                    B = C.width / 100 * 10,
                    w = C.height / 100 * 10,
                    o, z, q, A, x, u, y, v, n = 2;
                if (c.browser.ieMode == 9) {
                    o = z = q = A = 1100;
                    x = u = y = v = 1
                } else {
                    x = u = y = v = 0;
                    o = q = C.width + B;
                    z = A = C.height + w;
                    (c.browser.ieMode == 7) && (n = 1)
                }
                switch (this.eff) {
                    case "tl":
                        if (c.browser.ieMode == 9) {
                            if (s) {
                                v = 4001;
                                y = 4001
                            } else {
                                u = 4001;
                                x = 4001
                            }
                        } else {
                            if (s) {
                                u = -2001;
                                x = -2001
                            } else {
                                v = -2001;
                                y = -2001
                            }
                        }
                        break;
                    case "tr":
                        if (c.browser.ieMode == 9) {
                            if (s) {
                                v = 4001;
                                y = -4001
                            } else {
                                u = 4001;
                                x = -4001
                            }
                        } else {
                            if (s) {
                                u = -2001;
                                y = -8001
                            } else {
                                v = -2001;
                                x = -8001
                            }
                        }
                        break;
                    case "br":
                        if (c.browser.ieMode == 9) {
                            if (s) {
                                v = -4001;
                                y = -4001
                            } else {
                                u = -4001;
                                x = -4001
                            }
                        } else {
                            if (s) {
                                v = -8001;
                                y = -8001
                            } else {
                                u = -8001;
                                x = -8001
                            }
                        }
                        break;
                    case "bl":
                        if (c.browser.ieMode == 9) {
                            if (s) {
                                v = -4001;
                                y = 4001
                            } else {
                                u = -4001;
                                x = 4001
                            }
                        } else {
                            if (s) {
                                v = -8001;
                                x = -2001
                            } else {
                                u = -8001;
                                y = -2001
                            }
                        }
                        break;
                    case "c":
                        if (c.browser.ieMode !== 9) {
                            if (s) {
                                v = -4001;
                                y = -4001
                            } else {
                                u = -4001;
                                x = -4001
                            }
                        }
                        break
                }
                return {
                    before: {
                        scale: s ? 1020 : 1100,
                        scaleX: o,
                        scaleY: z,
                        translateX: x,
                        translateY: u
                    },
                    after: {
                        scale: s ? 1100 : 1020,
                        scaleX: q,
                        scaleY: A,
                        translateX: y,
                        translateY: v
                    }
                }
            },
            _stopTransition: function() {
                var n = {
                    transition: "none"
                };
                n[c.browser.cssPrefix + "transition"] = "none";
                h(this.item).jSetCss(n)
            },
            stop: function() {
                if (this._flag) {
                    this.iePFX && this.iePFX.stop();
                    this.item && this.item.jRemoveEvent("transitionend");
                    (!this.iePFX && this.cb) && this.cb()
                }
            },
            start: function(q) {
                if (this._start) {
                    return
                }
                this._start = true;
                q.start && q.start();
                q.end && (this.cb = q.end);
                this.recoverySize();
                this._flag = true;
                if (c.browser.ieMode && c.browser.ieMode < 10) {
                    this.timer = setTimeout(h(function() {
                        this.iePFX && this.iePFX.start([{
                            scale: [this.effMove.before.scale, this.effMove.after.scale],
                            translateX: [this.effMove.before.translateX, this.effMove.after.translateX],
                            translateY: [this.effMove.before.translateY, this.effMove.after.translateY]
                        }])
                    }).jBind(this), this.o("jDel"))
                } else {
                    var p = this.o("jDel"),
                        o = this.o("duration") - p - 10,
                        n;
                    this.item.jSetCssProp("transition", "").jSetCss({
                        transform: "translateZ(0) scale(" + this.effMove.before.scale + ")",
                        "transform-origin": this.effMove.before.origin
                    });
                    this._render();
                    this.item.jSetCssProp("transition", a + String.fromCharCode(32) + o + "ms" + String.fromCharCode(32) + this.o("cubic-bezier") + String.fromCharCode(32) + p + "ms").jSetCss({
                        transform: "translateZ(0) scale(" + this.effMove.after.scale + ")",
                        "transform-origin": this.effMove.after.origin
                    });
                    this.callback = h(function(r) {
                        this.cb && this.cb();
                        this.item.jRemoveEvent(r.type);
                        this._flag = false
                    }).jBind(this);
                    this.item.jAddEvent("transitionend", this.callback)
                }
            }
        };
        return m
    })();
    k.Options = (function(p) {
        if (!p) {
            throw "MagicJS not found";
            return
        }
        var n = p.$;
        var m = {
            bool: function(o) {
                return o == "false" ? false : !!o
            },
            string: function(o) {
                return "" + o
            },
            "int": function(o, r) {
                o = parseInt(o);
                return isNaN(o) ? r : o
            },
            "float": function(o, r) {
                o = parseFloat(o);
                return isNaN(o) ? r : o
            },
            size: function(o, s) {
                var r;
                if ("auto" === o) {
                    return o
                }
                if (p.jTypeOf(o) == "string" && (r = o.match(/([-+]?[0-9]*\.?[0-9]+)(px|%)?$/))) {
                    return parseFloat(r[1]) + (!!r[2] ? r[2] : "px")
                }
                return s
            },
            "enum": function(r, o, s) {
                if (p.jTypeOf(o) == "string") {
                    o = o.toLowerCase()
                }
                return $mjs(r).contains(o === false ? "false" : o) ? o : s
            },
            autoint: function(o, r) {
                return o == "auto" ? o : m["int"](o, r)
            }
        };
        var q = function(u) {
            this.types = {};
            this.defaults = {};
            var s, o, r;
            for (s in u) {
                o = u[s];
                if (p.jTypeOf(o) != "string") {
                    this.defaults[s] = o
                } else {
                    o = o.split("(");
                    o[0] = o[0].split(":");
                    if (o[0].length > 1) {
                        r = o[0].pop();
                        if (o.length == 2) {
                            this.types[s] = m[r].jBind(null, o[1].substr(0, o[1].length - 1).split(","));
                            o.pop()
                        } else {
                            this.types[s] = m[r]
                        }
                    }
                    o[0] = o[0].join(":");
                    this.defaults[s] = this.checkType(s, o.join("("))
                }
            }
            this.options = {}
        };
        q.prototype.get = function(o) {
            return o, p.defined(this.options[o]) ? this.options[o] : this.defaults[o]
        };
        q.prototype.set = function(r, o) {
            r = r.jTrim();
            if (!r) {
                return
            }
            this.options[r] = this.checkType(r, o)
        };
        q.prototype.checkType = function(s, r) {
            p.jTypeOf(r) === "string" && (r = r.jTrim());
            var o = this.types[s];
            if (p.defined(this.types[s])) {
                return o(r, this.defaults[s])
            }
            if (r === "true") {
                r = true
            }
            if (r === "false") {
                r = false
            }
            if (parseInt(r) == r) {
                r = parseInt(r)
            }
            return r
        };
        q.prototype.fromRel = function(o) {
            var r = this;
            n(o.split(";")).jEach(function(s) {
                s = s.split(":");
                r.set(s.shift(), s.join(":"))
            })
        };
        q.prototype.fromJSON = function(s) {
            for (var r in s) {
                if (s.hasOwnProperty(r)) {
                    this.set(r, s[r])
                }
            }
        };
        q.prototype.exists = function(o) {
            return p.defined(this.options[o]) ? true : false
        };
        q.prototype.getJSON = function() {
            return p.extend(p.extend({}, this.defaults), this.options)
        };
        return q
    }(k));
    (function(n) {
        if (!n) {
            throw "MagicJS not found";
            return
        }
        var m = n.$;
        k.ImageLoader = new n.Class({
            img: null,
            ready: false,
            options: {
                onload: n.$F,
                onabort: n.$F,
                onerror: n.$F,
                oncomplete: n.$F
            },
            size: null,
            _timer: null,
            _handlers: {
                onload: function(o) {
                    if (o) {
                        m(o).stop()
                    }
                    this._unbind();
                    if (this.ready) {
                        return
                    }
                    this.ready = true;
                    this._cleanup();
                    this.options.onload.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onabort: function(o) {
                    if (o) {
                        m(o).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onabort.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onerror: function(o) {
                    if (o) {
                        m(o).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onerror.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                }
            },
            _bind: function() {
                m(["load", "abort", "error"]).jEach(function(o) {
                    this.img.jAddEvent(o, this._handlers["on" + o].jBindAsEvent(this).jDefer(1))
                }, this)
            },
            _unbind: function() {
                if (this._timer) {
                    try {
                        clearTimeout(this._timer)
                    } catch (o) {}
                    this._timer = null
                }
                m(["load", "abort", "error"]).jEach(function(p) {
                    this.img.jRemoveEvent(p)
                }, this)
            },
            _cleanup: function() {
                this.jGetSize();
                if (this.img.jFetch("new")) {
                    var o = this.img.parentNode;
                    this.img.jRemove().jDel("new").jSetCss({
                        position: "static",
                        top: "auto"
                    });
                    o.kill()
                }
            },
            init: function(p, o) {
                this.options = n.extend(this.options, o);
                this.img = m(p) || n.$new("img", {}, {
                    "max-width": "none",
                    "max-height": "none"
                }).jAppendTo(n.$new("div").jAddClass("magic-temporary-img").jSetCss({
                    position: "absolute",
                    top: -10000,
                    width: 10,
                    height: 10,
                    overflow: "hidden"
                }).jAppendTo(document.body)).jStore("new", true);
                var q = function() {
                    if (this.isReady()) {
                        this._handlers.onload.call(this)
                    } else {
                        this._handlers.onerror.call(this)
                    }
                    q = null
                }.jBind(this);
                this._bind();
                if (!p.src) {
                    this.img.src = p
                } else {
                    if (n.browser.trident900 && n.browser.ieMode < 9) {
                        this.img.onreadystatechange = function() {
                            if (/loaded|complete/.test(this.img.readyState)) {
                                this.img.onreadystatechange = null;
                                q && q()
                            }
                        }.jBind(this)
                    }
                    this.img.src = p.src
                }
                this.img && this.img.complete && q && (this._timer = q.jDelay(100))
            },
            destroy: function() {
                this._unbind();
                this._cleanup();
                this.ready = false;
                return this
            },
            isReady: function() {
                var o = this.img;
                return (o.naturalWidth) ? (o.naturalWidth > 0) : (o.readyState) ? ("complete" == o.readyState) : o.width > 0
            },
            jGetSize: function() {
                return this.size || (this.size = {
                    width: this.img.naturalWidth || this.img.width,
                    height: this.img.naturalHeight || this.img.height
                })
            }
        })
    })(k);
    (function(m) {
        m.QImageLoader = function(x, r) {
            var p = 0,
                u = [],
                w = this,
                v, s, n;

            function z(o) {
                return function(q) {
                    u.push(q.destroy());
                    (r[o] || m.$F).call(w, q, q.origItem);
                    p--;
                    y()
                }
            }

            function y() {
                if (!x.length) {
                    (r.oncomplete || m.$F).call(w, u)
                } else {
                    if (p < (r.queue || 3)) {
                        v = x.shift();
                        s = new m.ImageLoader(v.img, {
                            onload: z("onload"),
                            onerror: z("onerror"),
                            onabort: z("onabort"),
                            oncomplete: z("oncomplete")
                        });
                        s.origItem = v;
                        p++
                    }
                }
            }
            this.push = function(q, o) {
                if (!o) {
                    o = q;
                    q = false
                }
                if (m.jTypeOf(o.img) == "string" || o.img.tagName.toLowerCase() == "img") {
                    x[q ? "unshift" : "push"](o);
                    r.delay || y()
                }
                return this
            };
            this.abort = function() {
                s.destroy()
            };
            this.load = y;
            r.delay || x.length && y()
        }
    })(k);
    var e = {
        width: "auto:size",
        height: "62.5%:size",
        orientation: "horizontal:enum(horizontal,vertical)",
        loop: "true:bool",
        selectors: "none:enum(left,right,top,bottom,none,false)",
        "selectors-style": "bullets:enum(bullets,thumbnails)",
        "selectors-size": "70:string",
        "selectors-eye": "true:bool",
        caption: "true:bool",
        "caption-effect": "fade:enum(fade,dissolve,fixed)",
        arrows: "true:bool",
        effect: "slide:enum(slide,scroll,fade,dissolve)",
        "effect-speed": "600:int",
        "effect-easing": ":string",
        autoplay: "true:bool",
        "slide-duration": "3000:int",
        shuffle: "false:bool",
        kenburns: "false:bool",
        pause: "click:enum(off,hover,click,selector-click,false)",
        "height-depends": "true:bool",
        fullscreen: "false:bool",
        loader: "true:bool",
        preload: "true:bool",
        keyboard: "true:bool",
        links: "_self:enum(false,_self,_blank,_parent,_top)",
        onready: c.$F,
        "start-effect": c.$F,
        "end-effect": c.$F
    };
    var g = function(m, o, n) {
        c.$uuid(this);
        this.options = new c.Options({});
        this.options.fromJSON(m);
        this.o = this.options.get.jBind(this.options);
        this.set = this.options.set.jBind(this.options);
        this.bullets = (this.o("selectors-style") == "bullets") ? true : false;
        this.thumbnailOpt = n;
        this.fullscreen = false;
        this.items = [];
        this.selectorsSize = null;
        this.wrapSelSize = null;
        this.movePointThumbnails = undefined;
        this.last = -1;
        this.id = o;
        this.selectorsIn = [];
        this.responsiveImg = null;
        this.queue = new c.QImageLoader([], {
            delay: true,
            onload: h(function(r, q) {
                var s = (q.type == "item") ? "item-img-load" : "selector-img-load",
                    p = (q.style == "default") ? "smallImg" : "fullScreenImg";
                if (q.type == "item") {
                    this.items[q.index][q.style == "default" ? "defSize" : "fsSize"] = r.jGetSize();
                    this.jCallEvent("addImgToCacheBox", {
                        img: this.items[q.index][p]
                    })
                } else {
                    this.jCallEvent("addImgToCacheBox", {
                        img: q.img
                    })
                }
            }).jBind(this),
            oncomplete: h(function(q, p) {
                if (!p) {
                    return
                }
                this.jCallEvent(p.type + "-img-load", {
                    item: this.items[p.index],
                    itemStyle: p.style
                })
            }).jBind(this),
            onerror: h(function(q, p) {
                if (p.type == "item") {
                    p.img.hide();
                    p.img.parentNode.appendChild(document.createTextNode("Image cannot be loaded"))
                }
            }).jBind(this)
        });
        this.fullscreenQueue = new c.QImageLoader([], {
            onload: h(function(r, q) {
                var p = (q.style == "default") ? "smallImg" : "fullScreenImg";
                this.items[q.index][q.style == "default" ? "defSize" : "fsSize"] = r.jGetSize();
                if (c.jTypeOf(this.items[q.index][p]) == "string") {
                    this.items[q.index][p] = c.$new("img", {
                        src: this.items[q.index][p]
                    })
                }
                this.items[q.index][p].jAddClass("mss-slide-img").setProps({
                    usemap: this.items[q.index].useMap_
                });
                this.jCallEvent("addImgToCacheBox", {
                    img: this.items[q.index][p]
                });
                this.jCallEvent("item-fullscreen-load", {
                    item: this.items[q.index],
                    itemStyle: q.style,
                    createReplace: q.createReplace
                })
            }).jBind(this),
            onerror: (function(q, p) {
                this.items[p.index][p.type] = null
            }).jBind(this),
            oncomplete: h(function(q, p) {
                (p && undefined != p.index) && this.items[p.index].progress.hide()
            }).jBind(this)
        })
    };
    g.prototype = {
        calcThumbWrapSize: function(q) {
            var m, p, o, n;
            if (this.o("selectors-style") == "bullets") {
                return
            }
            m = h(["top", "bottom"]).contains(q);
            p = !m;
            o = 0;
            for (n = 0; n < this.items.length; n++) {
                if (!this.items[n].selector) {
                    continue
                }
                o += this.items[n].selector.jGetSize()[m ? "width" : "height"];
                o += (parseInt(this.items[n].selector.jGetCss("margin-" + (m ? "left" : "top"))) + parseInt(this.items[n].selector.jGetCss("margin-" + (m ? "right" : "bottom"))))
            }
            if (this.getSelectorParent()) {
                this.parentThumb.jSetCssProp(m ? "width" : "height", o);
                this.wrapSelSize && (this.wrapSelSize[m ? "width" : "height"] = o)
            }
        },
        getSelectorParent: function() {
            var m = 0;
            if (!this.parentThumb) {
                do {
                    this.parentThumb = this.items[m].selector && this.items[m].selector.parentNode;
                    m++
                } while (!this.parentThumb && this.items[m])
            }
            return this.parentThumb ? true : false
        },
        FSImageLoad: function(o, p) {
            var n = this.items[o || this.last],
                m = this.fullscreen ? n.fullScreenImg : n.smallImg;
            if (!m || this.fullscreen && (!n.fullScreenImg || n.fsSize || n.whatImg == "fullScreen") || !this.fullscreen && (!n.smallImg || n.defSize || n.whatImg == "default")) {
                return
            }
            n.progress.show();
            if (n.fullScreenImg && n.smallImg) {
                if (this.fullscreen) {
                    n.smallImg.hide()
                } else {
                    n.smallImg.show()
                }
            }
            this.fullscreenQueue.push(true, {
                img: m,
                index: n.index,
                style: n.whatImg == "fullScreen" ? "default" : "fullScreen",
                createReplace: p
            });
            this.fullscreenQueue.load()
        },
        mapExpand: function(s) {
            var v = this.items[s || this.last],
                r = v.defSize,
                u = v.fsSize,
                n, w, p, q, o, m;
            if (!v.img || !r || !u) {
                return
            }
            w = (v.img.getAttribute("usemap") || "").replace("#", "");
            n = /-expanded/.test(w);
            if (this.fullScreen && n || !this.fullScreen && !n) {
                return
            }
            if (this.fullScreen) {
                if (!v.fullScreenImg) {
                    return
                }
                if (w && (p = document.getElementsByName(w)) && p.length) {
                    q = u.width / r.width;
                    o = u.height / r.height;
                    v.map = $mjs(p[0].cloneNode(true));
                    v.map.setAttribute("id", w + "-expanded");
                    v.map.setAttribute("name", w + "-expanded");
                    m = c.$A($mjs(p[0]).byTag("area"));
                    c.$A(v.map.byTag("area")).jEach(function(y, x) {
                        y.setAttribute("shape", m[x].shape);
                        y.setAttribute("coords", c.$A(m[x].coords.split(",")).map(function(z) {
                            return (z % 2) ? z * o : z * q
                        }).join(","));
                        (c.browser.ieMode && c.browser.ieMode < 9) && $mjs(y).jAddEvent("mouseup", function(z) {
                            z.stop()
                        })
                    });
                    v.map.jAppendTo(v.node.parentNode);
                    v.img.setAttribute("useMap", "#" + w + "-expanded")
                }
            } else {
                v.map.jRemove();
                v.img.setAttribute("useMap", (v.img.getAttribute("usemap").replace("-expanded", "")))
            }
        },
        push: function(v, u) {
            var s = {
                    ready: false
                },
                p = v.tagName.toUpperCase(),
                q, r, o = false,
                m = "thumbnail";
            if (p == "FIGURE") {
                q = h(v).byTag("FIGCAPTION")[0];
                if (q) {
                    s.text = q.innerHTML;
                    h(q).jRemove()
                }
                if (h(v).byTag("A")[0]) {
                    p = "A";
                    r = h(v).byTag("A")[0]
                } else {
                    if (h(v).byTag("IMG")) {
                        r = h(v).byTag("IMG")[0]
                    }
                }
                q = null
            } else {
                r = v
            }
            if (p == "A") {
                s.href = r.href;
                q = r.getAttribute("data-image");
                if (q) {
                    s.smallImg = q
                } else {
                    if (o = r.getAttribute("rel")) {}
                }!s.text && (s.text = h(r).byTag("SPAN")[0]);
                s.tag = p.toLowerCase();
                r = h(r).byTag("IMG")[0];
                if (s.smallImg && r && r.src && !this.bullets) {
                    s.selector = (u ? null : c.$new("img", {
                        src: r.src
                    }))
                }
                q = null
            }!r && (r = v);
            s.useMap_ = r.getAttribute("usemap");
            if (!s.smallImg) {
                q = r.getAttribute("data-image");
                !q && (q = r.src);
                s.smallImg = q;
                s.img && (s.smallImg = q);
                q = null
            }
            q = r.getAttribute("data-thumb-image");
            if (q && !this.bullets && !s.selector) {
                s.selector = (u ? null : c.$new("img", {
                    src: q
                }))
            }
            q = null;
            q = r.getAttribute("data-fullscreen-image");
            q && (s.fullScreenImg = q);
            !s.title && (s.title = r.title);
            !s.text && (s.text = r.getAttribute("data-caption"));
            if (!s.tag) {
                if (s.smallImg) {
                    s.tag = "img"
                } else {
                    s.tag = p.toLowerCase();
                    s.noImg = h(v.cloneNode(true));
                    if (s.tag == "div") {
                        c.$A(s.noImg.childNodes).jEach(h(function(n) {
                            if (c.jTypeOf(n) == "element") {
                                if (null !== n.getAttribute("data-mss-caption")) {
                                    !s.text && (s.text = n.innerHTML);
                                    h(n).jRemove()
                                }
                            }
                        }).jBind(this))
                    }
                }
            }
            if (!s.selector) {
                if (h(v).tagName.toLowerCase() == "div" && !this.bullets) {
                    c.$A(v.childNodes).jEach(h(function(n) {
                        if (c.jTypeOf(n) == "element") {
                            if (null !== n.getAttribute("data-mss-thumbnail")) {
                                !s.selector && (s.selector = u ? null : n);
                                h(n).jRemove()
                            }
                        }
                    }).jBind(this))
                }
                if (!s.selector && !this.bullets) {
                    if (s.smallImg) {
                        s.selector = u ? null : c.$new("img", {
                            src: s.smallImg
                        })
                    } else {
                        if (s.noImg) {
                            c.$A(s.noImg.childNodes).jEach(h(function(n) {
                                if (c.jTypeOf(n) == "element") {
                                    if (!s.selector && n.tagName.toLowerCase() == "img") {
                                        s.selector = u ? null : c.$new("img", {
                                            src: n.src
                                        })
                                    }
                                }
                            }).jBind(this))
                        }
                    }
                }
                if (!s.selector) {
                    s.selector = u ? null : c.$new("div").jAddClass("mss-selector").jAddClass("mss-selector-empty")
                }
            }
            s.whatImg = "default";
            if (this.bullets) {
                m = "bullet"
            }
            s.index = this.items.push(s) - 1;
            if (!u && s.selector) {
                s.selector.jStore("slideshow:item", s).jAddClass("mss-selector").jAddClass("mss-selector-" + m);
                this.bullets && s.selector.jAddClass("mss-selector-" + (s.index + 1))
            }!s.noImg && h(v).hide();
            return s
        },
        addSelectors: function() {
            if (this.added || !this.o("selectors")) {
                return
            }
            this.added = true;
            for (var m = 0; m < this.items.length; m++) {
                if (this.items[m].selector && this.items[m].selector.tagName.toLowerCase() == "img") {
                    this.queue.push({
                        img: this.items[m].selector,
                        index: this.items[m].index,
                        type: "selector"
                    });
                    this.queue.load()
                }
                this.jCallEvent("add-selector", {
                    item: this.items[m]
                })
            }
        },
        prepareItem: function(n) {
            var m;
            if (!this.items[n].ready) {
                if (this.items[n].smallImg) {
                    if (this.o("loader")) {
                        this.items[n].progress = c.$new("div");
                        this.items[n].progress.jAddClass("mss-loader").jAppendTo(this.items[n].node).show()
                    }
                    if (this.fullscreen && this.items[n].fullScreenImg) {
                        this.items[n].whatImg = "fullScreen";
                        m = c.$new("img", {
                            src: this.items[n].fullScreenImg
                        });
                        this.items[n].fullScreenImg = m
                    } else {
                        this.items[n].whatImg = "default";
                        m = c.$new("img", {
                            src: this.items[n].smallImg
                        });
                        this.items[n].smallImg = m
                    }
                    m.jAddClass("mss-slide-img").setProps({
                        usemap: this.items[n].useMap_
                    });
                    this.queue.push({
                        img: m,
                        index: this.items[n].index,
                        type: "item",
                        style: this.items[n].whatImg
                    });
                    this.queue.load();
                    if (c.browser.ieMode && c.browser.ieMode < 8) {
                        this.items[n].node.appendChild(c.$new("span", null, {
                            display: "inline-block",
                            "vertical-align": "middle",
                            width: 0,
                            height: "100%"
                        }))
                    }
                    this.items[n].node.appendChild(this.items[n][(this.items[n].whatImg == "default") ? "smallImg" : "fullScreenImg"])
                } else {
                    this.items[n].node.jAddClass("mss-content-slide");
                    this.items[n].node.appendChild(this.items[n].noImg)
                }
                this.items[n].ready = true;
                this.jCallEvent("add-item", {
                    item: this.items[n]
                });
                this.addSelectors()
            }
        },
        activate: function(m) {
            m %= this.items.length;
            m < 0 && (m = m + this.items.length);
            if (m != this.last) {
                this.prevItem = this.items[this.last] ? this.items[this.last] : null;
                this.last = m;
                this.prepareItem(m);
                this.jCallEvent("activate", {
                    item: this.items[m],
                    prevItem: this.prevItem
                })
            }
            return this
        },
        preload: function(n, m) {
            c.$A(this.items).jEach(h(function(o) {
                o.node = c.$new("div").hide().jAddClass("mss-slide-" + o.index);
                this.jCallEvent("create", {
                    item: this.items[o.index]
                });
                n && this.prepareItem(o.index)
            }).jBind(this));
            this.activate(m)
        }
    };
    c.extend(g.prototype, c.customEvents);
    var l = function(m) {
        this.options = new c.Options({
            duration: 1000,
            direction: "right"
        });
        this.options.fromJSON(m);
        this.o = this.options.get.jBind(this.options);
        this.set = this.options.set.jBind(this.options);
        if (this.o("orientation") == "vertical") {
            this.set("direction", "bottom")
        }
        this.kenburns = null;
        this.last = null;
        this.item = null;
        c.$uuid(this)
    };
    l.prototype = {
        jump: function(p) {
            var n, m;
            if ((!this.item || this.item && !this.item.node) && (!p.item || p.item && !p.item.node)) {
                return
            }
            this.stop();
            if (this.o("random") == "no") {
                (p.effect = false)
            }
            if ("auto" == p.effect) {
                p.effect = "slide"
            }
            this.o("kenburns") && !this.item && (p.kenburns = true);
            this.prepareKenburns(p);
            n = c.Effects[("-" + (this.item ? (!p.effect ? this.o("effect") : p.effect) : "blank")).jCamelize()];
            m = {
                last: this.item ? this.item.index : null,
                next: p.item.index
            };
            this.stopMove = true;
            this.last = new n([this.item ? this.item : null, p.item], p.options);
            this.item = p.item;
            this.last.start({
                kenburns: (this.kenburns ? this.kenburns.start.jBind(this.kenburns, {
                    start: this._startEffectKenburns.jBind(this),
                    end: this._endEffectKenburns.jBind(this)
                }) : false),
                start: !this.o("nokenburns") ? this._startEffect.jBind(this, m) : null,
                end: !this.o("nokenburns") ? this._endEffect.jBind(this, m) : null
            });
            this.activeItem = null;
            return this
        },
        prepareKenburns: function(n) {
            if (this.o("nokenburns") || this.kenburnsStop || n.item.noImg) {
                return
            }
            var m;
            if (this.o("kenburns") && n.kenburns) {
                this.prevKen = this.kenburns;
                m = parseInt(this.o("slide-duration")) + 1000;
                if (m >= 1000) {
                    this.kenburns = new c.Effects.Kenburns((n.item.currentImg || (n.item.type == "default" ? n.item.smallImg : n.item.fullScreenImg)), n.item.index, this.prevKen, c.extend(this.options.getJSON(), {
                        duration: m
                    }));
                    return this.kenburns
                } else {
                    this.prevKen && this.prevKen.recoverySize()
                }
            } else {
                this.kenburns && this.kenburns.recoverySize(true)
            }
            return false
        },
        _startDrag: function() {
            this.stopMove = false
        },
        _startEffectKenburns: function() {
            this.jCallEvent("StartEffectKenburns")
        },
        _endEffectKenburns: function(m) {
            this.jCallEvent("EndEffectKenburns", {
                kenburns: m
            })
        },
        _startEffect: function(m) {
            this.jCallEvent("StartEffect", {
                lastIndex: m.last,
                nextIndex: m.next
            })
        },
        _endEffect: function(m) {
            this.jCallEvent("EndEffect", {
                lastIndex: m.last,
                nextIndex: m.next
            })
        },
        setOptions: function(m) {
            for (var n in m) {
                this.set(n, m[n])
            }
        },
        stop: function() {
            this.last && this.last.stop();
            this.kenburns && this.kenburns.stop();
            return this
        },
        dispose: function() {
            this.stop();
            return null
        }
    };
    c.extend(l.prototype, c.customEvents);
    var h = c.$;
    document.createElement("figure");
    document.createElement("figcaption");
    var a = c.normalizeCSS("transform").dashize();
    var b = function(v, u) {
        var G, y, B, E = 0,
            w, z, F, A, D, m, r, x, C = -1,
            p = [];
        c.$uuid(this);
        this.options = new c.Options(e);
        this.originalNode = h(v).jStore("slideshow", this);
        this.originalClasses = h(v).getAttribute("class") || h(v).getAttribute("className");
        this.originalNodes = [];
        this.id = v.getAttribute("id") || "mss-" + Math.floor(Math.random() * c.now());
        this.isFullScreen = false;
        this.pause_ = false;
        this.readyCalc_ = false;
        this.items = null;
        this.itemsCount = 0;
        this.enteringFullScreen = false;
        this.wrapSize = null;
        this.movementKenbburns = false;
        this.movement = false;
        this.progressTimer = null;
        this.container = null;
        this.slidesNode = null;
        this.slidesWrapperNode = null;
        this.captionWrapperNode = null;
        this.selectors = null;
        this.selectorsContainer = null;
        this.selectorsSettings = {
            orientation: "horizontal",
            position: "bottom",
            size: {
                units: "px",
                width: "auto",
                height: "auto"
            },
            sides: ["height", "width"]
        };
        this.resizeCallback = this.onResize.jBind(this);
        this.keyboardCallback = h(function(n) {
            if (!this.isFullScreen && !this.o("keyboard")) {
                return
            }
            if (37 === n.keyCode || 39 === n.keyCode) {
                this.autoScroll(true);
                this.jump({
                    target: 37 === n.keyCode ? "backward" : "forward"
                })
            }
        }).jBind(this);
        this.lastMove = null;
        this.countThumb = 0;
        this.imgCacheBox = c.$new("div").jAddClass("magic-temporary-img").jSetCss({
            position: "absolute",
            top: -1000,
            width: 10,
            height: 10,
            overflow: "hidden"
        }).jAppendTo(document.body);
        this.cachedCSS = [];
        this.o = this.options.get.jBind(this.options);
        this.set = this.options.set.jBind(this.options);
        this.loadOptions(u);
        this.container = this.originalNode;
        c.$A(this.container.childNodes).jEach(h(function(o) {
            if (o.nodeType !== 3 && o.nodeType !== 8 && "br" !== o.tagName.toLowerCase() && "hr" !== o.tagName.toLowerCase()) {
                p.push(o)
            }
            this.container.removeChild(o)
        }).jBind(this));
        this.container.jStore("slideshow", this).jSetCss({
            position: "relative"
        }).jAddClass("mss-" + this.o("orientation")).setAttribute("id", this.id);
        if (!c.browser.mobile) {
            this.container.jAddClass("mss-desktop")
        }
        if (this.o("width") != "auto") {
            this.container.jSetCssProp("width", this.o("width"))
        }
        if (this.o("height-depends")) {
            if (c.browser.ieMode && c.browser.ieMode < 8) {
                c.$new("div", null, {
                    display: "inline-block",
                    "vertical-align": "top",
                    "padding-top": this.o("height")
                }).jAppendTo(this.container);
                if (isFinite(this.o("height")) && /%$/.test(this.o("height")) && parseFloat(this.o("height")) > 100) {
                    C = c.addCSS(".lt-ie8-magic #" + this.id + String.fromCharCode(32) + "img.mss-slide-img", {
                        "with": "100%",
                        height: "auto"
                    }, "magicslideshow-css-reset")
                }
            } else {
                C = c.addCSS("#" + this.id + ":before", {
                    "padding-top": this.o("height"),
                    content: '""'
                }, "magicslideshow-css-reset")
            }
            if (C > -1) {
                this.cachedCSS.push(C)
            }
        } else {
            this.container.jSetCssProp("height", this.o("height"))
        }
        this.slidesNode = c.$new("div", {
            "class": "mss-slider"
        });
        this.slidesWrapperNode = c.$new("div", {
            "class": "mss-slide-wrapper"
        });
        this.items = new g(this.options.getJSON(), this.id, this.optSizeSel);
        if (this.o("fullscreen")) {
            this.setupFullScreen()
        }
        if (this.o("selectors")) {
            this.setupSelectors()
        } else {
            if (c.browser.ieMode && c.browser.ieMode < 8) {
                this.slidesNode.jSetCssProp("height", "100%")
            }
        }
        h(p).jEach(h(function(q) {
            var o = this.items.push(q, (!this.o("selectors") ? true : false));
            if (o.selector) {
                this.countThumb++
            }
        }).jBind(this));
        this.originalNodes = p;
        this.slidesNode.jAppendTo(this.container);
        this.slidesWrapperNode.jAppendTo(this.slidesNode);
        if ("fixed" != this.o("caption-effect")) {
            this.captionWrapperNode = c.$new("div", {
                "class": "mss-caption"
            }).jAppendTo(this.slidesNode)
        }
        if (this.o("selectors-size") == "auto") {
            this.selectors.childNodes[0].append(this.items.items[0].selector)
        }
        this.show()
    };
    b.prototype = {
        loadOptions: function(m) {
            var n;
            this.options.fromJSON(m || {});
            this.options.fromRel(this.originalNode.getAttribute("data-options") || "");
            this.options.fromRel(this.originalNode.getAttribute("data-options-mobile") || "");
            if ("auto" == this.o("width")) {
                this.set("width", "100%")
            }
            if ("auto" == this.o("height")) {
                this.set("height", this.options.defaults.height)
            }
            if ("none" == this.o("selectors")) {
                this.set("selectors", false)
            }
            if ("bullets" == this.o("selectors-style")) {
                this.set("selectors-eye", false)
            }
            if (false === this.o("autoplay")) {
                this.set("kenburns", false);
                this.set("pause", false)
            }
            if ("off" == this.o("pause")) {
                this.set("pause", false)
            }
            if (c.browser.ieMode && c.browser.ieMode <= 9) {
                if (h(["flip", "swipe", "blinds3d", "cube", "bars3d"]).contains(this.o("effect"))) {
                    this.set("effect", "slide")
                }
            }
            if ("false" === this.o("links")) {
                this.set("links", false)
            }
        },
        setupSelectors: function() {
            var m;
            this.selectorsSettings.position = this.o("selectors");
            if ("left" == this.selectorsSettings.position || "right" == this.selectorsSettings.position) {
                this.selectorsSettings.orientation = "vertical";
                this.selectorsSettings.sides.reverse()
            }
            if ((m = this.o("selectors-size").match(/^([0-9]+)?\x?([0-9]+)?(px|%)?$/) || this.options.defaults["selectors-size"].match(/^([0-9]+)?\x?([0-9]+)?(px|%)?$/))) {
                this.selectorsSettings.size.height = (this.o("selectors-style") == "bullets") ? "auto" : (parseFloat(m[2]) || "auto");
                this.selectorsSettings.size.width = (this.o("selectors-style") == "bullets") ? "auto" : (parseFloat(m[1]) || "auto")
            }
            if ("auto" === this.selectorsSettings.size[this.selectorsSettings.sides[0]]) {
                this.selectorsSettings.size[this.selectorsSettings.sides[0]] = this.selectorsSettings.size[this.selectorsSettings.sides[1]];
                this.selectorsSettings.size[this.selectorsSettings.sides[1]] = "auto"
            }
            if (isFinite(this.selectorsSettings.size.width) && isFinite(this.selectorsSettings.size.height)) {
                this.selectorsSettings.size.units = "px"
            }
            this.selectors = c.$new("div").jAddClass("mss-selectors mss-" + this.o("selectors-style")).jStore("settings", this.selectorsSettings).jAppendTo(this.container, "left" == this.selectorsSettings.position ? "top" : this.selectorsSettings.position);
            if (c.browser.ieMode && 7 === c.browser.ieMode && "right" == this.selectorsSettings.position) {
                this.selectors.jSetCssProp("right", "0px")
            }
            if ("thumbnails" == this.o("selectors-style")) {
                this.selectors.jSetCssProp(this.selectorsSettings.sides[0], this.selectorsSettings.size[this.selectorsSettings.sides[0]] + this.selectorsSettings.size.units);
                this.selectors.jSetCss({
                    visibility: "hidden"
                });
                this.selectorsArrows = new c.Modules.ArrowsPair({
                    container: this.selectors,
                    orientation: "mss-" + this.selectorsSettings.orientation,
                    "class": "mss",
                    "class-hidden": "mss-hidden",
                    "class-disabled": "mss-disabled"
                });
                this.selectorsArrows.hide();
                this.selectorsArrows.bindEvent("forward", (function(n) {
                    this.scrollSelectors("forward")
                }).jBind(this));
                this.selectorsArrows.bindEvent("backward", (function(n) {
                    this.scrollSelectors("backward")
                }).jBind(this))
            }
            this.selectorsContainer = c.$new("div", {
                "class": "mss-selectors-container"
            }).jAppendTo(c.$new("div").jAddClass("mss-selectors-wrapper").jAppendTo(this.selectors));
            if (c.browser.ieMode && c.browser.ieMode < 7 && "width" == this.selectorsSettings.sides[1]) {
                this.selectorsContainer.parentNode.jSetCss({
                    "float": "left"
                })
            }
            if (this.o("selectors-eye")) {
                this.eyeTracker = c.$new("div", {
                    "class": "mss-selectors-eye"
                }, {
                    position: "absolute"
                }).jAppendTo(this.selectorsContainer).hide()
            }
            h(this.selectorsContainer).jAddEvent("tap btnclick", h(function(p) {
                var n, o = p.getOriginalTarget();
                while (o && o !== this.selectorsContainer) {
                    if ((n = h(o).jFetch("slideshow:item"))) {
                        break
                    }
                    o = o.parentNode
                }
                if (!n) {
                    return
                }
                p.stop();
                (this.o("pause") == "selector-click") && (this.stopAutoScroll = true);
                this.autoScroll(true);
                if (this.items.last != n.index) {
                    this.recoveryPositionAfterDrag && this.recoveryPositionAfterDrag();
                    this.jump({
                        target: n.index,
                        options: {
                            direction: n.index > this.items.last ? "forward" : "backward"
                        }
                    })
                }
            }).jBind(this));
            this.container.jAddClass("mss-selectors-" + this.selectorsSettings.orientation + " mss-selectors-" + this.o("selectors"))
        },
        setupFullScreen: function() {
            this.btnFullscreen = c.$new("button").jAddClass("mss-button mss-button-fullscreen mss-button-fullscreen-enter").append(c.$new("span")).jAppendTo(this.slidesNode).jAddEvent("tap btnclick", h(function(n) {
                var m;
                if (3 == n.getButton()) {
                    return true
                }
                n.stop();
                if (this.isFullScreen) {
                    if (m = this.fullScreenBox.jFetch("fullscreen:pseudo:event:keydown")) {
                        c.doc.jRemoveEvent("keydown", m);
                        this.fullScreenBox.jDel("fullscreen:pseudo:event:keydown")
                    }
                    this.exitFullScreen()
                } else {
                    this.enterFullScreen()
                }
                return false
            }).jBind(this))
        },
        jump: function(n) {
            if ("object" != c.jTypeOf(n)) {
                var m = n;
                n = {
                    target: m
                }
            }
            if (!this.o("loop")) {
                !this.itemsCount && (this.itemsCount = this.items.items.length);
                if (n.target == "forward") {
                    if (this.itemsCount - 1 == this.items.last) {
                        return
                    }
                }
                if (n.target == "backward") {
                    if (0 === this.items.last) {
                        return
                    }
                }
            }!n.options && (n.options = {});
            !n.options.duration && (n.options.duration = this.o("effect-speed"));
            !n.options.items && (n.options.items = this.items.items);
            !n.options.loop && (n.options.loop = this.o("loop"));
            if (!(c.jTypeOf(n.target) == "number" && n.target >= 0)) {
                (n.target == "forward") ? (n.target = "+1") : (n.target = "-1");
                n.options.direction = this.direction(/^\-/.test(n.target) ? "backward" : "forward");
                n.target = this.items.last + parseInt(n.target)
            } else {
                n.options.direction = this.direction(n.options.direction || ((n.target % this.itemsCount) >= this.items.last ? "forward" : "backward"))
            }
            if (this.o("effect-easing")) {
                n.options["cubic-bezier"] = this.o("effect-easing")
            }
            if (c.jTypeOf(n.target) != "number") {
                return
            }
            if (this.o("kenburns")) {
                n.kenburns = true
            }
            this.lastMove = n;
            this.items.activate(n.target)
        },
        scrollSelectors: function(A) {
            if (!this.selectors || "thumbnails" != this.o("selectors-style") || !A) {
                return
            }
            var r = {
                    x: 0,
                    y: 0
                },
                u = this.selectors.jFetch("settings"),
                m = "width" == this.selectorsSettings.sides[1] ? "left" : "top",
                q = "width" == this.selectorsSettings.sides[1] ? "x" : "y",
                z = this.selectorsContainer.parentNode.jGetSize()[this.selectorsSettings.sides[1]],
                w = this.selectorsContainer.parentNode.jGetPosition(),
                p = this.selectorsContainer.jGetSize()[this.selectorsSettings.sides[1]],
                y, n, C, s, o, x, v, B = [];
            if (this.selectorsMoveFX) {
                this.selectorsMoveFX.stop()
            } else {
                this.selectorsContainer.jSetCss("transition", a + String.fromCharCode(32) + "0s");
                if (this.eyeTracker) {
                    this.eyeTracker.jSetCssProp("transition", "all 0s")
                }
            }
            y = this.selectorsContainer.jGetPosition();
            if ("string" == c.jTypeOf(A)) {
                r[q] = ("forward" == A) ? Math.max(y[m] - w[m] - z, z - p) : Math.min(y[m] - w[m] + z, 0)
            } else {
                if ("element" == c.jTypeOf(A)) {
                    n = A.jGetSize();
                    C = A.jGetPosition();
                    r[q] = Math.min(0, Math.max(z - p, y[m] + z / 2 - C[m] - n[this.selectorsSettings.sides[1]] / 2))
                } else {
                    return
                }
            }
            if (this.eyeTracker && C && C[m]) {
                s = this.eyeTracker.jGetPosition();
                o = this.eyeTracker.jGetSize();
                x = {
                    width: [o.width, n.width],
                    height: [o.height, n.height],
                    left: [s.left - w.left, C.left - y.left],
                    top: [s.top - w.top, C.top - y.top]
                }
            }
            if (c.browser.gecko && "android" == c.browser.platform || c.browser.ieMode && c.browser.ieMode < 10) {
                if ("string" == c.jTypeOf(A) && r[q] == y[m] - w[m]) {
                    y[m] += 0 === y[m] - w[m] ? 30 : -30
                }
                r[m] = [((p <= z) ? 0 : (y[m] - w[m])), r[q]];
                delete r.x;
                delete r.y;
                if (!this.selectorsMoveFX) {
                    this.selectorsMoveFX = new c.PFX([this.selectorsContainer].concat(this.eyeTracker ? [this.eyeTracker] : []), {
                        duration: 500
                    })
                }
                B.push(r);
                if (x) {
                    x[m] = [s[m] - y[m], C[m] - y[m]];
                    B.push(x)
                }
                this.selectorsMoveFX.start(B);
                v = r[m][1]
            } else {
                if (x) {
                    this.eyeTracker.jSetCss({
                        width: n.width,
                        height: n.height,
                        top: C.top - y.top,
                        left: C.left - y.left,
                        transition: "all 500ms ease"
                    })
                }
                if ("string" == c.jTypeOf(A) && r[q] == y[m] - w[m]) {
                    r[q] += 0 === y[m] - w[m] ? 30 : -30;
                    this.selectorsContainer.jSetCssProp("transition", "");
                    this.selectorsContainer.jSetCssProp("transform", "translate3d(" + r.x + "px, " + r.y + "px, 0)");
                    this.selectorsContainer.jGetSize();
                    r[q] -= 0 === y[m] - w[m] ? 30 : -30
                }
                this.selectorsContainer.jSetCss({
                    transition: a + String.fromCharCode(32) + "500ms ease",
                    transform: "translate3d(" + r.x + "px, " + r.y + "px, 0)"
                });
                v = r[q]
            }
            if (v >= 0) {
                this.selectorsArrows.disable("prev")
            } else {
                this.selectorsArrows.enable("prev")
            }
            if (v <= z - p) {
                this.selectorsArrows.disable("next")
            } else {
                this.selectorsArrows.enable("next")
            }
            v = null
        },
        direction: function(m) {
            if (m) {
                var n = (this.o("orientation") == "horizontal") ? "right" : "bottom";
                return (m == "forward") ? n : ((m == "backward") ? {
                    left: "right",
                    right: "left",
                    top: "bottom",
                    bottom: "top"
                }[n] : m)
            }
        },
        show: function(q) {
            if (this.indoc) {
                return
            }
            this.indoc = true;
            var n = {
                    width: 0,
                    height: 0
                },
                o, p, m;
            this.container.show().jSetCssProp("display", "inline-block");
            this.reflowSlider();
            if (this.o("arrows")) {
                this.arrows = new c.Modules.ArrowsPair({
                    container: this.slidesNode,
                    "class": "mss",
                    "class-hidden": "mss-button-hidden",
                    "class-disabled": "mss-disabled",
                    orientation: "mss-" + this.o("orientation")
                });
                this.arrows.bindEvent("forward", (function(r) {
                    this.stopAutoScroll = false;
                    this.recoveryPositionAfterDrag && this.recoveryPositionAfterDrag();
                    this.autoScroll(true);
                    this.jump({
                        target: "forward"
                    })
                }).jBind(this));
                this.arrows.bindEvent("backward", (function(r) {
                    this.stopAutoScroll = false;
                    this.recoveryPositionAfterDrag && this.recoveryPositionAfterDrag();
                    this.autoScroll(true);
                    this.jump({
                        target: "backward"
                    })
                }).jBind(this))
            }
            this.effect = new l(c.extend(this.options.getJSON(), {
                duration: this.o("effect-speed"),
                speed: this.o("slide-duration")
            }));
            if (this.o("caption") && "fixed" != this.o("caption-effect")) {
                this.textEffect = new l({
                    duration: this.o("effect-speed"),
                    effect: this.o("caption-effect"),
                    direction: this.o("caption-position"),
                    transition: "linear",
                    random: "no",
                    nokenburns: true
                })
            }
            this.items.bindEvent("item-img-load", h(function(r) {
                r.item.progress.hide()
            }).jBind(this));
            this.items.bindEvent("selector-img-load", h(function(r) {
                this.items.selectorsSize = null;
                this.items.calcThumbWrapSize(this.o("selectors"));
                this.countThumb--;
                this.readyCalc()
            }).jBind(this));
            this.items.bindEvent("add-item", h(function(r) {
                if (r.item.img && !r.item.imgSize) {
                    r.item.imgSize = (r.item.node.childNodes[0].jGetSize())
                }
                this.readyCalc()
            }).jBind(this));
            this.items.bindEvent("add-selector", h(function(x) {
                var w, v, r, u;
                if (isFinite(this.selectorsSettings.size.width) && isFinite(this.selectorsSettings.size.height)) {
                    x.item.selector.jSetCss({
                        width: this.selectorsSettings.size.width,
                        height: this.selectorsSettings.size.height
                    })
                } else {
                    if (c.browser.ieMode && c.browser.ieMode < 8) {
                        x.item.selector.jSetCssProp(this.selectorsSettings.sides[0], this.selectorsSettings.size[this.selectorsSettings.sides[0]])
                    }
                }
                this.selectorsContainer.appendChild(x.item.selector);
                u = (h(["top", "bottom"]).contains(this.o("selectors")) ? "width" : "height");
                v = h(this.selectorsContainer.parentNode).jGetSize();
                r = (u == "height") ? "width" : "height";
                if (c.browser.ieMode && c.browser.ieMode < 8) {
                    if (this.o("selectors-style") == "thumbnails" && x.item.selector.tagName.toLowerCase() == "div") {
                        x.item.selector.jSetCss({
                            display: "inline",
                            zoom: 1
                        })
                    }
                }
                if (!x.item.selector.childNodes[0] && this.o("selectors-style") == "thumbnails" && x.item.selector.tagName.toLowerCase() == "div") {
                    if (c.browser.ieMode && c.browser.ieMode < 8) {} else {}
                }
                if (x.item.selector.tagName.toLowerCase() != "img") {
                    this.countThumb--;
                    this.readyCalc()
                }
            }).jBind(this));
            this.items.bindEvent("activate", h(function(u) {
                var s, r;
                if (this.selectors) {
                    if (u.prevItem) {
                        u.prevItem.selector && u.prevItem.selector.jRemoveClass("mss-selector-active")
                    }
                    u.item.node.jAddClass("mss-slide-active");
                    if (u.item.selector) {
                        u.item.selector.jAddClass("mss-selector-active");
                        if (0 === this.countThumb) {
                            this.scrollSelectors(u.item.selector)
                        }
                    } else {
                        this.eyeTracker && this.eyeTracker.hide()
                    }
                }
                r = false;
                for (s = 0; s < this.items.items.length; s++) {
                    if (this.items.items[s].tag == "img" || this.items.items[s].tag == "a:img") {
                        r = true
                    }
                }
                this.items.FSImageLoad(u.item.index);
                this.effect.kenburnsStop = false;
                this.replaceEffect && this.replaceEffect.stop();
                this.replaceEffect = new this.replaceImg(this.items.items[u.item.index], {
                    fullscreen: this.items.fullscreen,
                    prepareKenburn: (this.o("kenburns") ? this.prepareKenburn.jBind(this) : false)
                });
                if (this.enteringFullScreen && u.item.fsSize || !this.enteringFullScreen && u.item.defSize) {
                    this.replaceEffect.start(this.items.fullscreen, false, {
                        start: this.o("kenburns") ? this.startKenburn.jBind(this) : false
                    })
                } else {
                    if (this.replaceEffect.prepareKenburn) {
                        this.effect.kenburnsStop = true
                    }
                }
                this.pause_ = false;
                if (this.o("kenburns")) {
                    u.item.node.jAddClass("mss-kenburns-effect")
                }
                if (!this.stopEffect) {
                    this.effect.jump(c.extend({
                        item: {
                            node: u.item.node,
                            index: u.item.index,
                            type: u.item.whatImg,
                            smallImg: u.item.smallImg,
                            fullScreenImg: u.item.fullScreenImg,
                            noImg: u.item.noImg
                        }
                    }, this.lastMove))
                } else {
                    setTimeout(h(function() {
                        this.o("end-effect")({
                            id: this.id,
                            prev: u.prevItem.index,
                            next: u.item.index
                        })
                    }).jBind(this), 1)
                }
                this.textEffect && this.textEffect.jump(c.extend({
                    item: {
                        node: u.item.text,
                        index: u.item.index
                    }
                }, {
                    direction: "forward"
                }))
            }).jBind(this));
            this.items.bindEvent("item-fullscreen-load", h(function(r) {
                if (r.createReplace || this.replaceEffect.noEffect) {
                    this.effect.kenburnsStop = false;
                    this.replaceEffect && this.replaceEffect.stop();
                    this.replaceEffect = new this.replaceImg(this.items.items[r.item.index], {
                        fullscreen: this.items.fullscreen,
                        prepareKenburn: (this.o("kenburns") ? this.prepareKenburn.jBind(this) : false)
                    })
                }
                if (!this.movement && r.item.index == this.items.last) {
                    if (this.o("autoplay")) {
                        this.autoScroll()
                    }
                    this.replaceEffect.start(this.items.fullscreen, true, {
                        start: this.o("kenburns") ? this.startKenburn.jBind(this) : false
                    })
                }
            }).jBind(this));
            this.effect.bindEvent("StartEffectKenburns", h(function(r) {
                this.movementKenbburns = true
            }).jBind(this));
            this.effect.bindEvent("EndEffectKenburns", h(function(r) {
                this.movementKenbburns = false
            }).jBind(this));
            this.effect.bindEvent("StartEffect", h(function(r) {
                this.movement = true;
                if (!this.o("loop") && this.arrows && !c.browser.touchScreen) {
                    !this.itemsCount && (this.itemsCount = this.items.items.length);
                    if (this.itemsCount - 1 == this.items.last) {
                        this.arrows.disable("next")
                    } else {
                        this.arrows.enable("next")
                    }
                    if (0 == this.items.last) {
                        this.arrows.disable("prev")
                    } else {
                        this.arrows.enable("prev")
                    }
                }
                setTimeout(h(function() {
                    this.o("start-effect")({
                        id: this.id,
                        prev: r.lastIndex,
                        next: r.nextIndex
                    })
                }).jBind(this), 1)
            }).jBind(this));
            this.effect.bindEvent("EndEffect", h(function(s) {
                this.autoScroll();
                var r = false;
                this.movement = false;
                if (isFinite("" + s.lastIndex)) {
                    this.items.items[s.lastIndex].node.jRemoveClass("mss-slide-active mss-kenburns-effect")
                }
                if (this.o("kenburns")) {
                    r = {
                        start: this.startKenburn.jBind(this)
                    }
                }
                if (this.replaceEffect && this.replaceEffect.one) {
                    this.o("kenburns") && this.replaceEffect.startKenburn()
                } else {
                    this.replaceEffect && this.replaceEffect.start(this.items.fullscreen, true, r)
                }
                setTimeout(h(function() {
                    this.o("end-effect")({
                        id: this.id,
                        prev: s.lastIndex,
                        next: s.nextIndex
                    })
                }).jBind(this), 1)
            }).jBind(this));
            this.items.bindEvent("create", (function(u) {
                var s;
                this.slidesWrapperNode.appendChild(u.item.node.jAddClass("mss-slide"));
                if (this.o("links") && u.item.href) {
                    u.item.node.jSetCss({
                        cursor: "pointer"
                    })
                }

                function r(w) {
                    var v = /\[a([^\]]+)\](.*?)\[\/a\]/ig;
                    return w.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(v, "<a $1>$2</a>")
                }
                if (!!this.o("caption")) {
                    if (u.item.text || u.item.title) {
                        s = c.$new("span");
                        if (u.item.text) {
                            if (c.jTypeOf(u.item.text) == "element") {
                                if (u.item.text.tagName.toLowerCase() == "span") {
                                    s.changeContent(r(u.item.text.innerHTML));
                                    u.item.text.parentNode && h(u.item.text.parentNode).replaceChild(s, u.item.text)
                                }
                            } else {
                                s.changeContent(r(u.item.text))
                            }
                        }
                        u.item.text = h(s);
                        if (u.item.title) {
                            h(u.item.text).append(c.$new("b").jAddClass("mss-caption-title").changeContent(u.item.title), "top")
                        }
                        if (this.o("caption-effect") == "fixed") {
                            c.$new("div", {
                                "class": "mss-caption"
                            }).append(h(u.item.text)).jAppendTo(u.item.node)
                        } else {
                            h(u.item.text).jAppendTo(this.captionWrapperNode).hide()
                        }
                    }
                }
            }).jBind(this));
            this.items.bindEvent("addImgToCacheBox", h(function(r) {
                this.imgCacheBox && this.imgCacheBox.append(c.$new("img", {
                    src: r.img.src || r.img
                }))
            }).jBind(this));
            this.items.preload(this.o("preload"), 0);
            this.slidesNode.jAddEvent("click", h(function(u) {
                var s = u.getTarget(),
                    r;
                u.stopDistribution();
                if (this.o("pause") == "click") {
                    if (this.pause_) {
                        this.pause_ = false;
                        this.autoScroll()
                    } else {
                        this.pause_ = true;
                        this.autoScroll(true)
                    }
                }
                if (this.o("links")) {
                    r = this.items.items[this.items.last].href;
                    if (r) {
                        window.open(r, this.o("links"))
                    }
                }
            }).jBind(this));
            this.slidesNode.jAddEvent("mouseover mouseout", h(function(s) {
                s.stop();
                var r = s.getRelated();
                while (r && r !== this.slidesNode) {
                    r = r.parentNode
                }
                if (r == this.slidesNode) {
                    return
                }
                if (this.o("pause") == "hover") {
                    this.pause_ = "mouseover" == s.type;
                    this.autoScroll(this.pause_)
                }
            }).jBind(this));
            h(window).jAddEvent("resize", this.resizeCallback);
            this.jump(0);
            this.initDragOnSlider();
            h(document).jAddEvent("keydown", this.keyboardCallback);
            return this
        },
        reflowSlider: function() {
            if (!this.selectors) {
                return
            }
            var m = (this.isFullScreen) ? this.fullScreenBox : this.container;
            if (!this.isFullScreen) {
                this.container.jSetCssProp("padding-" + this.o("selectors"), this.selectors.jGetSize()[this.selectorsSettings.sides[0]])
            }
            if (c.browser.ieMode && c.browser.ieMode < 8) {
                this.slidesNode.jSetCssProp(this.selectorsSettings.sides[0], m.jGetSize()[this.selectorsSettings.sides[0]] - this.selectors.jGetSize()[this.selectorsSettings.sides[0]]);
                if ("width" == this.selectorsSettings.sides[0]) {
                    this.slidesNode.jSetCssProp("height", m.jGetSize().height)
                }
            }
            this.slidesNode.jSetCssProp(this.o("selectors"), this.selectors.jGetSize()[this.selectorsSettings.sides[0]])
        },
        reflowSelectors: function() {
            var n, m = (this.isFullScreen) ? this.fullScreenBox : this.container;
            if (this.readyCalc_ && this.selectors && "thumbnails" == this.o("selectors-style")) {
                if ("%" == this.selectorsSettings.size.units && "height" == this.selectorsSettings.sides[0]) {
                    this.selectors.jSetCssProp(this.selectorsSettings.sides[0], this.container.jGetSize().width * (this.selectorsSettings.size[this.selectorsSettings.sides[0]] / 100))
                }
                n = this.selectors.jGetSize();
                if (this.selectorsArrows) {
                    if (this.selectorsContainer.jGetSize()[this.selectorsSettings.sides[1]] <= n[this.selectorsSettings.sides[1]]) {
                        this.selectorsArrows.hide()
                    } else {
                        this.selectorsArrows.show()
                    }
                    if (c.browser.ieMode && c.browser.ieMode < 7 && "width" == this.selectorsSettings.sides[1]) {
                        this.selectorsContainer.parentNode.jSetCss({
                            width: n.width - this.selectorsArrows.prev.jGetSize().width - this.selectorsArrows.next.jGetSize().width
                        })
                    }
                    if ("height" == this.selectorsSettings.sides[1]) {
                        this.selectorsContainer.parentNode.jSetCss({
                            height: n.height - this.selectorsArrows.prev.jGetSize().height - this.selectorsArrows.next.jGetSize().height
                        })
                    }
                }!this.items.selectorsSize && (this.items.selectorsSize = this.selectors.jGetSize());
                !this.items.wrapSelSize && (this.items.wrapSelSize = this.selectorsContainer.jGetSize())
            }
        },
        readyCalc: function() {
            var m;
            if (this.readyCalc_) {
                return
            }
            if (this.countThumb == 0 && (this.items.items[0] && this.items.items[0].ready)) {
                this.readyCalc_ = true;
                h(this.container).jAddEvent("dragstart selectstart", function(n) {
                    n.stop()
                });
                this.items.calcThumbWrapSize(this.o("selectors"));
                if (this.selectors && "thumbnails" == this.o("selectors-style")) {
                    this.selectors.jSetCssProp(this.selectorsSettings.sides[0], this.selectorsContainer.jGetSize()[this.selectorsSettings.sides[0]]);
                    this.selectorsContainer.jSetCss({
                        "box-sizing": "border-box"
                    });
                    this.reflowSelectors();
                    if (c.browser.ieMode && c.browser.ieMode < 7 && "width" == this.selectorsSettings.sides[1]) {
                        this.selectorsContainer.parentNode.jSetCss({
                            height: "99.99%"
                        });
                        setTimeout(function() {
                            this.selectorsContainer.parentNode.jSetCss({
                                height: "100%"
                            })
                        }.jBind(this), 150)
                    }
                    this.initDragOnSelectors();
                    if (this.eyeTracker) {
                        this.eyeTracker.show()
                    }
                    this.scrollSelectors(this.items.items[0].selector);
                    this.onResize();
                    this.selectors.jSetCss({
                        visibility: "visible"
                    })
                }
                setTimeout(h(function() {
                    this.o("onready").call(this, this.id)
                }).jBind(this), 1);
                this.autoScroll()
            }
        },
        onResize: function() {
            var n = this.container.jGetSize(),
                m;
            if (this.items) {
                this.items.selectorsSize = null;
                this.items.wrapSelSize = null
            }
            this.autoScroll(true);
            this.readyCalc_ && this.items.calcThumbWrapSize(this.o("selectors"));
            this.reflowSelectors();
            this.reflowSlider();
            if (this.selectors && this.selectors.jGetCss("display") != "none" && this.items.last > -1) {
                this.items.items[this.items.last].selector && this.scrollSelectors(this.items.items[this.items.last].selector)
            }
            this.autoScroll()
        },
        prepareToFullScreen: function() {
            this.replaceEffect && this.replaceEffect.stop();
            if (this.o("kenburns")) {
                this.effect.kenburns && this.effect.kenburns.recoverySize(true)
            }
            this.recoveryPositionAfterDrag && this.recoveryPositionAfterDrag();
            this.effect.stop();
            this.textEffect && this.textEffect.stop();
            this.autoScroll(true)
        },
        enterFullScreen: function() {
            this.prepareToFullScreen();
            this.enteringFullScreen = true;
            this.items.fullscreen = true;
            var p = h(document).jGetSize(),
                o = h(window).jGetScroll(),
                n = h(document).jGetFullSize(),
                m = window.parent !== window.window;
            this.boxSize = this.container.jGetSize();
            this.boxBoundaries = this.container.jGetRect();
            if (!this.fullScreenBox) {
                this.fullScreenBox = c.$new("div", {}, {
                    display: "block",
                    overflow: "hidden",
                    position: "absolute",
                    zIndex: 200000,
                    "vertical-align": "middle",
                    opacity: 0.3
                }).jAddClass("mss-fullscreen mss-" + this.o("orientation"));
                if (this.selectors) {
                    this.fullScreenBox.jAddClass("mss-selectors-" + this.selectorsSettings.orientation).jAddClass("mss-selectors-" + this.o("selectors"))
                }
                if (!c.browser.mobile) {
                    this.fullScreenBox.jAddClass("mss-desktop")
                }
            }
            this.fullScreenBox.append(this.slidesNode);
            if (this.selectors) {
                this.fullScreenBox.append(this.selectors)
            }
            this.fullScreenBox.jAppendTo(document.body);
            this.fullScreenBox.show();
            if (k.browser.features.fullScreen) {
                this.fullScreenBox.jSetOpacity(1);
                this.autoScroll()
            }
            k.browser.fullScreen.request(this.fullScreenBox, {
                onEnter: this.onEnteredFullScreen.jBind(this),
                onExit: this.onExitFullScreen.jBind(this),
                fallback: function() {
                    if (!this.fullScreenFX) {
                        this.fullScreenFX = new c.FX(this.fullScreenBox, {
                            duration: 400,
                            transition: c.FX.Transition.cubicOut,
                            onStart: (function() {
                                this.fullScreenBox.jSetCss({
                                    width: this.boxSize.width,
                                    height: this.boxSize.height,
                                    top: this.boxBoundaries.top,
                                    left: this.boxBoundaries.left
                                })
                            }).jBind(this),
                            onComplete: (function() {
                                this.onEnteredFullScreen(true)
                            }).jBind(this)
                        })
                    }
                    this.fullScreenFX.start({
                        width: [this.boxSize.width, p.width],
                        height: [this.boxSize.height, p.height],
                        top: [this.boxBoundaries.top, 0 + o.y],
                        left: [this.boxBoundaries.left, 0 + o.x],
                        opacity: [0.3, 1]
                    })
                }.jBind(this)
            })
        },
        onEnteredFullScreen: function(o) {
            var n, m = window.parent !== window.window;
            if (o && !this.isFullScreen && !m && !(c.browser.ieMode && c.browser.ieMode < 7)) {
                this.fullScreenBox.jSetCss({
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: "auto",
                    height: "auto"
                })
            }
            this.isFullScreen = true;
            this.btnFullscreen.jRemoveClass("mss-button-fullscreen-enter").jAddClass("mss-button-fullscreen-exit");
            if (o && !c.browser.mobile) {
                n = function(p) {
                    if (p.keyCode == 27) {
                        c.doc.jRemoveEvent("keydown", n);
                        this.exitFullScreen()
                    }
                }.jBindAsEvent(this);
                this.fullScreenBox.jStore("fullscreen:pseudo:event:keydown", n);
                c.doc.jAddEvent("keydown", n);
                this.leaveFSMessage = new c.Message("Press ESC key to leave full-screen", 4000, this.slidesNode, "mss-message")
            }
            this.onResize();
            this.items.FSImageLoad(null, true);
            if (this.items.items[this.items.last].whatImg == "default" && this.items.items[this.items.last].fsSize) {
                this.effect.kenburnsStop = false;
                this.replaceEffect && this.replaceEffect.stop();
                this.replaceEffect = new this.replaceImg(this.items.items[this.items.last], {
                    fullscreen: this.items.fullscreen,
                    prepareKenburn: (this.o("kenburns") ? this.prepareKenburn.jBind(this) : false)
                });
                this.replaceEffect.start(this.items.fullscreen, true, {
                    start: (this.o("kenburns") ? this.startKenburn.jBind(this) : false)
                })
            }
        },
        exitFullScreen: function() {
            this.enteringFullScreen = false;
            var n = this.fullScreenBox.jGetSize(),
                m = this.fullScreenBox.jGetRect();
            this.effect.stop();
            this.leaveFSMessage && this.leaveFSMessage.hide(0);
            if (k.browser.fullScreen.capable && k.browser.fullScreen.enabled()) {
                k.browser.fullScreen.cancel();
                if (this.selectors) {
                    this.scrollSelectors(this.items.items[this.items.last].selector)
                }
                this.autoScroll()
            } else {
                this.btnFullscreen && this.btnFullscreen.hide();
                if (!this.fullScreenExitFX) {
                    this.fullScreenExitFX = new c.FX(this.fullScreenBox, {
                        duration: 400,
                        transition: c.FX.Transition.cubicOut,
                        onStart: (function() {
                            this.fullScreenBox.jSetCss({
                                position: "absolute",
                                width: n.width,
                                height: n.height,
                                top: m.top,
                                left: m.left
                            }).jAppendTo(document.body)
                        }).jBind(this),
                        onComplete: (function() {
                            this.selectors && this.selectors.show();
                            this.onExitFullScreen(true)
                        }).jBind(this)
                    })
                }
                this.fullScreenExitFX.start({
                    width: [n.width, this.boxSize.width],
                    height: [n.height, this.boxSize.height],
                    top: [0 + m.top, this.boxBoundaries.top],
                    left: [0 + m.left, this.boxBoundaries.left],
                    opacity: [1, 0.5]
                })
            }
        },
        onExitFullScreen: function(m) {
            if (!this.fullScreenBox) {
                return
            }
            this.prepareToFullScreen();
            this.enteringFullScreen = false;
            this.items.fullscreen = false;
            this.isFullScreen = false;
            this.items.fullscreen = false;
            this.container.append(this.slidesNode);
            if (this.selectors) {
                this.selectors.jAppendTo(this.container, "left" == this.o("selectors") ? "top" : this.o("selectors"))
            }
            this.fullScreenBox.hide();
            this.btnFullscreen.jRemoveClass("mss-button-fullscreen-exit").jAddClass("mss-button-fullscreen-enter").show();
            this.onResize();
            this.items.FSImageLoad(null, true);
            if (this.items.items[this.items.last].whatImg == "fullScreen" && this.items.items[this.items.last].defSize) {
                this.effect.kenburnsStop = false;
                this.replaceEffect && this.replaceEffect.stop();
                this.replaceEffect = new this.replaceImg(this.items.items[this.items.last], {
                    fullscreen: this.items.fullscreen,
                    prepareKenburn: (this.o("kenburns") ? this.prepareKenburn.jBind(this) : false)
                });
                this.replaceEffect.start(this.items.fullscreen, true, {
                    start: (this.o("kenburns") ? this.startKenburn.jBind(this) : false)
                })
            }
        },
        startKenburn: function() {
            this.effect.kenburns.start({
                start: this.effect._startEffectKenburns.jBind(this.effect),
                end: this.effect._endEffectKenburns.jBind(this.effect)
            })
        },
        prepareKenburn: function(m) {
            this.effect.prepareKenburns({
                kenburns: true,
                item: {
                    node: m.node,
                    index: m.index,
                    currentImg: (this.items.fullscreen ? m.fullScreenImg : m.smallImg)
                }
            })
        },
        replaceImg: (function() {
            var m = function(o, n) {
                this.item = o;
                this.els = [];
                this.moving = false;
                this.speed = 1600;
                this.prepareKen = n.prepareKenburn;
                this.effectFullscreen = n.fullscreen;
                this.replace = true;
                if (this.effectFullscreen && this.item.whatImg == "fullScreen" || !this.effectFullscreen && this.item.whatImg == "default") {
                    this.noEffect = true;
                    this.replace = false
                }
                if (this.effectFullscreen) {
                    this.type = "fullScreen";
                    this.els.push(this.item.smallImg);
                    this.els.push(this.item.fullScreenImg)
                } else {
                    this.type = "default";
                    if (this.item.smallImg) {
                        this.item.smallImg.show()
                    }
                    this.els.push(this.item.fullScreenImg);
                    this.els.push(this.item.smallImg)
                }
                if (!this.els[0] || c.jTypeOf(this.els[0]) == "string" || !this.els[1] || c.jTypeOf(this.els[1]) == "string") {
                    this.noEffect = true
                }
            };
            m.prototype = {
                render: function() {
                    this.els[0].offsetHeight;
                    this.els[1].offsetHeight
                },
                prepare: function() {
                    if (this.noEffect) {
                        return
                    }
                    this.els[0].jSetOpacity(1);
                    this.els[1].jSetOpacity(0);
                    this.els[0].jSetCss({
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        top: 0,
                        right: 0,
                        margin: "auto"
                    });
                    this.item.node.appendChild(this.els[1]);
                    this.prepareKen && this.prepareKen(this.item);
                    if (c.browser.ieMode && c.browser.ieMode < 10) {
                        this.FX = new c.PFX(this.els, {
                            duration: this.speed,
                            onComplete: h(function() {
                                this.moving = false;
                                this.startKenburn()
                            }).jBind(this)
                        })
                    } else {
                        this.render()
                    }
                },
                rejSetStyle: function() {
                    this.els[0].jSetCss({
                        transition: "",
                        position: "",
                        left: "",
                        bottom: "",
                        top: "",
                        right: "",
                        margin: ""
                    })
                },
                end: function() {
                    if (this.els[0].parentNode) {
                        this.els[0].jRemove()
                    }
                    this.els[0].jSetOpacity(1);
                    this.rejSetStyle();
                    this.els[1].jSetCssProp("transition", "")
                },
                cancel: function() {
                    this.rejSetStyle();
                    this.els[1].jSetOpacity(1);
                    this.els[1].jRemove();
                    this.item.whatImg = (this.type == "default") ? "fullScreen" : "default"
                },
                stop: function() {
                    if (this.noEffect || !this.moving) {
                        return
                    }
                    this.moving = false;
                    if (this.FX) {
                        this.FX.stop(true)
                    } else {
                        this.els[0].jRemoveEvent("transitionend");
                        this.els[1].jRemoveEvent("transitionend")
                    }
                    this.end()
                },
                startKenburn: function() {
                    if (this.prepareKen) {
                        this.ken && this.ken()
                    }
                },
                start: function(o, p, n) {
                    if (this.noEffect || this.one) {
                        return
                    }
                    this.one = true;
                    this.moving = true;
                    if (n) {
                        n.start && (this.ken = n.start)
                    }
                    this.prepare();
                    this.item.whatImg = this.type;
                    if (p) {
                        if (this.effectFullscreen == o) {
                            if (c.browser.ieMode && c.browser.ieMode < 10) {
                                this.FX.start([{
                                    opacity: [1, 0]
                                }, {
                                    opacity: [0, 1]
                                }])
                            } else {
                                this.els[this.type == "default" ? 0 : 1].jAddEvent("transitionend", h(function(q) {
                                    this.els[this.type == "default" ? 0 : 1].jRemoveEvent(q.type);
                                    this.moving = false;
                                    this.end();
                                    this.startKenburn()
                                }).jBind(this));
                                this.els[0].jSetCss({
                                    transition: "opacity" + String.fromCharCode(32) + this.speed + "ms",
                                    opacity: 0
                                });
                                this.els[1].jSetCss({
                                    transition: "opacity" + String.fromCharCode(32) + this.speed + "ms",
                                    opacity: 1
                                })
                            }
                        } else {
                            this.cancel();
                            this.noEffect = true
                        }
                    } else {
                        this.moving = false;
                        this.end();
                        this.els[1].jSetOpacity(1)
                    }
                }
            };
            return m
        })(),
        initDragOnSlider: function() {
            var I, u, m, M, E = false,
                v = "vertical" === this.o("orientation") ? "y" : "x",
                y = this.slidesWrapperNode.jGetSize()["y" == v ? "height" : "width"],
                O = y / 2,
                N = 30,
                G = 201,
                n, w = "",
                r = {},
                F, D = 0,
                K, x, H, L, B, J, q = (v == "x") ? "left" : "top",
                z, o = {
                    transition: a + String.fromCharCode(32) + "400ms cubic-bezier(.18,.35,.58,1)"
                },
                A = function(Q) {
                    var P = {
                        x: 0,
                        y: 0
                    };
                    (Q.jGetCss(a) || "").replace(/matrix\(([^\)]+)\)/, function(S, R) {
                        var p = R.split(",");
                        P.x += parseInt(p[4], 10);
                        P.y += parseInt(p[5])
                    });
                    return P
                },
                s = function(p) {
                    if (p) {
                        p.node.jSetCssProp(q, "").hide();
                        p = null
                    }
                },
                C = h(function(p) {
                    if (p.state == "dragstart") {
                        this.effect.stop();
                        this.textEffect && this.textEffect.stop();
                        this.autoScroll(true);
                        !this.l && (this.l = this.items.items.length);
                        this.slidesWrapperNode.jSetCssProp("transition", "");
                        this.slidesWrapperNode.jRemoveEvent("transitionend");
                        H = A(this.slidesWrapperNode);
                        this.slidesWrapperNode.jSetCssProp("transform", "translate3d(" + H.x + "px," + H.y + "px,0)");
                        this.wrapperPoint = H[v];
                        K = D;
                        r = {
                            x: p.x,
                            y: p.y,
                            ts: p.timeStamp
                        };
                        y = h(this.slidesWrapperNode).jGetSize()["y" == v ? "height" : "width"];
                        s(u);
                        s(m);
                        M = this.l < 3 ? false : this.o("loop");
                        !I && (I = this.items.items[this.items.last]);
                        m = (this.items.last - 1 < 0) ? (M) ? this.items.items[this.l - 1] : null : this.items.items[this.items.last - 1];
                        u = (this.items.last + 1 >= this.l) ? (M) ? this.items.items[0] : null : this.items.items[this.items.last + 1];
                        K *= (-1);
                        this.effect.prevKen = L;
                        if (m) {
                            m.node.jSetCssProp(q, (K - y) + "px").show();
                            if (this.o("kenburns") && m.img) {
                                B = new c.Effects.Kenburns(m.node, m.index, this.effect.prevKen)
                            }
                        }
                        if (u) {
                            u.node.jSetCssProp(q, (K + y) + "px").show();
                            if (this.o("kenburns") && u.img) {
                                J = new c.Effects.Kenburns(u.node, u.index, this.effect.prevKen)
                            }
                        }
                        I.node.jSetCssProp(q, K + "px").show();
                        I.node.jGetSize();
                        E = false
                    } else {
                        if (E) {
                            return
                        }
                        F = (p[v] - r[v]);
                        z = {
                            x: 0,
                            y: 0
                        };
                        if ("dragend" == p.state) {
                            if (E) {
                                return
                            }
                            n = p.timeStamp - r.ts;
                            if (Math.abs(F) > O || (n < G && Math.abs(F) > N)) {
                                if ((w = (F > 0 && m) ? "backward" : (F <= 0 && u) ? "forward" : "")) {
                                    this.stopEffect = true;
                                    x = I;
                                    if (w == "backward") {
                                        this.effect.item = m;
                                        D += y;
                                        I = m;
                                        m = x;
                                        L = B;
                                        B = null;
                                        J && J.recoverySize(true)
                                    } else {
                                        this.effect.item = u;
                                        D -= y;
                                        I = u;
                                        u = x;
                                        L = J;
                                        J = null;
                                        B && B.recoverySize(true)
                                    }
                                } else {}
                            }
                            z[v] = D;
                            this.slidesWrapperNode.jSetCssProp("transform", "translate3d(" + z.x + "px," + z.y + "px,0)");
                            this.slidesWrapperNode.jSetCss(o);
                            this.slidesWrapperNode.jAddEvent("transitionend", h(function(P) {
                                this.recoveryPositionAfterDrag()
                            }).jBind(this));
                            if (F == 0) {
                                s(u);
                                s(m)
                            }
                            x && this.jump({
                                target: w
                            });
                            x = null;
                            F = 0;
                            this.autoScroll();
                            return
                        }
                        if ("horizontal" == this.o("orientation") && Math.abs(F) > Math.abs(p.y - r.y) || "vertical" == this.o("orientation") && Math.abs(F) > Math.abs(p.x - r.x)) {
                            p.stopDefaults();
                            z[v] = this.wrapperPoint + F;
                            this.slidesWrapperNode.jSetCssProp("transform", "translate3d(" + z.x + "px," + z.y + "px,0)")
                        } else {
                            E = true;
                            s(m);
                            s(u);
                            this.recoveryPositionAfterDrag();
                            this.autoScroll()
                        }
                    }
                }).jBind(this);
            this.recoveryPositionAfterDrag = h(function() {
                this.slidesWrapperNode.jRemoveEvent("transitionend");
                this.slidesWrapperNode.jSetCssProp("transform", "translate3d(0,0,0)");
                this.slidesWrapperNode.jSetCssProp("transition", "");
                I && I.node.jSetCssProp(q, "");
                D = 0;
                this.wrapperPoint = 0;
                s(u);
                s(m);
                L && L.start({
                    start: this.effect._startEffectKenburns.jBind(this.effect),
                    end: this.effect._endEffectKenburns.jBind(this.effect)
                });
                J && J.recoverySize(true);
                B && B.recoverySize(true);
                this.effect.kenburns = L;
                u = null;
                m = null;
                I = null;
                this.stopEffect = false
            }).jBind(this);
            this.slidesWrapperNode.jSetCss("transform", "translate3d(0,0,0)");
            this.wrapperPoint = 0;
            this.slidesNode.jAddEvent("touchdrag", C)
        },
        initDragOnSelectors: function() {
            var q, s, v, z, r, A, m, w, u, n, p = 300,
                o = this.selectorsArrows ? ((this.selectorsArrows.prev.jGetCss("position") == "relative") ? true : false) : false,
                B = function(C) {
                    var y, x = 0;
                    for (y = 1.5; y <= 90; y += 1.5) {
                        x += (C * Math.cos(y / Math.PI / 2))
                    }(z < 0) && (x *= (-1));
                    return x
                };
            r = h(function(y) {
                var x = {
                    x: 0,
                    y: 0
                };
                !this.items.selectorsSize && (this.items.selectorsSize = this.selectors.jGetSize());
                q = "vertical" == this.selectorsSettings.orientation ? "y" : "x";
                v = this.items.selectorsSize[this.selectorsSettings.sides[1]] - this.items.wrapSelSize[this.selectorsSettings.sides[1]];
                o && (v -= (this.selectorsArrows.prev.jGetSize()[this.selectorsSettings.sides[1]] + this.selectorsArrows.next.jGetSize()[this.selectorsSettings.sides[1]]));
                if (y.state == "dragstart") {
                    (undefined == this.items.movePointThumbnails) && (this.items.movePointThumbnails = 0);
                    this.selectorsContainer.jSetCssProp("transition", a + String.fromCharCode(32) + "0ms");
                    A = y[q];
                    u = y.y;
                    w = y.x;
                    n = false
                } else {
                    if ("dragend" == y.state) {
                        if (n) {
                            return
                        }
                        m = B(Math.abs(z));
                        this.items.movePointThumbnails += m;
                        (this.items.movePointThumbnails >= 0) && (this.items.movePointThumbnails = 0);
                        (this.items.movePointThumbnails <= v) && (this.items.movePointThumbnails = v);
                        x[q] = this.items.movePointThumbnails;
                        this.selectorsContainer.jSetCssProp("transition", a + String.fromCharCode(32) + p + "ms cubic-bezier(.0,.0,.0,1)");
                        this.selectorsContainer.jSetCssProp("transform", "translate3d(" + x.x + "px," + x.y + "px,0px)");
                        z = 0
                    } else {
                        if (n) {
                            return
                        }
                        if ("horizontal" == this.selectorsSettings.orientation && Math.abs(y.x - w) > Math.abs(y.y - u) || "vertical" == this.selectorsSettings.orientation && Math.abs(y.x - w) < Math.abs(y.y - u)) {
                            y.stopDefaults();
                            z = y[q] - A;
                            this.items.movePointThumbnails += z;
                            x[q] = this.items.movePointThumbnails;
                            this.selectorsContainer.jSetCssProp("transform", "translate3d(" + x.x + "px," + x.y + "px,0px)");
                            if (this.items.movePointThumbnails >= 0) {
                                this.selectorsArrows.disable("prev")
                            } else {
                                this.selectorsArrows.enable("prev")
                            }
                            if (this.items.movePointThumbnails <= v) {
                                this.selectorsArrows.disable("next")
                            } else {
                                this.selectorsArrows.enable("next")
                            }
                        } else {
                            n = true
                        }
                    }
                    A = y[q]
                }
            }).jBind(this);
            this.selectorsContainer.jAddEvent("touchdrag", r)
        },
        autoScroll: function(o) {
            var m, n, p;
            clearTimeout(this.auto_);
            this.auto_ = null;
            if (!this.o("autoplay") || o || this.stopAutoScroll) {
                return
            }
            m = h(function() {
                n = Math.rand(0, this.items.items.length - 1);
                if (n == this.items.last) {
                    return m()
                } else {
                    return n
                }
            }).jBind(this);
            p = function() {
                this.jump({
                    target: (this.o("shuffle") ? m() : "forward"),
                    effect: this.o("effect"),
                    kenburns: this.o("kenburns")
                })
            };
            this.auto_ = setTimeout(p.jBind(this), this.o("slide-duration"))
        },
        play: function() {
            this.set("autoplay", true);
            this.stopAutoScroll = false;
            this.autoScroll();
            this.recoveryPositionAfterDrag && this.recoveryPositionAfterDrag();
            this.jump({
                target: "forward"
            })
        },
        pause: function() {
            this.set("autoplay", false);
            this.autoScroll(true);
            this.stopAutoScroll = true;
            this.auto_ && clearTimeout(this.auto_);
            this.auto_ = false
        },
        stop: function() {
            this.auto_ && clearTimeout(this.auto_);
            this.auto_ = false;
            this.effect && this.effect.stop();
            this.textEffect && this.textEffect.stop();
            this.replaceEffect && this.replaceEffect.stop();
            this.hold_ = false
        },
        next: function() {
            this.jump({
                target: "forward"
            })
        },
        previous: function() {
            this.jump({
                target: "backward"
            })
        },
        publicJump: function(m) {
            !this.itemsCount && (this.itemsCount = this.items.items.length);
            m -= 1;
            if (m >= 0 && m < this.itemsCount) {
                this.jump(m)
            }
        },
        dispose: function() {
            this.pause();
            var o = 0,
                n = this.cachedCSS.length,
                m;
            if (this.fullScreenBox) {
                this.fullScreenBox.kill();
                this.fullScreenBox = null
            }
            h(document).jRemoveEvent("keydown", this.keyboardCallback);
            h(window).jRemoveEvent("resize", this.resizeCallback);
            this.stop();
            h(this.originalNodes).jEach(function(q) {
                if (q.parentNode) {
                    h(q).jRemove()
                }
            });
            c.$A(this.container.childNodes).jEach(function(q) {
                h(q).kill()
            });
            h(this.container).jClearEvents().jRemoveClass().jAddClass(this.originalClasses);
            h(this.container).jSetCss({
                padding: ""
            });
            this.container.jDel("slideshow");
            h(this.originalNodes).jEach(function(q) {
                h(q).jAppendTo(this.container)
            }, this);
            for (; o < n; o++) {
                try {
                    c.removeCSS("magicslideshow-css-reset", this.cachedCSS[o])
                } catch (p) {}
            }
            return
        }
    };
    c.extend(b.prototype, c.customEvents);

    function d(o) {
        var m = null;
        if (o instanceof b) {
            m = o
        } else {
            if ("element" == c.jTypeOf(h(o))) {
                m = h(o).jFetch("slideshow")
            }
        }
        return m
    }
    var j = [],
        i = {
            version: "v2.0.30",
            options: {},
            extraOptions: {},
            extraOptionsMobile: {},
            dispose: function() {
                return j = h(j).filter(function(m) {
                    return m.dispose()
                })
            },
            start: function(u) {
                var s, q, p, r = c.extend(i.options, window.MagicSlideshowOptions || {}),
                    m = c.extend(i.extraOptions, window.MagicSlideshowExtraOptions || {});
                if (c.browser.touchScreen && c.browser.mobile) {
                    r = c.extend(r, window.MagicSlideshowOptionsMobile || {});
                    m = c.extend(m, window.MagicSlideshowExtraOptionsMobile || {})
                }
                if (arguments.length) {
                    p = d(u);
                    if (!p) {
                        s = c.extend({}, [r, m[u.id || u] || {}]);
                        j.push(new b(h(u), s))
                    }
                } else {
                    c.$A(document.byClass("MagicSlideshow")).map(h(function(o) {
                        return i.start(o)
                    }).jBind(this))
                }
            },
            stop: function(r) {
                var o, p, m, q = [];
                if (arguments.length) {
                    o = d(r);
                    if (o) {
                        for (p = 0, m = j.length; p < m; p++) {
                            if (j[p].$J_UUID != o.$J_UUID) {
                                q.push(j[p])
                            }
                        }
                        j = q;
                        o.dispose()
                    }
                } else {
                    i.dispose()
                }
            },
            refresh: function(m) {
                if (m) {
                    i.stop(h(m));
                    i.start(h(m))
                } else {
                    i.dispose();
                    i.start()
                }
            },
            play: function(o) {
                var m;
                if (o) {
                    m = d(o);
                    if (m) {
                        m.play()
                    }
                } else {
                    h(j).jEach(function(n) {
                        n.play()
                    })
                }
            },
            pause: function(o) {
                var m;
                if (o) {
                    m = d(o);
                    if (m) {
                        m.pause()
                    }
                } else {
                    h(j).jEach(function(n) {
                        n.pause()
                    })
                }
            },
            next: function(o) {
                var m;
                if (o) {
                    m = d(o);
                    if (m) {
                        m.next()
                    }
                } else {
                    h(j).jEach(function(n) {
                        n.next()
                    })
                }
            },
            prev: function(o) {
                var m;
                if (o) {
                    m = d(o);
                    if (m) {
                        m.previous()
                    }
                } else {
                    h(j).jEach(function(n) {
                        n.previous()
                    })
                }
            },
            jump: function(p, o) {
                var m;
                if (!o) {
                    return
                }
                if (p) {
                    m = d(p);
                    if (m) {
                        m.publicJump(o)
                    }
                } else {
                    h(j).jEach(function(n) {
                        n.publicJump(o)
                    })
                }
            },
            enterFullscreen: function(o) {
                var m;
                if (o) {
                    m = d(o);
                    if (m) {
                        m.enterFullScreen()
                    }
                }
            },
            exitFullscreen: function(o) {
                var m;
                if (o) {
                    m = d(o);
                    if (m) {
                        m.exitFullScreen()
                    }
                }
            },
            getActiveSlide: function(p) {
                var o = -1,
                    m;
                if (p) {
                    m = d(p);
                    if (m) {
                        o = m.items.last
                    }
                }
                return o
            }
        };
    h(document).jAddEvent("domready", function() {
        i.start()
    });
    return i
})();