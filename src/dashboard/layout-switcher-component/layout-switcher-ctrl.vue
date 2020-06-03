<template>
	<b-container fluid class="mt-2 mb-2">
		<b-form>
			<b-form-group label="Forcer un layout">
				<b-form-radio-group
					v-model="layout"
					:options="options"
					name="radios-stacked"
					stacked
					@change="onLayoutChange"
				></b-form-radio-group>
			</b-form-group>

			<b-form-group label="Forcer la couleur des caméras">
				<b-form-checkbox
					v-model="displayCamColor"
					value="true"
					unchecked-value="false"
					@change="onDisplayChange"
				>Forcer</b-form-checkbox>
				<b-form-input type="color" v-model="camColor" @change="onColorChange"></b-form-input>

			</b-form-group>
		</b-form>
	</b-container>
</template>

<script>
	export default {
		data() {
			return {
				options: [
					{ text: 'Layout intro', value: 'intro' },
					{ text: 'Layout invités', value: 'guests' },
					{ text: 'Layout présentation', value: 'presentation' },
					{ text: 'Layout gaming', value: 'gaming' },
					{ text: 'Layout vide', value: 'empty' },
					{ text: 'Layout crédits', value: 'credits' }
				],
				layout: 'guests',
				camColor: '#1aff00',
				displayCamColor: 'false'
			};
		},
		created() {
			this.replicant = nodecg.Replicant('layout','ECCT');
		},
		methods: {
			onLayoutChange(newVal,oldVal){
				this.replicant.value = {
					layout: newVal,
					camColor: this.camColor,
					displayCamColor: this.displayCamColor
				};
			},
			onColorChange(newVal,oldVal){
				this.replicant.value = {
					layout: this.layout,
					camColor: newVal,
					displayCamColor: this.displayCamColor
				};
			},
			onDisplayChange(newVal,oldVal){
				this.replicant.value = {
					layout: this.layout,
					camColor: this.camColor,
					displayCamColor: newVal
				};
			},
		}

	};
</script>

<style lang="scss" scoped>
	body{
		background-color: #f4f4f4;
	}
	.time {
		font-size: 96px;
	}
	.text {
		width: 100%;
		text-align: center;
	}
</style>
