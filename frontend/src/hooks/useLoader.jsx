import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function useLoader () {
  const [loading, setLoading] = useState(false);
  return [
    loading ?  
     <ClipLoader
        color={"#007074"}
        loading={loading}
        cssOverride={{
            display: "block",
            margin: "0 auto",
        }}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
    /> 
    : null,
    () => setLoading(true),
    () => setLoading(false),
  ];
};
