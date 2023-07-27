import React, {useEffect, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const DetailScreen = ({route, navigation}) => {
  const {item} = route?.params;

  const textAnimation = useSharedValue(0);

  const startAnimation = useCallback(() => {
    textAnimation.value = withTiming(
      1,
      {duration: 800, easing: Easing.linear},
      () => {
        runOnJS(onAnimationFinish)();
      },
    );
  }, [textAnimation]);

  const onAnimationFinish = () => {
    console.log('Animasi selesai');
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: 100 - 100 * textAnimation.value}],
    };
  });

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, animatedStyles]}>
        {item?.title}
      </Animated.Text>
      <Animated.Text style={[styles.body, animatedStyles]}>
        {item?.body}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
  },
  body: {
    fontSize: 15,
  },
});

export default DetailScreen;
