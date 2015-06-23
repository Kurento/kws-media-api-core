/* Autogenerated with Kurento Idl */

/*
 * (C) Copyright 2013-2015 Kurento (http://kurento.org/)
 *
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the GNU Lesser General Public License (LGPL)
 * version 2.1 which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/lgpl-2.1.html
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

var inherits = require('inherits');

var kurentoClient = require('kurento-client');

var disguise = kurentoClient.disguise;

var ChecktypeError = kurentoClient.checkType.ChecktypeError;

var Transaction = kurentoClient.TransactionsManager.Transaction;

var HubPort = require('../HubPort');

var MediaObject = require('./MediaObject');


function noop(error, result) {
  if (error) console.trace(error);

  return result
};


/**
 * @classdesc
 *  A Hub is a routing {@link module:core/abstracts.MediaObject MediaObject}. It
 *
 * @abstract
 * @extends module:core/abstracts.MediaObject
 *
 * @constructor module:core/abstracts.Hub
 */
function Hub(){
  Hub.super_.call(this);
};
inherits(Hub, MediaObject);


/**
 * Create a new instance of a {module:core~HubPort} attached to this {module:core~Hub}
 *
 * @param {module:core/abstract.Hub~createHubCallback} callback
 *
 * @return {external:Promise}
 */
Hub.prototype.createHubPort = function(callback){
  var transaction = (arguments[0] instanceof Transaction)
                  ? Array.prototype.shift.apply(arguments)
                  : undefined;

  if(!arguments.length) callback = undefined;

  callback = (callback || noop).bind(this)

  var mediaObject = new HubPort()

  mediaObject.on('_rpc', this.emit.bind(this, '_rpc'));

  var params =
  {
    type: 'HubPort',
    constructorParams: {hub: this}
  };

  Object.defineProperty(params, 'object', {value: mediaObject});

  this.emit('_create', transaction, params, callback);

  return mediaObject
};
/**
 * @callback core/abstract.Hub~createHubCallback
 * @param {external:Error} error
 * @param {module:core/abstract.HubPort} result
 *  The created HubPort
 */


/**
 * @alias module:core/abstracts.Hub.constructorParams
 */
Hub.constructorParams = {
};

/**
 * @alias module:core/abstracts.Hub.events
 *
 * @extends module:core/abstracts.MediaObject.events
 */
Hub.events = MediaObject.events;


/**
 * Checker for {@link core/abstracts.Hub}
 *
 * @memberof module:core/abstracts
 *
 * @param {external:String} key
 * @param {module:core/abstracts.Hub} value
 */
function checkHub(key, value)
{
  if(!(value instanceof Hub))
    throw ChecktypeError(key, Hub, value);
};


module.exports = Hub;

Hub.check = checkHub;