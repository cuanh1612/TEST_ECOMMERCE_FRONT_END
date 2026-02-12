import {
  Field,
  Input,
  type InputProps,
} from "@chakra-ui/react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
} & InputProps;

function FormInput({  type = "text", register, error, ...others }: Props) {
  return (
    <Field.Root invalid={!!error}>
      <Input type={type} {...register} {...others}/>
      <Field.ErrorText>
        {error?.message}
      </Field.ErrorText>
    </Field.Root>
  );
}

export default FormInput;