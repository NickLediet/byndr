import styles from './app-header.module.scss';

/* eslint-disable-next-line */
export interface AppHeaderProps {
  maxContainerWidth: CSSUnitValue
}

export function AppHeader(props: AppHeaderProps) {
  return (
    <header className="w-full bg-indigo-200 h-14 shadow-lg">
      <div className={`h-full container mx-h-[${props.maxContainerWidth}] mx-auto flex items-center`}>
        <h1 className="font-extrabold font-sans text-xl">byndr</h1>
      </div>
    </header>
  );
}

export default AppHeader;
