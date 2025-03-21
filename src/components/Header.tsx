import { TextHoverEffect } from './ui/text-hover-effect';
import { MenuItem } from './ui/menu-item';
import { menuItems } from './ui/constants';

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-transparent mx-auto max-w-6xl" style={{ fontSize: '32px' }}>
      <TextHoverEffect text={'中澤'} duration={0} />

      <div className="flex items-center space-x-6">
        {menuItems.map((type, index) => (
          <MenuItem key={index} type={type} />
        ))}
      </div>
    </header>
  );
};