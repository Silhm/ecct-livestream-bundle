
<template>
	<b-container fluid class="mt-2 mb-2">
		<b-form>
			<b-form-group
				id="input-group-1"
				label="Thème"
				label-for="themeInput"
			>
				<b-form-select v-model="theme" :options="items"></b-form-select>
			</b-form-group>

			<b-form-group
				id="input-group-2"
				label="Background"
				label-for="themeInput"
			>
				<b-form-select v-model="background" :options="backgroundList"></b-form-select>
			</b-form-group>




			<b-button @click="submit" variant="success">Valider</b-button>
		</b-form>
	</b-container>
</template>

<script>

	export default {
		data() {
			return {
				theme: 'green',
				background: 'https://via.placeholder.com/1920x1080?text=1920x1080',
				backgroundList: [],
				items: [
					{value:"green",text:"Vert"},
					{value:"purple",text:"Violet"},
					{value:"korea",text:"Korea"}
				],
				menu: false,
			};
		},
		created() {
			this.replicant = nodecg.Replicant('theme','ECCT');
			const background = nodecg.Replicant('assets:background');
			background.on('change', (newValue, oldValue) => {
				let bgList= [{
					value: 'https://via.placeholder.com/1920x1080?text=1920x1080',
					text: 'Default'
				}];
				newValue.forEach(x=>bgList.push({
					value: x.url,
					text:x.base
				}));
				this.backgroundList = bgList;
			});

		},
		methods: {
			submit() {
				this.replicant.value = {
					theme: this.theme,
					background: this.background
				}
				console.log("info sent!", this.replicant);
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
