import { useState } from "react";
import toast from "react-hot-toast";
import { editCourseImgAPI } from "../../services/interactionsAPI";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

function CourseImageEdit(props: { ID: string, change: number, setChange: React.Dispatch<React.SetStateAction<number>> }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [image, setImage] = useState<Blob | null>(null)
    const openModal = () => setIsModalOpen(true)    // Function to open the modal
    const closeModal = () => setIsModalOpen(false)  // Function to close the modal


    async function handleEditImage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!image) {   //no image selected scenario
            return toast.error("Please add image file");
        }
        const fileType = image.type
        if (fileType == "image/png" || fileType == "image/jpeg" || fileType == "image/jpg"
            || fileType == "image/webp" || fileType == "image/WebP" || fileType == "image/bmp") {
        } else {
            //non-image file selected scenario
            return toast.error("Please upload an image file");
        }
        setIsUploading(true)
        try {
            // Upload an image to Firebase Storage
            const storage = getStorage();
            const storageRef = ref(storage, `/image/${props?.ID}`);

            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, image).then(() => {
                // console.log('Uploaded a blob or file!', snapshot);  //test

                getDownloadURL(storageRef).then(async (url) => {
                    // console.log('URL' + url);  //test
                    const imageData = { courseId: props?.ID, image: url };
                    // console.log('Image data:', imageData);  //test

                    const response = await editCourseImgAPI(imageData);
                    // console.log("newImage", response)    //test
                    toast.success(response.message);
                    props?.setChange(props?.change === 1 ? 2 : 1)
                    closeModal()
                    setIsUploading(false)
                })
            })
        } catch (error) {
            console.log((error as Error).message)
            toast.error((error as Error).message)
        }
    }
    return (
        <>
            <button className='w-full py-2 bg-cyan-600 text-white' onClick={() => openModal()}>Edit image</button>

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
                                <h1 className='font-bold text-2xl text-center text-cyan-700'>Course Image</h1>
                                <div className="pt-10 sm:mx-auto ">
                                    <form className="space-y-6" onSubmit={handleEditImage}>

                                        {image && <img src={image ? URL.createObjectURL(image) : ''} alt="image" className='mb-4' style={{ width: 170 }} />}

                                        <div className="col-12 mb-4">
                                            <input type="file" name="product_image" accept="image/*" id="imageInput" className="block ps-2 sm:ms-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => { if (e.target.files) setImage(e.target.files[0]) }} />
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="flex mx-auto justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600" 
                                            >
                                                {isUploading ?
                                                <>
                                                <img style={{width:15}} src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" alt="uploading" /> Uploading
                                                </>
                                                : "Upload Image"}
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

export default CourseImageEdit