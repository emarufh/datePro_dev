import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';

const ReligionScreen = () => {
  const navigation = useNavigation();
  const [religion, setReligion] = useState('');

  useEffect(() => {
    getRegistrationProgress('Religion').then(progressData => {
      if (progressData) {
        setReligion(progressData.religion || '');
      }
    });
  }, []);

  const handleNext = () => {
    if (religion.trim() !== '') {
      // Save the current progress data including the name
      saveRegistrationProgress('Religion', {religion});
    }
    // Navigate to the next screen
    navigation.navigate('Photos');
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
            <Ionicons name="book-outline" size={22} color="black" />
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
          What's your Religion?
        </Text>

        {/* <TextInput
          value={religion}
          onChangeText={text => setReligion(text)}
          autoFocus={true}
          style={{
            width: 340,
            marginVertical: 10,
            fontSize: religion ? 22 : 22,
            marginTop: 45,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            fontFamily: 'GeezaPro-Bold',
          }}
          placeholder="Enter your religion"
          placeholderTextColor={'#BEBEBE'}
        /> */}

        <View style={{marginTop: 30, flexDirection: 'column', gap: 12}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Islam</Text>
            <Pressable onPress={() => setReligion('Islam')}>
              <FontAwesome
                name="circle"
                size={26}
                color={religion == 'Islam' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Hindu</Text>
            <Pressable onPress={() => setReligion('Hindu')}>
              <FontAwesome
                name="circle"
                size={26}
                color={religion == 'Hindu' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Christianity</Text>
            <Pressable onPress={() => setReligion('Christianity')}>
              <FontAwesome
                name="circle"
                size={26}
                color={religion == 'Christianity' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Buddhist</Text>
            <Pressable onPress={() => setReligion('Buddhist')}>
              <FontAwesome
                name="circle"
                size={26}
                color={religion == 'Buddhist' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
        </View>

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

export default ReligionScreen;
