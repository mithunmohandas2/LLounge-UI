import toast, { Toaster } from "react-hot-toast";
import AdminHeader from "../../components/AdminComponents/AdminHeader";
import { CourseStatusAPI, courseDetailsAPI, publishCourseAPI, sendNotificationAPI } from "../../services/interactionsAPI";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import firebase from '../../firebase/config';
import { Module, courseDataExpanded } from "../../types/courseTypes";
import UserHeader from "../../components/UserComponents/UserHeader";
import CourseEnrollment from "../../components/UserComponents/CourseEnrollment";
import { enrollCheckAPI } from "../../services/userInteractionsAPI";
import ReviewsRatings from "../../components/CommonComponents/Reviews&Ratings";

function CourseDetails(props: { admin: boolean }) {
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [fee, setFee] = useState('');
    const [tutor, setTutor] = useState('');
    const [tutorId, setTutorId] = useState('');
    const [branch, setBranch] = useState('');
    const [status, setStatus] = useState('');
    const [modules, setModules] = useState<Module[] | undefined>(undefined);
    const [courseImg, setCourseImg] = useState('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg')
    const [change, setChange] = useState(1);
    const [enrollStatus, setEnrollStatus] = useState(false);
    const location = useLocation()
    const storage = firebase
    if (!storage) console.log("firebase error")

    useEffect(() => {
        const query = location.search
        if (!query?.length) return
        const _id = query.slice(query.indexOf('=') + 1, query.length)   //extracting Course ID from queryuserId
        const getCourseData = async () => {
            const courseList = await courseDetailsAPI(_id)             //fetch details of course
            const course: courseDataExpanded = courseList.data
            // console.log("course", course) //test
            setCourseName(course?.courseName)
            setCourseId(course?._id!)
            setDescription(course?.description)
            setFee(course?.fee)
            setModules(course?.modules)
            setBranch(course?.branchId?.branchName)
            setStatus(course?.status)
            if (course?.image) setCourseImg(course?.image)
            if (course?.tutor?.firstName) setTutor(course?.tutor?.firstName + " " + course?.tutor?.lastName)
            if (course?.tutor?._id) setTutorId(course?.tutor?._id)
        }
        getCourseData()
    }, [change, enrollStatus])

    async function handleEditRequest(courseId: string) {
        try {
            const _id = courseId
            const role = "admin"
            const response = await CourseStatusAPI(_id, role); //for new course api call
            // console.log("response recieved", response)    //test
            if (response) {
                toast.success(response?.message);

                //send notification 
                const senderId = localStorage.getItem("_id")!
                const receiverId = tutorId  //tutor ID
                const message = "Course Edit Requested"
                await sendNotificationAPI({ senderId, receiverId, courseId, message })
                setChange(change === 1 ? 2 : 1)
            } else {
                toast.error(response?.message)
            }
        } catch (error) {
            console.log((error as Error).message)
            toast.error((error as Error).message)
        }
    }

    async function handlePublishCourse() {
        const confirmation = window.confirm("Sure to publish course?")
        if (!confirmation) return
        try {
            const _id = courseId
            const response = await publishCourseAPI(_id); //for new course api call
            // console.log("response recieved", response)    //test
            if (response) {
                toast.success(response?.message);
                //send notification 
                const senderId = localStorage.getItem("_id")!
                const receiverId = tutorId  //tutor ID
                const message = "Course Published"
                await sendNotificationAPI({ senderId, receiverId, courseId, message })
                setChange(change === 1 ? 2 : 1)
            } else {
                toast.error(response?.message)
            }
        } catch (error) {
            console.log((error as Error).message)
            toast.error((error as Error).message)
        }
    }

    if (localStorage.getItem("role") === "user") {   //check for user enrollment
        useEffect(() => {
            (async () => {
                const query = location.search
                const courseId = query.slice(query.indexOf('=') + 1, query.length)   //extracting Course ID from queryuserId
                const userId = localStorage.getItem("_id")!
                const isEnrolled = await enrollCheckAPI(courseId, userId)             //fetch details of enrollment
                if (isEnrolled.message !== 'Enrolled for course') {
                    setEnrollStatus(true);
                    setChange(change === 1 ? 2 : 1)
                }
            })()

        }, [change])
    }

    return (
        <>
            {props?.admin ? <AdminHeader /> : <UserHeader />}
            <div className="flex flex-col justify-center px-6 py-14 sm:py-12 lg:px-8 bg-slate-300">
                <h1 className='font-bold text-4xl my-3 text-cyan-600 text-center'>{courseName}</h1>
                <hr />
                <div className="container px-5 m-3">
                    <section id="home" className="flex flex-col-reverse justify-center sm:flex-row p-6 pb-0 items-center gap-8 mb-12 scroll-mt-20">
                        <div className="sm:w-1/2">
                            <h4 className='my-3 text-slate-800 font-bold text-xl md:text-2xl'>Course Description</h4>
                            <h4 className='m-3 text-slate-800 font-bold text-md md:text-xl text-justify'>{description}</h4>
                            <hr />
                            {props.admin && <h4 className='my-3 text-slate-800 text-md md:text-xl'> <span className="font-bold ">ID :</span> {courseId}</h4>}
                            <h4 className='my-3 text-slate-800 text-md md:text-xl'> <span className="font-bold ">Branch :</span> {branch}</h4>
                            <h4 className='my-3 text-slate-800 text-md md:text-xl'> <span className="font-bold ">Tutor :</span> {tutor}</h4>
                            {props.admin && <div className="flex">
                                <h4 className='my-1 text-slate-800 text-md md:text-xl'> <span className="font-bold ">Status :</span> {status}</h4>
                                {(status === "Sent for approval" || status === "Active") && <button onClick={() => handleEditRequest(courseId)} className='mx-3 px-3 rounded-xl text-white bg-orange-400 hover:bg-orange-500'>Request Correction</button>}
                            </div>}
                            <h4 className='my-3 text-slate-800 font-bold text-xl md:text-2xl'>Fee : ₹ {fee}/-</h4>
                            <hr />
                        </div>

                        <div className="row">
                            <img className="" src={courseImg} alt="Course Image" />
                        </div>

                    </section>

                    {/* --------MODULE SECTION---------- */}
                    {(props?.admin || !enrollStatus) && <section className="container mx-auto">
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
                    </section>}

                    {status !== 'Active' && <div className="flex justify-center p-5 my-4">
                        <button className="bg-cyan-600 hover:bg-cyan-700 text-white sm:text-2xl font-bold py-2 px-4 ml-6 rounded" onClick={handlePublishCourse}>  Publish Course </button>
                    </div>}

                    {!props.admin && <CourseEnrollment tutorId={tutorId} courseId={courseId} setChange={setChange} change={change} enrollStatus={enrollStatus} />}
                    <ReviewsRatings courseId={courseId} enrollStatus={enrollStatus} />
                </div>
                <Toaster />
            </div>
        </>
    );
}

export default CourseDetails