import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { getNotificationsAPI } from "../../services/userInteractionsAPI";
import { notifications } from "../../types/notificationTypes";
import { format } from 'date-fns';

function Notifications(props: { header: JSX.IntrinsicAttributes }) {
    const [notifications, setNotifications] = useState<notifications[]>([])
    const iconPack = {
        add: <div className="bg-blue-500 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        </div>,
        success: <div className="bg-green-500 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"  >
                <path strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        </div>,
        warning: <div className="bg-orange-500 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </svg>
        </div>
    }

    useEffect(() => {
        //load notifications
        (async () => {
            const _id = localStorage.getItem("_id")!
            const notificationData = await getNotificationsAPI(_id)
            // console.log("courses", notificationData.data)  //test
            setNotifications(notificationData.data)
        })()
    }, [])


    return (
        <>
            {props ? props.header : null}
            <Toaster />
            <div className="flex flex-col items-center mt-5 h-screen">
                <div className="bg-gray-200 p-10 px-14 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-4">Notifications</h1>
                    <hr className="my-3" />
                    <div className="space-y-4">
                        {notifications.length ? notifications.map((note) => (
                            <div key={note._id} className="flex items-start bg-white p-3 rounded-xl">
                                {note.message === "New Student Enrolled" ? iconPack.add : note.message === ("Course Published" || "Course Viva Requested") ? iconPack.success : note.message === "Course Edit Requested" ? iconPack.warning : note.message === "Course Sent for approval" ? iconPack.warning : iconPack.success}
                                <div className="ml-4">
                                    <p className="text-gray-800 font-bold mb-1">{note.message}</p>
                                    <p className="text-gray-800">
                                        <span className="font-bold">Course ID : </span>
                                        {note.courseId}
                                    </p>
                                    {note.message === "Course Viva Requested" ?
                                        <p className="text-gray-800">
                                            <span className="font-bold">Student ID : </span>
                                            {note.senderId}
                                        </p> : null}
                                    <p className="text-gray-600 mt-3 text-sm">{format(note.createdAt, 'MMMM dd, yyyy - h:mm:ss a')}</p>
                                </div>
                            </div>
                        )) : "- No active notifications - "}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notifications;