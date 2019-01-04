<template>
  <div class="save-query">
    <div style="position: relative;height: 40px">
      <button class="btn" @click="routerPage">切换页面</button>
    </div>
    <data-list ref="dataList" :url="url" :dataPath="dataPath" :size="20" :query="query">
      <!--通过slot-scope从data-list组件获取到返回的数据-->
      <ul slot-scope="props">
        <li v-for="(item, index) in props.list" :key="index">
          <h4>{{item.name}}</h4>
        </li>
      </ul>
    </data-list>
  </div>
</template>
<script>
export default {
  name: 'save-query',
  data() {
    return {
      url: 'http://yapi.demo.qunar.com/mock/30643/listars/data-list',
      query: {
        testType: 'save-query'
      },
      dataPath: 'payload.content' // 渲染组件的分页数据在接口返回的数据中的路径, 嵌套对象使用.表示即可
    }
  },
  methods: {
    routerPage() {
      location.href = 'https://www.baidu.com/'
    }
  }
}
</script>
<style>
html,
body,
p,
div {
  margin: 0;
  padding: 0;
}
.btn {
  position: fixed;
  top: 0;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  height: 40px;
  border-radius: 30px;
  color: #fff;
  width: 100%;
  background-color: #5d81f9;
  border-color: #5d81f9;
}
</style>
