/*****************************************************************************
 * Open MCT Web, Copyright (c) 2014-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

define([
    "./UTCTimeSystem",
    "./LocalClock",
    "./UTCTimeFormat",
    "./DurationFormat"
], function (
    UTCTimeSystem,
    LocalClock,
    UTCTimeFormat,
    DurationFormat
) {
    /**
     * Install a time system that supports UTC times. It also installs a local
     * clock source that ticks every 100ms, providing UTC times.
     */
    return function () {
        return function (openmct) {
            var timeSystem = new UTCTimeSystem();
            openmct.time.addTimeSystem(timeSystem);
            openmct.time.addClock(new LocalClock(100));
            openmct.telemetry.addFormat(new UTCTimeFormat());
            openmct.telemetry.addFormat(new DurationFormat());

            openmct.legacyExtension("constants", {
                "key": "DEFAULT_TIME_FORMAT",
                "value": "utc"
            });
        };
    };
});
