
export function getRedirectPath({type, avatar}) {
  // 根据用户信息  判断返回跳转地址
  // user.type = boss || genius
  // 跳转地址分别为 bossinfo || geniusinfo(去设置个人详细信息)
  let url = (type === 'boss') ? '/boss':'/genius'
  if(!avatar){
    url += 'info'
  }
  return url
}