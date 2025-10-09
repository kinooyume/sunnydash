/**
 * Maps WMO weather codes to Icons8 weather icon paths.
 * See: https://open-meteo.com/en/docs (Weather Code section)
 */
export function getWeatherIconPath(weatherCode: number): string {
	const iconName = getIconName(weatherCode);
	return `/Icons8/icons8-${iconName}-100.png`;
}

function getIconName(code: number): string {
	switch (code) {
		case 0:
		case 1:
			return 'smiling-sun';
		case 2:
			return 'partly-cloudy-day';
		case 3:
			return 'clouds';
		case 45:
		case 48:
			return 'fog';
		case 51:
		case 53:
		case 55:
		case 56:
		case 57:
		case 61:
		case 63:
		case 65:
		case 66:
		case 67:
		case 80:
		case 81:
		case 82:
			return 'rain';
		case 71:
		case 73:
		case 75:
		case 77:
			return 'snow';
		case 85:
		case 86:
			return 'snow-storm';
		case 95:
		case 96:
		case 99:
			return 'storm';
		default:
			return 'cloud';
	}
}
