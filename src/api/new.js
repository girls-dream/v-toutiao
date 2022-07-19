import request from '@/utils/request'

export const getArtcleList = (channelID,timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelID,
      timestamp
    }
  })
}