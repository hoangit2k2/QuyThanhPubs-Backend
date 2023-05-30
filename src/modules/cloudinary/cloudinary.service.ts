import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    //check size file
    if (file.size > 10000000000) {
      throw new HttpException(
        'please upload a file size not more than 1000000',
        HttpStatus.BAD_REQUEST,
      );
    }
    //check if the file is an image
    if (!file.mimetype.startsWith('image')) {
      throw new HttpException(
        'please upload a file size not more than 1000000',
        HttpStatus.BAD_REQUEST,
      );
    }
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}
