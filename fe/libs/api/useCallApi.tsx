"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
export default function useCallApi(url: string) {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const fect = async () => {
      //console.log(url);
      try {
        const { data, error, isLoading } = useSWR(url, {
          revalidateOnFocus: false,
          dedupingInterval: 2000,
        });
        console.log(data);
        setdata(data);
        setIsLoading(isLoading);
      } catch (error: any) {
        setError(error.message);
      }
    };
    //
    fect();
  }, [url]);

  return { data, error, isLoading };
}
