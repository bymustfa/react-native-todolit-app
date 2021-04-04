import {TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {
  position,
  compose,
  border,
  color,
  size,
  space,
  flexbox,
  layout,
  borderRadius,
} from 'styled-system';

const Button = styled(TouchableOpacity)(
  compose(position, flexbox, border, space, color, size, layout, borderRadius),
);

Button.defaultProps = {
  activeOpacity: 0.9,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
};

export default Button;
