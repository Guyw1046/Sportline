function Swipe(m, e) {
    var f = function() {};
    var u = function(D) {
        setTimeout(D || f, 0)
    };
    var C = {
        addEventListener: !!window.addEventListener,
        touch: ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch,
        transitions: (function(D) {
            var F = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
            for (var E in F) {
                if (D.style[F[E]] !== undefined) {
                    return true
                }
            }
            return false
        })(document.createElement("swipe"))
    };
    if (!m) {
        return
    }
    var v = false;
    var c = m.children[0];
    var s, d, r, g;
    e = e || {};
    var k = parseInt(e.startSlide, 10) || 0;
    var w = e.speed || 300;
    e.continuous = (e.continuous !== undefined) ? e.continuous : true;
    e.disableTouch = (e.disableTouch !== undefined) ? e.disableTouch : false;

    function n() {
        s = c.children;
        g = s.length;
        if (s.length < 2) {
            e.continuous = false
        }
        if (C.transitions && e.continuous && s.length < 3) {
            c.appendChild(s[0].cloneNode(true));
            c.appendChild(c.children[1].cloneNode(true));
            s = c.children;
            v = true
        }
        d = new Array(s.length);
        r = m.getBoundingClientRect().width || m.offsetWidth;
        c.style.width = (s.length * r) + "px";
        var E = s.length;
        while (E--) {
            var D = s[E];
            D.style.width = r + "px";
            D.setAttribute("data-index", E);
            if (C.transitions) {
                D.style.left = (E * -r) + "px";
                q(E, k > E ? -r : (k < E ? r : 0), 0)
            }
        }
        if (e.continuous && C.transitions) {
            q(i(k - 1), -r, 0);
            q(i(k + 1), r, 0)
        }
        if (!C.transitions) {
            c.style.left = (k * -r) + "px"
        }
        m.style.visibility = "visible"
    }

    function o() {
        if (e.continuous) {
            a(k - 1)
        } else {
            if (k) {
                a(k - 1)
            }
        }
    }

    function p() {
        if (e.continuous) {
            a(k + 1)
        } else {
            if (k < s.length - 1) {
                a(k + 1)
            }
        }
    }

    function i(D) {
        return (s.length + (D % s.length)) % s.length
    }

    function a(I, E) {
        if (k == I) {
            return
        }
        if (C.transitions) {
            var H = Math.abs(k - I) / (k - I);
            if (e.continuous) {
                var D = H;
                H = -d[i(I)] / r;
                if (H !== D) {
                    I = -H * s.length + I
                }
            }
            var G = Math.abs(k - I) - 1;
            while (G--) {
                q(i((I > k ? I : k) - G - 1), r * H, 0)
            }
            I = i(I);
            q(k, r * H, E || w);
            q(I, 0, E || w);
            if (e.continuous) {
                q(i(I - H), -(r * H), 0)
            }
        } else {
            I = i(I);
            j(k * -r, I * -r, E || w)
        }
        k = I;
        var F = k;
        if (v && (k > 1)) {
            F = k - 2
        }
        u(e.callback && e.callback(F, s[k]))
    }

    function q(D, F, E) {
        l(D, F, E);
        d[D] = F
    }

    function l(E, H, G) {
        var D = s[E];
        var F = D && D.style;
        if (!F) {
            return
        }
        F.webkitTransitionDuration = F.MozTransitionDuration = F.msTransitionDuration = F.OTransitionDuration = F.transitionDuration = G + "ms";
        F.webkitTransform = "translate(" + H + "px,0)translateZ(0)";
        F.msTransform = F.MozTransform = F.OTransform = "translateX(" + H + "px)"
    }

    function j(H, G, D) {
        if (!D) {
            c.style.left = G + "px";
            return
        }
        var F = +new Date;
        var E = setInterval(function() {
            var J = +new Date - F;
            if (J > D) {
                c.style.left = G + "px";
                if (B) {
                    y()
                }
                var I = k;
                if (v && (k > 1)) {
                    I = k - 2
                }
                e.transitionEnd && e.transitionEnd.call(event, I, s[k]);
                clearInterval(E);
                return
            }
            c.style.left = (((G - H) * (Math.floor((J / D) * 100) / 100)) + H) + "px"
        }, 4)
    }
    var B = e.auto || 0;
    var x;

    function y() {
        x = setTimeout(p, B)
    }

    function t() {
        B = 0;
        clearTimeout(x)
    }
    var h = {};
    var z = {};
    var A;
    var b = {
        handleEvent: function(D) {
            switch (D.type) {
                case "touchstart":
                    this.start(D);
                    break;
                case "touchmove":
                    this.move(D);
                    break;
                case "touchend":
                    u(this.end(D));
                    break;
                case "webkitTransitionEnd":
                case "msTransitionEnd":
                case "oTransitionEnd":
                case "otransitionend":
                case "transitionend":
                    u(this.transitionEnd(D));
                    break;
                case "resize":
                    u(n.call());
                    break
            }
            if (e.stopPropagation) {
                D.stopPropagation()
            }
        },
        start: function(D) {
            if (e.disableTouch) {
                return
            }
            var E = D.touches[0];
            h = {
                x: E.pageX,
                y: E.pageY,
                time: +new Date
            };
            A = undefined;
            c.addEventListener("touchmove", this, false);
            c.addEventListener("touchend", this, false)
        },
        move: function(D) {
            if (e.disableTouch) {
                return
            }
            if (D.touches.length > 1 || D.scale && D.scale !== 1) {
                return
            }
            if (e.disableScroll) {
                D.preventDefault()
            }
            var E = D.touches[0];
            z = {
                x: E.pageX - h.x,
                y: E.pageY - h.y
            };
            if (!e.continuous && ((!k && z.x > 0) || (k == s.length - 1 && z.x < 0))) {
                return
            }
            if (typeof A == "undefined") {
                A = !!(A || Math.abs(z.x) < Math.abs(z.y))
            }
            if (!A) {
                D.preventDefault();
                t();
                if (e.continuous) {
                    l(i(k - 1), z.x + d[i(k - 1)], 0);
                    l(k, z.x + d[k], 0);
                    l(i(k + 1), z.x + d[i(k + 1)], 0)
                } else {
                    z.x = z.x / ((!k && z.x > 0 || k == s.length - 1 && z.x < 0) ? (Math.abs(z.x) / r + 1) : 1);
                    l(k - 1, z.x + d[k - 1], 0);
                    l(k, z.x + d[k], 0);
                    l(k + 1, z.x + d[k + 1], 0)
                }
            }
        },
        end: function(G) {
            if (e.disableTouch) {
                return
            }
            if (typeof A == "undefined") {
                return
            }
            var I = +new Date - h.time;
            var F = Number(I) < 250 && Math.abs(z.x) > 20 || Math.abs(z.x) > r / 2;
            var E = !k && z.x > 0 || k == s.length - 1 && z.x < 0;
            if (e.continuous) {
                E = false
            }
            var H = z.x < 0;
            if (!A) {
                if (F && !E) {
                    if (H) {
                        if (e.continuous) {
                            q(i(k - 1), -r, 0);
                            q(i(k + 2), r, 0)
                        } else {
                            q(k - 1, -r, 0)
                        }
                        q(k, d[k] - r, w);
                        q(i(k + 1), d[i(k + 1)] - r, w);
                        k = i(k + 1)
                    } else {
                        if (e.continuous) {
                            q(i(k + 1), r, 0);
                            q(i(k - 2), -r, 0)
                        } else {
                            q(k + 1, r, 0)
                        }
                        q(k, d[k] + r, w);
                        q(i(k - 1), d[i(k - 1)] + r, w);
                        k = i(k - 1)
                    }
                    var D = k;
                    if (v && (k > 1)) {
                        D = k - 2
                    }
                    e.callback && e.callback(D, s[k])
                } else {
                    if (e.continuous) {
                        q(i(k - 1), -r, w);
                        q(k, 0, w);
                        q(i(k + 1), r, w)
                    } else {
                        q(k - 1, -r, w);
                        q(k, 0, w);
                        q(k + 1, r, w)
                    }
                }
            }
            c.removeEventListener("touchmove", b, false);
            c.removeEventListener("touchend", b, false)
        },
        transitionEnd: function(E) {
            if (parseInt(E.target.getAttribute("data-index"), 10) == k) {
                if (B) {
                    y()
                }
                var D = k;
                if (v && (k > 1)) {
                    D = k - 2
                }
                e.transitionEnd && e.transitionEnd.call(E, D, s[k])
            }
        }
    };
    n();
    if (B) {
        y()
    }
    if (C.addEventListener) {
        if (C.touch) {
            c.addEventListener("touchstart", b, false)
        }
        if (C.transitions) {
            c.addEventListener("webkitTransitionEnd", b, false);
            c.addEventListener("msTransitionEnd", b, false);
            c.addEventListener("oTransitionEnd", b, false);
            c.addEventListener("otransitionend", b, false);
            c.addEventListener("transitionend", b, false)
        }
        window.addEventListener("resize", b, false)
    } else {
        window.onresize = function() {
            n()
        }
    }
    return {
        setup: function() {
            n()
        },
        slide: function(E, D) {
            t();
            a(E, D)
        },
        prev: function() {
            t();
            o()
        },
        next: function() {
            t();
            p()
        },
        getPos: function() {
            return k
        },
        getNumSlides: function() {
            return g
        },
        kill: function() {
            t();
            c.style.width = "auto";
            c.style.left = 0;
            var E = s.length;
            while (E--) {
                var D = s[E];
                D.style.width = "100%";
                D.style.left = 0;
                if (C.transitions) {
                    l(E, 0, 0)
                }
            }
            if (C.addEventListener) {
                c.removeEventListener("touchstart", b, false);
                c.removeEventListener("webkitTransitionEnd", b, false);
                c.removeEventListener("msTransitionEnd", b, false);
                c.removeEventListener("oTransitionEnd", b, false);
                c.removeEventListener("otransitionend", b, false);
                c.removeEventListener("transitionend", b, false);
                window.removeEventListener("resize", b, false)
            } else {
                window.onresize = null
            }
        }
    }
}
if (window.jQuery || window.Zepto) {
    (function(a) {
        a.fn.Swipe = function(b) {
            return this.each(function() {
                a(this).data("Swipe", new Swipe(a(this)[0], b))
            })
        }
    })(window.jQuery || window.Zepto)
};