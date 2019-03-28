import DashboardRoutes from 'src/modules/Dashboard/Routes'

const routes = [
  ...DashboardRoutes,
  {
    path: '/',
    redirect: '/dashboard'
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
