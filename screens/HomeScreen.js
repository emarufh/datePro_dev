import {
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import 'core-js/stable/atob';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousal from 'react-native-snap-carousel';
import DatesCard from '../components/Datecard';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const android = Platform.OS === 'android';
const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [profilesData, setProfilesData] = useState([]);
  const [userId, setUserId] = useState('');
  const [ownProfile, setOwnProfile] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const showToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('token', token);
  };

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
    if (userId) {
      fetchMatches();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchMatches();
      }
    }, [userId]),
  );

  const getUserDetails = async () => {
    try {
      // Make a GET request to the endpoint with the userId parameter
      const response = await axios.get(`http://10.0.2.2:3000/users/${userId}`);

      // Check if the response contains the user data
      if (response.status === 200) {
        // Extract the user data from the response
        const userData = response.data.user;

        // Handle the user data as needed (e.g., set state, display in UI)
        console.log('User details:', userData);

        setOwnProfile(userData); // Return the user data if needed
      } else {
        console.error('Error fetching user details:', response.data.message);
        return null; // Return null or handle the error appropriately
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
      return null; // Return null or handle the error appropriately
    }
  };

  // console.log('fetchUser: ', ownProfile);
  console.log('Matched profiles: ', profilesData);
  // console.log('profilesID: ', profilesData[1]._id);

  return (
    <>
      <SafeAreaView
        className="bg-white flex-1 justify-between"
        style={{
          paddingTop: android ? hp(2) : 0,
        }}>
        <View className="w-full flex-row justify-between items-center px-4 mb-8">
          <View>
            <Text className="text-xl font-semibold text-center">datePro</Text>
          </View>

          <View className="rounded-full items-center justify-center">
            <Pressable onPress={() => navigation.navigate('Profile')}>
              <Image
                source={{uri: ownProfile?.imageUrls[0]}}
                style={{
                  width: hp(4.5),
                  height: hp(4.5),
                  resizeMode: 'cover',
                }}
                className="rounded-full"
              />
            </Pressable>
          </View>
        </View>

        <View className=" pb-4">
          <View className="mx-4 mb-4">
            <Text className="capitalize text-2xl font-semibold">
              Find your love
            </Text>
          </View>

          <View>
            <Carousal
              data={profilesData}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('MatchedProfileDetails', {
                      id: item?._id,
                      firstName: item?.firstName,
                      email: item?.email,
                      dateOfBirth: item?.dateOfBirth,
                      gender: item?.gender,
                      type: item?.type,
                      location: item?.location,
                      hometown: item?.hometown,
                      education: item?.education,
                      profession: item?.profession,
                      religion: item?.religion,
                      lookingFor: item?.lookingFor,
                      imageUrls: item?.imageUrls,
                    })
                  }>
                  <DatesCard item={item} />
                </TouchableOpacity>
              )}
              firstItem={1}
              inactiveSlideScale={0.86}
              inactiveSlideOpacity={0.6}
              sliderWidth={width}
              itemWidth={width * 0.8}
              slideStyle={{display: 'flex', alignItems: 'center'}}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
