export const Tooltip = ({
  text,
  position = 'top',
}: {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}) => {
  const tooltipPosition = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 translate-y-3',
    left: 'right-full top-1/2 transform translate-x-2 -translate-y-1/2',
    right: 'left-full top-1/2 transform -translate-x-2 -translate-y-1/2',
  };

  const arrowPosition = {
    top: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-l-4 border-r-4 border-b-0 border-t-4 border-l-transparent border-r-transparent border-t-[#c95bf5]',
    bottom:
      'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-l-4 border-r-4 border-t-0 border-b-4 border-l-transparent border-r-transparent border-b-[#c95bf5]',
    left: 'right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-t-4 border-b-4 border-r-0 border-l-4 border-t-transparent border-b-transparent border-l-[#c95bf5]',
    right:
      'left-0 top-1/2 transform -translate-x-full -translate-y-1/2 border-t-4 border-b-4 border-l-0 border-r-4 border-t-transparent border-b-transparent border-r-[#c95bf5]',
  };

  return (
    <div
      className={`absolute ${tooltipPosition[position]} bg-[#c95bf5] text-white text-xs font-medium px-2 py-1 rounded whitespace-nowrap z-10`}
    >
      {text}
      <div className={`absolute ${arrowPosition[position]} w-0 h-0`}></div>
    </div>
  );
};
