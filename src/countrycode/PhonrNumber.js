import {App} from 'vue'

import PhoneNumberWithCountryCode from './PhoneInputWithCounryCode.vue'

export default {
    install: (app, options = {placeholder: '111 111 111'}) => {
        app.component('PhoneNumberWithCountryCode', PhoneNumberWithCountryCode);
        app.provide('placeholder', options.placeholder)
    }
}


export {PhoneNumberWithCountryCode}

// export {default as PhoneNumberWithCountryCode} from './PhoneInputWithCounryCode.vue'