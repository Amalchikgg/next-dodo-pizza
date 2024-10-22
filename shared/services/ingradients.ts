import { Ingradient } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Ingradient[]> => {
  return (await axiosInstance.get<Ingradient[]>(ApiRoutes.INGREDIENTS)).data;
};
