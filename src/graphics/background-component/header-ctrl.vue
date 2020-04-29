<template>
	<div class="header-content">
		<img v-if="logo1" class="logo" src="./assets/logo/ecct.png">
		<h1>{{title}}</h1>
		<span class="social">
			<img src="./assets/social/facebook.png">
			<img src="./assets/social/instagram.png">
			<img src="./assets/social/youtube.png">
			<img src="./assets/social/twitch.png">
			<img src="./assets/social/twitter.png">
			<img src="./assets/social/discord.png">
		</span>
		<div class="hashtag">{{hashtag}}</div>
		<img v-if="logo2" class="logo" src="./assets/logo/kakemono.png" style="top: 20px;right: 10px;">
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			title: {
				type: String,
				required: true
			},
			hashtag: {
				type: String,
				required: false
			},
			logo1: {
				type: String,
				required: false
			},
			logo2: {
				type: String,
				required: false
			}

		},
		created() {


		},
		methods: {

		}
	};
</script>

<style lang="scss" scoped>

	.header-content {
		display: flex;
		align-items: center;
		background: rgba(0, 0, 0, 0.47843137254901963);
		height: 50px;

		h1 {
			color: white;
			letter-spacing: 3px;
			margin: 0 1em;
		}


		img.logo {
			width: 80px;
			margin-left: 1em;
			position: relative;
			top: 12px;
			z-index: 42;
		}

		.social img {
			height: 20px;
		}

		.hashtag {
			color: white;
			width: 30%;
			text-align: center;
			flex: 1 1 auto;
			font-size: 1.3em;
		}
	}



</style>
