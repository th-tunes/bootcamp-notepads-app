import { useState, useEffect } from "react";
import { api } from "../api";
import { useGlobalStore } from "../useGlobalStore";
import { TextField } from "../components/TextField";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import Toast from "react-native-root-toast";

const texts = {
  submitBtnLabel: "Modificar",
  messageSuccess: "o notepad foi modificado com sucesso!",
};

export function EditNotepadScreen({ navigation, route }) {
  const notepadId = route.params.id;
  const isLoading = useGlobalStore((state) => state.isLoading);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");

  async function loadNotepad() {
    const response = await api.get(`/notepads/${notepadId}`);
    const notepad = response.data;
    setTitle(notepad.title);
    setSubtitle(notepad.subtitle);
    setContent(notepad.content);
  }

  async function onSubmit() {
    const response = await api.patch(`/notepads/${notepadId}`, {
      title,
      subtitle,
      content,
    });
    Toast.show(texts.messageSuccess);
    navigation.goBack();
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotepad();
    });
    return unsubscribe;
  }, [notepadId]);

  return (
    <Container>
      <TextField value={title} onChangeText={setTitle} />
      <TextField value={subtitle} onChangeText={setSubtitle} />
      <TextField value={content} onChangeText={setContent} />
      <Button isLoading={isLoading} onPress={onSubmit}>
        {texts.submitBtnLabel}
      </Button>
    </Container>
  );
}
