# Coding Challenge

## Overview

Welcome to Akkooo's Challenge! You'll be building a **Real-time Order Management Dashboard** that simulates the core functionality of our platform's order management system.

## Challenge Description

Create a responsive, high-performance order management dashboard that handles real-time order updates, advanced filtering, and bulk operations. This challenge is designed to evaluate your expertise in React, TypeScript, state management, and UI/UX best practices.

## Technical Requirements

### Core Technologies

- **React JS+** with TypeScript
- **Material UI** for component library and styling
- **No backend required** - Use provided mock data and simulate real-time updates
- **State management** - Use Redux toolkit

### Mandatory Features

#### 1. Order List Dashboard

- Display orders in a responsive table/card layout
- Show key order information: ID, customer name, status, total amount, order date
- Implement pagination or virtualization for performance
- Real-time status updates (simulate with intervals)

#### 2. Advanced Filtering & Search

- Filter by order status (pending, processing, shipped, delivered, cancelled)
- Filter by date range (today, this week, this month, custom range)
- Filter by amount range (min/max values)
- Global search across customer names and order IDs
- Multiple active filters simultaneously

#### 3. Sorting Capabilities

- Sort by date, amount, customer name, status
- Both ascending and descending order
- Visual indicators for active sort

#### 4. Order Details Modal

- Click on any order to view detailed information
- Display customer details, shipping address, order items
- Allow status updates from the modal
- Responsive design for mobile devices

#### 5. Bulk Operations

- Select multiple orders with checkboxes
- Bulk status updates (e.g., mark multiple orders as "shipped")
- Select all/deselect all functionality
- Visual feedback for bulk operations

#### 6. Real-time Simulation

- Simulate incoming new orders every 10-15 seconds
- Simulate random status changes for existing orders
- Visual notifications for updates (toast/snackbar)

#### 7. Performance Optimization

- Handle large datasets efficiently
- Implement debounced search
- Optimize re-renders using React.memo, useMemo, useCallback where appropriate
- Smooth animations and transitions

### Bonus Features (Optional)

- Export filtered orders to CSV
- Dark/Light theme toggle
- Drag-and-drop to change order status
- Order analytics summary cards (total orders, revenue, etc.)
- Keyboard shortcuts for common actions

## Technical Evaluation Criteria

### Code Quality

- Clean, readable, and well-organized code structure
- Proper TypeScript usage with interfaces and types
- Component composition and reusability
- Error handling and edge cases
- Loading states and user feedback

### React Expertise

- Efficient use of React hooks
- Proper component lifecycle management
- Performance optimization techniques
- State management patterns
- Event handling and side effects

### UI/UX Design

- Responsive design across devices
- Intuitive user interface
- Accessibility considerations
- Visual hierarchy and design consistency
- Smooth interactions and animations

### Problem Solving

- Handling of complex state scenarios
- Performance considerations for large datasets
- Real-time updates implementation
- Error boundary implementation

## Getting Started

### Setup Instructions

1. Create a new React TypeScript project
2. Use the provided `mock-orders.json` for initial data
3. Implement the required features
4. Add proper documentation and comments

### Mock Data

- Use the provided `mock-orders.json` file
- Feel free to extend or modify the data structure if needed
- Ensure your solution works with the provided dataset

### Presentation Page

Create a presentation page in HTML that includes the following sections:

- Project Description: An overview of the app and its purpose.
- Screenshots: Visuals of the app showcasing key features and design.
- Features: A detailed list of the app's functionalities.
- Technologies and Techniques Used: Explanation of the tools, libraries, and methodologies employed in the project.
- Upcoming Features: Outline any additional features you plan to implement in the future.
- External Resources: List and provide links to all external design resources, images, and any other third-party assets used (that you did not create yourself).
- Links: Direct links to your GitHub repository and the live web app.

### Submission Requirements

1. **Source Code**: The GitHub repository link containing your codebase.
2. **README**: Your own README with:
   - Setup and run instructions
   - Feature implementation notes
   - Design decisions and trade-offs
   - Known limitations or future improvements
3. **Live Demo**: Deploy the app to a live production environment using any free platform of your choice.
4. Ace your presentation with AWS Amplify / AWS serverless microservices (optional)

## Questions?

If you have any clarification questions, please don't hesitate to reach out..

## Final Notes

- Focus on code quality over quantity of features
- We value clean, maintainable code over complex solutions
- Show us your thinking process through git commits and comments
- Demonstrate your understanding of modern React patterns
- Consider user experience in every decision

Good luck! We're excited to see your solution and potentially welcome you to the Akkooo team.

---
