import useFetch from "use-http";
import { useEffect, useState } from "react";

const GetMovieData = (tipo) => {
  const baseURL = `http://ec2-15-229-232-244.sa-east-1.compute.amazonaws.com:25000/${tipo}`;
  const { get, response } = useFetch(baseURL);
  const [data, setData] = useState([]);

  const buscar = async () => {
    const resp = await get();
    console.log(resp);
    if (response.ok) {
      setData(resp);
    } else {
      setData([]);
    }
  };
  useEffect(() => {
    buscar();
  }, []);

  return data;
};

export default GetMovieData;
