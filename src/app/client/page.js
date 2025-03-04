import "bootstrap/dist/css/bootstrap.min.css";
import Banner from './banner/Banner'
import Content from './content/Content'

function Home() {
  return (
    <div className='homePage'>
      <Banner />
      <Content />
    </div>
  );
}

export default Home;