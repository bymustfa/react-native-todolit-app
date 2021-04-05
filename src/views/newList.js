import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, useColorScheme} from 'react-native';
import Box from '../components/box';
import Text from '../components/text';

import theme from '../utils/theme';
import ActionButton from '../components/BackButton';
import {Left, Save, Plus, Delete} from '../components/icons';
import Heading from '../components/Heading';
import Input from '../components/input';
import Button from '../components/button';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Toast from 'react-native-simple-toast';

import ListService from '../utils/db/lists';
import ListModel from '../utils/db/models/list.model';
import {useIsFocused} from '@react-navigation/native';

const NewList: () => Node = props => {
  const {colors} = theme;
  const {navigation, route} = props;
  const {params} = route;
  const colorScheme = useColorScheme();
  const [title, setTitle] = useState('');

  const [items, setItems] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log(params);
    if (params.type === 'edit') {
      let dataList = ListService.find(params.id);
      console.log(params.title);
      setTitle(params.title);
      let it = JSON.parse(Array.from(dataList)[0].items);
      setItems(it.sort((a, b) => a.status - b.status));
    }
  }, [isFocused]);

  const handleAddListItem = () => {
    const newItem = [
      ...items,
      ...[
        {
          id: Math.floor(Math.random() * 999),
          text: '',
          status: false,
        },
      ],
    ];
    setItems(newItem);
  };

  const handleSetText = (id, text) => {
    setItems(
      items.map(x => {
        if (id === x.id) x.text = text;
        return x;
      }),
    );
  };

  const renderElement = item => {
    return (
      <Button key={item.id}>
        {/*onPress={() => inputs[item.id].focus()}   pointerEvents="none"*/}
        <Box>
          <Input
            onChangeText={e => handleSetText(item.id, e)}
            value={item.text}
            placeholder="Item"
            mb={2}
          />
        </Box>
      </Button>
    );
  };

  const renderLeftActions = (progress, dragX) => {
    return (
      <Button size={25} bg={colors.green} onPress={() => console.log('delete')}>
        <Text>Ok</Text>
      </Button>
    );
  };
  const renderRightActions = (progress, dragX) => {
    return (
      <Button size={25} bg={colors.red} onPress={() => console.log('delete')}>
        <Text>Delete</Text>
        {/*<Animated.Text*/}
        {/*  style={[*/}
        {/*    styles.actionText,*/}
        {/*    {*/}
        {/*      transform: [{translateX: trans}],*/}
        {/*    },*/}
        {/*  ]}>*/}
        {/*  Archive*/}
        {/*</Animated.Text>*/}
      </Button>
    );
  };

  function getRandomColor() {
    Array.prototype.random = function () {
      return this[Math.floor(Math.random() * this.length)];
    };
    return [
      'green',
      'red',
      'purple',
      'pink',
      'blue',
      'yellow',
      'orange',
    ].random();
  }

  const saveList = () => {
    if (title.length > 0) {
      if (items.length > 0) {
        if (items.filter(x => x.text.trim().length === 0).length === 0) {
          const randomColor = getRandomColor();

          if (params.type === 'new') {
            let save = ListService.save(
              new ListModel(title, false, randomColor, JSON.stringify(items)),
            );
            if (save) {
              Toast.show('İşlem Başarılı');
              navigation.goBack();
            }
          } else {
            console.log('Edit');
            let datas = {title: title, status: false};
            let update = ListService.update(listItem, () => {
              listItem.items = JSON.stringify(items);
            });
          }
        } else {
          Toast.show('Liste Elemnalarını Boş Bırakmayınız');
        }
      } else {
        Toast.show('En Az 1 Adet Liste Öğesi Girin');
      }
    } else {
      Toast.show('Başlık Boş Bırakılamaz');
    }
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
          <Heading title={params.type === 'new' ? 'Yeni Liste' : 'Düzenle'} />
        </Box>
        <ActionButton
          icon={
            <Save
              color={
                colorScheme === 'dark' ? colors.darkBlackText : colors.white
              }
            />
          }
          onclick={() => saveList()}
        />
      </Box>

      <Box mt={10} pt={10} height="93%">
        <Input
          onChangeText={setTitle}
          value={title}
          placeholder="Başlık"
          label="Demo"
        />
        <Box width="100%" height={2} bg={colors.lightBlack} my={3} />

        <Box as={ScrollView} pb={3}>
          {items.map(item => (
            <Swipeable
              key={item.id}
              // renderRightActions={renderRightActions}
              // renderLeftActions={renderLeftActions}
            >
              {renderElement(item)}
            </Swipeable>
          ))}

          <Button
            width="100%"
            border={'2px solid ' + colors.lightBlack}
            borderRadius={10}
            p={3}
            flexDirection="row"
            justifyContent="space-around"
            onPress={() => handleAddListItem()}>
            <Plus
              color={
                colorScheme === 'dark' ? colors.darkBlackText : colors.white
              }
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewList;
