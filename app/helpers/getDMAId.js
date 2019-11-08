export default function getDMAId() {
  try {
    return JSON.parse(localStorage.getItem('selectedBUData')).selectedData.childMarketArea;
  } catch (e) {
    return '';
  }
}
