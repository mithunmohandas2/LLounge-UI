import { Toaster } from "react-hot-toast";
import AdminHeader from "../../components/AdminComponents/AdminHeader";
import { courseDetailsAPI } from "../../services/interactionsAPI";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import firebase from '../../firebase/config';
import { Module, courseData } from "../../types/courseTypes";


function CourseDetails() {
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [fee, setFee] = useState('');
    const [tutor, setTutor] = useState('');
    const [branch, setBranch] = useState('');
    const [modules, setModules] = useState<Module[] | undefined>(undefined);
    const [courseImg, setCourseImg] = useState('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg')
    const location = useLocation()
    const storage = firebase


    useEffect(() => {
        const query = location.search
        if (!query?.length) return
        const _id = query.slice(query.indexOf('=') + 1, query.length)   //extracting Course ID from query
        const getCourseData = async () => {
            const courseList = await courseDetailsAPI(_id)             //fetch details of course
            const course = courseList.data
            // console.log("course", course) //test
            setCourseName(course?.courseName)
            setCourseId(course?._id!)
            setDescription(course?.description)
            setFee(course?.fee)
            setModules(course?.modules)
            setBranch(course?.branchId?.branchName)
            if (course?.image) setCourseImg(course?.image)
            if (course?.tutor?.firstName) setTutor(course?.tutor?.firstName + " " + course?.tutor?.lastName)
        }
        getCourseData()
    }, [])

    return (
        <>
            <AdminHeader />
            <div className="flex flex-col justify-center px-6 py-14 sm:py-12 lg:px-8 bg-slate-300">
                <h1 className='font-bold text-4xl my-3 text-cyan-600 text-center'>{courseName}</h1>
                <hr />
                <div className="container px-5 m-3">
                    <section id="home" className="flex flex-col-reverse justify-center sm:flex-row p-6 pb-0 items-center gap-8 mb-12 scroll-mt-20">
                        <div className="sm:w-1/2">
                            <h4 className='my-3 text-slate-800 font-bold text-xl md:text-2xl'>Course Description</h4>
                            <h4 className='m-3 text-slate-800 font-bold text-md md:text-xl text-justify'>{description}</h4>
                            <hr />
                            <h4 className='my-3 text-slate-800 text-md md:text-xl'> <span className="font-bold ">ID :</span> {courseId}</h4>
                            <h4 className='my-3 text-slate-800 text-md md:text-xl'> <span className="font-bold ">Branch :</span> {branch}</h4>
                            <h4 className='my-3 text-slate-800 text-md md:text-xl'> <span className="font-bold ">Tutor :</span> {tutor}</h4>
                            <h4 className='my-3 text-slate-800 font-bold text-xl md:text-2xl'>Fee : ₹ {fee}/-</h4>
                            <hr />
                        </div>

                        <div className="row">
                            <img className="" src={courseImg} alt="Course Image" />
                        </div>

                    </section>

                    {/* --------MODULE SECTION---------- */}
                    <section className="container mx-auto">
                        <div className="mx-auto max-w-7xl px-2 md:px-0 my-4">
                            <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">

                                {modules?.length && modules.map((module) => (
                                    <div key={module?._id}>
                                        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden  m-6">
                                            <div className="p-8 bg-white text-gray-500">
                                                <div className="uppercase tracking-wide text-2xl text-indigo-500 font-semibold">{module?.modName}</div>
                                                {/* <p className="my-2"> <strong>ID:</strong> {module._id} </p> */}
                                                <p className="my-4"><strong>Description: </strong> {module?.content}</p>
                                                <p className="my-4 text-xl"><strong>Duration: </strong>{module?.duration} hours</p>

                                                {module.materials ? <a target='_blank' href={module.materials} className="text-indigo-500">
                                                    <p className="text-green-600"> ✔️ View Materials</p>
                                                </a> : <p className="text-red-600"> ❌ No Materials</p>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </section>
                </div>
                <Toaster />
            </div>
        </>
    );
}

export default CourseDetails