import Vue from "vue";
import Router from "vue-router";

//Views
import Login from "./views/login/login.vue";
import Home from "./views/Home.vue";
import Notes from "./views/notes/index.vue";
import newNote from "./views/notes/new.vue";
import editNote from "./views/notes/edit.vue";
import Categories from "./views/categories/index.vue";
import editCategory from "./views/categories/edit.vue";
import newCategory from "./views/categories/new.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/",
      name: "notes",
      component: Notes
    },
    {
      path: "/notes/new",
      name: "newnote",
      component: newNote
    },
    {
      path: "/notes/:id",
      name: "editnote",
      component: editNote
    },
    {
      path: "/categories",
      name: "categories",
      component: Categories,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/categories/new",
      name: "newcategory",
      component: newCategory
    },
    {
      path: "/categories/:id",
      name: "editcategory",
      component: editCategory
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("login") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
