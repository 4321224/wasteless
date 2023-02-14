import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

export default function MapDirection() {
  const GOOGLE_MAPS_APIKEY = "AIzaSyCVVWasvqI_muG_92Mdo63Ik14SZ6bLlCo";

  const [mapRegion, setmapRegion] = useState(null);

  useEffect(() => {
    (async () => {
      //   console.log("masuk");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setmapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{ ...StyleSheet.absoluteFillObject }}
        showsUserLocation={true}
        followUserLocation={true}
        loadingEnabled={true}
        region={{
          ...mapRegion,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapViewDirections
          origin={mapRegion}
          destination={{ latitude: -6.2492354, longitude: 106.8247462 }}
          apikey={GOOGLE_MAPS_APIKEY}
          mode="DRIVING"
          strokeColor="#339966"
          strokeWidth={4}
        />
        <Marker
          coordinate={{ latitude: -6.2492354, longitude: 106.8247462 }}
          style={{ ...StyleSheet.absoluteFillObject }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
