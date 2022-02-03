import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { JournalEntries } from './JournalEntries';
import { startLogOut } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {

  const dispatch = useDispatch();
  const { name } = useSelector( state => state.auth );
  const [sideBarActive, setSideBarActive] = useState('true');

  const handleLogOut = () => {
    dispatch(startLogOut())
  }

  const handleAddNew = () => {
    dispatch(startNewNote())
  }

  const handleSidebarToggle = () => {
    setSideBarActive(!sideBarActive);
  }

  return (
    <aside className={ sideBarActive ? "ja__sidebar d-flex flex-column ai-center h-100vh" : "ja__sidebar ja__sidebar--hidden d-flex flex-column ai-center h-100vh"}>
        
        <nav className="ja__sidebar-navbar d-flex ai-center jc-space-between w-100">
            <div className="d-flex flex-stretch ai-center">
                <i className="far fa-moon"></i>
                <p className="text--sm"><b>{ name }</b></p>
            </div>

            <button 
              className="btn btn--secondary"
              onClick={ handleLogOut }>Logout</button>
        </nav>

        <div 
          className="ja__sidenav-new-entry d-flex flex-column ai-center jc-center w-100 c-pointer"
          onClick={ handleAddNew }>
            <i className="far fa-calendar-plus fa-5x"></i>

            <p>New entry</p>
        </div>

        <div className="ja__sidenav-entries flex-stretch w-100">
          <JournalEntries />
        </div>

        <button 
              className="ja__sidenav-toggle-btn btn btn--secondary btn--lg"
              onClick={ handleSidebarToggle }>
          <i className="fas fa-bars"></i>      
        </button>
    </aside>
  );
};
