# data-list

[![Build Status](https://badgen.net/travis/FEMessage/data-list/master)](https://travis-ci.com/FEMessage/data-list)
[![NPM Download](https://badgen.net/npm/dm/@femessage/data-list)](https://www.npmjs.com/package/@femessage/data-list)
[![NPM Version](https://badgen.net/npm/v/@femessage/data-list)](https://www.npmjs.com/package/@femessage/data-list)
[![NPM License](https://badgen.net/npm/license/@femessage/data-list)](https://github.com/FEMessage/data-list/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/data-list/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

Scroll to bottom and load more list items easily.

![](https://cdn.nlark.com/yuque/0/2019/gif/224563/1561712793658-9351ad70-4b43-4115-bc31-bf507781759c.gif#align=left&display=inline&height=560&originHeight=560&originWidth=320&size=0&status=done&width=320)

## Table of Contents

* [Introduction](#introduction)
  * [Why](#why)
* [Features](#features)
* [Links](#links)
* [Pre Install](#pre-install)
* [Quick Start](#quick-start)
* [Example](#example)
  * [Basic](#basic)
  * [Slot Content](#slot-content)
  * [Reset](#reset)
* [Contributing](#contributing)
* [Contributors](#contributors)
* [License](#license)

## Introduction

### Why

In daily developement, there are lots of list rendering scenes, usually the data processing logic of these lists is similar or repeated. To avoid getting duplicate code, `data-list` is born.

## Features

* Automatically request after setting url
* Bound with auto load more, paging data processing
* Support storage request parameters, you can turn up the page to get the previous page data, get the next page data down
* Automatically judge the current page, whether it has reached the bottom and stop loading data
* Support for scenes such as no data, no more data, request errors, etc. (customizable)
* Support saving scrolling status, can return to the previous scrolling position after router go back or page reload

[⬆Back to Top](#table-of-contents)

## Links

* [docs](https://FEMessage.github.io/data-list/)
* thanks to [v-infinite-loading](https://peachscript.github.io/vue-infinite-loading/)

[⬆ Back to Top](#table-of-contents)

## Pre Install

Make sure you have installed it correctly `axios`

```bash
yarn add axios
```

Then register globally `axios`

```javascript
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$axios = axios
```

[⬆Back to Top](#table-of-contents)

## Quick Start

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

[⬆Back to Top](#table-of-contents)

## Example

### Basic

![](https://cdn.nlark.com/yuque/0/2019/gif/224563/1561712793428-d597adc3-e741-443e-9c52-65fa5ae46b89.gif#align=left&display=inline&height=560&originHeight=560&originWidth=320&size=0&status=done&width=320)

### Slot Content

![](https://cdn.nlark.com/yuque/0/2019/gif/224563/1561712793541-047e59ab-6487-4000-96f3-505e236e2323.gif#align=left&display=inline&height=560&originHeight=560&originWidth=320&size=0&status=done&width=320)

### Reset

![](https://cdn.nlark.com/yuque/0/2019/gif/224563/1561712793411-86387fdf-7ca9-4430-a052-19f56913787f.gif#align=left&display=inline&height=560&originHeight=560&originWidth=320&size=0&status=done&width=320)

[⬆Back to Top](#table-of-contents)

## Contributing

For those who are interested in contributing to this project, such as:

* report a bug
* request new feature
* fix a bug
* implement a new feature

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
