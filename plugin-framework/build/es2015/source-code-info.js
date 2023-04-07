import { DescriptorProto, EnumDescriptorProto, EnumValueDescriptorProto, FieldDescriptorProto, FileDescriptorProto, MethodDescriptorProto, OneofDescriptorProto, ServiceDescriptorProto } from "./google/protobuf/descriptor";
import { assert } from "@protobuf-ts/runtime";
export class SourceCodeInfoLookup {
    constructor(parentResolver) {
        this._parentResolver = parentResolver;
    }
    sourceCodeCursor(descriptor) {
        var _a, _b;
        const path = makeSourceCodePath(x => this._parentResolver(x), descriptor);
        assert(path !== undefined, `Cannot create source code path`);
        const all = (_b = (_a = this._findFile(descriptor).sourceCodeInfo) === null || _a === void 0 ? void 0 : _a.location) !== null && _b !== void 0 ? _b : [];
        const hit = filterSourceCodeLocations(all, path);
        return sourceCodeLocationToCursor(hit);
    }
    sourceCodeComments(descriptorOrFile, fileDescriptorFieldNumber) {
        var _a, _b;
        const path = makeSourceCodePath(x => this._parentResolver(x), descriptorOrFile);
        assert(path !== undefined, `Cannot create source code path`);
        if (fileDescriptorFieldNumber !== undefined) {
            path.push(fileDescriptorFieldNumber);
        }
        const all = (_b = (_a = this._findFile(descriptorOrFile).sourceCodeInfo) === null || _a === void 0 ? void 0 : _a.location) !== null && _b !== void 0 ? _b : [];
        const hit = filterSourceCodeLocations(all, path);
        return sourceCodeLocationToComment(hit);
    }
    _findFile(d) {
        let c = d;
        while (c) {
            if (FileDescriptorProto.is(c)) {
                return c;
            }
            c = this._parentResolver(c);
        }
        assert(false);
    }
}
/**
 * Return cursor position of the given source code location
 * as line number and column, both starting at 1.
 *
 * If more than one location is given, only the first one
 * is evaluated, the others are discarded.
 */
export function sourceCodeLocationToCursor(locations) {
    if (locations.length === 0) {
        return emptyCursor;
    }
    const span = locations[0].span;
    if (span === undefined || span.length < 3 || span.length > 4) {
        return emptyCursor;
    }
    return [
        span[0] + 1,
        span[1] + 1
    ];
}
const emptyCursor = [undefined, undefined];
/**
 * Return the comments for the given source code location.
 *
 * If more than one location is given, only the first one
 * is evaluated, the others are discarded.
 *
 * If no comments found, empty (not undefined) object
 * is returned.
 *
 * Trailing newlines are removed.
 */
export function sourceCodeLocationToComment(locations) {
    if (locations.length === 0) {
        return emptyComment;
    }
    const location = locations[0], leadingDetached = location.leadingDetachedComments.map(stripTrailingNewline), leadingComments = location.leadingComments, leading = leadingComments === ''
        ? undefined
        : (leadingComments === undefined
            ? undefined
            : stripTrailingNewline(leadingComments)), trailingComments = location.trailingComments, trailing = trailingComments === ''
        ? undefined
        : (trailingComments === undefined
            ? undefined
            : stripTrailingNewline(trailingComments));
    return (leadingDetached.length === 0 && leading === undefined && trailing === undefined)
        ? emptyComment
        : { leadingDetached, leading, trailing };
}
function stripTrailingNewline(block) {
    return block.endsWith('\n')
        ? block.slice(0, -1)
        : block;
}
const emptyComment = {
    leadingDetached: [],
    leading: undefined,
    trailing: undefined,
};
/**
 * Find the source code locations that match the given path.
 */
export function filterSourceCodeLocations(locations, path) {
    return locations.filter(l => {
        const p = l.path;
        if (p.length !== path.length) {
            return false;
        }
        for (let i = 0; i < p.length; i++) {
            if (p[i] !== path[i]) {
                return false;
            }
        }
        return true;
    });
}
/**
 * Create the path to the source code location where the
 * given element was declared.
 *
 * Returns `undefined` if we don't know how to make the path.
 *
 * For example, the path [4, 0, 2, 3] points to the 4th field
 * of the first message of a .proto file:
 *
 * file
 *  .messageType // FileDescriptorProto.message_type = 3;
 *  [0] // first message
 *  .field // FileDescriptorProto.field = 2;
 *  [3] // 4th field
 *
 * See https://github.com/protocolbuffers/protobuf/blob/f1ce8663ac88df54cf212d29ce5123b69203b135/src/google/protobuf/descriptor.proto#L799
 */
export function makeSourceCodePath(parentProvider, descriptor) {
    const path = [];
    let parent = parentProvider(descriptor);
    let component;
    while (parent) {
        component = makeSourceCodePathComponent(parent, descriptor);
        if (component === undefined) {
            return undefined;
        }
        path.unshift(...component);
        descriptor = parent;
        parent = parentProvider(parent);
    }
    return path;
}
/**
 * Make a path from the parent to the immediate child.
 *
 * Returns `undefined` if we don't know how to make the path.
 */
export function makeSourceCodePathComponent(parent, child) {
    if (FileDescriptorProto.is(parent) && DescriptorProto.is(child)) {
        return [
            FileDescriptorProtoFields.message_type,
            parent.messageType.indexOf(child)
        ];
    }
    if (FileDescriptorProto.is(parent) && EnumDescriptorProto.is(child)) {
        return [
            FileDescriptorProtoFields.enum_type,
            parent.enumType.indexOf(child)
        ];
    }
    if (FileDescriptorProto.is(parent) && ServiceDescriptorProto.is(child)) {
        return [
            FileDescriptorProtoFields.service,
            parent.service.indexOf(child)
        ];
    }
    if (DescriptorProto.is(parent) && EnumDescriptorProto.is(child)) {
        return [
            DescriptorProtoFields.enum_type,
            parent.enumType.indexOf(child)
        ];
    }
    if (DescriptorProto.is(parent) && DescriptorProto.is(child)) {
        return [
            DescriptorProtoFields.nested_type,
            parent.nestedType.indexOf(child)
        ];
    }
    if (DescriptorProto.is(parent) && FieldDescriptorProto.is(child)) {
        return [
            DescriptorProtoFields.field,
            parent.field.indexOf(child)
        ];
    }
    if (DescriptorProto.is(parent) && OneofDescriptorProto.is(child)) {
        return [
            DescriptorProtoFields.oneof_decl,
            parent.oneofDecl.indexOf(child)
        ];
    }
    if (EnumDescriptorProto.is(parent) && EnumValueDescriptorProto.is(child)) {
        return [
            EnumDescriptorProtoFields.value,
            parent.value.indexOf(child)
        ];
    }
    if (ServiceDescriptorProto.is(parent) && MethodDescriptorProto.is(child)) {
        return [
            ServiceDescriptorProtoFields.method,
            parent.method.indexOf(child)
        ];
    }
    return undefined;
}
export var FileDescriptorProtoFields;
(function (FileDescriptorProtoFields) {
    FileDescriptorProtoFields[FileDescriptorProtoFields["syntax"] = 12] = "syntax";
    FileDescriptorProtoFields[FileDescriptorProtoFields["package"] = 2] = "package";
    FileDescriptorProtoFields[FileDescriptorProtoFields["message_type"] = 4] = "message_type";
    FileDescriptorProtoFields[FileDescriptorProtoFields["enum_type"] = 5] = "enum_type";
    FileDescriptorProtoFields[FileDescriptorProtoFields["service"] = 6] = "service";
})(FileDescriptorProtoFields || (FileDescriptorProtoFields = {}));
var DescriptorProtoFields;
(function (DescriptorProtoFields) {
    DescriptorProtoFields[DescriptorProtoFields["field"] = 2] = "field";
    DescriptorProtoFields[DescriptorProtoFields["nested_type"] = 3] = "nested_type";
    DescriptorProtoFields[DescriptorProtoFields["enum_type"] = 4] = "enum_type";
    DescriptorProtoFields[DescriptorProtoFields["options"] = 7] = "options";
    DescriptorProtoFields[DescriptorProtoFields["oneof_decl"] = 8] = "oneof_decl";
})(DescriptorProtoFields || (DescriptorProtoFields = {}));
// enum FieldDescriptorProtoFields {
// name = 1, // optional string name = 1;
// number = 3, // optional int32 number = 3;
// label = 4, // optional Label label = 4;
// type = 5, // optional Type type = 5;
// }
var EnumDescriptorProtoFields;
(function (EnumDescriptorProtoFields) {
    // name = 1, // optional string name = 1;
    EnumDescriptorProtoFields[EnumDescriptorProtoFields["value"] = 2] = "value";
    // options = 3, // optional EnumOptions options = 3;
})(EnumDescriptorProtoFields || (EnumDescriptorProtoFields = {}));
var ServiceDescriptorProtoFields;
(function (ServiceDescriptorProtoFields) {
    // name = 1, // optional string name = 1;
    ServiceDescriptorProtoFields[ServiceDescriptorProtoFields["method"] = 2] = "method";
    // options = 3, // optional ServiceOptions options = 3;
})(ServiceDescriptorProtoFields || (ServiceDescriptorProtoFields = {}));
