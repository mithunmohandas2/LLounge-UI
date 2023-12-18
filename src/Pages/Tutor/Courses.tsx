import { Toaster } from "react-hot-toast"
import TutorHeader from "../../components/TutorComponents/TutorHeader"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { listCoursesAPI } from "../../Services/InteractionsAPI"

function Courses() {
    const Navigate = useNavigate()
    const [Courses, setCourses] = useState()

    useEffect(() => {
        (async () => {
            const courseList = await listCoursesAPI('656f144c942b35a3182bc55f')
            let courses = courseList.data
            console.log("courses", courses)
            setCourses(courses)
        })()
    }, [])


    return (
        <>
            <TutorHeader />
            <Toaster />
            <div className='mx-9 mt-6'>
                <h1 className='text-3xl m-5 font-semibold'>Course Management</h1>
                <img src="https://www.dynamicpixel.co.in/assets/img/home/E-Learning-Courses.jpg" alt="dummy image" />
                <div className="flex justify-start p-5 my-4">
                    <button className="bg-cyan-600 hover:bg-cyan-700 text-white sm:text-2xl font-bold py-2 px-4 ml-6 rounded" onClick={() => Navigate('/tutor/addCourse')}>  ➕Add Course </button>
                </div>
            </div>
            <div className="bg-slate-200">
               list courses
            </div>

        </>
    )
}

export default Courses