import { useState, useEffect } from 'react';

interface TickerInfo {
  location: string;
  date: string;
  time: string;
}

export function useTickerInfo() {
  const [tickerInfo, setTickerInfo] = useState<TickerInfo>({
    location: 'Detecting location...',
    date: '',
    time: ''
  });

  useEffect(() => {
    // Get location using HTML5 Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Reverse geocoding to get city name
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const city = data.city || data.locality || 'Unknown Location';
            const country = data.countryName || '';
            setTickerInfo(prev => ({
              ...prev,
              location: country ? `${city}, ${country}` : city
            }));
          } catch {
            setTickerInfo(prev => ({
              ...prev,
              location: 'Location unavailable'
            }));
          }
        },
        () => {
          setTickerInfo(prev => ({
            ...prev,
            location: 'Location access denied'
          }));
        }
      );
    } else {
      setTickerInfo(prev => ({
        ...prev,
        location: 'Geolocation not supported'
      }));
    }

    // Update date and time
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      };
      const timeOptions: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      };
      
      setTickerInfo(prev => ({
        ...prev,
        date: now.toLocaleDateString('en-US', dateOptions),
        time: now.toLocaleTimeString('en-US', timeOptions)
      }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return tickerInfo;
}
