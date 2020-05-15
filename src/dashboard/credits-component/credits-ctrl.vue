<template>
	<b-container fluid class="mt-2 mb-2">
		<b-row class="mb-2 mb-2">
			<b-col cols=12>
				<b-form inline @keypress.enter="addCredit">
					<b-form-input
						id="nameInput"
						type="text"
						class="ml-2 mr-2"
						v-model="creditForm.name"
						placeholder="Nom"
					></b-form-input>
					<b-form-input
						id="roleInput"
						type="text"
						class="ml-2 mr-2"
						v-model="creditForm.role"
						placeholder="Role / titre"
					></b-form-input>
					<b-form-input
						id="websiteInput"
						type="text"
						class="ml-2 mr-2"
						v-model="creditForm.website"
						placeholder="Page perso"
					></b-form-input>

				<b-button @click="addCredit" variant="info">
					<b-icon-person></b-icon-person>
					<b-icon-plus></b-icon-plus>
				</b-button>
				</b-form>
			</b-col>
		</b-row>

		<b-row>
			<b-col>
				<b-table striped hover :items="credits" :fields="fields">
					<template v-slot:cell(actions)="row">
						<b-button variant="danger" size="sm" title="Supprimer" @click="removeCredit(row)" class="mr-1">
							<b-icon-x></b-icon-x>
						</b-button>
					</template>
				</b-table>
			</b-col>
		</b-row>

		<b-row>
			<b-col>
				<b-form-textarea
					placeholder="Texte libre"
					rows="3"
					max-rows="8"
					v-model="text"
					@input="validateVisible=true"
				></b-form-textarea>
			</b-col>
		</b-row>
	<hr/>
		<transition name="fade">
			<b-row align-h="end" class="mr-2" >
				<b-button variant="success" v-if="validateVisible" @click="submit">Valider la liste</b-button>
				<b-alert
					v-if="!validateVisible"
					:show="3"
					dismissible
					fade
					variant="success"
				>
					Crédits validés!
				</b-alert>
			</b-row>
		</transition>
	</b-container>
</template>

<script>
	export default {
		data() {
			return {
				creditForm: {
					name: '',
					role: '',
					website: '',
					visibleInfos: {
						name:true,
						role:true,
						website:true
					}
				},
				validateVisible:true,
				text: '',
				credits: [],
				fields: [
					{ key: 'name', label: 'Nom', sortable: true, sortDirection: 'desc' },
					{ key: 'role', label: 'Role', sortable: true},
					{ key: 'website', label: 'Website' },
					{ key: 'actions', label: 'Actions' },
				],
				required: value => !!value || 'Required.',
			};
		},
		created() {
			this.replicant = nodecg.Replicant('credits','ECCT');
			this.id=0;
		},
		methods: {
			submit() {
				this.replicant.value = {
					list : this.credits,
					text : this.text
				}
				this.validateVisible = false;
				console.log("credits list sent!",this.credits);
			},
			addCredit(){
				if(!this.validateVisible){this.validateVisible=true;}
				this.credits.push({
					id: this.id,
					name:this.creditForm.name,
					role:this.creditForm.role,
					website:this.creditForm.website,
				});
				this.id++;
				Object.keys(this.creditForm).forEach(function(key, index) {
					this.creditForm[key] = '';
				}.bind(this));
			},
			removeCredit(row){
				const remove = this.credits.filter(g => g.id===row.item.id)[0];
				this.credits.splice(this.credits.indexOf(remove),1);
				if(!this.validateVisible){this.validateVisible=true;}
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
