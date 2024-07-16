export class Utility {
  constructor() {}
  public static serverUrl: string = 'http://localhost:5264/api';
  public static passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/;
  public static phoneRegex: RegExp = /^09\d{9}$/;
  public static emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  public static replaceUrlParams(url: string, params: object): string {
    Object.entries(params).forEach((item) => {
      const regex = new RegExp(`\\\${${item[0]}}`, 'g');
      url = url.replace(regex, encodeURIComponent(item[1]));
    });
    return url;
  }
  public static getQueryStringParams(url: string, queryStrings: Object = new Object()): string {
    let queryItems: string[] = [];

    if (Object.keys(queryStrings).length == 0) return url;
    Object.entries(queryStrings).forEach((item) => {
      var key = item[0];
      var value = item[1];
      if (value != null && value != undefined) {
        if (key == 'filterValues') {
          Object.entries(value).forEach((filter, index) => {
            var param = 'filter_' + filter[0] + '=' + filter[1];
            queryItems.push(param);
          });
        } else {
          var param = key + '=' + encodeURIComponent(value);
          queryItems.push(param);
        }
      }
    });
    if (queryItems.length > 0) {
      url = url + '?' + queryItems.join('&');
    }
    return url;
  }
}
