import { Module } from '@nestjs/common';
import { AttachmentController } from './file-storage.controller';

@Module({
    controllers: [AttachmentController]
})
export class FileStorageModule { }
