import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReviewList from "./ReviewList";
import { courseFeedbacksAPI, submitFeedbackAPI } from "../../services/userInteractionsAPI";
import { feedback } from "../../types/feedbackType";

function ReviewsRatings(props: { courseId: string, enrollStatus: boolean }) {

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [feedbacks, setFeedbacks] = useState<feedback[]>();
    const [change, setChange] = useState(1);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("role") === "admin");
    const userId = localStorage.getItem("_id") || ""
    const courseId = props?.courseId


    useEffect(() => {
        const adminCheck = localStorage.getItem("role") === "admin";
        setIsAdmin(adminCheck);

        (async () => {
            const response = await courseFeedbacksAPI(courseId)
            // console.log("feedbacks => ", response?.data); //test
            setFeedbacks(response?.data?.userFeedback)
        })()

    }, [courseId, change])

    async function handleReviewRequest(e: { preventDefault: () => void; }) {
        e.preventDefault();
        if (rating <= 0 || rating > 5) return toast.error("Please select the rating value")
        const isConfirmed = window.confirm('Sure to proceed with rating?')
        if (!isConfirmed) return

        try {             // API calls to submit the form data
            const courseId = props?.courseId
            const response = await submitFeedbackAPI({ rating, review, userId, courseId });
            if (response?.data) {
                toast.success(response?.message)
                setChange(change === 1 ? 2 : 1)
            }
        } catch (error) {
            console.log((error as Error).message)
            toast.error((error as Error).message)
        }
    }

    return (
        <>
            {(!props?.enrollStatus && !isAdmin) && <>
                <hr />
                <h5 className="my-4 text-2xl">User Ratings and Reviews </h5>

                <div className="md:flex md:flex-row md:space-x-4">
                    <div className="max-w-md max-h-96 mt-8 p-8 bg-white shadow-md rounded-md">
                        <h2 className="text-2xl font-semibold mb-4">Rate and Review the Course </h2>
                        <form onSubmit={handleReviewRequest}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">
                                    Rating
                                </label>
                                <div className="mt-1 flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <button key={value} type="button" onClick={() => setRating(value)}
                                            className={`${value <= rating ? 'bg-blue-500' : 'bg-gray-200'
                                                } inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}  >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">
                                    Review
                                </label>
                                <textarea id="review" name="review" rows={4} value={review} onChange={(e) => setReview(e.target.value)}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Write your review here..."  >
                                </textarea>
                            </div>
                            <div className="flex items-center justify-end">
                                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>


                    {feedbacks?.length ? <div className="max-w-md  mt-8 p-8 bg-white shadow-md rounded-md">
                        <h2 className="text-2xl font-semibold mb-4">Course Reviews</h2>
                        {feedbacks.map((feedback) => (
                            <ReviewList key={feedback._id} rating={feedback.rating} review={feedback.review} name={feedback.userId?.firstName} />
                        ))}
                    </div> : null}
                </div>
            </>}
        </>
    )
}

export default ReviewsRatings