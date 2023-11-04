import { createApp } from 'vue'
import router from '@/router'
import Modal from '@/components/map/modals/location-picker-modal/location-picker-modal.vue'

const Picker = {
  instance: null,
  init() {
    const div = document.createElement('div')
    this.instance = createApp(Modal).use(router).mount(div)
    document.body.appendChild(this.instance.$el)
    this.instance.show()
  },
  pick() {
    this.init()
    this.instance.onHide(() => {
      this.instance.hide(() => {
        setTimeout(() => {
          this.instance.$el.remove()
        }, 1000)
      })
    })
    return new Promise((resolve) => {
      this.instance.onPositive((payload) => {
        this.instance.hide(() => {
          setTimeout(() => {
            this.instance.$el.remove()
          }, 1000)
        })
        resolve(payload)
      })
    })
  }
}
export default Picker
