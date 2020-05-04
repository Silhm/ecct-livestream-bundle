
<template>
	<b-container fluid class="mt-2 mb-2">
		<b-form>
			<b-form-group
				id="input-group-1"
				label="Thème"
			>
				<b-form-select v-model="theme" :options="items"></b-form-select>
			</b-form-group>

			<b-form-group
				id="input-group-2"
				label="Background"
			>
				<b-form-select v-model="background" :options="backgroundList"></b-form-select>
			</b-form-group>


			<b-row>
				<b-col>
					<b-form-group
						id="input-group-3"
						label="Border color 1"
					><b-form-input type="color" v-model="borderColor1"></b-form-input>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group
						id="input-group-4"
						label="Border color 2"
					><b-form-input type="color" v-model="borderColor2"></b-form-input>
					</b-form-group>
				</b-col>
			</b-row>


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
				borderColor1: '#3d3d3d',
				borderColor2: '#6f6f6f',
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
					background: this.background,
					borderColor1: this.borderColor1,
					borderColor2: this.borderColor2
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
