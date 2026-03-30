import ReviewCard from "../components/ReviewCard";

const Reviews = () => {
  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-display text-center mb-12">
        Customer Reviews
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  );
};

export default Reviews;
