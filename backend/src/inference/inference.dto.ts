// src/inference/inference.dto.ts
export class InferenceDto {
  imageUrl?: string;
  imageBase64?: string;
  useTestImage?: string; // Name of test image to use
}

export class LocalInferenceDto {
  imageFileName: string;
}
