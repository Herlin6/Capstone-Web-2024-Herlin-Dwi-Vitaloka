import axios from 'axios'
import { useState, useEffect } from 'react';
import AddList from './components/addList'
import RemoveList from './components/removeList'

function BorrowingList() {
  const [pinjaman, setPinjaman] = useState([])

  const fetchData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/borrowing-lists?populate=*`)
    setPinjaman(res.data.data)
  }
  
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className='body'>
      <AddList/>
      <div className='d-flex justify-content-center my-3'>
        <table style={{width:'1400px'}} className="border border-dark-subtle rounded table table-dark table-striped">
        <thead>
          <tr style={{textAlign:'center'}}>
            <th className='text-white' style={{width:'20%'}} scope="col">Nama</th>
            <th className='text-white' style={{width:'33%'}} scope="col">Judul Buku</th>
            <th className='text-white' style={{width:'18%'}} scope="col">Tanggal Pinjam</th>
            <th className='text-white' style={{width:'18%'}} scope="col">Waktu Pinjam</th>
            <th className='text-white' style={{width:'12%'}} scope="col">Hapus</th>
          </tr>
        </thead>
        <tbody>
          {pinjaman.map((pinjam, i) => (
            <tr key={i} style={{verticalAlign:'middle'}}>
                <td className='text-white'>{pinjam?.attributes?.name}</td>
                <td className='text-white'>{pinjam?.attributes?.book?.data?.attributes?.title}</td>
                <td className='text-white' style={{textAlign:'center'}}>{new Date(pinjam?.attributes?.updatedAt).toLocaleString().split(",")[0]}</td>
                <td className='text-white' style={{textAlign:'center'}}>{new Date(pinjam?.attributes?.updatedAt).toLocaleString().split(",")[1].trim()}</td>
                <td className='text-white' style={{textAlign:'center'}}>
                  <RemoveList fetchData={fetchData} remove={pinjam}/>
                </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default BorrowingList

