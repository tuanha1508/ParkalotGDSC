"Creating an informational file about where to place the PDF" 

PARKING MAP PDF PLACEMENT INSTRUCTIONS

1. Create a PDF file named "parking-map.pdf" with your campus parking map 
   or obtain an existing parking map PDF from your campus resources.

2. Place the PDF file directly in this directory (frontend/public/).
   The full path should be: frontend/public/parking-map.pdf

3. The PDF will be automatically accessible at the URL path:
   /parking-map.pdf

4. No additional configuration is needed as Nuxt.js automatically serves 
   all files in the public directory at the root URL.

5. The "View Parking Map" button on the Park page is already configured
   to open this PDF file in a new browser tab.

Note: If your PDF has a different filename, update the viewParkingMap() function 
in frontend/pages/park.vue to match your filename. 
