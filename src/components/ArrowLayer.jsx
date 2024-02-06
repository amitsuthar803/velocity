/* eslint-disable react/prop-types */
import React from "react";
import L from "leaflet";
import { useLeafletContext } from "@react-leaflet/core";

const ArrowLayer = ({ data }) => {
  const context = useLeafletContext();
  console.log(data);

  React.useEffect(() => {
    const arrowLayerGroup = L.layerGroup();

    // Loop through the wind data to create arrows
    data.forEach((arrowData) => {
      const { lat, lon, direction } = arrowData;

      const arrowIcon = L.divIcon({
        className: "arrow-icon",
        iconSize: [20, 20],
        html: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0L20 20H0L10 0Z" transform="rotate(${direction} 10 10)" fill="black"/>
                </svg>`,
      });

      const arrowMarker = L.marker(["18.52", "73.85"], { icon: arrowIcon });

      arrowLayerGroup.addLayer(arrowMarker);
    });

    const container = context.layerContainer || context.map;
    container.addLayer(arrowLayerGroup);

    return () => {
      container.removeLayer(arrowLayerGroup);
    };
  }, [context, data]);

  return null;
};

export default ArrowLayer;
