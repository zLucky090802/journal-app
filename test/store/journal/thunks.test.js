import { collection, deleteDoc, getDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";

describe('Pruebas en JournalThunks', () => {  
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks());
    test('startNewNote debe de crear una nueva nota en blanco', async() => {
        const uid = 'TEST-UID';  
        getState.mockReturnValue({auth:{uid:uid}});
        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: '',
           
            date: expect.any( Number ) // Acepta cualquier número
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: '',
            
            date: expect.any( Number ) // Acepta cualquier número
        }));

        //Borrar de firebase
        const collectionRef = collection( FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);
        
        const deletePromise = []
        docs.forEach(doc => deletePromise.push(deleteDoc(doc.ref)));
        await Promise.all(deletePromise);
        

    })
})