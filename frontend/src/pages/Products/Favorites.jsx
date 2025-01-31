import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { motion } from "framer-motion";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animations for child elements
      },
    },
  };

  // Animation variants for each product card
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mt-5 text-center text-slate-800 mb-8"
      >
        Your Favorite Products
      </motion.h1>

      {/* Favorite Products Grid */}
      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-600"
        >
          <p className="text-lg">You have no favorite products yet.</p>
          <p className="text-sm mt-2">
            Start adding your favorites to see them here!
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {favorites.map((product) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }} // Add hover effect
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Product product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Favorites;
