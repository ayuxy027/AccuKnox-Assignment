# Widgetly - Dynamic Dashboard

## Technical Implementation

### JSON Schema Architecture
```json
{
  "dashboard_configuration": [
    {
      "category_id": "cspmExecutiveDashboard",
      "category_name": "CSPM Executive Dashboard", 
      "widgets": [
        {
          "widget_id": "cloudAccountRiskAssessment",
          "widget_name": "Cloud Account Risk Assessment",
          "widget_content": "Connected (2) Not Connected (2) 9659 Total Failed (1689) Warning (681) Not available (36) Passed (7253)",
          "is_removable": true,
          "is_searchable": true,
          "creation_timestamp": "2025-01-20T09:47:00Z"
        }
      ]
    }
  ]
}
```

### State Management Strategy
- **Zustand Store**: Centralized state management for dynamic operations
- **Debounced Persistence**: 300ms localStorage writes for performance
- **Atomic Operations**: Batch widget updates with single state mutations
- **Optimistic Updates**: UI updates immediately, persistence debounced

### Dynamic Operations Implementation

#### Add Widget Flow
1. User triggers `+ Add Widget` button
2. `PersonalizationPanel` renders with available widgets
3. New custom widgets generate UUID v4 `widget_id`
4. State mutation: `categories[categoryIndex].widgets.push(newWidget)`
5. Debounced localStorage persistence

#### Remove Widget Flow
1. User clicks widget `X` icon or unchecks from panel
2. State mutation: `categories[categoryIndex].widgets.filter(w => w.widget_id !== targetId)`
3. Immediate UI update, debounced persistence

#### Search Implementation
1. Global search bar with 200ms debouncing
2. Filter logic: `widget.widget_name.toLowerCase().includes(query.toLowerCase())`
3. Categories with no matching widgets hidden
4. Real-time filtering without API calls

### Performance Optimizations
- **React.memo**: Component memoization for render optimization
- **useCallback/useMemo**: Event handler and computation caching
- **Debounced Search**: 200ms delay prevents excessive filtering
- **GPU Acceleration**: CSS transforms for smooth animations
- **Selective Subscriptions**: Zustand store subscriptions optimized

### Technology Stack
- **React 18** with TypeScript
- **Vite** for build tooling
- **Zustand** for state management
- **Tailwind CSS v4** for styling
- **Lucide React** for icons
- **Recharts** for data visualization

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check
```

### Project Structure
```
src/
├── components/          # React components
├── hooks/              # Custom hooks (useDebounce)
├── store/              # Zustand store
├── types/              # TypeScript interfaces
├── utils/              # Storage utilities
└── data/               # JSON configuration
```

### Browser Storage
- **localStorage**: Persistent widget state across sessions
- **Version Control**: Data migration and compatibility
- **Size Limits**: 5MB storage with automatic cleanup
- **Error Handling**: Graceful fallbacks for storage failures

### Accessibility Features
- **ARIA Labels**: Screen reader compatibility
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Semantic HTML**: Proper element semantics

### Production Readiness
- **TypeScript**: Full type safety
- **Error Boundaries**: Graceful error handling
- **Performance Monitoring**: Real-time metrics
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Semantic markup structure

## Interview Questions
See `interview.md` for comprehensive technical questions covering JSON schema design, state management, UI/UX implementation, and frontend best practices.