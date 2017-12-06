/**
 * Created by simon on 2016/12/5.
 */
'use strict';

function ignore() {
  let extensions = ['.css', '.scss', '.less', '.png', '.jpg', '.gif', '.styl']; // 服务端渲染不加载的文件类型
  for (let i = 0, len = extensions.length; i < len; i++) {
    require.extensions[extensions[i]] = function() {
      return false;
    };
  }
}
module.exports = ignore;
