

var lstorage = window.localStorage;
function IsFile(url, timestamp) {
  if (!(this instanceof IsFile)) {
    return new IsFile(url, timestamp);
  }
  this.version = url + '?timestamp=' + timestamp;
  this.lname = url;
  this.filetext = lstorage.getItem(this.version);
  this.init();
}

IsFile.prototype.init = function() {
  if (!!this.filetext) {
    eval(this.filetext);
  } else {
    // 加载js文件
    this.xhr(this.lname, function(filetext) {
      this.runStr(filetext);
      console.log('更新js文件:',this.lname);
    })
  }
}

IsFile.prototype.runStr = function(filetext) {
  eval(filetext);
  lstorage.setItem(this.version,filetext);
  this.removels();  
}


IsFile.prototype.xhr = function(url, cb) {
  var _this = this;
  var version = url;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    switch(xhr.readyState) {
      case 4: {
        if (xhr.status == 200) {
          var filetext = xhr.responseText;
          if (cb) {
            cb.call(_this, filetext)
          }
        } else {
          alert('加载失败');
        }
        break;
      }
      default: 
        break;
    }
  }
  xhr.open("GET", url, false);
  xhr.send();
}

IsFile.prototype.removels = function() {
  var arr = [];
  for(var i = 0; i < lstorage.length; i++) {
    var key = lstorage.key(i);
    if (key.indexOf(this.lname) > -1 && this.version != key) {
      arr.push(key);
    }
  }
  arr.map(function(item, i) {
    lstorage.removeItem(item);
  })
}
