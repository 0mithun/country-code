<template>
    <div :class="[$attrs.class]" style="width: 100%" >
        <div class="phone_input" :class="classList">
            <CountryCode 
                v-model="country_code" 
                :countryLebel="countryLebelText" 
                :countryPlaceholder="countryPlaceholderText"
                @changeCountry="$emit('update:country_code', country_code)"
            />
            <div class="borders">
                <p>|</p>
            </div>
             <input 
                id="phone_number" 
                class="phone__number__input " 
                type="text" v-model="phone_number"
                style="border: none"
                :placeholder="placeholderText" 
                :disabled="!country_code"
                @input="(event)=> $emit('update:phone_number', event.target.value)"
            />
        </div>
    </div>
</template>

<script>
import { v4 as uuid } from "uuid";
import CountryCode from './CountryCode.vue'

import parsePhoneNumber from 'libphonenumber-js'

export default {
    inheritAttrs: false,
    components: {
        CountryCode
    },
    props: {
        id: {
            type: String,
            default() {
                return `text-input-${uuid()}`;
            },
        },
        placeholder: {
            type: String,
            default: '11 111 11 11'
        },
        countryLebel: {
            type: String,
            default: 'Select Country'
        },
        countryPlaceholder: {
            type: String,
            default: 'Search'
        },
        error: String,
        label: String,
        country_code: null,
        phone_number: null,

    },
    watch: {
        country_code(){
            this.$emit('update:phone_number', this.phone_number)
        },
        phone_number(){
            this.$emit('update:country_code', this.country_code)
        }
    },
    computed: {
        styles() {
            return this.error || !this.is_valid
                ? "border: 1px solid #C81717;" : (this.is_valid == true ? "border: 1px solid #16a34a;" : "border: 1px solid #C8C8C8;");
        },
       classList(){
            if(!this.phone_number == null || this.phone_number == '') return 'normal-number';

            const phoneNumber = parsePhoneNumber(this.phone_number, this.country_code.toUpperCase())
            if(phoneNumber && phoneNumber.isValid()){
                return 'valid-number';
            }
            
            return 'invalid-number';
       },
        placeholderText(){
            return this.placeholderValue?? this.placeholder
        },
        countryLebelText(){
            return this.countryLebelValue?? this.countryLebel
        },
        countryPlaceholderText(){
            return this.countryPlaceholderValue?? this.countryPlaceholder
        },
    },
    inject: {
        countryPlaceholderValue: {
            from: 'countryPlaceholder'
        },
        countryLebelValue: {
            from: 'countryLebel'
        },
        placeholderValue: {
            from: 'placeholder'
        },
    }
};
</script>

<style lang="scss" >

.phone_input {
    width: 100%;
    display: flex;
    align-items: center;

    box-sizing: border-box;
    border-radius: 5px;
    background-color: white;


    input.phone__number__input {
            background: #fff;
            border: 1px solid #c8c8c8;
            border-radius: 5px;
            box-sizing: border-box;
            color: #323232;
            display: block;
            font-family: Lato;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            height: 40px;
            line-height: 24px;
            outline: none;
            padding: 3.75px 7.5px;
            width: 100%;



        width: 70%;
        border-left: none;
        border-radius: 0px 5px 5px 0px;

        &:focus {
            // border: 1px solid $tints-4;
        }
    }

    .borders {
        width: 5px;
        background-color: white;
        height: 40px;
        display: flex;
        align-items: center;

        padding-right: 10px;
        padding-left: 10px;

        p {
            color: #abbecc;
            margin: 0;
            transform: scale(.5, 1.6);
        }
    }
}

.form-label {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
}

.invalid-number {
    border: 1px solid red;
    border-radius:5px;
}
.valid-number {
    border: 1px solid green;
    border-radius:5px;
}
.normal-number {
    border: 1px solid #C8C8C8;
    border-radius:5px;
}
</style>
