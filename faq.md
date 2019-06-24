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
