const axios = require('axios');
const rp = require('request-promise');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get the statistic of the today covid
// @route   GET /api/covid/today
// @acess   Public
exports.getTodayCovidStatistic = asyncHandler(async (req, res, next) => {
	const _res = await rp({
		url: `https://covid19.th-stat.com/api/open/today`,
		method: 'GET',
		json: true
	});

	// @Finalize the recievedData format
	const finalized_recieved_data = {
		new: {
			confirmed: _res.NewConfirmed,
			recovered: _res.NewRecovered,
			death: _res.NewDeaths
		},
		total: {
			confirmed: _res.Confirmed,
			recovered: _res.Recovered,
			death: _res.Deaths,
			hospitalized: _res.Hospitalized
		}
	};

	res.status(200).json({ sucess: true, data: finalized_recieved_data });
});
