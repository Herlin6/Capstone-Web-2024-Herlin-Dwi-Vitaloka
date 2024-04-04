import axios from 'axios'
import { useEffect, useReducer } from 'react';
import { userData } from "../../helpers";
import { ToastContainer, toast } from 'react-toastify';

const RemoveList = ({ remove, fetchData }) => {
  const dataUser = userData();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const handleSetDeleted = async (e) => {
    if (dataUser.email=="admin@gmail.com") {
      const delate = e.target.value;
      const konfirmasi = confirm('Apakah anda yakin ingin menghapus list tersebut?');
      if (konfirmasi) {
        try {
          const response = await axios.delete(`http://localhost:1337/api/borrowing-lists/${delate}?populate=*`);
          if (response.status === 200) {
            forceUpdate();
          } else {
            toast.error("Gagal menghapus list!", {
              hideProgressBar: true,
            });
          }
        }catch (error) {
          toast.error("Gagal menghapus list!", {
            hideProgressBar: true,
          });
        }
      }
    }else{
      toast.error("Hanya admin yang dapat menghapus daftar peminjam!", {
        hideProgressBar: true,
      });
    }
  };

  useEffect(() => {
    fetchData()
  }, [ignored]);

  return(
    <>
      <button style={{width:'40px'}} value={remove?.id} onClick={handleSetDeleted} className="bi bi-trash3-fill text-white btn p-1 bg-danger rounded"></button>
      <ToastContainer />
    </>
  );
};

export default RemoveList;