import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('SideBarMenuItem', {
  props: {
    item: {
      type: Object,
    },
    active: {
      type: Boolean,
    },
  },
  computed: {
    htmlClass() {
      return {
        active: this.item.active
      }
    },
  },
  methods: {
    click(event) {
      this.$emit('click', event, this.item)
    },

    remove(event) {
      this.$emit('remove', event, this.item)
    }
  },
  template: template
})