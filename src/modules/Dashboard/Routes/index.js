export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/feed',
    component: () => import('../DashboardLayout.vue'),
    children: [
      {
        path: '/dashboard/feed',
        name: 'dashboard.feed',
        component: () => import('../Pages/Feed/Index.vue')
      },
      {
        path: '/dashboard/pages/login/login', // Rota do login
        name: 'dashboard.register.login',
        component: () => import('../Pages/Login/Index.vue')
      },
      {
        path: '/dashboard/pages/login/update', // Rota do sigUp
        name: 'dashboard.register.update',
        component: () => import('../Pages/Login/Update.vue')
      },
      {
        path: '/dashboard/register',
        name: 'dashboard.register',
        redirect: '/dashboard/register/product',
        component: () => import('../Pages/Register/Index.vue'),
        children: [
          {
            path: '/dashboard/register/product',
            name: 'dashboard.register.product',
            component: () => import('../Pages/Register/Product.vue')
          },
          {
            path: '/dashboard/register/service',
            name: 'dashboard.register.service',
            component: () => import('../Pages/Register/Service.vue')
          }
        ]
      }
    ]
  }
]
