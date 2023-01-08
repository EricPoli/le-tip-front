<template>
  <div class="home-view">
    <b-row class="justify-content-center">
      <b-col
        md="3"
        class="d-flex flex-column align-items-center justify-content-start p-5"
        v-if="stepOne"
      >
        <div class="d-flex align-items-center">
          EUR
          <div class="toggle mx-2 mt-1">
            <input type="checkbox" id="check" @change="setCurrency" />
            <label for="check"></label>
          </div>
          USD
        </div>

        <b-input-group class="mt-4 justify-content-between">
          <p class="d-flex m-0 mr-5 align-items-end">Valor</p>
          <b-input-group-prepend
            class="justify-content-center align-items-center px-3"
          >
            <b-icon scale="2" :icon="checkCurrency"></b-icon>
          </b-input-group-prepend>

          <b-form-input
            type="text"
            inputmode="numeric"
            v-mask="mask"
            v-model="account"
          ></b-form-input>
        </b-input-group>

        <div class="w-100 mt-4">
          <span class="d-flex">
            Gorjeta:
            <h5 class="ml-1">{{ tip }}%</h5></span
          >

          <range-input-vue v-model="tip" :max="20" :min="10"></range-input-vue>
        </div>

        <div class="w-100 mt-4">
          <span class="d-flex">
            Pessoas:
            <h5 class="ml-1">{{ people }}</h5></span
          >

          <range-input-vue
            v-model="people"
            :max="16"
            :min="2"
          ></range-input-vue>
        </div>

        <b-button
          variant="primary"
          class="mt-4 rounded-circle p-1 align-self-end"
          @click="moveTo()"
        >
          <b-icon icon="chevron-right"></b-icon>
        </b-button>
      </b-col>

      <b-col
        md="3"
        class="d-flex flex-column align-items-center justify-content-center p-5"
        v-if="stepTwo"
      >
        <div class="result-wrapper">
          Conta
          <h5>
            {{ getResults.account | CURRENCY(getResults.account, currency) }}
          </h5>
        </div>

        <div class="result-wrapper">
          Gorjeta
          <h5>
            {{ getResults.tip | CURRENCY(getResults.tip, currency) }}
          </h5>
        </div>

        <div class="result-wrapper">
          Total
          <h5>
            {{ getResults.total | CURRENCY(getResults.total, currency) }}
          </h5>
        </div>

        <div class="result-wrapper">
          por Pessoa
          <h5>
            {{
              getResults.perPerson | CURRENCY(getResults.perPerson, currency)
            }}
          </h5>
        </div>

        <div class="result-wrapper">
          em R$
          <h5>
            {{ getResults.real | REAL }}
          </h5>
        </div>
        <b-button
          variant="primary"
          class="mt-4 rounded-circle p-1 align-self-end"
          @click="moveTo()"
        >
          <b-icon icon="chevron-left"></b-icon>
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import RangeInputVue from "@/components/RangeInput.vue";
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "HomeView",
    components: {
      RangeInputVue,
    },
    watch: {
      currency() {
        this.fetchRates();
      },
    },
    data() {
      return {
        mask: ["##", "#.##", "##.##", "###.##", "#.###.##", "##.###.##"],
        settings: {
          arrows: false,
          dots: false,
          infinite: false,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 0,
          initialSlide: 0,
          responsive: [
            {
              breakpoint: 520,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        },
        stepOne: true,
        stepTwo: true,
        currency: "EUR",
        account: 0,
        tip: 10,
        people: 2,
        rate: 0,
        options: [
          { text: "", value: "EUR" },
          { text: "", value: "USD" },
        ],
      };
    },
    computed: {
      ...mapGetters({
        getRatesDetails: "conversion/getRatesDetails",
      }),
      getResults() {
        let value = parseFloat(this.account);
        let tip = value * (this.tip / 100);

        return {
          account: value,
          tip: tip,
          total: tip + value,
          perPerson: (tip + value) / this.people,
          real: (tip + value) * this.rate,
        };
      },
      checkCurrency() {
        return this.currency == "USD" ? "currency-dollar" : "currency-euro";
      },
    },
    methods: {
      ...mapActions({
        getRates: "conversion/fetchRates",
      }),
      setCurrency() {
        if (this.currency == "USD") {
          this.currency = "EUR";
        } else this.currency = "USD";
      },
      async fetchRates() {
        let param = {
          baseCurrency: this.currency,
        };
        try {
          await this.getRates(param);
          this.rate = this.getRatesDetails.quote;
        } catch (error) {
          this.rate = 0;
          this.notification({
            title: "Erro SWOP API",
            msg: error.response.data.error.message,
            type: "error",
          });
        }
      },
      moveTo() {
        if (this.stepOne) {
          this.stepOne = false;
          this.stepTwo = true;
        } else {
          this.stepOne = true;
          this.stepTwo = false;
        }
      },
      checkMobile() {
        if (window.innerWidth < 520) {
          this.stepTwo = false;
        }
      },
      notification(item) {
        this.$notify({
          title: item.title,
          text: item.msg,
          type: item.type,
          duration: 10000,
          speed: 1000,
        });
      },
    },
    mounted() {
      this.fetchRates();
      this.checkMobile();
    },
  };
</script>

<style lang="scss">
  .home-view {
    padding: 6rem 0 0;
    @media screen and (max-width: 520px) {
      padding: 4rem 0 0;
    }

    & > .row {
      > .col-md-3 {
        button {
          width: 40px;
          height: 40px;
          display: none;
        }
        @media screen and (max-width: 520px) {
          button {
            display: block;
          }
          padding-top: 10px !important;
          padding-bottom: 10px !important;
        }
      }
    }

    .result-wrapper {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      margin-bottom: 1rem;

      h5 {
        font-size: 1.8rem;
        font-weight: 500;
      }
    }
  }
</style>
