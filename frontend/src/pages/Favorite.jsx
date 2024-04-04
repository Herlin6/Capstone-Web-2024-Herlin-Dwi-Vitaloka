import axios from "axios";
import { useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom"

const Favorite = () => {
  const [books, setBooks] = useState([])
  const navigate = useNavigate()
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/serials?populate[books][populate]=*`);
      const allBooks = [];
      res.data.data.map((item) => {
        allBooks.push(...item.attributes.books.data);
      });
      setBooks(allBooks);
    }
    fetchData();
  }, [ignored]);

  const handleSetFavorite = async (id, favorite) => {
    const konfirmasi = confirm('Apakah Anda yakin ingin menghapus buku dari dafatar favorit?')
    if (konfirmasi){
      const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/books/${id}?populate=*`, {
      data: {
        favorite: !favorite
      }
    })
    if (res.status == '200') {
      forceUpdate();
    } else {
      alert('error update data')
    }}
  }

  let favorite = books.filter(book => book.attributes.favorite == true)
  return (
    <div className="body d-flex flex-wrap justify-content-center gap-4 p-5 mx-5">
      {!favorite.length?
          <div className="emptyList">
            Daftar favorite kosong <br/>
            <a href="/books" className="text-decoration-none text-white fs-5">Kembali ke daftar buku</a>
          </div> : null
        }
      {favorite.map((item, i) => (
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
  )
}

export default Favorite