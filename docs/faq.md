## 有时会出现加载多次或者无法加载的问题
加载多次和无法加载都是复杂的页面布局导致组件监听的滚动元素异常的问题，这些问题都不应该是组件去处理

因为布局的多样化，让操作层自己去控制监听的滚动元素，具体可以使用 指定滚动元素的 api [forceUseInfiniteWrapper](https://peachscript.github.io/vue-infinite-loading/zh/api/#forceuseinfinitewrapper)

* example：

```html
<div class="infinite-wrapper">
  <!--默认会寻找最近的具备 overflow-y: auto | scroll CSS 样式的父元素，作为监听滚动事件的目标元素-->
  <!--如果该值为 true，则会向上查找最近的具备 infinite-wrapper 属性的父元素作为滚动容器-->
  <!--如果该值为一个字符串，则会将该值当作 CSS 选择器并使用 querySelector 查找该元素，将其作为滚动容器-->
  <data-list ref="dataList" :url="url" force-use-infinite-wrapper=".infinite-wrapper"></data-list>
</div>
```

* 指定监听的滚动元素（避免错乱布局造成的多次请求或者不发送请求）

```html
<div style="overflow-y: auto">
  <data-list ref="dataList" :url="url" force-use-infinite-wrapper></data-list>
</div>
```

## 多 Tabs 切换 data-list 的时候列表元素叠加的问题

在移动端使用多 Tabs 切换 data-list 列表时，如果当前 tab 的 data-list 正在 loading，同时去切换 tab，前一个 data-list 的数据会被更新到，后一个 data-list 中

为了防止这种情况，可以[监听 loading 事件](https://femessage.github.io/data-list/#/Components?id=datalist)，当 data-list loading 时，禁止切换 Tabs。
