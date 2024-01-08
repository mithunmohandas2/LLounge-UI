import { Toaster } from "react-hot-toast";
import AdminHeader from "../../components/AdminComponents/AdminHeader";
import { courseDetailsAPI } from "../../services/interactionsAPI";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function CourseDetails() {
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [fee, setFee] = useState('');
    const location = useLocation()

    useEffect(() => {
        const query = location.search
        if (!query?.length) return
        const _id = query.slice(query.indexOf('=') + 1, query.length)
        // console.log(_id)
        const getData = async () => {
            const courseList = await courseDetailsAPI(_id)
            const course = courseList.data
            // console.log("course", course)
            setCourseName(course?.courseName)
            setCourseId(course?._id)
            setDescription(course?.description)
            setFee(course?.fee)
        }
        getData()

    }, [])

    return (
        <>
            <AdminHeader />
            <div className="flex flex-col justify-center px-6 py-14 sm:py-12 lg:px-8 bg-slate-300">
                <div className="container px-5 m-3">
                    <h1 className='font-bold text-4xl my-3 text-cyan-600'>{courseName}</h1>
                    ID : {courseId} <br />
                    <hr />
                    <h4 className='my-3 text-slate-800 font-bold text-xl md:text-2xl'>Course Description</h4>
                    <h4 className='m-3 text-slate-800 font-bold text-md md:text-xl'>{description}</h4>
                   
                    <h4 className='mt-9 text-slate-800 font-bold text-xl md:text-2xl'> Fee : Rs {fee} /-</h4>
                </div>
                <Toaster />
            </div>
        </>
    );
}

export default CourseDetails