<template>
  <div class="merch-block">
    <div class="merch-content">
      <h2 class="merch-title">{{ title }}</h2>
      <p class="merch-description">{{ description }}</p>
      <button class="merch-cta">Ordina ora</button>
      <p class="merch-terms">
        {{ terms }}
        <a :href="termsLink" class="terms-link">Termini e condizioni qui.</a>
      </p>
    </div>
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(/img/sfondo.jpg);
  background-size: cover;
  background-position: center;
  padding: 40px 20px;
  font-family: "Helvetica Neue", Arial, sans-serif;
  text-align: center;
  color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.merch-block::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(255, 105, 0, 0.3) 0%,
    rgba(207, 0, 114, 0.3) 100%
  );
  z-index: 1;
}

.merch-content {
  position: relative;
  z-index: 2;
}

.merch-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.merch-description {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.merch-cta {
  background-color: #ff6900;
  color: #fff;
  border: none;
  padding: 12px 30px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.merch-cta:hover {
  background-color: #ff8c00;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(255, 105, 0, 0.3);
}

.merch-terms {
  font-size: 14px;
  opacity: 0.8;
  max-width: 80%;
  margin: 20px auto 0;
}

.terms-link {
  color: #ff6900;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.terms-link:hover {
  color: #ff8c00;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .merch-title {
    font-size: 24px;
  }

  .merch-description {
    font-size: 16px;
  }

  .merch-cta {
    font-size: 16px;
    padding: 10px 25px;
  }

  .merch-terms {
    font-size: 12px;
  }
}
</style>
