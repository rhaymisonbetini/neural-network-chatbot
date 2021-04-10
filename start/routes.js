'use strict'


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/train', 'BrainController.train');
Route.post('/chatbot', 'BrainController.chatbot');
