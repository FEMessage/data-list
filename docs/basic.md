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
      url: 'https://easy-mock.com/mock/5c323f1b2188f1589db6af5f/data-list',
    }
  }
}
</script>
```
