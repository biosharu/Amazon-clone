export const initialState = {
    basket: [],
    user: null
};

//selector
export const getBasketTotal = (basket) => 
    (basket.reduce((amount, item) => item.price + amount, 0))


const reducer = (state, action) =>{
    console.log(action);
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (item) => item.id === action.id
            );

            let newBasket = [...state.basket];

            if(index >= 0){
                newBasket.splice(index, 1);
            } 
            else{
                console.warn(`Cant remove item with id : ${action.id}`);
            }
            
            return {
                ...state,
                basket: newBasket
            }
        case 'SIGN_IN':
            return {
                ...state,
                user: action.user
            }
        case 'SIGN_OUT':
            return {
                ...state,
                user: null
            }
        default:
            return state; 
    }

}

export default reducer;