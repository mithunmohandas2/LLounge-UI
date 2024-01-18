
const ReviewList = (props: { rating: number, review: string, name: string }) => {

    const starsArray = Array.from({ length: props?.rating }, (_, index) => (
        <span key={index} className="text-xl mr-2 font-thin "> ⭐️</span>
    ));

    return (
        <div className="border p-4 mb-4 rounded-xl hover:bg-slate-50">
            <div className="flex items-center mb-2 font-semibold ">
                Rating : <span className="px-2"> ({props?.rating}) </span>
                {starsArray}
            </div>
            <div className="flex">
                <p className="font-semibold">Review: </p>
                <p className="text-gray-700 ps-2"> {props?.review}</p>
            </div>
            <div className="flex mt-2">
                <p className="font-semibold">~</p>
                <p className="text-gray-400 ps-2"> {props?.name}</p>
            </div>
        </div>
    );
};

export default ReviewList;
