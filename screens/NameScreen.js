import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';

const NameScreen = () => {
  const [firstName, setFirstName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Name').then(progressData => {
      if (progressData) {
        setFirstName(progressData.firstName || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (firstName.trim() !== '') {
      // Save the current progress data including the name
      saveRegistrationProgress('Name', {firstName});
    }
    // Navigate to the next screen
    navigation.navigate('Email');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 30, marginHorizontal: 20}}>
        <View style={{marginTop: 30}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              fontFamily: 'GeezaPro-Bold',
            }}>
            What's your name?
          </Text>
          <TextInput
            autoFocus={true}
            value={firstName}
            onChangeText={text => setFirstName(text)}
            style={{
              width: 340,
              marginVertical: 10,
              fontSize: firstName ? 22 : 22,
              marginTop: 25,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingBottom: 10,
              fontFamily: 'GeezaPro-Bold',
            }}
            placeholder="First Name (required)"
            placeholderTextColor={'#BEBEBE'}
          />
          <TextInput
            style={{
              width: 340,
              marginVertical: 10,
              fontSize: firstName ? 22 : 22,
              marginTop: 25,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingBottom: 10,
              fontFamily: 'GeezaPro-Bold',
            }}
            placeholder="Last Name"
            placeholderTextColor={'#BEBEBE'}
          />
          <Text style={{fontSize: 14, color: '#BEBEBE', fontWeight: '500'}}>
            Last name is optional.
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{marginTop: 30, marginLeft: 'auto'}}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color="#581845"
            style={{alignSelf: 'center', marginTop: 20}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NameScreen;

const styles = StyleSheet.create({});
