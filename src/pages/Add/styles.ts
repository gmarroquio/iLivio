import styled from 'styled-components/native';
import Constant from "expo-constants";

import colors from '../../styles/colors';

export const Container = styled.ScrollView`
  flex: 1;
  background: ${colors.background};
  padding: ${Constant.statusBarHeight + 20}px 24px 40px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Img = styled.TouchableOpacity`
  margin: 20px 0;
  background: ${colors.backup2};
  border-radius: 8px;
  width: 100%;
  height: 220px;
`;

export const Map = styled.View`
  margin: 20px 0;
  background: ${colors.backup1};
  border-radius: 8px;
  width: 100%;
  height: 300px;
`;