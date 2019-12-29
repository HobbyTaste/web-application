import AWS, {S3, AWSError} from 'aws-sdk';
import config from 'config';
import fileUpload from 'express-fileupload';
import uuid from 'uuid/v4';

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || config.get('secrets.aws.AWS_ACCESS_KEY_ID');
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || config.get('secrets.aws.AWS_SECRET_ACCESS_KEY');
const region: string = config.get('aws.region');
const endpointUrl = config.get('aws.endpoint');

export async function uploadFileToS3(relativePath: string, file: fileUpload.UploadedFile) {
    // получаем размер файла в Мб
    const maxSize = Number(config.get('aws.maxFileSize'));
    const fileSize = file.size / (1024 * 1024);
    if (fileSize > maxSize) {
        throw new Error(`Размер файла не должен превышать ${maxSize} `);
    }
    const fileId = uuid();
    const path = `${relativePath}/${fileId}`;
    const bucket: string = config.get('aws.bucket');
    const params: S3.Types.PutObjectRequest = {
        Bucket: bucket,
        Body: file.data,
        Key: path,
        ContentType: file.mimetype,
    };
    const endpointUrl: string = config.get('aws.endpoint');
    const uri = `${endpointUrl}/${bucket}/${path}`;

    const s3 = new AWS.S3({
        endpoint: endpointUrl
    });
    return new Promise((resolve, reject) => {
        s3.putObject(params, (err: AWSError, data: S3.PutObjectOutput) => {
            if (err) reject(err);
            resolve(uri);
        })
    });
}

export default AWS;
