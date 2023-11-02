import ClientDetailsView from '@/views/clients/client-details-view.vue'
import ClientsView from '@/views/clients/clients-view.vue'
import ClientCreateView from '@/views/clients/new-client-view.vue'
import ConsultantDetailsView from '@/views/consultants/consultant-details-view.vue'
import ConsultantsView from '@/views/consultants/consultants-view.vue'
import ConsultantCreateView from '@/views/consultants/new-consultant-view.vue'
import HomeView from '@/views/home/home-view.vue'
import MeView from '@/views/me/me-view.vue'
import NotificationsView from '@/views/notifications/notifications-view.vue'
import ProjectsView from '@/views/projects/projects-view.vue'
import AlertsView from '@/views/alerts/alerts-view.vue'
import AboutView from '@/views/about/about-view.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      path: '/clients/:id',
      name: 'create-details',
      component: ClientDetailsView
    },
    {
      path: '/clients/new',
      name: 'create-client',
      component: ClientCreateView
    },
    {
      path: '/notifications/new',
      name: 'create-notification',
      component: NotificationsView
    },
    {
      path: '/me',
      name: 'me',
      component: MeView
    },
    {
      path: '/alerts',
      name: 'alerts',
      component: AlertsView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/upgrade',
      name: 'upgrade',
      component: AboutView
    }
  ]
})

export default router
