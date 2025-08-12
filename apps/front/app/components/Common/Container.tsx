interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Container = ({ children, className = '', id = '' }: Readonly<Props>) => {
  return (
    <div className={`container mx-auto ${className}`} id={id}>
      {children}
    </div>
  );
};

export default Container;
