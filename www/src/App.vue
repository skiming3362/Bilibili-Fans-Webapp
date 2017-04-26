<template>
  <div id="vm">
    <h1>详细数据</h1>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="name" label="昵称" ></el-table-column>
      <el-table-column prop="mid" label="mid" ></el-table-column>
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
      <el-col :span="6" :offset="18">
        <div class="block" style="margin: 20px 0;">
          <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next, jumper"
            :total="50">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  watch: {
    tableData: function() {

    }
  },
  methods: {
    getFansInfo (uid) {
      $.get(`/api/browse/${uid}`, (data)=> {
        this.tableData = data.infos;
      });
    },
    tableRowClassName (row, index) {
      if(index % 2) return 'info-row';
      return 'n-row';
    },
    handleCurrentChange(val) {
      // this.currentPage = val;
    },
  },
  created: function(){
    this.getFansInfo(116568)
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

</style>