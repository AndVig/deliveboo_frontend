



<template>
  <div>
    <h2>Cerca Ristoranti per Tipo</h2>

    <!-- Checkbox per i tipi di cucina -->
    <div v-for="type in availableTypes" :key="type.id">
      <input type="checkbox" :id="type.id" :value="type.id" v-model="selectedTypes">
      <label :for="type.id">{{ type.name }}</label>
    </div>

    <button @click="searchRestaurants">Cerca Ristoranti</button>

    <!-- Visualizzazione dei risultati -->
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
</template>

<script>
import axios from 'axios';

export default {
    name: "AppHeader",
  data() {
    return {
      availableTypes: [
        { id: 1, name: 'Italiano' },
        { id: 2, name: 'Giapponese' },
        { id: 3, name: 'Messicano' },
        // Aggiungi altri tipi di cucina come necessario
      ],
      selectedTypes: [],
      restaurants: [],
      searched: false
    }
  },
  methods: {
    async searchRestaurants() {
      try {
        this.searched = true;
        const response = await axios.get('/api/restaurants', {
          params: {
            types: this.selectedTypes.join(',')
          }
        });
        this.restaurants = response.data.data; // Assumendo che la risposta sia formattata come una risorsa Laravel
      } catch (error) {
        console.error('Errore nella ricerca dei ristoranti:', error);
        // Gestisci l'errore (ad esempio, mostrando un messaggio all'utente)
      }
    }
  }
}
</script>
