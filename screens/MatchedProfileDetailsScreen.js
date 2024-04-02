import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MatchedProfileDetailsScreen = ({route}) => {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  let images = route?.params?.imageUrls;

  console.log('route?.params?.id: ', route?.params?.id);
  console.log('route?.params?.firstName: ', route?.params?.firstName);
  console.log('route?.params?.imageUrls[0]: ', route?.params?.imageUrls[0]);

  function calculateAge(dateOfBirth) {
    if (!dateOfBirth) return null;

    // Split the date string into day, month, and year
    const parts = dateOfBirth.split('/');
    const dob = new Date(parts[2], parts[1] - 1, parts[0]); // Month is 0-based

    // Calculate the difference in milliseconds between the current date and the date of birth
    const diffMs = Date.now() - dob.getTime();

    // Convert the difference to a Date object
    const ageDate = new Date(diffMs);

    // Extract the year part from the Date object and subtract 1970 to get the age
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    return age;
  }

  const renderImageCarousel = ({item}) => (
    <View
      style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{
          width: '95%',
          resizeMode: 'cover',
          height: 400,
          borderRadius: 10,
        }}
        source={{uri: item}}
      />
      <Text style={{position: 'absolute', top: 10, right: 15, color: 'white'}}>
        {activeSlide + 1}/{images.length}
      </Text>
      <Pressable
        onPress={() =>
          navigation.navigate('SendLike', {
            image: route?.params?.imageUrls[0],
            name: route?.params?.firstName,
            userId: userId,
            likedUserId: route?.params?.id,
          })
        }
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
  );

  return (
    <View style={{marginTop: 35}}>
      <ScrollView>
        <View className="justify-between items-center flex-row w-full pb-2 pl-2">
          <TouchableOpacity
            className="w-2/3 flex-row items-center"
            onPress={() => navigation.navigate('Main')}>
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
                  {route?.params?.firstName}
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

            <View style={{marginTop: 20}}>
              <View>
                {route?.params?.imageUrls.length > 0 && (
                  <View>
                    <Carousel
                      data={images}
                      renderItem={renderImageCarousel}
                      sliderWidth={350}
                      itemWidth={300}
                      onSnapToItem={index => setActiveSlide(index)}
                    />
                  </View>
                )}
              </View>

              <View style={{marginTop: 20}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 8,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: 5,
                      alignItems: 'center',
                      gap: 20,
                      borderBottomWidth: 0.8,
                      borderBottomColor: '#E0E0E0',
                      paddingBottom: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <MaterialCommunityIcons
                        name="cake-variant-outline"
                        size={22}
                        color="black"
                      />
                      <Text style={{fontSize: 15}}>
                        {calculateAge(route?.params?.dateOfBirth)}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Ionicons name="person-outline" size={20} color="black" />
                      <Text style={{fontSize: 15}}>
                        {route?.params?.gender}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Ionicons name="magnet-outline" size={20} color="black" />
                      <Text style={{fontSize: 15}}>{route?.params?.type}</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Octicons name="home" size={20} color="black" />
                      <Text style={{fontSize: 15}}>
                        {route?.params?.hometown
                          ? route?.params?.hometown
                          : 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                      marginTop: 15,
                      borderBottomWidth: 0.8,
                      borderBottomColor: '#E0E0E0',
                      paddingBottom: 10,
                    }}>
                    <Ionicons name="bag-add-outline" size={20} color="black" />
                    <Text>{route?.params?.profession}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                      marginTop: 15,
                      borderBottomWidth: 0.8,
                      borderBottomColor: '#E0E0E0',
                      paddingBottom: 10,
                    }}>
                    <SimpleLineIcons
                      name="graduation"
                      size={22}
                      color="black"
                    />
                    <Text>{route?.params?.education}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                      marginTop: 15,
                      borderBottomWidth: 0.8,
                      borderBottomColor: '#E0E0E0',
                      paddingBottom: 10,
                    }}>
                    <Ionicons name="book-outline" size={20} color="black" />
                    <Text>{route?.params?.religion}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                      marginTop: 15,
                      borderBottomWidth: 0.8,
                      borderBottomColor: '#E0E0E0',
                      paddingBottom: 10,
                    }}>
                    <Ionicons name="home-outline" size={20} color="black" />
                    <Text>{route?.params?.location}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                      marginTop: 15,
                      borderBottomWidth: 0.7,
                      borderBottomColor: '#E0E0E0',
                      paddingBottom: 10,
                    }}>
                    <Feather name="search" size={20} color="black" />
                    <Text>{route?.params?.lookingFor}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MatchedProfileDetailsScreen;
