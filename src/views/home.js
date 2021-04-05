import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, useColorScheme} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import Box from '../components/box';
import Text from '../components/text';

import ActionButton from '../components/BackButton';
import Heading from '../components/Heading';
import Card from '../components/Card';
import {Plus, XCircle} from '../components/icons';

import theme from '../utils/theme';

import ListService from '../utils/db/lists';

const HomeView: () => Node = props => {
  const [lists, setLists] = useState([]);

  const isFocused = useIsFocused();

  const {colors, fontSizes} = theme;
  const {navigation} = props;
  const colorScheme = useColorScheme();

  const getLists = () => {
    let dataList = ListService.findAll();
    setLists(Array.from(dataList));
  };

  useEffect(() => {
    getLists();
  }, [isFocused]);

  return (
    <Box as={SafeAreaView} flex={1} bg={colors.black} p={2}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Heading title="Liste" />
        <ActionButton
          icon={
            <Plus
              color={
                colorScheme === 'dark' ? colors.darkBlackText : colors.white
              }
            />
          }
          onclick={() => navigation.navigate('NewList', {type: 'new'})}
        />
      </Box>

      <Box as={ScrollView} mt={10} pt={10} pb={25}>
        <Box flexDirection="row" flexWrap="wrap">
          {lists.length > 0 ? (
            lists
              .sort((a, b) => b.id - a.id)
              .map(data => {
                let items = JSON.parse(data.items);
                let complete = items.filter(x => x.status === true);
                return (
                  <Card
                    key={data.id}
                    title={data.text}
                    complete={complete.length}
                    total={items.length}
                    colorName={data.colorName}
                    id={data.id}
                    navigation={navigation}
                    deleteFn={() => {
                      ListService.delete(data.id);
                      getLists();
                    }}
                  />
                );
              })
          ) : (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height={200}>
              <Box
                width="100%"
                height={150}
                border={'1px solid ' + colors.gray}
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                borderRadius={10}>
                <Text fontSize={fontSizes.h2} mr={3} color={colors.gray}>
                  Liste Yok
                </Text>
                <XCircle color={colors.gray} />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeView;
