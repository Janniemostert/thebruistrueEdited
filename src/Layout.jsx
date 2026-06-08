import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { CartProvider } from "./components/shop/CartContext";

export default function Layout({ children, currentPageName }) {
  return (
    <CartProvider>
      <div className="min-h-screen" style={{ background: "#0F0F0F" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@300;400;500&display=swap');
          :root {
            --gold: #C6A75E;
            --gold-dim: #8A6F3A;
            --copper: #A65B2A;
            --navy: #1A2233;
            --bg: #0F0F0F;
            --surface: #161616;
            --surface2: #1C1C1C;
            --text: #E8DFD0;
            --text-muted: rgba(232,223,208,0.8);
          }
          body { background: #0F0F0F; color: #E8DFD0; font-family: 'Inter', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
          .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
          * { scrollbar-width: thin; scrollbar-color: #C6A75E40 transparent; }
          ::selection { background: #C6A75E40; color: #E8DFD0; }
          .gold-glow { transition: box-shadow 0.3s ease; }
          .gold-glow:hover { box-shadow: 0 0 30px #C6A75E25; }
          .gold-border-glow:hover { border-color: #C6A75E80 !important; box-shadow: 0 0 20px #C6A75E15; }
        `}</style>
        <Navbar currentPage={currentPageName} />
        <main className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}