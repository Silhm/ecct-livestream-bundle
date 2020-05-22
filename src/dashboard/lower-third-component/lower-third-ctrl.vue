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

					<b-form-timepicker id="timeInput"
									   class="ml-2 mr-2"
									   v-model="guestForm.time"
									   placeholder="Heure de passage"
									   hourCycle="h23"
									   local="fr"></b-form-timepicker>

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
						<b-button variant="success" size="sm" title="Afficher" @click="showGuest(row,'show')" class="mr-1">
							<b-icon-eye></b-icon-eye>
						</b-button>
						<b-button variant="info" size="sm" title="Afficher puis cacher" @click="showGuest(row, 'showhide')" class="mr-1">
							<b-icon-eye></b-icon-eye><b-icon-arrow-right></b-icon-arrow-right><b-icon-eye-slash></b-icon-eye-slash>
						</b-button>
						<b-button variant="warning" size="sm" title="Cacher" @click="showGuest(row, 'hide')" class="mr-1">
							<b-icon-eye-slash></b-icon-eye-slash>
						</b-button>
						<b-button size="sm" title="Supprimer" @click="removeGuest(row)" class="mr-1">
							<b-icon-trash-fill></b-icon-trash-fill>
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
					time: '',
					visibleInfos: {
						name:true,
						role:true,
						website:true,
						time:true
					}
				},
				validateVisible:true,
				guests: [],
				fields: [
					{ key: 'name', label: 'Nom', sortable: true, sortDirection: 'desc' },
					{ key: 'role', label: 'Role', sortable: true},
					{ key: 'website', label: 'Website' },
					{ key: 'time', label: 'Heure de passage', sortable: true },
					{ key: 'actions', label: 'Actions' },
				],
				required: value => !!value || 'Required.',
			};
		},
		created() {
			this.replicant = nodecg.Replicant('lowerThird','ECCT');
			this.id=0;
		},
		mounted() {
			// fill table with already recorded values
			nodecg.readReplicant('lowerThird', 'ECCT', value => {
				this.guests = value || [];
			});
		},
		methods: {
			submit() {
				this.replicant.value = this.guests;
				this.validateVisible = false;
				console.log("lower third list sent!",this.guests);
			},
			addGuest(){
				if(!this.validateVisible){this.validateVisible=true;}
				this.guests.push({
					id: this.id,
					name:this.guestForm.name,
					role:this.guestForm.role,
					website:this.guestForm.website,
					time:this.guestForm.time,
				});
				this.id++;
				Object.keys(this.guestForm).forEach(function(key,index) {
					this.guestForm[key] = '';
				}.bind(this));
				this.submit();
			},
			removeGuest(row){
				const remove = row.item;
				this.guests.splice(this.guests.indexOf(remove),1);
				if(!this.validateVisible){this.validateVisible=true;}
				this.submit();
			},
			showGuest(row, action){
				console.log("show lowerThird for",row.item, action);
				const guest = row.item;
				let lowerThird = {
					person: guest,
					action: action
				}
				nodecg.sendMessage('lowerThird', lowerThird, (error, result) => {
					if (error) {
						console.error(error);
					}
				});
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
