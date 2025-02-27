# Pokemon Explorer

A responsive and visually appealing web application built with Next.js and Tailwind CSS that allows users to explore Pokémon data from the PokeAPI.

## Features

- **Home Page**: Displays a list of Pokémon with pagination
- **Search Functionality**: Filter Pokémon by name in real-time
- **Detail Page**: View detailed information about a selected Pokémon including:
  - Official artwork
  - Stats
  - Abilities
  - Moves
  - Types
  - Physical characteristics
- **Responsive Design**: Optimized for all device sizes
- **Performance Optimized**: 
  - Implements Next.js caching strategies
  - Optimized image loading with priority management
  - Proper hydration handling
  - Efficient error boundaries
  - Progressive loading states

## Tech Stack

- **Next.js 14**: React framework for the frontend with App Router
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first CSS framework for styling
- **PokeAPI**: Data source for Pokémon information

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pokemon-explorer.git
   cd pokemon-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following content:
   ```
   NEXT_PUBLIC_API_URL=https://pokeapi.co/api/v2
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_ENABLE_IMAGE_OPTIMIZATION=true
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Build for Production

```bash
npm run build
# or
yarn build
```

## Deployment

This application can be easily deployed to Vercel:

```bash
npm install -g vercel
vercel
```

## Features In Detail

### 1. Homepage
- Responsive grid layout adapting to different screen sizes
- Pagination for navigating through the Pokémon list
- Real-time search filtering
- Smooth transitions and hover effects

### 2. Detail Page
- Tabbed interface for organizing Pokémon information
- Dynamic type-based theming
- Responsive layout for mobile and desktop
- Properly formatted stats with visual indicators

### 3. Performance Optimizations
- Next.js image optimization with the Image component
- Data caching strategies
- Code splitting and lazy loading
- Server-side rendering where appropriate

## Folder Structure

```
pokemon-explorer/
├── public/              # Static files
├── src/
│   ├── app/             # App router files
│   │   ├── page.tsx     # Homepage
│   │   ├── loading.tsx  # Loading UI
│   │   ├── error.tsx    # Error handling
│   │   └── pokemon/     # Pokemon detail pages
│   ├── components/      # React components
│   ├── services/        # API services
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── .env.local           # Environment variables
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## API Integration

The application integrates with the [PokeAPI](https://pokeapi.co/) to fetch Pokémon data. The main endpoints used are:

- `/pokemon`: Get a list of Pokémon
- `/pokemon/{id}`: Get details for a specific Pokémon

## License

This project is licensed under the MIT License.