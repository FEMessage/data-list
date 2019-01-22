import _regeneratorRuntime from 'babel-runtime/regenerator';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import InfiniteLoading from 'vue-infinite-loading';
import qs from 'qs';
import _get from 'lodash.get';

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = ".data-list .loaded-tip { height: 0; opacity: 0; animation: tipHidden 3s; } @-moz-keyframes tipHidden { from { opacity: 1; height: 50px; } to { opacity: 0; height: 0; } } @-webkit-keyframes tipHidden { from { opacity: 1; height: 50px; } to { opacity: 0; height: 0; } } @-o-keyframes tipHidden { from { opacity: 1; height: 50px; } to { opacity: 0; height: 0; } } @keyframes tipHidden { from { opacity: 1; height: 50px; } to { opacity: 0; height: 0; } } ";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var dataPath = 'payload.content';
var totalPagesPath = 'payload.totalPages';

var defaultFirstPage = 1;

var directionUp = 'top';
var directionDown = 'bottom';
var updateDistanceFn = 'scroll';
var hashRouterMode = 'hash';

var equal = '=';
var equalPattern = /=/g;

var valueSeparator = '~';
var paramSeparator = ',';

var valueSeparatorPattern = new RegExp(valueSeparator, 'g');

var queryFlag = 'q=';
var queryPattern = new RegExp('q=.*' + paramSeparator);

var Component = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "data-list" }, [_vm.canPrev ? _c('infinite-loading', _vm._b({ ref: "infiniteLoading", attrs: { "distance": _vm.distance, "identifier": _vm.identifier, "direction": "top" }, on: { "infinite": function infinite($event) {
          _vm.getList($event, _vm.directionUp);
        } } }, 'infinite-loading', _vm.$attrs, false), [_c('div', { staticClass: "loaded-tip", attrs: { "slot": "no-more" }, slot: "no-more" }, [_vm._t("no-more", [_vm._v(" 已经到达顶部了 ")])], 2), _vm._v(" "), _c('div', { staticClass: "loaded-tip", attrs: { "slot": "no-results" }, slot: "no-results" }, [_vm._t("no-results", [_vm._v(" 暂时没有数据 ")])], 2), _vm._v(" "), _c('div', { attrs: { "slot": "error" }, slot: "error" }, [_vm._t("error", [_vm._v(" 网络异常，请刷新重试 ")])], 2)]) : _vm._e(), _vm._v(" "), _vm._t("default", [_vm._v(" 自定义列表内容 ")], { list: _vm.list }), _vm._v(" "), _c('infinite-loading', _vm._b({ ref: "infiniteLoading", attrs: { "identifier": _vm.identifier, "direction": "bottom" }, on: { "infinite": function infinite($event) {
          _vm.getList($event, _vm.directionDown);
        } } }, 'infinite-loading', _vm.$attrs, false), [_vm._t("no-more", [_vm._v(" 没有更多了 ")], { slot: "no-more" }), _vm._v(" "), _vm._t("no-results", [_vm._v(" 暂时没有数据 ")], { slot: "no-results" }), _vm._v(" "), _vm._t("error", [_vm._v(" 网络异常，请刷新重试 ")], { slot: "error" })], 2)], 2);
  }, staticRenderFns: [],
  name: 'data-list',
  components: {
    InfiniteLoading: InfiniteLoading
  },
  props: {
    /**
     * 请求的url地址
     */
    url: String,
    /**
     * 外部的注入额外的查询参数, 键值对形式
     */
    query: {
      type: Object,
      default: function _default() {}
    },
    /**
     * 渲染组件的分页数据在接口返回的数据中的路径, 嵌套对象使用.表示即可
     */
    dataPath: {
      type: String,
      default: dataPath
    },
    /**
     * 渲染组件的总页数在接口返回的数据中的路径, 嵌套对象使用.表示即可
     */
    totalPagesPath: {
      type: String,
      default: totalPagesPath
    },
    /**
     * 每页显示的个数
     */
    size: {
      type: Number,
      default: 10
    },
    /**
     * 是否分页
     */
    hasPagination: {
      type: Boolean,
      default: true
    },
    /**
     * 不分页时的size的大小
     */
    noPaginationSize: {
      type: Number,
      default: 999
    },
    /**
     * 是否可以存储query值
     */
    saveQuery: {
      type: Boolean,
      default: true
    },
    /**
     * 路由模式, hash | history || '', 决定了查询参数存放的形式, 设置为空则不存储查询参数
     */
    routerMode: {
      type: String,
      default: hashRouterMode
    }
  },
  data: function data() {
    return {
      list: [],
      nextPage: defaultFirstPage,
      identifier: 0,
      prevPage: defaultFirstPage,
      distance: -100,
      canPrev: false,
      directionUp: directionUp,
      directionDown: directionDown,
      storeQuery: null,
      scrollParent: null
    };
  },

  watch: {
    url: function url() {
      this.reset();
    }
  },
  mounted: function mounted() {
    // 获取存储的query值
    var matches = location.href.match(queryPattern);

    if (matches) {
      var query = matches[0].substr(2).replace(valueSeparatorPattern, equal);
      this.storeQuery = qs.parse(query, { delimiter: paramSeparator });
      this.nextPage = this.storeQuery.page;
      this.prevPage = this.storeQuery.page;
    }

    // scroll触发向上滚动的配置，防止同时出现两个spinner
    this.scrollParent = this.$refs.infiniteLoading.getScrollParent();
    this.scrollParent.addEventListener(updateDistanceFn, this.updatePrevDistance);
  },
  destroyed: function destroyed() {
    this.scrollParent.removeEventListener(updateDistanceFn, this.updatePrevDistance);
  },

  methods: {
    getList: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee($state, direction) {
        var isDirectionDown, url, params, size, query, _list, resp, data, list, totalPages, newUrl, searchQuery, search, _search;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                isDirectionDown = direction === this.directionDown;
                url = this.url;
                params = '';

                if (!(!url || !isDirectionDown && this.prevPage == defaultFirstPage)) {
                  _context.next = 7;
                  break;
                }

                $state.complete();
                console.warn('url 为空, 不发送请求');
                return _context.abrupt('return');

              case 7:

                if (url.indexOf('?') > -1) url += '&';else url += '?';

                if (!isDirectionDown) this.prevPage--;
                size = this.hasPagination ? this.size : this.noPaginationSize;
                query = Object.assign({}, this.storeQuery, { page: isDirectionDown ? this.nextPage : this.prevPage, size: size }, this.query);


                params += Object.keys(query).filter(function (k) {
                  return query[k] !== '' && query[k] !== null && query[k] !== undefined;
                }).reduce(function (params, k, i) {
                  return params += '' + (i === 0 ? '' : '&') + k + '=' + encodeURIComponent(query[k].toString().trim());
                }, '');

                /**
                 * 请求loading事件
                 * @event loading
                 */
                this.$emit('loading');

                _context.prev = 13;
                _context.next = 16;
                return this.$axios.get(url + params);

              case 16:
                resp = _context.sent;
                data = resp.data;
                list = _get(data, this.dataPath, []);

                if (isDirectionDown) this.list = this.list.concat(list);else (_list = this.list).unshift.apply(_list, _toConsumableArray(list));

                if (isDirectionDown) this.nextPage++;

                if (!!this.list.length) $state.loaded();
                /**
                 * 请求完loaded事件
                 * @event loaded
                 */
                this.$emit('loaded', [].concat(_toConsumableArray(this.list)));

                totalPages = _get(data, this.totalPagesPath, 0);

                if (isDirectionDown && this.nextPage > totalPages) {
                  $state.complete();
                  // 防止总页数只有第一页的情况
                  if (totalPages != defaultFirstPage) this.updatePrevDistance();
                }
                _context.next = 31;
                break;

              case 27:
                _context.prev = 27;
                _context.t0 = _context['catch'](13);

                $state.error();
                /**
                 * 请求数据失败，返回err对象
                 * @event error
                 */
                this.$emit('error', _context.t0);

              case 31:

                // 存储请求参数
                if (this.saveQuery && this.routerMode) {
                  newUrl = '';
                  searchQuery = queryFlag + params.replace(/&/g, paramSeparator).replace(equalPattern, valueSeparator) + paramSeparator;


                  if (location.href.indexOf(queryFlag) > -1) {
                    newUrl = location.href.replace(queryPattern, searchQuery);
                  } else if (this.routerMode === hashRouterMode) {
                    search = location.hash.indexOf('?') > -1 ? '&' + searchQuery : '?' + searchQuery;

                    newUrl = location.origin + location.pathname + location.search + location.hash + search;
                  } else {
                    _search = location.search ? '&' + searchQuery : '?' + searchQuery;

                    newUrl = location.origin + location.pathname + location.search + _search + location.hash;
                  }
                  history.replaceState(history.state, 'data-list loaded', newUrl);
                }

              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[13, 27]]);
      }));

      function getList(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getList;
    }(),

    // 更新向上滚动距离配置
    updatePrevDistance: function updatePrevDistance() {
      this.distance = 0;
      if (this.prevPage != defaultFirstPage) this.canPrev = true;

      this.scrollParent.removeEventListener(updateDistanceFn, this.updatePrevDistance);
    },
    reset: function reset() {
      this.list = [];
      this.nextPage = defaultFirstPage;
      this.prevPage = defaultFirstPage;
      history.replaceState(history.state, '', location.href.replace(queryPattern, ''));
      this.identifier += 1;
    }
  }
};

// Import vue component

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('DataList', Component);
}

// Create module definition for Vue.use()
var plugin = {
  install: install

  // To auto-install when vue is found
};var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default Component;
export { install };
