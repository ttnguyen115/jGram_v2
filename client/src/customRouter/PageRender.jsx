import React, { createElement } from 'react'
import { useParams } from 'react-router-dom'
import NotFound from '../components/NotFound';
import { useSelector } from 'react-redux';
 
const generatePage = (pageName) => {
    const component = () => require(`../pages/${pageName}`).default;

    try {
        return createElement(component());
    } catch (err) {
        return <NotFound />
    }
}

const PageRender = () => {
    const { page, id } = useParams();
    const { authReducer } =  useSelector(state => state)
    
    let pageName = '';

    if (authReducer.token) {
        if (id) {
            pageName = `${page}/[id]`;
        } else {
            pageName = `${page}`;
        }
    }
    
    return generatePage(pageName);
}

export default PageRender
