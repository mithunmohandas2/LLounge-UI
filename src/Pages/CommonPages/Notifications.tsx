import { Toaster } from "react-hot-toast";

function Notifications(props: { header: JSX.IntrinsicAttributes }) {
    // const notifications = [
    //     { id: 1, text: 'Notification 1', type: 'success' },
    //     { id: 2, text: 'Notification 2', type: 'info' },
    //     { id: 3, text: 'Notification 3', type: 'warning' },
    //     { id: 4, text: 'Notification 4', type: 'error' },
    // ];

    return (
        <>
            {props ? props.header : null}
            <Toaster />
            <div className="flex flex-col items-center mt-5 h-screen">
                <div className="bg-gray-100 p-10 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-4">Notifications</h1>
                    <div className="space-y-4">

                        <div className="flex items-start">
                            <div className="bg-blue-500 rounded-full p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-gray-800 font-bold">New Message</p>
                                <p className="text-gray-600">You have a new message from John Doe</p>
                            </div>
                        </div>


                        <div className="flex items-start">
                            <div className="bg-green-500 rounded-full p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"  >
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-gray-800 font-bold">Payment Received</p>
                                <p className="text-gray-600">You have received a payment of $100</p>
                            </div>
                        </div>


                        <div className="flex items-start">
                            <div className="bg-red-500 rounded-full p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-gray-800 font-bold">Error</p>
                                <p className="text-gray-600">An error occurred. Please try again later.</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};

export default Notifications;