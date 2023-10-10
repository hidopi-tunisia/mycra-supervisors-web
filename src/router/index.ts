import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home-view.vue'
import CRAsView from '@/views/cras-view.vue'
import ClientsView from '@/views/clients-view.vue'
import ConsultantsView from '@/views/consultants-view.vue'
import ConsultantDetailsView from '@/views/consultant-details-view.vue'
import ConsultantCreateView from '@/views/new-consultant-view.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/consultants',
      name: 'consultants',
      component: ConsultantsView
    },
    {
      path: '/consultants/:id',
      name: 'consultant-details',
      component: ConsultantDetailsView
    },
    {
      path: '/consultants/new',
      name: 'create-consultant',
      component: ConsultantCreateView
    },
    {
      path: '/cras',
      name: 'cras',
      component: CRAsView
    },
    {
      path: '/clients',
      name: 'clients',
      component: ClientsView
    }
  ]
})

export default router
