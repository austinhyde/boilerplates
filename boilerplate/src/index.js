import React from 'react';
import {render} from 'react-dom';
import Root from './Root';

const node = document.createElement('div');
document.body.appendChild(node);

render(<Root/>, node);