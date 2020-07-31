
throw-custom-error

```vue
<template>
  <div style="height: 400px; overflow: auto">
    <data-list ref="dataList" v-bind="listConfig"  @error="error">
      <!--通过slot-scope从data-list组件获取到返回的数据-->
      <!-- get list itme data via slot, so you can customize rendering-->
      <ul slot-scope="props">
        <li v-for="(item, index) in props.list" :key="index">
          {{item.name}}
        </li>
      </ul>
      <div slot="error">{{errorMsg}}</div>
    </data-list>
  </div>
</template>
<script>
import _get from 'lodash.get'
export default {
  data() {
    return {
        listConfig:{
           url: 'https://mockapi.eolinker.com/KNhMPAkb444ac06613fc8d63795be9ad0beaf55011936ac/data-list',
           throwCustomError:this.throwCustomError
        },
       errorMsg:''
    }
  },
  methods:{
     error(e){
      this.errorMsg = e.message
    },
     throwCustomError(resp){
       if(!_get(resp, 'payload')){
         throw resp
       }
    }
  }
}
</script>
```

