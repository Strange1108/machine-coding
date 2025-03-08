import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try{
        const response = await fetch(url);
        if(!response.ok) throw new Error("failed to fetch");
        const result = await response.json();
        setData(result);
      } catch(error) {
        setError(error.message);
      }
      setLoading(false);
    }
    fetchData();
  }, [url])

  return {data, loading, error};
}

const CustomHooks = () => {

  const {data, loading, error} = useFetch("https://jsonplaceholder.typicode.com/posts/1");

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>
  return (
    <div>
      <h1>{data.title}</h1>
      <h1>{data.body}</h1>
    </div>
  )
}

export default CustomHooks
