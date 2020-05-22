<template>
	<div class="credits-content animated-gradient-border">
		<h1>Remerciements</h1>
		<article>
			<ul>
				<li v-for="(credit, index) in credits">{{credit.name}} ({{credit.role}}) - {{credit.website}}</li>
			</ul>
			<div>{{ text }}</div>
		</article>

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
				}
			});
		},
		methods: {

		}
	};
</script>

<style lang="scss" scoped>

	.credits-content {
		background: rgba(0, 0, 0, 0.8);
		/*border: 5px solid #2ecc71;*/
		color: white;
		text-align: center;
		grid-area: main;
		margin: 3em;
		padding: 1em;
	}
	article{
		font-family: 'Montserrat', sans-serif;
		text-align: left;
		font-size: 1.5em;
		div{
			margin: 2em;
			white-space: pre-wrap;
		}
	}

</style>
