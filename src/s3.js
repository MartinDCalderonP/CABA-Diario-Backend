require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

let s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

function uploadFile(file){  
    let uploadParams = {
        Bucket: bucketName,
        Body: fs.createReadStream(file.path),
        Key: 'public/images/newsImages/' + Date.now() + path.extname(file),
        ACL: 'public-read'
    }

    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile