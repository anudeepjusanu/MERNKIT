
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.apiKey) {
    return {
      // apiKey: user.apiKey,
      apiKey: user.apiKey
    };
  }
  return {};
}
