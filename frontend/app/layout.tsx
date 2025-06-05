import '../styles/globals.css';

export const metadata = {
  title: "JewelsCart",
  description: "Shop premium imitation jewelry online",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        
        <main 
          className="pt-4">{children}
          
        </main>
        <footer className="p-4 text-center text-gray-500">© 2025 JewelsCart</footer>
      </body>
    </html>
  );
}