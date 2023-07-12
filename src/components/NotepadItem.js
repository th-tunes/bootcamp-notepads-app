import styled from "styled-components/native";
import { Text, TouchableOpacity } from "react-native";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";

const Container = styled.View`
  background-color: white;
  padding-horizontal: 16px;
  padding-vertical: 16px;
  margin-bottom: 15px;
  border-radius: 10px;
`;

const NotepadDate = styled.Text`
    line-height: 27px;
`;

export function NotepadItem({ title, subtitle, created_at, onPress }) {
  const notepadCreatAt = new Date(created_at).toLocaleDateString();
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <NotepadDate>{notepadCreatAt}</NotepadDate>
      </Container>
    </TouchableOpacity>
  );
}
