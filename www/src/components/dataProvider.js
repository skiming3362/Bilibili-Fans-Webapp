/*
* @Author: skiming
* @Date:   2017-05-01 21:31:00
* @Last Modified by:   skiming
* @Last Modified time: 2017-05-22 02:24:42
*/
/*data provider for app.vue*/
'use strict';
class DataProvider {
  constructor(uid) {
    this.uid = uid;
  }

  getFirstPage() {
    return  new Promise((resolve,reject)=>{
      $.get(`/api/browse/${this.uid}`, (data)=> {
        resolve(data);
      })
    });
  }

  getCurrentPage(page) {
    return new Promise((resolve,reject)=>{
      $.get(`/api/browse/${this.uid}?page=${page}&orderBy=regtime DESC`, (data)=> {
        resolve(data);
      })
    });
  }
}

export default DataProvider;