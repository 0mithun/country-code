<template>
     <label for="country" @click="toggleDropdown">{{ label }}</label>
    <div class="dropdown" ref="selectParent" v-click-away="()=>closeDropdown()" >
        <div class="select" value="select" ref="select" >
            <div v-if="!openDropdown"  ref="selectLabel" class="select__label"  v-html="currentItem" @click="toggleDropdown"></div>
            <input class="search" placeholder="Search" type="text" autofocus ref="search" v-model="search" v-if="openDropdown" />
        </div>
        <ul class="select-dropdown active" ref="selectDropdown" id="selectDropdown" v-show="openDropdown" >
            <li class="option" :class="{selected: isSelected(country)}" :data-value="country.name" v-for="country in filterdCountry" :key="country.tld" :id="`item-${country.iso}-${country.dialCode}`"
                @click="selectItem(country)">
                <div class="iti-flag" :class="`${country.iso}`">
                </div>
                <div class="country">
                    <span class="dial-code">+{{ country.dialCode }}</span>
                    <span class="country-name"> {{ country.name }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
const countrylist = require("./countries.json");
import './flugs.css'
import { directive } from "vue3-click-away";
export default {
    props: {
        label: {
            type: [String, Number],
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        modelValue: String,
        placeholder: {
            type: String,
            default: 'Search Country'
        },
         error: String,
    },
    directives: {
        ClickAway: directive
    },


    data() {
        return {
            countries: countrylist,
            openDropdown: false,
            search: "",
        };
    },
    emits:['changeCountry', 'update:modelValue'],
    computed: {
        filterdCountry(){
            return this.countries.filter(item=> {
                return item.name.toLowerCase().startsWith(this.search.toLowerCase());
            })
        },
        currentItem(){
            const country = this.countries.find(item=> {
              return  item.iso.toLowerCase() == this.modelValue.toLowerCase()
            })

            if(country){
                return `
                    <div class="default-flat iti-flag ${this.modelValue.toLowerCase()}"></div>
                    <div class="default-item">
                        <span style="margin-left:10px;">+${country.dialCode} ${country.name }</span>
                    </div>
                `;
            }
            return `<span style="color:#323232;">${this.placeholder}</span>`;
        },
    },
    methods: {
        isSelected(country){
            return this.modelValue == country.iso
        },
        selectItem(country) {
            this.$emit("update:modelValue", country.iso);
            this.$emit('changeCountry', country.iso)
            this.openDropdown = false;
        },
        toggleDropdown() {
            if(!this.openDropdown){
                this.openDropdown = true;
                setTimeout(() => {
                    this.$refs.search.focus();
                    const country = this.countries.find(item=> item.iso == this.modelValue)
                    if(country){
                        const item = document.getElementById(`item-${country.iso}-${country.dialCode}`)
                        this.$refs.selectDropdown.scrollTop = item.offsetTop - 10;
                    }
                }, 100);
            }else {
                this.openDropdown = false;
            }
        },
        closeDropdown() {
            this.search = '';
            this.openDropdown = false;
        }
    },
};
</script>

<style lang="scss" scoped>

.dropdown {
    position: relative;
    animation: fadeIn;
    background: #FFFFFF;
    height: 40px;
    box-sizing: border-box;
    border-radius: 5px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    display: block;
    width: 100%;
    padding: 3.75px 7.5px;
    outline: none;
    color: #323232;
    display: flex;
    align-items: center;
}

.select-dropdown.active {
    display: block;
}

.select {
    background: #ffffff;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-right: none;
    border-radius: 5px 0px 0px 5px;
    display: block;
    text-align: left;
}

.select-dropdown {
    max-height: 200px;
    overflow-y: auto;
    position: absolute;
    top: 40px;
    left: 0;
    display: none;
    background: #ffffff;
    border: 1px solid #c8c8c8;
    margin: 0;
    padding: 0;
    z-index: 9999;
    width: 400px;

    &::-webkit-scrollbar {
        width: 20px;
        background-color: #eff3f6;
    }

    &::-webkit-scrollbar-thumb {
        background: #c8c8c8ed;;
        border-radius: 2px;
        cursor: pointer;
        min-height: 50px;
    }
}

.select-dropdown .option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #c8c8c8;
    cursor: pointer;
    padding: 6px 15px;

    font-family: "Lato";
    font-style: normal;
    font-size: 16px;
    line-height: 24px;
}

.select-dropdown .option:last-child {
    border-bottom: none;
}
.select-dropdown .option.selected {
   background-color: #c8c8c8ed;
}

.search {
    outline: none;
    border: none;
    max-width: 100%;
    margin: 0;
    padding: 0;
    font-family: "Lato";
    font-style: normal;
    font-size: 16px;
    line-height: 24px;
    padding-left: 10px;

    &:focus,
    &:active,
    &:active,
    &:hover,
    &:focus-within,
    &:focus-visible,
    &:visited,
    &:placeholder-shown {
        font-size: 16px;
        line-height: 24px;
    }
}

.select__label {
    padding-left: 10px;
    cursor: pointer;
       font-family: "Lato";
    font-style: normal;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
}

.country {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .dial-code {
        margin-left: 10px;
    }
    .country-name {
        margin-left: 15px;
    }
}

label {
    font-family: "Lato";
    font-style: normal;
    font-size: 10px;
    line-height: 24px;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #003577;
    
}
label :hover {
    cursor:pointer;
    line-height:24px;
}

</style>
