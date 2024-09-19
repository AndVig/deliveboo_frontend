<script>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import AppCart from "../components/AppCart.vue";

export default {
  name: "RestaurantDetails",
  components: {
    AppCart,
  },
  setup() {
    const route = useRoute();
    const restaurant = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const isCartVisible = ref(true);
    const cart = ref({ items: [] });
    const quantities = ref({});
    const totalItemsInCart = ref(0);

    const api = ref({
      baseUrl: "http://127.0.0.1:8000",
      endPoints: {
        restaurantsList: "/api/restaurants",
        typesList: "/api/types",
        restaurantDetails: "/api/restaurants",
      },
    });

    const getImageUrl = (path) => {
      return `${api.value.baseUrl}/storage${path}`;
    };

    const fetchRestaurantDetails = async () => {
      const slug = route.params.slug;
      try {
        loading.value = true;
        const url = `${api.value.baseUrl}${api.value.endPoints.restaurantDetails}/${slug}`;
        console.log("Fetching restaurant details from:", url);
        const response = await axios.get(url);
        restaurant.value = response.data.data;
        console.log("Dettagli ristorante:", restaurant.value);
        restaurant.value.dishes.forEach((dish) => {
          quantities.value[dish.id] = 1;
        });
      } catch (err) {
        console.error(
          "Errore nel caricamento dei dettagli del ristorante:",
          err
        );
        error.value =
          "Si è verificato un errore nel caricamento dei dettagli del ristorante.";
      } finally {
        loading.value = false;
      }
    };

    const loadCart = () => {
      const savedCart = sessionStorage.getItem("cart");
      if (savedCart) {
        cart.value = JSON.parse(savedCart);
        updateTotalItems();
      }
    };

    const addToCart = (dish) => {
      if (restaurant.value) {
        const cartItem = {
          id: dish.id,
          name: dish.name,
          price: Number(dish.price),
          quantity: quantities.value[dish.id],
          restaurantId: restaurant.value.id,
          restaurantName: restaurant.value.name,
        };

        window.dispatchEvent(
          new CustomEvent("add-to-cart", {
            detail: cartItem,
            bubbles: true,
            composed: true,
          })
        );
        loadCart();
        quantities.value[dish.id] = 1;
      }
    };

    const toggleCart = () => {
      isCartVisible.value = !isCartVisible.value;
    };

    const incrementQuantity = (dishId) => {
      quantities.value[dishId]++;
    };

    const decrementQuantity = (dishId) => {
      if (quantities.value[dishId] > 1) {
        quantities.value[dishId]--;
      }
    };

    const updateTotalItems = () => {
      totalItemsInCart.value = cart.value.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    };

    const updateCartTotal = (event) => {
      totalItemsInCart.value = event.detail.total;
    };

    onMounted(() => {
      fetchRestaurantDetails();
      loadCart();
      window.addEventListener("add-to-cart", loadCart);
      window.addEventListener("update-cart-total", updateCartTotal);
    });

    onUnmounted(() => {
      window.removeEventListener("add-to-cart", loadCart);
      window.removeEventListener("update-cart-total", updateCartTotal);
    });

    return {
      restaurant,
      loading,
      error,
      getImageUrl,
      addToCart,
      isCartVisible,
      toggleCart,
      totalItemsInCart,
      quantities,
      incrementQuantity,
      decrementQuantity,
      updateTotalItems,
      isCheckoutPage: false,
    };
  },
};
</script>

<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div :class="{ 'col-md-9': isCartVisible, 'col-md-12': !isCartVisible }">
        <div v-if="loading" class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Caricamento...</span>
          </div>
          <p>Caricamento dettagli ristorante...</p>
        </div>

        <div v-else-if="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>

        <div v-else-if="restaurant" class="restaurant-details">
          <div class="card mb-4">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  :src="getImageUrl(restaurant.image)"
                  class="img-fluid rounded-start"
                  :alt="restaurant.name"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2 class="card-title">{{ restaurant.name }}</h2>
                  <p class="card-text">
                    <strong>Indirizzo:</strong> {{ restaurant.address }},
                    {{ restaurant.city }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h3 class="mb-3">Menu</h3>
          <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            <div class="col" v-for="dish in restaurant.dishes" :key="dish.id">
              <div class="card h-100">
                <img
                  :src="getImageUrl(dish.image)"
                  class="card-img-top"
                  :alt="dish.name"
                />
                <div class="card-body">
                  <h5 class="card-title">{{ dish.name }}</h5>
                  <p class="card-text">{{ dish.description }}</p>
                  <p class="card-text">
                    <strong>Prezzo:</strong> €{{
                      Number(dish.price).toFixed(2)
                    }}
                  </p>
                  <div class="d-flex align-items-center">
                    <button
                      @click="decrementQuantity(dish.id)"
                      class="btn btn-outline-secondary btn-sm me-2"
                    >
                      -
                    </button>
                    <span class="me-2">{{ quantities[dish.id] }}</span>
                    <button
                      @click="incrementQuantity(dish.id)"
                      class="btn btn-outline-secondary btn-sm me-2"
                    >
                      +
                    </button>
                    <button @click="addToCart(dish)" class="btn btn-primary">
                      Aggiungi
                      {{
                        quantities[dish.id] > 1
                          ? quantities[dish.id] + " al"
                          : "al"
                      }}
                      carrello
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="alert alert-warning" role="alert">
          Nessun dettaglio disponibile per questo ristorante.
        </div>
      </div>
      <transition name="slide">
        <div v-show="isCartVisible" class="col-md-3 cart-column">
          <AppCart
            @update-total-items="updateTotalItems"
            :isCheckoutPage="isCheckoutPage"
          />
        </div>
      </transition>
    </div>
    <button
      @click="toggleCart"
      class="btn btn-primary cart-toggle-btn"
      :class="{ 'cart-toggle-btn-hidden': !isCartVisible }"
    >
      {{ isCartVisible ? "Nascondi carrello" : "Mostra carrello" }}
      <span v-if="totalItemsInCart > 0" class="badge bg-danger ms-2">
        {{ totalItemsInCart }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.restaurant-details img {
  max-height: 300px;
  object-fit: cover;
}

.cart-toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.cart-toggle-btn-hidden {
  opacity: 0.7;
}

.cart-toggle-btn-hidden:hover {
  opacity: 1;
}

.cart-column {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  overflow-y: auto;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 999;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.cart-toggle-btn .badge {
  font-size: 0.8em;
  vertical-align: top;
}

.btn-outline-secondary {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}
</style>
