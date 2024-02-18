/* eslint-disable no-undef */
const mediasoup = require('mediasoup');

const worker = await mediasoup.createWorker(
  {
    dtlsCertificateFile:'./cert.pem',
    dtlsPrivateKeyFile:'./key.pem'
  }
)