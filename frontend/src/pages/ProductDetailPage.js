import Navbar from '../features/navbar/Navbar'
import ProductDetail from '../features/product/components/ProductDetail'

const Home = () => {
  return (
    <div>
        <Navbar>
            <ProductDetail/>
        </Navbar>
    </div>
  )
}

export default Home