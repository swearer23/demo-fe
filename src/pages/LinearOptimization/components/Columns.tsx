import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type Sale = {
  'id': string, // '物料ID_渠道名称
  '物料ID': string,
  '渠道名称': string,
  '月份': number,
  '销售数量': number,
  '定价': number,
  '是否爆款': string,
  '是否新品': string,
  '销售额': number,
  '成本': string,
  '渠道类型': string,
}

export type Column = {
  accessorKey: string,
  header: string | ((onSelect: (value: string | number, key: string) => void, options?: string[]) => JSX.Element)
  cell: (props: any) => JSX.Element,
}

export const columns: Column[] = [
  {
    accessorKey: "物料ID",
    header: "物料ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("物料ID")}</div>
    ),
  },
  {
    accessorKey: "渠道名称",
    header: function (onSelect: (value: string, key: string) => void, options?: string[]) {
      let channelOptions = options?.map(item => {
        return {
          value: item,
          label: item
        }
      }) || []
      channelOptions.unshift({
        value: 'all',
        label: '全部'
      })
      const onChannelChange = (value: string) => {
        onSelect(value, '渠道名称')
      }
      return (
        <Select onValueChange={onChannelChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="销售渠道" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>销售渠道</SelectLabel>
              {
                channelOptions.map(channel => {
                  return (
                    <SelectItem
                      key={channel.value}
                      value={channel.value}>
                      {channel.label}
                    </SelectItem>
                  )
                })
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("渠道名称")}</div>
    ),
  },
  {
    accessorKey: "month",
    header: function (onSelect: (value: string, key: string) => void) {
      let monthOptions = Array.from({length: 12}, (_, i) => i + 1).map(item => {
        return {
          value: item.toString(),
          label: item.toString()
        }
      })
      monthOptions.unshift({
        value: 'all',
        label: '全部'
      })
      const onMonthChange = (value: string) => {
        value = value === 'all' ? value : parseInt(value).toString() + '月'
        onSelect(value, 'month')
      }
      return (
        <Select onValueChange={onMonthChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="月份" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>月份</SelectLabel>
              {
                monthOptions.map(month => {
                  return (
                    <SelectItem
                      key={month.value}
                      value={month.value}>
                      {month.label}
                    </SelectItem>
                  )
                })
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("month")}</div>
    ),
  },
  {
    accessorKey: "销售数量",
    header: "销售数量",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("销售数量")}</div>
    ),
  },
  {
    accessorKey: "成本",
    header: "成本",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("成本")}</div>
    ),
  },
  {
    accessorKey: "定价",
    header: "定价",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("定价")}</div>
    ),
  },
  {
    accessorKey: "是否爆款",
    header: "是否爆款",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("是否爆款")}</div>
    ),
  },
  {
    accessorKey: "是否新品",
    header: "是否新品",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("是否新品")}</div>
    ),
  },
  {
    accessorKey: "销售额",
    header: "销售额",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("销售额")}</div>
    ),
  },
]
