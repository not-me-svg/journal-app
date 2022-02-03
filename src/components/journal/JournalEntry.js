import React from 'react';
import moment from "moment";
import { useDispatch } from "react-redux";
import { activateNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {

    const noteDate = moment(date);
    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch( 
            activateNote( id, {
                date, title, body, url
            })
        );
    }

    return (
        <div 
            className="ja__journal-entry c-pointer"
            onClick={ handleEntryClick }>
                {
                    url &&
                    (
                        <figure className="h-100">
                            <img 
                                src={ url.length ? url : './../assets/no-image.jpg' }
                                alt={ title }
                                className="w-100 h-100"/>
                        </figure>
                    )
                }

                <div className="ja__journal-entry__body d-flex">
                    <div className="ja__journal-entry__body__content flex-stretch">
                        <h4 className="ja__journal-entry__body__title text--sm">
                            <b>{ title.length ? title : 'No title' }</b>
                        </h4>

                        <p className="ja__journal-entry__body__text text--sm">
                            { body.length ? body : 'No content' }
                        </p>
                    </div>

                    <div className="ja__journal-entry__body__date d-flex flex-column jc-center">
                        <p className="text--xs">{ noteDate.format('dddd') }</p>

                        <p className="text--xs"><b>{ noteDate.format('Do') }</b></p>
                    </div>
                </div>
        </div>
    );
};
