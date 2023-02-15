import { DEV_SETTINGS_KEY, DEV_SETTING_VAR_ID } from "./enums/config";
import { NeedOption, SettingEventOption } from "./impl/option";

let systemOptionList: SettingEventOption[] = []
let storageOptionList: SettingEventOption[] = []

function initConfig() {
  if (systemOptionList.length) return 

  const result = window.localStorage.getItem(DEV_SETTINGS_KEY)
  const optionList: SettingEventOption[] = result ? JSON.parse(result) : []
  storageOptionList = optionList.filter(o => o.id != DEV_SETTING_VAR_ID)
  systemOptionList = optionList.filter(o => o.id == DEV_SETTING_VAR_ID)
}

export default {
  need(name: string, option: NeedOption) {
    initConfig()

    setTimeout(() => {
      window.postMessage({
        type: 'dev-settings-event',
        messageType: 'need',
        option: {
          ...option,
          name,
          id: window.location.hostname
        }
      })
    }, 1000)

    // 获取当前的值
    const exist = storageOptionList.find(o => o.name == name)
    if (exist) {
      return exist.value || exist.initialValue
    }
    return option.initialValue
  } 
}