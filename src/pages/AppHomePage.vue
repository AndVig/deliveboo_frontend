<script>
import axios from "axios";

import AppSponsor from "../components/AppSponsor.vue";
import AppMerchBlock from "../components/AppMerchBlock.vue";
import AppSearch from "../components/AppSearch.vue";
import AppCarousel from "../components/AppCarousel.vue";


export default {
  name: "AppHomePage",
  data() {
    return {
      api: {
        baseUrl: "http://127.0.0.1:8000",
        endPoints: {
          restaurantsList: "/api/restaurants",
        },
      },
      response: {},
    };
  },
  components: {

    AppSearch,
    AppSponsor,
    AppMerchBlock,
    AppCarousel,
  },
  methods: {
    getRestaurants() {
      const apiUrl = this.api.baseUrl + this.api.endPoints.restaurantsList;
      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response.data);
          this.response = response.data;
        })
        .catch((error) => {
          console.error("Errore nel recupero dei ristoranti:", error);
        });
    },
  },
  created() {
    this.getRestaurants();
  },
};
</script>

<template>
  <h1>Home</h1>
  <div>
    <div class="d-flex">
      <div class="row">
        <div class="container">
          
          <AppSearch />
          <AppCarousel />
          <AppMerchBlock />
          <AppSponsor />
        </div>
      </div>
    </div>
  </div>



</template>

<style></style>
