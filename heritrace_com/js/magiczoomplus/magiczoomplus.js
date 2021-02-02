window.MagicZoom = (function() {
    var x, z;
    x = z = (function() {
        var T = {
            version: "v3.3-b3-10-g8c8a487",
            UUID: 0,
            storage: {},
            $uuid: function(X) {
                return (X.$J_UUID || (X.$J_UUID = ++N.UUID))
            },
            getStorage: function(X) {
                return (N.storage[X] || (N.storage[X] = {}))
            },
            $F: function() {},
            $false: function() {
                return false
            },
            $true: function() {
                return true
            },
            stylesId: "mjs-" + Math.floor(Math.random() * new Date().getTime()),
            defined: function(X) {
                return (undefined != X)
            },
            ifndef: function(Y, X) {
                return (undefined != Y) ? Y : X
            },
            exists: function(X) {
                return !!(X)
            },
            jTypeOf: function(X) {
                if (!N.defined(X)) {
                    return false
                }
                if (X.$J_TYPE) {
                    return X.$J_TYPE
                }
                if (!!X.nodeType) {
                    if (1 == X.nodeType) {
                        return "element"
                    }
                    if (3 == X.nodeType) {
                        return "textnode"
                    }
                }
                if (X.length && X.item) {
                    return "collection"
                }
                if (X.length && X.callee) {
                    return "arguments"
                }
                if ((X instanceof window.Object || X instanceof window.Function) && X.constructor === N.Class) {
                    return "class"
                }
                if (X instanceof window.Array) {
                    return "array"
                }
                if (X instanceof window.Function) {
                    return "function"
                }
                if (X instanceof window.String) {
                    return "string"
                }
                if (N.browser.trident) {
                    if (N.defined(X.cancelBubble)) {
                        return "event"
                    }
                } else {
                    if (X === window.event || X.constructor == window.Event || X.constructor == window.MouseEvent || X.constructor == window.UIEvent || X.constructor == window.KeyboardEvent || X.constructor == window.KeyEvent) {
                        return "event"
                    }
                }
                if (X instanceof window.Date) {
                    return "date"
                }
                if (X instanceof window.RegExp) {
                    return "regexp"
                }
                if (X === window) {
                    return "window"
                }
                if (X === document) {
                    return "document"
                }
                return typeof(X)
            },
            extend: function(ac, ab) {
                if (!(ac instanceof window.Array)) {
                    ac = [ac]
                }
                if (!ab) {
                    return ac[0]
                }
                for (var aa = 0, Y = ac.length; aa < Y; aa++) {
                    if (!N.defined(ac)) {
                        continue
                    }
                    for (var Z in ab) {
                        if (!Object.prototype.hasOwnProperty.call(ab, Z)) {
                            continue
                        }
                        try {
                            ac[aa][Z] = ab[Z]
                        } catch (X) {}
                    }
                }
                return ac[0]
            },
            implement: function(ab, aa) {
                if (!(ab instanceof window.Array)) {
                    ab = [ab]
                }
                for (var Z = 0, X = ab.length; Z < X; Z++) {
                    if (!N.defined(ab[Z])) {
                        continue
                    }
                    if (!ab[Z].prototype) {
                        continue
                    }
                    for (var Y in (aa || {})) {
                        if (!ab[Z].prototype[Y]) {
                            ab[Z].prototype[Y] = aa[Y]
                        }
                    }
                }
                return ab[0]
            },
            nativize: function(Z, Y) {
                if (!N.defined(Z)) {
                    return Z
                }
                for (var X in (Y || {})) {
                    if (!Z[X]) {
                        Z[X] = Y[X]
                    }
                }
                return Z
            },
            $try: function() {
                for (var Y = 0, X = arguments.length; Y < X; Y++) {
                    try {
                        return arguments[Y]()
                    } catch (Z) {}
                }
                return null
            },
            $A: function(Z) {
                if (!N.defined(Z)) {
                    return N.$([])
                }
                if (Z.toArray) {
                    return N.$(Z.toArray())
                }
                if (Z.item) {
                    var Y = Z.length || 0,
                        X = new Array(Y);
                    while (Y--) {
                        X[Y] = Z[Y]
                    }
                    return N.$(X)
                }
                return N.$(Array.prototype.slice.call(Z))
            },
            now: function() {
                return new Date().getTime()
            },
            detach: function(ab) {
                var Z;
                switch (N.jTypeOf(ab)) {
                    case "object":
                        Z = {};
                        for (var aa in ab) {
                            Z[aa] = N.detach(ab[aa])
                        }
                        break;
                    case "array":
                        Z = [];
                        for (var Y = 0, X = ab.length; Y < X; Y++) {
                            Z[Y] = N.detach(ab[Y])
                        }
                        break;
                    default:
                        return ab
                }
                return N.$(Z)
            },
            $: function(Z) {
                var X = true;
                if (!N.defined(Z)) {
                    return null
                }
                if (Z.$J_EXT) {
                    return Z
                }
                switch (N.jTypeOf(Z)) {
                    case "array":
                        Z = N.nativize(Z, N.extend(N.Array, {
                            $J_EXT: N.$F
                        }));
                        Z.jEach = Z.forEach;
                        return Z;
                        break;
                    case "string":
                        var Y = document.getElementById(Z);
                        if (N.defined(Y)) {
                            return N.$(Y)
                        }
                        return null;
                        break;
                    case "window":
                    case "document":
                        N.$uuid(Z);
                        Z = N.extend(Z, N.Doc);
                        break;
                    case "element":
                        N.$uuid(Z);
                        Z = N.extend(Z, N.Element);
                        break;
                    case "event":
                        Z = N.extend(Z, N.Event);
                        break;
                    case "textnode":
                    case "function":
                    case "array":
                    case "date":
                    default:
                        X = false;
                        break
                }
                if (X) {
                    return N.extend(Z, {
                        $J_EXT: N.$F
                    })
                } else {
                    return Z
                }
            },
            $new: function(X, Z, Y) {
                return N.$(N.doc.createElement(X)).setProps(Z || {}).jSetCss(Y || {})
            },
            addCSS: function(Y, aa, ae) {
                var ab, Z, ac, ad = [],
                    X = -1;
                ae || (ae = N.stylesId);
                ab = N.$(ae) || N.$new("style", {
                    id: ae,
                    type: "text/css"
                }).jAppendTo((document.head || document.body), "top");
                Z = ab.sheet || ab.styleSheet;
                if ("string" != N.jTypeOf(aa)) {
                    for (var ac in aa) {
                        ad.push(ac + ":" + aa[ac])
                    }
                    aa = ad.join(";")
                }
                if (Z.insertRule) {
                    X = Z.insertRule(Y + " {" + aa + "}", Z.cssRules.length)
                } else {
                    X = Z.addRule(Y, aa)
                }
                return X
            },
            removeCSS: function(aa, X) {
                var Z, Y;
                Z = N.$(aa);
                if ("element" !== N.jTypeOf(Z)) {
                    return
                }
                Y = Z.sheet || Z.styleSheet;
                if (Y.deleteRule) {
                    Y.deleteRule(X)
                } else {
                    if (Y.removeRule) {
                        Y.removeRule(X)
                    }
                }
            },
            generateUUID: function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(Z) {
                    var Y = Math.random() * 16 | 0,
                        X = Z == "x" ? Y : (Y & 3 | 8);
                    return X.toString(16)
                }).toUpperCase()
            },
            getAbsoluteURL: (function() {
                var X;
                return function(Y) {
                    if (!X) {
                        X = document.createElement("a")
                    }
                    X.setAttribute("href", Y);
                    return ("!!" + X.href).replace("!!", "")
                }
            })(),
            getHashCode: function(Z) {
                var aa = 0,
                    X = Z.length;
                for (var Y = 0; Y < X; ++Y) {
                    aa = 31 * aa + Z.charCodeAt(Y);
                    aa %= 4294967296
                }
                return aa
            }
        };
        var N = T;
        var O = T.$;
        if (!window.magicJS) {
            window.magicJS = T;
            window.$mjs = T.$
        }
        N.Array = {
            $J_TYPE: "array",
            indexOf: function(aa, ab) {
                var X = this.length;
                for (var Y = this.length, Z = (ab < 0) ? Math.max(0, Y + ab) : ab || 0; Z < Y; Z++) {
                    if (this[Z] === aa) {
                        return Z
                    }
                }
                return -1
            },
            contains: function(X, Y) {
                return this.indexOf(X, Y) != -1
            },
            forEach: function(X, aa) {
                for (var Z = 0, Y = this.length; Z < Y; Z++) {
                    if (Z in this) {
                        X.call(aa, this[Z], Z, this)
                    }
                }
            },
            filter: function(X, ac) {
                var ab = [];
                for (var aa = 0, Y = this.length; aa < Y; aa++) {
                    if (aa in this) {
                        var Z = this[aa];
                        if (X.call(ac, this[aa], aa, this)) {
                            ab.push(Z)
                        }
                    }
                }
                return ab
            },
            map: function(X, ab) {
                var aa = [];
                for (var Z = 0, Y = this.length; Z < Y; Z++) {
                    if (Z in this) {
                        aa[Z] = X.call(ab, this[Z], Z, this)
                    }
                }
                return aa
            }
        };
        N.implement(String, {
            $J_TYPE: "string",
            jTrim: function() {
                return this.replace(/^\s+|\s+$/g, "")
            },
            eq: function(X, Y) {
                return (Y || false) ? (this.toString() === X.toString()) : (this.toLowerCase().toString() === X.toLowerCase().toString())
            },
            jCamelize: function() {
                return this.replace(/-\D/g, function(X) {
                    return X.charAt(1).toUpperCase()
                })
            },
            dashize: function() {
                return this.replace(/[A-Z]/g, function(X) {
                    return ("-" + X.charAt(0).toLowerCase())
                })
            },
            jToInt: function(X) {
                return parseInt(this, X || 10)
            },
            toFloat: function() {
                return parseFloat(this)
            },
            jToBool: function() {
                return !this.replace(/true/i, "").jTrim()
            },
            has: function(Y, X) {
                X = X || "";
                return (X + this + X).indexOf(X + Y + X) > -1
            }
        });
        T.implement(Function, {
            $J_TYPE: "function",
            jBind: function() {
                var Y = N.$A(arguments),
                    X = this,
                    Z = Y.shift();
                return function() {
                    return X.apply(Z || null, Y.concat(N.$A(arguments)))
                }
            },
            jBindAsEvent: function() {
                var Y = N.$A(arguments),
                    X = this,
                    Z = Y.shift();
                return function(aa) {
                    return X.apply(Z || null, N.$([aa || (N.browser.ieMode ? window.event : null)]).concat(Y))
                }
            },
            jDelay: function() {
                var Y = N.$A(arguments),
                    X = this,
                    Z = Y.shift();
                return window.setTimeout(function() {
                    return X.apply(X, Y)
                }, Z || 0)
            },
            jDefer: function() {
                var Y = N.$A(arguments),
                    X = this;
                return function() {
                    return X.jDelay.apply(X, Y)
                }
            },
            interval: function() {
                var Y = N.$A(arguments),
                    X = this,
                    Z = Y.shift();
                return window.setInterval(function() {
                    return X.apply(X, Y)
                }, Z || 0)
            }
        });
        var U = {},
            M = navigator.userAgent.toLowerCase(),
            L = M.match(/(webkit|gecko|trident|presto)\/(\d+\.?\d*)/i),
            Q = M.match(/(edge|opr)\/(\d+\.?\d*)/i) || M.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i),
            S = M.match(/version\/(\d+\.?\d*)/i),
            H = document.documentElement.style;

        function I(Y) {
            var X = Y.charAt(0).toUpperCase() + Y.slice(1);
            return Y in H || ("Webkit" + X) in H || ("Moz" + X) in H || ("ms" + X) in H || ("O" + X) in H
        }
        N.browser = {
            features: {
                xpath: !!(document.evaluate),
                air: !!(window.runtime),
                query: !!(document.querySelector),
                fullScreen: !!(document.fullscreenEnabled || document.msFullscreenEnabled || document.exitFullscreen || document.cancelFullScreen || document.webkitexitFullscreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.oCancelFullScreen || document.msCancelFullScreen),
                xhr2: !!(window.ProgressEvent) && !!(window.FormData) && (window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
                transition: I("transition"),
                transform: I("transform"),
                perspective: I("perspective"),
                animation: I("animation"),
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
            mobile: M.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/) ? true : false,
            engine: (L && L[1]) ? L[1].toLowerCase() : (window.opera) ? "presto" : !!(window.ActiveXObject) ? "trident" : (undefined !== document.getBoxObjectFor || null != window.mozInnerScreenY) ? "gecko" : (null !== window.WebKitPoint || !navigator.taintEnabled) ? "webkit" : "unknown",
            version: (L && L[2]) ? parseFloat(L[2]) : 0,
            uaName: (Q && Q[1]) ? Q[1].toLowerCase() : "",
            uaVersion: (Q && Q[2]) ? parseFloat(Q[2]) : 0,
            cssPrefix: "",
            cssDomPrefix: "",
            domPrefix: "",
            ieMode: 0,
            platform: M.match(/ip(?:ad|od|hone)/) ? "ios" : (M.match(/(?:webos|android)/) || navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
            backCompat: document.compatMode && "backcompat" == document.compatMode.toLowerCase(),
            scrollbarsWidth: 0,
            getDoc: function() {
                return (document.compatMode && "backcompat" == document.compatMode.toLowerCase()) ? document.body : document.documentElement
            },
            requestAnimationFrame: window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || undefined,
            cancelAnimationFrame: window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || undefined,
            ready: false,
            onready: function() {
                if (N.browser.ready) {
                    return
                }
                var aa, Z;
                N.browser.ready = true;
                N.body = N.$(document.body);
                N.win = N.$(window);
                try {
                    var Y = N.$new("div").jSetCss({
                        width: 100,
                        height: 100,
                        overflow: "scroll",
                        position: "absolute",
                        top: -9999
                    }).jAppendTo(document.body);
                    N.browser.scrollbarsWidth = Y.offsetWidth - Y.clientWidth;
                    Y.jRemove()
                } catch (X) {}
                try {
                    aa = N.$new("div");
                    Z = aa.style;
                    Z.cssText = "background:url(https://),url(https://),red url(https://)";
                    N.browser.features.multibackground = (/(url\s*\(.*?){3}/).test(Z.background);
                    Z = null;
                    aa = null
                } catch (X) {}
                if (!N.browser.cssTransformProp) {
                    N.browser.cssTransformProp = N.normalizeCSS("transform").dashize()
                }
                try {
                    aa = N.$new("div");
                    aa.style.cssText = N.normalizeCSS("filter").dashize() + ":blur(2px);";
                    N.browser.features.cssFilters = !!aa.style.length && (!N.browser.ieMode || N.browser.ieMode > 9);
                    aa = null
                } catch (X) {}
                if (!N.browser.features.cssFilters) {
                    N.$(document.documentElement).jAddClass("no-cssfilters-magic")
                }
                if (undefined === window.TransitionEvent && undefined !== window.WebKitTransitionEvent) {
                    U.transitionend = "webkitTransitionEnd"
                }
                N.Doc.jCallEvent.call(N.$(document), "domready")
            }
        };
        (function() {
            var ab = [],
                aa, Z, Y;

            function X() {
                return !!(arguments.callee.caller)
            }
            switch (N.browser.engine) {
                case "trident":
                    if (!N.browser.version) {
                        N.browser.version = !!(window.XMLHttpRequest) ? 3 : 2
                    }
                    break;
                case "gecko":
                    N.browser.version = (Q && Q[2]) ? parseFloat(Q[2]) : 0;
                    break
            }
            N.browser[N.browser.engine] = true;
            if (Q && "crios" === Q[1]) {
                N.browser.uaName = "chrome"
            }
            if (!!window.chrome) {
                N.browser.chrome = true
            }
            if (Q && "opr" === Q[1]) {
                N.browser.uaName = "opera";
                N.browser.opera = true
            }
            if ("safari" === N.browser.uaName && (S && S[1])) {
                N.browser.uaVersion = parseFloat(S[1])
            }
            if ("android" == N.browser.platform && N.browser.webkit && (S && S[1])) {
                N.browser.androidBrowser = true
            }
            aa = ({
                gecko: ["-moz-", "Moz", "moz"],
                webkit: ["-webkit-", "Webkit", "webkit"],
                trident: ["-ms-", "ms", "ms"],
                presto: ["-o-", "O", "o"]
            })[N.browser.engine] || ["", "", ""];
            N.browser.cssPrefix = aa[0];
            N.browser.cssDomPrefix = aa[1];
            N.browser.domPrefix = aa[2];
            N.browser.ieMode = (!N.browser.trident) ? undefined : (document.documentMode) ? document.documentMode : function() {
                var ac = 0;
                if (N.browser.backCompat) {
                    return 5
                }
                switch (N.browser.version) {
                    case 2:
                        ac = 6;
                        break;
                    case 3:
                        ac = 7;
                        break
                }
                return ac
            }();
            ab.push(N.browser.platform + "-magic");
            if (N.browser.mobile) {
                ab.push("mobile-magic")
            }
            if (N.browser.androidBrowser) {
                ab.push("android-browser-magic")
            }
            if (N.browser.ieMode) {
                N.browser.uaName = "ie";
                N.browser.uaVersion = N.browser.ieMode;
                ab.push("ie" + N.browser.ieMode + "-magic");
                for (Z = 11; Z > N.browser.ieMode; Z--) {
                    ab.push("lt-ie" + Z + "-magic")
                }
            }
            if (N.browser.webkit && N.browser.version < 536) {
                N.browser.features.fullScreen = false
            }
            if (N.browser.requestAnimationFrame) {
                N.browser.requestAnimationFrame.call(window, function() {
                    N.browser.features.requestAnimationFrame = true
                })
            }
            if (N.browser.features.svg) {
                ab.push("svg-magic")
            } else {
                ab.push("no-svg-magic")
            }
            Y = (document.documentElement.className || "").match(/\S+/g) || [];
            document.documentElement.className = N.$(Y).concat(ab).join(" ");
            if (N.browser.ieMode && N.browser.ieMode < 9) {
                document.createElement("figure");
                document.createElement("figcaption")
            }
        })();
        (function() {
            N.browser.fullScreen = {
                capable: N.browser.features.fullScreen,
                enabled: function() {
                    return !!(document.fullscreenElement || document[N.browser.domPrefix + "FullscreenElement"] || document.fullScreen || document.webkitIsFullScreen || document[N.browser.domPrefix + "FullScreen"])
                },
                request: function(X, Y) {
                    Y || (Y = {});
                    if (this.capable) {
                        N.$(document).jAddEvent(this.changeEventName, this.onchange = function(Z) {
                            if (this.enabled()) {
                                Y.onEnter && Y.onEnter()
                            } else {
                                N.$(document).jRemoveEvent(this.changeEventName, this.onchange);
                                Y.onExit && Y.onExit()
                            }
                        }.jBindAsEvent(this));
                        N.$(document).jAddEvent(this.errorEventName, this.onerror = function(Z) {
                            Y.fallback && Y.fallback();
                            N.$(document).jRemoveEvent(this.errorEventName, this.onerror)
                        }.jBindAsEvent(this));
                        (X[N.browser.domPrefix + "RequestFullscreen"] || X[N.browser.domPrefix + "RequestFullScreen"] || X.requestFullscreen || function() {}).call(X)
                    } else {
                        if (Y.fallback) {
                            Y.fallback()
                        }
                    }
                },
                cancel: (document.exitFullscreen || document.cancelFullScreen || document[N.browser.domPrefix + "ExitFullscreen"] || document[N.browser.domPrefix + "CancelFullScreen"] || function() {}).jBind(document),
                changeEventName: document.msExitFullscreen ? "MSFullscreenChange" : (document.exitFullscreen ? "" : N.browser.domPrefix) + "fullscreenchange",
                errorEventName: document.msExitFullscreen ? "MSFullscreenError" : (document.exitFullscreen ? "" : N.browser.domPrefix) + "fullscreenerror",
                prefix: N.browser.domPrefix,
                activeElement: null
            }
        })();
        var W = /\S+/g,
            K = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/,
            P = {
                "float": ("undefined" === typeof(H.styleFloat)) ? "cssFloat" : "styleFloat"
            },
            R = {
                fontWeight: true,
                lineHeight: true,
                opacity: true,
                zIndex: true,
                zoom: true
            },
            J = (window.getComputedStyle) ? function(Z, X) {
                var Y = window.getComputedStyle(Z, null);
                return Y ? Y.getPropertyValue(X) || Y[X] : null
            } : function(aa, Y) {
                var Z = aa.currentStyle,
                    X = null;
                X = Z ? Z[Y] : null;
                if (null == X && aa.style && aa.style[Y]) {
                    X = aa.style[Y]
                }
                return X
            };

        function V(Z) {
            var X, Y;
            Y = (N.browser.webkit && "filter" == Z) ? false : (Z in H);
            if (!Y) {
                X = N.browser.cssDomPrefix + Z.charAt(0).toUpperCase() + Z.slice(1);
                if (X in H) {
                    return X
                }
            }
            return Z
        }
        N.normalizeCSS = V;
        N.Element = {
            jHasClass: function(X) {
                return !(X || "").has(" ") && (this.className || "").has(X, " ")
            },
            jAddClass: function(ab) {
                var Y = (this.className || "").match(W) || [],
                    aa = (ab || "").match(W) || [],
                    X = aa.length,
                    Z = 0;
                for (; Z < X; Z++) {
                    if (!N.$(Y).contains(aa[Z])) {
                        Y.push(aa[Z])
                    }
                }
                this.className = Y.join(" ");
                return this
            },
            jRemoveClass: function(ac) {
                var Y = (this.className || "").match(W) || [],
                    ab = (ac || "").match(W) || [],
                    X = ab.length,
                    aa = 0,
                    Z;
                for (; aa < X; aa++) {
                    if ((Z = N.$(Y).indexOf(ab[aa])) > -1) {
                        Y.splice(Z, 1)
                    }
                }
                this.className = ac ? Y.join(" ") : "";
                return this
            },
            jToggleClass: function(X) {
                return this.jHasClass(X) ? this.jRemoveClass(X) : this.jAddClass(X)
            },
            jGetCss: function(Y) {
                var Z = Y.jCamelize(),
                    X = null;
                Y = P[Z] || (P[Z] = V(Z));
                X = J(this, Y);
                if ("auto" === X) {
                    X = null
                }
                if (null !== X) {
                    if ("opacity" == Y) {
                        return N.defined(X) ? parseFloat(X) : 1
                    }
                    if (K.test(Y)) {
                        X = parseInt(X, 10) ? X : "0px"
                    }
                }
                return X
            },
            jSetCssProp: function(Y, X) {
                var aa = Y.jCamelize();
                try {
                    if ("opacity" == Y) {
                        this.jSetOpacity(X);
                        return this
                    }
                    Y = P[aa] || (P[aa] = V(aa));
                    this.style[Y] = X + (("number" == N.jTypeOf(X) && !R[aa]) ? "px" : "")
                } catch (Z) {}
                return this
            },
            jSetCss: function(Y) {
                for (var X in Y) {
                    this.jSetCssProp(X, Y[X])
                }
                return this
            },
            jGetStyles: function() {
                var X = {};
                N.$A(arguments).jEach(function(Y) {
                    X[Y] = this.jGetCss(Y)
                }, this);
                return X
            },
            jSetOpacity: function(Z, X) {
                var Y;
                X = X || false;
                this.style.opacity = Z;
                Z = parseInt(parseFloat(Z) * 100);
                if (X) {
                    if (0 === Z) {
                        if ("hidden" != this.style.visibility) {
                            this.style.visibility = "hidden"
                        }
                    } else {
                        if ("visible" != this.style.visibility) {
                            this.style.visibility = "visible"
                        }
                    }
                }
                if (N.browser.ieMode && N.browser.ieMode < 9) {
                    if (!isNaN(Z)) {
                        if (!~this.style.filter.indexOf("Alpha")) {
                            this.style.filter += " progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Z + ")"
                        } else {
                            this.style.filter = this.style.filter.replace(/Opacity=\d*/i, "Opacity=" + Z)
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
            setProps: function(X) {
                for (var Y in X) {
                    if ("class" === Y) {
                        this.jAddClass("" + X[Y])
                    } else {
                        this.setAttribute(Y, "" + X[Y])
                    }
                }
                return this
            },
            jGetTransitionDuration: function() {
                var Y = 0,
                    X = 0;
                Y = this.jGetCss("transition-duration");
                X = this.jGetCss("transition-delay");
                Y = Y.indexOf("ms") > -1 ? parseFloat(Y) : Y.indexOf("s") > -1 ? parseFloat(Y) * 1000 : 0;
                X = X.indexOf("ms") > -1 ? parseFloat(X) : X.indexOf("s") > -1 ? parseFloat(X) * 1000 : 0;
                return Y + X
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
            getInnerSize: function(Y) {
                var X = this.jGetSize();
                X.width -= (parseFloat(this.jGetCss("border-left-width") || 0) + parseFloat(this.jGetCss("border-right-width") || 0));
                X.height -= (parseFloat(this.jGetCss("border-top-width") || 0) + parseFloat(this.jGetCss("border-bottom-width") || 0));
                if (!Y) {
                    X.width -= (parseFloat(this.jGetCss("padding-left") || 0) + parseFloat(this.jGetCss("padding-right") || 0));
                    X.height -= (parseFloat(this.jGetCss("padding-top") || 0) + parseFloat(this.jGetCss("padding-bottom") || 0))
                }
                return X
            },
            jGetScroll: function() {
                return {
                    top: this.scrollTop,
                    left: this.scrollLeft
                }
            },
            jGetFullScroll: function() {
                var X = this,
                    Y = {
                        top: 0,
                        left: 0
                    };
                do {
                    Y.left += X.scrollLeft || 0;
                    Y.top += X.scrollTop || 0;
                    X = X.parentNode
                } while (X);
                return Y
            },
            jGetPosition: function() {
                var ab = this,
                    Y = 0,
                    aa = 0;
                if (N.defined(document.documentElement.getBoundingClientRect)) {
                    var X = this.getBoundingClientRect(),
                        Z = N.$(document).jGetScroll(),
                        ac = N.browser.getDoc();
                    return {
                        top: X.top + Z.y - ac.clientTop,
                        left: X.left + Z.x - ac.clientLeft
                    }
                }
                do {
                    Y += ab.offsetLeft || 0;
                    aa += ab.offsetTop || 0;
                    ab = ab.offsetParent
                } while (ab && !(/^(?:body|html)$/i).test(ab.tagName));
                return {
                    top: aa,
                    left: Y
                }
            },
            jGetRect: function() {
                var Y = this.jGetPosition();
                var X = this.jGetSize();
                return {
                    top: Y.top,
                    bottom: Y.top + X.height,
                    left: Y.left,
                    right: Y.left + X.width
                }
            },
            changeContent: function(Y) {
                try {
                    this.innerHTML = Y
                } catch (X) {
                    this.innerText = Y
                }
                return this
            },
            jRemove: function() {
                return (this.parentNode) ? this.parentNode.removeChild(this) : this
            },
            kill: function() {
                N.$A(this.childNodes).jEach(function(X) {
                    if (3 == X.nodeType || 8 == X.nodeType) {
                        return
                    }
                    N.$(X).kill()
                });
                this.jRemove();
                this.jClearEvents();
                if (this.$J_UUID) {
                    N.storage[this.$J_UUID] = null;
                    delete N.storage[this.$J_UUID]
                }
                return null
            },
            append: function(Z, Y) {
                Y = Y || "bottom";
                var X = this.firstChild;
                ("top" == Y && X) ? this.insertBefore(Z, X): this.appendChild(Z);
                return this
            },
            jAppendTo: function(Z, Y) {
                var X = N.$(Z).append(this, Y);
                return this
            },
            enclose: function(X) {
                this.append(X.parentNode.replaceChild(this, X));
                return this
            },
            hasChild: function(X) {
                if ("element" !== N.jTypeOf("string" == N.jTypeOf(X) ? X = document.getElementById(X) : X)) {
                    return false
                }
                return (this == X) ? false : (this.contains && !(N.browser.webkit419)) ? (this.contains(X)) : (this.compareDocumentPosition) ? !!(this.compareDocumentPosition(X) & 16) : N.$A(this.byTag(X.tagName)).contains(X)
            }
        };
        N.Element.jGetStyle = N.Element.jGetCss;
        N.Element.jSetStyle = N.Element.jSetCss;
        if (!window.Element) {
            window.Element = N.$F;
            if (N.browser.engine.webkit) {
                window.document.createElement("iframe")
            }
            window.Element.prototype = (N.browser.engine.webkit) ? window["[[DOMElement.prototype]]"] : {}
        }
        N.implement(window.Element, {
            $J_TYPE: "element"
        });
        N.Doc = {
            jGetSize: function() {
                if (N.browser.touchScreen || N.browser.presto925 || N.browser.webkit419) {
                    return {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }
                }
                return {
                    width: N.browser.getDoc().clientWidth,
                    height: N.browser.getDoc().clientHeight
                }
            },
            jGetScroll: function() {
                return {
                    x: window.pageXOffset || N.browser.getDoc().scrollLeft,
                    y: window.pageYOffset || N.browser.getDoc().scrollTop
                }
            },
            jGetFullSize: function() {
                var X = this.jGetSize();
                return {
                    width: Math.max(N.browser.getDoc().scrollWidth, X.width),
                    height: Math.max(N.browser.getDoc().scrollHeight, X.height)
                }
            }
        };
        N.extend(document, {
            $J_TYPE: "document"
        });
        N.extend(window, {
            $J_TYPE: "window"
        });
        N.extend([N.Element, N.Doc], {
            jFetch: function(aa, Y) {
                var X = N.getStorage(this.$J_UUID),
                    Z = X[aa];
                if (undefined !== Y && undefined === Z) {
                    Z = X[aa] = Y
                }
                return (N.defined(Z) ? Z : null)
            },
            jStore: function(Z, Y) {
                var X = N.getStorage(this.$J_UUID);
                X[Z] = Y;
                return this
            },
            jDel: function(Y) {
                var X = N.getStorage(this.$J_UUID);
                delete X[Y];
                return this
            }
        });
        if (!(window.HTMLElement && window.HTMLElement.prototype && window.HTMLElement.prototype.getElementsByClassName)) {
            N.extend([N.Element, N.Doc], {
                getElementsByClassName: function(X) {
                    return N.$A(this.getElementsByTagName("*")).filter(function(Z) {
                        try {
                            return (1 == Z.nodeType && Z.className.has(X, " "))
                        } catch (Y) {}
                    })
                }
            })
        }
        N.extend([N.Element, N.Doc], {
            byClass: function() {
                return this.getElementsByClassName(arguments[0])
            },
            byTag: function() {
                return this.getElementsByTagName(arguments[0])
            }
        });
        if (N.browser.fullScreen.capable && !document.requestFullScreen) {
            N.Element.requestFullScreen = function() {
                N.browser.fullScreen.request(this)
            }
        }
        N.Event = {
            $J_TYPE: "event",
            isQueueStopped: N.$false,
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
                this.isQueueStopped = N.$true;
                return this
            },
            getClientXY: function() {
                var Y, X;
                Y = ((/touch/i).test(this.type)) ? this.changedTouches[0] : this;
                return (!N.defined(Y)) ? {
                    x: 0,
                    y: 0
                } : {
                    x: Y.clientX,
                    y: Y.clientY
                }
            },
            jGetPageXY: function() {
                var Y, X;
                Y = ((/touch/i).test(this.type)) ? this.changedTouches[0] : this;
                return (!N.defined(Y)) ? {
                    x: 0,
                    y: 0
                } : {
                    x: Y.pageX || Y.clientX + N.browser.getDoc().scrollLeft,
                    y: Y.pageY || Y.clientY + N.browser.getDoc().scrollTop
                }
            },
            getTarget: function() {
                var X = this.target || this.srcElement;
                while (X && 3 == X.nodeType) {
                    X = X.parentNode
                }
                return X
            },
            getRelated: function() {
                var Y = null;
                switch (this.type) {
                    case "mouseover":
                    case "pointerover":
                    case "MSPointerOver":
                        Y = this.relatedTarget || this.fromElement;
                        break;
                    case "mouseout":
                    case "pointerout":
                    case "MSPointerOut":
                        Y = this.relatedTarget || this.toElement;
                        break;
                    default:
                        return Y
                }
                try {
                    while (Y && 3 == Y.nodeType) {
                        Y = Y.parentNode
                    }
                } catch (X) {
                    Y = null
                }
                return Y
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
        N._event_add_ = "addEventListener";
        N._event_del_ = "removeEventListener";
        N._event_prefix_ = "";
        if (!document.addEventListener) {
            N._event_add_ = "attachEvent";
            N._event_del_ = "detachEvent";
            N._event_prefix_ = "on"
        }
        N.Event.Custom = {
            type: "",
            x: null,
            y: null,
            timeStamp: null,
            button: null,
            target: null,
            relatedTarget: null,
            $J_TYPE: "event.custom",
            isQueueStopped: N.$false,
            events: N.$([]),
            pushToEvents: function(X) {
                var Y = X;
                this.events.push(Y)
            },
            stop: function() {
                return this.stopDistribution().stopDefaults()
            },
            stopDistribution: function() {
                this.events.jEach(function(Y) {
                    try {
                        Y.stopDistribution()
                    } catch (X) {}
                });
                return this
            },
            stopDefaults: function() {
                this.events.jEach(function(Y) {
                    try {
                        Y.stopDefaults()
                    } catch (X) {}
                });
                return this
            },
            stopQueue: function() {
                this.isQueueStopped = N.$true;
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
        N.extend([N.Element, N.Doc], {
            jAddEvent: function(Z, ab, ac, af) {
                var ae, X, aa, ad, Y;
                if ("string" == N.jTypeOf(Z)) {
                    Y = Z.split(" ");
                    if (Y.length > 1) {
                        Z = Y
                    }
                }
                if (N.jTypeOf(Z) == "array") {
                    N.$(Z).jEach(this.jAddEvent.jBindAsEvent(this, ab, ac, af));
                    return this
                }
                if (!Z || !ab || N.jTypeOf(Z) != "string" || N.jTypeOf(ab) != "function") {
                    return this
                }
                if (Z == "domready" && N.browser.ready) {
                    ab.call(this);
                    return this
                }
                Z = U[Z] || Z;
                ac = parseInt(ac || 50);
                if (!ab.$J_EUID) {
                    ab.$J_EUID = Math.floor(Math.random() * N.now())
                }
                ae = N.Doc.jFetch.call(this, "_EVENTS_", {});
                X = ae[Z];
                if (!X) {
                    ae[Z] = X = N.$([]);
                    aa = this;
                    if (N.Event.Custom[Z]) {
                        N.Event.Custom[Z].handler.add.call(this, af)
                    } else {
                        X.handle = function(ag) {
                            ag = N.extend(ag || window.e, {
                                $J_TYPE: "event"
                            });
                            N.Doc.jCallEvent.call(aa, Z, N.$(ag))
                        };
                        this[N._event_add_](N._event_prefix_ + Z, X.handle, false)
                    }
                }
                ad = {
                    type: Z,
                    fn: ab,
                    priority: ac,
                    euid: ab.$J_EUID
                };
                X.push(ad);
                X.sort(function(ah, ag) {
                    return ah.priority - ag.priority
                });
                return this
            },
            jRemoveEvent: function(ad) {
                var ab = N.Doc.jFetch.call(this, "_EVENTS_", {}),
                    Z, X, Y, ae, ac, aa;
                ac = arguments.length > 1 ? arguments[1] : -100;
                if ("string" == N.jTypeOf(ad)) {
                    aa = ad.split(" ");
                    if (aa.length > 1) {
                        ad = aa
                    }
                }
                if (N.jTypeOf(ad) == "array") {
                    N.$(ad).jEach(this.jRemoveEvent.jBindAsEvent(this, ac));
                    return this
                }
                ad = U[ad] || ad;
                if (!ad || N.jTypeOf(ad) != "string" || !ab || !ab[ad]) {
                    return this
                }
                Z = ab[ad] || [];
                for (Y = 0; Y < Z.length; Y++) {
                    X = Z[Y];
                    if (-100 == ac || !!ac && ac.$J_EUID === X.euid) {
                        ae = Z.splice(Y--, 1)
                    }
                }
                if (0 === Z.length) {
                    if (N.Event.Custom[ad]) {
                        N.Event.Custom[ad].handler.jRemove.call(this)
                    } else {
                        this[N._event_del_](N._event_prefix_ + ad, Z.handle, false)
                    }
                    delete ab[ad]
                }
                return this
            },
            jCallEvent: function(ab, ad) {
                var aa = N.Doc.jFetch.call(this, "_EVENTS_", {}),
                    Z, X, Y;
                ab = U[ab] || ab;
                if (!ab || N.jTypeOf(ab) != "string" || !aa || !aa[ab]) {
                    return this
                }
                try {
                    ad = N.extend(ad || {}, {
                        type: ab
                    })
                } catch (ac) {}
                if (undefined === ad.timeStamp) {
                    ad.timeStamp = N.now()
                }
                Z = aa[ab] || [];
                for (Y = 0; Y < Z.length && !(ad.isQueueStopped && ad.isQueueStopped()); Y++) {
                    Z[Y].fn.call(this, ad)
                }
            },
            jRaiseEvent: function(Y, X) {
                var ab = ("domready" == Y) ? false : true,
                    aa = this,
                    Z;
                Y = U[Y] || Y;
                if (!ab) {
                    N.Doc.jCallEvent.call(this, Y);
                    return this
                }
                if (aa === document && document.createEvent && !aa.dispatchEvent) {
                    aa = document.documentElement
                }
                if (document.createEvent) {
                    Z = document.createEvent(Y);
                    Z.initEvent(X, true, true)
                } else {
                    Z = document.createEventObject();
                    Z.eventType = Y
                }
                if (document.createEvent) {
                    aa.dispatchEvent(Z)
                } else {
                    aa.fireEvent("on" + X, Z)
                }
                return Z
            },
            jClearEvents: function() {
                var Y = N.Doc.jFetch.call(this, "_EVENTS_");
                if (!Y) {
                    return this
                }
                for (var X in Y) {
                    N.Doc.jRemoveEvent.call(this, X)
                }
                N.Doc.jDel.call(this, "_EVENTS_");
                return this
            }
        });
        (function(X) {
            if ("complete" === document.readyState) {
                return X.browser.onready.jDelay(1)
            }
            if (X.browser.webkit && X.browser.version < 420) {
                (function() {
                    (X.$(["loaded", "complete"]).contains(document.readyState)) ? X.browser.onready(): arguments.callee.jDelay(50)
                })()
            } else {
                if (X.browser.trident && X.browser.ieMode < 9 && window == top) {
                    (function() {
                        (X.$try(function() {
                            X.browser.getDoc().doScroll("left");
                            return true
                        })) ? X.browser.onready(): arguments.callee.jDelay(50)
                    })()
                } else {
                    X.Doc.jAddEvent.call(X.$(document), "DOMContentLoaded", X.browser.onready);
                    X.Doc.jAddEvent.call(X.$(window), "load", X.browser.onready)
                }
            }
        })(T);
        N.Class = function() {
            var ab = null,
                Y = N.$A(arguments);
            if ("class" == N.jTypeOf(Y[0])) {
                ab = Y.shift()
            }
            var X = function() {
                for (var ae in this) {
                    this[ae] = N.detach(this[ae])
                }
                if (this.constructor.$parent) {
                    this.$parent = {};
                    var ag = this.constructor.$parent;
                    for (var af in ag) {
                        var ad = ag[af];
                        switch (N.jTypeOf(ad)) {
                            case "function":
                                this.$parent[af] = N.Class.wrap(this, ad);
                                break;
                            case "object":
                                this.$parent[af] = N.detach(ad);
                                break;
                            case "array":
                                this.$parent[af] = N.detach(ad);
                                break
                        }
                    }
                }
                var ac = (this.init) ? this.init.apply(this, arguments) : this;
                delete this.caller;
                return ac
            };
            if (!X.prototype.init) {
                X.prototype.init = N.$F
            }
            if (ab) {
                var aa = function() {};
                aa.prototype = ab.prototype;
                X.prototype = new aa;
                X.$parent = {};
                for (var Z in ab.prototype) {
                    X.$parent[Z] = ab.prototype[Z]
                }
            } else {
                X.$parent = null
            }
            X.constructor = N.Class;
            X.prototype.constructor = X;
            N.extend(X.prototype, Y[0]);
            N.extend(X, {
                $J_TYPE: "class"
            });
            return X
        };
        T.Class.wrap = function(X, Y) {
            return function() {
                var aa = this.caller;
                var Z = Y.apply(X, arguments);
                return Z
            }
        };
        (function(aa) {
            var Z = aa.$;
            var X = 5,
                Y = 300;
            aa.Event.Custom.btnclick = new aa.Class(aa.extend(aa.Event.Custom, {
                type: "btnclick",
                init: function(ad, ac) {
                    var ab = ac.jGetPageXY();
                    this.x = ab.x;
                    this.y = ab.y;
                    this.clientX = ac.clientX;
                    this.clientY = ac.clientY;
                    this.timeStamp = ac.timeStamp;
                    this.button = ac.getButton();
                    this.target = ad;
                    this.pushToEvents(ac)
                }
            }));
            aa.Event.Custom.btnclick.handler = {
                options: {
                    threshold: Y,
                    button: 1
                },
                add: function(ab) {
                    this.jStore("event:btnclick:options", aa.extend(aa.detach(aa.Event.Custom.btnclick.handler.options), ab || {}));
                    this.jAddEvent("mousedown", aa.Event.Custom.btnclick.handler.handle, 1);
                    this.jAddEvent("mouseup", aa.Event.Custom.btnclick.handler.handle, 1);
                    this.jAddEvent("click", aa.Event.Custom.btnclick.handler.onclick, 1);
                    if (aa.browser.trident && aa.browser.ieMode < 9) {
                        this.jAddEvent("dblclick", aa.Event.Custom.btnclick.handler.handle, 1)
                    }
                },
                jRemove: function() {
                    this.jRemoveEvent("mousedown", aa.Event.Custom.btnclick.handler.handle);
                    this.jRemoveEvent("mouseup", aa.Event.Custom.btnclick.handler.handle);
                    this.jRemoveEvent("click", aa.Event.Custom.btnclick.handler.onclick);
                    if (aa.browser.trident && aa.browser.ieMode < 9) {
                        this.jRemoveEvent("dblclick", aa.Event.Custom.btnclick.handler.handle)
                    }
                },
                onclick: function(ab) {
                    ab.stopDefaults()
                },
                handle: function(ae) {
                    var ad, ab, ac;
                    ab = this.jFetch("event:btnclick:options");
                    if (ae.type != "dblclick" && ae.getButton() != ab.button) {
                        return
                    }
                    if (this.jFetch("event:btnclick:ignore")) {
                        this.jDel("event:btnclick:ignore");
                        return
                    }
                    if ("mousedown" == ae.type) {
                        ad = new aa.Event.Custom.btnclick(this, ae);
                        this.jStore("event:btnclick:btnclickEvent", ad)
                    } else {
                        if ("mouseup" == ae.type) {
                            ad = this.jFetch("event:btnclick:btnclickEvent");
                            if (!ad) {
                                return
                            }
                            ac = ae.jGetPageXY();
                            this.jDel("event:btnclick:btnclickEvent");
                            ad.pushToEvents(ae);
                            if (ae.timeStamp - ad.timeStamp <= ab.threshold && Math.sqrt(Math.pow(ac.x - ad.x, 2) + Math.pow(ac.y - ad.y, 2)) <= X) {
                                this.jCallEvent("btnclick", ad)
                            }
                            document.jCallEvent("mouseup", ae)
                        } else {
                            if (ae.type == "dblclick") {
                                ad = new aa.Event.Custom.btnclick(this, ae);
                                this.jCallEvent("btnclick", ad)
                            }
                        }
                    }
                }
            }
        })(T);
        (function(Y) {
            var X = Y.$;
            Y.Event.Custom.mousedrag = new Y.Class(Y.extend(Y.Event.Custom, {
                type: "mousedrag",
                state: "dragstart",
                dragged: false,
                init: function(ac, ab, aa) {
                    var Z = ab.jGetPageXY();
                    this.x = Z.x;
                    this.y = Z.y;
                    this.clientX = ab.clientX;
                    this.clientY = ab.clientY;
                    this.timeStamp = ab.timeStamp;
                    this.button = ab.getButton();
                    this.target = ac;
                    this.pushToEvents(ab);
                    this.state = aa
                }
            }));
            Y.Event.Custom.mousedrag.handler = {
                add: function() {
                    var aa = Y.Event.Custom.mousedrag.handler.handleMouseMove.jBindAsEvent(this),
                        Z = Y.Event.Custom.mousedrag.handler.handleMouseUp.jBindAsEvent(this);
                    this.jAddEvent("mousedown", Y.Event.Custom.mousedrag.handler.handleMouseDown, 1);
                    this.jAddEvent("mouseup", Y.Event.Custom.mousedrag.handler.handleMouseUp, 1);
                    document.jAddEvent("mousemove", aa, 1);
                    document.jAddEvent("mouseup", Z, 1);
                    this.jStore("event:mousedrag:listeners:document:move", aa);
                    this.jStore("event:mousedrag:listeners:document:end", Z)
                },
                jRemove: function() {
                    this.jRemoveEvent("mousedown", Y.Event.Custom.mousedrag.handler.handleMouseDown);
                    this.jRemoveEvent("mouseup", Y.Event.Custom.mousedrag.handler.handleMouseUp);
                    X(document).jRemoveEvent("mousemove", this.jFetch("event:mousedrag:listeners:document:move") || Y.$F);
                    X(document).jRemoveEvent("mouseup", this.jFetch("event:mousedrag:listeners:document:end") || Y.$F);
                    this.jDel("event:mousedrag:listeners:document:move");
                    this.jDel("event:mousedrag:listeners:document:end")
                },
                handleMouseDown: function(aa) {
                    var Z;
                    if (1 != aa.getButton()) {
                        return
                    }
                    aa.stopDefaults();
                    Z = new Y.Event.Custom.mousedrag(this, aa, "dragstart");
                    this.jStore("event:mousedrag:dragstart", Z)
                },
                handleMouseUp: function(aa) {
                    var Z;
                    Z = this.jFetch("event:mousedrag:dragstart");
                    if (!Z) {
                        return
                    }
                    aa.stopDefaults();
                    Z = new Y.Event.Custom.mousedrag(this, aa, "dragend");
                    this.jDel("event:mousedrag:dragstart");
                    this.jCallEvent("mousedrag", Z)
                },
                handleMouseMove: function(aa) {
                    var Z;
                    Z = this.jFetch("event:mousedrag:dragstart");
                    if (!Z) {
                        return
                    }
                    aa.stopDefaults();
                    if (!Z.dragged) {
                        Z.dragged = true;
                        this.jCallEvent("mousedrag", Z)
                    }
                    Z = new Y.Event.Custom.mousedrag(this, aa, "dragmove");
                    this.jCallEvent("mousedrag", Z)
                }
            }
        })(T);
        (function(Y) {
            var X = Y.$;
            Y.Event.Custom.dblbtnclick = new Y.Class(Y.extend(Y.Event.Custom, {
                type: "dblbtnclick",
                timedout: false,
                tm: null,
                init: function(ab, aa) {
                    var Z = aa.jGetPageXY();
                    this.x = Z.x;
                    this.y = Z.y;
                    this.clientX = aa.clientX;
                    this.clientY = aa.clientY;
                    this.timeStamp = aa.timeStamp;
                    this.button = aa.getButton();
                    this.target = ab;
                    this.pushToEvents(aa)
                }
            }));
            Y.Event.Custom.dblbtnclick.handler = {
                options: {
                    threshold: 200
                },
                add: function(Z) {
                    this.jStore("event:dblbtnclick:options", Y.extend(Y.detach(Y.Event.Custom.dblbtnclick.handler.options), Z || {}));
                    this.jAddEvent("btnclick", Y.Event.Custom.dblbtnclick.handler.handle, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent("btnclick", Y.Event.Custom.dblbtnclick.handler.handle)
                },
                handle: function(ab) {
                    var aa, Z;
                    aa = this.jFetch("event:dblbtnclick:event");
                    Z = this.jFetch("event:dblbtnclick:options");
                    if (!aa) {
                        aa = new Y.Event.Custom.dblbtnclick(this, ab);
                        aa.tm = setTimeout(function() {
                            aa.timedout = true;
                            ab.isQueueStopped = Y.$false;
                            this.jCallEvent("btnclick", ab);
                            this.jDel("event:dblbtnclick:event")
                        }.jBind(this), Z.threshold + 10);
                        this.jStore("event:dblbtnclick:event", aa);
                        ab.stopQueue()
                    } else {
                        clearTimeout(aa.tm);
                        this.jDel("event:dblbtnclick:event");
                        if (!aa.timedout) {
                            aa.pushToEvents(ab);
                            ab.stopQueue().stop();
                            this.jCallEvent("dblbtnclick", aa)
                        } else {}
                    }
                }
            }
        })(T);
        (function(ad) {
            var ac = ad.$;

            function X(ae) {
                return ae.pointerType ? (("touch" === ae.pointerType || ae.MSPOINTER_TYPE_TOUCH === ae.pointerType) && ae.isPrimary) : 1 === ae.changedTouches.length && (ae.targetTouches.length ? ae.targetTouches[0].identifier == ae.changedTouches[0].identifier : true)
            }

            function Z(ae) {
                if (ae.pointerType) {
                    return ("touch" === ae.pointerType || ae.MSPOINTER_TYPE_TOUCH === ae.pointerType) ? ae.pointerId : null
                } else {
                    return ae.changedTouches[0].identifier
                }
            }

            function aa(ae) {
                if (ae.pointerType) {
                    return ("touch" === ae.pointerType || ae.MSPOINTER_TYPE_TOUCH === ae.pointerType) ? ae : null
                } else {
                    return ae.changedTouches[0]
                }
            }
            ad.Event.Custom.tap = new ad.Class(ad.extend(ad.Event.Custom, {
                type: "tap",
                id: null,
                init: function(af, ae) {
                    var ag = aa(ae);
                    this.id = ag.pointerId || ag.identifier;
                    this.x = ag.pageX;
                    this.y = ag.pageY;
                    this.pageX = ag.pageX;
                    this.pageY = ag.pageY;
                    this.clientX = ag.clientX;
                    this.clientY = ag.clientY;
                    this.timeStamp = ae.timeStamp;
                    this.button = 0;
                    this.target = af;
                    this.pushToEvents(ae)
                }
            }));
            var Y = 10,
                ab = 200;
            ad.Event.Custom.tap.handler = {
                add: function(ae) {
                    this.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], ad.Event.Custom.tap.handler.onTouchStart, 1);
                    this.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], ad.Event.Custom.tap.handler.onTouchEnd, 1);
                    this.jAddEvent("click", ad.Event.Custom.tap.handler.onClick, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], ad.Event.Custom.tap.handler.onTouchStart);
                    this.jRemoveEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], ad.Event.Custom.tap.handler.onTouchEnd);
                    this.jRemoveEvent("click", ad.Event.Custom.tap.handler.onClick)
                },
                onClick: function(ae) {
                    ae.stopDefaults()
                },
                onTouchStart: function(ae) {
                    if (!X(ae)) {
                        this.jDel("event:tap:event");
                        return
                    }
                    this.jStore("event:tap:event", new ad.Event.Custom.tap(this, ae));
                    this.jStore("event:btnclick:ignore", true)
                },
                onTouchEnd: function(ah) {
                    var af = ad.now(),
                        ag = this.jFetch("event:tap:event"),
                        ae = this.jFetch("event:tap:options");
                    if (!ag || !X(ah)) {
                        return
                    }
                    this.jDel("event:tap:event");
                    if (ag.id == Z(ah) && ah.timeStamp - ag.timeStamp <= ab && Math.sqrt(Math.pow(aa(ah).pageX - ag.x, 2) + Math.pow(aa(ah).pageY - ag.y, 2)) <= Y) {
                        this.jDel("event:btnclick:btnclickEvent");
                        ah.stop();
                        ag.pushToEvents(ah);
                        this.jCallEvent("tap", ag)
                    }
                }
            }
        })(T);
        N.Event.Custom.dbltap = new N.Class(N.extend(N.Event.Custom, {
            type: "dbltap",
            timedout: false,
            tm: null,
            init: function(Y, X) {
                this.x = X.x;
                this.y = X.y;
                this.clientX = X.clientX;
                this.clientY = X.clientY;
                this.timeStamp = X.timeStamp;
                this.button = 0;
                this.target = Y;
                this.pushToEvents(X)
            }
        }));
        N.Event.Custom.dbltap.handler = {
            options: {
                threshold: 300
            },
            add: function(X) {
                this.jStore("event:dbltap:options", N.extend(N.detach(N.Event.Custom.dbltap.handler.options), X || {}));
                this.jAddEvent("tap", N.Event.Custom.dbltap.handler.handle, 1)
            },
            jRemove: function() {
                this.jRemoveEvent("tap", N.Event.Custom.dbltap.handler.handle)
            },
            handle: function(Z) {
                var Y, X;
                Y = this.jFetch("event:dbltap:event");
                X = this.jFetch("event:dbltap:options");
                if (!Y) {
                    Y = new N.Event.Custom.dbltap(this, Z);
                    Y.tm = setTimeout(function() {
                        Y.timedout = true;
                        Z.isQueueStopped = N.$false;
                        this.jCallEvent("tap", Z)
                    }.jBind(this), X.threshold + 10);
                    this.jStore("event:dbltap:event", Y);
                    Z.stopQueue()
                } else {
                    clearTimeout(Y.tm);
                    this.jDel("event:dbltap:event");
                    if (!Y.timedout) {
                        Y.pushToEvents(Z);
                        Z.stopQueue().stop();
                        this.jCallEvent("dbltap", Y)
                    } else {}
                }
            }
        };
        (function(ac) {
            var ab = ac.$;

            function X(ad) {
                return ad.pointerType ? (("touch" === ad.pointerType || ad.MSPOINTER_TYPE_TOUCH === ad.pointerType) && ad.isPrimary) : 1 === ad.changedTouches.length && (ad.targetTouches.length ? ad.targetTouches[0].identifier == ad.changedTouches[0].identifier : true)
            }

            function Z(ad) {
                if (ad.pointerType) {
                    return ("touch" === ad.pointerType || ad.MSPOINTER_TYPE_TOUCH === ad.pointerType) ? ad.pointerId : null
                } else {
                    return ad.changedTouches[0].identifier
                }
            }

            function aa(ad) {
                if (ad.pointerType) {
                    return ("touch" === ad.pointerType || ad.MSPOINTER_TYPE_TOUCH === ad.pointerType) ? ad : null
                } else {
                    return ad.changedTouches[0]
                }
            }
            var Y = 10;
            ac.Event.Custom.touchdrag = new ac.Class(ac.extend(ac.Event.Custom, {
                type: "touchdrag",
                state: "dragstart",
                id: null,
                dragged: false,
                init: function(af, ae, ad) {
                    var ag = aa(ae);
                    this.id = ag.pointerId || ag.identifier;
                    this.clientX = ag.clientX;
                    this.clientY = ag.clientY;
                    this.pageX = ag.pageX;
                    this.pageY = ag.pageY;
                    this.x = ag.pageX;
                    this.y = ag.pageY;
                    this.timeStamp = ae.timeStamp;
                    this.button = 0;
                    this.target = af;
                    this.pushToEvents(ae);
                    this.state = ad
                }
            }));
            ac.Event.Custom.touchdrag.handler = {
                add: function() {
                    var ae = ac.Event.Custom.touchdrag.handler.onTouchMove.jBind(this),
                        ad = ac.Event.Custom.touchdrag.handler.onTouchEnd.jBind(this);
                    this.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], ac.Event.Custom.touchdrag.handler.onTouchStart, 1);
                    this.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], ac.Event.Custom.touchdrag.handler.onTouchEnd, 1);
                    this.jAddEvent(["touchmove", window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove"], ac.Event.Custom.touchdrag.handler.onTouchMove, 1);
                    this.jStore("event:touchdrag:listeners:document:move", ae);
                    this.jStore("event:touchdrag:listeners:document:end", ad);
                    ab(document).jAddEvent(window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove", ae, 1);
                    ab(document).jAddEvent(window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp", ad, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], ac.Event.Custom.touchdrag.handler.onTouchStart);
                    this.jRemoveEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], ac.Event.Custom.touchdrag.handler.onTouchEnd);
                    this.jRemoveEvent(["touchmove", window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove"], ac.Event.Custom.touchdrag.handler.onTouchMove);
                    ab(document).jRemoveEvent(window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove", this.jFetch("event:touchdrag:listeners:document:move") || ac.$F, 1);
                    ab(document).jRemoveEvent(window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp", this.jFetch("event:touchdrag:listeners:document:end") || ac.$F, 1);
                    this.jDel("event:touchdrag:listeners:document:move");
                    this.jDel("event:touchdrag:listeners:document:end")
                },
                onTouchStart: function(ae) {
                    var ad;
                    if (!X(ae)) {
                        return
                    }
                    ad = new ac.Event.Custom.touchdrag(this, ae, "dragstart");
                    this.jStore("event:touchdrag:dragstart", ad)
                },
                onTouchEnd: function(ae) {
                    var ad;
                    ad = this.jFetch("event:touchdrag:dragstart");
                    if (!ad || !ad.dragged || ad.id != Z(ae)) {
                        return
                    }
                    ad = new ac.Event.Custom.touchdrag(this, ae, "dragend");
                    this.jDel("event:touchdrag:dragstart");
                    this.jCallEvent("touchdrag", ad)
                },
                onTouchMove: function(ae) {
                    var ad;
                    ad = this.jFetch("event:touchdrag:dragstart");
                    if (!ad || !X(ae)) {
                        return
                    }
                    if (ad.id != Z(ae)) {
                        this.jDel("event:touchdrag:dragstart");
                        return
                    }
                    if (!ad.dragged && Math.sqrt(Math.pow(aa(ae).pageX - ad.x, 2) + Math.pow(aa(ae).pageY - ad.y, 2)) > Y) {
                        ad.dragged = true;
                        this.jCallEvent("touchdrag", ad)
                    }
                    if (!ad.dragged) {
                        return
                    }
                    ad = new ac.Event.Custom.touchdrag(this, ae, "dragmove");
                    this.jCallEvent("touchdrag", ad)
                }
            }
        })(T);
        N.Event.Custom.touchpinch = new N.Class(N.extend(N.Event.Custom, {
            type: "touchpinch",
            scale: 1,
            previousScale: 1,
            curScale: 1,
            state: "pinchstart",
            init: function(Y, X) {
                this.timeStamp = X.timeStamp;
                this.button = 0;
                this.target = Y;
                this.x = X.touches[0].clientX + (X.touches[1].clientX - X.touches[0].clientX) / 2;
                this.y = X.touches[0].clientY + (X.touches[1].clientY - X.touches[0].clientY) / 2;
                this._initialDistance = Math.sqrt(Math.pow(X.touches[0].clientX - X.touches[1].clientX, 2) + Math.pow(X.touches[0].clientY - X.touches[1].clientY, 2));
                this.pushToEvents(X)
            },
            update: function(X) {
                var Y;
                this.state = "pinchupdate";
                if (X.changedTouches[0].identifier != this.events[0].touches[0].identifier || X.changedTouches[1].identifier != this.events[0].touches[1].identifier) {
                    return
                }
                Y = Math.sqrt(Math.pow(X.changedTouches[0].clientX - X.changedTouches[1].clientX, 2) + Math.pow(X.changedTouches[0].clientY - X.changedTouches[1].clientY, 2));
                this.previousScale = this.scale;
                this.scale = Y / this._initialDistance;
                this.curScale = this.scale / this.previousScale;
                this.x = X.changedTouches[0].clientX + (X.changedTouches[1].clientX - X.changedTouches[0].clientX) / 2;
                this.y = X.changedTouches[0].clientY + (X.changedTouches[1].clientY - X.changedTouches[0].clientY) / 2;
                this.pushToEvents(X)
            }
        }));
        N.Event.Custom.touchpinch.handler = {
            add: function() {
                this.jAddEvent("touchstart", N.Event.Custom.touchpinch.handler.handleTouchStart, 1);
                this.jAddEvent("touchend", N.Event.Custom.touchpinch.handler.handleTouchEnd, 1);
                this.jAddEvent("touchmove", N.Event.Custom.touchpinch.handler.handleTouchMove, 1)
            },
            jRemove: function() {
                this.jRemoveEvent("touchstart", N.Event.Custom.touchpinch.handler.handleTouchStart);
                this.jRemoveEvent("touchend", N.Event.Custom.touchpinch.handler.handleTouchEnd);
                this.jRemoveEvent("touchmove", N.Event.Custom.touchpinch.handler.handleTouchMove)
            },
            handleTouchStart: function(Y) {
                var X;
                if (Y.touches.length != 2) {
                    return
                }
                Y.stopDefaults();
                X = new N.Event.Custom.touchpinch(this, Y);
                this.jStore("event:touchpinch:event", X)
            },
            handleTouchEnd: function(Y) {
                var X;
                X = this.jFetch("event:touchpinch:event");
                if (!X) {
                    return
                }
                Y.stopDefaults();
                this.jDel("event:touchpinch:event")
            },
            handleTouchMove: function(Y) {
                var X;
                X = this.jFetch("event:touchpinch:event");
                if (!X) {
                    return
                }
                Y.stopDefaults();
                X.update(Y);
                this.jCallEvent("touchpinch", X)
            }
        };
        (function(ac) {
            var aa = ac.$;
            ac.Event.Custom.mousescroll = new ac.Class(ac.extend(ac.Event.Custom, {
                type: "mousescroll",
                init: function(ai, ah, ak, ae, ad, aj, af) {
                    var ag = ah.jGetPageXY();
                    this.x = ag.x;
                    this.y = ag.y;
                    this.timeStamp = ah.timeStamp;
                    this.target = ai;
                    this.delta = ak || 0;
                    this.deltaX = ae || 0;
                    this.deltaY = ad || 0;
                    this.deltaZ = aj || 0;
                    this.deltaFactor = af || 0;
                    this.deltaMode = ah.deltaMode || 0;
                    this.isMouse = false;
                    this.pushToEvents(ah)
                }
            }));
            var ab, Y;

            function X() {
                ab = null
            }

            function Z(ad, ae) {
                return (ad > 50) || (1 === ae && !("win" == ac.browser.platform && ad < 1)) || (0 === ad % 12) || (0 == ad % 4.000244140625)
            }
            ac.Event.Custom.mousescroll.handler = {
                eventType: "onwheel" in document || ac.browser.ieMode > 8 ? "wheel" : "mousewheel",
                add: function() {
                    this.jAddEvent(ac.Event.Custom.mousescroll.handler.eventType, ac.Event.Custom.mousescroll.handler.handle, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(ac.Event.Custom.mousescroll.handler.eventType, ac.Event.Custom.mousescroll.handler.handle, 1)
                },
                handle: function(ai) {
                    var aj = 0,
                        ag = 0,
                        ae = 0,
                        ad = 0,
                        ah, af;
                    if (ai.detail) {
                        ae = ai.detail * -1
                    }
                    if (ai.wheelDelta !== undefined) {
                        ae = ai.wheelDelta
                    }
                    if (ai.wheelDeltaY !== undefined) {
                        ae = ai.wheelDeltaY
                    }
                    if (ai.wheelDeltaX !== undefined) {
                        ag = ai.wheelDeltaX * -1
                    }
                    if (ai.deltaY) {
                        ae = -1 * ai.deltaY
                    }
                    if (ai.deltaX) {
                        ag = ai.deltaX
                    }
                    if (0 === ae && 0 === ag) {
                        return
                    }
                    aj = 0 === ae ? ag : ae;
                    ad = Math.max(Math.abs(ae), Math.abs(ag));
                    if (!ab || ad < ab) {
                        ab = ad
                    }
                    ah = aj > 0 ? "floor" : "ceil";
                    aj = Math[ah](aj / ab);
                    ag = Math[ah](ag / ab);
                    ae = Math[ah](ae / ab);
                    if (Y) {
                        clearTimeout(Y)
                    }
                    Y = setTimeout(X, 200);
                    af = new ac.Event.Custom.mousescroll(this, ai, aj, ag, ae, 0, ab);
                    af.isMouse = Z(ab, ai.deltaMode || 0);
                    this.jCallEvent("mousescroll", af)
                }
            }
        })(T);
        N.win = N.$(window);
        N.doc = N.$(document);
        return T
    })();
    (function(J) {
        if (!J) {
            throw "MagicJS not found"
        }
        var I = J.$;
        var H = window.URL || window.webkitURL || null;
        x.ImageLoader = new J.Class({
            img: null,
            ready: false,
            options: {
                onprogress: J.$F,
                onload: J.$F,
                onabort: J.$F,
                onerror: J.$F,
                oncomplete: J.$F,
                onxhrerror: J.$F,
                xhr: false,
                progressiveLoad: true
            },
            size: null,
            _timer: null,
            loadedBytes: 0,
            _handlers: {
                onprogress: function(K) {
                    if (K.target && (200 === K.target.status || 304 === K.target.status) && K.lengthComputable) {
                        this.options.onprogress.jBind(null, (K.loaded - (this.options.progressiveLoad ? this.loadedBytes : 0)) / K.total).jDelay(1);
                        this.loadedBytes = K.loaded
                    }
                },
                onload: function(K) {
                    if (K) {
                        I(K).stop()
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
                onabort: function(K) {
                    if (K) {
                        I(K).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onabort.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onerror: function(K) {
                    if (K) {
                        I(K).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onerror.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                }
            },
            _bind: function() {
                I(["load", "abort", "error"]).jEach(function(K) {
                    this.img.jAddEvent(K, this._handlers["on" + K].jBindAsEvent(this).jDefer(1))
                }, this)
            },
            _unbind: function() {
                if (this._timer) {
                    try {
                        clearTimeout(this._timer)
                    } catch (K) {}
                    this._timer = null
                }
                I(["load", "abort", "error"]).jEach(function(L) {
                    this.img.jRemoveEvent(L)
                }, this)
            },
            _cleanup: function() {
                this.jGetSize();
                if (this.img.jFetch("new")) {
                    var K = this.img.parentNode;
                    this.img.jRemove().jDel("new").jSetCss({
                        position: "static",
                        top: "auto"
                    });
                    K.kill()
                }
            },
            loadBlob: function(L) {
                var M = new XMLHttpRequest(),
                    K;
                I(["abort", "progress"]).jEach(function(N) {
                    M["on" + N] = I(function(O) {
                        this._handlers["on" + N].call(this, O)
                    }).jBind(this)
                }, this);
                M.onerror = I(function() {
                    this.options.onxhrerror.jBind(null, this).jDelay(1);
                    this.options.xhr = false;
                    this._bind();
                    this.img.src = L
                }).jBind(this);
                M.onload = I(function() {
                    if (200 !== M.status && 304 !== M.status) {
                        this._handlers.onerror.call(this);
                        return
                    }
                    K = M.response;
                    this._bind();
                    if (H && !J.browser.trident && !("ios" === J.browser.platform && J.browser.version < 537)) {
                        this.img.setAttribute("src", H.createObjectURL(K))
                    } else {
                        this.img.src = L
                    }
                }).jBind(this);
                M.open("GET", L);
                M.responseType = "blob";
                M.send()
            },
            init: function(L, K) {
                this.options = J.extend(this.options, K);
                this.img = I(L) || J.$new("img", {}, {
                    "max-width": "none",
                    "max-height": "none"
                }).jAppendTo(J.$new("div").jAddClass("magic-temporary-img").jSetCss({
                    position: "absolute",
                    top: -10000,
                    width: 10,
                    height: 10,
                    overflow: "hidden"
                }).jAppendTo(document.body)).jStore("new", true);
                if (J.browser.features.xhr2 && this.options.xhr && "string" == J.jTypeOf(L)) {
                    this.loadBlob(L);
                    return
                }
                var M = function() {
                    if (this.isReady()) {
                        this._handlers.onload.call(this)
                    } else {
                        this._handlers.onerror.call(this)
                    }
                    M = null
                }.jBind(this);
                this._bind();
                if ("string" == J.jTypeOf(L)) {
                    this.img.src = L
                } else {
                    if (J.browser.trident && 5 == J.browser.version && J.browser.ieMode < 9) {
                        this.img.onreadystatechange = function() {
                            if (/loaded|complete/.test(this.img.readyState)) {
                                this.img.onreadystatechange = null;
                                M && M()
                            }
                        }.jBind(this)
                    }
                    this.img.src = L.getAttribute("src")
                }
                this.img && this.img.complete && M && (this._timer = M.jDelay(100))
            },
            destroy: function() {
                this._unbind();
                this._cleanup();
                this.ready = false;
                return this
            },
            isReady: function() {
                var K = this.img;
                return (K.naturalWidth) ? (K.naturalWidth > 0) : (K.readyState) ? ("complete" == K.readyState) : K.width > 0
            },
            jGetSize: function() {
                return this.size || (this.size = {
                    width: this.img.naturalWidth || this.img.width,
                    height: this.img.naturalHeight || this.img.height
                })
            }
        })
    })(x);
    (function(I) {
        if (!I) {
            throw "MagicJS not found"
        }
        if (I.FX) {
            return
        }
        var H = I.$;
        I.FX = new I.Class({
            init: function(K, J) {
                var L;
                this.el = I.$(K);
                this.options = I.extend(this.options, J);
                this.timer = false;
                this.easeFn = this.cubicBezierAtTime;
                L = I.FX.Transition[this.options.transition] || this.options.transition;
                if ("function" === I.jTypeOf(L)) {
                    this.easeFn = L
                } else {
                    this.cubicBezier = this.parseCubicBezier(L) || this.parseCubicBezier("ease")
                }
                if ("string" == I.jTypeOf(this.options.cycles)) {
                    this.options.cycles = "infinite" === this.options.cycles ? Infinity : parseInt(this.options.cycles) || 1
                }
            },
            options: {
                fps: 60,
                duration: 600,
                transition: "ease",
                cycles: 1,
                direction: "normal",
                onStart: I.$F,
                onComplete: I.$F,
                onBeforeRender: I.$F,
                onAfterRender: I.$F,
                forceAnimation: false,
                roundCss: false
            },
            styles: null,
            cubicBezier: null,
            easeFn: null,
            setTransition: function(J) {
                this.options.transition = J;
                J = I.FX.Transition[this.options.transition] || this.options.transition;
                if ("function" === I.jTypeOf(J)) {
                    this.easeFn = J
                } else {
                    this.easeFn = this.cubicBezierAtTime;
                    this.cubicBezier = this.parseCubicBezier(J) || this.parseCubicBezier("ease")
                }
            },
            start: function(L) {
                var J = /\%$/,
                    K;
                this.styles = L;
                this.cycle = 0;
                this.state = 0;
                this.curFrame = 0;
                this.pStyles = {};
                this.alternate = "alternate" === this.options.direction || "alternate-reverse" === this.options.direction;
                this.continuous = "continuous" === this.options.direction || "continuous-reverse" === this.options.direction;
                for (K in this.styles) {
                    J.test(this.styles[K][0]) && (this.pStyles[K] = true);
                    if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                        this.styles[K].reverse()
                    }
                }
                this.startTime = I.now();
                this.finishTime = this.startTime + this.options.duration;
                this.options.onStart.call();
                if (0 === this.options.duration) {
                    this.render(1);
                    this.options.onComplete.call()
                } else {
                    this.loopBind = this.loop.jBind(this);
                    if (!this.options.forceAnimation && I.browser.features.requestAnimationFrame) {
                        this.timer = I.browser.requestAnimationFrame.call(window, this.loopBind)
                    } else {
                        this.timer = this.loopBind.interval(Math.round(1000 / this.options.fps))
                    }
                }
                return this
            },
            stopAnimation: function() {
                if (this.timer) {
                    if (!this.options.forceAnimation && I.browser.features.requestAnimationFrame && I.browser.cancelAnimationFrame) {
                        I.browser.cancelAnimationFrame.call(window, this.timer)
                    } else {
                        clearInterval(this.timer)
                    }
                    this.timer = false
                }
            },
            stop: function(J) {
                J = I.defined(J) ? J : false;
                this.stopAnimation();
                if (J) {
                    this.render(1);
                    this.options.onComplete.jDelay(10)
                }
                return this
            },
            calc: function(L, K, J) {
                L = parseFloat(L);
                K = parseFloat(K);
                return (K - L) * J + L
            },
            loop: function() {
                var K = I.now(),
                    J = (K - this.startTime) / this.options.duration,
                    L = Math.floor(J);
                if (K >= this.finishTime && L >= this.options.cycles) {
                    this.stopAnimation();
                    this.render(1);
                    this.options.onComplete.jDelay(10);
                    return this
                }
                if (this.alternate && this.cycle < L) {
                    for (var M in this.styles) {
                        this.styles[M].reverse()
                    }
                }
                this.cycle = L;
                if (!this.options.forceAnimation && I.browser.features.requestAnimationFrame) {
                    this.timer = I.browser.requestAnimationFrame.call(window, this.loopBind)
                }
                this.render((this.continuous ? L : 0) + this.easeFn(J % 1))
            },
            render: function(J) {
                var K = {},
                    M = J;
                for (var L in this.styles) {
                    if ("opacity" === L) {
                        K[L] = Math.round(this.calc(this.styles[L][0], this.styles[L][1], J) * 100) / 100
                    } else {
                        K[L] = this.calc(this.styles[L][0], this.styles[L][1], J);
                        this.pStyles[L] && (K[L] += "%")
                    }
                }
                this.options.onBeforeRender(K, this.el);
                this.set(K);
                this.options.onAfterRender(K, this.el)
            },
            set: function(J) {
                return this.el.jSetCss(J)
            },
            parseCubicBezier: function(J) {
                var K, L = null;
                if ("string" !== I.jTypeOf(J)) {
                    return null
                }
                switch (J) {
                    case "linear":
                        L = H([0, 0, 1, 1]);
                        break;
                    case "ease":
                        L = H([0.25, 0.1, 0.25, 1]);
                        break;
                    case "ease-in":
                        L = H([0.42, 0, 1, 1]);
                        break;
                    case "ease-out":
                        L = H([0, 0, 0.58, 1]);
                        break;
                    case "ease-in-out":
                        L = H([0.42, 0, 0.58, 1]);
                        break;
                    case "easeInSine":
                        L = H([0.47, 0, 0.745, 0.715]);
                        break;
                    case "easeOutSine":
                        L = H([0.39, 0.575, 0.565, 1]);
                        break;
                    case "easeInOutSine":
                        L = H([0.445, 0.05, 0.55, 0.95]);
                        break;
                    case "easeInQuad":
                        L = H([0.55, 0.085, 0.68, 0.53]);
                        break;
                    case "easeOutQuad":
                        L = H([0.25, 0.46, 0.45, 0.94]);
                        break;
                    case "easeInOutQuad":
                        L = H([0.455, 0.03, 0.515, 0.955]);
                        break;
                    case "easeInCubic":
                        L = H([0.55, 0.055, 0.675, 0.19]);
                        break;
                    case "easeOutCubic":
                        L = H([0.215, 0.61, 0.355, 1]);
                        break;
                    case "easeInOutCubic":
                        L = H([0.645, 0.045, 0.355, 1]);
                        break;
                    case "easeInQuart":
                        L = H([0.895, 0.03, 0.685, 0.22]);
                        break;
                    case "easeOutQuart":
                        L = H([0.165, 0.84, 0.44, 1]);
                        break;
                    case "easeInOutQuart":
                        L = H([0.77, 0, 0.175, 1]);
                        break;
                    case "easeInQuint":
                        L = H([0.755, 0.05, 0.855, 0.06]);
                        break;
                    case "easeOutQuint":
                        L = H([0.23, 1, 0.32, 1]);
                        break;
                    case "easeInOutQuint":
                        L = H([0.86, 0, 0.07, 1]);
                        break;
                    case "easeInExpo":
                        L = H([0.95, 0.05, 0.795, 0.035]);
                        break;
                    case "easeOutExpo":
                        L = H([0.19, 1, 0.22, 1]);
                        break;
                    case "easeInOutExpo":
                        L = H([1, 0, 0, 1]);
                        break;
                    case "easeInCirc":
                        L = H([0.6, 0.04, 0.98, 0.335]);
                        break;
                    case "easeOutCirc":
                        L = H([0.075, 0.82, 0.165, 1]);
                        break;
                    case "easeInOutCirc":
                        L = H([0.785, 0.135, 0.15, 0.86]);
                        break;
                    case "easeInBack":
                        L = H([0.6, -0.28, 0.735, 0.045]);
                        break;
                    case "easeOutBack":
                        L = H([0.175, 0.885, 0.32, 1.275]);
                        break;
                    case "easeInOutBack":
                        L = H([0.68, -0.55, 0.265, 1.55]);
                        break;
                    default:
                        J = J.replace(/\s/g, "");
                        if (J.match(/^cubic-bezier\((?:-?[0-9\.]{0,}[0-9]{1,},){3}(?:-?[0-9\.]{0,}[0-9]{1,})\)$/)) {
                            L = J.replace(/^cubic-bezier\s*\(|\)$/g, "").split(",");
                            for (K = L.length - 1; K >= 0; K--) {
                                L[K] = parseFloat(L[K])
                            }
                        }
                }
                return H(L)
            },
            cubicBezierAtTime: function(V) {
                var J = 0,
                    U = 0,
                    R = 0,
                    W = 0,
                    T = 0,
                    P = 0,
                    Q = this.options.duration;

                function O(X) {
                    return ((J * X + U) * X + R) * X
                }

                function N(X) {
                    return ((W * X + T) * X + P) * X
                }

                function L(X) {
                    return (3 * J * X + 2 * U) * X + R
                }

                function S(X) {
                    return 1 / (200 * X)
                }

                function K(X, Y) {
                    return N(M(X, Y))
                }

                function M(ae, af) {
                    var ad, ac, ab, Y, X, aa;

                    function Z(ag) {
                        if (ag >= 0) {
                            return ag
                        } else {
                            return 0 - ag
                        }
                    }
                    for (ab = ae, aa = 0; aa < 8; aa++) {
                        Y = O(ab) - ae;
                        if (Z(Y) < af) {
                            return ab
                        }
                        X = L(ab);
                        if (Z(X) < 0.000001) {
                            break
                        }
                        ab = ab - Y / X
                    }
                    ad = 0;
                    ac = 1;
                    ab = ae;
                    if (ab < ad) {
                        return ad
                    }
                    if (ab > ac) {
                        return ac
                    }
                    while (ad < ac) {
                        Y = O(ab);
                        if (Z(Y - ae) < af) {
                            return ab
                        }
                        if (ae > Y) {
                            ad = ab
                        } else {
                            ac = ab
                        }
                        ab = (ac - ad) * 0.5 + ad
                    }
                    return ab
                }
                R = 3 * this.cubicBezier[0];
                U = 3 * (this.cubicBezier[2] - this.cubicBezier[0]) - R;
                J = 1 - R - U;
                P = 3 * this.cubicBezier[1];
                T = 3 * (this.cubicBezier[3] - this.cubicBezier[1]) - P;
                W = 1 - P - T;
                return K(V, S(Q))
            }
        });
        I.FX.Transition = {
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
            elasticIn: function(K, J) {
                J = J || [];
                return Math.pow(2, 10 * --K) * Math.cos(20 * K * Math.PI * (J[0] || 1) / 3)
            },
            elasticOut: function(K, J) {
                return 1 - I.FX.Transition.elasticIn(1 - K, J)
            },
            bounceIn: function(L) {
                for (var K = 0, J = 1; 1; K += J, J /= 2) {
                    if (L >= (7 - 4 * K) / 11) {
                        return J * J - Math.pow((11 - 6 * K - 11 * L) / 4, 2)
                    }
                }
            },
            bounceOut: function(J) {
                return 1 - I.FX.Transition.bounceIn(1 - J)
            },
            none: function(J) {
                return 0
            }
        }
    })(x);
    (function(I) {
        if (!I) {
            throw "MagicJS not found"
        }
        if (I.PFX) {
            return
        }
        var H = I.$;
        I.PFX = new I.Class(I.FX, {
            init: function(J, K) {
                this.el_arr = J;
                this.options = I.extend(this.options, K);
                this.timer = false;
                this.$parent.init()
            },
            start: function(N) {
                var J = /\%$/,
                    M, L, K = N.length;
                this.styles_arr = N;
                this.pStyles_arr = new Array(K);
                for (L = 0; L < K; L++) {
                    this.pStyles_arr[L] = {};
                    for (M in N[L]) {
                        J.test(N[L][M][0]) && (this.pStyles_arr[L][M] = true);
                        if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                            this.styles_arr[L][M].reverse()
                        }
                    }
                }
                this.$parent.start([]);
                return this
            },
            render: function(J) {
                for (var K = 0; K < this.el_arr.length; K++) {
                    this.el = I.$(this.el_arr[K]);
                    this.styles = this.styles_arr[K];
                    this.pStyles = this.pStyles_arr[K];
                    this.$parent.render(J)
                }
            }
        })
    })(x);
    (function(I) {
        if (!I) {
            throw "MagicJS not found";
            return
        }
        if (I.Tooltip) {
            return
        }
        var H = I.$;
        I.Tooltip = function(K, L) {
            var J = this.tooltip = I.$new("div", null, {
                position: "absolute",
                "z-index": 999
            }).jAddClass("MagicToolboxTooltip");
            I.$(K).jAddEvent("mouseover", function() {
                J.jAppendTo(document.body)
            });
            I.$(K).jAddEvent("mouseout", function() {
                J.jRemove()
            });
            I.$(K).jAddEvent("mousemove", function(Q) {
                var S = 20,
                    P = I.$(Q).jGetPageXY(),
                    O = J.jGetSize(),
                    N = I.$(window).jGetSize(),
                    R = I.$(window).jGetScroll();

                function M(V, T, U) {
                    return (U < (V - T) / 2) ? U : ((U > (V + T) / 2) ? (U - T) : (V - T) / 2)
                }
                J.jSetCss({
                    left: R.x + M(N.width, O.width + 2 * S, P.x - R.x) + S,
                    top: R.y + M(N.height, O.height + 2 * S, P.y - R.y) + S
                })
            });
            this.text(L)
        };
        I.Tooltip.prototype.text = function(J) {
            this.tooltip.firstChild && this.tooltip.removeChild(this.tooltip.firstChild);
            this.tooltip.append(document.createTextNode(J))
        }
    })(x);
    (function(I) {
        if (!I) {
            throw "MagicJS not found";
            return
        }
        if (I.MessageBox) {
            return
        }
        var H = I.$;
        I.Message = function(M, L, K, J) {
            this.hideTimer = null;
            this.messageBox = I.$new("span", null, {
                position: "absolute",
                "z-index": 999,
                visibility: "hidden",
                opacity: 0.8
            }).jAddClass(J || "").jAppendTo(K || document.body);
            this.setMessage(M);
            this.show(L)
        };
        I.Message.prototype.show = function(J) {
            this.messageBox.show();
            this.hideTimer = this.hide.jBind(this).jDelay(I.ifndef(J, 5000))
        };
        I.Message.prototype.hide = function(J) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
            if (this.messageBox && !this.hideFX) {
                this.hideFX = new x.FX(this.messageBox, {
                    duration: I.ifndef(J, 500),
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
        I.Message.prototype.setMessage = function(J) {
            this.messageBox.firstChild && this.tooltip.removeChild(this.messageBox.firstChild);
            this.messageBox.append(document.createTextNode(J))
        }
    })(x);
    (function(I) {
        if (!I) {
            throw "MagicJS not found"
        }
        if (I.Options) {
            return
        }
        var L = I.$,
            H = null,
            P = {
                "boolean": 1,
                array: 2,
                number: 3,
                "function": 4,
                string: 100
            },
            J = {
                "boolean": function(S, R, Q) {
                    if ("boolean" != I.jTypeOf(R)) {
                        if (Q || "string" != I.jTypeOf(R)) {
                            return false
                        } else {
                            if (!/^(true|false)$/.test(R)) {
                                return false
                            } else {
                                R = R.jToBool()
                            }
                        }
                    }
                    if (S.hasOwnProperty("enum") && !L(S["enum"]).contains(R)) {
                        return false
                    }
                    H = R;
                    return true
                },
                string: function(S, R, Q) {
                    if ("string" !== I.jTypeOf(R)) {
                        return false
                    } else {
                        if (S.hasOwnProperty("enum") && !L(S["enum"]).contains(R)) {
                            return false
                        } else {
                            H = "" + R;
                            return true
                        }
                    }
                },
                number: function(T, S, R) {
                    var Q = false,
                        V = /%$/,
                        U = (I.jTypeOf(S) == "string" && V.test(S));
                    if (R && !"number" == typeof S) {
                        return false
                    }
                    S = parseFloat(S);
                    if (isNaN(S)) {
                        return false
                    }
                    if (isNaN(T.minimum)) {
                        T.minimum = Number.NEGATIVE_INFINITY
                    }
                    if (isNaN(T.maximum)) {
                        T.maximum = Number.POSITIVE_INFINITY
                    }
                    if (T.hasOwnProperty("enum") && !L(T["enum"]).contains(S)) {
                        return false
                    }
                    if (T.minimum > S || S > T.maximum) {
                        return false
                    }
                    H = U ? (S + "%") : S;
                    return true
                },
                array: function(T, R, Q) {
                    if ("string" === I.jTypeOf(R)) {
                        try {
                            R = window.JSON.parse(R)
                        } catch (S) {
                            return false
                        }
                    }
                    if (I.jTypeOf(R) === "array") {
                        H = R;
                        return true
                    } else {
                        return false
                    }
                },
                "function": function(S, R, Q) {
                    if (I.jTypeOf(R) === "function") {
                        H = R;
                        return true
                    } else {
                        return false
                    }
                }
            },
            K = function(V, U, R) {
                var T;
                T = V.hasOwnProperty("oneOf") ? V.oneOf : [V];
                if ("array" != I.jTypeOf(T)) {
                    return false
                }
                for (var S = 0, Q = T.length - 1; S <= Q; S++) {
                    if (J[T[S].type](T[S], U, R)) {
                        return true
                    }
                }
                return false
            },
            N = function(V) {
                var T, S, U, Q, R;
                if (V.hasOwnProperty("oneOf")) {
                    Q = V.oneOf.length;
                    for (T = 0; T < Q; T++) {
                        for (S = T + 1; S < Q; S++) {
                            if (P[V.oneOf[T]["type"]] > P[V.oneOf[S].type]) {
                                R = V.oneOf[T];
                                V.oneOf[T] = V.oneOf[S];
                                V.oneOf[S] = R
                            }
                        }
                    }
                }
                return V
            },
            O = function(T) {
                var S;
                S = T.hasOwnProperty("oneOf") ? T.oneOf : [T];
                if ("array" != I.jTypeOf(S)) {
                    return false
                }
                for (var R = S.length - 1; R >= 0; R--) {
                    if (!S[R].type || !P.hasOwnProperty(S[R].type)) {
                        return false
                    }
                    if (I.defined(S[R]["enum"])) {
                        if ("array" !== I.jTypeOf(S[R]["enum"])) {
                            return false
                        }
                        for (var Q = S[R]["enum"].length - 1; Q >= 0; Q--) {
                            if (!J[S[R].type]({
                                    type: S[R].type
                                }, S[R]["enum"][Q], true)) {
                                return false
                            }
                        }
                    }
                }
                if (T.hasOwnProperty("default") && !K(T, T["default"], true)) {
                    return false
                }
                return true
            },
            M = function(Q) {
                this.schema = {};
                this.options = {};
                this.parseSchema(Q)
            };
        I.extend(M.prototype, {
            parseSchema: function(S) {
                var R, Q, T;
                for (R in S) {
                    if (!S.hasOwnProperty(R)) {
                        continue
                    }
                    Q = (R + "").jTrim().jCamelize();
                    if (!this.schema.hasOwnProperty(Q)) {
                        this.schema[Q] = N(S[R]);
                        if (!O(this.schema[Q])) {
                            throw "Incorrect definition of the '" + R + "' parameter in " + S
                        }
                        this.options[Q] = undefined
                    }
                }
            },
            set: function(R, Q) {
                R = (R + "").jTrim().jCamelize();
                if (I.jTypeOf(Q) == "string") {
                    Q = Q.jTrim()
                }
                if (this.schema.hasOwnProperty(R)) {
                    H = Q;
                    if (K(this.schema[R], Q)) {
                        this.options[R] = H
                    }
                    H = null
                }
            },
            get: function(Q) {
                Q = (Q + "").jTrim().jCamelize();
                if (this.schema.hasOwnProperty(Q)) {
                    return I.defined(this.options[Q]) ? this.options[Q] : this.schema[Q]["default"]
                }
            },
            fromJSON: function(R) {
                for (var Q in R) {
                    this.set(Q, R[Q])
                }
            },
            getJSON: function() {
                var R = I.extend({}, this.options);
                for (var Q in R) {
                    if (undefined === R[Q] && undefined !== this.schema[Q]["default"]) {
                        R[Q] = this.schema[Q]["default"]
                    }
                }
                return R
            },
            fromString: function(Q) {
                L(Q.split(";")).jEach(L(function(R) {
                    R = R.split(":");
                    this.set(R.shift().jTrim(), R.join(":"))
                }).jBind(this))
            },
            exists: function(Q) {
                Q = (Q + "").jTrim().jCamelize();
                return this.schema.hasOwnProperty(Q)
            },
            isset: function(Q) {
                Q = (Q + "").jTrim().jCamelize();
                return this.exists(Q) && I.defined(this.options[Q])
            },
            jRemove: function(Q) {
                Q = (Q + "").jTrim().jCamelize();
                if (this.exists(Q)) {
                    delete this.options[Q];
                    delete this.schema[Q]
                }
            }
        });
        I.Options = M
    }(x));
    (function(L) {
        if (!L) {
            throw "MagicJS not found";
            return
        }
        var K = L.$;
        if (L.SVGImage) {
            return
        }
        var J = "http://www.w3.org/2000/svg",
            I = "http://www.w3.org/1999/xlink";
        var H = function(M) {
            this.filters = {};
            this.originalImage = K(M);
            this.canvas = K(document.createElementNS(J, "svg"));
            this.canvas.setAttribute("width", this.originalImage.naturalWidth || this.originalImage.width);
            this.canvas.setAttribute("height", this.originalImage.naturalHeight || this.originalImage.height);
            this.image = K(document.createElementNS(J, "image"));
            this.image.setAttributeNS(I, "href", this.originalImage.getAttribute("src"));
            this.image.setAttribute("width", "100%");
            this.image.setAttribute("height", "100%");
            this.image.jAppendTo(this.canvas)
        };
        H.prototype.getNode = function() {
            return this.canvas
        };
        H.prototype.blur = function(M) {
            if (Math.round(M) < 1) {
                return
            }
            if (!this.filters.blur) {
                this.filters.blur = K(document.createElementNS(J, "filter"));
                this.filters.blur.setAttribute("id", "filterBlur");
                this.filters.blur.appendChild(K(document.createElementNS(J, "feGaussianBlur")).setProps({
                    "in": "SourceGraphic",
                    stdDeviation: M
                }));
                this.filters.blur.jAppendTo(this.canvas);
                this.image.setAttribute("filter", "url(#filterBlur)")
            } else {
                this.filters.blur.firstChild.setAttribute("stdDeviation", M)
            }
            return this
        };
        L.SVGImage = H
    }(x));
    var r = (function(J) {
        var I = J.$;
        var H = function(L, K) {
            this.settings = {
                cssPrefix: "magic",
                orientation: "horizontal",
                position: "bottom",
                size: {
                    units: "px",
                    width: "auto",
                    height: "auto"
                },
                sides: ["height", "width"]
            };
            this.parent = L;
            this.root = null;
            this.wrapper = null;
            this.context = null;
            this.buttons = {};
            this.items = [];
            this.selectedItem = null;
            this.scrollFX = null;
            this.resizeCallback = null;
            this.settings = J.extend(this.settings, K);
            this.rootCSS = this.settings.cssPrefix + "-thumbs";
            this.itemCSS = this.settings.cssPrefix + "-thumb";
            this.setupContent()
        };
        H.prototype = {
            setupContent: function() {
                this.root = J.$new("div").jAddClass(this.rootCSS).jAddClass(this.rootCSS + "-" + this.settings.orientation).jSetCss({
                    visibility: "hidden"
                });
                this.wrapper = J.$new("div").jAddClass(this.rootCSS + "-wrapper").jAppendTo(this.root);
                this.root.jAppendTo(this.parent);
                I(["prev", "next"]).jEach(function(K) {
                    this.buttons[K] = J.$new("button").jAddClass(this.rootCSS + "-button").jAddClass(this.rootCSS + "-button-" + K).jAppendTo(this.root).jAddEvent("btnclick tap", (function(M, L) {
                        I(M).events[0].stop().stopQueue();
                        I(M).stopDistribution();
                        this.scroll(L)
                    }).jBindAsEvent(this, K))
                }.jBind(this));
                this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled");
                this.context = J.$new("ul").jAddEvent("btnclick tap", function(K) {
                    K.stop()
                })
            },
            addItem: function(L) {
                var K = J.$new("li").jAddClass(this.itemCSS).append(L).jAppendTo(this.context);
                new J.ImageLoader(L, {
                    oncomplete: this.reflow.jBind(this)
                });
                this.items.push(K);
                return K
            },
            selectItem: function(L) {
                var K = this.selectedItem || this.context.byClass(this.itemCSS + "-selected")[0];
                if (K) {
                    I(K).jRemoveClass(this.itemCSS + "-selected")
                }
                this.selectedItem = I(L);
                if (!this.selectedItem) {
                    return
                }
                this.selectedItem.jAddClass(this.itemCSS + "-selected");
                this.scroll(this.selectedItem)
            },
            run: function() {
                if (this.wrapper !== this.context.parentNode) {
                    I(this.context).jAppendTo(this.wrapper);
                    this.initDrag();
                    I(window).jAddEvent("resize", this.resizeCallback = this.reflow.jBind(this));
                    this.run.jBind(this).jDelay(1);
                    return
                }
                var K = this.parent.jGetSize();
                if (K.height > 0 && K.height > K.width) {
                    this.setOrientation("vertical")
                } else {
                    this.setOrientation("horizontal")
                }
                this.reflow();
                this.root.jSetCss({
                    visibility: ""
                })
            },
            stop: function() {
                if (this.resizeCallback) {
                    I(window).jRemoveEvent("resize", this.resizeCallback)
                }
                this.root.kill()
            },
            scroll: function(X, N) {
                var P = {
                        x: 0,
                        y: 0
                    },
                    aa = "vertical" == this.settings.orientation ? "top" : "left",
                    S = "vertical" == this.settings.orientation ? "height" : "width",
                    O = "vertical" == this.settings.orientation ? "y" : "x",
                    W = this.context.parentNode.jGetSize()[S],
                    T = this.context.parentNode.jGetPosition(),
                    M = this.context.jGetSize()[S],
                    V, K, Z, Q, L, U, R, Y = [];
                if (this.scrollFX) {
                    this.scrollFX.stop()
                } else {
                    this.context.jSetCss("transition", J.browser.cssTransformProp + String.fromCharCode(32) + "0s")
                }
                if (undefined === N) {
                    N = 600
                }
                V = this.context.jGetPosition();
                if ("string" == J.jTypeOf(X)) {
                    P[O] = ("next" == X) ? Math.max(V[aa] - T[aa] - W, W - M) : Math.min(V[aa] - T[aa] + W, 0)
                } else {
                    if ("element" == J.jTypeOf(X)) {
                        K = X.jGetSize();
                        Z = X.jGetPosition();
                        P[O] = Math.min(0, Math.max(W - M, V[aa] + W / 2 - Z[aa] - K[S] / 2))
                    } else {
                        return
                    }
                }
                if (J.browser.gecko && "android" == J.browser.platform || J.browser.ieMode && J.browser.ieMode < 10) {
                    if ("string" == J.jTypeOf(X) && P[O] == V[aa] - T[aa]) {
                        V[aa] += 0 === V[aa] - T[aa] ? 30 : -30
                    }
                    P["margin-" + aa] = [((M <= W) ? 0 : (V[aa] - T[aa])), P[O]];
                    delete P.x;
                    delete P.y;
                    if (!this.selectorsMoveFX) {
                        this.selectorsMoveFX = new J.PFX([this.context], {
                            duration: 500
                        })
                    }
                    Y.push(P);
                    this.selectorsMoveFX.start(Y);
                    R = P["margin-" + aa][1]
                } else {
                    this.context.jSetCss({
                        transition: J.browser.cssTransformProp + String.fromCharCode(32) + N + "ms ease",
                        transform: "translate3d(" + P.x + "px, " + P.y + "px, 0)"
                    });
                    R = P[O]
                }
                if (R >= 0) {
                    this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled")
                } else {
                    this.buttons.prev.jRemoveClass(this.rootCSS + "-button-disabled")
                }
                if (R <= W - M) {
                    this.buttons.next.jAddClass(this.rootCSS + "-button-disabled")
                } else {
                    this.buttons.next.jRemoveClass(this.rootCSS + "-button-disabled")
                }
                R = null
            },
            initDrag: function() {
                var M, L, N, U, T, W, O, S, R, V, ab, Y, Z, X = {
                        x: 0,
                        y: 0
                    },
                    K, Q, P = 300,
                    aa = function(ae) {
                        var ad, ac = 0;
                        for (ad = 1.5; ad <= 90; ad += 1.5) {
                            ac += (ae * Math.cos(ad / Math.PI / 2))
                        }(U < 0) && (ac *= (-1));
                        return ac
                    };
                T = I(function(ac) {
                    X = {
                        x: 0,
                        y: 0
                    };
                    K = "vertical" == this.settings.orientation ? "top" : "left";
                    Q = "vertical" == this.settings.orientation ? "height" : "width";
                    M = "vertical" == this.settings.orientation ? "y" : "x";
                    Y = this.context.parentNode.jGetSize()[Q];
                    ab = this.context.jGetSize()[Q];
                    N = Y - ab;
                    if (N >= 0) {
                        return
                    }
                    if (ac.state == "dragstart") {
                        if (undefined === Z) {
                            Z = 0
                        }
                        this.context.jSetCssProp("transition", J.browser.cssTransformProp + String.fromCharCode(32) + "0ms");
                        W = ac[M];
                        R = ac.y;
                        S = ac.x;
                        V = false
                    } else {
                        if ("dragend" == ac.state) {
                            if (V) {
                                return
                            }
                            O = aa(Math.abs(U));
                            Z += O;
                            (Z <= N) && (Z = N);
                            (Z >= 0) && (Z = 0);
                            X[M] = Z;
                            this.context.jSetCssProp("transition", J.browser.cssTransformProp + String.fromCharCode(32) + P + "ms  cubic-bezier(.0, .0, .0, 1)");
                            this.context.jSetCssProp("transform", "translate3d(" + X.x + "px, " + X.y + "px, 0px)");
                            U = 0
                        } else {
                            if (V) {
                                return
                            }
                            if ("horizontal" == this.settings.orientation && Math.abs(ac.x - S) > Math.abs(ac.y - R) || "vertical" == this.settings.orientation && Math.abs(ac.x - S) < Math.abs(ac.y - R)) {
                                ac.stop();
                                U = ac[M] - W;
                                Z += U;
                                X[M] = Z;
                                this.context.jSetCssProp("transform", "translate3d(" + X.x + "px, " + X.y + "px, 0px)");
                                if (Z >= 0) {
                                    this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled")
                                } else {
                                    this.buttons.prev.jRemoveClass(this.rootCSS + "-button-disabled")
                                }
                                if (Z <= N) {
                                    this.buttons.next.jAddClass(this.rootCSS + "-button-disabled")
                                } else {
                                    this.buttons.next.jRemoveClass(this.rootCSS + "-button-disabled")
                                }
                            } else {
                                V = true
                            }
                        }
                        W = ac[M]
                    }
                }).jBind(this);
                this.context.jAddEvent("touchdrag", T)
            },
            reflow: function() {
                var N, M, K, L = this.parent.jGetSize();
                if (L.height > 0 && L.height > L.width) {
                    this.setOrientation("vertical")
                } else {
                    this.setOrientation("horizontal")
                }
                N = "vertical" == this.settings.orientation ? "height" : "width";
                M = this.context.jGetSize()[N];
                K = this.root.jGetSize()[N];
                if (M <= K) {
                    this.root.jAddClass("no-buttons");
                    this.context.jSetCssProp("transition", "").jGetSize();
                    this.context.jSetCssProp("transform", "translate3d(0,0,0)");
                    this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled");
                    this.buttons.next.jRemoveClass(this.rootCSS + "-button-disabled")
                } else {
                    this.root.jRemoveClass("no-buttons")
                }
                if (this.selectedItem) {
                    this.scroll(this.selectedItem, 0)
                }
            },
            setOrientation: function(K) {
                if ("vertical" !== K && "horizontal" !== K || K == this.settings.orientation) {
                    return
                }
                this.root.jRemoveClass(this.rootCSS + "-" + this.settings.orientation);
                this.settings.orientation = K;
                this.root.jAddClass(this.rootCSS + "-" + this.settings.orientation);
                this.context.jSetCssProp("transition", "none").jGetSize();
                this.context.jSetCssProp("transform", "").jSetCssProp("margin", "")
            }
        };
        return H
    })(x);
    var h = z.$;
    if (!z.browser.cssTransform) {
        z.browser.cssTransform = z.normalizeCSS("transform").dashize()
    }
    var o = {
        zoomOn: {
            type: "string",
            "enum": ["click", "hover"],
            "default": "hover"
        },
        zoomMode: {
            oneOf: [{
                type: "string",
                "enum": ["zoom", "magnifier", "preview", "off"],
                "default": "zoom"
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "zoom"
        },
        zoomWidth: {
            oneOf: [{
                type: "string",
                "enum": ["auto"]
            }, {
                type: "number",
                minimum: 1
            }],
            "default": "auto"
        },
        zoomHeight: {
            oneOf: [{
                type: "string",
                "enum": ["auto"]
            }, {
                type: "number",
                minimum: 1
            }],
            "default": "auto"
        },
        zoomPosition: {
            type: "string",
            "default": "right"
        },
        zoomDistance: {
            type: "number",
            minimum: 0,
            "default": 15
        },
        zoomCaption: {
            oneOf: [{
                type: "string",
                "enum": ["bottom", "top", "off"],
                "default": "off"
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "off"
        },
        expand: {
            oneOf: [{
                type: "string",
                "enum": ["window", "fullscreen", "off"]
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "window"
        },
        expandZoomMode: {
            oneOf: [{
                type: "string",
                "enum": ["zoom", "magnifier", "off"],
                "default": "zoom"
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "zoom"
        },
        expandZoomOn: {
            type: "string",
            "enum": ["click", "always"],
            "default": "click"
        },
        expandCaption: {
            type: "boolean",
            "default": true
        },
        closeOnClickOutside: {
            type: "boolean",
            "default": true
        },
        hint: {
            oneOf: [{
                type: "string",
                "enum": ["once", "always", "off"]
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "once"
        },
        smoothing: {
            type: "boolean",
            "default": true
        },
        upscale: {
            type: "boolean",
            "default": true
        },
        variableZoom: {
            type: "boolean",
            "default": false
        },
        lazyZoom: {
            type: "boolean",
            "default": false
        },
        autostart: {
            type: "boolean",
            "default": true
        },
        rightClick: {
            type: "boolean",
            "default": false
        },
        transitionEffect: {
            type: "boolean",
            "default": true
        },
        selectorTrigger: {
            type: "string",
            "enum": ["click", "hover"],
            "default": "click"
        },
        cssClass: {
            type: "string"
        },
        textHoverZoomHint: {
            type: "string",
            "default": "Hover to zoom"
        },
        textClickZoomHint: {
            type: "string",
            "default": "Click to zoom"
        },
        textExpandHint: {
            type: "string",
            "default": "Click to expand"
        },
        textBtnClose: {
            type: "string",
            "default": "Close"
        },
        textBtnNext: {
            type: "string",
            "default": "Next"
        },
        textBtnPrev: {
            type: "string",
            "default": "Previous"
        }
    };
    var l = {
        zoomMode: {
            oneOf: [{
                type: "string",
                "enum": ["zoom", "magnifier", "off"],
                "default": "zoom"
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "zoom"
        },
        expandZoomOn: {
            type: "string",
            "enum": ["click", "always"],
            "default": "click"
        },
        textExpandHint: {
            type: "string",
            "default": "Tap to expand"
        },
        textHoverZoomHint: {
            type: "string",
            "default": "Touch to zoom"
        },
        textClickZoomHint: {
            type: "string",
            "default": "Double tap to zoom"
        }
    };
    var n = "MagicZoom",
        C = "mz",
        b = 20,
        A = ["onZoomReady", "onUpdate", "onZoomIn", "onZoomOut", "onExpandOpen", "onExpandClose"];
    var u, p = {},
        E = h([]),
        G, e = window.devicePixelRatio || 1,
        F, y = true,
        f = z.browser.features.perspective ? "translate3d(" : "translate(",
        B = z.browser.features.perspective ? ",0)" : ")",
        m = null;
    var q = (function() {
        var I, L, K, J, H;
        H = ["2o.f|kh3,fzz~4!!yyy coigmzaablav mac!coigmtaac~b{}!,.a`mbgme3,zfg} lb{|&'5,.zo|ikz3,Qlbo`e,.}zwbk3,maba|4.g`fk|gz5.zkvz#jkma|ozga`4.`a`k5,0Coigm.Taac.^b{}(z|ojk5.z|gob.xk|}ga`2!o0", "#ff0000", 11, "normal", "", "center", "100%"];
        return H
    })();
    var s = function() {
        return "mgctlbxN$MZ" + "p".toUpperCase() + " mgctlbxV$" + "v5.1.10".replace("v", "") + " mgctlbxL$" + "t".toUpperCase() + ((window.mgctlbx$Pltm && "string" == z.jTypeOf(window.mgctlbx$Pltm)) ? " mgctlbxP$" + window.mgctlbx$Pltm.toLowerCase() : "")
    };

    function w(J) {
        var I, H;
        I = "";
        for (H = 0; H < J.length; H++) {
            I += String.fromCharCode(14 ^ J.charCodeAt(H))
        }
        return I
    }

    function i(J) {
        var I = [],
            H = null;
        (J && (H = h(J))) && (I = E.filter(function(K) {
            return K.placeholder === H
        }));
        return I.length ? I[0] : null
    }

    function a(J) {
        var I = h(window).jGetSize(),
            H = h(window).jGetScroll();
        J = J || 0;
        return {
            left: J,
            right: I.width - J,
            top: J,
            bottom: I.height - J,
            x: H.x,
            y: H.y
        }
    }

    function c(H) {
        return (H.pointerType && ("touch" === H.pointerType || H.pointerType === H.MSPOINTER_TYPE_TOUCH)) || (/touch/i).test(H.type)
    }

    function g(H) {
        return H.pointerType ? (("touch" === H.pointerType || H.MSPOINTER_TYPE_TOUCH === H.pointerType) && H.isPrimary) : 1 === H.changedTouches.length && (H.targetTouches.length ? H.targetTouches[0].identifier == H.changedTouches[0].identifier : true)
    }

    function t() {
        var J = z.$A(arguments),
            I = J.shift(),
            H = p[I];
        if (H) {
            for (var K = 0; K < H.length; K++) {
                H[K].apply(null, J)
            }
        }
    }

    function D() {
        var L = arguments[0],
            H, K, I = [];
        try {
            do {
                K = L.tagName;
                if (/^[A-Za-z]*$/.test(K)) {
                    if (H = L.getAttribute("id")) {
                        if (/^[A-Za-z][-A-Za-z0-9_]*/.test(H)) {
                            K += "#" + H
                        }
                    }
                    I.push(K)
                }
                L = L.parentNode
            } while (L && L !== document.documentElement);
            I = I.reverse();
            z.addCSS(I.join(" ") + "> .mz-figure > img", {
                width: "100% !important;"
            }, "mz-runtime-css", true)
        } catch (J) {}
    }

    function v() {
        var I = null,
            J = null,
            H = function() {
                window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
                window.dispatchEvent(new Event("resize"))
            };
        J = setInterval(function() {
            var M = window.orientation == 90 || window.orientation == -90,
                L = window.innerHeight,
                K = (M ? screen.availWidth : screen.availHeight) * 0.85;
            if ((I == null || I == false) && ((M && L < K) || (!M && L < K))) {
                I = true;
                H()
            } else {
                if ((I == null || I == true) && ((M && L > K) || (!M && L > K))) {
                    I = false;
                    H()
                }
            }
        }, 250);
        return J
    }

    function d() {
        z.addCSS(".magic-hidden-wrapper, .magic-temporary-img", {
            display: "block !important",
            "min-height": "0 !important",
            "min-width": "0 !important",
            "max-height": "none !important",
            "max-width": "none !important",
            width: "10px !important",
            height: "10px !important",
            position: "absolute !important",
            top: "-10000px !important",
            left: "0 !important",
            overflow: "hidden !important",
            "-webkit-transform": "none !important",
            transform: "none !important",
            "-webkit-transition": "none !important",
            transition: "none !important"
        }, "magiczoom-reset-css");
        z.addCSS(".magic-temporary-img img", {
            display: "inline-block !important",
            border: "0 !important",
            padding: "0 !important",
            "min-height": "0 !important",
            "min-width": "0 !important",
            "max-height": "none !important",
            "max-width": "none !important",
            "-webkit-transform": "none !important",
            transform: "none !important",
            "-webkit-transition": "none !important",
            transition: "none !important"
        }, "magiczoom-reset-css");
        if (z.browser.androidBrowser) {
            z.addCSS(".mobile-magic .mz-expand .mz-expand-bg", {
                display: "none !important"
            }, "magiczoom-reset-css")
        }
        if (z.browser.androidBrowser && ("chrome" !== z.browser.uaName || 44 == z.browser.uaVersion)) {
            z.addCSS(".mobile-magic .mz-zoom-window.mz-magnifier, .mobile-magic .mz-zoom-window.mz-magnifier:before", {
                "border-radius": "0 !important"
            }, "magiczoom-reset-css")
        }
    }
    var k = function(K, L, I, J, H) {
        this.small = {
            src: null,
            url: null,
            dppx: 1,
            node: null,
            state: 0,
            size: {
                width: 0,
                height: 0
            },
            loaded: false
        };
        this.zoom = {
            src: null,
            url: null,
            dppx: 1,
            node: null,
            state: 0,
            size: {
                width: 0,
                height: 0
            },
            loaded: false
        };
        if ("object" == z.jTypeOf(K)) {
            this.small = K
        } else {
            if ("string" == z.jTypeOf(K)) {
                this.small.url = z.getAbsoluteURL(K)
            }
        }
        if ("object" == z.jTypeOf(L)) {
            this.zoom = L
        } else {
            if ("string" == z.jTypeOf(L)) {
                this.zoom.url = z.getAbsoluteURL(L)
            }
        }
        this.caption = I;
        this.options = J;
        this.origin = H;
        this.callback = null;
        this.link = null;
        this.node = null
    };
    k.prototype = {
        parseNode: function(J, I, H) {
            var K = J.byTag("img")[0];
            if (H) {
                this.small.node = K || z.$new("img").jAppendTo(J)
            }
            if (e > 1) {
                this.small.url = J.getAttribute("data-image-2x");
                if (this.small.url) {
                    this.small.dppx = 2
                }
                this.zoom.url = J.getAttribute("data-zoom-image-2x");
                if (this.zoom.url) {
                    this.zoom.dppx = 2
                }
            }
            this.small.src = J.getAttribute("data-image") || J.getAttribute("rev") || (K ? K.getAttribute("src") : null);
            if (this.small.src) {
                this.small.src = z.getAbsoluteURL(this.small.src)
            }
            this.small.url = this.small.url || this.small.src;
            if (this.small.url) {
                this.small.url = z.getAbsoluteURL(this.small.url)
            }
            this.zoom.src = J.getAttribute("data-zoom-image") || J.getAttribute("href");
            if (this.zoom.src) {
                this.zoom.src = z.getAbsoluteURL(this.zoom.src)
            }
            this.zoom.url = this.zoom.url || this.zoom.src;
            if (this.zoom.url) {
                this.zoom.url = z.getAbsoluteURL(this.zoom.url)
            }
            this.caption = J.getAttribute("data-caption") || J.getAttribute("title") || I;
            this.link = J.getAttribute("data-link");
            this.origin = J;
            return this
        },
        loadImg: function(H) {
            var I = null;
            if (arguments.length > 1 && "function" === z.jTypeOf(arguments[1])) {
                I = arguments[1]
            }
            if (0 !== this[H].state) {
                if (this[H].loaded) {
                    this.onload(I)
                }
                return
            }
            if (this[H].url && this[H].node && !this[H].node.getAttribute("src") && !this[H].node.getAttribute("srcset")) {
                this[H].node.setAttribute("src", this[H].url)
            }
            this[H].state = 1;
            new z.ImageLoader(this[H].node || this[H].url, {
                oncomplete: h(function(J) {
                    this[H].loaded = true;
                    this[H].state = J.ready ? 2 : -1;
                    if (J.ready) {
                        this[H].size = J.jGetSize();
                        if (!this[H].node) {
                            this[H].node = h(J.img);
                            this[H].node.getAttribute("style");
                            this[H].node.removeAttribute("style");
                            this[H].size.width /= this[H].dppx;
                            this[H].size.height /= this[H].dppx
                        } else {
                            this[H].node.jSetCss({
                                "max-width": this[H].size.width,
                                "max-height": this[H].size.height
                            });
                            if (this[H].node.currentSrc && this[H].node.currentSrc != this[H].node.src) {
                                this[H].url = this[H].node.currentSrc
                            } else {
                                if (z.getAbsoluteURL(this[H].node.getAttribute("src") || "") != this[H].url) {
                                    this[H].node.setAttribute("src", this[H].url)
                                }
                            }
                        }
                    }
                    this.onload(I)
                }).jBind(this)
            })
        },
        loadSmall: function() {
            this.loadImg("small", arguments[0])
        },
        loadZoom: function() {
            this.loadImg("zoom", arguments[0])
        },
        load: function() {
            this.callback = null;
            if (arguments.length > 0 && "function" === z.jTypeOf(arguments[0])) {
                this.callback = arguments[0]
            }
            this.loadSmall();
            this.loadZoom()
        },
        onload: function(H) {
            if (H) {
                H.call(null, this)
            }
            if (this.callback && this.small.loaded && this.zoom.loaded) {
                this.callback.call(null, this);
                this.callback = null;
                return
            }
        },
        loaded: function() {
            return (this.small.loaded && this.zoom.loaded)
        },
        ready: function() {
            return (2 === this.small.state && 2 === this.zoom.state)
        },
        getURL: function(I) {
            var H = "small" == I ? "zoom" : "small";
            if (!this[I].loaded || (this[I].loaded && 2 === this[I].state)) {
                return this[I].url
            } else {
                if (!this[H].loaded || (this[H].loaded && 2 === this[H].state)) {
                    return this[H].url
                } else {
                    return null
                }
            }
        },
        getNode: function(I) {
            var H = "small" == I ? "zoom" : "small";
            if (!this[I].loaded || (this[I].loaded && 2 === this[I].state)) {
                return this[I].node
            } else {
                if (!this[H].loaded || (this[H].loaded && 2 === this[H].state)) {
                    return this[H].node
                } else {
                    return null
                }
            }
        },
        jGetSize: function(I) {
            var H = "small" == I ? "zoom" : "small";
            if (!this[I].loaded || (this[I].loaded && 2 === this[I].state)) {
                return this[I].size
            } else {
                if (!this[H].loaded || (this[H].loaded && 2 === this[H].state)) {
                    return this[H].size
                } else {
                    return {
                        width: 0,
                        height: 0
                    }
                }
            }
        },
        getRatio: function(I) {
            var H = "small" == I ? "zoom" : "small";
            if (!this[I].loaded || (this[I].loaded && 2 === this[I].state)) {
                return this[I].dppx
            } else {
                if (!this[H].loaded || (this[H].loaded && 2 === this[H].state)) {
                    return this[H].dppx
                } else {
                    return 1
                }
            }
        },
        setCurNode: function(H) {
            this.node = this.getNode(H)
        }
    };
    var j = function(I, H) {
        this.options = new z.Options(o);
        this.option = h(function() {
            if (arguments.length > 1) {
                return this.set(arguments[0], arguments[1])
            } else {
                return this.get(arguments[0])
            }
        }).jBind(this.options);
        this.touchOptions = new z.Options(l);
        this.additionalImages = [];
        this.image = null;
        this.primaryImage = null;
        this.placeholder = h(I).jAddEvent("dragstart selectstart click", function(J) {
            J.stop()
        });
        this.id = null;
        this.node = null;
        this.stubNode = null;
        this.originalImg = null;
        this.originalImgSrc = null;
        this.originalTitle = null;
        this.normalSize = {
            width: 0,
            height: 0
        };
        this.size = {
            width: 0,
            height: 0
        };
        this.zoomSize = {
            width: 0,
            height: 0
        };
        this.zoomSizeOrigin = {
            width: 0,
            height: 0
        };
        this.boundaries = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        };
        this.ready = false;
        this.expanded = false;
        this.activateTimer = null;
        this.resizeTimer = null;
        this.resizeCallback = h(function() {
            if (this.expanded) {
                this.image.node.jSetCss({
                    "max-height": Math.min(this.image.jGetSize("zoom").height, this.expandMaxHeight())
                });
                this.image.node.jSetCss({
                    "max-width": Math.min(this.image.jGetSize("zoom").width, this.expandMaxWidth())
                })
            }
            this.reflowZoom(arguments[0])
        }).jBind(this);
        this.onResize = h(function(J) {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = h(this.resizeCallback).jDelay(10, "scroll" === J.type)
        }).jBindAsEvent(this);
        if (s) {
            G.append(z.$new("div", {}, {
                display: "none",
                visibility: "hidden"
            }).append(document.createTextNode(s)));
            s = undefined
        }
        this.lens = null;
        this.zoomBox = null;
        this.hint = null;
        this.hintMessage = null;
        this.hintRuns = 0;
        this.mobileZoomHint = true;
        this.loadingBox = null;
        this.loadTimer = null;
        this.thumb = null;
        this.expandBox = null;
        this.expandBg = null;
        this.expandCaption = null;
        this.expandStage = null;
        this.expandImageStage = null;
        this.expandFigure = null;
        this.expandControls = null;
        this.expandNav = null;
        this.expandThumbs = null;
        this.expandGallery = [];
        this.buttons = {};
        this.start(H)
    };
    j.prototype = {
        loadOptions: function(H) {
            this.options.fromJSON(window[C + "Options"] || {});
            this.options.fromString(this.placeholder.getAttribute("data-options") || "");
            if (z.browser.mobile) {
                this.options.fromJSON(this.touchOptions.getJSON());
                this.options.fromJSON(window[C + "MobileOptions"] || {});
                this.options.fromString(this.placeholder.getAttribute("data-mobile-options") || "")
            }
            if ("string" == z.jTypeOf(H)) {
                this.options.fromString(H || "")
            } else {
                this.options.fromJSON(H || {})
            }
            if (this.option("cssClass")) {
                this.option("cssClass", this.option("cssClass").replace(",", " "))
            }
            if (false === this.option("zoomCaption")) {
                this.option("zoomCaption", "off")
            }
            if (false === this.option("hint")) {
                this.option("hint", "off")
            }
            switch (this.option("hint")) {
                case "off":
                    this.hintRuns = 0;
                    break;
                case "once":
                    this.hintRuns = 2;
                    break;
                case "always":
                    this.hintRuns = Infinity;
                    break
            }
            if ("off" === this.option("zoomMode")) {
                this.option("zoomMode", false)
            }
            if ("off" === this.option("expand")) {
                this.option("expand", false)
            }
            if ("off" === this.option("expandZoomMode")) {
                this.option("expandZoomMode", false)
            }
            if (z.browser.mobile && "zoom" == this.option("zoomMode") && "inner" == this.option("zoomPosition")) {
                if (this.option("expand")) {
                    this.option("zoomMode", false)
                } else {
                    this.option("zoomOn", "click")
                }
            }
        },
        start: function(I) {
            var H;
            this.loadOptions(I);
            if (y && !this.option("autostart")) {
                return
            }
            this.id = this.placeholder.getAttribute("id") || "mz-" + Math.floor(Math.random() * z.now());
            this.placeholder.setAttribute("id", this.id);
            this.node = z.$new("figure").jAddClass("mz-figure");
            D(this.placeholder);
            this.originalImg = this.placeholder.querySelector("img");
            this.originalImgSrc = this.originalImg ? this.originalImg.getAttribute("src") : null;
            this.originalTitle = h(this.placeholder).getAttribute("title");
            h(this.placeholder).removeAttribute("title");
            this.primaryImage = new k().parseNode(this.placeholder, this.originalTitle, true);
            this.image = this.primaryImage;
            this.node.enclose(this.image.small.node).jAddClass(this.option("cssClass"));
            if (true !== this.option("rightClick")) {
                this.node.jAddEvent("contextmenu", function(K) {
                    K.stop();
                    return false
                })
            }
            this.node.jAddClass("mz-" + this.option("zoomOn") + "-zoom");
            if (!this.option("expand")) {
                this.node.jAddClass("mz-no-expand")
            }
            this.lens = {
                node: z.$new("div", {
                    "class": "mz-lens"
                }, {
                    top: 0
                }).jAppendTo(this.node),
                image: z.$new("img", {
                    src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                }, {
                    position: "absolute",
                    top: 0,
                    left: 0
                }),
                width: 0,
                height: 0,
                pos: {
                    x: 0,
                    y: 0
                },
                spos: {
                    x: 0,
                    y: 0
                },
                size: {
                    width: 0,
                    height: 0
                },
                border: {
                    x: 0,
                    y: 0
                },
                dx: 0,
                dy: 0,
                innertouch: false,
                hide: function() {
                    if (z.browser.features.transform) {
                        this.node.jSetCss({
                            transform: "translate(-10000px,-10000px)"
                        })
                    } else {
                        this.node.jSetCss({
                            top: -10000
                        })
                    }
                }
            };
            this.lens.hide();
            this.lens.node.append(this.lens.image);
            this.zoomBox = {
                node: z.$new("div", {
                    "class": "mz-zoom-window"
                }, {
                    top: -100000
                }).jAddClass(this.option("cssClass")).jAppendTo(G),
                image: z.$new("img", {
                    src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                }, {
                    position: "absolute"
                }),
                aspectRatio: 0,
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                size: {
                    width: "auto",
                    wunits: "px",
                    height: "auto",
                    hunits: "px"
                },
                mode: this.option("zoomMode"),
                position: this.option("zoomPosition"),
                trigger: this.option("zoomOn"),
                custom: false,
                active: false,
                activating: false,
                enabled: false,
                enable: h(function() {
                    this.zoomBox.enabled = false !== arguments[0];
                    this.node[this.zoomBox.enabled ? "jRemoveClass" : "jAddClass"]("mz-no-zoom")
                }).jBind(this),
                hide: h(function() {
                    var K = h(this.node).jFetch("cr");
                    this.zoomBox.node.jRemoveEvent("transitionend");
                    this.zoomBox.node.jSetCss({
                        top: -100000
                    }).jAppendTo(G);
                    this.zoomBox.node.jRemoveClass("mz-deactivating mz-p-" + ("zoom" == this.zoomBox.mode ? this.zoomBox.position : this.zoomBox.mode));
                    if (!this.expanded && K) {
                        K.jRemove()
                    }
                    this.zoomBox.image.getAttribute("style");
                    this.zoomBox.image.removeAttribute("style")
                }).jBind(this),
                setMode: h(function(K) {
                    this.node[false === K ? "jAddClass" : "jRemoveClass"]("mz-no-zoom");
                    this.node["magnifier" == K ? "jAddClass" : "jRemoveClass"]("mz-magnifier-zoom");
                    this.zoomBox.node["magnifier" == K ? "jAddClass" : "jRemoveClass"]("mz-magnifier");
                    this.zoomBox.node["preview" == K ? "jAddClass" : "jRemoveClass"]("mz-preview");
                    if ("zoom" != K) {
                        this.node.jRemoveClass("mz-inner-zoom");
                        this.zoomBox.node.jRemoveClass("mz-inner")
                    }
                    this.zoomBox.mode = K;
                    if (false === K) {
                        this.zoomBox.enable(false)
                    } else {
                        if ("preview" === K) {
                            this.zoomBox.enable(true)
                        }
                    }
                }).jBind(this)
            };
            this.zoomBox.node.append(this.zoomBox.image);
            this.zoomBox.setMode(this.option("zoomMode"));
            this.zoomBox.image.removeAttribute("width");
            this.zoomBox.image.removeAttribute("height");
            if ("undefined" !== typeof(q)) {
                var J = Math.floor(Math.random() * z.now());
                h(this.node).jStore("cr", z.$new(((Math.floor(Math.random() * 101) + 1) % 2) ? "span" : "div").setProps({
                    id: "crMz" + J
                }).jSetCss({
                    display: "inline",
                    overflow: "hidden",
                    visibility: "visible",
                    color: q[1],
                    fontSize: q[2],
                    fontWeight: q[3],
                    fontFamily: "sans-serif",
                    position: "absolute",
                    top: 8,
                    left: 8,
                    margin: "auto",
                    width: "auto",
                    textAlign: "right",
                    "line-height": "2em",
                    zIndex: 2147483647
                }).changeContent("tracing back the heritage"));		//changeContent(w(q[0])));
                if (h(h(this.node).jFetch("cr")).byTag("a")[0]) {
                    h(h(h(this.node).jFetch("cr")).byTag("a")[0]).jAddEvent("tap btnclick", function(K) {
                        K.stopDistribution();
                        window.open(this.href)
                    }).setProps({
                        id: "mzCrA" + J
                    })
                }
                z.addCSS("#" + this.id + " > figure.mz-figure > #" + ("crMz" + J) + ",#" + this.id + " > figure.mz-figure > #" + ("crMz" + J) + " > #" + ("mzCrA" + J) + ",html body .mz-expand > #" + ("crMz" + J) + " > #" + ("mzCrA" + J) + ",html body .mz-expand > #" + ("crMz" + J) + " > #" + ("mzCrA" + J), {
                    display: "inline !important;",
                    visibility: "visible !important;",
                    zIndex: "2147483647 !important;",
                    fontSize: q[2] + " !important;",
                    color: q[1] + " !important;"
                }, "mz-runtime-css", true)
            }
            if ((H = ("" + this.option("zoomWidth")).match(/^([0-9]+)?(px|%)?$/))) {
                this.zoomBox.size.wunits = H[2] || "px";
                this.zoomBox.size.width = (parseFloat(H[1]) || "auto")
            }
            if ((H = ("" + this.option("zoomHeight")).match(/^([0-9]+)?(px|%)?$/))) {
                this.zoomBox.size.hunits = H[2] || "px";
                this.zoomBox.size.height = (parseFloat(H[1]) || "auto")
            }
            if ("magnifier" == this.zoomBox.mode) {
                this.node.jAddClass("mz-magnifier-zoom");
                this.zoomBox.node.jAddClass("mz-magnifier");
                if ("auto" === this.zoomBox.size.width) {
                    this.zoomBox.size.wunits = "%";
                    this.zoomBox.size.width = 70
                }
                if ("auto" === this.zoomBox.size.height) {
                    this.zoomBox.size.hunits = "%"
                }
            } else {
                if (this.option("zoom-position").match(/^#/)) {
                    if (this.zoomBox.custom = h(this.option("zoom-position").replace(/^#/, ""))) {
                        if (h(this.zoomBox.custom).jGetSize().height > 50) {
                            if ("auto" === this.zoomBox.size.width) {
                                this.zoomBox.size.wunits = "%";
                                this.zoomBox.size.width = 100
                            }
                            if ("auto" === this.zoomBox.size.height) {
                                this.zoomBox.size.hunits = "%";
                                this.zoomBox.size.height = 100
                            }
                        }
                    } else {
                        this.option("zoom-position", "right")
                    }
                }
                if ("preview" == this.zoomBox.mode) {
                    if ("auto" === this.zoomBox.size.width) {
                        this.zoomBox.size.wunits = "px"
                    }
                    if ("auto" === this.zoomBox.size.height) {
                        this.zoomBox.size.hunits = "px"
                    }
                }
                if ("zoom" == this.zoomBox.mode) {
                    if ("auto" === this.zoomBox.size.width || "inner" == this.option("zoom-position")) {
                        this.zoomBox.size.wunits = "%";
                        this.zoomBox.size.width = 100
                    }
                    if ("auto" === this.zoomBox.size.height || "inner" == this.option("zoom-position")) {
                        this.zoomBox.size.hunits = "%";
                        this.zoomBox.size.height = 100
                    }
                }
                if ("inner" == this.option("zoom-position")) {
                    this.node.jAddClass("mz-inner-zoom")
                }
            }
            this.zoomBox.position = this.zoomBox.custom ? "custom" : this.option("zoom-position");
            this.lens.border.x = parseFloat(this.lens.node.jGetCss("border-left-width") || "0");
            this.lens.border.y = parseFloat(this.lens.node.jGetCss("border-top-width") || "0");
            this.image.loadSmall(function() {
                if (2 !== this.image.small.state) {
                    return
                }
                this.image.setCurNode("small");
                this.size = this.image.node.jGetSize();
                this.registerEvents();
                this.ready = true;
                if (true === this.option("lazyZoom")) {
                    this.showHint()
                }
            }.jBind(this));
            if (true !== this.option("lazyZoom") || "always" == this.option("zoomOn")) {
                this.image.load(h(function(K) {
                    this.setupZoom(K, true)
                }).jBind(this));
                this.loadTimer = h(this.showLoading).jBind(this).jDelay(400)
            }
            this.setupSelectors()
        },
        stop: function() {
            this.unregisterEvents();
            if (this.zoomBox) {
                this.zoomBox.node.kill()
            }
            if (this.expandThumbs) {
                this.expandThumbs.stop();
                this.expandThumbs = null
            }
            if (this.expandBox) {
                this.expandBox.kill()
            }
            if (this.expanded) {
                h(z.browser.getDoc()).jSetCss({
                    overflow: ""
                })
            }
            h(this.additionalImages).jEach(function(H) {
                h(H.origin).jRemoveClass("mz-thumb-selected").jRemoveClass(this.option("cssClass") || "mz-$dummy-css-class-to-jRemove$")
            }, this);
            if (this.originalImg) {
                this.placeholder.append(this.originalImg);
                if (this.originalImgSrc) {
                    this.originalImg.setAttribute("src", this.originalImgSrc)
                }
            }
            if (this.originalTitle) {
                this.placeholder.setAttribute("title", this.originalTitle)
            }
            if (this.node) {
                this.node.kill()
            }
        },
        setupZoom: function(J, K) {
            var I = this.initEvent,
                H = this.image;
            this.initEvent = null;
            if (2 !== J.zoom.state) {
                this.image = J;
                this.ready = true;
                this.zoomBox.enable(false);
                return
            }
            this.image = J;
            this.image.setCurNode(this.expanded ? "zoom" : "small");
            this.zoomBox.image.src = this.image.getURL("zoom");
            this.zoomBox.node.jRemoveClass("mz-preview");
            this.zoomBox.image.getAttribute("style");
            this.zoomBox.image.removeAttribute("style");
            this.zoomBox.node.jGetSize();
            setTimeout(h(function() {
                var M = this.zoomBox.image.jGetSize(),
                    L;
                this.zoomSizeOrigin = this.image.jGetSize("zoom");
                if (M.width * M.height > 1 && M.width * M.height < this.zoomSizeOrigin.width * this.zoomSizeOrigin.height) {
                    this.zoomSizeOrigin = M
                }
                this.zoomSize = z.detach(this.zoomSizeOrigin);
                if ("preview" == this.zoomBox.mode) {
                    this.zoomBox.node.jAddClass("mz-preview")
                }
                this.setCaption();
                this.lens.image.src = this.image.node.currentSrc || this.image.node.src;
                this.zoomBox.enable(this.zoomBox.mode && !(this.expanded && "preview" == this.zoomBox.mode));
                this.ready = true;
                this.activateTimer = null;
                this.resizeCallback();
                this.node.jAddClass("mz-ready");
                this.hideLoading();
                if (H !== this.image) {
                    t("onUpdate", this.id, H.origin, this.image.origin);
                    if (this.nextImage) {
                        L = this.nextImage;
                        this.nextImage = null;
                        this.update(L.image, L.onswipe)
                    }
                } else {
                    t("onZoomReady", this.id)
                }
                if (I) {
                    this.node.jCallEvent(I.type, I)
                } else {
                    if (this.expanded && "always" == this.option("expandZoomOn")) {
                        this.activate()
                    } else {
                        if (!!K) {
                            this.showHint()
                        }
                    }
                }
            }).jBind(this), 256)
        },
        setupSelectors: function() {
            var I = this.id,
                H, J;
            J = new RegExp("zoom\\-id(\\s+)?:(\\s+)?" + I + "($|;)");
            if (z.browser.features.query) {
                H = z.$A(document.querySelectorAll('[data-zoom-id="' + this.id + '"]'));
                H = h(H).concat(z.$A(document.querySelectorAll('[rel*="zoom-id"]')).filter(function(K) {
                    return J.test(K.getAttribute("rel") || "")
                }))
            } else {
                H = z.$A(document.getElementsByTagName("A")).filter(function(K) {
                    return I == K.getAttribute("data-zoom-id") || J.test(K.getAttribute("rel") || "")
                })
            }
            h(H).jEach(function(L) {
                var K, M;
                h(L).jAddEvent("click", function(N) {
                    N.stopDefaults()
                });
                K = new k().parseNode(L, this.originalTitle);
                if (this.image.zoom.src.has(K.zoom.src) && this.image.small.src.has(K.small.src)) {
                    h(K.origin).jAddClass("mz-thumb-selected");
                    K = this.image;
                    K.origin = L
                }
                if (!K.link && this.image.link) {
                    K.link = this.image.link
                }
                M = h(function() {
                    this.update(K)
                }).jBind(this);
                h(L).jAddEvent("mousedown", function(N) {
                    if ("stopImmediatePropagation" in N) {
                        N.stopImmediatePropagation()
                    }
                }, 5);
                h(L).jAddEvent("tap " + ("hover" == this.option("selectorTrigger") ? "mouseover mouseout" : "btnclick"), h(function(O, N) {
                    if (this.updateTimer) {
                        clearTimeout(this.updateTimer)
                    }
                    this.updateTimer = false;
                    if ("mouseover" == O.type) {
                        this.updateTimer = h(M).jDelay(N)
                    } else {
                        if ("tap" == O.type || "btnclick" == O.type) {
                            M()
                        }
                    }
                }).jBindAsEvent(this, 60)).jAddClass(this.option("cssClass")).jAddClass("mz-thumb");
                K.loadSmall();
                if (true !== this.option("lazyZoom")) {
                    K.loadZoom()
                }
                this.additionalImages.push(K)
            }, this)
        },
        update: function(H, I) {
            if (!this.ready) {
                this.nextImage = {
                    image: H,
                    onswipe: I
                };
                return
            }
            if (!H || H === this.image) {
                return false
            }
            this.deactivate(null, true);
            this.ready = false;
            this.node.jRemoveClass("mz-ready");
            this.loadTimer = h(this.showLoading).jBind(this).jDelay(400);
            H.load(h(function(P) {
                var J, Q, O, L, K, N, M = (z.browser.ieMode < 10) ? "jGetSize" : "getBoundingClientRect";
                this.hideLoading();
                P.setCurNode("small");
                if (!P.node) {
                    this.ready = true;
                    this.node.jAddClass("mz-ready");
                    return
                }
                this.setActiveThumb(P);
                J = this.image.node[M]();
                if (this.expanded) {
                    P.setCurNode("zoom");
                    O = z.$new("div").jAddClass("mz-expand-bg");
                    if ((z.browser.features.cssFilters && "edge" !== z.browser.uaName) || z.browser.ieMode < 10) {
                        O.append(z.$new("img", {
                            src: P.getURL("zoom")
                        }).jSetCss({
                            opacity: 0
                        }))
                    } else {
                        O.append(new z.SVGImage(P.node).blur(b).getNode().jSetCss({
                            opacity: 0
                        }))
                    }
                    h(O).jSetCss({
                        "z-index": -99
                    }).jAppendTo(this.expandBox)
                }
                if (this.expanded && "zoom" === this.zoomBox.mode && "always" === this.option("expandZoomOn")) {
                    h(P.node).jSetCss({
                        opacity: 0
                    }).jAppendTo(this.node);
                    Q = J;
                    K = [P.node, this.image.node];
                    N = [{
                        opacity: [0, 1]
                    }, {
                        opacity: [1, 0]
                    }];
                    h(P.node).jSetCss({
                        "max-width": Math.min(P.jGetSize("zoom").width, this.expandMaxWidth()),
                        "max-height": Math.min(P.jGetSize("zoom").height, this.expandMaxHeight())
                    })
                } else {
                    this.node.jSetCss({
                        height: this.node[M]().height
                    });
                    this.image.node.jSetCss({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        width: "100%",
                        height: "100%",
                        "max-width": "",
                        "max-height": ""
                    });
                    h(P.node).jSetCss({
                        "max-width": Math.min(P.jGetSize(this.expanded ? "zoom" : "small").width, this.expanded ? this.expandMaxWidth() : Infinity),
                        "max-height": Math.min(P.jGetSize(this.expanded ? "zoom" : "small").height, this.expanded ? this.expandMaxHeight() : Infinity),
                        position: "relative",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        transform: ""
                    }).jAppendTo(this.node);
                    Q = h(P.node)[M]();
                    if (!I) {
                        h(P.node).jSetCss({
                            "min-width": J.width,
                            height: J.height,
                            "max-width": J.width,
                            "max-height": ""
                        })
                    }
                    this.node.jSetCss({
                        height: "",
                        overflow: ""
                    }).jGetSize();
                    h(P.node).jGetSize();
                    K = [P.node, this.image.node];
                    N = [z.extend({
                        opacity: [0, 1]
                    }, I ? {
                        scale: [0.6, 1]
                    } : {
                        "min-width": [J.width, Q.width],
                        "max-width": [J.width, Q.width],
                        height: [J.height, Q.height]
                    }), {
                        opacity: [1, 0]
                    }]
                }
                if (this.expanded) {
                    if (this.expandBg.firstChild && O.firstChild) {
                        L = h(this.expandBg.firstChild).jGetCss("opacity");
                        if (z.browser.gecko) {
                            K = K.concat([O.firstChild]);
                            N = N.concat([{
                                opacity: [0.0001, L]
                            }])
                        } else {
                            K = K.concat([O.firstChild, this.expandBg.firstChild]);
                            N = N.concat([{
                                opacity: [0.0001, L]
                            }, {
                                opacity: [L, 0.0001]
                            }])
                        }
                    }
                }
                new z.PFX(K, {
                    duration: (I || this.option("transitionEffect")) ? I ? 400 : 350 : 0,
                    transition: I ? "cubic-bezier(0.175, 0.885, 0.320, 1.275)" : (J.width == Q.width) ? "linear" : "cubic-bezier(0.25, .1, .1, 1)",
                    onComplete: h(function() {
                        this.image.node.jRemove().getAttribute("style");
                        this.image.node.removeAttribute("style");
                        h(P.node).jSetCss(this.expanded ? {
                            width: "auto",
                            height: "auto"
                        } : {
                            width: "",
                            height: ""
                        }).jSetCss({
                            "min-width": "",
                            "min-height": "",
                            opacity: "",
                            "max-width": Math.min(P.jGetSize(this.expanded ? "zoom" : "small").width, this.expanded ? this.expandMaxWidth() : Infinity),
                            "max-height": Math.min(P.jGetSize(this.expanded ? "zoom" : "small").height, this.expanded ? this.expandMaxHeight() : Infinity)
                        });
                        if (this.expanded) {
                            this.expandBg.jRemove();
                            this.expandBg = undefined;
                            this.expandBg = O.jSetCssProp("z-index", -100);
                            h(this.expandBg.firstChild).jSetCss({
                                opacity: ""
                            });
                            if (this.expandCaption) {
                                if (P.caption) {
                                    if (P.link) {
                                        this.expandCaption.changeContent("").append(z.$new("a", {
                                            href: P.link
                                        }).jAddEvent("tap btnclick", this.openLink.jBind(this)).changeContent(P.caption))
                                    } else {
                                        this.expandCaption.changeContent(P.caption).jAddClass("mz-show")
                                    }
                                } else {
                                    this.expandCaption.jRemoveClass("mz-show")
                                }
                            }
                        }
                        this.setupZoom(P)
                    }).jBind(this),
                    onBeforeRender: h(function(R, S) {
                        if (undefined !== R.scale) {
                            S.jSetCssProp("transform", "scale(" + R.scale + ")")
                        }
                    })
                }).start(N)
            }).jBind(this))
        },
        setActiveThumb: function(I) {
            var H = false;
            h(this.additionalImages).jEach(function(J) {
                h(J.origin).jRemoveClass("mz-thumb-selected");
                if (J === I) {
                    H = true
                }
            });
            if (H && I.origin) {
                h(I.origin).jAddClass("mz-thumb-selected")
            }
            if (this.expandThumbs) {
                this.expandThumbs.selectItem(I.selector)
            }
        },
        setCaption: function(H) {
            if (this.image.caption && "off" !== this.option("zoomCaption") && "magnifier" !== this.zoomBox.mode) {
                if (!this.zoomBox.caption) {
                    this.zoomBox.caption = z.$new("div", {
                        "class": "mz-caption"
                    }).jAppendTo(this.zoomBox.node.jAddClass("caption-" + this.option("zoomCaption")))
                }
                this.zoomBox.caption.changeContent(this.image.caption)
            }
        },
        showHint: function(H, K, I) {
            var J;
            if (!this.expanded) {
                if (this.hintRuns <= 0) {
                    return
                }
                if (true !== I) {
                    this.hintRuns--
                }
            }
            if (undefined === K || null === K) {
                if (!this.zoomBox.active && !this.zoomBox.activating) {
                    if (this.option("zoomMode") && (this.zoomBox.enabled || !this.image.loaded())) {
                        if ("hover" == this.zoomBox.trigger) {
                            K = this.option("textHoverZoomHint")
                        } else {
                            if ("click" == this.zoomBox.trigger) {
                                K = this.option("textClickZoomHint")
                            }
                        }
                    } else {
                        K = this.option("expand") ? this.option("textExpandHint") : ""
                    }
                } else {
                    K = this.option("expand") ? this.option("textExpandHint") : ""
                }
            }
            if (!K) {
                this.hideHint();
                return
            }
            J = this.node;
            if (!this.hint) {
                this.hint = z.$new("div", {
                    "class": "mz-hint"
                });
                this.hintMessage = z.$new("span", {
                    "class": "mz-hint-message"
                }).append(document.createTextNode(K)).jAppendTo(this.hint);
                h(this.hint).jAppendTo(this.node)
            } else {
                h(this.hintMessage).changeContent(K)
            }
            this.hint.jSetCss({
                "transition-delay": ""
            }).jRemoveClass("mz-hint-hidden");
            if (this.expanded) {
                J = this.expandFigure
            } else {
                if ((this.zoomBox.active || this.zoomBox.activating) && "magnifier" !== this.zoomBox.mode && "inner" == this.zoomBox.position) {
                    J = this.zoomBox.node
                }
            }
            if (true === H) {
                setTimeout(h(function() {
                    this.hint.jAddClass("mz-hint-hidden")
                }).jBind(this), 16)
            }
            this.hint.jAppendTo(J)
        },
        hideHint: function() {
            if (this.hint) {
                this.hint.jSetCss({
                    "transition-delay": "0ms"
                }).jAddClass("mz-hint-hidden")
            }
        },
        showLoading: function() {
            if (!this.loadingBox) {
                this.loadingBox = z.$new("div", {
                    "class": "mz-loading"
                });
                this.node.append(this.loadingBox);
                this.loadingBox.jGetSize()
            }
            this.loadingBox.jAddClass("shown")
        },
        hideLoading: function() {
            clearTimeout(this.loadTimer);
            this.loadTimer = null;
            if (this.loadingBox) {
                h(this.loadingBox).jRemoveClass("shown")
            }
        },
        setSize: function(J, N) {
            var M = z.detach(this.zoomBox.size),
                L = (!this.expanded && this.zoomBox.custom) ? h(this.zoomBox.custom).jGetSize() : {
                    width: 0,
                    height: 0
                },
                I, H, K = this.size,
                O = {
                    x: 0,
                    y: 0
                };
            N = N || this.zoomBox.position;
            this.normalSize = this.image.node.jGetSize();
            this.size = this.image.node.jGetSize();
            this.boundaries = this.image.node.getBoundingClientRect();
            if (!L.height) {
                L = this.size
            }
            if (false === this.option("upscale") || false === this.zoomBox.mode || "preview" === this.zoomBox.mode) {
                J = false
            }
            if ("preview" == this.zoomBox.mode) {
                if ("auto" === M.width) {
                    M.width = this.zoomSizeOrigin.width
                }
                if ("auto" === M.height) {
                    M.height = this.zoomSizeOrigin.height
                }
            }
            if (this.expanded && "magnifier" == this.zoomBox.mode) {
                M.width = 70;
                M.height = "auto"
            }
            if ("magnifier" == this.zoomBox.mode && "auto" === M.height) {
                this.zoomBox.width = parseFloat(M.width / 100) * Math.min(L.width, L.height);
                this.zoomBox.height = this.zoomBox.width
            } else {
                if ("zoom" == this.zoomBox.mode && "inner" == N) {
                    this.size = this.node.jGetSize();
                    L = this.size;
                    this.boundaries = this.node.getBoundingClientRect();
                    this.zoomBox.width = L.width;
                    this.zoomBox.height = L.height
                } else {
                    this.zoomBox.width = ("%" === M.wunits) ? parseFloat(M.width / 100) * L.width : parseInt(M.width);
                    this.zoomBox.height = ("%" === M.hunits) ? parseFloat(M.height / 100) * L.height : parseInt(M.height)
                }
            }
            if ("preview" == this.zoomBox.mode) {
                H = Math.min(Math.min(this.zoomBox.width / this.zoomSizeOrigin.width, this.zoomBox.height / this.zoomSizeOrigin.height), 1);
                this.zoomBox.width = this.zoomSizeOrigin.width * H;
                this.zoomBox.height = this.zoomSizeOrigin.height * H
            }
            this.zoomBox.width = Math.ceil(this.zoomBox.width);
            this.zoomBox.height = Math.ceil(this.zoomBox.height);
            this.zoomBox.aspectRatio = this.zoomBox.width / this.zoomBox.height;
            this.zoomBox.node.jSetCss({
                width: this.zoomBox.width,
                height: this.zoomBox.height
            });
            if (J) {
                L = this.expanded ? this.expandBox.jGetSize() : this.zoomBox.node.jGetSize();
                if (!this.expanded && (this.normalSize.width * this.normalSize.height) / (this.zoomSizeOrigin.width * this.zoomSizeOrigin.height) > 0.8) {
                    this.zoomSize.width = 1.5 * this.zoomSizeOrigin.width;
                    this.zoomSize.height = 1.5 * this.zoomSizeOrigin.height
                } else {
                    this.zoomSize = z.detach(this.zoomSizeOrigin)
                }
            }
            if (false !== this.zoomBox.mode && !this.zoomBox.active && !(this.expanded && "always" == this.option("expandZoomOn"))) {
                if ((this.normalSize.width * this.normalSize.height) / (this.zoomSize.width * this.zoomSize.height) > 0.8) {
                    this.zoomSize = z.detach(this.zoomSizeOrigin);
                    this.zoomBox.enable(false)
                } else {
                    this.zoomBox.enable(true)
                }
            }
            this.zoomBox.image.jSetCss({
                width: this.zoomSize.width,
                height: this.zoomSize.height
            });
            I = this.zoomBox.node.getInnerSize();
            this.zoomBox.innerWidth = Math.ceil(I.width);
            this.zoomBox.innerHeight = Math.ceil(I.height);
            this.lens.width = Math.ceil(this.zoomBox.innerWidth / (this.zoomSize.width / this.size.width));
            this.lens.height = Math.ceil(this.zoomBox.innerHeight / (this.zoomSize.height / this.size.height));
            this.lens.node.jSetCss({
                width: this.lens.width,
                height: this.lens.height
            });
            this.lens.image.jSetCss(this.size);
            z.extend(this.lens, this.lens.node.jGetSize());
            if (this.zoomBox.active) {
                clearTimeout(this.moveTimer);
                this.moveTimer = null;
                if (this.lens.innertouch) {
                    this.lens.pos.x *= (this.size.width / K.width);
                    this.lens.pos.y *= (this.size.height / K.height);
                    O.x = this.lens.spos.x;
                    O.y = this.lens.spos.y
                } else {
                    O.x = this.boundaries.left + this.lens.width / 2 + (this.lens.pos.x * (this.size.width / K.width));
                    O.y = this.boundaries.top + this.lens.height / 2 + (this.lens.pos.y * (this.size.height / K.height))
                }
                this.animate(null, O)
            }
        },
        reflowZoom: function(L) {
            var O, N, H, M, K, J, I = h(this.node).jFetch("cr");
            H = a(5);
            K = this.zoomBox.position;
            M = this.expanded ? "inner" : this.zoomBox.custom ? "custom" : this.option("zoom-position");
            J = this.expanded && "zoom" == this.zoomBox.mode ? this.expandBox : document.body;
            if (this.expanded) {
                H.y = 0;
                H.x = 0
            }
            if (!L) {
                this.setSize(true, M)
            }
            O = this.boundaries.top;
            if ("magnifier" !== this.zoomBox.mode) {
                if (L) {
                    this.setSize(false);
                    return
                }
                switch (M) {
                    case "inner":
                    case "custom":
                        O = 0;
                        N = 0;
                        break;
                    case "top":
                        O = this.boundaries.top - this.zoomBox.height - this.option("zoom-distance");
                        if (H.top > O) {
                            O = this.boundaries.bottom + this.option("zoom-distance");
                            M = "bottom"
                        }
                        N = this.boundaries.left;
                        break;
                    case "bottom":
                        O = this.boundaries.bottom + this.option("zoom-distance");
                        if (H.bottom < O + this.zoomBox.height) {
                            O = this.boundaries.top - this.zoomBox.height - this.option("zoom-distance");
                            M = "top"
                        }
                        N = this.boundaries.left;
                        break;
                    case "left":
                        N = this.boundaries.left - this.zoomBox.width - this.option("zoom-distance");
                        if (H.left > N && H.right >= this.boundaries.right + this.option("zoom-distance") + this.zoomBox.width) {
                            N = this.boundaries.right + this.option("zoom-distance");
                            M = "right"
                        }
                        break;
                    case "right":
                    default:
                        N = this.boundaries.right + this.option("zoom-distance");
                        if (H.right < N + this.zoomBox.width && H.left <= this.boundaries.left - this.zoomBox.width - this.option("zoom-distance")) {
                            N = this.boundaries.left - this.zoomBox.width - this.option("zoom-distance");
                            M = "left"
                        }
                        break
                }
                switch (this.option("zoom-position")) {
                    case "top":
                    case "bottom":
                        if (H.top > O || H.bottom < O + this.zoomBox.height) {
                            M = "inner"
                        }
                        break;
                    case "left":
                    case "right":
                        if (H.left > N || H.right < N + this.zoomBox.width) {
                            M = "inner"
                        }
                        break
                }
                this.zoomBox.position = M;
                if (!this.zoomBox.activating && !this.zoomBox.active) {
                    if (z.browser.mobile && !this.expanded && "zoom" == this.zoomBox.mode) {
                        if (this.option("expand")) {
                            this.zoomBox.enable("inner" !== M)
                        } else {
                            if ("click" !== this.option("zoomOn")) {
                                this.zoomBox.trigger = "inner" === M ? "click" : this.option("zoomOn");
                                this.unregisterActivateEvent();
                                this.unregisterDeactivateEvent();
                                this.registerActivateEvent("click" === this.zoomBox.trigger);
                                this.registerDeactivateEvent("click" === this.zoomBox.trigger && !this.option("expand"))
                            }
                        }
                        this.showHint(false, null, true)
                    }
                    return
                }
                this.setSize(false);
                if (L) {
                    return
                }
                if ("custom" == M) {
                    J = this.zoomBox.custom;
                    H.y = 0;
                    H.x = 0
                }
                if ("inner" == M) {
                    if ("preview" !== this.zoomBox.mode) {
                        this.zoomBox.node.jAddClass("mz-inner");
                        this.node.jAddClass("mz-inner-zoom")
                    }
                    this.lens.hide();
                    O = this.boundaries.top + H.y;
                    N = this.boundaries.left + H.x;
                    if (!this.expanded && z.browser.ieMode && z.browser.ieMode < 11) {
                        O = 0;
                        N = 0;
                        J = this.node
                    }
                } else {
                    O += H.y;
                    N += H.x;
                    this.node.jRemoveClass("mz-inner-zoom");
                    this.zoomBox.node.jRemoveClass("mz-inner")
                }
                this.zoomBox.node.jSetCss({
                    top: O,
                    left: N
                })
            } else {
                this.setSize(false);
                J = this.node
            }
            this.zoomBox.node[this.expanded ? "jAddClass" : "jRemoveClass"]("mz-expanded");
            if (!this.expanded && I) {
                I.jAppendTo("zoom" == this.zoomBox.mode && "inner" == M ? this.zoomBox.node : this.node, ((Math.floor(Math.random() * 101) + 1) % 2) ? "top" : "bottom")
            }
            this.zoomBox.node.jAppendTo(J)
        },
        changeZoomLevel: function(N) {
            var J, H, L, K, M = false,
                I = N.isMouse ? 5 : 3 / 54;
            h(N).stop();
            I = (100 + I * Math.abs(N.deltaY)) / 100;
            if (N.deltaY < 0) {
                I = 1 / I
            }
            if ("magnifier" == this.zoomBox.mode) {
                H = Math.max(100, Math.round(this.zoomBox.width * I));
                H = Math.min(H, this.size.width * 0.9);
                L = H / this.zoomBox.aspectRatio;
                this.zoomBox.width = Math.ceil(H);
                this.zoomBox.height = Math.ceil(L);
                this.zoomBox.node.jSetCss({
                    width: this.zoomBox.width,
                    height: this.zoomBox.height
                });
                J = this.zoomBox.node.getInnerSize();
                this.zoomBox.innerWidth = Math.ceil(J.width);
                this.zoomBox.innerHeight = Math.ceil(J.height);
                M = true
            } else {
                if (!this.expanded && "zoom" == this.zoomBox.mode) {
                    H = Math.max(50, Math.round(this.lens.width * I));
                    H = Math.min(H, this.size.width * 0.9);
                    L = H / this.zoomBox.aspectRatio;
                    this.zoomSize.width = Math.ceil((this.zoomBox.innerWidth / H) * this.size.width);
                    this.zoomSize.height = Math.ceil((this.zoomBox.innerHeight / L) * this.size.height);
                    this.zoomBox.image.jSetCss({
                        width: this.zoomSize.width,
                        height: this.zoomSize.height
                    })
                } else {
                    return
                }
            }
            K = h(window).jGetScroll();
            this.lens.width = Math.ceil(this.zoomBox.innerWidth / (this.zoomSize.width / this.size.width));
            this.lens.height = Math.ceil(this.zoomBox.innerHeight / (this.zoomSize.height / this.size.height));
            this.lens.node.jSetCss({
                width: this.lens.width,
                height: this.lens.height
            });
            z.extend(this.lens, this.lens.node.jGetSize());
            if (this.zoomBox.active) {
                clearTimeout(this.moveTimer);
                this.moveTimer = null;
                if (M) {
                    this.moveTimer = true
                }
                this.animate(null, {
                    x: N.x - K.x,
                    y: N.y - K.y
                });
                if (M) {
                    this.moveTimer = null
                }
            }
        },
        registerActivateEvent: function(J) {
            var I, H = J ? "dbltap btnclick" : "touchstart" + (!z.browser.mobile ? (window.navigator.pointerEnabled ? " pointermove" : window.navigator.msPointerEnabled ? " MSPointerMove" : " mousemove") : ""),
                K = this.node.jFetch("mz:handlers:activate:fn", (!J) ? h(function(L) {
                    I = (z.browser.ieMode < 9) ? z.extend({}, L) : L;
                    if (!this.activateTimer) {
                        clearTimeout(this.activateTimer);
                        this.activateTimer = setTimeout(h(function() {
                            this.activate(I)
                        }).jBind(this), 120)
                    }
                }).jBindAsEvent(this) : h(this.activate).jBindAsEvent(this));
            this.node.jStore("mz:handlers:activate:event", H).jAddEvent(H, K, 10)
        },
        unregisterActivateEvent: function(I) {
            var H = this.node.jFetch("mz:handlers:activate:event"),
                J = this.node.jFetch("mz:handlers:activate:fn");
            this.node.jRemoveEvent(H, J);
            this.node.jDel("mz:handlers:activate:fn")
        },
        registerDeactivateEvent: function(I) {
            var H = I ? "dbltap btnclick" : "touchend" + (!z.browser.mobile ? (window.navigator.pointerEnabled ? " pointerout" : window.navigator.msPointerEnabled ? " MSPointerOut" : " mouseout") : ""),
                J = this.node.jFetch("mz:handlers:deactivate:fn", h(function(K) {
                    if (c(K) && !g(K)) {
                        return
                    }
                    if (this.zoomBox.node !== K.getRelated() && !(("inner" == this.zoomBox.position || "magnifier" == this.zoomBox.mode) && this.zoomBox.node.hasChild(K.getRelated())) && !this.node.hasChild(K.getRelated())) {
                        this.deactivate(K)
                    }
                }).jBindAsEvent(this));
            this.node.jStore("mz:handlers:deactivate:event", H).jAddEvent(H, J, 20)
        },
        unregisterDeactivateEvent: function() {
            var H = this.node.jFetch("mz:handlers:deactivate:event"),
                I = this.node.jFetch("mz:handlers:deactivate:fn");
            this.node.jRemoveEvent(H, I);
            this.node.jDel("mz:handlers:deactivate:fn")
        },
        registerEvents: function() {
            this.moveBind = this.move.jBind(this);
            this.node.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], h(function(H) {
                if ((z.browser.androidBrowser || "android" === z.browser.platform && z.browser.gecko) && this.option("zoomMode") && "click" !== this.option("zoomOn") && "touchstart" === H.type) {
                    H.stopDefaults();
                    if (z.browser.gecko) {
                        H.stopDistribution()
                    }
                }
                if (!this.zoomBox.active) {
                    return
                }
                if ("inner" === this.zoomBox.position) {
                    this.lens.spos = H.getClientXY()
                }
            }).jBindAsEvent(this), 10);
            this.node.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], h(function(H) {
                if (c(H) && g(H)) {
                    this.lens.touchmovement = false
                }
            }).jBindAsEvent(this), 10);
            this.node.jAddEvent("touchmove " + ("android" === z.browser.platform ? "" : window.navigator.pointerEnabled ? "pointermove" : window.navigator.msPointerEnabled ? "MSPointerMove" : "mousemove"), h(this.animate).jBindAsEvent(this));
            if (this.option("zoomMode")) {
                this.registerActivateEvent("click" === this.option("zoomOn"));
                this.registerDeactivateEvent("click" === this.option("zoomOn") && !this.option("expand"))
            }
            this.node.jAddEvent("mousedown", function(H) {
                H.stopDistribution()
            }, 10).jAddEvent("btnclick", h(function(H) {
                this.node.jRaiseEvent("MouseEvent", "click");
                if (this.expanded) {
                    this.expandBox.jCallEvent("btnclick", H)
                }
            }).jBind(this), 15);
            if (this.option("expand")) {
                this.node.jAddEvent("tap btnclick", h(this.expand).jBindAsEvent(this), 15)
            } else {
                this.node.jAddEvent("tap btnclick", h(this.openLink).jBindAsEvent(this), 15)
            }
            if (this.additionalImages.length > 1) {
                this.swipe()
            }
            if (!z.browser.mobile && this.option("variableZoom")) {
                this.node.jAddEvent("mousescroll", this.changeZoomLevel.jBindAsEvent(this))
            }
            h(window).jAddEvent(z.browser.mobile ? "resize" : "resize scroll", this.onResize)
        },
        unregisterEvents: function() {
            if (this.node) {
                this.node.jRemoveEvent("mousescroll")
            }
            h(window).jRemoveEvent("resize scroll", this.onResize);
            h(this.additionalImages).jEach(function(H) {
                h(H.origin).jClearEvents()
            })
        },
        activate: function(N) {
            var O, M, K, L, H, I = 0,
                J = 0;
            if (!this.ready || !this.zoomBox.enabled || this.zoomBox.active || this.zoomBox.activating) {
                if (!this.image.loaded()) {
                    if (N) {
                        this.initEvent = z.extend({}, N);
                        N.stopQueue()
                    }
                    this.image.load(this.setupZoom.jBind(this));
                    if (!this.loadTimer) {
                        this.loadTimer = h(this.showLoading).jBind(this).jDelay(400)
                    }
                }
                return
            }
            if (N && "pointermove" == N.type && "touch" == N.pointerType) {
                return
            }
            if (!this.option("zoomMode") && this.option("expand") && !this.expanded) {
                this.zoomBox.active = true;
                return
            }
            this.zoomBox.activating = true;
            if (this.expanded && "zoom" == this.zoomBox.mode) {
                L = this.image.node.jGetRect();
                this.expandStage.jAddClass("mz-zoom-in");
                H = this.expandFigure.jGetRect();
                J = ((L.left + L.right) / 2 - (H.left + H.right) / 2);
                I = ((L.top + L.bottom) / 2 - (H.top + H.bottom) / 2)
            }
            this.zoomBox.image.jRemoveEvent("transitionend");
            this.zoomBox.node.jRemoveClass("mz-deactivating").jRemoveEvent("transitionend");
            this.zoomBox.node.jAddClass("mz-activating");
            this.node.jAddClass("mz-activating");
            this.reflowZoom();
            M = ("zoom" == this.zoomBox.mode) ? this.zoomBox.position : this.zoomBox.mode;
            if (z.browser.features.transition && !(this.expanded && "always" == this.option("expandZoomOn"))) {
                if ("inner" == M) {
                    K = this.image.node.jGetSize();
                    this.zoomBox.image.jSetCss({
                        transform: "translate3d(0," + I + "px, 0) scale(" + K.width / this.zoomSize.width + ", " + K.height / this.zoomSize.height + ")"
                    }).jGetSize();
                    this.zoomBox.image.jAddEvent("transitionend", h(function() {
                        this.zoomBox.image.jRemoveEvent("transitionend");
                        this.zoomBox.node.jRemoveClass("mz-activating mz-p-" + M);
                        this.zoomBox.activating = false;
                        this.zoomBox.active = true
                    }).jBind(this));
                    this.zoomBox.node.jAddClass("mz-p-" + M).jGetSize();
                    if (!z.browser.mobile && z.browser.chrome && ("chrome" === z.browser.uaName || "opera" === z.browser.uaName)) {
                        this.zoomBox.activating = false;
                        this.zoomBox.active = true
                    }
                } else {
                    this.zoomBox.node.jAddEvent("transitionend", h(function() {
                        this.zoomBox.node.jRemoveEvent("transitionend");
                        this.zoomBox.node.jRemoveClass("mz-activating mz-p-" + M)
                    }).jBind(this));
                    this.zoomBox.node.jAddClass("mz-p-" + M).jGetSize();
                    this.zoomBox.node.jRemoveClass("mz-p-" + M);
                    this.zoomBox.activating = false;
                    this.zoomBox.active = true
                }
            } else {
                this.zoomBox.node.jRemoveClass("mz-activating");
                this.zoomBox.activating = false;
                this.zoomBox.active = true
            }
            if (!this.expanded) {
                this.showHint(true)
            }
            if (N) {
                N.stop().stopQueue();
                O = N.getClientXY();
                if ("magnifier" == this.zoomBox.mode && (/tap/i).test(N.type)) {
                    O.y -= this.zoomBox.height / 2 + 10
                }
                if ("inner" == M && ((/tap/i).test(N.type) || c(N))) {
                    this.lens.pos = {
                        x: 0,
                        y: 0
                    };
                    O.x = -(O.x - this.boundaries.left - this.size.width / 2) * (this.zoomSize.width / this.size.width);
                    O.y = -(O.y - this.boundaries.top - this.size.height / 2) * (this.zoomSize.height / this.size.height)
                }
            } else {
                O = {
                    x: this.boundaries.left + (this.boundaries.right - this.boundaries.left) / 2,
                    y: this.boundaries.top + (this.boundaries.bottom - this.boundaries.top) / 2
                };
                if (z.browser.mobile && this.expanded && "always" === this.option("expandZoomOn")) {
                    this.lens.innertouch = true;
                    this.lens.pos = {
                        x: 0,
                        y: 0
                    };
                    O.x = -(O.x - this.boundaries.left - this.size.width / 2) * (this.zoomSize.width / this.size.width);
                    O.y = -(O.y - this.boundaries.top - this.size.height / 2) * (this.zoomSize.height / this.size.height)
                }
            }
            this.node.jRemoveClass("mz-activating").jAddClass("mz-active");
            O.x += -J;
            O.y += -I;
            this.lens.spos = {
                x: 0,
                y: 0
            };
            this.lens.dx = 0;
            this.lens.dy = 0;
            this.animate(N, O, true);
            t("onZoomIn", this.id)
        },
        deactivate: function(J, O) {
            var M, K, H, I, L = 0,
                N = 0,
                P = this.zoomBox.active;
            this.initEvent = null;
            if (!this.ready) {
                return
            }
            if (J && "pointerout" == J.type && "touch" == J.pointerType) {
                return
            }
            clearTimeout(this.moveTimer);
            this.moveTimer = null;
            clearTimeout(this.activateTimer);
            this.activateTimer = null;
            this.zoomBox.activating = false;
            this.zoomBox.active = false;
            if (true !== O && !this.expanded) {
                if (P) {
                    if (z.browser.mobile && !this.expanded && "zoom" == this.zoomBox.mode) {
                        this.reflowZoom()
                    } else {
                        this.showHint()
                    }
                }
            }
            if (!this.zoomBox.enabled) {
                return
            }
            if (J) {
                J.stop()
            }
            this.zoomBox.image.jRemoveEvent("transitionend");
            this.zoomBox.node.jRemoveClass("mz-activating").jRemoveEvent("transitionend");
            if (this.expanded) {
                I = this.expandFigure.jGetRect();
                if ("always" !== this.option("expandZoomOn")) {
                    this.expandStage.jRemoveClass("mz-zoom-in")
                }
                this.image.node.jSetCss({
                    "max-height": this.expandMaxHeight()
                });
                H = this.image.node.jGetRect();
                N = ((H.left + H.right) / 2 - (I.left + I.right) / 2);
                L = ((H.top + H.bottom) / 2 - (I.top + I.bottom) / 2)
            }
            M = ("zoom" == this.zoomBox.mode) ? this.zoomBox.position : this.zoomBox.mode;
            if (z.browser.features.transition && J && !(this.expanded && "always" == this.option("expandZoomOn"))) {
                if ("inner" == M) {
                    this.zoomBox.image.jAddEvent("transitionend", h(function() {
                        this.zoomBox.image.jRemoveEvent("transitionend");
                        this.node.jRemoveClass("mz-active");
                        setTimeout(h(function() {
                            this.zoomBox.hide()
                        }).jBind(this), 32)
                    }).jBind(this));
                    K = this.image.node.jGetSize();
                    this.zoomBox.node.jAddClass("mz-deactivating mz-p-" + M).jGetSize();
                    this.zoomBox.image.jSetCss({
                        transform: "translate3d(0," + L + "px,0) scale(" + K.width / this.zoomSize.width + ", " + K.height / this.zoomSize.height + ")"
                    })
                } else {
                    this.zoomBox.node.jAddEvent("transitionend", h(function() {
                        this.zoomBox.hide();
                        this.node.jRemoveClass("mz-active")
                    }).jBind(this));
                    this.zoomBox.node.jGetCss("opacity");
                    this.zoomBox.node.jAddClass("mz-deactivating mz-p-" + M);
                    this.node.jRemoveClass("mz-active")
                }
            } else {
                this.zoomBox.hide();
                this.node.jRemoveClass("mz-active")
            }
            this.lens.dx = 0;
            this.lens.dy = 0;
            this.lens.spos = {
                x: 0,
                y: 0
            };
            this.lens.hide();
            if (P) {
                t("onZoomOut", this.id)
            }
        },
        animate: function(R, Q, P) {
            var J = Q,
                L, K, N = 0,
                I, M = 0,
                H, S, O = false;
            if (this.initEvent && !this.image.loaded()) {
                this.initEvent = R
            }
            if (!this.zoomBox.active && !P) {
                return
            }
            if (R) {
                h(R).stopDefaults().stopDistribution();
                if (c(R) && !g(R)) {
                    return
                }
                O = (/tap/i).test(R.type) || c(R);
                if (O && !this.lens.touchmovement) {
                    this.lens.touchmovement = O
                }
                if (!J) {
                    J = R.getClientXY()
                }
            }
            if ("preview" == this.zoomBox.mode) {
                return
            }
            if ("zoom" == this.zoomBox.mode && "inner" === this.zoomBox.position && (R && O || !R && this.lens.innertouch)) {
                this.lens.innertouch = true;
                L = this.lens.pos.x + (J.x - this.lens.spos.x);
                K = this.lens.pos.y + (J.y - this.lens.spos.y);
                this.lens.spos = J;
                N = Math.min(0, this.zoomBox.innerWidth - this.zoomSize.width) / 2;
                I = -N;
                M = Math.min(0, this.zoomBox.innerHeight - this.zoomSize.height) / 2;
                H = -M
            } else {
                this.lens.innertouch = false;
                if ("magnifier" == this.zoomBox.mode) {
                    J.y = Math.max(this.boundaries.top, Math.min(J.y, this.boundaries.bottom));
                    J.x = Math.max(this.boundaries.left, Math.min(J.x, this.boundaries.right))
                }
                L = J.x - this.boundaries.left;
                K = J.y - this.boundaries.top;
                I = this.size.width - this.lens.width;
                H = this.size.height - this.lens.height;
                L -= this.lens.width / 2;
                K -= this.lens.height / 2
            }
            if ("magnifier" !== this.zoomBox.mode) {
                L = Math.max(N, Math.min(L, I));
                K = Math.max(M, Math.min(K, H))
            }
            this.lens.pos.x = L = Math.round(L);
            this.lens.pos.y = K = Math.round(K);
            if ("zoom" == this.zoomBox.mode && "inner" != this.zoomBox.position) {
                if (z.browser.features.transform) {
                    this.lens.node.jSetCss({
                        transform: "translate(" + this.lens.pos.x + "px," + this.lens.pos.y + "px)"
                    });
                    this.lens.image.jSetCss({
                        transform: "translate(" + -(this.lens.pos.x + this.lens.border.x) + "px, " + -(this.lens.pos.y + this.lens.border.y) + "px)"
                    })
                } else {
                    this.lens.node.jSetCss({
                        top: this.lens.pos.y,
                        left: this.lens.pos.x
                    });
                    this.lens.image.jSetCss({
                        top: -(this.lens.pos.y + this.lens.border.y),
                        left: -(this.lens.pos.x + this.lens.border.x)
                    })
                }
            }
            if ("magnifier" == this.zoomBox.mode) {
                if (this.lens.touchmovement && !(R && "dbltap" == R.type)) {
                    J.y -= this.zoomBox.height / 2 + 10
                }
                this.zoomBox.node.jSetCss({
                    top: J.y - this.boundaries.top - this.zoomBox.height / 2,
                    left: J.x - this.boundaries.left - this.zoomBox.width / 2
                })
            }
            if (!this.moveTimer) {
                this.lens.dx = 0;
                this.lens.dy = 0;
                this.move(1)
            }
        },
        move: function(J) {
            var I, H;
            if (!isFinite(J)) {
                if (this.lens.innertouch) {
                    J = this.lens.touchmovement ? 0.4 : 0.16
                } else {
                    J = this.option("smoothing") ? 0.2 : this.lens.touchmovement ? 0.4 : 0.8
                }
            }
            I = ((this.lens.pos.x - this.lens.dx) * J);
            H = ((this.lens.pos.y - this.lens.dy) * J);
            this.lens.dx += I;
            this.lens.dy += H;
            if (!this.moveTimer || Math.abs(I) > 0.000001 || Math.abs(H) > 0.000001) {
                this.zoomBox.image.jSetCss(z.browser.features.transform ? {
                    transform: f + (this.lens.innertouch ? this.lens.dx : -(this.lens.dx * (this.zoomSize.width / this.size.width) - Math.max(0, this.zoomSize.width - this.zoomBox.innerWidth) / 2)) + "px," + (this.lens.innertouch ? this.lens.dy : -(this.lens.dy * (this.zoomSize.height / this.size.height) - Math.max(0, this.zoomSize.height - this.zoomBox.innerHeight) / 2)) + "px" + B + " scale(1)"
                } : {
                    left: -(this.lens.dx * (this.zoomSize.width / this.size.width) + Math.min(0, this.zoomSize.width - this.zoomBox.innerWidth) / 2),
                    top: -(this.lens.dy * (this.zoomSize.height / this.size.height) + Math.min(0, this.zoomSize.height - this.zoomBox.innerHeight) / 2)
                })
            }
            if ("magnifier" == this.zoomBox.mode) {
                return
            }
            this.moveTimer = setTimeout(this.moveBind, 16)
        },
        swipe: function() {
            var T, J, O = 30,
                L = 201,
                Q, R = "",
                I = {},
                H, N, S = 0,
                U = {
                    transition: z.browser.cssTransform + String.fromCharCode(32) + "300ms cubic-bezier(.18,.35,.58,1)"
                },
                K, P, M = h(function(V) {
                    if (!this.ready || this.zoomBox.active) {
                        return
                    }
                    if (V.state == "dragstart") {
                        clearTimeout(this.activateTimer);
                        this.activateTimer = null;
                        S = 0;
                        I = {
                            x: V.x,
                            y: V.y,
                            ts: V.timeStamp
                        };
                        T = this.size.width;
                        J = T / 2;
                        this.image.node.jRemoveEvent("transitionend");
                        this.image.node.jSetCssProp("transition", "");
                        this.image.node.jSetCssProp("transform", "translate3d(0, 0, 0)");
                        P = null
                    } else {
                        H = (V.x - I.x);
                        N = {
                            x: 0,
                            y: 0,
                            z: 0
                        };
                        if (null === P) {
                            P = (Math.abs(V.x - I.x) < Math.abs(V.y - I.y))
                        }
                        if (P) {
                            return
                        }
                        V.stop();
                        if ("dragend" == V.state) {
                            S = 0;
                            K = null;
                            Q = V.timeStamp - I.ts;
                            if (Math.abs(H) > J || (Q < L && Math.abs(H) > O)) {
                                if ((R = (H > 0) ? "backward" : (H <= 0) ? "forward" : "")) {
                                    if (R == "backward") {
                                        K = this.getPrev();
                                        S += T * 10
                                    } else {
                                        K = this.getNext();
                                        S -= T * 10
                                    }
                                }
                            }
                            N.x = S;
                            N.deg = -90 * (N.x / T);
                            this.image.node.jAddEvent("transitionend", h(function(W) {
                                this.image.node.jRemoveEvent("transitionend");
                                this.image.node.jSetCssProp("transition", "");
                                if (K) {
                                    this.image.node.jSetCss({
                                        transform: "translate3d(" + N.x + "px, 0px, 0px)"
                                    });
                                    this.update(K, true)
                                }
                            }).jBind(this));
                            this.image.node.jSetCss(U);
                            this.image.node.jSetCss({
                                "transition-duration": N.x ? "100ms" : "300ms",
                                opacity: 1 - 0.7 * Math.abs(N.x / T),
                                transform: "translate3d(" + N.x + "px, 0px, 0px)"
                            });
                            H = 0;
                            return
                        }
                        N.x = H;
                        N.z = -50 * Math.abs(N.x / J);
                        N.deg = -60 * (N.x / J);
                        this.image.node.jSetCss({
                            opacity: 1 - 0.7 * Math.abs(N.x / J),
                            transform: "translate3d(" + N.x + "px, 0px, " + N.z + "px)"
                        })
                    }
                }).jBind(this);
            this.node.jAddEvent("touchdrag", M)
        },
        setupExpandGallery: function() {
            var I, H;
            if (this.additionalImages.length) {
                this.expandGallery = this.additionalImages
            } else {
                I = this.placeholder.getAttribute("data-gallery");
                if (I) {
                    if (z.browser.features.query) {
                        H = z.$A(document.querySelectorAll('.MagicZoom[data-gallery="' + I + '"]'))
                    } else {
                        H = z.$A(document.getElementsByTagName("A")).filter(function(J) {
                            return I == J.getAttribute("data-gallery")
                        })
                    }
                    h(H).jEach(function(K) {
                        var J, L;
                        J = i(K);
                        if (J && J.additionalImages.length > 0) {
                            return
                        }
                        if (J) {
                            L = new k(J.image.small.url, J.image.zoom.url, J.image.caption, null, J.image.origin)
                        } else {
                            L = new k().parseNode(K, J ? J.originalTitle : null)
                        }
                        if (this.image.zoom.src.has(L.zoom.url) && this.image.small.src.has(L.small.url)) {
                            L = this.image
                        }
                        this.expandGallery.push(L)
                    }, this);
                    this.primaryImage = this.image
                }
            }
            if (this.expandGallery.length > 1) {
                this.expandStage.jAddClass("with-thumbs");
                this.expandNav = z.$new("div", {
                    "class": "mz-expand-thumbnails"
                }).jAppendTo(this.expandStage);
                this.expandThumbs = new r(this.expandNav);
                h(this.expandGallery).jEach(function(J) {
                    var K = h(function(L) {
                        this.setActiveThumb(J);
                        this.update(J)
                    }).jBind(this);
                    J.selector = this.expandThumbs.addItem(z.$new("img", {
                        src: J.getURL("small")
                    }).jAddEvent("tap btnclick", function(L) {
                        L.stop()
                    }).jAddEvent("tap " + ("hover" == this.option("selectorTrigger") ? "mouseover mouseout" : "btnclick"), h(function(M, L) {
                        if (this.updateTimer) {
                            clearTimeout(this.updateTimer)
                        }
                        this.updateTimer = false;
                        if ("mouseover" == M.type) {
                            this.updateTimer = h(K).jDelay(L)
                        } else {
                            if ("tap" == M.type || "btnclick" == M.type) {
                                K()
                            }
                        }
                    }).jBindAsEvent(this, 60)))
                }, this);
                this.buttons.next.show();
                this.buttons.prev.show()
            } else {
                this.expandStage.jRemoveClass("with-thumbs");
                this.buttons.next.hide();
                this.buttons.prev.hide()
            }
        },
        destroyExpandGallery: function() {
            var H;
            if (this.expandThumbs) {
                this.expandThumbs.stop();
                this.expandThumbs = null
            }
            if (this.expandNav) {
                this.expandNav.jRemove();
                this.expandNav = null
            }
            if (this.expandGallery.length > 1 && !this.additionalImages.length) {
                this.node.jRemoveEvent("touchdrag");
                this.image.node.jRemove().getAttribute("style");
                this.image.node.removeAttribute("style");
                this.primaryImage.node.jAppendTo(this.node);
                this.setupZoom(this.primaryImage);
                while (H = this.expandGallery.pop()) {
                    if (H !== this.primaryImage) {
                        if (H.small.node) {
                            H.small.node.kill();
                            H.small.node = null
                        }
                        if (H.zoom.node) {
                            H.zoom.node.kill();
                            H.zoom.node = null
                        }
                        H = null
                    }
                }
            }
            this.expandGallery = []
        },
        close: function() {
            if (!this.ready || !this.expanded) {
                return
            }
            if ("ios" == z.browser.platform && "safari" == z.browser.uaName && 7 == parseInt(z.browser.uaVersion)) {
                clearInterval(m);
                m = null
            }
            h(document).jRemoveEvent("keydown", this.keyboardCallback);
            this.deactivate(null, true);
            this.ready = false;
            if (x.browser.fullScreen.capable && x.browser.fullScreen.enabled()) {
                x.browser.fullScreen.cancel()
            } else {
                if (z.browser.features.transition) {
                    this.node.jRemoveEvent("transitionend").jSetCss({
                        transition: ""
                    });
                    this.node.jAddEvent("transitionend", this.onClose);
                    if (z.browser.chrome && ("chrome" === z.browser.uaName || "opera" === z.browser.uaName)) {
                        setTimeout(h(function() {
                            this.onClose()
                        }).jBind(this), 600)
                    }
                    this.expandBg.jRemoveEvent("transitionend").jSetCss({
                        transition: ""
                    });
                    this.expandBg.jSetCss({
                        transition: "all 0.6s cubic-bezier(0.895, 0.030, 0.685, 0.220) 0.0s"
                    }).jGetSize();
                    if (z.browser.androidBrowser && "chrome" !== z.browser.uaName) {
                        this.node.jSetCss({
                            transition: "all .4s cubic-bezier(0.600, 0, 0.735, 0.045) 0s"
                        }).jGetSize()
                    } else {
                        this.node.jSetCss({
                            transition: "all .4s cubic-bezier(0.600, -0.280, 0.735, 0.045) 0s"
                        }).jGetSize()
                    }
                    if (false !== this.zoomBox.mode && "always" == this.option("expandZoomOn") && "magnifier" !== this.option("expandZoomMode")) {
                        this.image.node.jSetCss({
                            "max-height": this.image.jGetSize("zoom").height
                        });
                        this.image.node.jSetCss({
                            "max-width": this.image.jGetSize("zoom").width
                        })
                    }
                    this.expandBg.jSetCss({
                        opacity: 0.4
                    });
                    this.node.jSetCss({
                        opacity: 0.01,
                        transform: "scale(0.4)"
                    })
                } else {
                    this.onClose()
                }
            }
        },
        expand: function(J) {
            if (!this.image.loaded() || !this.ready || this.expanded) {
                if (!this.image.loaded()) {
                    if (J) {
                        this.initEvent = z.extend({}, J);
                        J.stopQueue()
                    }
                    this.image.load(this.setupZoom.jBind(this));
                    if (!this.loadTimer) {
                        this.loadTimer = h(this.showLoading).jBind(this).jDelay(400)
                    }
                }
                return
            }
            if (J) {
                J.stopQueue()
            }
            var H = h(this.node).jFetch("cr"),
                I = document.createDocumentFragment();
            this.hideHint();
            this.hintRuns--;
            this.deactivate(null, true);
            this.unregisterActivateEvent();
            this.unregisterDeactivateEvent();
            this.ready = false;
            if (!this.expandBox) {
                this.expandBox = z.$new("div").jAddClass("mz-expand").jAddClass(this.option("cssClass")).jSetCss({
                    opacity: 0
                });
                this.expandStage = z.$new("div").jAddClass("mz-expand-stage").jAppendTo(this.expandBox);
                this.expandControls = z.$new("div").jAddClass("mz-expand-controls").jAppendTo(this.expandStage);
                h(["prev", "next", "close"]).jEach(function(L) {
                    var K = "mz-button";
                    this.buttons[L] = z.$new("button", {
                        title: this.option("text-btn-" + L)
                    }).jAddClass(K).jAddClass(K + "-" + L);
                    I.appendChild(this.buttons[L]);
                    switch (L) {
                        case "prev":
                            this.buttons[L].jAddEvent("tap btnclick", function(M) {
                                M.stop();
                                this.update(this.getPrev())
                            }.jBindAsEvent(this));
                            break;
                        case "next":
                            this.buttons[L].jAddEvent("tap btnclick", function(M) {
                                M.stop();
                                this.update(this.getNext())
                            }.jBindAsEvent(this));
                            break;
                        case "close":
                            this.buttons[L].jAddEvent("tap btnclick", function(M) {
                                M.stop();
                                this.close()
                            }.jBindAsEvent(this));
                            break
                    }
                }, this);
                this.expandControls.append(I);
                this.expandBox.jAddEvent("mousescroll touchstart dbltap", h(function(K) {
                    h(K).stop()
                }));
                if (this.option("closeOnClickOutside")) {
                    this.expandBox.jAddEvent("tap btnclick", function(M) {
                        var L = M.jGetPageXY(),
                            K = h("magnifier" === this.option("expandZoomMode") ? this.zoomBox.node : this.zoomBox.image).jGetRect();
                        if ("always" !== this.option("expandZoomOn") && K.top <= L.y && L.y <= K.bottom && K.left <= L.x && L.x <= K.right) {
                            M.stopQueue();
                            this.deactivate(M);
                            return
                        }
                        if ("always" !== this.option("expandZoomOn") && this.node.hasChild(M.getOriginalTarget())) {
                            return
                        }
                        M.stop();
                        this.close()
                    }.jBindAsEvent(this))
                }
                this.keyboardCallback = h(function(L) {
                    var K = null;
                    if (27 !== L.keyCode && 37 !== L.keyCode && 39 !== L.keyCode) {
                        return
                    }
                    h(L).stop();
                    if (27 === L.keyCode) {
                        this.close()
                    } else {
                        K = (37 === L.keyCode) ? this.getPrev() : this.getNext();
                        if (K) {
                            this.update(K)
                        }
                    }
                }).jBindAsEvent(this);
                this.onExpand = h(function() {
                    var K;
                    this.node.jRemoveEvent("transitionend").jSetCss({
                        transition: "",
                        transform: "translate3d(0,0,0)"
                    });
                    if (this.expanded) {
                        return
                    }
                    this.expanded = true;
                    this.expandBox.jRemoveClass("mz-expand-opening").jSetCss({
                        opacity: 1
                    });
                    this.zoomBox.setMode(this.option("expandZoomMode"));
                    this.zoomSize = z.detach(this.zoomSizeOrigin);
                    this.resizeCallback();
                    if (this.expandCaption && this.image.caption) {
                        if (this.image.link) {
                            this.expandCaption.append(z.$new("a", {
                                href: this.image.link
                            }).jAddEvent("tap btnclick", this.openLink.jBind(this)).changeContent(this.image.caption))
                        } else {
                            this.expandCaption.changeContent(this.image.caption)
                        }
                        this.expandCaption.jAddClass("mz-show")
                    }
                    if ("always" !== this.option("expandZoomOn")) {
                        this.registerActivateEvent(true);
                        this.registerDeactivateEvent(true)
                    }
                    this.ready = true;
                    if ("always" === this.option("expandZoomOn")) {
                        if (false !== this.zoomBox.mode) {
                            this.zoomBox.enable(true)
                        }
                        if (z.browser.mobile && this.mobileZoomHint) {
                            this.mobileZoomHint = false
                        }
                        this.activate()
                    }
                    if (z.browser.mobile && this.zoomBox.enabled) {
                        if (this.mobileZoomHint || this.hintRuns > 0) {
                            this.showHint(true, this.option("textClickZoomHint"))
                        }
                        this.mobileZoomHint = false
                    }
                    this.expandControls.jRemoveClass("mz-hidden").jAddClass("mz-fade mz-visible");
                    this.expandNav && this.expandNav.jRemoveClass("mz-hidden").jAddClass("mz-fade mz-visible");
                    if (this.expandThumbs) {
                        this.expandThumbs.run();
                        this.setActiveThumb(this.image)
                    }
                    if (H) {
                        H.jAppendTo(this.expandBox, ((Math.floor(Math.random() * 101) + 1) % 2) ? "top" : "bottom")
                    }
                    if (this.expandGallery.length && !this.additionalImages.length) {
                        this.swipe()
                    }
                    h(document).jAddEvent("keydown", this.keyboardCallback);
                    if ("ios" == z.browser.platform && "safari" == z.browser.uaName && 7 == parseInt(z.browser.uaVersion)) {
                        m = v()
                    }
                    t("onExpandOpen", this.id)
                }).jBind(this);
                this.onClose = h(function() {
                    this.node.jRemoveEvent("transitionend");
                    if (!this.expanded) {
                        return
                    }
                    if (this.expanded) {
                        h(document).jRemoveEvent("keydown", this.keyboardCallback);
                        this.deactivate(null, true)
                    }
                    this.destroyExpandGallery();
                    this.expanded = false;
                    this.zoomBox.setMode(this.option("zoomMode"));
                    this.node.replaceChild(this.image.getNode("small"), this.image.node);
                    this.image.setCurNode("small");
                    h(this.image.node).jSetCss({
                        width: "",
                        height: "",
                        "max-width": Math.min(this.image.jGetSize("small").width),
                        "max-height": Math.min(this.image.jGetSize("small").height)
                    });
                    this.node.jSetCss({
                        opacity: "",
                        transition: ""
                    });
                    this.node.jSetCss({
                        transform: "translate3d(0,0,0)"
                    });
                    h(this.placeholder).replaceChild(this.node, this.stubNode);
                    this.setSize(true);
                    if (this.expandCaption) {
                        this.expandCaption.jRemove();
                        this.expandCaption = null
                    }
                    this.unregisterActivateEvent();
                    this.unregisterDeactivateEvent();
                    if ("always" == this.option("zoomOn")) {
                        this.activate()
                    } else {
                        if (false !== this.option("zoomMode")) {
                            this.registerActivateEvent("click" === this.option("zoomOn"));
                            this.registerDeactivateEvent("click" === this.option("zoomOn") && !this.option("expand"))
                        }
                    }
                    this.showHint();
                    this.expandBg.jRemoveEvent("transitionend");
                    this.expandBox.jRemove();
                    this.expandBg.jRemove();
                    this.expandBg = null;
                    h(z.browser.getDoc()).jSetCss({
                        overflow: ""
                    });
                    h(document.body).jSetCss({
                        overflow: ""
                    });
                    this.ready = true;
                    if (z.browser.ieMode < 10) {
                        this.resizeCallback()
                    } else {
                        h(window).jRaiseEvent("UIEvent", "resize")
                    }
                    t("onExpandClose", this.id)
                }).jBind(this);
                this.expandImageStage = z.$new("div", {
                    "class": "mz-image-stage"
                }).jAppendTo(this.expandStage);
                this.expandFigure = z.$new("figure").jAppendTo(this.expandImageStage);
                this.stubNode = this.node.cloneNode(false)
            }
            this.setupExpandGallery();
            h(z.browser.getDoc()).jSetCss({
                overflow: "hidden"
            });
            h(document.body).jSetCss({
                overflow: "hidden"
            }).jGetSize();
            if ("fullscreen" == this.option("expand")) {
                this.prepareExpandedView();
                x.browser.fullScreen.request(this.expandBox, {
                    onEnter: h(function() {
                        this.onExpand()
                    }).jBind(this),
                    onExit: this.onClose,
                    fallback: h(function() {
                        this.expandToWindow()
                    }).jBind(this)
                })
            } else {
                setTimeout(h(function() {
                    this.prepareExpandedView();
                    this.expandToWindow()
                }).jBind(this), 96)
            }
        },
        prepareExpandedView: function() {
            var I, H;
            I = z.$new("img", {
                src: this.image.getURL("zoom")
            });
            this.expandBg = z.$new("div").jAddClass("mz-expand-bg").append(((z.browser.features.cssFilters && "edge" !== z.browser.uaName) || z.browser.ieMode < 10) ? I : new z.SVGImage(I).blur(b).getNode()).jAppendTo(this.expandBox);
            if ("always" === this.option("expandZoomOn") && false !== this.option("expandZoomMode")) {
                this.expandStage.jAddClass("mz-always-zoom" + ("zoom" === this.option("expandZoomMode") ? " mz-zoom-in" : "")).jGetSize()
            }
            H = h(this.node)[(z.browser.ieMode < 10) ? "jGetSize" : "getBoundingClientRect"]();
            h(this.stubNode).jSetCss({
                width: H.width,
                height: H.height
            });
            this.node.replaceChild(this.image.getNode("zoom"), this.image.node);
            this.image.setCurNode("zoom");
            this.expandBox.jAppendTo(document.body);
            this.expandMaxWidth = function() {
                var J = this.expandImageStage;
                if (h(this.expandFigure).jGetSize().width > 50) {
                    J = this.expandFigure
                }
                return function() {
                    return "always" == this.option("expandZoomOn") && false !== this.option("expandZoomMode") && "magnifier" !== this.option("expandZoomMode") ? Infinity : Math.round(h(J).getInnerSize().width)
                }
            }.call(this);
            this.expandMaxHeight = function() {
                var J = this.expandImageStage;
                if (h(this.expandFigure).jGetSize().height > 50) {
                    J = this.expandFigure
                }
                return function() {
                    return "always" == this.option("expandZoomOn") && false !== this.option("expandZoomMode") && "magnifier" !== this.option("expandZoomMode") ? Infinity : Math.round(h(J).getInnerSize().height)
                }
            }.call(this);
            this.expandControls.jRemoveClass("mz-fade mz-visible").jAddClass("mz-hidden");
            this.expandNav && this.expandNav.jRemoveClass("mz-fade mz-visible").jAddClass("mz-hidden");
            this.image.node.jSetCss({
                "max-height": Math.min(this.image.jGetSize("zoom").height, this.expandMaxHeight())
            });
            this.image.node.jSetCss({
                "max-width": Math.min(this.image.jGetSize("zoom").width, this.expandMaxWidth())
            });
            this.expandFigure.append(h(this.placeholder).replaceChild(this.stubNode, this.node));
            if (this.option("expandCaption")) {
                this.expandCaption = z.$new("figcaption", {
                    "class": "mz-caption"
                }).jAppendTo(this.expandFigure)
            }
        },
        expandToWindow: function() {
            this.node.jSetCss({
                transition: ""
            });
            this.node.jSetCss({
                transform: "scale(0.6)"
            }).jGetSize();
            if (z.browser.androidBrowser && "chrome" !== z.browser.uaName) {
                this.node.jSetCss({
                    transition: z.browser.cssTransform + " 0.6s cubic-bezier(0.175, 0.885, 0.320, 1) 0s"
                })
            } else {
                this.node.jSetCss({
                    transition: z.browser.cssTransform + " 0.6s cubic-bezier(0.175, 0.885, 0.320, 1.275) 0s"
                })
            }
            if (z.browser.features.transition) {
                this.node.jAddEvent("transitionend", this.onExpand);
                if (z.browser.chrome && ("chrome" === z.browser.uaName || "opera" === z.browser.uaName)) {
                    setTimeout(h(function() {
                        this.onExpand()
                    }).jBind(this), 800)
                }
            } else {
                this.onExpand.jDelay(16, this)
            }
            this.expandBox.jSetCss({
                opacity: 1
            });
            this.node.jSetCss({
                transform: "scale(1)"
            })
        },
        openLink: function() {
            if (this.image.link) {
                window.open(this.image.link, "_self")
            }
        },
        getNext: function() {
            var H = (this.expanded ? this.expandGallery : this.additionalImages).filter(function(K) {
                    return (-1 !== K.small.state || -1 !== K.zoom.state)
                }),
                I = H.length,
                J = h(H).indexOf(this.image) + 1;
            return (1 >= I) ? null : H[(J >= I) ? 0 : J]
        },
        getPrev: function() {
            var H = (this.expanded ? this.expandGallery : this.additionalImages).filter(function(K) {
                    return (-1 !== K.small.state || -1 !== K.zoom.state)
                }),
                I = H.length,
                J = h(H).indexOf(this.image) - 1;
            return (1 >= I) ? null : H[(J < 0) ? I - 1 : J]
        },
        imageByURL: function(I, J) {
            var H = this.additionalImages.filter(function(K) {
                return ((K.zoom.src.has(I) || K.zoom.url.has(I)) && (K.small.src.has(J) || K.small.url.has(J)))
            }) || [];
            return H[0] || ((J && I && "string" === z.jTypeOf(J) && "string" === z.jTypeOf(I)) ? new k(J, I) : null)
        },
        imageByOrigin: function(I) {
            var H = this.additionalImages.filter(function(J) {
                return (J.origin === I)
            }) || [];
            return H[0]
        },
        imageByIndex: function(H) {
            return this.additionalImages[H]
        }
    };
    u = {
        version: "v5.1.10 (Plus) DEMO",
        start: function(K, I) {
            var J = null,
                H = [];
            z.$A((K ? [h(K)] : z.$A(document.byClass("MagicZoom")).concat(z.$A(document.byClass("MagicZoomPlus"))))).jEach((function(L) {
                if (h(L)) {
                    if (!i(L)) {
                        J = new j(L, I);
                        if (y && !J.option("autostart")) {
                            J.stop();
                            J = null
                        } else {
                            E.push(J);
                            H.push(J)
                        }
                    }
                }
            }).jBind(this));
            return K ? H[0] : H
        },
        stop: function(K) {
            var I, J, H;
            if (K) {
                (J = i(K)) && (J = E.splice(E.indexOf(J), 1)) && J[0].stop() && (delete J[0]);
                return
            }
            while (I = E.length) {
                J = E.splice(I - 1, 1);
                J[0].stop();
                delete J[0]
            }
        },
        refresh: function(H) {
            this.stop(H);
            return this.start(H)
        },
        update: function(M, L, K, I) {
            var J = i(M),
                H;
            if (J) {
                H = "element" === z.jTypeOf(L) ? J.imageByOrigin(L) : J.imageByURL(L, K);
                if (H) {
                    J.update(H)
                }
            }
        },
        switchTo: function(K, J) {
            var I = i(K),
                H;
            if (I) {
                switch (z.jTypeOf(J)) {
                    case "element":
                        H = I.imageByOrigin(J);
                        break;
                    case "number":
                        H = I.imageByIndex(J);
                        break;
                    default:
                }
                if (H) {
                    I.update(H)
                }
            }
        },
        prev: function(I) {
            var H;
            (H = i(I)) && H.update(H.getPrev())
        },
        next: function(I) {
            var H;
            (H = i(I)) && H.update(H.getNext())
        },
        zoomIn: function(I) {
            var H;
            (H = i(I)) && H.activate()
        },
        zoomOut: function(I) {
            var H;
            (H = i(I)) && H.deactivate()
        },
        expand: function(I) {
            var H;
            (H = i(I)) && H.expand()
        },
        close: function(I) {
            var H;
            (H = i(I)) && H.close()
        },
        registerCallback: function(H, I) {
            if (!p[H]) {
                p[H] = []
            }
            if ("function" == z.jTypeOf(I)) {
                p[H].push(I)
            }
        },
        running: function(H) {
            return !!i(H)
        }
    };
    h(document).jAddEvent("domready", function() {
        var I = window[C + "Options"] || {};
        s = s();
        d();
        G = z.$new("div", {
            "class": "magic-hidden-wrapper"
        }).jAppendTo(document.body);
        F = (z.browser.mobile && window.matchMedia && window.matchMedia("(max-device-width: 767px), (max-device-height: 767px)").matches);
        if (z.browser.mobile) {
            z.extend(o, l)
        }
        for (var H = 0; H < A.length; H++) {
            if (I[A[H]] && z.$F !== I[A[H]]) {
                u.registerCallback(A[H], I[A[H]])
            }
        }
        u.start();
        y = false
    });
    window.MagicZoomPlus = window.MagicZoomPlus || {};
    return u
})();