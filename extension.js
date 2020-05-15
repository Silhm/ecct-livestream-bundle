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

	nodecg.log.info('Creating assets...');
	// Assets
	//TODO nodecg.Replicant('assets:logo');
	nodecg.Replicant('assets:background');

	nodecg.log.info('READY! Enjoy!');
};
