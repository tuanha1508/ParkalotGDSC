// import { Injectable } from '@nestjs/common';
// import fetch from 'node-fetch';
// import WebSocket from 'ws';
// import { ConfigService } from '@nestjs/config';
// import { Logger } from '@nestjs/common';
// import * as dotenv from 'dotenv';
//
// dotenv.config();
//
// @Injectable()
// export class ChatbotService {
//     private readonly OPENAI_API_KEY: string;
//     private readonly WEBHOOK_URL: string;
//     private readonly logger = new Logger(ChatbotService.name);
//
//     constructor(private configService: ConfigService) {
//         // Retrieve environment variables using ConfigService for best practices in NestJS
//         this.OPENAI_API_KEY = process.env.OPENAI_API_KEY;
//         this.WEBHOOK_URL = process.env.WEBHOOK_URL || "<input your webhook URL here>";
//
//         if (!this.OPENAI_API_KEY) {
//             this.logger.error('Missing OpenAI API key. Please set it in the .env file.');
//             process.exit(1);
//         }
//     }
//
//     // Method to handle the completion call with the OpenAI API
//     async makeChatGPTCompletion(transcript: string) {
//         this.logger.log('Starting ChatGPT API call...');
//         try {
//             const response = await fetch('https://api.openai.com/v1/chat/completions', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     model: "gpt-4o-2024-08-06",
//                     messages: [
//                         { "role": "system", "content": "Extract customer details: name, availability, and any special notes from the transcript." },
//                         { "role": "user", "content": transcript }
//                     ],
//                     response_format: {
//                         "type": "json_schema",
//                         "json_schema": {
//                             "name": "customer_details_extraction",
//                             "schema": {
//                                 "type": "object",
//                                 "properties": {
//                                     "customerName": { "type": "string" },
//                                     "customerAvailability": { "type": "string" },
//                                     "specialNotes": { "type": "string" }
//                                 },
//                                 "required": ["customerName", "customerAvailability", "specialNotes"]
//                             }
//                         }
//                     }
//                 })
//             });
//
//             this.logger.log('ChatGPT API response status:', response.status);
//             const data = await response.json();
//             this.logger.log('Full ChatGPT API response:', JSON.stringify(data, null, 2));
//             return data;
//         } catch (error) {
//             this.logger.error('Error making ChatGPT completion call:', error);
//             throw error;
//         }
//     }
//
//     // Method to send data to the Make.com webhook
//     async sendToWebhook(payload: any) {
//         this.logger.log('Sending data to webhook:', JSON.stringify(payload, null, 2));
//         try {
//             const response = await fetch(this.WEBHOOK_URL, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(payload)
//             });
//
//             this.logger.log('Webhook response status:', response.status);
//             if (response.ok) {
//                 this.logger.log('Data successfully sent to webhook.');
//             } else {
//                 this.logger.error('Failed to send data to webhook:', response.statusText);
//             }
//         } catch (error) {
//             this.logger.error('Error sending data to webhook:', error);
//         }
//     }
//
//     // Main method to process transcript and send extracted customer details
//     async processTranscriptAndSend(transcript: string, sessionId: string | null = null) {
//         this.logger.log(`Starting transcript processing for session ${sessionId}...`);
//         try {
//             // Make the ChatGPT completion call
//             const result = await this.makeChatGPTCompletion(transcript);
//
//             this.logger.log('Raw result from ChatGPT:', JSON.stringify(result, null, 2));
//
//             if (result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content) {
//                 try {
//                     const parsedContent = JSON.parse(result.choices[0].message.content);
//                     this.logger.log('Parsed content:', JSON.stringify(parsedContent, null, 2));
//
//                     if (parsedContent) {
//                         // Send the parsed content directly to the webhook
//                         await this.sendToWebhook(parsedContent);
//                         this.logger.log('Extracted and sent customer details:', parsedContent);
//                     } else {
//                         this.logger.error('Unexpected JSON structure in ChatGPT response');
//                     }
//                 } catch (parseError) {
//                     this.logger.error('Error parsing JSON from ChatGPT response:', parseError);
//                 }
//             } else {
//                 this.logger.error('Unexpected response structure from ChatGPT API');
//             }
//
//         } catch (error) {
//             this.logger.error('Error in processTranscriptAndSend:', error);
//         }
//     }
//
//     // WebSocket for media-stream to communicate with Twilio
//     handleWebSocketSession(connection: WebSocket, sessionId: string) {
//         // WebSocket logic remains as-is from your original code, adjusted to fit in the service context
//     }
// }