import { API } from "@/shared/services/api-client";
import { Ingradient } from "@prisma/client";
import React from "react";
import { useState } from "react";

export const useIngradients = () => {
  const [ingradients, setIngradients] = useState<Ingradient[]>([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    async function fetchIngradients() {
      try {
        setLoading(true);
        const ingradients = await API.ingradients.getAll();
        setIngradients(ingradients);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchIngradients();
  }, []);

  return {
    loading,
    ingradients,
  };
};
