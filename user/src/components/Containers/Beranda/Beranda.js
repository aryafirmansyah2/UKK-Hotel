import Listkamar from './Components/Listkamar'
import About from './Components/About'
import Pencarian from './Components/Pencarian'
const Beranda = () => {
  return (
    <div>
      <Pencarian/>
      <Listkamar className="mt-52"/>
      <About/>
    </div>
  )
}

export default Beranda