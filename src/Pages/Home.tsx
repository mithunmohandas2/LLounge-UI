import Waves from "../components/Waves/Waves"
import Header from "../components/Header/Header"
import Main from "../components/Main/Main"
function Home() {
  return (
    <div className="min-h-screen">

      <Header />
      <Main />

      {/* <h1>Banner</h1>
      <h1>Courses</h1>
      <h1>About us</h1>
      <h1>Testimonials</h1>
      <h1>Contact us</h1> */}
      

      <Waves />
    </div>
  )
}

export default Home