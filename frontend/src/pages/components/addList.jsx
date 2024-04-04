import axios from 'axios'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { userData } from "../../helpers";
import { ToastContainer, toast } from 'react-toastify';

const AddList = () => {
  const dataUser = userData();
  const [books, setBooks] = useState([])
  const [book, setBook] = useState('')
  const [show, setShow] = useState(false);
  const [name, setName] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (dataUser.email=="admin@gmail.com") {
      setShow(true)
    }else{
      toast.error("Hanya admin yang dapat menambahkan daftar peminjam!", {
        hideProgressBar: true,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:1337/api/serials?populate[books][populate]=*')
      const allBooks = [];
      res.data.data.map((item) => {
        allBooks.push(...item.attributes.books.data);
      });
      setBooks(allBooks);
    }
    fetchData()
  },[]);

  const handleSetBook = (e) => { 
    setBook(e.target.value)
  }
  const handleSetName = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = async () =>{
    try {
      if (name === '' || book === '0') {
        throw new Error('Data tidak lengkap')
      }
      const res = await axios.post('http://localhost:1337/api/borrowing-lists?populate=*', {
      data: {
        name: name,
        book: {
          id: book
        }
      }});

      if (res.status === 200){
        window.location.reload();
      }else{
        toast.error("Gagal menambahkan!", {
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error("Data tidak lengkap!", {
        hideProgressBar: true,
      });
    }
  };
  return(
    <>
      <div className="pt-5 d-flex justify-content-center gap-2">
        <button onClick={handleShow} role="button" className="btn btn-secondary rating_filter text-center fs-4 rounded text-dark">Tambah Daftar</button>
      </div>
      <Modal size="md" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Input Daftar Peminjam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-1">
              <div className="mb-3">
                Nama: <br/>
                <input className='form-control' type="text" onChange={handleSetName}/>
              </div>
              <div>
                Judul Buku: <br/>
                <select className='form-select' onChange={handleSetBook}>
                  <option default value="0">Pilih Buku</option>

                  {books.map((item, i) => (
                      <option value={item.id} key={i}>
                        {item?.attributes?.title}
                      </option>
                    ))}
                </select>
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default AddList;