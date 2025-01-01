import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilemanageService } from './filemanage.service';
import { ResponseSuccessDto } from 'src/Response/ResponseSuccessDto';

@Controller('filemanage')
export class FilemanageController {
  constructor(private filemanageService: FilemanageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file upload');
    console.log(file);
    const generatedId = await this.filemanageService.saveFile(file);

    return new ResponseSuccessDto(201, 'Insert successfull', generatedId.id);
  }

  @Get(':id')
  async findFile(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    console.log('file download begin');

    const file = await this.filemanageService.getFile(id);
    console.log('File Buffer:', file.buffer);

    if (!file.buffer || file.buffer.length === 0) {
      res.status(404).send({ error: 'File not found' });
      return;
    }
    console.log('file download');

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // Disable caching
    res.setHeader('Pragma', 'no-cache'); // For HTTP/1.0 caches
    res.setHeader('Expires', '0'); // For HTTP/1.0 caches

    // res.set({
    //   'Content-Type': 'image/jpeg', // or 'image/png' depending on your file
    // });
    res.send(file.buffer);
  }
}
