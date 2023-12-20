import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { useState, memo, useEffect } from "react"
import { columns, Sale } from "./Columns"

type Filter = {
  '渠道名称': string,
  'month': string
}

const Component = ({
  revenue,
  salesDetail,
  newSkuRevenueExpected
}: {
  revenue: number,
  salesDetail: any,
  newSkuRevenueExpected: number
}) => {
  const sales: Sale[] = salesDetail.map((row: any) => {
    return {
      'id': row.id,
      '物料ID': row.id.split('_')[0],
      '渠道名称': row.id.split('_')[1],
      'month': row.month + '月',
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
  const [newSkuRevenue, setNewSkuRevenue] = useState(0)
  const [hotSkuPortion, setHotSkuPortion] = useState(0)
  const [dtcSkuPortion, setDtcSkuPortion] = useState(0)
  const [filter, setFilter] = useState<Filter>({
    '渠道名称': 'all',
    'month': 'all'
  })
  const channels = [...new Set(sales.map(sale => sale['渠道名称']))]
  const onFilterChange = (value: string, key: string) => {
    setFilter({
      ...filter,
      [key]: value
    })
  }
  useEffect(() => {
    console.log('filter', filter)
    let cData = sales
    Object.keys(filter).forEach(key => {
      if (filter[key as keyof Filter] !== 'all') {
        cData = cData.filter(sale => sale[key as keyof Sale] === filter[key as keyof Filter])
      }
    })
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
    const newSkuRevenue = cData.filter(item => item.是否新品 === 'Y')
      .map(item => item.销售额)
      .reduce((a, b) => a + b, 0)
    const newSkuPortion = newSkuRevenue / newSkuRevenueExpected * 100
    setNewSkuRevenue(newSkuRevenue)
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
  }, [filter, revenue, salesDetail, newSkuRevenueExpected])
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
        新品销售额: {newSkuRevenue.toFixed(2)}
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
                      ? column.header : column.header(onFilterChange, channels)
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
