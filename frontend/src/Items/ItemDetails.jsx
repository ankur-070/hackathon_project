import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetItemByIdQuery, useGetCommentsQuery, useAddCommentMutation, useUpdateItemMutation } from '../store/apiSlice';

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { data: item, error: itemError, isLoading: itemLoading } = useGetItemByIdQuery(id);
  const { data: comments = [] } = useGetCommentsQuery(id);
  const [addComment, { isLoading: commentLoading }] = useAddCommentMutation();
  const [updateItem] = useUpdateItemMutation();

  const isOwner = user && item && item.owner && item.owner._id === user._id;

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    try {
      await addComment({ itemId: id, content: comment }).unwrap();
      setComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateItem({ id, status: newStatus }).unwrap();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (itemLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (itemError || !item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Item not found</h2>
          <p className="text-gray-600 mb-4">The item you're looking for doesn't exist or has been removed.</p>
          <Link to="/items" className="text-green-600 hover:text-green-500">
            ← Back to items
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-green-600 hover:text-green-500 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to items
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {item.images && item.images.length > 0 ? (
                <div>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={`http://localhost:5000${item.images[currentImageIndex]}`}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMTM1IDE4MEM1IDI4MCAyNzUgMjgwIDE0NSAxODBaIiBmaWxsPSIjOUNBM0FGIi8+PHBhdGggZD0iTTE3NSAxNjBDMTc1IDEzNS44IDE5My44IDExNyAyMTggMTE3UzI2MSAxMzUuOCAyNjEgMTYwQzI2MSAxODQuMiAyNDIuMiAyMDMgMjE4IDIwM1MxNzUgMTg0LjIgMTc1IDE2MFoiIGZpbGw9IiM5Q0EzQUYiLz48L3N2Zz4=';
                      }}
                    />
                  </div>
                  
                  {item.images.length > 1 && (
                    <div className="p-4">
                      <div className="flex space-x-2 overflow-x-auto">
                        {item.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                              index === currentImageIndex ? 'border-green-500' : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <img
                              src={`http://localhost:5000${image}`}
                              alt={`${item.title} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-24 h-24 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>No image available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      item.status === 'open' ? 'bg-green-100 text-green-800' :
                      item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'fixed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                    
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      item.mode === 'repair-request' ? 'bg-orange-100 text-orange-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {item.mode === 'repair-request' ? '🔧 Repair Request' : '🎁 Free Offer'}
                    </span>
                    
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                {isOwner && (
                  <div className="ml-4">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusUpdate(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="fixed">Fixed</option>
                      <option value="taken">Taken</option>
                    </select>
                  </div>
                )}
              </div>

              {item.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                {item.condition && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Condition</h4>
                    <p className="text-gray-900">{item.condition}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Posted</h4>
                  <p className="text-gray-900">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Owner Info */}
              {item.owner && (
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold text-lg">
                          {item.owner.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{item.owner.name}</h4>
                        {item.owner.city && (
                          <p className="text-sm text-gray-500 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {item.owner.city}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {!isOwner && isAuthenticated && (
                      <button
                        onClick={() => setShowContactInfo(!showContactInfo)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        {showContactInfo ? 'Hide Contact' : 'Show Contact'}
                      </button>
                    )}
                  </div>
                  
                  {showContactInfo && (
                    <div className="mt-4 p-4 bg-green-50 rounded-md">
                      <p className="text-sm text-green-800">
                        📧 Contact: {item.owner.email}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Comments ({comments.length})
              </h3>
              
              {isAuthenticated && (
                <form onSubmit={handleComment} className="mb-6">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 resize-none"
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={commentLoading || !comment.trim()}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {commentLoading ? 'Posting...' : 'Post Comment'}
                    </button>
                  </div>
                </form>
              )}
              
              {!isAuthenticated && (
                <div className="mb-6 p-4 bg-gray-50 rounded-md text-center">
                  <p className="text-gray-600 mb-2">Please sign in to leave a comment</p>
                  <Link to="/auth/login" className="text-green-600 hover:text-green-500">
                    Sign In
                  </Link>
                </div>
              )}

              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No comments yet. Be the first to comment!
                  </p>
                ) : (
                  comments.map((c) => (
                    <div key={c._id} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium text-sm">
                            {c.user?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-gray-900">{c.user?.name}</h4>
                            <span className="text-xs text-gray-500">
                              {new Date(c.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700">{c.content || c.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
