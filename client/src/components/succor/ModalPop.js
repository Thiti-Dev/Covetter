import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';

export default class ModalPop extends Component {
  render() {
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
              style={{
                height: '30%',
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Image
                source={require('../../assets/images/add-item.png')}
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
              }}>
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
