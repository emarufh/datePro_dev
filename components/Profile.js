import {
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Entypo} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import {CheckBadgeIcon} from 'react-native-heroicons/solid';
import {LinearGradient} from 'expo-linear-gradient';

let {width, height} = Dimensions.get('window');

const Profile = ({item}) => {
  //   const [image, setImage] = useState(item.profileImages[1]);
  console.log('ITEMS: ', item);
  // const colors = ["#F0F8FF", "#FFFFFF"];
  // const [liked, setLiked] = useState(false);
  // const [selected, setSelcted] = useState(false);

  // const handleLike = async (selectedUserId) => {
  //   try {
  //     setLiked(true);
  //     await axios.post("http://10.0.2.2:3000/send-like", {
  //       currentUserId: userId,
  //       selectedUserId: selectedUserId,
  //     });

  //     setTimeout(() => {
  //       setProfiles((prevProfiles) =>
  //         prevProfiles.filter((profile) => profile._id !== selectedUserId)
  //       );
  //       setLiked(false);
  //     }, 200);
  //   } catch (error) {
  //     console.log("error liking", error);
  //   }
  // };

  // const handleLikeOther = async (selectedUserId) => {
  //   try {
  //     setSelcted(true);
  //     await axios.post("http://10.0.2.2:3000/send-like", {
  //       currentUserId: userId,
  //       selectedUserId: selectedUserId,
  //     });

  //     setTimeout(() => {
  //       setProfiles((prevProfiles) =>
  //         prevProfiles.filter((profile) => profile._id !== selectedUserId)
  //       );
  //       setSelcted(false);
  //     }, 200);

  //     // Handle success: Perform any UI updates or navigate to another screen
  //   } catch (error) {
  //     console.error("Error liking user:", error);
  //     // Handle error scenarios
  //   }
  // };

  return (
    <View className="relative">
      {/* <Image
        source={{uri: image}}
        style={{
          width: width * 0.8,
          height: height * 0.75,
        }}
        resizeMode="cover"
        className="rounded-3xl"
      /> */}

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '100%',
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
        start={{x: 0.5, y: 0.5}}
        end={{x: 0.5, y: 1}}
      />

      <View className="absolute">
        <View className="flex-row justify-center items-center">
          <Text className="text-2xl text-white font-bold">
            {item?.name}, {item?.age}
          </Text>
          <CheckBadgeIcon size={25} color={'#3B82F6'} />
        </View>
        <View className="flex-row justify-center items-center">
          <Text>
            {item?.city}, {item?.country}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;
