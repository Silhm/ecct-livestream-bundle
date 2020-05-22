<template>
	<div class="jao-overlays-container">
		<logo-rotate></logo-rotate>
		<lower-third></lower-third>
		<footer-jao></footer-jao>
	</div>
</template>

<script>
	import LogoRotate from './logo-rotate'
	import LowerThird from './lower-third'
	import FooterJao from './footer-jao'

	export default {
		data() {
			return {
				subtext: ''
			};
		},
		components: {
			LogoRotate,
			LowerThird,
			FooterJao
		},
		mounted() {

		}

	};
</script>

<style lang="scss" scoped>
	.jao-overlays-container{
		//background-image: url(https://via.placeholder.com/1920x1080?text=1920x1080);
		//background-image: url(./assets/canap.jpg);
		overflow: hidden;
		/*
		background-color: #00ff19;
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		 */
		min-height: 150px;
		height: 100%;
		position: relative;

		font-family: 'Bangers', cursive;
		font-size: 14px;
		margin: 0;
		letter-spacing: 6px;
	}

	.footer-content {
		bottom: 0;
		position: fixed;
		width: 110%;
		height: 7%;
		font-size: 2em;
		padding-left: 5em;
	}



</style>
