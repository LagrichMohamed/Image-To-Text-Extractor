"use client"
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        // Initialize EmailJS with your public key
        emailjs.init("2R14D2f5NtPZ0izE6");
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        try {
            await emailjs.send(
                "service_7rvakvw", // replace with your service ID
                "template_uhpm5zy", // replace with your template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_email: 'contact.kayansama@gmail.com',
                }
            );

            toast.success('Message sent successfully!', {
                position: "bottom-right",
                autoClose: 2000,
            });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Failed to send message. Please try again.', {
                position: "bottom-right",
                autoClose: 2000,
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-[#2c2c2c] rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full p-3 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full p-3 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={4}
                        className="w-full p-3 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-blue-500 focus:outline-none resize-y"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={isSending}
                    className={`w-full ${isSending ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center`}
                >
                    {isSending ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
