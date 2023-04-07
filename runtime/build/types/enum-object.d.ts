import type { EnumInfo } from "./reflection-info";
/**
 * Is this a lookup object generated by Typescript, for a Typescript enum
 * generated by protobuf-ts?
 *
 * - No `const enum` (enum must not be inlined, we need reverse mapping).
 * - No string enum (we need int32 for protobuf).
 * - Must have a value for 0 (otherwise, we would need to support custom default values).
 */
export declare function isEnumObject(arg: any): arg is EnumInfo[1];
/**
 * Lists all values of a Typescript enum, as an array of objects with a "name"
 * property and a "number" property.
 *
 * Note that it is possible that a number appears more than once, because it is
 * possible to have aliases in an enum.
 *
 * Throws if the enum does not adhere to the rules of enums generated by
 * protobuf-ts. See `isEnumObject()`.
 */
export declare function listEnumValues(enumObject: any): EnumObjectValue[];
/**
 * A value of a Typescript enum generated by protobuf-ts.
 */
export declare type EnumObjectValue = {
    name: string;
    number: number;
};
/**
 * Lists the names of a Typescript enum.
 *
 * Throws if the enum does not adhere to the rules of enums generated by
 * protobuf-ts. See `isEnumObject()`.
 */
export declare function listEnumNames(enumObject: any): Array<string>;
/**
 * Lists the numbers of a Typescript enum.
 *
 * Throws if the enum does not adhere to the rules of enums generated by
 * protobuf-ts. See `isEnumObject()`.
 */
export declare function listEnumNumbers(enumObject: any): Array<number>;