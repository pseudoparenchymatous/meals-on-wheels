import {
    HeartHandshake,
    Puzzle,
    Soup,
    Truck,
} from 'lucide-react';

const heading = "Our Services"
const features = [
    {
        'heading': 'Nutritious Meals',
        'body': 'Carefully prepared meals tailored to dietary needs',
        'icon' : <Soup />,

    },
    {
        'heading': 'Door Delivery',
        'body': 'Fresh meals delivered right to your doorstep',
        'icon': <Truck />,
    },
    {
        'heading': 'Community Support',
        'body': 'Powered by volunteers who care about your wellbeing',
        'icon': <HeartHandshake />,
    },
    {
        'heading': 'Dietary Customization',
        'body': 'Tailored meals for special dietary needs, including diabetic-friendly, gluten-free, and heart-healthy options',
        'icon': <Puzzle />,
    },

]

function ServiceFeatureCard({ feature }) {
    return (
        <div className="max-w-70">
            <div className="mb-5 size-16 grid place-items-center rounded-full bg-accent">
                {feature.icon}
            </div>
            <h3 className="font-semibold">{feature.heading}</h3>
            <p className="text-muted-foreground">{feature.body}</p>
        </div>
    );
}

export default function ServiceFeatures() {
    return (
        <section className="m-10">
            <h2 className="p-2 text-center font-semibold text-xl">{heading}</h2>
            <div className="grid gap-15 justify-items-center max-w-fit my-5 mx-auto md:grid-cols-2">
                {features.map((feature, index) => <ServiceFeatureCard key={index} feature={feature}/>)}
            </div>
        </section>
    );
}
