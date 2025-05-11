import React from "react";

interface MetaData {
  name: string;
  value: any;
}

const MetaInfoDiv: React.FC<MetaData> = ({ name, value }) => {
  return (
    <div className="mb-4">
      <h1 className="font-semibold text-gray-400">{name}</h1>
      <div className="text-xl font-medium">{value}</div>
    </div>
  );
};

export default MetaInfoDiv;
