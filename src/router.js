import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Notes from './views/notes/index.vue'
import newNote from './views/notes/new.vue'
import editNote from './views/notes/edit.vue'
import Categories from './views/categories/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'notes',
      component: Notes
    },
    {
      path: '/notes/new',
      name: 'newnote',
      component: newNote
    },
    {
      path: '/notes/:id',
      name: 'editnote',
      component: editNote
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
