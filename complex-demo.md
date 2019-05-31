页面比较复杂的场景

```vue
<template>
  <div style="height: 400px; overflow: auto">
    <div :style="tabs">
      <div :style="tabsWrap">
        <div :style="tabsNav">导航条</div>
      </div>
      <div :style="tabsContent">
        <div :style="tabs">
          <div :style="tabsWrap">
            <div :style="tabsNav">导航条2</div>
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
      url: 'https://easy-mock.com/mock/5c323f1b2188f1589db6af5f/data-list',
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
