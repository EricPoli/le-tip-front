<template>
  <div id="app">
    <header id="header">
      <h1>Le/Tip</h1>
    </header>

    <router-view></router-view>

    <loader-layout v-show="ratesReqStatus === 'pending'" />
    <notifications />
  </div>
</template>

<script>
  import LoaderLayout from "@/layouts/LoaderLayout.vue";
  import { mapGetters } from "vuex";
  export default {
    name: "app-layout",
    data() {
      return {};
    },

    components: { LoaderLayout },
    computed: {
      ...mapGetters({
        ratesReqStatus: "conversion/getRatesReqStatus",
      }),
    },
  };
</script>

<style lang="scss">
  #app {
    display: flex;
    height: 100%;
    flex-direction: column;
    background: var(--color-background);
  }

  header#header {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-background);
    padding: 1.2rem 1.5rem;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100px;
    z-index: 10;
  }

  // Import Bootstrap and BootstrapVue source SCSS files
  @import "~bootstrap/scss/bootstrap.scss";
  @import "~bootstrap-vue/src/index.scss";
</style>
