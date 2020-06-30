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

export const MapContainer = styled.View`
  margin: 20px 0;
  border: 3px solid ${colors.primary};
  border-radius: 8px;
  width: 100%;
  height: 75%;
  overflow: hidden;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  margin: 16px 0 32px;
`;

export const FilterScroll = styled.ScrollView``

interface Filter {
  active: boolean
}

export const Filter = styled.TouchableOpacity<Filter>`
  background: ${props => props.active ? colors.primary : `${colors.primary}aa`};
  height: 100px;
  width: 100px;
  border-radius: 8px;
  padding: 20px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
`;

export const FilterText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;