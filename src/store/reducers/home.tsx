import { AnyAction } from 'redux';
import * as TYPES from "../action-types";
export interface HomeState {
    currentCategory: string;
}
let initialState: HomeState = {
    currentCategory: 'all'//默认当前的分类是显示全部类型的课程
};
export default function (state: HomeState = initialState, action: AnyAction): HomeState {
    switch (action.type) {
        case TYPES.SET_CURRENT_CATEGORY://修改当前分类
            return { ...state, currentCategory: action.payload };
        default:
            return state;
    }
}