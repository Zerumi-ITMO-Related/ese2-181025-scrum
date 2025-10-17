import React, { useEffect, useState } from 'react';
import { Card, LoadingSpinner } from '../components/UIComponents';
import { weatherApi } from '../services/api';
import type { Weather, WeatherCondition } from '../types';
import { Cloud, Wind, Droplets, Eye, Gauge } from 'lucide-react';

export const WeatherPage: React.FC = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeather();
    const interval = setInterval(loadWeather, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const loadWeather = async () => {
    try {
      const response = await weatherApi.getCurrent();
      if (response.data.success && response.data.data) {
        setWeather(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load weather:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: WeatherCondition) => {
    const icons: Record<WeatherCondition, string> = {
      CLEAR: '☀️',
      PARTLY_CLOUDY: '⛅',
      CLOUDY: '☁️',
      RAINY: '🌧️',
      STORMY: '⛈️',
      SNOWY: '🌨️',
      FOGGY: '🌫️',
      WINDY: '💨',
    };
    return icons[condition] || '🌤️';
  };

  const getConditionColor = (condition: WeatherCondition) => {
    const severe = ['STORMY', 'FOGGY', 'SNOWY'];
    const moderate = ['RAINY', 'WINDY', 'CLOUDY'];
    if (severe.includes(condition)) return 'text-red-600 bg-red-50';
    if (moderate.includes(condition)) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!weather) {
    return <div>No weather data available</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Cloud className="text-blue-600" />
          Weather Monitoring
        </h1>
        <p className="text-gray-600 mt-2">Current weather conditions at airport</p>
      </div>

      {/* Main Weather Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className={`lg:col-span-1 ${getConditionColor(weather.condition)}`}>
          <div className="text-center">
            <div className="text-8xl mb-4">{getWeatherIcon(weather.condition)}</div>
            <h2 className="text-3xl font-bold mb-2">{weather.temperature.toFixed(1)}°C</h2>
            <p className="text-xl font-medium">{weather.condition.replace('_', ' ')}</p>
            <p className="text-sm mt-2 opacity-75">
              Last updated: {new Date(weather.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Detailed Conditions</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Wind className="text-blue-600 mt-1" size={24} />
              <div>
                <p className="text-sm text-gray-600">Wind Speed</p>
                <p className="text-2xl font-bold text-gray-900">{weather.windSpeed} km/h</p>
                <p className="text-sm text-gray-500">Direction: {weather.windDirection}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Droplets className="text-blue-600 mt-1" size={24} />
              <div>
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="text-2xl font-bold text-gray-900">{weather.humidity}%</p>
                <p className="text-sm text-gray-500">Precipitation: {weather.precipitation} mm</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Eye className="text-blue-600 mt-1" size={24} />
              <div>
                <p className="text-sm text-gray-600">Visibility</p>
                <p className="text-2xl font-bold text-gray-900">{weather.visibility} km</p>
                <p className="text-sm text-gray-500">
                  {weather.visibility >= 10 ? 'Excellent' : weather.visibility >= 5 ? 'Good' : 'Limited'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Gauge className="text-blue-600 mt-1" size={24} />
              <div>
                <p className="text-sm text-gray-600">Pressure</p>
                <p className="text-2xl font-bold text-gray-900">{weather.pressure} hPa</p>
                <p className="text-sm text-gray-500">Cloud Coverage: {weather.cloudCoverage}%</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Flight Impact Assessment */}
      <Card title="Flight Operations Impact">
        <div className="space-y-4">
          {weather.condition === 'CLEAR' || weather.condition === 'PARTLY_CLOUDY' ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">✓ Optimal flying conditions</p>
              <p className="text-green-700 text-sm mt-1">All operations proceeding normally</p>
            </div>
          ) : weather.condition === 'STORMY' || weather.condition === 'FOGGY' ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium">⚠ Severe weather alert</p>
              <p className="text-red-700 text-sm mt-1">
                Possible flight delays or cancellations. Monitor closely.
              </p>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 font-medium">⚠ Moderate conditions</p>
              <p className="text-yellow-700 text-sm mt-1">
                Minor delays possible. Continue monitoring.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Visibility Status</h4>
              <p className="text-sm text-gray-600">
                {weather.visibility >= 10
                  ? 'No restrictions'
                  : weather.visibility >= 5
                  ? 'Monitor approaches'
                  : 'IFR conditions - extra caution'}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Wind Conditions</h4>
              <p className="text-sm text-gray-600">
                {weather.windSpeed < 20
                  ? 'Safe for all operations'
                  : weather.windSpeed < 40
                  ? 'Crosswind caution advised'
                  : 'High wind warning'}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Precipitation</h4>
              <p className="text-sm text-gray-600">
                {weather.precipitation === 0
                  ? 'Dry conditions'
                  : weather.precipitation < 5
                  ? 'Light precipitation'
                  : 'Heavy precipitation - wet runway'}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
