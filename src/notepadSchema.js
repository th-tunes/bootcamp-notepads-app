import * as yup from "yup";

export const notepadShema = yup.object().shape({
  title: yup
    .string()
    .min(4, "O título necessita pelo menos de 4 caracteres")
    .max(20, "o título precisa ter no máximo 20 caracteres")
    .required("o campo título não pode ficar vazio"),
  subtitle: yup
    .string()
    .min(8, "O subtítulo necessita pelo menos de 8 caracteres")
    .max(32, "o subtítulo precisa ter no máximo 32 caracteres")
    .required("o campo subtítulo não pode ficar vazio"),
  content: yup
    .string()
    .min(12, "O contéudo necessita pelo menos de 12 caracteres")
    .max(256, "o contéudo precisa ter no máximo 256 caracteres")
    .required("o campo contéudo não pode ficar vazio"),
});
