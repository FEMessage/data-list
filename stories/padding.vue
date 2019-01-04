<template>
  <!--页面比较复杂的场景-->
  <div class="data-list-padding">
    <div class="tabs">
      <div class="tabs-wrap">
        <div class="tabs-nav">
          导航条
        </div>
      </div>
      <div class="tabs-content">
        <div class="tabs">
          <div class="tabs-wrap">
            <div class="tabs-nav">导航条2</div>
          </div>
          <div class="tabs-content">
            <data-list ref="dataList" :url="url" :dataPath="dataPath" direction="top" :size="20">
              <!--通过slot-scope从data-list组件获取到返回的数据-->
              <ul slot-scope="props">
                <li v-for="(item, index) in props.list" :key="index">
                  <h4>{{item.name}}</h4>
                </li>
              </ul>
            </data-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'padding',
  data() {
    return {
      url: 'http://yapi.demo.qunar.com/mock/30643/listars/data-list',
      dataPath: 'payload.content' // 渲染组件的分页数据在接口返回的数据中的路径, 嵌套对象使用.表示即可
    }
  }
}
</script>
<style>
html,
body {
  margin: 0;
  height: 100%;
}
#root {
  height: 100%;
}
.data-list-padding {
  height: 100%;
}
.tabs {
  position: relative;
  padding-top: 50px;
  height: 100%;
  box-sizing: border-box;
}
.tabs-wrap {
  height: 50px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  overflow: hidden;
  position: absolute;
}
.tabs-nav {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  cursor: pointer;
  padding: 0 5px;
  font-size: 14px;
  position: relative;
  color: #333;
  line-height: 44px;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
  min-width: 0;
}
.tabs-content {
  height: 100%;
  overflow: auto;
  border-top: 1px solid;
}
</style>
