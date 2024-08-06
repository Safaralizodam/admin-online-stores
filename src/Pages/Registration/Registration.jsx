
const Registration = () => {


  return (
    <div className=' flex justify-between items-center'>
      <div className='w-[50%] h-screen bg-[#1c2536] flex p-[0_50px] flex-col justify-center gap-2'>
        <p className="text-white text-[30px] tracking-[1px] font-bold">Welcome to admin panel</p>
        <img src="../src/assets/logo.svg" alt="logo" className='w-[50%]' />
      </div>
      <div className='w-[25%] mr-[11%]   flex flex-col items-start  gap-5 ph:w-[90%]'>
        <p className="text-[30px] font-[600]">Sign Up</p>

        <form className='flex flex-col gap-5 w-[100%]'>
          <input type="text" className='text-[20px] w-[100%] border outline-none border-[gray] p-[5px_10px] rounded-md h-[6svh]' placeholder='UserName' />
          <input type="text" className='text-[20px] w-[100%] border outline-none border-[gray] p-[5px_10px] rounded-md h-[6svh]' placeholder='PhoneNumber' />
          <input type="text" className='text-[20px] w-[100%] border outline-none border-[gray] p-[5px_10px] rounded-md h-[6svh]' placeholder='Email' />
          <input type="password" className='text-[20px] w-[100%] border outline-none border-[gray] p-[5px_10px] rounded-md h-[6svh]' placeholder='password' />
          <input type="text" className='text-[20px] w-[100%] border outline-none border-[gray] p-[5px_10px] rounded-md h-[6svh]' placeholder='confirmPassword' />
          {/* <p className="text-[20px] text-[#1c2536] text-center cursor-pointer">Forget Password?</p> */}
          <button className=' rounded-md text-white text-[20px] py-[10px] bg-[#DB4444]' type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Registration