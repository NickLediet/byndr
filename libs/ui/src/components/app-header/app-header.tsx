import React from "react";

export type AppHeaderProps = {
  children ?: React.ReactNode
}


export function AppHeader(props: AppHeaderProps) {
  return (
    <header className="w-full bg-indigo-200 h-14 shadow-lg">
      <div className={`h-full container mx-auto flex items-center`}>
        <h1 className="font-extrabold font-sans text-xl">byndr</h1>
        {props.children}
      </div>
    </header>
  );
}

export default AppHeader;
