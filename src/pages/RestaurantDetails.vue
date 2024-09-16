<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  name: 'RestaurantDetails',
  setup() {
    const route = useRoute();
    const restaurant = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const api = {
      baseUrl: 'http://127.0.0.1:8000',
      endPoints: {
        restaurantsList: '/api/restaurants',
        typesList: '/api/types',
        restaurantDetails: '/api/restaurants' // Aggiungiamo questo endpoint
      }
    };

    const fetchRestaurantDetails = async () => {
      const slug = route.params.slug;
      try {
        loading.value = true;
        const url = `${api.baseUrl}${api.endPoints.restaurantDetails}/${slug}`;
        console.log('Fetching restaurant details from:', url);
        const response = await axios.get(url);
        restaurant.value = response.data.data;
        console.log('Dettagli ristorante:', restaurant.value);
      } catch (err) {
        console.error('Errore nel caricamento dei dettagli del ristorante:', err);
        error.value = 'Si è verificato un errore nel caricamento dei dettagli del ristorante.';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchRestaurantDetails();
    });

    return {
      restaurant,
      loading,
      error
    };
  }
}
</script>

<template>
  <div class="container py-4">
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
      <!-- Dettagli del ristorante -->
      <div class="card mb-4">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="restaurant.image" class="img-fluid rounded-start" :alt="restaurant.name">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h2 class="card-title">{{ restaurant.name }}</h2>
              <p class="card-text">
                <strong>Indirizzo:</strong> {{ restaurant.address }}, {{ restaurant.city }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu del ristorante -->
      <h3 class="mb-3">Menu</h3>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="dish in restaurant.dishes" :key="dish.id">
          <div class="card h-100">
            <img :src="dish.image" class="card-img-top" :alt="dish.name">
            <div class="card-body">
              <h5 class="card-title">{{ dish.name }}</h5>
              <p class="card-text">{{ dish.description }}</p>
              <p class="card-text"><strong>Prezzo:</strong> €{{ dish.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-warning" role="alert">
      Nessun dettaglio disponibile per questo ristorante.
    </div>
  </div>
</template>

<style scoped>
.restaurant-details img {
  max-height: 300px;
  object-fit: cover;
}
</style>