import React from 'react'
import pageData from './pageData'
import config from './config'
import components from './components'
import templateData from './templateData'
import Utils from './utils'
import { useNavigate, Route, Routes, useLocation } from "react-router-dom";

console.log(pageData, config, templateData)
const App = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const utils = Utils(config)

    console.log(location)

    const onClick = e => {
        if (e.target.closest('a[href]') === null) {
            return
        }

        const href = e.target.closest('a[href]').getAttribute('href')
        if ( href.slice(0, 1) === "/") {
            e.preventDefault()
            navigate(href === `/${config.index}` ? '/' : href)
            return false;
        }
    }

    const maketree = pool => pool.map(item => {
        if (Array.isArray(item.children) === true) {
            return (
                    <details>
                <summary>
                    {item.name}
                </summary>
                        {maketree(item.children)}
                        </details>
            )
        } 

        return (<p onClick={() => navigate(`/${item.path}`)}>{item.name}</p>)
    })
    return (
        <div class="container-fluid">
            { location.pathname === '/' && (
                <>
                <div className="intro" style={{height:'100vh'}} >
           
                    <div style={{backgroundImage:`url(${utils.assets('bg.jpg', true)}`}}></div>
                    <h1>{templateData.title || 'Floral Theme'}</h1>
                    <h2>{templateData.subtitle || 'A wonderful floral theme'}</h2>
                    <div className='godown'>
                        <a onClick={() => {
                            document.body.scrollTo(0, document.querySelector('.menu + *').offsetTop)
                        }}>
                            <img src={utils.assets('flower_arrow.svg', true)} />
                        </a>
                    </div>
                </div>
                <nav className="menu">
                        {templateData.home_menu.map(item => {
                            let param = {}
                            if (item[1].slice(0,1) === '/') {
                                param.onClick=() => navigate(item[1])
                            } else if (item[1].slice(0,1) === '#') {
                                param.onClick=() => document.body.scrollTo(0, document.querySelector(item[1]).offsetTop)
                            } else {
                                param.href=item[1]
                            }
                            return (
                                <a {...param}>{item[0]}</a>
                            )
                        })}
                    </nav>
                </>
            )}
                        <Routes>
                        {pageData.map(page => (
                                <Route 
                                key={page.path} 
                                index={page.path === `/${config.index}`}
                                 path={page.path === `/${config.index}` ? '/' : page.path.toLowerCase()}
                                element={<div dangerouslySetInnerHTML={{__html: page.content}} onClick={onClick} />} 
                                />
                        ))}
                        {components.map(component => {
                            const Component = component.name
                            const compoPath = component.path

                            return (
                                <Route 
                                key={compoPath} 
                                path={compoPath.toLowerCase()} 
                                element={<Component />} 
                                />
                            )
                        })}
                        </Routes>
            </div>
)
    }

export default App