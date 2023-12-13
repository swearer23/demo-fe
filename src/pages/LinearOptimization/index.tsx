import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Alert from '@/components/Alert'
import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { linearOptimization } from "@/services"
import * as Portal from '@radix-ui/react-portal';
import OptimizationDisplay from "./components/OptimizationDisplay"
import ConstrainByChannelSetter from "./components/ConstraintByChannel"
import { defaultMPSettings, defaultMNPSettings, defaultMRSettings } from "./const"

const modal = {
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255,255,255,.8)',
} as React.CSSProperties

export default () => {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [newSkuPortion, setNewSkuPortion] = useState([15])
  const [hotSkuPortion, setHotSkuPortion] = useState([10])
  const [dtcSkuPortion, setDtcSkuPortion] = useState([60])
  const [revenue, setRevenue] = useState(null)
  const [sales, setSales] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [minChannelProfitRate, setMinChannelProfitRate] = useState(defaultMPSettings())
  const [minChannelNewSkuPortion, setMinChannelNewSkuPortion] = useState(defaultMNPSettings())
  const [minChannelRevenue, setMinChannelRevenue] = useState(defaultMRSettings())
  const sliderClassName = 'ml-10'
  const submit = async () => {
    setProgress(0)
    setLoading(true)
    const {
      revenue,
      sales,
      error
    } = await linearOptimization({
      new_sku_portion: newSkuPortion[0] / 100,
      hot_sku_portion: hotSkuPortion[0] / 100,
      dtc_sku_portion: dtcSkuPortion[0] / 100,
      min_profit_rate_by_channel: minChannelProfitRate,
      min_new_sku_portion_by_channel: minChannelNewSkuPortion,
      min_revenue_by_channel: minChannelRevenue
    })
    if (error) {setShowAlert(true)}
    else {
      setRevenue(revenue)
      setSales(sales)
    }
    setProgress(100)
    setLoading(false)
  }

  React.useEffect(() => {
    if (!loading) return
    else {
      const timer = setTimeout(() => setProgress(progress + 0.016), 10)
      return () => clearTimeout(timer)
    }
  }, [progress, loading])

  return (
    <div>
      <h1>LinearOptimization</h1>
      <p>在此设置销售计划相关参数</p>
      <div className="flex items-center space-x-2 mt-5 mb-5">
        <Label className="w-32 text-left" htmlFor="terms">设置新品占比:</Label>
        <span>{newSkuPortion}</span>
        <Slider
          name="newSkuPortion"
          defaultValue={newSkuPortion}
          max={100}
          step={1}
          className={cn("w-[60%]", sliderClassName)}
          onValueChange={(value) => setNewSkuPortion(value)}
        />
      </div>
      <div className="flex items-center space-x-2 mt-5 mb-5">
        <Label className="w-32 text-left" htmlFor="terms">设置爆品占比:</Label>
        <span>{hotSkuPortion}</span>
        <Slider
          name="hotSkuPortion"
          defaultValue={hotSkuPortion}
          max={100}
          step={1}
          className={cn("w-[60%]", sliderClassName)}
          onValueChange={(value) => setHotSkuPortion(value)}
        />
      </div>
      <div className="flex items-center space-x-2 mt-5 mb-5">
        <Label className="w-32 text-left" htmlFor="terms">DTC占比:</Label>
        <span>{dtcSkuPortion}</span>
        <Slider
          name="dtcSkuPortion"
          defaultValue={dtcSkuPortion}
          max={100}
          step={1}
          className={cn("w-[60%]", sliderClassName)}
          onValueChange={(value) => setDtcSkuPortion(value)}
        />
      </div>
      <ConstrainByChannelSetter
        title="设置渠道最低毛利率"
        settings={minChannelProfitRate}
        onSettingChange={setMinChannelProfitRate}
      />
      <ConstrainByChannelSetter
        title="设置各渠道最低新品占全部新品比例"
        settings={minChannelNewSkuPortion}
        onSettingChange={setMinChannelNewSkuPortion}
      />
      <ConstrainByChannelSetter
        title="设置各渠道最低销售额要求"
        settings={minChannelRevenue}
        onSettingChange={setMinChannelRevenue}
        max={10000000}
        displayPercent={false}
      />
      <Button onClick={submit}>计算最优方案</Button>
      <div>
        {
          revenue && (
            <OptimizationDisplay
              revenue={revenue}
              salesDetail={sales}
            />
          )
        }
      </div>
      {
        loading && (
          <Portal.Root style={modal}>
            <Progress value={progress} className="w-[60%]" />
            <p>
              {progress.toFixed(2)}%
            </p>
          </Portal.Root>
        )
      }
      {
        showAlert && (
          <Alert
            title="提示"
            description="基于当前条件下，没有找到方案"
          />
        )
      }
    </div>
  )
}