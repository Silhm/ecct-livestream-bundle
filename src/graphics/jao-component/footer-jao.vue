<template>
	<div class="footer-content">
		<div class="text" v-if="text" style="position: relative;">
			{{text}}
		</div>

		<div class="text" v-if="!text">
			<div class="title">
				<span v-for="(letter,index) in repText" class="letter" :class="isNext? 'hidden':''">{{letter}}</span>
				<div class="next">
					<span v-for="(letter,index) in 'À suivre'" class="letter" :class="isNext? '':'hidden'">{{letter}}</span>
				</div>
			</div>

			<div class="subtitle">
				<b-icon-dot v-if="!isNext"></b-icon-dot>
				<b-icon-arrow-right v-if="isNext"></b-icon-arrow-right>
				<span v-for="(letter,index) in repSubtext" class="letter">{{letter}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {Back, Elastic, TimelineLite, TweenLite, TimelineMax} from "gsap";

	export default {
		data() {
			return {
				override: false,
				repText: 'Japan Addict Online',
				repSubtext: '',
				isNext: false,
				animation: null,
				lettersElements: [],
			};
		},
		mounted() {
			let textWrapper = document.querySelector(".text .title");
			let subtextWrapper = document.querySelector(".text .subtitle");
			//"tl" is the timeline we'll add our tweens to. Then we can easily control the whole sequence as one object.
			this.animation = new TimelineLite({ onComplete:onComplete.bind(this), onReverseComplete:onComplete, paused:true});
			function onComplete() {
				this.animation.pause();
			}
			//set a perspective on the container
			TweenLite.set(textWrapper, {perspective:500});
			this.lettersElements.splice(0,this.lettersElements.length,...this.getLetters());

			this.animation.to(subtextWrapper, 0, {
				opacity: 0,
				z:1,
				ease: Back.easeInOut, // Specify an ease
			});
			this.animation.to(subtextWrapper, 0, {
				x: 300,
				opacity: 0,
				z:1,
				ease: Back.easeInOut, // Specify an ease
			});

			this.animation.staggerTo(this.lettersElements, 4, {
				transformOrigin:"50% 50% -30px",
				rotationY:-360,
				rotation:360,
				ease:Elastic.easeInOut
			}, 0.02);

			this.animation.to(subtextWrapper, 1, {
				opacity: 1,
				x: 0,
				z:1,
				ease: Back.easeInOut, // Specify an ease
			}, '-=1');

			this.animation.play();


			nodecg.listenFor('eventShow', (value, ack) => {
				console.log("message",value);
				this.$el.classList.remove("hidden");
				if (!value) {
					// clear event case
					this.$el.classList.add("hidden");
					return;
				}
				this.override = true;
				this.isNext = false;
				//this.repText = "Japan Addict Online - ";
				this.repSubtext = value.title;

				if(value.isNext){
					console.log("is Next!V");
					this.isNext = true;
					//this.repText = "À suivre";
					this.repSubtext = value.title;
				}

				// acknowledgements should always be error-first callbacks.
				// If you do not wish to send an error, use a falsey value
				// like "null" instead.
				if (ack && !ack.handled) {
					ack(null, value * 2);
				}
				this.animate();
			});

			nodecg.listenFor('animation', (value, ack) => {
				if(value === 'all' || value==='footer'){
					this.animate();
				}
			});

		},
		props: {
			text: {
				type: String,
			},
			subtext: {
				type: String,
			},
		},
		watch: {
			subtext(newSubtext) {
				/*
					let textWrapper = this.$el.querySelector(".subtext");
					textWrapper.innerText = ": "+newSubtext;
					textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
				*/

			}
		},
		methods: {
			animate(){
				this.animation.restart();
			},
			getLetters(){
				return Array.prototype.slice.call(document.querySelectorAll(".title .letter"));
			}
		}
	};
</script>

<style lang="scss" scoped>

	.footer-content {
		display: flex;
		align-items: center;
		background: rgb(0,0,0);
		background: linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 50%, rgba(255,255,255,0) 70%);
		color: #efefef;
		padding-left: 3em;
		font-size: 1.5em;


		.text{
			display: flex;
			position:absolute;

			.letter{
				position:relative;
				min-width: 10px;
				display:inline-block;
				-webkit-font-smoothing: antialiased;
				-moz-font-smoothing:antialiased;
			}
		}


	}
	.hidden{
		display: none!important;
	}



</style>
