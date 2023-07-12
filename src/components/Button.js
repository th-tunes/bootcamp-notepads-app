import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

const ButtonContainer = styled.TouchableOpacity`
  background-color: yellowgreen;
  border-radius: 8px;
  padding-vertical: 8px;
  padding-horizontal: 16px;
`;

const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
`;



export function Button({ children, onPress, style = {}, isLoading=false }) {
  return (
    <ButtonContainer onPress={onPress} style={style} disabled={isLoading}>
      {isLoading && <ActivityIndicator size={24} color="white" />}
      {!isLoading && <ButtonText>{children}</ButtonText>}
    </ButtonContainer>
  );
}
