const getCookie = (name: string): string => {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : '';
}


const setCookie = (name: string, value: string, days: number): void => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
}

const deleteCookie = (name: any): void => {
  setCookie(name, '', -1);
}

const getUrlParamByName = (name:string): string => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(window.location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export {
  getCookie,
  setCookie,
  deleteCookie,
  getUrlParamByName
}

