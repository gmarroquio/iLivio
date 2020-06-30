import styled from 'styled-components/native';
import Constant from 'expo-constants'

import colors from '../../styles/colors'

export const Container = styled.View`
  flex: 1;
  background: ${colors.background};
  justify-content: space-between;
  align-items: center;
  padding: ${Constant.statusBarHeight + 20}px 24px 40px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Img = styled.Image``;

export const Title = styled.Text`
  color: #fff;
  font-size: 96px;
  font-weight: bold;
`;

export const Footer = styled.ImageBackground`
  height:509px;
  width: 447px;
  position: absolute;
  left: 10%;
  top: 50%;
`;

export const Button = styled.TouchableOpacity`
  margin-top: 20px;
  padding: 5px 15px;
  background: ${colors.primary};
  align-items: center;
  border-radius: 8px;
  width: 100%;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 48px;
  font-weight: bold;
`;