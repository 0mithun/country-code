<template>
    <div :class="[$attrs.class]" style="width: 100%" >
        <label v-if="label" class="form-label" :for="id">{{ label }}</label>
        <div class="phone_input" :class="classList">
            <CountryCode v-model="country_code"  />
            <div class="borders">
                <p>|</p>
            </div>
             <input id="phone_number" class="phone__number__input " type="text" v-model="phone_number"
                :placeholder="placeholderText" style="border: none"
                :disabled="!country_code"
            />
        </div>
    </div>
</template>

<script>
import { v4 as uuid } from "uuid";
import CountryCode from './CountryCode.vue'

import parsePhoneNumber from 'libphonenumber-js'
import { computed, inject, watch } from '@vue/runtime-core';

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
        error: String,
        label: String,
        country_code: null,
        phone_number: null,
    },

    setup(props, {emit}) {
        const placeholderValue = inject('placeholder')

        const classList = computed(()=> {
              if(!props.phone_number == null || props.phone_number == '') return 'normal-number';

            const phoneNumber = parsePhoneNumber(props.phone_number, props.country_code.toUpperCase())
            if(phoneNumber && phoneNumber.isValid()){
                return 'valid-number';
            }
            return 'invalid-number';;
        })

        const placeholderText = computed(()=>placeholderValue ?? props.placeholder)
        

        watch(
            () => props.phone_number,
            ()=> {
                emit('update:phone_number', props.phone_number)
                // props.phone_number = props.phone_number.replace(/[^0-9]/g, '')
                //                @input="(event)=> $emit('update:phone_number', event.target.value.replace(/[^0-9]/g, ''))"

            }
        );
        watch(
            () => props.country_code,
            ()=> {
                emit('update:country_code', props.country_code)
            }
        );

        return {
            classList,
            placeholderText
        }
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
