import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import MemberLayout from '@/layouts/MemberLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const memberName = auth?.user ? `${auth.user.first_name} ${auth.user.last_name}` : 'Member';

    const todayMeal = {
        title: 'Chicken Adobo',
        image: '/images/Chicken-Adobo-SQ.jpg',
    };

    const tomorrowMeal = {
        title: 'Fish Fillet',
        image: '/images/fishfillet.jpg',
    };

    const nextDayMeal = {
        title: 'Baked Salmon',
        image: '/images/Bakedsalmon.jpg',
    };

    const upcomingMeals = [
        {
            title: 'Vegetable Kare-Kare',
            image: '/images/kare-kare.jpg.crdownload',
        },
        {
            title: 'Pasta Salad',
            image: '/images/Pasta-Salad.jpeg',
        },
        {
            title: 'Scrambled Eggs ',
            image: '/images/ScrambledEgg.jpg',
        },
        {
            title: 'Grilled Chicken',
            image: '/images/grilledChicken.jpg',
        },
    ];

    const renderMealCard = (meal) => (
        <div
            key={meal.title}
            className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
        >
            <img
                src={meal.image}
                alt={meal.title}
                className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition"
            />
            <div className="absolute bottom-0 w-full bg-black/60 text-white p-3">
                <h3 className="text-lg font-semibold">{meal.title}</h3>
            </div>
        </div>
    );

    return (
        <MemberLayout>
            <Head title="Member Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Hello, {memberName}! 👋
                </h1>

                {/* Meals Section */}
                <section>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Today’s Meal */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Today’s Meal</h2>
                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 max-w-md">
                                <img
                                    src={todayMeal.image}
                                    alt={todayMeal.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition"
                                />
                                <div className="absolute bottom-0 w-full bg-black/60 text-white p-4">
                                    <h3 className="text-lg font-semibold">{todayMeal.title}</h3>

                                    {/* Add water + Order Meal */}
                                    <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                                        <label className="flex items-center text-sm">
                                            <input
                                                type="checkbox"
                                                className="mr-2 rounded border-gray-300 text-blue-600 shadow-sm focus:ring focus:ring-blue-200"
                                            />
                                            Add Water Bottle
                                        </label>

                                        <button
                                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                                        >
                                            Order Meal
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tomorrow’s Meal */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Tomorrow’s Meal</h2>
                            {renderMealCard(tomorrowMeal)}
                        </div>

                        {/* Next Day’s Meal */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Next Day’s Meal</h2>
                            {renderMealCard(nextDayMeal)}
                        </div>
                    </div>
                </section>

                {/* Upcoming Meals */}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Upcoming Meals</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {upcomingMeals.map((meal) => renderMealCard(meal))}
                    </div>
                </section>

                {/* Optional Placeholder Section */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min mt-6">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </MemberLayout>
    );
}
