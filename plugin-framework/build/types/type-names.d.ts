import { AnyDescriptorProto, AnyTypeDescriptorProto } from "./descriptor-info";
import { DescriptorParentFn, IDescriptorTree } from "./descriptor-tree";
/**
 * Can lookup a type name.
 *
 * Type names are normalized, the leading period generated by
 * protoc is removed.
 */
export interface ITypeNameLookup {
    /**
     * Removes leading period from name.
     */
    normalizeTypeName(typeName: string): string;
    /**
     * Return the descriptor for the given type name.
     *
     * Throws if not found.
     */
    resolveTypeName(typeName: string): AnyTypeDescriptorProto;
    /**
     * Return the descriptor for the given type name - or `undefined`.
     */
    peekTypeName(typeName: string): AnyTypeDescriptorProto | undefined;
    /**
     * Get the type name for the given descriptor.
     */
    makeTypeName(descriptor: AnyTypeDescriptorProto): string;
}
export declare class TypeNameLookup implements ITypeNameLookup {
    /**
     * Create the lookup from a list of descriptors and a function
     * that provides the parent of a descriptor.
     */
    static from(descriptors: AnyDescriptorProto[], parentProvider: DescriptorParentFn): TypeNameLookup;
    /**
     * Create the lookup from an existing tree.
     */
    static from(tree: IDescriptorTree): TypeNameLookup;
    private readonly _names;
    private readonly _reverse;
    constructor(data: Array<{
        descriptor: AnyTypeDescriptorProto;
        ancestors: AnyDescriptorProto[];
    }>);
    normalizeTypeName(typeName: string): string;
    resolveTypeName(typeName: string): AnyTypeDescriptorProto;
    peekTypeName(typeName: string): AnyTypeDescriptorProto | undefined;
    makeTypeName(descriptor: AnyTypeDescriptorProto): string;
}