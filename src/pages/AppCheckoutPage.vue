<script>
import { useRoute } from "vue-router";
import AppCart from "../components/AppCart.vue";

export default {
  name: "AppCheckoutPage",
  components: {
    AppCart,
  },
  setup() {
    const route = useRoute();
    const restaurantSlug = route.query.restaurantSlug;

    return {
      restaurantSlug,
    };
  },
};
</script>

<template>
  <h1>Checkout</h1>
  <div>
    <AppCart :isCheckoutPage="true" />
  </div>
</template>

<style></style>
