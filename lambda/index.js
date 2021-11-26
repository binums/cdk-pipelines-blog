exports.handler = async (event) => {
	return {
		statusCode: 200,
		headers: { "Content-Type": "text/plain" },
		body: `Congrats!!! You have reached the really useful API`
	};
};
