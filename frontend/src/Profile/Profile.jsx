import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetItemsQuery } from "../store/apiSlice";

export default function Profile() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("overview");
  const { data: allItems = [] } = useGetItemsQuery();

  const userItems = useMemo(() => {
    return allItems.filter((item) => item.owner?._id === user?._id);
  }, [allItems, user]);

  const itemStats = useMemo(() => {
    return {
      total: userItems.length,
      repairRequests: userItems.filter(
        (item) => item.mode === "repair-request"
      ).length,
      freeOffers: userItems.filter((item) => item.mode === "offer-free").length,
      open: userItems.filter((item) => item.status === "open").length,
      inProgress: userItems.filter(
        (item) => item.status === "in-progress"
      ).length,
      completed: userItems.filter((item) =>
        ["fixed", "taken"].includes(item.status)
      ).length,
    };
  }, [userItems]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please sign in to view your profile.</p>
          <Link to="/auth/login" className="text-green-600 hover:text-green-500">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "items", name: "My Items", icon: "📦" },
    { id: "settings", name: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="px-6 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {user.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <span>📧</span>
                    <span>{user.email}</span>
                  </div>
                  {user.city && (
                    <div className="flex items-center space-x-1">
                      <span>📍</span>
                      <span>{user.city}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <span>{user.userType === "repairer" ? "🔧" : "👤"}</span>
                    <span className="capitalize">{user.userType}</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {user.ecoPoints || 0}
                  </div>
                  <div className="text-sm text-green-700">Eco Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Dashboard
                  </h2>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {itemStats.total}
                      </div>
                      <div className="text-sm text-blue-700">Total Items</div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-orange-600">
                        {itemStats.repairRequests}
                      </div>
                      <div className="text-sm text-orange-700">Repair Requests</div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-600">
                        {itemStats.freeOffers}
                      </div>
                      <div className="text-sm text-purple-700">Free Offers</div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600">
                        {itemStats.completed}
                      </div>
                      <div className="text-sm text-green-700">Completed</div>
                    </div>
                </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                      to="/add"
                      className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors duration-200 text-center group"
                    >
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                        📝
                      </div>
                      <div className="font-medium text-gray-900">Add New Item</div>
                      <div className="text-sm text-gray-600">
                        Share something to repair or give away
                      </div>
                    </Link>

                    <Link
                      to="/items"
                      className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 text-center group"
                    >
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                        🔍
                      </div>
                      <div className="font-medium text-gray-900">Browse Items</div>
                      <div className="text-sm text-gray-600">
                        Find items to repair or take
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Recent Items */}
                {userItems.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Recent Items
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userItems.slice(0, 4).map((item) => (
                        <Link
                          key={item._id}
                          to={`/items/${item._id}`}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex space-x-3">
                            {item.images && item.images.length > 0 ? (
                              <img
                                src={`http://localhost:5000${item.images[0]}`}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400 text-2xl">📦</span>
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 truncate">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-600 truncate">
                                {item.description}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                    item.status === "open"
                                      ? "bg-green-100 text-green-800"
                                      : item.status === "in-progress"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Items Tab */}
            {activeTab === "items" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    My Items ({userItems.length})
                  </h2>
                  <Link
                    to="/add"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Add New Item
                  </Link>
                </div>

                {userItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No items yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start by adding your first item to share with the community.
                    </p>
                    <Link
                      to="/add"
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                    >
                      Add First Item
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userItems.map((item) => (
                      <Link
                        key={item._id}
                        to={`/items/${item._id}`}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="aspect-square overflow-hidden rounded-lg mb-3">
                          {item.images && item.images.length > 0 ? (
                            <img
                              src={`http://localhost:5000${item.images[0]}`}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400 text-4xl">📦</span>
                            </div>
                          )}
                        </div>

                        <h3 className="font-medium text-gray-900 truncate">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 truncate mb-2">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                              item.status === "open"
                                ? "bg-green-100 text-green-800"
                                : item.status === "in-progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : item.status === "fixed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.status}
                          </span>

                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                              item.mode === "repair-request"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {item.mode === "repair-request" ? "🔧" : "🎁"}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Account Settings
                </h2>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Profile Information
                        </h3>
                        <p className="text-sm text-gray-600">
                          Update your personal information
                        </p>
                      </div>
                      <button className="text-green-600 hover:text-green-500 text-sm font-medium">
                        Edit
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Email Preferences
                        </h3>
                        <p className="text-sm text-gray-600">
                          Manage your notification settings
                        </p>
                      </div>
                      <button className="text-green-600 hover:text-green-500 text-sm font-medium">
                        Manage
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Privacy & Security
                        </h3>
                        <p className="text-sm text-gray-600">
                          Control your privacy settings
                        </p>
                      </div>
                      <button className="text-green-600 hover:text-green-500 text-sm font-medium">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
