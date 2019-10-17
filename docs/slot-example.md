```vue
<template>
  <div style="height: 400px; overflow: auto">
    <data-list ref="dataList" :url="url">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/data-list',
    }
  }
}
</script>
```
