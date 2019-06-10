# data-list

[![NPM Download](https://img.shields.io/npm/dm/@femessage/data-list.svg)](https://www.npmjs.com/package/@femessage/data-list)
[![NPM Version](https://img.shields.io/npm/v/@femessage/data-list.svg)](https://www.npmjs.com/package/@femessage/data-list)
[![NPM License](https://img.shields.io/npm/l/@femessage/data-list.svg)](https://github.com/FEMessage/data-list/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/data-list/pulls)

更好用的滚动加载更多列表组件

![data-list](https://ws1.sinaimg.cn/large/85ed9210gy1fyuph7ii73g208w0fk4qp.jpg)

## Table of Contents <!-- omit in toc -->

* [Introduction](#introduction)
* [Feature](#feature)
* [Demo](#demo)
* [Pre Install](#pre-install)
* [Quick start](#quick-start)
* [Example](#example)
  * [basic](#basic)
  * [slot content](#slot-content)
  * [reset](#reset)
* [FAQ](#faq)
* [License](#license)
* [Contributors](#contributors)

## Introduction

**What is `data-list`**

`data-list`组件 是基于 [v-infinite-loading](https://peachscript.github.io/vue-infinite-loading/) 封装的列表渲染组件。上手`data-list`组件相对简单，只需要配置 url 和数据返回路径即可进行数据处理，即可提供无限滚动，滑动加载更多数据等。

**Why**

日常需要面对大量列表渲染的场景，通常这些列表的数据处理逻辑是可复用的。而`data-list`只需要进行简单的配置即可实现：

* 传入`url`即会进行数据的获取并且返回
* 自动判断当前第几页，是否已到尾页、并且停止数据的加载
* 获取不到数据、没有更多数据、请求错误等场景的提示语（可自定义）
* 可以保存列表滚动状态，访问详情页后返回，能回到之前的滚动位置

## Feature

* 只需配置`url`和`数据在接口返回的路径`即可获取到数据
* 自带下拉加载更多，分页数据处理
* 支持存储请求参数，可以向上翻页获取上一页数据，向下获取下一页数据

**[⬆ Back to Top](#table-of-contents)**

## Demo

* [online demo](https://femessage.github.io/data-list)

**[⬆ Back to Top](#table-of-contents)**

## Pre Install

先确保你已经正确安装了`axios`

```sh
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

```sh
# Step1 安装
yarn add @femessage/data-list
```

```vue
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

**[⬆ Back to Top](#table-of-contents)**

### slot content

![data-slot-list](https://ws1.sinaimg.cn/large/85ed9210gy1fyy1cyj7tgg208w0fkqhp.jpg)

**[⬆ Back to Top](#table-of-contents)**

### reset

![data-reset-list](https://ws1.sinaimg.cn/large/85ed9210gy1fyy1auz6tcg208w0fk1fc.jpg)

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
  <data-list ref="dataList" :url="url" force-use-infinite-wrapper=".infinite-wrapper"></data-list>
</div>
```

* 指定监听的滚动元素（避免错乱布局造成的多次请求或者不发送请求）

```vue
<div style="overflow-y: auto">
  <data-list ref="dataList" :url="url" force-use-infinite-wrapper></data-list>
</div>
```

**[⬆ Back to Top](#table-of-contents)**

## License

[MIT](./LICENSE)

**[⬆ Back to Top](#table-of-contents)**

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/listars"><img src="https://avatars2.githubusercontent.com/u/20613509?v=4" width="100px;" alt="listars"/><br /><sub><b>listars</b></sub></a><br /><a href="https://github.com/FEMessage/data-list/commits?author=listars" title="Code">💻</a> <a href="https://github.com/FEMessage/data-list/issues?q=author%3Alistars" title="Bug reports">🐛</a> <a href="https://github.com/FEMessage/data-list/commits?author=listars" title="Documentation">📖</a> <a href="#example-listars" title="Examples">💡</a></td><td align="center"><a href="http://levy.work"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt="levy"/><br /><sub><b>levy</b></sub></a><br /><a href="#review-levy9527" title="Reviewed Pull Requests">👀</a> <a href="#ideas-levy9527" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt="EVILLT"/><br /><sub><b>EVILLT</b></sub></a><br /><a href="#infra-evillt" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td><td align="center"><a href="http://67.216.223.155/resume/"><img src="https://avatars3.githubusercontent.com/u/26338853?v=4" width="100px;" alt="OuZuYu"/><br /><sub><b>OuZuYu</b></sub></a><br /><a href="https://github.com/FEMessage/data-list/issues?q=author%3AOuZuYu" title="Bug reports">🐛</a></td><td align="center"><a href="https://donaldshen.github.io/portfolio"><img src="https://avatars3.githubusercontent.com/u/19591950?v=4" width="100px;" alt="Donald Shen"/><br /><sub><b>Donald Shen</b></sub></a><br /><a href="https://github.com/FEMessage/data-list/issues?q=author%3Adonaldshen" title="Bug reports">🐛</a> <a href="#question-donaldshen" title="Answering Questions">💬</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
