import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { blockCoursesAPI, listAllCoursesAPI } from "../../services/interactionsAPI"
import { courseData } from "../../types/courseTypes"
import BranchList from "../../components/AdminComponents/BranchList"
import AdminHeader from "../../components/AdminComponents/AdminHeader"

function CourseManage() {
  const Navigate = useNavigate()
  const [courses, setCourses] = useState<courseData[] | undefined>(undefined);
  const [searchResult, setSearchResult] = useState<courseData[] | undefined>(undefined);
  const [change, setChange] = useState(1)

  useEffect(() => {
    (async () => {
      const courseList = await listAllCoursesAPI()
      const courses = courseList.data
      // console.log("courses", courses)  //test
      setCourses(courses)
      setSearchResult(courses)
    })()
  }, [change])

  const handleUnlist = async (_id: string) => {
    const confirmed = window.confirm(`Sure to change block status?`)
    if (!confirmed) return
    const role = "admin"
    const isBlock = await blockCoursesAPI(_id, role)
    toast.success(isBlock.message)
    setChange(change === 1 ? 2 : 1)
  }

  const handleSearch = (keyword: string) => {
    const regex = new RegExp(keyword, 'i');
    setSearchResult(courses?.filter((course) => regex.test(course?.courseName))); //find products with keyword
  }

  return (
    <>
      <AdminHeader />
      <Toaster />
      <h1 className='text-3xl m-7 font-semibold'>Course Management</h1>

      <BranchList setChange={setChange} change={change} />

      {/* -------------- SEARCH BOX ----------------- */}
      <div className="container mx-auto py-4 w-1/2 my-auto">
        <form className="group relative" onSubmit={(e) => e.preventDefault()}>
          <input className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2  pl-10 pr-4 ring-1 ring-slate-200 shadow-sm truncate" type="text" aria-label="Filter projects" placeholder="Search courses..." onChange={(e) => handleSearch(e.target.value)} />
        </form>
        <svg width="20" height="20" fill="currentColor" className="absolute right-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500 cursor-pointer" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
        </svg>
      </div>

      {/* --------COURSE SECTION---------- */}
      <section className="container mx-auto">
        <div className="mx-auto max-w-7xl px-2 md:px-0 my-4">

          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">

            {/* Course List */}
            {searchResult && searchResult.map((course) => (
              <div key={course._id}>
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden  m-6">
                  <div className=" ">
                    <div className="">
                      <img className="h-48 w-full object-cover " src="https://images.pexels.com/photos/6863175/pexels-photo-6863175.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Course Image" />
                    </div>
                    <div className={course.isBlocked ? "p-8 bg-red-100 text-gray-500" : "p-8 bg-white text-gray-500"}>
                      <div className="uppercase tracking-wide text-2xl text-indigo-500 font-semibold">{course.courseName}</div>
                      <p className="my-2"> <strong>Status: </strong> {course.status} </p>
                      <p className="my-4 text-xl"><strong>Fee: </strong>₹ {course.fee}/-</p>
                      <button
                        onClick={() => { Navigate(`/admin/course?id=${course._id}`) }}
                        className="bg-slate-100 hover:bg-slate-200 text-cyan-600 font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline">
                        View Details
                      </button>
                      {course.isBlocked ?
                        <button
                          onClick={() => { handleUnlist(course._id!) }}
                          className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                          Activate
                        </button>
                        : <button
                          onClick={() => { handleUnlist(course._id!) }}
                          className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                          Unlist
                        </button>}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div >
      </section>
      {/* ------------------ */}
    </>
  )
}

export default CourseManage