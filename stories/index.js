import {storiesOf} from '@storybook/vue'
import Basic from './basic'
import SlotTip from './slot-tip'
import Reset from './reset'
import Query from './query'
import SaveQuery from './save-query'
import Padding from './padding'

storiesOf('v-infinite-loading', module)
  .add('basic usage', () => ({
    components: {Basic},
    template: '<basic/>'
  }))
  .add('slot-tip', () => ({
    components: {SlotTip},
    template: '<slot-tip/>'
  }))
  .add('reset', () => ({
    components: {Reset},
    template: '<reset/>'
  }))
  .add('query', () => ({
    components: {Query},
    template: '<query/>'
  }))
  .add('save-query', () => ({
    components: {SaveQuery},
    template: '<save-query/>'
  }))
  .add('padding', () => ({
    components: {Padding},
    template: '<padding/>'
  }))
