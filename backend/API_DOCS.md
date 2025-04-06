# Parkalot Backend API Documentation

## API Endpoints

### Distance Calculation

#### GET /route
Calculates the route distance and duration between two points using Google's Distance Matrix API.

**Parameters:**
- `originLat` (required): Latitude of the origin point
- `originLng` (required): Longitude of the origin point
- `destLat` (required): Latitude of the destination point 
- `destLng` (required): Longitude of the destination point
- `mode` (optional): Travel mode, one of 'walking', 'driving', 'bicycling', 'transit'. Default is 'driving'.

**Response:**
```json
{
  "distance": {
    "text": "5.4 km",
    "value": 5400
  },
  "duration": {
    "text": "12 mins",
    "value": 720
  },
  "status": "OK"
}
```

**Note:** This endpoint now uses Google's Distance Matrix API instead of the Directions API for more accurate distance and time calculations that account for real-world routing.

### Geocoding

#### GET /geocode
Converts an address to geographic coordinates (latitude and longitude).

**Parameters:**
- `address` (required): The address to geocode

**Response:**
```json
{
  "lat": 28.0587,
  "lng": -82.4139
}
```

### Places

#### GET /places/autocomplete
Provides place suggestions based on user input.

**Parameters:**
- `input` (required): User input for place search

#### GET /places/details
Retrieves detailed information about a specific place.

**Parameters:**
- `place_id` (required): The Google Places API place_id

### Parking Information

#### GET /get_avail
Gets available parking based on destination and permit type.

**Parameters:**
- `destination` (required): Destination address
- `permit` (required): Permit type 