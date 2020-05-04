'use strict';

module.exports = function (nodecg) {
	nodecg.log.info('Hello, from your ECCT bundle\'s!');
	nodecg.log.info('Good luck!');


	// Replicants declaration
	nodecg.Replicant('show','ECCT');
	nodecg.Replicant('guests','ECCT');
	nodecg.Replicant('theme','ECCT');
	nodecg.Replicant('layout','ECCT');

	// Assets
	//TODO nodecg.Replicant('assets:logo');
	nodecg.Replicant('assets:background');
};
