import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('Header', {
  props: {
    appName: {
      type: String,
    },
    appUrl: {
      type: String,
      default: '#'
    },
    placeholder: {
      type: String,
    },
    searchValue: {
      type: String,
    },
    searchButton: {
      type: String,
      default: 'Search'
    }
  },
  data: function () {
    return {
      modelValue: this.searchValue
    }
  },
  methods: {
    search(event) {
      this.$emit('search', event, this.modelValue || null)
    }
  },
  template: template
})