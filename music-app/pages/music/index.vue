<template>
	<view>
		<view>
			<view class="top">
				<h2>{{name}}</h2>
				<p>{{creator}}</p>
			</view>
			<view class="center">
				<image :src="coverImgUrl" class="Img"></image>
			</view>
			 <view class="page-section page-section-gap" >
                <audio id="myAudio"  :src="src" :poster="poster" :name="name" :author="creator" :action="audioAction" controls ></audio>
            </view>
			
		</view>
		<view class="container" :style="{backgroundImage: 'url(' + coverImgUrl + ')'}">
			
		</view>
	</view>
</template>

<script>
	import {http} from "../../utils/ajax.js"
	export default{
		data(){
			return{
				coverImgUrl:"",
				name:"",
				creator:"",
				src:"",
				poster:""
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.id); //打印出上个页面传递的参数。
			http({
				url:"http://123.57.211.31:8880/song/detail",
				data:{
					ids:option.id
				},
				method:"GET",
				success:res=>{
					console.log(res.data.songs[0].name)
					this.coverImgUrl=res.data.songs[0].al.picUrl
					this.name = res.data.songs[0].name
					this.creator = option.creator
					this.poster = res.data.songs[0].al.picUrl
					http({
						url:"http://123.57.211.31:8880/song/url",
						data:{
							id:option.id
						},
						method:"GET",
						success:res=>{
							console.log(res.data)
							this.src = res.data.data[0].url
							console.log(this.current)
						}
					})
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
	.top{
		width:100%;
		font-size: 12px;
		color:#fff;
		text-align: center;
		margin-top:20rpx;
	}
	
	.page-section{
		position: fixed;
		bottom:0;
		
	}
	#myAudio{
	/* width:100%;	 */
}
.page-section{
	width:100vw;
	text-align: center;
}
.center{
	width:100%;
	text-align:center;
	margin-top: 190rpx;
	
}
.Img{
	width:400rpx;
	height:400rpx;
	border-radius: 50%;
	border:40px solid #000;
	
}
</style>
