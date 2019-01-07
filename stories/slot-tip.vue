<template>
  <data-list ref="dataList" :url="url" :dataPath="dataPath">
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
</template>
<script>
export default {
  name: 'slot-tip',
  data() {
    return {
      url:
        'https://easy-mock.com/mock/5c323f1b2188f1589db6af5f/data-list?result=0',
      dataPath: 'payload.content' // 渲染组件的分页数据在接口返回的数据中的路径, 嵌套对象使用.表示即可
    }
  }
}
</script>
