import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { NotesAppBar } from './NotesAppBar';
import { useForm } from '../../hooks/useForm';
import { activateNote, startUploading } from '../../actions/notes';

export const NoteScreen = () => {

  const dispatch = useDispatch();
  const { active:note } = useSelector( state => state.notes );
  const [ formValues, handleInputChange, reset ] = useForm(note);
  const { body, title, id } = formValues;
  
  const activeId = useRef( note.id );
 
  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);

      activeId.current = note.id;
    }
  }, [note, reset]);
  
  useEffect(() => {
    dispatch(activateNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handlePictureClick = (e) => {
    e.preventDefault();
    document.querySelector('#file-selector').click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      dispatch(startUploading(file));
    }
  }

  return (
    <div>
      <NotesAppBar { ...note }/>

      <div className="ja__note-screen">
        <form>
          <div class="d-flex flex-column">
            <input 
              className="input"
              type="text"
              placeholder="Note title"
              autoComplete="off"
              name="title"
              value={ title }
              onChange={ handleInputChange } />

            <br />

            <textarea 
              className="textarea"
              placeholder="xxxx" 
              name="Note body" 
              id="" 
              cols="30" 
              rows="10"
              name="body"
              value={ body }
              onChange={ handleInputChange } ></textarea>
              <br />

            {
              (note.url)
              ?
              (
                <figure>
                  <img 
                      src={ note.url }
                      alt="XXX"
                      className="w-100 h-100"/>
                </figure>
              )
              :
              (
                <div>
                  <button 
                    className="btn btn--secondary mr--sm" 
                    onClick={ handlePictureClick }>Upload Picture</button>
                </div>
              )
            }
          </div>
        </form>
      </div>

      <input 
        type="file" 
        onChange={ handleFileChange }
        id="file-selector"
        name="file"
        className="hide" />
    </div>
  );
};
