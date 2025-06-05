import { JSX } from "react";

type IconName = 'Users' | 'Truck' | 'Clock' | 'Volunteers';

export const DonationHero = () => {
    const stats: { icon: IconName; value: string; label: string }[] = [
        { icon: 'Users', value: '12,500+', label: 'Seniors Served' },
        { icon: 'Truck', value: '75,000+', label: 'Meals Delivered' },
        { icon: 'Volunteers', value: '1,200+', label: 'Volunteers' },
        { icon: 'Clock', value: '5', label: 'Days a Week' }
    ];

    const iconMap: Record<IconName, () => JSX.Element> = {
        Users: () => (
            <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
        ),
        Truck: () => (
            <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        Volunteers: () => (
            <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        Clock: () => (
            <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
            </svg>
        )
    };

    return (
        <div className="bg-[#F72585] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <svg className="mx-auto h-16 w-16 mb-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Nourish Lives, Build Community
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                        Your donation helps us deliver nutritious meals to seniors who need them most. 
                        Together, we can ensure no one goes hungry.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {stats.map((stat, index) => {
                            const IconComponent = iconMap[stat.icon];
                            return (
                                <div key={index} className="text-center">
                                    <IconComponent />
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <div className="text-sm">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationHero;