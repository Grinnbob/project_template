import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid'; // for generating random file-names

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg'; // generate random file-name
      const filePath = path.resolve(__dirname, '..', 'static');

      // !! use ASYNC instead of SYNC
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(fileName, { recursive: true }); // recursive = create all unexists folders
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return fileName;
    } catch (e) {
      throw new HttpException(
        'Error during createFile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
