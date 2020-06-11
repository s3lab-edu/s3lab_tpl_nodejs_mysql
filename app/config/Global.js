/**
 * Created by bioz on 1/13/2017.
 */
let APIROOT_URL;
let WEBROOT_URL;
let FILE_BUCKET;

if (process.env.NODE_ENV === 'production') {
    APIROOT_URL = 'http://localhost:3000/';
    WEBROOT_URL = 'http://localhost:3000/';
    FILE_BUCKET = 'cdn.abc.com';
} else {
    APIROOT_URL = 'http://localhost:3000/';
    WEBROOT_URL = 'https://localhost:3000/';
    FILE_BUCKET = 'cdn.abc.com';
}

module.exports = {
    https: false,
    appname: 'node_mysql_template',
    port: process.env.NODE_PORT || 3000,
    url: APIROOT_URL,
    weburl: WEBROOT_URL,
    jwtAuthKey: 'fdhjfdfuejfkjdhfaueyruesfhjs',
    sockIOAuthKey: 'fhskjfenfnhpploemjase',
    paths:{
        public: '/public',
        tmp: '/tmp',
        userdata: '/userdata',
        devicedata: '/devicedata',
        snapshot: '/snapshot',
        avatar: '/avatar',
        docs:'/docs',
        tag:'/tag'
    },
    redis: {
        host: 'redis-13545.c1.asia-northeast1-1.gce.cloud.redislabs.com',
        port: '13545',
        password: 'ZO9AuR0MAwEtrxNJZ0cA1HthelMWLDg6'
    },
    socialNetwork: {
        // OAuth 2.0
        facebook:{
            key: process.env.FACEBOOK_OAUTH_KEY || '',
            secret: process.env.FACEBOOK_OAUTH_SECRET || '6c0d7108856b7599eb8e17024f37f251'
        },
        google:{
            key: 'UvpQDEMuLyoMp9awBUIlYlxt',
            secret: '778364511906-9klmdjfvs7kv8u1jc0que7j8qr9vcj3h.apps.googleusercontent.com',
            reCaptchaSecret: '6Ld892UUAAAAADZpT0PAc63k59k6bhmzACjLeMKM',
            reCaptcharVerifyUrl: 'https://www.google.com/recaptcha/api/siteverify',
            storageProId: 's3lab.',
            storageBucket: FILE_BUCKET,
            storageKeyFile: 'config/google_storage.json'
        },
        github:{
            key: process.env.GITHUB_OAUTH_KEY || '',
            secret: process.env.GITHUB_OAUTH_SECRET || ''
        },
        twitter: {
            key: process.env.TWITTER_OAUTH_KEY || 'vdrg4sqxyTPSRdJHKu4UVVdeD',
            secret: process.env.TWITTER_OAUTH_SECRET || 'cUIobhRgRlXsFyObUMg3tBq56EgGSwabmcavQP4fncABvotRMA'
        },
        tumblr: {
            key: process.env.TUMBLR_OAUTH_KEY || '',
            secret: process.env.TUMBLR_OAUTH_SECRET || ''
        },
        instagram: {
            key: process.env.INSTAGRAM_OAUTH_KEY || '',
            secret: process.env.INSTAGRAM_OAUTH_SECRET || ''
        },
        linkedin: {
            key: process.env.LINKEDIN_OAUTH_KEY || '',
            secret: process.env.LINKEDIN_OAUTH_SECRET || ''
        }
    }
};
