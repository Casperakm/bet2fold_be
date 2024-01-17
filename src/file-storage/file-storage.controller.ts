import { Controller, Get, Param, ParseIntPipe, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiConsumes, ApiOkResponse, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { diskStorage } from "fastify-multer";
import { CustomDiskStorage, FastifyFileInterceptor } from "src/shared/decorators/fastify-file-interceptor";
import { editFileName, imageFileFilter } from "src/shared/util/create file-upload-util";
import { FileStorageService } from "./file-storage.service";
import { UserData } from "src/shared/decorators/users.decorator";
import { map } from "rxjs";
import { JwtAuthGuard } from "src/shared/auth/guard/jwt-auth.guard";
const uploadDestination = './attachment';
@Controller('attachs')
@ApiTags('Attachs')
export class AttachmentController {
    constructor(
        private readonly _fileStorage: FileStorageService
    ) { }

    @Post('')
    @UseInterceptors(
        FastifyFileInterceptor('attachment', {
            storage: new CustomDiskStorage('attachment'),
            fileFilter: imageFileFilter,
        }),
    )
    @ApiResponse({ status: 201 })
    @ApiBadRequestResponse({ description: "Bad Request" })
    @UseGuards(JwtAuthGuard)
    @ApiConsumes('multipart/form-data')
    create(@UploadedFile() file: Express.Multer.File, @UserData('id') userId: number) {
        return this._fileStorage.create(file, userId)
        return { filename: file.filename };
    }


    @Get(":image_id")
    @ApiOkResponse()
    @ApiBadRequestResponse({ description: "Bad Request" })
    @ApiParam({ name: 'image_id', type: Number, required: true })
    seeUploadedFile(@Param('image_id', ParseIntPipe) fileId: number, @Res() res) {
        return this._fileStorage.getFileData(fileId).pipe(map((fileObj) => {
            return res.sendFile(fileObj.file_name, { root: uploadDestination });
        }))
        // return res.sendFile(imgUrl + "/" + image_name, { root: './upload' });
    }
}