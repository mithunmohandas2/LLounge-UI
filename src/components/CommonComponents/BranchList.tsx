
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { isValidName } from '../../services/validations';
import { createBranchAPI, listBranchesAPI } from '../../services/interactionsAPI';
import { Branch } from '../../types/courseTypes';

function BranchList(props: { setChange: (arg0: number) => void; change: number; handleBranchFilter: (arg0: string) => void; user: boolean; selectedBranch: string }) {
    const [branchName, setBranchName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [branches, setBranches] = useState<Branch[] | undefined>(undefined);
    const openModal = () => setIsModalOpen(true)    // Function to open the modal
    const closeModal = () => setIsModalOpen(false)  // Function to close the modal

    
    async function handleCreateBranch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("branchName => ", branchName)
        if (!branchName.length) return toast.error("Missing required fields");
        if (!isValidName(branchName)) return toast.error("Enter a valid branch name");
        try {
            const response = await createBranchAPI(branchName);
            // console.log("newBranch", response)    //test
            toast.success(response.message);
            props?.setChange(props?.change === 1 ? 2 : 1)
            closeModal()
        } catch (error) {
            console.log((error as Error).message)
            toast.error((error as Error).message)
        }
    }

    useEffect(() => {
        (async () => {
            const branchList = await listBranchesAPI()
            const branches = branchList.data
            // console.log("branches", branches)  //test
            setBranches(branches)
        })()
    }, [props?.change])

    return (
        <>
            <h1 className='text-xl m-8'>Branches</h1>
            <div className="grid grid-cols-1 gap-[30px] md:grid-cols-5 mx-7">
                {/* Branches */}
                <button onClick={() => props?.handleBranchFilter('all')} className={props?.selectedBranch === 'all' ? "border bg-cyan-600 hover:bg-cyan-700 text-white font-bold p-3 mx-2 ml-6 rounded" : "border hover:bg-cyan-600 hover:text-white font-bold p-3 mx-2 ml-6 rounded"}>All Branches</button>
                {branches && branches.map((branch) => (
                    <button key={branch._id}
                        onClick={() => props?.handleBranchFilter(branch._id)}
                        className={props?.selectedBranch === branch._id ? "border bg-cyan-600 hover:bg-cyan-700 text-white font-bold p-3 mx-2 ml-6 rounded" : "border hover:bg-cyan-600 hover:text-white font-bold p-3 mx-2 ml-6 rounded"}>
                        {branch?.branchName}
                    </button>
                ))}

                {/* ----------- */}
                {!props.user && <button className="outline text-cyan-600 hover:bg-cyan-600 hover:text-white font-bold p-2 mx-2 ml-6 rounded" onClick={() => openModal()} >  ➕Add Branch </button>}
            </div>
            <br />

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
                                <h1 className='font-bold text-2xl text-center text-cyan-700'>New Branch</h1>
                                <div className="pt-10 sm:mx-auto ">
                                    <form className="space-y-6" onSubmit={handleCreateBranch}>
                                        <div className="mb-3">
                                            <input id="branchName" name="branchName" type="text" required
                                                className="block ps-2 sm:ms-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                placeholder="Branch Name"
                                                value={branchName} onChange={(e) => setBranchName(e.target.value.trimStart())} />
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="flex mx-auto justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                                            >
                                                Add Branch
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

export default BranchList







