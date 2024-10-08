/*!
 * jQuery Tools v1.2.7 - The missing UI library for the Web
 *
 * tabs/tabs.js
 *
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 *
 * http://flowplayer.org/tools/
 *
 */
(function (a) {
  (a.tools = a.tools || { version: "v1.2.7" }),
    (a.tools.tabs = {
      conf: {
        tabs: "a",
        current: "current",
        onBeforeClick: null,
        onClick: null,
        effect: "default",
        initialEffect: !1,
        initialIndex: 0,
        event: "click",
        rotate: !1,
        slideUpSpeed: 400,
        slideDownSpeed: 400,
        history: !1,
      },
      addEffect: function (a, c) {
        b[a] = c;
      },
    });
  var b = {
      default: function (a, b) {
        this.getPanes().hide().eq(a).show(), b.call();
      },
      fade: function (a, b) {
        var c = this.getConf(),
          d = c.fadeOutSpeed,
          e = this.getPanes();
        d ? e.fadeOut(d) : e.hide(), e.eq(a).fadeIn(c.fadeInSpeed, b);
      },
      slide: function (a, b) {
        var c = this.getConf();
        this.getPanes().slideUp(c.slideUpSpeed),
          this.getPanes().eq(a).slideDown(c.slideDownSpeed, b);
      },
      ajax: function (a, b) {
        this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"), b);
      },
    },
    c,
    d;
  a.tools.tabs.addEffect("horizontal", function (b, e) {
    if (!c) {
      var f = this.getPanes().eq(b),
        g = this.getCurrentPane();
      d || (d = this.getPanes().eq(0).width()),
        (c = !0),
        f.show(),
        g.animate(
          { width: 0 },
          {
            step: function (a) {
              f.css("width", d - a);
            },
            complete: function () {
              a(this).hide(), e.call(), (c = !1);
            },
          }
        ),
        g.length || (e.call(), (c = !1));
    }
  });
  function e(c, d, e) {
    var f = this,
      g = c.add(this),
      h = c.find(e.tabs),
      i = d.jquery ? d : c.children(d),
      j;
    h.length || (h = c.children()),
      i.length || (i = c.parent().find(d)),
      i.length || (i = a(d)),
      a.extend(this, {
        click: function (d, i) {
          var k = h.eq(d),
            l = !c.data("tabs");
          typeof d == "string" &&
            d.replace("#", "") &&
            ((k = h.filter('[href*="' + d.replace("#", "") + '"]')),
            (d = Math.max(h.index(k), 0)));
          if (e.rotate) {
            var m = h.length - 1;
            if (d < 0) return f.click(m, i);
            if (d > m) return f.click(0, i);
          }
          if (!k.length) {
            if (j >= 0) return f;
            (d = e.initialIndex), (k = h.eq(d));
          }
          if (d === j) return f;
          (i = i || a.Event()), (i.type = "onBeforeClick"), g.trigger(i, [d]);
          if (!i.isDefaultPrevented()) {
            var n = l ? (e.initialEffect && e.effect) || "default" : e.effect;
            b[n].call(f, d, function () {
              (j = d), (i.type = "onClick"), g.trigger(i, [d]);
            }),
              h.removeClass(e.current),
              k.addClass(e.current);
            return f;
          }
        },
        getConf: function () {
          return e;
        },
        getTabs: function () {
          return h;
        },
        getPanes: function () {
          return i;
        },
        getCurrentPane: function () {
          return i.eq(j);
        },
        getCurrentTab: function () {
          return h.eq(j);
        },
        getIndex: function () {
          return j;
        },
        next: function () {
          return f.click(j + 1);
        },
        prev: function () {
          return f.click(j - 1);
        },
        destroy: function () {
          h.off(e.event).removeClass(e.current),
            i.find('a[href^="#"]').off("click.T");
          return f;
        },
      }),
      a.each("onBeforeClick,onClick".split(","), function (b, c) {
        a.isFunction(e[c]) && a(f).on(c, e[c]),
          (f[c] = function (b) {
            b && a(f).on(c, b);
            return f;
          });
      }),
      e.history &&
        a.fn.history &&
        (a.tools.history.init(h), (e.event = "history")),
      h.each(function (b) {
        a(this).on(e.event, function (a) {
          f.click(b, a);
          return a.preventDefault();
        });
      }),
      i.find('a[href^="#"]').on("click.T", function (b) {
        f.click(a(this).attr("href"), b);
      }),
      location.hash &&
      e.tabs == "a" &&
      c.find('[href="' + location.hash + '"]').length
        ? f.click(location.hash)
        : (e.initialIndex === 0 || e.initialIndex > 0) &&
          f.click(e.initialIndex);
  }
  a.fn.tabs = function (b, c) {
    var d = this.data("tabs");
    d && (d.destroy(), this.removeData("tabs")),
      a.isFunction(c) && (c = { onBeforeClick: c }),
      (c = a.extend({}, a.tools.tabs.conf, c)),
      this.each(function () {
        (d = new e(a(this), b, c)), a(this).data("tabs", d);
      });
    return c.api ? d : this;
  };
})(jQuery);
