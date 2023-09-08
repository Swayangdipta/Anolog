import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { RiLoader2Fill, RiLoader3Fill } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { isAuthenticated } from '../../utils/LS_Helper'
import { createReport } from './helper/blogHelper'

const ReportForm = ({report,setIsReportOpen = f => f}) => {
  const [reportCause,setReportCause] = useState("Not Mentioned")
  const [isLoading,setIsloading] = useState(false)
  const {user,token} = isAuthenticated()

  const handleReport = ev => {
    ev.preventDefault()
    setIsloading(true)
    let fullReport = {
      reportType: report.type,
      reporter: user._id,
      reportCause: reportCause,
      reportedItem: {
        ...report
      }
    }

    createReport(fullReport,user._id,token).then(data=>{
      if(data.response?.data.error){
        setIsloading(false)
        return toast.error(data.response.data.message[0])
      }else if(data.name === 'AxiosError'){
        setIsloading(false)
        return toast.error('Faild to submit report!')
      }

      setIsloading(false)
      setIsReportOpen(false)
      return toast.success('Reported!')
    })

  }

  return (
    <div className='w-screen h-screen bg-[#ff000010] flex items-center justify-center fixed top-0 left-0 z-[100000009]'>
        <div className='w-[300px] min-h-[200px] p-2 h-max rounded bg-zinc-900 relative top-0'>
          <div className='w-[50px] h-[50px] rounded-full bg-rose-800 absolute top-[-60px] right-0 cursor-pointer flex items-center justify-center' onClick={e=> setIsReportOpen(false)}><MdClose className='text-[30px] text-zinc-100' /></div>
          <h4 className='text-zinc-200 underline'>Reason for report</h4>
          <span className='flex gap-[10px] text-zinc-300 items-center mt-2' onClick={e=>setReportCause('Hate')}>
            <input type="radio" name="reason" id="" />
            <p>Hate Speech</p>
          </span>
          <span className='flex gap-[10px] text-zinc-300 items-center' onClick={e=>setReportCause('Explicit')}>
            <input type="radio" name="reason" id="" />
            <p>Explicit/Nudity</p>
          </span>
          <span className='flex gap-[10px] text-zinc-300 items-center' onClick={e=>setReportCause('Threat')}>
            <input type="radio" name="reason" id="" />
            <p>Threat</p>
          </span>
          <span className='flex gap-[10px] text-zinc-300 items-center' onClick={e=>setReportCause('Violence')}>
            <input type="radio" name="reason" id="" />
            <p>Violence</p>
          </span>
          <span className='flex gap-[10px] text-zinc-300 items-center' onClick={e=>setReportCause('Illegal')}>
            <input type="radio" name="reason" id="" />
            <p>Illegal</p>
          </span>
          <span className='flex gap-[10px] text-zinc-300 items-center' onClick={e=>setReportCause('Spam')}>
            <input type="radio" name="reason" id="" />
            <p>Spam</p>
          </span>

          <button className='w-full h-[40px] mt-2 rounded bg-rose-700 text-zinc-100 flex items-center justify-center' disabled={isLoading} onClick={handleReport}>{isLoading ? (<RiLoader3Fill className='text-[24px] animate-spin' />) : 'Report'}</button>
        </div>
    </div>
  )
}

export default ReportForm