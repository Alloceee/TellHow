<template>
	<!-- Swiper with dots and hover arrows -->
	<swiper :option='swiperOption'>
		<swiper-slide>
			<img src="@/assets/img/1.jpg">
		</swiper-slide>
		<swiper-slide>
			<img src="@/assets/img/2.jpg">
		</swiper-slide>
		<swiper-slide>
			<img src="@/assets/img/3.jpg">
		</swiper-slide>
		<!-- Optional controls -->
		<div class="swiper-pagination" slot="pagination"></div>
		<div class="swiper-button-prev" slot="button-prev"></div>
		<div class="swiper-button-next" slot="button-next"></div>
	</swiper>
	<!-- END Slider with dots and hover arrows -->
</template>

<script>
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'
	import '@/assets/plugins/swiper/css/swiper.min.css'
	export default {
		name: 'Swiper',
		data() {
			return {
				swiperOption: {
					init:false,
					slidesPerView: 1.6,
					centeredSlides: true,
					spaceBetween: 10,
					loop: true,
					speed: 600, //config参数同swiper4,与官网一致
					//分页器设置 
					pagination: {
						el: ".swiper-pagination",
						clickable: true,
						type: "bullets"
					},
					autoplay: 3000,
					prevButton: '.swiper-button-prev',
					nextButton: '.swiper-button-next',
					mousewheelControl: true,
					observeParents: true,
				}
			}
		},
		components: {
			swiper,
			swiperSlide
		}
	}
</script>

<style>
	/* @import url("@/assets/plugins/slick/slick-theme.min.css"); */
</style>
