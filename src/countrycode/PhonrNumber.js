import {App} from 'vue'

import PhoneNumberWithCountryCode from './PhoneInputWithCounryCode.vue'

const PhoneInput = {
    install: (app, options = {placeholder: null, countryPlaceholder: null, countryLebel: null}) => {
        app.component('PhoneNumberWithCountryCode', PhoneNumberWithCountryCode);
        app.provide('placeholder', options.placeholder)
        app.provide('countryPlaceholder', options.countryPlaceholder)
        app.provide('countryLebel', options.placeholder)
    }
}


if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(PhoneNumberWithCountryCode);
}

export default PhoneInput;

export {PhoneNumberWithCountryCode}

