import Firebase from '../../firebase';

const db = Firebase.getFirestore();

// export const CREATE_CUSTOMER = 'wgt/customer/create_customer';

export const createCustomer = values => {
    // db.collection('customers')
    //     .add({
    //         ...values,
    //     })
    //     .then(docSnap => {
    //         console.log(docSnap.data());
    //     });

    let customerID = values.name + '123';

    let createdDate = new Date().toISOString();

    db.collection('customers')
        .doc(`${customerID}`)
        .set({
            customerID,
            ...values,
        });
};

// export default function reducer(state, action) {
// 	//define payload
// 	let payload = action.payload;

// 	switch (action.type) {
// 		case CREATE_CUSTOMER:
// 			return {
// 				...state,
// 				...payload,
// 			};

// 		case LOGOUT:
// 			return {
// 				...state,
// 				user: null,
// 			};
// 		default:
// 			return {
// 				...state,
// 			};
// 	}
// }
