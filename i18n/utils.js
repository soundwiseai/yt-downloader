
import sites from "~/sites"

// 根据子站路径返回对应的 i18n 字符串
// 如果子站路径不存在，则返回默认的 i18n 字符串
export const _t = (str) => {
    const route = useRoute()
    const { t, te } = useI18n()
    for (const site of sites) {
        if (route.path.endsWith(site.url) && te(`${site.i18n}_${str}`)) {
            return t(`${site.i18n}_${str}`)
        }
    }
    else if(route.path.endsWith('-m4a') && te(`m4a_${str}`)) {
        return t(`m4a_${str}`)
    }
    return t(str)
}

// 判断各子站路径是否存在对应的 i18n 字符串
export const _te = (str) => {
    const route = useRoute()
    const { te } = useI18n()
    for (const site of sites) {
        if (route.path.endsWith(site.url) && te(`${site.i18n}_${str}`)) {
            return te(`${site.i18n}_${str}`)
        }
    }
    else if(route.path.endsWith('-m4a')) {
        return te(`m4a_${str}`)
    }
    return te(str)
}

export const _tm = (str) => {
    const route = useRoute()
    const { tm, te } = useI18n()
    for (const site of sites) {
        if (route.path.endsWith(site.url) && te(`${site.i18n}_${str}`)) {
            return tm(`${site.i18n}_${str}`)
        }
    }
    else if(route.path.endsWith('-m4a') && te(`m4a_${str}`)) {
        return tm(`m4a_${str}`)
    }
    return tm(str)
}
