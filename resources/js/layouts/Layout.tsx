import { Link } from '@inertiajs/react';

import Header from '@/components/Header';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main>
                { children }
            </main>
        </>
    );
};
