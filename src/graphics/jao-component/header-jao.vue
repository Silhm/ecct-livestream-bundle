<template>
	<div class="header-content">
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Japan Addict Online',
				hashtag: '#JAO #Kakemono'
			};
		},
		props: {

		},
		created() {
			/*
			this.showReplicant = nodecg.Replicant('show','ECCT');
			this.showReplicant.on('change', (newValue, oldValue) => {
				if(newValue) {
					this.title = newValue.name;
					this.hashtag = newValue.hashtag;
				}
			});
			*/
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
