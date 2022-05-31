require('dotenv').config();


const config = {
    "database": {
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "user": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE
    },
    "secret": process.env.SECRET,
    "emailFrom": process.env.EMAIL,

    
    "smtpOptions": {
        "host": "smtp.gmail.com",
        "port": 587,
        "secure": false,
        "auth": {
            "user": process.env.EMAIL,
            "pass": process.env.EMAIL_PASS
        }
    },

    "s3": {
        "bucketName": process.env.AWS_S3_BUCKET_NAME,
        "accessKey": process.env.AWS_S3_ACCESS_KEY_ID,
        "secretAccessKey": process.env.AWS_S3_SECRET_ACCESS_KEY
    }
};
module.exports = config;