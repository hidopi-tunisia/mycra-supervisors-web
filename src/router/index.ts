import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/home-view.vue'
import ProjectsView from '@/views/projects/projects-view.vue'
import ConsultantsView from '@/views/consultants/consultants-view.vue'
import ConsultantDetailsView from '@/views/consultants/consultant-details-view.vue'
import ConsultantCreateView from '@/views/consultants/new-consultant-view.vue'
import ClientsView from '@/views/clients/clients-view.vue'
import ClientCreateView from '@/views/clients/new-client-view.vue'
import NotificationsView from '@/views/notifications/notifications-view.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView
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
      path: '/clients',
      name: 'clients',
      component: ClientsView
    },
    {
      path: '/clients/new',
      name: 'create-client',
      component: ClientCreateView
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: NotificationsView
    }
  ]
})

export default router
