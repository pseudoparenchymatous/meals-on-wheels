import Layout from '@/layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast'; // for success/error message
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt,
    faEnvelope,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebook,
    faInstagram,
    faXTwitter,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/contact', {
            onSuccess: () => {
                toast.success('Message sent successfully!');
                reset();
            },
            onError: () => {
                toast.error('Please fix the form errors.');
            },
        });
    };

    return (
        <Layout>
            <Head title="Contact" />
            <section className="m-10">
                <div>
                    <h1 className="text-center text-xl font-bold">Contact Us</h1>
                </div>

                <div className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    {/* LEFT: Contact Info */}
                    <div className="space-y-8">
                        <div className="p-6 rounded-xl shadow-md">
                            <h2 className="text-lg font-semibold border-b pb-2">Get in Touch</h2>
                            <p className="mt-2">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                023 University Of Cebu, Banilad Campus
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                (023) 416-7810
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                contact@mealsonwheels.org
                            </p>
                        </div>

                        <div className="p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-medium mb-2">Follow Us</h3>
                            <div className="flex gap-4">
                                <a href="https://facebook.com" target="_blank" className="hover:scale-110 transition">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                                <a href="https://instagram.com/mealswheelsppl/" target="_blank" className="hover:scale-110 transition">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                                <a href="https://twitter.com" target="_blank" className="hover:scale-110 transition">
                                    <FontAwesomeIcon icon={faXTwitter} />
                                </a>
                                <a href="https://youtube.com" target="_blank" className="hover:scale-110 transition">
                                    <FontAwesomeIcon icon={faYoutube} />
                                </a>
                            </div>
                        </div>

                        <div className="h-64 overflow-hidden rounded-xl shadow-md border border-gray-700">
                            <iframe
                                className="w-full h-full"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.31521301611036!2d123.91157825176683!3d10.338411374552967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a998e133925eeb%3A0xfeda037a6ba9d730!2sUniversity%20of%20Cebu%20-%20Banilad%20Campus!5e0!3m2!1sen!2sph!4v1751202312298!5m2!1sen!2sph"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {/* RIGHT: Contact Form */}
                    <div className="shadow-xl rounded-xl p-8 border animate-fade-in">
                        <h2 className="text-lg font-bold mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full border border-gray-700 p-3 rounded-md"
                                    placeholder="Full Name"
                                />
                                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                            </div>

                            <div>
                                <label className="block mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full border border-gray-700 p-3 rounded-md"
                                    placeholder="Email Address"
                                />
                                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                            </div>

                            <div>
                                <label className="block mb-1">Message</label>
                                <textarea
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="w-full border border-gray-700 p-3 rounded-md h-32 resize-none"
                                    placeholder="Your message..."
                                ></textarea>
                                {errors.message && <div className="text-red-500 text-sm">{errors.message}</div>}
                            </div>

                            <Button type="submit" disabled={processing}>
                                Send
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Contact;
