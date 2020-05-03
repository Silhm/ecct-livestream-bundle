<template>
	<div class="grid-container guest-count-4" :class="'theme-'+theme">
		<header-ctrl
			:title="title"
			:hashtag="hashtag"
			:logo1="logo1"
			:logo2="logo2"
			class="header"
		></header-ctrl>
		<layout-ctrl :camCount="camCount"
					 :cams="cams"
					 :camColor="camColor"
		></layout-ctrl>
		<aside>
			<chat-ctrl :color="camColor"
			></chat-ctrl>
			<cam-ctrl class="cam-host"
					  :bgColor="camColor"
			>host</cam-ctrl>
		</aside>

		<footer-ctrl :text="footer" class="footer"></footer-ctrl>
	</div>
</template>

<script>
	import HeaderCtrl from './header-ctrl.vue';
	import FooterCtrl from './footer-ctrl.vue';
	import ChatCtrl from './chat-ctrl.vue';
	import CamCtrl from './cam-ctrl.vue';
	import LayoutCtrl from './layout-ctrl.vue';


	export default {
		data() {
			return {
				title: 'Show title',
				hashtag: 'hashtag',
				footer: 'Show subtitle',
				logo1: './assets/logo/ecct.png',
				logo2: './assets/logo/kakemono.png',
				camCount: 4,
				cams: [],
				theme: '',
				camColor: 'transparent',
				displayCamColor: 'false'
			};
		},
		components: {
			HeaderCtrl,
			FooterCtrl,
			ChatCtrl,
			LayoutCtrl,
			CamCtrl
		},
		created() {
			this.showReplicant = nodecg.Replicant('show','ECCT');
			this.guestReplicant = nodecg.Replicant('guests','ECCT');
			this.layoutReplicant = nodecg.Replicant('layout','ECCT');

			this.showReplicant.on('change', (newValue, oldValue) => {
				console.log('show', newValue);
				if(newValue) {
					this.title = newValue.name;
					this.hashtag = newValue.hashtag;
					this.theme = newValue.theme;
					this.footer = newValue.subtitle;
				}
			});
			this.guestReplicant.on('change', (newValue, oldValue) => {
				console.log("guests",newValue);
				if(newValue) {
					this.camCount = newValue.length;
					this.cams = newValue;
				}
			});
			this.layoutReplicant.on('change', (newValue, oldValue) => {
				if(newValue) {
					console.log("layout",newValue);
					this.camColor = newValue.displayCamColor ==='true' ? newValue.camColor:null;
				}
			});
		},
		watch:{
			theme(newTheme,oldTheme){
				console.log("newTheme:",newTheme);

			}
		},
		methods: {

		}
	};
</script>

<style lang="scss" scoped>
	@import 'assets/animations';

	.header { grid-area: header; }
	.footer { grid-area: footer; }
	.chat { grid-area: chat; }
	aside{
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1.3fr 0.7fr;
		gap: 1px 1px;
		grid-template-areas: "chat" "host";
		grid-area: side;
		padding: 0 10px;
		margin-top: 15px;
		grid-gap: 15px;
	}
	.cam-host{
		margin-bottom: 30px;
	}


	.grid-container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 0.2fr 2.6fr 0.2fr;
		gap: 1px 1px;
		grid-template-areas: "header header header header"
		"main main main side"
		"footer footer footer side";
		background-image: url(https://via.placeholder.com/1920x1080?text=1920x1080);
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		min-height: 100%;
		position: relative;

		font-family: 'Bangers', cursive;
		font-size: 14px;
		margin: 0;
		letter-spacing: 6px;
	}

	/* themes */
	.theme-purple{
		--border-color1 : rgb(196, 92, 177);
		--border-color2 : rgb(169, 76, 153);

		background-image: url(assets/backgrounds/kpop-stage.jpg);

		.header{
			background: linear-gradient(90deg, rgba(1, 1, 1, 0.83) 0%, rgba(121, 9, 100, 0.81) 38%, rgb(29, 29, 29) 100%);
		}
		.footer{
			background: linear-gradient(90deg, rgba(1, 1, 1, 0.83) 0%, rgba(121, 9, 100, 0.81) 50%, rgba(29, 29, 29, 0) 70%);
		}
	}

	/* themes */
	.theme-korea{
		--border-color1 : #ffb2b2;
		--border-color2 : #ffdde2;

		background-image: url(assets/backgrounds/korea.png);

		.header{
			background: linear-gradient(90deg, rgba(1, 1, 1, 0.83) 0%, rgb(173, 201, 235) 38%, #1d1d1d 100%);
		}
		.footer{
			background: linear-gradient(90deg, rgb(77, 90, 106) 0%, rgb(173, 201, 235) 50%, rgba(29, 29, 29, 0) 70%);
		}

		.lower-third h3.tde span{
			color: #609ee9;
		}
	}






</style>
