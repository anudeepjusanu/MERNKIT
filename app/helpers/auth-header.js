
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.channelPartnerObj) {
    return {
      // apiKey: user.apiKey,
      channelPartnerID: user.channelPartnerID
    };
  } else if (user && user.apiKey && user.channelPartnerID) {
    return {
      // apiKey: user.apiKey,
      channelPartnerID: user.channelPartnerID
    };
  }
  return {};
}
