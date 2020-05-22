<template>
	<div class="jao-container">
		<header-jao></header-jao>
		<schedule-jao></schedule-jao>
		<footer-jao text="Japan addict online: Le Planning"></footer-jao>

	</div>
</template>

<script>
	import HeaderJao from './header-jao'
	import FooterJao from './footer-jao'
	import ScheduleJao from './schedule-jao'

	export default {
		data() {
			return {
				name: '',
				role: '',
				website: '',
				guests: [],
			};
		},
		components: {
			HeaderJao,
			FooterJao,
			ScheduleJao
		}

	};
</script>

<style lang="scss" scoped>
	.header-content { grid-area: header; }
	.footer-content { grid-area: footer; }
	.jao-schedule { grid-area: main; }

	.jao-container{
		display: grid;
		grid-template-columns: 3% 1fr 1fr 3%;
		grid-template-rows: 5% 1fr 5%;
		gap: 1px 1px;
		grid-template-areas: "header header header header"
		". main main ."
		"footer footer footer footer";



		//background-image: url(https://via.placeholder.com/1920x1080?text=1920x1080);
		overflow: hidden;
		background-color: #696969;
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


		background-size: 300% 300%;
		background-image: linear-gradient(-45deg, #e3893b 0%, #e69657 25%, #ffa610 51%, #ff357f 100%);

		animation: AnimateBG 20s ease infinite;

	}

	@keyframes AnimateBG {
		0%{background-position:0% 50%}
		50%{background-position:100% 50%}
		100%{background-position:0% 50%}
	}




</style>
