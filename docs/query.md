请求数据时携带额外的查询参数，查询参数会保存在url上。
可以设置`:save-query="false"`关闭保存参数功能

```vue
<template>
  <div>
    <button @click="routerPage">跳转页面</button>
    <div style="height: 400px; overflow: auto">
      <data-list ref="dataList" :url="url" :size="20" :query="query">
        <ul slot-scope="props">
          <li v-for="(item, index) in props.list" :key="index">
            <h4>{{item.name}}</h4>
          </li>
        </ul>
      </data-list>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5c323f1b2188f1589db6af5f/data-list',
      query: {
        key: 'value'
      },
    }
  },
  methods: {
    routerPage() {
      location.href = 'https://www.baidu.com/'
    }
  }
}
</script>
```
