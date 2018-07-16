﻿//*******************************************************************************
//
//    Copyright 2018 Microsoft
//    
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//    
//        http://www.apache.org/licenses/LICENSE-2.0
//    
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
//
//*******************************************************************************

/// #region JSCop/JsHint
/* global cryptoECC */
/// #endregion JSCop/JsHint

var curve_BN254 = {
    name: "BN-254",
    type: 0, // Curve Type 0 = Weierstrass, 1 Twisted Edwards
    p: [0x25, 0x23, 0x64, 0x82, 0x40, 0x00, 0x00, 0x01, 0xBA, 0x34, 0x4D, 0x80, 0x00, 0x00, 0x00, 0x08, 0x61, 0x21, 0x00, 0x00, 0x00, 0x00, 0x00, 0x13, 0xA7, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x13],
    a: [0x00],
    b: [0x02],
    order: [0x25, 0x23, 0x64, 0x82, 0x40, 0x00, 0x00, 0x01, 0xBA, 0x34, 0x4D, 0x80, 0x00, 0x00, 0x00, 0x07, 0xFF, 0x9F, 0x80, 0x00, 0x00, 0x00, 0x00, 0x10, 0xA1, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0D],
    gx: [0x25, 0x23, 0x64, 0x82, 0x40, 0x00, 0x00, 0x01, 0xBA, 0x34, 0x4D, 0x80, 0x00, 0x00, 0x00, 0x08, 0x61, 0x21, 0x00, 0x00, 0x00, 0x00, 0x00, 0x13, 0xA7, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12],
    gy: [0x01],
    cf: 1  // co-factor
};

if (typeof cryptoECC !== 'undefined') {
    // Add curves to ECC object
    cryptoECC.curves["BN-254"] = curve_BN254;
}
