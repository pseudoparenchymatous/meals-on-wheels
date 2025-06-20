import Layout from '@/layouts/Layout';
import { Head } from '@inertiajs/react';
import Hero from '@/components/home/Hero';
import DonationForm from '@/components/donation/DonationForm';
import DonationFormDummy from '@/components/donation/DonationFormDummy';
import DonationHero from '@/components/donation/DonationHero';

export default function App({ }) { // 'user' prop might come from Laravel/Inertia
  return (
    <Layout>
      <Head title="Support MerryMeal - Make a Donation" />
      <DonationHero/>
      <DonationFormDummy/>
    </Layout>
  );
}