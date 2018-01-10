// 手机：
// '12345678901'.replace(/\B(?=(?:\d{4})+$)/g, '-')
// // '123-4567-8901'
const util = {

  // 转换价格
  // '99893'.replace(/\B(?=(?:\d{3})+$)/g, ',')
  // // '99,893'
  transformPrice: (price) => {
    return price.replace(/\B(?=(?:\d{3})+$)/g, ',');
  },

  // 转换手机格式
  // '12345678901'.replace(/\B(?=(?:\d{4})+$)/g, '-')
  // '123-4567-8901'
  transformPhone: (phone) => {
    return phone.replace(/\B(?=(?:\d{4})+$)/g, '-');
  }
};

module.exports = util;
