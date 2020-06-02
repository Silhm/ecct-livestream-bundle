<template>
	<div class="credits-content animated-gradient-border">
		<h1 @click="animate">Remerciements</h1>
		<article>
			<div class='wrapper'>
				<div class='movie'></div>
				<div v-for="(credit, index) in credits" class="person">
					<div v-if="credit.role" class='job'>{{credit.role}}</div>
					<div v-if="credit.name" class='name'>{{credit.name}}</div>
					<div v-if="credit.website" class='website'>{{credit.website}}</div>
				</div>
			</div>
			<div class="ending-credits">{{ text }}</div>
		</article>
		<div class="left"></div>
		<div class="right"></div>
		<div class="top"></div>
		<div class="bottom"></div>
	</div>
</template>

<script>
	import {Back, TimelineLite} from "gsap";

	export default {
		data() {
			return {
				credits: [],
				text: ''
			};
		},
		props: {
			opacity: {
				type: Number,
			},
			borderColor1: {
				type: String,
			},
			borderColor2: {
				type: String
			}
		},
		created() {
			this.replicant = nodecg.Replicant('credits','ECCT');
			this.replicant.on('change', (newValue, oldValue) => {
				console.log('credits', newValue);
				if(newValue) {
					this.credits = newValue.list;
					this.text = newValue.text;
					this.animate();
				}
			});
		},
		mounted() {

		},
		methods: {
			animate(phase) {
				const timeline = new TimelineLite();
				const wrapper = this.$el.querySelector(".wrapper");
				const endingCredit = this.$el.querySelector(".ending-credits");

				timeline.to(endingCredit, 0, {
					opacity: 0,
					z: 1,
					ease: "none", // Specify an ease
				});

				timeline.to(wrapper, this.credits.length * 3, {
					top: -wrapper.clientHeight,
					z: 1,
					ease: "none", // Specify an ease
				});
				timeline.to(endingCredit, 2, {
					opacity: 1,
					z: 1,
					ease: Back.easeInOut, // Specify an ease
				}, "-=2");

			}
		}
	};
</script>

<style lang="scss" scoped>
	@import url(https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300);

	.credits-content {
		background: radial-gradient(circle at top center, #333333c2 0%, #111111e6 100%);
		overflow: hidden;
		/*border: 5px solid #2ecc71;*/
		color: white;
		text-align: center;
		grid-area: main;
		margin: 3em;
		padding: 1em;
	}
	article{
		overflow: hidden;
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.wrapper{
		position: absolute;
		//top: 100%; //DEBUG
		width: 100%;
		margin: 0 auto;
		font: 300 30px/1 "Open Sans Condensed", sans-serif;
		text-align: center;
		color: #fff;
		//animation: 55s credits linear infinite;
	}

	.movie {
		margin-bottom: 50px;
		font-size: 50px;
	}

	.person{
		margin-bottom: 50px;
	}

	.job {
		margin-bottom: 5px;
		font-size: 18px;
		text-transform: uppercase;
	}
	.name {
		margin-bottom: 5px;
		font-size: 35px;
		text-transform: uppercase;
	}
	.ending-credits{
		white-space: pre-wrap;
		padding: 0 1em;
		text-align: center;
		margin-top: 15%;
		font: 300 30px/1 "Open Sans Condensed", sans-serif;
	}

	@keyframes credits {
		0% { top:  100%; }
		100% { top: -500%; }
	}











</style>
