const   AWS = require('aws-sdk');
const   s3 = new AWS.S3();

// gets a src image from an s3 bucket
// assumes credentials are shared credentials, environment variables, or IAM role for server
// bucket name explicitly as environment variable

module.exports = function(key) {
  var params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key
  };
  return s3.getObject(params).createReadStream();
}