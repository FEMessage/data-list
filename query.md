请求数据时携带额外的查询参数，查询参数会保存在url上。
可以设置`:save-query="false"`关闭保存参数功能

`query` can set extra query in request url, and the query will store in url, which means it still exist after location reload.
`:save-query="false"` to disable this function

```vue
<template>
  <div>
    <button @click="routerPage">click to another page</button>
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
