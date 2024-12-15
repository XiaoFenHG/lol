const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let apiEndpoints = {};

// 定义根路径，显示可用的API端点
app.get('/', (req, res) => {
    res.json(apiEndpoints);
});

// 添加新的API端点
app.post('/addEndpoint', (req, res) => {
    const { path, method, response } = req.body;
    if (path && method && response) {
        apiEndpoints[path] = { method, response };
        
        // 动态创建路由
        app[method.toLowerCase()](path, (req, res) => {
            res.json(response);
        });
        
        res.json({ message: 'API endpoint added successfully', path, method, response });
    } else {
        res.status(400).json({ error: 'Invalid parameters' });
    }
});

// 删除API端点
app.post('/removeEndpoint', (req, res) => {
    const { path } = req.body;
    if (apiEndpoints[path]) {
        delete apiEndpoints[path];
        res.json({ message: 'API endpoint removed successfully', path });
    } else {
        res.status(404).json({ error: 'API endpoint not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
