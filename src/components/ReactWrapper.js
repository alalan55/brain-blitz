// ReactInVue.js
import { defineComponent, h, onMounted, onBeforeUnmount, ref } from 'vue'
import { createRoot } from 'react-dom/client'
import React from 'react'

export default defineComponent({
  props: {
    component: {
      type: [Object, Function],
      required: true
    },
    props: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const container = ref(null)
    let root = null

    onMounted(async () => {
      root = createRoot(container.value)
      root.render(React.createElement(props.component, props.props))
    })

    onBeforeUnmount(() => {
      if (root) {
        root.unmount()
      }
    })

    return () => h('div', { ref: container })
  }
})
