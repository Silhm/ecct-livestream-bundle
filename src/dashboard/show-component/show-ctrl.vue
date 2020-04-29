
<template>
	<b-container fluid class="mt-2 mb-2">
		<b-form>
			<b-form-group
				id="input-group-1"
				label="Titre de l'émission:"
				label-for="nameInput"
			>
				<b-form-input
					id="nameInput"
					type="text"
					v-model="name"
					required
					placeholder="Enter title"
				></b-form-input>
			</b-form-group>
			<b-form-group
				id="input-group-4"
				label="Sous titre:"
				label-for="subtitleInput"
			>
				<b-form-input
					id="subtitleInput"
					type="text"
					v-model="subtitle"
					required
					placeholder="Enter subtitle"
				></b-form-input>
			</b-form-group>

			<b-form-group
				id="input-group-2"
				label="Hashtag"
				label-for="hashtagInput"
			>
				<b-form-input
					id="hashtagInput"
					type="text"
					v-model="hashtag"
					placeholder="Enter Hashtag"
				></b-form-input>
			</b-form-group>

			<b-form-group
				id="input-group-3"
				label="Thème"
				label-for="themeInput"
			>
				<b-form-select v-model="theme" :options="items"></b-form-select>
			</b-form-group>
			<b-button @click="submit" variant="success">Valider</b-button>
		</b-form>
	</b-container>
</template>

<script>

	export default {
		data() {
			return {
				name: 'En chaussettes chez toi',
				hashtag: '#restezchezvous',
				subtitle: '',
				date: new Date().toISOString().substr(0, 10),
				theme: "green",
				items: [
					{value:"green",text:"Vert"},
					{value:"purple",text:"Violet"},
					{value:"korea",text:"Korea"}
				],
				valid: false,
				required: value => !!value || 'Required.',
				menu: false,
			};
		},
		created() {
			this.replicant = nodecg.Replicant('show','ECCT');
		},
		methods: {
			submit() {
				this.replicant.value = {
					name: this.name,
					subtitle: this.subtitle,
					date: this.date,
					hashtag: this.hashtag,
					theme: this.theme
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
