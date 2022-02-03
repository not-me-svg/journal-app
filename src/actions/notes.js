import Swal from 'sweetalert2'
import { addDoc, db, collection, deleteDoc, doc, updateDoc } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        try {
            const docRef = await addDoc(collection(db, `${ uid }`, "journal/notes"), newNote);

            dispatch(activateNote(docRef.id, newNote));
            dispatch(addNewNote(docRef.id, newNote));
        } catch (error) {
            console.log(error);
        }
    }
}

export const activateNote = (id, note) => {
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }
}

export const addNewNote = (id, note) => {
    return {
        type: types.notesAddNew,
        payload: {
            id, 
            ...note
        }
    }
}

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);

        dispatch(setNotes(notes))
    }
}

export const setNotes = (notes) => {
    return {
        type: types.notesLoad,
        payload: notes
    }
}

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url
        }

        const noteToFirestore = { ...note }
        delete noteToFirestore.id;

        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);
        await updateDoc(noteRef, noteToFirestore);

        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire('Saved', note.title, 'success');
    }
}

export const refreshNote = (id, note) => {
    return {
        type: types.notesUpdated,
        payload: {
            id,
            note: {
                id,
                ...note
            }
        }
    }
}

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active:activeNote } = getState().notes;
        
        Swal.fire({
            title: "Uploading...",
            text: "Please wait...",
            showConfirmButton: false,
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading();
            },
        });

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

        dispatch(startSaveNote(activeNote));

        Swal.close();
        
    }
}

export const startDeleteNote = (id) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;

        const noteRef = doc(db,`${uid}/journal/notes/${id}`);
        await deleteDoc(noteRef);

        dispatch( deleteNote(id));
    }
}

export const deleteNote = (id) => {
    return {
        type: types.notesDelete,
        payload: id
    }
}

export const noteLogout = () => {
    return {
        type: types.notesLogOutCleaning
    }
}