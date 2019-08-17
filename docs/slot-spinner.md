```vue
<template>
  <div style="height: 400px; overflow: auto">
    <data-list ref="dataList" :url="url">
      <ul slot-scope="props">
        <li v-for="(item, index) in props.list" :key="index">
          {{item.name}}
        </li>
      </ul>

      <div slot="spinner">加载中...</div>
    </data-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5c323f1b2188f1589db6af5f/data-list?result=0',
    }
  }
}
</script>
```
