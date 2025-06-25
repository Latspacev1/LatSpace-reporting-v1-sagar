# Sagar Reporting Platform

A comprehensive reporting and compliance management platform built with React, TypeScript, and modern web technologies. This repository contains multiple modules for different reporting frameworks and compliance requirements.

## 🏗️ Project Structure

The codebase is organized into several modules, each serving specific reporting and compliance needs:

### 📊 Core Modules

#### 1. **CCTS Module** (`ccts-module/`)
- **CCTS Compliance Manager**: A React-based compliance management system
- Features dashboard, alerts, plant overview, and compliance cockpit
- Built with Vite, TypeScript, and Tailwind CSS
- Includes comprehensive UI components and data visualization

#### 2. **AVH Reporting** (`sagar-avh-reporting/`)
- Annual Value of Housing (AVH) reporting system
- Excel data processing and analysis capabilities
- JSON data management and reporting structure
- Interactive questionnaire and report generation

#### 3. **BRSR Reporting** (`sagar-brsr-reporting/`)
- Business Responsibility and Sustainability Reporting (BRSR) framework
- Comprehensive questionnaire system with supporting documentation
- Score calculation and report generation
- Form-based data collection and validation

#### 4. **CDP Reporting** (`sagar-cdp-reporting/`)
- Carbon Disclosure Project (CDP) reporting system
- Server-side processing with Node.js
- OpenAI integration for enhanced reporting capabilities
- Advanced questionnaire management and scoring

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-github-repo-url>
   cd sagar-reporting
   ```

2. **Install dependencies for each module**

   **CCTS Module:**
   ```bash
   cd ccts-module/ccts-compliance-manager
   npm install
   ```

   **AVH Reporting:**
   ```bash
   cd sagar-avh-reporting
   npm install
   ```

   **BRSR Reporting:**
   ```bash
   cd sagar-brsr-reporting/project-cdp
   npm install
   ```

   **CDP Reporting:**
   ```bash
   cd sagar-cdp-reporting
   npm install
   cd server
   npm install
   ```

### Running the Applications

#### CCTS Compliance Manager
```bash
cd ccts-module/ccts-compliance-manager
npm run dev
```

#### AVH Reporting
```bash
cd sagar-avh-reporting
npm run dev
```

#### BRSR Reporting
```bash
cd sagar-brsr-reporting/project-cdp
npm run dev
```

#### CDP Reporting
```bash
# Terminal 1 - Frontend
cd sagar-cdp-reporting
npm run dev

# Terminal 2 - Backend
cd sagar-cdp-reporting/server
npm run dev
```

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Custom UI Components** for consistent design

### Backend (CDP Module)
- **Node.js** with TypeScript
- **Express.js** framework
- **OpenAI API** integration

### Data Processing
- **Excel.js** for Excel file processing
- **JSON** data management
- **Custom data analysis scripts**

## 📁 Key Features

### Common Features Across Modules
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Reusable UI components
- **Form Management**: Advanced form handling with validation
- **Data Visualization**: Charts, heatmaps, and KPI cards
- **Modal System**: Dynamic modal components for user interactions
- **Layout Management**: Consistent header, sidebar, and main content areas

### Module-Specific Features

#### CCTS Module
- Dashboard with KPI metrics
- Plant overview and management
- Compliance alerts and notifications
- Data upload and processing
- Heat map visualizations

#### AVH Reporting
- Excel data import and processing
- Detailed data analysis
- JSON data export
- Report structure management

#### BRSR Reporting
- Comprehensive questionnaire system
- Supporting documentation upload
- Score calculation and display
- Report generation with PDF export

#### CDP Reporting
- AI-powered report generation
- Server-side data processing
- Advanced scoring algorithms
- Real-time data validation

## 🔧 Development

### Code Structure
Each module follows a consistent structure:
```
module-name/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── services/      # API services
│   └── data/          # Static data and mock data
├── public/            # Static assets
├── package.json       # Dependencies and scripts
└── README.md          # Module-specific documentation
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## 📊 Data Management

The platform handles various data formats:
- **Excel files** (.xlsx, .xls)
- **JSON data** for structured information
- **PDF reports** for final outputs
- **CSV exports** for data analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Note**: This is a comprehensive reporting platform designed for enterprise-level compliance and sustainability reporting. Each module can be developed and deployed independently while maintaining consistency in design and functionality. 