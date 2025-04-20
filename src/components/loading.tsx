// src/components/Loading.tsx
import React from "react";
import { ClipLoader } from "react-spinners";

interface LoadingProps {
  loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <ClipLoader color="#4c51bf" loading={loading} size={50} />
      </div>
    );
  }

  return null; // When not loading, render nothing
};

export default Loading;
