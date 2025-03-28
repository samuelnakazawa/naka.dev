export const Tooltip = ({ text }: { text: string }) => {
  return (
    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#c95bf5] text-white text-xs font-medium px-2 py-1 rounded whitespace-nowrap z-10">
      {text}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-l-transparent border-r-transparent border-t-[#c95bf5]"></div>
    </div>
  );
};
