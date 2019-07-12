import {
    mainPageAction,
} from '../controllers/page-controller'

export default [
    {
        method: 'GET',
        path: '/',
        action: mainPageAction
    },
]