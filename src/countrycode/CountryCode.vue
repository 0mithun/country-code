<template>
    <div class="dropdown" ref="selectParent" v-click-away="()=>closeDropdown()">
        <div class="select" value="select" ref="select" >
            <div v-if="!openDropdown"  ref="selectLabel" class="select__label" v-html="currentItem" @click="toggleDropdown"></div>
            <input class="search" placeholder="Search" type="text" autofocus ref="search" v-model="search" v-if="openDropdown" />
        </div>
        <ul class="select-dropdown active" ref="selectDropdown" id="selectDropdown"  v-show="openDropdown">
            <li class="option" :data-value="country.name" v-for="country in filterdCountry" :key="country.tld" :id="`item-${country.iso}`"
                @click="selectItem(country)">
                <span>{{ country.unicodeFlag }} {{ country.dialCode }}</span>
                <span> {{ country.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
const countrylist = require("./countryList.json");
import { directive } from "vue3-click-away";

export default {
    directives: {
        ClickAway: directive
    },
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
            default: "Search"
        }
    },

    data() {
        return {
            countries: countrylist,
            selected: null,
            openDropdown: false,
            search: "",
        };
    },
    watch: {
        //  $props: {
        //     handler() {
        //         if(this.modelValue){
        //             const item = this.countries.filter(country=> {
        //                 return country.iso === this.modelValue;
        //             })
        //             if(item.length){
        //                 this.selected = item[0];
        //             }
        //         }
        //     },
        //     deep: true,
        //     immediate: true,
        // },
    },
    mounted(){
        // this.$refs.selectDropdown.scrollTop = this.getScrollPosition()
    },

    computed: {
            filterdCountry(){
                return this.countries.filter(item=> {
                    return item.name.toLowerCase().startsWith(this.search.toLowerCase());
                })
            },
            currentItem(){
                const country = this.countries.find(item=> {
                    return item.iso == this.modelValue;
                })

                if(country){
                     return `<span>${country.unicodeFlag}</span><span> ${country.dialCode}</span>`;
                }
                 return `<span>+00000</span>`;
            },
            scrollTopPosition(){
                return 50;
            }
    },
    methods: {
        getPosition(parent, child){
            var parentPos = document.getElementById(parent).getBoundingClientRect(),
                    childPos = document.getElementById(child).getBoundingClientRect(),
                    relativePos = {};

                relativePos.top = childPos.top - parentPos.top,
                relativePos.right = childPos.right - parentPos.right,
                relativePos.bottom = childPos.bottom - parentPos.bottom,
                relativePos.left = childPos.left - parentPos.left;

                console.log(parentPos, childPos);

                return relativePos;
        },
        setScrollPosition(){
            //`item-${country.iso}`
            const item = document.getElementById(`item-${this.modelValue}`)
            if(item){
                // return item.scrollTop;
                // console.log('position changing', item.offsetTop)
                // console.log(item)

                // const position = this.getPosition(`item-${this.modelValue}`, 'selectDropdown')
                // console.log(position)
                console.log(document.querySelector(`#item-${this.modelValue}`).getBoundingClientRect())

                // this.$refs.selectDropdown.scrollTop = item.scrollTop;
                // this.$refs.selectDropdown.focus()
            }

        },
        searchCountry() {
            const data = this.countries.filter((country) => {
                if (country.dialCode) {
                    return (
                        country.dialCode.toString().startsWith(this.search.toLowerCase()) ||
                        country.iso.toString().toLowerCase().startsWith(this.search.toLowerCase()) ||
                        country.name.toLowerCase().startsWith(this.search.toLowerCase())
                    );
                }
            });
            this.filterdCountry = data;
        },
        selectItem(country) {
            this.$emit("update:modelValue", country.iso);

            this.openDropdown = false;
        },
        // toggleClass(e) {
        //     if (this.disabled) {
        //         return;
        //     }
        //     e.stopImmediatePropagation();
        //     this.$refs.select.classList.add("selected");
        //     this.$refs.selectDropdown.classList.add("active");

        //     this.openDropdown = true;
        //     document.addEventListener("click", this.outsideClick);
        // },

        // closeDropdown() {
        //     this.$refs.select.classList.remove("selected");
        //     this.$refs.selectDropdown.classList.remove("active");
        //     this.openDropdown = false;
        //     document.removeEventListener("click", this.outsideClick);
        // },

        // outsideClick(e) {
        //     const parent = this.$refs.selectParent;
        //     const label = this.$refs.selectLabel;
        //     if (e.target !== parent && !label && !parent.contains(e.target)) {
        //         this.closeDropdown();
        //     }
        // },


        toggleDropdown() {
            this.openDropdown = !this.openDropdown;
            if(this.modelValue){
                this.setScrollPosition()
            }

        },
        closeDropdown() {
            this.search = ''
            this.openDropdown = false;
        }
    },

    // unmounted() {
    //     document.removeEventListener("click", this.outsideClick);
    // },
};
</script>

<style lang="scss" scoped>
@keyframes feadIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.dropdown {
    position: relative;
    animation: fadeIn;
    width: 30%;
}

.select-dropdown.active {
    display: block;
}

.select {
    background: #ffffff;
    // border: 1px solid #c8c8c8;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // cursor: pointer;

    border-right: none;
    border-radius: 5px 0px 0px 5px;
    display: block;
    text-align: left;
    // padding: 7px 20px;
}

.select-dropdown {
    max-height: 200px;
    overflow-y: auto;
    position: absolute;
    top: 33px;
    left: 0;
    display: none;
    background: #ffffff;
    border: 1px solid #c8c8c8;
    margin: 0;
    padding: 0;
    z-index: 9999;
    width: 400px;

    &::-webkit-scrollbar {
        // background: green;
        width: 30px;
        background-color: #eff3f6;
    }

    &::-webkit-scrollbar-thumb {
        background: #130945;
        border-radius: 5px;
        height: 50px;
        cursor: pointer;
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
    //   font-weight: 400;
    font-size: 16px;
    line-height: 24px;
}

.select-dropdown .option:last-child {
    border-bottom: none;
}

.label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-family: "Lato";
    font-style: normal;
    //   font-weight: 400;
    font-size: 16px;
    line-height: 24px;
}

.search {
    outline: none;
    border: none;
    max-width: 100%;
    margin: 0;
    padding: 0;
    font-family: "Lato";
    font-style: normal;
    //   font-weight: 400;
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
    // width: 100%;
    padding-left: 10px;
    cursor: pointer;
       font-family: "Lato";
    font-style: normal;
    //   font-weight: 400;
    font-size: 16px;
    line-height: 24px;
}
</style>
