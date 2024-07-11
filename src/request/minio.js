const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: '192.168.20.31',
  port: 9000,
  accessKey: 'YIu2d46avEVbeRnNYjUu',
  secretKey: 'TexEXA5OLZ5y6KFTINgOGHpk3EtJXhnT9RcgFuRz',
  useSSL: false,
});
// Subir y guardar imágenes
exports.uploadImages = (imageName, imageStream, imageType) => {
  let bucketName = 'imagenes';
  if (!minioClient.bucketExists(bucketName)) {
    minioClient.makeBucket(bucketName);
    console.log(`The minio bucket ${bucketName} has been created.`);
  }
  try {
    minioClient.putObject(
      bucketName,
      imageName+'.'+imageType,
      imageStream,
      `image/${imageType}`,
      function (e) {
        if (e) return console.log(e);
        console.log('Image uploaded correctly');
      }
    );
  } catch (error) {
    throw error;
  }
} 

exports.getImage = async (bucketName, imageName) => {
  const imageStream = new Promise((resolve, reject) => {
    let imageBufferArray = [];
    minioClient
      .getObject(bucketName, imageName)
      .then((imageStream) => {
        imageStream.on('error', (err) => {
          console.log(err);
          reject(err);
        });
        imageStream.on('data', (arrayBuffer) => {
          imageBufferArray.push(arrayBuffer);
        });
        imageStream.on('end', () => {
          resolve(imageBufferArray);
        });
      })
      .catch(reject);
  });
  return Buffer.concat(await imageStream);
}