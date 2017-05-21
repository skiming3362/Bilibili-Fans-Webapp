<template>
  <div>
    <h3>详细数据</h3>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" @header-click="handleClick" border>
      <el-table-column prop="name" label="昵称" sortable></el-table-column>
      <el-table-column prop="mid" label="mid" sortable></el-table-column>
      <el-table-column prop="level" label="等级" ></el-table-column>
      <el-table-column prop="attention_num" label="关注数" ></el-table-column>
      <el-table-column prop="regtime" label="注册时间" width="180">
        <template scope="scope">
          {{new Date(scope.row.regtime*1000).toLocaleString().replace(/:\d{1,2}$/,' ')}}
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" ></el-table-column>
      <el-table-column prop="place" label="地区" ></el-table-column>
      <el-table-column prop="fans_num" label="粉丝数" ></el-table-column>
    </el-table>
    <el-row>
      <el-col :span="8" :offset="16">
        <div class="block" style="margin: 20px 0;">
          <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next, jumper"
            :total="totalRow" :page-size="pageSize">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <textarea id="rich-editor"></textarea>
  </div>
</template>

<script>
import DataProvider from './components/dataProvider.js'
require('wangeditor')

export default {
  data () {
    return {
      tableData: [],
      totalRow: 0,
      pageSize: 0,
      uid: null,
      dp: null
    }
  },
  methods: {
    handleClick() {
      
    },
    async getFansInfo(uid) {
        let data = await this.dp.getFirstPage();
        this.tableData = data.infos;
        this.totalRow = data.page.item_count;
        this.pageSize = data.page.page_size;
    },
    tableRowClassName (row, index) {
      if(index % 2) return 'info-row';
      return 'n-row';
    },
    handleCurrentChange(val) {
      this.getCurrentPage(val);
    },
    async getCurrentPage(cPage) {
      let data = await this.dp.getCurrentPage(cPage);
      this.tableData = data.infos;
    },
    getUid() {
      let re = /\/(\d+)/;
      this.uid = re.exec(window.location.pathname)[1];//需要优化
    },
    initDp() {
      this.dp = new DataProvider(this.uid);
    }
  },
  created: async function() {
    this.getUid();
    this.initDp();
    await this.getFansInfo(this.uid);
  }
}
</script>

<style>

  .el-table .info-row {
    background: #c9e5f5;
  }
  .el-table .n-row {
    background: #eee;
  }
  #rich-editor {
    height: 400px;
  }
</style>