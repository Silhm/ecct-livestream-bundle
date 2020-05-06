<template>
	<div class="grid" :class="'count-'+camCount">
		<cam-ctrl v-for="(cam, index) in cams"
				  	:class="'guest'+(index+1)"
				  	:camera="cam"
				  	:totalCams="camCount"
				  	:title="'cam'+(index+1)"
				  	:bgColor="camColor"
		></cam-ctrl>
		<cam-ctrl class="presentation-frame"
				  title="présentation"
				  :bgColor="camColor"
		></cam-ctrl>
	</div>
</template>

<script>
	import CamCtrl from './cam-ctrl.vue';

	export default {
		data() {
			return {
				layout: 'guests',
				bgColor: null
			};
		},
		components: {
			CamCtrl
		},
		props: {
			camCount: {
				type: Number,
			},
			cams:{
				type: Array
			},
			camColor: {
				type: String
			}
		}
	};
</script>

<style lang="scss" scoped>

	.guest1 { grid-area: g1; }
	.guest2 { grid-area: g2; }
	.guest3 { grid-area: g3; }
	.guest4 { grid-area: g4; }
	.guest5 { grid-area: g5; }
	.guest6 { grid-area: g6; }
	.guest7 { grid-area: g7; }
	.guest8 { grid-area: g8; }
	.presentation-frame { grid-area: pres; display: none;}

	.grid {
		display: grid;
		gap: 1px 1px;
		grid-area: main;
		grid-gap: 15px;
		margin: 15px;
	}

	.count-1{
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-template-areas:
			"g1 g1"
			"g1 g1";
	}
	.count-2{
		grid-template-columns: 1fr 1fr ;
		grid-template-rows: 16% 1fr 16%;
		grid-template-areas:
			". ."
			"g1 g2"
			". .";
	}
	.count-3{
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 5% 1fr 1fr 5%;
		grid-template-areas:
			". . . ."
			"g1 g1 g2 g2"
			". g3 g3 ."
			". . . .";
		padding: 0 10%;
	}
	.count-4{
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-template-areas:
			"g1 g2"
			"g3 g4"
	}
	.count-5{
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-template-areas:
			"g1 g1 g2 g2 g3 g3"
			". g4 g4 g5 g5 .";
	}
	.count-6{
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-template-areas:
			"g1 g1 g2 g2 g3 g3"
			"g4 g4 g5 g5 g6 g6";
	}
	.count-7{
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: 5% 1fr 5% 1fr 10%;
		grid-template-areas:
			". . . . . . . ."
			"g1 g1 g2 g2 g3 g3 g4 g4"
			". . . . . . . ."
			".  g5 g5 g6 g6 g7 g7 ."
			". . . . . . . .";
	}
	.count-8{
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: 5% 1fr 5% 1fr 10%;
		grid-template-areas:
			". . . . . . . ."
			"g1 g1 g2 g2 g3 g3 g4 g4"
			". . . . . . . ."
			"g5 g5 g6 g6 g7 g7 g8 g8"
			". . . . . . . .";
	}

	[layout="empty"] {
		.cam-content,
		.presentation-frame{
			display: none;
		}
	}

	[layout="presentation"] {
		.presentation-frame{
			display: inherit;
		}
		&.count-3 {
			grid-template-columns: 20% 1fr 1fr;
			grid-template-rows: 1fr 1fr 1fr;
			grid-template-areas:
				"g1 pres pres"
				"g2 pres pres"
				"g3 pres pres";
			padding: 0;
		}
		&.count-4 {
			grid-template-columns: 20% 1fr 1fr;
			grid-template-rows: 1fr 1fr 1fr 1fr;
			grid-template-areas:
				"g1 pres pres"
				"g2 pres pres"
				"g3 pres pres"
				"g4 pres pres";
		}

		&.count-5 {
			grid-template-columns: 20% 20% 20% 20% 1fr;
			grid-template-rows: 1fr 1fr 1fr 1fr;
			grid-template-areas:
				"g1 pres pres pres pres"
				"g2 pres pres pres pres"
				"g3 pres pres pres pres"
				". . g4 g5 .";
		}

		&.count-6 {
			grid-template-columns: 20% 20% 20% 20% 1fr;
			grid-template-rows: 1fr 1fr 1fr 1fr;
			grid-template-areas:
				"g1 pres pres pres pres"
				"g2 pres pres pres pres"
				"g3 pres pres pres pres"
				". g4 g5 g6 .";
		}



	}


</style>
