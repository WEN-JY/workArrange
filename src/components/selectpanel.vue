<template :span='6' >
<el-row :gutter="20" class='selectpanel'>
  <el-col :span="6" :offset="1"><div class="grid-content bg-purple">

  <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="职工姓名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="单位选择">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="南京南所" value="shanghai"></el-option>
      <el-option label="南京所" value="beijing"></el-option>
      <el-option label="合肥所" value="hefei"></el-option>
      <el-option label="徐州所" value="xuzhou"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="按时间段">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="变动信息">
    <el-switch v-model="form.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="变动原因">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="岗位变动" name="type"></el-checkbox>
      <el-checkbox label="人事变动" name="type"></el-checkbox>
      <el-checkbox label="职工离职" name="type"></el-checkbox>
      <el-checkbox label="职工自租房" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源">
    <el-radio-group v-model="form.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">搜索</el-button>
    <el-button>取消</el-button>
  </el-form-item>
    </el-form>
    </div></el-col>
  <el-col :span="16"><div class="grid-content bg-purple">
      这里是右侧页面
    </div></el-col>
</el-row>
</template>
<style scoped>
.selectpanel{
    margin-top:60px
}
</style>

<script>
  export default {
    data() {
      return {
        form: {
          name: '请输入查找人员姓名',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>