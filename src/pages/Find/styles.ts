import styled from 'styled-components/native';
import Constant from "expo-constants";

import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  background: ${colors.background};
  padding: ${Constant.statusBarHeight + 20}px 24px 40px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Map = styled.View`
  margin: 20px 0;
  background: ${colors.backup1};
  border: 3px solid ${colors.primary};
  border-radius: 8px;
  width: 100%;
  height: 75%;
`;

export const FlatListContainer = styled.View`
  margin: 20px 0;
  width: 100%;
  height: 12%;
`;

export const Filter = styled.TouchableOpacity`
  background: ${colors.primary};
  width: 20%;
  border-radius: 8px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 5px 10px;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100px;
`;

export const FilterText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;