import styled from "styled-components/native";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { api } from "../api";
import { Card } from "../components/Card";
import { Title } from "../components/Title";
import { Subtitle } from "../components/Subtitle";
import { Button } from "../components/Button";
import Toast from "react-native-root-toast";
import screens from "../screens.json";

const texts = {
  editBtnLabel: "Editar",
  deleteBtnLabel: "Deletar",
  deleteSuccess: "Notepad deletado com sucesso!",
};

const initialNotepad = {
  id: 0,
  title: "",
  subtitle: "",
  content: "",
  created_at: "",
};

const Container = styled.ScrollView`
  flex: 1;
`;

const ContainerCard = styled(Card)`
  background-color: white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Content = styled.Text`
  font-size: 20px;
  line-height: 27px;
`;

const EditButton = styled(Button)`
  background-color: dimgray;
`;

const DeleteButton = styled(Button)`
  background-color: lightsalmon;
`;

export function ViewNotepadScreen({ navigation, route }) {
  const notepadId = route.params.id;
  const [notepad, setNotepad] = useState(initialNotepad);
  const notepadCreatAt = new Date(notepad.created_at).toLocaleDateString();

  async function loadNotepads() {
    const response = await api.get(`/notepads/${notepadId}`);
    setNotepad(response.data);
  }

  async function onEdit() {
    navigation.navigate(screens.editNotepad, {
      id: notepadId,
    });
  }

  async function onDelete() {
    const response = await api.delete(`/notepads/${notepadId}`);
    Toast.show(texts.deleteSuccess);
    navigation.navigate(screens.listNotepad);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotepads();
    });
    return unsubscribe;
  }, [notepadId]);

  return (
    <Container>
      <ContainerCard>
        <Text>#{notepad.id}</Text>
        <Text>{notepadCreatAt}</Text>
        <Title>{notepad.title}</Title>
        <Subtitle>{notepad.subtitle}</Subtitle>
        <Content>{notepad.content}</Content>
        {notepad.latitude && notepad.longitude && (
          <>
            <Text>Latitude: {notepad.latitude}</Text>
            <Text>Longitude: {notepad.longitude}</Text>
          </>
        )}
        <EditButton onPress={onEdit}>{texts.editBtnLabel}</EditButton>
        <DeleteButton onPress={onDelete}>{texts.deleteBtnLabel}</DeleteButton>
      </ContainerCard>
    </Container>
  );
}
