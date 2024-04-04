import axios from 'axios'
import { useState, useEffect, useReducer } from 'react';
import { useNavigate } from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [rating,setRating] = useState(0)
  const [genre, setGenre] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const [selectedGenres, setSelectedGenres] = useState([])

  const handleSetRating = (e) =>{
    setRating(e.target.value)
  }
  const handleSetSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSetGenresFilter = (e) => {
    const value = e.target.value
    const isChecked = e.target.checked

    setSelectedGenres(
      isChecked? [...selectedGenres, value] : selectedGenres.filter((genre) => genre !== value)
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/serials?populate[books][populate]=*`);
      const res2 = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/genres`);
      const allBooks = [];
      res.data.data.map((item) => {
        allBooks.push(...item.attributes.books.data);
      });
      setBooks(allBooks);
      setGenre(res2.data.data);
    }
    fetchData();
  }, [ignored]);
  
  const handleSetFavorite = async (id, favorite) => {
    const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/books/${id}?populate=*`, {
      data: {
        favorite: !favorite
      }
    })
    if (res.status == '200') {
      forceUpdate();
    } else {
      alert('error update data')
    }
  }

  let searched = books
  let searched1 = books.filter(book => book.attributes.title.toLowerCase().includes(search.toLowerCase()))
  if (searched1.length >= 1){
    searched = searched1
  }else{
    let searched2 = books.filter(book => book?.attributes?.author?.data?.attributes?.name.toLowerCase().includes(search.toLowerCase()))
    if (searched2.length >= 1){
      searched = searched2
    }else{
      searched = []
    }
  }

  let filteredRating = []
  if(rating == 0 || rating == "rating0"){
    filteredRating = books
  }else if(rating == "rating1"){
    filteredRating = books.filter(book => book.attributes.rate <= 3.9)
  }else if(rating == "rating2"){
    filteredRating = books.filter(book => book.attributes.rate >= 4 && book.attributes.rate <= 4.3)
  }else if(rating == "rating3"){
    filteredRating = books.filter(book => book.attributes.rate >= 4.4 && book.attributes.rate <= 4.6)
  }else{
    filteredRating = books.filter(book => book.attributes.rate >= 4.7)
  }

  let filteredGenre = books.filter(book =>
    selectedGenres.every(selectedGenre =>
        book?.attributes?.genres?.data?.some(genre =>
          genre?.attributes?.genre?.toLowerCase() === selectedGenre.toLowerCase()
        )
    )
  );

  let filter = filteredGenre.filter(value => searched.filter(value => filteredRating.includes(value)).includes(value));

  return (
    <div className='body'>
        <div className="p-2 header2">
                <div className='my-2'>
                  <div className='d-flex gap-3 mx-auto' style={{width:'150vh'}}>
                    <input className='form-control p-2' placeholder='Cari Judul Buku / Penulis' onChange={handleSetSearch} type="search"/>
                    <span onClick={handleShow} role="button" className="rating_filter text-center bg-white fs-4 p-2 rounded text-dark" style={{width:'50px'}}> <i className="bi bi-star-half"></i> </span>
                  </div>
                </div>
                <div>
                  <div className="text-center d-flex flex-wrap justify-content-center gap-1">
                    {genre.map((item, i) => (
                      <div key={i}>
                        <input value={item?.attributes?.genre} onChange={handleSetGenresFilter} type="checkbox" className="btn-check" id={item?.attributes?.genre}/>
                        <label style={{width:'80px', height:'35px'}} className="text-light btn bg-gradient" htmlFor={item?.attributes?.genre}><div style={{marginTop:'-2px'}}>{item?.attributes?.genre}</div></label>
                      </div>
                    ))  
                    }
                  </div>
                </div>
        </div>
        <Modal size="md" show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title><div className='f2-1'>Filter</div></Modal.Title>
          </Modal.Header>
          <Modal.Header>
            <Modal.Title>Rating</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center d-flex flex-wrap justify-content-center gap-3">
              <div>
              <input onChange={handleSetRating} type="radio" className="btn-check" value="rating1" name="options" id="option1"/>
              <label style={{width:'180px'}} className="btn btn-secondary" htmlFor="option1">Rating ≤ 3.9</label><br/>
              </div>
              <div>
              <input onClick={handleSetRating} type="radio" className="btn-check" value="rating2" name="options" id="option2"/>
              <label style={{width:'180px'}} className="btn btn-secondary" htmlFor="option2">Rating 4 - 4.3</label><br/>
              </div>
              <div>
              <input onClick={handleSetRating} type="radio" className="btn-check" value="rating3" name="options" id="option3"/>
              <label style={{width:'180px'}}  className="btn btn-secondary" htmlFor="option3">Rating 4.4 - 4.6</label><br/>
              </div>
              <div>
              <input onClick={handleSetRating} type="radio" className="btn-check" value="rating4" name="options" id="option4"/>
              <label style={{width:'180px'}} className="btn btn-secondary" htmlFor="option4">Rating ≥ 4.7</label><br/>
              </div>
              <div>
              <input onClick={handleSetRating} type="radio" className="btn-check" value="rating0" name="options" id="option0"/>
              <label style={{width:'180px'}} className="btn btn-secondary" htmlFor="option0">All Rating</label><br/>
              </div>
            </div>
          </Modal.Body>
              <hr className='my-0'/>
          <Modal.Footer>
            <Button onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="d-flex flex-wrap justify-content-center gap-4 p-5 mx-5">
        {!filter.length?
          <div className="emptyList">Buku tidak ditemukan</div> : null
        }
          {filter.map((item, i) => (
              <div key={i}>
                  <div className="product_card card p-2 rounded-4" style={{width: '14rem', backgroundColor:'rgba(122, 47, 3, 0.3)'}}>
                    <table onClick={() => navigate('/books/' + item.id)}>
                      <tbody>
                        <tr>
                          <td align="center">
                              {item?.attributes?.image?.data?.map((image, i) => (
                                  <div key={i}>
                                    <img className='p-1 mt-1' style={{ width: '180px', height: '260px', overflow: 'hidden' }} src={import.meta.env.VITE_BASE_URL + image?.attributes?.url} alt={image?.attributes?.name} />
                                  </div>
                              ))}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-white p-2 align-top" style={{height: '100px'}}>
                            <h5 className="text-white book-title card-title mb-0">{item?.attributes?.title}</h5>
                            <div className="text-secondary">{item?.attributes?.author?.data?.attributes?.name}</div>
                            <div className="text-secondary">Rate: {item?.attributes?.rate}</div>
                          </td>
                        </tr>
                      </tbody>
                      </table>
                      <span style={{width:'42px'}} className="favorite-icon p-2">
                        <input type="checkbox"  className="btn-check" id={item?.id} checked={item?.attributes?.favorite} onChange={() => handleSetFavorite(item?.id, item?.attributes?.favorite)} />
                        <label style={{width:'26px', height:'26px'}} className="btn btn-outline-danger bi bi-heart p-0 m-0" htmlFor={item?.id}></label>
                      </span>
                  </div>
              </div>
          ))}
        </div>
        <div>&nbsp;</div>
    </div>
  )
}

export default App
