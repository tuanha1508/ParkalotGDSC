// src/inference/inference.helper.ts
export interface Prediction {
  width: number;
  height: number;
  x: number;
  y: number;
  confidence: number;
  class_id: number;
  class: string;
  detection_id: string;
  parent_id: string;
}

export interface ModelPredictions {
  image: {
    width: number;
    height: number;
  };
  predictions: Prediction[];
}

export interface ModelOutputItem {
  model_1_predictions: ModelPredictions;
  model1_visualization: string;
}

/**
 * Count available spaces where class_id === 1.
 * Handles both complex ModelOutputItem[] format and simple {predictions: Prediction[]} format.
 */
export function countAvailableSpaces(modelOutput: any): number {
  // If the input is null or undefined, return 0
  if (!modelOutput) return 0;

  // Handle the simple format from Roboflow API: {predictions: Prediction[]}
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (modelOutput.predictions && Array.isArray(modelOutput.predictions)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return modelOutput.predictions.filter(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (pred) => pred.class_id === 1 || pred.class === 'free',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ).length;
  }

  // Handle the complex format: ModelOutputItem[]
  if (Array.isArray(modelOutput)) {
    let availableCount = 0;
    modelOutput.forEach((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const predictions = item.model_1_predictions?.predictions;
      if (Array.isArray(predictions)) {
        predictions.forEach((pred) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (pred.class_id === 1 || pred.class === 'free') {
            availableCount++;
          }
        });
      }
    });
    return availableCount;
  }

  // If the format doesn't match any expected structure, return 0
  return 0;
}
