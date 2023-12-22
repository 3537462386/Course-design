<template>
  <div class="container">
    <!-- <Header/> -->
    <el-card>
      <!-- 表格头部 -->
      <template #header>
        <el-input v-model="state.searchdata" clearable size="small" placeholder="按学号搜索" class="searchinput"></el-input>
        <el-button @click="search" size="small">搜索</el-button>
        <el-button @click="clearFilter" size="small">清除所有筛选</el-button>
        <el-button type="primary" @click="addB" :icon="Plus" size="small">添加学生信息</el-button>
        <el-button type="primary" @click="backlogin" :icon="Plus" size="small">返回登录</el-button>
      </template>
      <!-- 表格主体 -->
      <el-table :data="state.tableData" tooltip-effect="dark" style="width:100%" border size="small" height="450px"
        ref="filterTable">
        <el-table-column type="index" label="序号" align="center" show-overflow-tooltip width="50px">
        </el-table-column>
        <el-table-column label="姓名" align="center" width="70px">
          <template #default="scope">
            <el-input size="small " v-model="scope.row.name" v-if="state.edit"></el-input>
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="照片" align="center">
          <template #default="scope">
            <img :src="scope.row.photo" style="width:50px;height:50px">
          </template>
        </el-table-column>
        <el-table-column label="学号" align="center" width="100px">
          <template #default="scope">
            <el-input size="small " v-model="scope.row.student_id" v-if="state.edit"></el-input>
            <span v-else>{{ scope.row.student_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="班级" align="center" width="80px" :filters="state.startdata.allclassdata"
          :filter-method="filterclass">
          <template #default="scope">
            <el-input size="small " v-model="scope.row.class" v-if="state.edit"></el-input>
            <span v-else>{{ scope.row.class }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学院" align="center" width="80px" :filters="state.startdata.alldepartmentdata"
          :filter-method="filterdepartment">
          <template #default="scope">
            <el-input size="small " v-model="scope.row.department" v-if="state.edit"></el-input>
            <span v-else>{{ scope.row.department }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专业" align="center" width="80px" :filters="state.startdata.allmajordata"
          :filter-method="filtermajor">
          <template #default="scope">
            <el-input size="small " v-model="scope.row.major" v-if="state.edit"></el-input>
            <span v-else>{{ scope.row.major }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center" width="60px"
          :filters="[{ text: '男', value: '男' }, { text: '女', value: '女' }]" :filter-method="filtergender">
          <template #default="scope">
            <el-input size="small " v-model="scope.row.gender" v-if="state.edit"></el-input>
            <span v-else>{{ scope.row.gender }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年龄" align="center" width="50px">
          <template #default="scope">
            <el-input size="small " v-model="scope.row.age" v-if="state.edit"></el-input>
            <span v-else>{{ scope.row.age }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" align="center" width="105px">
          <template #default="scope">
            <el-input size="small " v-model="scope.row.phone_number" v-if="state.edit"></el-input>
            <span v-else>{{ scope.row.phone_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年级" align="center" width="60px"
          :filters="[{ text: '大一', value: '大一' }, { text: '大二', value: '大二' }, { text: '大三', value: '大三' }, { text: '大四', value: '大四' }]"
          :filter-method="filtergrade">
          <template #default="scope">
            <el-input size="small " v-model="scope.row.grade" v-if="state.edit"></el-input>
            <span v-else>{{ scope.row.grade }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="130px" class-name="small-padding fixed-width" fixed="right" v-if="state.isAdmin">
          <template #default="scope">
            <el-button @click="changedata(scope.row)" v-if="state.edit" type="success" size="small">保存</el-button>
            <div v-else>
              <el-button type="primary" size="small" @click="editData(scope.row)">修改</el-button>
              <el-button type="danger" size="small" @click="deleteonestudent(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加弹窗 -->
    <el-dialog v-model="state.showDialog" title="添加学生信息" modal center destroy-on-close top="5vh">
      <el-form :model="state.Form" :rules="rules" ref="ruleFormRef" label-width="100px" size="small">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="state.Form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学号" prop="student_id">
              <el-input v-model="state.Form.student_id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input-number v-model="state.Form.age" :min="1" :max="120"></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="state.Form.gender">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="班级" prop="class">
              <el-input v-model="state.Form.class"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学院" prop="department">
              <el-input v-model="state.Form.department"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="专业" prop="major">
              <el-input v-model="state.Form.major"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" prop="phone_number">
              <el-input v-model="state.Form.phone_number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="年级" prop="grade">
              <el-select v-model="state.Form.grade" placeholder="请选择">
                <el-option label="一年级" value="大一"></el-option>
                <el-option label="二年级" value="大二"></el-option>
                <el-option label="三年级" value="大三"></el-option>
                <el-option label="四年级" value="大四"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="照片" prop="photo">

              <el-upload :class="{ hide: hideUploadEdit }" action="" :on-change="getImageFile" :limit="1"
                list-type="picture-card" :auto-upload="false">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script  setup>
import { reactive, onMounted, ref } from 'vue'
import { getAll, addstudent, deletestudent, updatestudent, getbystudentid } from '@/service/index.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import {useUserStore} from '@/store/user'
import router from '@/router'
// 页面响应数据
const ruleFormRef = ref(null)
const filterTable = ref(null)
const state = reactive({
  showDialog: false,
  edit: false,
  isAdmin:false,
  searchdata: '',
  startdata: {
    allclassdata: '',
    alldepartmentdata: '',
    allmajordata: ''
  },
  Form: {
    student_id: '',
    class: '未知',
    department: '未知',
    major: '未知',
    gender: '未知',
    age: '未知',
    name: '',
    phone_number: '未知',
    photo: '未知',
    grade: '未知'
  }
})
//返回登录
const backlogin = () => {
  router.push({
        path: '/login'
    })
}
//搜索方法
const search = async () => {
  const result = await getbystudentid({ student_id: state.searchdata })
  console.log(result)
  if (result.code === 0) {
    ElMessage(result.msg)
  }else{
     state.tableData = [result.data]
  }
 
}
//筛选方法
const filterclass = (value, row) => {
  return row.class === value
}
const filterdepartment = (value, row) => {
  return row.department === value
}
const filtermajor = (value, row) => {
  return row.major === value
}
const filtergender = (value, row) => {
  return row.gender === value
}
const filtergrade = (value, row) => {
  return row.grade === value
}
const clearFilter = () => {
  filterTable.value.clearFilter()
  location.reload()
}

//图片转base64格式方法
const getImageFile = async (file, fileList) => {
  console.log("fileList", fileList)
  const result = await getImageBase64(file.raw)
  console.log("res", result)
  state.Form.photo = result
}
const getImageBase64 = (file) => {
  return new Promise(function (resolve, reject) {
    let newImagereader = new FileReader()
    let imgInfo = ""
    newImagereader.readAsDataURL(file)
    newImagereader.onload = function () {
      imgInfo = newImagereader.result
    }
    newImagereader.onerror = function (error) {
      reject(error)
    }
    newImagereader.onloadend = function () {
      resolve(imgInfo)
    }
  })
}
// 添加学生方法
const addB = () => {
  state.showDialog = true
}
const submitForm = async () => {
  if (state.Form.student_id === '' || state.Form.name === '') {
    ElMessage('必须输入姓名和学号')
  }else {
    const result = await addstudent({
      student_id: parseInt(state.Form.student_id),
      class: parseInt(state.Form.class),
      department: state.Form.department,
      major: state.Form.major,
      gender: state.Form.gender,
      age: parseInt(state.Form.age),
      name: state.Form.name,
      phone_number: parseInt(state.Form.phone_number),
      photo: state.Form.photo,
      grade: state.Form.grade,
    })
    if (result.code === 1) {
      ElMessage(result.msg)
    } else {
      ElMessage('增加失败')
    }
    state.showDialog = false
    getAlldata()
  }

}
const resetForm = () => {
  state.Form = {
    student_id: '',
    class: '未知',
    department: '未知',
    major: '未知',
    gender: '未知',
    age: '未知',
    name: '',
    phone_number: '未知',
    photo: '未知',
    grade: '未知'
  }
}
const rules = reactive({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  student_id: [
    { required: true, message: '请输入学号', trigger: 'blur' },
    { min: 10, max: 10, message: '学号长度为10位', trigger: 'blur' },
  ]
})
//修改学生信息方法
const editData = (row) => {
  state.edit = true
}
const changedata = async (row) => {
  state.edit = false
  const result = await updatestudent({
    _id: row._id,
    student_id: row.student_id,
    class: row.class,
    department: row.department,
    major: row.major,
    gender: row.gender,
    age: row.age,
    name: row.name,
    phone_number: row.phone_number,
    photo: row.photo,
    grade: row.grade
  })
  if (result.code === 1) {
    ElMessage(result.msg)
  } else {
    ElMessage('更新失败')
  }
}
// 删除学生信息方法
const deleteonestudent = (row) => {
  const _id = row._id
  ElMessageBox.confirm(
    '确认删除该学生信息吗？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      const result = deletestudent({ _id: _id })
      getAlldata()
      location.reload()
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消',
      })
    })

}

//数据初始化方法
const getAlldata = async () => {
  const { data } = await getAll()
  state.tableData = data

  let allclassdata = []
  let alldepartmentdata = []
  let allmajordata = []
  let allclass = [...new Set(data.map(data => data.class))]
  let alldepartment = [...new Set(data.map(data => data.department))]
  let allmajor = [...new Set(data.map(data => data.major))]
  allclass.forEach(e => {
    allclassdata.push({ text: e, value: e })
  })
  alldepartment.forEach(e => {
    alldepartmentdata.push({ text: e, value: e })
  })
  allmajor.forEach(e => {
    allmajordata.push({ text: e, value: e })
  })
  state.startdata.allclassdata = allclassdata
  state.startdata.alldepartmentdata = alldepartmentdata
  state.startdata.allmajordata = allmajordata
}
onMounted(() => {
  getAlldata()
  state.isAdmin = useUserStore
})
</script>

<style lang="stylus" scoped>
  .container
    display flex
    justify-content center
    .el-card
      max-width 1200px
      .searchinput
        width 120px
      > *
        margin 0 20px
      img
        width 100px
        height 100px
    .imgwidth 
      width 50px
      height 50px
    .image-slot 
      width 50px
      height 50px
    
    .image-slot i 
      font-size 50px
    
    .hide .el-upload--picture-card 
      display none

</style>