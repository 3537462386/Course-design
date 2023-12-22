<template>
    <div class="login-body">
        <el-form label-position="top" :rules="state.rules" :model="state.formData" ref="loginForm" class="login-form"
            size="small">
            <h2 class="text">学生信息管理系统-注册</h2>
            <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="state.formData.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="state.formData.password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="请再次输入密码" prop="repassword">
                <el-input type="password" v-model="state.repassword" autocomplete="off" />
            </el-form-item>
            <el-form-item label="请选择你的身份" prop="isAdmin">
                <el-radio v-model="state.formData.isAdmin" label=true>管理员</el-radio>
                <el-radio v-model="state.formData.isAdmin" label=false>普通用户</el-radio>
            </el-form-item>
            <el-form-item>
                <div class="register" @click="tologin">已有账号？前往登录</div>
                <el-button style="width:100%" type="primary" @click="submitForm">立即注册</el-button>
                <el-checkbox v-model="state.checked">记住密码</el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script setup>
import { reactive, ref, onMounted } from 'vue'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { register } from '@/service/index'

const state = reactive({
    formData: {
        username: '',
        password: '',
        isAdmin: false
    },
    repassword: '',
    checked: true,
    rules: {
        username: [
            { required: 'true', message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
            { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ],
        repassword: [
            { required: 'true', message: '确认密码', trigger: 'blur' }
        ],
        isAdmin: [
            { required: 'true', message: '请选择你的身份', trigger: 'blur' }
        ]
    }
})

const submitForm = async () => {
    if (state.formData.password != state.repassword) {
        ElMessage('俩次输入密码不一致')
        return
    }
    const result = await register(state.formData)
    if (result.code === 0) {
        ElMessage(result.msg)
    } else if (result.code === -1) {
        ElMessage(result.msg)
    }
    else if (result.code === 2) {
        ElMessage(result.msg)
    } else if (result.code === 1) {
        ElMessage(result.msg)
        router.push({
        path: '/student'
    })
    } else {
        ElMessage('服务器出错了，程序员小哥正在抢修中~~~~~~~~~~~~~~~~')
    }
}

const tologin = () => {
    router.push({
        path: '/login'
    })
}

onMounted(() => {

})
</script>
  
<style lang="stylus" scoped>
.login-body
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    background-image url("../assets/background.jpg")
    font-size 14px
    .login-form
        border-radius 15px
        background-clip pading-box
        padding 10px 30px
        width 250px
        background aliceblue
        border1px solid blueviolet
        box-shadow 0 0 25px #f885ff
        .register
            color red
        .register:hover
            color blue
        .p
            margin 0
            padding 0
  </style>