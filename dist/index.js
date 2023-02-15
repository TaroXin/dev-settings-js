import { DEV_SETTINGS_KEY, DEV_SETTING_VAR_ID } from "./enums/config";
let systemOptionList = [];
let storageOptionList = [];
function initConfig() {
    if (systemOptionList.length)
        return;
    const result = window.localStorage.getItem(DEV_SETTINGS_KEY);
    const optionList = result ? JSON.parse(result) : [];
    storageOptionList = optionList.filter(o => o.id != DEV_SETTING_VAR_ID);
    systemOptionList = optionList.filter(o => o.id == DEV_SETTING_VAR_ID);
}
export default {
    need(name, option) {
        initConfig();
        window.postMessage({
            type: 'dev-settings-event',
            messageType: 'need',
            option: {
                ...option,
                name,
            }
        });
        // 获取当前的值
        const exist = storageOptionList.find(o => o.name == name);
        if (exist) {
            return exist.value || exist.initialValue;
        }
        return option.initialValue;
    }
};
//# sourceMappingURL=index.js.map