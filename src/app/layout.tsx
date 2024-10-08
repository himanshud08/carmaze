import "./globals.css";
import Navbar  from "../../components/Navbar";
import Footer  from "../../components/Footer";

export const metadata = {
  title: "CarAmaze",
  description: "Discover world's best car showcase application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='relative'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}