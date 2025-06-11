export const _t = (str) => {
    const route = useRoute()
    const { t } = useI18n()
    if(route.path.endsWith('-mp3')) {
        return t(`mp3_${str}`)
    }
    else if(route.path.endsWith('-downloader')) {
        return t(`downloader_${str}`)
    }
    return t(str)
}

export const _tm = (str) => {
    const route = useRoute()
    const { tm } = useI18n()
    if(route.path.endsWith('-mp3')) {
        return tm(`mp3_${str}`)
    }
    else if(route.path.endsWith('-downloader')) {
        return tm(`downloader_${str}`)
    }
    return tm(str)
}