import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InferenceDto } from './inference.dto';
import { InferenceService } from './inference.service';

@Controller('inference')
export class InferenceController {
  constructor(private readonly inferenceService: InferenceService) {}

  @Post('local')
  async inferLocalImage(@Body() inferenceDto: InferenceDto): Promise<any> {
    const { imageUrl, imageBase64, useTestImage } = inferenceDto;

    // If useTestImage is provided, use that for testing
    if (useTestImage) {
      return await this.inferenceService.inferLocalImage('', useTestImage);
    }

    // Check if at least one image source is provided
    if (!imageUrl && !imageBase64) {
      throw new HttpException(
        'No image URL or base64 data provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (imageUrl) {
      return await this.inferenceService.inferLocalImage(imageUrl);
    } else if (imageBase64) {
      return await this.inferenceService.inferLocalImage(imageBase64);
    }

    // This case should never happen due to the earlier validation
    throw new HttpException(
      'No image URL or base64 data provided',
      HttpStatus.BAD_REQUEST,
    );
  }
}