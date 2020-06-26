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

export const Img = styled.TouchableOpacity`
  margin-top: 20px;
  background: ${colors.secondary};
  border-radius: 8px;
  width: 100%;
  height: 220px;
`;

export const Options = styled.View`
  margin-top: 20px;
  width: 100%;
  background: ${colors.primary};
  border-radius: 8px;
  padding: 5px 10px;
`

export const Option = styled.View`
  margin: 5px 0;
  padding: 5px;
  align-items: center;
  background: ${colors.background};
  border-radius: 8px;
`

export const OptionText = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
`

export const PriceWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  background: ${colors.primary};
  border-radius: 8px;
  margin-top: 20px;
  align-items: center;
`;

export const Currency = styled.Text`
  background: #0006;
  padding: 10px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  color: #fff;
  font-size: 18px;
  margin-right: 10px;
  font-weight: bold;
`;

export const Price = styled.Text`
  flex: 1;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

export const Name = styled.Text`
  background: ${colors.primary};
  border-radius: 8px;
  margin-top: 20px;
  padding: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;

export const Rating = styled.Text`
  background: ${colors.primary};
  border-radius: 8px;
  margin-top: 20px;
  padding: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  `;