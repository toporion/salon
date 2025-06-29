import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                {/* About the Company */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">About the Company</h2>
                    <p className="text-sm text-gray-300">
                        We are committed to providing top-quality services and solutions to help our clients succeed in the digital era.
                    </p>
                </div>

                {/* Recent Posts */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li>→ How to boost your SEO</li>
                        <li>→ Latest design trends 2025</li>
                        <li>→ Improving customer engagement</li>
                        <li>→ Building responsive layouts</li>
                    </ul>
                </div>

                {/* Useful Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Useful Links</h2>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">About</a></li>
                        <li><a href="#" className="hover:underline">Services</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
                    <p className="text-sm text-gray-300 mb-4">Subscribe to our newsletter to get our latest updates and offers.</p>
                    <form className="flex flex-col sm:flex-row items-center gap-2">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white text-sm focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="text-center text-gray-500 text-sm mt-10">
                &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
