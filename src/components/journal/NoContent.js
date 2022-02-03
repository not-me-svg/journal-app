import React from 'react';
import { Backpack, Planet } from 'react-kawaii';

export const NoContent = () => {
  return (
        <div className="w-100 h-100 p-relative">
            <div className="ja__no-content__content d-flex flex-column ai-center">
                <h3>No content!</h3>
                <br />
                <div>
                    <Planet size={300} mood="shocked" color="#faa3aa" />
                </div>
                <br />
                <p>Select an entry or create a new one</p>
            </div>
        </div>
  );
};
