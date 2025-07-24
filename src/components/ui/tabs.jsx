import React from "react";

export function Tabs({ defaultValue, children, className }) {
  const [value, setValue] = React.useState(defaultValue);
  const context = { value, setValue };

  return (
    <div className={className}>
      <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
    </div>
  );
}

const TabsContext = React.createContext();

export function TabsList({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value, children }) {
  const { value: current, setValue } = React.useContext(TabsContext);
  const isActive = current === value;

  return (
    <button
      onClick={() => setValue(value)}
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
      } transition`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  const { value: current } = React.useContext(TabsContext);
  return current === value ? <div>{children}</div> : null;
}
