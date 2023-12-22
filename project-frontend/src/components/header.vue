<template>
    <div class="header">
      <!-- 左侧 Logo -->
      <div class="logo">
        <img src="/images/logo.svg" alt="Logo" />
      </div>
      <!-- 右侧菜单 -->
      <div class="menu">
        <!-- 返回登录页 -->
        <el-menu-item icon="el-icon-switch-button" @click="handleLogout">退出登录</el-menu-item>
        <!-- 个人登录信息 -->
        <li>
          <el-dropdown trigger="hover">
            <span class="el-dropdown-link">
              <i class="el-icon-user"></i>{{ username }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <!-- 切换主题 -->
        <el-menu-item icon="el-icon-moon" @click="toggleTheme">{{ isDarkMode ? '白色主题' : '暗色主题' }}</el-menu-item>
      </div>
    </div>
  </template>
  
  <script>
  </script>
  
  <style>
  .header {
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
  }
  
  .menu > li {
    display: inline-block;
    margin-left: 32px;
  }
  </style>
  