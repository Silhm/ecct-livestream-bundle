<template>
	<b-container fluid class="mt-2 mb-2">
		<b-row class="mb-2 mb-2">
			<b-col cols=12>
				<b-form v-if="false" inline @keypress.enter="addEvent">
					<b-form-input
						id="nameInput"
						type="text"
						class="ml-2 mr-2"
						v-model="planningForm.title"
						placeholder="Titre"
					></b-form-input>
					<b-form-input
						id="roleInput"
						type="text"
						class="ml-2 mr-2"
						v-model="planningForm.description"
						placeholder="Description"
					></b-form-input>

					<b-form-timepicker id="timeInput"
									   class="ml-2 mr-2"
									   v-model="planningForm.time"
									   placeholder="Heure"
									   hourCycle="h23"
									   local="fr"></b-form-timepicker>

					<b-button @click="addEvent" variant="info">
						<b-icon-person></b-icon-person>
						<b-icon-plus></b-icon-plus>
					</b-button>
				</b-form>
			</b-col>
		</b-row>

		<b-row>
			<b-col>
				<b-table striped hover :items="agenda" :fields="fields">
					<template v-slot:cell(actions)="row">
						<b-button variant="success" size="sm" title="Afficher dans le stream" @click="showEvent(row)" class="mr-1">
							Stream <b-icon-eye></b-icon-eye>
						</b-button>
						<b-button :variant="row.item.isLive? 'danger':'warning'" size="sm" :title="row.item.isLive?'Live OFF':'Go Live'" @click="setLiveEvent(row)" class="mr-1">
							<b-icon-camera-video-fill v-if="!row.item.isLive"></b-icon-camera-video-fill>
							<b-icon-stop-fill v-if="row.item.isLive"></b-icon-stop-fill>
						</b-button>
						<b-button variant="" size="sm" title="Supprimer" @click="removeEvent(row)" class="mr-1">
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
					Évènements validés!
				</b-alert>
			</b-row>
		</transition>
	</b-container>
</template>

<script>
	const agendaJSON = require('../assets/schedule.json').agenda;
	export default {
		data() {
			return {
				planningForm: {
					title: '',
					description: '',
					time: '',
					visibleInfos: {
						titre:true,
						description:true,
						time:true
					},
					isLive: false
				},
				validateVisible:true,
				events: [],
				agenda: [],
				fields: [
					{ key: 'isLive', label: 'Live', sortable: true, sortDirection: 'desc',  formatter: (value, key, item) => {
							return item.isLive? " ● LIVE":"-"
						}},
					{ key: 'title', label: 'Titre', sortable: true, sortDirection: 'desc' },
					{ key: 'desc', label: 'Description'},
					{ key: 'range[0]', label: 'Heure début', sortable: true },
					{ key: 'range[1]', label: 'Heure fin', sortable: true },
					{ key: 'display', label: 'Heure affichée', sortable: true,
						formatter: (value, key, item) => {
							return `${value.h? value.h+'h':''}${value.m}`
						}, },
					{ key: 'actions', label: 'Actions' },
				],
				required: value => !!value || 'Required.',
			};
		},
		created() {
			this.replicant = nodecg.Replicant('planning','ECCT');
			nodecg.readReplicant('planning', 'ECCT', value => {
				this.agenda = (value && value.agenda) || agendaJSON;
			});

			this.id=0;
		},
		mounted() {

		},
		methods: {
			submit() {
				this.replicant.value = { agenda : this.agenda };
				this.validateVisible = false;
				console.log("planning list sent!",this.agenda);
			},
			addEvent(){
				console.log("TODO: handle event add");
				if(!this.validateVisible){this.validateVisible=true;}
				this.events.push({
					id: this.id,
					title:this.planningForm.title,
					description:this.planningForm.description,
					time:this.planningForm.time,
					isLive:false
			});
				this.id++;
				Object.keys(this.planningForm).forEach(function(key, index) {
					this.planningForm[key] = '';
				}.bind(this));
			},
			removeEvent(row){
				const remove = this.events.filter(g => g.id===row.item.id)[0];
				this.events.splice(this.events.indexOf(remove),1);
				if(!this.validateVisible){this.validateVisible=true;}
			},
			setLiveEvent(row){
				const currentIndex = this.agenda.indexOf(row.item);
				const current = this.agenda[currentIndex].isLive;
				this.agenda.map(e => { e.isLive = false ;  e._cellVariants = null; });
				this.agenda[currentIndex].isLive = !current ;
				this.agenda[currentIndex]._cellVariants = !current? { isLive: 'danger' }:{ isLive: null };
				this.submit();
			},
			showEvent(row){
				console.log("show event for",row.item);
				const event = row.item;

				nodecg.sendMessage('eventShow',event, (error, result) => {
					if (error) {
						console.error(error);
					}
				});
			},
			colorizer(){
				let hex = '#' + ( '00' + Math.floor( Math.random() * 16777216 ).toString(16) ).substr(-6)
				let reverseHex = '#' + hex.replace('#', '').split("").reverse().join("")
				document.documentElement.style.setProperty('--bg', hex)
				document.documentElement.style.setProperty('--accent', reverseHex)
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
