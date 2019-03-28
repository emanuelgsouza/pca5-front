export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../DashboardLayout.vue'),
    children: [
      {
        path: '/dashboard/index',
        name: 'dashboard.index',
        component: () => import('../Pages/Index.vue')
      }
    ]
  }
]
