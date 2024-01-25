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
    const userId = query.slice(query.lastIndexOf('=') + 1, query.length)   //extracting user ID from query
    const courseId = query.slice(query.indexOf('=') + 1, query.indexOf('&'));  //extracting Course ID from query
    (async () => {
      const response = await getCertificateAPI(courseId, userId)             //fetch details of certificate
      setCertificateData(response.data)
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