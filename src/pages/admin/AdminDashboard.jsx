import { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';

function AdminDashboard() {
  const [db, setdb] = useState([])
  const [Cargando, setCargando] = useState(true)

  useEffect(()=>{
    const guardardatosLocalstorage = loadFomLocalstorage("db")
    if (guardardatosLocalstorage){
      setdb(guardardatosLocalstorage)
      setCargando(false)
    } else{
      fetch("src/data/db.json")
      .then(response => response.json())
      .then(data => {
        setdb(data)
        setTimeout(()=>{
          setCargando(false)
        }, 2000);
      })
      .catch((ex) => console.log(ex))
    }
  }, [])
 

  return(
    <div className='admin-layout'>
      <Sidebar/>
      <main className='admin-content'>
        <h1>Admin Dashboard</h1>
        <Routes>
          <Route path="/admin/home" element={<HomePage />} />
          <Route path="/admin/categoria" element={<CategoriaPage />} />
          ...
        </Routes>
        <h1>Contenido principal</h1>
        <p>El contenido de Home, Categoria, etc., aparecerá aquí.</p>

      </main>
    </div>
  )
}
export default AdminDashboard