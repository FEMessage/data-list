
```vue
<template>
  <div style="height: 400px; overflow: auto">
    <div :style="tabs">
      <div :style="tabsWrap">
        <div :style="tabsNav">nav1</div>
      </div>
      <div :style="tabsContent">
        <div :style="tabs">
          <div :style="tabsWrap">
            <div :style="tabsNav">nav2</div>
          </div>
          <div :style="tabsContent">
            <data-list ref="dataList" :url="url" direction="top" :size="20">
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
  data() {
    return {
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/data-list',
      tabs: {
        position: 'relative',
        paddingTop: '50px',
        height: '100%',
        boxSizing: 'border-box',
      },
      tabsWrap: {
        height: '50px',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        overflow: 'hidden',
        position: 'absolute',
      },
      tabsNav: {
        flex: 1,
        cursor: 'pointer',
        padding: '0 5px',
        fontSize: '14px',
        position: 'relative',
        color: '#333',
        lineHeight: '44px',
        textAlign: 'center',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        minWidth: 0,
      },
      tabsContent: {
        height: '100%',
        overflow: 'auto',
        borderTop: '1px solid',
      }
    }
  }
}
</script>
```
