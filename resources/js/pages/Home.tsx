import Layout from '@/layouts/Layout';
import { Head } from '@inertiajs/react';
import Hero from '@/components/home/Hero';
import ServiceFeatures from '@/components/home/ServiceFeatures';
import ImpactBar from '@/components/home/ImpactBar';

export default function Home() {
    return (
        <Layout>
            <Head title="Welcome" />
            <Hero />
            <ServiceFeatures />
            <ImpactBar />
        </Layout>
    );
}
