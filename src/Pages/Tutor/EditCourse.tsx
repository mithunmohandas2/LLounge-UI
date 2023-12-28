import toast, { Toaster } from 'react-hot-toast';
import TutorHeader from '../../components/TutorComponents/TutorHeader';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { courseDetailsAPI, editCourseAPI } from '../../services/interactionsAPI';
import { isValidFee } from '../../services/validations';
import ModuleList from '../../components/TutorComponents/ModuleList';

function EditCourse() {
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [branchId, setBranchId] = useState('');
    const [description, setDescription] = useState('');
    const [fee, setFee] = useState('');
    const [change, setChange] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const openEditModal = () => setIsEditModalOpen(true)    // Function to open the EditModal
    const closeEditModal = () => setIsEditModalOpen(false)  // Function to close the modal
    const tutor = localStorage.getItem("_id") || '656f144c942b35a3182bc55f'  //test
    const location = useLocation()

    async function handleEditCourse(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const courseEditData = { courseId, courseName, branchId, description, fee };
        // console.log('Course data:', courseData);    //test
        if (!branchId) {
            return toast.error("Please select a branch");
        }
        if (!isValidFee(fee)) {
            return toast.error("Please select a valid fee amount");
        }
        if (!courseName || !description || !tutor) {
            return toast.error("Missing required fields");
        }
        try {
            //for editing course
            const isEdited = await editCourseAPI(courseEditData); //for edit course api call
            toast.success(isEdited.message);
            setChange(change === 1 ? 2 : 1)
        } catch (error) {
            console.log((error as Error).message)
            toast.error((error as Error).message)
        }
    }

    useEffect(() => {
        const query = location.search
        if (!query?.length) return
        const _id = query.slice(query.indexOf('=') + 1, query.length)
        // console.log(_id)
        const getData = async () => {
            const courseList = await courseDetailsAPI(_id)
            const course = courseList.data
            // console.log("course", course)
            setCourseName(course?.courseName)
            setCourseId(course?._id)
            setDescription(course?.description)
            setFee(course?.fee)
        }
        getData()

    }, [change])

    return (
        <>
            <TutorHeader />
            <div className="flex flex-col justify-center px-6 py-14 sm:py-12 lg:px-8 bg-slate-300">
                <div className="container px-5 m-3">
                    <div className="flex">
                        <h1 className='font-bold text-4xl my-3 text-cyan-600'>{courseName}</h1>
                        <button style={{ width: 58 }} className="zoomEffect mx-3">
                            <img style={{ width: 25, cursor: 'pointer' }} src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="EditUser" onClick={() => openEditModal()} />
                        </button>
                    </div>
                    <hr />
                    <h4 className='my-3 text-slate-800 font-bold text-xl md:text-2xl'>Course Description</h4>
                    <h4 className='m-3 text-slate-800 font-bold text-md md:text-xl'>{description}</h4>

                </div>
                <Toaster />

                {/* Modal */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center z-40">
                        <div className="bg-transparent p-2">
                            {/* Close button */}
                            <div className="text-end">
                                <button className="absolute text-white hover:scale-150 focus:outline-none" onClick={() => { closeEditModal(); setChange(change === 1 ? 2 : 1) }}>
                                    X
                                </button>
                            </div>
                            <div className="flex flex-col justify-center py-3 bg-transparent">
                                <div className="p-8 bg-slate-100  rounded-2xl mx-auto ">
                                    <h1 className='font-bold text-3xl text-center text-cyan-700'>Edit Course</h1>
                                    <div className="pt-10 sm:mx-auto">
                                        <form className="space-y-6" onSubmit={handleEditCourse}>
                                            <div className="mb-3 ">
                                                <input id="courseName" name="courseName" type="text" required
                                                    className="block w-full ps-2 sm:ms-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                    placeholder="Course Name"
                                                    value={courseName} onChange={(e) => setCourseName(e.target.value.trimStart())} />
                                            </div>
                                            <div className="mb-3">
                                                <select id="branchId" name="branchId" required
                                                    className="block w-full ps-2 sm:ms-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                    placeholder="Branch ID" value={branchId} onChange={(e) => setBranchId(e.target.value)}>
                                                    {/* test - map from branches */}
                                                    <option className='text-opacity-40' value="">Select Branch</option>
                                                    <option value="657999eb79d6e8d2cf58e3a5">Accounting</option>

                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <textarea id="description" name="description" required
                                                    className="block w-full ps-2 sm:ms-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 resize-none"
                                                    placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value.trimStart())} ></textarea>
                                            </div>

                                            <div className="mb-3">
                                                <input id="fee" name="fee" type="number" required
                                                    className="block w-full ps-2 sm:ms-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                    placeholder="Course Fee" value={fee} onChange={(e) => setFee(e.target.value.trimStart())} />
                                            </div>
                                            <div>
                                                <button type="submit" className="flex mx-auto justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
                                                    Edit Course
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


                {/* Module List */}
                <ModuleList ID={courseId} setChange={setChange} change={change} />
            </div>
        </>
    );
}

export default EditCourse;
