<template>
  <nav>
    <router-link to="/" v-font-size:large>Home</router-link> |
    <router-link to="/about" v-font-size:small>About</router-link>
  </nav>
  <div>
    <my-header>
      <template  #title> Title</template>
      <template #author>author</template>
    </my-header>
  </div>
  <div>
    {{ form.phone_number }}
  <br>
    {{ form.country_code }}
    <div style="width:500px; margin:0 auto;">
      <PhoneNumberWithCountryCode v-model:phone_number="form.phone_number" v-model:country_code="form.country_code" />
    </div>
  </div>
  <router-view/>
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
