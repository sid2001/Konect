/* eslint-disable no-undef */
const {
  PutObjectCommand,
  S3Client,
  GetObjectCommand
} = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({
  endpoint: process.env.SPACES_ENDPOINT, // Find your endpoint in the control panel, under Settings. Prepend "https://".
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    region: process.env.SPACES_REGION, // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (for example, nyc3).
    credentials: {
      accessKeyId: process.env.SPACES_ACCESS_KEY, // Access key pair. You can create access key pairs using the control panel or API.
      secretAccessKey: process.env.SPACES_SECRET // Secret access key defined through an environment variable.
    }
})

const uploadObject = async (params) => {
  const data = await s3Client.send(new PutObjectCommand(params));
  console.log(
    "Successfully uploaded object: " +
      params.Bucket +
      "/" +
      params.Key
  );
  return data;
};

const getObject = async (params) => {
  const response = await client.send(new GetObjectCommand(params));
  // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
  const str = await response.Body.transformToString();
  console.log(str);
};

module.exports.uploadObject = uploadObject;
module.exports.getObject = getObject;