import Header from '@/components/Header';
import Carousel from '@/components/Carousel-image';
import { Button } from "@/components/ui/button"
import { Head, Link } from "@inertiajs/react";

export default function About() {
    return (
        <>
            <Header />
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
                    <img  src="storage/images/meal-on-wheels-image_about.svg"/>
                </div>
            </section>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <blockquote className="relative fg-foreground text-2xl text-center p-10 w-full m-1 italic">
                    <h1 className="text-4xl not-italic font-bold pb-10">Our Mission</h1>
                    To deliver more than just food – we deliver independence, dignity, and hope.<br/>
                    We believe no one should have to choose between food and other basic needs.
                </blockquote>
            </div>
            <Carousel/>
        </>
    );
};
