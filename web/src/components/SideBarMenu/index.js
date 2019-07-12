import './style.scss'
import Vue from 'vue'
import template from './template.html'
import '@components/SideBarMenuItem'

export default Vue.component('SideBarMenu', {
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data: function () {
    return {
      menuItems: this.items,
    }
  },
  methods: {
    click(event, item) {
      this.$emit('click', event, item)
    },
    remove(event, item) {
      this.$emit('remove', event, item)
    },
    add(event, item) {
      this.$emit('add', event, item)
    }
  },
  template: template
})