import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import MemberLayout from '@/layouts/MemberLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface Meal {
    id: number;
    name: string;
    image: string | null;
}

interface Props {
    auth: {
        user: {
            userable: {
                first_name: string;
                last_name: string;
            };
        };
    };
    meals: Meal[];
}

export default function Dashboard({ auth, meals }: Props) {
    const memberName = auth?.user
        ? `${auth.user.userable.first_name} ${auth.user.userable.last_name}`
        : 'Member';

    const [wave, setWave] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setWave(true);
            setTimeout(() => setWave(false), 1000);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const renderMealCard = (meal: Meal, label?: string) => (
        <div className="flex flex-col gap-2" key={meal.id}>
            {label && (
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
                    {label}
                </h3>
            )}
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/10 dark:bg-gray-800/30 backdrop-blur shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
                {meal.image_path ? (
                    <img
                        src={meal.image_path}
                        alt={meal.name}
                        className="absolute inset-0 w-full h-full object-cover brightness-95 hover:brightness-100 transition"
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                        No Image
                    </div>
                )}
                <div className="absolute bottom-0 w-full bg-black/50 text-white p-3 backdrop-blur">
                    <h3 className="text-lg font-semibold">{meal.name}</h3>
                </div>
            </div>
        </div>
    );

    const mainMeals = meals.slice(0, 3);
    const upcomingMeals = meals.slice(3);
    const mainLabels = ["Today's Meal", "Tomorrow's Meal", "Next Day Meal"];

    return (
        <MemberLayout>
            <Head title="Member Dashboard" />

            <div className="flex flex-col gap-8 px-4 py-6 bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen rounded-xl">

                {/* Greeting Section */}
                <div className="text-center mt-4">
                    <h1 className="text-4xl font-extrabold flex items-center justify-center gap-2">
                        <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-sky-400 bg-clip-text text-transparent">
                            Hello, {memberName}
                        </span>
                        <span
                            className={`text-4xl transition-transform duration-300 ${
                                wave ? 'animate-wave' : ''
                            }`}
                        >
                            👋
                        </span>
                    </h1>
                </div>

                {/* Meal Section */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <UtensilsCrossed className="text-pink-500 dark:text-pink-400" />
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-wide">
                            Your Meals
                        </h2>
                    </div>

                    {meals.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-300">No meals available yet.</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {mainMeals.map((meal, index) =>
                                    renderMealCard(meal, mainLabels[index])
                                )}
                            </div>

                            {upcomingMeals.length > 0 && (
                                <div className="mt-10">
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
                                        Upcoming Meals
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {upcomingMeals.map((meal) => renderMealCard(meal))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </section>

                
                
            </div>

            <style>
                {`
                @keyframes wave {
                    0% { transform: rotate(0.0deg); }
                    10% { transform: rotate(14.0deg); }
                    20% { transform: rotate(-8.0deg); }
                    30% { transform: rotate(14.0deg); }
                    40% { transform: rotate(-4.0deg); }
                    50% { transform: rotate(10.0deg); }
                    60% { transform: rotate(0.0deg); }
                    100% { transform: rotate(0.0deg); }
                }

                .animate-wave {
                    animation: wave 1s ease-in-out;
                    display: inline-block;
                    transform-origin: 70% 70%;
                }
                `}
            </style>
        </MemberLayout>
    );
}
