This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Atlan-SQLapp
Overview
Atlan-SQLapp is a web application that allows users to execute SQL queries and visualize the results in a dynamic table. The application provides an integrated development environment (IDE) for writing and running SQL queries, along with features like theme selection, fullscreen mode, and table information.

JavaScript Framework and Dependencies
The project is built using React and Next.js. The key dependencies include:

@monaco-editor/react: Version 4.6.0, a React wrapper for the Monaco Editor.
next: Version 14.0.3, for server-side rendering and routing in React applications.
next-themes: Version 0.2.1, for handling theme switching in Next.js.
react: Version 18.2.0, the core React library.
react-dom: Version 18.2.0, for rendering React components.
react-icons: Version 4.12.0, a library for popular icons.
Page Load Time
The page load time of the application was not explicitly measured in the provided code. To implement this measurement, consider using browser developer tools or performance monitoring tools to analyze the application's loading performance.

Optimizations
The code includes various features and optimizations, such as lazy loading of components using React's lazy and Suspense, asynchronous execution simulation for SQL queries, and theme selection. Additionally, there are loading indicators for both the editor and dynamic table to provide a smoother user experience.
