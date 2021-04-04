import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, useColorScheme, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import Box from '../components/box';
import Text from '../components/text';

import Heading from '../components/Heading';
import ListItem from '../components/ListItem';
import ActionButton from '../components/BackButton';
import {Left, Plus, Delete, Save} from '../components/icons';

import theme from '../utils/theme';

import ListService from '../utils/db/lists';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Button from '../components/button';

const DetailView: () => Node = props => {
  const {colors, fontSizes} = theme;
  const {navigation, route} = props;
  const [items, setItems] = useState([]);
  const [listItem, setListItem] = useState({});

  const isFocused = useIsFocused();

  const {params} = route;
  const colorScheme = useColorScheme();

  useEffect(() => {
    let dataList = ListService.find(params.id);
    setListItem(Array.from(dataList)[0]);
    let it = JSON.parse(Array.from(dataList)[0].items);
    setItems(it.sort((a, b) => a.status - b.status));
  }, [isFocused]);

  const toggleStatus = id => {
    let it = items.map(item => {
      if (item.id === id) {
        item.status = !item.status;
      }
      return item;
    });
    setItems(it.sort((a, b) => a.status - b.status));

    ListService.update(listItem, () => {
      listItem.items = JSON.stringify(items);
    });
  };

  const deleteItem = id => {
    const arr = items.filter(x => x.id !== id);
    setItems(arr);
    console.log(items);

    // ListService.update(listItem, () => {
    //   listItem.items = JSON.stringify(items);
    // });
  };

  const renderRightActions = id => {
    return (
      <Box
        px={2}
        flexDirection="row"
        alignItems="center"
        justifyContent="center">
        <Button
          width={50}
          height="70%"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          borderRadius={5}
          bg={colors.red}
          onPress={() => deleteItem(id)}>
          <Delete
            color={colorScheme === 'dark' ? colors.darkBlackText : colors.white}
          />
        </Button>
      </Box>
    );
  };

  return (
    <Box as={SafeAreaView} flex={1} bg={colors.black} p={2}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <ActionButton
            icon={
              <Left
                color={
                  colorScheme === 'dark' ? colors.darkBlackText : colors.white
                }
              />
            }
            onclick={() => navigation.goBack()}
          />
          <Heading title={params.title} />
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <ActionButton
            icon={
              <Plus
                color={
                  colorScheme === 'dark' ? colors.darkBlackText : colors.white
                }
              />
            }
            onclick={() => console.log('Add')}
          />
          <ActionButton
            icon={
              <Save
                color={
                  colorScheme === 'dark' ? colors.darkBlackText : colors.white
                }
              />
            }
            onclick={() => console.log('Save')}
          />
        </Box>
      </Box>

      <Box as={ScrollView} mt={10} pt={10}>
        <Text
          color={colors.white}
          fontSize={fontSizes.h3}
          fontWeight="bold"
          ml={2}
          mb={2}>
          {items.length} Görev
          <Text fontSize={fontSizes.h4} color={colors.gray}>
            {'  -  '}
            {items.filter(x => x.status === true).length} Tamamlanan
          </Text>
        </Text>
        <Box>
          {items.map(data => {
            return (
              <Swipeable
                key={data.id}
                renderRightActions={() => renderRightActions(data.id)}
                // renderLeftActions={renderLeftActions}
              >
                <ListItem
                  text={data.text}
                  status={data.status}
                  id={data.id}
                  statusChange={() => toggleStatus(data.id)}
                />
              </Swipeable>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailView;
