<template>
	<b-container fluid class="mt-2 mb-2">
		<b-row class="mb-2 mb-2">
			<b-col cols=12>
				<b-form inline @keypress.enter="addGuest">
					<b-form-input
						id="nameInput"
						type="text"
						class="ml-2 mr-2"
						v-model="guestForm.name"
						placeholder="Nom"
					></b-form-input>
					<b-form-input
						id="roleInput"
						type="text"
						class="ml-2 mr-2"
						v-model="guestForm.role"
						placeholder="Role / titre"
					></b-form-input>
					<b-form-input
						id="websiteInput"
						type="text"
						class="ml-2 mr-2"
						v-model="guestForm.website"
						placeholder="Page perso"
					></b-form-input>

				<b-button  @click="addGuest" variant="info">
					<b-icon-person></b-icon-person>
					<b-icon-plus></b-icon-plus>
				</b-button>
				</b-form>
			</b-col>
		</b-row>

		<b-row>
			<b-col>
				<b-table striped hover :items="guests" :fields="fields">

					<template v-slot:cell(actions)="row">
						<b-button variant="danger" size="sm" title="Supprimer" @click="removeGuest(row)" class="mr-1">
							<b-icon-x></b-icon-x>
						</b-button>
					</template>
				</b-table>
			</b-col>
		</b-row>
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
					Invités validés!
				</b-alert>
			</b-row>
		</transition>
	</b-container>
</template>

<script>
	export default {
		data() {
			return {
				guestForm: {
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
				guests: [],
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
			this.replicant = nodecg.Replicant('guests','ECCT');
			this.id=0;
		},
		methods: {
			submit() {
				this.replicant.value = this.guests;
				this.validateVisible = false;
				console.log("guest list sent!",this.guests);
			},
			addGuest(){
				if(!this.validateVisible){this.validateVisible=true;}
				this.guests.push({
					id: this.id,
					name:this.guestForm.name,
					role:this.guestForm.role,
					website:this.guestForm.website,
				});
				this.id++;
				Object.keys(this.guestForm).forEach(function(key,index) {
					this.guestForm[key] = '';
				}.bind(this));
			},
			removeGuest(row){
				const remove = this.guests.filter(g => g.id===row.item.id)[0];
				this.guests.splice(this.guests.indexOf(remove),1);
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
