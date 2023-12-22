// 共享状态到了中央 任然是响应式的
import { reactive } from 'vue'
import { defineStore } from 'pinia' // 定义store模型
// 用户相关的共享状态
export const useUserStore = defineStore('userstore', () => {
   const userstore = reactive({
    isAdmin:false
    })
   return {
    userstore
   }
})
