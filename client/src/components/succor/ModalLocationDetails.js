import React, { Component } from 'react';
import { Text, View, Modal, Image } from 'react-native';
import TextAreaItem from '@ant-design/react-native/lib/textarea-item';
import moment from 'moment';
export default class ModalLocationDetails extends Component {
	constructor(params) {
		super();
		this.state = {
			isVisible: false
		};
	}
	render() {
		const { location_data } = this.props;
		return (
			<Modal animationType="slide" transparent={true} visible={this.props.is_visible}>
				<View
					style={{
						backgroundColor: 'rgba(0,0,0,0.5)',
						flex: 1,
						paddingVertical: 50,
						paddingHorizontal: 20
					}}
				>
					<View
						style={{
							backgroundColor: '#fff',
							flex: 1,
							borderRadius: 10,
							paddingVertical: 20,
							paddingHorizontal: 25
						}}
					>
						<Text style={{ fontSize: 14, textAlign: 'right' }} onPress={() => this.props.on_hiding()}>
							close
						</Text>
						<Text style={{ fontSize: 24 }}>🎉 {location_data ? location_data.description : ''}</Text>
						<View
							style={{
								flex: 1,
								backgroundColor: '#fff',
								justifyContent: 'center',
								alignItems: 'center',
								borderWidth: 0.25,
								marginVertical: 10
							}}
						>
							<Image
								source={
									location_data ? (
										{ uri: location_data.photo_url }
									) : (
										require('../../assets/images/add-item.png')
									)
								}
								style={{ width: '100%', height: '100%' }}
								resizeMode="center"
							/>
						</View>
						<View style={{ flex: 0.2 }}>
							<Text style={{ fontFamily: 'Prompt-Bold' }}>Location</Text>
							<Text>{location_data ? location_data.address : ''}</Text>
						</View>

						<View style={{ flex: 0.2 }}>
							<Text style={{ fontFamily: 'Prompt-Bold' }}>Due</Text>
							<Text>{location_data ? moment(location_data.endAt).endOf('time').fromNow() : ''}</Text>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}
