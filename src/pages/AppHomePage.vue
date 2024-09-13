<script>
import axios from "axios";

import AppCarousel from "../components/AppCarousel.vue";
import AppSponsor from "../components/AppSponsor.vue";
import AppMerchBlock from "../components/AppMerchBlock.vue";
import AppSearch from "../components/AppSearch.vue";
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
    AppCarousel,
      AppSearch,
    AppSponsor,
    AppMerchBlock,
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
        <!-- <div class="col--4 py-3" v-for="restaurant in response.data" :key="restaurant.id">
          <AppCarousel :companyName="restaurant.companyName" />
        </div> -->
        <div class="container">
          <AppSearch />
        </div>
      </div>
    </div>
  </div>

  

</template>

<style></style>
