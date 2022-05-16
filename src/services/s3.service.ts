import { S3 } from 'aws-sdk';

export const createS3Client = (): S3 => {
  return new S3({
    region: 'eu-central-1',
    accessKeyId: process.env.AWS_S3_BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_BUCKET_SECRET_KEY,
    signatureVersion: 'v4',
  });
};

export const uploadRaceResults = async (key: string, body: any) => {
  const bucketName = getRaceResultsBucketName();
  const client = createS3Client();

  await client
    .putObject({
      Bucket: bucketName,
      Key: key,
      Body: body,
    })
    .promise();
};

export const loadListOfRaceResultKeys = async (): Promise<string[]> => {
  const bucketName = getRaceResultsBucketName();
  const client = createS3Client();

  const result = await client
    .listObjects({
      Bucket: bucketName,
    })
    .promise();

  const keys = result.Contents?.map(object => object.Key).filter(
    key => !!key
  ) as string[];

  return keys || [];
};

export const loadRaceResultYaml = async (
  key: string
): Promise<string | null> => {
  const bucketName = getRaceResultsBucketName();
  const client = createS3Client();

  const result = await client
    .getObject({
      Bucket: bucketName,
      Key: key,
    })
    .promise();

  return result.Body?.toString() || null;
};

const getRaceResultsBucketName = () => {
  if (!process.env.AWS_S3_BUCKET_NAME) {
    throw Error('AWS_S3_BUCKET_NAME variable not configured');
  }

  return process.env.AWS_S3_BUCKET_NAME;
};
