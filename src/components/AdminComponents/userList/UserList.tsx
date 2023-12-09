import { useEffect, useState } from 'react'
import { blockUserAPI, loadUsersAPI } from '../../../Services/InteractionsAPI'
import { User } from '../../../Types/UserTypes';
import './userList.css'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [userType, setUserType] = useState('user');
    const [updated, setUpdated] = useState(0)
    const Navigate = useNavigate()

    const handleLoadUsers = async (userType: string) => {
        const userData = await loadUsersAPI(userType);
        if (userData) {
            setUsers(userData?.data)            //table data
            console.log("users", users)
        }
    }

    const statusChangeHandler = async (_id: string) => {
        const userData = await blockUserAPI(_id);
        if (userData) {
            toast.success(userData.message)
            console.log("blockStatus", userData)
        }
        setUpdated(updated === 0 ? 1 : 0)
    }

    useEffect(() => {
        handleLoadUsers(userType)
    }, [userType, updated])

    return (
        <>
            <Toaster />
            <div className='mx-9'>
                <h1 className='text-3xl m-5 font-semibold'>User Management</h1>
                <div className="flex justify-start p-3">
                    {userType === 'user' ?
                        <button className="bg-cyan-600 text-white font-bold py-2 px-4 ml-2 rounded cursor-default">
                            USERS </button> :
                        <button className="bg-slate-400 hover:bg-cyan-700 text-white font-bold py-2 px-4 ml-2 rounded"
                            onClick={() => setUserType('user')}> USERS </button>}

                    {userType === 'tutor' ? <button className="bg-cyan-600 text-white font-bold py-2 px-4 ml-2 rounded cursor-default">
                        TUTOR </button> :
                        <button className="bg-slate-400 hover:bg-cyan-700 text-white font-bold py-2 px-4 ml-2 rounded"
                            onClick={() => setUserType('tutor')}> TUTOR </button>
                    }
                    {userType==='tutor' &&  <button className="bg-slate-100 hover:bg-slate-200 text-cyan-700 font-bold py-2 px-4 ml-6 rounded" onClick={()=> Navigate('/admin/addTutor')}>  ➕Add Tutor </button>}
                </div>

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
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="text-center">
                                    <td className="border px-4 py-2 mx-auto">
                                        <img style={{ width: 50 }} src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png" alt="Profile pic" />
                                    </td>
                                    <td className="border px-4 py-2">{user.firstName} {user.lastName}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.phone}</td>
                                    <td className="border px-4 py-2">{user.isBlocked ? '⛔' : '✔️'}</td>
                                    <td className="border px-4 py-2">
                                        <button onClick={() => statusChangeHandler(user._id!)} className="custom-btn btn-12"><span>{user.isBlocked ? 'UNBLOCK' : 'BLOCK'}</span><span>{user.isBlocked ? 'BLOCKED' : 'ACTIVE'}</span></button>
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

export default UserList