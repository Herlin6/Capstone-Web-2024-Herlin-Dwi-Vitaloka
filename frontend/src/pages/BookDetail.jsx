import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom"

const BookDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate()
  const [detail, setDetail] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/books/${id}?populate=*`)
      setDetail(res.data.data)
    }
    fetchData()
  }, []);

  return (
    <div className="body bookTitle d-flex justify-content-center mt-5 ">
      <div className="mt-5" style={{width: '75rem'}}>
        <div className="card mb-3 mx-5 bg-dark">
          <div className="row g-0 mt-5">
            {detail?.attributes?.image?.data.map((image, i) => (
                <div key={i} className="col-md-3 p-4 mb-2" style={{textAlign:'center'}}>
                  <img  className="img-fluid rounded" style={{width: '250px'}} src={import.meta.env.VITE_BASE_URL + image?.attributes?.url} alt={image?.attributes?.name} />
                </div>
            ))}
            <div className="col-md-8">
              <div className="card-body text-white">
                <h5 className="text-white card-title fs-1 mb-1">{detail?.attributes?.title}</h5>
                <div className="text-white card-text fs-6 mb-2 hidden-sysnopsis">{detail?.attributes?.synopsis}</div><hr/>
                <div className="card-text">
                  <h5 className="text-white card-title fs-4 my-0 mx-3">Detail</h5>
                  <div className="d-flex">
                    <div className="col-md-4">
                      <div className="card-body">
                        <div className="card-text">
                          <div className="fs-6">
                            <div className="text-secondary">Serial</div>
                            <div className="text-white mb-2">{detail?.attributes?.serial?.data?.attributes?.serial} </div>
                            <div className="text-secondary">Tanggal Terbit</div>
                            <div className="text-white mb-2">{detail?.attributes?.release} </div>
                            <div className="text-secondary">Rate</div>
                            <div className="text-white mb-2">{detail?.attributes?.rate} </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 text-white">
                      <div className="card-body">
                        <div className="card-text">
                          <div className="fs-6">
                            <div className="text-secondary">Author</div>
                            <div className="mb-2">{detail?.attributes?.author?.data?.attributes?.name} </div>
                            <div className="text-secondary">Genre</div>
                            <div className="mb-2 d-flex flex-wrap">
                              {detail?.attributes?.genres?.data.map((genre, i) => (
                                  <span key={i} className="">
                                    <a className="text-white text-decoration-none" href="#">{genre?.attributes?.genre}&nbsp;</a>
                                  </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3 text-center">
              <div onClick={() => navigate('/books/')} className="btn btn-dark bg-gradient mb-0 col-3">Back</div>
            </div>
          </div>
        </div>
        <div className="mt-5">&nbsp;</div>
      </div>
    </div>
  )
}

export default BookDetail