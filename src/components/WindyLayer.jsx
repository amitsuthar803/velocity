/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import L from "leaflet";

const WindyLayer = ({ data }) => {
  const context = useLeafletContext();

  useEffect(() => {
    const windLayerGroup = L.layerGroup();

    // Loop through the wind data to create lines representing wind flow
    data.forEach((windData) => {
      const { startLat, startLon, endLat, endLon, direction } = windData;

      // Calculate the coordinates for the line representing wind flow
      const lineCoordinates = [
        [startLat, startLon],
        [endLat, endLon],
      ];

      // Create a polyline with the line coordinates
      const windFlowLine = L.polyline(lineCoordinates, {
        color: "red", // Change color as needed
        weight: 2, // Change weight as needed
        opacity: 1, // Change opacity as needed
      });

      // Add the wind flow line to the layer group
      windLayerGroup.addLayer(windFlowLine);
    });

    // Add the wind layer group to the map
    const container = context.layerContainer || context.map;
    container.addLayer(windLayerGroup);

    // Cleanup function to remove the wind layer group when component unmounts
    return () => {
      container.removeLayer(windLayerGroup);
    };
  }, [context, data]);

  return null;
};

export default WindyLayer;
