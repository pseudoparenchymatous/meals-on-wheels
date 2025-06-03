import { Button } from "@/components/ui/button"
import { Link } from '@inertiajs/react'

export default function Hero() {
    return (
        <section className="flex flex-wrap items-center justify-center gap-10">
            <div className="grid grid-rows-3 max-w-md items-center justify-items-center lg:justify-items-start">
                <h1 className="text-4xl font-bold text-center md:text-start">Nourishing Lives, One Meal at a Time</h1>
                <p>MerryMeal delivers nutritious meals to elderly and vulnerable adults—because everyone deserves a hot meal and a helping hand.</p>
                <div className="grid grid-cols-2 gap-5 items-center">
                    <Button asChild>
                        <a href="/donation">Donate Now</a>
                    </Button>
                    <Button asChild variant="outline">
                        <a href="/register">Request a Meal</a>
                    </Button>
                </div>
            </div>
            <div className="max-w-150">
                <img src="storage/images/hero-image.jpg"/>
            </div>
        </section>
    );
};
