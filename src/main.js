import { createApp } from 'vue'
import App from './App.vue'


import phoneInput from './countrycode/PhonrNumber';

const app = createApp(App)
    .use(phoneInput)
    .mount('#app')
