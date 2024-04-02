import {Text, View, SafeAreaView, Image, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import 'core-js/stable/atob';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {CheckBadgeIcon} from 'react-native-heroicons/solid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {jwtDecode} from 'jwt-decode';

const ProfileScreen = () => {
  const navigation = useNavigation();
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

  const [currentProfile, setCurrentProfile] = useState(null);

  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
  }, [userId]);

  const {token, isLoading, setToken} = useContext(AuthContext);

  // console.log(token);

  useEffect(() => {
    // Check if the token is set and not in loading state
    if (!token) {
      // Navigate to the main screen
      navigation.navigate('AuthStack', {screen: 'Login'});
    }
  }, [token, navigation]);

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

        setCurrentProfile(userData); // Return the user data if needed
      } else {
        console.error('Error fetching user details:', response.data.message);
        return null; // Return null or handle the error appropriately
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
      return null; // Return null or handle the error appropriately
    }
  };

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('AuthToken cleared successfully');

      setToken('');
      // Perform any necessary actions after clearing the authToken
    } catch (error) {
      console.error('Failed to clear AuthToken:', error);
    }
  };

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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', paddingTop: 70}}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              resizeMode: 'cover',
              borderColor: '#662d91',
              borderWidth: 3,
              alignSelf: 'center',
            }}
            source={{
              uri: currentProfile?.imageUrls[0],
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginTop: 12,
          }}>
          <Text style={{fontSize: 24, fontWeight: '600'}}>
            {currentProfile?.firstName}
            {','}
          </Text>
          <Text style={{fontSize: 24, fontWeight: '600'}}>
            {calculateAge(currentProfile?.dateOfBirth)}
          </Text>
          <CheckBadgeIcon size={25} color={'#3B82F6'} />
        </View>
      </View>

      <View style={{marginTop: 30, marginHorizontal: 20}}>
        <Image
          style={{height: 250, width: '100%', borderRadius: 10}}
          source={{
            uri: 'https://images.pexels.com/photos/326612/pexels-photo-326612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
        />
      </View>

      <Pressable
        onPress={() =>
          navigation.navigate('ProfileDetails', {
            currentProfile: currentProfile,
          })
        }
        style={{
          borderColor: '#000',
          marginTop: 70,
          padding: 12,
          borderRadius: 30,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: 120,
        }}>
        <Text style={{textAlign: 'center', fontWeight: '600'}}>
          See Details
        </Text>
      </Pressable>

      <Pressable
        onPress={logout}
        style={{
          borderColor: 'red',
          marginTop: 40,
          padding: 12,
          borderRadius: 30,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: 120,
        }}>
        <Text style={{textAlign: 'center', fontWeight: '600'}}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;
