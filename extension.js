'use strict';

module.exports = function (nodecg) {
	nodecg.log.info('Hello, from your ECCT bundle\'s!');

	nodecg.log.info('Creating replicants...');
	// Replicants declaration
	nodecg.Replicant('show','ECCT');
	nodecg.Replicant('guests','ECCT');
	nodecg.Replicant('theme','ECCT');
	nodecg.Replicant('layout','ECCT');
	nodecg.Replicant('credits','ECCT');
	let planningReplicant = nodecg.Replicant('planning','ECCT');


	nodecg.log.info('Creating assets...');
	// Assets
	//TODO nodecg.Replicant('assets:logo');
	nodecg.Replicant('assets:background');




	nodecg.listenFor('eventShow', (event, ack) => {
		console.log("event is live",event);
		/*if (!event) {
			ack(new Error('no event?'));
			return;
		}
		let actualPlanningReplicant = nodecg.readReplicant('planning', 'ECCT');

		let objIndex = actualPlanningReplicant.findIndex((obj => obj === event));

		console.log("index is",objIndex);
*/
		// acknowledgements should always be error-first callbacks.
		// If you do not wish to send an error, use a falsey value
		// like "null" instead.
		if (ack && !ack.handled) {
			ack(null, event * 2);
		}
	});



	nodecg.log.info('READY! Enjoy!');
};
