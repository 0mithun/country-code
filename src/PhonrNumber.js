
import PhoneNumberWithCountryCode from './countrycode/PhoneInputWithCounryCode.vue'
export default {
    install: (app, options) => {
        app.component('PhoneNumberWithCountryCode', PhoneNumberWithCountryCode)
    }
}