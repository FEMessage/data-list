basic usage

```vue
<template>
  <div style="height: 400px; overflow: auto">
    <data-list ref="dataList" :url="url">
      <!--通过slot-scope从data-list组件获取到返回的数据-->
      <!-- get list itme data via slot, so you can customize rendering-->
      <ul slot-scope="props">
        <li v-for="(item, index) in props.list" :key="index">
          {{item.name}}
        </li>
      </ul>
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
