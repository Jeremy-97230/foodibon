const initState = {
    nbPlayers: 0,
    listPlayer: []
}

const Players = (state = initState, action) => {

    switch (action.type){

        case "PLAYER_ADD_NB":

            return {nbPlayers: action.payload, listPlayer: []}
            
        case "PLAYER_ADD_ON_PLAYER":

            const tempTab = [...state.listPlayer,  action.payload]
            return {...state, listPlayer: tempTab}
    
        default:
            
            return state
    }
}

export default Players
