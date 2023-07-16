import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const Container = ({ children }: IProps) => {
  return <div className="container_custom">{children}</div>;
};

export default Container;
