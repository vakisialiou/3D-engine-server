import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('LayoutHeader', {
  props: {
    title: {
      type: [String, Number]
    },
    titleSmall: {
      type: [String, Number]
    },
  },
  data: function () {
    return {

    }
  },
  methods: {

  },
  template: template
})