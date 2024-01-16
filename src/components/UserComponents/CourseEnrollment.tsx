import toast from "react-hot-toast";
import { enrollCourseAPI } from "../../services/userInteractionsAPI";
import { sendNotificationAPI } from "../../services/interactionsAPI";
import { useNavigate } from "react-router-dom";

function CourseEnrollment(props: { courseId: string, setChange: (arg0: number) => void, change: number, enrollStatus: boolean }) {
    const Navigate = useNavigate()

    async function handleEnrollCourse() {
        try {
            const _id = localStorage.getItem("_id") || ""
            const response = await enrollCourseAPI(props?.courseId, _id);
            console.log("response", response)    //test
            if (response?.data) {
                toast.success(' Enrollment successful');
                
                //send notification 
                const senderId = localStorage.getItem("_id")!
                const receiverId = "656f1492942b35a3182bc563"  //admin ID
                const message = "New Student Enrolled"
                const courseId = props?.courseId
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
        const receiverId = "656f1492942b35a3182bc563"  //tutor ID
        const message = "Course Viva Requested"
        const courseId = props?.courseId
        await sendNotificationAPI({ senderId, receiverId, courseId, message })
        alert("requested for viva")
        Navigate("/courses")
    }

    return (
        <>
            {props.enrollStatus && <div className="flex justify-center p-5 my-4">
                <button className="bg-cyan-600 hover:bg-cyan-700 text-white sm:text-2xl font-bold py-2 px-4 ml-6 rounded" onClick={handleEnrollCourse}>  Enroll for Course </button>
            </div>}

            {!props.enrollStatus && <div className="flex justify-center p-5 my-4">
                <button className="bg-cyan-600 hover:bg-cyan-700 text-white sm:text-2xl font-bold py-2 px-4 ml-6 rounded" onClick={handleRequestViva}>Request Viva</button>
            </div>}
        </>
    )
}

export default CourseEnrollment