import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { channels, settingByChannel} from "../const"

export default ({
  title,
  settings,
  onSettingChange,
  max = 100,
  displayPercent = true
}: {
  title: string,
  settings: settingByChannel,
  onSettingChange: (setting: settingByChannel) => void,
  max?: number,
  displayPercent?: boolean
}) => {
  const sliderClassName = 'ml-10'
  const [minChannelProfitRate, setMinChannelProfitRate] = useState(settings)
  const updateSetting = (channel: string, value: number) => {
    setMinChannelProfitRate({
      ...minChannelProfitRate,
      [channel]: displayPercent ? value / 100 : value
    })
    onSettingChange({
      ...minChannelProfitRate,
      [channel]: displayPercent ? value / 100 : value
    })
  }
  return (
    <>
      <h1 className="text-left">{title}</h1>
      {
        channels.map(channel => {
          const value = displayPercent ? minChannelProfitRate[channel] * 100 : minChannelProfitRate[channel]
          return (
            <div className="flex items-center space-x-2 mt-5 mb-5" key={channel}>
              <Label className="w-32 text-left" htmlFor="terms">{channel}:</Label>
              <span>{Math.round(value)}</span>
              <Slider
                name={channel}
                defaultValue={[value]}
                max={max}
                step={1}
                className={cn("w-[60%]", sliderClassName)}
                onValueChange={(value) => updateSetting(channel, value[0])}
              />
            </div>
          )
        })
      }  
    </>
  )
}