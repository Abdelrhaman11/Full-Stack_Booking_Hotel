import React, {useState} from 'react'
import { DatePicker , Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom'
import LocationInput from '../location/LocationInput.jsx'

const { RangePicker } = DatePicker
const { Option } = Select

export default function Search() {

  const navigate = useNavigate()


    const [location , setLocation] = useState("")
    const [date , setDate] = useState("")
    const [bed , setBed] = useState("")

    async function handleSubmit(){
      
        navigate(`/search-result?location=${location.address}&date=${date}&bed=${bed}`)
    }

  return (
    <div className='d-flex pb-4'>
              <div className="w-100 m-2">
             <LocationInput value={location} onChange={(location) => setLocation(location)}/>
              </div>
              <RangePicker className="my-2 w-100" onChange={(value , dateString) => setDate(dateString)} disabledDate={(current) =>  current && current.isBefore(dayjs(), "day")}/>

              <select onChange={(e) => setBed(e.target.value)} className={"form-select m-2 w-100"}>
                 <option value="">Number of beds</option>
                 <option value="1">1</option>
                 <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>

              <SearchOutlined onClick={handleSubmit} className='btn btn-primary p-3 btn-square'/>


        
    </div>
  )
}
