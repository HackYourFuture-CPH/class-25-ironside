import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

type MapProps = {
  city: string | null;
};

function Map({ city }: MapProps) {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const apiKey: any = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`,
        );

        const result = response.data.results[0];

        if (result) {
          setCoordinates(result.geometry.location);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }

    fetchCoordinates();
  }, []);
  const isLoading = coordinates.lat === 0 || coordinates.lng === 0;

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {isLoading ? (
        <div className='loading-container'>
          <div className='loading-spinner'></div>
          <div>Loading...</div>
        </div>
      ) : (
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={coordinates}
          defaultZoom={12}
        >
          <Marker lat={coordinates.lat} lng={coordinates.lng} />
        </GoogleMapReact>
      )}
    </div>
  );
}

type MarkerProps = {
  lat: number;
  lng: number;
};

const Marker: React.FC<MarkerProps> = () => (
  <div
    style={{
      position: 'absolute',
      top: '-12px',
      left: '-12px',
      width: '5px',
      height: '5px',
      backgroundColor: 'red',
      borderRadius: '50%',
    }}
  ></div>
);

export default Map;
