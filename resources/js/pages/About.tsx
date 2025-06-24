import Layout from '@/layouts/Layout';
import Carousel from '@/components/Carousel-image';
import Stats from '@/components/ui/Stats'
import { Button } from "@/components/ui/button"
import { Head, Link } from "@inertiajs/react";

const Cards =[
    {
        'img': 'storage/images/about-caregiver-img.jpg',
        'alt': 'Caregiver Image',
        'heading': 'Supporting Caregivers Every Day',
        'details': 'We ease the burden on family caregivers by ensuring their loved ones receive daily, nutritious meals and friendly check-ins — giving peace of mind and support.',
    },
    {
        'img': 'storage/images/about-delivery-img.jpg',
        'alt': 'Delivery Image',
        'heading': 'Reliable Meal Delivery Service',
        'details': 'Our dedicated team delivers meals with care and consistency, ensuring seniors are fed, safe, and never left behind — one doorstep at a time.',
    },
    {
        'img': 'storage/images/about-chef-img.jpg',
        'alt': 'Chef Image',
        'heading': 'Quality from Kitchen to Table',
        'details': 'Thanks to our food service partners, every meal is prepared with nutrition, care, and dignity in mind — served hot and delivered fresh.',
    },
]

function RoleCards({ roleBox }){
    return(
        <div className="border max-w-lg rounded-lg hover:border-primary">
            <img className="h-auto object-cover rounded-t-lg w-full" src={roleBox.img} alt={roleBox.alt}/>
            <div className="max-w-100 m-10">
                <h5 className="font-semibold mb-3 text-2xl">{roleBox.heading}</h5>
                <p className="text-muted-foreground">{roleBox.details}</p>
            </div>
        </div>
    );
}

export default function About() {
    return (
        <Layout>
            <Head title="About"/>
            <section className="flex flex-wrap items-center justify-center gap-4 m-10">
                <div className="flex flex-col gap-3 max-w-md items-center justify-items-center lg:justify-items-start">
                    <h1 className="text-xl text-start"> <b>Meals on Wheels</b> is a compassionate initiative developed by <b>Unity One Solutions</b> for <b>MerryMeal</b>, a charitable organization
                        dedicated to promoting nutrition and well-being among vulnerable individuals in our communities.</h1>
                    <p className="text-muted-foreground text-center md:text-start"></p>
                    <div className="w-full flex justify-center md:justify-start">
                        <Button asChild>
                            <Link href="/">Our Work</Link>
                        </Button>
                    </div>
                </div>
            <div className="max-w-150">
                <img  src="storage/images/about-image.jpg"/>
            </div>
            </section>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <blockquote className="fg-foreground text-2xl text-center p-10 w-full m-1 italic">
                    <h1 className="text-3xl not-italic font-bold pb-10">Our Mission</h1>
                    To deliver more than just food – we deliver independence, dignity, and hope.<br/>
                    We believe no one should have to choose between food and other basic needs.
                </blockquote>
            </div>
            <section className='p-6 justify-items-center'>
                <div className='grid lg:grid-cols-3 gap-6'>
                    {Cards.map((card, index) => <RoleCards key={index} roleBox={card} />)}
                </div>
            </section>
            <section className="flex-1 flex-wrap p-18 flex flex-col gap-4 ">
                    <h1 className='text-center fg-foreground font-[1000] text-3xl'>
                        Behind every number is a life changed — thanks to your support<br/>
                        we're delivering more than just meals.
                    </h1>
                    <p className="text-center text-lg font-light">
                    Our reach continues to grow thanks to our generous supporters and tireless volunteers.
                    </p>
                    <Stats/>
                    <div className="w-full flex justify-center md:justify-center">
                        <Button asChild>
                            <Link href="/">Donate Now</Link>
                        </Button>
                    </div>
                </section>
            <Carousel/>
        </Layout>
    );
};
