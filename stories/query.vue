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
let query = {
  key: 'value'
}

export default {
  name: 'query',
  data() {
    return {
      url: 'https://easy-mock.com/mock/5c323f1b2188f1589db6af5f/data-list',
      dataPath: 'payload.content', // 渲染组件的分页数据在接口返回的数据中的路径, 嵌套对象使用.表示即可
      query: query
    }
  }
}
</script>
