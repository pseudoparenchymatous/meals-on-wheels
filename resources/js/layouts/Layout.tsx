import Header from '@/components/Header';
import Footer from '@/components/footer';
import { Toaster } from 'react-hot-toast'; 

export default function Layout({ children }) {
    return (
        <>
            {/* Toast Notification Component */}
            <Toaster position="top-right" reverseOrder={false} />

            {/* Site Layout */}
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
};
