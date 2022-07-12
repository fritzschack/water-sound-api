import {GetObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3"
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import fs from "fs"

// Setup S3 client
const s3Client = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION
})

// Upload a file to S3
export async function uploadFile(file) {
  const fileStream = fs.createReadStream("./uploads/" + file.name)

  return await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Body: fileStream,
      Key: file.name
    })
  )
}

// Get presigned URL to download file from S3
export function getPresignedUrlForFile(key) {
  console.log(key)
  return getSignedUrl(
    s3Client,
    new GetObjectCommand({ Bucket: process.env.AWS_S3_BUCKET_NAME, Key: key }),
    { expiresIn: 3600 }
  ).then((result) => result)
}

// Delete a file from S3