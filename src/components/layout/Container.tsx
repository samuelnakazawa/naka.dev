export const Container = ({
  children,
  isHomePage,
}: {
  children: React.ReactNode;
  isHomePage?: boolean;
}) => {
  return (
    <div
      className={
        isHomePage
          ? 'max-w-6xl mx-auto px-6 lg:px-8 '
          : 'max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-16'
      }
    >
      {children}
    </div>
  );
};
