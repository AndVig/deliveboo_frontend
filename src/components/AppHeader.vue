<script>
export default {
  name: "AppHeader",
};
</script>

<template>
  <header class="m-4">
    <div class="container-fluid">
      <div class="d-flex justify-content-between">
        <div class="row">
          <!-- DELIVEBOO -->
          <div>
            <router-link :to="{ name: 'home' }" class="nav-link active" aria-current="page">
              <strong class="main-color">Deliveboo</strong>
            </router-link>
          </div>
        </div>
        <!-- BARRA DI RICERCA -->
        <div>
          <form class="d-flex" role="search">
            <input type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use "../scss/partials/variables" as *;

.main-color {
  color: $main-color;
}
</style>
