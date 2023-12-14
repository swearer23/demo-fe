export const channels = [
  '天猫旗舰店',
  '上海新天地旗舰店',
  '大漂亮药妆',
  '李佳琦直播间'
]

export const minProfitLimitByChannel = [
  0.3, 0.25, 0.15, 0.2
]

export const minNewSKUProfitLimitByChannel = [
  0.2, 0.3, 0., 0.
]

export const minRevenueLimitByChannel = [
  50000000, 30000000, 10000000, 40000000
]

export type settingByChannel = {
  [key: string]: number
}

export const defaultMPSettings = () : settingByChannel => {
  const settings: settingByChannel = {};
  channels.forEach((channel, index) => {
    settings[channel] = minProfitLimitByChannel[index];
  })
  return settings;
}

export const defaultMNPSettings = () : settingByChannel => {
  const settings: settingByChannel = {};
  channels.forEach((channel, index) => {
    settings[channel] = minNewSKUProfitLimitByChannel[index];
  })
  return settings;
}

export const defaultMRSettings = () : settingByChannel => {
  const settings: settingByChannel = {};
  channels.forEach((channel, index) => {
    settings[channel] = minRevenueLimitByChannel[index];
  })
  return settings;
}
