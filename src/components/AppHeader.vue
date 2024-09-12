<script>
export default{
  name:'HeaderComponent',
};
</script>

<template>
  <header class="py-3 mb-3 border-bottom">
    <div class="container-fluid d-grid gap-3 align-items-center" >
        <a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none" href="/">
            <svg class="bi me-2" width="40" height="32">
             </svg>
             <span class="fs-4">DeliveBoo</span>
        </a>
        
    </div>
  </header>
</template>

<style>
  header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    h1 {
        color: red;
    }
  }
</style>
