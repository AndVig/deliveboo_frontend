<template>
  <div class="merch-block">
    <div class="merch-header">
      <h2 class="merch-title">{{ title }}</h2>
    </div>
    <div class="merch-description">
      {{ description }}
    </div>
    <div class="merch-terms">
      {{ terms }}
      <a :href="termsLink" class="terms-link">Termini e condizioni qui.</a>
    </div>
    <div class="merch-footer"></div>
  </div>
</template>

<script>
export default {
  name: "MerchBlock",
  props: {
    title: {
      type: String,
      default: "Menù in offerta: sconti fino al 25%",
    },
    description: {
      type: String,
      default:
        "Perfetti per dare più gusto alla tua settimana, ordinare i piatti più amati da tutta la famiglia e fare una pausa dai fornelli.",
    },
    terms: {
      type: String,
      default:
        "Si applicano spese di consegna e di servizio. Offerta soggetta a disponibilità, solo per ristoranti aderenti all'iniziativa. Si applicano termini e condizioni, consultabili qui.",
    },
    termsLink: {
      type: String,
      default: "/legal",
    },
  },
};
</script>

<style scoped>
.merch-block {
  background-image: url(/img/sfondo.jpg);
  padding: 20px;
  border-radius: 10px;
  font-family: Arial, sans-serif;
  text-align: center;
}

.merch-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.merch-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.merch-description {
  margin-bottom: 10px;
  color: #555;
  font-size: 16px;
  text-align: center;
}

.merch-terms {
  font-size: 12px;
  color: #777;
  text-align: center;
}

.terms-link {
  color: #007bff;
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}

.merch-footer {
  margin-top: 15px;
  height: 20px;
}
</style>
