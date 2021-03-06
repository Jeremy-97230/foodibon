/* firebase */
import app from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
const fireCard =  firestore().collection('card');

const initState = []

const Card = (state = initState, action) => {

    switch (action.type){

        case "CARD_UPDATE_ALL":

            return action.payload

        case "CARD_ADD_PRODUCT":

            const tabCardVerif = state.filter(itmCard => itmCard.idProduct == action.payload.idProduct);

            if(tabCardVerif.length > 0){

                let elem = state.filter(prd => prd.idProduct == action.payload.idProduct)[0]
                let qty =  elem.quantity + action.payload.quantity;
                if (qty > 10){
                    qty = 10
                }
                fireCard.doc(elem.id).update({ quantity: qty })
            }else{

                fireCard.add(action.payload)
            }

            return state
            
        case "CARD_REMOVE_PRODUCT":

            fireCard.doc(action.payload).delete()
            return state

        case "CARD_INCREMENT_QUANTITY_PRODUCT":

            const moveState =  state.map(value => {

                if (value.idProduct == action.payload){

                    if(value.quantity < 10){

                        fireCard.doc(value.id).update({ quantity: value.quantity + 1 })
                        return {...value, quantity: value.quantity + 1 }
                    }else{

                        return value
                    }

                }else{

                    return value
                }
            })
            return state

        case "CARD_DECREMENT_QUANTITY_PRODUCT":

            const newState =  state.map(value => {

                if (value.idProduct == action.payload){

                    if(value.quantity > 1){

                        fireCard.doc(value.id).update({ quantity: value.quantity - 1 })
                        return {...value, quantity: value.quantity - 1 }
                    }else{

                        return value
                    }
                }else{

                    return value
                }
            })
            return state

        case "CARD_ALL_REMOVE_PRODUCTS":

            let batch = firestore().batch();
            const jobskill_ref = fireCard.where('user', '==', action.payload);

            jobskill_ref
            .get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
                });
                return batch.commit();
            })
            return state

        default:
            
            return state
    }
}

export default Card
