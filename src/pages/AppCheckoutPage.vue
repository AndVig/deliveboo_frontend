<script>
import { useRoute } from "vue-router";
import AppCart from "../components/AppCart.vue";
import AppPayment from "../components/AppPayment.vue";

export default {
  name: "AppCheckoutPage",
  components: {
    AppCart,
    AppPayment,
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
  <h2>Pagamento</h2>
  <div>
    <AppPayment />
  </div>
</template>

<style>
.button {
  cursor: pointer;
  font-weight: 500;
  left: 3px;
  line-height: inherit;
  position: relative;
  text-decoration: none;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
}

.button--small {
  padding: 10px 20px;
  font-size: 0.875rem;
}

.button--green {
  outline: none;
  background-color: #64d18a;
  border-color: #64d18a;
  color: white;
  transition: all 200ms ease;
}

.button--green:hover {
  background-color: #8bdda8;
  color: white;
}
</style>
