import toast from "react-hot-toast";
import { enrollCourseAPI, getCertificateAPI } from "../../services/userInteractionsAPI";
import { sendNotificationAPI } from "../../services/interactionsAPI";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CourseEnrollment(props: { courseId: string, tutorId: string, setChange: (arg0: number) => void, change: number, enrollStatus: boolean }) {
    const Navigate = useNavigate()
    const [certified, setCertified] = useState(false)
    const [userId, setUserId] = useState('')
    const courseId = props?.courseId

    async function handleEnrollCourse() {
        try {
            const isConfirmed = window.confirm('Send request for enrollment?')
            if (!isConfirmed) return
            const _id = localStorage.getItem("_id") || ""
            const response = await enrollCourseAPI(courseId, _id);
            console.log("response", response)    //test
            if (response?.data) {
                toast.success(' Enrollment successful');

                //send notification 
                const senderId = localStorage.getItem("_id")!
                const receiverId = props?.tutorId  //tutor ID
                const message = "New Student Enrolled"
                await sendNotificationAPI({ senderId, receiverId, courseId, message })
                props?.setChange(props?.change === 1 ? 2 : 1)
                alert("Enrollment successful")
                Navigate("/courses")

            } else {
                toast.error(response?.message)
            }
        } catch (error) {
            console.log((error as Error).message);
        }

    }

    async function handleRequestViva() {
        const isConfirmed = window.confirm('Sure to Request for Viva')
        if (!isConfirmed) return
        const senderId = localStorage.getItem("_id")!
        const receiverId = props?.tutorId  //tutor ID
        const message = "Course Viva Requested"
        await sendNotificationAPI({ senderId, receiverId, courseId, message })
        alert("requested for viva")
        Navigate("/courses")
    }

    useEffect(() => {
        (async () => {
            const userID = localStorage.getItem("_id") || ""
            setUserId(userID)
            const isCertified = await getCertificateAPI(courseId, userId)             //fetch details of course
            // console.log("course", course) //test
            if (isCertified) setCertified(true)
        })()
    }, [userId])



    return (
        <>
            {props?.enrollStatus ?  //if not enrolled
                <div className="flex justify-center p-5 my-4">
                    <button className="bg-cyan-600 hover:bg-cyan-700 text-white sm:text-2xl font-bold py-2 px-4 ml-6 rounded" onClick={handleEnrollCourse}>  Enroll for Course </button>
                </div> :
                !certified ?  // if enrolled & not certified
                    <div className="flex justify-center p-5 my-4">
                        <button className="bg-cyan-600 hover:bg-cyan-700 text-white sm:text-2xl font-bold py-2 px-4 ml-6 rounded" onClick={handleRequestViva}>Request Viva</button>
                    </div> : // if certified
                    <a href={`/certificate?courseId=${courseId}&userId=${userId}`} target="_blank">
                        <div className="flex justify-center p-5 my-4">
                            <button className="bg-cyan-600 hover:bg-cyan-700 text-white sm:text-2xl font-bold py-2 px-4 ml-6 rounded">View Certificate</button>
                        </div>
                    </a>}

        </>
    )
}

export default CourseEnrollment