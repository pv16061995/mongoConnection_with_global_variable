const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const _ = require("lodash");
const moment = require("moment");
const constant = require("../common/constant");

dotenv.config({ 'path': path.join(__dirname, './.env') })
const dataDir = path.join(__dirname, '../dataFiles/')

const s3 = new AWS.S3({
    accessKeyId: _.get(constant, ["ENV_CONSTENT", "S3_ACCESS_KEY"], ""),
    secretAccessKey: _.get(constant, ["ENV_CONSTENT", "S3_SECRET_KEY"], "")
});


const s3upload = async () => {
    const files = fs.readdirSync(dataDir)
    const pms = files.map(async fileName => {
        try {
            let splitextension = _.split(fileName, '.');
            let splitUnderScore = _.split(fileName, '_');
            let splitHypen = _.split(_.get(splitUnderScore, [0], ""), '-');
            let splitDot = _.split(_.get(splitUnderScore, [1], ""), '.');
            let exchangeName = _.get(splitHypen, [0], "");
            let coinName = _.get(splitHypen, [1], "");
            let fileDate = _.get(splitDot, [0], "");
            let month = _.parseInt(new Date().getMonth()) + 1;
            let currDate = new Date().getFullYear() + "-" + month + "-" + new Date().getDate();

            if ((fileDate >= currDate) || (_.get(splitextension, [1], "") == 'html')) {
                return true
            }
            // Upload backup to S3 bucket
            const data = fs.readFileSync(`${dataDir}/${fileName}`);
            const s3UploadDir = `${exchangeName}/${coinName}/${fileDate}.txt`;
            const params = {
                Bucket: _.get(constant, ["ENV_CONSTENT", "BUCKET_NAME"], ""), // pass your bucket name
                Key: s3UploadDir, // file will be saved as testBucket/contacts.csv
                Body: data
            }
            const pm = await s3.upload(params).promise()
            fs.unlinkSync(`${dataDir}/${fileName}`)
            console.log(`File uploaded successfully at ${pm.Location}`)
            return true
        } catch (err) {
            console.log("Exception", err)
        }
    })
    await Promise.all(pms)
    return true
};

module.exports = { s3upload };