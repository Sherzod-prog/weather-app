import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import ForecastPage from './ForecastPage';
import {CityData, ForecastData, HomeProps} from '../types';
import ForecastDailyPage from './ForecastDailyPage';
import MainInfo from './MainInfo';

const API_KEY = '4fdd01106b7a4672a4143403241904';

const Home = ({location}: HomeProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [value, setValue] = useState('');
  const [cityData, setCityData] = useState<CityData[] | []>([]);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [forecastDaily, setForecastDaily] = useState<
    ForecastData['forecast']['forecastday']
  >([]);
  const [forecastHourley, setForecastHourley] = useState<
    ForecastData['forecast']['forecastday'][0]['hour']
  >([]);

  const getSearch = async (txt: string): Promise<void> => {
    setValue(txt);
    try {
      if (txt.length > 2) {
        const {data} = await axios.get<
          CityData[]
        >(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${txt}
  
  `);
        setCityData(data);
      } else {
        setCityData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getForecastDaily = async (text: string): Promise<void> => {
    try {
      const {data} = await axios.get<ForecastData>(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${text}&days=6&aqi=no&alerts=no`,
      );

      setForecastDaily(data?.forecast?.forecastday);
      setForecast(data);
      const timeNum = new Date().getHours() + 1;
      const todayHourley = data.forecast?.forecastday[0].hour.slice(
        timeNum,
        24,
      );
      const tomorrowHourley = data.forecast?.forecastday[1].hour.slice(
        0,
        timeNum,
      );
      setForecastHourley(todayHourley.concat(tomorrowHourley));
      setCityData([]);
      setValue('');
    } catch (error) {
      console.error(error);
    }
  };
  const getForecast = async (
    latitude: number,
    longitude: number,
  ): Promise<void> => {
    try {
      const {data} = await axios.get<ForecastData>(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=6&aqi=no&alerts=no`,
      );

      setForecastDaily(data?.forecast?.forecastday);
      setForecast(data);

      const timeNum = new Date().getHours() + 1;
      const todayHourley = data.forecast?.forecastday[0].hour.slice(
        timeNum,
        24,
      );
      const tomorrowHourley = data.forecast?.forecastday[1].hour.slice(
        0,
        timeNum,
      );
      setForecastHourley(todayHourley.concat(tomorrowHourley));
    } catch (error) {
      console.error(error);
    }
  };

  const textStyle = {
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };

  useEffect(() => {
    if (value) {
      getForecastDaily(value);
    }
    getForecast(location.latitude, location.longitude);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContent}>
        <MaterialCommunityIcons
          style={[textStyle, {paddingLeft: 5}]}
          name="magnify"
          size={20}
        />
        <TextInput
          style={[styles.input, textStyle]}
          placeholder="search..."
          placeholderTextColor={textStyle.color}
          value={value}
          onChangeText={getSearch}
        />
      </View>
      {cityData.length > 2 && (
        <FlatList
          style={styles.searchContent}
          data={cityData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => getForecastDaily(item.name)}>
              <Text style={{padding: 5}}>
                <MaterialCommunityIcons name="map-marker-outline" size={20} />
                {item.name}, {item.country}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      <ScrollView>
        <View style={styles.viewContainer}>
          <Image
            src={`https:` + `${forecast?.current?.condition.icon}`}
            width={100}
            height={100}
          />
          <View style={styles.flex}>
            <Text style={[styles.temp, textStyle]}>
              {Math.round(forecast?.current?.temp_c ?? 0)}°
            </Text>
            <Text style={[textStyle, {fontSize: 16}]}>
              {forecast?.current?.condition.text}
            </Text>
          </View>
          <View style={styles.flex}>
            <Text style={[styles.temp, textStyle]}>
              {forecast?.location?.name}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.contentSun}>
            <MainInfo
              name={'weather-sunset-up'}
              size={30}
              color={textStyle.color}
              text={forecastDaily[0]?.astro?.sunrise}
            />
            <MainInfo
              name={'weather-sunset-down'}
              size={30}
              color={textStyle.color}
              text={forecastDaily[0]?.astro?.sunset}
            />
          </View>
          <View style={styles.contentInfo}>
            <MainInfo
              name={'weather-windy-variant'}
              size={25}
              color={textStyle.color}
              text={`${forecast?.current?.pressure_mb} mb`}
            />
            <MainInfo
              name={'weather-rainy'}
              size={25}
              color={textStyle.color}
              text={`${forecast?.current?.humidity} %`}
            />
            <MainInfo
              name={'weather-windy'}
              size={25}
              color={textStyle.color}
              text={`${forecast?.current?.wind_kph} k/h`}
            />
          </View>
        </View>
        <Text style={[textStyle, {marginLeft: 5, marginTop: 10, fontSize: 18}]}>
          Hourley Forcast
        </Text>
        {forecastHourley && (
          <View style={styles.forecast}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={forecastHourley}
              renderItem={({item}) => (
                <ForecastDailyPage
                  temp={item.temp_c}
                  icon={item.condition.icon}
                  dt={item.time_epoch}
                />
              )}
            />
          </View>
        )}
        <Text style={[textStyle, {marginLeft: 5, marginTop: 10, fontSize: 18}]}>
          3 day Forcast
        </Text>
        {forecastDaily && (
          <View style={styles.forecast}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={forecastDaily}
              renderItem={({item}) => (
                <ForecastPage
                  temp={item.day.avgtemp_c}
                  icon={item.day.condition.icon}
                  dt={item.date_epoch}
                  humidity={item.day.avghumidity}
                />
              )}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `rgba(110,110,110,0.2)`,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 5,
  },
  input: {
    margin: 3,
  },
  searchContent: {
    marginTop: 3,
    position: 'absolute',
    left: 10,
    top: 110,
    backgroundColor: `rgba(110, 110, 110, 0.3)`,
    borderRadius: 20,
    width: '95%',
    zIndex: 10,
  },
  searchItems: {
    flexDirection: 'row',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderColor: 'white',
    verticalAlign: 'middle',
  },
  widthClass: {
    borderBottomWidth: 1,
  },
  content: {
    paddingVertical: 20,
    margin: 10,
    borderRadius: 20,
    backgroundColor: `rgba(110, 110, 110, 0.20)`,
  },
  contentInfo: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 1,
    margin: 2,
  },
  temp: {
    fontSize: 35,
  },
  update: {
    fontSize: 14,
    opacity: 0.5,
    textAlign: 'right',
    paddingTop: 40,
    paddingRight: 20,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'left',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '600',
  },
  icon: {
    textAlign: 'center',

    fontSize: 45,
    marginHorizontal: 5,
  },
  contentSun: {
    flexDirection: 'row',
    gap: 8,
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
  },
  forecast: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
});
