import React from 'react'
import Titlebar from './layout/titlebar/Titlebar'
import './app.scss'
import './animations.scss'
import Body from './layout/body/Body'
import Footer from './layout/footer/Footer'
import { HashRouter } from 'react-router-dom'

function App() {
    return (
        <>
            <Titlebar />
                <HashRouter>
                    <Body />
                </HashRouter>
            <Footer />
        </>
    )
}

export default App
