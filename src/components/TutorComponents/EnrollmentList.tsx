import { useEffect, useState } from "react"
import { courseDetailsAPI, enrolledUsersAPI } from "../../services/interactionsAPI"
import { courseDataExpanded } from "../../types/courseTypes"
import { Toaster } from "react-hot-toast";
import { enrolledUsers } from "../../types/userTypes";
import TutorHeader from "./TutorHeader";

function EnrollmentList() {
    const [users, setUsers] = useState<enrolledUsers[]>([]);
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [change, setChange] = useState(1);

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
            setUsers(enrolledUserList.data.users)
            console.log(users)
        }
        getCourseData();
        getEnrolledUsers();
    }, [change])

    async function assessmentHandler(_id: string) {
        alert(_id)
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
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Phone</th>
                                <th className="border px-4 py-2">Current Marks</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="text-center">
                                    <td className="border px-4 py-2 mx-auto">
                                        <img style={{ width: 50 }} src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png" alt="Profile pic" />
                                    </td>
                                    <td className="border px-4 py-2">{user.userId.firstName} {user.userId.lastName}</td>
                                    <td className="border px-4 py-2">{user.userId.email}</td>
                                    <td className="border px-4 py-2">{user.userId.phone}</td>
                                    <td className="border px-4 py-2">{user.marks}</td>
                                    <td className="border px-4 py-2">

                                        <form className="space-y-6 flex" onSubmit={(e) => { e.preventDefault(); assessmentHandler(user._id!) }}>

                                            <div className="col-12 mx-1">
                                                <input type="text" name="marks" className="block ps-2 sm:ms-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>

                                            <div>
                                                <button
                                                    type="submit"
                                                    className="justify-center rounded-md bg-cyan-600 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                                                >Evaluate 
                                                </button>
                                            </div>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default EnrollmentList