import Vue from "vue";
import Router from "vue-router";

//Views
import Status from "./views/status/status.vue";
import Login from "./views/login/login.vue";
import Register from "./views/login/register.vue";
import Account from "./views/account/index.vue";
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
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/status",
      name: "status",
      component: Status
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/account",
      name: "account",
      component: Account,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/notes",
      name: "notes",
      component: Notes,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/notes/new",
      name: "newnote",
      component: newNote,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/notes/:id",
      name: "editnote",
      component: editNote,
      meta: {
        requiresAuth: true
      }
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
      component: newCategory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/categories/:id",
      name: "editcategory",
      component: editCategory,
      meta: {
        requiresAuth: true
      }
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
      let data = JSON.parse(localStorage.getItem('login'));
      if (data.auth){
        next();
      } else {
        next({
          path: "/login",
          params: { nextUrl: to.fullPath }
        });
      }
    }
  } else {
    next();
  }
});

export default router;
