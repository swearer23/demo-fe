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
  header: string | ((channels: string[], onSelect: (value: string) => void) => JSX.Element)
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
    header: function (channels: string[], onSelect: (value: string) => void) {
      let channelOptions = channels.map(item => {
        return {
          value: item,
          label: item
        }
      })
      channelOptions.unshift({
        value: 'all',
        label: '全部'
      })
      return (
        <Select onValueChange={onSelect}>
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
