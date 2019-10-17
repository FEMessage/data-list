# data-list

[![Build Status](https://badgen.net/travis/FEMessage/data-list/master)](https://travis-ci.com/FEMessage/data-list)
[![NPM Download](https://badgen.net/npm/dm/@femessage/data-list)](https://www.npmjs.com/package/@femessage/data-list)
[![NPM Version](https://badgen.net/npm/v/@femessage/data-list)](https://www.npmjs.com/package/@femessage/data-list)
[![NPM License](https://badgen.net/npm/license/@femessage/data-list)](https://github.com/FEMessage/data-list/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/data-list/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

更好用的滚动加载更多列表组件

![](https://cdn.nlark.com/yuque/0/2019/gif/224563/1561712793658-9351ad70-4b43-4115-bc31-bf507781759c.gif#align=left&display=inline&height=560&originHeight=560&originWidth=320&size=0&status=done&width=320)

[English](./README-en.md)

## Table of Contents

- [Introduction](#introduction)
  - [What is `data-list`](#what-is-data-list)
  - [Why](#why)
- [Features](#features)
- [Links](#links)
- [Pre Install](#pre-install)
- [Quick Start](#quick-start)
- [Example](#example)
  - [Basic](#basic)
  - [Slot Content](#slot-content)
  - [Reset](#reset)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Introduction

### What is `data-list`

`data-list`组件 是基于 [v-infinite-loading](https://peachscript.github.io/vue-infinite-loading/) 封装的列表渲染组件。只需要配置 url 和 datahPath 即可进行数据处理，提供无限滚动，滑动加载更多数据等功能。

### Why

日常需要面对大量列表渲染的场景，通常这些列表的数据处理逻辑是相似或重复的。为避免写重复代码，data-list 因此诞生了。

## Features

- 传入`url`即会请求获取数据
- 自带下拉加载更多，分页数据处理
- 自动判断当前第几页，是否已到尾页、并且停止数据的加载
- 支持获取不到数据、没有更多数据、请求错误等场景的提示语（可自定义）
- 可以保存列表滚动状态，访问详情页后返回或页面刷新，能恢复之前的滚动位置

[⬆ Back to Top](#table-of-contents)

## Links

- [docs](https://FEMessage.github.io/data-list/)

[⬆ Back to Top](#table-of-contents)

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

[⬆ Back to Top](#table-of-contents)

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
        {{ item.name }}
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
      url:
        'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/data-list'
    }
  }
}
</script>
```

[⬆ Back to Top](#table-of-contents)

## Example

### Basic

![](https://cdn.nlark.com/yuque/0/2019/gif/224563/1561712793428-d597adc3-e741-443e-9c52-65fa5ae46b89.gif#align=left&display=inline&height=560&originHeight=560&originWidth=320&size=0&status=done&width=320)

### Slot Content

![](https://cdn.nlark.com/yuque/0/2019/gif/224563/1561712793541-047e59ab-6487-4000-96f3-505e236e2323.gif#align=left&display=inline&height=560&originHeight=560&originWidth=320&size=0&status=done&width=320)

### Reset

![](https://cdn.nlark.com/yuque/0/2019/gif/224563/1561712793411-86387fdf-7ca9-4430-a052-19f56913787f.gif#align=left&display=inline&height=560&originHeight=560&originWidth=320&size=0&status=done&width=320)

[⬆ Back to Top](#table-of-contents)

## Contributing

For those who are interested in contributing to this project, such as:

- report a bug
- request new feature
- fix a bug
- implement a new feature

Please refer to our [contributing guide](https://github.com/FEMessage/.github/blob/master/CONTRIBUTING.md).

[⬆ Back to Top](#table-of-contents)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/listars"><img src="https://avatars2.githubusercontent.com/u/20613509?v=4" width="100px;" alt="listars"/><br /><sub><b>listars</b></sub></a><br /><a href="https://github.com/FEMessage/data-list/commits?author=listars" title="Code">💻</a> <a href="https://github.com/FEMessage/data-list/issues?q=author%3Alistars" title="Bug reports">🐛</a> <a href="https://github.com/FEMessage/data-list/commits?author=listars" title="Documentation">📖</a> <a href="#example-listars" title="Examples">💡</a></td><td align="center"><a href="http://levy.work"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt="levy"/><br /><sub><b>levy</b></sub></a><br /><a href="#review-levy9527" title="Reviewed Pull Requests">👀</a> <a href="#ideas-levy9527" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt="EVILLT"/><br /><sub><b>EVILLT</b></sub></a><br /><a href="#infra-evillt" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td><td align="center"><a href="http://67.216.223.155/resume/"><img src="https://avatars3.githubusercontent.com/u/26338853?v=4" width="100px;" alt="OuZuYu"/><br /><sub><b>OuZuYu</b></sub></a><br /><a href="https://github.com/FEMessage/data-list/issues?q=author%3AOuZuYu" title="Bug reports">🐛</a></td><td align="center"><a href="https://donaldshen.github.io/portfolio"><img src="https://avatars3.githubusercontent.com/u/19591950?v=4" width="100px;" alt="Donald Shen"/><br /><sub><b>Donald Shen</b></sub></a><br /><a href="https://github.com/FEMessage/data-list/issues?q=author%3Adonaldshen" title="Bug reports">🐛</a> <a href="#question-donaldshen" title="Answering Questions">💬</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
