import * as fs from 'fs';
import path from 'path'; // Node.js path module

/**
 * Read and parse a JSON file safely
 * @param filePath - Relative or absolute path to the JSON file
 * @returns Parsed JSON object or empty array on error
 */
export function parseJSON(filePath: string) {
  try {
    // Resolve the file path to an absolute path
    const fullPath = path.resolve(filePath);

    // Read the file contents as a UTF-8 string
    const data = fs.readFileSync(fullPath, 'utf8');

    // Parse the string into a JSON object and return it
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(data);
  } catch (error) {
    // Log any errors reading or parsing the file
    console.error('Error reading or parsing JSON file:', error);

    // Return empty array as fallback
    return [];
  }
}