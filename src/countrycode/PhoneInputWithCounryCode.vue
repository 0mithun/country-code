<template>
    <div :class="[$attrs.class]" style="width: 100%" >
        <label v-if="label" class="form-label" :for="id">{{ label }}</label>
        <div class="phone_input" :style="styles" :class="{'invalid-number': !is_valid}">
            <CountryCode v-model="country_code" />
            <div class="borders">
                <p>|</p>
            </div>
             <input id="phone_number" class="phone__number__input " type="text" v-model="phone_number"
                                    placeholder="11 111 11 11" style="border: none" />
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
        error: String,
        label: String,
        country_code: null,
        phone_number: null,
    },
    data(){
        return {
            // country_code: '',
            // phone_number: '',
            is_valid: true,
        }
    },

    watch: {
        country_code(){
             this.checkValid()
            // console.log(this.country_code)
        },
        phone_number(){
            this.checkValid()
        }
    },
    // emits: ["update:modelValue"],
    computed: {
        styles() {
            return this.error || !this.is_valid
                ? "border: 1px solid #C81717;"
                : "border: 1px solid #C8C8C8;";
        },
    },
    methods: {
        checkValid(){
            const phoneNumber = parsePhoneNumber(this.phone_number, this.country_code)

            if(phoneNumber && phoneNumber.isValid()){
                this.is_valid = true;
            }else {
                this.is_valid = false;
            }

            this.$emit('update:phone_number', this.phone_number)
            this.$emit('update:country_code', this.country_code)
        }
    },
};
</script>

<style lang="scss" >

.phone_input {
    width: 100%;
    display: flex;
    align-items: center;

    box-sizing: border-box;
    border-radius: 5px;

    select {
        width: 30%;
        border-right: none;
        border-radius: 5px 0px 0px 5px;

        &:focus {
            // border: 1px solid $tints-4;
        }

        &::after {
            content: "";
            width: 2px;
            height: 100%;
        }
    }

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
        // border-top: 1px solid $tones-1;
        // border-bottom: 1px solid $tones-1;
        display: flex;
        align-items: center;

        padding-right: 10px;
        padding-left: 10px;

        p {
            color: #abbecc;
            margin: 0;
            transform: scale(1.5, 1);
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
</style>
