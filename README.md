# TeeLuxe

<p align="center">
  <img src="public/logo/tee-luxe.png" alt="TeeLuxe Logo" width="200">
</p>

<p align="center">
  Modern E-Commerce Platform Built with React
  <br>
  <em>Web Development Project</em>
</p>

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Team Roles and Responsibilities](#team-roles-and-responsibilities)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## About

TeeLuxe is a modern React-based clothing e-commerce platform showcasing contemporary web development practices and responsive design principles. This project demonstrates the implementation of a complete fashion shopping experience using modern JavaScript frameworks and best development practices.

The platform provides a full-featured online shopping experience specializing in fashion apparel, from product discovery through checkout, featuring dynamic product catalogs, shopping cart management, and secure purchase flows.

## Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with breakpoints for tablets and desktops
- **Product Catalog**: Dynamic product listing with search, filtering, and categorization
- **Product Details**: Detailed view with image galleries and specifications
- **Shopping Cart**: Persistent cart with quantity management
- **Checkout Flow**: Multi-step checkout with validation and order confirmation
- **User Authentication**: Login and signup pages with form validation

### User Experience
- **Intuitive Navigation**: Clean, modern navbar with search functionality
- **Search & Filter**: Find products quickly with advanced filtering options
- **Smooth Interactions**: Responsive design with hover effects and transitions
- **Order Management**: Comprehensive checkout process with order summary

### Technical Features
- **Modern React**: Hooks-based components with functional programming patterns
- **Client-side Routing**: Fast navigation using React Router
- **State Management**: Efficient local state handling with React hooks
- **Form Validation**: Real-time validation with user-friendly error messages
- **Component Architecture**: Modular, reusable React components
- **Container Support**: Docker setup for development and production environments

## Technology Stack

### Frontend Framework
- **React 18** - Modern component-based UI library
- **React Router DOM** - Declarative routing for React
- **React Bootstrap** - Bootstrap components for React

### Styling & UI
- **Bootstrap 5** - Responsive CSS framework
- **Font Awesome** - Icon library
- **Inter Font** - Modern typography

### Development & Build
- **Create React App** - Build toolchain and development server
- **Docker & Docker Compose** - Containerization for development and production

### Language & Runtime
- **JavaScript (ES6+)** - Primary development language
- **Node.js** - Runtime environment
- **npm** - Package management

## Team Roles and Responsibilities

| Member | Role / Focus Area | Main Responsibilities | Suggested Deliverables / Git Branch |
|:--------|:------------------|:----------------------|:------------------------------------|
| **Chan** | **UI/UX Designer** | - Design wireframes/mockups for all main pages. <br> - Decide color scheme, typography, and layout. <br> - Prepare responsive layout guidelines. <br> - Document design rationale. | **Branch:** `ui-design` <br> **Folder:** `/designs/` (include Figma links or images) |
| **Castillo** | **Home & Navigation Developer** | - Implement Home Page and Navigation Bar using React. <br> - Ensure navigation routes work using React Router. <br> - Apply design guidelines from Member 1. | **Branch:** `home-navbar` <br> **Components:** `Navbar.js`, `HomePage.js` |
| **Cayaco** | **Product & Catalog Developer** | - Implement Product Listing and Product Details pages. <br> - Create reusable components (e.g., ProductCard). <br> - Integrate sample product data (JSON). | **Branch:** `product-pages` <br> **Components:** `ProductList.js`, `ProductDetails.js` |
| **De Martin** | **Cart & Checkout Developer** | - Create Cart and Checkout UI pages. <br> - Handle basic state updates (e.g., item count, total). <br> - Use React hooks for interactivity. | **Branch:** `cart-checkout` <br> **Components:** `Cart.js`, `Checkout.js` |
| **Cayaga** | **Style & Integration Manager** | - Unify CSS/Styling (CSS Modules or Styled Components). <br> - Ensure consistent look and responsiveness. <br> - Merge all branches and resolve conflicts. <br> - Deploy or run final testing. | **Branch:** `integration-style` <br> **Files:** `App.js`, `index.css`, merged commits |



## Installation

### Option 1: Standard Development Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd tee-luxe-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Access the application:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser

### Option 2: Docker Development Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd tee-luxe-frontend
   ```

2. **Start Docker development environment:**
   ```powershell
   # Windows PowerShell
   .\start-dev.ps1
   ```
   or
   ```bash
   # Manual Docker command
   docker-compose up -d
   ```

3. **Access the application:**
   - Development: [http://localhost:3000](http://localhost:3000)

## Usage

### Navigation
- **Home (/)**: Landing page with featured content
- **Products (/products)**: Browse and search products by category
- **Product Details (/product/:id)**: View detailed product information
- **Cart (/cart)**: Review and modify shopping cart contents
- **Checkout (/checkout)**: Complete purchase with shipping and payment
- **Authentication (/login, /signup)**: User account management

### Key Features
- **Search**: Use the search bar in the navigation to find products
- **Filter by Category**: Click "Men" or "Women" in navigation for category filtering
- **Add to Cart**: Click "Add to Cart" buttons on product cards
- **Quantity Management**: Adjust quantities in product details and cart
- **Responsive Design**: Optimized experience on mobile, tablet, and desktop

## Project Structure

```
tee-luxe-frontend/
├── public/
│   ├── index.html          # Main HTML template
│   └── logo/
│       └── tee-luxe.png    # Brand logo
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.js       # Main navigation component
│   │   ├── Footer.js       # Site footer
│   │   └── ProductCard.js  # Product display card
│   ├── pages/             # Page components (routes)
│   │   ├── Home.js        # Home page
│   │   ├── Login.js       # Authentication pages
│   │   ├── Signup.js
│   │   ├── ProductList.js # Product catalog
│   │   ├── ProductDetails.js # Individual product view
│   │   ├── Cart.js        # Shopping cart
│   │   └── Checkout.js    # Purchase flow
│   ├── data/              # Static data files
│   │   └── products.json  # Product catalog data
│   ├── App.js             # Root component and routing
│   ├── App.css            # Global styles
│   └── index.js           # Application entry point
├── Dockerfile             # Production container configuration
├── docker-compose.yml     # Development container setup
├── docker-compose.prod.yml # Production container setup
├── nginx.conf            # Web server configuration
├── start-dev.ps1         # Development startup script
├── start-prod.ps1        # Production startup script
├── package.json          # Dependencies and scripts
├── .gitignore            # Git ignore rules
└── README.md             # This documentation
```

## Development

### Component Architecture

The application follows modern React development patterns:

- **Functional Components**: All components use hooks and functional patterns
- **Component Composition**: Modular design with reusable smaller components
- **Props Management**: Clean data flow with well-defined prop interfaces
- **State Management**: Efficient use of React hooks for local state

### Styling Approach

- **Bootstrap Integration**: Consistent design system with custom extensions
- **Responsive Design**: Mobile-first approach with flexible grid layouts
- **Interactive Elements**: Hover states and smooth transitions throughout
- **Brand Consistency**: Unified color scheme and typography using Inter font

### Code Quality

The project maintains high code standards with:
- **ESLint**: Automated code quality checks
- **Prettier**: Consistent code formatting
- **Component Testing**: Jest framework for unit testing
- **Clean Imports**: Organized and minimal dependency management

## Deployment

### Docker Production Deployment

1. **Build and start production environment:**
   ```powershell
   .\start-prod.ps1
   ```
   or
   ```bash
   docker-compose -f docker-compose.prod.yml up -d --build
   ```

2. **Access production deployment:**
   - Production URL: [http://localhost:8080](http://localhost:8080)

### Manual Production Build

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Serve the built files:**
   ```bash
   npx serve -s build -l 8080
   ```

## Contributing

### Development Workflow

1. **Branch Strategy:**
   - Create feature branches from `main`
   - Use descriptive branch names (e.g., `feature/product-filtering`)
   - Follow team branch naming conventions

2. **Code Standards:**
   - Use ES6+ syntax and React best practices
   - Follow consistent naming conventions
   - Write meaningful commit messages
   - Include descriptive comments for complex logic

3. **Pull Request Process:**
   - Create pull request with clear description
   - Reference related issues or user stories
   - Include screenshots for UI changes
   - Request review from team members

### Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## License

This project is developed as part of CCS112 course requirements.
All rights reserved to the development team and educational institution.

---

**CCS112 Midterm Case Study** | Team Project
