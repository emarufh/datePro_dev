import {
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Text,
  View,
  // Pressable,
} from 'react-native';
import React from 'react';
import {CheckBadgeIcon} from 'react-native-heroicons/solid';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

let {width, height} = Dimensions.get('window');

export default function DatesCard({item, handleClick}) {
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
    <View className="relative">
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <>
          {item.imageUrls !== '' ? (
            <Image
              source={{uri: item.imageUrls[1]}}
              style={{
                width: width * 0.8,
                height: height * 0.75,
              }}
              resizeMode="cover"
              className="rounded-3xl"
            />
          ) : null}
          {/* <Pressable
            onPress={() =>
              navigation.navigate('SendLike', {
                image: item?.imageUrls[0],
                name: item?.firstName,
                userId: item?.userId,
                likedUserId: item?._id,
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
          </Pressable> */}
        </>
      </TouchableWithoutFeedback>

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

      <View className="absolute bottom-10 justify-start w-full items-start pl-4">
        <View className="flex-row justify-center items-center ">
          <Text className="text-2xl text-white font-bold">
            {item?.firstName}
            {', '}
          </Text>
          <Text className="text-2xl text-white font-bold mr-2">
            {calculateAge(item?.dateOfBirth)}
          </Text>
          <CheckBadgeIcon size={25} color={'#3B82F6'} />
        </View>

        <View className="flex-row justify-center items-center ">
          <Text className="text-lg text-white font-regular">
            {item?.location}
          </Text>
        </View>
      </View>
    </View>
  );
}
