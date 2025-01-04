'use client';

import { Provider } from 'react-redux';
import store from '../store/store';

interface Props {
    children: any;
}
export default function ReduxProvider(props: Props) {
    return <Provider store={store}>
        {props.children}
    </Provider>
}