# data-list

## Introduction

基于 [v-infinite-loading](https://peachscript.github.io/vue-infinite-loading/) 封装的列表渲染组件

![data-list](https://ws1.sinaimg.cn/large/85ed9210gy1fyuph7ii73g208w0fk4qp.jpg)

**What is `data-list`**

`data-list`组件 是基于 [v-infinite-loading](https://peachscript.github.io/vue-infinite-loading/) 封装的列表渲染组件。上手`data-list`组件相对简单，只需要配置 url 和数据返回路径即可进行数据处理，即可提供无限滚动，滑动加载更多数据等。

**Why**

日常需要面对大量列表渲染的场景，通常这些列表的数据处理逻辑是可复用的。而`data-list`只需要进行简单的配置即可实现：

* 传入`url`即会进行数据的获取并且返回
* 自动判断当前第几页，是否已到尾页、并且停止数据的加载
* 获取不到数据、没有更多数据、请求错误等场景的提示语（可自定义）
* 可以保存列表滚动状态，访问详情页后返回，能回到之前的滚动位置

## Table of Contents

1.  **[Feature](#feature)**
2.  **[Documentation](#documentation)**
3.  **[Quick start](#quick-start)**
4.  **[Example](#example)**
    * **[basic](#basic)**
    * **[not save query](#not-save-query)**
    * **[slot content](#slot-content)**
    * **[reset](#reset)**
    * **[custorm query](#custorm-query)**
5.  **[Api](#api)**
6.  **[Event](#event)**
7.  **[Slot](#slot)**
8.  **[FAQ](#faq)**

## Feature

* 只需配置`url`和`数据在接口返回的路径`即可获取到数据
* 自带下拉加载更多，分页数据处理
* 支持存储请求参数，可以向上翻页获取上一页数据，向下获取下一页数据

**[⬆ Back to Top](#table-of-contents)**

## Documentation

* [full api doc](https://femessage.github.io/data-list/)
* [online demo](https://femessage.github.io/data-list/storybook/)

**[⬆ Back to Top](#table-of-contents)**

## Pre Install

先确保你已经正确安装了`axios`

```js
yarn add axios
```

然后在全局注册`axios`

```js
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$axios = axios
```

**[⬆ Back to Top](#table-of-contents)**

## Quick start

```vue
// Step1 安装
yarn add @femessage/data-list

// Step2 在需要渲染列表的 .vue 文件中
<template>
  <data-list ref="dataList" :url="url">
    <ul slot-scope="props">
      <li v-for="(item, index) in props.list" :key="index">
        {{item.name}}
      </li>
    </ul>
  </data-list>
</template>
<script>
import DataList from '@femessage/data-list'
export default {
  name: 'data-list',
  components: {DataList},
  data() {
    return {
      url: 'https://easy-mock.com/mock/5c323f1b2188f1589db6af5f/data-list'
    }
  }
}
</script>
```

**[⬆ Back to Top](#table-of-contents)**

## Example

### basic

![data-basic-list](https://ws1.sinaimg.cn/large/85ed9210gy1fyy1o2oi5zg208w0fk15x.jpg)

```vue
<template>
  <data-list ref="dataList" :url="url" :dataPath="dataPath">
    <!--通过slot-scope从data-list组件获取到返回的数据-->
    <ul slot-scope="props">
      <li v-for="(item, index) in props.list" :key="index">
        {{item.name}}
      </li>
    </ul>
  </data-list>
</template>
<script>
import DataList from '@femessage/data-list'
export default {
  name: 'basic',
  components: {DataList},
  data() {
    return {
      url: 'https://easy-mock.com/mock/5c323f1b2188f1589db6af5f/data-list',
      dataPath: 'payload.content' // 渲染组件的分页数据在接口返回的数据中的路径, 嵌套对象使用.表示即可
    }
  }
}
</script>
```

**[⬆ Back to Top](#table-of-contents)**

### not save query

```vue
<template>
  <data-list ref="dataList" :url="url" :dataPath="dataPath" :saveQuery="false">
    <!--通过slot-scope从data-list组件获取到返回的数据-->
    <ul slot-scope="props">
      <li v-for="(item, index) in props.list" :key="index">
        {{item.name}}
      </li>
    </ul>
  </data-list>
</template>
<script>
import DataList from '@femessage/data-list'
export default {
  name: 'no-save-query',
  components: {DataList},
  data() {
    return {
      url: 'https://easy-mock.com/mock/5c323f1b2188f1589db6af5f/data-list',
      dataPath: 'payload.content' // 渲染组件的分页数据在接口返回的数据中的路径, 嵌套对象使用.表示即可
    }
  }
}
</script>
```

**[⬆ Back to Top](#table-of-contents)**

### slot content

![data-slot-list](https://ws1.sinaimg.cn/large/85ed9210gy1fyy1cyj7tgg208w0fkqhp.jpg)

```vue
<template>
  <data-list ref="dataList" :url="url" :dataPath="dataPath">
    <ul slot-scope="props">
      <li v-for="(item, index) in props.list" :key="index">
        {{item.name}}
      </li>
    </ul>
    <!--自定义no-more内容-->
    <div slot="no-more">
      暂无更多数据
    </div>
    <!--自定义no-results内容-->
    <div slot="no-results">
      🔍搜索不到数据
    </div>
    <!--自定义error内容-->
    <div slot="error">
      请求失败，请刷新重试
    </div>
  </data-list>
</template>
<script>
import DataList from '@femessage/data-list'
export default {
  name: 'slot-tip',
  components: {DataList},
  data() {
    return {
      url:
        'https://easy-mock.com/mock/5c323f1b2188f1589db6af5f/data-list?result=0',
      dataPath: 'payload.content' // 渲染组件的分页数据在接口返回的数据中的路径, 嵌套对象使用.表示即可
    }
  }
}
</script>
```

**[⬆ Back to Top](#table-of-contents)**

### reset

![data-reset-list](https://ws1.sinaimg.cn/large/85ed9210gy1fyy1auz6tcg208w0fk1fc.jpg)

```vue
<template>
  <div class="reset">
    <button @click="reset">重置</button>
    <data-list ref="dataList" :url="url" :dataPath="dataPath">
      <!--通过slot-scope从data-list组件获取到返回的数据-->
      <ul slot-scope="props">
        <li v-for="(item, index) in props.list" :key="index">
          {{item.name}}
        </li>
      </ul>
    </data-list>
  </div>
</template>
<script>
import DataList from '@femessage/data-list'
export default {
  name: 'reset',
  components: {DataList},
  data() {
    return {
      url: 'https://easy-mock.com/mock/5c323f1b2188f1589db6af5f/data-list',
      dataPath: 'payload.content' // 渲染组件的分页数据在接口返回的数据中的路径, 嵌套对象使用.表示即可
    }
  },
  methods: {
    reset() {
      this.$refs.dataList.reset()
    }
  }
}
</script>
```

**[⬆ Back to Top](#table-of-contents)**

### custorm query

```vue
<template>
  <data-list ref="dataList" :url="url" :dataPath="dataPath" :query="query">
    <ul slot-scope="props">
      <li v-for="(item, index) in props.list" :key="index">
        {{item.name}}
      </li>
    </ul>
  </data-list>
</template>
<script>
import DataList from '@femessage/data-list'

let query = {
  key: 'value'
}

export default {
  name: 'query',
  components: {DataList},
  data() {
    return {
      url: 'https://easy-mock.com/mock/5c323f1b2188f1589db6af5f/data-list',
      dataPath: 'payload.content', // 渲染组件的分页数据在接口返回的数据中的路径, 嵌套对象使用.表示即可
      query: query
    }
  }
}
</script>
```

**[⬆ Back to Top](#table-of-contents)**

## Api

| prop             | 类型    | 备注                                                                                     | default            |
| ---------------- | ------- | ---------------------------------------------------------------------------------------- | ------------------ |
| url              | String  | 请求数据的地址                                                                           | -                  |
| dataPath         | String  | 渲染组件的分页数据在接口返回的数据中的路径, 嵌套对象使用.表示即可，如 `payload.content`  | payload.content    |
| totalPagesPath   | String  | 渲染组件的总页数在接口返回的数据中的路径, 嵌套对象使用.表示即可，如 `payload.totalPages` | payload.totalPages |
| query            | Object  | 外部的注入额外的查询参数, 键值对形式                                                     | -                  |
| size             | Number  | 每页显示的个数                                                                           | 10                 |
| hasPagination    | Boolean | 是否分页                                                                                 | True               |
| noPaginationSize | Number  | 不分页时的 size 的大小                                                                   | 999                |
| saveQuery        | Boolean | 是否开启存储请求参数                                                                     | True               |
| routerMode       | String  | 路由模式, hash \| history \|\| '', 决定了查询参数存放的形式, 设置为空则不存储查询参数    | hash               |

**[⬆ Back to Top](#table-of-contents)**

## Event

| event   | 备注               | 返回参数 |
| ------- | ------------------ | -------- |
| loading | 请求 loading 事件  | -        |
| loaded  | 请求完 loaded 事件 | 列表数据 |
| error   | 请求数据失败事件   | error    |

**[⬆ Back to Top](#table-of-contents)**

## Slot

| Slot       | 备注                                         |
| ---------- | -------------------------------------------- |
| no-more    | 该信息将会在所有数据都已经加载完时呈现给用户 |
| no-results | 该信息将会在没有加载到任何数据时呈现给用户   |
| error      | 该信息将会在加载出现错误时呈现给用户         |

**[⬆ Back to Top](#table-of-contents)**

## FAQ

Q. 有时会出现加载多次或者无法加载的问题

A. 加载多次和无法加载都是复杂的页面布局导致组件监听的滚动元素异常的问题，这些问题都不应该是组件去处理

​ 因为布局的多样化，让操作层自己去控制监听的滚动元素，具体可以使用 指定滚动元素的 api [forceUseInfiniteWrapper](https://peachscript.github.io/vue-infinite-loading/zh/api/#forceuseinfinitewrapper)

* example：

  ```vue
  <div class="infinite-wrapper">
    <!--默认会寻找最近的具备 overflow-y: auto | scroll CSS 样式的父元素，作为监听滚动事件的目标元素-->
    <!--如果该值为 true，则会向上查找最近的具备 infinite-wrapper 属性的父元素作为滚动容器-->
    <!--如果该值为一个字符串，则会将该值当作 CSS 选择器并使用 querySelector 查找该元素，将其作为滚动容器-->
    <data-list ref="dataList" :url="url" forceUseInfiniteWrapper=".infinite-wrapper"></data-list>
  </div>
  ```

- 指定监听的滚动元素（避免错乱布局造成的多次请求或者不发送请求）

  ```vue
  <div style="overflow-y: auto">
      <data-list ref="dataList" :url="url" forceUseInfiniteWrapper></data-list>
  </div>
  ```

**[⬆ Back to Top](#table-of-contents)**

## License

[MIT](./LICENSE)

**[⬆ Back to Top](#table-of-contents)**
