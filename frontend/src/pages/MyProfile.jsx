import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed-top profile-bg h-100 d-flex justify-content-center">
        <div className=" my-auto d-flex justify-content-center">
          <div className="card" style={{width:'20rem'}}>
            <img className="mx-auto my-2" style={{width:'230px'}} src="img/Foto.png"/>
            <div className="card-body">
              <h5 className="card-title">Herlin Dwi Vitaloka</h5>
              <p className="card-text text-muted">Mahasiswa Universitas Multi Data Palembang, jurusan Sistem Informasi.</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><i className="bi bi-telephone-fill"></i> 082380663625</li>
              <li className="list-group-item"><i className="bi bi-person-vcard"></i> 2327240034</li>
              <li className="list-group-item"><a className="text-black text-decoration-none" href="https://github.com/Herlin6"><i className="bi bi-github"></i> My Github</a></li>
            </ul>
            <div className="card-body my-1 mx-2 p-0" style={{fontSize:'13px'}}>
              herlindwivitaloka_2327240034@mhs.mdp.ac.id
            </div>
            <div className="text-center">
              <span role="button" className='text-muted' style={{fontSize:'15px'}} onClick={() => navigate('/')}> Back </span>
            </div>
          </div>
        </div>
      </div>
    </>
    )
  }

  export default MyProfile