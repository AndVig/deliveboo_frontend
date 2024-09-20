<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div>
        <label for="address">Indirizzo:</label>
        <input id="address" v-model="address" type="text" required />
      </div>
      <div ref="dropinContainer"></div>
      <button type="submit" :disabled="!isPaymentMethodReady">Paga</button>
    </form>
  </div>
</template>

<script>
import dropin from "braintree-web-drop-in";
import axios from "axios";

export default {
  name: "AppPayment",
  data() {
    return {
      dropinInstance: null,
      isPaymentMethodReady: false,
      isLoading: true,
      error: null,
      cseKey: "sandbox_nddp4k74_cyss7gspwctv5d4t",
      email: "",
      address: "",
    };
  },

  async created() {
    await this.initializeAxios();
  },

  mounted() {
    this.$nextTick(() => {
      this.initializeBraintreeWithRetry();
    });
  },

  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },

    async initializeAxios() {
      axios.defaults.withCredentials = true;
      axios.defaults.baseURL = "http://localhost:8000";

      try {
        // Recupera il token CSRF
        await axios.get("/sanctum/csrf-cookie");
        console.log("CSRF cookie impostato con successo");
      } catch (error) {
        console.error("Errore nell'ottenere il CSRF cookie:", error);
      }
    },

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

    async sendPaymentToBackend(nonce) {
      try {
        axios.defaults.withCredentials = true;
        const token = this.getCookie("XSRF-TOKEN");
        if (token) {
          axios.defaults.headers.common["X-XSRF-TOKEN"] =
            decodeURIComponent(token);
        } else {
          console.warn("CSRF token not found in cookie");
        }
        const response = await axios.post("/api/process-payment", {
          paymentMethodNonce: nonce,
          email: this.email,
          address: this.address,
        });

        return response.data;
      } catch (error) {
        console.error("Errore nell'invio dei dati al backend:", error);
        throw error;
      }
    },

    async onSubmit() {
      if (!this.dropinInstance) {
        this.error = "Istanza Braintree non inizializzata";
        return;
      }

      try {
        const { nonce } = await this.dropinInstance.requestPaymentMethod();
        console.log("Nonce di pagamento:", nonce);

        const response = await this.sendPaymentToBackend(nonce);

        if (response.success) {
          console.log("Pagamento avvenuto con successo");
          // Qui potresti voler reindirizzare l'utente o mostrare un messaggio di successo
        } else {
          this.error =
            response.message ||
            "Si è verificato un errore durante il pagamento.";
        }
      } catch (error) {
        console.error("Errore nella richiesta del metodo di pagamento:", error);
        this.error =
          error.response?.data?.message ||
          "Si è verificato un errore durante il pagamento.";
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

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
}
</style>
