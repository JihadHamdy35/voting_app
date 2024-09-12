import { StrictMode } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { render } from '@testing-library/react';

/// ---------------------------------IMPORTANT VARIABLES 
let check = localStorage.getItem('allPOVs');
const noPovs = ReactDOM.createRoot(document.getElementById('no-pov'));
const root = ReactDOM.createRoot(document.getElementById('root'));
let addPOVBtn = document.getElementById('add-pov');
let popUp = ReactDOM.createRoot(document.getElementById('add-pop-up'));

/// --------------------------------- NO POVs FOUND FUNCTION
function NoPov() {
  return (
    <div>
      <p>
        No POVs Found <br />
        Add Your First POV Now!!
      </p>
    </div>
  )
}

/// --------------------------------- ADD POV BUTTON CLICK
addPOVBtn.onclick = function () {
  popUp.render(
    <React.StrictMode>
      <AddPOV_Div />
    </React.StrictMode>
  )
}

/// --------------------------------- POPUP FUNCTIONs
function popDown() {
  popUp.unmount();
  popUp = ReactDOM.createRoot(document.getElementById('add-pop-up'));
}
function AddPOV_Div() {
  return (
    <div>
      <img src='./images/close.png'
        alt='close'
        onClick={popDown} />

      <input
        type='text'
        placeholder='Your Name...'
        className='name'
        required
        maxLength={15}
        onChange={(e) => { e.target.setAttribute('value', e.target.value) }} />

      <textarea
        placeholder='Write Your POV...'
        className='pov'
        required
        onChange={(e) => { e.target.setAttribute('value', e.target.value) }} />

      <input
        type='button'
        value='POV It'
        className='submit-btn'
        onClick={createPOV}
      />
    </div>
  )
}
/// --------------------------------- POV COMPONENT AND POVLIST
function vote(id){
  return function(){
    let allPOVs = localStorage.getItem('allPOVs');
    allPOVs = allPOVs.split('|').map((ele) => { return JSON.parse(ele); });
    allPOVs[id].likes++;
    localStorage['allPOVs'] = allPOVs.map((ele) => { return JSON.stringify(ele); }).join('|');
    root.render(
      <React.StrictMode>
        <POVList />
      </React.StrictMode>
    )
  }
}
class POV extends React.Component {
  render() {
    return (
      <div className='POV-div'>
        <h1>BY : {this.props.author}</h1>
        <p>{this.props.POV}</p>
        <div>
        <img src='./images/triangle.png' alt='vote' onClick={vote(this.props.id)}/>
        <span className='likes'>{this.props.likes}</span>
        </div>
      </div>
    )
  }
}
class POVList extends React.Component {
  render() {
    let allPOVs = localStorage.getItem('allPOVs');
    allPOVs = allPOVs.split('|').map((ele) => { return JSON.parse(ele); });
    allPOVs= allPOVs.sort((a, b) => b.likes - a.likes);
    const POVs = allPOVs.map(
      function (ele) {
        return (
          <POV
            key={ele.id}
            id={ele.id}
            author={ele.author}
            POV={ele['POV']}
            likes={ele.likes}
          />
        )
      }
    )
    return (
      <div>
        {POVs}
      </div>
    )
  }
}
/// --------------------------------- ADD POV TO LOCALSTORAGE AND RENDER
function createPOV() {
  let name = document.querySelector('#add-pop-up .name').getAttribute('value');
  let pov = document.querySelector('#add-pop-up .pov').getAttribute('value');
  if (name===null || pov===null) {
    return;
  }
  let object = {
    'author': document.querySelector('#add-pop-up .name').getAttribute('value'),
    'POV': document.querySelector('#add-pop-up .pov').getAttribute('value'),
    'id': ++localStorage['last'],
    'likes': 0,
  };
  console.log(object);
    document.querySelector('#add-pop-up img').click();
    noPovs.unmount();
    let POVs = localStorage['allPOVs'] == '' ? JSON.stringify(object) : localStorage['allPOVs'] + '|' + JSON.stringify(object);
    localStorage['allPOVs'] = POVs;
    /// --------------------------------- RENDER
    root.render(
      <React.StrictMode>
        <POVList />
      </React.StrictMode>
    )

}

/// --------------------------------- CHECK IF NO POVs AND LOCALSTORAGE
if (check === null || check.length == 0) {
  localStorage.setItem('allPOVs', '');
  localStorage.setItem('last', -1);
  noPovs.render(
    <React.StrictMode>
      <NoPov />
    </React.StrictMode>
  )
}
else {
  root.render(
    <React.StrictMode>
      <POVList />
    </React.StrictMode>
  )
}

// TEMPLATE
function App() { }
export default App;