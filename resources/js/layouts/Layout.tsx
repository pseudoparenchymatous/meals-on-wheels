import Header from '@/components/Header';
import Footer from '@/components/footer';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main>
                { children }
            </main>
            <Footer />
        </>
    );
};
