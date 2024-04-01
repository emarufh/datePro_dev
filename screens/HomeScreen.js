import {Text, View, ScrollView, Pressable, Image} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'core-js/stable/atob';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [profilesData, setProfilesData] = useState([]);
  const [userId, setUserId] = useState('');
  // const [ownProfile, setOwnProfile] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  // console.log('userId', userId);

  const showToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('token', token);
  };

  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentProfile, setCurrentProfile] = useState(profilesData[0]);

  const handleLike = () => {
    // Handle liking the current profile
    // You can implement additional logic here, such as updating the liked profile list
    // For now, just move to the next profile
    navigateToNextProfile();
  };

  const handleCross = () => {
    // Handle crossing the current profile
    // You can implement additional logic here, such as updating the crossed profile list
    // For now, just move to the next profile
    navigateToNextProfile();
  };

  const navigateToNextProfile = () => {
    const nextIndex = currentProfileIndex + 1;
    if (nextIndex <= profilesData.length) {
      setCurrentProfileIndex(nextIndex);
      setCurrentProfile(profilesData[nextIndex]);
      // navigation.navigate('Animation');
    } else {
      // No more profiles to display
      console.log('No more profiles');
    }
  };

  // console.log('next index', currentProfileIndex);

  useEffect(() => {
    showToken();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:3000/matches?userId=${userId}`,
      );
      const matches = response.data.matches;
      setProfilesData(matches);
      // Handle matches in the frontend (display, store in state, etc.)
    } catch (error) {
      console.error('Error fetching matches:', error);
      // Handle error in the frontend
    }
  };

  useEffect(() => {
    // Update currentProfile when profilesData changes
    if (profilesData.length > 0) {
      setCurrentProfile(profilesData[0]);
    }
  }, [profilesData]);

  useEffect(() => {
    if (userId) {
      fetchMatches();
    }
  }, [userId]);

  // useEffect(() => {
  //   if (userId) {
  //     getUserDetails();
  //   }
  // }, [userId]);

  useFocusEffect(
    useCallback(() => {
      console.log('i call');
      if (userId) {
        fetchMatches();
      }
    }, [userId]),
  );

  // function calculateAge(dateOfBirth) {
  //   // Split the date string into day, month, and year
  //   const parts = dateOfBirth.split('/');
  //   const dob = new Date(parts[2], parts[1] - 1, parts[0]); // Month is 0-based

  //   // Calculate the difference in milliseconds between the current date and the date of birth
  //   const diffMs = Date.now() - dob.getTime();

  //   // Convert the difference to a Date object
  //   const ageDate = new Date(diffMs);

  //   // Extract the year part from the Date object and subtract 1970 to get the age
  //   const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  //   return age;
  // }

  // const getUserDetails = async () => {
  //   try {
  //     // Make a GET request to the endpoint with the userId parameter
  //     const response = await axios.get(`http://10.0.2.2:3000/users/${userId}`);

  //     // Check if the response contains the user data
  //     if (response.status === 200) {
  //       // Extract the user data from the response
  //       const userData = response.data.user;

  //       // Handle the user data as needed (e.g., set state, display in UI)
  //       console.log('User details:', userData);

  //       setOwnProfile(userData); // Return the user data if needed
  //     } else {
  //       console.error('Error fetching user details:', response.data.message);
  //       return null; // Return null or handle the error appropriately
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user details:', error.message);
  //     return null; // Return null or handle the error appropriately
  //   }
  // };

  console.log('matches', profilesData);
  console.log(currentProfile?.dateOfBirth);

  return (
    <>
      <ScrollView style={{marginTop: 55}}>
        {/* <View className="rounded-full items-center justify-center">
          <Image
            source={{uri: ownProfile?.imageUrls[0]}}
            style={{
              width: 50,
              height: 50,
              resizeMode: 'cover',
            }}
            className="rounded-full"
          />
        </View> */}
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <Text className="text-2xl font-bold text-center">datePro</Text>
        </View>
        <View style={{marginHorizontal: 12, marginVertical: 12}}>
          <>
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
                    {currentProfile?.firstName}
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

              <View style={{marginVertical: 20}}>
                <View>
                  {currentProfile?.imageUrls?.length > 0 && (
                    <View>
                      <Image
                        style={{
                          width: '100%',
                          height: 350,
                          resizeMode: 'cover',
                          borderRadius: 10,
                        }}
                        source={{
                          uri: currentProfile?.imageUrls[0],
                        }}
                      />
                      <Pressable
                        onPress={() =>
                          navigation.navigate('SendLike', {
                            image: currentProfile?.imageUrls[0],
                            name: currentProfile?.firstName,
                            userId: userId,
                            likedUserId: currentProfile?._id,
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
                  )}
                </View>

                <View style={{marginVertical: 15}}>
                  {currentProfile?.prompts.slice(0, 1).map(prompt => (
                    <>
                      <View
                        key={prompt.id}
                        style={{
                          backgroundColor: 'white',
                          padding: 12,
                          borderRadius: 10,
                          height: 150,
                          justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: 15, fontWeight: '500'}}>
                          {prompt.question}
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '600',
                            marginTop: 20,
                          }}>
                          {prompt.answer}
                        </Text>
                      </View>
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
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 1},
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          // Shadow properties for Android
                          elevation: 5,
                        }}>
                        <AntDesign name="hearto" size={25} color="#C5B358" />
                      </View>
                    </>
                  ))}
                </View>

                {/* profile details */}
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
                        {/* {calculateAge(currentProfile?.dateOfBirth)} */}
                        22
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
                        {currentProfile?.gender}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Ionicons name="magnet-outline" size={20} color="black" />
                      <Text style={{fontSize: 15}}>{currentProfile?.type}</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Octicons name="home" size={20} color="black" />
                      <Text style={{fontSize: 15}}>
                        {currentProfile?.hometown}
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
                    <Text>{currentProfile?.profession}</Text>
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
                    <Text>{currentProfile?.education}</Text>
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
                    <Text>{currentProfile?.religion}</Text>
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
                    <Text>{currentProfile?.location}</Text>
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
                    <Text>{currentProfile?.lookingFor}</Text>
                  </View>
                </View>

                <View>
                  {currentProfile?.imageUrls?.slice(1, 3).map((item, index) => (
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

                      <Pressable
                        onPress={() =>
                          navigation.navigate('SendLike', {
                            image: currentProfile?.imageUrls[index + 1],
                            name: currentProfile?.firstName,
                            userId: userId,
                            likedUserId: currentProfile?._id,
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
                  ))}
                </View>

                <View>
                  {currentProfile?.prompts.slice(1, 2).map(prompt => (
                    <>
                      <View
                        key={prompt.id}
                        style={{
                          backgroundColor: 'white',
                          padding: 12,
                          borderRadius: 10,
                          height: 150,
                          justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: 15, fontWeight: '500'}}>
                          {prompt.question}
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '600',
                            marginTop: 20,
                          }}>
                          {prompt.answer}
                        </Text>
                      </View>
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
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 1},
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          // Shadow properties for Android
                          elevation: 5,
                        }}>
                        <AntDesign name="hearto" size={25} color="#C5B358" />
                      </View>
                    </>
                  ))}
                </View>

                <View>
                  {currentProfile?.imageUrls?.slice(3, 4).map((item, index) => (
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
                      <Pressable
                        onPress={() =>
                          navigation.navigate('SendLike', {
                            image: currentProfile?.imageUrls[index + 3],
                            name: currentProfile?.firstName,
                            userId: userId,
                            likedUserId: currentProfile?._id,
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
                  ))}
                </View>
              </View>
            </View>
          </>
        </View>
      </ScrollView>
      <Pressable
        onPress={handleCross}
        style={{
          position: 'absolute',
          bottom: 15,
          left: 12,
          backgroundColor: 'white',
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Entypo name="cross" size={25} color="#C5B358" />
      </Pressable>
    </>
  );
};

export default HomeScreen;
