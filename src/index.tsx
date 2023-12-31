import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ApolloProvider} from "@apollo/client";
import {ApolloClient, InMemoryCache} from "@apollo/client/core";
import {Provider} from "react-redux";
import {store} from "./store";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const client = new ApolloClient({
    uri: 'https://graphql-blog-backend.onrender.com/graphql',
    cache: new InMemoryCache(),
});

root.render(
    <Provider store={store}>
        {/*// @ts-ignore*/}
        <ApolloProvider client={client}>
            <BrowserRouter>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </BrowserRouter>
        </ApolloProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();