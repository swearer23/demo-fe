import './App.css'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FaFileUpload } from "react-icons/fa";
import UploadFile from './components/upload';
import POTable from './components/POTable';
import { uploadPOFile } from './services';
import { useState } from 'react'

function App() {

  const clients = [
    {
      name: 'Woolworths Group',
      value: 'WoolWorthsGroupPOContract'
    },
    {
      name: 'Primark Group',
      value: 'PrimarkPOContract'
    }
  ]

  const [client, setClient] = useState('')
  const [file, setFile] = useState<File>()
  const [loading, setLoading] = useState(false)
  const [poResult, setPOResult] = useState<any>(null)

  const onsubmit = async () => {
    if (client && file) {
      setLoading(true)
      try {
        const result = await uploadPOFile(file, client)
        setPOResult(result)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <div className='grid grid-cols-1 mt-20 place-items-center place-content-center'>
        <h1>上传PDF解析销售订单</h1>
        <div className='w-96 mt-10'>
          <UploadFile onFileChange={setFile} />
          <Select onValueChange={setClient}>
            <SelectTrigger className="w-96 mt-10">
              <SelectValue placeholder="选择客户名称" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Clients</SelectLabel>
                {
                  clients.map((client) => {
                    return (
                      <SelectItem value={client.value} key={client.value}>
                        {client.name}
                      </SelectItem>
                    )
                  })
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className="mt-10 w-full" onClick={onsubmit} disabled={loading}>
            <FaFileUpload className="mr-2 h-4 w-4" /> 上传
          </Button>
        </div>
        {
          poResult ? (
            <POTable
              poMain={poResult.po_main}
              poDetails={poResult.po_details}
            ></POTable>
          ) : ''
        }
      </div>
    </>
  )
}

export default App
