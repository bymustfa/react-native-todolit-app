import React from 'react';
import {SafeAreaView, ScrollView, useColorScheme, View} from 'react-native';
import Box from '../components/box';
import Text from '../components/text';

import Heading from '../components/Heading';
import ListItem from '../components/ListItem';
import ActionButton from '../components/BackButton';
import {Left, Plus} from '../components/icons';

import theme from '../utils/theme';
import demoData from '../utils/demolist';

const DetailView: () => Node = props => {
  const {colors, fontSizes} = theme;
  const {navigation, route} = props;
  const {params} = route;
  const colorScheme = useColorScheme();

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
      </Box>

      <Box as={ScrollView} mt={10} pt={10}>
        <Text
          color={colors.white}
          fontSize={fontSizes.h3}
          fontWeight="bold"
          ml={2}
          mb={2}>
          {demoData.length} Görev
          <Text fontSize={fontSizes.h4} color={colors.gray}>
            {'  -  '}
            {demoData.filter(x => x.status === true).length} Tamamlanan
          </Text>
        </Text>
        <Box>
          {demoData.map(data => {
            return (
              <ListItem
                key={data.id}
                text={data.text}
                status={data.status}
                id={data.id}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailView;
