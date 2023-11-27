import Waves from "../../components/CommonComponents/Waves/Waves"
import Header from "../../components/CommonComponents/Header/Header"
import Main from "../../components/CommonComponents/Main/Main"
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