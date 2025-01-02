import { Injectable } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class UploadsService {
  public async uploadFile(file: Express) {
    return file;
  }
}
