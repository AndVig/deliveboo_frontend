<script>
import axios from "axios";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import AppCarousel from "../components/AppCarousel.vue"
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
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,
      };
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
  <h1>Home</h1>
  <div>
    <div class="d-flex">
      <div class="row">
        <div class="col--4 py-3" v-for="restaurant in response.data" :key="restaurant.id">
          <AppCarousel :companyName="restaurant.companyName" />
        </div>
      </div>
    </div>
  </div>

  

</template>

<style></style>
