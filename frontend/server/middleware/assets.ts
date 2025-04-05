import { defineEventHandler, createError } from 'h3'
import { readFile } from 'fs/promises'
import { resolve, join } from 'path'

export default defineEventHandler(async (event) => {
  const url = event.node.req.url
  
  // Check if we're requesting a JSON file from the assets directory
  if (url && url.startsWith('/assets/') && url.endsWith('.json')) {
    try {
      // Resolve the path relative to the project root
      const path = resolve(process.cwd(), 'frontend', url.replace('/assets/', 'assets/'))
      const content = await readFile(path, 'utf-8')
      
      // Set appropriate headers
      event.node.res.setHeader('Content-Type', 'application/json')
      
      // Return the content
      return content
    } catch (error) {
      console.error(`Error serving asset from ${url}:`, error)
      throw createError({
        statusCode: 404,
        statusMessage: 'Asset not found'
      })
    }
  }
}) 