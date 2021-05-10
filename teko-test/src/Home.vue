<template>
    <div class="home">
        <div class="home_header">
            <img class="home_header__img" src="./assets/icon-logo.png" alt="">
            <span class="home_header__name">Mathew Computer</span>
        </div>
        <div class="home_content">
            <div class="home_content__search">
                <v-text-field
                    v-model="keySearch"
                    solo
                    label="Search with name product"
                    clearable
                    v-on:keyup="resultQuery" 
                ></v-text-field>
            </div>
            <div class="home_content__list" v-if="listProduct.length">
                 <div class="home_content__listItem" v-for=" (item, index) of listProduct" :key="index">
                    <img :src="item.imageUrl" width="200" alt=""> <br>
                    <span class="home_content__listItem-name" v-html="item.name"></span> <br>
                    <!-- <span class="home_content__listItem-name" v-html="test"></span> <br> -->
                    <span class="home_content__listItem-price">${{item.price}}</span>
                 </div>
            </div>
            <div class="home_content__pagination" v-if="countPage">
                <v-pagination
                v-model="pageNum"
                :length="countPage"
                :total-visible="7"
                ></v-pagination>
            </div>
        </div>
    </div>
</template>
<script>
const axios = require('axios');
export default {
    name: 'Home',
    data: function () {
        return {
            pageNum: 1,
            countPage: 0,
            listData: [],
            listProduct: [],
            keySearch: '',
            listDataSearch: [],
            test: 'fasdfasdfs <span class="home_content__listItem-highlight">text</span> àdasdfasdfasdf'
        }
    },
    mounted () {
        this.getListData().then(res => {
           if (res.data) {
               this.listData = res.data
               this.getListProduct(this.listData, this.pageNum)
           }
        })
    },
    methods: {
        getListData () {
            return axios.get('https://run.mocky.io/v3/7af6f34b-b206-4bed-b447-559fda148ca5');
        },
        getListProduct (data, pageNext) {
            this.countPage = Math.ceil(data.length / 20)
            this.listProduct = []
            let arrTamp = new Array(...data);
            console.log((pageNext-1)*20, pageNext*20)
            this.listProduct = arrTamp.slice( (pageNext-1)*20, pageNext*20)
            console.log('listProduct', this.listProduct)
        },
        resultQuery (e) {
            if (e.keyCode === 13) {
                this.listDataSearch = []
                if(this.keySearch){
                this.listDataSearch = this.listData.filter((item)=>{
                       return this.keySearch.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
                    })
                this.getListProduct(this.listDataSearch, 1)
                } else {
                    this.getListProduct(this.listData, 1)
                }
            }
        }
    },
    watch: {
        pageNum (newValue) {
            if (!this.keySearch) {
                this.getListProduct(this.listData, newValue)
            } else {
                 this.getListProduct(this.listDataSearch, newValue)
            }
            
        }
    }
}
</script>
<style lang="scss">
.home {
    min-width: 1500px;
    width: 60%;
    margin: auto;
    &_header {
        border-bottom: 1px solid;
        padding: 20px;
        height: 10%;
        align-items: center;
        display: flex;
        &__img {
            width: 60px;
            margin-right: 20px;
        }
        &__name {
            font-size: 20px;
            font-weight: bold;
        }
    }
    &_content {
        padding: 20px;
        &__list {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            &Item {
                text-align: center;
                width: 20%;
                padding-bottom: 40px;
                img {
                    border: 1px solid;
                    padding: 20px;
                }
                &-name {
                    font-size: 16px;
                    font-weight: bold;
                }
                &-price {
                    font-size: 16px;
                    color: red;
                }
                &-highlight {
                    background-color: red;
                }
            }
        }
    }
}
</style>