import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-lg">
                <span className="text-white text-xl">🌱</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">EcoFind</h1>
                <p className="text-sm text-gray-400">Reuse • Repair • Reduce</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Join our community in creating a more sustainable world. Find items to reuse, 
              get your broken items repaired, or give away things you no longer need.
            </p>
            <div className="flex space-x-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">♻️</p>
                <p className="text-xs text-gray-400">Eco Friendly</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">🤝</p>
                <p className="text-xs text-gray-400">Community</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">💚</p>
                <p className="text-xs text-gray-400">Sustainable</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/items" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/add" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                  Add Item
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/items?category=electronics" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/items?category=furniture" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                  Furniture
                </Link>
              </li>
              <li>
                <Link to="/items?category=clothing" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/items?category=books" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                  Books
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} EcoFind. Made with 💚 for a sustainable future.
          </p>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm font-medium text-green-400">Join the Movement</p>
              <p className="text-xs text-gray-500">Every item saved makes a difference</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
