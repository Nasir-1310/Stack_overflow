const Minio = require('minio');

// // Log the environment variables to verify they're loaded correctly
// console.log("MinIO Configuration:");
// console.log("MINIO_ENDPOINT:", process.env.MINIO_ENDPOINT);
// console.log("MINIO_PORT:", process.env.MINIO_PORT);
// console.log("MINIO_ACCESS_KEY:", process.env.MINIO_ACCESS_KEY);
// console.log("MINIO_SECRET_KEY:", process.env.MINIO_SECRET_KEY);
// console.log("MINIO_BUCKET_NAME:", process.env.MINIO_BUCKET_NAME);

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT, 10), // Convert port to number
  useSSL: false, // Change to true if using HTTPS
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME;

// Immediately invoked function to check and create bucket if it doesn't exist
(async () => {
  try {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (exists) {
      console.log(`Bucket "${BUCKET_NAME}" already exists.`);
    } else {
      await minioClient.makeBucket(BUCKET_NAME, 'us-east-1'); // Specify the region if needed
      console.log(`Bucket "${BUCKET_NAME}" created successfully.`);
    }
  } catch (error) {
    console.error('Error with MinIO bucket operation:', error);
  }
})();

module.exports = { minioClient, BUCKET_NAME };
