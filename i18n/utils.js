
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
    return te(str)
}

// tm() 用于获取原始消息（数组/对象），不能用 te() 做守卫
// 因为 vue-i18n 的 te() 只对字符串消息返回 true，数组/对象会返回 false
const _isNonEmpty = (v) => v != null && (Array.isArray(v) ? v.length > 0 : typeof v === 'object' ? Object.keys(v).length > 0 : !!v)

export const _tm = (str) => {
    const route = useRoute()
    const { tm } = useI18n()
    for (const site of sites) {
        if (route.path.endsWith(site.url)) {
            const result = tm(`${site.i18n}_${str}`)
            if (_isNonEmpty(result)) return result
        }
    }
    return tm(str)
}
