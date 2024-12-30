import { motion } from 'framer-motion';

const DashboardButton = ({ icon: Icon, title, gradient, isActive, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden rounded-xl shadow-lg ${gradient} p-6 cursor-pointer ${
        isActive ? 'ring-4 ring-white ring-opacity-50' : ''
      }`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300" />
      <div className="flex flex-col items-center justify-center space-y-4">
        <Icon className="w-16 h-16 text-white" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
    </motion.div>
  );
};

export default DashboardButton;
