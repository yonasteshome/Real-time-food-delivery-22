import React from "react";
import { Link } from "react-router-dom";

const FeedbackPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full shadow-lg border border-gray-100 rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-4 text-black">
          Delivery Feedback
        </h1>
        <p className="text-gray-600 mb-6">
          We’d love to hear your thoughts on your recent order.
        </p>
        <form>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-black mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="text-2xl text-gray-300"
                  //onClick={() => setRating(star)}
                  // className={`text-2xl ${
                  //   rating >= star ? "text-yellow-400" : "text-gray-300"
                  // }`}
                  // aria-label={`${star} star`}
                  aria-label={`${star} star`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-black mb-2">
              Your Feedback
            </label>
            <textarea
              // onChange={(e) => setFeedback(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
              rows="5"
              placeholder="Tell us about the food, delivery experience, or anything else..."
              disabled
              //required
            />
          </div>
          <div className="flex justify-between">
            <Link to="/">
              <button
                type="button"
                // onClick={}
                className="text-red-400 hover:underline text-sm"
              >
                Skip Feedback
              </button>
            </Link>
            <Link to="/">
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-all"
              >
                Submit Feedback
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;
