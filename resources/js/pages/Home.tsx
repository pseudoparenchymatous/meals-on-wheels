import Layout from '@/layouts/Layout';
import { Head } from '@inertiajs/react';
import Hero from '@/components/home/Hero';
import ServiceFeatures from '@/components/home/ServiceFeatures';

export default function Home({ user }) {
    return (
        <Layout>
            <Head title="Welcome" />
            <Hero />
            <ServiceFeatures />
        </Layout>
    )
}
