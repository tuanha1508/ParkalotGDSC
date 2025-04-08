// This is a Vercel Edge Middleware file
module.exports = (req, res, next) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://parkalot-gdsc.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Set permissive CSP header
  res.setHeader('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;");
  
  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }
  
  // Continue to next middleware
  next();
}; 