import {configure} from '@storybook/vue'

import Vue from 'vue'
import axios from 'axios'

// Import your component
import Component from '../src/index'

// Register your component
Vue.component('data-list', Component)

Vue.prototype.$axios = axios

function loadStories() {
  // You can require as many stories as you need.
  require('../stories')
}

configure(loadStories, module)
