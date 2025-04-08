// This file is used as an entry point for Vercel serverless functions
// It exports the Express server from the compiled NestJS application
module.exports = require('./dist/main').default; 