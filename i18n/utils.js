
// 根据子站路径返回对应的 i18n 字符串
// 如果子站路径不存在，则返回默认的 i18n 字符串
export const _t = (str) => {
    const route = useRoute()
    const { t, te } = useI18n()
    if(route.path.endsWith('-mp3') && te(`mp3_${str}`)) {
        return t(`mp3_${str}`)
    }
    else if(route.path.endsWith('-downloader') && te(`downloader_${str}`)) {
        return t(`downloader_${str}`)
    }
    else if(route.path.endsWith('-transcript-generator') && te(`transcript_${str}`)) {
        return t(`transcript_${str}`)
    }
    return t(str)
}

// 判断各子站路径是否存在对应的 i18n 字符串
export const _te = (str) => {
    const route = useRoute()
    const { te } = useI18n()
    if(route.path.endsWith('-mp3')) {
        return te(`mp3_${str}`)
    }
    else if(route.path.endsWith('-downloader')) {
        return te(`downloader_${str}`)
    }
    else if(route.path.endsWith('-transcript-generator')) {
        return te(`transcript_${str}`)
    }
    return te(str)
}

export const _tm = (str) => {
    const route = useRoute()
    const { tm, te } = useI18n()
    if(route.path.endsWith('-mp3') && te(`mp3_${str}`)) {
        return tm(`mp3_${str}`)
    }
    else if(route.path.endsWith('-downloader') && te(`downloader_${str}`)) {
        return tm(`downloader_${str}`)
    }
    else if(route.path.endsWith('-transcript-generator') && te(`transcript_${str}`)) {
        return tm(`transcript_${str}`)
    }
    return tm(str)
}
