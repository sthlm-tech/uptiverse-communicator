module.exports = {
	enableSecurity: true,
	port: 5001,
	cacheEnabled: false,
	cacheDuration: 3600000,
	db_connectionString: process.env.MONGODB_URI || "",
	auth: {
		jwt: {
			secret: process.env.JWT_SECRET || 'React Starter Kit'
		}
	},
};
