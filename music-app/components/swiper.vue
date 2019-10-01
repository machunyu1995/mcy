<template>
    <view class="page-section-spacing">
	<swiper class="swiper" 
		indicator-dots="true" 
		autoplay="true" 
		interval="1000" 
		duration="500"
		indicator-active-color="#d81e06"
			style="width:100%;">
		<swiper-item v-for="(item , index) in banner" :key="index">
			<image :src="item.imageUrl" class="img"></image>
		</swiper-item>
	</swiper>
	
       
</view>
</template>

<script>
	import {
		http
	} from "../utils/ajax.js"
	export default {
		data() {
			return {
				title: 'Hello',
				banner: [],
				indicatorDots: true,
				autoplay: true,
				interval: 500,
				duration: 500,
				number:[0,1,2,3]
			}
		},
		mounted() {
			http({
				url: "http://123.57.211.31:8880/banner",
				method: "GET",
				success: res => {
					this.banner = res.data.banners
					console.log(this.banner)
				}
			})
		},
		methods: {

		}
	}
</script>

<style>

.page-section-spacing {  
    width: 100%;  
    height:350rpx;
	padding:30rpx;
	box-sizing: border-box;
}  
.swiper{
	width: 100%; 
	height:100%;
	
}
.img{
	 width: 100%;  
	 height:100%;
	 border-radius: 20rpx;
}

</style>
