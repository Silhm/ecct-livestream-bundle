<template>
	<div class="chat-content animated-gradient-border">
		<div class="left"></div>
		<div class="right"></div>
		<div class="top"></div>
		<div class="bottom"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			text: {
				type: String,
			},
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


		},
		methods: {

		}
	};
</script>

<style lang="scss" scoped>

	.chat-content {
		background: rgba(0, 0, 0, 0.8);
		/*border: 5px solid #2ecc71;*/
		color: white;
		text-align: center;
		padding-top: 50%;
	}


</style>
