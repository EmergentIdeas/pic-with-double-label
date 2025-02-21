let appName = 'ck-widget-play'

module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [{
            name: appName + '-web-live',
            script: './web-server.js',
            "env": {
                PORT: 3000,
				trackerSecretKey: 'e17a41ac98e411aa5a157dac9e36873f'
				, initialAdminPassword: 'lXPZGmyRPAU'
				, siteDomain: 'www.thesitename.com'
				/*
				, dbs: [
                   {
                       "type": "mongodb",
                       "dbName": "ckwidgetplay",
                       "url": "mongodb://localhost:27017/",
                       "collectionNames": [ "webhandleusers_users" ]
                   }
                ]
				*/
            }
        }
    ]
};
