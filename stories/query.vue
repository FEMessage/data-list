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
      url: 'http://yapi.demo.qunar.com/mock/30643/listars/data-list',
      dataPath: 'payload.content', // 渲染组件的分页数据在接口返回的数据中的路径, 嵌套对象使用.表示即可
      query: query
    }
  }
}
</script>
