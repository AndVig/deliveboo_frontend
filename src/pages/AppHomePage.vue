<script>
import axios from "axios";

import AppCarousel from "../components/AppCarousel.vue"
import AppSponsor from "../components/AppSponsor.vue"
export default {
  name: 'AppHomePage',
  data() {
    return {
      api: {
        baseUrl: 'http://127.0.0.1:8000',
        endPoints: {
          restaurantsList: '/api/restaurants'
        }
      },
      response: {},
    }
  },
  components: {
    AppCarousel,
    AppSponsor,
  },
  methods: {
    getRestaurants() {
      const apiUrl = this.api.baseUrl + this.api.endPoints.restaurantsList;
      axios.get(apiUrl)
        .then((response) => {
          console.log(response.data);
          this.response = response.data;
        })
        .catch((error) => {
          console.error('Errore nel recupero dei ristoranti:', error);
        });
    }
  },
  created() {
    this.getRestaurants();

  }
};


</script>

<template>
  <AppCarousel />
  <AppSponsor />
</template>

<style></style>
