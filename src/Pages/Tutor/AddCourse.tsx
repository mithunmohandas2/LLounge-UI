import toast, { Toaster } from 'react-hot-toast';
import TutorHeader from '../../components/TutorComponents/TutorHeader';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourseAPI, listBranchesAPI } from '../../services/interactionsAPI';
import { isValidFee } from '../../services/validations';
import { Branch } from '../../types/courseTypes';

function AddCourse() {
    const [courseName, setCourseName] = useState('');
    const [branchId, setBranchId] = useState('');
    const [allBranches, setAllBranches] = useState<Branch[] | undefined>(undefined);
    const [description, setDescription] = useState('');
    const [fee, setFee] = useState('');
    const tutor = localStorage.getItem("_id") || '656f144c942b35a3182bc55f'  //test
    const Navigate = useNavigate()

    async function handleCreateCourse(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const courseData = { courseName, branchId, description, tutor, fee };
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
            //for adding new course
            const response = await createCourseAPI(courseData); //for new course api call
            // console.log("newCourse", response)    //test
            if (response?.data) {
                const courseId = response?.data?._id
                toast.success('New Course created');
                setTimeout(() => {
                    //redirect to edit course if new course created
                    Navigate(`/tutor/editCourse?id=${courseId}`)
                }, 2000);
            } else {
                toast.error(response?.response?.data?.message)
            }
        } catch (error) {
            console.log((error as Error).message)
            toast.error((error as Error).message)
        }
    }

    useEffect(() => {
        (async function () {
            const branchList = await listBranchesAPI()  //fetch details of all branches
            // console.log("branchList", branchList.data) //test
            setAllBranches(branchList.data)
        })();
    }, [])


    return (
        <>
            <TutorHeader />
            <div className="flex flex-col justify-center px-6 py-14 sm:py-12 lg:px-8 bg-slate-300">
                <Toaster />
                <div className="p-8 bg-slate-100  sm:w-1/2 rounded-2xl mx-auto">
                    <h1 className='font-bold text-3xl text-center text-cyan-700'>Create Course</h1>
                    <div className="pt-10 sm:mx-auto w-full ">
                        <form className="space-y-6" onSubmit={handleCreateCourse}>
                            <div className="mb-3">
                                <input name="courseName" type="text" required
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
                                    {allBranches?.map((branch) => (
                                        <option key={branch._id} value={branch._id}>{branch.branchName}</option>
                                    ))}

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
                                <button
                                    type="submit"
                                    className="flex sm:w-1/2 mx-auto justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
                                    Create Course
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCourse;
