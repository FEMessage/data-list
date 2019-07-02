# data-list

[![](https://img.shields.io/npm/dm/@femessage/data-list.svg#align=left&display=inline&height=20&originHeight=20&originWidth=140&status=done&width=140)](https://www.npmjs.com/package/@femessage/data-list)
[![](https://img.shields.io/npm/v/@femessage/data-list.svg#align=left&display=inline&height=20&originHeight=20&originWidth=80&status=done&width=80)](https://www.npmjs.com/package/@femessage/data-list)
![](https://img.shields.io/npm/l/@femessage/data-list.svg#align=left&display=inline&height=20&originHeight=20&originWidth=78&status=done&width=78)
[![](https://img.shields.io/badge/PRs-welcome-brightgreen.svg#align=left&display=inline&height=20&originHeight=20&originWidth=90&status=done&width=90)](https://github.com/FEMessage/data-list/pulls)

scroll to bottom and load more component

![](https://cdn.nlark.com/yuque/0/2019/gif/224563/1561712793658-9351ad70-4b43-4115-bc31-bf507781759c.gif#align=left&display=inline&height=560&originHeight=560&originWidth=320&size=0&status=done&width=320)

## Table of Contents
* [Introduction](#introduction)
* [Feature](#feature)
* [Demo](#demo)
* [Pre Install](#pre-install)
* [Quick start](#quick-start)
* [Example](#example)
  * [Basic](#basic)
  * [Slot Content](#slot-content)
  * [Reset](#reset)
* [License](#license)
* [Contributors](#contributors)

## Introduction

**What is `data-list`**

`data-list` is a list rendering component, based on [v-infinite-loading](https://peachscript.github.io/vue-infinite-loading/). `data-list` is easy to use. Seting the url and dataPpath props, unlimited scrolling and loading more is ready to go

**Why**

In daily developement, there are lots of list rendering scenes, usually the data processing logic of these lists is similar or repeated. To avoid getting duplicate code, `data-list` is born.

## Feature

* Automatically request after setting url
* Bound with auto load more, paging data processing
* Support storage request parameters, you can turn up the page to get the previous page data, get the next page data down
* Automatically judge the current page, whether it has reached the bottom and stop loading data
* Support for scenes such as no data, no more data, request errors, etc. (customizable)
* Support saving scrolling status, can return to the previous scrolling position after router go back or page reload

**[⬆Back to Top](#table-of-contents)**

## Demo

* [Online demo](https://femessage.github.io/data-list)

**[⬆Back to Top](#table-of-contents)**

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

**[⬆Back to Top](#table-of-contents)**

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

**[⬆Back to Top](#table-of-contents)**

## Example

### Basic

![](https://cdn.nlark.com/yuque/0/2019/gif/224563/1561712793428-d597adc3-e741-443e-9c52-65fa5ae46b89.gif#align=left&display=inline&height=560&originHeight=560&originWidth=320&size=0&status=done&width=320)<br />**[⬆Back to Top](#table-of-contents)**

### Slot content

![](https://cdn.nlark.com/yuque/0/2019/gif/224563/1561712793541-047e59ab-6487-4000-96f3-505e236e2323.gif#align=left&display=inline&height=560&originHeight=560&originWidth=320&size=0&status=done&width=320)<br />**[⬆Back to Top](#table-of-contents)**

### Reset

![](https://cdn.nlark.com/yuque/0/2019/gif/224563/1561712793411-86387fdf-7ca9-4430-a052-19f56913787f.gif#align=left&display=inline&height=560&originHeight=560&originWidth=320&size=0&status=done&width=320)<br />**[⬆Back to Top](#table-of-contents)**

## License

[MIT](./LICENSE)<br />**[⬆ Back to Top](#table-of-contents)**

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

| [![](https://avatars2.githubusercontent.com/u/20613509?v=4#alt=listars&width=100)<br />**listars**](https://github.com/listars)<br />[💻](https://github.com/FEMessage/data-list/commits?author=listars) [🐛](https://github.com/FEMessage/data-list/issues?q=author%3Alistars) [📖](https://github.com/FEMessage/data-list/commits?author=listars) [💡](#example-listars) | [![](https://avatars3.githubusercontent.com/u/9384365?v=4#alt=levy&width=100)<br />**levy**](http://levy.work)<br />[👀](#review-levy9527) [🤔](#ideas-levy9527) | [![](https://avatars3.githubusercontent.com/u/19513289?v=4#alt=EVILLT&width=100)<br />**EVILLT**](https://evila.me)<br />[🚇](#infra-evillt) | [![](https://avatars3.githubusercontent.com/u/26338853?v=4#alt=OuZuYu&width=100)<br />**OuZuYu**](http://67.216.223.155/resume/)<br />[🐛](https://github.com/FEMessage/data-list/issues?q=author%3AOuZuYu) | [![](https://avatars3.githubusercontent.com/u/19591950?v=4#alt=Donald%20Shen&width=100)<br />**Donald Shen**](https://donaldshen.github.io/portfolio)<br />[🐛](https://github.com/FEMessage/data-list/issues?q=author%3Adonaldshen) [💬](#question-donaldshen) |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

