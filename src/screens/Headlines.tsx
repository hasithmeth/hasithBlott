import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT_FAMILY } from '../assets/fonts';
import { colors } from '../config/colors';
import storageHelper from '../helpers/storageHelper';
import { AuthNavigatorProp } from '../navigation/AuthNavigator';
import api from '../api';
import FastImage from 'react-native-fast-image';
import { convertToDateString } from '../helpers/dateTimeHelper';
import { SCREEN_NAMES } from '../config';

interface IHeadlines {
  navigation: AuthNavigatorProp;
}

const Headlines: React.FC<IHeadlines> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isFocused = useIsFocused();

  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<NewsResponse>([]);
  const [activity, setActivity] = useState<'idle' | 'loading' | 'failed'>(
    'idle',
  );

  const loadUser = async () => {
    const storedUser = await storageHelper.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  };

  const loadData = async () => {
    setActivity('loading');
    try {
      const response = await api.instance.get<NewsResponse>('news', {
        params: {
          category: 'general',
        },
      });

      setData(response.data);
      setActivity('idle');
    } catch (error) {
      setActivity('failed');
    }
  };

  useEffect(() => {
    loadUser();
    if (isFocused) {
      changeNavigationBarColor(colors.black);
      loadData();
    }
  }, [isFocused]);

  const _renderItem = useCallback(
    ({ item }: { item: Headlines }) => {
      const handleURLNavigation = () => {
        navigation.navigate(SCREEN_NAMES.web, { url: item.url });
      };

      return (
        <TouchableWithoutFeedback onPress={handleURLNavigation}>
          <View style={styles.cardContainer}>
            <FastImage source={{ uri: item.image }} style={styles.thumbImage} />
            <View style={styles.detailContainer}>
              <View style={styles.sourceRowContainer}>
                <Text style={styles.sourceText} numberOfLines={1}>
                  {item.source.toUpperCase()}
                </Text>
                <Text style={styles.sourceText} numberOfLines={1}>
                  {convertToDateString(item.datetime)}
                </Text>
              </View>
              <Text
                style={styles.headlineText}
                numberOfLines={3}
                ellipsizeMode={'tail'}>
                {item.headline}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <>
        <StatusBar
          backgroundColor={colors.listBackground}
          barStyle={'light-content'}
        />
        <View
          style={[
            styles.titleBackground,
            {
              width,
              height: Platform.select({
                android: styles.titleBackground.height - 20,
                ios: styles.titleBackground.height,
              }),
            },
          ]}
        />
        <Text
          style={[
            styles.titleText,
            {
              paddingTop: Platform.select({
                android: styles.titleText.paddingTop + 15,
                ios: styles.titleText.paddingTop + insets.top,
              }),
            },
          ]}>{`Hey ${user?.firstName}`}</Text>
        {activity !== 'failed' ? (
          <FlatList
            data={data}
            renderItem={_renderItem}
            keyExtractor={item => item.id.toString()}
            indicatorStyle={'white'}
            refreshControl={
              <RefreshControl
                refreshing={activity === 'loading'}
                onRefresh={loadData}
                title="Pull to refresh"
                tintColor="#fff"
                titleColor="#fff"
              />
            }
          />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={loadData}
                title="Pull to refresh"
                tintColor="#fff"
                titleColor="#fff"
              />
            }>
            <Text style={styles.errorText}>
              {'Something went wrong. Please try again later.'}
            </Text>
          </ScrollView>
        )}
      </>
    </View>
  );
};

export default Headlines;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  titleText: {
    fontFamily: FONT_FAMILY.black900,
    color: colors.white,
    fontSize: 32,
    lineHeight: 35,
    paddingTop: 8,
    marginBottom: 22,
    paddingHorizontal: 16,
  },
  titleBackground: {
    height: 181,
    backgroundColor: colors.listBackground,
    position: 'absolute',
    top: 0,
  },
  headlineText: {
    fontFamily: FONT_FAMILY.medium500,
    color: colors.white,
    fontSize: 20,
    lineHeight: 24,
  },
  thumbImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  sourceText: {
    fontFamily: FONT_FAMILY.rubik400,
    color: colors.white,
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.7,
  },
  sourceRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailContainer: { flex: 1, marginLeft: 16, justifyContent: 'center' },
  errorText: {
    fontFamily: FONT_FAMILY.rubik500,
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
