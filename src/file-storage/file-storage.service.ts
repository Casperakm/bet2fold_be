import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileStroageEntity } from "./model/file-storage.entity";
import { Repository } from "typeorm";
import { Observable, from } from "rxjs";
import { CreateFileDto } from "./model/file-storage.dto";
import { SuccessAPI } from "src/shared/util/success-api";

@Injectable()
export class FileStorageService {
    constructor(
        @InjectRepository(FileStroageEntity)
        private readonly typeRepository: Repository<FileStroageEntity>,
    ) { }

    findAll(): Observable<FileStroageEntity[]> {
        return from(this.typeRepository.find());
    }

    async create(fileObj: Express.Multer.File, user_id: number): Promise<FileStroageEntity> {
        const newFile = new FileStroageEntity()
        newFile.file_name = fileObj.filename
        newFile.url = fileObj.path
        newFile.type = fileObj.mimetype
        newFile.file_size = fileObj.size
        newFile.user_id = user_id
        return this.typeRepository.save(newFile);
    }

    async delete(id: number) {
        try {
            let data = await this.typeRepository.findOneBy({ id });
            await this.typeRepository.softRemove(data);
            let suc = new SuccessAPI()
            return { ...suc, id: id }
        } catch (error) {
            throw new BadRequestException('Product Type Data is Wrong');
        }
    }

    getFileData(fileId: number) {
        return from(this.typeRepository.findOneByOrFail({ id: fileId }))
    }

}