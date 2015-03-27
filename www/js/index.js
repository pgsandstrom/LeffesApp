/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var innovation = window.innovation = window.innovation || {};
innovation.index = innovation.index || {};

var app = {
	initialize: function () {
		this.bindEvents();
	},

	bindEvents: function () {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		//The redundant "resume"-triggers are stupid fixes to ensure that resume is run on all devices... iOS, I'm looking at you!!!
		document.addEventListener('resume', app.onResume, false);
		document.addEventListener("urbanairship.registration", app.onResume, false);
	},
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady: function () {
		console.log("onDeviceReady");

		if (window.jQuery) {
			app.onResume();
			document.addEventListener('resume', app.onResume, false);
		} else {
			setTimeout(function () {
				app.onDeviceReady();
			}, 100);
		}
	},
	onResume: function () {

		//since we have a lot of resume-triggers, just ensure that it wont run to often...
		var time = new Date().getTime();

		try {
			if (innovation.index.resumeLastTime !== undefined) {
				if (time - innovation.index.resumeLastTime < 3000) {
					console.log("was just " + (time - innovation.index.resumeLastTime) + " since last onresume. Ignoring");
					return;
				} else {
					console.log("was " + (time - innovation.index.resumeLastTime) + " since last onresume");
					innovation.index.resumeLastTime = time;
				}
			} else {
				console.log("no earlier resume");
				innovation.index.resumeLastTime = time;
			}
		} catch (e) {
			console.log("onresume crash: " + e);
		}

		//Another "hängsle and livrem"-fix to ensure iOS does not fail with onResume...
		setTimeout(function () {
			console.log("onResume");
			innovation.view.resetView();
		}, 0);
	}
};

//Uncomment to make stuff load when developing on computer:
setTimeout(function () {
    app.onDeviceReady();
}, 250);
