<template>
	<!-- Slider with dots and hover arrows -->
	<div class="js-slider slick-nav-white slick-nav-hover" data-slider-dots="true" data-slider-arrows="true" style="height: 210px;">
	    <div>
	        <img class="img-responsive" src="@/assets/img/1.jpg" alt="">
	    </div>
	    <div>
	        <img class="img-responsive" src="@/assets/img/2.jpg" alt="">
	    </div>
	    <div>
	        <img class="img-responsive" src="@/assets/img/3.jpg" alt="">
	    </div>
	</div>
	<!-- END Slider with dots and hover arrows -->
</template>

<script>
	import slick from '@/assets/plugins/slick/slick.min.js'
	export default{
		name:'Slick'
	}
</script>

<style>
	/* @import url("@/assets/plugins/slick/slick-theme.min.css"); */
</style>
