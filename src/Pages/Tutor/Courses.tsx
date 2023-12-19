import toast, { Toaster } from "react-hot-toast"
import TutorHeader from "../../components/TutorComponents/TutorHeader"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { blockCoursesAPI, listCoursesAPI } from "../../Services/InteractionsAPI"
import { courseData } from "../../Types/CourseTypes"

function Courses() {
    const Navigate = useNavigate()
    const [courses, setCourses] = useState<courseData[] | undefined>(undefined);
    const [change, setChange] = useState(1)
    const tutor = localStorage.getItem("_id") || '656f144c942b35a3182bc55f'  //test


    useEffect(() => {
        (async () => {
            const courseList = await listCoursesAPI(tutor)
            const courses = courseList.data
            // console.log("courses", courses)  //test
            setCourses(courses)
        })()
    }, [change])

    const handleUnlist = async (_id: string) => {
       const confirmed = window.confirm(`Sure to change block status?`)
       if(!confirmed)return
        const isBlock = await blockCoursesAPI(_id)
        toast.success(isBlock.message)
        setChange(change === 1 ? 2 : 1)
    }


    return (
        <>
            <TutorHeader />
            <Toaster />
            <div className='mx-9 mt-6'>
                <h1 className='text-3xl m-5 font-semibold'>Course Management</h1>
                <img className="container-fluid" src="https://www.dynamicpixel.co.in/assets/img/home/E-Learning-Courses.jpg" alt="dummy image" />
                <div className="flex justify-start p-5 my-4">
                    <button className="bg-cyan-600 hover:bg-cyan-700 text-white sm:text-2xl font-bold py-2 px-4 ml-6 rounded" onClick={() => Navigate('/tutor/addCourse')}>  ➕Add Course </button>
                </div>
            </div>
            <div className="bg-slate-200 p-3">
                <ul>
                    {courses && courses.map((course) => (
                        <li key={course._id}>
                            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-6">
                                <div className="md:flex ">
                                    <div className="md:flex-shrink-0">
                                        <img className="h-48 w-full object-cover md:h-full md:w-48" src="https://images.pexels.com/photos/6863175/pexels-photo-6863175.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Course Image" />
                                    </div>
                                    <div className={course.isBlocked ? "p-8 bg-red-100 text-gray-500" : "p-8 bg-white text-gray-500"}>
                                        <div className="uppercase tracking-wide text-2xl text-indigo-500 font-semibold">{course.courseName}</div>
                                        <p className="my-2"> <strong>ID:</strong> {course._id} </p>
                                        <p className="my-4"><strong>Description: </strong> {course.description}</p>
                                        <p className="my-2"> <strong>Status: </strong> {course.status} </p>
                                        <p className="my-4 text-xl"><strong>Fee: </strong>₹ {course.fee}/-</p>
                                        <button
                                            onClick={() => { Navigate(`/tutor/editCourse?id=${course._id}`) }}
                                            className="bg-slate-100 hover:bg-slate-200 text-cyan-600 font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline">
                                            Edit Details
                                        </button>
                                        {course.isBlocked ?
                                            <button
                                                onClick={() => { handleUnlist(course._id!) }}
                                                className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                                Activate
                                            </button>
                                            : <button
                                                onClick={() => { handleUnlist(course._id!) }}
                                                className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                                Unlist
                                            </button>}


                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    )
}

export default Courses