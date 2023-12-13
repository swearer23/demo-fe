import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { useState, memo } from "react"
import { columns, Sale } from "./Columns"

const Component = ({
  revenue,
  salesDetail
}: {
  revenue: number,
  salesDetail: any
}) => {
  const sales: Sale[] = salesDetail.map((row: any) => {
    return {
      'id': row.id,
      '物料ID': row.id.split('_')[0],
      '渠道名称': row.id.split('_')[1],
      '销售数量': row.qty,
      '成本': row['成本'].toFixed(2), // '成本': '成本
      '定价': row['定价'].toFixed(2),
      '是否爆款': row['是否爆款'],
      '是否新品': row.is_new,
      '销售额': row['销售额'],
      '渠道类型': row['渠道类型']
    }
  })
  const [data, setData] = useState(sales)
  const [saleQty, setSaleQty] = useState(0)
  const [saleRevenue, setSaleRevenue] = useState(0)
  const [saleProfit, setSaleProfit] = useState(0)
  const [saleProfitRate, setSaleProfitRate] = useState(0)
  const [newSkuPortion, setNewSkuPortion] = useState(0)
  const [hotSkuPortion, setHotSkuPortion] = useState(0)
  const [dtcSkuPortion, setDtcSkuPortion] = useState(0)
  const channels = [...new Set(sales.map(sale => sale['渠道名称']))]
  const onChannelChange = (value: string) => {
    const totalNewSKUSaleRevenue = sales.filter(item => item.是否新品 === 'Y')
      .map(item => item.销售额)
      .reduce((a, b) => a + b, 0)
    let cData = null
    if (value === 'all') cData = sales
    else cData = sales.filter(sale => sale['渠道名称'] === value)
    setData(cData)
    const saleQty = cData.map(item => item.销售数量).reduce((a, b) => a + b, 0)
    setSaleQty(saleQty)
    const saleRevenue = cData.map(item => item.销售额).reduce((a, b) => a + b, 0)
    setSaleRevenue(saleRevenue)
    const saleProfit = cData.map(item => 
      item.销售额 - parseFloat(item.成本) * item.销售数量).reduce((a, b) => a + b, 0
    )
    setSaleProfit(saleProfit)
    const saleProfitRate = saleProfit / saleRevenue * 100
    setSaleProfitRate(saleProfitRate)
    const newSkuPortion = cData.filter(item => item.是否新品 === 'Y')
      .map(item => item.销售额)
      .reduce((a, b) => a + b, 0)
      / totalNewSKUSaleRevenue * 100
    setNewSkuPortion(newSkuPortion)
    const hotSkuPortion = cData.filter(item => item.是否爆款 === 'Y')
      .map(item => item.销售额)
      .reduce((a, b) => a + b, 0)
      / saleRevenue * 100
    setHotSkuPortion(hotSkuPortion)
    const dtcSkuPortion = cData.filter(item => item.渠道类型.includes('DTC'))
      .map(item => item.销售额)
      .reduce((a, b) => a + b, 0)
      / saleRevenue * 100
    setDtcSkuPortion(dtcSkuPortion)
  }
  return (
    <div className="text-left">
      <h1 className="mt-10 mb-10">销售计划优化结果  总销售额： {revenue}</h1>
      <h1>
        共计销售数量: {saleQty}
        <Separator orientation="vertical" className="mx-5" />
        共计销售额： {saleRevenue.toFixed(2)}
        <Separator orientation="vertical" className="mx-5" />
        共计销售利润： {saleProfit.toFixed(2)}
        <Separator orientation="vertical" className="mx-5" />
        利润率: {saleProfitRate.toFixed(2)}%
        <Separator orientation="vertical" className="mx-5" />
        新品占比: {newSkuPortion.toFixed(2)}%
        <Separator orientation="vertical" className="mx-5" />
        爆品占比: {hotSkuPortion.toFixed(2)}%
        <Separator orientation="vertical" className="mx-5" />
        DTC占比: {dtcSkuPortion.toFixed(2)}%
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            {
              columns.map(column => {
                return (
                  <TableHead key={column.accessorKey}>
                    {
                      typeof column.header === 'string'
                      ? column.header : column.header(channels, onChannelChange)
                    }
                  </TableHead>
                )
              })
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {data ? (
            data.map((row) => (
              <TableRow
                key={row.id}
              >
                {Object.keys(row).map((key) => (
                  ['id', '渠道类型'].includes(key) ? null : <TableCell key={key}>
                    {
                      ['销售额'].includes(key)
                      ? row[key as keyof Sale].toFixed(2)
                      : row[key as keyof Sale]
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default memo(Component);
