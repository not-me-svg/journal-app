import React from 'react';
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { startDeleteNote, startSaveNote } from '../../actions/notes';

export const NotesAppBar = ({date}) => {

  const dispatch = useDispatch();
  const { active } = useSelector( state => state.notes );
  const noteDate = moment(date);

  const handleSave = () => {
    dispatch(startSaveNote(active));
  }

  const handleDelete = () => {
    dispatch(startDeleteNote(active.id));
  }

  return (
    <div className="ja__notes-bar w-100 d-flex jc-space-between ai-center">
        <span>{ noteDate.format('MMMM Do YYYY') }</span>

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
