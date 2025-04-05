import React from 'react';
import { Utensils, Star, MessageSquare, Clock } from 'lucide-react';

function MessMenu() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mess Menu & Feedback</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Star className="w-6 h-6 text-yellow-500 mr-3" />
            <h3 className="text-lg font-semibold">Rating</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">4.2/5</p>
          <p className="text-gray-600">Average rating</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <MessageSquare className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold">Feedback</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">156</p>
          <p className="text-gray-600">This month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Utensils className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold">Special Meals</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">3</p>
          <p className="text-gray-600">This week</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-purple-600 mr-3" />
            <h3 className="text-lg font-semibold">Next Meal</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">Lunch</p>
          <p className="text-gray-600">In 2 hours</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Menu</h2>
          <div className="space-y-6">
            {[
              {
                meal: 'Breakfast',
                time: '7:00 AM - 9:00 AM',
                items: ['Bread & Butter', 'Eggs', 'Cereals', 'Milk', 'Tea/Coffee']
              },
              {
                meal: 'Lunch',
                time: '12:00 PM - 2:00 PM',
                items: ['Rice', 'Dal', 'Mixed Vegetables', 'Chicken Curry', 'Salad']
              },
              {
                meal: 'Snacks',
                time: '4:30 PM - 5:30 PM',
                items: ['Samosa', 'Tea', 'Biscuits']
              },
              {
                meal: 'Dinner',
                time: '7:30 PM - 9:30 PM',
                items: ['Chapati', 'Paneer Curry', 'Rice', 'Dal', 'Ice Cream']
              }
            ].map((mealTime, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{mealTime.meal}</h3>
                  
                  <span className="text-sm text-gray-600">{mealTime.time}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mealTime.items.map((item, itemIndex) => (
                    <span 
                      key={itemIndex}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Submit Feedback</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meal</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Snacks</option>
                  <option>Dinner</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      className="p-2 hover:bg-blue-50 rounded-full"
                    >
                      <Star className={`w-6 h-6 ${rating <= 3 ? 'text-gray-400' : 'text-yellow-400'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Share your thoughts about the meal..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Feedback
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Feedback</h2>
            <div className="space-y-4">
              {[
                {
                  meal: 'Lunch',
                  rating: 5,
                  comment: 'The chicken curry was excellent today!',
                  date: '2024-03-01'
                },
                {
                  meal: 'Breakfast',
                  rating: 4,
                  comment: 'Good variety of items, but eggs were a bit cold.',
                  date: '2024-02-29'
                },
                {
                  meal: 'Dinner',
                  rating: 5,
                  comment: 'Loved the paneer curry and ice cream dessert.',
                  date: '2024-02-28'
                }
              ].map((feedback, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{feedback.meal}</h3>
                    <div className="flex">
                      {Array.from({ length: feedback.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{feedback.comment}</p>
                  <p className="text-xs text-gray-500">{feedback.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessMenu;