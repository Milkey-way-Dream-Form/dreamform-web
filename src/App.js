import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  // 요청받은 정보를 담아줄 변수 선언
  const [ testStr, setTestStr ] = useState(''); 

  // 변수 초기화
  function callback(str) {
    setTestStr(str);
  }
  const _SocialNetworks = [
    {title: "Twitter", color: "black",},
    {title: "Facebook", color: "black"},
    {title: "Line", color: "black"},
    {title: "Instagram", color: "black"},
    {title: "Telegram", color: "black"},
    {title: "KaKao", color: "black"},
    {title: "LinkedIn", color: "black"},
  ]

  // 첫 번째 렌더링을 마친 후 실행
  useEffect(
      () => {
        axios({
            url: '/home',
            method: 'GET'
        }).then((res) => {
            callback(res.data);
        })
      }, []
  );

  const [ lists, setLists ] = React.useState(_SocialNetworks);
    const [ grab, setGrab ] = React.useState(null)

    const _onDragOver = e => {
        e.preventDefault();
    }

    const _onDragStart = e => {
        setGrab(e.target);
        e.target.classList.add("grabbing");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target);
    }

    const _onDragEnd = e => {
        e.target.classList.remove("grabbing");

        e.dataTransfer.dropEffect = "move";
    }

    const _onDrop = e => {
        let grabPosition = Number(grab.dataset.position);
        let targetPosition = Number(e.target.dataset.position);

        let _list = [ ...lists ];
        _list[grabPosition] = _list.splice(targetPosition, 1, _list[grabPosition])[0];

        setLists(_list);
    }
  return (
    <div className='App'>
    <ul className='Container'>
        {
            lists.map((sns, index) => (
                <li
                className='.List'
                key={index}
                data-position={index}

                onDragOver={_onDragOver}
                onDragStart={_onDragStart}
                onDragEnd={_onDragEnd}
                onDrop={_onDrop}

                draggable
                style={{
                backgroundColor: "White",
                color: sns.color,
                fontSize: "bold",
                width: 500,
                height: 50,
                margin: '0 auto'
                
                }}
                >
                    {sns.title}
                    
                </li>
            ))            
        }
    </ul>
</div>
  );
}

export default App;