import { getDocs, db, collection, query } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
    const notesSnap = await getDocs(query(collection(db, `${ uid }/journal/notes`)));
    const notes = [];

    notesSnap.forEach( snapChild => {
        notes.push({
            id: snapChild.id,
            ...snapChild.data()
        })
    });

    return notes;
}