define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
], function(declare, _WidgetBase) {
    "use strict";

    // Declare widget's prototype.
    return declare("DeviceIdWidget.widget.DeviceIdWidget", [ _WidgetBase ], {

        // DOM elements
        deviceIDAttr: null,
        _contextObj: null,
        _idSet: false,

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function(obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;

            if (!this._idSet) {
                this.setDeviceID(callback);
            } else {
                mendix.lang.nullExec(callback);
            }
        },

        setDeviceID: function (callback) {
            logger.debug(this.id + ".setDeviceID");

            if (window.device && window.device.uuid) {
                if (this._contextObj) {
                    this._contextObj.set(this.deviceIDAttr, window.device.uuid);
                } else {
                    console.warn(this.id + ".setDeviceID have a device ID, but no context object. Skipping");
                }
            } else {
                console.warn(this.id + ".setDeviceID cannot find device & id, is this PhoneGap?");
            }

            mendix.lang.nullExec(callback);
        }
    });
});

require(["DeviceIdWidget/widget/DeviceIdWidget"], function() {
    "use strict";
});
