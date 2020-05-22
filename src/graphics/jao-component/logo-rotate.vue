<template>

		<div class="wrapper" @click="animate">
			<div class="wrap">
				<div class="inner first">
					<div class="face front">
						<img src="assets/logo/logo-rong-kakemono.png">
					</div>
					<div class="face back">
						<img src="assets/logo/logo-rong-ecct.png"></div>
				</div>
			</div>
		</div>
</template>

<script>
	import {Back, TimelineLite, TweenLite, TimelineMax} from "gsap";


	export default {
		data() {
			return {


			};

		},
		mounted(){
// set some global properties
			TweenLite.set('.wrap', {perspective:1000});
			TweenLite.set('.inner', {transformStyle:"preserve-3d"});
			TweenLite.set('.back', {rotationY: -180});
			TweenLite.set(['.back', '.front'], {backfaceVisibility:"hidden", transformOrigin:'50% 0'});

// loop through each element
				let el = document.querySelector(".wrapper");
				// set some individual properties
				//TweenMax.set($(el).find('.back'), {backgroundColor:'#' + Math.floor(Math.random() * 16777215).toString(16)});

				// create a timeline for this element in paused state
				var tl = new TimelineMax({paused: true});

				// create your tween of the timeline in a variable
				var t = tl
					.set(el,{willChange:"transform"})
					//.set($(el).find('.wrap'), {zIndex: 2, overwrite:"all"})
					.to(el.querySelector('.inner'), 1.53,
						{
							rotationY:540,
							z:0.01,
							zIndex: 2,
							overwrite:"all",
							ease:Back.easeOut
						}, 0)



				// store the tween timeline in the javascript DOM node
				el.animation = t;
		},
		created() {
			nodecg.listenFor('animation', (value, ack) => {
				if(value === 'all' || value==='logo'){
					this.animate();
				}
			});
		},
		methods: {
			animate(){
				this.$el.animation.play();
				window.setTimeout(function () {
					this.$el.animation.reverse();
				}.bind(this),4500);

			}
		}


	};
</script>

<style lang="scss" scoped>

	.wrapper {
		max-width: var(--logo-size);
		position: fixed;
		right: 120px;
		top: 10px;
	}

	.wrap {
		position: relative;
		top:0;
		left:0;
		list-style-type: none;
		margin: 0;
		height: var(--logo-size);
		max-width: var(--logo-size);
		-webkit-font-smoothing:antialiased;
	}

	.wrap .inner {
		position: absolute;
		top:0;
		left:0;
		width: var(--logo-size);
		height: var(--logo-size);
		cursor: pointer;
		z-index: 1;
	}

	.wrapper:hover .inner{
		z-index:3;
	}

	.wrap .inner .face {
		position: absolute;
		top:0;
		left:0;
		width: 100%;
		height: 100%;
		overflow: hidden;

		img{
			width: var(--logo-size);
			height: var(--logo-size);
		}
	}

	.wrap .inner .front {


	}

	.wrap .inner .back {
		left:0;
	}



</style>
