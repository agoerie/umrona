import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const DetailScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Detail Screen</Text>
      <Button title="Go back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailScreen;
