setTimeout(() => {
  gsap.set(".page_main", { opacity: 1 });
}, 1000);

!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(((e = e || self).window = e.window || {}));
})(this, function (e) {
  "use strict";
  function l() {
    return "undefined" != typeof window;
  }
  function m() {
    return t || (l() && (t = window.gsap) && t.registerPlugin && t);
  }
  function p(e) {
    return Math.round(1e4 * e) / 1e4;
  }
  function q(e) {
    return parseFloat(e) || 0;
  }
  function r(e, t) {
    var r = q(e);
    return ~e.indexOf("%") ? (r / 100) * t : r;
  }
  function s(e, t) {
    return q(e.getAttribute(t));
  }
  function u(e, t, r, n, s, i) {
    return D(Math.pow((q(r) - q(e)) * s, 2) + Math.pow((q(n) - q(t)) * i, 2));
  }
  function v(e) {
    return console.warn(e);
  }
  function w(e) {
    return "non-scaling-stroke" === e.getAttribute("vector-effect");
  }
  function z(e) {
    if (!(e = k(e)[0])) return 0;
    var t,
      r,
      n,
      i,
      o,
      a,
      f,
      h = e.tagName.toLowerCase(),
      l = e.style,
      d = 1,
      c = 1;
    w(e) &&
      ((c = e.getScreenCTM()),
      (d = D(c.a * c.a + c.b * c.b)),
      (c = D(c.d * c.d + c.c * c.c)));
    try {
      r = e.getBBox();
    } catch (e) {
      v(
        "Some browsers won't measure invisible elements (like display:none or masks inside defs)."
      );
    }
    var g = r || { x: 0, y: 0, width: 0, height: 0 },
      _ = g.x,
      y = g.y,
      x = g.width,
      m = g.height;
    if (
      ((r && (x || m)) ||
        !M[h] ||
        ((x = s(e, M[h][0])),
        (m = s(e, M[h][1])),
        "rect" !== h && "line" !== h && ((x *= 2), (m *= 2)),
        "line" === h &&
          ((_ = s(e, "x1")),
          (y = s(e, "y1")),
          (x = Math.abs(x - _)),
          (m = Math.abs(m - y)))),
      "path" === h)
    )
      (i = l.strokeDasharray),
        (l.strokeDasharray = "none"),
        (t = e.getTotalLength() || 0),
        p(d) !== p(c) &&
          !b &&
          (b = 1) &&
          v(
            "Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."
          ),
        (t *= (d + c) / 2),
        (l.strokeDasharray = i);
    else if ("rect" === h) t = 2 * x * d + 2 * m * c;
    else if ("line" === h) t = u(_, y, _ + x, y + m, d, c);
    else if ("polyline" === h || "polygon" === h)
      for (
        n = e.getAttribute("points").match(P) || [],
          "polygon" === h && n.push(n[0], n[1]),
          t = 0,
          o = 2;
        o < n.length;
        o += 2
      )
        t += u(n[o - 2], n[o - 1], n[o], n[o + 1], d, c) || 0;
    else
      ("circle" !== h && "ellipse" !== h) ||
        ((a = (x / 2) * d),
        (f = (m / 2) * c),
        (t = Math.PI * (3 * (a + f) - D((3 * a + f) * (a + 3 * f)))));
    return t || 0;
  }
  function A(e, t) {
    if (!(e = k(e)[0])) return [0, 0];
    t = t || z(e) + 1;
    var r = f.getComputedStyle(e),
      n = r.strokeDasharray || "",
      s = q(r.strokeDashoffset),
      i = n.indexOf(",");
    return (
      i < 0 && (i = n.indexOf(" ")),
      t < (n = i < 0 ? t : q(n.substr(0, i))) && (n = t),
      [-s || 0, n - s || 0]
    );
  }
  function B() {
    l() &&
      ((f = window),
      (d = t = m()),
      (k = t.utils.toArray),
      (c = t.core.getStyleSaver),
      (g = t.core.reverting || function () {}),
      (h = -1 !== ((f.navigator || {}).userAgent || "").indexOf("Edge")));
  }
  var t,
    k,
    f,
    h,
    d,
    b,
    c,
    g,
    P = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
    M = {
      rect: ["width", "height"],
      circle: ["r", "r"],
      ellipse: ["rx", "ry"],
      line: ["x2", "y2"],
    },
    D = Math.sqrt,
    n = {
      version: "3.12.5",
      name: "drawSVG",
      register: function register(e) {
        (t = e), B();
      },
      init: function init(e, t, n) {
        if (!e.getBBox) return !1;
        d || B();
        var s,
          i,
          o,
          a = z(e);
        return (
          (this.styles =
            c && c(e, "strokeDashoffset,strokeDasharray,strokeMiterlimit")),
          (this.tween = n),
          (this._style = e.style),
          (this._target = e),
          t + "" == "true"
            ? (t = "0 100%")
            : t
            ? -1 === (t + "").indexOf(" ") && (t = "0 " + t)
            : (t = "0 0"),
          (i = (function _parse(e, t, n) {
            var s,
              i,
              o = e.indexOf(" ");
            return (
              (i =
                o < 0
                  ? ((s = void 0 !== n ? n + "" : e), e)
                  : ((s = e.substr(0, o)), e.substr(o + 1))),
              (s = r(s, t)),
              (i = r(i, t)) < s ? [i, s] : [s, i]
            );
          })(t, a, (s = A(e, a))[0])),
          (this._length = p(a)),
          (this._dash = p(s[1] - s[0])),
          (this._offset = p(-s[0])),
          (this._dashPT = this.add(
            this,
            "_dash",
            this._dash,
            p(i[1] - i[0]),
            0,
            0,
            0,
            0,
            0,
            1
          )),
          (this._offsetPT = this.add(
            this,
            "_offset",
            this._offset,
            p(-i[0]),
            0,
            0,
            0,
            0,
            0,
            1
          )),
          h &&
            (o = f.getComputedStyle(e)).strokeLinecap !== o.strokeLinejoin &&
            ((i = q(o.strokeMiterlimit)),
            this.add(e.style, "strokeMiterlimit", i, i + 0.01)),
          (this._live = w(e) || ~(t + "").indexOf("live")),
          (this._nowrap = ~(t + "").indexOf("nowrap")),
          this._props.push("drawSVG"),
          1
        );
      },
      render: function render(e, t) {
        if (t.tween._time || !g()) {
          var r,
            n,
            s,
            i,
            o = t._pt,
            a = t._style;
          if (o) {
            for (
              t._live &&
              (r = z(t._target)) !== t._length &&
              ((n = r / t._length),
              (t._length = r),
              t._offsetPT && ((t._offsetPT.s *= n), (t._offsetPT.c *= n)),
              t._dashPT
                ? ((t._dashPT.s *= n), (t._dashPT.c *= n))
                : (t._dash *= n));
              o;

            )
              o.r(e, o.d), (o = o._next);
            (s = t._dash || (e && 1 !== e && 1e-4) || 0),
              (r = t._length - s + 0.1),
              (i = t._offset),
              s &&
                i &&
                s + Math.abs(i % t._length) > t._length - 0.2 &&
                (i += i < 0 ? 0.1 : -0.1) &&
                (r += 0.1),
              (a.strokeDashoffset = s ? i : i + 0.001),
              (a.strokeDasharray =
                r < 0.2
                  ? "none"
                  : s
                  ? s + "px," + (t._nowrap ? 999999 : r) + "px"
                  : "0px, 999999px");
          }
        } else t.styles.revert();
      },
      getLength: z,
      getPosition: A,
    };
  m() && t.registerPlugin(n), (e.DrawSVGPlugin = n), (e.default = n);
  if (typeof window === "undefined" || window !== e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  } else {
    delete e.default;
  }
});

//--//--// INDEX //--//--//
//
// 1. Gsap Plugins
// 2. Cursor Setup
// 3. GSAP Variables
// 4. Lenis
// 5. Main
// -> 6. SplitText Setup
// -> -> 7. TextReveal
// -> 8. ElReveal
// -> 9. StaggerReveal
// -> 10. ParallaxFunc
// -> 11. Footer Animation
// -> 12. Burger Menu
// -> 13. Nav Motion
//
//--//--//-/////-//--//--//

if (
  navigator.userAgent.search("Safari") >= 0 &&
  navigator.userAgent.search("Chrome") < 0
) {
  var isSafari = true;
} else {
  var isSafari = false;
}

// GSAP Plugins Start

gsap.registerPlugin(
  SplitText,
  ScrollTrigger,
  CustomEase,
  MorphSVGPlugin,
  Observer,
  Flip
);

// GSAP Plugins End

// Cursor Setup Start

document.documentElement.style.cursor = "none";

gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

let xTo = gsap.quickTo(".cursor", "x", { duration: 0.01 });
let yTo = gsap.quickTo(".cursor", "y", { duration: 0.01 });

window.addEventListener("mousemove", (e) => {
  xTo(e.clientX + 8 + 16);
  yTo(e.clientY + 8 + 16);
});

// Cursor Setup End

// GSAP Variables Start

const mainEase = "power3.out";
const bounceEase = "back.out";
const shortDuration = 0.8;
const mainStagger = 0.5;

// GSAP Variables End

// Lenis Start

const lenisInit = () => {
  window.lenis = new Lenis({
    // lerp: 0.08,
    // wheelMultiplier: 0.8,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const cartLenisFunc = () => {
    if (isModalOpen) {
      if (lenis) lenis.stop();
      window.requestAnimationFrame(cartLenisFunc);
      return;
    }

    if ($("[cart-modal]").css("display") != "none") {
      let nav = $("[data-nav]");
      let navTl = gsap.timeline({
        paused: true,
        onComplete: () => {
          lenis.stop();
        },
      });
      navTl.to($("[data-nav]"), {
        yPercent: 0,
      });
      navTl.play();
    } else {
      lenis.start();
    }

    let cartText = $("[cart=count]").text();
    let openCart = $("[data-open=true]");
    let closeCart = $("[data-trigger=close]");
    let addCartDesktop = $("[data-add-desktop]");
    let addCartMobile = $("[data-add-mobile]");

    if (cartText != "0") {
      openCart.removeClass("hide");
    }

    addCartDesktop.on("click", function () {
      openCart.removeClass("hide");
    });
    addCartMobile.on("click", function () {
      openCart.removeClass("hide");
    });

    closeCart.on("click", function () {
      if (cartText == "0") {
        gsap.delayedCall(1, function () {
          openCart.addClass("hide");
        });
        lenis.start();
      } else {
        openCart.removeClass("hide");
        lenis.start();
      }
    });

    let i = 1;
    if ((i = 1)) {
      window.requestAnimationFrame(cartLenisFunc);
    }
  };

  window.requestAnimationFrame(cartLenisFunc);
};

lenisInit();

let isModalOpen = false;

// Lenis End

//--//--// MAIN //--//--//

document.addEventListener("DOMContentLoaded", (event) => {
  // SplitText Setup Start

  document.fonts.ready.then(() => {
    function runSplit() {
      loadSplit = new SplitText("[split]", {
        type: "lines, words, chars",
        linesClass: "line",
        wordsClass: "word",
        charsClass: "char",
        autoSplit: true,
      });
    }

    function runSafariSplit() {
      $("[split]").each(function () {
        $(this).addClass("line");
      });
    }

    if (isSafari) {
      runSafariSplit();
    } else {
      runSplit();
    }

    $(document)
      .find(".line")
      .wrap('<div class="line-wrap" style="overflow: hidden;"></div>');

    // TextReveal Start

    $("[text-reveal]").each(function () {
      let text = $(this);

      text
        .find(".line")
        .wrap('<div class="line-wrap" style="overflow: hidden;"></div>');

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: text,
          start: "top 95%",
          end: "top 95%",
          toggleActions: "play none reverse reverse",
        },
      });

      if (isSafari) {
        tl.fromTo(
          text,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
            ease: mainEase,
          }
        );
      } else {
        tl.fromTo(
          text.find(".line"),
          {
            yPercent: 100,
          },
          {
            yPercent: 0,
            duration: shortDuration,
            ease: mainEase,
            stagger: {
              amount: mainStagger,
            },
          }
        );
      }
    });

    // TextReveal End
  });

  // SplitText Setup End

  //   ElReveal Start

  $("[el-reveal]").each(function () {
    let el = $(this);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 95%",
        end: "top 95%",
        toggleActions: "play none reverse reverse",
      },
    });

    tl.fromTo(
      el,
      {
        scale: 0,
      },
      {
        scale: 1,
        ease: bounceEase,
        duration: shortDuration,
      }
    );
  });

  //   ElReveal End

  //   StaggerReveal Start

  $("[stagger-reveal]").each(function () {
    let item = $(this).attr("stagger-reveal");

    let container = $(this);
    let items = container.find(item);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 95%",
        end: "top 95%",
        toggleActions: "play none reverse reverse",
      },
    });

    tl.fromTo(
      items,
      {
        opacity: 0,
        yPercent: 20,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: bounceEase,
        stagger: {
          amount: mainStagger,
        },
      }
    );
  });

  //   StaggerReveal End

  //   FadeReveal Start

  $("[fade-reveal]").each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 95%",
        end: "top 95%",
        toggleActions: "play none reverse reverse",
      },
    });

    tl.fromTo(
      $(this),
      {
        opacity: 0,
        yPercent: 20,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: bounceEase,
      }
    );
  });

  //   FadeReveal End

  // ParallaxFunc Start

  let parallaxFunc = (wrapper, start, end) => {
    wrapper.find("[data-parallax]").each(function () {
      let parallaxValue =
        (window.innerHeight / 100) * ($(this).attr("data-parallax") * 100);

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: start,
          end: end,
          scrub: true,
        },
      });

      tl.to($(this), {
        y: parallaxValue,
      });
    });
  };

  // ParallaxFunc End

  // Footer Animation Start

  $("[data-footer]").each(function () {
    $("#spanYear").html(new Date().getFullYear());

    let curveTl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });

    curveTl.to("#start-footer", {
      morphSVG: "#end-footer",
      ease: "power1.out",
    });
  });

  // Footer Animation End

  // Nav Burger Start

  let burgerOpenTl = gsap.timeline({
    paused: true,
    onComplete: () => {
      gsap.set($("[nav-burger-btn]"), {
        pointerEvents: "auto",
      });
    },
    onStart: () => {
      $("[nav-menu]").addClass("is-open");
    },
  });
  let burgerCloseTl = gsap.timeline({
    paused: true,
    onComplete: () => {
      gsap.set($("[nav-burger-btn]"), {
        pointerEvents: "auto",
      });
    },
    onStart: () => {
      $("[nav-menu]").removeClass("is-open");
    },
  });

  burgerOpenTl.to($("[nav-burger-btn]"), {
    pointerEvents: "none",
    duration: 0,
  });

  burgerOpenTl.to($("[data-logo=main]"), {
    scale: 0,
    duration: shortDuration / 4,
  });

  burgerOpenTl.to(
    $("[nav-menu]"),
    {
      clipPath: "circle(150% at 100% 0%)",
      duration: 1,
      ease: mainEase,
    },
    "<"
  );

  burgerOpenTl.to($("[data-logo=main]"), {
    display: "none",
    duration: 0,
  });

  burgerOpenTl.fromTo(
    $("[data-logo=minimal]"),
    {
      display: "none",
      yPercent: 100,
      scale: 0,
      ease: bounceEase,
      duration: shortDuration,
    },
    {
      opacity: 100,
      display: "block",
      yPercent: 0,
      scale: 1,
      ease: bounceEase,
      duration: shortDuration,
    },
    "<"
  );

  burgerOpenTl.from(
    ".nav_menu_li",
    {
      opacity: 0,
      yPercent: 100,
      duration: shortDuration,
      ease: bounceEase,
      stagger: {
        amount: mainStagger,
      },
    },
    "<"
  );

  let mobileNavBtn = $("[nav-menu]").find(".btn_main_wrap");

  burgerOpenTl.from(
    mobileNavBtn,
    {
      yPercent: 100,
      scale: 0,
      ease: bounceEase,
      duration: shortDuration,
    },
    "<.25"
  );

  burgerCloseTl.to($("[nav-burger-btn]"), {
    pointerEvents: "none",
    duration: 0,
  });

  burgerCloseTl.to(
    $("[data-logo=minimal]"),
    {
      opacity: 0,
      scale: 0,
      duration: shortDuration / 2,
      ease: mainEase,
    },
    "<"
  );

  burgerCloseTl.to(
    $("[nav-menu]"),
    {
      clipPath: "circle(0% at 100% 0%)",
      duration: 1,
      ease: mainEase,
    },
    "<"
  );

  burgerCloseTl.to($("[data-logo=minimal]"), {
    display: "none",
    duration: 0,
  });

  burgerCloseTl.to(
    $("[data-logo=main]"),
    {
      opacity: 100,
      display: "block",
      yPercent: 0,
      scale: 1,
      ease: bounceEase,
      duration: shortDuration,
    },
    "<"
  );

  $("[nav-burger-btn]").on("click", function () {
    if (!$(this).hasClass("is-open")) {
      burgerOpenTl.restart();
      $(this).addClass("is-open");
    } else {
      $(this).removeClass("is-open");
      burgerCloseTl.restart();
    }
  });

  // Nav Burger End

  // Nav Motion Start

  const navMotionFunc = () => {
    $("[data-nav]").each(function () {
      const navShow = gsap
        .from($(this), {
          yPercent: -100,
          paused: true,
          duration: 0.25,
        })
        .progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          if (!$("[nav-burger-btn]").hasClass("is-open")) {
            self.direction === -1 ? navShow.play() : navShow.reverse();
          }
        },
      });
    });
  };

  // Nav Motion End

  // Cart Lenis Start

  // };

  // Cart Lenis End
});

//--//--// MAIN END //--//--//

//--//--// INDEX //--//--//
//
// 1. ParallaxFunc Import
// 2. NavMotionFunc Import
// 3. Main
// -> 4. Preloader
// -> -> 5. Counters
// -> -> 6. Intro Animation
// -> 7. Hero Section
// -> 8. About Section
// -> 9. Homeowners Section
// -> 10. Work Section
// -> 11. Testimonials Section
// -> 12. FAQS Section
// -> 13. CTA Section
//
//--//--//-/////-//--//--//

// ParallaxFunc Start

let parallaxFunc = (wrapper, start, end) => {
  wrapper.find("[data-parallax]").each(function () {
    let parallaxValue =
      (window.innerHeight / 100) * ($(this).attr("data-parallax") * 100);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: start,
        end: end,
        scrub: true,
      },
    });

    tl.to($(this), {
      y: parallaxValue,
    });
  });
};

// ParallaxFunc End

// NavMotionFunc Start

const navMotionFunc = () => {
  $("[data-nav]").each(function () {
    const navShow = gsap
      .from($(this), {
        yPercent: -100,
        paused: true,
        duration: 0.25,
        ease: mainEase,
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (!$("[nav-burger-btn]").hasClass("is-open")) {
          self.direction === -1 ? navShow.play() : navShow.reverse();
        }
      },
    });
  });
};

// NavMotionFunc End

//--//--// MAIN //--//--//

document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {
    let mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;

        $("[data-home]").each(function () {
          // Preloader Start

          var playPreloader = sessionStorage.getItem("preloader") !== "true";

          if (playPreloader) {
            // Counters Start

            const counter3 = document.querySelector(".counter-3");
            for (let i = 0; i < 2; i++) {
              for (let j = 0; j < 10; j++) {
                const div = document.createElement("div");
                div.className = "num";
                div.textContent = j;
                counter3.appendChild(div);
              }
              const finalDiv = document.createElement("div");
              finalDiv.className = "num";
              finalDiv.textContent = "0";
              counter3.appendChild(finalDiv);

              function animate(counter, duration, delay = 0) {
                const numHeight = counter.querySelector(".num").clientHeight;
                const totalDistance =
                  (counter.querySelectorAll(".num").length - 1) * numHeight;
                gsap.to(counter, {
                  y: -totalDistance,
                  duration: duration,
                  delay: delay,
                  ease: "power2.inOut",
                });

                gsap.to(".counter-1", {
                  xPercent: -10,
                  duration: 0,
                });
              }
            }

            animate(counter3, 5.5);
            animate(document.querySelector(".counter-2"), 6);
            animate(document.querySelector(".counter-1"), 3, 3.3);

            gsap.to(".counter-2", {
              yPercent: 0.52,
              duration: 0,
            });

            gsap.to(".counter-3", {
              yPercent: 0.58,
              duration: 0,
            });

            // Counters End

            let introTl = gsap.timeline({
              paused: true,
              onComplete: () => {
                lenisInit();
                $("[data-nav]").addClass("ease");
                navMotionFunc();
              },
            });

            introTl.fromTo(
              $("[home-illustration]"),
              {
                opacity: 0,
                // yPercent: 50,
              },
              {
                // yPercent: 0,
                opacity: 1,
                duration: 2,
                ease: "back.out",
                delay: 0.5,
              }
            );

            introTl.from(
              $("[data-hero]"),
              {
                scale: 0.7,
                duration: 2,
                ease: "power2.out",
              },
              "<"
            );

            if (isSafari) {
              introTl.fromTo(
                $("[hero-heading]"),
                {
                  yPercent: 125,
                },
                {
                  yPercent: 0,
                  duration: 1.25,
                  ease: "back.out",
                },
                "<.25"
              );
            } else {
              introTl.fromTo(
                $("[hero-heading]").find(".char"),
                {
                  yPercent: 125,
                },
                {
                  yPercent: 0,
                  duration: 1.25,
                  ease: "back.out",
                  stagger: {
                    amount: 0.25,
                    from: "center",
                  },
                },
                "<.25"
              );
            }

            if (isSafari) {
              introTl.fromTo(
                $("[hero-heading-2]"),
                {
                  yPercent: 125,
                },
                {
                  yPercent: 0,
                  duration: 1.25,
                  ease: "back.out",
                },
                "<.25"
              );
            } else {
              introTl.fromTo(
                $("[hero-heading-2]").find(".char"),
                {
                  yPercent: 125,
                },
                {
                  yPercent: 0,
                  duration: 1.25,
                  ease: "back.out",
                  stagger: {
                    amount: 0.25,
                    from: "center",
                  },
                },
                "<.25"
              );
            }

            if (isSafari) {
              introTl.fromTo(
                $("[home-eyebrow]"),
                {
                  yPercent: 100,
                },
                {
                  opacity: 1,
                  yPercent: 0,
                  duration: 0.75,
                  ease: "back.out",
                },
                "<.25"
              );
            } else {
              introTl.fromTo(
                $("[home-eyebrow]").find(".line"),
                {
                  yPercent: 100,
                },
                {
                  opacity: 1,
                  yPercent: 0,
                  duration: 0.75,
                  ease: "back.out",
                },
                "<.25"
              );
            }

            if (isSafari) {
              introTl.fromTo(
                $("[home-paragraph]"),
                {
                  // yPercent: 100,
                  opacity: 0,
                },
                {
                  opacity: 1,
                  yPercent: 0,
                  duration: 0.75,
                  ease: "back.out",
                  stagger: {
                    amount: 0.1,
                  },
                },
                "<"
              );
            } else {
              introTl.fromTo(
                $("[home-paragraph]").find(".line"),
                {
                  yPercent: 100,
                  // opacity: 0,
                },
                {
                  opacity: 1,

                  yPercent: 0,
                  duration: 0.75,
                  ease: "back.out",
                  stagger: {
                    amount: 0.1,
                  },
                },
                "<"
              );
            }

            introTl.fromTo(
              $("[home-button]"),
              {
                yPercent: 50,
                opacity: 0,
              },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.75,
                ease: "back.out",
              },
              "<.5"
            );

            introTl.fromTo(
              $("[data-nav]"),
              {
                yPercent: -100,
                opacity: 0,
              },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.75,
                ease: "back.out",
              },
              "<"
            );

            let preloaderTl = gsap.timeline({
              onComplete: () => {
                lenisInit();
              },
              paused: true,
            });

            preloaderTl.to(".page_main", {
              maxHeight: "100vh",
              duration: 0,
            });

            preloaderTl.to(
              "[data-loading]",
              {
                opacity: 1,
                duration: 0.5,
              },
              "<"
            );

            preloaderTl.to("[data-hero]", {
              opacity: 1,
              duration: 0,
            });

            preloaderTl.to("[loading-svg]", {
              opacity: 0,
              duration: 1,
              ease: "back.in",
              delay: 5.75,
            });

            preloaderTl.to("[loading-logo]", {
              width: isDesktop ? "150vw" : "200vw",
              duration: 2,
              ease: "power2.inOut",
              onStart: () => {
                introTl.play();
              },
            });

            preloaderTl.to(
              "[loading-heading]",
              {
                opacity: 0,
                duration: 0.5,
                ease: "power1.out",
              },
              "<"
            );

            preloaderTl.to(
              "[loading-counter]",
              {
                opacity: 0,
                duration: 0.5,
                ease: "power1.out",
              },
              "<"
            );

            preloaderTl.to("[data-loading]", {
              display: "none",
              duration: 0,
            });

            preloaderTl.to(".page_main", {
              maxHeight: "none",
            });

            preloaderTl.play();
            sessionStorage.setItem("preloader", "true");
          } else {
            let introTl2 = gsap.timeline({
              paused: true,
              onComplete: () => {
                lenisInit();
                $("[data-nav]").addClass("ease");
                navMotionFunc();
              },
            });
            gsap.set("[data-loading]", {
              display: "none",
            });

            introTl2.to(".page_main", {
              maxHeight: "100vh",
              duration: 0,
            });

            introTl2.to("[data-hero]", {
              opacity: 1,
              duration: 0,
            });

            introTl2.fromTo(
              $("[home-illustration]"),
              {
                yPercent: 50,
                opacity: 0,
              },
              {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                ease: "back.out",
              }
            );

            if (isSafari) {
              introTl2.fromTo(
                $("[hero-heading]"),
                {
                  yPercent: 125,
                },
                {
                  yPercent: 0,
                  duration: 1.25,
                  ease: "back.out",
                },
                "<.25"
              );
            } else {
              introTl2.fromTo(
                $("[hero-heading]").find(".char"),
                {
                  yPercent: 125,
                },
                {
                  yPercent: 0,
                  duration: 1.25,
                  ease: "back.out",
                  stagger: {
                    amount: 0.25,
                    from: "center",
                  },
                },
                "<.25"
              );
            }

            if (isSafari) {
              introTl2.fromTo(
                $("[hero-heading-2]"),
                {
                  yPercent: 125,
                },
                {
                  yPercent: 0,
                  duration: 1.25,
                  ease: "back.out",
                },
                "<.25"
              );
            } else {
              introTl2.fromTo(
                $("[hero-heading-2]").find(".char"),
                {
                  yPercent: 125,
                },
                {
                  yPercent: 0,
                  duration: 1.25,
                  ease: "back.out",
                  stagger: {
                    amount: 0.25,
                    from: "center",
                  },
                },
                "<.25"
              );
            }

            if (isSafari) {
              introTl2.fromTo(
                $("[home-eyebrow]"),
                {
                  yPercent: 100,
                },
                {
                  opacity: 1,
                  yPercent: 0,
                  duration: 0.75,
                  ease: "back.out",
                },
                "<.25"
              );
            } else {
              introTl2.fromTo(
                $("[home-eyebrow]").find(".line"),
                {
                  yPercent: 100,
                },
                {
                  opacity: 1,
                  yPercent: 0,
                  duration: 0.75,
                  ease: "back.out",
                },
                "<.25"
              );
            }

            if (isSafari) {
              introTl2.fromTo(
                $("[home-paragraph]"),
                {
                  // yPercent: 100,
                  opacity: 0,
                },
                {
                  opacity: 1,
                  yPercent: 0,
                  duration: 0.75,
                  ease: "back.out",
                  stagger: {
                    amount: 0.1,
                  },
                },
                "<"
              );
            } else {
              introTl2.fromTo(
                $("[home-paragraph]").find(".line"),
                {
                  yPercent: 100,
                  // opacity: 0,
                },
                {
                  opacity: 1,

                  yPercent: 0,
                  duration: 0.75,
                  ease: "back.out",
                  stagger: {
                    amount: 0.1,
                  },
                },
                "<"
              );
            }

            introTl2.fromTo(
              $("[home-button]"),
              {
                yPercent: 50,
                opacity: 0,
              },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.75,
                ease: "back.out",
              },
              "<.5"
            );

            introTl2.fromTo(
              $("[data-nav]"),
              {
                yPercent: -100,
                opacity: 0,
              },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.75,
                ease: "back.out",
              },
              "<"
            );

            introTl2.to(".page_main", {
              maxHeight: "none",
            });

            introTl2.play();
          }

          // Preloader End

          // Hero Section Start

          parallaxFunc($("[data-hero]"), "top top", "bottom top");

          // Hero Section End

          // About Section Start

          $("[data-about]").each(function () {
            parallaxFunc($(this), "top bottom", "bottom top");

            let curveTl = gsap.timeline({
              scrollTrigger: {
                trigger: $(this),
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });

            curveTl.to(
              "#start",
              {
                morphSVG: "#end",
                ease: "power1.out",
              },
              "<"
            );
          });

          // About Section End

          // Homeowners Section Start

          $("[data-homeowners]").each(function () {
            if (isDesktop) {
              let pinWrap = $("[data-homeowners-pin]");
              let firstEl = $("[data-homeowner-screen-1]");
              let firstSVG = $("[data-homeowner-svg-1]");
              let secondEl = $("[data-homeowner-screen-2]");
              let secondSVG = $("[data-homeowner-svg-2]");
              let thirdEl = $("[data-homeowner-screen-3]");
              let thirdSVG = $("[data-homeowner-svg-3]");
              let secondTrigger = $("[homeowner-trigger-2]");
              let thirdTrigger = $("[homeowner-trigger-3]");

              ScrollTrigger.create({
                trigger: pinWrap,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                pin: isDesktop ? pinWrap : false,
                pinSpacing: false,
              });

              let tlInitial = gsap.timeline({
                scrollTrigger: {
                  trigger: firstEl,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });

              tlInitial.fromTo(
                isDesktop ? firstEl : null,
                {
                  xPercent: 150,
                },
                {
                  xPercent: -50,
                }
              );
              tlInitial.fromTo(
                isDesktop ? firstSVG : null,
                {
                  xPercent: 30,
                },
                {
                  xPercent: -10,
                },
                "<"
              );

              let tlSecond = gsap.timeline({
                scrollTrigger: {
                  trigger: isDesktop ? secondTrigger : secondEl,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });

              tlSecond.fromTo(
                isDesktop ? secondEl : null,
                {
                  xPercent: 150,
                },
                {
                  xPercent: -50,
                }
              );
              tlSecond.fromTo(
                isDesktop ? secondSVG : null,
                {
                  xPercent: 30,
                },
                {
                  xPercent: -10,
                },
                "<"
              );

              let tlThird = gsap.timeline({
                scrollTrigger: {
                  trigger: isDesktop ? thirdTrigger : thirdEl,
                  start: "top bottom",
                  end: "bottom bottom",
                  scrub: true,
                },
              });

              tlThird.fromTo(
                isDesktop ? thirdEl : null,
                {
                  xPercent: 100,
                },
                {
                  xPercent: 0,
                }
              );
              tlThird.fromTo(
                isDesktop ? thirdSVG : null,
                {
                  xPercent: 30,
                },
                {
                  xPercent: 0,
                },
                "<"
              );
            } else {
              const swiper = new Swiper(".swiper.homeowners", {
                slidesPerView: 1,
                allowTouchMove: false,
                loop: true,
                freeMode: {
                  enabled: true,
                  sticky: true,
                },
                speed: 500,
                mousewheel: {
                  enabled: true,
                  forceToAxis: true,
                  sensitivity: 0.8,
                },
                navigation: {
                  nextEl: ".swiper-next.homeowners",
                  prevEl: ".swiper-prev.homeowners",
                  disabledClass: "is-disabled",
                },
              });
            }

            if (isMobile) {
              let bethPrev = $("[beth-prev]");
              let bethNext = $("[beth-next]");
              let ettaPrev = $("[etta-prev]");
              let ettaNext = $("[etta-next]");
              let taylorPrev = $("[taylor-prev]");
              let taylorNext = $("[taylor-next]");
              let bethButtons = $("[beth-buttons]");
              let ettaButtons = $("[etta-buttons]");
              let taylorButtons = $("[taylor-buttons]");

              bethNext.on("click", function () {
                ettaButtons.removeClass("hide");
              });
              ettaNext.on("click", function () {
                taylorButtons.removeClass("hide");
                ettaButtons.addClass("hide");
              });
              taylorNext.on("click", function () {
                taylorButtons.addClass("hide");
                ettaButtons.addClass("hide");
              });

              bethPrev.on("click", function () {
                taylorButtons.removeClass("hide");
              });
              taylorPrev.on("click", function () {
                taylorButtons.addClass("hide");
                ettaButtons.removeClass("hide");
              });
              ettaPrev.on("click", function () {
                taylorButtons.addClass("hide");
                ettaButtons.addClass("hide");
              });
            }
          });

          // Homeowners Section End

          // Work Section Start

          $("[data-work]").each(function () {
            parallaxFunc($(this), "top bottom", "bottom top");
          });

          // Work Section End

          // Testimonials Section Start

          $("[data-testimonials]").each(function () {
            const swiper = new Swiper(".swiper.testimonial", {
              slidesPerView: 1.25,
              spaceBetween: 32,
              loop: true,
              // loopAddBlankSlides: true,
              centeredSlides: true,
              // centerInsufficientSlides: true,
              slideToClickedSlide: true,
              freeMode: true,
              sticky: true,
              speed: 1000,
              mousewheel: {
                enabled: true,
                forceToAxis: true,
                sensitivity: 0.8,
              },
              breakpoints: {
                767: {
                  slidesPerView: 3.5,
                },
              },
              slideActiveClass: "is-active",
              slideDuplicateActiveClass: "is-active",
              navigation: {
                nextEl: ".swiper-next.testimonial",
                prevEl: ".swiper-prev.testimonial",
                disabledClass: "is-disabled",
              },
            });
          });

          // Testimonials Section End

          // FAQS Section Start

          $("[data-faqs]").each(function () {
            let splitter = $("[faqs-heading-middle]");
            let splitTrigger = $("[faqs-heading]");

            let splitTl = gsap.timeline({
              paused: true,
            });

            splitTl.to(splitter, {
              width: "auto",
              duration: 0.5,
              ease: "power1.out",
            });

            if (!splitTl.isActive()) {
              splitTrigger.on("mouseenter", function () {
                splitTl.play();
              });
            }

            if (!splitTl.isActive()) {
              splitTrigger.on("mouseleave", function () {
                splitTl.reverse();
              });
            }

            $('[data-click="faq"]').click(function () {
              if (!$(this).is(".open")) {
                $('[data-click="faq"].open').each((i, item) => {
                  item.click();
                });
                $(this).addClass("open");
              } else {
                $(this).removeClass("open");
              }
            });

            // $('[data-click="faq"]').click(function () {
            //   let faqA = $(this).find($("[faq-a]"));
            //   let faqP = $(this).find(".faqs_accordion_paragraph");
            //   let faqIcon = $(this).find("[w-faq-icon]");
            //   let faqIconLine = $(this).find(".faq-stripe-1");
            //   let openTl = gsap.timeline({
            //     paused: true,
            //     onStart: () => {
            //       $(this).addClass("open");
            //     },
            //   });

            //   let closeTl = gsap.timeline({
            //     paused: true,
            //     onStart: () => {
            //       $(this).removeClass("open");
            //     },
            //   });

            //   openTl.to(faqA, {
            //     height: "auto",
            //     duration: 0.5,
            //     ease: mainEase,
            //   });

            //   openTl.to(
            //     faqP,
            //     {
            //       opacity: 100,
            //       // yPercent: 0,
            //       duration: 0.5,
            //       ease: mainEase,
            //     },
            //     "<"
            //   );

            //   openTl.to(
            //     faqIcon,
            //     {
            //       rotation: 180,
            //       duration: 0.5,
            //       ease: mainEase,
            //     },
            //     "<"
            //   );

            //   openTl.to(
            //     faqIconLine,
            //     {
            //       rotation: 90,
            //       opacity: 0,
            //       duration: 0.5,
            //       ease: mainEase,
            //     },
            //     "<"
            //   );

            //   closeTl.to(faqA, {
            //     height: 0,
            //     duration: 0.5,
            //     ease: mainEase,
            //   });

            //   closeTl.to(
            //     faqP,
            //     {
            //       opacity: 0,
            //       // yPercent: 50,
            //       duration: 0.5,
            //       ease: mainEase,
            //     },
            //     "<"
            //   );

            //   closeTl.to(
            //     faqIcon,
            //     {
            //       rotation: 0,
            //       duration: 0.5,
            //       ease: mainEase,
            //     },
            //     "<"
            //   );

            //   closeTl.to(
            //     faqIconLine,
            //     {
            //       rotation: 0,
            //       opacity: 1,
            //       duration: 0.5,
            //       ease: mainEase,
            //     },
            //     "<"
            //   );

            //   if ($(this).hasClass("open")) {
            //     closeTl.play();
            //   } else {
            //     openTl.play();
            //   }
            // });
          });

          // FAQS Section End

          // CTA Section Start

          $("[data-cta]").each(function () {
            let curveTl = gsap.timeline({
              scrollTrigger: {
                trigger: $(this),
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });

            curveTl.to(
              "#start-cta",
              {
                morphSVG: "#end-cta",
                ease: "power1.out",
              },
              "<"
            );
          });

          // CTA Section End
        });
      }
    );
  });
});

//--//--// MAIN END //--//--//

//--//--// INDEX //--//--//
//
// 1. Main
// -> 3. Intro Animation
// -> 4. Pricing Section
// -> 5. Additional Services Section
// -> 6. CTA Section
//
//--//--//-/////-//--//--//

//--//--// MAIN //--//--//

document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {
    let mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;

        $("[data-pricing]").each(function () {
          lenisInit();

          // Intro Animation Start

          let introTl = gsap.timeline({
            paused: true,
            onComplete: () => {
              $("[data-nav]").addClass("ease");
              navMotionFunc();
            },
          });

          introTl.to($("[data-pricing-wrap]"), {
            opacity: 1,
            duration: 0,
          });

          introTl.fromTo(
            $("[data-nav]"),
            {
              yPercent: -100,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              delay: 0.25,
              duration: 0.75,
              ease: "back.out",
            }
          );

          introTl.play();
          // Intro Animation End

          //   Pricing Section Start

          $("[data-pricing-wrap]").each(function () {
            let trigger = $(this);

            let tl = gsap.timeline({
              scrollTrigger: {
                trigger: trigger,
                start: "bottom bottom",
                end: "bottom top",
                scrub: true,
              },
            });

            tl.to("#start-pricing", {
              morphSVG: "#end-pricing",
              ease: "power1.out",
            });
          });

          // $(this).on("mouseover", function () {
          //   let sliderNum = $(".range_slider_number").text();
          //   let calcDisplay = $(".pricing_calculator_price").html(sliderNum);
          // });
          let vatToggle = $("[data-pricing-toggle]");
          let archiToggle = $("[data-archi-toggle]");

          let lastClickVat = 0;
          let lastClickArchi = 0;
          const debounceDelay = 400;

          vatToggle.off("click").on("click", () => {
            const now = Date.now();
            if (now - lastClickVat < debounceDelay) return;
            lastClickVat = now;
            vatToggle.toggleClass("is-on");
          });

          archiToggle.off("click").on("click", () => {
            const now = Date.now();
            if (now - lastClickArchi < debounceDelay) return;
            lastClickArchi = now;
            archiToggle.toggleClass("is-on");
          });

          const calcFunc = () => {
            let sliderNum = Number($(".range_slider_number").text() || 0);

            let pricesList = $("[data-price]")
              .map(function () {
                return Number($(this).text() || 0);
              })
              .get();

            let archiList = $("[data-archi]")
              .map(function () {
                return Number($(this).text() || 0);
              })
              .get();

            let vatIncluded = vatToggle.hasClass("is-on");
            let archiIncluded = archiToggle.hasClass("is-on");

            let basicBase = pricesList[0] || 0;
            let standardBase = pricesList[1] || 0;
            let comprehensiveBase = pricesList[2] || 0;

            let archiBasic = archiList[0] || 0;
            let archiStandard = archiList[1] || 0;
            let archiComprehensive = archiList[2] || 0;

            let tierBaseRate;
            let archiRatePerWeek = 0;

            if (sliderNum < 4) {
              tierBaseRate = basicBase;
              if (archiIncluded) archiRatePerWeek = archiBasic;
            } else if (sliderNum < 12) {
              tierBaseRate = standardBase;
              if (archiIncluded) archiRatePerWeek = archiStandard;
            } else {
              tierBaseRate = comprehensiveBase;
              if (archiIncluded) archiRatePerWeek = archiComprehensive;
            }

            let finalPerWeek = tierBaseRate + archiRatePerWeek;
            let previousPerWeek = basicBase + archiRatePerWeek;

            if (vatIncluded) {
              finalPerWeek *= 1.2;
              previousPerWeek *= 1.2;
            }

            $("[pricing-calculator-display-price]").html(
              sliderNum * finalPerWeek
            );
            $("[pricing-calculator-previous-price]").html(
              sliderNum * previousPerWeek
            );
            $("[pricing-calculator-week-price]").html(finalPerWeek);

            window.requestAnimationFrame(calcFunc);
          };

          window.requestAnimationFrame(calcFunc);

          //   Pricing Section End

          //   Additional Services Section Start
          //   Additional Services Section End

          // CTA Section Start

          $("[data-cta]").each(function () {
            let curveTl = gsap.timeline({
              scrollTrigger: {
                trigger: $(this),
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });

            curveTl.to(
              "#start-cta",
              {
                morphSVG: "#end-cta",
                ease: "power1.out",
              },
              "<"
            );
          });

          // CTA Section End
        });
      }
    );
  });
});

//--//--// MAIN END //--//--//

//--//--// INDEX //--//--//
//
// 1. Main
// -> 2. Intro Animation
// -> 3. Projects Section
// -> 4. Views Section
// -> 5. Projects List Section
//
//--//--//-/////-//--//--//

// GSAP Variables Start

// const shortDuration = 0.8;

// GSAP Variables End

//--//--// MAIN //--//--//

document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {
    let mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;

        $("[data-work-page]").each(function () {
          // TextReveal Start

          $("[text-reveal-2]").each(function () {
            let text = $(this);
            text
              .find(".line")
              .wrap('<div class="line-wrap" style="overflow: hidden;"></div>');

            let tl = gsap.timeline({
              scrollTrigger: {
                trigger: text,
                start: "top 95%",
                end: "top 95%",
                toggleActions: "play none none none",
              },
            });

            tl.fromTo(
              text.find(".line"),
              {
                yPercent: 100,
              },
              {
                yPercent: 0,
                duration: shortDuration,
                ease: mainEase,
                stagger: {
                  amount: mainStagger,
                },
              }
            );
          });

          $("[text-reveal-3]").each(function () {
            let text = $(this);
            text
              .find(".line")
              .wrap('<div class="line-wrap" style="overflow: hidden;"></div>');

            let tl = gsap.timeline();

            tl.fromTo(
              text.find(".line"),
              {
                yPercent: 100,
              },
              {
                yPercent: 0,
                duration: shortDuration,
                ease: mainEase,
                stagger: {
                  amount: mainStagger,
                },
              }
            );
          });

          // TextReveal End

          // Lenis Start

          const lenis = new Lenis({
            // lerp: 0.8,
            // wheelMultiplier: 0.8,
            // syncTouch: true,
            infinite: true,
          });
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
          });

          gsap.ticker.lagSmoothing(0);

          // Lenis End

          // Intro Animation Start

          let introTl = gsap.timeline({
            paused: true,
            onComplete: () => {
              $("[data-nav]").addClass("ease");
              navMotionFunc();
            },
          });

          introTl.to($("[data-projects]"), {
            opacity: 1,
            duration: 0.5,
          });

          introTl.fromTo(
            $("[data-nav]"),
            {
              yPercent: -100,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              delay: 0.25,
              duration: 0.75,
              ease: "back.out",
            }
          );

          introTl.fromTo(
            $("[data-projects-ui]"),
            {
              opacity: 0,
            },
            {
              opacity: 1,
              scale: 1,
              ease: mainEase,
              duration: shortDuration,
            },
            "<25%"
          );

          introTl.fromTo(
            $("[data-views-el]"),
            {
              scale: 0,
            },
            {
              opacity: 1,
              scale: 1,
              ease: bounceEase,
              duration: shortDuration,
            },
            "<25%"
          );

          introTl.play();

          //   Intro Animation End

          // Projects Section Start

          // $("[data-projects]").each(function () {
          //   ScrollTrigger.create({
          //     trigger: $(this),
          //     // pin: $("[data-projects-ui]"),
          //     start: "top top",
          //     end: "bottom bottom",
          //     scrub: true,
          //     pinSpacing: false,
          //   });

          //   $("[project-wrap]").each(function () {
          //     parallaxFunc($(this), "top bottom", "bottom top");

          //     // let totalProjects = $(this).find("[project-index-value]");

          //     let totalProjects = document.querySelectorAll(
          //       "[project-index-value]"
          //     );

          //     $("[data-projects-ui-right]").html(totalProjects.length - 1);

          //     ScrollTrigger.create({
          //       trigger: $(this),
          //       start: "top 50%",
          //       end: "bottom 50%",
          //       onEnter: () => {
          //         let curIndex = $(this).find("[project-index-value]").text();
          //         $("[data-projects-ui-left]").html(curIndex);
          //       },
          //       onEnterBack: () => {
          //         let curIndex = $(this).find("[project-index-value]").text();
          //         $("[data-projects-ui-left]").html(curIndex);
          //       },
          //     });
          //   });
          // });

          // Projects Section End

          // Views Section Start

          ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
              self.direction === -1
                ? gsap.set($(".views_wrap"), {
                    height: "100svh",
                  })
                : gsap.set($(".views_wrap"), {
                    height: "100vh",
                  });
            },
          });

          $("[btn-compact]").on("click", function () {
            lenis.stop();
            lenis.start();
            gsap.to("[data-projects]", {
              opacity: 0,
              duration: shortDuration,
              ease: mainEase,
              onComplete: () => {
                $("[data-projects]").addClass("hide");
                $("[data-projects-list]").removeClass("hide");
                gsap.fromTo(
                  $("[data-projects-list]"),
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                    duration: shortDuration,
                    ease: mainEase,
                  }
                );
              },
            });
            $(".views_slider").addClass("is-active");

            $("[data-nav]").css("color", "var(--swatch--charcoal)");
            let viewSliderTl = gsap.timeline({ paused: true });

            viewSliderTl.fromTo(
              $("[views-fullscreen-text]"),
              {
                scale: 1,
              },
              {
                scale: 0,
                duration: shortDuration,
                ease: mainEase,
              }
            );

            viewSliderTl.fromTo(
              $("[views-compact-text]"),
              {
                opacity: 0,
                scale: 0,
              },
              {
                opacity: 1,
                scale: 1,
                duration: shortDuration,
                ease: bounceEase,
              },
              "<"
            );

            viewSliderTl.play();
          });

          $("[btn-fullscreen]").on("click", function () {
            gsap.to("[data-projects-list]", {
              opacity: 0,
              duration: shortDuration,
              ease: mainEase,
              onComplete: () => {
                $("[data-projects-list]").addClass("hide");
                $("[data-projects]").removeClass("hide");
                gsap.fromTo(
                  $("[data-projects]"),
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                    duration: shortDuration,
                    ease: mainEase,
                  }
                );
              },
            });

            $(".views_slider").removeClass("is-active");

            $("[data-nav]").css("color", "var(--swatch--cream)");

            let viewSliderTl = gsap.timeline({ paused: true });

            viewSliderTl.fromTo(
              $("[views-fullscreen-text]"),
              {
                scale: 0,
              },
              {
                scale: 1,
                duration: shortDuration,
                ease: bounceEase,
              }
            );

            viewSliderTl.fromTo(
              $("[views-compact-text]"),
              {
                opacity: 1,
                scale: 1,
              },
              {
                opacity: 0,
                scale: 0,
                duration: shortDuration,
                ease: mainEase,
              },
              "<"
            );

            viewSliderTl.play();
          });

          // Views Section End

          // Projects List Start

          $("[data-projects-list]").each(function () {
            const titleSwiper = new Swiper(".swiper.is-list-title", {
              slidesPerView: "auto",
              direction: "vertical",
              // centerInsufficientSlides: true,
              centeredSlides: true,
              slideToClickedSlide: true,
              sticky: true,
              speed: 1000,
              slideActiveClass: "is-active-title",
              mousewheel: {
                enabled: true,
                forceToAxis: true,
                sensitivity: 0.8,
              },
            });
            const imgSwiper = new Swiper(".swiper.is-list-image", {
              slidesPerView: "auto",
              direction: "vertical",
              centerInsufficientSlides: true,
              centeredSlides: true,
              slideToClickedSlide: true,
              sticky: true,
              speed: 1000,
              mousewheel: {
                enabled: true,
                forceToAxis: true,
                sensitivity: 0.8,
              },
            });

            titleSwiper.controller.control = imgSwiper;
            imgSwiper.controller.control = titleSwiper;
          });

          // Projects List End
        });
      }
    );
  });
});

//--//--// MAIN END //--//--//

//--//--// INDEX //--//--//
//
// 1. Main
// -> 2. Intro Animation
//
//--//--//-/////-//--//--//

//--//--// MAIN //--//--//

document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {
    let mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;

        $("[data-project-page]").each(function () {
          lenisInit();

          // Intro Animation Start

          let introTl = gsap.timeline({
            paused: true,
            onComplete: () => {
              $("[data-nav]").addClass("ease");
              navMotionFunc();
            },
          });

          introTl.to($("[data-project-detail]"), {
            opacity: 1,
            duration: 0.5,
          });

          introTl.fromTo(
            $("[data-nav]"),
            {
              yPercent: -100,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              delay: 0.25,

              duration: 0.75,
              ease: "back.out",
            }
          );

          introTl.fromTo(
            ".marquee_item",
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 1,
              ease: "power1.in",
              stagger: {
                each: 0.15,
              },
            }
          );

          introTl.play();

          //   Intro Animation End

          //   Marquee Start

          // $("[data-project-detail]").each(function () {
          //   gsap.delayedCall(5, function () {
          //     gsap.to(".marquee_img", {
          //       opacity: 1,
          //       duration: 1,
          //       ease: "power1.in",
          //       stagger: {
          //         each: 0.15,
          //       },
          //     });
          //   });

          //   let object = {
          //     value: 1,
          //   };

          //   let tl = gsap.timeline({
          //     repeat: -1,
          //     onReverseComplete: () => {
          //       tl.progress(1);
          //     },
          //   });
          //   tl.fromTo(
          //     ".marquee_track",
          //     {
          //       xPercent: 0,
          //     },
          //     {
          //       xPercent: -50,
          //       duration: 30,
          //       ease: "none",
          //     }
          //   );

          //   Observer.create({
          //     target: window,
          //     type: "wheel,scroll,touch",
          //     onChangeY: (self) => {
          //       let v = self.velocityY * 0.006;
          //       v = gsap.utils.clamp(-60, 60, v);
          //       tl.timeScale(v);
          //       let resting = 1;
          //       if (v < 0) {
          //         resting = -1;
          //       }
          //       gsap.fromTo(
          //         object,
          //         { value: v },
          //         {
          //           value: resting,
          //           duration: 1,
          //           onUpdate: () => {
          //             tl.timeScale(object.value);
          //           },
          //         }
          //       );
          //     },
          //   });

          //   $(".button").on("click", function () {
          //     $(this).toggleClass("paused");
          //     if ($(this).hasClass("paused")) {
          //       $(this).find("p").text("Play");
          //       tl.pause();
          //     } else {
          //       $(this).find("p").text("Pause");
          //       tl.play();
          //     }
          //   });
          // });

          // Marquee Start

          $("[data-project-detail]").each(function () {
            gsap.delayedCall(5, function () {
              gsap.to(".marquee_img", {
                opacity: 1,
                duration: 1,
                ease: "power1.in",
                stagger: {
                  each: 0.15,
                },
              });
            });

            const $marqueeTrack = $(".marquee_track");

            let tl = gsap.timeline({
              repeat: -1,
              onReverseComplete: () => {
                tl.progress(1);
              },
            });

            tl.fromTo(
              $marqueeTrack,
              {
                xPercent: 0,
              },
              {
                xPercent: -50,
                duration: 60,
                ease: "none",
              }
            );

            let isDragging = false;
            let startX = 0;
            let startProgress = 0;

            function getClientX(e) {
              if (
                e.originalEvent &&
                e.originalEvent.touches &&
                e.originalEvent.touches.length
              ) {
                return e.originalEvent.touches[0].clientX;
              }
              return e.clientX;
            }

            function onDrag(e) {
              if (!isDragging) return;

              const currentX = getClientX(e);
              const deltaX = currentX - startX;

              const dragFactor = 0.0002;

              // Convert drag â†’ progress movement
              const moved = startProgress - deltaX * dragFactor;

              // Wrap 0â€“1 perfectly
              const wrapped = gsap.utils.wrap(0, 1, moved);

              tl.progress(wrapped);
            }

            function endDrag() {
              if (!isDragging) return;
              isDragging = false;
              $(window).off(".marqueeDrag");
              if (!$marqueeTrack.is(":hover")) {
                tl.play();
              }
            }

            $marqueeTrack.on("pointerdown", function (e) {
              e.preventDefault();
              isDragging = true;
              startX = getClientX(e);
              startProgress = tl.progress();
              tl.pause();
              $(window).on("pointermove.marqueeDrag", onDrag);
              $(window).on(
                "pointerup.marqueeDrag pointercancel.marqueeDrag",
                endDrag
              );
            });

            $marqueeTrack.on("mouseenter", function () {
              if (!isDragging) tl.pause();
            });

            $marqueeTrack.on("mouseleave", function () {
              if (!isDragging) tl.play();
            });

            $(".button").on("click", function () {
              $(this).toggleClass("paused");
              if ($(this).hasClass("paused")) {
                $(this).find("p").text("Play");
                tl.pause();
              } else {
                $(this).find("p").text("Pause");
                tl.play();
              }
            });
          });

          // Marquee End

          // Marquee End

          // Swiper Start

          const swiper = new Swiper(".swiper", {
            slidesPerView: 1.5,
            loop: true,
            centeredSlides: true,
            speed: 1000,
          });

          // Swiper End
        });
      }
    );
  });
});

//--//--// MAIN END //--//--//

//--//--// INDEX //--//--//
//
// 1. Main
// -> 2. Intro Animation
// -> 3. Services Section
// -> 4. Big Picture Section
//
//--//--//-/////-//--//--//

gsap.registerPlugin(DrawSVGPlugin);

//--//--// MAIN //--//--//

document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {
    let mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;

        $("[data-our-offering]").each(function () {
          lenisInit();

          //   FadeReveal Start

          $("[fade-reveal-3]").each(function () {
            let tl = gsap.timeline({
              scrollTrigger: {
                trigger: $(this),
                start: isMobile ? "top 50%" : "top 50%",
                end: isMobile ? "top 50%" : "top 50%",
                toggleActions: "play none reverse reverse",
              },
            });

            tl.fromTo(
              $(this),
              {
                opacity: 0,
                yPercent: 20,
              },
              {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                ease: bounceEase,
              }
            );
          });

          $("[fade-reveal-2]").each(function () {
            let tl = gsap.timeline({
              scrollTrigger: {
                trigger: $(this),
                start: isMobile ? "top 50%" : "top 95%",
                end: isMobile ? "top 50%" : "top 95%",
                toggleActions: "play none reverse reverse",
              },
            });

            tl.fromTo(
              $(this),
              {
                opacity: 0,
                yPercent: 20,
              },
              {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                ease: bounceEase,
              }
            );
          });
          //   FadeReveal End

          //   ElReveal Start

          $("[el-reveal-2]").each(function () {
            let el = $(this);

            let tl = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 60%" : "top 95%",
                end: isMobile ? "top 60%" : "top 95%",
                toggleActions: "play none reverse reverse",
              },
            });

            tl.fromTo(
              el,
              {
                scale: 0,
              },
              {
                scale: 1,
                ease: bounceEase,
                duration: shortDuration,
              }
            );
          });

          //   ElReveal End

          // Intro Animation Start

          let introTl = gsap.timeline({
            paused: true,
            onComplete: () => {
              $("[data-nav]").addClass("ease");
              navMotionFunc();
            },
          });

          introTl.to($("[data-offering-header]"), {
            opacity: 1,
            duration: 0,
          });

          introTl.fromTo(
            $("[data-nav]"),
            {
              yPercent: -100,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              delay: 0.25,
              duration: 0.75,
              ease: "back.out",
            }
          );

          introTl.play();

          //   Intro Animation End

          // Header Section Start

          $("[data-offering-header").each(function () {
            parallaxFunc($("[data-offering-header]"), "top top", "bottom top");
          });

          // Header Section End

          //   Services Section Start

          $("[data-services]").each(function () {
            gsap.set($("[data-modals-wrap]"), {
              display: "flex",
              backgroundColor: "rgba(29, 29, 29, 0)",
            });

            gsap.set(".services_modal_wrap", {
              xPercent: 100,
            });

            let modalFunc = (triggerEl, modalEl) => {
              let wrapperEl = $("[data-modals-wrap]");

              let modalTl = gsap.timeline({
                paused: true,
                onComplete: () => {
                  let modalCloseTl = gsap.timeline({
                    paused: true,
                    onComplete: () => {
                      modalTl.pause(0);
                      gsap.set(modalEl, {
                        display: "none",
                      });
                      modalTl.seek(0);
                    },
                  });

                  modalCloseTl.fromTo(
                    wrapperEl,
                    {
                      backgroundColor: "rgba(29, 29, 29, 0.5)",
                    },
                    {
                      backgroundColor: "rgba(29, 29, 29, 0)",
                      duration: 1,
                      ease: mainEase,
                      pointerEvents: "none",
                    }
                  );

                  modalCloseTl.fromTo(
                    modalEl,
                    { xPercent: 0 },
                    {
                      xPercent: 100,
                      duration: 1,
                      ease: mainEase,
                    },
                    "<"
                  );

                  $("[modal-close]").on("click", function () {
                    modalCloseTl.play();
                  });

                  modalCloseTl.pause();
                  modalCloseTl.seek(0);
                },
              });

              modalTl.fromTo(
                wrapperEl,
                { backgroundColor: "rgba(29, 29, 29, 0)" },
                {
                  backgroundColor: "rgba(29, 29, 29, 0.5)",
                  duration: 1,
                  ease: mainEase,
                }
              );

              modalTl.fromTo(
                modalEl,
                { xPercent: 100 },
                {
                  xPercent: 0,
                  duration: 1,
                  ease: mainEase,
                  onStart: () => {
                    gsap.set(modalEl, {
                      display: "flex",
                    });
                  },
                },
                "<"
              );

              modalTl.fromTo(
                wrapperEl,
                { pointerEvents: "none" },
                {
                  pointerEvents: "auto",
                },
                "<"
              );

              triggerEl.on("click", function () {
                modalTl.play();
              });
            };

            modalFunc(
              $("[modal-trigger=Planning]"),
              $("[data-modal=Planning]")
            );

            modalFunc(
              $("[modal-trigger=Finishing]"),
              $("[data-modal=Finishing]")
            );

            modalFunc(
              $("[modal-trigger=Execution]"),
              $("[data-modal=Execution]")
            );
          });

          //   Services Section End

          //   Big Picture Section Start

          $("[data-big-picture]").each(function () {
            $("[big-picture-pin-wrap]").each(function () {
              ScrollTrigger.create({
                trigger: $(this),
                pin: $("[big-picture-pin-el]"),
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                pinSpacing: false,
              });

              let expandTl = gsap.timeline({
                scrollTrigger: {
                  trigger: $(this),
                  start: "top top",
                  end: "bottom bottom",
                  scrub: true,
                  onEnterBack: () => {
                    gsap.set(".big_picture_main_wrap", {
                      backgroundColor: "transparent",
                    });
                    $("[data-nav]").addClass("dark");
                    $("[data-nav]").find(".nav_burger_icon").addClass("dark");
                    $("[data-nav]")
                      .find(".nav_burger_line")
                      .each(function () {
                        $(this).addClass("dark");
                      });
                  },
                },
              });

              expandTl.to($("[big-picture-expander]"), {
                width: isDesktop ? "120%" : "120vh",
                onComplete: () => {
                  gsap.set(".big_picture_main_wrap", {
                    backgroundColor: "#F7F1E7",
                  });
                  $("[data-nav]").removeClass("dark");
                  $("[data-nav]").find(".nav_burger_icon").removeClass("dark");
                  $("[data-nav]")
                    .find(".nav_burger_line")
                    .each(function () {
                      $(this).removeClass("dark");
                    });
                },
              });
            });

            let stickyMarkers = false;

            gsap.set("#big-picture-path", { opacity: 0 });

            let pathTl1 = gsap.timeline({
              scrollTrigger: {
                trigger: $("[row-1]"),
                start: "50% 50%",
                end: "bottom 50%",
                scrub: true,
                markers: stickyMarkers,
              },
            });

            pathTl1.fromTo(
              "#big-picture-path",
              { drawSVG: "0%" },
              {
                drawSVG: isDesktop ? "10%" : "10%",
                opacity: 1,
              }
            );

            let pathTl2 = gsap.timeline({
              scrollTrigger: {
                trigger: $("[row-2]"),
                start: "top 50%",
                end: "bottom 50%",
                scrub: true,
                markers: stickyMarkers,
              },
            });

            pathTl2.fromTo(
              "#big-picture-path",
              { drawSVG: isDesktop ? "10%" : "10%" },
              {
                drawSVG: isDesktop ? "15%" : "15%",
              }
            );

            let pathTl3 = gsap.timeline({
              scrollTrigger: {
                trigger: $("[row-3]"),
                start: "top 50%",
                end: "bottom 50%",
                scrub: true,
                markers: stickyMarkers,
              },
            });

            pathTl3.fromTo(
              "#big-picture-path",
              { drawSVG: isDesktop ? "15%" : "15%" },
              {
                drawSVG: isDesktop ? "22%" : "22%",
              }
            );

            let pathTl4 = gsap.timeline({
              scrollTrigger: {
                trigger: $("[row-4]"),
                start: "top 50%",
                end: "bottom 50%",
                scrub: true,
                markers: stickyMarkers,
              },
            });

            pathTl4.fromTo(
              "#big-picture-path",
              { drawSVG: isDesktop ? "22%" : "22%" },
              {
                drawSVG: isDesktop ? "35%" : "35%",
              }
            );

            let pathTl5 = gsap.timeline({
              scrollTrigger: {
                trigger: $("[row-5]"),
                start: "top 50%",
                end: "bottom 50%",
                scrub: true,
                markers: stickyMarkers,
              },
            });

            pathTl5.fromTo(
              "#big-picture-path",
              { drawSVG: isDesktop ? "35%" : "35%" },
              {
                drawSVG: "45%",
              }
            );

            let pathTl6 = gsap.timeline({
              scrollTrigger: {
                trigger: $("[row-6]"),
                start: "top 50%",
                end: "bottom 50%",
                scrub: true,
                markers: stickyMarkers,
              },
            });

            pathTl6.fromTo(
              "#big-picture-path",
              { drawSVG: "45%" },
              {
                drawSVG: isDesktop ? "57%" : "57%",
              }
            );

            let pathTl7 = gsap.timeline({
              scrollTrigger: {
                trigger: $("[row-7]"),
                start: "top 50%",
                end: "bottom 50%",
                scrub: true,
                markers: stickyMarkers,
              },
            });

            pathTl7.fromTo(
              "#big-picture-path",
              { drawSVG: isDesktop ? "57%" : "57%" },
              {
                drawSVG: isDesktop ? "63%" : "63%",
              }
            );

            let pathTl8 = gsap.timeline({
              scrollTrigger: {
                trigger: $("[row-8]"),
                start: "top 50%",
                end: "bottom 50%",
                scrub: true,
                markers: stickyMarkers,
              },
            });

            pathTl8.fromTo(
              "#big-picture-path",
              { drawSVG: isDesktop ? "63%" : "63%" },
              {
                drawSVG: isDesktop ? "70%" : "70%",
              }
            );

            let pathTl9 = gsap.timeline({
              scrollTrigger: {
                trigger: $("[row-9]"),
                start: "top 50%",
                end: "bottom 50%",
                scrub: true,
                markers: stickyMarkers,
              },
            });

            pathTl9.fromTo(
              "#big-picture-path",
              { drawSVG: isDesktop ? "70%" : "70%" },
              {
                drawSVG: isDesktop ? "74%" : "74%",
              }
            );

            let pathTl10 = gsap.timeline({
              scrollTrigger: {
                trigger: $("[row-10]"),
                start: "top 50%",
                end: "bottom 50%",
                scrub: true,
                markers: stickyMarkers,
              },
            });

            pathTl10.fromTo(
              "#big-picture-path",
              { drawSVG: isDesktop ? "74%" : "74%" },
              {
                drawSVG: isDesktop ? "82%" : "82%",
              }
            );

            let pathTl11 = gsap.timeline({
              scrollTrigger: {
                trigger: $("[row-11]"),
                start: "top 50%",
                end: "bottom 50%",
                scrub: true,
                markers: stickyMarkers,
              },
            });

            pathTl11.fromTo(
              "#big-picture-path",
              { drawSVG: isDesktop ? "82%" : "82%" },
              {
                drawSVG: isDesktop ? "90%" : "90%",
              }
            );

            let pathTl12 = gsap.timeline({
              scrollTrigger: {
                trigger: $("[row-12]"),
                start: "top 50%",
                end: "bottom 50%",
                scrub: true,
                markers: stickyMarkers,
              },
            });

            pathTl12.fromTo(
              "#big-picture-path",
              { drawSVG: isDesktop ? "90%" : "90%" },
              {
                drawSVG: "100%",
              }
            );

            let curveTl = gsap.timeline({
              scrollTrigger: {
                trigger: $(this),
                start: "bottom bottom",
                end: "bottom top",
                scrub: true,
              },
            });

            curveTl.to("#big-picture-start", {
              morphSVG: "#big-picture-end",
              ease: "power1.out",
            });
          });

          //   Big Picture Section End

          // CTA Section Start

          // $("[data-cta]").each(function () {
          //   let curveTl = gsap.timeline({
          //     scrollTrigger: {
          //       trigger: $(this),
          //       start: "top bottom",
          //       end: "top top",
          //       scrub: true,
          //     },
          //   });

          //   curveTl.to(
          //     "#start-cta",
          //     {
          //       morphSVG: "#end-cta",
          //       ease: "power1.out",
          //     },
          //     "<"
          //   );
          // });

          // CTA Section End
        });
      }
    );
  });
});

//--//--// MAIN END //--//--//

//--//--// INDEX //--//--//
//
// 1. Main
// -> 2. Intro Animation
// -> 3. Contact Section
//
//--//--//-/////-//--//--//

//--//--// MAIN //--//--//

document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {
    let mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;

        $("[data-contact-wrap]").each(function () {
          lenisInit();

          // Intro Animation Start

          let introTl = gsap.timeline({
            paused: true,
            onComplete: () => {
              $("[data-nav]").addClass("ease");
              navMotionFunc();
            },
          });

          introTl.to($("[data-contact-wrap]"), {
            opacity: 1,
            duration: 0,
          });

          introTl.fromTo(
            $("[data-nav]"),
            {
              yPercent: -100,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              delay: 0.25,
              duration: 0.75,
              ease: "back.out",
            }
          );

          introTl.play();

          //   Intro Animation End
        });
      }
    );
  });
});

//--//--// MAIN END //--//--//

//--//--// INDEX //--//--//
//
// 1. Main
// -> 2. Intro Animation
// -> 3. Contact Section
//
//--//--//-/////-//--//--//

//--//--// MAIN //--//--//

document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {
    let mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;

        $("[data-legal]").each(function () {
          lenisInit();

          // Intro Animation Start

          let introTl = gsap.timeline({
            paused: true,
            onComplete: () => {
              $("[data-nav]").addClass("ease");
              navMotionFunc();
            },
          });

          introTl.to($("[data-legal]"), {
            opacity: 1,
            duration: 0,
          });

          introTl.fromTo(
            $("[data-nav]"),
            {
              yPercent: -100,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              delay: 0.25,
              duration: 0.75,
              ease: "back.out",
            }
          );

          introTl.play();

          //   Intro Animation End
        });
      }
    );
  });
});

//--//--// MAIN END //--//--//

//--//--// INDEX //--//--//
//
// 1. Main
// -> 2. Intro Animation
// -> 3. 404 Section
//
//--//--//-/////-//--//--//

//--//--// MAIN //--//--//

document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {
    let mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;

        $("[data-404]").each(function () {
          lenisInit();

          // Intro Animation Start

          let introTl = gsap.timeline({
            paused: true,
            onComplete: () => {
              $("[data-nav]").addClass("ease");
              navMotionFunc();
            },
          });

          introTl.to($("[data-404]"), {
            opacity: 1,
            duration: 0,
          });

          introTl.fromTo(
            $("[data-nav]"),
            {
              yPercent: -100,
              opacity: 0,
            },
            {
              yPercent: 0,
              delay: 0.25,

              opacity: 1,
              duration: 0.75,
              ease: "back.out",
            }
          );

          introTl.play();

          //   Intro Animation End
        });
      }
    );
  });
});

//--//--// MAIN END //--//--//

//--//--// INDEX //--//--//
//
// 1. Main
// -> 3. Intro Animation
// -> 4. Pricing Section
// -> 5. Additional Services Section
// -> 6. CTA Section
//
//--//--//-/////-//--//--//

//--//--// MAIN //--//--//

document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {
    let mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;

        $("[data-shop]").each(function () {
          lenisInit();

          // Intro Animation Start

          let introTl = gsap.timeline({
            paused: true,
            onComplete: () => {
              $("[data-nav]").addClass("ease");
              navMotionFunc();
            },
          });

          introTl.to($("[data-shop-wrap]"), {
            opacity: 1,
            duration: 0,
          });

          introTl.fromTo(
            $("[data-nav]"),
            {
              yPercent: -100,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              delay: 0.25,
              duration: 0.75,
              ease: "back.out",
            }
          );

          introTl.play();
          // Intro Animation End

          //   Pricing Section Start

          $("[data-shop-wrap]").each(function () {
            $(".product_list_filter_button").on("click", function () {
              ScrollTrigger.refresh();
            });

            $(".product_list_filter_radio").each(function () {
              $(this).on("click", function () {
                // Reset all labels to their original color
                $(".product_list_filter_text").css("color", "");

                // Set the label of the selected radio button to white
                if ($(this).is(":checked")) {
                  $(this)
                    .closest(".product_list_filter_text")
                    .css("color", "white");
                }
              });
            });
          });

          // CTA Section Start

          $("[data-cta]").each(function () {
            let curveTl = gsap.timeline({
              scrollTrigger: {
                trigger: $(this),
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });

            curveTl.to(
              "#start-cta",
              {
                morphSVG: "#end-cta",
                ease: "power1.out",
              },
              "<"
            );
          });

          // CTA Section End
        });
      }
    );
  });
});

//--//--// MAIN END //--//--//

//--//--// INDEX //--//--//
//
// 1. Main
// -> 3. Intro Animation
// -> 4. Pricing Section
// -> 5. Additional Services Section
// -> 6. CTA Section
//
//--//--//-/////-//--//--//

//--//--// MAIN //--//--//

document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {
    let mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;

        $("[data-product-page]").each(function () {
          lenisInit();

          // Intro Animation Start

          let introTl = gsap.timeline({
            paused: true,
            onComplete: () => {
              $("[data-nav]").addClass("ease");
              navMotionFunc();
            },
          });

          introTl.to($("[data-product-section]"), {
            opacity: 1,
            duration: 0,
          });

          introTl.fromTo(
            $("[data-nav]"),
            {
              yPercent: -100,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              delay: 0.25,
              duration: 0.75,
              ease: "back.out",
            }
          );

          introTl.play();
          // Intro Animation End

          // Product Section Start

          $("[data-product-section]").each(function () {
            let stickerTl = gsap.timeline({
              scrollTrigger: {
                trigger: $(this),
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });

            stickerTl.to($("[limited-sticker]"), {
              rotation: 360,
            });
          });

          // Product Section End

          // CTA Section Start

          $("[data-cta]").each(function () {
            let curveTl = gsap.timeline({
              scrollTrigger: {
                trigger: $(this),
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });

            curveTl.to(
              "#start-cta",
              {
                morphSVG: "#end-cta",
                ease: "power1.out",
              },
              "<"
            );
          });

          // CTA Section End
        });
      }
    );
  });
});

//--//--// MAIN END //--//--//

function mrModal() {
  const $buttons = $("[modal-btn]");
  const initialUrl = new URL(window.location.href);
  const initialSlug = initialUrl.searchParams.get("job");

  $buttons.each(function () {
    const $btn = $(this);
    const key = $btn.attr("modal-btn");

    const $target = $(`[modal-item="${key}"]`);
    const $bg = $target.find(".modal-bg");
    const $layout = $target.find(".modal-layout");
    const $close = $(`[modal-close="${key}"]`);
    const modalUrl = $target.attr("modal-url");

    function setUrlOnOpen() {
      if (!modalUrl) return;

      const url = new URL(window.location.href);
      url.searchParams.set("job", modalUrl);
      window.history.pushState({ modalKey: key }, "", url.toString());
    }

    function clearUrlOnClose() {
      const url = new URL(window.location.href);
      url.searchParams.delete("job");
      window.history.pushState({}, "", url.toString());
    }

    function lockScroll() {
      isModalOpen = true;
      if (lenis) lenis.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    function unlockScroll() {
      isModalOpen = false;
      if (lenis) lenis.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    function openModal(pushUrl) {
      lockScroll();

      $target.css({
        opacity: "1",
        pointerEvents: "auto",
      });

      if (pushUrl) {
        setUrlOnOpen();
      }

      const mrModalTl = gsap.timeline();

      mrModalTl.fromTo(
        $bg,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power1.out" },
        0
      );

      mrModalTl.fromTo(
        $layout,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.6, ease: "power1.in" },
        0
      );
    }

    function closeModal() {
      const mrModalCloseTl = gsap.timeline({
        onComplete: () => {
          $target.css({
            opacity: "0",
            pointerEvents: "none",
          });
          clearUrlOnClose();
          unlockScroll();
        },
      });

      mrModalCloseTl.fromTo(
        $bg,
        { opacity: 1 },
        { opacity: 0, duration: 0.3, ease: "power1.out" },
        0.5
      );

      mrModalCloseTl.fromTo(
        $layout,
        { xPercent: 0 },
        { xPercent: 100, duration: 0.7, ease: "power1.out" },
        0
      );
    }

    $btn.on("click", function () {
      openModal(true);
    });

    $close.on("click", closeModal);
    $bg.on("click", closeModal);

    if (modalUrl && initialSlug === modalUrl) {
      openModal(false);
    }
  });
}

mrModal();