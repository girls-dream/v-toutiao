import request from "@/utils/request";
import storage from "@/utils/storage";

export const getMyChannerls = () => {
  return request({
    url: "/v1_0/user/channels",
  });
};
export const getAllChannels = () => {
  return request({
    url: "/v1_0/channels",
  });
};
export const delChannels = () => {
  return request({
    url: `/v1_0/comment/likings/:${target}`,
    method: "DELETE",
  });
};
//添加频道
export const addChannels = (id, seq) => {
  return request({
    url: `/v1_0/user/channels`,
    method: "PATCH",
    data: {
      channels: [{ id, seq }],
    },
  });
};
const HeiMaToken = "HeiMaToken";
export const getMyChannelsByLocal = () => storage.get(HeiMaToken);

export const setMyChannelsToLocal = (channel) =>
  storage.set(HeiMaToken, channel);
