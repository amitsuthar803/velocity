import { useState, useEffect } from "react";
import { MapContainer, LayersControl, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import WindyLayer from "./WindyLayer";

const center = [18.5204, 73.8567];

const Map = () => {
  const [windDirection, setWindDirection] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch weather data
        const response = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?lat=20.5937&lon=78.9629&appid=d909caab5eca45623bcffae8131cd3a0"
        );
        if (response.ok) {
          const data = await response.json();
          // Extract wind direction from the weather data
          const windData = data.wind;
          const direction = windData.deg;
          setWindDirection(direction);
          setWeatherData(data); // Set the entire weather data object
        } else {
          console.error("Failed to fetch weather data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData(); // Fetch weather data when the component mounts

    return () => {
      // Cleanup function
      // You can perform any cleanup here if needed
    };
  }, []);

  return (
    <MapContainer
      className="map-container"
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: "100vh",
      }}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OSM">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>
        {windDirection && weatherData && (
          <LayersControl.Overlay name="Windy Layer">
            <WindyLayer
              data={[
                {
                  startLat: center[0],
                  startLon: center[1],
                  endLat: center[0],
                  endLon: center[1],
                  direction: windDirection,
                },
              ]}
              displayValues={true}
              displayOptions={{
                velocityType: "GBR Wind",
                displayPosition: "bottomright",
                displayEmptyString: "No wind data",
              }}
              windDirection={windDirection}
            />
          </LayersControl.Overlay>
        )}
      </LayersControl>
    </MapContainer>
  );
};

export default Map;
