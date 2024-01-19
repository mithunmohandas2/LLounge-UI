import { useEffect, useState } from "react"
import Certificate from "../../components/UserComponents/Certificate/Certificate"
import { certificate } from "../../types/certificateType";
import { getCertificateAPI } from "../../services/userInteractionsAPI";
import { Toaster } from "react-hot-toast";

function CertificateView() {
  const [certificateData, setCertificateData] = useState<certificate>();

  useEffect(() => {
    const query = location.search
    if (!query?.length) return
    const userId = query.slice(query.lastIndexOf('=') + 1, query.length)   //extracting Course ID from queryuserId
    const courseId = query.slice(query.indexOf('=') + 1, query.indexOf('&'));  //extracting Course ID from query
    (async () => {
      const response = await getCertificateAPI(courseId, userId)             //fetch details of course
      setCertificateData(response.data)
      // console.log("query", courseId, userId) //test
      // console.log("course", certificateData) //test
    })()
  }, [])

  return (
    <>
      <Toaster />
      {certificateData ?
        <>
          <Certificate certificateData={certificateData} />
        </>
        : null}
    </>
  )
}

export default CertificateView