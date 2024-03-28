import {Pressable, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {ArrowUpRightIcon} from 'react-native-heroicons/outline';

const BasicInfoScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View
        style={{marginTop: 80, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 35,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
            textAlign: 'center',
          }}>
          You're one of a kind.
        </Text>
        <Text
          style={{
            fontSize: 33,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
            marginTop: 10,
            textAlign: 'center',
          }}>
          You're profile should be too.
        </Text>
      </View>

      <View>
        <LottieView
          source={require('../assets/love.json')}
          style={{
            height: 260,
            width: 300,
            alignSelf: 'center',
            marginTop: 40,
            justifyContent: 'center',
          }}
          autoPlay
          loop={true}
          speed={0.7}
        />
      </View>

      <View
        style={{
          padding: 24,
          paddingLeft: 40,
          paddingRight: 40,
          width: '100%',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => navigation.navigate('Name')}
          style={{
            backgroundColor: '#f26322',
            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 16,
            paddingRight: 16,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            width: '45%',
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontWeight: '700',
              fontSize: 15,
              marginRight: 8,
            }}>
            Get Started
          </Text>
          <ArrowUpRightIcon color={'white'} size={20} strokeWidth={2.5} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default BasicInfoScreen;
