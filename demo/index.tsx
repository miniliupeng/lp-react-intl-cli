
function App() {
    const title = '中文';
    const desc = `你好`;
    const desc2 = /*i18n-disable*/`散发哦`;
    const desc3 = `阿帆哦 ${ title + desc} 爱是烦恼 ${ desc2 } 阿蜂鸟`;

    return (
      <div className="芜湖" title={"测试"}>
        <img src={Logo} />
        <h1>起飞{title}</h1>
        <p>迷你二鹏{desc}</p>  
        <div>
        {
            /*i18n-disable*/'中文'
        }
        </div>
      </div>
    );
  }