<template>
  <div class="data-list">
    <!--向上滑动区域-->
    <infinite-loading
      v-if="canPrev"
      ref="infiniteLoading"
      @infinite="getList($event, directionUp)"
      v-bind="$attrs"
      :distance="distance"
      :identifier="identifier"
      direction="top"
    >
      <!--@slot 该信息将会在所有数据都已经加载完时呈现给用户-->
      <div slot="no-more" class="loaded-tip">
        <slot name="no-more">已经到达顶部了</slot>
      </div>
      <!--@slot 该信息将会在没有加载到任何数据时呈现给用户-->
      <div slot="no-results" class="loaded-tip">
        <slot name="no-results">暂时没有数据</slot>
      </div>
      <!--@slot 该信息将会在加载出现错误时呈现给用户-->
      <div slot="error">
        <slot name="error">网络异常，请刷新重试</slot>
      </div>
    </infinite-loading>

    <!--@slot 自定义列表内容-->
    <slot :list="list">
      自定义列表内容
    </slot>

    <infinite-loading
      ref="infiniteLoading"
      @infinite="getList($event, directionDown)"
      v-bind="$attrs"
      :identifier="identifier"
      direction="bottom"
    >
      <!--@slot 该信息将会在所有数据都已经加载完时呈现给用户-->
      <slot name="no-more" slot="no-more">没有更多了</slot>
      <!--@slot 该信息将会在没有加载到任何数据时呈现给用户-->
      <slot name="no-results" slot="no-results">暂时没有数据</slot>
      <!--@slot 该信息将会在加载出现错误时呈现给用户-->
      <slot name="error" slot="error">网络异常，请刷新重试</slot>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import _get from 'lodash.get'
import * as queryUtil from './utils/query'
import _debounce from 'lodash.debounce'

const defaultFirstPage = 1

const directionUp = 'top'
const directionDown = 'bottom'
const updateDistanceFn = 'scroll'

export default {
  name: 'data-list',
  components: {
    InfiniteLoading
  },
  inheritAttrs: false,
  props: {
    /**
     * 请求数据的地址
     */
    url: String,
    /**
     * 外部的注入额外的查询参数, 键值对形式
     */
    query: {
      type: Object,
      default: () => ({})
    },
    /**
     * 渲染组件的分页数据在接口返回的数据中的路径, 嵌套对象使用.表示即可
     */
    dataPath: {
      type: String,
      default: 'payload.content'
    },
    /**
     * 渲染组件的总页数在接口返回的数据中的路径, 嵌套对象使用.表示即可
     */
    totalPagesPath: {
      type: String,
      default: 'payload.totalPages'
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
    }
  },
  data() {
    return {
      list: [],
      nextPage: defaultFirstPage,
      identifier: 0,
      prevPage: defaultFirstPage,
      distance: -100,
      canPrev: false,
      directionUp,
      directionDown,
      storeQuery: null,
      scrollParent: null
    }
  },
  computed: {
    routerMode() {
      return this.$router ? this.$router.mode : 'hash'
    },
    getList() {
      /**
       * 有时同一infinite事件会触发两次，所以对getList做debounce处理
       * @see: https://github.com/PeachScript/vue-infinite-loading/issues/228
       */
      return _debounce(this._getList, 200)
    }
  },
  watch: {
    url() {
      this.reset()
    }
  },
  mounted() {
    // 获取存储的query值
    if (this.saveQuery) {
      const query = queryUtil.get(location.href)
      if (query) {
        this.storeQuery = query
        this.nextPage = query.page
        this.prevPage = query.page
      }
    }

    // scroll触发向上滚动的配置，防止同时出现两个spinner
    this.scrollParent = this.$refs.infiniteLoading.getScrollParent()
    this.scrollParent.addEventListener(
      updateDistanceFn,
      this.updatePrevDistance
    )
  },
  destroyed() {
    this.scrollParent.removeEventListener(
      updateDistanceFn,
      this.updatePrevDistance
    )
  },
  methods: {
    async _getList($state, direction) {
      const isDirectionDown = direction === this.directionDown
      const {url} = this
      const atTop = !isDirectionDown && this.prevPage == defaultFirstPage

      if (!url || atTop) {
        $state.complete()
        console.warn('url 为空, 不发送请求')
        return
      }

      if (!isDirectionDown) this.prevPage--
      let query = {
        ...this.storeQuery,
        page: isDirectionDown ? this.nextPage : this.prevPage,
        size: this.hasPagination ? this.size : this.noPaginationSize,
        ...this.query
      }

      // 无效值过滤，注意0是有效值
      query = Object.keys(query)
        .filter(k => ['', undefined, null].indexOf(query[k]) === -1)
        .reduce((obj, k) => {
          obj[k] = query[k].toString().trim()
          return obj
        }, {})

      const queryStr =
        (url.indexOf('?') > -1 ? '&' : '?') +
        queryUtil.stringify(query, '=', '&')

      /**
       * 请求loading事件
       */
      this.$emit('loading')

      try {
        const {data: resp} = await this.$axios.get(url + queryStr)

        // 当读取结果为undefined时取默认值[]
        const data = _get(resp, this.dataPath, []) || []

        if (isDirectionDown) {
          this.list.push(...data)
          this.nextPage++
        } else {
          this.list.unshift(...data)
        }

        if (!!this.list.length) $state.loaded()
        /**
         * 请求完loaded事件
         * @property {array} list - 列表数据
         * @property {object} resp - 接口返回的数据
         */
        this.$emit('loaded', [...this.list], resp)

        const totalPages = _get(resp, this.totalPagesPath, 0)
        if (isDirectionDown && this.nextPage > totalPages) {
          $state.complete()
          // 防止总页数只有第一页的情况
          if (totalPages != defaultFirstPage) this.updatePrevDistance()
        }
      } catch (err) {
        $state.error()
        /**
         * 请求数据失败
         * @property {error} err
         */
        this.$emit('error', err)
      }

      // 存储请求参数
      if (this.saveQuery) {
        const newUrl = queryUtil.set(location.href, query, this.routerMode)
        history.replaceState(history.state, 'data-list loaded', newUrl)
      }
    },
    // 更新向上滚动距离配置
    updatePrevDistance() {
      this.distance = 0
      if (this.prevPage != defaultFirstPage) this.canPrev = true

      this.scrollParent.removeEventListener(
        updateDistanceFn,
        this.updatePrevDistance
      )
    },
    reset() {
      this.list = []
      this.nextPage = defaultFirstPage
      this.prevPage = defaultFirstPage
      if (this.saveQuery) {
        const newUrl = queryUtil.clear(location.href)
        history.replaceState(history.state, '', newUrl)
      }
      this.identifier += 1
    }
  }
}
</script>

<style lang="less">
.data-list {
  @keyframes tipHidden {
    from {
      opacity: 1;
      height: 50px;
    }

    to {
      opacity: 0;
      height: 0;
    }
  }

  .loaded-tip {
    height: 0;
    opacity: 0;
    animation: tipHidden 3s;
  }
}
</style>
