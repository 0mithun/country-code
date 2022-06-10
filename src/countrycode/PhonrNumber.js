import {App} from 'vue'

import PhoneNumberWithCountryCode from './PhoneInputWithCounryCode.vue'

const PhoneInput = {
    install: (app, options = {placeholder: '111 111 111', countryPlaceholder: 'Select Country', countryLebel: 'Search Country'}) => {
        app.component('PhoneNumberWithCountryCode', PhoneNumberWithCountryCode);
        app.provide('placeholder', options.placeholder)
        app.provide('countryPlaceholder', options.countryPlaceholder)
        app.provide('countryLebel', options.countryLebel)
    }
}


if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(PhoneNumberWithCountryCode);
}

export default PhoneInput;

export {PhoneNumberWithCountryCode}

