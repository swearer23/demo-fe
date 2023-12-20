import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import ReactJson from "react-json-view"

// type POMain = {
//   cCusName: object
// }

interface Row {
  [key: string]: { value: any };
}

export default ({
  poMain,
  poDetails,
  rawInfo
}: {
  poMain: any,
  poDetails: any,
  rawInfo: any
}) => {
  const poMainHeaders = Object.keys(poMain).map(key => {
    return poMain[key].name
  })
  const poMainRows = Object.keys(poMain).map(key => {
    return poMain[key].value
  })

  const poDetailHeaders = Object.keys(poDetails[0]).map(key => {
    return poDetails[0][key].name
  })
  const poDetailRows = poDetails.map((row: Row) => {
    return Object.keys(row).map(key => {
      return row[key].value
    })
  })
  console.log(poDetailRows)
  return (
    <>
      <h1 className="mt-10 mb-10">销售订单主订单</h1>
      <Table>
        <TableHeader>
          <TableRow>
            {
              poMainHeaders.map((header) => {
                return (
                  <TableHead>{header}</TableHead>
                )
              })
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {
              poMainRows.map((row) => {
                return (
                  <TableCell>{row}</TableCell>
                )
              })
            }
          </TableRow>
        </TableBody>
      </Table>
      <h1 className="mt-10 mb-10">销售订单详情</h1>
      <Table>
        <TableHeader>
          <TableRow>
            {
              poDetailHeaders.map((header) => {
                return (
                  <TableHead key={header}>{header}</TableHead>
                )
              })
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            poDetailRows.map((row: string[]) => {
              return (
                <TableRow>
                  {
                    row.map((cell) => {
                      return (
                        <TableCell>{cell}</TableCell>
                      )
                    })
                  }
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
      <h1 className="mt-10 mb-10">全量原始数据</h1>
      <div className="text-left">
        <ReactJson src={rawInfo} theme="monokai" />
      </div>
    </>
  )
}