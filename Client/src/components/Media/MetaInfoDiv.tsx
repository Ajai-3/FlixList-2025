import React from "react";

interface MetaData {
  name: string;
  value: any;
}

const MetaInfoDiv: React.FC<MetaData> = ({ name, value }) => {
  return (
    <div className="mb-2">
      <h1 className="font-semibold text-md text-gray-400">{name}</h1>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
};

export default MetaInfoDiv;
