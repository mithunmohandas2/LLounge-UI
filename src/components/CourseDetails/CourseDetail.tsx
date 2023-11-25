import { useState } from 'react';
import './CourseDetail.css'

const CourseDetailCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`max-w-md  mx-auto shadow-md rounded-md overflow-hidden ${isFlipped ? 'is-flipped' : ''}`}>
      {/* Front side of the card */}
      <div className="card-front bg-white rounded-2xl shadow-md">
        <img className="w-full h-64 object-cover object-center" src="/images/accounting.jpg" alt="Course" />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">Diploma in Practical Accounting</h2>
          <p>3 months online training program</p>

          <h2
            onClick={handleClick}
            className=" text-blue-500 hover:underline mt-4 hover:text-blue-700 focus:outline-none focus:shadow-outline cursor-pointer">
            View Course Details ▶️
          </h2>
        </div>
      </div>

      {/* Back side of the card */}
      <div className="card-back bg-white rounded-2xl shadow-md">
        <div className="p-4 ">
          {/* Content for the back side */}
          <h2 className="text-xl font-semibold m-3 px-4">Diploma in Practical Accounting</h2>
          <hr className='mb-5' />
          <h5 className='mb-2'> The core topics we are offering are mentioned below: </h5>
          <h5 className="text-gray-600">
            1. Basic account - Theory Part. <br/>
            2. Practical business accounting <br/>
            3. GST Practical training <br/>
            4. Income tax online Practical training <br/>
            5. Balance sheet reading <br/>
            6. TDS & TCS. <br/>
            7. Budgeting, Forecasting, exp management <br/>
            8. Cash flow & and fund flow. <br/>
            9. Payroll management <br/>
            10. Accounting software  <br />
            (Tally, Zoho, Excell, Quick books)
          </h5>


          <h2
            onClick={handleClick}
            className=" text-blue-500 hover:underline mt-4 hover:text-blue-700 focus:outline-none focus:shadow-outline cursor-pointer">
            ◀  Back
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailCard;