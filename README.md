<div align="center">
<img src="./public/favicon.png" width="120px" height="120px" />
<h2>今日热榜</h2>
<p>聚合互联网热门资讯，All IN ONE API</p>
<br />
<img src="https://img.shields.io/github/last-commit/daylight2022/DailyHotApi" alt="last commit"/>
 <img src="https://img.shields.io/github/languages/code-size/daylight2022/DailyHotApi" alt="code size"/>
</div>

## 🚩 特性

- [x] 极速的响应速度
- [x] 扩展性强的路由设计
- [x] 丰富的数据源
- [x] 多种部署方式
- [ ] 支持 RSS 订阅

## 👀 接口总览

> 部分站点可能因就长期不维护无法使用，请自行测试
> 有想要增加接口站点，或遇到失效接口，可在 [issues](https://github.com/daylight2022/DailyHotApi/issues) 中反馈

> 🟢 状态正常 / 🟠 可能失效 / ❌ 无法使用 / ⚠️ 需要科学上网

<details>
<summary>查看全部接口状态</summary>

| **站点**         | **类别**     | **接口名称**   | **状态** |
| ---------------- | ------------ | -------------- | -------- |
| 知乎              | 热榜        | zhihu         | 🟢       |
| 知乎日报           | 推荐榜      | zhihu-daily   | 🟢       |
| 今日头条           | 热榜        | toutiao       | 🟢       |
</details>

## 🛠️ 安装

### 手动部署

```bash
git clone https://github.com/daylight2022/DailyHotApi.git
cd DailyHotApi
npm install
npm run dev
```

#### 编译运行

```bash
npm run build
npm run start
```

启动后会在控制台输出可访问的地址

### Docker 部署

待更新

### Vercel 部署

待更新

## ⚠️ 提示

- 本项目默认对数据源进行缓存，默认 `60` 分钟。如需修改缓存时间，请在 `.env` 中设置 `CACHE_TTL`
- 本项目部分接口使用了**爬虫技术**，如若违反有关网站规定，请**立即通知我去除接口**

## 📢 免责声明

- 本项目提供的 `API` 仅供开发者进行技术研究和开发测试使用。使用该 `API` 获取的信息仅供参考，不代表本项目对信息的准确性、可靠性、合法性、完整性作出任何承诺或保证。本项目不对任何因使用该 `API` 获取信息而导致的任何直接或间接损失负责。本项目保留随时更改 `API` 接口地址、接口协议、接口参数及其他相关内容的权利。本项目对使用者使用 `API` 的行为不承担任何直接或间接的法律责任
- 本项目并未与相关信息提供方建立任何关联或合作关系，获取的信息均来自公开渠道，如因使用该 `API` 获取信息而产生的任何法律责任，由使用者自行承担
- 本项目对使用 `API` 获取的信息进行了最大限度的筛选和整理，但不保证信息的准确性和完整性。使用 `API` 获取信息时，请务必自行核实信息的真实性和可靠性，谨慎处理相关事项
- 本项目保留对 `API` 的随时更改、停用、限制使用等措施的权利。任何因使用本 `API` 产生的损失，本项目不负担任何赔偿和责任

## 💏 感谢

部分代码及设计灵感参考了以下项目，特此感谢：

- [DailyHotApi](https://github.com/imsyy/DailyHotApi)
