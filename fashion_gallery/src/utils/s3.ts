import { S3Client,PutObjectCommand} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

interface MulterFile {
  originalname: string;
  buffer: Buffer;
  mimetype: string;
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadImageToS3 = async (file: MulterFile) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  try {
    const upload = new Upload({
      client: s3Client,
      params,
    });

    const data = await upload.done();
    return data.Location; // Return the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    throw new Error('Error uploading image to S3');
  }
};