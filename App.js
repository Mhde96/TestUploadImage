
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
  Image,
  Platform
} from 'react-native';
import axios from 'axios'
import RNFetchBlob from 'rn-fetch-blob'
import ImagePicker from 'react-native-image-picker';

const App = () => {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGFuc2tlY2xvdWRkZW1vLmNvbVwvYXBpXC9sb2dpbiIsImlhdCI6MTU5NzE1NzMxNSwiZXhwIjoxNTk3MjQzNzE1LCJuYmYiOjE1OTcxNTczMTUsImp0aSI6IlZjdjFyeFhhTkpQRlRJM2ciLCJzdWIiOjYsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.K9iEBL0v3-mr-wcD1-A4EREIZYw7L6jFKwnX_1rDluI'
  const URL_File_Add = 'https://danskeclouddemo.com/api/' + 'file';

  const [data, setData] = useState({

    imgProfileFile: {},

  })

  //Image Picker

  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const loadImg = async () => {
    ImagePicker.showImagePicker(options, async (response) => {


      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        await setData({ ...data, imgProfileFile: { ...response } });
        // addImage(token, response)
      }
    });
  }


  const addImage = (token, paramfile) => {
    console.log(paramfile);
    let file = new FormData();
    file.append('file', {
      type: 'image/jpg',
      uri: paramfile.uri,
      name: 'imagasde.jpg',
    })
    file.append('submint', 'ok')
    // formData.append('type', 'image/jpeg');
    // formData.append('date', file.data);
    // formData.append('name', 'image.jpg');
    console.log(token)
    const config = {
      Authorization: `Bearer ${token}`,
    }
    axios({
      method: 'post',
      url: URL_File_Add,
      headers: config,
      data: file
    })
      .then(function (response) {
        console.log('axios ==========>', response)
      }).catch(function (error) {
        console.log('error  axios ==========>', error.response)
      })

    fetch(
      URL_File_Add, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,

      }),
      method: 'post',
      body: file,
    }
    ).then(response => response.json())
      .then(response => {
        console.log('fetch', response)
      }).catch((error) => {
        console.log('fetch error ', error)
      })

      console.log('hi');

    // RNFetchBlob.fetch(
    //   'POST',
    //   URL_File_Add,
    //   {
    //     Authorization: `Bearer ${token}`,
    //     otherHeader: 'foo'
    //   },
    //   [{ name: 'avatar-png', filename: 'avatar-png.jpeg"', type: 'image/jpeg"', data: paramfile.data }]

    // ).then((resp) => {
    //   console.log('RNFetchBlob ==========>', resp)
    // }).catch((err) => {
    //   console.log('error RNFetchBlob ==========>', err.response)
    // })
  }

  // looool


  return (
    <>
      <View>
        <Image style={{

          width: 125,
          height: 125,
          borderRadius: 150,
          borderColor: 'black', borderWidth: 1,
          alignItems: 'center', justifyContent: 'center'
        }} source={{ uri: data.imgProfileFile.uri }} />

        <TouchableOpacity
          onPress={() => {
            loadImg();
          }}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            height: 40,
            width: 40,
            borderRadius: 150,
            backgroundColor: 'white',
            borderWidth: 1,
            borderStyle: 'dashed',
            zIndex: 5,
            alignItems: 'center',
            justifyContent: 'center'
          }} >
          <View
            style={{
              backgroundColor: 'gray',
              width: 30,
              height: 30,
              borderRadius: 30
            }}
          />
        </TouchableOpacity>
        <Button title={'send image'} onPress={() => addImage(token, data.imgProfileFile)} />

      </View>

    </>
  );
};

export default App;

