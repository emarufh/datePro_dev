import React from 'react';
import {View, Text, Button} from 'react-native';

const MatchedProfileDetails = ({profile, goBack}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
      <Text style={{color: 'white', position: 'absolute'}}>
        Name: {profile.name}
      </Text>

      <Button title="Go Back" onPress={goBack} />
    </View>
  );
};

export default MatchedProfileDetails;
