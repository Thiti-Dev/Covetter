const createFormData = (photo, body) => {
	const data = new FormData();

	data.append('file', {
		name: photo.fileName,
		type: photo.type,
		uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '')
	});

	if (body) {
		Object.keys(body).forEach((key) => {
			data.append(key, body[key]);
		});
	}

	return data;
};

export default createFormData;
