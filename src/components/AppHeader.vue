<script>
export default {
  name: 'AppHeader',
};
</script>

<template>
  <header class="py-3 mb-3 border-bottom">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand"><strong>Delivebool</strong></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'home' }" class="nav-link active" aria-current="page">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'menu' }" class="nav-link active" aria-current="page">Menù</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'carrello' }" class="nav-link active" aria-current="page">Carrello</router-link>
            </li>
          </ul>
          <!-- <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form> -->
        </div>
      </div>
    </nav>
  </header>
</template>

<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  h1 {
    color: red;
  }
}
</style>
