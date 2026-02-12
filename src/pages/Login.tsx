import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogin } from "../api/auth.api";
import FormInput from "../components/FormInput";
import { useAuth } from "../contexts/AuthContext";
import type { LoginPayload } from "../types/auth.type";
import { loginSchema } from "../validations/loginSchema";

function Login() {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginPayload) => {
    mutate(data, {
      onSuccess: (data) => {
        setAccessToken(data.access_token);
        navigate("/products");
        toast.success("Login account successfully");
      },
      onError: () => {
        toast.error("Email or password incorrect");
      },
    });
  };

  return (
    <VStack spaceY={5} width={"100%"} alignItems={"start"}>
      <Text maxW={150} textStyle={"3xl"} fontWeight={700}>
        Welcome Back!
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
          </VStack>

          <Button
            loading={isPending}
            type="submit"
            bgColor={"#F83758"}
            width={"100%"}
          >
            Login
          </Button>
        </VStack>
      </form>
      <HStack width={"100%"} justifyContent={"center"}>
        <Text>Create An Account</Text>
        <Link to={"/register"}>
          <Text textDecoration={'underline'} fontWeight={"medium"} color={"red.500"}>
            Sign Up
          </Text>
        </Link>
      </HStack>
    </VStack>
  );
}

export default Login;
