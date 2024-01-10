import toast, { Toaster } from 'react-hot-toast';
import TutorHeader from '../../components/TutorComponents/TutorHeader';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { courseDetailsAPI, editCourseAPI, listBranchesAPI } from '../../services/interactionsAPI';
import { isValidFee } from '../../services/validations';
import AddModule from '../../components/TutorComponents/AddModule';
import { Branch, Module, courseData } from "../../types/courseTypes";
import CourseImageEdit from '../../components/TutorComponents/CourseImageEdit';
import EditModule from '../../components/TutorComponents/EditModule';
import MaterialsEdit from '../../components/TutorComponents/MaterialsEdit';
import firebase from '../../firebase/config';


function EditCourse() {
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [branchId, setBranchId] = useState('');
    const [allBranches, setAllBranches] = useState<Branch[] | undefined>(undefined);
    const [description, setDescription] = useState('');
    const [fee, setFee] = useState('');
    const [branch, setBranch] = useState('');
    const [modules, setModules] = useState<Module[] | undefined>(undefined);
    const [courseImg, setCourseImg] = useState('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg')
    const [change, setChange] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const openEditModal = () => setIsEditModalOpen(true)    // Function to open the EditModal
    const closeEditModal = () => setIsEditModalOpen(false)  // Function to close the modal
    const tutor = localStorage.getItem("_id") || '656f144c942b35a3182bc55f'  //test
    const location = useLocation()
    const storage = firebase

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
            const isEdited = await editCourseAPI(courseEditData); //for edit course api call
            toast.success(isEdited.message);
            setChange(change === 1 ? 2 : 1)
            closeEditModal()
        } catch (error) {
            console.log((error as Error).message)
            toast.error((error as Error).message)
        }
    }

    useEffect(() => {
        const query = location.search
        if (!query?.length) return
        const _id = query.slice(query.indexOf('=') + 1, query.length)   //extracting Course ID from query
        const getCourseData = async () => {
            const courseList = await courseDetailsAPI(_id)             //fetch details of course
            const course = courseList.data
            // console.log("course", course) //test
            setCourseName(course?.courseName)
            setCourseId(course?._id!)
            setDescription(course?.description)
            setFee(course?.fee)
            setModules(course?.modules)
            setBranch(course?.branchId?.branchName)
            if (course?.image) setCourseImg(course?.image)
        }
        getCourseData()
    }, [change])


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
                <div className="container px-5 m-3">
                    <section id="home" className="flex flex-col-reverse justify-center sm:flex-row p-6 pb-0 items-center gap-8 mb-12 scroll-mt-20">
                        <div className="sm:w-1/2">
                            <div className="flex">
                                <h1 className='font-bold text-4xl my-3 text-cyan-600'>{courseName}</h1>
                                <button style={{ width: 58 }} className="zoomEffect mx-3">
                                    <img style={{ width: 25, cursor: 'pointer' }} src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="Edit Course" onClick={() => openEditModal()} />
                                </button>
                            </div>
                            <h4 className='my-3 text-slate-800 font-bold text-xl md:text-2xl'>Course Description</h4>
                            <h4 className='m-3 text-slate-800 font-bold text-md md:text-xl text-justify'>{description}</h4>
                            <hr />
                            <h4 className='my-3 text-slate-800 text-md md:text-xl'> <span className="font-bold ">Branch :</span> {branch}</h4>
                            <h4 className='my-3 text-slate-800 font-bold text-xl md:text-2xl'>Fee : ₹ {fee}/-</h4>
                            <hr />
                        </div>

                        <div className="row">
                            <img className="" src={courseImg} alt="Course Image" />
                            <CourseImageEdit ID={courseId} setChange={setChange} change={change} />
                        </div>

                    </section>

                    {/* --------MODULE SECTION---------- */}
                    <section className="container mx-auto">
                        <div className="mx-auto max-w-7xl px-2 md:px-0 my-4">
                            <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">

                                {modules?.length && modules.map((module) => (
                                    <div key={module?._id}>
                                        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden  m-6">
                                            <div className="p-8 bg-white text-gray-500">
                                                <div className="uppercase tracking-wide text-2xl text-indigo-500 font-semibold">{module?.modName}</div>
                                                {/* <p className="my-2"> <strong>ID:</strong> {module._id} </p> */}
                                                <p className="my-4"><strong>Description: </strong> {module?.content}</p>
                                                <p className="my-4 text-xl"><strong>Duration: </strong>{module?.duration} hours</p>
                                                <EditModule courseId={courseId} module={module} setChange={setChange} change={change} />

                                                {module.materials ? <a target='_blank' href={module.materials}>
                                                    <button className="bg-slate-100 hover:bg-slate-200 text-cyan-600 font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline">
                                                        <img style={{ width: 25, cursor: 'pointer' }} src="https://cdn.icon-icons.com/icons2/402/PNG/512/open-file_40455.png" alt="view materials" />
                                                    </button>
                                                </a> : null}

                                                <MaterialsEdit courseId={courseId} module={module} setChange={setChange} change={change} />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </section>
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
                <AddModule ID={courseId} setChange={setChange} change={change} />
            </div >
        </>
    );
}

export default EditCourse;
