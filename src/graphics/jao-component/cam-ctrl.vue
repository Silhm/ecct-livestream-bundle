<template>
	<div class="cam-content animated-gradient-border" :style="camStyle">
		{{title}}

		<div v-if="camera && camera.name" class="lower-third" :class="{'small':(totalCams > 4) || ((layout === 'presentation') && totalCams>1)}" :layout="layout" :totalCams="totalCams">
			<h3 class="tde">
				<span class="null">{{camera.name}}</span>
			</h3>
			<div class="sub-cat">
				{{camera.role}}
			</div>
		</div>

		<div class="top"></div>
		<div class="right" v-if="!((totalCams ===1) && (layout === 'presentation'))"></div>
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
			bgColor: {
				type: String
			},
			layout: {
				type: String
			},
			camera: {
				type: Object
			},
			totalCams: {
				type: Number
			}
		},
		watch: {
			borderColor1(newColor, oldColor){
				console.log('borderColor1 changed: ', newColor, ' | was: ', oldColor)
			},
			borderColor2(newColor, oldColor){
				console.log('borderColor2 changed: ', newColor, ' | was: ', oldColor)
			},
			bgColor(newVal, oldColor){
				console.log('camcolor changed: ', newVal);
				this.camStyle = {
					color: newVal,
					background: newVal
				};
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
		background: rgba(255, 255, 255, 0.80);
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
				border-bottom: 0 solid transparent;
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
			margin-left: 1.3em;
			font-size: 1.3em;
		}

		&.small,
		&[layout="presentation"]{
			h3.tde {
				&:after {
					border-top: 30px solid transparent;
				}
				span {
					padding: 5px 10px 5px 10px;
				}
				.sub-cat{
					display: none;
				}
			}
		}
		&.small[layout="presentation"]{
			background: none;
			.sub-cat{
				display: none;
			}
		}
	}
	[layout="presentation"][totalcams="1"].lower-third {
		background: none;
		bottom: -26px;
		.sub-cat{
			font-size: 15px;
			margin: 0;
			width: 100%;
			background: rgba(255, 255, 255, 0.8);
			text-align: center;
		}

	}




</style>
