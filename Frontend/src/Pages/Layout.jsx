import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../index.css";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen w-full relative main-dots overflow-x-hidden">
            <main className="relative z-40">
                <Navbar />
                {children}
                <Footer />
            </main>
        </div>
    );
}
