<template>
<div>
  <b-navbar type="dark" variant="primary" toggleable v-if="loggedIn">
    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_dropdown_collapse">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'notes'  }">Notas</b-nav-item>
        <b-nav-item :to="{ name: 'categories'  }">Categorías</b-nav-item>
        <b-nav-item-dropdown :text="user" right>
          <b-dropdown-item href="#">Mi Cuenta</b-dropdown-item>
          <b-dropdown-item href="#">Configuración</b-dropdown-item>
          <b-dropdown-item href="javascript:void(0);" @click="logout()">Cerrar sesión</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import Auth from '@/middleware/auth.js';
export default {
  name:'navbar',
  data(){
    return {
      loggedIn: Auth.loggedIn(),
      user: Auth.getUser()
    }
  },
  methods:{
    logout(){
      Auth.logout();
    }
  }
};
</script>

<style>
</style>
