import L from 'leaflet';
import { useState, useRef, useEffect, MutableRefObject } from 'react';
import { QuestBooking, QuestLocation } from '../types/quest';
import { isBookingPlace } from '../utils';


function useMap(mapRef: MutableRefObject<HTMLElement | null>, place: QuestBooking | QuestLocation): L.Map | null {
  const [map, setMap] = useState<L.Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current && !isRenderedRef.current) {
      const instance = L.map(mapRef.current, {
        center: {
          lat: isBookingPlace(place) ? place.location.coords[0] : place.coords[0],
          lng: isBookingPlace(place) ? place.location.coords[1] : place.coords[1],
        },
        zoom: isBookingPlace(place) ? 10 : 16,
      });

      L
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, map, place]);

  return map;
}

export default useMap;
