import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, Outlet } from 'react-router-dom';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

const Layout = () => {
    const [menu , setMenu] = useState(false)
    // const id = getToken()x
    const image = import.meta.env.VITE_APP_FILES_URL
  return (
    <div className=' bg-white'>
        {
            menu ?
            (
                <div className='shadow-2xl rounded-md w-[40%] fixed top-[10px] left-[10px] z-50 bg-white h-[250px]'>
                    <ul className='flex flex-col justify-between text-[20px]'>
                        <Link to={"/"}><li onClick={() => setMenu(false)} className='  h-[50px] hover:bg-[#ccc] flex items-center pl-[10px] cursor-pointer'>Home</li></Link>
                        <Link to={"/contact"}><li onClick={() => setMenu(false)} className='  h-[50px] hover:bg-[#ccc] flex items-center pl-[10px] cursor-pointer'>Contact</li></Link>
                        <Link to={"/about"}><li onClick={() => setMenu(false)} className='  h-[50px] hover:bg-[#ccc] flex items-center pl-[10px] cursor-pointer'>About</li></Link>
                        <Link to={"/registration"}><li onClick={() => setMenu(false)} className='  h-[50px] hover:bg-[#ccc] flex items-center pl-[10px] cursor-pointer'>Sign Up</li></Link>
                        <Link to={"/login"}><li onClick={() => setMenu(false)} className='  h-[50px] hover:bg-[#ccc] flex items-center pl-[10px] cursor-pointer'>Log In</li></Link>
                    </ul>
                </div>
            ) : null
        }
        <div className='p-[10px_50px] w-[100%] bg-[#1C2536] text-white text-[20px] flex justify-between items-center fixed top-0 z-50'>
            <img src="../src/assets/logo.svg" alt="logo" className='w-[200px]' />
            <div className='flex items-center gap-2 w-[80%] justify-between'>
                <div className='flex items-center gap-2 w-[50%]'>
                    <SearchIcon fontSize='large'/>
                    <input type="text" className=' w-[100%] h-[5svh] outline-none border-none bg-transparent placeholder:text-[white] tracking-[1px]' placeholder='Search...' />
                </div>
                <div className='flex items-center gap-5'>
                    <Link to={"shopCart"}>
                        <NotificationsNoneOutlinedIcon fontSize='large'/>
                    </Link>
                    <Link to={"profile"} className='flex gap-5 items-center'>
                        <img src={""} alt="user" className='w-[60px] h-[60px] rounded-full object-cover' />
                        <p className=" font-bold">Ehson</p>
                    </Link>
                </div>
            </div>
        </div>
        <div className='flex justify-end'>
            <aside className='w-[20%] flex flex-col gap-2  text-[20px] text-white bg-[#1c2536] h-screen p-[50px_20px] tracking-[1px] top-0 left-0 fixed z-40 pt-[110px]'>
                <Link to={"/dashboard"}><button className='p-[10px_20px] focus:bg-white focus:text-[#1c2536] w-[100%] flex gap-2 items-center rounded-md font-[600]'><HomeOutlinedIcon fontSize='large'/>Dashboard</button></Link>
                <Link to={"product"}><button className='p-[10px_20px] focus:bg-white focus:text-[#1c2536] w-[100%] flex gap-2 items-center rounded-md font-[600]'><LocalOfferOutlinedIcon fontSize='large'/>Products</button></Link>
                <Link to={"order"}><button className='p-[10px_20px] focus:bg-white focus:text-[#1c2536] w-[100%] flex gap-2 items-center rounded-md font-[600]'><ListOutlinedIcon fontSize='large'/>Orders</button></Link>
                <Link to={"category"}><button className='p-[10px_20px] focus:bg-white focus:text-[#1c2536] w-[100%] flex gap-2 items-center rounded-md font-[600]'><FolderOpenOutlinedIcon fontSize='large'/>Categorys</button></Link>
            </aside>
            <aside className='w-[80%] p-[20px] mt-[80px] min-h-[100svh]'><Outlet/></aside>
        </div>
    </div>
  )
}

export default Layout