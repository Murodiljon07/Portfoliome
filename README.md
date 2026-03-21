# Portfolio Admin Dashboard

A production-ready portfolio management dashboard built with Next.js, TypeScript, Redux Toolkit, and TailwindCSS.

## Features

- **Authentication**: Login system with token-based auth
- **CRUD Operations**: Full create, read, update, delete for all portfolio sections
- **Modern UI**: Responsive design with dark mode support
- **Type Safety**: Full TypeScript implementation
- **State Management**: Redux Toolkit for global state
- **API Integration**: Axios with interceptors and error handling
- **Form Validation**: Basic client-side validation
- **Toast Notifications**: User feedback for actions
- **Loading States**: Skeletons and spinners
- **Error Boundaries**: Graceful error handling

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: TailwindCSS
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Loading**: React Loading Skeleton

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
├── features/               # Feature-based components
│   ├── about/
│   ├── contact/
│   ├── experiences/
│   ├── projects/
│   └── auth/
├── services/               # API service layer
├── store/                  # Redux store and slices
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
└── constants/              # App constants
```

## API Endpoints

The app connects to `https://verus.pythonanywhere.com` with the following endpoints:

### Authentication
- `POST /accounts/login/` - User login

### About
- `GET /api/about/` - List about sections
- `GET /api/about/{id}/` - Get specific about section
- `POST /api/about/` - Create about section
- `PUT /api/about/{id}/` - Update about section
- `DELETE /api/about/{id}/` - Delete about section

### Projects
- `GET /api/projects/` - List projects
- `GET /api/projects/{id}/` - Get specific project
- `POST /api/projects/` - Create project
- `PUT /api/projects/{id}/` - Update project
- `DELETE /api/projects/{id}/` - Delete project

### Experiences
- `GET /api/experiences/` - List experiences
- `GET /api/experiences/{id}/` - Get specific experience
- `POST /api/experiences/` - Create experience
- `PUT /api/experiences/{id}/` - Update experience
- `DELETE /api/experiences/{id}/` - Delete experience

### Contact
- `GET /api/contact/` - List contact messages
- `GET /api/contact/{id}/` - Get specific contact message
- `POST /api/contact/` - Create contact message
- `DELETE /api/contact/{id}/` - Delete contact message

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

4. **Login** with your credentials to access the dashboard.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

No environment variables are required as the API base URL is hardcoded. In production, consider moving it to environment variables.

## Deployment

The app can be deployed to Vercel, Netlify, or any platform supporting Next.js:

```bash
npm run build
npm run start
```

## Features Overview

### Dashboard
- Overview of all sections with counts
- Quick navigation to different sections

### About Management
- Create, edit, and delete about sections
- Rich text descriptions
- Image support

### Project Management
- Full CRUD operations
- Technology tags
- Links to live demos and GitHub
- Image support

### Experience Management
- Work experience tracking
- Date ranges
- Current position indicator

### Contact Management
- View incoming contact messages
- Delete processed messages

## Security

- JWT token-based authentication
- Protected routes with middleware
- Token stored in localStorage and cookies
- Automatic logout on token expiry

## Performance

- Code splitting with Next.js
- Optimized bundle size
- Lazy loading of components
- Efficient state management

## Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Implement proper error handling
4. Add tests for new features
5. Follow the established naming conventions
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
