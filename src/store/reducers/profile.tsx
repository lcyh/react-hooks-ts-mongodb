import { AnyAction } from 'redux';
export interface ProfilState {

}
let initialState: ProfilState = {

};
export default function (state: ProfilState = initialState, action: AnyAction): ProfilState {
    switch (action.type) {
        default:
            return state;
    }
}