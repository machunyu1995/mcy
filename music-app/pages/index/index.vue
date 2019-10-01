<template>
	<view>
		<swiper></swiper>
		<view>
			<h2 class="txt">推荐歌单</h2>
			<view class="container">
				<ul>

					<li v-for="(item,i) in playList" :key="i" class="musicBox">
						<navigator :url="'/pages/list/index?id='+ (item.id)">
							<image :src="item.picUrl" class="musicImg"></image>
							<p class="imgP">
								<image src="../../static/image/播放.png" class="g-img"></image>
								{{Math.floor(item.playCount/10000)}}万
							</p>
							<p class="text">{{item.name}}</p>
						</navigator>
					</li>


				</ul>
			</view>
		</view>
		<view class="mv">
			<h2 class="txt">优质MV推荐</h2>
			<ul v-if="show">
				<li v-for="(item,i) in mv" :key="i" class="m-li">
					<video id="myVideo" :src="item.src" class="m-img"></video>
					<view class="mBox">
						<p class="mP">{{item.artistName}}《{{item.name}}》</p>
					</view>

				</li>

			</ul>
		</view>
	</view>
</template>

<script>
	import {
		http
	} from "../../utils/ajax.js"
	import swiper from '@/components/swiper'
	export default {
		data() {
			return {
				title: 'Hello',
				playList: [],
				mvList: [],
				mv: [],
				show: true
			}
		},
		components: {
			swiper
		},
		onLoad() {
			http({
				url: "http://123.57.211.31:8880/personalized",
				method: "GET",
				data: {
					limit: 6
				},
				success: (res) => {
					console.log(res.data.result)
					this.playList = res.data.result
				}
			})
			http({
				url: "http://123.57.211.31:8880/top/mv",
				method: "GET",
				data: {
					limit: 10
				},
				success: (res) => {
					res.data.data.forEach(item => {
						http({
							url: "http://123.57.211.31:8880/mv/detail",
							method: "GET",
							data: {
								mvid: item.id
							},
							success: (res) => {
								var arr = {}
								arr.artistName = res.data.data.artistName
								arr.name = res.data.data.name
								arr.src = res.data.data.brs[240]
								this.mv.push(arr)
							}
						})
					})


				}
			})

		},
		methods: {

		}
	}
</script>

<style>
	.txt {
		font-size: 16px;
		font-weight: 600;
		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-bottom: 20rpx;
	}

	.container ul {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}

	.musicBox {
		float: left;
		width: 200rpx;
		height: 300rpx;
		position: relative;
	}

	.musicImg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}

	.g-img {
		width: 20rpx;
		height: 20rpx;


	}

	.imgP {
		font-size: 10px;
		color: #fff;
		display: inline-block;
		position: absolute;
		top: 8rpx;
		right: 19rpx
	}

	.text {
		font-size: 10px;

	}

	.m-li {
		width: 100%;
		height: 500rpx;
		padding: 10rpx;
		box-sizing: border-box;
		font-size: 0;
		position: relative;
	}

	.mBox {
		width: 100%;
		height: 20%;
		background: #eee;
		border-radius: 0 0 15rpx 15rpx;
		line-height: 91rpx;
		text-indent: 10rpx;
	}

	.m-img {
		width: 100%;
		height: 80%;
		border-radius: 15rpx 15rpx 0 0;
	}

	.mP {
		font-size: 13px;

	}

	.start {
		position: absolute;
		top: 31%;
		left: 45%;
		width: 67rpx;
		height: 58rpx;
	}
	.center{
		background: url(../../static/image/bg.png);
	}
</style>
