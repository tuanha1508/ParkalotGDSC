# ParkTrack - School Parking Management System

A modern parking tracking system for schools built with Nuxt 3, Vue 3, and Tailwind CSS. This frontend application allows you to track vehicles, monitor parking slot availability, and manage license plate information.

## Features

- **Vehicle Tracking**: Monitor cars entering and exiting the parking area
- **Parking Slot Management**: Track available and occupied parking slots
- **License Plate Recognition**: Record and track vehicle license plates
- **User Authentication**: Secure login/logout functionality
- **Dashboard**: Real-time statistics and parking status
- **Dark Theme**: Modern black background with beautiful UI

## Tech Stack

- **Nuxt 3**: Vue framework for building the application
- **Vue 3**: Progressive JavaScript framework
- **TypeScript**: For type-safe code
- **Pinia**: State management
- **Tailwind CSS**: Utility-first CSS framework
- **Nuxt UI**: UI component library

## Project Structure

```
nuxt-project-2025/
├── .nuxt/                     # Nuxt build directory
├── output/                    # Output when build (Nuxt 3+)
├── assets/                    # Unprocessed assets (SCSS, images, fonts)
│   ├── scss/                  # SCSS/SASS global
│   ├── images/                # Images
│   └── fonts/                 # Font files
├── components/                # Components global
│   ├── ui/                    # UI components (Button, Card, Modal...)
│   ├── layout/                # Layout components
│   └── shared/                # Shared components between pages
├── composables/               # Composable functions (Nuxt 3)
├── content/                   # Nuxt Content module (if used)
├── layouts/                   # Layout templates
├── middleware/                # Route middleware
├── modules/                   # Custom Nuxt modules
├── pages/                     # Pages and routing
│   └── _slug/                 # Dynamic routes
├── plugins/                   # Plugins Nuxt
├── public/                    # Static files (robots.txt, favicon)
├── server/                    # Server handlers, API routes
│   ├── api/                   # API endpoints
│   ├── middleware/            # Server middleware
│   └── utils/                 # Server utilities
├── stores/                    # Pinia stores (state management)
├── utils/                     # Utility functions/helpers
├── app.config.ts              # App configuration
├── app.vue                    # Main app component (Nuxt 3)
├── nuxt.config.ts             # Nuxt configuration file
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript config
└── README.md                  # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/park-tracking-system.git
cd park-tracking-system
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Development Notes

This is a frontend-only application with mocked data for demonstration purposes. The backend implementation is not covered in this repository.

### Demo Accounts

For testing purposes, you can use these accounts:

- **Admin**: admin@example.com / password
- **User**: user@example.com / password

## Building for Production

```bash
npm run build
# or
yarn build
```

## License

MIT 