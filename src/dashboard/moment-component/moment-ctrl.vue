<template>
	<b-container fluid class="mt-2 mb-2">
		<b-row class="mb-2 mt-2">
			<b-col cols=12>
				<b-form inline @keypress.enter="addMoment">
					<b-form-input
						id="titleInput"
						type="text"
						class="ml-2 mr-2"
						v-model="momentForm.title"
						placeholder="Title"
					></b-form-input>
					<b-form-input
						id="descriptionInput"
						type="text"
						class="ml-2 mr-2"
						v-model="momentForm.description"
						placeholder="Description"
					></b-form-input>

					<b-button  @click="addMoment" variant="info">
						<b-icon-clock-history></b-icon-clock-history>
						<b-icon-plus></b-icon-plus>
					</b-button>
				</b-form>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<b-table striped hover :items="moments" :fields="fields">
					<template v-slot:cell(actions)="row">
						<b-button variant="danger" size="sm" title="Supprimer" @click="removeGuest(row)" class="mr-1">
							<b-icon-x></b-icon-x>
						</b-button>
					</template>
				</b-table>
			</b-col>
		</b-row>

	</b-container>
</template>

<script>
	export default {
		data() {
			return {
				momentForm: {
					title: '',
					description: ''
				},
				moments: [],
				fields: [
					{ key: 'title', label: 'Titre', sortable: false},
					{ key: 'description', label: 'Description', sortable: false},
					{ key: 'time', label: 'Heure', sortable: true },
					{ key: 'actions', label: 'Actions' },
				],
			};
		},
		methods: {
			addMoment(){
				this.moments.push({
					title:this.momentForm.title,
					description:this.momentForm.description,
					time: new Date(),
				});
				//Reset form
				Object.keys(this.momentForm).forEach(function(key,index) {
					this.momentForm[key] = '';
				}.bind(this));
				console.log(this.moments);
			}
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
