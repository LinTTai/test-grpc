"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGeneratorResponse_File = exports.CodeGeneratorResponse = exports.CodeGeneratorRequest = exports.Version = exports.CodeGeneratorResponse_Feature = void 0;
// @generated by protobuf-ts 1.0.0-alpha.35 with parameters force_optimize_code_size,long_type_string
// @generated from protobuf file "google/protobuf/compiler/plugin.proto" (package "google.protobuf.compiler", syntax proto2)
// tslint:disable
//
// Protocol Buffers - Google's data interchange format
// Copyright 2008 Google Inc.  All rights reserved.
// https://developers.google.com/protocol-buffers/
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//
// Author: kenton@google.com (Kenton Varda)
//
// WARNING:  The plugin interface is currently EXPERIMENTAL and is subject to
//   change.
//
// protoc (aka the Protocol Compiler) can be extended via plugins.  A plugin is
// just a program that reads a CodeGeneratorRequest from stdin and writes a
// CodeGeneratorResponse to stdout.
//
// Plugins written using C++ can use google/protobuf/compiler/plugin.h instead
// of dealing with the raw protocol defined here.
//
// A plugin executable needs only to be placed somewhere in the path.  The
// plugin should be named "protoc-gen-$NAME", and will then be used when the
// flag "--${NAME}_out" is passed to protoc.
//
const runtime_1 = require("@protobuf-ts/runtime");
const runtime_2 = require("@protobuf-ts/runtime");
const runtime_3 = require("@protobuf-ts/runtime");
const descriptor_1 = require("../descriptor");
/**
 * Sync with code_generator.h.
 *
 * @generated from protobuf enum google.protobuf.compiler.CodeGeneratorResponse.Feature
 */
var CodeGeneratorResponse_Feature;
(function (CodeGeneratorResponse_Feature) {
    /**
     * @generated from protobuf enum value: FEATURE_NONE = 0;
     */
    CodeGeneratorResponse_Feature[CodeGeneratorResponse_Feature["NONE"] = 0] = "NONE";
    /**
     * @generated from protobuf enum value: FEATURE_PROTO3_OPTIONAL = 1;
     */
    CodeGeneratorResponse_Feature[CodeGeneratorResponse_Feature["PROTO3_OPTIONAL"] = 1] = "PROTO3_OPTIONAL";
})(CodeGeneratorResponse_Feature = exports.CodeGeneratorResponse_Feature || (exports.CodeGeneratorResponse_Feature = {}));
/**
 * Type for protobuf message google.protobuf.compiler.Version
 */
class Version$Type extends runtime_3.MessageType {
    constructor() {
        super("google.protobuf.compiler.Version", [
            { no: 1, name: "major", kind: "scalar", opt: true, T: runtime_2.ScalarType.INT32 },
            { no: 2, name: "minor", kind: "scalar", opt: true, T: runtime_2.ScalarType.INT32 },
            { no: 3, name: "patch", kind: "scalar", opt: true, T: runtime_2.ScalarType.INT32 },
            { no: 4, name: "suffix", kind: "scalar", opt: true, T: runtime_2.ScalarType.STRING }
        ]);
    }
}
exports.Version = new Version$Type();
/**
 * Type for protobuf message google.protobuf.compiler.CodeGeneratorRequest
 */
class CodeGeneratorRequest$Type extends runtime_3.MessageType {
    constructor() {
        super("google.protobuf.compiler.CodeGeneratorRequest", [
            { no: 1, name: "file_to_generate", kind: "scalar", repeat: runtime_1.RepeatType.UNPACKED, T: runtime_2.ScalarType.STRING },
            { no: 2, name: "parameter", kind: "scalar", opt: true, T: runtime_2.ScalarType.STRING },
            { no: 15, name: "proto_file", kind: "message", repeat: runtime_1.RepeatType.UNPACKED, T: () => descriptor_1.FileDescriptorProto },
            { no: 3, name: "compiler_version", kind: "message", T: () => exports.Version }
        ]);
    }
}
exports.CodeGeneratorRequest = new CodeGeneratorRequest$Type();
/**
 * Type for protobuf message google.protobuf.compiler.CodeGeneratorResponse
 */
class CodeGeneratorResponse$Type extends runtime_3.MessageType {
    constructor() {
        super("google.protobuf.compiler.CodeGeneratorResponse", [
            { no: 1, name: "error", kind: "scalar", opt: true, T: runtime_2.ScalarType.STRING },
            { no: 2, name: "supported_features", kind: "scalar", opt: true, T: runtime_2.ScalarType.UINT64 },
            { no: 15, name: "file", kind: "message", repeat: runtime_1.RepeatType.UNPACKED, T: () => exports.CodeGeneratorResponse_File }
        ]);
    }
}
exports.CodeGeneratorResponse = new CodeGeneratorResponse$Type();
/**
 * Type for protobuf message google.protobuf.compiler.CodeGeneratorResponse.File
 */
class CodeGeneratorResponse_File$Type extends runtime_3.MessageType {
    constructor() {
        super("google.protobuf.compiler.CodeGeneratorResponse.File", [
            { no: 1, name: "name", kind: "scalar", opt: true, T: runtime_2.ScalarType.STRING },
            { no: 2, name: "insertion_point", kind: "scalar", opt: true, T: runtime_2.ScalarType.STRING },
            { no: 15, name: "content", kind: "scalar", opt: true, T: runtime_2.ScalarType.STRING }
        ]);
    }
}
exports.CodeGeneratorResponse_File = new CodeGeneratorResponse_File$Type();