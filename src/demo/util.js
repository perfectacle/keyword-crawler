export const getDate = date => { // YYYY-MM-DD
  const mm = date.getMonth() < 9 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
  const dd = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
  return `${date.getFullYear()}-${mm}-${dd}`;
};
