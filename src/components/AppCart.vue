<script>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "AppCart",
  emits: ["update-total-items"],
  props: {
    isCheckoutPage: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();
    const cart = ref({ restaurantId: null, restaurantName: "", items: [] });

    const loadCart = () => {
      const savedCart = sessionStorage.getItem("cart");
      if (savedCart) {
        cart.value = JSON.parse(savedCart);
      }
    };

    const saveCart = () => {
      sessionStorage.setItem("cart", JSON.stringify(cart.value));
    };

    const totalItemsInCart = computed(() => {
      return cart.value.items.reduce((total, item) => total + item.quantity, 0);
    });

    const updateTotalItems = () => {
      emit("update-total-items");
      window.dispatchEvent(
        new CustomEvent("update-cart-total", {
          detail: { total: totalItemsInCart.value },
          bubbles: true,
          composed: true,
        })
      );
    };

    const addToCart = (event) => {
      const item = event.detail;
      if (
        cart.value.restaurantId &&
        cart.value.restaurantId !== item.restaurantId
      ) {
        alert(
          "Non puoi ordinare da ristoranti diversi. Svuota prima il carrello."
        );
        return;
      }

      if (!cart.value.restaurantId) {
        cart.value.restaurantId = item.restaurantId;
        cart.value.restaurantName = item.restaurantName;
      }

      const existingItem = cart.value.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        cart.value.items.push({
          ...item,
          quantity: item.quantity,
          price: Number(item.price),
        });
      }
      saveCart();
      updateTotalItems();
    };

    const removeItem = (item) => {
      const index = cart.value.items.findIndex((i) => i.id === item.id);
      if (index > -1) {
        cart.value.items.splice(index, 1);
      }
      if (cart.value.items.length === 0) {
        cart.value.restaurantId = null;
        cart.value.restaurantName = "";
      }
      saveCart();
      updateTotalItems();
    };

    const increaseQuantity = (item) => {
      item.quantity++;
      saveCart();
      updateTotalItems();
    };

    const decreaseQuantity = (item) => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        removeItem(item);
      }
      saveCart();
      updateTotalItems();
    };

    const clearCart = () => {
      cart.value = { restaurantId: null, restaurantName: "", items: [] };
      saveCart();
      updateTotalItems();
    };

    const cartTotal = computed(() => {
      return cart.value.items.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
      );
    });

    const formatPrice = (price) => {
      return Number(price).toFixed(2);
    };

    const handleButtonClick = () => {
      if (props.isCheckoutPage) {
        // Torna alla pagina dei dettagli del ristorante
        const restaurantSlug = route.query.restaurantSlug;
        if (restaurantSlug) {
          router.push({
            name: "RestaurantDetails",
            params: { slug: restaurantSlug },
          });
        } else {
          console.error("Restaurant slug not found in query parameters");
        }
      } else {
        // Vai alla pagina di checkout
        router.push({
          name: "checkout",
          query: { restaurantSlug: route.params.slug },
        });
      }
    };

    onMounted(() => {
      loadCart();
      window.addEventListener("add-to-cart", addToCart);
      updateTotalItems();
    });

    onUnmounted(() => {
      window.removeEventListener("add-to-cart", addToCart);
    });

    watch(totalItemsInCart, () => {
      updateTotalItems();
    });

    return {
      cart,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      cartTotal,
      formatPrice,
      totalItemsInCart,
      handleButtonClick,
    };
  },
};
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Il tuo carrello</h2>

    <div v-if="!cart.items.length" class="alert alert-info">
      Il tuo carrello è vuoto.
    </div>

    <div v-else>
      <div class="card mb-4">
        <div class="card-header">Ordine da: {{ cart.restaurantName }}</div>
        <ul class="list-group list-group-flush">
          <li v-for="item in cart.items" :key="item.id" class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h5 class="mb-1">{{ item.name }}</h5>
                <p class="mb-1">Prezzo: €{{ formatPrice(item.price) }}</p>
              </div>
              <div class="d-flex align-items-center">
                <button
                  @click="decreaseQuantity(item)"
                  class="btn btn-sm btn-outline-secondary me-2"
                >
                  -
                </button>
                <span class="me-2">{{ item.quantity }}</span>
                <button
                  @click="increaseQuantity(item)"
                  class="btn btn-sm btn-outline-secondary me-2"
                >
                  +
                </button>
                <button @click="removeItem(item)" class="btn btn-sm btn-danger">
                  Rimuovi
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4>Totale: €{{ formatPrice(cartTotal) }}</h4>
        <button @click="clearCart" class="btn btn-warning">
          Svuota carrello
        </button>
      </div>

      <button @click="handleButtonClick" class="btn btn-primary btn-lg color">
        {{ isCheckoutPage ? "Torna al ristorante" : "Procedi all'ordine" }}
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "../scss/partials/variables" as *;
.color{
  background-color: $main-color;
}
</style>