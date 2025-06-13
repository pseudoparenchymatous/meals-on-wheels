import Layout from '@/layouts/Layout';
import { Head } from '@inertiajs/react';
import DonationHero from '@/components/home/DonationHero';
import Hero from '@/components/home/Hero';
import DonationForm from '@/components/home/DonationForm';
import DonationFormDummy from '@/components/home/DonationFormDummy';

export default function App({ }) { // 'user' prop might come from Laravel/Inertia
  return (
    <Layout>
      <Head title="Support MerryMeal - Make a Donation" />
      <DonationHero/>
      <DonationFormDummy/>
    </Layout>
  );
}