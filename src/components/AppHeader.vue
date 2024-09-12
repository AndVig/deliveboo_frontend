<script>
export default {
  name: "AppHeader",
};
</script>

<template>
  <header class="py-3 mb-3 border-bottom">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                :to="{ name: 'home' }"
                class="nav-link active"
                aria-current="page"
              >
                <strong>Deliveboo</strong>
              </router-link>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
// @use "../scss/partials/variables" as *;
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: $main-color;
  /* h1 {
    color: red;
  } */
}
</style>
