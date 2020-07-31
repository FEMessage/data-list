<template>
  <div class="data-list">
    <!--向上滑动区域-->
    <!-- 初始时只需要有一个infinite-loading，所以list为空时不需要这个infinite-loading -->
    <infinite-loading
      v-if="hasPrev && list.length"
      @infinite="getList($event, false)"
      v-bind="$attrs"
      :distance="0"
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

      <!--@slot 自定义spinner-->
      <slot name="spinner" slot="spinner" />
    </infinite-loading>

    <!--@slot 自定义列表内容-->
    <slot :list="list" />

    <infinite-loading
      @infinite="getList($event, true)"
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
      <!--@slot 自定义spinner-->
      <slot name="spinner" slot="spinner" />
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import _get from 'lodash.get'
import * as queryUtil from './utils/query'

const defaultFirstPage = 1

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
    url: {
      type: String,
      default: ''
    },
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
    },
    /**
     * error 特殊处理异常情况
     */
    throwCustomError:{
      type: Function,
      default: null
    }
  },
  data() {
    // 获取存储的query值
    let prevPage = defaultFirstPage
    let nextPage = defaultFirstPage
    if (this.saveQuery) {
      /**
       * size和其他query都是由prop决定的
       * 这里只需要记录page
       */
      const q = queryUtil.get(location.href)
      if (q) nextPage = prevPage = Number(q.page)
    }
    return {
      list: [],
      prevPage,
      nextPage,
      identifier: 0,
      hasPrev: prevPage > defaultFirstPage,
      requested: {}
    }
  },
  computed: {
    routerMode() {
      return this.$router ? this.$router.mode : 'hash'
    }
  },
  watch: {
    url() {
      this.reset()
    }
  },
  methods: {
    async getList($state, isDirectionDown = false) {
      const {url} = this
      if (!url) {
        $state.complete()
        console.warn('url 为空, 不发送请求')
        return
      }

      // 如果 list 为空，说明刷新或重置了
      const page = this.list.length
        ? isDirectionDown
          ? ++this.nextPage
          : --this.prevPage
        : this.prevPage
      /**
       * 有时同一infinite事件会触发两次，所以请求过的page就不再请求
       * @see: https://github.com/PeachScript/vue-infinite-loading/issues/228
       */
      if (this.requested[page]) return
      this.requested[page] = true
      let query = {
        page,
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
        // 处理业务异常情况
         this.throwCustomError && this.throwCustomError(resp)
        // 当读取结果为undefined时取默认值[]
        const data = _get(resp, this.dataPath, [])
        const action = isDirectionDown ? 'push' : 'unshift'
        this.list[action](...data)

        if (this.list.length === 0) {
          $state.complete()
          this.$emit('complete')
          return
        }
        $state.loaded()
        /**
         * 请求完loaded事件
         * @property {array} list - 列表数据
         * @property {object} resp - 接口返回的数据
         */
        this.$emit('loaded', [...this.list], resp)

        /**
         * data-list约定后端返回的页码范围是 defaultFirstPage ~ totalPages
         * 如果没有 totalPages 或 page 越界但仍有数据（nextPage > totalPages || prevPage < defaultFirstPage）
         * data-list只能立即complete
         */
        const totalPages = _get(resp, this.totalPagesPath, null)
        if (totalPages === null)
          console.warn('totalPages 字段不存在，请传入正确的 totalPagesPath')
        if (
          totalPages === null ||
          (isDirectionDown && this.nextPage >= totalPages) ||
          (!isDirectionDown && this.prevPage <= defaultFirstPage)
        ) {
          $state.complete()
          /**
           * 请求到底或到顶的 complete 事件
           * TODO: 建议区分开来
           */
          this.$emit('complete')
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
        const newUrl = queryUtil.set(location.href, {page}, this.routerMode)
        history.replaceState(history.state, 'data-list loaded', newUrl)
      }
    },
    /**
     * 重新所有参数，并刷新列表
     * @public
     */
    reset() {
      if (this.saveQuery) {
        const newUrl = queryUtil.clear(location.href)
        history.replaceState(history.state, '', newUrl)
      }
      Object.assign(this, this.$options.data(), {
        identifier: this.identifier + 1
      })
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
