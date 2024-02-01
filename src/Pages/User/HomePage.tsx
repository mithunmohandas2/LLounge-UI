import Waves from "../../components/CommonComponents/Waves/Waves"
import Header from "../../components/CommonComponents/LandingHeader"
import Main from "../../components/CommonComponents/MainBody"
import UserHeader from "../../components/UserComponents/UserHeader";
import { useEffect, useState } from "react";
import { initiateServerAPI } from "../../services/interactionsAPI";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) setIsLoggedIn(true)
  }, [])

  useEffect(() => {
    (async () => {
      await initiateServerAPI()
    })()
  }, [])

  return (
    <div className="min-h-screen">
      {isLoggedIn ? <UserHeader /> : <Header />}
      <Main />
      <Waves />
    </div>
  )
}

export default Home