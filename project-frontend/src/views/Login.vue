<template>
    <div class="login-body">
        <el-form label-position="top" :rules="state.rules" :model="state.formData" ref="loginForm" class="login-form">
            <el-form-item>
                <h2 class="text">学生信息管理系统-登录</h2>
            </el-form-item>
            <el-form-item label="账号" prop="username">
                <el-input type="text" v-model.number="state.formData.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="state.formData.password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <div class="register"  @click="toregister">没有账号？立即注册</div>
                <el-button style="width:100%" type="primary" @click="submitForm">立即登录</el-button>
                <el-checkbox v-model="state.checked">下次自动登录</el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../store/user'
import {login} from '@/service/index'
const loginForm = ref(null)
const UserStore = useUserStore()
const state = reactive({
    formData: {
        username: null,
        password: ''
    },
    checked: true,
    rules: {
        username: [
            { required: 'true', message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
            { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ]
    }
})

const submitForm = async () => {
    const result = await login(state.formData)
    console.log(result,state.formData)
    if(result.code === 0){
        ElMessage(result.msg)
    }else if(result.code === -1){
        ElMessage(result.msg)
    }else if(result.code === -2){
        ElMessage(result.msg)
    }else if(result.code === 1){
        ElMessage(result.msg)
        UserStore.isAdmin = result.data.isAdmin
        router.push({
            path: '/student'
    })
    }else {
        ElMessage('服务器出错了，程序员小哥正在抢修中~~~~~~~~~~~~~~~~')
    }
}

const toregister = () => {
    router.push({
            path: '/register'
    })
}

onMounted(() => {

})
</script>
  
<style lang="stylus" scoped>
.login-body
    position absolute
    top 45%
    left 50%
    transform translate(-50%, -50%)
    .login-form
        border-radius 15px
        background-clip pading-box
        width 300px
        padding 5px 30px
        background aliceblue
        border1px solid blueviolet
        box-shadow 0 0 25px #f885ff
        .text
            margin 0 40px
        .register
            color red
        .register:hover
            color blue
  </style>