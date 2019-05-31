```vue
<template>
  <div>
    <button @click="reset">重置</button>
    <div style="height: 400px; overflow: auto">
      <data-list ref="dataList" :url="url">
        <ul slot-scope="props">
          <li v-for="(item, index) in props.list" :key="index">
            {{item.name}}
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
    }
  },
  methods: {
    reset() {
      this.$refs.dataList.reset()
    }
  }
}
</script>
```
