let request = require('../request');
let {urlStr, xmlStr, xmlStrStart, xmlStrContent, xmlStrEnd} = require('../utils/tool');
let router = require('koa-router')();
let fs = require('fs');
const Pinyin = require('../utils/pinyin');
const pinyin = new Pinyin();
const moment = require('moment');
// let path = require('path');
let apiURL = 'http://www.yoju360.com/api/';

let PAGESIZE = 100;

async function cityCompanies(id, province) {
  let url = apiURL;
  let params = {
    apiURL: 'decorate/company/list',
    page: 1,
    pageSize: 1000,
    cityId: id
  };
  let str = `<url><loc>http://${province}.yoju360.com</loc><priority>0.80</priority><lastmod>2017-12-22</lastmod><changefreq>always</changefreq></url>\n<url><loc>http://${province}.yoju360.com/store</loc><priority>0.80</priority><lastmod>2017-12-22</lastmod><changefreq>always</changefreq></url>\n`;
  let data = await request(url, params, 'POST');
  if (!!data && data.code === 200) {
    data.result.list.map((item, i) => {
      str += urlStr(`http://${province}.yoju360.com/store/` + item.companyId, '0.80', moment().format('YYYY-MM-DD'));
    });
  }
  return str;
}

async function strategyList(id, page = 1, pageSize = PAGESIZE) {
  let url = apiURL;
  let params = {
    apiURL: 'decorate/guide/list',
    page,
    pageSize
  };
  if (!!id) {
    params['categoryId'] = id;
  }
  let str = '';
  let data = await request(url, params, 'POST');
  if (!!data && data.code === 200) {
    data.result.list.map((item, i) => {
      str += urlStr('http://www.yoju360.com/strategy/' + item.id, '0.80', moment().format('YYYY-MM-DD'));
    });
  }
  return {
    str,
    page: data.result.page + 1,
    total: data.result.total
  };
}

async function designerList(page = 1, pageSize = PAGESIZE) {
  let url = apiURL;
  let params = {
    apiURL: 'decorate/designer/list',
    page,
    pageSize
  };
  let str = '';
  let data = await request(url, params, 'POST');
  if (!!data && data.code === 200) {
    data.result.list.map((item, i) => {
      str += urlStr('http://www.yoju360.com/designer/' + item.id, '0.80', moment().format('YYYY-MM-DD'));
    });
  }
  return {
    str,
    page: data.result.page + 1,
    total: data.result.total
  };
}

async function galleryList(page = 1, pageSize = PAGESIZE) {
  let url = apiURL;
  let params = {
    apiURL: 'decorate/gallery/list',
    page,
    pageSize
  };
  let str = '';
  let data = await request(url, params, 'POST');
  if (!!data && data.code === 200) {
    data.result.list.map((item, i) => {
      str += urlStr('http://www.yoju360.com/gallery/' + item.id, '0.80', moment().format('YYYY-MM-DD'));
    });
  }
  return {
    str,
    page: data.result.page + 1,
    total: data.result.total
  };
}

async function caseList(page = 1, pageSize = PAGESIZE) {
  let url = apiURL;
  let params = {
    apiURL: 'decorate/decorationCase/pc/listByDecoration',
    page,
    pageSize
  };
  let str = '';
  let data = await request(url, params, 'POST');
  if (!!data && data.code === 200) {
    data.result.list.map((item, i) => {
      str += urlStr('http://www.yoju360.com/case/' + item.id, '0.80', moment().format('YYYY-MM-DD'));
    });
  }
  return {
    str,
    page: data.result.page + 1,
    total: data.result.total
  };
}

async function liveList(page = 1, pageSize = PAGESIZE) {
  let url = apiURL;
  let params = {
    apiURL: 'decorate/constructionCase/latestConstructionCase',
    page,
    pageSize
  };
  let str = '';
  let data = await request(url, params, 'POST');
  if (!!data && data.code === 200) {
    data.result.list.map((item, i) => {
      str += urlStr('http://www.yoju360.com/live/' + item.id, '0.80', moment().format('YYYY-MM-DD'));
    });
  }
  return {
    str,
    page: page + 1,
    total: data.result.total
  };
}

router.get('/', async (ctx, next) => {
  let data = await request('http://guangzhou.yoju360.com/api/location');
  ctx.type = 'json';
  ctx.body = data;
});

router.get('/city', async (ctx, next) => {
  let url = 'http://www.yoju360.com/api/';
  let params = {
    apiURL: 'decorate/hotcities/letterList'
  };
  let data = await request(url, params, 'POST');
  let cities = [];
  if (!!data && data.code === 200) {
    data.result.map((items, i) => {
      for (let item in items) {
        items[item].map((city, key) => {
          cities.push(city);
        });
      }
    });
  }
  let s = '';
  for (let i = 0; i < cities.length; i++) {
    let str = await cityCompanies(cities[i].id, cities[i].code);
    s += str;
    str = xmlStr(str);
    fs.writeFile(`./sitemap/city/${cities[i].code}sitemap.xml`, str, function(err) {
      if (err) {
        return console.error(err);
      }
      console.log('数据写入成功！');
    });
  }
  s = xmlStr(s);
  fs.writeFile(`./sitemap/city/citiessitemap.xml`, s, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('数据写入成功！');
  });
  ctx.body = s;
});

router.get('/city/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let province = pinyin.getFullChars('广州').toLowerCase();
  let str = await cityCompanies(id, province);
  str = xmlStr(str);
  fs.writeFile(`./${province + '-' + id}.xml`, str, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('数据写入成功！');
  });
  ctx.response.type = 'xml';
  ctx.body = str;
});

router.get('/strategy(/:id)?', async (ctx, next) => {
  let id = ctx.params.id;
  let data = {
    page: 1,
    total: PAGESIZE + 1
  };
  let str = '';
  fs.writeFile(`./sitemap/strategy/${(!!id) ? id : 'strategy'}.xml`, xmlStrStart(), function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('数据写入成功！');
  });
  while (data.page <= Math.ceil(data.total / PAGESIZE)) {
    data = await strategyList(id, data.page);
    console.log(data.page, data.total);
    fs.writeFile(`./sitemap/strategy/${!!id ? id : 'strategy'}.xml`, xmlStrContent(data.str), {flag: 'a+'}, function(err) {
      if (err) {
        return console.error(err);
      }
      console.log('数据写入成功！');
    });
  }
  fs.writeFile(`./sitemap/strategy/${!!id ? id : 'strategy'}.xml`, xmlStrEnd(), {flag: 'a+'}, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('数据写入成功！');
  });
  ctx.response.type = 'xml';
  ctx.body = str;
});

router.get('/designer', async (ctx, next) => {
  let data = {
    page: 1,
    total: PAGESIZE + 1
  };
  let str = '';
  fs.writeFile(`./sitemap/designer/designer.xml`, xmlStrStart(), function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('数据写入成功！');
  });
  while (data.page <= Math.ceil(data.total / PAGESIZE)) {
    data = await designerList(data.page);
    console.log(data.page, data.total);
    fs.writeFile(`./sitemap/designer/designer.xml`, xmlStrContent(data.str), {flag: 'a+'}, function(err) {
      if (err) {
        return console.error(err);
      }
      console.log('数据写入成功！');
    });
  }
  fs.writeFile(`./sitemap/designer/designer.xml`, xmlStrEnd(), {flag: 'a+'}, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('数据写入成功！');
  });
  ctx.response.type = 'xml';
  ctx.body = str;
});

router.get('/gallery', async (ctx, next) => {
  let data = {
    page: 1,
    total: PAGESIZE + 1
  };
  let str = '';
  fs.writeFile(`./sitemap/gallery/gallery.xml`, xmlStrStart(), function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('数据写入成功！');
  });
  while (data.page <= Math.ceil(data.total / PAGESIZE)) {
    data = await galleryList(data.page);
    console.log(data.page, data.total);
    fs.writeFile(`./sitemap/gallery/gallery.xml`, xmlStrContent(data.str), {flag: 'a+'}, function(err) {
      if (err) {
        return console.error(err);
      }
      console.log('数据写入成功！');
    });
  }
  fs.writeFile(`./sitemap/gallery/gallery.xml`, xmlStrEnd(), {flag: 'a+'}, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('数据写入成功！');
  });
  ctx.response.type = 'xml';
  ctx.body = str;
});

router.get('/case', async (ctx, next) => {
  let data = {
    page: 1,
    total: PAGESIZE + 1
  };
  let str = '';
  fs.writeFile(`./sitemap/case/case.xml`, xmlStrStart(), function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('数据写入成功！');
  });
  while (data.page <= Math.ceil(data.total / PAGESIZE)) {
    data = await caseList(data.page);
    console.log(data.page, data.total);
    fs.writeFile(`./sitemap/case/case.xml`, xmlStrContent(data.str), {flag: 'a+'}, function(err) {
      if (err) {
        return console.error(err);
      }
      console.log('数据写入成功！');
    });
  }
  fs.writeFile(`./sitemap/case/case.xml`, xmlStrEnd(), {flag: 'a+'}, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('数据写入成功！');
  });
  ctx.response.type = 'xml';
  ctx.body = str;
});

router.get('/live', async (ctx, next) => {
  let data = {
    page: 1,
    total: PAGESIZE + 1
  };
  let str = '';
  fs.writeFile(`./sitemap/live/live.xml`, xmlStrStart(), function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('数据写入成功！');
  });
  while (data.page <= Math.ceil(data.total / PAGESIZE)) {
    data = await liveList(data.page);
    console.log(data.page, data.total);
    fs.writeFile(`./sitemap/live/live.xml`, xmlStrContent(data.str), {flag: 'a+'}, function(err) {
      if (err) {
        return console.error(err);
      }
      console.log('数据写入成功！');
    });
  }
  fs.writeFile(`./sitemap/live/live.xml`, xmlStrEnd(), {flag: 'a+'}, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('数据写入成功！');
  });
  ctx.response.type = 'xml';
  ctx.body = str;
});

module.exports = router;
