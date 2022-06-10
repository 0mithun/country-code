import { createApp } from 'vue'
import App from './App.vue'


import phoneInput from './countrycode/PhonrNumber';

const app = createApp(App)
    .use(phoneInput, {
        placeholder: 'Enter kopk',
        countryLebel: "desh select"
    })
    .mount('#app')
