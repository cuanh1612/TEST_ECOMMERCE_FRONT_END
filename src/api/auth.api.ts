import { useMutation } from "@tanstack/react-query";
import axiosClient from './axiosClient'
import type {LoginPayload, LoginResponse, RegisterPayload} from '../types/auth.type'


const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axiosClient.post<LoginResponse>(
    "/auth/login",
    payload
  );
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

const register = async (payload: RegisterPayload): Promise<any> => {
  const response = await axiosClient.post<any>(
    "/auth/register",
    payload
  );
  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};