"use client";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Trips Management System</title>
        <link href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <Provider store={store}>
            <Toaster position="top-center" />
            {children}
        </Provider>
      </body>
    </html>
  );
}
