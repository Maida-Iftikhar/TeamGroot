function ownKeys(e, t) {
  var i = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t &&
      (o = o.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      i.push.apply(i, o);
  }
  return i;
}
function _objectSpread(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = null != arguments[t] ? arguments[t] : {};
    t % 2
      ? ownKeys(Object(i), !0).forEach(function (t) {
          _defineProperty(e, t, i[t]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i))
      : ownKeys(Object(i)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
        });
  }
  return e;
}
function _defineProperty(e, t, i) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = i),
    e
  );
}
!(function (e) {
  e = jQuery = e;
  var t = { sections: [] };
  theme.Shopify = {
    formatMoney: function (e, t) {
      function i(e, t) {
        return void 0 === e ? t : e;
      }
      function o(e, t, o, a) {
        if (
          ((t = i(t, 2)),
          (o = i(o, ",")),
          (a = i(a, ".")),
          isNaN(e) || null == e)
        )
          return 0;
        var n = (e = (e / 100).toFixed(t)).split(".");
        return (
          n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + o) +
          (n[1] ? a + n[1] : "")
        );
      }
      "string" == typeof e && (e = e.replace(".", ""));
      var a = "",
        n = /\{\{\s*(\w+)\s*\}\}/,
        s = t || this.money_format;
      switch (s.match(n)[1]) {
        case "amount":
          a = o(e, 2);
          break;
        case "amount_no_decimals":
          a = o(e, 0);
          break;
        case "amount_with_comma_separator":
          a = o(e, 2, ".", ",");
          break;
        case "amount_with_space_separator":
          a = o(e, 2, " ", ",");
          break;
        case "amount_with_period_and_space_separator":
          a = o(e, 2, " ", ".");
          break;
        case "amount_no_decimals_with_comma_separator":
          a = o(e, 0, ".", ",");
          break;
        case "amount_no_decimals_with_space_separator":
          a = o(e, 0, " ", "");
          break;
        case "amount_with_apostrophe_separator":
          a = o(e, 2, "'", ".");
          break;
        case "amount_with_decimal_separator":
          a = o(e, 2, ".", ".");
      }
      return s.replace(n, a);
    },
    formatImage: function (e, t) {
      return e ? e.replace(/^(.*)\.([^\.]*)$/g, "$1_" + t + ".$2") : "";
    },
    Image: {
      imageSize: function (e) {
        var t = e.match(
          /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/
        );
        return null !== t ? t[1] : null;
      },
      getSizedImageUrl: function (e, t) {
        if (null == t) return e;
        if ("master" == t) return this.removeProtocol(e);
        var i = e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
        if (null != i) {
          var o = e.split(i[0]),
            a = i[0];
          return this.removeProtocol(o[0] + "_" + t + a);
        }
        return null;
      },
      removeProtocol: function (e) {
        return e.replace(/http(s)?:/, "");
      },
    },
  };
  class o {
    constructor(t) {
      var i =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : ".cc-".concat(t),
        o = this;
      (this.instances = []),
        e(document).on("cc:component:load", function (a, n, s) {
          n === t &&
            e(s)
              .find("".concat(i, ":not(.cc-initialized)"))
              .each(function () {
                o.init(this);
              });
        }),
        e(document).on("cc:component:unload", function (a, n, s) {
          n === t &&
            e(s)
              .find(i)
              .each(function () {
                o.destroy(this);
              });
        }),
        e(i).each(function () {
          o.init(this);
        });
    }
    init(t) {
      e(t).addClass("cc-initialized");
    }
    destroy(t) {
      e(t).removeClass("cc-initialized");
    }
    registerInstance(e, t) {
      this.instances.push({ container: e, instance: t });
    }
    destroyInstance(e) {
      this.instances = this.instances.filter((t) => {
        if (t.container === e)
          return (
            "function" == typeof t.instance.destroy && t.instance.destroy(),
            t.container !== e
          );
      });
    }
  }
  (theme.Sections = new (function () {
    var t = this;
    (t._instances = []),
      (t._deferredSectionTargets = []),
      (t._sections = []),
      (t._deferredLoadViewportExcess = 300),
      (t._deferredWatcherRunning = !1),
      (t.init = function () {
        e(document)
          .on("shopify:section:load", function (e) {
            var i = t._themeSectionTargetFromShopifySectionTarget(e.target);
            i && t.sectionLoad(i);
          })
          .on("shopify:section:unload", function (e) {
            var i = t._themeSectionTargetFromShopifySectionTarget(e.target);
            i && t.sectionUnload(i);
          })
          .on("shopify:section:reorder", function (e) {
            var i = t._themeSectionTargetFromShopifySectionTarget(e.target);
            i && t.sectionReorder(i);
          }),
          e(window).on(
            "throttled-scroll.themeSectionDeferredLoader debouncedresize.themeSectionDeferredLoader",
            t._processDeferredSections
          ),
          (t._deferredWatcherRunning = !0);
      }),
      (t.register = function (i, o, a) {
        t._sections.push({
          type: i,
          section: o,
          afterSectionLoadCallback: a ? a.afterLoad : null,
          afterSectionUnloadCallback: a ? a.afterUnload : null,
        }),
          e('[data-section-type="' + i + '"]').each(function () {
            Shopify.designMode ||
            (a && !1 === a.deferredLoad) ||
            !t._deferredWatcherRunning
              ? t.sectionLoad(this)
              : t.sectionDeferredLoad(this, a);
          });
      }),
      (t.sectionDeferredLoad = function (e, i) {
        t._deferredSectionTargets.push({
          target: e,
          deferredLoadViewportExcess:
            i && i.deferredLoadViewportExcess
              ? i.deferredLoadViewportExcess
              : t._deferredLoadViewportExcess,
        }),
          t._processDeferredSections(!0);
      }),
      (t._processDeferredSections = function (i) {
        if (t._deferredSectionTargets.length)
          for (
            var o = e(window).scrollTop(),
              a = o + e(window).height(),
              n = !0 === i ? t._deferredSectionTargets.length - 1 : 0;
            n < t._deferredSectionTargets.length;
            n++
          ) {
            var s = t._deferredSectionTargets[n].target,
              r = t._deferredSectionTargets[n].deferredLoadViewportExcess,
              l = e(s).offset().top - r,
              c = l > o && l < a;
            if (!c) {
              var d = l + e(s).outerHeight() + 2 * r;
              c = d > o && d < a;
            }
            (c || (l < o && d > a)) &&
              (t.sectionLoad(s), t._deferredSectionTargets.splice(n, 1), n--);
          }
        !0 !== i &&
          0 === t._deferredSectionTargets.length &&
          ((t._deferredWatcherRunning = !1),
          e(window).off(".themeSectionDeferredLoader"));
      }),
      (t.sectionLoad = function (i) {
        var o = t._sectionForTarget(i),
          a = !1;
        if (!1 !== (a = o.section ? o.section : o)) {
          var n = {
            target: i,
            section: a,
            $shopifySectionContainer: e(i).closest(".shopify-section"),
            thisContext: {
              functions: a.functions,
              registeredEventListeners: [],
            },
          };
          if (
            ((n.thisContext.registerEventListener =
              t._registerEventListener.bind(n.thisContext)),
            t._instances.push(n),
            e(i).data("components"))
          )
            e(i)
              .data("components")
              .split(",")
              .forEach((t) => {
                e(document).trigger("cc:component:load", [t, i]);
              });
          t._callSectionWith(a, "onSectionLoad", i, n.thisContext),
            t._callSectionWith(a, "afterSectionLoadCallback", i, n.thisContext),
            a.onSectionSelect &&
              n.$shopifySectionContainer.on(
                "shopify:section:select",
                function (e) {
                  t._callSectionWith(
                    a,
                    "onSectionSelect",
                    e.target,
                    n.thisContext
                  );
                }
              ),
            a.onSectionDeselect &&
              n.$shopifySectionContainer.on(
                "shopify:section:deselect",
                function (e) {
                  t._callSectionWith(
                    a,
                    "onSectionDeselect",
                    e.target,
                    n.thisContext
                  );
                }
              ),
            a.onBlockSelect &&
              e(i).on("shopify:block:select", function (e) {
                t._callSectionWith(a, "onBlockSelect", e.target, n.thisContext);
              }),
            a.onBlockDeselect &&
              e(i).on("shopify:block:deselect", function (e) {
                t._callSectionWith(
                  a,
                  "onBlockDeselect",
                  e.target,
                  n.thisContext
                );
              });
        }
      }),
      (t.sectionUnload = function (i) {
        for (
          var o = t._sectionForTarget(i), a = -1, n = 0;
          n < t._instances.length;
          n++
        )
          t._instances[n].target == i && (a = n);
        if (a > -1) {
          var s = t._instances[a];
          if (
            (e(i).off("shopify:block:select shopify:block:deselect"),
            s.$shopifySectionContainer.off(
              "shopify:section:select shopify:section:deselect"
            ),
            t._callSectionWith(s.section, "onSectionUnload", i, s.thisContext),
            t._unloadRegisteredEventListeners(
              s.thisContext.registeredEventListeners
            ),
            t._callSectionWith(
              o,
              "afterSectionUnloadCallback",
              i,
              s.thisContext
            ),
            t._instances.splice(a),
            e(i).data("components"))
          )
            e(i)
              .data("components")
              .split(",")
              .forEach((t) => {
                e(document).trigger("cc:component:unload", [t, i]);
              });
        } else
          for (n = 0; n < t._deferredSectionTargets.length; n++)
            if (t._deferredSectionTargets[n].target == i) {
              t._deferredSectionTargets[n].splice(n, 1);
              break;
            }
      }),
      (t.sectionReorder = function (e) {
        for (var i = -1, o = 0; o < t._instances.length; o++)
          t._instances[o].target == e && (i = o);
        if (i > -1) {
          var a = t._instances[i];
          t._callSectionWith(a.section, "onSectionReorder", e, a.thisContext);
        }
      }),
      (t._registerEventListener = function (e, t, i) {
        e.addEventListener(t, i),
          this.registeredEventListeners.push({
            element: e,
            eventType: t,
            callback: i,
          });
      }),
      (t._unloadRegisteredEventListeners = function (e) {
        e.forEach((e) => {
          e.element.removeEventListener(e.eventType, e.callback);
        });
      }),
      (t._callSectionWith = function (e, t, i, o) {
        if ("function" == typeof e[t])
          try {
            o ? e[t].bind(o)(i) : e[t](i);
          } catch (e) {
            var a = i.dataset.sectionType;
            console.warn(
              "Theme warning: '"
                .concat(t, "' failed for section '")
                .concat(a, "'")
            ),
              console.debug(i, e);
          }
      }),
      (t._themeSectionTargetFromShopifySectionTarget = function (t) {
        var i = e("[data-section-type]:first", t);
        return i.length > 0 && i[0];
      }),
      (t._sectionForTarget = function (i) {
        for (
          var o = e(i).attr("data-section-type"), a = 0;
          a < t._sections.length;
          a++
        )
          if (t._sections[a].type == o) return t._sections[a];
        return !1;
      }),
      (t._sectionAlreadyRegistered = function (e) {
        for (var i = 0; i < t._sections.length; i++)
          if (t._sections[i].type == e) return !0;
        return !1;
      });
  })()),
    (theme.scriptsLoaded = {}),
    (theme.loadScriptOnce = function (e, t, i, o) {
      if (void 0 === theme.scriptsLoaded[e]) {
        theme.scriptsLoaded[e] = [];
        var a = document.createElement("script");
        (a.src = e),
          (o || i) && (a.async = !1),
          i && i(),
          "function" == typeof t &&
            (theme.scriptsLoaded[e].push(t),
            a.readyState
              ? (a.onreadystatechange = function () {
                  if ("loaded" == a.readyState || "complete" == a.readyState) {
                    a.onreadystatechange = null;
                    for (var e = 0; e < theme.scriptsLoaded[this].length; e++)
                      theme.scriptsLoaded[this][e]();
                    theme.scriptsLoaded[this] = !0;
                  }
                }.bind(e))
              : (a.onload = function () {
                  for (var e = 0; e < theme.scriptsLoaded[this].length; e++)
                    theme.scriptsLoaded[this][e]();
                  theme.scriptsLoaded[this] = !0;
                }.bind(e)));
        var n = document.getElementsByTagName("script")[0];
        return n.parentNode.insertBefore(a, n), !0;
      }
      if ("object" != typeof theme.scriptsLoaded[e] || "function" != typeof t)
        return "function" == typeof t && t(), !1;
      theme.scriptsLoaded[e].push(t);
    }),
    (theme.loadStyleOnce = function (e) {
      var t = e.replace(/^https?:/, "");
      if (!document.querySelector('link[href="' + encodeURI(t) + '"]')) {
        var i = document.createElement("link");
        (i.href = t), (i.rel = "stylesheet"), (i.type = "text/css");
        var o = document.getElementsByTagName("link")[0];
        o.parentNode.insertBefore(i, o);
      }
    }),
    (theme.Disclosure = (function () {
      var t = "[data-disclosure-list]",
        i = "[data-disclosure-toggle]",
        o = "[data-disclosure-input]",
        a = "[data-disclosure-option]",
        n = "disclosure-list--visible";
      function s(e) {
        (this.$container = e),
          (this.cache = {}),
          this._cacheSelectors(),
          this._connectOptions(),
          this._connectToggle(),
          this._onFocusOut();
      }
      return (
        (s.prototype = e.extend({}, s.prototype, {
          _cacheSelectors: function () {
            this.cache = {
              $disclosureList: this.$container.find(t),
              $disclosureToggle: this.$container.find(i),
              $disclosureInput: this.$container.find(o),
              $disclosureOptions: this.$container.find(a),
            };
          },
          _connectToggle: function () {
            this.cache.$disclosureToggle.on(
              "click",
              function (t) {
                var i = "true" === e(t.currentTarget).attr("aria-expanded");
                e(t.currentTarget).attr("aria-expanded", !i),
                  this.cache.$disclosureList.toggleClass(n);
              }.bind(this)
            );
          },
          _connectOptions: function () {
            this.cache.$disclosureOptions.on(
              "click",
              function (t) {
                t.preventDefault(),
                  this._submitForm(e(t.currentTarget).data("value"));
              }.bind(this)
            );
          },
          _onFocusOut: function () {
            this.cache.$disclosureToggle.on(
              "focusout",
              function (e) {
                0 === this.$container.has(e.relatedTarget).length &&
                  this._hideList();
              }.bind(this)
            ),
              this.cache.$disclosureList.on(
                "focusout",
                function (t) {
                  var i = e(t.currentTarget).has(t.relatedTarget).length > 0;
                  this.cache.$disclosureList.hasClass(n) &&
                    !i &&
                    this._hideList();
                }.bind(this)
              ),
              this.$container.on(
                "keyup",
                function (e) {
                  27 === e.which &&
                    (this._hideList(), this.cache.$disclosureToggle.focus());
                }.bind(this)
              ),
              (this.bodyOnClick = function (e) {
                var t = this.$container.has(e.target).length > 0;
                this.cache.$disclosureList.hasClass(n) &&
                  !t &&
                  this._hideList();
              }.bind(this)),
              e("body").on("click", this.bodyOnClick);
          },
          _submitForm: function (e) {
            this.cache.$disclosureInput.val(e),
              this.$container.parents("form").submit();
          },
          _hideList: function () {
            this.cache.$disclosureList.removeClass(n),
              this.cache.$disclosureToggle.attr("aria-expanded", !1);
          },
          unload: function () {
            e("body").off("click", this.bodyOnClick),
              this.cache.$disclosureOptions.off(),
              this.cache.$disclosureToggle.off(),
              this.cache.$disclosureList.off(),
              this.$container.off();
          },
        })),
        s
      );
    })()),
    (theme.showQuickPopup = function (t, i) {
      var o = e('<div class="simple-popup"/>'),
        a = i.offset();
      o.html(t).css({ left: a.left, top: a.top }).hide(),
        e("body").append(o),
        o.css({
          marginTop: -o.outerHeight() - 10,
          marginLeft: -(o.outerWidth() - i.outerWidth()) / 2,
        }),
        o
          .fadeIn(200)
          .delay(3500)
          .fadeOut(400, function () {
            e(this).remove();
          });
    }),
    (e.fn.sort = [].sort),
    (e.fn.fadeOutAndRemove = function (t, i) {
      e(this).fadeOut(t, function () {
        e(this).remove(), "function" == typeof i && i();
      });
    }),
    (e.fn.clickyBoxes = function (t) {
      if ("destroy" != t)
        return e(this)
          .filter("select:not(.clickybox-replaced)")
          .addClass("clickybox-replaced")
          .each(function () {
            var t,
              i = i || e(this).attr("id"),
              o = e('<ul class="clickyboxes"/>')
                .attr("id", "clickyboxes-" + i)
                .data("select", e(this))
                .insertAfter(this);
            (t = e(this).is("[id]")
              ? e('label[for="' + e(this).attr("id") + '"]')
              : e(this).siblings("label")).length > 0 &&
              o.addClass(
                "options-" +
                  removeDiacritics(t.text())
                    .toLowerCase()
                    .replace(/'/g, "")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/-+/g, "-")
                    .replace(/-*$/, "")
              ),
              e(this)
                .find("option")
                .each(function () {
                  e("<li/>")
                    .appendTo(o)
                    .append(
                      e('<a href="#"/>')
                        .attr("data-value", e(this).val())
                        .html(e(this).html())
                        .addClass(
                          "opt--" +
                            removeDiacritics(e(this).text())
                              .toLowerCase()
                              .replace(/'/g, "")
                              .replace(/[^a-z0-9]+/g, "-")
                              .replace(/-+/g, "-")
                              .replace(/-*$/, "")
                        )
                    );
                }),
              e(this)
                .hide()
                .addClass("replaced")
                .on("change.clickyboxes keyup.clickyboxes", function () {
                  var t = e(this).val();
                  o.find("a")
                    .removeClass("active")
                    .filter(function () {
                      return e(this).attr("data-value") == t;
                    })
                    .addClass("active");
                })
                .trigger("keyup"),
              o.on("click.clickyboxes", "a", function () {
                if (!e(this).hasClass("active")) {
                  var t = e(this).closest(".clickyboxes");
                  t.data("select").val(e(this).data("value")).trigger("change"),
                    t.trigger("change");
                }
                return !1;
              });
          });
      e(this).off(".clickyboxes"),
        e(this).next(".clickyboxes").off(".clickyboxes");
    }),
    (e.scrollBarWidth = function () {
      var t = e("<div/>")
          .css({
            width: 100,
            height: 100,
            overflow: "scroll",
            position: "absolute",
            top: -9999,
          })
          .prependTo("body"),
        i = t[0].offsetWidth - t[0].clientWidth;
      return t.remove(), i;
    });
  var a, n, s, r, l;
  (e.fn.selectReplace = function (t) {
    return e(this)
      .filter("select:not(.replaced, .noreplace)")
      .each(function () {
        var i = e(this).find("option"),
          o =
            i.filter(":selected").length > 0
              ? i.filter(":selected").text()
              : i.first().text(),
          a = e(this)
            .addClass("replaced")
            .wrap('<div class="pretty-select">')
            .parent()
            .addClass("id-" + e(this).attr("id"))
            .append(
              '<span class="text"><span class="value">' +
                o +
                '</span></span><svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/><path d="M0-.75h24v24H0z" fill="none"/></svg>'
            );
        if (e(this).attr("id")) {
          var n = e('label[for="' + e(this).attr("id") + '"]'),
            s = e(this).closest("td"),
            r = n.closest("td");
          if (!t && (0 == s.length || 0 == r.length || s[0] == r[0])) {
            var l = e('<span class="label">')
              .html(n.html())
              .prependTo(a.find(".text"));
            ":" != l.slice(-1) && l.append(":"),
              a.find("select").attr("aria-label", n.text()),
              n.remove();
          }
        }
      })
      .on("change keyup", function () {
        e(this)
          .siblings(".text")
          .find(".value")
          .html(e(this).find(":selected").html());
      });
  }),
    (e.fn.ccHoverLine = function (t) {
      e(this).each(function () {
        var i = e(this);
        if (!i.hasClass("cc-init")) {
          i.append("<li class='cc-hover-line'></li>").addClass("cc-init");
          var o = e(this).find(".cc-hover-line");
          function a() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : i.find('li a[aria-selected="true"], li a.active');
            1 === e.length &&
              o.css({
                width: e.width(),
                top: e.position().top + e.outerHeight(),
                left: e.position().left,
              });
          }
          t && t.lineCss && o.css(t.lineCss),
            a(),
            e(window).outerWidth() < 768
              ? e(this)
                  .find("li")
                  .click(function () {
                    var t = e(this).find("a");
                    1 === t.length && a(t);
                  })
              : e(this)
                  .find("li")
                  .hover(
                    function () {
                      var t = e(this).find("a");
                      1 === t.length && a(t);
                    },
                    function () {
                      a();
                    }
                  ),
            e(window).on("debouncedresizewidth", function () {
              a();
            });
        }
      });
    }),
    (l = document.createEvent("Event")).initEvent("throttled-scroll", !0, !0),
    window.addEventListener(
      "scroll",
      ((a = function () {
        window.dispatchEvent(l);
      }),
      (n = 200),
      (s = -1),
      (r = !1),
      function () {
        clearTimeout(s),
          (s = setTimeout(a, n)),
          r ||
            (a.call(),
            (r = !0),
            setTimeout(function () {
              r = !1;
            }, n));
      })
    ),
    (theme.cartNoteMonitor = {
      load: function (t) {
        t.on(
          "change.themeCartNoteMonitor paste.themeCartNoteMonitor keyup.themeCartNoteMonitor",
          function () {
            theme.cartNoteMonitor.postUpdate(e(this).val());
          }
        );
      },
      unload: function (e) {
        e.off(".themeCartNoteMonitor");
      },
      updateThrottleTimeoutId: -1,
      updateThrottleInterval: 500,
      postUpdate: function (t) {
        clearTimeout(theme.cartNoteMonitor.updateThrottleTimeoutId),
          (theme.cartNoteMonitor.updateThrottleTimeoutId = setTimeout(
            function () {
              e.post(
                theme.routes.cart_url + "/update.js",
                { note: t },
                function (e) {},
                "json"
              );
            },
            theme.cartNoteMonitor.updateThrottleInterval
          ));
      },
    }),
    (theme.debounce = function (e) {
      var t,
        i =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 700,
        o = arguments.length > 2 ? arguments[2] : void 0;
      return function () {
        var a = this,
          n = arguments,
          s = function () {
            (t = null), o || e.apply(a, n);
          },
          r = o && !t;
        clearTimeout(t), (t = setTimeout(s, i)), r && e.apply(a, n);
      };
    }),
    new (class extends o {
      init(t) {
        super.init(t);
        var i = e(t);
        function o() {
          var e = new CustomEvent("cc-tab-changed");
          window.dispatchEvent(e);
        }
        i.on("click", "[data-cc-toggle-panel]", function () {
          var t = e(this).closest(".cc-tabs"),
            i = e(this).data("cc-toggle-panel"),
            a = t.find(".cc-tabs__tab__panel:visible"),
            n = t.find(
              '.cc-tabs__tab .cc-tabs__tab__panel[aria-labelledby="product-tab-panel'.concat(
                i,
                '"]'
              )
            ),
            s = e(this).closest(
              '.cc-tabs[data-cc-tab-allow-multi-open="true"]'
            ).length;
          if (t.hasClass("cc-tabs--tab-mode"))
            a.attr("hidden", ""),
              n.removeAttr("hidden"),
              t
                .find('[role="tab"] [aria-selected="true"]')
                .removeAttr("aria-selected"),
              t
                .find('[data-cc-toggle-panel="'.concat(i, '"]'))
                .attr("aria-selected", "true");
          else {
            if (s)
              if (n.is(":visible")) {
                (r = !0), (l = !1);
                a = n;
              } else (r = !1), (l = !0);
            else
              var r = a.length,
                l = n.attr("id") !== a.attr("id") && n.length;
            e(window).outerWidth() < 768 &&
              (n.is(":visible") ? ((r = !0), (l = !1), (a = n)) : (r = !1)),
              r &&
                (a.slideUp(300, function () {
                  e(this).attr("hidden", ""), l || o();
                }),
                a.prev().removeAttr("aria-selected")),
              l &&
                (n
                  .css("display", "none")
                  .removeAttr("hidden")
                  .slideDown(300, o),
                n.prev().attr("aria-selected", "true"));
          }
          return !1;
        }),
          i.hasClass("cc-tabs--tab-mode") &&
            i.find(".cc-tabs__tab-headers").ccHoverLine();
      }
      destroy(t) {
        super.destroy(t), e(t).off("click", "[data-cc-toggle-panel]");
      }
    })("tabs"),
    (() => {
      (theme.initAnimateOnScroll = function () {
        if (
          document.body.classList.contains("cc-animate-enabled") &&
          window.innerWidth >= 768
        ) {
          var e =
            void 0 !== document.body.dataset.ccAnimateTimeout
              ? document.body.dataset.ccAnimateTimeout
              : 200;
          if ("IntersectionObserver" in window) {
            var t = new IntersectionObserver((t, i) => {
              t.forEach((t) => {
                t.isIntersecting &&
                  !t.target.classList.contains("cc-animate-complete") &&
                  (setTimeout(() => {
                    t.target.classList.add("-in", "cc-animate-complete");
                  }, e),
                  setTimeout(() => {
                    t.target.classList.remove("data-cc-animate"),
                      (t.target.style.transitionDuration = null),
                      (t.target.style.transitionDelay = null);
                  }, 5e3),
                  i.unobserve(t.target));
              });
            });
            document
              .querySelectorAll("[data-cc-animate]:not(.cc-animate-init)")
              .forEach((e) => {
                e.dataset.ccAnimateDelay &&
                  (e.style.transitionDelay = e.dataset.ccAnimateDelay),
                  e.dataset.ccAnimateDuration &&
                    (e.style.transitionDuration = e.dataset.ccAnimateDuration),
                  e.dataset.ccAnimate && e.classList.add(e.dataset.ccAnimate),
                  e.classList.add("cc-animate-init"),
                  t.observe(e);
              });
          } else
            for (
              var i = document.querySelectorAll(
                  "[data-cc-animate]:not(.cc-animate-init)"
                ),
                o = 0;
              o < i.length;
              o++
            )
              i[o].classList.add("-in", "cc-animate-complete");
        }
      }),
        theme.initAnimateOnScroll(),
        document.addEventListener("shopify:section:load", () => {
          setTimeout(theme.initAnimateOnScroll, 100);
        });
      try {
        window
          .matchMedia("(min-width: 768px)")
          .addEventListener("change", (e) => {
            e.matches && setTimeout(theme.initAnimateOnScroll, 100);
          });
      } catch (e) {}
    })();
  class c {
    constructor(e, t) {
      (this.$container = e),
        (this.namespace = t),
        (this.cssClasses = {
          visible: "cc-popup--visible",
          bodyNoScroll: "cc-popup-no-scroll",
          bodyNoScrollPadRight: "cc-popup-no-scroll-pad-right",
        });
    }
    open(t) {
      if (this.$container.data("freeze-scroll")) {
        e("body").addClass(this.cssClasses.bodyNoScroll);
        var i = document.createElement("div");
        (i.className = "popup-scrollbar-measure"), document.body.appendChild(i);
        var o = i.getBoundingClientRect().width - i.clientWidth;
        document.body.removeChild(i),
          o > 0 &&
            e("body")
              .css("padding-right", o + "px")
              .addClass(this.cssClasses.bodyNoScrollPadRight);
      }
      this.$container.addClass(this.cssClasses.visible),
        (this.previouslyActiveElement = document.activeElement),
        setTimeout(() => {
          this.$container.find(".cc-popup-close")[0].focus();
        }, 500),
        e(window).on("keydown" + this.namespace, (e) => {
          27 === e.keyCode && this.close();
        }),
        t && t();
    }
    close(t) {
      if (
        (this.$container.removeClass(this.cssClasses.visible),
        this.previouslyActiveElement && e(this.previouslyActiveElement).focus(),
        e(window).off("keydown" + this.namespace),
        this.$container.data("freeze-scroll"))
      ) {
        var i = 500,
          o = this.$container.find(".cc-popup-modal");
        o.length &&
          (i = parseFloat(getComputedStyle(o[0]).transitionDuration)) &&
          i > 0 &&
          (i *= 1e3),
          setTimeout(() => {
            e("body")
              .removeClass(this.cssClasses.bodyNoScroll)
              .removeClass(this.cssClasses.bodyNoScrollPadRight)
              .css("padding-right", "0");
          }, i);
      }
      t && t();
    }
  }
  class d {
    constructor(e) {
      (this.container = e),
        (this.selectors = {
          inputMin: ".cc-price-range__input--min",
          inputMax: ".cc-price-range__input--max",
          control: ".cc-price-range__control",
          controlMin: ".cc-price-range__control--min",
          controlMax: ".cc-price-range__control--max",
          bar: ".cc-price-range__bar",
          activeBar: ".cc-price-range__bar-active",
        }),
        (this.controls = {
          min: {
            barControl: e.querySelector(this.selectors.controlMin),
            input: e.querySelector(this.selectors.inputMin),
          },
          max: {
            barControl: e.querySelector(this.selectors.controlMax),
            input: e.querySelector(this.selectors.inputMax),
          },
        }),
        (this.controls.min.value = parseInt(
          "" === this.controls.min.input.value
            ? this.controls.min.input.placeholder
            : this.controls.min.input.value
        )),
        (this.controls.max.value = parseInt(
          "" === this.controls.max.input.value
            ? this.controls.max.input.placeholder
            : this.controls.max.input.value
        )),
        (this.valueMin = this.controls.min.input.min),
        (this.valueMax = this.controls.min.input.max),
        (this.valueRange = this.valueMax - this.valueMin),
        [this.controls.min, this.controls.max].forEach((e) => {
          e.barControl.setAttribute("aria-valuemin", this.valueMin),
            e.barControl.setAttribute("aria-valuemax", this.valueMax),
            e.barControl.setAttribute("tabindex", 0);
        }),
        this.controls.min.barControl.setAttribute(
          "aria-valuenow",
          this.controls.min.value
        ),
        this.controls.max.barControl.setAttribute(
          "aria-valuenow",
          this.controls.max.value
        ),
        (this.bar = e.querySelector(this.selectors.bar)),
        (this.activeBar = e.querySelector(this.selectors.activeBar)),
        (this.inDrag = !1),
        this.bindEvents(),
        this.render();
    }
    getPxToValueRatio() {
      return this.bar.clientWidth / (this.valueMax - this.valueMin);
    }
    getPcToValueRatio() {
      return 100 / (this.valueMax - this.valueMin);
    }
    setActiveControlValue(e) {
      isNaN(parseInt(e)) ||
        (this.activeControl === this.controls.min
          ? ("" === e && (e = this.valueMin),
            (e = Math.max(this.valueMin, e)),
            (e = Math.min(e, this.controls.max.value)))
          : ("" === e && (e = this.valueMax),
            (e = Math.min(this.valueMax, e)),
            (e = Math.max(e, this.controls.min.value))),
        (this.activeControl.value = Math.round(e)),
        this.activeControl.input.value != this.activeControl.value &&
          (this.activeControl.value == this.activeControl.input.placeholder
            ? (this.activeControl.input.value = "")
            : (this.activeControl.input.value = this.activeControl.value),
          this.activeControl.input.dispatchEvent(
            new CustomEvent("change", {
              bubbles: !0,
              cancelable: !1,
              detail: { sender: "theme:component:price_range" },
            })
          )),
        this.activeControl.barControl.setAttribute(
          "aria-valuenow",
          this.activeControl.value
        ));
    }
    render() {
      this.drawControl(this.controls.min),
        this.drawControl(this.controls.max),
        this.drawActiveBar();
    }
    drawControl(e) {
      e.barControl.style.left =
        (e.value - this.valueMin) * this.getPcToValueRatio() + "%";
    }
    drawActiveBar() {
      (this.activeBar.style.left =
        (this.controls.min.value - this.valueMin) * this.getPcToValueRatio() +
        "%"),
        (this.activeBar.style.right =
          (this.valueMax - this.controls.max.value) * this.getPcToValueRatio() +
          "%");
    }
    handleControlTouchStart(e) {
      e.preventDefault(),
        this.startDrag(e.target, e.touches[0].clientX),
        (this.boundControlTouchMoveEvent =
          this.handleControlTouchMove.bind(this)),
        (this.boundControlTouchEndEvent =
          this.handleControlTouchEnd.bind(this)),
        window.addEventListener("touchmove", this.boundControlTouchMoveEvent),
        window.addEventListener("touchend", this.boundControlTouchEndEvent);
    }
    handleControlTouchMove(e) {
      this.moveDrag(e.touches[0].clientX);
    }
    handleControlTouchEnd(e) {
      e.preventDefault(),
        window.removeEventListener(
          "touchmove",
          this.boundControlTouchMoveEvent
        ),
        window.removeEventListener("touchend", this.boundControlTouchEndEvent),
        this.stopDrag();
    }
    handleControlMouseDown(e) {
      e.preventDefault(),
        this.startDrag(e.target, e.clientX),
        (this.boundControlMouseMoveEvent =
          this.handleControlMouseMove.bind(this)),
        (this.boundControlMouseUpEvent = this.handleControlMouseUp.bind(this)),
        window.addEventListener("mousemove", this.boundControlMouseMoveEvent),
        window.addEventListener("mouseup", this.boundControlMouseUpEvent);
    }
    handleControlMouseMove(e) {
      this.moveDrag(e.clientX);
    }
    handleControlMouseUp(e) {
      e.preventDefault(),
        window.removeEventListener(
          "mousemove",
          this.boundControlMouseMoveEvent
        ),
        window.removeEventListener("mouseup", this.boundControlMouseUpEvent),
        this.stopDrag();
    }
    startDrag(e, t) {
      this.controls.min.barControl === e
        ? (this.activeControl = this.controls.min)
        : (this.activeControl = this.controls.max),
        (this.dragStartX = t),
        (this.dragStartValue = this.activeControl.value),
        (this.inDrag = !0);
    }
    moveDrag(e) {
      if (this.inDrag) {
        var t =
          this.dragStartValue +
          (e - this.dragStartX) / this.getPxToValueRatio();
        this.setActiveControlValue(t), this.render();
      }
    }
    stopDrag() {
      this.inDrag = !1;
    }
    handleControlKeyDown(e) {
      "ArrowRight" === e.key
        ? this.incrementControlFromKeypress(e.target, 10)
        : "ArrowLeft" === e.key &&
          this.incrementControlFromKeypress(e.target, -10);
    }
    incrementControlFromKeypress(e, t) {
      this.controls.min.barControl === e
        ? (this.activeControl = this.controls.min)
        : (this.activeControl = this.controls.max),
        this.setActiveControlValue(
          this.activeControl.value + t / this.getPxToValueRatio()
        ),
        this.render();
    }
    handleInputChange(e) {
      (e.target.value = e.target.value.replace(/\D/g, "")),
        (e.detail && "theme:component:price_range" == e.detail.sender) ||
          (this.controls.min.input === e.target
            ? (this.activeControl = this.controls.min)
            : (this.activeControl = this.controls.max),
          this.setActiveControlValue(e.target.value),
          this.render());
    }
    handleInputKeyup(e) {
      setTimeout(
        function () {
          this.value = this.value.replace(/\D/g, "");
        }.bind(e.target),
        10
      );
    }
    bindEvents() {
      [this.controls.min, this.controls.max].forEach((e) => {
        e.barControl.addEventListener(
          "touchstart",
          this.handleControlTouchStart.bind(this)
        ),
          e.barControl.addEventListener(
            "mousedown",
            this.handleControlMouseDown.bind(this)
          ),
          e.barControl.addEventListener(
            "keydown",
            this.handleControlKeyDown.bind(this)
          ),
          e.input.addEventListener("change", this.handleInputChange.bind(this)),
          e.input.addEventListener("keyup", this.handleInputKeyup.bind(this));
      });
    }
    destroy() {}
  }
  new (class extends o {
    constructor() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : "price-range";
      super(
        e,
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : ".cc-".concat(e)
      );
    }
    init(e) {
      super.init(e), this.registerInstance(e, new d(e));
    }
    destroy(e) {
      this.destroyInstance(e), super.destroy(e);
    }
  })();
  class h {
    constructor(e) {
      (this.accordion = e),
        (this.itemClass = ".cc-accordion-item"),
        (this.titleClass = ".cc-accordion-item__title"),
        (this.panelClass = ".cc-accordion-item__panel"),
        (this.allowMultiOpen =
          "true" === this.accordion.dataset.allowMultiOpen),
        this.allowMultiOpen ||
          (this.activeItem = this.accordion.querySelector(
            "".concat(this.itemClass, "[open]")
          )),
        this.bindEvents();
    }
    static addPanelHeight(e) {
      e.style.height = "".concat(e.scrollHeight, "px");
    }
    static removePanelHeight(e) {
      e.getAttribute("style"), e.removeAttribute("style");
    }
    open(e, t) {
      if (
        ((t.style.height = "0"),
        (e.open = !0),
        h.addPanelHeight(t),
        setTimeout(() => {
          e.classList.add("is-open");
        }, 10),
        !this.allowMultiOpen)
      ) {
        if (this.activeItem && this.activeItem !== e) {
          var i = this.activeItem.querySelector(this.panelClass);
          this.close(this.activeItem, i);
        }
        this.activeItem = e;
      }
    }
    close(e, t) {
      h.addPanelHeight(t),
        e.classList.remove("is-open"),
        e.classList.add("is-closing"),
        this.activeItem === e && (this.activeItem = null),
        setTimeout(() => {
          t.style.height = "0";
        }, 10);
    }
    handleClick(e) {
      var t = e.target.closest(this.titleClass);
      if (t) {
        e.preventDefault();
        var i = t.parentNode,
          o = t.nextElementSibling;
        i.open ? this.close(i, o) : this.open(i, o);
      }
    }
    handleTransition(e) {
      if (e.target.matches(this.panelClass)) {
        var t = e.target,
          i = t.parentNode;
        i.classList.contains("is-closing") &&
          (i.classList.remove("is-closing"), (i.open = !1)),
          h.removePanelHeight(t);
      }
    }
    bindEvents() {
      (this.clickHandler = this.handleClick.bind(this)),
        (this.transitionHandler = this.handleTransition.bind(this)),
        this.accordion.addEventListener("click", this.clickHandler),
        this.accordion.addEventListener(
          "transitionend",
          this.transitionHandler
        );
    }
    destroy() {
      this.accordion.removeEventListener("click", this.clickHandler),
        this.accordion.removeEventListener(
          "transitionend",
          this.transitionHandler
        );
    }
  }
  new (class extends o {
    constructor() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : "accordion";
      super(
        e,
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : ".cc-".concat(e)
      );
    }
    init(e) {
      super.init(e), this.registerInstance(e, new h(e));
    }
    destroy(e) {
      this.destroyInstance(e), super.destroy(e);
    }
  })();
  class u {
    constructor(e) {
      e
        ? window.innerWidth >= 768 &&
          ((this.container = e),
          (this.currentTop = parseInt(getComputedStyle(this.container).top)),
          (this.defaultTop = this.currentTop),
          (this.scrollY = window.scrollY),
          this.bindEvents())
        : console.warn(
            "StickyScrollDirection component: No container provided"
          );
    }
    bindEvents() {
      (this.scrollListener = this.handleScroll.bind(this)),
        window.addEventListener("scroll", this.scrollListener),
        void 0 !== this.container.dataset.ccStickyScrollTop &&
          ((this.observer = new MutationObserver((e) => {
            for (var t of e)
              "data-cc-sticky-scroll-top" === t.attributeName &&
                (this.defaultTop = parseInt(
                  t.target.dataset.ccStickyScrollTop
                ));
          })),
          this.observer.observe(this.container, { attributes: !0 }));
    }
    handleScroll() {
      var e =
          this.container.getBoundingClientRect().top +
          window.scrollY -
          this.container.offsetTop +
          this.defaultTop,
        t = this.container.clientHeight - window.innerHeight;
      window.scrollY < this.scrollY
        ? (this.currentTop -= window.scrollY - this.scrollY)
        : (this.currentTop += this.scrollY - window.scrollY),
        (this.currentTop = Math.min(
          Math.max(this.currentTop, -t),
          e,
          this.defaultTop
        )),
        (this.scrollY = window.scrollY),
        (this.container.style.top = this.currentTop + "px");
    }
    destroy() {
      window.removeEventListener("scroll", this.scrollListener),
        this.observer && this.observer.disconnect();
    }
  }
  new (class extends o {
    constructor() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : "sticky-scroll-direction";
      super(
        e,
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : ".cc-".concat(e)
      );
    }
    init(e) {
      super.init(e), this.registerInstance(e, new u(e));
    }
    destroy(e) {
      this.destroyInstance(e), super.destroy(e);
    }
  })(),
    (theme.VideoManager = new (function () {
      var t = this;
      (t._permitPlayback = function (t) {
        return !(
          e(t).hasClass("video-container--background") &&
          e(window).outerWidth() < 768
        );
      }),
        (t.youtubeVars = {
          incrementor: 0,
          apiReady: !1,
          videoData: {},
          toProcessSelector:
            '.video-container[data-video-type="youtube"]:not(.video--init)',
        }),
        (t.youtubeApiReady = function () {
          (t.youtubeVars.apiReady = !0), t._loadYoutubeVideos();
        }),
        (t._loadYoutubeVideos = function (i) {
          e(t.youtubeVars.toProcessSelector, i).length &&
            (t.youtubeVars.apiReady
              ? e(t.youtubeVars.toProcessSelector, i).each(function () {
                  if (t._permitPlayback(e(this))) {
                    e(this).addClass("video--init"),
                      t.youtubeVars.incrementor++;
                    var i = "theme-yt-video-" + t.youtubeVars.incrementor;
                    e(this).data("video-container-id", i);
                    var o = e('<div class="video-container__video-element">')
                        .attr("id", i)
                        .appendTo(e(".video-container__video", this)),
                      a = e(this).data("video-autoplay"),
                      n = e(this).data("video-loop"),
                      s = new YT.Player(i, {
                        height: "360",
                        width: "640",
                        videoId: e(this).data("video-id"),
                        playerVars: {
                          iv_load_policy: 3,
                          modestbranding: 1,
                          autoplay: 0,
                          loop: n ? 1 : 0,
                          playlist: e(this).data("video-id"),
                          rel: 0,
                          showinfo: 0,
                        },
                        events: {
                          onReady: t._onYoutubePlayerReady.bind({
                            autoplay: a,
                            loop: n,
                            $container: e(this),
                          }),
                          onStateChange: t._onYoutubePlayerStateChange.bind({
                            autoplay: a,
                            loop: n,
                            $container: e(this),
                          }),
                        },
                      });
                    t.youtubeVars.videoData[i] = {
                      id: i,
                      container: this,
                      videoElement: o,
                      player: s,
                    };
                  }
                })
              : theme.loadScriptOnce("https://www.youtube.com/iframe_api"));
        }),
        (t._onYoutubePlayerReady = function (e) {
          e.target.setPlaybackQuality("hd1080"),
            this.autoplay && (e.target.mute(), e.target.playVideo()),
            t._initBackgroundVideo(this.$container);
        }),
        (t._onYoutubePlayerStateChange = function (e) {
          if (
            e.data == YT.PlayerState.PLAYING &&
            (this.$container.addClass("video--play-started"),
            this.autoplay && e.target.mute(),
            this.loop)
          ) {
            var t = e.target.getDuration() - 1;
            if (t > 2) {
              !(function i() {
                e.target.getCurrentTime() > t && e.target.seekTo(0),
                  setTimeout(i, 250);
              })();
            }
          }
        }),
        (t._unloadYoutubeVideos = function (i) {
          for (var o in t.youtubeVars.videoData) {
            var a = t.youtubeVars.videoData[o];
            if (e(i).find(a.container).length)
              return a.player.destroy(), void delete t.youtubeVars.videoData[o];
          }
        }),
        (t.vimeoVars = {
          incrementor: 0,
          apiReady: !1,
          videoData: {},
          toProcessSelector:
            '.video-container[data-video-type="vimeo"]:not(.video--init)',
        }),
        (t.vimeoApiReady = function () {
          (t.vimeoVars.apiReady = !0), t._loadVimeoVideos();
        }),
        (t._loadVimeoVideos = function (i) {
          e(t.vimeoVars.toProcessSelector, i).length &&
            (t.vimeoVars.apiReady
              ? e(t.vimeoVars.toProcessSelector, i).each(function () {
                  if (t._permitPlayback(e(this))) {
                    e(this).addClass("video--init"), t.vimeoVars.incrementor++;
                    var i = e(this),
                      o = "theme-vi-video-" + t.vimeoVars.incrementor;
                    e(this).data("video-container-id", o);
                    var a = e('<div class="video-container__video-element">')
                        .attr("id", o)
                        .appendTo(e(".video-container__video", this)),
                      n = !!e(this).data("video-autoplay"),
                      s = new Vimeo.Player(o, {
                        url: e(this).data("video-url"),
                        width: 640,
                        loop: e(this).data("video-autoplay"),
                        autoplay: n,
                        muted: i.hasClass("video-container--background") || n,
                      });
                    s.on(
                      "playing",
                      function () {
                        e(this).addClass("video--play-started");
                      }.bind(this)
                    ),
                      s.ready().then(function () {
                        if (
                          (n && (s.setVolume(0), s.play()),
                          s.element && s.element.width && s.element.height)
                        ) {
                          var e =
                            parseInt(s.element.height) /
                            parseInt(s.element.width);
                          i.find(".video-container__video").css(
                            "padding-bottom",
                            100 * e + "%"
                          );
                        }
                        t._initBackgroundVideo(i);
                      }),
                      (t.vimeoVars.videoData[o] = {
                        id: o,
                        container: this,
                        videoElement: a,
                        player: s,
                        autoPlay: n,
                      });
                  }
                })
              : window.define
              ? theme.loadScriptOnce(
                  "https://player.vimeo.com/api/player.js",
                  function () {
                    (t.vimeoVars.apiReady = !0),
                      t._loadVimeoVideos(),
                      (window.define = window.tempDefine);
                  },
                  function () {
                    (window.tempDefine = window.define), (window.define = null);
                  }
                )
              : theme.loadScriptOnce(
                  "https://player.vimeo.com/api/player.js",
                  function () {
                    (t.vimeoVars.apiReady = !0), t._loadVimeoVideos();
                  }
                ));
        }),
        (t._unloadVimeoVideos = function (i) {
          for (var o in t.vimeoVars.videoData) {
            var a = t.vimeoVars.videoData[o];
            if (e(i).find(a.container).length)
              return a.player.unload(), void delete t.vimeoVars.videoData[o];
          }
        }),
        (t._loadThirdPartyApis = function (i) {
          t._permitPlayback(e(".video-container", i)) &&
            (t._loadYoutubeVideos(i), t._loadVimeoVideos(i));
        }),
        (t.mp4Vars = {
          incrementor: 0,
          videoData: {},
          toProcessSelector:
            '.video-container[data-video-type="mp4"]:not(.video--init)',
        }),
        (t._loadMp4Videos = function (i) {
          e(t.mp4Vars.toProcessSelector, i).length &&
            e(t.mp4Vars.toProcessSelector, i)
              .addClass("video--init")
              .each(function () {
                t.mp4Vars.incrementor++;
                e(this);
                var i = "theme-mp-video-" + t.mp4Vars.incrementor;
                e(this).data("video-container-id", i);
                var o = e('<div class="video-container__video-element">')
                    .attr("id", i)
                    .appendTo(e(".video-container__video", this)),
                  a = e("<video playsinline>");
                e(this).data("video-loop") && a.attr("loop", "loop"),
                  e(this).hasClass("video-container--background") ||
                    a.attr("controls", "controls"),
                  e(this).data("video-autoplay") &&
                    (a.attr({ autoplay: "autoplay", muted: "muted" }),
                    (a[0].muted = !0),
                    a.one("loadeddata", function () {
                      this.play();
                    })),
                  a.on(
                    "playing",
                    function () {
                      e(this).addClass("video--play-started");
                    }.bind(this)
                  ),
                  a.attr("src", e(this).data("video-url")).appendTo(o),
                  (t.mp4Vars.videoData[i] = { element: a[0] });
              });
        }),
        (t._unloadMp4Videos = function (e) {}),
        (t._initBackgroundVideo = function (t) {
          if (
            t.hasClass("video-container--background") &&
            t.find(".video-container__video iframe").length
          ) {
            function i() {
              var t = e(".video-container__media", this),
                i = t.length ? t : this,
                o = i.width(),
                a = i.height(),
                n = o / a,
                s = e(".video-container__video iframe", this),
                r = s.attr("width") / s.attr("height"),
                l = e(".video-container__video", this),
                c = 75;
              if (n > r) {
                var d = o / r + 150;
                l.css({
                  marginTop: (a - d) / 2 - c,
                  marginLeft: "",
                  height: d + 150,
                  width: "",
                });
              } else {
                var h = o * r + 150 * r;
                l.css({
                  marginTop: -75,
                  marginLeft: (o - h) / 2,
                  height: a + 150,
                  width: h,
                });
              }
            }
            i.bind(t)(),
              e(window).on(
                "debouncedresize." + t.data("video-container-id"),
                i.bind(t)
              );
          }
        }),
        (this.onSectionLoad = function (i) {
          e(".video-container[data-video-url]:not([data-video-type])").each(
            function () {
              var t = e(this).data("video-url");
              t.indexOf(".mp4") > -1 && e(this).attr("data-video-type", "mp4"),
                t.indexOf("vimeo.com") > -1 &&
                  (e(this).attr("data-video-type", "vimeo"),
                  e(this).attr(
                    "data-video-id",
                    t.split("?")[0].split("/").pop()
                  )),
                (t.indexOf("youtu.be") > -1 || t.indexOf("youtube.com") > -1) &&
                  (e(this).attr("data-video-type", "youtube"),
                  t.indexOf("v=") > -1
                    ? e(this).attr(
                        "data-video-id",
                        t.split("v=").pop().split("&")[0]
                      )
                    : e(this).attr(
                        "data-video-id",
                        t.split("?")[0].split("/").pop()
                      ));
            }
          ),
            t._loadThirdPartyApis(i),
            t._loadMp4Videos(i),
            e(window).on("debouncedresize.video-manager-resize", function () {
              t._loadThirdPartyApis(i);
            }),
            e(".video-container__play", i).on("click", function (o) {
              o.preventDefault();
              var a = e(this).closest(".video-container");
              a.addClass("video-container--playing"),
                e(i).trigger("cc:video:play");
              var n = a.data("video-container-id");
              0 === n.indexOf("theme-yt-video")
                ? t.youtubeVars.videoData[n].player.playVideo()
                : 0 === n.indexOf("theme-vi-video")
                ? t.vimeoVars.videoData[n].player.play()
                : 0 === n.indexOf("theme-mp-video") &&
                  t.mp4Vars.videoData[n].element.play();
            }),
            e(".video-container__stop", i).on("click", function (o) {
              o.preventDefault();
              var a = e(this).closest(".video-container");
              a.removeClass("video-container--playing"),
                e(i).trigger("cc:video:stop");
              var n = a.data("video-container-id");
              0 === n.indexOf("theme-yt-video")
                ? t.youtubeVars.videoData[n].player.stopVideo()
                : (t.vimeoVars.videoData[n].player.pause(),
                  t.vimeoVars.videoData[n].player.setCurrentTime(0));
            });
        }),
        (this.onSectionUnload = function (i) {
          e(".video-container__play, .video-container__stop", i).off("click"),
            e(window).off(
              "." + e(".video-container").data("video-container-id")
            ),
            e(window).off("debouncedresize.video-manager-resize"),
            t._unloadYoutubeVideos(i),
            t._unloadVimeoVideos(i),
            t._unloadMp4Videos(i),
            e(i).trigger("cc:video:stop");
        });
    })()),
    (window.onYouTubeIframeAPIReady = function () {
      theme.VideoManager.youtubeApiReady();
    }),
    t.sections.push({ name: "video", section: theme.VideoManager }),
    (theme.MapSection = new (function () {
      var t = this;
      (t.config = {
        zoom: 14,
        styles: {
          default: [],
          silver: [
            { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#616161" }],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#f5f5f5" }],
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels.text.fill",
              stylers: [{ color: "#bdbdbd" }],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#eeeeee" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#757575" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#e5e5e5" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }],
            },
            {
              featureType: "road.arterial",
              elementType: "labels.text.fill",
              stylers: [{ color: "#757575" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#dadada" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#616161" }],
            },
            {
              featureType: "road.local",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }],
            },
            {
              featureType: "transit.line",
              elementType: "geometry",
              stylers: [{ color: "#e5e5e5" }],
            },
            {
              featureType: "transit.station",
              elementType: "geometry",
              stylers: [{ color: "#eeeeee" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#c9c9c9" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }],
            },
          ],
          retro: [
            { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#523735" }],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#f5f1e6" }],
            },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [{ color: "#c9b2a6" }],
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "geometry.stroke",
              stylers: [{ color: "#dcd2be" }],
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels.text.fill",
              stylers: [{ color: "#ae9e90" }],
            },
            {
              featureType: "landscape.natural",
              elementType: "geometry",
              stylers: [{ color: "#dfd2ae" }],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#dfd2ae" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#93817c" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry.fill",
              stylers: [{ color: "#a5b076" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#447530" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#f5f1e6" }],
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [{ color: "#fdfcf8" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#f8c967" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#e9bc62" }],
            },
            {
              featureType: "road.highway.controlled_access",
              elementType: "geometry",
              stylers: [{ color: "#e98d58" }],
            },
            {
              featureType: "road.highway.controlled_access",
              elementType: "geometry.stroke",
              stylers: [{ color: "#db8555" }],
            },
            {
              featureType: "road.local",
              elementType: "labels.text.fill",
              stylers: [{ color: "#806b63" }],
            },
            {
              featureType: "transit.line",
              elementType: "geometry",
              stylers: [{ color: "#dfd2ae" }],
            },
            {
              featureType: "transit.line",
              elementType: "labels.text.fill",
              stylers: [{ color: "#8f7d77" }],
            },
            {
              featureType: "transit.line",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#ebe3cd" }],
            },
            {
              featureType: "transit.station",
              elementType: "geometry",
              stylers: [{ color: "#dfd2ae" }],
            },
            {
              featureType: "water",
              elementType: "geometry.fill",
              stylers: [{ color: "#b9d3c2" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#92998d" }],
            },
          ],
          dark: [
            { elementType: "geometry", stylers: [{ color: "#212121" }] },
            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#757575" }],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#212121" }],
            },
            {
              featureType: "administrative",
              elementType: "geometry",
              stylers: [{ color: "#757575" }],
            },
            {
              featureType: "administrative.country",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }],
            },
            {
              featureType: "administrative.land_parcel",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#bdbdbd" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#757575" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#181818" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#616161" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#1b1b1b" }],
            },
            {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: [{ color: "#2c2c2c" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#8a8a8a" }],
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [{ color: "#373737" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#3c3c3c" }],
            },
            {
              featureType: "road.highway.controlled_access",
              elementType: "geometry",
              stylers: [{ color: "#4e4e4e" }],
            },
            {
              featureType: "road.local",
              elementType: "labels.text.fill",
              stylers: [{ color: "#616161" }],
            },
            {
              featureType: "transit",
              elementType: "labels.text.fill",
              stylers: [{ color: "#757575" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#000000" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#3d3d3d" }],
            },
          ],
          night: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#746855" }],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#242f3e" }],
            },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
          ],
          aubergine: [
            { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#8ec3b9" }],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#1a3646" }],
            },
            {
              featureType: "administrative.country",
              elementType: "geometry.stroke",
              stylers: [{ color: "#4b6878" }],
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels.text.fill",
              stylers: [{ color: "#64779e" }],
            },
            {
              featureType: "administrative.province",
              elementType: "geometry.stroke",
              stylers: [{ color: "#4b6878" }],
            },
            {
              featureType: "landscape.man_made",
              elementType: "geometry.stroke",
              stylers: [{ color: "#334e87" }],
            },
            {
              featureType: "landscape.natural",
              elementType: "geometry",
              stylers: [{ color: "#023e58" }],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#283d6a" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6f9ba5" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#1d2c4d" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry.fill",
              stylers: [{ color: "#023e58" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#3C7680" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#304a7d" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#98a5be" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#1d2c4d" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#2c6675" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#255763" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#b0d5ce" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#023e58" }],
            },
            {
              featureType: "transit",
              elementType: "labels.text.fill",
              stylers: [{ color: "#98a5be" }],
            },
            {
              featureType: "transit",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#1d2c4d" }],
            },
            {
              featureType: "transit.line",
              elementType: "geometry.fill",
              stylers: [{ color: "#283d6a" }],
            },
            {
              featureType: "transit.station",
              elementType: "geometry",
              stylers: [{ color: "#3a4762" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#0e1626" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#4e6d70" }],
            },
          ],
        },
      }),
        (t.apiStatus = null),
        (this.geolocate = function (t) {
          var i = e.Deferred(),
            o = new google.maps.Geocoder(),
            a = t.data("address-setting");
          return (
            o.geocode({ address: a }, function (e, t) {
              t !== google.maps.GeocoderStatus.OK && i.reject(t), i.resolve(e);
            }),
            i
          );
        }),
        (this.createMap = function (i) {
          var o = e(".map-section__map-container", i);
          return t
            .geolocate(o)
            .then(
              function (a) {
                var n = {
                  zoom: t.config.zoom,
                  styles: t.config.styles[e(i).data("map-style")],
                  center: a[0].geometry.location,
                  scrollwheel: !1,
                  disableDoubleClickZoom: !1,
                  disableDefaultUI: !0,
                  zoomControl: !0,
                };
                (t.map = new google.maps.Map(o[0], n)),
                  (t.center = t.map.getCenter());
                new google.maps.Marker({
                  map: t.map,
                  position: t.center,
                  clickable: !1,
                });
                google.maps.event.addDomListener(window, "resize", function () {
                  google.maps.event.trigger(t.map, "resize"),
                    t.map.setCenter(t.center);
                });
              }.bind(this)
            )
            .fail(function () {
              var e;
              switch (status) {
                case "ZERO_RESULTS":
                  e = theme.strings.addressNoResults;
                  break;
                case "OVER_QUERY_LIMIT":
                  e = theme.strings.addressQueryLimit;
                  break;
                default:
                  e = theme.strings.addressError;
              }
              if (Shopify.designMode) {
                var t = o.parents(".map-section");
                t.addClass("page-width map-section--load-error"),
                  t
                    .find(".map-section__wrapper")
                    .html('<div class="errors text-center">' + e + "</div>");
              }
            });
        }),
        (this.onSectionLoad = function (i) {
          var o = e(i);
          window.gm_authFailure = function () {
            Shopify.designMode &&
              (o.addClass("page-width map-section--load-error"),
              o
                .find(".map-section__wrapper")
                .html(
                  '<div class="errors text-center">' +
                    theme.strings.authError +
                    "</div>"
                ));
          };
          var a = o.data("api-key");
          "string" == typeof a &&
            "" !== a &&
            theme.loadScriptOnce(
              "https://maps.googleapis.com/maps/api/js?key=" + a,
              function () {
                t.createMap(o);
              }
            );
        }),
        (this.onSectionUnload = function (e) {
          void 0 !== window.google &&
            void 0 !== google.maps &&
            google.maps.event.clearListeners(t.map, "resize");
        });
    })()),
    t.sections.push({ name: "map", section: theme.MapSection }),
    (theme.Popup = new (function () {
      var t = "cc-theme-popup-dismissed";
      (this.onSectionLoad = function (i) {
        (this.namespace = theme.namespaceFromSection(i)),
          (this.$container = e(i)),
          (this.popup = new c(this.$container, this.namespace));
        var o = this.$container.data("dismiss-for-days"),
          a = this.$container.data("delay-seconds"),
          n = !0,
          s = this.$container.data("test-mode"),
          r = window.localStorage.getItem(t);
        r && (new Date().getTime() - r) / 864e5 < o && (n = !1);
        this.$container.find(".cc-popup-form__response").length &&
          ((n = !0),
          (a = 1),
          this.$container.find(".cc-popup-form__response--success").length &&
            this.functions.popupSetAsDismissed.call(this)),
          document.querySelector(".shopify-challenge__container") && (n = !1),
          (n || s) &&
            setTimeout(() => {
              this.popup.open();
            }, 1e3 * a),
          this.$container.on(
            "click" + this.namespace,
            ".cc-popup-close, .cc-popup-background",
            () => {
              this.popup.close(() => {
                this.functions.popupSetAsDismissed.call(this);
              });
            }
          );
      }),
        (this.onSectionSelect = function () {
          this.popup.open();
        }),
        (this.functions = {
          popupSetAsDismissed: function () {
            window.localStorage.setItem(t, new Date().getTime());
          },
        }),
        (this.onSectionUnload = function () {
          this.$container.off(this.namespace);
        });
    })()),
    t.sections.push({ name: "newsletter-popup", section: theme.Popup }),
    (theme.StoreAvailability = function (t) {
      var i = "store-availability-loading",
        o = "cc-location";
      (this.onSectionLoad = function (t) {
        (this.namespace = theme.namespaceFromSection(t)),
          (this.$container = e(t)),
          (this.productId = this.$container.data(
            "store-availability-container"
          )),
          (this.sectionUrl = this.$container.data("section-url")),
          this.$modal,
          this.$container.addClass("store-availability-initialized"),
          (this.transitionDurationMS =
            1e3 * parseFloat(getComputedStyle(t).transitionDuration)),
          (this.removeFixedHeightTimeout = -1),
          e(window).on(
            "cc-variant-updated".concat(this.namespace).concat(this.productId),
            (e, t) => {
              t.product.id === this.productId &&
                this.functions.updateContent.bind(this)(
                  t.variant ? t.variant.id : null,
                  t.product.title,
                  this.$container.data("has-only-default-variant"),
                  t.variant && void 0 !== t.variant.available
                );
            }
          ),
          this.$container.data("single-variant-id") &&
            this.functions.updateContent.bind(this)(
              this.$container.data("single-variant-id"),
              this.$container.data("single-variant-product-title"),
              this.$container.data("has-only-default-variant"),
              this.$container.data("single-variant-product-available")
            );
      }),
        (this.onSectionUnload = function () {
          e(window).off(
            "cc-variant-updated".concat(this.namespace).concat(this.productId)
          ),
            this.$container.off("click"),
            this.$modal && this.$modal.off("click");
        }),
        (this.functions = {
          getUserLocation: function () {
            return new Promise((e, t) => {
              var i;
              sessionStorage[o] && (i = JSON.parse(sessionStorage[o])),
                i
                  ? e(i)
                  : navigator.geolocation
                  ? navigator.geolocation.getCurrentPosition(
                      function (t) {
                        var i = {
                          latitude: t.coords.latitude,
                          longitude: t.coords.longitude,
                        };
                        fetch("/localization.json", {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(i),
                        }),
                          (sessionStorage[o] = JSON.stringify(i)),
                          e(i);
                      },
                      function () {
                        e(!1);
                      },
                      { maximumAge: 36e5, timeout: 5e3 }
                    )
                  : e(!1);
            });
          },
          getAvailableStores: function (t, i) {
            return e.get(this.sectionUrl.replace("VARIANT_ID", t), i);
          },
          calculateDistance: function (e, t, i) {
            var o = Math.PI / 180,
              a = "metric" === i ? 6378.14 : 3959,
              n = e.latitude * o,
              s = e.longitude * o,
              r = t.latitude * o,
              l = s - t.longitude * o,
              c = n - r,
              d =
                Math.pow(Math.sin(c / 2), 2) +
                Math.cos(n) * Math.cos(r) * Math.pow(Math.sin(l / 2), 2);
            return a * (2 * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d)));
          },
          updateLocationDistances: function (t) {
            var i = this.$modal.find("[data-unit-system]").data("unit-system"),
              o = this;
            this.$modal.find('[data-distance="false"]').each(function () {
              var a = {
                latitude: parseFloat(e(this).data("latitude")),
                longitude: parseFloat(e(this).data("longitude")),
              };
              if (a.latitude && a.longitude) {
                var n = o.functions.calculateDistance(t, a, i).toFixed(1);
                e(this).html(n),
                  setTimeout(() => {
                    e(this)
                      .closest(".store-availability-list__location__distance")
                      .addClass("-in");
                  }, 0);
              }
              e(this).attr("data-distance", "true");
            });
          },
          updateContent: function (t, o, a, n) {
            this.$container.off(
              "click",
              "[data-store-availability-modal-open]"
            ),
              this.$container.off(
                "click" + this.namespace,
                ".cc-popup-close, .cc-popup-background"
              ),
              e(".store-availabilities-modal").remove(),
              n
                ? (this.$container.addClass(i),
                  this.transitionDurationMS > 0 &&
                    this.$container.css(
                      "height",
                      this.$container.outerHeight() + "px"
                    ))
                : (this.$container.addClass(i),
                  this.transitionDurationMS > 0 &&
                    this.$container.css("height", "0px")),
              n &&
                this.functions.getAvailableStores.call(this, t, (n) => {
                  if (n.trim().length > 0 && !n.includes("NO_PICKUP")) {
                    this.$container.html(n),
                      this.$container.html(
                        this.$container.children().first().html()
                      ),
                      this.$container
                        .find("[data-store-availability-modal-product-title]")
                        .html(o),
                      a &&
                        this.$container
                          .find(".store-availabilities-modal__variant-title")
                          .remove(),
                      this.$container.find(".cc-popup").appendTo("body"),
                      (this.$modal = e("body").find(
                        ".store-availabilities-modal"
                      ));
                    var s = new c(this.$modal, this.namespace);
                    if (
                      (this.$container.on(
                        "click",
                        "[data-store-availability-modal-open]",
                        () => (
                          s.open(),
                          this.functions.getUserLocation().then((i) => {
                            i &&
                              this.$modal.find('[data-distance="false"]')
                                .length &&
                              this.functions.getAvailableStores.call(
                                this,
                                t,
                                (t) => {
                                  this.$modal
                                    .find(".store-availabilities-list")
                                    .html(
                                      e(t)
                                        .find(".store-availabilities-list")
                                        .html()
                                    ),
                                    this.functions.updateLocationDistances.bind(
                                      this
                                    )(i);
                                }
                              );
                          }),
                          !1
                        )
                      ),
                      this.$modal.on(
                        "click" + this.namespace,
                        ".cc-popup-close, .cc-popup-background",
                        () => {
                          s.close();
                        }
                      ),
                      this.$container.removeClass(i),
                      this.transitionDurationMS > 0)
                    ) {
                      var r = this.$container
                        .find(".store-availability-container")
                        .outerHeight();
                      this.$container.css("height", r > 0 ? r + "px" : ""),
                        clearTimeout(this.removeFixedHeightTimeout),
                        (this.removeFixedHeightTimeout = setTimeout(() => {
                          this.$container.css("height", "");
                        }, this.transitionDurationMS));
                    }
                  }
                });
          },
        }),
        this.onSectionLoad(t);
    }),
    t.sections.push({
      name: "store-availability",
      section: theme.StoreAvailability,
    }),
    /\/$/.test(theme.routes.root_url) || (theme.routes.root_url += "/");
  class m {
    static set(e, t) {
      theme.device.isLocalStorageAvailable() &&
        localStorage.setItem(e, "object" == typeof t ? JSON.stringify(t) : t);
    }
    static get(e, t) {
      if (theme.device.isLocalStorageAvailable()) {
        var i = localStorage.getItem(e);
        return t && (i = JSON.parse(i)), i;
      }
    }
  }
  (theme.icons = {
    left: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
    right:
      '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>',
    close:
      '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
    chevronLightLeft:
      '<svg fill="#000000" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M 14.51,6.51 14,6 8,12 14,18 14.51,17.49 9.03,12 Z"></path></svg>',
    chevronLightRight:
      '<svg fill="#000000" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M 10,6 9.49,6.51 14.97,12 9.49,17.49 10,18 16,12 Z"></path></svg>',
    chevronDown:
      '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/><path d="M0-.75h24v24H0z" fill="none"/></svg>',
    tick: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
    add: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
    loading:
      '<svg xmlns="http://www.w3.org/2000/svg" style="margin: auto; background: transparent; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="currentColor" stroke-width="5" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(263.279 50 50)"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg>',
    chevronRight:
      '<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0-.25H24v24H0Z" transform="translate(0 0.25)" style="fill:none"></path><polyline points="10 17.83 15.4 12.43 10 7.03" style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-miterlimit:8;stroke-width:1.5px"></polyline></svg>',
    chevronLeft:
      '<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0-.25H24v24H0Z" transform="translate(0 0.25)" style="fill:none"/> <polyline points="14.4 7.03 9 12.43 14.4 17.83" style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-miterlimit:8;stroke-width:1.5px"/></svg>',
  }),
    (theme.swipers = {}),
    (theme.productData = {}),
    (theme.viewport = {
      isXs: () => e(window).outerWidth() < 768,
      isSm: () => e(window).outerWidth() >= 768,
      isMd: () => e(window).outerWidth() >= 992,
      isLg: () => e(window).outerWidth() >= 1200,
      isXlg: () => e(window).outerWidth() >= 1441,
      scroll: {
        currentScrollTop: -1,
        to: function (t) {
          var i =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : -1,
            o =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 0,
            a = arguments.length > 3 ? arguments[3] : void 0;
          if (
            (t && "string" == typeof t && (t = e(t)), -1 === i && t && t.length)
          ) {
            var n = theme.Nav().bar.isInline() ? 0 : theme.Nav().bar.height();
            i = t.offset().top - n - o;
          }
          e("html,body").animate({ scrollTop: i }, 700, () => {
            a && a();
          });
        },
        lock: () => {
          (theme.viewport.scroll.currentScrollTop = window.scrollY),
            (document.body.style.top = -window.scrollY + "px"),
            (document.body.style.width = "100%"),
            (document.body.style.position = "fixed"),
            document.body.scrollHeight > window.outerHeight &&
              (document.body.style.overflowY = "scroll");
        },
        unlock: () => {
          (document.body.style.top = null),
            (document.body.style.overflowY = null),
            (document.body.style.width = null),
            (document.body.style.position = null),
            window.scrollTo({
              top: theme.viewport.scroll.currentScrollTop,
              behavior: "instant",
            });
        },
      },
    }),
    (theme.device = {
      cache: { isTouch: null, isRetinaDisplay: null },
      isTouch: () => {
        if (null !== theme.device.cache.isTouch)
          return theme.device.cache.isTouch;
        try {
          document.createEvent("TouchEvent"), (theme.device.cache.isTouch = !0);
        } catch (e) {
          theme.device.cache.isTouch = !1;
        } finally {
          return theme.device.cache.isTouch;
        }
      },
      isRetinaDisplay() {
        if (null !== theme.device.cache.isRetinaDisplay)
          return theme.device.cache.isRetinaDisplay;
        if (window.matchMedia) {
          var e = window.matchMedia(
            "only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)"
          );
          theme.device.cache.isRetinaDisplay =
            (e && e.matches) || window.devicePixelRatio > 1;
        } else theme.device.cache.isRetinaDisplay = !1;
        return theme.device.cache.isRetinaDisplay;
      },
      isLocalStorageAvailable() {
        try {
          return (
            localStorage.setItem("a", "a"), localStorage.removeItem("a"), !0
          );
        } catch (e) {
          return !1;
        }
      },
    }),
    window.Element &&
      !Element.prototype.closest &&
      (Element.prototype.closest = function (e) {
        var t,
          i = (this.document || this.ownerDocument).querySelectorAll(e),
          o = this;
        do {
          for (t = i.length; --t >= 0 && i.item(t) !== o; );
        } while (t < 0 && (o = o.parentElement));
        return o;
      }),
    (theme.Nav = function () {
      var t =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : e("#site-control");
      return {
        bar: {
          turnOpaque: (e) => {
            e ? t.addClass("nav-opaque") : t.removeClass("nav-opaque");
          },
          hide: (e) => {
            e ? t.addClass("nav-hidden") : t.removeClass("nav-hidden");
          },
          fadeOut: (e) => {
            e ? t.addClass("nav-fade-out") : t.removeClass("nav-fade-out");
          },
          hideAnnouncement: (e) => {
            e
              ? t.addClass("announcement-hidden")
              : t.removeClass("announcement-hidden");
          },
          hasOpaqueSetting: () =>
            e("#site-control").data("opacity").includes("opaque"),
          hasStickySetting: () =>
            "sticky" === e("#site-control").data("positioning"),
          isInline: () => "inline" === e("#site-control").data("positioning"),
          hasInlineLinks: () =>
            1 === e("#site-control.nav-inline-desktop").length,
          getPositionSetting: () => e("#site-control").data("positioning"),
          getOpacitySetting: () => e("#site-control").data("opacity"),
          isCurrentlyOpaque: () => e("#site-control").hasClass("nav-opaque"),
          isAnnouncementBar: () =>
            1 === e("#site-control").find(".cc-announcement__inner").length,
          hasLocalization: () =>
            e("#site-control").hasClass("has-localization"),
          heightExcludingAnnouncementBar: () =>
            Math.round(
              e("#site-control").find(".site-control__inner").outerHeight()
            ),
          heightOfAnnouncementBar: () =>
            Math.round(e("#site-control").find(".announcement").outerHeight()),
          height: () => {
            var t = e("#site-control");
            return t.hasClass("announcement-hidden")
              ? Math.round(
                  t.find(".cc-announcement__inner").outerHeight() +
                    t.find(".site-control__inner").outerHeight()
                )
              : Math.round(t.outerHeight());
          },
        },
      };
    }),
    (theme.ProductMediaGallery = function (t, i, o, a, n) {
      var s,
        r,
        l = this,
        c = {},
        d = t.find(".view-in-space"),
        h = t.find(".swiper-container"),
        u = !1,
        p = !0,
        f = t.find(".theme-img:visible").length,
        v = "carousel" === t.data("layout"),
        g = t.closest(".product-area").hasClass("product-area--restrict-width"),
        y = t.closest(".product-area").find(".product-area__thumbs"),
        w = t.data("variant-image-grouping"),
        b = t.data("underline-selected-media"),
        S = theme.Nav();
      function T() {
        var i = theme.Nav();
        e("body").toggleClass(
          "header-over-gallery",
          e(window).scrollTop() < t.height() - i.bar.height()
        );
      }
      function _() {
        var i = t.data("column-count"),
          o = "collage" === t.data("layout");
        o &&
          t
            .find(".theme-img:visible")
            .first()
            .addClass("theme-img--collage-full");
        var a,
          n = t.find(".theme-img:visible:not(.theme-img--collage-full)"),
          s = 0;
        n.length % 2 > 0 && o && ((a = n.children().last()), (s = 1));
        var r,
          l = Math.ceil((n.length - s) / i),
          c = t.find(".theme-images"),
          d = -1;
        i > 1 &&
          n.length - s > 1 &&
          n.each(function (t) {
            (0 === s || t < n.length - s) &&
              (d < Math.floor(t / l) &&
                ((r = e('<div class="media-column"></div>').appendTo(c)), d++),
              e(this).appendTo(r));
          }),
          a &&
            a
              .parent()
              .addClass("theme-img--collage-full")
              .addClass("theme-img--collage-last")
              .appendTo(c);
      }
      function C() {
        var i = t.find(".theme-images");
        i.find(".theme-img").each(function () {
          e(this)
            .appendTo(i)
            .removeClass("theme-img--collage-full")
            .removeClass("theme-img--collage-last");
        }),
          e(window).off("debouncedresize.columnheights"),
          i.find(".media-column").remove();
      }
      (this.Image = function (e, i) {
        (this.show = function () {
          e.addClass("product-media--activated"), e.show();
        }),
          (this.play = function () {
            t
              .find(".product-media--current")
              .removeClass("product-media--current"),
              e.addClass("product-media--current");
          }),
          (this.destroy = function () {}),
          (this.pause = function () {
            e.removeClass("product-media--activated");
          }),
          (this.hide = function () {
            e.hide();
          }),
          this.show();
      }),
        (this.Video = function (i, o) {
          var a = this,
            n = {
              play: function () {},
              pause: function () {},
              destroy: function () {},
            },
            s = i.find("video")[0];
          function r() {
            l.pauseAllMedia(i.data("media-id"));
          }
          function d(e) {
            !0,
              window.innerHeight !== screen.height &&
                setTimeout(function () {
                  !0;
                }, 200);
          }
          (this.show = function () {
            i.addClass("product-media--activated"),
              i.show(),
              l.slideshowTabFix();
          }),
            (this.play = function () {
              t
                .find(".product-media--current")
                .removeClass("product-media--current"),
                i.addClass("product-media--current"),
                a.show(),
                n.play();
            }),
            (this.pause = function () {
              n.pause(), i.removeClass("product-media--activated");
            }),
            (this.hide = function () {
              n.pause(), i.hide();
            }),
            (this.destroy = function () {
              n.destroy(),
                e(s).off("playing", r),
                e(document).off("fullscreenchange", d);
            }),
            theme.loadStyleOnce(
              "https://cdn.shopify.com/shopifycloud/shopify-plyr/v1.0/shopify-plyr.css"
            ),
            window.Shopify.loadFeatures([
              {
                name: "video-ui",
                version: "1.0",
                onLoad: function () {
                  (n = {
                    playerType: "html5",
                    element: s,
                    plyr: new Shopify.Plyr(s, {
                      controls: [
                        "play",
                        "progress",
                        "mute",
                        "volume",
                        "play-large",
                        "fullscreen",
                      ],
                      loop: { active: i.data("enable-video-looping") },
                      autoplay: theme.viewport.isSm() && o,
                      hideControlsOnPause: !0,
                      iconUrl:
                        "//cdn.shopify.com/shopifycloud/shopify-plyr/v1.0/shopify-plyr.svg",
                      tooltips: { controls: !1, seek: !0 },
                    }),
                    play: function () {
                      this.plyr.play();
                    },
                    pause: function () {
                      this.plyr.pause();
                    },
                    destroy: function () {
                      this.plyr.destroy();
                    },
                  }),
                    i.addClass("product-media--video-loaded"),
                    i.find(".plyr__controls").addClass("swiper-no-swiping"),
                    (c[i.data("media-id")] = a);
                }.bind(this),
              },
            ]),
            e(s).on("playing", r),
            e(document).on("fullscreenchange", d),
            a.show();
        }),
        (this.ExternalVideo = function (i, o) {
          var a = !1,
            n = this,
            s = {
              play: function () {},
              pause: function () {},
              destroy: function () {},
            },
            r = i.find("iframe")[0];
          if (
            ((this.play = function () {
              t
                .find(".product-media--current")
                .removeClass("product-media--current"),
                i.addClass("product-media--current"),
                n.show(),
                s.play();
            }),
            (this.togglePlayPause = function () {
              a ? n.pause() : n.play();
            }),
            (this.pause = function () {
              s.pause(), i.removeClass("product-media--activated");
            }),
            (this.show = function () {
              i.addClass("product-media--activated"),
                i.show(),
                l.slideshowTabFix();
            }),
            (this.hide = function () {
              s.pause(), i.hide();
            }),
            (this.destroy = function () {
              s.destroy(),
                i.off("click", ".product-media--video-mask", n.togglePlayPause);
            }),
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(
              r.src
            ))
          ) {
            var d = function () {
              s = {
                playerType: "youtube",
                element: r,
                player: new YT.Player(r, {
                  videoId: i.data("video-id"),
                  events: {
                    onReady: function () {
                      (c[i.data("media-id")] = n),
                        i.addClass("product-media--video-loaded"),
                        o && theme.viewport.isSm() && n.play();
                    },
                    onStateChange: function (e) {
                      1 === e.data && l.pauseAllMedia(i.data("media-id")),
                        (a =
                          e.data === YT.PlayerState.PLAYING ||
                          e.data === YT.PlayerState.BUFFERING ||
                          e.data === YT.PlayerState.UNSTARTED),
                        0 === e.data &&
                          i.data("enable-video-looping") &&
                          e.target.seekTo(0);
                    },
                  },
                }),
                play: function () {
                  this.player.playVideo();
                },
                pause: function () {
                  this.player.pauseVideo();
                },
                destroy: function () {
                  this.player.destroy();
                },
              };
            };
            if (window.YT && window.YT.Player) d();
            else {
              var h = window.onYouTubeIframeAPIReady;
              (window.onYouTubeIframeAPIReady = function () {
                h(), d();
              }),
                theme.loadScriptOnce("https://www.youtube.com/iframe_api");
            }
          } else if (/vimeo\.com/.test(r.src)) {
            !(function t() {
              u
                ? (i.data("enable-video-looping") &&
                    r.setAttribute("src", r.getAttribute("src") + "&loop=1"),
                  o &&
                    e(window).width() >= 768 &&
                    r.setAttribute(
                      "src",
                      r.getAttribute("src") + "&autoplay=1&muted=1"
                    ),
                  (s = {
                    playerType: "vimeo",
                    element: r,
                    player: new Vimeo.Player(r),
                    play: function () {
                      this.player.play();
                    },
                    pause: function () {
                      this.player.pause();
                    },
                    destroy: function () {
                      this.player.destroy();
                    },
                  }).player
                    .ready()
                    .then(function () {
                      (c[i.data("media-id")] = n),
                        i.addClass("product-media--video-loaded");
                    }))
                : theme.loadScriptOnce(
                    "https://player.vimeo.com/api/player.js",
                    function () {
                      (u = !0), t();
                    }
                  );
            })();
          }
          i.on("click", ".product-media--video-mask", n.togglePlayPause),
            n.show();
        }),
        (this.Model = function (i, o) {
          var a = this,
            n = {
              play: function () {},
              pause: function () {},
              destroy: function () {},
            },
            s = i.find("model-viewer")[0];
          (this.show = function () {
            i.show(),
              i.addClass("product-media--activated"),
              l.slideshowTabFix(),
              a.updateViewInSpaceButton();
          }),
            (this.updateViewInSpaceButton = function () {
              window.ShopifyXR &&
                d.length &&
                (d.attr("data-shopify-model3d-id", i.data("media-id")),
                window.ShopifyXR.setupXRElements());
            }),
            (this.play = function () {
              t
                .find(".product-media--current")
                .removeClass("product-media--current"),
                i.addClass("product-media--current"),
                a.show(),
                n.play();
            }),
            (this.pause = function () {
              i.removeClass("product-media--activated"), n.pause();
            }),
            (this.hide = function () {
              n.pause(),
                i.hide(),
                window.ShopifyXR &&
                  d.length &&
                  (d.attr(
                    "data-shopify-model3d-id",
                    d.data("shopify-model3d-first-id")
                  ),
                  d.attr("data-shopify-title", d.data("shopify-first-title")),
                  window.ShopifyXR.setupXRElements());
            }),
            (this.destroy = function () {}),
            (this.initAugmentedReality = function () {
              if (e(".model-json", t).length) {
                window.Shopify.loadFeatures([
                  {
                    name: "shopify-xr",
                    version: "1.0",
                    onLoad: function i() {
                      window.ShopifyXR
                        ? (window.ShopifyXR.addModels(
                            JSON.parse(e(".model-json", t).html())
                          ),
                          window.ShopifyXR.setupXRElements())
                        : document.addEventListener(
                            "shopify_xr_initialized",
                            function e(t) {
                              i(), t.target.removeEventListener(t.type, e);
                            }
                          );
                    },
                  },
                ]);
              }
            }),
            theme.loadStyleOnce(
              "https://cdn.shopify.com/shopifycloud/model-viewer-ui/assets/v1.0/model-viewer-ui.css"
            ),
            window.Shopify.loadFeatures([
              {
                name: "model-viewer-ui",
                version: "1.0",
                onLoad: function () {
                  (n = new Shopify.ModelViewerUI(s)),
                    i.addClass("product-media--model-loaded"),
                    o && theme.viewport.isSm() && a.play(),
                    e('<div class="theme-event-proxy">')
                      .on("mouseup", function (e) {
                        e.stopPropagation(),
                          e.preventDefault(),
                          document.dispatchEvent(new MouseEvent("mouseup"));
                      })
                      .appendTo(
                        e(this).find(
                          ".shopify-model-viewer-ui__controls-overlay"
                        )
                      ),
                    i.find("button").attr("type", "button"),
                    i
                      .find(".shopify-model-viewer-ui")
                      .addClass("swiper-no-swiping");
                }.bind(this),
              },
            ]),
            i
              .find("model-viewer")
              .on("shopify_model_viewer_ui_toggle_play", function () {
                l.pauseAllMedia(i.data("media-id")),
                  i.addClass("product-media-model--playing"),
                  t.on(
                    "click",
                    '.product-media:not([data-media-type="model"])',
                    a.pause
                  );
              }),
            i
              .find("model-viewer")
              .on("shopify_model_viewer_ui_toggle_pause", function () {
                i.removeClass("product-media-model--playing"),
                  t.off(
                    "click",
                    '.product-media:not([data-media-type="model"])',
                    a.pause
                  );
              }),
            i.on("click", ".product-media--model-mask", function () {
              v
                ? (l.swipeToSlideIfNotCurrent(i), setTimeout(a.play, 500))
                : a.play();
            }),
            (c[i.data("media-id")] = a),
            a.show(),
            window.ShopifyXR || a.initAugmentedReality();
        }),
        (this.pauseAllMedia = function (e) {
          for (var t in c)
            !c.hasOwnProperty(t) || (e && t == e) || c[t].pause();
        }),
        (this.showMedia = function (e, i, o) {
          if (e.length) {
            s && !o && s.pause();
            var a = function (t) {
              var o;
              return (
                c.hasOwnProperty(e.data("media-id"))
                  ? ((o = c[e.data("media-id")]),
                    i && theme.viewport.isSm()
                      ? (o.show(), setTimeout(o.play, 250))
                      : o.show())
                  : (o = new t(e, i)),
                o
              );
            };
            "image" === e.data("media-type")
              ? (s = a(l.Image))
              : "video" === e.data("media-type")
              ? (s = a(l.Video))
              : "external_video" === e.data("media-type")
              ? (s = a(l.ExternalVideo))
              : "model" === e.data("media-type")
              ? (s = a(l.Model))
              : (console.warn("Media is unknown", e),
                t.find(".product-media:visible").hide(),
                e.show());
          }
        }),
        (this.swipeToSlideIfNotCurrent = function (e) {
          var t = e.closest(".swiper-slide");
          r.slideTo(t.index(), 500);
        }),
        (this.destroy = function () {
          for (var o = 0; o < c.length; o++) c[o].destroy();
          v ||
            e(window).off(
              "load.productTemplateGallery"
                .concat(n, " scroll.productTemplateGallery")
                .concat(n),
              T
            ),
            t
              .closest(".product-area")
              .off("click", ".product-area__thumbs__thumb a", x),
            t.off("click", "[data-full-size]", L),
            t.off("variantImageSelected", l.pauseAllMedia),
            e(window).off("ccScrollToMedia.productTemplateGallery".concat(n)),
            e(window).off(".".concat(n)),
            i && i.length && i.off("click"),
            z(),
            C(),
            y.length &&
              (e(".carousel-wrapper .carousel", y).off(
                "init reInit setPosition"
              ),
              e(".slick-slider", y).slick("unslick"),
              e(window).off("resize.thumbHeight"),
              e(window).off("debouncedresizewidth.thumbHeight"));
        }),
        (this.slideshowTabFix = function () {
          if (r) {
            var t = h.find(".product-media--current"),
              i = null;
            (i = t.length
              ? t.closest(".swiper-slide")
              : h.find(".swiper-slide.swiper-slide-active"))
              .find(
                "a, input, button, select, iframe, video, model-viewer, [tabindex]"
              )
              .each(function () {
                void 0 !== e(this).data("theme-slideshow-original-tabindex")
                  ? !1 === e(this).data("theme-slideshow-original-tabindex")
                    ? e(this).removeAttr("tabindex")
                    : e(this).attr(
                        "tabindex",
                        e(this).data("theme-slideshow-original-tabindex")
                      )
                  : e(this).removeAttr("tabindex");
              }),
              e(h.find(".swiper-slide"))
                .not(i)
                .find(
                  "a, input, button, select, iframe, video, model-viewer, [tabindex]"
                )
                .each(function () {
                  void 0 ===
                    e(this).data("theme-slideshow-original-tabindex") &&
                    e(this).data(
                      "theme-slideshow-original-tabindex",
                      void 0 !== e(this).attr("tabindex") &&
                        e(this).attr("tabindex")
                    ),
                    e(this).attr("tabindex", "-1");
                });
          }
        }),
        (this.scrollToMedia = function (i) {
          var o = e('[data-media-id="'.concat(i, '"]'));
          if (
            o.length &&
            (e("body").hasClass("template-product") || a) &&
            theme.viewport.isSm()
          ) {
            var n,
              s = parseInt(
                t.find(".theme-images").css("padding-top").replace("px", "")
              );
            a
              ? (n =
                  o.offset().top -
                  e(window).scrollTop() +
                  e("#quick-buy-modal").scrollTop())
              : ((n = o.offset().top - s + 1),
                ((S.bar.hasOpaqueSetting() && S.bar.hasStickySetting()) ||
                  (g && S.bar.hasStickySetting()) ||
                  (t.data("column-count") > 1 &&
                    e(window).outerWidth() >= 1100)) &&
                  (n -= S.bar.heightExcludingAnnouncementBar()),
                n < e(window).scrollTop() &&
                  "peek" === S.bar.getPositionSetting() &&
                  S.bar.hasOpaqueSetting() &&
                  (n -= S.bar.heightExcludingAnnouncementBar()),
                (n = n < 200 ? 0 : n)),
              1 === t.data("column-count") &&
                e(window).outerWidth() >= 1100 &&
                a &&
                (n -= g ? 60 : -1),
              a
                ? e("#quick-buy-modal").animate({ scrollTop: n }, 800)
                : e("html,body").animate({ scrollTop: n }, 800);
          }
        }),
        theme.viewport.isSm() &&
          2 === t.data("column-count") &&
          setTimeout(_, 0),
        t.find(".product-media").each(function (t) {
          l.showMedia(e(this), !1, !0);
        });
      var k = h.find('[data-media-type="external_video"]');
      function x(i) {
        i.preventDefault();
        var o = e(this).closest("[data-media-thumb-id]").data("media-thumb-id");
        return (
          t.find('.product-media[data-media-id="'.concat(o, '"]')).length &&
            (t
              .closest(".product-area")
              .find(".thumb-active")
              .removeClass("thumb-active"),
            e(this).addClass("thumb-active"),
            setTimeout(() => {
              l.scrollToMedia(o);
            }, 0)),
          !1
        );
      }
      function L() {
        theme.Nav();
        if (theme.viewport.isSm()) {
          var t = e(this).find(".rimage-wrapper > img")[0].currentSrc,
            i = e(this)
              .closest(".theme-images")
              .find("[data-full-size]:visible"),
            o = '<a href="#" data-modal-close class="modal-close">&times;</a>';
          i.each(function () {
            var i = e(this).find(".rimage-wrapper > img")[0].currentSrc,
              a = e(this).data("full-size");
            o += '<img class="zoom-image" '
              .concat(t === i ? "id='zoom-image'" : "", ' src="')
              .concat(i, '" data-full-size="')
              .concat(a, '"/>');
          }),
            showThemeModal(
              e(
                '<div class="theme-modal theme-modal--fullscreen temp -light"  role="dialog" aria-modal="true"/>'
              ).append(
                "\n           <div class='inner-scroller -out'>".concat(
                  o,
                  "</div>"
                )
              ),
              "product-image",
              function (t) {
                var i = e("#zoom-image");
                i.attr("src", i.data("full-size")),
                  setTimeout(() => {
                    t.find("[data-full-size]").each(function () {
                      e(this).attr("src", e(this).data("full-size"));
                    });
                  }, 100),
                  setTimeout(() => {
                    t.scrollTop(
                      i.position().top +
                        (i.outerHeight() / 2 - t.outerHeight() / 2)
                    ),
                      t.find(".inner-scroller").removeClass("-out");
                  }, 1e3);
              }
            );
        }
      }
      function E() {
        e(".carousel-wrapper .carousel:not(.slick-initialized)", y).each(
          function (t) {
            e(this)
              .on("init reInit setPosition", function () {
                var t = e(this).find(".slick-slide:last");
                if (t.length > 0) {
                  var i = t.position().left + t.outerWidth(!0);
                  e(this).parent().outerWidth(!0) > i
                    ? e(this)
                        .find(".slick-next, .slick-prev")
                        .addClass("theme-unnecessary")
                        .attr("tabindex", "-1")
                    : e(this)
                        .find(".slick-next, .slick-prev")
                        .removeClass("theme-unnecessary")
                        .attr("tabindex", "0");
                }
              })
              .on("init reInit setPosition", function (t) {
                e(".lazyload--manual", this)
                  .removeClass("lazyload--manual")
                  .addClass("lazyload"),
                  setTimeout(function () {
                    e(t.target).find(".slick-slide a").attr("tabindex", "0");
                  });
              })
              .slick({
                autoplay: !1,
                fade: !1,
                infinite: !1,
                useTransform: !0,
                arrows: !0,
                dots: !1,
                slidesToShow: 5,
                slidesToScroll: 5,
                centerMode: !1,
                verticalSwiping: !0,
                vertical: !0,
                prevArrow:
                  '<button type="button" class="slick-prev" aria-label="' +
                  theme.strings.previous +
                  '">' +
                  theme.icons.chevronDown +
                  "</button>",
                nextArrow:
                  '<button type="button" class="slick-next" aria-label="' +
                  theme.strings.next +
                  '">' +
                  theme.icons.chevronDown +
                  "</button>",
                responsive: [
                  {
                    breakpoint: 1100,
                    settings: { slidesToShow: 3, slidesToScroll: 3 },
                  },
                  {
                    breakpoint: 1400,
                    settings: { slidesToShow: 4, slidesToScroll: 4 },
                  },
                ],
              });
          }
        ),
          theme.viewport.isMd() &&
            ((l.adjustGalleryMargin = () => {
              t.css("margin-top", "-".concat(y.outerHeight(), "px"));
            }),
            l.adjustGalleryMargin(),
            e(window).on("resize.thumbHeight", l.adjustGalleryMargin),
            e(window).on(
              "debouncedresizewidth.thumbHeight",
              l.adjustGalleryMargin
            ));
      }
      function I() {
        e(".slick-slider", y).slick("slickFilter", '[data-cc-hidden="false"]');
      }
      function M() {
        var e = t[0].querySelectorAll('.theme-img:not([aria-hidden="true"])'),
          i = t.find(".swiper-container:first").attr("data-swiper-id");
        if (i) {
          var o = theme.swipers[i];
          o &&
            o.params &&
            ((o.params.breakpoints[1e4].slidesPerView = e.length < 2 ? 1 : 2),
            t.attr("data-media-count", e.length),
            (o.currentBreakpoint = !1),
            o.update());
        }
      }
      t.hasClass("theme-gallery--thumbs-enabled") &&
        t
          .closest(".product-area")
          .on("click", ".product-area__thumbs__thumb a", x),
        t.hasClass("theme-gallery--zoom-enabled") &&
          t.on("click", "[data-full-size]", L),
        e(window)
          .off("ccScrollToMedia.productTemplateGallery".concat(n))
          .on(
            "ccScrollToMedia.productTemplateGallery".concat(n),
            function (e, i) {
              (!1 !== t.data("scroll-to-variant-media") ||
                theme.viewport.isXs()) &&
                setTimeout(() => {
                  l.scrollToMedia(i);
                }, 0);
            }
          ),
        v
          ? k.each(function () {
              e(this).width(t.outerHeight() * e(this).data("aspectratio"));
            })
          : (e(T), e(window).on("scroll.productTemplateGallery".concat(n), T)),
        w &&
          (function () {
            var i = theme.OptionManager.getProductData(
              null,
              t.data("product-id")
            );
            if (
              i.media &&
              i.media.length > 1 &&
              i.variants &&
              i.variants.length > 1 &&
              i.options &&
              i.options.length > 0
            ) {
              var o = (function (e) {
                e = e.map((e) => e.toLowerCase());
                var i = t.data("variant-image-grouping-option").split(",");
                for (var o of i) {
                  var a = e.indexOf(o.trim());
                  if (a > -1) return a;
                }
                return -1;
              })(i.options);
              if (o > -1) {
                var a,
                  n = [];
                i.variants.forEach((e) => {
                  e.featured_media &&
                    (n[e.featured_media.id] || (n[e.featured_media.id] = []),
                    n[e.featured_media.id].push(e.options[o]));
                });
                var s = t[0].querySelector(".theme-images"),
                  r = t[0].querySelectorAll(".theme-img");
                t.on("variantImageSelected", (l, c) => {
                  var d,
                    h = c.options[o],
                    u = !1;
                  a != h &&
                    ((v || theme.viewport.isXs()) &&
                      ((s.innerHTML = ""), s.append(...r)),
                    y.length && e(".slick-slider", y).slick("slickUnfilter"),
                    i.media.forEach((e) => {
                      n[e.id] && (d = n[e.id]);
                      var i = t[0].querySelector(
                        '[data-media-id="'.concat(e.id, '"]')
                      );
                      if (i) {
                        var o = !(!d || !d.includes(h));
                        if (
                          (i.parentElement.getAttribute("aria-hidden") ==
                            o.toString() && (u = !0),
                          d || i.parentElement.remove(),
                          i.parentElement.setAttribute("aria-hidden", !o),
                          v || theme.viewport.isXs())
                        )
                          if (o) {
                            var a = i.querySelector(".lazyload--manual");
                            a &&
                              (a.classList.remove("lazyload--manual"),
                              a.classList.add("lazyload"));
                          } else i.parentElement.remove();
                        if (y.length) {
                          var s = y[0].querySelector(
                            '[data-media-thumb-id="'.concat(e.id, '"]')
                          );
                          s && s.setAttribute("data-cc-hidden", !o);
                        }
                      }
                    }),
                    v && u && M(),
                    theme.viewport.isSm() &&
                      2 === t.data("column-count") &&
                      !p &&
                      u &&
                      setTimeout(() => {
                        C(), _();
                      }, 0),
                    y.length && setTimeout(I, 0),
                    (p = !1),
                    (a = h));
                });
              }
            }
          })();
      var A = [];
      function P() {
        C();
        var i = {};
        i =
          "dots" === h.data("swiper-nav-style")
            ? {
                dynamicBullets: !0,
                pagination: {
                  el: h.find(".swiper-pagination")[0],
                  dynamicBullets: !0,
                },
              }
            : {
                navigation: {
                  nextEl: h.find(".swiper-button-next")[0],
                  prevEl: h.find(".swiper-button-prev")[0],
                },
              };
        var a = _objectSpread(
          _objectSpread(
            {
              mode: "horizontal",
              loop: !1,
              resizeReInit: !0,
              autoHeight: !1,
              scrollContainer: !0,
              grabCursor: !0,
              createPagination: !1,
              preventClicks: !1,
              freeMode: !1,
              freeModeFluid: !1,
              slidesPerView: f > 1 ? 2 : 1,
              spaceBetween: (v && g) || o ? 20 : 0,
              dynamicBullets: !1,
              mousewheel: { invert: !0, forceToAxis: !0 },
              scrollbar: { el: h.find(".swiper-scrollbar")[0], draggable: !0 },
            },
            i
          ),
          {},
          {
            breakpoints: {
              767: _objectSpread(
                {
                  autoHeight: !0,
                  slidesPerView: 1,
                  spaceBetween: 0,
                  freeMode: !1,
                  freeModeFluid: !1,
                },
                i
              ),
              1199: { slidesPerView: 1 },
              1e4: { slidesPerView: f > 1 ? 2 : 1 },
            },
            on: {
              init: function () {
                lazySizes.autoSizer.checkElems(),
                  h
                    .find(".swiper-slide-active .lazyload--manual")
                    .removeClass("lazyload--manual")
                    .addClass("lazyload");
                var t = 500;
                theme.viewport.isXs() &&
                  (t = null === m.get("is_first_visit") ? 6e3 : 2e3),
                  setTimeout(function () {
                    h.find(".lazyload--manual")
                      .removeClass("lazyload--manual")
                      .addClass("lazyload");
                  }, t),
                  theme.viewport.isXs() &&
                    e(".product-detail__form__options a:not(.size-chart-link)")
                      .length &&
                    !v &&
                    (e(
                      ".product-detail__form__options a:not(.size-chart-link):first"
                    ).focus(),
                    setTimeout(() => {
                      e(window).scrollTop(0);
                    }, 500)),
                  theme.viewport.isXs() &&
                    /^((?!chrome|android).)*safari/i.test(
                      navigator.userAgent
                    ) &&
                    (setTimeout(function () {
                      h.find(".swiper-wrapper")
                        .css("display", "inline-flex")
                        .css("vertical-align", "bottom");
                    }, 500),
                    setTimeout(function () {
                      h.find(".swiper-wrapper")
                        .css("display", "")
                        .css("vertical-align", "");
                    }, 1e3));
              },
              slideChangeTransitionStart: function () {
                h.find(".swiper-slide-active .lazyload--manual")
                  .removeClass("lazyload--manual")
                  .addClass("lazyload");
              },
              slideChangeTransitionEnd: function (e) {
                if ((l.pauseAllMedia(), theme.viewport.isXs() || v)) {
                  var i = t.find(".swiper-slide-active .product-media"),
                    o = c[i.data("media-id")];
                  o &&
                    ("model" === i.data("media-type")
                      ? o.updateViewInSpaceButton()
                      : window.ShopifyXR &&
                        d.length &&
                        (d.attr(
                          "data-shopify-model3d-id",
                          d.data("shopify-model3d-first-id")
                        ),
                        d.attr(
                          "data-shopify-title",
                          d.data("shopify-first-title")
                        ),
                        window.ShopifyXR.setupXRElements()));
                }
                l.slideshowTabFix();
              },
            },
          }
        );
        r = new Swiper(h, a);
        var n = new Date().getTime();
        (theme.swipers[n] = r), h.attr("data-swiper-id", n);
        var s = t.find(".current-img").index();
        r.slideTo(s, 0),
          v &&
            (b &&
              t
                .find(".current-img .product-media")
                .addClass("product-media--active-variant"),
            w && M()),
          t.hasClass("featured-product__gallery--single") &&
            h.addClass("swiper-no-swiping"),
          setTimeout(
            function () {
              e(window).trigger("resize"),
                lazySizes.autoSizer.checkElems(),
                r && r.update(),
                theme.viewport.isSm() &&
                  !v &&
                  l.showMedia(
                    h.find(".swiper-slide.swiper-slide-active .product-media"),
                    !1,
                    !0
                  ),
                v && l.slideshowTabFix();
            },
            v ? 3e3 : 1e3
          );
      }
      function z() {
        h.removeClass("swiper-no-swiping"),
          r && r.destroy(!0),
          _(),
          y.length && theme.viewport.isMd() && E();
      }
      t.on("variantImageSelected", function (i, o) {
        l.pauseAllMedia();
        var a = e(this),
          n = a.closest("[data-section-id]").data("section-id");
        if (e(this).find(".swiper-container-horizontal").length) {
          var s = e(".swiper-container:first", this).attr("data-swiper-id"),
            r = theme.swipers[s],
            c = this;
          setTimeout(
            function () {
              var t,
                i = 0;
              e(
                '.swiper-container:first .swiper-slide:not([aria-hidden="true"]) .product-media',
                c
              ).each(function (a) {
                e(this).data("media-id") == o.featured_media.id &&
                  ((i = a), (t = e(this)));
              }),
                r.update(),
                r.slideTo(i, theme.viewport.isXs() ? 500 : 800),
                b &&
                  (a
                    .find(".product-media--active-variant")
                    .removeClass("product-media--active-variant"),
                  t &&
                    t
                      .closest(".product-media")
                      .addClass("product-media--active-variant"));
            },
            "firstrun" === o.eventType ? 1500 : 0
          );
        } else if (!e(this).hasClass("featured-product__gallery")) {
          (0 === a.closest(".shopify-section").index() || A.includes(n)) &&
            e(window).trigger("ccScrollToMedia", o.featured_media.id),
            A.push(n),
            t.data("column-count") > 1 &&
              b &&
              (t
                .find(".product-media--active-variant")
                .removeClass("product-media--active-variant"),
              t
                .find('[data-media-id="'.concat(o.featured_media.id, '"]'))
                .addClass("product-media--active-variant"));
        }
        setTimeout(() => {
          var t = e(
            '[data-section-id="'.concat(
              n,
              '"] .product-area__thumbs .carousel.slick-initialized'
            )
          );
          if (
            1 === t.length &&
            (!1 !== a.data("scroll-to-variant-media") || theme.viewport.isXs())
          ) {
            var i = t.find(
              '[data-media-thumb-id="'.concat(o.featured_media.id, '"]:first')
            );
            i.length &&
              (t.find(".thumb-active").removeClass("thumb-active"),
              i.find("a").addClass("thumb-active"),
              t.slick("slickGoTo", i.data("slick-index")));
          }
        }, 0);
      });
      var V = !1;
      function q() {
        theme.viewport.isXs() && !V
          ? ((V = !0), P())
          : theme.viewport.isSm() && V
          ? ((V = !1),
            z(),
            h
              .find(".lazyload--manual")
              .removeClass("lazyload--manual")
              .addClass("lazyload"))
          : theme.viewport.isSm() &&
            h
              .find(".lazyload--manual")
              .removeClass("lazyload--manual")
              .addClass("lazyload");
      }
      e(function () {
        v
          ? (P(),
            e(window).on("cc-mobile-viewport-size-change.swiper", () => {
              z(), P();
            }))
          : (q(), e(window).on("debouncedresize.swiper", q)),
          y.length && theme.viewport.isMd() && E();
      });
    }),
    (theme.initContentSlider = function (t, i) {
      e(".slideshow", t).each(function () {
        var t = 1e3 * e(this).data("autoplay-speed"),
          o = "instant" == e(this).data("transition") ? 0 : 600;
        e(this)
          .on("init", function () {
            e(".slick-current .lazyload--manual", this)
              .removeClass("lazyload--manual")
              .addClass("lazyload"),
              e(function () {
                setTimeout(
                  () => {
                    e(".lazyload--manual", this)
                      .removeClass("lazyload--manual")
                      .addClass("lazyload");
                  },
                  null === m.get("is_first_visit") ? 5e3 : 2e3
                );
              });
          })
          .slick({
            autoplay: e(this).data("autoplay"),
            fade:
              "slide" !== e(this).data("transition") || !theme.viewport.isXs(),
            speed: o,
            autoplaySpeed: t,
            arrows: "arrows" == e(this).data("navigation"),
            dots: "dots" == e(this).data("navigation"),
            infinite: !0,
            useTransform: !0,
            prevArrow:
              '<button type="button" class="slick-prev" aria-label="' +
              theme.strings.previous +
              '">' +
              theme.icons.chevronLeft +
              "</button>",
            nextArrow:
              '<button type="button" class="slick-next" aria-label="' +
              theme.strings.next +
              '">' +
              theme.icons.chevronRight +
              "</button>",
            pauseOnHover: !1,
            cssEase: "cubic-bezier(0.25, 1, 0.5, 1)",
            lazyLoad:
              e(this).find("[data-lazy]").length > 0 ? "ondemand" : null,
            customPaging: function (e, i) {
              return (
                '<button class="custom-dot" type="button" data-role="none" role="button" tabindex="0"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" xml:space="preserve"><circle class="circle-one" cx="15" cy="15" r="13" />' +
                '<circle class="circle-two" cx="15" cy="15" r="13" style="animation-duration: '.concat(
                  t + o,
                  'ms" />'
                ) +
                "</svg></button>"
              );
            },
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  arrows: !1,
                  dots: "none" != e(this).data("navigation"),
                  lazyLoad:
                    e(this).find("[data-lazy]").length > 0
                      ? "progressive"
                      : null,
                },
              },
            ],
          })
          .on("beforeChange", function (t, i, o, a) {
            e(i.$slides).filter(".slick--out").removeClass("slick--out");
            var n = e(i.$slides.get(a)).find(".lazyload--manual");
            (n.length && n.removeClass("lazyload--manual").addClass("lazyload"),
            "slide" === e(this).data("transition") ||
              "zoom" === e(this).data("transition")) &&
              e(i.$slides.get(o)).addClass("slick--leaving");
          })
          .on("afterChange", function (t, o, a) {
            e(o.$slides)
              .filter(".slick--leaving")
              .addClass("slick--out")
              .removeClass("slick--leaving"),
              i && i(a);
          });
      });
    }),
    (theme.initProductSlider = function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        i = e.data("products-in-view"),
        o = {
          767: { slidesPerView: 1.2, spaceBetween: 10 },
          900: { slidesPerView: 4 === i || 3 === i ? 2 : i },
          1439: { slidesPerView: 4 === i || 3 === i ? 3 : i },
          3e3: { slidesPerView: i, spaceBetween: 20 },
        };
      if (t) {
        var a = e.data("first-post-big");
        o = a
          ? {
              767: { slidesPerView: 1.2, spaceBetween: 10 },
              1024: { slidesPerView: "auto" },
              1600: { slidesPerView: "auto" },
              3e3: { slidesPerView: "auto", spaceBetween: 20 },
            }
          : {
              767: { slidesPerView: 1.2, spaceBetween: 10 },
              1024: { slidesPerView: 2 },
              1600: { slidesPerView: 3 },
              3e3: { slidesPerView: 4, spaceBetween: 20 },
            };
      }
      new Swiper(e, {
        mode: "horizontal",
        loop: !1,
        resizeReInit: !0,
        freeMode: !0,
        freeModeFluid: !0,
        scrollContainer: !0,
        grabCursor: !0,
        createPagination: !1,
        slidesPerView: i,
        spaceBetween: 20,
        mousewheel: { invert: !0, forceToAxis: !0 },
        scrollbar: { el: e.find(".swiper-scrollbar")[0], draggable: !0 },
        navigation: {
          nextEl: e.find(".swiper-button-next")[0],
          prevEl: e.find(".swiper-button-prev")[0],
        },
        breakpoints: o,
        on: {
          init: function () {
            lazySizes.autoSizer.checkElems();
          },
        },
      });
    }),
    (theme.convertOptionsToBoxes = function (t) {
      var i = e(t)
        .find("select[data-make-box]")
        .each(function () {
          e(this).find('option[value=""]').remove();
        })
        .clickyBoxes()
        .parent()
        .addClass("has-clickyboxes");
      if (
        (e(".selector-wrapper:not(.cc-swatches) .clickyboxes").ccHoverLine({
          lineCss: { height: "2px" },
        }),
        i.length > 0)
      )
        for (
          var o = theme.OptionManager.getProductData(e(t)), a = 0;
          a < o.options.length;
          a++
        ) {
          for (var n = {}, s = 0; s < o.variants.length; s++) {
            var r = o.variants[s];
            void 0 === n[r.options[a]] && (n[r.options[a]] = !1),
              r.available && (n[r.options[a]] = !0);
          }
          for (var l in n)
            n[l] ||
              e(".selector-wrapper:eq(" + a + ") .clickyboxes li a", t)
                .filter(function () {
                  return e(this).attr("data-value") == l;
                })
                .addClass("unavailable");
        }
    }),
    (theme.loadInfiniteScroll = function (t, o) {
      var a = 1;
      e(
        "[data-infinite-scroll-container] .pagination.infiniscroll:not(.infinit)",
        t
      )
        .addClass("infinit")
        .each(function () {
          var n = e(this).hasClass("wait-for-trigger"),
            s = e(
              '<div class="pager-button"><a href="#" aria-label="' +
                theme.strings.loadMore +
                '">' +
                theme.icons.loading +
                "</a></div>"
            );
          e(this).replaceWith(s),
            s.find("a").attr("href", e(this).find(".next a").attr("href")),
            s.on("click", "a", function (n) {
              if (e(this).hasClass("loading")) return !1;
              e(this).addClass("loading");
              var r = e(this);
              return (
                e.get(e(this).attr("href"), function (n) {
                  a++;
                  var l = !1,
                    c = e(e.parseHTML(n));
                  if (
                    e("[data-infinite-scroll-results].product-list--columns", t)
                      .length
                  ) {
                    (l = !0),
                      (d = c
                        .find("[data-infinite-scroll-results]")
                        .hide()).prepend(
                        "<h2>" +
                          theme.strings.page.replace("{{ page }}", a) +
                          "</h2>"
                      );
                    var d = d.insertBefore(
                      "[data-infinite-scroll-container] .pager-button"
                    );
                  } else d = c.find("[data-infinite-scroll-results] .product-block").hide().appendTo("[data-infinite-scroll-results]");
                  if (
                    (e("[data-infinite-scroll-container]", t)
                      .filter(".product-block")
                      .each(function (t) {
                        e(this)
                          .removeAttr("data-loop-index")
                          .data("loop-index", t),
                          i++;
                      }),
                    l)
                  )
                    setTimeout(function () {
                      d.fadeIn(),
                        theme.inlineVideos.init(t),
                        theme.initAnimateOnScroll(),
                        lazySizes.autoSizer.checkElems(),
                        o && o();
                    }, 300);
                  else {
                    e("[data-infinite-scroll-results]", t).height(
                      e("[data-infinite-scroll-results]", t).height()
                    ),
                      d.addClass("pre-trans").css("display", "");
                    var h = 0;
                    e("[data-infinite-scroll-results]", t)
                      .children()
                      .each(function () {
                        var t = e(this).position().top + e(this).height();
                        t > h && (h = t);
                      }),
                      e("[data-infinite-scroll-results]", t).animate(
                        { height: h },
                        500,
                        function () {
                          e(this).css("height", ""),
                            d.removeClass("pre-trans"),
                            theme.inlineVideos.init(t),
                            theme.initAnimateOnScroll(),
                            new f(),
                            lazySizes.autoSizer.checkElems(),
                            o && o();
                        }
                      );
                  }
                  var u = c.find(
                    "[data-infinite-scroll-container] .pagination .next a"
                  );
                  0 == u.length
                    ? s.slideUp()
                    : r.attr("href", u.attr("href")).removeClass("loading");
                }),
                !1
              );
            }),
            n ||
              e(window).on("throttled-scroll.infiniscroll", function () {
                e(window).scrollTop() + e(window).height() >
                  s.offset().top - 500 && s.find("a").trigger("click");
              });
        });
    }),
    (theme.unloadInfiniteScroll = function (t) {
      t && e(".pagination.infiniscroll.infinit", t).removeClass("infinit"),
        e(window).off("throttled-scroll.infiniscroll");
    }),
    (theme.applyAjaxToProductForm = function (t) {
      var i = theme.routes.cart_add_url + ".js";
      t.filter('[data-ajax-add-to-cart="true"]:not(.feedback-go_to_cart)')
        .find(".product-purchase-form")
        .on("submit", function (t) {
          t.preventDefault();
          var o = e(this),
            a = e(this)
              .find("[type=submit]")
              .attr("disabled", "disabled")
              .addClass("confirmation adding");
          a.data("originalHtml", a.html()).html(
            theme.strings.productAddingToCart
          );
          var n = e(".product-area__add-to-cart-xs button"),
            s = theme.viewport.isXs() && n.length;
          s &&
            (n.attr("disabled", "disabled"),
            n
              .data("originalHtml", n.html())
              .html(theme.strings.productAddingToCart)),
            e
              .post(
                i,
                o.serialize(),
                function (t) {
                  if (
                    (a.html(
                      theme.icons.tick + " " + theme.strings.productAddedToCart
                    ),
                    s &&
                      n.html(
                        theme.icons.tick +
                          " " +
                          theme.strings.productAddedToCart
                      ),
                    setTimeout(function () {
                      a
                        .removeAttr("disabled")
                        .removeClass("confirmation")
                        .html(a.data("originalHtml")),
                        s &&
                          n
                            .removeAttr("disabled")
                            .removeClass("confirmation")
                            .html(n.data("originalHtml"));
                    }, 4e3),
                    o.hasClass("feedback-add_in_modal") ||
                      o.hasClass("feedback-add_in_modal_no_checkout"))
                  ) {
                    var i = e.parseJSON(t),
                      r = o.hasClass("feedback-add_in_modal_no_checkout"),
                      l = theme.Shopify.formatImage(i.image, "300x");
                    (new Image().src = l), a.removeClass("adding");
                    var c = "",
                      d = o
                        .closest(".product-area__details__inner")
                        .find(".price-area");
                    if (
                      (d.length &&
                        (c += '<p class="cart-product__content__price">'.concat(
                          d.html(),
                          "</p>"
                        )),
                      i.selling_plan_allocation &&
                        i.selling_plan_allocation.selling_plan.name &&
                        (c += '<p class="cart-product__content__meta">'.concat(
                          i.selling_plan_allocation.selling_plan.name,
                          "</p>"
                        )),
                      i.options_with_values && i.options_with_values.length)
                    )
                      for (var h = 0; h < i.options_with_values.length; h++) {
                        var u = i.options_with_values[h];
                        "Title" !== u.name &&
                          "Default Title" !== u.value &&
                          (c += '<p class="cart-product__content__meta">'
                            .concat(u.name, ": ")
                            .concat(u.value, "</p>"));
                      }
                    var m = 25,
                      p = theme.Nav();
                    "inline" !== p.bar.getPositionSetting() &&
                      (m = p.bar.height()),
                      showThemeModal(
                        [
                          '<div id="added-to-cart" class="theme-modal theme-modal--small" role="dialog" aria-modal="true" aria-labelledby="added-to-cart-title">',
                          '<div class="inner" style="top:'.concat(m, 'px">'),
                          '<a href="#" data-modal-close class="modal-close">&times;</a>',
                          '<h4 id="added-to-cart-title">' +
                            theme.icons.tick +
                            theme.strings.productAddedToCart +
                            "</h4>",
                          '<div class="cart-product">',
                          '<div class="cart-product__image"><img src="'
                            .concat(l, '" alt="')
                            .concat(i.featured_image.alt, '"/></div>'),
                          '<div class="cart-product__content"><p class="cart-product__content__title">',
                          i.product_title,
                          "</p>" + "".concat(c || "") + "</div>",
                          "</div>",
                          '<p class="links '.concat(
                            r ? "links--no-checkout" : "",
                            '">'
                          ),
                          '<a href="' +
                            theme.routes.cart_url +
                            '" class="button '.concat(r ? "" : "alt", '">') +
                            theme.strings.viewCart +
                            "</a>",
                          '<a href="' +
                            theme.routes.checkout +
                            '" class="button button--checkout" [data-cc-checkout-button]>' +
                            theme.strings.popupCheckout +
                            "</a> ",
                          "</p>",
                          "</div>",
                          "</div>",
                        ].join(""),
                        "added-to-cart",
                        null
                      );
                  }
                  e.get(theme.routes.cart_url, function (t) {
                    var i =
                        '#site-control .cart:not(.nav-search), [data-section-type="cart-template"]',
                      o = e(e.parseHTML("<div>" + t + "</div>")).find(i);
                    e(i).each(function (t) {
                      e(o[t])
                        .find("[data-cc-animate]")
                        .removeAttr("data-cc-animate"),
                        e(this).replaceWith(o[t]),
                        e(this)
                          .parent()
                          .find("[data-cc-animate]")
                          .removeAttr("data-cc-animate");
                    });
                  });
                },
                "text"
              )
              .fail(function (t) {
                if (
                  (a
                    .removeAttr("disabled")
                    .removeClass("confirmation")
                    .html(a.data("originalHtml")),
                  s &&
                    n
                      .removeAttr("disabled")
                      .removeClass("confirmation")
                      .html(n.data("originalHtml")),
                  void 0 !== t && void 0 !== t.status)
                ) {
                  var i = e.parseJSON(t.responseText),
                    r = o.find(".product-status-message");
                  r.html(i.description),
                    r.slideDown().fadeIn(),
                    setTimeout(() => {
                      r.slideUp();
                    }, 8e3);
                } else o.attr("ajax-add-to-cart", "false").submit();
              });
        });
    }),
    (theme.removeAjaxFromProductForm = function (e) {
      e.find("form.product-purchase-form").off("submit");
    }),
    (theme.OptionManager = new (function () {
      var t = this;
      (t._getVariantOptionElement = function (e, t) {
        return t.find('select[name="id"] option[value="' + e.id + '"]');
      }),
        (t.selectors = {
          container: ".product-area",
          gallery: ".theme-gallery",
          priceArea: ".price-area",
          variantIdInputs: '[name="id"]',
          submitButton:
            ".product-detail__form input[type=submit], .product-detail__form button[type=submit], .product-area__add-to-cart-xs button",
          multiOption: ".option-selectors",
        }),
        (t.strings = {
          priceNonExistent: theme.strings.priceNonExistent,
          buttonDefault: theme.strings.buttonDefault,
          buttonPreorder: theme.strings.buttonPreorder,
          buttonNoStock: theme.strings.buttonNoStock,
          buttonNoVariant: theme.strings.buttonNoVariant,
          unitPriceSeparator: theme.strings.unitPriceSeparator,
          inventoryNotice: theme.strings.onlyXLeft,
          inventoryLowStock: theme.strings.inventoryLowStock,
          inventoryInStock: theme.strings.inventoryInStock,
          priceSoldOut: theme.strings.priceSoldOut,
        }),
        (t._getString = function (e, i) {
          var o = t.strings[e];
          return (
            i &&
              (o
                ? (o = o.replace(
                    "[PRICE]",
                    '<span class="theme-money">' +
                      theme.Shopify.formatMoney(
                        i.price,
                        theme.money_format_with_code_preference
                      ) +
                      "</span>"
                  ))
                : console.warn(
                    "No string for key '".concat(e, "' was found.")
                  )),
            o
          );
        }),
        (t.getProductData = function (e, t) {
          t || (t = e.data("product-id"));
          var i;
          return (
            theme.productData[t] ||
              (theme.productData[t] = JSON.parse(
                document.getElementById("cc-product-json-" + t).innerHTML
              )),
            (i = theme.productData[t]) ||
              console.log(
                "Product data missing (id: " + e.data("product-id") + ")"
              ),
            i
          );
        }),
        (t.getBaseUnit = function (e) {
          return 1 === e.unit_price_measurement.reference_value
            ? e.unit_price_measurement.reference_unit
            : e.unit_price_measurement.reference_value +
                e.unit_price_measurement.reference_unit;
        }),
        (t.addVariantUrlToHistory = function (e) {
          if (e) {
            var t =
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?variant=" +
              e.id;
            window.history.replaceState({ path: t }, "", t);
          }
        }),
        (t.updateSku = function (e, t) {
          t.find(".sku .sku__value").html(e ? e.sku : ""),
            t.find(".sku").toggleClass("sku--no-sku", !e || !e.sku);
        }),
        (t.updateBarcode = function (e, t) {
          t.find(".barcode .barcode__value").html(e ? e.barcode : ""),
            t
              .find(".barcode")
              .toggleClass("barcode--no-barcode", !e || !e.barcode);
        }),
        (t.updateInventoryNotice = function (e, i) {
          var o = i.find(".product-inventory-notice"),
            a = i.find(".product-inventory-notice__text"),
            n = i.find(".product-inventory-notice__indicator");
          if (o.length) {
            var s,
              r = t._getVariantOptionElement(e, i).data("inventory"),
              l = o[0].dataset;
            if (
              ((s =
                "always" === l.showInventoryCount ||
                ("low" === l.showInventoryCount && r <= l.inventoryThreshold)
                  ? t._getString("inventoryNotice").replace("[[ quantity ]]", r)
                  : r <= parseInt(l.inventoryThreshold)
                  ? t._getString("inventoryLowStock")
                  : t._getString("inventoryInStock")),
              1 === n.length)
            ) {
              var c,
                d = n.find("span");
              (c =
                r >= l.indicatorScale
                  ? 100
                  : ((100 / parseInt(l.indicatorScale)) * r).toFixed(1)),
                r <= parseInt(l.inventoryThreshold)
                  ? d
                      .css("width", c + "%")
                      .css("background-color", l.indicatorScaleColorBelow)
                  : d
                      .css("width", c + "%")
                      .css("background-color", l.indicatorScaleColorAbove);
            }
            r &&
            r > 0 &&
            ("always" === l.showInventoryNotice ||
              r <= parseInt(l.inventoryThreshold))
              ? (o
                  .removeClass("product-inventory-notice--no-inventory")
                  .slideDown(300),
                a.html(s))
              : o
                  .addClass("product-inventory-notice--no-inventory")
                  .slideUp(300);
          }
        }),
        (t.updateBackorder = function (e, i) {
          var o = i.find(".backorder");
          if (o.length)
            if (e && e.available)
              if (
                e.inventory_management &&
                "out" == t._getVariantOptionElement(e, i).data("stock")
              ) {
                var a = t.getProductData(i);
                o
                  .find(".backorder__variant")
                  .html(
                    a.title +
                      (e.title.indexOf("Default") >= 0 ? "" : " - " + e.title)
                  ),
                  o.show();
              } else o.hide();
            else o.hide();
        }),
        (t.updatePrice = function (i, o) {
          var a = o.find(t.selectors.priceArea);
          if ((a.removeClass("on-sale"), i && 1 == i.available)) {
            var n = e("<div>");
            if (
              (i.compare_at_price > i.price &&
                (e('<span class="was-price theme-money">')
                  .html(
                    theme.Shopify.formatMoney(
                      i.compare_at_price,
                      theme.money_format_with_code_preference
                    )
                  )
                  .appendTo(n),
                n.append(" "),
                a.addClass("on-sale")),
              e('<span class="current-price theme-money">')
                .html(
                  theme.Shopify.formatMoney(
                    i.price,
                    theme.money_format_with_code_preference
                  )
                )
                .appendTo(n),
              i.unit_price_measurement)
            ) {
              var s = e('<div class="unit-price">').appendTo(n);
              e('<span class="unit-price__price theme-money">')
                .html(
                  theme.Shopify.formatMoney(i.unit_price, theme.money_format)
                )
                .appendTo(s),
                e('<span class="unit-price__separator">')
                  .html(t._getString("unitPriceSeparator"))
                  .appendTo(s),
                e('<span class="unit-price__unit">')
                  .html(t.getBaseUnit(i))
                  .appendTo(s);
            }
            a.html(n.html());
          }
        }),
        (t._updateButtonText = function (i, o, a) {
          i.each(function () {
            var i;
            !1 !== (i = t._getString("button" + o, a)) &&
              (e(this).is("input") ? e(this).val(i) : e(this).html(i));
          });
        }),
        (t.updateButtons = function (e, i) {
          var o = i.find(t.selectors.submitButton);
          e && 1 == e.available
            ? (o.removeAttr("disabled"),
              i.data("is-preorder")
                ? t._updateButtonText(o, "Preorder", e)
                : t._updateButtonText(o, "Default", e))
            : (o.attr("disabled", "disabled"),
              e
                ? t._updateButtonText(o, "NoStock", e)
                : t._updateButtonText(o, "NoVariant", e));
        }),
        (t.updateContainerStatusClasses = function (e, i) {
          i.toggleClass("variant-status--unavailable", !e.available),
            i.toggleClass(
              "variant-status--backorder",
              e.available &&
                e.inventory_management &&
                "out" == t._getVariantOptionElement(e, i).data("stock")
            );
        }),
        (t.updateVariantOptionStatusClasses = function (i, o) {
          var a = t.getProductData(o);
          function n(e) {
            return a.variants.filter((t) => {
              for (var i = !0, o = 0; o < e.length; o++)
                if (t.options[o] !== e[o]) {
                  i = !1;
                  break;
                }
              return i;
            });
          }
          function s(e) {
            for (var t = {}, i = 0; i < a.variants.length; i++) {
              var o = a.variants[i].options[e];
              o && (t[o] = !1);
            }
            return t;
          }
          if (
            (!1 === i &&
              ((i = { options: [] }),
              o
                .find(".selector-wrapper a.active[data-value]")
                .each(function () {
                  i.options.push(e(this).data("value"));
                })),
            i && i.options && i.options.length > 1)
          ) {
            for (
              var r = [...i.options], l = {}, c = i.options.length - 1;
              c >= 0;
              c--
            ) {
              r.pop();
              for (var d = s(c), h = n(r), u = 0; u < h.length; u++)
                if (h[u].available) {
                  var m = h[u].options[c];
                  m && (d[m] = !0);
                }
              l[a.options[c]] = d;
            }
            e(".selector-wrapper", o).each(function () {
              var t = e(this).data("option-name");
              for (var [i, o] of Object.entries(l[t]))
                (i = removeDiacritics(i)
                  .toLowerCase()
                  .replace(/'/g, "")
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/-+/g, "-")
                  .replace(/-*$/, "")),
                  e(this)
                    .find(".clickyboxes .opt--".concat(i))
                    .toggleClass("unavailable", !o);
            });
          }
        }),
        (t.initProductOptions = function (i) {
          if (!i.hasClass("theme-init")) {
            var o = t.getProductData(i);
            i.addClass("theme-init"),
              i
                .find(t.selectors.multiOption)
                .on("change.themeProductOptions", "select", function () {
                  var a = [];
                  e(this)
                    .closest(t.selectors.multiOption)
                    .find("select")
                    .each(function () {
                      a.push(e(this).val());
                    });
                  for (var n = !1, s = 0; s < o.variants.length; s++) {
                    for (var r = o.variants[s], l = 0, c = 0; c < a.length; c++)
                      r.options[c] == a[c] && l++;
                    if (l == a.length) {
                      n = r;
                      break;
                    }
                  }
                  n && i.find(t.selectors.variantIdInputs).val(n.id),
                    i.find(t.selectors.variantIdInputs).each(function () {
                      this.dispatchEvent(
                        new CustomEvent("change", {
                          bubbles: !0,
                          cancelable: !1,
                          detail: n,
                        })
                      );
                    });
                }),
              i.find(t.selectors.variantIdInputs).each(function () {
                e(this).on(
                  "change.themeProductOptions firstrun.themeProductOptions",
                  function (a) {
                    if (!e(this).is("input[type=radio]:not(:checked)")) {
                      var n = a.detail;
                      if (!n && !1 !== n)
                        for (var s = 0; s < o.variants.length; s++)
                          o.variants[s].id == e(this).val() &&
                            (n = o.variants[s]);
                      var r = e(this).closest(t.selectors.container),
                        l = r
                          .find(t.selectors.submitButton)
                          .filter("[data-add-to-cart-text]");
                      l.length &&
                        (t.strings.buttonDefault = l.data("add-to-cart-text")),
                        t.updatePrice(n, r),
                        t.updateButtons(n, r),
                        e(window).trigger("cc-variant-updated", {
                          variant: n,
                          product: o,
                        }),
                        e(window).trigger("debouncedresizewidth"),
                        n &&
                          n.featured_media &&
                          r
                            .find(t.selectors.gallery)
                            .trigger("variantImageSelected", n),
                        t.updateBarcode(n, r),
                        t.updateSku(n, r),
                        t.updateInventoryNotice(n, r),
                        t.updateBackorder(n, r),
                        t.updateContainerStatusClasses(n, r),
                        i.find('[data-show-realtime-availability="true"]')
                          .length > 0 &&
                          t.updateVariantOptionStatusClasses(n, i),
                        i.data("enable-history-state") &&
                          "change" == a.type &&
                          t.addVariantUrlToHistory(n),
                        i.find(".quickbuy-container").trigger("changedsize"),
                        i.trigger("variantChanged", n);
                    }
                  }
                ),
                  e(this).trigger("firstrun");
              }),
              theme.applyAjaxToProductForm(i);
          }
        }),
        (t.unloadProductOptions = function (i) {
          i.removeClass("theme-init").each(function () {
            e(this).trigger("unloading").off(".themeProductOptions"),
              e(this).find(t.selectors.multiOption).off(".themeProductOptions"),
              theme.removeAjaxFromProductForm(i);
          });
        });
    })()),
    (theme.addControlPaddingToModal = function () {
      e(".theme-modal.reveal > .inner").css(
        "padding-top",
        theme.Nav().bar.height()
      );
    }),
    (theme.allowRTEFullWidthImages = function (t) {
      e(
        ".rte--allow-full-width-images p > img, .rte--allow-full-width-images div > img",
        t
      ).each(function () {
        0 == e(this).siblings().length &&
          e(this).parent().addClass("no-side-pad");
      }),
        e(
          ".rte--allow-full-width-images p > a > img, .rte--allow-full-width-images div > a > img",
          t
        ).each(function () {
          0 == e(this).siblings().length &&
            0 == e(this).parent().siblings().length &&
            e(this).parent().addClass("no-side-pad");
        });
    }),
    (theme.browserHas3DTransforms = function () {
      var e,
        t = document.createElement("p"),
        i = {
          webkitTransform: "-webkit-transform",
          OTransform: "-o-transform",
          msTransform: "-ms-transform",
          MozTransform: "-moz-transform",
          transform: "transform",
        };
      for (var o in (document.body.insertBefore(t, null), i))
        void 0 !== t.style[o] &&
          ((t.style[o] = "translate3d(1px,1px,1px)"),
          (e = window.getComputedStyle(t).getPropertyValue(i[o])));
      return (
        document.body.removeChild(t),
        void 0 !== e && e.length > 0 && "none" !== e
      );
    }),
    theme.browserHas3DTransforms() && e("html").addClass("supports-transforms"),
    (theme.namespaceFromSection = function (t) {
      return [".", e(t).data("section-type"), e(t).data("section-id")].join("");
    }),
    (theme.inlineVideos = {
      init: (t) => {
        e(".section-background-video--inline", t).each(function () {
          theme.VideoManager.onSectionLoad(e(this)[0]),
            e(this).addClass("cc-init");
        });
      },
      destroy: (t) => {
        e(".section-background-video--inline", t).each(function () {
          theme.VideoManager.onSectionUnload(e(this)[0]),
            e(this).removeClass("cc-init");
        });
      },
    }),
    (theme.initShopifyPaymentButtons = function (e) {
      if (Shopify.PaymentButton && e.find(".shopify-payment-button").length) {
        var t = null;
        (t = function () {
          document.removeEventListener("shopify:payment_button:loaded", t),
            e.trigger("changedsize");
        }),
          document.addEventListener("shopify:payment_button:loaded", t),
          Shopify.PaymentButton.init();
      }
    }),
    (theme.initComponents = function (t) {
      var i = t.find("[data-components]");
      i.length &&
        i
          .data("components")
          .split(",")
          .forEach((i) => {
            e(document).trigger("cc:component:load", [i, t[0]]);
          });
    }),
    (theme.assessFullWidthSections = function () {
      document
        .querySelectorAll("#page-content .shopify-section > .use-alt-bg")
        .forEach((e) => e.parentElement.classList.add("has-alt-bg"));
    }),
    (theme.updateNavHeight = function () {
      var e = theme.Nav();
      document.documentElement.style.setProperty(
        "--nav-height",
        e.bar.height() + "px"
      ),
        document
          .querySelectorAll("[data-cc-sticky-scroll-top]")
          .forEach((t) => {
            t.setAttribute("data-cc-sticky-scroll-top", e.bar.height() + 20);
          });
    }),
    (theme.init = function () {
      theme.checkViewportFillers(),
        theme.assessAltLogo(),
        theme.assessFullWidthSections(),
        theme.calc100vh(),
        theme.updateNavHeight();
    }),
    (theme.windowResize = function () {
      theme.calc100vh(), theme.updateNavHeight();
    }),
    jQuery(function (e) {
      e(document).on("click", "[data-cc-quick-buy]", function () {
        theme.Nav();
        var t = e(this).attr("href");
        theme.currentQuickbuyRequest && theme.currentQuickbuyRequest.abort(),
          showThemeModal(
            '<div class="theme-modal theme-modal--fullscreen theme-modal--quickbuy -light" id="quick-buy-modal" role="dialog" aria-modal="true"/>\n                        <a href="#" data-modal-close class="modal-close">&times;</a>\n                        <div class="theme-modal__loading">'.concat(
              theme.icons.loading,
              "</div>\n                    </div>"
            ),
            "quick-buy",
            null
          );
        var i = t;
        return (
          (theme.currentQuickbuyRequest = e
            .get(i, function (i) {
              var o = e("#quick-buy-modal"),
                a = e("<div>" + i + "</div>").find(".section-product-template"),
                n = a.find('[data-section-type="product-template"]')[0];
              a.find(".store-availability-container-outer").remove(),
                a.find('[data-show-in-quickbuy="false"]').remove(),
                a
                  .find(".theme-gallery--zoom-enabled")
                  .removeClass("theme-gallery--zoom-enabled"),
                a
                  .find(".product-area__details__title")
                  .wrapInner(
                    e("<a>")
                      .attr("href", t)
                      .attr("data-cc-animate-click", "true")
                  ),
                a.find(".product-detail__more_details a").attr("href", t),
                o.find(".theme-modal__loading").replaceWith(a),
                theme.initAnimateOnScroll(),
                theme.ProductTemplateSection.onSectionLoad(n, !0),
                theme.initComponents(o),
                theme.initShopifyPaymentButtons(o),
                e(window).one("ccModalClosing", function () {
                  theme.ProductTemplateSection.onSectionUnload(n, !0);
                });
            })
            .always(function () {
              theme.currentQuickbuyRequest = !1;
            })),
          !1
        );
      });
    });
  class p {
    constructor(e) {
      (this.productBlock = e),
        (this.productBlockImageContainer =
          this.productBlock.querySelector(".image")),
        (this.imageContainer = this.productBlock.querySelector(".image-inner")),
        (this.swatchesContainer =
          this.productBlock.querySelector(".cc-swatches")),
        (this.slideDuration = 1e3),
        (this.swatchImagesPreloaded = !1),
        (this.imageSliderLoaded = !1),
        (this.widths = [460, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]),
        this.imageWidth,
        this.hoverTimeout,
        (this.preloadedImages = []),
        (this.swatches = []),
        this.bindEvents(),
        this.productBlock.querySelector(
          '[data-section-type="background-video"]'
        ) && this.initImageSlider();
    }
    showNextSlideImage() {
      this.hoverTimeout = setTimeout(() => {
        var e = this.imageContainer.querySelectorAll(".product-block--slide");
        if (e && e.length > 1)
          if (this.imageContainer.querySelector(".product-block--slide.-in")) {
            for (var t = 0; t < e.length; t++)
              if (e[t].classList.contains("-in")) {
                e[t].classList.remove("-in"),
                  t === e.length - 1
                    ? (this.destroyImageSliderLoadingBar(),
                      e[0].classList.add("-in"),
                      this.initImageSliderLoadingBar())
                    : e[t + 1].classList.add("-in");
                break;
              }
          } else
            this.imageContainer
              .querySelector(".image__first")
              .classList.add("-out"),
              e[1].classList.add("-in");
        this.showNextSlideImage();
      }, this.slideDuration);
    }
    showSpecificSlideImage(e) {
      var t = e.substring(0, e.lastIndexOf("_")),
        i = this.imageContainer.querySelector(
          '.product-block--slide[src^="'.concat(t, '"]')
        );
      if (i) {
        var o = this.imageContainer.querySelector(".product-block--slide.-in");
        o && o.classList.remove("-in"),
          this.imageContainer
            .querySelector(".image__first")
            .classList.add("-out"),
          i.classList.add("-in");
      } else console.warn("No next slide for ", t);
    }
    preloadImage(e) {
      this.preloadedImages.includes(e) ||
        ((new Image().src = e), this.preloadedImages.push(e));
    }
    getImageUrl(e) {
      for (
        var t = theme.device.isRetinaDisplay()
            ? 2 * this.productBlock.clientWidth
            : this.productBlock.clientWidth,
          i = 0;
        i < this.widths.length;
        i++
      )
        if (this.widths[i] >= t)
          return (
            (this.imageWidth = this.widths[i]),
            e.replace("{width}", this.widths[i])
          );
    }
    initImageSlider() {
      if (this.productBlock) {
        var e = this.productBlock.dataset.productImages;
        if (e && !this.imageSliderLoaded) {
          var t = e.split(","),
            i = "";
          t.forEach((e) => {
            i += '<img class="product-block--slide" tabindex="-1" src="'.concat(
              this.getImageUrl(e),
              '"/>'
            );
          }),
            (this.imageContainer.innerHTML += i),
            (this.imageSliderLoaded = !0);
        }
      }
    }
    destroyImageSlider() {
      if (this.imageSliderLoaded) {
        var e = this.imageContainer.querySelectorAll(".product-block--slide");
        e &&
          e.forEach((e) => {
            e.remove();
          }),
          (this.imageSliderLoaded = !1);
      }
    }
    handleMouseEnterSwatch(e) {
      if (e.target.dataset.variantImage) {
        this.imageSliderLoaded || this.initImageSlider();
        var t = this.getImageUrl(e.target.dataset.variantImage);
        this.showSpecificSlideImage(t);
      }
    }
    handleMouseLeaveSwatch(e) {
      var t = this.imageContainer.querySelector(".product-block--slide.-in");
      t && t.classList.remove("-in"),
        this.imageContainer
          .querySelector(".image__first")
          .classList.remove("-out");
    }
    handleClickSwatch(e) {
      e.preventDefault();
    }
    handleMouseEnterProductBlock(e) {
      this.swatchImagesPreloaded ||
        (this.productBlock.querySelectorAll(".cc-swatches a").forEach((e) => {
          e.dataset.variantImage &&
            this.preloadImage(this.getImageUrl(e.dataset.variantImage));
        }),
        (this.swatchImagesPreloaded = !0)),
        this.productBlock.dataset.productImages &&
          !this.imageSliderLoaded &&
          (this.productBlock.classList.contains("all-images")
            ? this.initImageSlider()
            : setTimeout(this.initImageSlider, 500));
    }
    handleEnterImageContainer(e) {
      this.productBlock.classList.contains("all-images") &&
        (this.showNextSlideImage(), this.initImageSliderLoadingBar());
    }
    handleLeaveImageContainer(e) {
      if ((clearTimeout(this.hoverTimeout), this.imageSliderLoaded)) {
        var t = this.imageContainer.querySelector(".product-block--slide.-in");
        t &&
          (t.classList.remove("-in"),
          this.imageContainer
            .querySelector(".image__first")
            .classList.remove("-out")),
          this.destroyImageSliderLoadingBar();
      }
    }
    initImageSliderLoadingBar() {
      var e =
          this.imageContainer.querySelectorAll(".product-block--slide").length *
            this.slideDuration -
          100,
        t = document.createElement("div");
      t.classList.add("loading-bar"),
        (t.style.transitionDuration = e + "ms"),
        this.productBlockImageContainer.append(t),
        setTimeout(() => {
          t.classList.add("-in");
        }, 100);
    }
    destroyImageSliderLoadingBar() {
      var e = this.productBlockImageContainer.querySelector(".loading-bar");
      e && e.remove();
    }
    handleWindowResize() {
      if (this.imageWidth && this.productBlock.clientWidth > this.imageWidth)
        for (var e = 0; e < this.widths.length; e++)
          if (
            this.widths[e] >= this.productBlock.clientWidth &&
            this.widths[e] > this.imageWidth
          ) {
            this.destroyImageSlider();
            break;
          }
    }
    bindEvents() {
      (this.focusSwatchHandler = this.handleMouseEnterSwatch.bind(this)),
        (this.mouseEnterSwatchHandler = theme.debounce(
          this.handleMouseEnterSwatch.bind(this),
          150
        )),
        (this.mouseLeaveSwatchHandler = theme.debounce(
          this.handleMouseLeaveSwatch.bind(this),
          150
        )),
        (this.touchDeviceClickHandler = this.handleClickSwatch.bind(this)),
        (this.mouseEnterProductBlockHandler =
          this.handleMouseEnterProductBlock.bind(this)),
        (this.mouseEnterImageContainerHandler =
          this.handleEnterImageContainer.bind(this)),
        (this.mouseLeaveImageContainerHandler =
          this.handleLeaveImageContainer.bind(this)),
        (this.windowResizeHandler = theme.debounce(
          this.handleWindowResize.bind(this)
        )),
        this.productBlock.querySelectorAll(".cc-swatches a").forEach((e) => {
          e.addEventListener("mouseenter", this.mouseEnterSwatchHandler),
            e.addEventListener("focus", this.focusSwatchHandler),
            this.swatches.push(e),
            theme.device.isTouch() &&
              e.addEventListener("click", this.touchDeviceClickHandler);
        }),
        this.swatchesContainer &&
          this.swatchesContainer.addEventListener(
            "mouseleave",
            this.mouseLeaveSwatchHandler
          ),
        this.productBlock.addEventListener(
          "mouseenter",
          this.mouseEnterProductBlockHandler
        ),
        this.imageContainer.addEventListener(
          "mouseenter",
          this.mouseEnterImageContainerHandler
        ),
        this.imageContainer.addEventListener(
          "mouseleave",
          this.mouseLeaveImageContainerHandler
        ),
        window.addEventListener("resize", this.windowResizeHandler);
    }
    destroy() {
      this.swatches.forEach((e) => {
        e.removeEventListener("mouseenter", this.mouseEnterSwatchHandler),
          e.removeEventListener("click", this.touchDeviceClickHandler);
      }),
        this.productBlock.removeEventListener(
          "mouseenter",
          this.mouseEnterProductBlockHandler
        ),
        this.productBlock.removeEventListener(
          "mouseenter",
          this.mouseEnterImageContainerHandler
        ),
        this.productBlock.removeEventListener(
          "mouseleave",
          this.mouseLeaveImageContainerHandler
        ),
        window.removeEventListener("resize", this.windowResizeHandler),
        this.swatchesContainer &&
          this.swatchesContainer.removeEventListener(
            "mouseleave",
            this.mouseLeaveSwatchHandler
          );
    }
  }
  class f extends o {
    constructor() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : "product-block";
      super(
        e,
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : ".cc-".concat(e, ":not(.cc-initialized)")
      );
    }
    init(e) {
      super.init(e), this.registerInstance(e, new p(e));
    }
    destroy(e) {
      this.destroyInstance(e), super.destroy(e);
    }
  }
  new f(),
    (theme.HeaderSection = new (function () {
      var t,
        i = 0;
      (handleScroll = function (o, a, n) {
        "opaque_on_scroll" === n || "opaque_on_scroll_alt" === n
          ? e(window).scrollTop() < 100
            ? o.bar.turnOpaque(!1)
            : o.bar.turnOpaque(!0)
          : "opaque" !== n && o.bar.turnOpaque(!1);
        var s = e(window).scrollTop();
        ("peek" === a || (o.bar.isAnnouncementBar() && "sticky" == a)) &&
        s > 100
          ? ((i = s),
            "sticky" != a &&
              (t < i && s > 100
                ? o.bar.hide(!0)
                : t > i && !(s <= 50) && o.bar.hide(!1)),
            (t = i))
          : o.bar.hide(!1),
          ("sticky" != a && "peek" != a) ||
            (s <= 50 ? o.bar.hideAnnouncement(!1) : o.bar.hideAnnouncement(!0));
      }),
        (this.onSectionLoad = function (t) {
          theme.addControlPaddingToModal(),
            e("body").toggleClass(
              "modal-active",
              e(".theme-modal.reveal").length > 0
            ),
            e("#page-menu a", t).attr("tabindex", "-1"),
            e("#page-menu .main-nav li:has(ul)", t).addClass("has-children"),
            e(
              "#page-menu.nav-uses-modal .main-nav li.has-children > a",
              t
            ).append(
              '<span class="arr">' + theme.icons.chevronRight + "</span>"
            ),
            e(".disclosure", t).each(function () {
              e(this).data("disclosure", new theme.Disclosure(e(this)));
            });
          var o = new theme.Nav(),
            a = o.bar.getPositionSetting(),
            n = o.bar.getOpacitySetting();
          if (
            ("opaque" === n
              ? e("body").addClass("nav-opaque")
              : e("body").removeClass("nav-opaque"),
            "inline" === a
              ? e("body").addClass("nav-inline")
              : e("body").removeClass("nav-inline"),
            "opaque" !== n
              ? e("body").addClass("nav-transparent")
              : e("body").removeClass("nav-transparent"),
            o.bar.isAnnouncementBar()
              ? e("body").addClass("showing-announcement")
              : e("body").removeClass("showing-announcement"),
            ("opaque_on_scroll" === n ||
              "opaque_on_scroll_alt" === n ||
              "peek" === a ||
              o.bar.isAnnouncementBar()) &&
              ((i = 0),
              e(window).on("throttled-scroll.nav", function () {
                handleScroll(o, a, n);
              })),
            e(document).on(
              "click.video-section",
              ".video-container__play",
              function () {
                theme.viewport.isXs() && o.bar.fadeOut(!0);
              }
            ),
            e(document).on(
              "click.video-section",
              ".video-container__stop",
              function () {
                theme.viewport.isXs() && o.bar.fadeOut(!1);
              }
            ),
            o.bar.hasInlineLinks() && o.bar.hasLocalization())
          ) {
            var s = e(".logo", t),
              r = e(".nav-right-side", t);
            e(window)
              .on(
                "debouncedresize.headerSection doNavResizeEvents.headerSection",
                function () {
                  theme.viewport.isXlg() && r.width() > s.width()
                    ? s.css("width", r.outerWidth() - 20 + "px")
                    : s.css("width", "");
                }
              )
              .trigger("doNavResizeEvents");
            var l = new CustomEvent("cc-header-updated");
            window.dispatchEvent(l);
          }
          setTimeout(function () {
            e(".lazyload--manual", t)
              .removeClass("lazyload--manual")
              .addClass("lazyload");
          }, 5e3),
            theme.checkViewportFillers(),
            theme.assessAltLogo(),
            e(window).trigger("cc-header-updated");
        }),
        (this.onSectionUnload = function (t) {
          e(".disclosure", t).each(function () {
            e(this).data("disclosure").unload();
          }),
            e(window).off("throttled-scroll.nav"),
            e(window).off("headerSection"),
            e(document).on("click.video-section");
        });
    })()),
    (theme.FooterSection = new (function () {
      (this.onSectionLoad = function (t) {
        (this.footerSectionElem = t.parentElement),
          e(".disclosure", t).each(function () {
            e(this).data("disclosure", new theme.Disclosure(e(this)));
          }),
          (this.observer = new MutationObserver(
            this.functions.observeMutation.bind(this)
          )),
          t.querySelectorAll(".disclosure__toggle").forEach((e) => {
            this.observer.observe(e, { attributes: !0 });
          });
      }),
        (this.onSectionUnload = function (t) {
          e(".disclosure", t).each(function () {
            e(this).data("disclosure").unload();
          }),
            this.observer.disconnect();
        }),
        (this.functions = {
          observeMutation: function (e) {
            e.forEach((e) => {
              "attributes" === e.type &&
                "aria-expanded" === e.attributeName &&
                this.footerSectionElem.classList.toggle(
                  "disclosure--open",
                  "true" === e.target.getAttribute("aria-expanded")
                );
            });
          },
        });
    })()),
    (theme.SlideshowSection = new (function () {
      (this.onSectionLoad = function (t) {
        theme.initContentSlider(t),
          e(window).trigger("slideshowfillheight"),
          theme.checkViewportFillers(),
          theme.assessAltLogo();
      }),
        (this.onSectionUnload = function (t) {
          e(".slick-slider", t).slick("unslick").off("init"),
            e(window).off(".slideshowSection");
        }),
        (this.onBlockSelect = function (t) {
          e(t)
            .closest(".slick-slider")
            .slick("slickGoTo", e(t).data("slick-index"))
            .slick("slickPause");
        }),
        (this.onBlockDeselect = function (t) {
          e(t).closest(".slick-slider").slick("slickPlay");
        });
    })()),
    (theme.FeaturedBlogSection = new (function () {
      (this.onSectionLoad = function (t) {
        if (e(".carousel-blog", t).length) {
          var i = e(".swiper-container", t);
          1 === i.length && theme.initProductSlider(i, !0);
        }
        if (e(".slideshow-blog", t).length) {
          theme.initContentSlider(t, function (i) {
            e(".slideshow-blog__titles__active", t).removeClass(
              "slideshow-blog__titles__active"
            ),
              e('[data-go-to-slide="'.concat(i, '"]'), t)
                .parent()
                .addClass("slideshow-blog__titles__active");
          });
          var o = e(".slideshow-blog__titles", t);
          if (e('.slideshow[data-title-navigation="true"]', t).length) {
            function a() {
              theme.viewport.isSm()
                ? e(".overlay-type .inner", t).css(
                    "padding-bottom",
                    o.height() + 50 + "px"
                  )
                : e(".overlay-type .inner", t).removeAttr("style");
            }
            a(),
              e(window).on("debouncedresize.titleNavHeight", a),
              e("[data-go-to-slide]", t).on("click", function () {
                var i = e(this).data("go-to-slide");
                return (
                  e(".slideshow", t).slick("slickGoTo", i).slick("slickPause"),
                  e(".slideshow-blog", t).addClass("slideshow--paused"),
                  !1
                );
              }),
              e("[data-go-to-slide]:first", t)
                .parent()
                .addClass("slideshow-blog__titles__active");
          }
          e(window).trigger("slideshowfillheight");
        }
        theme.checkViewportFillers(), theme.assessAltLogo();
      }),
        (this.onSectionUnload = function (t) {
          e(".slick-slider", t).slick("unslick").off("init"),
            e(window).off("debouncedresize.titleNavHeight"),
            e("[data-go-to-slide]", t).off("click");
        });
    })()),
    (theme.ImageWithTextOverlay = new (function () {
      var t = this;
      (t.checkTextOverImageHeights = function () {
        e(
          '[data-section-type="image-with-text-overlay"], [data-nested-section-type="image-with-text-overlay"]'
        ).each(function () {
          var t = e(".rimage-outer-wrapper", this),
            i = e(".rimage-wrapper", this).outerHeight(),
            o = parseInt(e(".overlay", this).css("padding-top")),
            a = e(".overlay__content", this).height() + 2 * o;
          a > i + 2 ? t.css("height", a) : t.css("height", "");
        });
      }),
        (this.onSectionLoad = function (i) {
          e(window).off(".imageWithTextOverlaySection"),
            e(".overlay__content", i).length &&
              (e(t.checkTextOverImageHeights),
              e(window).on(
                "debouncedresize.imageWithTextOverlaySection",
                t.checkTextOverImageHeights
              )),
            theme.checkViewportFillers();
        }),
        (this.onSectionUnload = function (t) {
          e(window).off(".imageWithTextOverlaySection");
        });
    })()),
    (theme.ImageBesideImageSection = new (function () {
      var t = this;
      (t.checkTextOverImageHeights = function () {
        e(".image-beside-image__image").each(function () {
          var t = e(".rimage-outer-wrapper", this),
            i = e(".rimage-wrapper", this).outerHeight(),
            o = parseInt(e(".overlay", this).css("padding-top")),
            a = e(".overlay__content", this).height() + 2 * o;
          a > i + 2 ? t.css("height", a) : t.css("height", "");
        });
      }),
        (this.onSectionLoad = function (i) {
          e(window).off(".imageBesideImageSection"),
            e(".overlay__content", i).length &&
              (e(t.checkTextOverImageHeights),
              e(window).on(
                "debouncedresize.imageBesideImageSection",
                t.checkTextOverImageHeights
              )),
            theme.checkViewportFillers();
        }),
        (this.onSectionUnload = function (t) {
          e(window).off(".imageBesideImageSection");
        });
    })()),
    (theme.ProductTemplateSection = new (function () {
      var t = theme.Nav(),
        i = {};
      (this.onSectionLoad = function (o) {
        var a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          n = new Date().getTime();
        e(o).attr("data-section-id", n);
        var s = e(o).data("is-featured-product") || !1;
        s ||
          a ||
          !e("[data-store-availability-container]", o).length ||
          (this.storeAvailability = new theme.StoreAvailability(
            e("[data-store-availability-container]", o)[0]
          )),
          theme.checkViewportFillers(),
          theme.assessAltLogo(),
          !t.bar.isCurrentlyOpaque() ||
            s ||
            a ||
            e("body").removeClass("header-section-overlap");
        var r = e(".theme-gallery", o);
        if (
          (r.length > 0 &&
            (i[n] = new theme.ProductMediaGallery(
              r,
              e(".theme-gallery-thumb", o),
              s,
              a,
              n
            )),
          !s)
        ) {
          var l = e(".product-area__add-to-cart-xs", o),
            c = !l.length,
            d = !1,
            h = e(".section-product-template")[0];
          function u() {
            theme.viewport.isXs() &&
              (c ||
                a ||
                (e(window).on(
                  "throttled-scroll.sticky-add-to-cart",
                  function () {
                    h.getBoundingClientRect().bottom < e(window).outerHeight()
                      ? d || (l.addClass("-out"), (d = !0))
                      : d && (l.removeClass("-out"), (d = !1));
                  }
                ),
                e(".product-area__add-to-cart-xs button", o).on(
                  "click",
                  function (t) {
                    e(
                      ".product-detail__form form.product-purchase-form:first",
                      o
                    ).submit();
                  }
                ),
                (c = !0)));
          }
          e(window).on("debouncedresizewidth.productDetails".concat(n), u),
            e(window).on("cc-header-updated.productDetails".concat(n), u),
            e(window).on("shopify:section:reorder.productDetails".concat(n), u),
            u();
        }
        theme.convertOptionsToBoxes(o),
          theme.OptionManager.initProductOptions(e(o)),
          e("select:not(.original-selector)")
            .selectReplace()
            .closest(".selector-wrapper")
            .addClass("has-pretty-select"),
          e(".size-chart-link", o).on("click", function () {
            return (
              e.colorbox({
                inline: !0,
                fixed: !0,
                maxHeight: "80%",
                href: "#size-chart-content > .size-chart",
                onOpen: () => {
                  theme.viewport.scroll.lock();
                },
                onClosed: () => {
                  theme.viewport.scroll.unlock();
                },
              }),
              !1
            );
          }),
          e(window).on(
            "cc-variant-updated.product-swatches".concat(n),
            (t, i) => {
              var a = e(".cc-swatches", o);
              a.length &&
                (a.find(".cc-swatches__label").remove(),
                a
                  .find("label")
                  .append(
                    '<span class="cc-swatches__label">'.concat(
                      a.find(".active").text(),
                      "</span>"
                    )
                  ));
            }
          ),
          theme.initAnimateOnScroll(),
          theme.checkViewportFillers(),
          theme.initShopifyPaymentButtons(e(o));
      }),
        (this.onSectionUnload = function (t, o) {
          var a = e(t).attr("data-section-id");
          o || e(window).off("throttled-scroll.sticky-add-to-cart"),
            e(window).off(".productDetails".concat(a)),
            e(window).off("cc-variant-updated.product-swatches".concat(a)),
            e(".spr-container", t).off("click"),
            e(".theme-gallery-thumb", t).off("click"),
            e(".size-chart-link", t).off("click"),
            e(".product-area__add-to-cart-xs button", t).off("click"),
            theme.OptionManager.unloadProductOptions(e(t)),
            i[a] ? i[a].destroy() : console.warn("No galleries found"),
            this.storeAvailability &&
              !o &&
              this.storeAvailability.onSectionUnload();
        });
    })()),
    (theme.FilterManager = new (function () {
      (this.onSectionLoad = function (t) {
        (this.namespace = theme.namespaceFromSection(t)),
          (this.$container = e(t)),
          this.$container.data("ajax-filtering")
            ? (this.$container.on(
                "click" + this.namespace,
                ".pagination a,.active-filter-controls a",
                this.functions.ajaxLoadLink.bind(this)
              ),
              this.$container.on(
                "change" + this.namespace + " submit" + this.namespace,
                "#FacetsForm",
                theme.debounce(this.functions.ajaxLoadForm.bind(this), 700)
              ),
              this.registerEventListener(
                window,
                "popstate",
                this.functions.ajaxPopState.bind(this)
              ))
            : this.$container.on(
                "change" + this.namespace,
                "#FacetsForm",
                this.functions.submitForm
              ),
          this.$container.on(
            "click" + this.namespace,
            "[data-show-filter]",
            this.functions.toggleFilter.bind(this)
          ),
          this.$container.on(
            "submit" + this.namespace,
            "#search-page-form",
            this.functions.updateSearchQuery.bind(this)
          ),
          theme.loadInfiniteScroll(t),
          this.functions.refreshSelects();
      }),
        (this.onSectionUnload = function (t) {
          this.$container.off(this.namespace),
            e(window).off(this.namespace),
            e(document).off(this.namespace),
            theme.unloadInfiniteScroll();
        }),
        (this.functions = {
          submitForm: function (e) {
            e.currentTarget.submit();
          },
          updateSearchQuery: function (t) {
            var i = this.$container.find("#FacetsForm");
            i.length &&
              (t.preventDefault(),
              i
                .find('[name="q"]')
                .val(e(t.currentTarget).find('[name="q"]').val()),
              this.$container.data("ajax-filtering")
                ? this.functions.ajaxLoadForm.bind(this)({
                    type: null,
                    currentTarget: i[0],
                  })
                : i.submit());
          },
          toggleFilter: function () {
            var t = e("[data-show-filter]", this.$container),
              i = e(".cc-product-filter", this.$container),
              o = theme.Nav();
            return (
              i.hasClass("-in")
                ? (t.text(t.data("open-text")), o.bar.fadeOut(!1))
                : (t.text(t.data("close-text")), o.bar.fadeOut(!0)),
              i.toggleClass("-in"),
              !1
            );
          },
          ajaxLoadLink: function (t) {
            t.preventDefault(),
              this.functions.ajaxLoadUrl.call(
                this,
                e(t.currentTarget).attr("href")
              );
          },
          ajaxLoadForm: function (e) {
            "submit" === e.type && e.preventDefault();
            var t = [];
            e.currentTarget.querySelectorAll("input, select").forEach((e) => {
              (("checkbox" !== e.type && "radio" !== e.type) || e.checked) &&
                "" !== e.value &&
                ("" === e.value && e.dataset.currentValue
                  ? t.push([e.name, encodeURIComponent(e.dataset.currentValue)])
                  : t.push([e.name, encodeURIComponent(e.value)]));
            }),
              e.currentTarget
                .querySelectorAll("[data-current-value]")
                .forEach((e) => {
                  e.setAttribute("value", e.dataset.currentValue);
                });
            var i = new FormData(e.currentTarget),
              o = new URLSearchParams(i).toString();
            this.functions.ajaxLoadUrl.call(this, "?" + o);
          },
          ajaxPopState: function (e) {
            this.functions.ajaxLoadUrl.call(this, document.location.href);
          },
          initFilterResults: function () {
            theme.loadInfiniteScroll(this.container),
              theme.inlineVideos.init(this.container),
              theme.initAnimateOnScroll();
            var t = this.$container.closest("[data-components]");
            t.length &&
              t
                .data("components")
                .split(",")
                .forEach(
                  function (i) {
                    e(document).trigger("cc:component:load", [i, t[0]]);
                  }.bind(this)
                );
          },
          refreshSelects: function () {
            e("select:not(.original-selector)", this.$container)
              .selectReplace()
              .closest(".selector-wrapper")
              .addClass("has-pretty-select");
          },
          ajaxLoadUrl: function (t) {
            var i = this,
              o = t;
            "/" === o.slice(0, 1) &&
              (o = window.location.protocol + "//" + window.location.host + o);
            var a = "[data-ajax-container]",
              n = this.$container.find(a);
            n.addClass("cc-product-filter-container--loading"),
              n
                .find(".product-list")
                .append(
                  '<span class="loading" aria-label="'
                    .concat(theme.strings.loading, '">')
                    .concat(theme.icons.loading, " </span>")
                ),
              theme.unloadInfiniteScroll(this.$container),
              theme.inlineVideos.destroy(this.$container),
              this.currentAjaxLoadUrlFetch &&
                this.currentAjaxLoadUrlFetch.abort(),
              (this.currentAjaxLoadUrlFetch = e.get(
                t,
                function (t) {
                  this.currentAjaxLoadUrlFetch = null;
                  var s = e(e.parseHTML(t)).filter("title").text().trim();
                  (document.title = s),
                    window.history.pushState({ path: o }, s, o),
                    document.activeElement &&
                      (this.activeElementId = document.activeElement.id),
                    e("<div>".concat(t, "</div>"))
                      .find(a)
                      .each(function (t) {
                        var o = e(this);
                        e(n[t])
                          .find(".cc-accordion-item")
                          .each(function () {
                            var t = e(this).closest(".cc-accordion").index();
                            e(this).hasClass("is-open")
                              ? o
                                  .find(
                                    ".cc-accordion:nth-child(".concat(
                                      t + 1,
                                      ") .cc-accordion-item"
                                    )
                                  )
                                  .addClass("is-open")
                                  .attr("open", "")
                              : o
                                  .find(
                                    ".cc-accordion:nth-child(".concat(
                                      t + 1,
                                      ") .cc-accordion-item"
                                    )
                                  )
                                  .removeClass("is-open")
                                  .removeAttr("open");
                          }),
                          e(".cc-product-filter", i.$container).length &&
                            e(".cc-product-filter", i.$container).hasClass(
                              "-in"
                            ) &&
                            o.find(".cc-product-filter").addClass("-in"),
                          e(n[t]).html(o.html()),
                          i.functions.refreshSelects();
                      }),
                    this.functions.initFilterResults.call(this);
                  var r = e(".cc-product-filter", i.$container),
                    l = e("[data-show-filter]", i.$container);
                  if (r.length && r.hasClass("-in")) {
                    var c,
                      d = e(".product-list", i.$container).data("result-count");
                    (c =
                      1 === d
                        ? l.data("result-count-text-singular").replace("[x]", d)
                        : l.data("result-count-text").replace("[x]", d)),
                      l.text(c);
                  }
                  if (
                    (n.removeClass("cc-product-filter-container--loading"),
                    this.activeElementId)
                  ) {
                    var h = document.getElementById(this.activeElementId);
                    h && h.focus();
                  }
                  var u = e("[data-ajax-scroll-to]:first", this.$container);
                  e(window).scrollTop() - 200 > u.offset().top &&
                    theme.viewport.scroll.to(u, -1, 25);
                }.bind(this)
              ));
          },
        });
    })()),
    (theme.ListCollectionsSection = new (function () {
      this.onSectionLoad = function (e) {};
    })()),
    (theme.BlogTemplateSection = new (function () {
      this.onSectionLoad = function (t) {
        e("select").selectReplace(), theme.allowRTEFullWidthImages(t);
      };
    })()),
    (theme.ArticleTemplateSection = new (function () {
      this.onSectionLoad = function (e) {
        theme.checkViewportFillers(),
          theme.assessAltLogo(),
          theme.allowRTEFullWidthImages(e);
      };
    })()),
    (theme.CartTemplateSection = new (function () {
      (this.onSectionLoad = function (t) {
        theme.cartNoteMonitor.load(e('#cartform [name="note"]', t)),
          e("#cartform input#terms", t).length > 0 &&
            e(document).on(
              "click.cartTemplateSection",
              '#cartform [name="checkout"]:submit, .additional-checkout-buttons :submit, .additional-checkout-buttons input[type=image], a[href="/checkout"]',
              function () {
                if (0 == e("#cartform input#terms:checked").length)
                  return alert(theme.strings.cartConfirmation), !1;
              }
            );
      }),
        (this.onSectionUnload = function (t) {
          theme.cartNoteMonitor.unload(e('#cartform [name="note"]', t)),
            e(document).off(".cartTemplateSection");
        });
    })()),
    (theme.CollectionListSection = new (function () {
      this.onSectionLoad = function (t) {
        var i = e(".swiper-container", t);
        1 === i.length && theme.initProductSlider(i);
      };
    })()),
    (theme.FeaturedCollectionSection = new (function () {
      this.onSectionLoad = function (t) {
        var i = e(".swiper-container", t);
        1 === i.length && theme.initProductSlider(i);
      };
    })()),
    (theme.ProductRecommendations = new (function () {
      (this.onSectionLoad = function (t) {
        var i = document.querySelector(".product-recommendations");
        if (null !== i) {
          var o = new XMLHttpRequest();
          o.open("GET", i.dataset.url, !0),
            (o.onload = function () {
              if (o.status >= 200 && o.status < 300) {
                var t = document.createElement("div");
                (t.innerHTML = o.response),
                  (i.innerHTML = t.querySelector(
                    ".product-recommendations"
                  ).innerHTML),
                  theme.initAnimateOnScroll();
                var a = e(".section-product-recommendations .swiper-container");
                1 === a.length
                  ? (theme.initProductSlider(a),
                    setTimeout(() => {
                      theme.inlineVideos.init(i.parentElement), new f();
                    }, 500))
                  : console.warn(
                      "Unable to find .section-product-recommendations"
                    );
              }
            }),
            o.send();
        }
      }),
        (this.onSectionUnload = function (e) {
          theme.inlineVideos.destroy(e);
        });
    })()),
    (theme.GallerySection = new (function () {
      (this.onSectionLoad = function (t) {
        var i = e(".gallery--mobile-carousel", t);
        if (i.length) {
          var o = function () {
            var t = i.hasClass("slick-slider"),
              o = theme.viewport.isXs();
            if (
              (o ||
                e(".lazyload--manual", i)
                  .removeClass("lazyload--manual")
                  .addClass("lazyload"),
              t && !o)
            ) {
              i.slick("unslick").off("init"),
                i.removeAttr("data-transition"),
                i.removeClass("slideshow"),
                i
                  .find("a, .gallery__item")
                  .removeAttr("tabindex")
                  .removeAttr("role");
              var a = i.data("grid"),
                n = null;
              i.find(".gallery__item").each(function (t) {
                t % a == 0 && (n = e('<div class="gallery__row">').appendTo(i)),
                  e(this).appendTo(n);
              });
            } else
              !t &&
                o &&
                (i.find("[data-cc-animate]").removeAttr("data-cc-animate"),
                i.find(".gallery__item").appendTo(i).addClass("slide"),
                i.find(".gallery__row").remove(),
                i.attr("data-transition", "slide"),
                i.addClass("slideshow"),
                i
                  .on("init", function () {
                    e(".lazyload--manual", this)
                      .removeClass("lazyload--manual")
                      .addClass("lazyload");
                  })
                  .slick({
                    autoplay: !1,
                    fade: !1,
                    speed: 600,
                    infinite: !0,
                    useTransform: !0,
                    arrows: !1,
                    dots: !0,
                    cssEase: "cubic-bezier(0.25, 1, 0.5, 1)",
                    customPaging: function (e, t) {
                      return '<button class="custom-dot" type="button" data-role="none" role="button" tabindex="0"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" xml:space="preserve"><circle class="circle-one" cx="15" cy="15" r="13" /><circle class="circle-two" cx="15" cy="15" r="13" /></svg></button>';
                    },
                  })
                  .on("beforeChange", function (t, i, o, a) {
                    e(i.$slides.get(o)).addClass("slick--leaving");
                  })
                  .on("afterChange", function (t, i, o) {
                    e(i.$slides)
                      .filter(".slick--leaving")
                      .removeClass("slick--leaving");
                  }));
          };
          o(), e(window).on("debouncedresize.themeSection" + t.id, o);
        }
      }),
        (this.onSectionUnload = function (t) {
          e(window).off(".themeSection" + t.id),
            e(".slick-slider", t).each(function () {
              e(this).slick("unslick").off("init");
            });
        }),
        (this.onBlockSelect = function (t) {
          e(t)
            .closest(".slick-slider")
            .each(function () {
              e(this)
                .slick("slickGoTo", e(this).data("slick-index"))
                .slick("slickPause");
            });
        }),
        (this.onBlockDeselect = function (t) {
          e(t)
            .closest(".slick-slider")
            .each(function () {
              e(this).slick("slickPlay");
            });
        });
    })()),
    (theme.TestimonialsSection = new (function () {
      var e;
      (this.onSectionLoad = function (t) {
        theme.settings.animationEnabledDesktop &&
          theme.viewport.isSm() &&
          (e = new Scrollax(window).init());
      }),
        (this.onSectionUnload = function (t) {
          e && e.Scrollax && e.Scrollax("destroy");
        });
    })()),
    (theme.AccordionSection = new (function () {
      (this.onSectionLoad = function (e) {
        var t = new CustomEvent("cc-accordion-load");
        window.dispatchEvent(t);
      }),
        (this.onBlockSelect = function (e) {
          var t = e.querySelector(
            ".cc-accordion-item:not(.is-open) .cc-accordion-item__title"
          );
          t && t.click();
        }),
        (this.onSectionUnload = function (e) {
          var t = new CustomEvent("cc-accordion-unload");
          window.dispatchEvent(t);
        });
    })()),
    (theme.FaqSection = new (function () {
      (this.onSectionLoad = function (e) {
        this.intersectionObserver,
          (this.namespace = theme.namespaceFromSection(e)),
          (this.container = e),
          (this.pageContent = document.getElementById("page-content")),
          (this.sidebar = document.getElementById("faq-sidebar")),
          (this.accordions = this.pageContent.querySelectorAll(
            ".cc-accordion-item__title"
          )),
          (this.isScrolling = !1),
          (this.classNames = { questionContainerHidden: "hidden" }),
          this.functions.initFaqSections.call(this),
          window.addEventListener(
            "shopify:section:load",
            this.functions.delayedInitFaqSections.bind(this)
          ),
          window.addEventListener(
            "shopify:section:unload",
            this.functions.delayedInitFaqSections.bind(this)
          ),
          window.addEventListener(
            "shopify:section:reorder",
            this.functions.initFaqSections.bind(this)
          ),
          (this.searchInput =
            this.container.querySelector("#faq-search__input")),
          this.searchInput &&
            (this.registerEventListener(
              this.searchInput,
              "change",
              this.functions.performSearch.bind(this)
            ),
            this.registerEventListener(
              this.searchInput,
              "keyup",
              this.functions.performSearch.bind(this)
            ),
            this.registerEventListener(
              this.searchInput,
              "paste",
              this.functions.performSearch.bind(this)
            )),
          "true" === this.container.dataset.sidebarEnabled &&
            (this.functions.initSidebar.call(this),
            window.addEventListener(
              "resize",
              this.functions.debounceUpdateSidebarPosition
            ),
            window.addEventListener(
              "shopify:section:load",
              this.functions.delayedInitSidebar.bind(this)
            ),
            window.addEventListener(
              "shopify:section:unload",
              this.functions.delayedInitSidebar.bind(this)
            ),
            window.addEventListener(
              "shopify:section:reorder",
              this.functions.initSidebar.bind(this)
            ),
            this.accordions.forEach((e) => {
              e.addEventListener(
                "click",
                this.functions.debounceUpdateSidebarPosition
              );
            }),
            document.body.classList.add("faq-sidebar-enabled"));
      }),
        (this.onSectionUnload = function (e) {
          "true" === this.container.dataset.sidebarEnabled &&
            (window.removeEventListener(
              "resize",
              this.functions.debounceUpdateSidebarPosition
            ),
            window.removeEventListener(
              "shopify:section:load",
              this.functions.delayedInitSidebar
            ),
            window.removeEventListener(
              "shopify:section:unload",
              this.functions.delayedInitSidebar
            ),
            window.removeEventListener(
              "shopify:section:reorder",
              this.functions.initSidebar
            ),
            document.body.classList.remove("faq-sidebar-enabled")),
            window.removeEventListener(
              "shopify:section:load",
              this.functions.delayedInitFaqSections
            ),
            window.removeEventListener(
              "shopify:section:unload",
              this.functions.delayedInitFaqSections
            ),
            window.removeEventListener(
              "shopify:section:reorder",
              this.functions.initFaqSections
            ),
            document.querySelectorAll(".section-faq-accordion").forEach((e) => {
              e.classList.remove("section-faq-accordion");
            }),
            this.intersectionObserver &&
              this.pageContent
                .querySelectorAll(".section-faq-accordion h2 a")
                .forEach((e) => this.intersectionObserver.unobserve(e)),
            this.accordions.forEach((e) => {
              e.removeEventListener(
                "click",
                this.functions.updateSidebarPosition
              );
            }),
            this.pageContent.classList.remove("faq-search-active");
        }),
        (this.functions = {
          initFaqSections: function () {
            this.pageContent
              .querySelectorAll(".section-faq-accordion")
              .forEach((e) => e.classList.remove("section-faq-accordion"));
            var e = !1,
              t = !1;
            this.pageContent
              .querySelectorAll(".shopify-section")
              .forEach((i) => {
                e
                  ? i.classList.contains("section-accordion") && !1 === t
                    ? i.classList.add("section-faq-accordion")
                    : (t = !0)
                  : i.classList.contains("section-faq") && (e = !0);
              });
          },
          delayedInitFaqSections: function () {
            setTimeout(this.functions.initFaqSections.bind(this), 10);
          },
          performSearch: function () {
            setTimeout(
              (() => {
                var e = this.searchInput.value.toLowerCase().split(" "),
                  t = this.pageContent.querySelectorAll(
                    ".section-faq-accordion .cc-accordion"
                  ),
                  i = [];
                e.forEach((e) => {
                  e.length > 0 && i.push(e);
                }),
                  i.length > 0
                    ? this.pageContent.classList.add("faq-search-active")
                    : this.pageContent.classList.remove("faq-search-active");
                var o = this.pageContent.querySelectorAll(
                  ".section-faq-accordion"
                );
                o &&
                  o.forEach((e) => {
                    e.classList.remove("faq-first-answer"),
                      i.length > 0
                        ? (e.dataset.foundCount = "0")
                        : e.removeAttribute("data-found-count");
                  });
                var a = !0;
                if (
                  (t.forEach(
                    ((e) => {
                      var t = 0;
                      if (i.length) {
                        var o = !1,
                          n = e.textContent.toLowerCase();
                        i.forEach((t) => {
                          n.includes(t) &&
                            (a &&
                              e
                                .closest(".section-accordion")
                                .classList.add("faq-first-answer"),
                            (o = !0),
                            (a = !1));
                        }),
                          o
                            ? (e.classList.remove(
                                this.classNames.questionContainerHidden
                              ),
                              t++)
                            : e.classList.add(
                                this.classNames.questionContainerHidden
                              );
                      } else
                        e.classList.remove(
                          this.classNames.questionContainerHidden
                        );
                      var s = e.closest(".section-accordion");
                      s.dataset.foundCount = parseInt(s.dataset.foundCount) + t;
                    }).bind(this)
                  ),
                  a && i.length
                    ? this.container.classList.add("faq-no-results")
                    : this.container.classList.remove("faq-no-results"),
                  "true" === this.container.dataset.sidebarEnabled)
                ) {
                  var n = this.sidebar.querySelector(".faq-sidebar--active");
                  n && n.classList.remove("faq-sidebar--active"),
                    this.sidebar.querySelectorAll("a").forEach((e) => {
                      var t = e.getAttribute("href").replace("#", ""),
                        i = document.getElementById(t);
                      i &&
                        (null === i.offsetParent
                          ? e.classList.add("faq-sidebar--disabled")
                          : (e.classList.remove("faq-sidebar--disabled"),
                            this.sidebar.querySelector(
                              ".faq-sidebar--active"
                            ) || e.classList.add("faq-sidebar--active")));
                    }),
                    this.functions.updateSidebarPosition();
                }
              }).bind(this),
              10
            );
          },
          initSidebar: function () {
            var e = "";
            this.pageContent
              .querySelectorAll(".section-faq-accordion .section-heading h2")
              .forEach((t, i) => {
                var o = t.innerText,
                  a =
                    "faq-" + JSON.stringify(o.toLowerCase()).replace(/\W/g, "");
                (t.innerHTML = '<a id="'.concat(a, '"></a>').concat(o)),
                  (e += '<li><a href="#'
                    .concat(a, '" ')
                    .concat(0 === i ? 'class="faq-sidebar--active"' : "", ">")
                    .concat(o, "</a></li>"));
              });
            var t = new theme.Nav(),
              i = t.bar.hasStickySetting() ? t.bar.height() + 50 : 50;
            (this.sidebar.innerHTML =
              '<div class="faq-sidebar__inner" style="top: '
                .concat(parseInt(i), 'px">\n          ')
                .concat(
                  this.container.dataset.sidebarTitle
                    ? "<h3>" + this.container.dataset.sidebarTitle + "</h3>"
                    : "",
                  "\n          <ol>"
                )
                .concat(e, "</ol>\n        </div>")),
              this.sidebar.querySelectorAll("a").forEach((e) => {
                this.registerEventListener(
                  e,
                  "click",
                  this.functions.handleIndexClick.bind(this)
                );
              }),
              "IntersectionObserver" in window &&
                ((this.intersectionObserver = new IntersectionObserver(
                  (e, t) => {
                    e.forEach((e) => {
                      e.isIntersecting &&
                        !this.isScrolling &&
                        this.sidebar.querySelectorAll("a").forEach((t) => {
                          t.getAttribute("href").replace("#", "") ===
                          e.target.getAttribute("id")
                            ? t.classList.add("faq-sidebar--active")
                            : t.classList.remove("faq-sidebar--active");
                        });
                    });
                  },
                  { rootMargin: "0px 0px -70%" }
                )),
                this.pageContent
                  .querySelectorAll(".section-faq-accordion h2 a")
                  .forEach((e) => this.intersectionObserver.observe(e))),
              this.functions.updateSidebarPosition();
          },
          delayedInitSidebar: function () {
            setTimeout(this.functions.initSidebar.bind(this), 20);
          },
          updateSidebarPosition: function () {
            var e = document.getElementById("faq-sidebar"),
              t = document.querySelector(".section-faq"),
              i = !1,
              o = null;
            if (t) {
              document
                .querySelectorAll("#page-content .shopify-section")
                .forEach((e) => {
                  i
                    ? null !== o ||
                      e.classList.contains("section-accordion") ||
                      (o = e)
                    : e.classList.contains("section-faq") && (i = !0);
                }),
                o || (o = document.querySelector(".section-footer"));
              var a =
                  t.getBoundingClientRect().top +
                  document.documentElement.scrollTop,
                n = window
                  .getComputedStyle(document.body)
                  .getPropertyValue("padding-top");
              if (
                ((n = parseInt(n.replace("px", ""))),
                (e.style.top = a - n + "px"),
                o)
              ) {
                var s =
                  o.getBoundingClientRect().top +
                  document.documentElement.scrollTop;
                e.style.height = s - a + "px";
                var r = e.querySelector(".faq-sidebar__inner");
                r && (r.style.maxHeight = s - a - 100 + "px");
              }
            }
          },
          debounceUpdateSidebarPosition: theme.debounce(
            () => this.functions.updateSidebarPosition
          ),
          handleIndexClick: function (e) {
            e.preventDefault();
            var t = this.sidebar.querySelector(".faq-sidebar--active");
            t && t.classList.remove("faq-sidebar--active"),
              e.target.classList.add("faq-sidebar--active"),
              (this.isScrolling = !0),
              theme.viewport.scroll.to(
                e.currentTarget.getAttribute("href"),
                -1,
                50,
                () => {
                  this.isScrolling = !1;
                }
              );
          },
        });
    })()),
    jQuery(function (e) {
      lazySizesConfig.minSize = 200;
      var t = theme.Nav();
      e("select:not(.original-selector)")
        .selectReplace()
        .closest(".selector-wrapper")
        .addClass("has-pretty-select"),
        e("a[rel=lightbox]").colorbox(),
        theme.viewport.isSm() &&
          e('a[rel="gallery"]').colorbox({ rel: "gallery" }),
        e.extend(e.colorbox.settings, {
          previous: theme.strings.colorBoxPrevious,
          next: theme.strings.colorBoxNext,
          close: theme.icons.close,
        }),
        e(".rte a img").closest("a").addClass("contains-img"),
        (theme.lastViewportWidth = 0),
        e(window).on("debouncedresize slideshowfillheight", function (i) {
          if (
            "debouncedresize" != i.type ||
            theme.lastViewportWidth != e(window).width()
          ) {
            var o = e(window).height();
            t.bar.isAnnouncementBar() && (o -= t.bar.heightOfAnnouncementBar()),
              e(
                ".slideshow.fill-viewport, .slideshow.fill-viewport .slide"
              ).css("min-height", o),
              e(".slideshow.fill-viewport").each(function () {
                var t = 0;
                e(this)
                  .find(".slide")
                  .each(function () {
                    var i = 0;
                    e(".fill-viewport__contain", this).each(function () {
                      i += e(this).outerHeight(!0);
                    }),
                      t < i && (t = i);
                  }),
                  t > o &&
                    (e(this).css("min-height", t),
                    e(".slide", this).css("min-height", t));
              }),
              (theme.lastViewportWidth = e(window).width()),
              e("body.header-section-overlap").length &&
              t.bar.isAnnouncementBar()
                ? e("#page-content").css(
                    "margin-top",
                    t.bar.heightOfAnnouncementBar()
                  )
                : e("#page-content").css("margin-top", "");
          }
        }),
        e(window).on("scroll assessFeatureHeaders", function () {
          var t = e(window).scrollTop(),
            i = t + e(window).height() - 60;
          e("body").toggleClass("scrolled-down", t > 0),
            theme.assessAltLogo(),
            e(".feature-header:not(.feature-header--visible)")
              .filter(function () {
                var o = e(this).offset().top;
                return o + e(this).outerHeight() >= t && o <= i;
              })
              .addClass("feature-header--visible");
        }),
        (e.fn.slideUpAndRemove = function () {
          var t =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 200;
          e(this).each(function () {
            e(this).slideUp(t, function () {
              e(this).remove();
            });
          });
        });
      var i = ["_root"];
      updateNavCtas = function () {
        var t = i[i.length - 1],
          a = e(
            '#page-menu .nav-ctas__container[data-for-nav-item="'.concat(
              t,
              '"]:hidden'
            )
          );
        a.length > 0
          ? e("#page-menu .nav-ctas__container:visible").length
            ? e("#page-menu .nav-ctas__container:visible").fadeOut(
                o,
                function () {
                  a.fadeIn(o);
                }
              )
            : setTimeout(function () {
                a.fadeIn(o);
              }, o)
          : e("#page-menu .nav-ctas__container:visible").fadeOut(o);
      };
      var o = 250;
      function a() {
        return e("#page-content").outerHeight() > e(window).height();
      }
      e(document).on(
        "click",
        "#page-menu.nav-uses-modal .main-nav li.has-children > a",
        function () {
          var t = e(this)
            .text()
            .replace(/^\s\s*/, "")
            .replace(/\s\s*$/, "")
            .toLowerCase();
          i.push(t);
          var a = e('<div class="container growth-area"/>').append(
              e(this)
                .siblings("ul")
                .clone()
                .wrap('<div class="nav-body main-nav growth-area"/>')
                .parent()
            ),
            n = a
              .find(".main-nav > ul")
              .wrap("<li/>")
              .parent()
              .wrap("<ul/>")
              .parent();
          theme.strings.back.length > 0 &&
            n.prepend(
              '<li class="main-nav__back" data-nav-title="'
                .concat(
                  t,
                  '"><a href="#" data-revert-back><span class="arr arr--left">'
                )
                .concat(theme.icons.chevronLeft, "</span>")
                .concat(theme.strings.back, "</a></li>")
            );
          var s = e(
            "#page-menu > .inner > .nav-container > .container:not(.inactive)"
          );
          return (
            s.addClass("inactive").fadeOut(o, function () {
              a.hide().insertAfter(s.last()).fadeIn(o),
                a.closest(".theme-modal").focus();
            }),
            updateNavCtas(),
            e(
              "#page-menu > .inner > .nav-container > .nav-footer-links"
            ).fadeOut(o),
            !1
          );
        }
      ),
        e(document).on(
          "click",
          "#page-menu.nav-uses-modal a[data-revert-back]",
          function () {
            return (
              i.pop(),
              updateNavCtas(),
              e(
                "#page-menu.nav-uses-modal > .inner > .nav-container > .container:not(.inactive)"
              ).fadeOutAndRemove(o, function () {
                var t = e(
                  "#page-menu.nav-uses-modal > .inner > .nav-container > .container.inactive:last"
                );
                t.removeClass("inactive").fadeIn(o),
                  t.data("root-nav") &&
                    e(
                      "#page-menu > .inner > .nav-container > .nav-footer-links"
                    ).fadeIn(o);
              }),
              !1
            );
          }
        ),
        e(document)
          .on("reset-modal", "#page-menu.nav-uses-modal", function () {
            return (
              closeThemeModal(),
              setTimeout(function () {
                e(
                  "#page-menu.nav-uses-modal > .inner > .nav-container > .container"
                )
                  .removeClass("inactive")
                  .show()
                  .slice(1)
                  .remove();
              }, 300),
              !1
            );
          })
          .on("click", "a[data-reset-and-close]", function () {
            return e("#page-menu.nav-uses-modal").trigger("reset-modal"), !1;
          }),
        (theme.lastHoverInteractionTimestamp = -1),
        e(document).on(
          "click keydown",
          ".multi-level-nav .nav-rows .contains-children > a",
          function (t) {
            if ("click" == t.type || "Enter" == t.key)
              return e(this).parent().find("ul:first").slideToggle(300), !1;
          }
        ),
        e(document).on(
          theme.device.isTouch()
            ? "click forceopen forceclose"
            : "forceopen forceclose",
          ".multi-level-nav .contains-mega-menu a.has-children",
          function (t) {
            if (
              (e(".nav-ctas__cta .lazyload--manual")
                .removeClass("lazyload--manual")
                .addClass("lazyload"),
              e(this).hasClass("column-title"))
            )
              return !0;
            var i = 200,
              o = Date.now();
            if (
              "click" == t.type &&
              o - theme.lastHoverInteractionTimestamp < 500
            )
              return !1;
            ("forceopen" != t.type && "forceclose" != t.type) ||
              (theme.lastHoverInteractionTimestamp = o);
            var a = e(this).closest('[class^="tier-"]'),
              n = a.parent(),
              s = parseInt(a.attr("class").split("-")[1]) + 1,
              r = "tier-" + s;
            if (
              ("forceopen" != t.type &&
                n.children().each(function () {
                  if (parseInt(e(this).attr("class").split("-")[1]) >= s)
                    if ("forceclose" == t.type) {
                      e(this).removeClass("tier-appeared");
                      var o = e(this);
                      theme.hoverRemoveTierTimeoutId = setTimeout(function () {
                        o.remove();
                      }, 260);
                    } else e(this).slideUpAndRemove(i);
                }),
              e(this).hasClass("expanded") && "forceopen" != t.type)
            )
              e(this)
                .removeClass("expanded")
                .removeAttr("aria-expanded")
                .removeAttr("aria-controls");
            else {
              a
                .find("a.expanded")
                .removeClass("expanded")
                .removeAttr("aria-expanded"),
                clearTimeout(theme.hoverRemoveTierTimeoutId);
              var l = n.children("." + r);
              0 == l.length
                ? (l = e("<div />")
                    .addClass(r)
                    .attr("id", "menu-" + r)
                    .appendTo(n)).css("height", "0px")
                : l.css("height", l.height() + "px"),
                l
                  .empty()
                  .stop(!0, !1)
                  .append(e(this).siblings("ul").clone().attr("style", "")),
                l.animate(
                  { height: l.children().outerHeight() },
                  i,
                  function () {
                    e(this).css("height", "");
                  }
                ),
                setTimeout(function () {
                  l.addClass("tier-appeared");
                }, 10),
                e(this)
                  .addClass("expanded")
                  .attr("aria-expanded", "true")
                  .attr("aria-controls", "menu-" + r),
                e("body").addClass("nav-mega-open");
            }
            return !1;
          }
        ),
        (theme.closeOpenMenuItem = function () {
          e("body").removeClass("nav-mega-open"),
            e(
              ".multi-level-nav.reveal-on-hover .has-children.expanded"
            ).trigger("forceclose");
        }),
        e(document).on(
          "mouseenter mouseleave",
          ".multi-level-nav.reveal-on-hover .tier-1 .contains-mega-menu",
          function (t) {
            theme.viewport.isSm() &&
              (clearTimeout(theme.closeOpenMenuItemTimeoutId),
              "mouseenter" == t.type
                ? e(this).children("a").trigger("forceopen")
                : (theme.closeOpenMenuItemTimeoutId = setTimeout(
                    theme.closeOpenMenuItem,
                    200
                  )));
          }
        ),
        e(document).on(
          "mouseleave",
          ".multi-level-nav.reveal-on-hover .tier-appeared",
          function (e) {
            theme.viewport.isSm() &&
              (clearTimeout(theme.closeOpenMenuItemTimeoutId),
              (theme.closeOpenMenuItemTimeoutId = setTimeout(
                theme.closeOpenMenuItem,
                50
              )));
          }
        ),
        e(document).on(
          "mouseenter",
          ".multi-level-nav.reveal-on-hover .tier-2, .multi-level-nav.reveal-on-hover .tier-3",
          function (e) {
            theme.viewport.isSm() &&
              clearTimeout(theme.closeOpenMenuItemTimeoutId);
          }
        ),
        e(document).on(
          "keydown",
          ".multi-level-nav .contains-children > a.has-children",
          function (t) {
            if ("Enter" == t.key)
              return (
                e(this).parent().hasClass("contains-mega-menu")
                  ? "true" == e(this).attr("aria-expanded")
                    ? theme.closeOpenMenuItem()
                    : e(this).trigger("forceopen")
                  : e(this).parent().toggleClass("reveal-child"),
                !1
              );
          }
        );
      (window.closeThemeModal = function (t, i) {
        e("a[data-modal-toggle].active").removeClass("active");
        var o = e(".theme-modal.reveal");
        o.removeClass("reveal").addClass("unreveal"),
          !e("html.supports-transforms").length || (void 0 !== t && t)
            ? (e("body").removeClass("modal-active"),
              e("body, #site-control").css("padding-right", ""))
            : setTimeout(function () {
                e("body").removeClass("modal-active"),
                  e("body, #page-content, #site-control").css(
                    "padding-right",
                    ""
                  );
              }, 300),
          o.find("a").attr("tabindex", "-1"),
          t
            ? e("body").removeAttr("data-modal-id")
            : setTimeout(function () {
                e("body").removeAttr("data-modal-id");
              }, 200),
          e(window).trigger("ccModalClosing"),
          setTimeout(function () {
            e("body").removeClass("modal-closing"),
              "quick-buy-modal" === o.attr("id") && o.remove(),
              i && i(),
              e(window).trigger("ccModalClosed");
          }, 300),
          e("#search-modal").removeClass("-in");
      }),
        (window.showThemeModal = function (t, i, o) {
          closeThemeModal(!0),
            e(".theme-modal.temp").remove(),
            theme.Nav().bar.hide(!1);
          var n = e(t);
          n.appendTo("body"),
            setTimeout(function () {
              n.addClass("reveal");
            }, 10),
            theme.addControlPaddingToModal();
          var s = e.scrollBarWidth();
          a() && e("#page-content, #site-control").css("padding-right", s),
            e("body").addClass("modal-active modal-opening"),
            i && e("body").attr("data-modal-id", i),
            setTimeout(function () {
              e(".theme-modal:visible [data-modal-close]").length &&
                e(".theme-modal:visible [data-modal-close]").focus(),
                e("body").removeClass("modal-opening");
            }, 300),
            s > 0 && e(".theme-modal:visible").addClass("scrollbar-visible"),
            o && o(n);
        }),
        (window.showInPageModal = function (t) {
          t.removeClass("unreveal").addClass("reveal"),
            theme.addControlPaddingToModal();
          var i = t.find(".focus-me");
          e(this).addClass("active"),
            a() &&
              e("body, #site-control").css("padding-right", e.scrollBarWidth()),
            e("body")
              .addClass("modal-active modal-opening")
              .attr("data-modal-id", t.attr("id")),
            e("a[tabindex]", t).removeAttr("tabindex"),
            0 == i.length
              ? t.closest(".theme-modal").focus()
              : theme.viewport.isSm() && i.focus(),
            "search-modal" === t.attr("id") &&
              setTimeout(function () {
                e("#search-modal").addClass("-in");
              }, 400),
            setTimeout(function () {
              e("body").removeClass("modal-opening");
            }, 400);
        }),
        e(document).on(
          "click",
          "body:not(.modal-active) a[data-modal-toggle]",
          function (t) {
            t.preventDefault(),
              window.showInPageModal(e(e(this).data("modal-toggle")));
          }
        ),
        e(document).on("keyup", function (e) {
          27 == e.which && closeThemeModal();
        }),
        e(document).on(
          "click",
          "body.modal-active a[data-modal-close]",
          function () {
            return closeThemeModal(), !1;
          }
        ),
        e(document).on("click", ".theme-modal", function (t) {
          if (t.target == this)
            return closeThemeModal(), e(this).trigger("reset-modal"), !1;
        }),
        e(document).on(
          "click",
          "body.modal-active a[data-modal-toggle]",
          function () {
            return closeThemeModal(!0), e(this).click(), !1;
          }
        ),
        e(document).on(
          "click",
          ".site-control a[data-modal-nav-toggle]",
          function () {
            return (
              e("body.modal-active").length
                ? (closeThemeModal(!0),
                  setTimeout(function () {
                    e("#page-menu .crumbs a:first").trigger("click");
                  }, 305))
                : (e(".nav-ctas__cta .lazyload--manual")
                    .removeClass("lazyload--manual")
                    .addClass("lazyload"),
                  window.showInPageModal(e("#page-menu"))),
              !1
            );
          }
        ),
        e(document)
          .on("focusin click", "input.select-on-focus", function () {
            e(this).select();
          })
          .on("mouseup", "input.select-on-focus", function (e) {
            e.preventDefault();
          }),
        e("#template textarea").each(function () {
          e(this).autogrow({ animate: !1, onInitialize: !0 });
        }),
        e(document).on(
          "click",
          ".quantity-wrapper [data-quantity]",
          function () {
            var t = "up" == e(this).data("quantity") ? 1 : -1,
              i = e(this).closest(".quantity-wrapper").find("[name=quantity]");
            return i.val(Math.max(1, parseInt(i.val()) + t)), !1;
          }
        ),
        e(document).on("change", "select.redirecter", function () {
          window.location = e(this).val();
        }),
        (theme.getUrlParameter = function (e) {
          e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var t = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search);
          return null === t ? "" : decodeURIComponent(t[1].replace(/\+/g, " "));
        });
      var n = theme.getUrlParameter("form_type");
      (theme.getUrlParameter("customer_posted") || (n && "customer" === n)) &&
        window.location.hash &&
        "footer_newsletter_signup" === window.location.hash &&
        setTimeout(() => {
          e("html,body").animate(
            { scrollTop: e("#footer_newsletter_signup").offset().top - 100 },
            1e3
          );
        }, 100),
        navigator.userAgent.toLowerCase().indexOf("android") > -1 &&
          e("html").addClass("os-android"),
        e(document).on("click", "[data-cc-checkout-button]", function (t) {
          if (e("#cc-checkout-form").length)
            return e("#cc-checkout-form").submit(), !1;
          console.warn("Unable to find form with id cc-checkout-form");
        }),
        e(document).on("click", "[data-cc-animate-click]", function (t) {
          if (
            ((theme.settings.animationEnabledDesktop &&
              theme.viewport.isSm()) ||
              (theme.settings.animationEnabledMobile &&
                theme.viewport.isXs())) &&
            (window.location.hostname === this.hostname ||
              !this.hostname.length) &&
            e(this).attr("href").length > 0 &&
            "#" !== e(this).attr("href")
          ) {
            t.preventDefault();
            var i = e("body").hasClass("animation-speed-fast"),
              o = i ? 100 : 200,
              a = i ? 800 : 1300,
              n = e("#cc-veil"),
              s = n.hasClass("cc-veil--animate"),
              r = e(this).attr("href");
            return (
              e("body").append('<link rel="prefetch" href="'.concat(r, '">')),
              n.addClass("-in"),
              s &&
                setTimeout(() => {
                  n.addClass("cc-veil--animate--in").addClass(
                    "cc-veil--animate--running"
                  );
                }, o + 100),
              setTimeout(
                () => {
                  n.removeClass("cc-veil--animate--in"),
                    (window.location.href = r);
                },
                s ? a : o
              ),
              setTimeout(() => {
                e("#cc-veil").removeClass("-in");
              }, 8e3),
              !1
            );
          }
        }),
        setTimeout(lazySizes.autoSizer.checkElems, 1e3),
        window.addEventListener("keydown", function t(i) {
          9 === i.keyCode &&
            (e("body").addClass("user-is-tabbing"),
            window.removeEventListener("keydown", t));
        }),
        document.querySelector(".shopify-challenge__container") &&
          (document.getElementById("shopify-section-footer").style.display =
            "none"),
        theme.device.isTouch() &&
          document.getElementsByTagName("html")[0].classList.add("touch");
      var s = document.body.querySelector(
        ".template-index #page-content .shopify-section:first-child [data-cc-animate]"
      );
      if (
        (s &&
          null === m.get("is_first_visit") &&
          s.removeAttribute("data-cc-animate"),
        m.set("is_first_visit", "false"),
        e(document).on("shopify:section:reorder", function (e) {
          setTimeout(theme.init, 500);
        }),
        e(document).on("shopify:section:load", function (t) {
          e(".rte a img", t.target).closest("a").addClass("contains-img"),
            e(".feature-header", t.target).length &&
              e(window).trigger("assessFeatureHeaders"),
            theme.inlineVideos.init(t.target),
            theme.init();
        }),
        e(document).on("shopify:section:unload", function (e) {
          theme.inlineVideos.destroy(e.target),
            setTimeout(() => {
              theme.init();
            }, 0);
        }),
        e(window).on("debouncedresizewidth", theme.windowResize),
        window.matchMedia)
      ) {
        var r = window.matchMedia("(min-width: 768px)");
        r.addEventListener &&
          r.addEventListener("change", (e) => {
            var t = new CustomEvent("cc-mobile-viewport-size-change");
            window.dispatchEvent(t);
          });
      }
      e(function () {
        theme.init(),
          e(window).trigger("slideshowfillheight"),
          e(window).trigger("assessFeatureHeaders");
      });
      var l = 1200;
      theme.Sections.init(),
        theme.Sections.register("header", theme.HeaderSection, {
          deferredLoad: !1,
        }),
        theme.Sections.register("footer", theme.FooterSection, {
          deferredLoadViewportExcess: l,
        }),
        theme.Sections.register("slideshow", theme.SlideshowSection, {
          deferredLoadViewportExcess: l,
        }),
        theme.Sections.register("video", theme.VideoManager, {
          deferredLoadViewportExcess: l,
        }),
        theme.Sections.register("background-video", theme.VideoManager, {
          deferredLoadViewportExcess: l,
        }),
        theme.Sections.register(
          "image-with-text-overlay",
          theme.ImageWithTextOverlay,
          { deferredLoadViewportExcess: l }
        ),
        theme.Sections.register(
          "image-beside-image",
          theme.ImageBesideImageSection,
          { deferredLoadViewportExcess: l }
        ),
        theme.Sections.register(
          "featured-collection",
          theme.FeaturedCollectionSection,
          { deferredLoadViewportExcess: l }
        ),
        theme.Sections.register(
          "collection-list",
          theme.CollectionListSection,
          { deferredLoadViewportExcess: l }
        ),
        theme.Sections.register("featured-blog", theme.FeaturedBlogSection, {
          deferredLoadViewportExcess: l,
        }),
        theme.Sections.register(
          "product-template",
          theme.ProductTemplateSection,
          { deferredLoadViewportExcess: 200 }
        ),
        theme.Sections.register("collection-template", theme.FilterManager, {
          deferredLoad: !1,
        }),
        theme.Sections.register("blog-template", theme.BlogTemplateSection, {
          deferredLoad: !1,
        }),
        theme.Sections.register(
          "article-template",
          theme.ArticleTemplateSection,
          { deferredLoad: !1 }
        ),
        theme.Sections.register(
          "list-collections",
          theme.ListCollectionsSection,
          { deferredLoadViewportExcess: l }
        ),
        theme.Sections.register("cart-template", theme.CartTemplateSection, {
          deferredLoad: !1,
        }),
        theme.Sections.register(
          "product-recommendations",
          theme.ProductRecommendations,
          { deferredLoadViewportExcess: l }
        ),
        theme.Sections.register("gallery", theme.GallerySection, {
          deferredLoadViewportExcess: l,
        }),
        theme.Sections.register("testimonials", theme.TestimonialsSection, {
          deferredLoadViewportExcess: l,
        }),
        theme.Sections.register("accordion", theme.AccordionSection, {
          deferredLoadViewportExcess: l,
        }),
        theme.Sections.register("faq", theme.FaqSection, {
          deferredLoadViewportExcess: l,
        }),
        theme.Sections.register("search-template", theme.FilterManager, {
          deferredLoad: !1,
        });
    }),
    e(function (e) {
      t.sections.length
        ? t.sections.forEach((e) => {
            try {
              var t = {};
              void 0 !== e.deferredLoad && (t.deferredLoad = e.deferredLoad),
                void 0 !== e.deferredLoadViewportExcess &&
                  (t.deferredLoadViewportExcess = e.deferredLoadViewportExcess),
                theme.Sections.register(e.name, e.section, t);
            } catch (t) {
              console.error(
                "Unable to register section ".concat(e.name, "."),
                t
              );
            }
          })
        : console.warn("Barry: No common sections have been registered.");
    });
})(theme.jQuery);
