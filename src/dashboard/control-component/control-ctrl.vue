<template>
	<b-container fluid class="mt-2 mb-2">

		<b-form>
			<b-form-group>
				<b-button-group>
					<b-button variant="success" @click="eventCtrl('current')">SHOW CURRENT EVENT</b-button>
					<b-button variant="warning" @click="eventCtrl('next')">SHOW NEXT EVENT</b-button>
					<b-button variant="danger" @click="eventCtrl('clear')">CLEAR EVENT</b-button>
				</b-button-group>
				<br/>
				<div v-if="liveEvent"><b-badge variant="danger">Live</b-badge> {{liveEvent.title}}</div>
				<div v-if="nextEvent"><b-badge variant="warning">Next</b-badge>  {{nextEvent.title}}</div>
			</b-form-group>
			<hr>
			<b-form-group>
				<b-button variant="danger" @click="clear('person')">CLEAR PERSON</b-button>
			</b-form-group>
			<b-form-group>
				<b-button variant="info" @click="animate('all')">ANIMATION</b-button>
			</b-form-group>
		</b-form>

	</b-container>
</template>

<script>

	export default {
		data() {
			return {
				liveEvent:null,
				nextEvent:null,
			};
		},
		created() {
			this.replicant = nodecg.Replicant('planning','ECCT');
			this.replicant.on('change', (newValue, oldValue) => {
				//Display live event and next event
				if(newValue && newValue.agenda && newValue.agenda.find) {
					this.liveEvent = newValue.agenda.find(e => e.isLive === true);
					const index = newValue.agenda.findIndex(e => e.isLive === true);
					this.nextEvent = newValue.agenda[index+1];
				}
			});


		},
		methods: {
			clear(type){

				let message = "lowerThird"
				type = null;

				nodecg.sendMessage(message, type, (error, result) => {
					if (error) {
						console.error(error);
					}
				});
			},
			eventCtrl(type){
				let message = null;
				if(type === "current"){
					message = this.liveEvent;
					message.isNext = false;
				}
				else if(type === "next"){
					message = this.nextEvent;
					message.isNext = true;
				}
				else if(type === "clear"){
					message = null;
				}

				nodecg.sendMessage('eventShow', message, (error, result) => {
					if (error) {
						console.error(error);
					}
				});
			},
			animate(type){
				nodecg.sendMessage('animation', type, (error, result) => {
					if (error) {
						console.error(error);
					}
				});
			},
			lowerThird(status){
				nodecg.sendMessage('lowerThird',status, (error, result) => {
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
