<template>
    <div class="home">
        <div class="home_header">
            <img class="home_header__img" src="./assets/icon-logo.png" alt="">
            <span class="home_header__name">Mathew Computer</span>
        </div>
        <div class="home_content">
            <div class="home_content__search">tìm kiếm</div>
            <div class="home_content__list" v-if="listProduct.length">
                 <div class="home_content__listItem" v-for=" (item, index) of listProduct" :key="index">
                     <!-- <div style="border: 1px solid;">
                         <img :src="item.imageUrl" width="200" alt=""><br>
                     </div> -->
                    <img :src="item.imageUrl" width="200" alt=""> <br>
                    <span class="home_content__listItem-name">{{item.name}}</span> <br>
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
            listProduct: []
        }
    },
    mounted () {
        this.getListData().then(res => {
           if (res.data) {
               this.listData = res.data
               this.countPage = Math.ceil(res.data.length / 20)
               this.getListProduct(this.listData, this.pageNum)
           }
        })
    },
    methods: {
        getListData () {
            return axios.get('https://run.mocky.io/v3/7af6f34b-b206-4bed-b447-559fda148ca5');
        },
        getListProduct (data, pageNext) {
            this.listProduct = []
            let arrTamp = new Array(...data);
            console.log((pageNext-1)*20, pageNext*20)
            this.listProduct = arrTamp.slice( (pageNext-1)*20, pageNext*20)
            console.log('listProduct', this.listProduct)
        }
        
    },
    watch: {
        pageNum (newValue) {
            this.getListProduct(this.listData, newValue)
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
            }
        }
    }
}
</style>