import { certificate } from '../../../types/certificateType';
import backgroundImg from '/images/LL-Certificate.jpg'
import "./certificate.css"
import { format } from 'date-fns';

function Certificate(props: { certificateData: certificate }) {

    return (
        <div className="certificate-container">
            <img src={backgroundImg} alt="certificate" />
            <h1 id='userName' className='text-md sm:text-3xl lg:text-5xl'>{props?.certificateData?.userName}</h1>
            <h2 id='courseName' className='text-sm sm:text-2xl lg:text-4xl'>{props?.certificateData?.courseName}</h2>
            <h5 id='tutorName' className='text-xs sm:text-md lg:text-xl'>{props?.certificateData?.tutorName}</h5>
            <h5 id='date' className='text-xs sm:text-md lg:text-xl'>{format(props?.certificateData?.createdAt!, 'MMM dd, yyyy')}</h5>
        </div>
    )
}

export default Certificate