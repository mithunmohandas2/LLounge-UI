import { useSelector } from "react-redux"
import { JSX } from "react/jsx-runtime"
import { UserTypeRedux } from "../../types/userTypes"

function Profile(props: { header: JSX.IntrinsicAttributes }) {
    const data = useSelector((state:UserTypeRedux) => state?.user?.userData)
    return (
        <>
            {props ? props.header : null}
            <div className="container mx-auto my-5 flex flex-col sm:flex-row justify-evenly">
                <div className=" justify-center bg-blue-100 p-7 m-4">
                    <img className="zoomEffect" src="https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" alt="profile pic" />
                </div>
                <div className=" justify-center bg-blue-100 text-black-600 p-7 m-4 rounded-lg">
                    <h3 className="text-xl">User Details</h3>
                    <br />
                    <p><span className='fw-bold'>User ID : </span> {data? data._id:localStorage.getItem("_id")}</p>
                    <p><span className='fw-bold'>Name : </span>{data? data.firstName:""} {data? data.lastName:localStorage.getItem("name")}</p>
                    <p><span className='fw-bold'>Email : </span>{data? data.email:localStorage.getItem("email")}</p>
                    <p><span className='fw-bold'>Phone : </span>  {data? data.phone:localStorage.getItem("phone")} </p>

                </div>
            </div>
        </>
    )
}

export default Profile