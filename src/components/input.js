import React, {useState} from 'react';
import {TextInput, useColorScheme} from 'react-native';
import styled from 'styled-components';
import Text from './text';
import {
  compose,
  color,
  size,
  space,
  border,
  flexbox,
  borderRadius,
  position,
} from 'styled-system';
import theme from '../utils/theme';

const InputStyle = styled(TextInput)(
  compose(flexbox, space, border, color, size, borderRadius, position),
);

InputStyle.defaultProps = {
  width: '100%',
  color: theme.colors.white,
  backgroundColor: theme.colors.lightBlack,
  borderRadius: 8,
};

const Input = ({
  placeholder = '',
  value,
  onChangeText,
  height = 50,
  label = '',
  ...props
}) => {
  const colorScheme = useColorScheme();
  const {colors} = theme;

  const [border, setBorder] = useState('none');

  return (
    <>
      {label.length > 0 && (
        <Text
          color={colorScheme === 'dark' ? colors.darkBlackText : colors.white}
          mb={2}>
          {label}
        </Text>
      )}
      <InputStyle
        height={height}
        onChangeText={onChangeText}
        value={value}
        pl={3}
        placeholder={placeholder}
        border={border}
        onFocus={() => setBorder('1px solid ' + colors.gray)}
        onBlur={() => setBorder('none')}
        {...props}
      />
    </>
  );
};

export default Input;
