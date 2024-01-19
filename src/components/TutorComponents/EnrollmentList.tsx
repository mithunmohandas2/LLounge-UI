import { useEffect, useState } from "react"
import { courseDetailsAPI, enrolledUsersAPI } from "../../services/interactionsAPI"
import { courseDataExpanded } from "../../types/courseTypes"
import toast, { Toaster } from "react-hot-toast";
import { enrolledUsers } from "../../types/userTypes";
import TutorHeader from "./TutorHeader";
import { studentAssessmentAPI } from "../../services/tutorInteractions";
import { issueCertificateAPI } from "../../services/userInteractionsAPI";

function EnrollmentList() {
    const [users, setUsers] = useState<enrolledUsers[]>([]);
    const [selectedUser, setSelectedUser] = useState<enrolledUsers>();
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [change, setChange] = useState(1);
    const [marks, setMarks] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true)    // Function to open the modal
    const closeModal = () => setIsModalOpen(false)  // Function to close the modal

    useEffect(() => {
        const query = location.search
        if (!query?.length) return
        const _id = query.slice(query.indexOf('=') + 1, query.length)   //extracting Course ID from query
        const getCourseData = async () => {
            const courseList = await courseDetailsAPI(_id)             //fetch details of course
            const course: courseDataExpanded = courseList.data
            setCourseName(course?.courseName)
            setCourseId(course?._id!)
        }
        const getEnrolledUsers = async () => {
            const enrolledUserList = await enrolledUsersAPI(_id)             //fetch details of course
            setUsers(enrolledUserList?.data?.users)
            // console.log(users)  //test
        }
        getCourseData();
        getEnrolledUsers();
    }, [change])

    async function assessmentHandler() {
        //setting marks to students
        const userId = selectedUser?.userId._id!
        if (parseInt(marks) > 100 || parseInt(marks) < 0) return toast.error("Enter valid marks")
        const assessment = await studentAssessmentAPI({ courseId, userId, marks })
        // console.log("access =>", assessment) //test
        setChange(change === 1 ? 2 : 1)
        if (assessment) closeModal()
    }

    async function issueCertificateHelper() {
        const confirmation = window.confirm("Proceed with issuing certificate?")
        if (!confirmation) return
        const userId = selectedUser?.userId._id!
        const userName = selectedUser?.userId.firstName + " " + selectedUser?.userId.lastName
        const marks = selectedUser?.marks!
        const tutorName = localStorage.getItem("name")!
        // console.log("to send  : ", { courseId, userId, userName, marks, courseName, tutorName }) //test
        const response = await issueCertificateAPI({ courseId, userId, userName, marks, courseName, tutorName })
        // console.log("response : ", response) //test
        if (response?.data) {
            toast.success(response?.message)
        }
    }

    return (
        <>
            <TutorHeader />
            <Toaster />
            <div className='mx-9'>
                <h1 className='text-3xl mb-7 mt-12 font-semibold'>{courseName} (Enrollments)</h1>
            </div>

            <div className='m-6'>
                <div className="overflow-x-auto mx-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className='bg-cyan-600 text-white'>
                                <th className="border px-4 py-2">Photo</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Student ID</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Phone</th>
                                <th className="border px-4 py-2">Current Marks</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.length ? users.length && users.map((user) => (
                                <tr key={user._id} className="text-center">
                                    <td className="border px-4 py-2 mx-auto">
                                        <img style={{ width: 50 }} src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png" alt="Profile pic" />
                                    </td>
                                    <td className="border px-4 py-2">{user.userId.firstName} {user.userId.lastName}</td>
                                    <td className="border px-4 py-2">{user.userId._id}</td>
                                    <td className="border px-4 py-2">{user.userId.email}</td>
                                    <td className="border px-4 py-2">{user.userId.phone}</td>
                                    <td className="border px-4 py-2">{user.marks}</td>
                                    <td className="border px-4 py-2">
                                        <div>
                                            <button onClick={() => { openModal(); setSelectedUser(user); setMarks("") }} className="justify-center rounded-md bg-cyan-600 p-3 text-sm font-semibold leading-6 m-1 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
                                                Evaluate
                                            </button>

                                            <button onClick={() => { setSelectedUser(user); issueCertificateHelper() }} className="justify-center rounded-md bg-cyan-600 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
                                                Issue Certificate
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : <tr><td>No enrolled users</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center z-40">
                    <div className="bg-transparent p-6">
                        {/* Close button */}
                        <div className="text-end">
                            <button className="absolute text-white hover:scale-150 focus:outline-none" onClick={closeModal}>
                                X
                            </button>
                        </div>
                        <div className="flex flex-col justify-center py-3 bg-transparent">
                            <div className="p-8 bg-slate-100  rounded-2xl mx-auto">
                                <h1 className='font-bold text-2xl text-center text-cyan-700'>Evaluate Student</h1>
                                <div className="pt-10 sm:mx-auto ">
                                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); assessmentHandler() }}>

                                        Name : {selectedUser?.userId.firstName} {selectedUser?.userId.lastName}

                                        <div className="col-12 mb-4">
                                            <input id="duration" name="duration" type="number" required
                                                className="block ps-2 sm:ms-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                placeholder={`${selectedUser?.marks}` || "0"} value={marks} onChange={(e) => setMarks(e.target.value.trimStart())} />
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="flex mx-auto justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                                            >
                                                Add Marks
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>

                        {/* -------------------- */}
                    </div>
                </div>
            )}
        </>
    )
}

export default EnrollmentList