<template>
  <div class="container text-start my-5" >
    <h2>Pagamento</h2>
    <div ref="dropinContainer"></div>
    <button class="btn btn-primary btn-lg" @click="onSubmit" :disabled="!isPaymentMethodReady">Paga</button>
  </div>
</template>

<script>
import dropin from "braintree-web-drop-in";

export default {
  name: "AppPayment",
  data() {
    return {
      dropinInstance: null,
      isPaymentMethodReady: false,
      isLoading: true,
      error: null,
      cseKey: "sandbox_nddp4k74_cyss7gspwctv5d4t", // Sostituisci con la tua vera CSE Key
    };
  },
  mounted() {
    this.initializeBraintreeWithRetry();
  },
  methods: {
    async initializeBraintreeWithRetry(retries = 5) {
      for (let i = 0; i < retries; i++) {
        try {
          await this.initializeBraintree();
          return;
        } catch (error) {
          console.error(`Tentativo ${i + 1} fallito:`, error);
          if (i === retries - 1) {
            this.error = `Non è stato possibile caricare il form di pagamento dopo ${retries} tentativi.`;
            this.isLoading = false;
          } else {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
      }
    },
    async initializeBraintree() {
      this.isLoading = true;
      console.log("Inizializzazione di Braintree con CSE Key:", this.cseKey);

      if (!this.$refs.dropinContainer) {
        throw new Error("Container per Braintree non trovato nei refs");
      }

      console.log("Container ref:", this.$refs.dropinContainer);

      try {
        this.dropinInstance = await dropin.create({
          authorization: this.cseKey,
          container: this.$refs.dropinContainer,
          card: {
            overrides: {
              styles: {
                // Puoi personalizzare lo stile qui
              },
            },
          },
        });

        console.log("Braintree inizializzato con successo");
        this.dropinInstance.on("paymentMethodRequestable", () => {
          this.isPaymentMethodReady = true;
        });

        this.dropinInstance.on("noPaymentMethodRequestable", () => {
          this.isPaymentMethodReady = false;
        });

        this.isLoading = false;
      } catch (error) {
        console.error("Errore durante l'inizializzazione di Braintree:", error);
        throw error;
      }
    },
    async onSubmit() {
      if (!this.dropinInstance) {
        console.error("Istanza Braintree non inizializzata");
        return;
      }

      try {
        const { nonce } = await this.dropinInstance.requestPaymentMethod();
        console.log("Nonce di pagamento:", nonce);
        alert("Pagamento simulato con successo!");
      } catch (error) {
        console.error("Errore nella richiesta del metodo di pagamento:", error);
      }
    },
  },
  beforeUnmount() {
    if (this.dropinInstance) {
      this.dropinInstance.teardown();
    }
  },
};
</script>
