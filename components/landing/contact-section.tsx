import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
    return (
        <footer id="contact" className="bg-gray-900 border-t border-gray-800 pt-20 pb-10 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
                        <p className="text-gray-400 mb-8">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-300">
                                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                                    📧
                                </div>
                                <span>support@aisistant.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                                    📍
                                </div>
                                <span>Jakarta, Indonesia</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="First Name" className="bg-gray-900 border-gray-700" />
                                <Input placeholder="Last Name" className="bg-gray-900 border-gray-700" />
                            </div>
                            <Input placeholder="Email Address" className="bg-gray-900 border-gray-700" />
                            <Textarea placeholder="Your Message" className="bg-gray-900 border-gray-700 min-h-[120px]" />
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">Send Message</Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>© 2025 Aisistant. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
