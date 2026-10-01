export enum Ipc {
  DialogFile = 'dialog:openFiles',
  DialogFolder = 'dialog:openFolders',
  NetworkDevices = 'network:findDevices',
  DeviceName = 'device:getName',
  DeviceTotalShares = 'device:getTotalShares',
  DeviceConnection = 'device:getConnectionType',
  DeviceOsIp = 'device:getOsIp',
  DeviceUpdateSettings = 'device:setSettings',
  DeviceShares = 'device:getShares',
  DeviceRemoveShare = 'device:removeShare',
  DeviceSettings = 'device:getSettings',
}
