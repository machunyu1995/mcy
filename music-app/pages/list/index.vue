<template>
	<view>
		<div class="top">
			<div class="left">
				<image :src="coverImgUrl" class="L-img"></image>
				<p class="imgP">
					<image src="../../static/image/播放.png" class="g-img"></image>
					{{Math.floor(playCount/10000)}}万
				</p>
			</div>
			<div class="right">
				<p class="descr">{{name}}</p>
				<p>
					<image :src="avatarUrl" class="avatar"></image>
					<span class="ntxt">{{nickname}}</span>
				</p>
				<p class="context">
					{{description}}
				</p>
			</div>
		</div>
		<div class="bottom">
			<ul>
				<li v-for="(item,i) in musicList" class="lis" :key="i">
					<p class="pTxt">
					{{i+1}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.name}}	
					</p>
					<navigator :url="'/pages/music/index?id='+ (item.id)+'&name='+(item.name)+'&picUrl='+(item.al.picUrl)+'&creator='+(item.ar[0].name)">
					<image src="../../static/image/播放%20(3).png" class="pImg"></image>
					</navigator>
				</li>
			</ul>
		</div>
		<view class="container" :style="{backgroundImage: 'url(' + coverImgUrl + ')'}">

		</view>
	</view>
</template>

<script>
	import {
		http
	} from "../../utils/ajax.js"
	export default {
		data() {
			return {
				obj: {},
				coverImgUrl: "",
				playCount: 0,
				description: "",
				name: "",
				nickname: "",
				avatarUrl: "",
				musicList:[]
				
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.id); //打印出上个页面传递的参数。
			http({
				url: "http://123.57.211.31:8880/playlist/detail",
				data: {
					id: option.id
				},
				method: "GET",
				success: res => {
					
					this.coverImgUrl = res.data.playlist.coverImgUrl
					this.playCount = res.data.playlist.playCount
					this.description = res.data.playlist.description
					this.name = res.data.playlist.name
					this.nickname = res.data.playlist.creator.nickname
					this.avatarUrl = res.data.playlist.creator.avatarUrl
					
                    this.musicList = res.data.playlist.tracks
					console.log(this.musicList)
				}
			})
		}
	}
</script>

<style>
	.container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-position: center;
		filter: blur(15px) brightness(0.6);
		z-index: -10000;
	}

	.top {
		width: 100%;
		height: 40%;
		padding: 40rpx 20rpx;
		box-sizing: border-box;

	}

	.L-img {
		width: 250rpx;
		height: 250rpx;
		border-radius: 10rpx;
		position: relative;
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
		top: 48rpx;
		left: 93px;
	}

	.left {
		float: left;
	}

	.right {
		float: right;
		width: 60%;
	}

	.descr {
		color: #fff;
		font-weight: 700;
		font-size: 14px;
		width: 80%;
	}

	.avatar {
		width: 64rpx;
		height: 33px;
		border-radius: 50%;
		margin-top: 10rpx;
		float: left;
	}

	.ntxt {
		color: #fff;
		font-size: 12px;
		margin-left: 12rpx;
		margin-top: 27rpx;
		display: inline-block;
	}

	.context {
		width: 80%;
		height: 8vh;
		margin-top: 25rpx;
		color: #fff;
		font-size: 12px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
	.bottom{
		width:100%;
		margin-top: 242rpx;
		font-size: 12px;
		background: #fff;
		padding:0 20rpx;
		box-sizing: border-box;
	}
	.lis{
		width:100%;
		height:70rpx;
		line-height:70rpx;
		vertical-align: middle;
		border-bottom: 1px solid #eee;
	
	}
	.pTxt{
		width:90%;
		float: left;
			overflow: hidden;
		 text-overflow: ellipsis;
		white-space: nowrap;
	}
	.pImg{
		float: right;
	width: 47rpx;
     height: 40rpx;
	margin-top: 18rpx;
	}
</style>
