// import { inter } from "./components/fonts";
import "./globals.css";
import SideNav from "./components/SideNav";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
