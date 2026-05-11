import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map';
import { QuestBooking, QuestLocation } from '../../types/quest';
import { isBookingPlace } from '../../utils';

const defaultCustomIcon = L.icon({
  iconUrl: '/markup/img/svg/pin-default.svg',
  iconSize: [23, 42],
  iconAnchor: [12, 39],
});

const currentCustomIcon = L.icon({
  iconUrl: '/markup/img/svg/pin-active.svg',
  iconSize: [23, 42],
  iconAnchor: [12, 39],
});

type MapProps = {
  questBookingPlaces?: QuestBooking[];
  activePlace: QuestBooking | QuestLocation;
  onActiveBookingPlaceChange?: (arg: QuestBooking) => void;
}

function Map({questBookingPlaces = [], activePlace, onActiveBookingPlaceChange}: MapProps) {
  const mapRef = useRef(null);
  const mapMarkersRef = useRef<L.Marker[]>([]);
  const map = useMap(mapRef, activePlace);

  useEffect(() => {
    if (map && isBookingPlace(activePlace)) {
      mapMarkersRef.current.forEach((marker) => {
        map.removeLayer(marker);
      });
      mapMarkersRef.current = [];

      questBookingPlaces.forEach((place) => {

        const marker = L.marker([place.location.coords[0], place.location.coords[1]], {
          icon: (place.id === activePlace.id ? currentCustomIcon : defaultCustomIcon),
          zIndexOffset: (place.id === activePlace.id ? 1000 : 0)
        }).on('click', () => {
          map.setView(
            {
              lat: place.location.coords[0],
              lng: place.location.coords[1]
            });
          onActiveBookingPlaceChange?.(place);
        });

        marker.addTo(map);
        mapMarkersRef.current.push(marker);
      });
    }
  }, [map, questBookingPlaces, activePlace, onActiveBookingPlaceChange]);

  useEffect(() => {
    if (map && !isBookingPlace(activePlace)) {
      const marker = L.marker([activePlace.coords[0], activePlace.coords[1]], {
        icon: defaultCustomIcon,
      });

      marker.addTo(map);
    }
  }, [map, activePlace]);


  return (
    <div style={{ height: '100%' }} ref={mapRef}></div>
  );
}

export default Map;
