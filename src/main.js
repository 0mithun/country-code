import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import myplugin from './myplugin'
import phoneInput from './PhonrNumber';

const app = createApp(App)
    .use(router)
    .use(myplugin, {
        fontSize: {
            small: 12,
            medium: 24,
            large: 36,
        }
    })
    .use(phoneInput, {
        
    })
    .mount('#app')


// app.use(myplugin)