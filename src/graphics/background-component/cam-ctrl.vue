<template>
	<div class="cam-content animated-gradient-border" :style="camStyle">
		{{title}}

		<div v-if="camera && camera.name" class="lower-third">
			<h3 class="tde">
				<span class="null">{{camera.name}}</span>
			</h3>
			<div class="sub-cat" v-if="totalCams < 5">

			</div>
		</div>

		<div class="top"></div>
		<div class="right"></div>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				camStyle: {
					backgroundColor: 'transparent'
				}
			};
		},
		props: {
			title: {
				type: String,
			},
			subtitle: {
				type: String,
			},
			border: {
				type: String
			},
			borderColor1: {
				type: String
			},
			borderColor2: {
				type: String
			},
			camera: {
				type: Object
			},
			totalCams: {
				type: Number
			},
			camColor: {
				type: String
			},
			displayCamColor: {
				type: String
			}

		},
		watch: {
			borderColor1(newColor, oldColor){
				console.log('borderColor1 changed: ', newColor, ' | was: ', oldColor)
			},
			borderColor2(newColor, oldColor){
				console.log('borderColor2 changed: ', newColor, ' | was: ', oldColor)
			},
			displayCamColor(newVal, oldColor){
				console.log('camcolor changed: ', newVal);
				const newCamStyle = {
					color: this.camColor,
					background: this.camColor
				}
				this.camStyle = newVal === 'true'? newCamStyle:null;

			}
		}
	};
</script>

<style lang="scss" scoped>
	.cam-content {
		border-left: 5px solid var(--border-color2);
		border-bottom: 5px solid var(--border-color2);
		text-align: center;
		background: url(./assets/logo/canap-05.png) no-repeat center;
		background-size: contain;
	}

	.lower-third{
		position: absolute;
		bottom: 0;
		border-bottom: none;

		text-align: left;
		display: block;
		background: rgba(255, 255, 255, 0.80);;
		width: 100%;

		h3.tde {
			margin: 0;
			font-size: 16px;
			line-height: 20px;
			display: inline-block;
			text-transform: uppercase;

			&:after{
				content: "";
				width: 0;
				height: 0;
				border-top: 40px solid transparent;
				border-left: 20px solid var(--border-color2);
				border-bottom: 0px solid transparent;
				border-right: 0 solid transparent;
				position: absolute;
				top: 0;
			}

			span {
				background: var(--border-color2);
				padding: 10px 20px 10px 20px;
				color: white;
				position: relative;
				display: inline-block;
				margin: 0;
			}
		}
		.sub-cat {
			color: var(--border-color2);
			display: inline-block;
			margin-left: 100px;
			font-size: 1.3em;
		}
	}




</style>
