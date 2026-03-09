'use client';

import { motion } from 'framer-motion';
import ThreeBackground from '@/components/ThreeBackground';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save } from 'lucide-react';
import { useState } from 'react';

export default function ProfileSettingsPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        dateOfBirth: '1990-05-15',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        licenseNumber: 'DL123456789',
        licenseExpiry: '2028-12-31'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement profile update logic
        setIsEditing(false);
    };

    return (
        <div className="relative min-h-screen bg-background text-text-primary pt-24 pb-12">
            <ThreeBackground />

            <div className="relative z-10 container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex justify-between items-center"
                >
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
                        <p className="text-gray-400">Manage your account information</p>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="btn-modern bg-gradient-to-r from-primary-dark to-primary text-text-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                    >
                        {isEditing ? (
                            <>
                                <Save size={20} />
                                Save Changes
                            </>
                        ) : (
                            <>
                                <Edit2 size={20} />
                                Edit Profile
                            </>
                        )}
                    </button>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <motion.div
                        className="glass-premium p-6 rounded-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <User className="text-primary" />
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">First Name</label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Address */}
                    <motion.div
                        className="glass-premium p-6 rounded-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <MapPin className="text-primary" />
                            Address
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-200 mb-2">Street Address</label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">City</label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">State</label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">ZIP Code</label>
                                <input
                                    type="text"
                                    value={formData.zipCode}
                                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Country</label>
                                <input
                                    type="text"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* License Information */}
                    <motion.div
                        className="glass-premium p-6 rounded-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Calendar className="text-primary" />
                            Driver's License
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">License Number</label>
                                <input
                                    type="text"
                                    value={formData.licenseNumber}
                                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Expiry Date</label>
                                <input
                                    type="date"
                                    value={formData.licenseExpiry}
                                    onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-100/60 border border-gray-700 rounded-xl px-4 py-3 text-text-primary focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {isEditing && (
                        <motion.div
                            className="flex gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <button
                                type="submit"
                                className="flex-1 btn-modern bg-gradient-to-r from-primary-dark to-primary text-text-primary py-3 rounded-xl font-bold"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="flex-1 bg-gray-100/10 hover:bg-gray-100/20 text-text-primary py-3 rounded-xl font-bold transition-colors"
                            >
                                Cancel
                            </button>
                        </motion.div>
                    )}
                </form>
            </div>
        </div>
    );
}
