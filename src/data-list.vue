<template>
  <div class="data-list">
    <!--向上滑动区域-->
    <infinite-loading v-if="canPrev"
                      ref="infiniteLoading"
                      @infinite="getList($event, directionUp)"
                      v-bind="$attrs"
                      :distance="distance"
                      :identifier="identifier"
                      direction="top">
      <!--@slot 该信息将会在所有数据都已经加载完时呈现给用户-->
      <div slot="no-more" class="loaded-tip">
        <slot name="no-more">
          已经到达顶部了
        </slot>
      </div>
      <!--@slot 该信息将会在没有加载到任何数据时呈现给用户-->
      <div slot="no-results" class="loaded-tip">
        <slot name="no-results">
          暂时没有数据
        </slot>
      </div>
      <!--@slot 该信息将会在加载出现错误时呈现给用户-->
      <div slot="error">
        <slot name="error">
          网络异常，请刷新重试
        </slot>
      </div>
    </infinite-loading>

    <slot :list="list">
      <!--@slot 自定义列表内容-->
      自定义列表内容
    </slot>

    <infinite-loading ref="infiniteLoading"
                      @infinite="getList($event, directionDown)"
                      v-bind="$attrs"
                      :identifier="identifier"
                      direction="bottom">
      <!--@slot 该信息将会在所有数据都已经加载完时呈现给用户-->
      <slot name="no-more" slot="no-more">
        没有更多了
      </slot>
      <!--@slot 该信息将会在没有加载到任何数据时呈现给用户-->
      <slot name="no-results" slot="no-results">
        暂时没有数据
      </slot>
      <!--@slot 该信息将会在加载出现错误时呈现给用户-->
      <slot name="error" slot="error">
        网络异常，请刷新重试
      </slot>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import qs from 'qs'
import _get from 'lodash.get'

const dataPath = 'payload.content'
const totalPagesPath = 'payload.totalPages'

const defaultFirstPage = 1

const directionUp = 'top'
const directionDown = 'bottom'
const updateDistanceFn = 'scroll'
const hashRouterMode = 'hash'

const equal = '='
const equalPattern = /=/g

const valueSeparator = '~'
const paramSeparator = ','

const valueSeparatorPattern = new RegExp(valueSeparator, 'g')

const queryFlag = 'q='
const queryPattern = new RegExp('q=.*' + paramSeparator)

export default {
  name: 'data-list',
  components: {
    InfiniteLoading
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
      default: () => {}
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
  watch: {
    url: function() {
      this.reset()
    }
  },
  mounted() {
    // 获取存储的query值
    let matches = location.href.match(queryPattern)

    if (matches) {
      let query = matches[0].substr(2).replace(valueSeparatorPattern, equal)
      this.storeQuery = qs.parse(query, {delimiter: paramSeparator})
      this.nextPage = this.storeQuery.page
      this.prevPage = this.storeQuery.page
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
    async getList($state, direction) {
      const isDirectionDown = direction === this.directionDown
      let url = this.url
      let params = ''

      if (!url || (!isDirectionDown && this.prevPage == defaultFirstPage)) {
        $state.complete()
        console.warn('url 为空, 不发送请求')
        return
      }

      if (url.indexOf('?') > -1) url += '&'
      else url += '?'

      if (!isDirectionDown) this.prevPage--
      let size = this.hasPagination ? this.size : this.noPaginationSize
      const query = Object.assign(
        {},
        this.storeQuery,
        {page: isDirectionDown ? this.nextPage : this.prevPage, size},
        this.query
      )

      params += Object.keys(query)
        .filter(k => {
          return query[k] !== '' && query[k] !== null && query[k] !== undefined
        })
        .reduce(
          (params, k, i) =>
            (params += `${i === 0 ? '' : '&'}${k}=${encodeURIComponent(
              query[k].toString().trim()
            )}`),
          ''
        )

      /**
       * 请求loading事件
       * @event loading
       */
      this.$emit('loading')

      try {
        let resp = await this.$axios.get(url + params)
        let data = resp.data

        const list = _get(data, this.dataPath, [])
        if (isDirectionDown) this.list = this.list.concat(list)
        else this.list.unshift(...list)

        if (isDirectionDown) this.nextPage++

        if (!!this.list.length) $state.loaded()
        /**
         * 请求完loaded事件
         * @event loaded
         */
        this.$emit('loaded', [...this.list])

        let totalPages = _get(data, this.totalPagesPath, 0)
        if (isDirectionDown && this.nextPage > totalPages) {
          $state.complete()
          // 防止总页数只有第一页的情况
          if (totalPages != defaultFirstPage) this.updatePrevDistance()
        }
      } catch (err) {
        $state.error()
        /**
         * 请求数据失败，返回err对象
         * @event error
         */
        this.$emit('error', err)
      }

      // 存储请求参数
      if (this.saveQuery && this.routerMode) {
        let newUrl = ''
        let searchQuery =
          queryFlag +
          params
            .replace(/&/g, paramSeparator)
            .replace(equalPattern, valueSeparator) +
          paramSeparator

        if (location.href.indexOf(queryFlag) > -1) {
          newUrl = location.href.replace(queryPattern, searchQuery)
        } else if (this.routerMode === hashRouterMode) {
          let search =
            location.hash.indexOf('?') > -1
              ? `&${searchQuery}`
              : `?${searchQuery}`
          newUrl =
            location.origin +
            location.pathname +
            location.search +
            location.hash +
            search
        } else {
          let search = location.search ? `&${searchQuery}` : `?${searchQuery}`
          newUrl =
            location.origin +
            location.pathname +
            location.search +
            search +
            location.hash
        }
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
      history.replaceState(
        history.state,
        '',
        location.href.replace(queryPattern, '')
      )
      this.identifier += 1
    }
  }
}
</script>

<style lang="stylus">
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
