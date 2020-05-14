
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
				label="Présentateur"
				label-for="hostInput"
			>
				<b-form-input
					id="hostInput"
					type="text"
					v-model="host"
					placeholder="Enter host name"
				></b-form-input>
			</b-form-group>

			<b-form-group
				id="input-group-5"
				label="Titre Présentateur"
				label-for="hostTitleInput"
			>
				<b-form-input
					id="hostTitleInput"
					type="text"
					v-model="hostTitle"
					placeholder="Enter host title"
				></b-form-input>
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
				host: '',
				hostTitle: '',
				date: new Date().toISOString().substr(0, 10),
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
					host: this.host,
					hostTitle: this.hostTitle
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
