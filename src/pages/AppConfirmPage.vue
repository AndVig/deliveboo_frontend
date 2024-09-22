<template>
    <div class="order-confirmation my-5">
      <div class="header">
        <span class="check-icon">✓</span>
        <h1>Ordine Confermato!</h1>
      </div>
  
      <div class="order-details">
        <h2>Dettagli dell'ordine #{{ order.id }}</h2>
        <ul>
          <li v-for="(item, index) in order.items" :key="index">
            {{ item.quantity }}x {{ item.name }} - €{{ (item.price * item.quantity).toFixed(2) }}
          </li>
        </ul>
        <p class="total">Totale: €{{ calculateTotal(order.items) }}</p>
      </div>
  
      <div class="delivery-info">
        <h3>Indirizzo di consegna:</h3>
        <p>{{ order.deliveryAddress }}</p>
      </div>
  
      <div class="delivery-time">
        <h3>Tempo stimato di consegna:</h3>
        <p>{{ order.estimatedDeliveryTime }}</p>
      </div>
  
      <div class="thank-you-message">
        <p>Grazie per il tuo ordine! Puoi seguire lo stato della tua consegna nell'app.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'OrderConfirmation',
    setup() {
      const order = ref({
        id: 'ORD-12345',
        items: [
          { name: 'Pizza Margherita', quantity: 1, price: 10.99 },
          { name: 'Insalata Cesar', quantity: 1, price: 7.99 },
          { name: 'Coca Cola', quantity: 2, price: 2.50 },
        ],
        total: 23.98,
        deliveryAddress: 'Via Roma 123, 00100 Roma',
        estimatedDeliveryTime: '30-45 minuti',
      });
  
      const calculateTotal = (items) => {
        return items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
      };
  
      return {
        order,
        calculateTotal
      };
    }
  };
  </script>
  
  <style scoped>
  .order-confirmation {
    max-width: 32rem;
    margin: 0 auto;
    padding: 1.5rem;
    background-color: white;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  
  .check-icon {
    color: #10B981;
    margin-right: 0.5rem;
    font-size: 1.5rem;
    background-color: #D1FAE5;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #047857;
  }
  
  h2, h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  ul {
    list-style-type: disc;
    padding-left: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .total {
    font-weight: bold;
    margin-top: 0.5rem;
  }
  
  .order-details, .delivery-info, .delivery-time {
    margin-bottom: 1.5rem;
  }
  
  .thank-you-message {
    background-color: #DBEAFE;
    padding: 1rem;
    border-radius: 0.375rem;
    color: #1E40AF;
  }
  </style>