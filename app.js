const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { exec } = require('child_process');

// 静态资源中间件，将 public 目录映射到根路径
app.use(express.static(path.join(__dirname, 'public')));

// 跨域
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的请求方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
  credentials: true // 允许携带认证信息（如 Cookies）
}));



// 网络测试接口
app.get('/updateWeb', (req, res) => {
  // console.log('测试99999')
  try {
    const scriptPath = path.join(__dirname, './sh/git_pull.sh');
    console.log('测试scriptPath', scriptPath)
    exec(`sh ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        // 执行出错时的处理逻辑
        console.error('执行命令出错:', error);
        res.status(500).send('执行命令出错');
        return;
      }

      // 执行成功时的处理逻辑
      console.log('命令执行结果:', stdout);
      res.status(200).send('命令执行成功');
    });
  } catch(err) {
    console.log('测试err', err)
  }  
})

// 用于处理根路径的路由，这句话要放最底部
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动服务器
const port = 3355;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});