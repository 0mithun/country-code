import {App} from 'vue'

import PhoneNumberWithCountryCode from './PhoneInputWithCounryCode.vue'

const PhoneInput = {
    install: (app, options = {placeholder: '111 111 111'}) => {
        app.component('PhoneNumberWithCountryCode', PhoneNumberWithCountryCode);
        app.provide('placeholder', options.placeholder)
    }
}


if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(PhoneNumberWithCountryCode);
}

export default PhoneInput;

export {PhoneNumberWithCountryCode}

