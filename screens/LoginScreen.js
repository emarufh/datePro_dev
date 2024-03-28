import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const route = useRoute();
  console.log(route);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [option, setOption] = useState('Create account');
  const {token, isLoading, setToken} = useContext(AuthContext);

  console.log(token);

  useEffect(() => {
    // Check if the token is set and not in loading state
    if (token) {
      // Navigate to the main screen
      navigation.navigate('MainStack', {screen: 'Main'});
    }
  }, [token, navigation]);

  const signInUser = async () => {
    setOption('Sign In');

    try {
      console.log(email);
      console.log(password);
      const user = {
        email: email,
        password: password,
      };

      const response = await axios.post('http://10.0.2.2:3000/login', user);
      const token = response.data.token;

      // Store the token in AsyncStorage
      await AsyncStorage.setItem('token', token);

      setToken(token);
      // navigation.replace('Main');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 40,
      }}>
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
          }}>
          <Image
            style={{width: 150, height: 80, resizeMode: 'contain'}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/4310/4310217.png',
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 20,
            textAlign: 'center',
            fontSize: 23,
            fontFamily: 'GeezaPro-Bold',
            color: '#000',
            fontWeight: 'bold',
          }}>
          datePro
        </Text>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            marginTop: 25,
            color: 'black',
          }}>
          Log in to your Account
        </Text>
      </View>

      <KeyboardAvoidingView>
        <View style={{marginTop: 40}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#F2F2F2',
              borderRadius: 5,
              marginTop: 30,
            }}>
            <MaterialIcons
              style={{marginLeft: 8}}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Enter your email"
              placeholderTextColor={'gray'}
              style={{
                color: 'black',
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
            />
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                backgroundColor: '#F2F2F2',
                borderRadius: 5,
                marginTop: 30,
              }}>
              <Entypo
                style={{marginLeft: 8}}
                name="lock"
                size={24}
                color="gray"
              />
              <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                placeholder="Enter your password"
                placeholderTextColor={'gray'}
                style={{
                  color: 'black',
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 16 : 16,
                }}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text>Keep me logged in</Text>

            <Text style={{color: '#007FFF', fontWeight: '500'}}>
              Forgot Password
            </Text>
          </View>

          <View style={{marginTop: 40}} />

          <Pressable
            onPress={signInUser}
            style={{
              width: 300,
              backgroundColor: '#000',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
              borderRadius: 30,
              marginTop: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
