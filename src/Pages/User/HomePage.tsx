import Waves from "../../components/CommonComponents/Waves/Waves"
import Header from "../../components/CommonComponents/Header"
import Main from "../../components/CommonComponents/MainBody"
function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Main />
      <Waves />
    </div>
  )
}

export default Home