<template>
	<div class="footer-content">
		{{text}}
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
				required: true
			},
		},
		created() {


		},
		methods: {

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
	}



</style>
