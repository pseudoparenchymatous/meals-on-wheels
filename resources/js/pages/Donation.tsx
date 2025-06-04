import Layout from '@/layouts/Layout';
import { Head } from '@inertiajs/react';
import DonationHero from '@/components/home/DonationHero';
import Hero from '@/components/home/Hero';
import DonationForm from '@/components/home/DonationForm';

export default function App({ user }) { // 'user' prop might come from Laravel/Inertia
  return (
    <Layout>
      <Head title="Support MerryMeal - Make a Donation" />
      <DonationHero/>
      <DonationForm/>
      <footer className="text-center py-8 bg-gray-800 text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} MerryMeal. All Rights Reserved.</p>
        <p>A compassionate community initiative.</p>
      </footer>
    </Layout>
  );
}