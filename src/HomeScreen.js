import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  const viewableItems = useSharedValue([]);

  const onViewableItemsChanged = ({viewableItems: vItems}) => {
    viewableItems.value = vItems;
  };

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const dataJson = await response.json();
      setData(dataJson);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const renderItem = useCallback(
    ({item}) => {
      return (
        <Item
          id={item.id}
          title={item.title}
          body={item.body}
          viewableItems={viewableItems}
          onPress={() => navigation.navigate('Detail', {item})}
        />
      );
    },
    [navigation, viewableItems],
  );

  const MemoizedRenderItem = useMemo(() => renderItem, [renderItem]);

  return (
    <View style={styles.container}>
      {data?.length > 0 && (
        <FlatList
          data={data}
          contentContainerStyle={styles.listContainer}
          renderItem={MemoizedRenderItem}
          onViewableItemsChanged={onViewableItemsChanged}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const TruncatedText = ({text, maxLength}) => {
  const truncatedText = useMemo(() => {
    return text.length <= maxLength
      ? text
      : `${text.substring(0, maxLength)}...`;
  }, [text, maxLength]);

  return <Text style={styles.body}>{truncatedText}</Text>;
};

const Item = ({id, title, body, viewableItems, onPress}) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter(item => item.isViewable)
        .find(viewableItem => viewableItem.item.id === id),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.item, rStyle]}>
        <Text style={styles.title}>{title}</Text>
        <TruncatedText text={body} maxLength={60} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 8,
  },
  item: {
    backgroundColor: '#D5B54C',
    padding: 20,
    margin: 8,
  },
  title: {
    fontSize: 24,
  },
  body: {
    fontSize: 16,
  },
});

export default HomeScreen;
