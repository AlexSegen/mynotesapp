<template>
<div>
  <b-navbar type="dark" variant="primary" toggleable>
    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-navbar-brand :to="{ name: 'home' }">MyNotes</b-navbar-brand>
    <b-collapse is-nav id="nav_dropdown_collapse">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'notes'  }">Notas</b-nav-item>
        <b-nav-item :to="{ name: 'categories'  }">Categorías</b-nav-item>
        <b-nav-item-dropdown :text="user.name" right>
          <b-dropdown-item :to="{ name: 'account' }">Mi Cuenta</b-dropdown-item>
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
  computed:{
    user(){
      return Auth.getUser();
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
