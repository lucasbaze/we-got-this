import Firebase from '../../config/firebase';

const db = Firebase.getFirestore();

export const service = {
    async getOrCreateCurrentUser(authUser) {
        let { email, displayName, photoURL } = authUser;
        let currentUser;
        let querySnapshot = await db
            .collection('users')
            .where('email', '==', email)
            .limit(1)
            .get();

        if (!querySnapshot.empty) {
            console.log('Got Current User');
            querySnapshot.forEach(doc => {
                currentUser = doc.data();
            });
        } else {
            console.log('No User found, creating a new one!');
            //Create a new user
            let docRef = await db.collection('users').add({
                email,
                displayName,
                photoURL,
            });

            docRef.get().then(doc => {
                currentUser = doc.data();
            });
        }
        return currentUser;
    },
};
