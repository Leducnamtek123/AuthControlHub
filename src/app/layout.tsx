'use client'
// src/app/layout.tsx
import { Inter } from "next/font/google";
import '../styles/globals.css';
import { Provider } from "react-redux";
import store from "./redux/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LoadingSpinner from "./components/LoadingSpinner";
import { LoadingProvider } from "./contexts/LoadingContext";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <Provider store={store}>
            <LoadingProvider>
              <LoadingSpinner />
              {children}
            </LoadingProvider>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
