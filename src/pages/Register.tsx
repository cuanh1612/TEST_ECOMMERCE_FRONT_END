import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegister } from "../api/auth.api";
import FormInput from "../components/FormInput";
import type { RegisterPayload } from "../types/auth.type";
import { registerSchema } from "../validations/signupSchema";

function Register() {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: RegisterPayload) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/login");
        toast.success("Register account successfully");
      },
      onError: () => {
        toast.error("An account with this email already exists");
      },
    });
  };

  return (
    <VStack spaceY={5} width={"100%"} alignItems={"start"}>
      <Text maxW={150} textStyle={"3xl"} fontWeight={700}>
        Create an account
      </Text>
      <form
        style={{
          width: "100%",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <VStack spaceY={4} minW={"100%"}>
          <VStack spaceY={2} minW={"100%"}>
            <FormInput
              placeholder="Email"
              type="email"
              register={register("email")}
              error={errors.email}
            />

            <FormInput
              type="password"
              placeholder="Password"
              register={register("password")}
              error={errors.password}
            />

            <FormInput
              type="password"
              placeholder="confirmPassword"
              register={register("confirmPassword")}
              error={errors.confirmPassword}
            />
          </VStack>

          <Button
            loading={isPending}
            type="submit"
            bgColor={"#F83758"}
            width={"100%"}
          >
            Create Account
          </Button>
        </VStack>
      </form>
      <HStack width={"100%"} justifyContent={"center"}>
        <Text>I Already Have an Account</Text>
        <Link to={"/login"}>
          <Text
            textDecoration={"underline"}
            fontWeight={"medium"}
            color={"red.500"}
          >
            Login
          </Text>
        </Link>
      </HStack>
    </VStack>
  );
}

export default Register;
