import { createApp } from 'vue'
import router from '@/router'
import Modal from '@/components/consultants/modals/notifications/consultants-notifier-modal.vue'

const Notifier = {
  instance: null,
  init() {
    const div = document.createElement('div')
    this.instance = createApp(Modal).use(router).mount(div)
    document.body.appendChild(this.instance.$el)
    this.instance.show()
  },
  notify() {
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
export default Notifier
