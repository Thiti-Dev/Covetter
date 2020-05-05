const moment = require('moment');

exports.information = (msg) => {
	let finalized_msg = '[INFO]'.bgCyan.italic + ': ' + msg.blue.bold;
	console.log(finalized_msg);
};

exports.debug = (msg) => {
	let finalized_msg = '[DEBUG]'.bgYellow.italic.red + ': ' + msg.red.bold;
	console.log(finalized_msg);
};

exports.task = (title, msg) => {
	let finalized_msg = `[${title}][TASK]-[${moment().format('LLL')}]`.bgYellow.italic.rainbow + ': ' + msg.white;
	console.log('// ─────────────────────────────── TASK ───────────────────────────────');
	console.log(finalized_msg);
	console.log('───────────────────────────────────────────────────────────────────────');
};
