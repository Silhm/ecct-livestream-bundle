const {fork} = require('child_process');
const command = process.env.NODE_ENV === 'production' ? 'build' : 'watch';

console.log("NODE_ENV",process.env.NODE_ENV);
console.log("bundle",command);
fork('./node_modules/parcel-bundler/bin/cli.js', [
	command,
	'src/graphics/*.html',
	'--out-dir',
	'graphics',
	'--public-url',
	'.'
]);

fork('./node_modules/parcel-bundler/bin/cli.js', [
	command,
	'src/dashboard/*.html',
	'--out-dir',
	'dashboard',
	'--public-url',
	'.'
]);

