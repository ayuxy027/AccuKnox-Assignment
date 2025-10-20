# Dynamic Dashboard System

A sophisticated, production-ready dynamic dashboard application built with React, TypeScript, and modern state management. This project demonstrates advanced frontend development practices with a focus on user experience, performance, and maintainability.

## 🚀 Features

### Core Functionality
- **Dynamic Widget Management**: Add, remove, and customize widgets in real-time
- **Advanced Search**: Global search across all widgets with instant filtering
- **Personalization Panel**: Intuitive interface for dashboard customization
- **Visual Analytics**: Interactive charts and graphs using Recharts
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Technical Features
- **Type-Safe JSON Schema**: Strictly enforced configuration structure
- **State Persistence**: Dashboard state saved across browser sessions
- **Ambient UI Design**: Professional muted color palette with consistent branding
- **Performance Optimized**: Efficient rendering with minimal re-renders
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠 Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: Zustand with persistence middleware
- **Styling**: Custom CSS with CSS variables for theming
- **Charts**: Recharts for interactive data visualization
- **Icons**: Lucide React for consistent iconography
- **Package Manager**: Bun for fast dependency management

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- [Bun](https://bun.sh/) (latest version)
- Node.js 18+ (if not using Bun)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dynamic-dashboard
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Start Development Server

```bash
bun dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
bun run build
```

### 5. Preview Production Build

```bash
bun run preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Widget.tsx       # Individual widget component
│   ├── CategorySection.tsx  # Category container
│   ├── DashboardHeader.tsx  # Main header with search
│   ├── PersonalizationPanel.tsx  # Widget management panel
│   └── ChartWidget.tsx  # Chart visualization component
├── data/                # Static data and configurations
│   └── dashboardConfig.json  # Initial dashboard schema
├── store/               # State management
│   └── dashboardStore.ts     # Zustand store configuration
├── styles/              # Styling
│   └── globals.css      # Global styles and theme
├── types/               # TypeScript type definitions
│   └── dashboard.ts     # Dashboard-related types
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🎨 Design System

### Color Palette
The application uses a carefully crafted ambient muted color palette:

- **Primary**: Slate grays for backgrounds and text
- **Accent**: Blue tones for interactive elements
- **Status**: Semantic colors for different states (success, warning, error)
- **Neutral**: Consistent grays for borders and subtle elements

### Typography
- **Font Family**: System fonts for optimal performance
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Line Height**: 1.6 for optimal readability

## 🔧 Configuration

### JSON Schema Structure

The dashboard configuration follows a strict JSON schema:

```json
{
  "dashboard_configuration": [
    {
      "category_id": "unique-category-id",
      "category_name": "Category Display Name",
      "widgets": [
        {
          "widget_id": "unique-widget-id",
          "widget_name": "Widget Display Name",
          "widget_content": "Widget content and data",
          "is_removable": true,
          "is_searchable": true,
          "creation_timestamp": "2025-01-20T09:47:00Z"
        }
      ]
    }
  ]
}
```

### Environment Variables

No environment variables are required for basic functionality. The application uses localStorage for persistence.

## 🧪 Development

### Available Scripts

- `bun dev` - Start development server with hot reload
- `bun build` - Build production bundle
- `bun preview` - Preview production build
- `bun run lint` - Run ESLint for code quality

### Code Quality

The project follows strict coding standards:

- **TypeScript**: Full type safety with strict mode
- **ESLint**: Code linting with React-specific rules
- **Prettier**: Consistent code formatting
- **Component Architecture**: Modular, reusable components

## 🚀 Deployment

### Static Hosting

The application builds to static files that can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3**: Upload the `dist` folder to an S3 bucket

### Environment Considerations

- No server-side rendering required
- Client-side routing with React Router (if needed)
- Static asset optimization included in build

## 🔍 Features Deep Dive

### Dynamic Widget Operations

#### Adding Widgets
1. Click the "Add Widget" button in the header
2. Use the personalization panel to select existing widgets or create custom ones
3. Custom widgets require: name, content, and category selection
4. Widgets are immediately added to the dashboard

#### Removing Widgets
1. Hover over any removable widget to see the X button
2. Click the X button to remove the widget
3. Use the personalization panel for bulk removal operations

#### Search Functionality
- Real-time search across all widget names
- Case-insensitive matching
- Instant filtering with no loading states
- Categories without matching widgets are hidden

### State Management

The application uses Zustand for state management with the following features:

- **Persistence**: Dashboard state saved to localStorage
- **Immutability**: State updates use immutable patterns
- **Performance**: Selective subscriptions prevent unnecessary re-renders
- **Type Safety**: Full TypeScript integration

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all dependencies are installed with `bun install`
2. **Type Errors**: Check TypeScript configuration and type definitions
3. **Styling Issues**: Verify CSS variables are properly defined
4. **State Issues**: Clear localStorage if experiencing state corruption

### Performance Optimization

- Widget rendering is optimized with React.memo where appropriate
- Search is debounced to prevent excessive filtering
- Chart components use ResponsiveContainer for optimal rendering

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support or questions about this project:

- Create an issue in the repository
- Check the documentation in the `docs/` folder
- Review the interview questions in `interview.md` for technical insights

---

Built with ❤️ using React, TypeScript, and modern web technologies.