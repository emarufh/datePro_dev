import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';

const ProfessionScreen = () => {
  const navigation = useNavigation();
  const [profession, setProfession] = useState('');

  useEffect(() => {
    getRegistrationProgress('Profession').then(progressData => {
      if (progressData) {
        setProfession(progressData.profession || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (profession.trim() !== '') {
      // Save the current progress data including the name
      saveRegistrationProgress('Profession', {profession});
    }
    // Navigate to the next screen
    navigation.navigate('Education');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 90, marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderColor: 'black',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="bag-add-outline" size={22} color="black" />
          </View>
          <Image
            style={{width: 100, height: 40}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginTop: 15,
          }}>
          What do you do?
        </Text>

        <TextInput
          value={profession}
          onChangeText={text => setProfession(text)}
          autoFocus={true}
          style={{
            width: 340,
            marginVertical: 10,
            fontSize: profession ? 22 : 22,
            marginTop: 45,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            fontFamily: 'GeezaPro-Bold',
          }}
          placeholder="Enter the name of your profession"
          placeholderTextColor={'#BEBEBE'}
        />

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{marginTop: 30, marginLeft: 'auto'}}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color="#000"
            style={{alignSelf: 'center', marginTop: 20}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfessionScreen;
