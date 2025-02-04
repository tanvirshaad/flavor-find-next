"use client"
import { getUserFromCookie } from '@/utility/token';
import axios from 'axios';
import React, { useState } from 'react'

const RestaurantReview = ({restaurantId}: {restaurantId: number}) => {
    const [review, setReview] = useState<any[]>([]);
    const userId = getUserFromCookie();
    
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSubmit = async () => {
        try {
            if (!userId) {
                setError("Please log in to submit a review");
                return;
            }
            
            if (!restaurantId) {
                setError("Invalid restaurant ID");
                return;
            }

            console.log('Submitting review with data:', {
                userId,
                restaurantId,
                rating,
                comment
            });

            const response = await axios.post(`http://localhost:4000/restaurant-reviews/`, {
                userId,
                restaurantId,
                rating,
                comment
            });

            console.log('Response:', response);
            
            setIsSubmitted(true);
            setError("");
            
            setRating(0);
            setComment("");
        } catch (err: any) {
            console.error('Error details:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status
            });
            setError(`Failed to submit review: ${err.response?.data?.message || err.message}`);
        }
    }

  return (
    <div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {isSubmitted && <div className="text-green-500 text-center mb-4">Review submitted successfully!</div>}
        {/* generate a form to take comment and rating */}
                 <h1>Review for {restaurantId}</h1>
        <form action="">
            <div className="flex flex-col gap-4 max-w-md mx-auto p-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Rating (1-5)</span>
                    </label>
                    <input 
                        type="number" 
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="input input-bordered"
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Review</span>
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="textarea textarea-bordered h-24"
                        placeholder="Write your review here..."
                        required
                    />
                </div>

                <button 
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="btn btn-primary"
                >
                    Submit Review
                </button>
            </div>
        </form>
    </div>
  )
}

export default RestaurantReview