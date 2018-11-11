<template>
<div>
  <b-navbar type="dark" variant="primary" toggleable>
    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_dropdown_collapse">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'notes'  }">Notas</b-nav-item>
        <b-nav-item :to="{ name: 'categories'  }">Categorías</b-nav-item>
        <b-nav-item-dropdown text="Cuenta" right>
          <b-dropdown-item href="#">Mi Cuenta</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
          <b-dropdown-item href="#">Cerrar sesión</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {};
</script>

<style>
</style>
