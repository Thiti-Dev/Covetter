const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const newsapi = require('../utils/news_api');

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
		return [];
	}
	// ────────────────────────────────────────────────────────────────────────────────
	const _res = await addMultipleDocFromData(staged_news, 'news'); // Add multiple docs from array_object_data
	return _res;
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
