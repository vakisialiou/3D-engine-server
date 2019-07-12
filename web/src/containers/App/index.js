import './style.scss'
import Vue from 'vue'
import template from './template.html'

import '@components/Header'
import '@components/LayoutHeader'
import '@components/LayoutContent'
import '@components/SideBarMenu'

import { mapState } from 'vuex'

export default Vue.component('App', {
  data: function () {
    return {

    }
  },
  mounted() {

  },
  computed: {
    ...mapState({
      name(state) {
        return state.app.name
      },
      menuItems(state) {
        return state.app.menuItems
      }
    }),
  },
  methods: {
    search(event, value) {
      console.log(event, value)
    },
    clickMenuItem(event, item) {
      console.log(event, item, 'click')
    },
    removeMenuItem(event, item) {
      console.log(event, item, 'remove')
    },
    addMenuItem(event) {
      console.log(event, 'add')
    }
  },
  template: template
})