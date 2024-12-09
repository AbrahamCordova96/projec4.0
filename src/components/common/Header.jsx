import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ 
  title, 
  subtitle, 
  icon, 
  gradient = 'from-[#2C3E50] to-[#3498DB]',
  className = '' 
}) => {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <div className={`bg-gradient-to-r ${gradient} py-6 px-4 rounded-lg shadow-lg`}>
        {icon && (
          <FontAwesomeIcon 
            icon={icon} 
            className="text-white/90 text-3xl mb-2" 
          />
        )}
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-white/80 text-sm md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;