import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { startDeleteNote, startSaveNote } from '../../actions/notes';

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const { active } = useSelector( state => state.notes );

  const handleSave = () => {
    dispatch(startSaveNote(active));
  }

  const handleDelete = () => {
    dispatch(startDeleteNote(active.id));
  }

  return (
    <div className="ja__notes-bar w-100 d-flex jc-space-between ai-center">
        <span>28 de agosto de 2020</span>

        <div>
            <button
              className="btn btn--secondary mr--sm" 
              onClick={ handleSave }>Save</button>

            <button
              className="btn btn--secondary" 
              onClick={ handleDelete }>Delete</button>
        </div>
    </div>
  );
};
