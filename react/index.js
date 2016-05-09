'use strict';
import React from 'react'
import { render } from 'react-dom'
import Header from './header'
import Body from './body'

render(
	<div className="all">
	<Header/>
	<hr/>
	<Body/>
	</div>,
	document.getElementById('app')
)