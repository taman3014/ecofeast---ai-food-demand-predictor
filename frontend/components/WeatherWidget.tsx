import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Thermometer, Droplets, Wind } from 'lucide-react';
import { API_BASE } from '../services/authService';

interface WeatherData {
    current: {
        temperature: number;
        humidity: number;
        description: string;
        code: number;
    };
    tomorrow: {
        tempMax: number;
        tempMin: number;
        precipitationChance: number;
        description: string;
        code: number;
    };
}

const WeatherWidget: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch(`${API_BASE}/weather`);
                if (!res.ok) throw new Error('Failed to fetch weather');
                const data = await res.json();
                setWeather(data);
            } catch (err) {
                setError('Unable to load weather');
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    const getWeatherIcon = (code: number, size: number = 24) => {
        if (code === 0 || code === 1) return <Sun size={size} className="text-yellow-400" />;
        if (code >= 2 && code <= 3) return <Cloud size={size} className="text-slate-400" />;
        if (code >= 51 && code <= 82) return <CloudRain size={size} className="text-blue-400" />;
        if (code >= 71 && code <= 77) return <CloudSnow size={size} className="text-blue-200" />;
        if (code >= 95) return <CloudRain size={size} className="text-purple-400" />;
        return <Cloud size={size} className="text-slate-400" />;
    };

    const getDemandImpact = (weather: WeatherData) => {
        const code = weather.tomorrow.code;
        const temp = weather.tomorrow.tempMax;

        if (code >= 61 && code <= 82) {
            return { text: 'Rainy → +15% comfort food demand', color: 'text-blue-400', impact: 'up' };
        }
        if (temp > 35) {
            return { text: 'Hot → +20% cold dishes/drinks', color: 'text-orange-400', impact: 'up' };
        }
        if (temp < 15) {
            return { text: 'Cold → +15% hot soups/warm dishes', color: 'text-cyan-400', impact: 'up' };
        }
        if (code === 0 || code === 1) {
            return { text: 'Clear → Normal demand expected', color: 'text-green-400', impact: 'neutral' };
        }
        return { text: 'Moderate weather → Stable demand', color: 'text-text-muted', impact: 'neutral' };
    };

    if (loading) {
        return (
            <div className="bg-dark-secondary p-4 rounded-2xl border border-border-muted animate-pulse">
                <div className="h-20 bg-dark-tertiary rounded-xl"></div>
            </div>
        );
    }

    if (error || !weather) {
        return (
            <div className="bg-dark-secondary p-4 rounded-2xl border border-border-muted">
                <p className="text-text-muted text-sm">{error || 'Weather unavailable'}</p>
            </div>
        );
    }

    const impact = getDemandImpact(weather);

    return (
        <div className="bg-dark-secondary p-5 rounded-2xl border border-border-muted shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Weather Impact</h3>
                <div className="flex items-center gap-2">
                    {getWeatherIcon(weather.current.code, 20)}
                    <span className="text-white font-bold">{weather.current.temperature}°C</span>
                </div>
            </div>

            <div className="bg-dark-tertiary/50 p-4 rounded-xl mb-4">
                <div className="flex items-center gap-3 mb-3">
                    {getWeatherIcon(weather.tomorrow.code, 32)}
                    <div>
                        <p className="text-white font-bold">Tomorrow</p>
                        <p className="text-text-muted text-sm">{weather.tomorrow.description}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                        <Thermometer size={14} className="text-red-400" />
                        <span className="text-text-muted">High: <span className="text-white font-medium">{weather.tomorrow.tempMax}°C</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Thermometer size={14} className="text-blue-400" />
                        <span className="text-text-muted">Low: <span className="text-white font-medium">{weather.tomorrow.tempMin}°C</span></span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                        <Droplets size={14} className="text-blue-400" />
                        <span className="text-text-muted">Rain chance: <span className="text-white font-medium">{weather.tomorrow.precipitationChance}%</span></span>
                    </div>
                </div>
            </div>

            <div className={`p-3 rounded-xl bg-accent-teal/10 border border-accent-teal/20`}>
                <p className={`text-sm font-medium ${impact.color}`}>
                    🎯 {impact.text}
                </p>
            </div>
        </div>
    );
};

export default WeatherWidget;
