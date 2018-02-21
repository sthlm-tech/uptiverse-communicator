module.exports = {
	enableSecurity: true,
	port: 5001,
	cacheEnabled: false,
	cacheDuration: 3600000,
	db_connectionString: 'mongodb://user-service-user:user-service-user@ds015636.mlab.com:15636/heroku_q9zz0x8s',
	auth: {
		jwt: {
			secret: process.env.JWT_SECRET || 'React Starter Kit'
		},
	  google: {
	    id: process.env.GOOGLE_CLIENT_ID || '13824586724-fhh3e76je16ce10gvk9ucb66eu2oig8p.apps.googleusercontent.com',
	    secret: process.env.GOOGLE_CLIENT_SECRET || 'lJlqp7HNvrSMJJbkzGLk43Aa',
	  }
	},
};
