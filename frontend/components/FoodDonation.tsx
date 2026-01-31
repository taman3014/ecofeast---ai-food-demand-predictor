import React, { useState } from 'react';
import { MapPin, Phone, Clock, Heart, Navigation, ExternalLink, Building2, Users, Truck } from 'lucide-react';

interface DonationPartner {
    id: string;
    name: string;
    type: 'ngo' | 'shelter' | 'foodbank';
    distance: string;
    address: string;
    phone: string;
    hours: string;
    acceptsToday: boolean;
    rating: number;
    mealsServed: string;
}

interface FoodDonationProps {
    wasteAmount: number;
    onSchedulePickup?: (partner: DonationPartner) => void;
}

const DONATION_PARTNERS: DonationPartner[] = [
    {
        id: '1',
        name: 'Feeding India Foundation',
        type: 'ngo',
        distance: '2.3 km',
        address: 'B-45, Sector 18, Noida',
        phone: '+91 98765 43210',
        hours: '8 AM - 8 PM',
        acceptsToday: true,
        rating: 4.8,
        mealsServed: '50,000+'
    },
    {
        id: '2',
        name: 'Akshaya Patra Kitchen',
        type: 'ngo',
        distance: '4.1 km',
        address: 'Plot 12, Industrial Area, Phase II',
        phone: '+91 98765 43211',
        hours: '6 AM - 10 PM',
        acceptsToday: true,
        rating: 4.9,
        mealsServed: '1.8M daily'
    },
    {
        id: '3',
        name: 'Robin Hood Army Hub',
        type: 'foodbank',
        distance: '1.8 km',
        address: 'Community Center, Block C, Lajpat Nagar',
        phone: '+91 98765 43212',
        hours: '24/7',
        acceptsToday: true,
        rating: 4.7,
        mealsServed: '25,000+'
    },
    {
        id: '4',
        name: 'Gurdwara Langar Seva',
        type: 'shelter',
        distance: '3.5 km',
        address: 'Gurudwara Road, Sector 22',
        phone: '+91 98765 43213',
        hours: '5 AM - 11 PM',
        acceptsToday: true,
        rating: 5.0,
        mealsServed: '10,000+'
    }
];

const FoodDonation: React.FC<FoodDonationProps> = ({ wasteAmount, onSchedulePickup }) => {
    const [selectedPartner, setSelectedPartner] = useState<DonationPartner | null>(null);
    const [pickupScheduled, setPickupScheduled] = useState(false);
    const [showDetails, setShowDetails] = useState<string | null>(null);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'ngo': return <Heart size={16} className="text-pink-400" />;
            case 'shelter': return <Building2 size={16} className="text-blue-400" />;
            case 'foodbank': return <Users size={16} className="text-green-400" />;
            default: return <Heart size={16} />;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'ngo': return 'NGO';
            case 'shelter': return 'Shelter';
            case 'foodbank': return 'Food Bank';
            default: return type;
        }
    };

    const handleSchedulePickup = (partner: DonationPartner) => {
        setSelectedPartner(partner);
        setPickupScheduled(true);
        onSchedulePickup?.(partner);

        // Reset after 5 seconds
        setTimeout(() => {
            setPickupScheduled(false);
            setSelectedPartner(null);
        }, 5000);
    };

    const estimatedMeals = Math.floor(wasteAmount * 0.8); // 80% of waste can become meals

    return (
        <div className="bg-dark-secondary p-6 rounded-2xl border border-border-muted shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500/20 rounded-xl">
                        <Heart size={20} className="text-pink-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Food Donation Partners</h3>
                        <p className="text-text-muted text-sm">Turn waste into meals</p>
                    </div>
                </div>
                {wasteAmount > 0 && (
                    <div className="text-right">
                        <p className="text-xs text-text-muted uppercase tracking-wider">Potential Meals</p>
                        <p className="text-2xl font-black text-pink-400">{estimatedMeals}</p>
                    </div>
                )}
            </div>

            {/* Success Message */}
            {pickupScheduled && selectedPartner && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-full">
                            <Truck size={20} className="text-green-400" />
                        </div>
                        <div>
                            <p className="text-green-400 font-bold">Pickup Scheduled! 🎉</p>
                            <p className="text-sm text-text-muted">{selectedPartner.name} will collect in 2-4 hours</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Impact Banner */}
            {wasteAmount > 10 && (
                <div className="mb-6 p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl">
                    <p className="text-sm text-pink-300">
                        ⚠️ You have <span className="font-bold text-white">{wasteAmount} units</span> of potential food waste.
                        Donating could provide <span className="font-bold text-white">{estimatedMeals} meals</span> to those in need!
                    </p>
                </div>
            )}

            {/* Partners List */}
            <div className="space-y-3">
                {DONATION_PARTNERS.map((partner) => (
                    <div
                        key={partner.id}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${showDetails === partner.id
                                ? 'bg-dark-tertiary/50 border-accent-teal/50'
                                : 'bg-dark-primary border-border-muted hover:border-border-muted/80'
                            }`}
                        onClick={() => setShowDetails(showDetails === partner.id ? null : partner.id)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-dark-tertiary flex items-center justify-center">
                                    {getTypeIcon(partner.type)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-white">{partner.name}</p>
                                        <span className="text-[10px] px-2 py-0.5 bg-dark-tertiary rounded-full text-text-muted">
                                            {getTypeLabel(partner.type)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-text-muted">
                                        <span className="flex items-center gap-1">
                                            <Navigation size={10} />
                                            {partner.distance}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            ⭐ {partner.rating}
                                        </span>
                                        {partner.acceptsToday && (
                                            <span className="text-green-400">● Accepting now</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSchedulePickup(partner);
                                }}
                                disabled={pickupScheduled}
                                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-pink-500/20 transition-all disabled:opacity-50"
                            >
                                Schedule Pickup
                            </button>
                        </div>

                        {/* Expanded Details */}
                        {showDetails === partner.id && (
                            <div className="mt-4 pt-4 border-t border-border-muted grid grid-cols-2 gap-4 text-sm animate-in fade-in slide-in-from-top-2">
                                <div className="flex items-start gap-2">
                                    <MapPin size={14} className="text-text-muted mt-0.5 flex-shrink-0" />
                                    <span className="text-text-muted">{partner.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-text-muted" />
                                    <span className="text-text-muted">{partner.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-text-muted" />
                                    <span className="text-text-muted">{partner.hours}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={14} className="text-text-muted" />
                                    <span className="text-text-muted">{partner.mealsServed} meals served</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Map Link */}
            <a
                href="https://www.google.com/maps/search/food+donation+near+me"
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center justify-center gap-2 p-3 bg-dark-primary rounded-xl border border-border-muted hover:border-accent-teal/50 transition-colors text-text-muted hover:text-accent-teal"
            >
                <MapPin size={16} />
                <span className="text-sm font-medium">View all partners on map</span>
                <ExternalLink size={14} />
            </a>
        </div>
    );
};

export default FoodDonation;
