import React from 'react';
import { Sidebar } from './Sidebar';
import { NoteScreen } from '../notes/NoteScreen';
import { NoContent } from './NoContent';
import { useSelector } from 'react-redux';


export const JournalScreen = () => {

  const { active } = useSelector( state => state.notes );

  return (
    <div className="ja__main-content h-100vh">
      <Sidebar />

      <main>
        {
          ( active )
          ? ( <NoteScreen /> )
          : ( <NoContent /> )
        }
      </main>
    </div>
  );
};
