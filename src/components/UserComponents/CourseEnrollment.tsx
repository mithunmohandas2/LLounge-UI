import toast from "react-hot-toast";
import { enrollCourseAPI } from "../../services/userInteractionsAPI";

function CourseEnrollment(props: { courseId: string, setChange: (arg0: number) => void, change: number, enrollStatus: boolean }) {


    async function handleEnrollCourse() {
        try {
            const _id = localStorage.getItem("_id") || ""
            const response = await enrollCourseAPI(props?.courseId, _id);
            console.log("response", response)    //test
            if (response?.data) {
                toast.success(' Enrollment successful');
                props?.setChange(props?.change === 1 ? 2 : 1)

            } else {
                toast.error(response?.message)
            }
        } catch (error) {
            console.log((error as Error).message);
        }

    }

    function handleRequestViva() {
       const isConfirmed = window.confirm('Sure to Request for Viva')
       if(!isConfirmed) return
       alert("requested for viva")
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