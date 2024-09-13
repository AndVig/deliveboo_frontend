<script>
import axios from 'axios';

export default {
    name: "AppSearch",
    data() {
        return {
            api: {
                baseUrl: 'http://127.0.0.1:8000',
                endPoints: {
                    restaurantsList: '/api/restaurants',
                    typesList: '/api/types',
                }
            },
            availableTypes: [],
            selectedTypes: [],
            restaurants: [],
            searched: false,
            loading: true
        }
    },
    mounted() {
        this.loadTypes();
    },
    methods: {
        async loadTypes() {
            try {
                const url= this.api.baseUrl + this.api.endPoints.typesList;
                console.log(url);
                const response = await axios.get(url);
                this.availableTypes = response.data.data;
                console.log(response);
                this.loading = false;
            } catch (error) {
                console.error('Errore nel caricamento dei tipi di cucina:', error);
                this.loading = false;
            }
        },
        async searchRestaurants() {
            if (this.selectedTypes.length === 0) return;
            try {
                this.searched = true;
                const response = await axios.get(this.api.baseUrl + this.api.endPoints.restaurantsList, {
                    params: {
                        types: this.selectedTypes.join(',')
                    }
                });
                this.restaurants = response.data.data;
            } catch (error) {
                console.error('Errore nella ricerca dei ristoranti:', error);
            }
        }
    }
}
</script>

<template>
    <div>
        <h2>Cerca Ristoranti per Tipo</h2>
        <div v-if="loading">Caricamento tipi di cucina...</div>
        <div v-else>
            <div v-for="type in availableTypes" :key="type.id">
                <input type="checkbox" :id="type.id" :value="type.name" v-model="selectedTypes">
                <label :for="type.id">{{ type.name }}</label>
            </div>
            <button @click="searchRestaurants" :disabled="selectedTypes.length === 0">Cerca Ristoranti</button>
            <div v-if="restaurants.length">
                <h3>Risultati:</h3>
                <ul>
                    <li v-for="restaurant in restaurants" :key="restaurant.id">
                        {{ restaurant.name }}
                    </li>
                </ul>
            </div>
            <p v-else-if="searched">Nessun ristorante trovato.</p>
        </div>
    </div>
</template>