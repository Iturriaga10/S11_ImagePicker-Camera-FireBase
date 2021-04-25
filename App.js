import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {

  // Set the permission to use the Camera.
  const [hasPermission, setHasPermission] = useState(null);
  // Set if we are using back or front Camera.
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState()

  // Ask and set the permission.
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  

  var camera = null;

  const pickFromCamera = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
    console.log(photo);
    setPreviewVisible(true)
    setCapturedImage(photo)
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref => { camera = ref; }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Button title="camera" onPress={pickFromCamera}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: 300, 
    height:300
  }, 
  text:{
    color: 'blue',
    marginLeft: 10,
    marginTop: 10
  }
});
