import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';

const HandleLikeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // console.log(route?.params);

  const createMatch = async () => {
    try {
      const currentUserId = route?.params?.userId; // Example currentUserId
      const selectedUserId = route?.params?.selectedUserId; // Example selectedUserId
      const response = await axios.post('http://10.0.2.2:3000/create-match', {
        currentUserId,
        selectedUserId,
      });

      if (response.status === 200) {
        navigation.goBack();
        // Handle success, such as updating UI or showing a success message
      } else {
        console.error('Failed to create match');
        // Handle failure, such as showing an error message
      }
    } catch (error) {
      console.error('Error creating match:', error);
    }
  };

  const match = () => {
    Alert.alert('Accept Request?', `Match with ${route?.params?.name}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: createMatch},
    ]);
    // navigation.goBack()
  };

  return (
    <View style={{marginTop: 35}}>
      <ScrollView>
        <View className="justify-between items-center flex-row w-full pb-2 pl-2">
          <TouchableOpacity
            className="w-2/3 flex-row items-center"
            onPress={() => navigation.navigate('Likes')}>
            <ChevronLeftIcon size={25} color={'black'} strokeWidth={3} />
          </TouchableOpacity>
        </View>

        <View style={{marginHorizontal: 12, marginVertical: 12}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                  {route?.params?.name}
                </Text>
                <View
                  style={{
                    backgroundColor: '#452c63',
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 20,
                  }}>
                  <Text style={{textAlign: 'center', color: 'white'}}>
                    new here
                  </Text>
                </View>
              </View>
            </View>

            <View style={{marginVertical: 15}}>
              <View>
                {route?.params?.imageUrls?.length > 0 && (
                  <View>
                    <Image
                      style={{
                        width: '100%',
                        height: 350,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                      source={{
                        uri: route?.params?.imageUrls[0],
                      }}
                    />
                    <Pressable
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        width: 42,
                        height: 42,
                        borderRadius: 21,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AntDesign name="hearto" size={25} color="#C5B358" />
                    </Pressable>
                  </View>
                )}
              </View>

              {/* profile details to come here */}

              <View>
                {route?.params?.imageUrls?.slice(1, 4).map((item, index) => (
                  <View key={index} style={{marginVertical: 10}}>
                    <Image
                      style={{
                        width: '100%',
                        height: 350,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                      source={{
                        uri: item,
                      }}
                    />

                    <View
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        width: 42,
                        height: 42,
                        borderRadius: 21,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AntDesign name="hearto" size={25} color="#C5B358" />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Pressable
        onPress={match}
        style={{
          position: 'absolute',
          bottom: 45,
          right: 12,
          backgroundColor: 'white',
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons
          name="message-outline"
          size={25}
          color="#C5B358"
        />
      </Pressable>
    </View>
  );
};

export default HandleLikeScreen;
