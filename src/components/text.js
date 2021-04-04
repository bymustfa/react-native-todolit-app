import {Text as T} from 'react-native';
import styled from 'styled-components';
import {compose, color, size, typography, space, border} from 'styled-system';

const Text = styled(T)(compose(typography, space, color, size, border));

export default Text;
