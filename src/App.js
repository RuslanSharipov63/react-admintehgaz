import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classes from './App.module.css';
import ModalWindowBurgerMenu from './components/modalwindow/modalwindowburgermenu/ModalWindowBurgerMenu';
import AddFormApplications from './components/forms/formapplication/AddFormApplications';
import Main from './components/main/Main'
import AddFormPropane from './components/forms/formpropane/AddFormPropane';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import DebtList from './components/debtList/DebtList';
import BurgerMenu from './components/burgermenu/BurgerMenu';
import { useState } from 'react';

const styleBody = {
  height: '100vh',
  overflowY: 'hidden',
  paddingRight: '15px',
}


function App() {

  const windowInnerWidth = window.innerWidth;
  const [windowOuterWidth, setWindowOuterWidth] = useState(windowInnerWidth);
  const [propsParam, setPropParam] = useState(false)
  const ismw = useSelector(state => state.IsMW.mw)
  console.log(ismw)
  const upDateWindow = () => {
    setWindowOuterWidth(window.innerWidth)
  }

  const isWidthForMW = () => {
    if (windowOuterWidth > 500) {
      setPropParam(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', upDateWindow);
    window.addEventListener('resize', isWidthForMW);
    return function () {
      window.removeEventListener('resize', upDateWindow);

    }

  }, [])


  const propsFunc = (classN) => {
    setPropParam(classN);
  }

  return (
    <div className={classes.App} style={ismw ? styleBody : null}>
      <div className={classes.appcontainer}>
        <Router>
          {windowOuterWidth < 500 ? <BurgerMenu propsFunc={propsFunc} /> : <Main />}
          {propsParam ? <ModalWindowBurgerMenu /> : null}
          <Routes>
            {/*  <Route path="/" element={<Main />} /> */}
            <Route path="/AddFormApplications" element={<AddFormApplications />} />
            <Route path="/AddFormPropane" element={<AddFormPropane />} />
            <Route path="/DebtList" element={<DebtList />} />
          </Routes>
        </Router>
      </div>
    </div >
  );
}

export default App;
