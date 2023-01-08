<template>
  <b-input-group class="mt-3">
    <b-input-group-prepend
      class="justify-content-center align-items-center pr-1"
    >
      {{ min }}
    </b-input-group-prepend>
    <b-form-input
      :value="min"
      @input="$emit('input', $event)"
      type="range"
      :min="min"
      :max="max"
    ></b-form-input>
    <b-input-group-append
      class="justify-content-center align-items-center pl-1"
    >
      {{ max }}
    </b-input-group-append>
  </b-input-group>
</template>

<script>
  export default {
    name: "RangeInput",
    props: ["min", "max"],
  };
</script>

<style lang="scss">
  .input-group > .custom-range {
    border: none;
    &:focus {
      box-shadow: none;
    }
  }
</style>
