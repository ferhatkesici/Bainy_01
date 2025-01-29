import { colors, commonStyles } from '../styles/colors';
import { gradients } from '../styles/gradients';

const SomeComponent = () => {
  return (
    <div className={`bg-gradient-to-b ${gradients.primary}`}>
      <button 
        style={{ backgroundColor: colors.primary.main }}
        className="hover:bg-[colors.primary.hover]"
      >
        Tıkla
      </button>
    </div>
  );
}; 