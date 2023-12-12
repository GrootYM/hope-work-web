const jumpLink = (jumpType, jumpUrl) => {
  if (jumpType == 1) {
    // window.App.$router.push({ path: jumpUrl })
    const { href } = window.App.$router.resolve({
      path: jumpUrl,
    })
    window.open(href, '_blank')
    return
  } else if (jumpType == 3) {
    if (jumpUrl.indexOf('http') === -1) {
      window.open(`http://${jumpUrl}`, '_blank')
      return
    }
    window.open(url, '_blank')
    return
  }
}

export { jumpLink }
