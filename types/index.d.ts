export interface HomeProps {
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface ForecastData {
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    pressure_mb: number;
    humidity: number;
    wind_kph: number;
  };
  location: {
    name: string;
    country: string;
  };
  forecast: {
    forecastday: {
      date_epoch: number;
      day: {
        avgtemp_c: number;
        condition: {
          icon: string;
        };
        maxwind_mph: number;
        avghumidity: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
      };
      hour: {
        time_epoch: number;
        temp_c: number;
        condition: {
          icon: string;
        };
      }[];
    }[];
  };
}
export interface CityData {
  name: string;
  country: string;
}

export interface ForecastProps {
  temp: number;
  dt: number;
  humidity: number;
  icon: string;
}

export interface ForecastDailyProps {
  temp: number;
  dt: number;
  icon: string;
}
export interface MainInfoProps {
  name: string;
  size: number;
  text: string;
  color: string;
}
