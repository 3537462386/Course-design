import { createApp } from 'vue'
import App from './App.vue' // 根组件
// - 启用路由 路由接管项目
import router from '@/router' // 路由的配置 模块化
// - 组件库 按需加载
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia' // 
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'lib-flexible/flexible.js'
import naive from 'naive-ui'
const app = createApp(App) // Web app
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app
    .use(naive)
    .use(createPinia())
    .use(router) // 前端路由
    .use(ElementPlus)
    .mount('#app') // 挂载
