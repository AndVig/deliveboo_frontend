<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AppHomePage from './pages/AppHomePage.vue';


export default {
  name: 'AppDeliveBoo',
  components: {
    AppHeader,
    AppFooter,
    AppHomePage,
  }
}
</script>

<template>
  <AppHeader />
  <AppHomePage />
  <AppFooter />
</template>

<style></style>
