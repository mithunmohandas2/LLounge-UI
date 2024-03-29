
import toast from 'react-hot-toast';
import { useState } from 'react';
import { createModuleAPI } from '../../services/interactionsAPI';
import { isValidDuration } from '../../services/validations';
import { Module } from '../../types/courseTypes';

function EditModule(props: { courseId: string, module: Module, change: number, setChange: React.Dispatch<React.SetStateAction<number>> }) {
    const [modName, setModName] = useState(props?.module?.modName);
    const [content, setContent] = useState(props?.module?.content);
    const [duration, setDuration] = useState(props?.module?.duration);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true)    // Function to open the modal
    const closeModal = () => setIsModalOpen(false)  // Function to close the modal

    async function handleEditModule(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!modName || !content || !duration) return toast.error("Missing required fields");
        if (!isValidDuration(duration)) return toast.error("Enter a valid duration");

        const moduleData = { courseId: props?.courseId, _id: props?.module._id, modName, content, duration };
        // console.log('Module data:', moduleData);  //test
        try {
            const response = await createModuleAPI(moduleData);
            // console.log("EditedModule", response)    //test
            toast.success(response.message);
            props?.setChange(props?.change === 1 ? 2 : 1)
            closeModal()
        } catch (error) {
            console.log((error as Error).message)
            toast.error((error as Error).message)
        }
    }
    return (
        <>
            <button onClick={() => openModal()} className="bg-slate-100 hover:bg-slate-200 text-cyan-600 font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline">
                <img style={{ width: 25, cursor: 'pointer' }} src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="Edit Module" />
            </button>

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
                                <h1 className='font-bold text-2xl text-center text-cyan-700'>Edit Module</h1>
                                <div className="pt-10 sm:mx-auto ">
                                    <form className="space-y-6" onSubmit={handleEditModule}>
                                        <div className="mb-3">
                                            <input id="modName" name="modName" type="text" required
                                                className="block ps-2 sm:ms-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                placeholder="Module Name"
                                                value={modName} onChange={(e) => setModName(e.target.value.trimStart())} />
                                        </div>


                                        <div className="mb-3">
                                            <textarea id="content" name="content" required
                                                className="block w-full ps-2 sm:ms-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 resize-none"
                                                placeholder="Content" value={content} onChange={(e) => setContent(e.target.value.trimStart())} ></textarea>
                                        </div>

                                        <div className="mb-3">
                                            <input id="duration" name="duration" type="number" required
                                                className="block w-full ps-2 sm:ms-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                placeholder="Duration in hours" value={duration} onChange={(e) => setDuration(e.target.value.trimStart())} />
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="flex mx-auto justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                                            >
                                                Edit Module
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

export default EditModule







