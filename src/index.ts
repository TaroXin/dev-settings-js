import { DEV_SETTINGS_KEY, DEV_SETTING_VAR_ID } from "./enums/config";
import { NeedOption, SettingEventOption } from "./impl/option";

let systemOptionList: SettingEventOption[] = []
let storageOptionList: SettingEventOption[] = []

const vars = {
  isDebug: false,
}

function initConfig() {
  if (systemOptionList.length) return 

  const result = window.localStorage.getItem(DEV_SETTINGS_KEY)
  const optionList: SettingEventOption[] = result ? JSON.parse(result) : []
  storageOptionList = optionList.filter(o => o.id != DEV_SETTING_VAR_ID)
  systemOptionList = optionList.filter(o => o.id == DEV_SETTING_VAR_ID)

  systemOptionList.forEach(o => {
    if (o.name && o.name in vars) {
      (vars as any)[o.name] = o.value
    }
  })
}

export default {
  vars,
  need(name: string, option: NeedOption) {
    initConfig()

    setTimeout(() => {
      window.postMessage({
        type: 'dev-settings-event',
        messageType: 'need',
        option: {
          ...option,
          name,
          id: window.location.host
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