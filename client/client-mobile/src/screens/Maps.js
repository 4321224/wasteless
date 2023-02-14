import { View, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { db } from "../configs/firebase";
import person from "../../assets/person.png";

export default function Maps() {
  const [takerLoc, setTakerLoc] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);

  const MARKER_PERSON = Image.resolveAssetSource(person).uri;

  async function observer() {
    const docs = db
      .collection("chats")
      .doc("givertaker")
      .collection("location")
      .doc("taker");

    const observer = await docs.onSnapshot(
      (querySnapshot) => {
        setTakerLoc({
          latitude: querySnapshot.data().latitude,
          longitude: querySnapshot.data().longitude,
        });
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }

  useEffect(() => {
    observer();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      } else {
        let location = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 10000,
            distanceInterval: 10,
          },
          (location_update) => {
            setMapRegion({
              latitude: location_update.coords.latitude,
              longitude: location_update.coords.longitude,
            });
          }
        );
      }
    })();
  }, []);

  useEffect(() => {
    console.log(takerLoc, "<<<<<<<<<<<,hoookk");
  }, [takerLoc]);

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
        {takerLoc && (
          <Marker
            coordinate={takerLoc}
            style={{ ...StyleSheet.absoluteFillObject }}
            image={{ uri: MARKER_PERSON }}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
