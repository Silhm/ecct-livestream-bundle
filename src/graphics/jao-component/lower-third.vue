<template>
		<div class="lower-third" @click="animate">
			<img class="image" src="assets/logo/kakemono_logo_split1.png">
			<img class="image kakemono" src="assets/logo/kakemono_logo_split3.png">
			<h3 class="tde">
				<span class="name">{{name}}</span>
			</h3>
			<div class="sub-cat">
				<div class="role">{{role}}</div>
				<div class="website" v-if="website">
					<img :class="icon==='facebook'?'icon':'hidden'" src="assets/social/facebook.png">
					<img :class="icon==='instagram'?'icon':'hidden'" src="assets/social/instagram.png">
					<img :class="icon==='twitch'?'icon':'hidden'" src="assets/social/twitch.png">
					<img :class="icon==='twitter'?'icon':'hidden'" src="assets/social/twitter.png">
					<img :class="icon==='youtube'?'icon':'hidden'" src="assets/social/youtube.png">
					<span class="link">{{website}}</span>
				</div>

			</div>
		</div>

</template>

<script>
	import {Back, TimelineLite} from "gsap";



	export default {
		data() {
			return {
				name: '',
				role: '',
				icon: '',
				website: '',
				guests: [],
				publicPath: process.env.BASE_URL
			};
		},
		components: {

		},
		created() {
			let websiteGen = function(name){
				const match = name.toLowerCase().match(/instagram|facebook|twitter|twitch|youtube/gi);
				let social = match && match[0];

				if(social) {
					return {
						icon: social,
						website: name.replace(social, "")
					}
				}
				else{
					return {
						icon: "internet",
						website: name
					}
				}
			};

			nodecg.listenFor('lowerThird', (value, ack) => {
				let animate = value && value.action;
				if (!animate || animate === 'hide') {
					this.animate('quickHide');
					return;
				}

				let person = value.person;

				this.name = person.name;
				this.role = person.role;
				this.icon = websiteGen(person.website).icon;
				this.website = websiteGen(person.website).website;

				if(animate === 'showhide') {
					this.animate('show,hide');
				}
				if(animate === 'show') {
					this.animate('show');
				}

				// acknowledgements should always be error-first callbacks.
				// If you do not wish to send an error, use a falsey value
				// like "null" instead.
				if (ack && !ack.handled) {
					ack(null, value * 2);
				}
			});

		},
		mounted() {
			this.animate('initial');
		},
		watch:{

		},
		methods: {
			animate(phase){
				const timeline = new TimelineLite();
				const box = this.$el;
				const name = this.$el.querySelector(".name");
				const image = this.$el.querySelector(".image");
				const imageKakemono = this.$el.querySelector(".image.kakemono");
				const subcat = this.$el.querySelector(".sub-cat");

				if(phase.includes('initial')) {
					timeline.to(imageKakemono, 0, {
						opacity: 0,
						z:1,
						ease: Back.easeInOut, // Specify an ease
					});
					timeline.to([box, subcat, image], 0, {
						x: 300,
						opacity: 0,
						z:1,
						ease: Back.easeInOut, // Specify an ease
					});
				}

				if(phase.includes('show')) {
					// Apparition
					timeline.to(box, 1, {
						x: 0,
						opacity: 1,
						ease: Back.easeInOut, // Specify an ease
					});
					timeline.to([image,imageKakemono], 1, {
						x: 0,
						opacity: 1,
						ease: Back.easeInOut, // Specify an ease
					}, "-=0.8");
					timeline.to(subcat, 1, {
						x: 0,
						opacity: 1,
						ease: Back.easeInOut, // Specify an ease
					}, "-=0.5");

					timeline.to([image, imageKakemono], 1, {
						zoom: 1.3,
						ease: Back.easeInOut, // Specify an ease
					}, "-=0.5");
					timeline.to(imageKakemono, 0, {
						opacity: 1,
						width: 125,
						ease: Back.easeInOut, // Specify an ease
					}, "-=0.5");
					timeline.to([image, imageKakemono], 0.5, {
						zoom: 1,
						ease: Back.easeInOut, // Specify an ease
					}, "-=0.5");
				}
				if(phase.includes("hide")) {
					// Disparition
					timeline.to([image, imageKakemono, box], 1, {
						x: 1200,
						opacity: 0,
						ease: Back.easeInOut, // Specify an ease
					}, "+=5");
				}
				if(phase.includes("quickHide")) {
					// Disparition rapide
					timeline.to([image, imageKakemono, box], 1, {
						x: 1200,
						opacity: 0,
						ease: Back.easeInOut, // Specify an ease
					});
				}

			}
		}
	};
</script>

<style lang="scss" scoped>

	.lower-third {
		position: absolute;
		bottom: 75px;
		left: 5%;
		min-width: 70%;
		border-bottom: 3px solid var(--lower-color1);
		z-index: 2;

		text-align: left;
		display: flex;
		background: rgba(255, 255, 255, 1);

		img.image{
			position: absolute;
			width: 125px;
			z-index: 1;
			left: -70px;
			top: -35px;
		}

		h3.tde {
			background: var(--lower-color1);
			margin: 0;
			font-size: 25px;
			display: flex;
			align-items: stretch;
			text-transform: uppercase;

			&:after {
				content: "";
				width: 0;
				height: 0;
				border-top: 55px solid transparent;
				border-left: 20px solid var(--lower-color1);
				border-bottom: 0 solid transparent;
				border-right: 0 solid transparent;
				position: relative;
				top: 0;
				background: rgba(255, 255, 255, 1);
			}


			span.name {
				padding: 0 20px 0 50px;
				align-self: center;
				color: white;
				position: relative;
				display: flex;
				margin: 0;
			}
		}

		.sub-cat {
			color: var(--lower-color1);
			//display: flex;
			margin: 0 1.3em;
			font-size: 1.3em;
			align-items: center;
			display: flex;

			.website{
				display: flex;
				flex-direction: row;
				margin-left: 4em;
			}
			.icon{
				max-height: 1.5em;
			}
		}



	}



</style>
