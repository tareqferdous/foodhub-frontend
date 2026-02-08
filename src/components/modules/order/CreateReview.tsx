import { reviewService } from "@/service/review.service";
import { useState } from "react";
import { toast } from "sonner";

const ReviewForm = ({ mealId, orderId }: any) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    const toastId = toast.loading("Submitting review...");
    try {
      setLoading(true);
      await reviewService.createReview({ mealId, orderId, rating, comment });
      toast.success("Review submitted!", { id: toastId });
    } catch (err) {
      toast.error(String(err), { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-3'>
      <select value={rating} onChange={(e) => setRating(+e.target.value)}>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r} ⭐
          </option>
        ))}
      </select>

      <textarea
        placeholder='Write your review'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button onClick={submitReview} disabled={loading}>
        Submit Review
      </button>
    </div>
  );
};

export default ReviewForm;
