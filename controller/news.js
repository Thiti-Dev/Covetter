const fs = require('fs');
const moment = require('moment');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const newsapi = require('../utils/news_api');

const formattedLog = require('../utils/formatted-log');

//
// ─── FIREBASE DB ────────────────────────────────────────────────────────────────
//
const admin = require('../utils/firebase/firebase-service');
const db = admin.firestore();

//
// ─── FIRESTORE UTILS ────────────────────────────────────────────────────────────
//
const { addMultipleDocFromData } = require('../utils/firestore-utils');
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── UTIL FUNCTION ──────────────────────────────────────────────────────────────
//

// @type asynchronize function
// @desc Fetch the news on firestore's database
const fetch_exist_news_on_database = async () => {
	let userRef = db.collection('news');
	const _res = await userRef.get();
	return _res.docs.map((doc) => {
		const docData = doc.data();
		docData.id = doc.id; // assign the id of every docs
		return docData;
	});
};

// @type asynchronize function
// @desc Fetch the news with newsapi then store it to the firestore's database
// @implemented-info [Prevent from creating duplicate news]
const fetch_news_and_store_to_firestore = async () => {
	const existed_new = await fetch_exist_news_on_database();

	// Get existing contenct ( preventing creation of duplicate news )
	const blacklisted_content = existed_new.reduce((prev, news) => {
		return prev.concat(news.url);
	}, []);
	console.log(blacklisted_content);
	// ────────────────────────────────────────────────────────────────────────────────

	// FETCH THE NEWS
	const news = await newsapi.v2.everything({
		q: [ 'โควิด', 'covid' ],
		language: 'th',
		sortBy: 'publishedAt'
	});
	const pre_staging_news = news.articles;
	// ────────────────────────────────────────────────────────────────────────────────

	// @PROCESS filtering out the existing news
	const staged_news = pre_staging_news.filter((_news) => !blacklisted_content.includes(_news.url));
	// Check if the staged_news is empty => skipping the addMultipleDoc phase
	if (staged_news.length === 0) {
		console.log('[WARNING]: Our firestore database is already containing the lastest of news-content');
		fs.writeFileSync('news-task-timestamp.stamp', new Date());
		return [];
	}
	// ────────────────────────────────────────────────────────────────────────────────
	const _res = await addMultipleDocFromData(staged_news, 'news'); // Add multiple docs from array_object_data
	fs.writeFileSync('news-task-timestamp.stamp', new Date());
	return _res;
};

// @type asynchronize function
// @desc Check if should fetching the news from the timestamp
// @case Using after server is just initialized
const fetch_news_after_the_server_just_been_initialized = async () => {
	try {
		var time_txt = fs.readFileSync('news-task-timestamp.stamp', 'utf8');
		let last_stamp = new Date(time_txt);
		if (last_stamp instanceof Date) {
			var now = moment(); //todays date
			var end = moment(last_stamp); // another date
			var duration = moment.duration(now.diff(end));
			var minutes = duration.asMinutes();

			// If a hour has passed
			if (minutes >= 60) {
				const _res = await fetch_news_and_store_to_firestore();
				formattedLog.task('News-fetching', `Added total ${_res.length} news (Modified existing timestap)`);
			} else {
				formattedLog.task(
					'News-fetching',
					`No need the fetch the new ( last fetching was ${minutes} minutes ago)`
				);
			}
		}
	} catch (error) {
		if (error.errno === -4058) {
			console.log('[news-task]: time stamp has not been created yet');
			const _res = await fetch_news_and_store_to_firestore();
			formattedLog.task('News-fetching', `Added total ${_res.length} news (Initialized timestap)`);
		}
	}
};
// ────────────────────────────────────────────────────────────────────────────────

// @desc    Fetch the covid news from newsapi and store into the firestore-database
// @route   GET /api/news/fetchtask
// @acess   Private/System => function
exports.getSupportedNews = asyncHandler(async (req, res, next) => {
	const _res = await fetch_news_and_store_to_firestore();
	res.status(200).json({
		success: true,
		data: {
			total_created_news: _res.length,
			performance_trace_each_task: _res
		}
	});
});

// @desc    Get the covid related news on firestore datbase
// @route   GET /api/news
// @acess   Public
exports.getNews = asyncHandler(async (req, res, next) => {
	const _res = await db.collection('news').orderBy('publishedAt', 'desc').limit(50).get();
	const contents = _res.docs.map((doc) => {
		const docData = doc.data();
		docData.id = doc.id; // assign the id of every docs
		return docData;
	});
	res.status(200).json({
		success: true,
		data: contents
	});
});

//
// ─── VIRTUAL INTERVAL TASK ──────────────────────────────────────────────────────
//
setInterval(async () => {
	const _res = await fetch_news_and_store_to_firestore();
	formattedLog.task('News-fetching', `Added total ${_res.length} news`);
}, 3600000);
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── AFTER SERVER INITIALIZED ───────────────────────────────────────────────────
//

// 5 seconds wait for everything to get load on stage
setTimeout(() => {
	fetch_news_after_the_server_just_been_initialized();
}, 5000);

// ────────────────────────────────────────────────────────────────────────────────
