<!-- <p align="center">
<img width="100" alt="vue-tel-input-logo" src="https://iamstevendao.github.io/vue-tel-input/hero.png"/>
</p> -->

# vue3-phone-number-input

International Phone Number Input with Country Code.

<!-- [![npm](https://img.shields.io/npm/dt/vue-tel-input.svg)](https://www.npmjs.com/package/vue-tel-input) [![stars](https://img.shields.io/github/stars/iamstevendao/vue-tel-input.svg)](https://github.com/iamstevendao/vue-tel-input) -->
<!-- 
<p align="center">
<img width="600" alt="In-action GIF" src="https://thumbs.gfycat.com/EducatedPoliteBluefintuna-size_restricted.gif"/>
</p> -->
<!-- 
## Documentation and Demo

[Visit the website](https://iamstevendao.github.io/vue-tel-input/) -->



## Getting started

### Install the plugin:

- With npm

  ```sh
    npm install vue3-phone-number-input
  ```

- With yarn

  ```sh
    yarn add vue3-phone-number-input
  ```

- Add the plugin into your app:

  ```javascript
    import { createApp } from 'vue'
    import App from './App.vue'

    import Vu3PhoneNumberInput from 'vue3-phone-number-input'
    import 'vue3-phone-number-input/dist/vue3-phone-number-input.css';

    const app  = createApp(App)
    .mount('#app')

    app.use(Vu3PhoneNumberInput)

  ```

## Available options

```javascript
    app.use(Vu3PhoneNumberInput, {
        placeholder: '11 111 11 11',
        countryPlaceholder: 'Search',
        countryLebel: 'Select Country',
    })
```


- Use the `PhoneNumberWithCountryCode` component:

```html
  <template>
        <PhoneNumberWithCountryCode
            v-model:phone_number="form.phone_number" 
            v-model:country_code="form.country_code" 
        />

  </template>
```

```javascript
    <script>
        import { reactive } from '@vue/reactivity'

        export default {
            name: 'App',
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
```


## Available props

```html
    <template>
        <PhoneNumberWithCountryCode
            v-model:phone_number="form.phone_number" 
            v-model:country_code="form.country_code"
            placeholder="11 111 11 11"
            country-placeholder="Search"
            country-lebel="Select Country"
        />
  </template>
```