import { useCallback, useState } from "react";
import axios from "axios";

const UseHttp = () => {
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  //   sending request
  const sendRequest = useCallback(async (requestConfig, callback) => {
    setIsPending(true);
    setSuccess(null);
    setError(null);
    try {
      const response = await axios({
        url: requestConfig.url,
        method: requestConfig.method || "GET",
        data: requestConfig.data || {},
        headers: requestConfig.headers || {
          accept: "application/json",
          "Content-type": "application/json",
        },
      });

      const data = await response.data;
      setIsPending(false);
      setSuccess(true);
      setError(null);
      callback(data);
    } catch (error) {
      setIsPending(false);
      setSuccess(false);
      console.log(error.response.data);
      setError(error.response.data.message);
    }
  }, []);

  return { isPending, sendRequest, error, success };
};

export default UseHttp;
