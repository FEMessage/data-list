```vue
<template>
  <div>
    <button @click="reset">reset</button>
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
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/data-list',
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
