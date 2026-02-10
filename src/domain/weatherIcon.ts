// WMO weather codes: https://open-meteo.com/en/docs

interface WeatherMapping {
	icon: string;
	description: string;
}

const weatherMap: Record<number, WeatherMapping> = {
	0: { icon: 'smiling-sun', description: 'Clear sky' },
	1: { icon: 'smiling-sun', description: 'Mainly clear' },
	2: { icon: 'partly-cloudy-day', description: 'Partly cloudy' },
	3: { icon: 'clouds', description: 'Overcast' },
	45: { icon: 'fog', description: 'Foggy' },
	48: { icon: 'fog', description: 'Foggy' },
	51: { icon: 'rain', description: 'Drizzle' },
	53: { icon: 'rain', description: 'Drizzle' },
	55: { icon: 'rain', description: 'Drizzle' },
	56: { icon: 'rain', description: 'Freezing drizzle' },
	57: { icon: 'rain', description: 'Freezing drizzle' },
	61: { icon: 'rain', description: 'Rainy' },
	63: { icon: 'rain', description: 'Rainy' },
	65: { icon: 'rain', description: 'Rainy' },
	66: { icon: 'rain', description: 'Freezing rain' },
	67: { icon: 'rain', description: 'Freezing rain' },
	71: { icon: 'snow', description: 'Snowy' },
	73: { icon: 'snow', description: 'Snowy' },
	75: { icon: 'snow', description: 'Snowy' },
	77: { icon: 'snow', description: 'Snowy' },
	80: { icon: 'rain', description: 'Rain showers' },
	81: { icon: 'rain', description: 'Rain showers' },
	82: { icon: 'rain', description: 'Rain showers' },
	85: { icon: 'snow-storm', description: 'Snow showers' },
	86: { icon: 'snow-storm', description: 'Snow showers' },
	95: { icon: 'storm', description: 'Thunderstorm' },
	96: { icon: 'storm', description: 'Thunderstorm with hail' },
	99: { icon: 'storm', description: 'Thunderstorm with hail' }
};

const defaultMapping: WeatherMapping = { icon: 'cloud', description: 'Cloudy' };

export function getWeatherIconPath(code: number): string {
	const { icon } = weatherMap[code] ?? defaultMapping;
	return `/Icons8/icons8-${icon}-100.png`;
}

export function getWeatherDescription(code: number): string {
	const { description } = weatherMap[code] ?? defaultMapping;
	return description;
}
