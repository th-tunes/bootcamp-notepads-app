import { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { api } from "../api";
import screens from "../screens.json";
import Toast from "react-native-root-toast";
import { notepadShema } from "../notepadSchema";
import { Formik } from "formik";

const texts = {
  titlePlaceholder: "Digite o título",
  subtitlePlaceholder: "Digite o subtítulo",
  contentPlaceholder: "Digite o contéudo",
  submitSuccess: "Notepad criado com sucesso!",
};

const initilaValues = {
  title: "",
  subtitle: "",
  content: "",
};

const ErrorMessage = styled.Text`
  color: #e74c3c;
`;

const TextField = styled.TextInput`
  border-radius: 12px;
  background-color: white;
  padding: 8px;
  border-width: 1px;
`;

export function CreateNotepadScreen({ navigation, route }) {
  const latitude = route.params?.coords.latitude;
  const longitude = route.params?.coords.longitude;

  async function onSubmit({ title, subtitle, content }) {
    const response = await api.post("/notepads", {
      title,
      subtitle,
      content,
    });

    Toast.show(texts.submitSuccess);
    navigation.navigate(screens.listNotepad);
  }

  return (
    <Formik
      validationSchema={notepadShema}
      onSubmit={onSubmit}
      initialValues={initilaValues}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
        <Container>
          <TextField
            placeholder={texts.titlePlaceholder}
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            value={values.title}
          />
          {errors.title && (
            <ErrorMessage>{errors.title.toString()}</ErrorMessage>
          )}
          <TextField
            placeholder={texts.subtitlePlaceholder}
            onChangeText={handleChange("subtitle")}
            onBlur={handleBlur("subtitle")}
            value={values.subtitle}
          />
          {errors.subtitle && (
            <ErrorMessage>{errors.subtitle.toString()}</ErrorMessage>
          )}
          <TextField
            textAlignVertical="top"
            placeholder={texts.contentPlaceholder}
            multiline
            numberOfLines={5}
            onChangeText={handleChange("content")}
            onBlur={handleBlur("content")}
            value={values.content}
          />
          {errors.content && (
            <ErrorMessage>{errors.content.toString()}</ErrorMessage>
          )}
          {latitude && (
            <TextField value={latitude.toString()} editable={false} />
          )}
          {longitude && (
            <TextField value={longitude.toString()} editable={false} />
          )}
          <Button onPress={handleSubmit}>
            <Text>Enviar</Text>
          </Button>
        </Container>
      )}
    </Formik>
  );
}
