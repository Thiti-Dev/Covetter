import React, {Component} from 'react';
import {Text, View, Modal, Image} from 'react-native';
import TextAreaItem from '@ant-design/react-native/lib/textarea-item';

export default class ModalLocationDetails extends Component {
  constructor(params) {
    super();
    this.state = {
      isVisible: false,
    };
  }
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isVisible}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            flex: 1,
            paddingVertical: 50,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              flex: 1,
              borderRadius: 10,
              paddingVertical: 20,
              paddingHorizontal: 25,
            }}>
            <Text style={{fontSize: 14, textAlign: 'right'}}>close</Text>
            <Text style={{fontSize: 24}}>🎉 Event</Text>
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.25,
                marginVertical: 10,
              }}>
              <Image
                source={require('../../assets/images/add-item.png')}
                style={{width: '100%', height: '100%'}}
                resizeMode="center"
              />
            </View>
            <View style={{flex: 0.2}}>
              <Text style={{fontFamily: 'Prompt-Bold'}}>Location</Text>
              <Text>aaaaaaaaaaa</Text>
            </View>

            <View style={{flex: 0.2}}>
              <Text style={{fontFamily: 'Prompt-Bold'}}>Due</Text>
              <Text>bbbbbbbbbb</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
