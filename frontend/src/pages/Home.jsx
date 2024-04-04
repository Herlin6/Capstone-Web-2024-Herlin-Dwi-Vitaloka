import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { userData } from "../helpers";
const Home = () => {
  const navigate = useNavigate()
  const dataUser = userData();
  
  return (
    <>
    <div className="containers d-flex flex-column justify-content-center align-items-center">
      <div className="container d-flex justify-content-center">
        <div className="card text-white" style={{width:'50rem', background:'rgba(71, 22, 5, 0.3)'}}>
          <div className="card-body mx-5 mb-5 mt-2 gap-3">
            <div>
              <div className="d-grid gap-4">
                <h2 className='text-center m-0'>Hai {dataUser.username}!</h2>
                <button onClick={() => navigate('/books' )} className="btn1 fs-4 btn active" type="button" style={{height:'60px', fontFamily:'courier'}}>Daftar Buku</button>
                <button onClick={() => navigate('/borrowing-list/' )} className="btn1 fs-4 btn active" type="button" style={{height:'60px', fontFamily:'courier'}}>Daftar Pinjaman</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    )
  }

  export default Home
