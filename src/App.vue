<template>
  <div>
    <div style="width:500px; margin:0 auto;">
      {{ form }}
      <PhoneNumberWithCountryCode v-model:phone_number="form.phone_number"  label="select phone" />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  setup() {
    const form = reactive({
      phone_number: '',
      country_code: ''
    })

    return {
      form
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
