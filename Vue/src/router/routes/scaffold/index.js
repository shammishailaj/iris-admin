import scaffold from '@/pages/scaffold'
import home from '@/pages/cli/home'
import error from '@/pages/404'
import a from '@/pages/cli/a'

export default {
  path: '/',
  component: scaffold,
  children: [
    {
      path: '',
      component: home
    },
    // {
    //   path: 'home',
    //   component: () => new Promise((a) => {
    //     setTimeout(() => {
    //       a(home)
    //     }, 0)
    //   }),
    // },
    {
      path: 'home',
      component: home,
    },
    {
      path: 'a',
      component: a
    },
    {
      path: '*',
      component: error
    }
  ]
}