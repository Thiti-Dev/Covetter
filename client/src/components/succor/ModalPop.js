import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
//
// ─── UTIL ───────────────────────────────────────────────────────────────────────
//
import createFormData from '../../utils/createFormData';
// ────────────────────────────────────────────────────────────────────────────────
export default class ModalPop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      hour: '1',
      staged_image: null,
      staged_image_response: null,
    };
    this.onCommitCharity = this.onCommitCharity.bind(this);
    this.onSelectImageFromLibrary = this.onSelectImageFromLibrary.bind(this);
  }

  async onCommitCharity() {
    const {description, hour, staged_image_response} = this.state;
    const {lat, lng} = this.props.user_position;
    if (!description) {
      // @TODO
      // Show error validation on event name
      throw new Error('Should give the charity event name');
    }
    if (lat != 0 && lng != 0) {
      //Proceed [Location has been sent from parent]
      const _body = createFormData(staged_image_response, {
        lat,
        lng,
        description,
        estimated_hour: hour,
      });
      try {
        const commit_res = await axios.post('/api/succor', _body);
        // If commit success fully
        console.log('committed');
        this.props.on_success(); // re-fetch the location
      } catch (error) {
        // If committing failed
        // @TODO showing error modal
        console.log(error.response.data);
      }
    }
  }

  async onSelectImageFromLibrary() {
    console.log('selecting image');
    const options = {
      title: 'Select Charity Image',
      //customButtons: [ { name: 'fb', title: 'Choose Photo from Facebook' } ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, async response => {
      //console.log('Response = ', response.data);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        this.setState({staged_image: source, staged_image_response: response});
      }
    });
  }
  render() {
    const {description, hour, staged_image} = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <View
            style={{
              width: '85%',
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 10,
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}
              onPress={() => this.props.setIsVisible(false)}>
              <Text style={{padding: 10}}>Close</Text>
            </TouchableOpacity>
            <Text style={{padding: 10, fontSize: 22, fontFamily: 'Promt-Bold'}}>
              📣 ประกาศสถานที่เพื่อการกุศล
            </Text>
            <View
              onStartShouldSetResponder={this.onSelectImageFromLibrary}
              style={{
                height: '30%',
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Image
                source={
                  staged_image || require('../../assets/images/add-item.png')
                }
                style={{
                  height: '100%',
                  width: '100%',
                }}
                resizeMode="center"
              />
            </View>
            <Text
              style={{margin: 10, fontSize: 14, fontFamily: 'Promt-Regular'}}>
              ชื่อกิจกรรม
            </Text>
            <TextInput
              value={description}
              onChangeText={value => this.setState({description: value})}
              placeholder="Enter"
              style={{
                width: '90%',
                padding: 10,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
                borderRadius: 10,
              }}
            />
            <Text
              style={{margin: 10, fontSize: 14, fontFamily: 'Promt-Regular'}}>
              ระยะเวลา(unit : ชม)
            </Text>
            <TextInput
              keyboardType="numeric"
              value={hour}
              onChangeText={value => {
                // embeded validation
                let _value = value;
                if (value.length < 1) {
                  _value = '1';
                } else {
                  _value = value[1];
                }
                this.setState({hour: _value});
              }}
              placeholder="Timer"
              style={{
                width: '90%',
                padding: 10,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
                borderRadius: 10,
                marginTop: 10,
              }}
            />
            <Text
              style={{margin: 10, fontSize: 14, fontFamily: 'Promt-Regular'}}>
              ✏️ กรุณาระบุข้อความและช่วงเวลาของกิจกรรม
            </Text>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={this.onCommitCharity}>
              <Text
                style={{
                  padding: 10,
                  fontSize: 18,
                  color: '#be4038',
                  fontFamily: 'Promt-Bold',
                }}>
                Save
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                margin: 10,
                fontSize: 14,
                fontFamily: 'Promt-Regular',
                color: 'red',
              }}>
              กรุณากรอกข้อมูลตามที่กำหนด {`\n`}
              (รูปภาพกิจกรรม,หัวข้อกิจกรรม,ระยะเวลา)
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
}
